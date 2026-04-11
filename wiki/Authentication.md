# 🔒 Authentication

This page covers all authentication mechanisms in Axon Hire — email/OTP, Google OAuth, and JWT session management.

---

## Overview

Axon Hire supports two ways to sign in:

| Method | Description |
|--------|-------------|
| **Email + Password + OTP** | Traditional registration with email verification |
| **Google OAuth** | One-click sign-in via Google account |

All authenticated sessions use **JSON Web Tokens (JWT)** with a 12-hour expiry.

---

## Email / Password Registration Flow

```
┌─────────────┐      POST /api/auth/register
│   Register   │ ──────────────────────────────▶ Validate email + password
│   Form       │                                  Hash password (bcryptjs, 10 rounds)
└─────────────┘                                   Generate 6-digit OTP
                                                  Store user (isVerified: false)
                                                  Send OTP email via Nodemailer
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │  OTP Email  │
                                                  │  (10 min    │
                                                  │  expiry)    │
                                                  └──────┬──────┘
                                                         │
                                               User enters OTP in app
                                                         │
┌─────────────┐      POST /api/auth/verify-otp           ▼
│  OTP Verify  │ ──────────────────────────────▶ Check OTP matches + not expired
│  Form        │                                  Set isVerified: true
└─────────────┘                                   Clear OTP fields
                                                  Return JWT + user object
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │  Logged In  │
                                                  │  JWT stored │
                                                  │ localStorage│
                                                  └─────────────┘
```

### OTP Details
- **Length:** 6 digits
- **Expiry:** 10 minutes from send time
- **Format:** Plain text email with the code
- **Failure:** Expired/wrong OTP returns `400 Bad Request`
- **Security:** OTP is stored hashed; brute-force protected by rate limiter (5 attempts / 15 min per IP)

---

## Google OAuth Flow

```
┌──────────────┐
│  "Sign in    │
│  with Google"│
│  button      │
└──────┬───────┘
       │ Google popup
       ▼
  Google Identity      ─────▶  Returns Google ID Token (JWT)
  Services                             │
                                       ▼
                          POST /api/auth/google
                          { token: "<google_id_token>" }
                                       │
                          Verify token with Google API
                                       │
                          ┌────────────▼──────────────┐
                          │  User exists in DB?        │
                          │  YES → return JWT          │
                          │  NO  → create account,     │
                          │        isVerified: true,   │
                          │        return JWT           │
                          └───────────────────────────┘
```

- Google OAuth users **skip OTP verification** — their email is pre-verified by Google
- If the Google email matches an existing email-registered account, the `googleId` is linked automatically
- The `VITE_GOOGLE_CLIENT_ID` env var is required in the frontend to show the Google button

---

## JWT Session Management

### Token Details

| Property | Value |
|----------|-------|
| **Algorithm** | HS256 |
| **Expiry** | 12 hours |
| **Storage** | `localStorage` (client-side) |
| **Header** | `Authorization: Bearer <token>` |

### Payload Structure

```json
{
  "id": "<user_ObjectId>",
  "role": "user",
  "iat": 1712800000,
  "exp": 1712843200
}
```

### Token Lifecycle

1. **Issued** on successful login or OTP verification
2. **Stored** in browser `localStorage` by `AuthContext.jsx`
3. **Attached** to every API request by the Axios interceptor in `axiosInstance.js`
4. **Verified** on every protected route by `authMiddleware.js`
5. **Expired** — on `401` response, the Axios interceptor clears localStorage and redirects to `/login`

---

## Role-Based Access Control

Three roles exist in the system:

| Role | Access Level |
|------|-------------|
| `user` | Browse jobs, apply, manage own profile |
| `recruiter` | All user permissions + post jobs, manage applications, view recruiter dashboard |
| `admin` | All permissions + admin dashboard, user management, skill taxonomy approval |

### Route Guards (Frontend)

| Component | File | Protects |
|-----------|------|---------|
| `ProtectedRoute` | `src/routes/ProtectedRoute.jsx` | Any authenticated route — redirects to `/login` if no token |
| `AdminRoute` | `src/routes/AdminRoute.jsx` | Admin-only routes — redirects to `/` if not admin |

### Middleware (Backend)

| Middleware | File | What it does |
|-----------|------|-------------|
| `verifyToken` | `middleware/authMiddleware.js` | Verifies JWT, attaches `req.user` with `{ id, role }` |
| `isAdmin` | `middleware/adminMiddleware.js` | Checks `req.user.role === "admin"`, returns `403` if not |

### Recruiter Onboarding

A regular `user` can be upgraded to `recruiter` in two ways:
1. Register directly via `POST /api/auth/register-recruiter` (creates company profile)
2. Upgrade existing account via `PUT /api/auth/onboard-recruiter` (shown via `RecruiterOnboardingModal`)

---

## Password Security

| Aspect | Implementation |
|--------|---------------|
| **Hashing** | bcryptjs with 10 salt rounds |
| **Storage** | Only the hash is stored — plaintext is never persisted |
| **Comparison** | `bcrypt.compare(plaintext, hash)` at login |
| **Google users** | No password stored — `password` field is `null` |
| **Minimum length** | 6 characters (enforced at schema level) |

---

## Rate Limiting

Authentication endpoints use a **strict rate limiter** separate from other API routes:

| Endpoint | Limit |
|----------|-------|
| All `/api/auth/*` routes | **5 requests per 15 minutes** per IP |

This prevents brute-force attacks on login and OTP verification.

---

## Security Checklist

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT with 12h expiry and HS256 signing
- ✅ OTP expires after 10 minutes
- ✅ Rate limiting on auth routes (5 req/15 min)
- ✅ HTTPS enforced in production (Render + Vercel)
- ✅ Helmet.js sets security HTTP headers
- ✅ CORS restricted to known origins
- ✅ No sensitive data in JWT payload (only user ID + role)
- ✅ Expired tokens automatically redirect to login
