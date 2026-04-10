# ⚡ Upstash Redis — Complete Setup Guide

> **What this gives you**: A free Redis database in the cloud that your backend uses for caching job listings, queuing AI jobs, and sharing state between multiple server instances.

---

## 👥 The Team Talks

**🟡 Dev (DevOps):** "Redis is where we put data we want to access REALLY fast without hitting MongoDB every time. Upstash is the easiest free option — it's Redis as a service with an HTTP API, which means it works on serverless and free-tier servers without issues."

**🟠 Ben (Backend):** "The reason we use Upstash specifically, and not a self-hosted Redis, is that Render's free tier doesn't keep a Redis process alive. Upstash is a separate service that's always running. You just get a URL and token, add them to `.env`, and you're done."

**🔴 Priya (PM):** "How much does it cost?"

**🟡 Dev:** "Free tier: 10,000 requests per day. For a small app that's plenty. When you exceed that, it's $0.20 per 100k requests — you'd need to be making millions of requests before it's even $5/month."

---

## Part 1: Create Your Upstash Account

### Step 1.1: Go to Upstash

Open your browser and go to: **https://upstash.com**

You'll see a landing page with "Get Started for Free."

### Step 1.2: Sign Up

Click **"Get Started for Free"** or **"Sign Up"**.

You can sign up with:
- GitHub account (recommended — one click)
- Google account
- Email + password

Use GitHub — it's fastest.

### Step 1.3: The Dashboard

After signing in, you'll land on the Upstash dashboard. It looks like a simple panel with "Create Database" in the middle.

---

## Part 2: Create a Redis Database

### Step 2.1: Click "Create Database"

You'll see a form with options:

**Name**: Type `axon-hire-cache` (or anything you like — it's just a label for you)

**Type**: Select **Redis** (not Kafka or QStash)

**Region**: Choose the region closest to where your backend runs:
- If your backend is on Render/Railway (US East) → pick `us-east-1`
- If your backend is in Europe → pick `eu-west-1`
- If you're in India and deploying to Asia → pick `ap-southeast-1`

**TLS**: Leave it ON (it's on by default — always use encrypted connections)

Click **"Create"**

### Step 2.2: Get Your Credentials

After creating, you'll see the database page. Scroll down to find the **"REST API"** section.

You'll see two things you need:

```
UPSTASH_REDIS_REST_URL    https://us1-xxxx-yyyy.upstash.io
UPSTASH_REDIS_REST_TOKEN  AXXXXXXxxxxxxxxxxxxxxxxxxxxxx
```

There's also a copy button next to each. Click it to copy.

---

## Part 3: Add to Your `.env` File

Open `backend/.env` in your code editor and add these two lines:

```bash
UPSTASH_REDIS_REST_URL=https://us1-xxxx-yyyy.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXXXxxxxxxxxxxxxxxxxxxxxxx
```

Replace the values with the actual ones from your Upstash dashboard.

**Also add to Render/Railway** (your production server):
- In Render: Dashboard → Your Service → Environment → Add Environment Variable
- In Railway: Dashboard → Your Project → Variables

---

## Part 4: Install the Package

In your terminal, navigate to the backend folder:

```bash
cd /home/runner/work/axon-hire-complete/axon-hire-complete/backend
npm install @upstash/redis
```

---

## Part 5: Create the Redis Utility File

Create `backend/utils/cache.js`:

```js
const { Redis } = require("@upstash/redis");

// This creates one Redis client that the whole app shares.
// The REST URL + token come from your .env file.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

module.exports = redis;
```

---

## Part 6: Test That It Works

Add this temporary test in any route, call it once, then remove it:

```js
const redis = require("../utils/cache");

// Temporary test — delete this after confirming it works
app.get("/api/redis-test", async (req, res) => {
  await redis.set("test-key", "hello from redis");
  const value = await redis.get("test-key");
  res.json({ value }); // Should return { "value": "hello from redis" }
});
```

Visit `http://localhost:5000/api/redis-test` in your browser. If you see `{ "value": "hello from redis" }`, Redis is working. Remove this test route afterwards.

---

## Part 7: How to Use Redis in the Codebase

### Basic cache pattern (read → miss → fetch DB → cache):
```js
const redis = require("../utils/cache");

// In your route handler:
const cacheKey = `jobs:page:${page}`;

// Step 1: Check cache
const cached = await redis.get(cacheKey);
if (cached) {
  return res.json(cached); // @upstash/redis auto-parses JSON
}

// Step 2: Cache miss — get from DB
const jobs = await Job.find(...).lean();

// Step 3: Save to cache (30 seconds TTL)
await redis.setex(cacheKey, 30, jobs); // setex = "set with expiry"

res.json(jobs);
```

### Invalidate cache when data changes:
```js
// When a new job is posted:
// Delete all cached job list pages so next request gets fresh data
const keys = await redis.keys("jobs:page:*");
if (keys.length > 0) await redis.del(...keys);
```

---

## Part 8: Monitoring Usage in Upstash Dashboard

Go back to https://console.upstash.com and click your database.

You'll see:
- **Total Commands** — how many Redis operations you've done today
- **Daily Requests** — compared against your 10,000/day free limit
- **Latency** — how fast Redis is responding (usually under 5ms)

When you're close to 10,000/day, either:
1. Increase TTLs (cache for longer so fewer DB reads → fewer Redis writes too)
2. Upgrade to pay-as-you-go ($0.20 per 100k requests)

---

## What You Learned

- Upstash is Redis-as-a-service — you get a URL and token, that's it
- Redis is NOT a database replacement — it's a speed layer on top of MongoDB
- The free tier (10k req/day) is plenty for an early product
- `setex(key, seconds, value)` = store with auto-expiry
- `redis.get(key)` = retrieve (returns `null` if expired or not found)
- You invalidate cache by deleting the key when underlying data changes
