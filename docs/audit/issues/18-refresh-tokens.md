# Issue #18 — No Refresh Token Mechanism

> **Branch**: 7 (New Features & Architecture)  
> **Severity**: 🔵 Feature — users are forced to re-login every 12 hours  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*A user complaint: "I was in the middle of filling out an application form. It took me 45 minutes. When I hit Submit, I got logged out and lost everything."*

---

**🔴 Priya (PM):** "This is awful. The user spent 45 minutes on an application and got logged out mid-submit. We lost that application AND that user."

**🟠 Ben (Backend):** "The JWT expires in 12 hours. If they started at 9am and the token was issued at 8am, it expired at 8pm. By 9:45pm when they submitted — expired."

**🔵 Fay (Frontend):** "And we have no way to recover. The frontend gets a 401, shows an error, and the user loses their draft."

**🟣 Sam (Security):** "This is the access token vs refresh token problem. Short-lived access tokens are more secure (less exposure if stolen). But they force frequent re-logins. Refresh tokens let you get new access tokens silently — without the user knowing."

---

## 🔍 Understanding Access Tokens vs Refresh Tokens

### The Current Problem

```
User logs in at 8:00 AM
Access token issued: expires at 8:00 PM (12 hours)
User is filling a form at 8:01 PM...
Token expires at 8:00 PM
User submits at 8:05 PM → 401 Unauthorized → form lost
```

### Why Not Just Make the Access Token Last 30 Days?

If an access token is stolen (from a log, a compromised device, etc.), the attacker has 30 days to use it. With a 15-minute access token, they have 15 minutes.

### The Refresh Token Pattern

```
User logs in:
  → Access token: expires in 15 minutes (short)
  → Refresh token: expires in 30 days (long, stored securely)

User is using the app:
  → Every API request uses the access token
  → When access token expires (15 min), the frontend silently requests a NEW access token
    using the refresh token
  → Server verifies the refresh token → issues new access token + new refresh token
  → User never notices. The form submission succeeds.

If access token is stolen:
  → Attacker has 15 minutes
  → They can't get a new one without the refresh token (which they don't have)
```

### Where Are Tokens Stored?

This must be done alongside Issue #3 (HttpOnly cookies):

| Token | Storage | Why |
|-------|---------|-----|
| Access token | HttpOnly cookie (short-lived) | Short window if stolen |
| Refresh token | HttpOnly cookie (long-lived, separate cookie) | JS can't read it |

---

## 🛠 The Fix (to implement in Branch 7 with Issue #3)

### Step 1: Update Login to Issue Both Tokens

```js
// In authRoutes.js login/register:
const accessToken = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "15m" } // Short-lived: 15 minutes
);

const refreshToken = jwt.sign(
  { id: user._id },
  process.env.JWT_REFRESH_SECRET, // Different secret!
  { expiresIn: "30d" } // Long-lived: 30 days
);

// Store refresh token hash in DB (so we can invalidate on logout)
user.refreshToken = User.hashToken(refreshToken);
await user.save();

// Set both as HttpOnly cookies
res.cookie("token", accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 minutes
});

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: "/api/auth/refresh", // Only sent to the refresh endpoint
});

res.json({ user: { id, name, email, role } });
```

### Step 2: Add Refresh Token Field to User Model

```js
refreshToken: { type: String }, // SHA-256 hash of the current refresh token
```

### Step 3: Add `POST /api/auth/refresh` Endpoint

```js
router.post("/refresh", async (req, res) => {
  const rawRefreshToken = req.cookies?.refreshToken;
  
  if (!rawRefreshToken) {
    return res.status(401).json({ message: "No refresh token." });
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(rawRefreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user and verify stored hash matches
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== User.hashToken(rawRefreshToken)) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }
    
    // Issue NEW access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    
    // Refresh token rotation: issue a new refresh token too
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );
    
    user.refreshToken = User.hashToken(newRefreshToken);
    await user.save();
    
    res.cookie("token", newAccessToken, { httpOnly: true, sameSite: "strict", ... });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, sameSite: "strict", path: "/api/auth/refresh", ... });
    
    res.json({ message: "Token refreshed." });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token. Please log in again." });
  }
});
```

### Step 4: Frontend — Auto-Refresh in Axios Interceptor

```js
// frontend/src/utils/axiosInstance.js
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through success responses
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true; // Prevent infinite retry loop
      
      try {
        // Try to get a new access token using the refresh token
        await axiosInstance.post("/auth/refresh");
        // Retry the original request with the new access token
        return axiosInstance(error.config);
      } catch (refreshError) {
        // Refresh failed — user must log in again
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

---

## ❓ Common Questions

**Q: What is "refresh token rotation"?**  
A: Each time you use a refresh token to get a new access token, the old refresh token is invalidated and a new one is issued. This limits the damage if a refresh token is ever stolen — using the stolen one invalidates the real one, and the real user gets forced to re-login (alerting them).

**Q: The `path: "/api/auth/refresh"` on the refresh cookie — what does that do?**  
A: It restricts the browser to only send the refresh cookie to that specific URL. This limits the exposure — even if an XSS somehow reads the network requests, the refresh token is only transmitted on the one refresh endpoint.

**Q: What happens on logout?**  
A: Clear both cookies + delete `user.refreshToken` from the database. Without the stored token, even if someone has the refresh token cookie, it won't match the database hash → rejected.

**Q: Do we need `JWT_REFRESH_SECRET`?**  
A: Yes — a separate secret for refresh tokens means that even if `JWT_SECRET` is compromised, refresh tokens remain safe (and vice versa). Add `JWT_REFRESH_SECRET` to `backend/.env`.

---

## 🎓 What You Just Learned

- Short access tokens (15 min) + long refresh tokens (30 days) = security AND good UX
- Access tokens are verified locally (JWT.verify) — no DB lookup needed
- Refresh tokens are verified against a hash stored in the DB — can be revoked on logout
- Axios response interceptors intercept 401s and silently retry with a new token
- Refresh token rotation: use once, get a new one — invalidates stolen tokens
- The `path` option on cookies limits which endpoints receive the cookie
