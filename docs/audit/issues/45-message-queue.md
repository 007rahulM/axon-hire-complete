# Issue #45 — No Message Queue for Background Jobs

> **Branch**: 3 (Performance & Scale)  
> **Severity**: 🏗️ Architecture — background work (AI, emails) runs in-process and crashes silently  
> **Status**: Branch 3 (pending)

---

## 👥 The Team Room

*Dev is explaining why `setImmediate` isn't a production solution (extending Issue #12).*

---

**🟡 Dev (DevOps):** "Currently, everything happens synchronously or with `setImmediate`: AI analysis, email sending, notification creation. All of it runs in the main Node.js process."

**🟠 Ben (Backend):** "What's wrong with that?"

**🟡 Dev:** "At 10,000 users applying simultaneously: 10,000 AI jobs queue up in Node's event loop. Node.js is single-threaded. While it's processing AI jobs, new HTTP requests queue up. The event loop falls behind. Users start getting slow responses or timeouts — not because your DB is slow, but because your CPU is busy with AI work."

**🔴 Priya (PM):** "And emails?"

**🟡 Dev:** "If SendGrid is down for 30 seconds and we send the OTP email inline (blocking the response), the user waits 30 seconds for their registration to complete. Or it fails. Either way — bad."

**🟠 Ben:** "So background jobs need to be off the main HTTP request path."

**🟡 Dev:** "Exactly. A message queue separates job creation (fast, returns immediately) from job processing (slow, happens in the background)."

---

## 🔍 The Architecture Problem

### Current (Problematic) Architecture

```
HTTP Request → Route Handler → [AI Analysis] → [Email Send] → Response

If AI takes 3 seconds and email takes 0.5 seconds:
Time to respond = 3.5 seconds (users waiting)
If AI fails: response fails, error returned to user
If server restarts during AI: job is lost
If 100 simultaneous requests: 350 seconds of AI work queued in memory
```

### Target Architecture (with Queue)

```
HTTP Request → Route Handler → [Add job to Redis queue] → Response (fast, <100ms)
                                          ↓
                               Queue Worker (separate process or goroutine)
                                    ↓             ↓              ↓
                               AI Analysis   Email Send    Notification
                               (3s, async)   (0.5s, async) (fast)
                               Retry if fail  Retry if fail
```

The HTTP response returns immediately. The background worker processes jobs independently.

---

## 🔍 What Types of Work Belongs in a Queue

| Work | In-Process? | Queue? | Why |
|------|-------------|--------|-----|
| Validate request data | ✅ | | Must be synchronous — decision affects response |
| DB lookup for auth | ✅ | | Must be synchronous — user needs to be authenticated |
| AI resume analysis | | ✅ | Slow (3-10s), can fail, must retry |
| Send OTP email | | ✅ | Can fail (email provider down), retry needed |
| Send "You were shortlisted" notification | | ✅ | Not urgent, can be delayed by seconds |
| Create application record in DB | ✅ | | Synchronous: user needs confirmation it was saved |
| Generate PDF report | | ✅ | Slow, retry on failure |

---

## 🛠 The Fix

### Tool: BullMQ (already covered in Issue #12 for AI jobs)

See **[`docs/audit/issues/12-ai-job-queue.md`](./12-ai-job-queue.md)** for the full BullMQ setup.

The same pattern applies to ALL background work, not just AI analysis.

### Email Queue

```js
// backend/queues/emailQueue.js
const { Queue } = require("bullmq");
const connection = require("./connection"); // Reuse Redis connection config

const emailQueue = new Queue("emails", { connection });
module.exports = emailQueue;
```

```js
// backend/workers/emailWorker.js
const { Worker } = require("bullmq");
const { sendOtpEmail, sendPasswordResetEmail, sendNotificationEmail } = require("../utils/emailService");

const emailWorker = new Worker(
  "emails",
  async (job) => {
    const { type, to, data } = job.data;
    
    switch (type) {
      case "otp":
        await sendOtpEmail(to, data.otp);
        break;
      case "password-reset":
        await sendPasswordResetEmail(to, data.resetUrl);
        break;
      case "shortlisted":
        await sendNotificationEmail(to, "You've been shortlisted!", data);
        break;
    }
  },
  {
    connection,
    concurrency: 5, // Send up to 5 emails simultaneously
    attempts: 3,    // Retry 3 times if sending fails
    backoff: { type: "exponential", delay: 2000 },
  }
);
```

### Notification Queue

```js
// backend/queues/notificationQueue.js
const { Queue } = require("bullmq");
const connection = require("./connection");

const notificationQueue = new Queue("notifications", { connection });
module.exports = notificationQueue;
```

```js
// In your routes, instead of creating notification inline:
// OLD:
await Notification.create({ user: userId, title: "...", message: "..." });

// NEW (non-blocking):
await notificationQueue.add("create-notification", {
  userId,
  title: "You've been shortlisted for React Developer",
  message: `${recruiterName} has shortlisted you for ${jobTitle}`,
  type: "success",
  relatedLink: `/jobs/${jobId}`,
});
// Response returns immediately — notification created asynchronously
```

### Connection Reuse

```js
// backend/queues/connection.js — shared Redis connection for all queues
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // Required by BullMQ
  enableReadyCheck: false,    // Required for Upstash
});

module.exports = connection;
```

### Graceful Shutdown

When the server receives a SIGTERM (Render scales down, deployment), drain the queues gracefully:

```js
// backend/server.js
const { aiWorker } = require("./workers/aiWorker");
const { emailWorker } = require("./workers/emailWorker");

async function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  
  // Stop accepting new jobs
  await aiWorker.close();
  await emailWorker.close();
  
  // Close DB connection
  await mongoose.connection.close();
  
  process.exit(0);
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
```

---

## ❓ Common Questions

**Q: Does adding Redis make our architecture more complex?**  
A: Yes — one more external service. But the tradeoff is worth it: reliable background processing, retry on failure, no in-process blocking. Upstash Redis (from Issue #11) is free, managed, and setup takes 10 minutes.

**Q: What happens to queued jobs if Redis restarts?**  
A: BullMQ stores jobs in Redis with a key prefix. If Redis restarts with persistence (Upstash uses persistence by default), jobs survive. If Redis loses data, jobs in "waiting" state are lost — but jobs in "active" state (currently being processed) are retried when the worker reconnects.

**Q: Can we process all queues in the same process?**  
A: Yes — you can have multiple workers in the same `server.js` process. Start workers at the bottom of `server.js`:
```js
require("./workers/aiWorker");    // AI analysis queue
require("./workers/emailWorker"); // Email queue
require("./workers/notificationWorker"); // Notification queue
```

For scale: separate processes or dedicated worker servers for CPU-intensive work (AI). For light work (emails, notifications): same process is fine.

---

## 🎓 What You Learned

- Background work in-process blocks the Node.js event loop and affects HTTP response times
- A message queue decouples job creation (fast) from job processing (slow, async)
- Any work that can fail and must retry belongs in a queue (emails, AI, reports)
- BullMQ stores jobs in Redis — persisted, retryable, with configurable concurrency
- Graceful shutdown: drain worker queues before process exits to prevent job loss
- Multiple queues (AI, emails, notifications) can share one Redis connection
