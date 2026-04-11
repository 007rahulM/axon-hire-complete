# Issue #12 — AI Evaluation Uses `setImmediate` Instead of a Real Queue

> **Branch**: 3 (Performance & Scale)  
> **Severity**: 🟡 Performance — crashes lose AI jobs silently; multiple server instances cause race conditions  
> **Status**: Branch 3 (pending)

---

## 👥 The Team Room

*The team is looking at the apply route code.*

---

**🟡 Dev (DevOps):** "Ben, show me how the AI analysis runs after someone applies to a job."

**🟠 Ben (Backend):** *shows the code*

```js
// After saving the application:
if (job.autoEvaluate) {
  setImmediate(async () => {
    try {
      const result = await performAnalysis(user.resumeUrl, jobId, job.evaluationMode);
      newApplication.aiAnalysis = [result.analysis];
      await newApplication.save();
    } catch (err) {
      console.error("Background AI Audit failed:", err.message);
    }
  });
}

res.json({ message: "Application received! AI analysis in progress." });
```

**🟡 Dev:** "What happens if the server restarts while the AI analysis is running?"

**🟠 Ben:** "The `setImmediate` callback is in memory. When the process restarts... it's gone. The analysis never completes. The application stays with empty `aiAnalysis` forever."

**🟡 Dev:** "And what happens when we scale to 2 server instances on Render?"

**🟠 Ben:** "Each instance has its own memory. The `setImmediate` job runs on whichever instance handled the HTTP request. The other instance doesn't know about it."

**🔴 Priya (PM):** "What's the user experience impact?"

**🟠 Ben:** "The recruiter opens the application and sees 'AI Analysis In Progress' but it never resolves. Or it shows 'Analysis Failed' with no explanation."

**🟡 Dev:** "We need to move the AI jobs to a persistent queue. A job that's queued to a Redis list survives server restarts. Multiple workers (server instances) can pick jobs from the same queue."

---

## 🔍 Understanding `setImmediate` vs a Real Queue

### What `setImmediate` Actually Does

```js
setImmediate(fn)
```

This schedules `fn` to run after the current event loop iteration — essentially "run this very soon, after the current function completes." It's a Node.js concept for deferring work within the SAME process.

**What it is**: A way to defer a callback to the next iteration of the event loop.  
**What it is NOT**: A background job system. It's synchronous from a process perspective — if the process dies, the work is gone.

### What a Real Job Queue Does

A job queue (like BullMQ on top of Redis):

```
1. Your API handler adds a job to a queue (stored in Redis — persists across restarts)
2. A "worker" process (or your server itself) picks jobs from the queue
3. The worker runs the AI analysis
4. If the worker crashes, the job is marked as "failed" — it can be retried
5. If 3 workers are running, they share the queue — no duplicate processing
```

```
HTTP Request → Add job to Redis list → Response sent (fast)
                      ↓
         Worker 1 picks job → runs AI → saves result
         Worker 2 picks NEXT job → runs AI → saves result
         (Parallel, persistent, retryable)
```

### Why `setImmediate` Works for 10 Users But Fails at 10,000

At 10 users applying simultaneously: 10 `setImmediate` callbacks queued in Node's event loop. Fine.

At 10,000 users applying in a burst:
- 10,000 AI analysis jobs running simultaneously
- Each calls OpenRouter/Groq API → API rate limits kick in → all 10,000 fail
- Server's memory fills with pending async operations
- Node's event loop grinds to a halt
- New HTTP requests start timing out

A queue processes jobs one-by-one (or in controlled batches of N). No burst problem.

---

## 🛠 The Fix (to implement in Branch 3)

### Option A: BullMQ (recommended — built for this)

BullMQ is the modern Redis-based job queue for Node.js.

**Setup guide**: Follow [`docs/setup/02-upstash-redis.md`](../../setup/02-upstash-redis.md) first — you need Redis.

```bash
cd backend && npm install bullmq
```

**Step 1: Create `backend/queues/aiQueue.js`**

```js
const { Queue } = require("bullmq");

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
};

// The queue — a named list in Redis
const aiQueue = new Queue("ai-analysis", { connection });

module.exports = aiQueue;
```

