# Branch 1 — Security Fixes ✅

> All items in this branch have been implemented in this PR.

---

## Issue 1: MongoDB Connects TWICE

**File**: `backend/server.js`  
**Problem**: There were two `mongoose.connect()` calls — one standalone block and one inside `serverReady`. Every server restart opened 2 connections to Atlas. MongoDB Atlas M0 free tier allows only **100 concurrent connections**. At 10k users, each double-connect wastes capacity, pushing you closer to the connection limit.

**Fix Applied**: Removed the standalone `mongoose.connect()` block (lines ~202-213). Kept only the one inside `serverReady` which properly resolves after the connection is established and the skill cache is loaded.

**What to learn**: MongoDB reuses one connection pool per process. You should always connect once and let Mongoose manage the pool. See [Mongoose connection docs](https://mongoosejs.com/docs/connections.html).

---

## Issue 2: Auth Middleware Logs ALL Headers

**File**: `backend/middleware/authMiddleware.js` line 5  
**Problem**: `console.log(" Incoming headers:", req.headers)` printed the full `Authorization: Bearer <token>` header on every single authenticated request. If you use any log aggregator (Render logs, Datadog, Papertrail), anyone who can read those logs can steal tokens and impersonate any user.

**Fix Applied**: Removed the `console.log` line entirely. Token verification errors are still caught and handled in the `catch` block.

**What to learn**: Never log authorization headers, cookies, or any bearer tokens. Log request metadata (method, URL, status) but never credentials.

---

## Issue 3 (deferred): JWT in localStorage → HttpOnly Cookies

**Status**: Moved to Branch 7 (requires coordinating backend cookie-setting with frontend changes across every login/logout flow — too risky to bundle with other security fixes).  
**Short explanation**: `localStorage` is accessible to any JavaScript on the page. An XSS attack (injected script from a compromised npm package) can read it. `HttpOnly` cookies cannot be read by JavaScript — only sent by the browser automatically.

---

## Issue 4: interviewRoutes Not Mounted

**File**: `backend/server.js` line ~173  
**Problem**: The interview route file was fully written but commented out: `//app.use("/api/interview",interviewRoutes)`. Any frontend calls to `/api/interview/*` returned 404. The AI interview feature was silently broken.

**Fix Applied**: Uncommented and imported the route. The interview flow now works end-to-end.

---

## Issue 5: Rate Limiter on `/api/users` Applied Twice

**File**: `backend/server.js` lines ~122 and ~136  
**Problem**: `app.use("/api/users", limiter)` appeared twice. Every request to `/api/users` consumed **2 slots** from the rate limit window instead of 1. Your effective limit was 50 requests per 15 minutes instead of 100.

**Fix Applied**: Removed the duplicate registration. The limiter is now registered once.

---

## Issue 6: No NoSQL Injection Protection

**Package**: `express-mongo-sanitize`  
**Problem**: A user could send `{ "email": { "$gt": "" } }` in a login request body. MongoDB would interpret the `$gt` operator and match ANY user — bypassing email checks entirely.

**Example attack**:
```json
POST /api/auth/login
{
  "email": { "$gt": "" },
  "password": "anything"
}
```
MongoDB would find the first user in the collection and return them. This is a complete auth bypass.

**Fix Applied**: Added `app.use(mongoSanitize())` after the JSON parser in `server.js`. This middleware strips any keys containing `$` or `.` from `req.body`, `req.query`, and `req.params` before any route handler sees them.

**Installation**: `npm install express-mongo-sanitize`

---

## Issue 8: No Account Lockout After Failed Logins

**Files**: `backend/models/User.js`, `backend/routes/authRoutes.js`  
**Problem**: The IP-based rate limiter only blocked 5 attempts per IP per 15 minutes. An attacker with multiple cloud IPs (easy to get) could try thousands of password combinations against one account — a credential stuffing attack.

**Fix Applied**:
- Added `loginAttempts: Number` and `lockUntil: Date` fields to User model
- Added `MAX_LOGIN_ATTEMPTS = 5` and `LOCK_DURATION = 15 minutes` as model statics
- In the login route: after each failed password check, increment `loginAttempts`. When it reaches 5, set `lockUntil = now + 15 minutes`. On next login attempt, check `lockUntil` before even running `bcrypt.compare`.
- On successful login: reset both fields to clean state.

**What to learn**: Layered security — IP rate limiting + per-account lockout gives you defense in depth. Neither alone is enough.

---

## Issue 9: No File Type Validation on Resume Upload

**File**: `backend/middleware/uploadMiddleware.js`  
**Problem**: Multer accepted any file. An attacker could rename `malware.exe` to `resume.pdf` and upload it. Cloudinary would host it. While Cloudinary has some protections, an unrestricted upload endpoint is a liability.

**Fix Applied**:
1. Added `fileFilter` function to multer config that checks `file.mimetype === "application/pdf"`
2. Added `limits: { fileSize: 5 * 1024 * 1024 }` — 5MB max size

**Why mimetype check isn't enough alone**: The browser reports the MIME type. A sophisticated attacker can spoof it. In a higher-security context you'd also read the first 4 bytes of the buffer (`%PDF`) — the "magic number". For this codebase, since files go directly to Cloudinary's storage (not your server disk), the mimetype check is the primary gate. The note about magic bytes is preserved as a comment in the learning docs for the next iteration.

---

## Issue 10: OTP Stored in Plain Text

**Files**: `backend/models/User.js`, `backend/routes/authRoutes.js`  
**Problem**: The 6-digit OTP was stored as `"123456"` in MongoDB. If your database was ever exported or leaked, every active OTP would be immediately usable.

**Fix Applied**:
- Added `User.hashToken(raw)` static method using `crypto.createHash('sha256')`
- Before saving OTP: `user.otp = User.hashToken(otp)` — the raw code is emailed, only the hash is in the DB
- During verification: `User.hashToken(inputOtp)` and compare with stored hash

**Why SHA-256 and not bcrypt for OTPs?**: bcrypt is for passwords because it's intentionally slow (to resist brute force). For OTPs: they're already short-lived (10 min), already 6 digits of randomness from `crypto.randomInt`, and you need fast comparison. SHA-256 is fast and deterministic — perfect for OTPs and tokens.

---

## Missing DB Indexes (Performance — added in this PR)

**Files**: `backend/models/Application.js`, `backend/models/Job.js`, `backend/models/Notification.js`

### Added:
- `Application.applicantId` — powers the "My Applications" page query
- `Job.postedBy` — powers the "My Jobs" recruiter page query  
- `Job.isOpen + createdAt` — compound index for browsing open jobs sorted by newest
- `Notification.user + isRead` — powers unread notification count badge

**Why compound indexes matter**: `{ isOpen: 1, createdAt: -1 }` lets MongoDB find all open jobs AND sort by date in a single B-tree lookup. Without it, Mongo finds all open jobs, then sorts the entire result set in memory — extremely slow at 50k+ documents.
