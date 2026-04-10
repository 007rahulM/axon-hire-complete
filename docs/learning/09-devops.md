# 09 — DevOps: CI/CD, Docker, Monitoring

> DevOps is not a separate role — it's a set of practices every developer needs to know to ship reliably.

---

## What is CI/CD?

**CI (Continuous Integration)**: Every code change runs automated tests. You get instant feedback if you broke something.

**CD (Continuous Deployment)**: After tests pass, the code is automatically deployed to production.

```
Developer pushes code → GitHub
GitHub Actions runs automatically:
  → npm install
  → npm test (if any test fails → STOP, notify developer)
  → npm run build (if build fails → STOP, notify developer)
  → Deploy to Render/Vercel (only if all checks pass)
```

**Without CI/CD**: You push code → manually SSH in → manually restart server → hope nothing broke.  
**With CI/CD**: You push code → automated pipeline handles everything → you get an email if it fails.

---

## GitHub Actions for Axon Hire

### Create `.github/workflows/ci.yml`:
```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:        # Also runs on every PR — can't merge if tests fail

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        run: cd backend && npm ci   # 'ci' is stricter than 'install' — uses lock file exactly

      - name: Run tests
        run: cd backend && npm test
        env:
          MONGO_URI: ${{ secrets.TEST_MONGO_URI }}
          JWT_SECRET: "test-secret-for-ci"

  frontend-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build
      - run: cd frontend && npm run lint
```

### Setting up secrets in GitHub:
1. Go to repository Settings → Secrets → Actions
2. Add `TEST_MONGO_URI` (your test MongoDB connection string)
3. The CI job can now use `${{ secrets.TEST_MONGO_URI }}` without it being visible in logs

---

## Docker: Same Environment Everywhere

### Why developers say "works on my machine" without Docker:
```
Your Mac: macOS 14, Node 20.5, npm 10.2, glibc 2.38
Render server: Ubuntu 22, Node 18.12, npm 9.6, glibc 2.35
```
Different versions of the same tools behave differently.

### With Docker:
```
Dockerfile defines EXACTLY:
  - OS: Ubuntu 22.04 Alpine
  - Node: 20.9.0
  - Everything your app needs
Everyone runs the exact same container.
```

### Backend Dockerfile:
```dockerfile
# Start from official Node 20 Alpine image (small, secure)
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for layer caching)
# This layer only rebuilds if package.json changes — not on every code change
COPY package*.json ./
RUN npm ci --only=production  # Install only production deps (no devDeps)

# Copy application code
COPY . .

# Expose the port (documentation only — doesn't actually open it)
EXPOSE 5000

# Command to run when container starts
CMD ["node", "server.js"]
```

### docker-compose.yml for local development:
```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"     # host:container
    env_file: ./backend/.env
    volumes:
      - ./backend:/app  # Mount local code — changes reflect without rebuild
      - /app/node_modules  # Don't mount node_modules from host
    depends_on:
      - mongo

  mongo:
    image: mongo:7      # Official MongoDB image — no installation needed
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db  # Persist data between container restarts

volumes:
  mongo_data:
```

### Commands:
```bash
docker compose up           # Start everything
docker compose up --build   # Rebuild containers first
docker compose down         # Stop everything
docker compose logs backend # See backend logs
```

---

## Environment Variables: Three Environments

```
Development (your laptop):
  - .env file loaded by dotenv
  - MONGO_URI=mongodb://localhost:27017/axon
  - Can use test API keys

Staging (Render staging environment):
  - Set in Render dashboard
  - MONGO_URI=mongodb+srv://staging-cluster...
  - Real infrastructure, fake data

Production (Render production):
  - Set in Render dashboard
  - MONGO_URI=mongodb+srv://production-cluster...
  - Real data, real users
```

**Never use the same MongoDB for development and production.** One `db.dropCollection()` in development = production data loss.

---

## Sentry: Error Monitoring

### What you get for free:
- Every unhandled error → instant email/Slack alert
- Full stack trace (file, line number, function names)
- User context (which user triggered the error)
- Environment (production vs staging)
- Frequency (is this happening 1x or 1000x?)

### Backend setup:
```js
// npm install @sentry/node
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  // Only send errors in production to save quota
  enabled: process.env.NODE_ENV === "production",
});

// In server.js, BEFORE other middleware:
app.use(Sentry.Handlers.requestHandler());

// After routes, BEFORE global error handler:
app.use(Sentry.Handlers.errorHandler());

// Global error handler now also sends to Sentry:
app.use((err, req, res, next) => {
  // Sentry already captured it via errorHandler
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: "Internal Server Error" });
});
```

---

## Winston: Structured Logging

Axon Hire already uses Winston. Here's what good logging looks like:

```js
// ✅ Good: structured, useful context
logger.info("New application submitted", {
  applicantId: req.user.id,
  jobId: application.jobId,
  hasResume: !!application.resumeUrl
});

logger.error("AI analysis failed", {
  applicationId: application._id,
  provider: "groq",
  error: err.message,
  stack: err.stack
});

// ❌ Bad: unstructured, hard to search/filter
console.log("user applied to job " + jobId);
console.log(err);
```

**Why structured logging matters**: When you have 10,000 users and something breaks at 2am, you need to be able to search logs by `applicantId` or `jobId` to find the problem. Plain `console.log` strings are unsearchable.

---

## npm audit: Security Scanning

Run this monthly:
```bash
cd backend && npm audit
```

Sample output:
```
found 2 vulnerabilities (1 moderate, 1 high)

high    GHSA-xxxx: Prototype Pollution in lodash
        Package: lodash
        Dependency of: some-package
        Fix: npm install lodash@4.17.21
```

```bash
npm audit fix           # Fix automatically (minor/patch versions)
npm audit fix --force   # Also update major versions (TEST AFTER!)
```

---

## Uptime Monitoring with UptimeRobot (Free)

1. Go to uptimerobot.com (free tier: 50 monitors)
2. Add monitor: type = HTTP, URL = `https://your-api.render.com/`
3. Check every 5 minutes
4. Sends email when your server goes down and when it recovers

This gives you basic availability monitoring even before you set up Sentry.
