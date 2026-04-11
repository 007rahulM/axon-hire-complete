# 07 — Performance & Scaling

> Performance isn't about making things fast for 10 users. It's about what breaks first when you hit 10,000.

---

## The Bottlenecks in Axon Hire (Ordered by Impact)

At 10,000 users, these are the things that break first:

1. **MongoDB Atlas M0 connections** — 100 concurrent connection limit
2. **MongoDB IOPS** — M0 has limited I/O operations per second
3. **AI API rate limits** — Groq/Gemini/OpenRouter have per-minute limits
4. **Render free tier** — cold starts, memory limits
5. **Node.js event loop** — heavy synchronous operations block everything

---

## Database Indexes — The Most Important Performance Tool

### What is an index?
A database index is like the index at the back of a book. Without it, to find "MongoDB" you'd read every page. With it, you jump directly to page 342.

### Without an index:
```
Query: User.findOne({ email: "rahul@gmail.com" })
MongoDB: Read EVERY user document until it finds a match
At 100,000 users: scan 100,000 documents
Time: potentially 100ms+
```

### With an index:
```js
userSchema.index({ email: 1 }); // 1 = ascending
```
```
MongoDB: Jump to B-tree node → find user in 3-4 comparisons
Time: <1ms regardless of collection size
```

### Types of indexes:

**Single field index**:
```js
jobSchema.index({ postedBy: 1 });  // Find all jobs by one recruiter
```

**Compound index** (order matters!):
```js
// For query: Job.find({ isOpen: true }).sort({ createdAt: -1 })
jobSchema.index({ isOpen: 1, createdAt: -1 });
// MongoDB uses this ONE index for both the filter AND the sort
// Without it: filter by isOpen (slow), then sort result set (even slower)
```

**Rule of thumb**: Create an index for every field you use in `find()`, `findOne()`, or `sort()`. But don't create too many — each index slows down write operations (it has to update the index tree on every insert/update).

### Existing indexes in Axon Hire:
- `User.email` ✅ — for login lookup
- `User.savedJobs` ✅
- `Application.jobId+applicantId` ✅ — for "has user applied?"
- `Application.createdAt` ✅
- `Job.title`, `location`, `type`, `createdAt` ✅

### Missing indexes (added in this PR):
- `Application.applicantId` ← "My Applications" page queries this
- `Job.postedBy` ← "My Jobs" recruiter page queries this
- `Job.isOpen+createdAt` ← compound for browsing open jobs by newest
- `Notification.user+isRead` ← for unread notification count

---

## Caching with Redis — Serving Data Without Hitting the DB

### What is Redis?
An in-memory key-value store. It's like a fast lookup table where:
- Keys are strings: `"jobs:page:1:limit:12"`
- Values are strings: `JSON.stringify(jobsArray)`
- Each key has an optional TTL (time-to-live): auto-deletes after N seconds

### Why is it needed?
```
Without Redis:
100 users visit /jobs simultaneously → 100 MongoDB queries
MongoDB handles all 100 queries → increased load, slower responses

With Redis:
User 1: Cache miss → query MongoDB → store in Redis (TTL: 30s)
Users 2-100: Cache hit → Redis returns in <1ms → MongoDB receives 0 queries
```

### What to cache in Axon Hire:
| Data | TTL | Invalidate when |
|------|-----|-----------------|
| Job listings | 30s | Job created/updated/closed |
| User profile | 5 min | Profile updated |
| Skill map | No TTL | Admin adds/approves skills |
| Parsed resume | 1 hour | Never (immutable) |

### Cache-aside pattern (most common):
```js
async function getJobs(page, filters) {
  const cacheKey = `jobs:${JSON.stringify({page, filters})}`;
  
  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // 2. Cache miss → query DB
  const jobs = await Job.find(filters).skip(...).limit(...);
  
  // 3. Store in cache
  await redis.setex(cacheKey, 30, JSON.stringify(jobs));
  
  return jobs;
}
```

---

## Pagination — Don't Return Everything

