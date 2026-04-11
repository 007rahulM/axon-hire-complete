# Issue #8 — No Account Lockout After Failed Logins

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🟠 Security — credential stuffing attacks can try unlimited passwords per account  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Sam is explaining why IP-based rate limiting alone is not enough.*

---

**🟣 Sam (Security):** "Ben, we have a rate limiter: 100 requests per 15 minutes per IP. What stops an attacker from buying 100 cloud servers, each with a different IP, and trying 100 passwords per server against the same account?"

**🟠 Ben (Backend):** "...nothing. They could try 10,000 passwords in 15 minutes."

**🟣 Sam:** "Against someone's account. Not random accounts — a targeted attack. They know the email from LinkedIn. They try the 10,000 most common passwords. Without account lockout, they'll eventually find the right one."

**🔴 Priya (PM):** "This is called credential stuffing?"

**🟣 Sam:** "Credential stuffing is when attackers use email/password pairs from previous data breaches — like the RockYou 2021 leak which had 8 billion entries. 50% of people reuse passwords. An attacker runs those pairs against your login endpoint. IP rate limiting doesn't stop this if they have many IPs."

**🟠 Ben:** "Account lockout stops it because no matter how many IPs they use, after 5 failed attempts the account is locked."

**🟣 Sam:** "Exactly. The account is the chokepoint, not the IP."

---

## 🔍 Understanding the Problem

### What is Credential Stuffing?

1. Attacker downloads a database leak (e.g., from a gaming site breach) containing millions of email:password pairs
2. Many users reuse passwords across sites
3. Attacker runs all those pairs against your login endpoint using automated tools
4. Some percentage log in successfully (typically 1-3%)

### What is Account Lockout?

After N failed login attempts for a specific account, lock that account for M minutes. The account-based lock works regardless of:
- How many different IPs the attacker uses
- How long they wait between attempts

### The Tradeoff

Account lockout can be abused: an attacker who knows your email can lock your account (lock you out of your own app) by repeatedly failing logins. This is a "denial of service" against specific users.

The balance: **lock for 15 minutes, not permanently**. The attacker can try again in 15 minutes, but real users can also get back in. For most apps this is the right tradeoff.

---

## 🛠 The Fix

The fix has two parts: the User model (fields) and the login route (logic).

### Part 1: User Model Fields (`backend/models/User.js`)

These fields were added:

```js
// Account lockout fields
loginAttempts: { type: Number, default: 0 },
lockUntil: { type: Date },
```

A static method was also added to centralize the constants:

```js
// Statics: constants the whole app can use
userSchema.statics.MAX_LOGIN_ATTEMPTS = 5;
userSchema.statics.LOCK_DURATION = 15 * 60 * 1000; // 15 minutes in ms
```

### Part 2: Login Route Logic (`backend/routes/authRoutes.js`)

The login handler now has this flow:

```js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials." });

  // Step 1: Is the account currently locked?
  const isLocked = user.lockUntil && user.lockUntil > Date.now();
  if (isLocked) {
    const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
    return res.status(423).json({ 
      message: `Account locked. Try again in ${minutesLeft} minute(s).` 
    });
  }

  // Step 2: Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    // Step 3a: Increment failed attempt counter
    user.loginAttempts += 1;
    
    if (user.loginAttempts >= User.MAX_LOGIN_ATTEMPTS) {
      // Step 3b: Lock the account
      user.lockUntil = new Date(Date.now() + User.LOCK_DURATION);
      await user.save();
      return res.status(423).json({ 
        message: "Too many failed attempts. Account locked for 15 minutes." 
      });
    }
    
    await user.save();
    return res.status(400).json({ 
      message: `Invalid credentials. ${User.MAX_LOGIN_ATTEMPTS - user.loginAttempts} attempts remaining.` 
    });
  }

  // Step 4: Success — reset the counters
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  // Continue to JWT generation...
});
```

---

## ❓ Common Questions

**Q: The error message says "X attempts remaining" — is that a good idea?**  
A: Controversial. Telling users how many attempts they have left:
- ✅ Better UX for real users who mistype their password
- ❌ Tells attackers exactly when to back off and try from a different vector

A common compromise: don't show remaining count. Just say "Invalid credentials." and send a lockout warning email to the real user when X attempts are detected.

**Q: What HTTP status code should a locked account return?**  
A: `423 Locked` is the most semantically correct. Some APIs use `429 Too Many Requests`. Both are acceptable. The key is not to return `401 Unauthorized` (which implies the credentials are wrong) — the credentials might be correct, the account is just locked.

**Q: What if the user legitimately forgot their password and keeps trying?**  
A: They'll get locked. The solution: display the lockout message AND a link to "Forgot Password?" — which bypasses the lockout via email verification. Legitimate users can always recover via email.

**Q: Should the lockout counter reset after the lock expires?**  
A: Yes. The current implementation resets on successful login. But you should also reset when the lock period expires:

```js
// In the login check:
const lockExpired = user.lockUntil && user.lockUntil <= Date.now();
if (lockExpired) {
  // Reset after the lock period has passed (even without successful login)
  user.loginAttempts = 0;
  user.lockUntil = undefined;
}
```

**Q: What about the admin account? It could be targeted for denial-of-service.**  
A: Admin accounts should have additional protection: mandatory 2FA, IP allowlisting (only allow login from specific IPs), and alerts sent to a secondary email when lockout is triggered.

---

## 🎓 What You Just Learned

- IP rate limiting and account lockout solve different problems — you need both
- Credential stuffing uses known email/password pairs from data breaches, not brute force
- Account lockout stops the attack at the account level regardless of how many IPs the attacker uses
- The tradeoff: attackers can lock out real users by intentionally failing logins → use time-limited locks (15 min)
- HTTP 423 = Locked (more specific than 429 for this case)
- Always offer a path for locked users: "Forgot Password?" email flow