**Step 2: Create `backend/workers/aiWorker.js`**

```js
const { Worker } = require("bullmq");
const Application = require("../models/Application");
const { performAnalysis } = require("../routes/aiRoutes");
const logger = require("../utils/logger");

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
};

// The worker — picks jobs from the queue and processes them
const aiWorker = new Worker(
  "ai-analysis",
  async (job) => {
    const { applicationId, resumeUrl, jobId, evaluationMode } = job.data;
    logger.info(`Processing AI analysis for application ${applicationId}`);

    const result = await performAnalysis(resumeUrl, jobId, evaluationMode);

    await Application.findByIdAndUpdate(applicationId, {
      aiAnalysis: [result.analysis],
    });

    logger.info(`AI analysis complete for application ${applicationId}`);
  },
  {
    connection,
    concurrency: 2,  // Process max 2 jobs at a time (respects AI API rate limits)
    limiter: {
      max: 10,       // Max 10 jobs per 60 seconds (rate limiting)
      duration: 60000,
    },
  }
);

aiWorker.on("failed", (job, err) => {
  logger.error(`AI job ${job.id} failed: ${err.message}`);
});

module.exports = aiWorker;
```

**Step 3: Replace `setImmediate` in `backend/routes/applicationRoutes.js`**

```js
const aiQueue = require("../queues/aiQueue");

// OLD:
// setImmediate(async () => {
//   const result = await performAnalysis(user.resumeUrl, jobId, job.evaluationMode);
//   newApplication.aiAnalysis = [result.analysis];
//   await newApplication.save();
// });

// NEW:
if (job.autoEvaluate) {
  await aiQueue.add("analyze-resume", {
    applicationId: newApplication._id.toString(),
    resumeUrl: user.resumeUrl,
    jobId: jobId,
    evaluationMode: job.evaluationMode,
  }, {
    attempts: 3,      // Retry up to 3 times on failure
    backoff: {
      type: "exponential",
      delay: 5000,    // Wait 5s, then 10s, then 20s between retries
    },
    removeOnComplete: 100,  // Keep last 100 completed jobs for debugging
    removeOnFail: 200,      // Keep last 200 failed jobs for investigation
  });
}
```

**Step 4: Start the worker in `backend/server.js`**

```js
// Start the AI worker (only in production or if explicitly enabled)
if (process.env.NODE_ENV !== "test") {
  require("./workers/aiWorker");
  logger.info("AI worker started");
}
```

---

## ❓ Common Questions

**Q: What's the difference between a queue and a worker?**  
A: The queue is the list (stored in Redis). The worker is the code that reads from the list and processes items. Multiple workers can read from the same queue (parallel processing).

**Q: What happens if an AI analysis fails 3 times?**  
A: The job moves to a "failed" state in Redis. You can inspect failed jobs in the BullMQ dashboard (or via code). The application would show "Analysis Failed" status. You can manually retry from the BullMQ dashboard.

**Q: Do I need a BullMQ dashboard?**  
A: Optional but helpful. `bull-board` is a web UI for BullMQ:
```bash
npm install @bull-board/express @bull-board/api @bull-board/ui
```
Add a protected route at `/api/admin/queues` — only accessible by admins.

**Q: Is Upstash compatible with BullMQ?**  
A: BullMQ requires a full Redis connection (not the HTTP REST API). Upstash has a Redis-compatible connection string. Use:
```
REDIS_URL=rediss://default:YOUR_PASSWORD@YOUR-UPSTASH-URL:6380
```
Then in BullMQ: `new Queue("name", { connection: new IORedis(process.env.REDIS_URL) })`

---

## 🎓 What You Just Learned

- `setImmediate` is an in-memory deferred callback — it disappears on server restart
- A job queue persists jobs in Redis — jobs survive restarts and are distributed across workers
- `concurrency` in BullMQ controls how many jobs run in parallel (respect API rate limits)
- `attempts` and `backoff` give you automatic retries — no code to write
- This is the standard pattern for all background work (emails, AI, report generation, PDF creation)
- Queue + worker = the correct architecture for any operation that takes more than ~100ms
