# Code Review

Scope: Static review of backend and frontend code focusing on correctness, safety, and operational risks. Key files reviewed include `backend/server.js`, `backend/routes/authRoutes.js`, `backend/utils/aiServices.js`, and `frontend/src/api/axiosInstance.js`.

## Findings
1) Duplicate Mongo connections and unconditional server start (backend/server.js, lines ~202–260)  
   - `mongoose.connect` is called twice (initial connect at ~202–213, second inside `serverReady` at ~247–258) and `startServer()` is invoked unconditionally at the bottom of the file. This can open multiple Mongo connections and starts the HTTP server even when the module is imported for testing, making Jest/Supertest runs flaky and doubling skill-cache refresh.  
   - **Recommendation:** Keep a single connect block, reuse the established connection for readiness, and only call `startServer()` when `require.main === module`.

2) Registration email validation is weak (backend/routes/authRoutes.js, lines ~18–23)  
   - The main `/register` route uses `body("email").notEmpty()` instead of `.isEmail()`, so malformed addresses pass validation and can be persisted, leading to undeliverable OTPs and noisy data.  
   - **Recommendation:** Replace with `body("email").isEmail().normalizeEmail()` to enforce valid emails.

3) OTP values stored in plaintext (backend/routes/authRoutes.js, lines ~71–75 & 99–110)  
   - OTP codes are saved directly in MongoDB (`user.otp = otp`) and compared as plain strings. If the database is compromised, OTPs are exposed.  
   - **Recommendation:** Store a hashed OTP (e.g., bcrypt or HMAC), compare with constant-time checks, and avoid persisting the raw code.

4) Verbose client-side logging of auth state (frontend/src/api/axiosInstance.js, lines ~44–46)  
   - Every request logs the URL and whether a token was present to the browser console. In production this leaks operational details, increases noise, and can expose routing patterns to end users.  
   - **Recommendation:** Remove or gate these logs behind a development flag (`if (import.meta.env.DEV)`).