### The problem without pagination:
```js
// This works for 100 jobs. At 50,000 jobs it:
// 1. Reads 50,000 documents from MongoDB
// 2. Serializes 50,000 objects to JSON (could be 50MB+)
// 3. Sends 50MB over the network to the browser
// 4. Browser tries to render 50,000 cards → freezes
const jobs = await Job.find({ isOpen: true });
```

### The fix (already implemented in Axon Hire):
```js
// GET /api/jobs?page=1&limit=12
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 12;
const skip = (page - 1) * limit;

const jobs = await Job.find(filter).skip(skip).limit(limit);
const total = await Job.countDocuments(filter);

res.json({
  jobs,            // Only 12 jobs
  pagination: {
    page,
    limit,
    total,         // Total matching jobs (for "Showing 1-12 of 347")
    totalPages: Math.ceil(total / limit),
    hasMore: skip + jobs.length < total,
  },
});
```

### Cursor-based pagination (for high-scale):
```js
// Offset-based (skip) becomes slow at large offsets
// "skip 10000" → MongoDB still reads and discards 10000 docs

// Cursor-based: uses the last document's ID as a cursor
const jobs = await Job.find({ _id: { $gt: lastSeenId }, isOpen: true }).limit(12);
// MongoDB uses the _id index to jump directly — always fast regardless of page
```

---

## Background Job Queues — Don't Block the Request

### Current problem in Axon Hire:
```js
// applicationRoutes.js
res.status(201).json(savedApplication); // Send response immediately ✅
setImmediate(async () => {
  await runAIAnalysis(application); // Run in "background" ❌
});
```

**What `setImmediate` actually does**: It defers the function to the next iteration of the Node.js event loop. It's not truly background — it's just slightly delayed. If your server crashes, the function never runs and the analysis is lost forever.

### What a real job queue does:
```
1. Application submitted
2. Job saved to Redis queue (persistent, survives server restart)
3. res.json(200) immediately
4. Worker process picks up job from queue
5. Worker runs AI analysis
6. If it fails: retry after 5 seconds (exponential backoff)
7. After 3 failures: mark as failed, alert you via Sentry
8. Dashboard: see queue depth, processing speed, failed jobs
```

**BullMQ**: Battle-tested job queue for Node.js, backed by Redis. Free and open source.

---

## Code Splitting — Don't Load Everything Upfront

### Problem with Axon Hire's Home.jsx (134KB):
When a user visits the home page:
1. Browser downloads `main.js` bundle (everything)
2. Parses 134KB of JSX for Home alone
3. Renders only the visible section (hero)
4. User is waiting for sections they haven't scrolled to yet

### React lazy() + Suspense:
```jsx
// Before: loads everything at once
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import StatsSection from "./sections/StatsSection";

// After: loads each section independently (different JS chunks)
const HeroSection = React.lazy(() => import("./sections/HeroSection"));
const FeaturesSection = React.lazy(() => import("./sections/FeaturesSection"));

function Home() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
        <FeaturesSection />
      </Suspense>
    </>
  );
}
```

Vite automatically creates separate chunk files. Browser downloads `HeroSection.js` first, shows it, then loads `FeaturesSection.js` while the user is reading the hero.

---

## TanStack Query — Intelligent Data Fetching

### Current pattern repeated everywhere:
```js
// Every component that needs data does this:
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  axios.get("/api/jobs")
    .then(res => setData(res.data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);
```

**Problems**:
- Jobs.jsx and RecruiterDashboard.jsx both fetch jobs independently → 2 API calls for same data
- Switching away and back re-fetches everything even if nothing changed
- No retry logic on failure
- Inconsistent loading/error state patterns

### TanStack Query replaces all of this:
```js
const { data: jobs, isLoading, error } = useQuery({
  queryKey: ["jobs", page, filters],   // Cache key
  queryFn: () => axiosInstance.get("/jobs", { params: filters }).then(r => r.data),
  staleTime: 30_000,      // Don't refetch for 30 seconds
  retry: 2,               // Retry twice on failure
});
```

**Benefits**:
- Same `queryKey` across components = shared cache = 1 API call instead of N
- Automatic background refetch when window regains focus
- Built-in `isLoading`, `isError`, `isFetching` states
- `useMutation` for POST/PUT/DELETE with automatic cache invalidation
