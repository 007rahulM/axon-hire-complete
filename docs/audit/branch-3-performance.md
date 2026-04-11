# Branch 3 — Performance & Scale

> These changes are NOT yet implemented. This document is the implementation guide.

---

## Issue 11: No Caching Layer (Redis)

**Tool**: Upstash Redis (free tier — 10,000 req/day)

### Why every request hitting MongoDB is a problem at scale:
- MongoDB Atlas M0 has limited IOPS (I/O operations per second)
- Reading the jobs list 1,000 times in 1 minute = 1,000 DB queries, many identical
- Redis is an in-memory store — reads are 100x faster than DB reads

### What to cache:

**Job listings** (TTL: 30 seconds, invalidate on job create/update/close):
```js
// In jobRoutes.js GET /
const cacheKey = `jobs:page:${page}:limit:${limit}:title:${title}:location:${location}`;
const cached = await redis.get(cacheKey);
if (cached) return res.json(JSON.parse(cached));
// ... fetch from DB ...
await redis.setex(cacheKey, 30, JSON.stringify(result));
```

**User profiles** (TTL: 5 minutes, invalidate on profile update):
```js
const cacheKey = `user:profile:${userId}`;
```

**Skill map** (already in server memory — add Redis for multi-instance support):
```js
const cacheKey = `skillmap`;
await redis.set(cacheKey, JSON.stringify(skillMap)); // no TTL — invalidate manually
```

### Setup steps:
1. Create free account at https://upstash.com
2. Create a Redis database (free tier)
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env`
4. `npm install @upstash/redis`
5. Create `backend/utils/cache.js`:
```js
const { Redis } = require("@upstash/redis");
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
module.exports = redis;
```

---

## Issue 12: AI Analysis Uses `setImmediate` (Not a Real Job Queue)

**Tool**: BullMQ + Upstash Redis

### Problem with setImmediate:
```js
setImmediate(async () => {
  await analyzeResume(...); // If server crashes here, this is gone forever
});
```
- No persistence — if the process dies, the analysis job is lost
- No retry — if the AI API times out, the job silently fails
- No visibility — you can't see how many jobs are queued

### Fix with BullMQ:
1. `npm install bullmq`
2. Create `backend/queues/analysisQueue.js` — defines the queue
3. Create `backend/workers/analysisWorker.js` — processes jobs with retry logic
4. In applicationRoutes.js, replace `setImmediate` with `analysisQueue.add("analyzeResume", { applicationId })`

**Worker config (retry on failure)**:
```js
const worker = new Worker("analysis", processJob, {
  connection: redisConnection,
  concurrency: 3, // max 3 AI calls at once (avoids rate limits)
  defaultJobOptions: {
    attempts: 3,      // retry 3 times
    backoff: { type: "exponential", delay: 5000 }, // 5s, 10s, 20s waits
  },
});
```

---

## Issue 13: Pagination on Jobs List

**Status**: ✅ Already implemented in `jobRoutes.js`. The `GET /api/jobs` route accepts `?page=1&limit=12` and returns `{ jobs, pagination }`.

---

## Issue 15: Missing DB Indexes

**Status**: ✅ Fixed in this PR (Branch 1 section).

---

## Issue 19: Full-Text Search on Jobs

**Tool**: MongoDB Atlas Search (free on M0)

### Current problem:
```js
if (title) filter.title = { $regex: title, $options: "i" };
```
Regex on unindexed fields does a full collection scan. At 50k jobs this is slow.

### Atlas Search solution:
1. In Atlas UI → Search → Create Index → on `jobs` collection
2. Index fields: `title`, `description`, `company`, `location`
3. Replace the regex filter with:
```js
Job.aggregate([
  {
    $search: {
      index: "jobs_search",
      text: {
        query: title,
        path: ["title", "description", "company"],
        fuzzy: { maxEdits: 1 }, // typo-tolerant
      },
    },
  },
  { $match: { isOpen: true } },
  { $skip: skip },
  { $limit: limit },
]);
```
This gives: typo-tolerance ("Recat" → "React"), relevance scoring, and speed.

---

## Issue 41: No Frontend State Management

**Tool**: TanStack Query (React Query)

### Current pattern (repeated in every component):
```js
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  axios.get("/api/jobs").then(res => setJobs(res.data));
}, []);
```

### Problems at scale:
- Every component that needs jobs makes its own API call
- No caching — switching routes re-fetches data
- No background refetching
- Error states handled inconsistently

### With TanStack Query:
```js
// Install: npm install @tanstack/react-query
import { useQuery } from "@tanstack/react-query";

const { data: jobs, isLoading, error } = useQuery({
  queryKey: ["jobs", page, filters],
  queryFn: () => axiosInstance.get("/jobs", { params: filters }).then(r => r.data),
  staleTime: 30_000, // don't refetch for 30 seconds
});
```
- Automatic caching — same query across components = 1 API call
- Background refetch when window regains focus
- Consistent loading/error patterns
- Devtools for debugging

### Setup:
1. `npm install @tanstack/react-query @tanstack/react-query-devtools`
2. Wrap `<App>` in `<QueryClientProvider client={queryClient}>`
3. Replace `useEffect + useState` patterns one component at a time

---

## Issue 16: Home.jsx is 134KB

**Tool**: React `lazy()` + `Suspense`

### Fix:
Break `Home.jsx` into section components and lazy-load them:
```jsx
// Home.jsx
import { lazy, Suspense } from "react";
const HeroSection = lazy(() => import("./sections/HeroSection"));
const FeaturesSection = lazy(() => import("./sections/FeaturesSection"));
const StatsSection = lazy(() => import("./sections/StatsSection"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-900" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
        <FeaturesSection />
      </Suspense>
    </>
  );
}
```
Each section is a separate chunk. The browser downloads the hero immediately and the rest lazily.
