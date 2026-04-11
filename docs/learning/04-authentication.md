# 04 — Authentication Deep Dive

> This is the most important topic for Axon Hire. Get this wrong and users can impersonate each other.

---

## What is Authentication vs Authorization?

- **Authentication** = "Who are you?" — Verifying identity (login, OTP, Google OAuth)
- **Authorization** = "What can you do?" — Checking permissions (admin-only routes, recruiter-only actions)

**In Axon Hire**:
- `authMiddleware.js` handles **authentication** (is this token valid? who is the user?)
- `adminMiddleware.js` handles **authorization** (is this user an admin/recruiter?)

---

## How Passwords Are Stored (bcrypt)

**NEVER store passwords in plain text.** If your database leaks, every user's password is exposed.

### How bcrypt works:
```
Password:  "mypassword123"
Salt:      "$2b$10$N9qo8uLOickgx2ZMRZo"  (random, generated each time)
Hash:      "$2b$10$N9qo8uLOickgx2ZMRZoHSehOrWNlz..."
```

The salt ensures two users with the same password get DIFFERENT hashes. This prevents "rainbow table" attacks.

**Cost factor (`10`)**: bcrypt deliberately does 2^10 = 1,024 rounds of hashing. This takes ~100ms on your server. That's fine for one login. But an attacker trying millions of passwords? Each attempt takes 100ms × millions = years.

```js
// When user registers:
const hash = await bcrypt.hash("mypassword123", 10);  // 10 = cost factor
// Store hash in DB — never store the plain password

// When user logs in:
const isMatch = await bcrypt.compare("mypassword123", storedHash);
// bcrypt.compare: hashes the input with the SAME salt and compares
```

---

## How JWTs Work

JWT = JSON Web Token. It's how your server proves "this request came from user X."

### Structure:
```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIn0.HMAC_SIGNATURE
      HEADER                          PAYLOAD                      SIGNATURE
```

1. **Header**: Algorithm (HS256)
2. **Payload**: Data (user id, role, expiry) — BASE64 ENCODED, NOT ENCRYPTED. Anyone can read it.
3. **Signature**: HMAC of header+payload using your `JWT_SECRET` — only YOUR server can create/verify this

### The key insight:
The JWT is NOT a secret. The signature IS the security. Without your `JWT_SECRET`, an attacker can't forge a valid token.

```js
// Create a token (on login):
const token = jwt.sign(
  { id: user._id, role: user.role },  // payload (readable by anyone)
  process.env.JWT_SECRET,              // secret (only your server knows)
  { expiresIn: "12h" }                 // token auto-expires
);

// Verify a token (on every protected request):
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// If the token was tampered with, this throws an error
// If the token is expired, this throws an error
// If valid, decoded = { id: "...", role: "...", iat: ..., exp: ... }
```

### Why localStorage is dangerous (XSS):
```
Normal flow:  User logs in → token in localStorage → your JS reads it → sends with requests

XSS attack:   Malicious script injected → reads localStorage → steals token → makes requests
              as the user from attacker's server
```

### Why HttpOnly cookies are safer:
```js
// Server sets cookie:
res.cookie("token", jwtToken, {
  httpOnly: true,  // JavaScript CANNOT read this. It's invisible to JS.
  secure: true,    // Only sent over HTTPS
  sameSite: "strict", // Not sent with cross-site requests (CSRF protection)
});

// Browser automatically sends the cookie with every request to your domain
// The token never touches JavaScript — XSS can't steal what JS can't read
```

---

## How OTPs Work (and Why We Hash Them)

OTP = One-Time Password. In Axon Hire, it's a 6-digit code sent to verify email.

### Secure OTP generation:
```js
// WRONG: Math.random() is predictable
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// CORRECT: crypto.randomInt uses OS-level randomness
const otp = crypto.randomInt(100000, 999999).toString();
```

### Why we hash OTPs in the DB:
If someone dumps your MongoDB, they get every user's active OTP. A 6-digit OTP could be brute-forced in minutes. If it's hashed (SHA-256), the dump is useless.

```js
// Store: hash the OTP before saving
user.otp = crypto.createHash("sha256").update(otp).digest("hex");
// Email: the RAW 6-digit code to the user

// Verify: hash the input and compare hashes
const inputHash = crypto.createHash("sha256").update(req.body.otp).digest("hex");
if (user.otp !== inputHash) return res.status(400).json({ message: "Invalid OTP" });
```

**Why SHA-256 and not bcrypt here?**
- bcrypt is slow intentionally (to stop password brute force)
- OTPs are already: short-lived (10 min), cryptographically random, and single-use
- SHA-256 is fast and deterministic — ideal for one-time tokens

---

## Account Lockout Pattern

### The attack this stops:
"Credential stuffing" — attackers have leaked passwords from other sites and try them on your app. With IP rotation (easy with AWS/Azure), IP-based rate limiting isn't enough.

### Per-account lockout:
```
Attempt 1-4: wrong password → increment loginAttempts in DB
Attempt 5: wrong password → set lockUntil = now + 15 minutes
Attempt 6 (during lock): return 423 "Account locked" before even checking password

Successful login: reset loginAttempts = 0, lockUntil = undefined
```

**In Axon Hire's User model**:
```js
userSchema.statics.MAX_LOGIN_ATTEMPTS = 5;
userSchema.statics.LOCK_DURATION = 15 * 60 * 1000; // 15 minutes
```

**Defense in depth**: IP rate limit (5 attempts per IP per 15 min) + account lockout (5 attempts per account). Attacker needs 5 IPs AND 25 attempts per account per window. Much harder.

---

## Password Reset — Secure Token Pattern

This is how every professional app (Gmail, GitHub) handles forgot password:

```
1. User clicks "Forgot Password"
2. Server: rawToken = crypto.randomBytes(32) → 64 hex chars, unguessable
3. Server: store SHA-256(rawToken) in DB with 1-hour expiry
4. Server: email link = https://site.com/reset-password/rawToken
5. User clicks link
6. Server: hash the token from URL → find user where hash matches + not expired
7. Server: update password, clear token fields
```

**Why hash the token in the DB?**
The email link = the token. If someone reads your DB, they can't use the hashed value to reset passwords because they don't have the raw token. The raw token exists only in the email and never gets stored.

**Why `crypto.randomBytes(32)` and not a UUID?**
UUIDs (v4) use 122 bits of randomness. `randomBytes(32)` uses 256 bits. More entropy = harder to guess. For security tokens, always use `crypto.randomBytes`.

---

## Google OAuth Flow

```
1. User clicks "Sign in with Google"
2. Google shows their permission screen
3. Google returns a "credential" (Google's JWT) to your React app
4. React sends Google's JWT to your backend: POST /api/auth/google
5. Backend verifies it with Google: client.verifyIdToken({ idToken: token })
6. Google confirms: "yes, this is rahul@gmail.com, Google ID: 12345"
7. Your backend finds/creates the user in YOUR database
8. Issues YOUR app's JWT (not Google's)
9. Returns YOUR token to React

Why step 5 matters: Without verifying with Google's servers, anyone could forge
a Google JWT. Never trust a token you didn't verify.
```
