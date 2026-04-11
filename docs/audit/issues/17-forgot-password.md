# Issue #17 — No Forgot Password Flow

> **Branch**: 2 (Critical Missing UX)  
> **Severity**: 🔵 Feature — locked-out users have no recovery path  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Priya is playing the role of a job seeker who forgot their password.*

---

**🔴 Priya (PM):** "I forgot my password. I click 'Forgot Password' on the login page. What happens?"

**🟠 Ben (Backend):** "Before the fix? Nothing. There was no forgot password page. No route. The button either didn't exist or linked to nothing."

**🔴 Priya:** "So a user who forgets their password... is just locked out forever?"

**🟠 Ben:** "Yes. They'd have to contact support. Which we don't have."

**🔴 Priya:** "This is a P0 for me. Password reset is basic account hygiene. We lose every user who forgets their password."

**🟡 Dev (DevOps):** "It's also a support burden as you scale. At 10,000 users, even 1% forgetting their password per month is 100 support emails. With a self-service reset flow, that's 0 emails."

---

## 🔍 How a Secure Password Reset Flow Works

### The Problem with Naive Resets

Bad approach (don't do this):
```
User enters email → Server sets password to "NewPassword123" and emails it
```
Problems: The email contains a plain-text password. Email is unencrypted in transit. Anyone who intercepts the email can log in. The user has to change the password after logging in anyway.

### The Secure Token-Based Flow

```
1. User enters email on "Forgot Password" page
2. Server generates a cryptographically random token (unpredictable)
3. Server stores SHA-256 hash of token in the database (never the raw token)
4. Server emails the raw token as part of a reset URL
5. User clicks the link in email → reaches the "Reset Password" page
6. User enters new password
7. Server hashes the token from the URL, looks up in DB
8. If found and not expired: update password, delete token
```

The token is valid for 1 hour and can only be used once.

---

## 🛠 What Was Implemented

### New Fields Added to `backend/models/User.js`

```js
// Password reset fields
resetPasswordToken: { type: String }, // SHA-256 hash of the reset token
resetPasswordExpires: { type: Date }, // 1 hour from when it was issued
```

### Step 1: `POST /api/auth/forgot-password`

```js
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  
  // ALWAYS return 200 — don't reveal if the email exists
  // (prevents email enumeration attacks)
  if (!user) {
    return res.status(200).json({ 
      message: "If that email exists, a reset link has been sent." 
    });
  }

  // Generate secure random token (32 bytes = 64 hex chars)
  const rawToken = crypto.randomBytes(32).toString("hex");
  
  // Store hash (never the raw token)
  user.resetPasswordToken = User.hashToken(rawToken);
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  
  await user.save();
  
  // Build reset URL (frontend page)
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;
  
  // Send email with the raw token in the URL
  await sendPasswordResetEmail(user.email, resetUrl);
  
  res.status(200).json({ 
    message: "If that email exists, a reset link has been sent." 
  });
});
```

**Why always return 200?** If you return 404 when an email doesn't exist, an attacker can enumerate which emails are registered ("Is user@example.com in your database?"). Always return the same message regardless of whether the email exists.

### Step 2: `POST /api/auth/reset-password/:token`

```js
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }
  
  // Hash the token from the URL to compare with stored hash
  const hashedToken = User.hashToken(token);
  
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }, // Not expired
  });
  
  if (!user) {
    return res.status(400).json({ 
      message: "Invalid or expired reset token. Please request a new one." 
    });
  }
  
  // Update password
  user.password = await bcrypt.hash(password, 10);
  
  // Clear reset token (single use)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  // Also reset login attempts (user was probably locked out)
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  
  await user.save();
  
  res.status(200).json({ message: "Password reset successful. Please log in." });
});
```

### Frontend: Two New Pages

**`frontend/src/pages/ForgotPassword.jsx`**:
```jsx
// Form: email input + "Send Reset Link" button
// On submit: POST /api/auth/forgot-password
// On success: "Check your email" message
```

**`frontend/src/pages/ResetPassword.jsx`**:
```jsx
// Gets token from URL: const { token } = useParams()
// Form: new password + confirm password
// On submit: POST /api/auth/reset-password/:token
// On success: redirect to /login
```

---

## ❓ Common Questions

**Q: What if the reset email goes to spam?**  
A: Common with free SMTP providers. Use a transactional email service (SendGrid, Mailgun, Resend) which have good sender reputation. Also: tell users to check spam if they don't see the email within 2 minutes.

**Q: Can someone request password resets repeatedly to lock a user out?**  
A: The reset token gets overwritten on each request — the old link becomes invalid. The user gets the new link. There's no "lockout" from password reset requests because we don't block login — we only change the DB token. Rate-limit the forgot-password endpoint (max 3 requests per email per hour) to prevent email spam:
```js
const forgotPasswordLimiter = rateLimit({ max: 3, windowMs: 60 * 60 * 1000 });
router.post("/forgot-password", forgotPasswordLimiter, async (req, res) => { ... });
```

**Q: Why 1 hour expiry?**  
A: Short enough that a leaked token is useless after a short window. Long enough for someone to check their email and act. 15 minutes is common for high-security apps; 24 hours is common for consumer apps. 1 hour is a good balance.

**Q: What is email enumeration?**  
A: An attacker sends requests to check if emails are registered: `POST /api/auth/forgot-password { "email": "victim@gmail.com" }`. If the server returns 404 for non-existent emails and 200 for existing ones, the attacker knows which emails are registered in your system. Always return the same response.

---

## 🎓 What You Just Learned

- Every app needs a password reset flow before launch — it's not optional
- The secure pattern: generate random token → store hash → email raw token → verify by hashing URL token
- Always return the same response for "email found" and "email not found" (prevents enumeration)
- Reset tokens must be single-use (delete after use) and time-limited (expire after 1 hour)
- Also reset login attempt counters on successful password reset (the user was likely locked out)
