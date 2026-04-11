# Issue #2 — Auth Middleware Logs ALL Request Headers

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🔴 Critical — every JWT token gets printed to logs  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Sam (Security) is reviewing the Render logs. She calls Ben.*

---

**🟣 Sam (Security):** "Ben, I'm looking at the Render logs from yesterday. I can read every single JWT token that every user sent to our API."

**🟠 Ben (Backend):** "What? How?"

**🟣 Sam:** "Line 5 in `authMiddleware.js`. `console.log(' Incoming headers:', req.headers)`. You logged the entire headers object. That includes `Authorization: Bearer eyJhbGci...` — the full token."

**🟠 Ben:** "I added that while debugging two months ago. I forgot to remove it."

**🟣 Sam:** "Ben, everyone with access to Render logs — every team member, every contractor, Render's support team if they ever look — can see those tokens and impersonate any user for up to 12 hours while the token is valid."

**🔴 Priya (PM):** "Is this a GDPR violation?"

**🟣 Sam:** "Yes. Under GDPR, session tokens are considered personal data because they identify a specific user session. Logging them without a legitimate purpose and proper controls violates the data minimization principle. If this were reported to a regulator, we'd be fined."

**🟠 Ben:** "The fix is one line — just delete the console.log."

**🟣 Sam:** "Correct. But let me explain WHY this happens so it never happens again."

---

## 🔍 Understanding the Problem

### What is the `Authorization` header?

When a logged-in user makes an API request, their browser sends:
```
GET /api/jobs HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODkuLi4iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwNTAwMDAwMH0.XXXXXX
```

That JWT token is the user's "key" to their account. If someone gets it, they can:
1. Put it in their own request headers
2. Hit any authenticated API endpoint
3. Get all data, change settings, delete their account — anything the real user can do

Tokens expire (ours in 12 hours). But a window of 12 hours is plenty for an attacker.

### What does `req.headers` contain?

```js
console.log(req.headers);
// Prints:
{
  "authorization": "Bearer eyJhbGci... (the full JWT)",
  "content-type": "application/json",
  "user-agent": "Mozilla/5.0...",
  "cookie": "token=...",  // If you use cookies, this is even more sensitive
  "x-forwarded-for": "203.x.x.x"  // User's IP
}
```

Every single request prints this. A busy app might log 10,000 of these per hour.

### Where do logs go?

- **Render**: Accessible via dashboard to anyone with "Team Member" access
- **Your CI logs** (GitHub Actions): Potentially visible to all repo contributors
- **Log aggregators** (Datadog, Papertrail): Stored for 30-90 days, searchable
- **Render's own storage**: Render staff can access logs for support purposes

---

## 🛠 The Fix

### What was wrong (line 5 of `authMiddleware.js`):

```js
// This was the bad version — THE LINE THAT LEAKS TOKENS:
const verifyToken = (req, res, next) => {
  console.log(" Incoming headers:", req.headers); // ❌ DELETE THIS
  const authHeader = req.headers["authorization"];
  // ...
};
```

### What the fixed version looks like:

```js
// backend/middleware/authMiddleware.js — fixed version
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // OK to log the error message (e.g. "jwt expired") but NOT the token itself
    console.error("Token verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
```

Notice what's safe to log vs. not:
- ✅ `err.message` ("jwt expired", "invalid signature") — tells you what went wrong
- ❌ `req.headers.authorization` — the actual token string
- ✅ `req.method`, `req.url` — request metadata
- ❌ `req.headers` (whole object) — might contain tokens, cookies

### The General Rule

```
Log: What happened, When, Who (user ID, not token), Result
Don't log: Passwords, tokens, cookies, API keys, PII (emails, SSN, etc.)
```

---

## ❓ Common Questions

**Q: What if I need to debug token issues? How do I without logging the token?**  
A: Log only what's safe:
```js
console.log({
  method: req.method,
  url: req.url,
  hasToken: !!req.headers.authorization,  // "true" or "false" — not the token
  userId: decoded?.id,  // After verification, log the user ID
});
```

**Q: Is it safe to log the user ID?**  
A: User IDs are MongoDB ObjectIDs — they don't reveal anything sensitive by themselves. Logging `userId: "6789abc..."` in your server logs is fine.

**Q: I already have this in my logs. What do I do?**  
A: You can't un-log them. If the logs are stored in a service (Datadog, etc.), you should:
1. Fix the code immediately
2. Rotate all JWT secrets (this invalidates ALL existing tokens) — change `JWT_SECRET` in `.env` and in Render/Railway settings
3. Notify users they need to log in again (graceful, no explanation needed)

**Q: How do I rotate the JWT secret?**  
A: Change the value of `JWT_SECRET` in `backend/.env` and in your deployment environment variables. All existing tokens signed with the old secret become invalid — users get "invalid token" and are redirected to login.

---

## 🎓 What You Just Learned

- `req.headers` contains your users' authentication tokens — treat it like a password
- Logging auth tokens is a security AND privacy (GDPR) violation
- The fix: delete the log line — nothing more needed
- What's safe to log: error messages, request metadata, user IDs
- If tokens are already in logs: rotate the JWT secret to invalidate them all
- The debugging habit of leaving console.logs in middleware is dangerous — always clean up after debugging
