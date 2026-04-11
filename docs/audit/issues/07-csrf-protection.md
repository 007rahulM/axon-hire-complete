# Issue #7 — No CSRF Protection

> **Branch**: 7 (Requires coordinated frontend change)  
> **Severity**: 🟠 Security — state-changing requests can be triggered from other websites  
> **Status**: 🔵 Pending (Branch 7)

---

## 👥 The Team Room

*Sam is explaining why CSRF matters once we switch to HttpOnly cookies (Issue #3).*

---

**🟣 Sam (Security):** "When we move tokens from localStorage to HttpOnly cookies in Branch 7, we gain XSS protection. But we also need to add CSRF protection at the same time."

**🟠 Ben (Backend):** "Aren't those the same thing?"

**🟣 Sam:** "They protect against different attacks. XSS = malicious script steals your token. CSRF = malicious website tricks your browser into making a request using your existing cookie."

**🔵 Fay (Frontend):** "Walk me through CSRF. I don't fully understand it."

**🟣 Sam:** "Okay. You're logged in to axon-hire.com. Your browser has an HttpOnly cookie with your session. You then visit evil-job-board.com — which has this hidden on the page:"

```html
<form action="https://axon-hire.com/api/jobs" method="POST" id="evil">
  <input name="title" value="Fake Job">
  <input name="salary" value="0">
</form>
<script>document.getElementById("evil").submit();</script>
```

**🟣 Sam continues:** "Your browser sees a form submit to axon-hire.com. It automatically includes your axon-hire cookies. The server sees a valid cookie, thinks it's you, and creates a fake job posting under your recruiter account."

**🔵 Fay:** "Oh. Because the browser automatically sends cookies to the domain they belong to."

**🟣 Sam:** "Exactly. The request looks identical to a real one from your app. The only way to tell them apart is a CSRF token — a secret value that our app issues and that evil-job-board.com can't read."

---

## 🔍 Understanding CSRF

### The Attack Flow

```
1. User logs in to axon-hire.com
   → Browser gets axon-hire.com cookie (HttpOnly, so JS can't read it)

2. User visits evil-site.com (while still having the cookie)
   → evil-site.com has a hidden form that submits to axon-hire.com

3. Browser submits the form
   → Browser automatically includes axon-hire.com cookie (that's what cookies do)
   → axon-hire.com backend sees valid cookie, processes request ✅

4. Damage done — fake job posted, application deleted, profile changed
   → All without the user knowingly doing anything
```

### Why localStorage Tokens Don't Have This Problem

With localStorage, the frontend explicitly adds the token to the `Authorization` header:
```js
headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
```

Evil websites can't read localStorage (Same-Origin Policy). So they can't add the `Authorization` header. Requests from evil-site.com won't have the token → 401 Unauthorized.

**This is why switching to HttpOnly cookies (Issue #3) requires adding CSRF protection at the same time.** You gain one protection but introduce a different vulnerability if you don't handle it.

### The Fix: Double-Submit Cookie Pattern

The most practical CSRF protection for a React SPA + REST API:

1. Server sets a **non-HttpOnly** cookie called `csrfToken` with a random value
2. Frontend reads this cookie via JavaScript and adds it as a header on every state-changing request
3. Server verifies that the header value matches the cookie value

Evil sites can't read your cookies → can't provide the header → requests are rejected.

---

## 🛠 The Fix (To Be Done in Branch 7 with Issue #3)

This must be done AT THE SAME TIME as the HttpOnly cookie change.

### Step 1: Install the package

```bash
cd backend && npm install csrf-csrf
```

### Step 2: Add to `backend/server.js`

```js
const { doubleCsrf } = require("csrf-csrf");

const { 
  generateToken,    // Call this to get a CSRF token for the client
  doubleCsrfProtection // Middleware that validates CSRF on mutating requests
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET, // A random string, add to .env
  cookieName: "csrfToken",
  cookieOptions: {
    httpOnly: false,   // MUST be false — the frontend needs to read this
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// Apply CSRF protection to all state-changing routes
// (PUT, POST, DELETE, PATCH) — GET requests are safe
app.use(doubleCsrfProtection);
```

Add `CSRF_SECRET` to `backend/.env`:
```bash
CSRF_SECRET=some-very-long-random-string-that-you-generated
```

Generate a good secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Add a CSRF token endpoint

```js
// GET /api/csrf-token — frontend calls this first to get a CSRF token
router.get("/csrf-token", (req, res) => {
  const token = generateToken(req, res); // Sets the cookie too
  res.json({ csrfToken: token });
});
```

### Step 4: Frontend — fetch CSRF token on app load

In `frontend/src/main.jsx` or `AuthContext.jsx`:

```js
// On app startup, get a CSRF token
const initCSRF = async () => {
  const response = await fetch("http://localhost:5000/api/csrf-token", {
    credentials: "include", // Include cookies
  });
  const { csrfToken } = await response.json();
  // Store in memory (NOT localStorage — defeats the purpose)
  window.__csrfToken = csrfToken;
};

initCSRF();
```

### Step 5: Frontend — add to all mutating requests

In `frontend/src/utils/axiosInstance.js`:

```js
axiosInstance.interceptors.request.use((config) => {
  // Add CSRF token to all non-GET requests
  if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase())) {
    config.headers["x-csrf-token"] = window.__csrfToken;
  }
  return config;
});
```

---

## Important: Why `sameSite: "strict"` Gives You Most of the Protection

If you implement Issue #3 (HttpOnly cookie with `sameSite: "strict"`), you already get CSRF protection for most cases:

- `sameSite: "strict"` = cookie is NOT sent when the request originates from another website
- The evil form submit from evil-site.com → browser checks sameSite → cookie NOT included → 401

**`sameSite: "strict"` protects against CSRF for most modern browsers (95%+ of users).**

Full CSRF token implementation is the belt-and-suspenders approach for the remaining 5% (older browsers, edge cases with proxies).

---

## ❓ Common Questions

**Q: Does CSRF affect GET requests?**  
A: CSRF only matters for state-changing requests (POST, PUT, PATCH, DELETE). GET requests should NEVER change state — a GET request should only return data, never modify it. If you follow this rule, CSRF for GET is not an issue.

**Q: We use JWTs in headers for our mobile API. Does CSRF affect that?**  
A: No. CSRF exploits the browser's automatic cookie inclusion. If you're using `Authorization: Bearer` headers (common for mobile APIs), those aren't automatically sent by the browser — the attacker can't forge them.

**Q: What's the `CSRF_SECRET`?**  
A: A random string used to sign CSRF tokens. It should be long (64+ characters) and kept secret like your JWT secret. Rotate it if you suspect compromise (all CSRF tokens become invalid).

---

## 🎓 What You Just Learned

- CSRF exploits the browser's automatic cookie-sending behavior
- An attacker can trigger real API requests from their site using your users' cookies
- CSRF tokens solve this by requiring a value that only YOUR site can read
- `sameSite: "strict"` on cookies is a simpler defense that covers 95%+ of cases
- Full CSRF token implementation is for maximum coverage and compliance requirements
- CSRF + HttpOnly cookies must be implemented together — one without the other has gaps
