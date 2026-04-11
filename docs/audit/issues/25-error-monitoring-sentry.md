# Issue #25 — No Error Monitoring (Sentry)

> **Branch**: 6 (Developer Experience & Observability)  
> **Severity**: 🔵 Feature — you find out about production errors only when users complain  
> **Status**: Branch 6 (pending)

---

## 👥 The Team Room

*A user emails: "I tried to apply for a job and got a blank error. Please help."*

---

**🔴 Priya (PM):** "Ben, a user got an error on the apply button. Can you look into it?"

**🟠 Ben (Backend):** "I'll check the Render logs... *scrolling through thousands of lines of output* ...I'm not sure which error it is. Do you know what time they experienced it?"

**🔴 Priya:** "The email is from yesterday evening, no specific time."

**🟠 Ben:** "I'm looking for anything that could match... this could take an hour. And even if I find it, I won't have the user's browser, their request payload, or a stack trace."

**🟡 Dev (DevOps):** "This is exactly why we need Sentry. Every error that happens — frontend crash, backend exception — Sentry captures it with: full stack trace, the exact user's session, browser, operating system, request payload, and the sequence of actions that led to the error."

**🟠 Ben:** "How long does it take to set up?"

**🟡 Dev:** "30 minutes including the Sentry account setup. Then errors appear in a dashboard in real time."

---

## 🔍 What Sentry Captures

### Without Sentry

```
User: "I got an error"
You: "When? What browser? What were you doing? Can you reproduce it?"
User: (doesn't respond)
You: (gives up, bug stays in production)
```

### With Sentry

Every error automatically captures:
- Full stack trace with file names and line numbers
- User ID, email, and role (who was affected)
- Browser + OS + screen size
- Request URL, method, status code
- The last 10 actions the user took before the error (breadcrumbs)
- Custom context you add (e.g., job ID being applied to)

---

## 🛠 The Fix

### Manual Setup First — Create a Sentry Account

**Follow the complete manual steps in:**  
**→ [`docs/setup/03-sentry.md`](../../setup/03-sentry.md)**

That guide covers:
1. Go to https://sentry.io → Sign up (free tier: 5,000 errors/month)
2. Create Organization → click **Create Project**
3. Choose **Node.js** platform → give it a name (e.g., "axon-hire-backend")
4. Copy the **DSN** URL (looks like: `https://abc123@o456.ingest.sentry.io/789`)
5. Create a second project for **React** → copy its DSN
6. Add both DSNs to your `.env` files

### Backend Integration (`backend/server.js`)

```bash
cd backend && npm install @sentry/node @sentry/profiling-node
```

```js
// MUST be the FIRST import in server.js — before any routes
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  
  // Send 100% of errors in production
  // Reduce in high-traffic environments
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  
  // Add user context to errors
  beforeSend(event) {
    // Remove sensitive data before sending to Sentry
    if (event.request?.headers?.authorization) {
      delete event.request.headers.authorization;
    }
    return event;
  },
});

// Add user context when you have it:
// (Call this after your auth middleware resolves the user)
Sentry.setUser({ id: req.user?.id, role: req.user?.role });
```

Add after all routes but before your error handler:
```js
// IMPORTANT: This must come after all routes and BEFORE your error handler
Sentry.setupExpressErrorHandler(app);

// Your existing error handler:
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong." });
});
```

Add `SENTRY_DSN=https://...` to `backend/.env`.

### Frontend Integration (`frontend/src/main.jsx`)

```bash
cd frontend && npm install @sentry/react
```

```jsx
// frontend/src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      // Record sessions on errors (great for debugging)
      maskAllText: false,     // Show text in replays
      blockAllMedia: false,
    }),
  ],
  
  tracesSampleRate: 0.1,    // 10% of transactions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions that had an error
});
```

Wrap your app in Sentry's error boundary:
```jsx
// In App.jsx or main.jsx:
const SentryApp = Sentry.withErrorBoundary(App, {
  fallback: <div>Something went wrong. Our team has been notified.</div>,
});
```

Add to `frontend/.env`:
```
VITE_SENTRY_DSN=https://...
```

### Adding Custom Context to Errors

```js
// In your login route, after successful login:
Sentry.setUser({ 
  id: user._id.toString(), 
  role: user.role 
  // Don't include email unless required — minimize PII in logs
});

// In a critical route, add extra context:
Sentry.withScope((scope) => {
  scope.setTag("feature", "ai-analysis");
  scope.setContext("job", { id: jobId, title: job.title });
  throw new Error("AI analysis failed after 3 retries");
});
```

### Setting Up Alerts

In the Sentry dashboard:
1. Go to **Alerts** → **Create Alert**
2. Choose **Error** alert
3. Set condition: "Number of occurrences > 5 in 1 hour"
4. Set action: **Send email to team** (or Slack webhook)

Now if a new error starts happening frequently, you get notified immediately.

---

## ❓ Common Questions

**Q: Does Sentry see our users' passwords or tokens?**  
A: Only if you explicitly log them. Sentry captures what's in request bodies and headers. The `beforeSend` filter in the setup above removes the authorization header. Don't log passwords anywhere and Sentry won't see them.

**Q: The free tier is 5,000 errors/month. What happens if we exceed it?**  
A: Sentry stops collecting errors until the next month. You get an alert when approaching the limit. For a startup, 5,000 errors/month is plenty. If you're hitting the limit, you have bigger problems (too many errors in production).

**Q: Can we self-host Sentry to avoid paying?**  
A: Yes. Sentry is open source. Self-hosting requires Docker and a server. For a startup, the free tier + Sentry's hosting is much simpler. Self-host when/if you have compliance requirements that prevent sending error data to third parties.

---

## 🎓 What You Learned

- Without error monitoring, production bugs are invisible until users complain
- Sentry captures: stack trace, user context, browser info, request data, user actions leading to error
- Both backend (Node.js) and frontend (React) need separate Sentry projects
- `beforeSend` filter removes sensitive data before it leaves your server
- Set up alerts so you get notified when new error types appear in production
- Free tier: 5,000 errors/month — more than enough for early stage
