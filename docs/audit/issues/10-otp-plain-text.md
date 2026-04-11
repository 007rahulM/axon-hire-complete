# Issue #10 — OTP Stored in Plain Text

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🟠 Security — a database leak exposes all active OTPs  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Sam is walking through a hypothetical breach scenario.*

---

**🟣 Sam (Security):** "Scenario: your MongoDB Atlas database gets compromised. Maybe a leaked `.env` file has your connection string. The attacker dumps the `users` collection. Every user who has a pending OTP — maybe they just registered — has their OTP exposed as a plain 6-digit number. The attacker can verify their own account as any of those users."

**🟠 Ben (Backend):** "But OTPs expire in 10 minutes. How fast can an attacker act on a dump?"

**🟣 Sam:** "Automated scripts can act within seconds. They see the OTP in the dump, hit the verify endpoint, and verify the account. But more importantly — the principle is the same as passwords. You NEVER store any credential in plain text. OTPs are short-lived credentials."

**🔵 Fay (Frontend):** "So we hash the OTP like we hash passwords with bcrypt?"

**🟣 Sam:** "Almost. OTPs don't need bcrypt. bcrypt is intentionally slow because passwords can be brute-forced (millions of guesses needed). An OTP is only 6 digits — there are only 900,000 possible values. An attacker with the hash can try all 900,000 in milliseconds. So we use SHA-256 instead."

**🟠 Ben:** "Why is SHA-256 better for OTPs?"

**🟣 Sam:** "Because the OTP's security isn't in the hash being slow to crack — it's in the OTP being short-lived (10 minutes) and single-use. SHA-256 is fast but deterministic — same input always gives same hash. That's all we need for comparison. And SHA-256 means the raw OTP is never in the database — even if the DB is dumped."

---

## 🔍 Understanding the Problem

### What is Hashing?

Hashing converts any input to a fixed-length fingerprint. The same input always produces the same output. But you cannot reverse the hash to get the input (one-way function).

```
SHA-256("123456") = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
SHA-256("123456") = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
SHA-256("123457") = "9f7d5e9...completely different"
```

### bcrypt vs SHA-256 — When to Use What

| | bcrypt | SHA-256 |
|--|--------|---------|
| Speed | Intentionally SLOW (100ms+) | Very fast (microseconds) |
| Purpose | Long-term passwords (brute force protection) | Short-lived tokens, OTPs |
| Salt | Built-in (random, per-hash) | You add salt manually if needed |
| Use for | User passwords | OTPs, password reset tokens, email verification tokens |

For a 6-digit OTP that expires in 10 minutes:
- bcrypt is overkill (slow) AND doesn't add security (10-minute window negates brute force advantage)
- SHA-256 is perfect: fast comparison, hides the raw value from database dumps

### What Was in the Database Before

```
// MongoDB users collection (old, insecure):
{
  "_id": "...",
  "email": "user@example.com",
  "otp": "847291",        // ← Plain text! Anyone with DB access can use this
  "otpExpires": "2024-01-15T10:00:00Z"
}
```

### What Is in the Database After

```
// MongoDB users collection (fixed):
{
  "_id": "...",
  "email": "user@example.com",
  "otp": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",  // SHA-256 hash
  "otpExpires": "2024-01-15T10:00:00Z"
}
```

The hash reveals nothing. Even knowing it was SHA-256, there are 900,000 possible 6-digit codes — you'd need to try them all, but the 10-minute expiry makes that futile.

---

## 🛠 The Fix

### Part 1: Add `hashToken` static to User model (`backend/models/User.js`)

```js
const crypto = require("crypto");

// ...after schema definition...

// Static method: hash any token/OTP with SHA-256
// Used for OTPs, password reset tokens — anything short-lived
userSchema.statics.hashToken = function (raw) {
  return crypto.createHash("sha256").update(raw).digest("hex");
};
```

### Part 2: Save the hash when generating OTP (`backend/routes/authRoutes.js`)

```js
// When creating the OTP (register, resend-otp):
const otp = crypto.randomInt(100000, 999999).toString();

// OLD (bad): store plain text
// user.otp = otp;

// NEW (fixed): store hash
user.otp = User.hashToken(otp); // Store hash
user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

await user.save();

// Email the PLAIN OTP to the user (never the hash)
await sendOtpEmail(user.email, otp);
```

### Part 3: Verify by comparing hashes (`backend/routes/authRoutes.js`)

```js
// When verifying the OTP:
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found." });

  // Check expiry first
  if (!user.otpExpires || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "OTP has expired. Request a new one." });
  }

  // Compare: hash the input and compare with stored hash
  const hashedInput = User.hashToken(otp);
  
  if (hashedInput !== user.otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  // OTP verified — clear it (single use!)
  user.otp = undefined;
  user.otpExpires = undefined;
  user.isVerified = true;
  await user.save();

  res.json({ message: "Email verified successfully." });
});
```

The same pattern applies to password reset tokens — see Issue #17.

---

## ❓ Common Questions

**Q: Why `crypto.randomInt` and not `Math.random()` for generating the OTP?**  
A: `Math.random()` is NOT cryptographically secure. It's predictable if you know the algorithm state. `crypto.randomInt(min, max)` uses your OS's cryptographically secure random number generator — unpredictable even to an attacker who knows your code.

**Q: Should we add a salt to the SHA-256 hash?**  
A: For OTPs, no. Salting is important for passwords because attackers can precompute "rainbow tables" of common password hashes. OTPs are time-limited and random — there's no benefit to precomputing their hashes. Salting would add complexity for no security gain here.

**Q: What about the password reset token (Issue #17)?**  
A: Same pattern. The reset token is generated with `crypto.randomBytes(32).toString('hex')` (a 64-char random string), then stored as `crypto.createHash('sha256').update(token).digest('hex')`. The raw token is emailed; only the hash is in the DB.

**Q: What does "single use" mean and how is it enforced?**  
A: After the OTP is verified, we clear it: `user.otp = undefined; user.otpExpires = undefined;`. So even if an attacker dumps the DB AFTER the OTP was used, the hash is gone. The OTP can never be used again.

**Q: Why not use bcrypt even though it's slower?**  
A: Because bcrypt adds seconds of delay on EVERY OTP verification, which degrades UX. And it provides no additional security here — the time-limited nature of OTPs (10 minutes) is what prevents brute force, not hash speed.

---

## 🎓 What You Just Learned

- Never store credentials (passwords, OTPs, tokens) in plain text in the database
- OTPs need SHA-256 (fast), not bcrypt (slow) — the security comes from time limits, not hash strength
- Always email the PLAIN value, store the HASH — you can reconstruct the hash to verify, but not the original
- `crypto.randomInt` is cryptographically secure; `Math.random()` is NOT
- Single-use: clear the OTP from the database after it's verified
- The `hashToken` static method on the User model is reusable for OTPs and reset tokens
