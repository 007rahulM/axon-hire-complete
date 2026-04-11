# Branch 6 — Developer Experience & Infrastructure

> These changes are NOT yet implemented. This document is the implementation guide.

---

## Issue 25: Sentry Error Monitoring

**Why**: Right now when your server throws an unhandled error, it gets logged by Winston. That's it. You won't know unless you're watching the logs. Sentry sends you an email/Slack message the moment an error happens, with the full stack trace and the user's context.

**Setup (free tier — 5,000 errors/month)**:
```bash
cd backend && npm install @sentry/node
cd frontend && npm install @sentry/react
```

**backend/server.js**:
```js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
// Add before other middleware:
app.use(Sentry.Handlers.requestHandler());
// Add before the global error handler:
app.use(Sentry.Handlers.errorHandler());
```

**frontend/main.jsx**:
```js
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: process.env.VITE_SENTRY_DSN });
```

---

## Issue 26: PostHog Analytics

**Why**: You need to know: which jobs get the most views, where users drop off, what the apply conversion rate is. Without this you're building blind.

**Setup (free tier — generous)**:
```bash
cd frontend && npm install posthog-js
```

**frontend/main.jsx**:
```js
import posthog from "posthog-js";
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: "https://app.posthog.com",
});
```

**Track key events**:
```js
posthog.capture("job_viewed", { jobId: job._id, company: job.company });
posthog.capture("application_started", { jobId });
posthog.capture("application_submitted", { jobId });
```

---

## Issue 40: Swagger API Documentation

**Packages**: `swagger-jsdoc` + `swagger-ui-express`

```bash
npm install swagger-jsdoc swagger-ui-express
```

**Add JSDoc comments to routes**:
```js
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", async (req, res) => { ... });
```

**In server.js**:
```js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const specs = swaggerJsdoc({
  definition: { openapi: "3.0.0", info: { title: "Axon Hire API", version: "1.0.0" } },
  apis: ["./routes/*.js"],
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
```

Docs available at: `http://localhost:5000/api/docs`

---

## Issue 42: GitHub Actions CI/CD

Create `.github/workflows/ci.yml`:
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd backend && npm ci
      - run: cd backend && npm test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
      - run: cd frontend && npm run lint
```

---

## Issue 43: Environment Variable Validation with Zod

**Package**: `zod`

```bash
npm install zod
```

**Create backend/utils/env.js**:
```js
const { z } = require("zod");

const envSchema = z.object({
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),
  FRONTEND_URL: z.string().url(),
  PORT: z.string().default("5000"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1); // Hard stop — don't start with missing config
}

module.exports = parsed.data;
```

**In server.js** (first line after dotenv):
```js
require("./utils/env"); // Validates all env vars on startup
```

---

## Issue 38: Delete Dead Code

Files with dead commented-out code:
- `backend/utils/aiServices.js` — ~160 lines of commented old AI providers
- `backend/utils/matchingEngine.js` — ~75 lines of old matching logic  
- `frontend/src/pages/RecruiterDashboard.jsx` — hundreds of commented lines at the top
- `backend/routes/authRoutes.js` — large commented-out recruiter registration block
- `backend/routes/jobRoutes.js` — entire old router implementation commented out at the top

**How to delete safely**:
```bash
git log --oneline backend/utils/aiServices.js  # See old versions
git show <commit>:backend/utils/aiServices.js   # Recover any version
```
Git history preserves everything. Delete commented code without fear.

---

## Issue 44: Cold Starts on Render Free Tier

**Problem**: Render free tier spins down after 15 minutes of inactivity. The next request waits up to 50 seconds for the server to wake up.

**Fix options** (in order of recommendation):
1. **Railway.app** — free $5 credit/month, no cold starts, better DX than Render
2. **Fly.io** — free tier, containers, no cold starts, global edge
3. **Render Starter** — $7/month, same Render UX, no cold starts

**Workaround (free, not ideal)**: Use an uptime monitor (UptimeRobot, free) to ping `https://your-api.render.com/` every 14 minutes. Keeps the server alive. Render may detect this and still sleep it — not reliable.

---

## Issue 39: TypeScript Migration Plan

**Don't migrate everything at once.** Start here:

1. **Models** — Add TypeScript interfaces for User, Job, Application:
```ts
interface IUser {
  _id: string;
  email: string;
  role: "user" | "recruiter" | "admin";
  resumeUrl: string | null;
}
```

2. **API response types** — Define what each route returns. Share types between frontend and backend via a `packages/types` folder (monorepo pattern).

3. **Utility functions** — `matchingEngine.js`, `scoring.js`, `resumeParser.js` — these are pure functions that are easy to type.

4. Leave route handlers for last (complex Express + Mongoose types).
