# Issue #5 — Rate Limiter Applied Twice on `/api/users`

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🔴 Critical — effective rate limit is half of what you think  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*A user emails: "I keep getting locked out of the app after about 50 requests."*

---

**🔴 Priya (PM):** "Ben, a user complained they're getting rate limited way too fast. They say after about 50 requests they can't do anything."

**🟠 Ben (Backend):** "The rate limit is set to 100 requests per 15 minutes. That should be fine."

**🟣 Sam (Security):** "Ben, search for `limiter` in server.js. How many times does it appear?"

**🟠 Ben:** *searches* "Three times. The declaration... and two `app.use('/api/users', limiter)'` calls."

**🟣 Sam:** "So every request to `/api/users` hits the rate limiter twice. The counter increments by 2 for every single request. Your effective limit is 50 requests per 15 minutes — half of what you think."

**🟠 Ben:** "That would explain exactly why users are getting locked out after 50 requests."

**🔴 Priya:** "And this affects login too? Login goes through `/api/auth`, right?"

**🟣 Sam:** "Correct — the global limiter is separate. But the `/api/users` duplicate means any user who hits the users endpoint frequently (loading profile, updating profile, etc.) gets locked out prematurely. At 10,000 users, this would cause a huge volume of false lock-outs."

---

## 🔍 Understanding the Problem

### What is a Rate Limiter?

A rate limiter counts how many requests come from an IP address in a time window. If the count exceeds the limit, it rejects the next request with `429 Too Many Requests`.

```
Rate limit: 100 requests per 15 minutes

Request 1  → counter: 1  → ✅ allowed
Request 2  → counter: 2  → ✅ allowed
...
Request 100 → counter: 100 → ✅ allowed
Request 101 → counter: 101 → ❌ 429 Too Many Requests
```

### What Happens When It's Applied Twice?

When the same middleware is applied to the same path twice, every request runs both middleware functions:

```
Request to /api/users/profile
  ↓
First limiter: counter → 1
  ↓
Second limiter: counter → 2
  ↓
Route handler runs

Next 49 requests do the same: counter goes to 100 after only 50 real requests
Request 51:
  First limiter: counter → 101 → ❌ BLOCKED (even though user only made 50 requests)
```

### Why Does This Happen?

It happens when code is added incrementally. Someone added a global limiter at the top:
```js
app.use(limiter); // Line 100 — applies to ALL routes
```

Then later, someone wanted to be explicit about the users route:
```js
app.use("/api/users", limiter); // Line 122 — oops, already applied globally
```

Then even later, someone cleaned up and thought the global one was removed, so added:
```js
app.use("/api/users", limiter); // Line 136 — now applied twice to /api/users
```

With no automated tests, nobody noticed the double-counting.

---

## 🛠 The Fix

### Find the duplicate in `backend/server.js`

Search for every line with `limiter`. You'll see something like:

```js
// Correct — apply globally or per-path, not both:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // ← Global limiter — covers ALL /api/* routes

// ... routes defined ...

app.use("/api/users", limiter); // ❌ DUPLICATE — /api/users already hits the limiter above
// ...
app.use("/api/users", limiter); // ❌ SECOND DUPLICATE
```

### The fix:

Remove the two duplicate registrations. Keep only one:

```js
// Option A: Apply globally (one limiter for all routes)
app.use(limiter);
// Then remove ALL per-path limiter registrations

// Option B: Apply per-path (fine-grained control)
// Remove the global one, keep per-path:
app.use("/api/auth", rateLimit({ max: 20 })); // Stricter for auth
app.use("/api/users", rateLimit({ max: 100 })); // Looser for profile pages
app.use("/api/jobs", rateLimit({ max: 200 })); // Even looser for browsing
```

The codebase uses Option A (global limiter). So just remove the duplicate per-path registrations.

### Better Rate Limit Configuration

While fixing the duplicate, also consider different limits per route type:

```js
// Strict limit for auth routes (brute force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,  // Only 20 login attempts per 15 min per IP
  message: { message: "Too many login attempts. Try again in 15 minutes." },
});
app.use("/api/auth", authLimiter);

// General API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests. Slow down." },
});
app.use("/api", apiLimiter); // Applies to all /api/* except /api/auth (which hits authLimiter first)
```

---

## ❓ Common Questions

**Q: What does a user see when they're rate limited?**  
A: HTTP status 429 with your message. The browser shows it as a network error. Your frontend should check for 429 and show a helpful message: "You're making requests too fast — wait a moment."

**Q: Rate limiting by IP — what about users behind a corporate proxy?**  
A: Many users in an office building share one IP (the company's proxy). If your limit is 100/15min and 50 employees are using the app through the same IP, they collectively hit the limit quickly. Solution: use `express-rate-limit`'s `keyGenerator` to limit by user ID (from JWT) instead of IP for authenticated routes:

```js
const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.user?.id || req.ip, // Use user ID if authenticated
});
```

**Q: Can bots bypass IP rate limiting?**  
A: Yes — bots with many IP addresses (botnet) can. IP rate limiting is a basic protection, not a complete solution. For critical endpoints (login), combine with: per-account lockout (Issue #8), CAPTCHA, and behavioral analysis.

---

## 🎓 What You Just Learned

- Rate limiting counts requests per IP per time window and blocks excess requests with 429
- Applying middleware twice doubles the cost of each request against the counter
- The effective limit halves — users get blocked at 50 requests even though the limit says 100
- Always grep for middleware applications before assuming it's only applied once
- Different routes should have different limits (auth = strict, browsing = loose)
- Testing: write a test that sends 100 requests to `/api/users` and verifies it gets 429 on request 101, not 51
