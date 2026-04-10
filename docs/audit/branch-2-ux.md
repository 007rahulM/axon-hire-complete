# Branch 2 — Critical Missing UX ✅

> All items in this branch have been implemented in this PR.

---

## Issue 17: No Forgot Password / Reset Flow

**Status**: ✅ Implemented

**Why it matters**: Without a reset flow, any user who forgets their password is permanently locked out. They create a support ticket or just leave. At 10k users this is hundreds of emails per week.

### How it works (step by step):

**Step 1 — User clicks "Forgot Password"**  
Frontend sends `POST /api/auth/forgot-password` with `{ email }`.

**Step 2 — Backend generates a secure token**  
```js
const rawToken = crypto.randomBytes(32).toString("hex"); // 64-char random hex
user.resetPasswordToken = User.hashToken(rawToken);      // SHA-256 hash stored in DB
user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // Expires in 1 hour
```
The **raw token** goes in the email link. The **hash** is stored in the DB. If someone reads your DB, the hash is useless without the raw token.

**Step 3 — Email sent**  
Link format: `https://yoursite.com/reset-password/<rawToken>`

**Step 4 — User clicks link, submits new password**  
Frontend sends `POST /api/auth/reset-password/<rawToken>` with `{ password }`.  
Backend hashes the incoming raw token and finds the user where `resetPasswordToken === hash` AND `resetPasswordExpires > now`.  
Sets new hashed password. Clears token fields. Clears lockout state.

**Security notes**:
- Always return `200` even if the email doesn't exist (prevents email enumeration)
- Token expires in 1 hour
- Token can only be used once (cleared after use)
- `FRONTEND_URL` env var controls where the link points

### Frontend pages needed (not yet built — add in Branch 5):
- `/forgot-password` — email input form
- `/reset-password/:token` — new password form

---

## Issue 22: No Resend OTP

**Status**: ✅ Implemented

**Why it matters**: Gmail's spam filters flag transactional emails. Many users will miss the OTP. Without a resend button, their only option is to re-register (bad UX) or give up (bad retention).

### How it works:
- `POST /api/auth/resend-otp` with `{ email }` generates a new OTP, hashes it, saves it, and emails the raw code.
- Only works if `isVerified === false` (can't spam already-verified accounts).
- The VerifyOTP.jsx page now shows "Resend Code" button with `sending → sent` state management.

---

## Issue 8: Account Lockout

**Status**: ✅ Implemented (see Branch 1 doc for full details)

The lock is **per account** (not per IP), making it resistant to IP rotation attacks. After 5 failed logins, the account is locked for 15 minutes. The user is told how many minutes remain.

---

## Issue 4: Mount interviewRoutes

**Status**: ✅ Fixed (see Branch 1 doc)

---

## What Frontend Pages Still Need to Be Built (Branch 5)

| Page | Route | What it does |
|------|-------|--------------|
| ForgotPassword.jsx | `/forgot-password` | Email input, calls `POST /api/auth/forgot-password` |
| ResetPassword.jsx | `/reset-password/:token` | New password input, calls `POST /api/auth/reset-password/:token` |

Both backend routes are ready. Only the UI pages remain.
