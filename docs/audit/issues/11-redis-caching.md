# Issue #11 — No Caching Layer (Redis)

> **Branch**: 3 (Performance & Scale)  
> **Severity**: 🟡 High — at 10k users, every page load hammers MongoDB

---

## 👥 The Team Room

*The team is doing a load test simulation. Priya is watching the MongoDB Atlas metrics.*

---

**🔴 Priya (PM):** "I just looked at MongoDB Atlas metrics. We're doing 847 reads per minute and we have 50 users. What happens at 10,000 users?"

**🟠 Ben (Backend):** *calculates* "...169,400 reads per minute. The Atlas M0 free tier starts throttling at around 100 operations per second. That's 6,000 per minute. We'd be 28x over that limit."

**🔴 Priya:** "What does 'throttling' look like to a user?"

**🟠 Ben:** "Slow responses. Then timeouts. Then errors. The jobs page goes blank."

**🔵 Fay (Frontend):** "But the jobs list doesn't change that often, right? Maybe once every few minutes when a new job is posted."

**🟠 Ben:** "Exactly Fay. That's the insight. The jobs list is being read thousands of times per minute, but it only changes maybe 50 times per day. We're re-fetching the same data from the database every single time. We should fetch it once, store it, and serve the stored version until it changes."

**🟡 Dev (DevOps):** "That's caching. We store the result of a database query in Redis — which is an in-memory store, meaning it's 100x faster than MongoDB. Every request checks Redis first. If the data is there, return it instantly without touching the database. If it's not there (cache miss), query MongoDB once, save to Redis, return the result. Next 10,000 requests? Redis."

---

## 🔍 Understanding the Problem

### Why is every request slow?

Without caching, this happens for every user who loads the jobs page:

```
User Browser → HTTP request → Express → MongoDB query → 
wait for disk read → return 200 results → JSON.stringify → send response
```

Time: ~150-300ms per request. MongoDB reads from disk.

### With caching:

```
User Browser → HTTP request → Express → Redis lookup → 
data in memory, immediate → return cached results → send response
```

Time: ~5-15ms. Redis reads from RAM.

### What is Redis?

Redis = Remote Dictionary Server. It's a key-value store that lives entirely in RAM (memory), not on disk. Reading from RAM is ~1,000x faster than reading from disk.

```
Redis key-value pair:
"jobs:page:1" → "[{...job1...}, {...job2...}, ...]"

Getting a key: ~0.1ms
Setting a key: ~0.1ms
```

### Cache TTL (Time to Live)

Every cached value should have an expiry time. This is called TTL. After the TTL, Redis automatically deletes the key. The next request will see a cache miss, fetch from MongoDB, and re-cache.

Why TTL matters: If a recruiter closes a job, you want the jobs list to eventually show it as closed. With a 30-second TTL, the stale data is gone in at most 30 seconds.

---

## 🛠 Step-by-Step Implementation

### Step 1: Set Up Upstash Redis

Follow the complete guide: **[`docs/setup/02-upstash-redis.md`](../../setup/02-upstash-redis.md)**

When done, you'll have:
```bash
# backend/.env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Step 2: Create the Cache Utility (`backend/utils/cache.js`)

```js
const { Redis } = require("@upstash/redis");

let redis;

// Gracefully handle missing env vars
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
} else {
  // No Redis configured — use a no-op object so code doesn't break in dev
  console.warn("⚠️  Redis not configured — caching disabled");
  redis = {
    get: async () => null,           // Always "cache miss"
    setex: async () => {},           // Silently do nothing
    del: async () => {},
    keys: async () => [],
  };
}

module.exports = redis;
```

**Why the fallback?** If a developer doesn't have `UPSTASH_REDIS_REST_URL` in their `.env` (maybe they're working on a non-caching feature), the app still works — just without caching. This is "graceful degradation."

### Step 3: Add Caching to the Jobs Route

In `backend/routes/jobRoutes.js`:

```js
const redis = require("../utils/cache");

// GET /api/jobs — with caching
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 12, title, location, type } = req.query;
    
    // Build a unique cache key based on the query parameters
    // Different filters = different cached results
    const cacheKey = `jobs:${page}:${limit}:${title || ""}:${location || ""}:${type || ""}`;

    // Step 1: Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      // Cache hit — return immediately, no DB query
      return res.json(cached); // @upstash/redis auto-parses JSON
    }

    // Step 2: Cache miss — query MongoDB
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = { isOpen: true };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate("postedBy", "name profilePicture")
        .lean(),
      Job.countDocuments(filter),
    ]);

    const result = {
      jobs,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) },
    };

    // Step 3: Store in cache for 30 seconds
    await redis.setex(cacheKey, 30, result);

    res.json(result);
  } catch (err) {
    logger.error("Jobs fetch failed:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});
```

### Step 4: Invalidate Cache When a Job Changes

When a job is posted, updated, or closed, the cache is stale. Delete it:

```js
// Helper function to clear job list cache (add to cache.js or jobRoutes.js)
const clearJobListCache = async () => {
  const keys = await redis.keys("jobs:*");
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

// In POST /api/jobs (create job):
router.post("/", protect, recruiterOnly, async (req, res) => {
  // ...create job...
  await clearJobListCache(); // Invalidate cached job lists
  res.status(201).json(newJob);
});

// In PATCH /api/jobs/:id/close:
router.patch("/:id/close", protect, recruiterOnly, async (req, res) => {
  // ...close job...
  await clearJobListCache(); // Invalidate
  res.json({ message: "Job closed" });
});
```

---

## 📊 What You Can Cache in This App

| Data | Cache Key Pattern | TTL | Invalidate When |
|------|------------------|-----|----------------|
| Job listings | `jobs:{page}:{limit}:{filters}` | 30 seconds | Job created/closed/updated |
| Single job | `job:{id}` | 5 minutes | That job is updated |
| User profile | `user:{id}` | 5 minutes | User updates profile |
| Skill map | `skillmap` | 1 hour | Never (static data) |
| Notification count | `notif-count:{userId}` | 30 seconds | New notification |

---

## ❓ Common Questions

**Q: What's a "cache miss"?**  
A: When you look up a key in Redis and it's not there (either never stored or TTL expired). On a miss, you fetch from the database, then store in Redis for next time.

**Q: What's a "stale cache"?**  
A: Cached data that's out of date. A recruiter closes a job, but the cache still shows it as open. TTL-based expiry and manual invalidation (deleting the key) are how you handle this.

**Q: Can Redis lose data?**  
A: Yes — Redis is in-memory, so it can be lost on restart. That's fine for a cache. The source of truth is MongoDB. Redis is just a speed layer.

**Q: Should I cache everything?**  
A: No. Cache data that is: (1) read frequently, (2) expensive to compute/fetch, (3) changes infrequently. Don't cache: user-specific real-time data (notifications), write-heavy data, financial transactions.

---

## 🎓 What You Just Learned

- Redis is an in-memory key-value store — 100x faster than database reads
- Caching follows: check cache → (miss) fetch DB → store in cache → return
- TTL (time to live) automatically expires stale data
- Cache invalidation (deleting a key when data changes) keeps data fresh
- A graceful fallback (no-op when Redis is unavailable) means caching is optional in dev
- Upstash is Redis-as-a-service — free tier, no server to manage
