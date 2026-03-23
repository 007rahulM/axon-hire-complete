# Code Review (Full Codebase)

Scope: Static review across backend (`server.js`, routes, middleware, utils, models, tests) and frontend (`src/api`, guards, pages). Focus is on correctness, security, operational risk, and developer experience. References use repo paths.

## Critical
1) Duplicate Mongo connections and import-time side effects (backend/server.js, lines ~202–260)  
   - `mongoose.connect` runs twice (initial connect and a second inside `serverReady`), and both execute on module import. This opens multiple DB connections, refreshes the skill cache twice, and creates unwanted side effects in Jest/Supertest where simply importing the app should not hit a real DB. HTTP server does not start on import because `app.listen` is guarded, but DB connections still do.  
   - **Recommendation:** Collapse to a single connection initializer, export an async `init()` used by `startServer` (only under `require.main === module`) and by tests, and ensure skill cache refresh is invoked once.

2) Authorization header broken in axios client (frontend/src/api/axiosInstance.js, line ~49)  
   - `config.headers.Authorization = \`******;` is malformed (unterminated template literal) so the token is never attached; requests will fail once lint/build runs or at runtime in browsers.  
   - **Recommendation:** Fix to `config.headers.Authorization = \`Bearer ${token}\`;` (or restore the intended value).

3) OTP stored in plaintext (backend/routes/authRoutes.js, lines ~71–75 & 99–110)  
   - OTP codes are persisted directly and compared as raw strings. A DB leak exposes active OTPs.  
   - **Recommendation:** Store hashed OTPs (bcrypt/HMAC), compare with constant-time checks, and drop the plaintext immediately.

## High
4) Email validation too weak on registration (backend/routes/authRoutes.js, lines ~18–23)  
   - Uses `notEmpty()` instead of `isEmail()`, allowing malformed addresses and causing OTP delivery failures.  
   - **Recommendation:** Use `isEmail().normalizeEmail()` on both user and recruiter registration routes.

5) Import-time DB usage complicates tests (backend/server.js, routes)  
   - Because DB connects on import, test environments need live credentials, slowing and flaking tests.  
   - **Recommendation:** Gate connection/bootstrap behind an explicit call (e.g., `init()`), and let tests inject in-memory Mongo or mock connections.

6) AI key absence not surfaced (backend/utils/aiServices.js)  
   - When no AI keys are set, routes may still be callable and only log a warning, resulting in user-facing failures later.  
   - **Recommendation:** Fail fast with 503/400 when required providers are missing, or feature-flag AI endpoints.

7) Rate limiting applied selectively (backend/server.js)  
   - Limits are applied to some routes but not auth token refresh or health paths; global limiter is commented out.  
   - **Recommendation:** Enable a modest global limiter and keep stricter auth limiter; ensure health/static routes are exempted as needed.

## Medium
8) “From” address may be undefined (backend/utils/emailService.js, backend/routes/jobRoutes.js)  
   - Uses `process.env.EMAIL_FROM || EMAIL_USER`; if neither is set, nodemailer still attempts send, producing runtime errors. Job alerts reference `EMAIL_FROM` without fallback.  
   - **Recommendation:** Validate required mail env at startup; default to `EMAIL_USER` explicitly and hard-fail if neither present.

9) CORS allowlist is narrow and hardcoded (backend/server.js)  
   - Only specific origins are permitted; missing production/custom domains will break clients.  
   - **Recommendation:** Move allowed origins to env/config and include a safe pattern for staging domains.

10) Verbose client logging leaks routes (frontend/src/api/axiosInstance.js, lines ~44–46)  
    - Logs every URL and token presence to console in production.  
    - **Recommendation:** Guard logs with `if (import.meta.env.DEV)` or remove.

11) Missing size/type limits on uploads (backend/middleware/uploadMiddleware.js)  
    - Cloudinary storage is configured but there’s no explicit file size/type validation, increasing risk of large uploads.  
    - **Recommendation:** Add multer limits (`fileSize`, `fileFilter`) and validate MIME types.

12) Password field optional in User model (backend/models/User.js)  
    - `password` is `required: false`, relying on route logic to populate. If future code paths create users without passwords, login may behave unpredictably.  
    - **Recommendation:** Enforce required password except for OAuth users; consider a discriminator or validation hook.

13) Error handling consistency (backend/server.js, routes)  
    - Some routes `console.log` errors instead of using the logger; global error handler returns generic 500 without correlation IDs.  
    - **Recommendation:** Standardize logger usage and return structured errors; include request IDs for tracing.

14) AI analysis side effects during request (backend/routes/aiRoutes.js)  
    - Learning loop writes to `Skill` and refreshes cache during request handling; failures are swallowed. This can slow API responses and hide data issues.  
    - **Recommendation:** Offload learning loop to background jobs or handle errors explicitly with retries/alerts.

15) Tests not runnable without local Mongo/Redis (backend/tests)  
    - Jest preset uses @shelf/jest-mongodb but repository lacks seeded data and relies on real connection setup in app code.  
    - **Recommendation:** Ensure tests import app without triggering real DB connects (see Critical #1/#5) and provide fixtures/seeding for isolated runs.

## Low / DX
16) Commented legacy code and large blocks (backend/routes/aiRoutes.js)  
    - Numerous commented sections obscure active logic.  
    - **Recommendation:** Trim or move to docs to reduce cognitive load.

17) Console logs in production build (frontend, multiple files)  
    - Widespread `console.log` in axios interceptors and pages; should be removed or gated.

18) Env documentation gaps  
    - `EMAIL_FROM` optionality and per-service AI keys are not clearly documented in code; report.md now documents it, but consider README alignment and runtime validation.

## Quick Wins to Prioritize
- Fix axios Authorization header (Critical #2).
- Harden OTP storage and email validation (Critical #3, High #4).
- Remove duplicate Mongo connects and gate bootstrapping for tests (Critical #1/#5).
- Add upload limits and tighten CORS/rate limiting (Medium #9/#11).
