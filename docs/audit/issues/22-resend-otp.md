# Issue #22 — No Resend OTP

> **Branch**: 2 (Critical Missing UX)  
> **Severity**: 🔵 Feature — users whose OTP expired have no way to get a new one  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*A user's OTP email arrived in spam 12 minutes after registration. The 10-minute window passed.*

---

**🔴 Priya (PM):** "OTP expired. There's no 'Resend OTP' button. They're stuck."

**🟠 Ben (Backend):** "The resend flow is almost identical to registration — generate a new OTP, hash it, save it, email it. The only difference is we don't create a new user."

**🔵 Fay (Frontend):** "I'll add a 'Resend Code' button on the VerifyOTP page with a 60-second cooldown."

---

## 🛠 What Was Implemented

### Backend: `POST /api/auth/resend-otp`

```js
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found." });
  if (user.isVerified) {
    return res.status(400).json({ message: "Account already verified. Please log in." });
  }

  // Rate limit: don't allow resend if OTP was issued less than 60 seconds ago
  const cooldownExpiry = user.otpExpires ? user.otpExpires - (10 * 60 * 1000) + 60000 : 0;
  if (Date.now() < cooldownExpiry) {
    const secondsLeft = Math.ceil((cooldownExpiry - Date.now()) / 1000);
    return res.status(429).json({ message: `Please wait ${secondsLeft} seconds before requesting a new code.` });
  }

  // Generate new OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = User.hashToken(otp);
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  
  await user.save();
  await sendOtpEmail(email, otp);
  
  res.status(200).json({ message: "New OTP sent to your email." });
});
```

### Frontend: Resend Button with Cooldown

```jsx
// frontend/src/pages/VerifyOTP.jsx
const [cooldown, setCooldown] = useState(0);

const handleResend = async () => {
  await axios.post("/api/auth/resend-otp", { email });
  setCooldown(60); // 60-second countdown
};

// Countdown timer:
useEffect(() => {
  if (cooldown <= 0) return;
  const timer = setInterval(() => setCooldown(c => c - 1), 1000);
  return () => clearInterval(timer);
}, [cooldown]);

// Button:
<button
  onClick={handleResend}
  disabled={cooldown > 0}
  className={cooldown > 0 ? "btn-disabled" : "btn-link"}
>
  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
</button>
```

---

## 🎓 What You Learned

- Resend OTP = same logic as initial OTP generation, minus user creation
- Always rate-limit resend to prevent email flooding (60-second minimum between requests)
- Frontend cooldown gives users clear feedback instead of confusing "too many requests" errors
- Always check `isVerified` before allowing resend — prevent re-activating already-verified accounts
