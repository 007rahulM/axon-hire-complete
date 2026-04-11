# 🚨 Sentry — Error Monitoring Setup Guide

> **What this gives you**: The moment your backend crashes or throws an error in production, you get an email (and optional Slack message) with the full stack trace, which user triggered it, and how many times it happened — without looking at logs.

---

## 👥 The Team Talks

**🔴 Priya (PM):** "How do we know if something breaks in production right now?"

**🟠 Ben (Backend):** "...We don't. Unless a user emails us. Or we happen to be watching the Render logs at that exact moment."

**🔴 Priya:** "That's not okay. At 10,000 users, things WILL break. We need to know before users tell us."

**🟡 Dev (DevOps):** "That's exactly what Sentry does. It's error monitoring — every unhandled exception in your backend or frontend is captured, stored, and you get an alert. The free tier handles 5,000 errors/month which is plenty. Setup takes 15 minutes."

---

## Part 1: Create a Sentry Account

### Step 1.1: Go to Sentry

Open your browser and go to: **https://sentry.io**

### Step 1.2: Sign Up

Click **"Get Started"** or **"Sign Up"**.

Options:
- Sign up with GitHub (fastest — do this)
- Sign up with email

### Step 1.3: Create Your Organization

Sentry will ask:
- **Organization name**: Type `axon-hire` (or your name — it's just a label)
- Click **"Create Organization"**

---

## Part 2: Create Two Projects (Backend + Frontend)

You'll create one Sentry project for the backend (Node.js) and one for the frontend (React).

### Step 2.1: Create the Backend Project

1. After creating the org, you'll see "Create your first project"
2. Select **Node.js** from the list of platforms (you'll see logos — scroll or search)
3. **Project name**: `axon-hire-backend`
4. **Alert frequency**: "Alert me on every new issue" (keep this default)
5. Click **"Create Project"**

### Step 2.2: Get the Backend DSN

After creating the project, Sentry shows you a quick setup page. Look for this line:

```
Sentry.init({ dsn: "https://abc123xyz@o12345.ingest.sentry.io/67890" });
```

That long URL starting with `https://` and ending with numbers is your **DSN** (Data Source Name). Copy it.

> 💡 If you ever lose it: go to your Sentry project → Settings → Client Keys (DSN)

### Step 2.3: Create the Frontend Project

1. In Sentry dashboard, click **"Projects"** in the left sidebar
2. Click **"Create Project"**
3. Select **React**
4. **Project name**: `axon-hire-frontend`
5. Click **"Create Project"**
6. Copy the **DSN** for this project too

---

## Part 3: Add DSNs to Your `.env` File

Open `backend/.env`:
```bash
SENTRY_DSN=https://abc123xyz@o12345.ingest.sentry.io/67890
```

Open `frontend/.env` (or `frontend/.env.local`):
```bash
VITE_SENTRY_DSN=https://def456uvw@o12345.ingest.sentry.io/67891
```

Note the `VITE_` prefix — Vite (the React build tool) only passes env vars to the browser if they start with `VITE_`.

**Also add to Render/Vercel**:
- Render: Dashboard → Your Service → Environment
- Vercel: Dashboard → Your Project → Settings → Environment Variables

---

## Part 4: Install the Packages

```bash
# Backend
cd backend && npm install @sentry/node

# Frontend
cd ../frontend && npm install @sentry/react
```

---

## Part 5: Add to Backend (`backend/server.js`)

Add at the **very top** of `server.js`, BEFORE any other imports:

```js
const Sentry = require("@sentry/node");

// Initialize Sentry first — before Express, before anything
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  // Only capture errors in production to preserve your free quota
  enabled: process.env.NODE_ENV === "production",
  // Capture performance data for 10% of requests
  tracesSampleRate: 0.1,
});
```

Then, AFTER creating `const app = express()` but BEFORE your routes:

```js
// Sentry request handler — must be first middleware
app.use(Sentry.Handlers.requestHandler());
```

Then, AFTER all your routes but BEFORE your global error handler:

```js
// Sentry error handler — must be before your own error handler
app.use(Sentry.Handlers.errorHandler());

// Your global error handler (already exists):
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: "Internal Server Error" });
});
```

---

## Part 6: Add to Frontend (`frontend/src/main.jsx`)

```jsx
import * as Sentry from "@sentry/react";

// Initialize before React renders anything
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE, // "development" or "production"
  enabled: import.meta.env.MODE === "production",
  tracesSampleRate: 0.1,
  // Capture React component errors
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
});

// Then the rest of your main.jsx:
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// etc.
```

---

## Part 7: Test It Works

Add this temporary test route (remove after testing):

```js
// Temporary test — delete after confirming Sentry works
app.get("/api/sentry-test", () => {
  throw new Error("Sentry test error — delete this route");
});
```

Visit `http://localhost:5000/api/sentry-test` in your browser.

Then go to **https://sentry.io** → your backend project → **Issues**.

You should see a new issue appear within about 30 seconds. If you do, Sentry is working. Delete the test route.

---

## Part 8: Understanding What You'll See in Sentry

When a real error happens in production, you'll see:

- **Error message**: `TypeError: Cannot read properties of null (reading 'email')`
- **Stack trace**: Exactly which file and line threw the error
- **User context**: Which user ID was making the request when it happened
- **Breadcrumbs**: The 20 most recent events before the error (API calls, state changes)
- **Environment**: Production vs staging
- **Count**: How many times this error has happened in the last 24h

You'll also get an **email** when a new type of error appears. You can configure Slack notifications in Settings → Integrations.

---

## What You Learned

- Without monitoring, you're building blind in production
- Sentry captures errors automatically — you don't need to manually log them
- The DSN is the connection string from Sentry to your app — keep it private
- `enabled: process.env.NODE_ENV === "production"` saves your free quota (don't capture dev errors)
- The order matters: Sentry.requestHandler BEFORE routes, Sentry.errorHandler BEFORE your own error handler
