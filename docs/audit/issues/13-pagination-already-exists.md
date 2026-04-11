# Issue #13 — No Pagination on Jobs List

> **Branch**: N/A — Already Exists  
> **Severity**: ✅ Not an issue — pagination is implemented  
> **Status**: ✅ Already exists

---

## 👥 The Team Room

*Ben shows Priya the jobs endpoint.*

---

**🔴 Priya (PM):** "Does the jobs list paginate? At 50,000 job listings, returning all of them at once would kill the browser."

**🟠 Ben (Backend):** "It's already paginated. The endpoint accepts `?page=1&limit=12`."

**🔵 Fay (Frontend):** "And the Jobs.jsx page has infinite scroll — it loads more jobs as you scroll down."

**🔴 Priya:** "Good. But let me understand how this works so I can verify it."

---

## 🔍 How Pagination Works in Axon Hire

### The Pattern: Skip + Limit

MongoDB's pagination uses two operations:
1. **skip(N)**: Jump over the first N documents
2. **limit(M)**: Return at most M documents

```
Page 1: skip(0),  limit(12) → jobs 1-12
Page 2: skip(12), limit(12) → jobs 13-24
Page 3: skip(24), limit(12) → jobs 25-36
```

Formula: `skip = (page - 1) * limit`

### What the Backend Returns

```json
{
  "jobs": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 347,
    "totalPages": 29
  }
}
```

The frontend uses `totalPages` to know when to stop loading.

### Why This Gets Slow at Large Scale

The `skip()` approach has a problem at scale: MongoDB still reads all the skipped documents to count them, even though it discards them.

- Page 1: read 12 documents → fast
- Page 2900: skip 34,788 documents → read 12 documents → slow

At 50,000 jobs, browsing to page 4,000 would be noticeably slow.

### The Better Pattern: Cursor-Based Pagination

Instead of "give me page 5," you say "give me the next 12 jobs after this specific document ID":

```
First page: no cursor, get jobs 1-12, note the last job's _id
Next page: jobs after _id "6789abc...", get next 12, note new last _id
```

```js
// Cursor-based pagination:
router.get("/", async (req, res) => {
  const { limit = 12, cursor } = req.query;
  
  const filter = { isOpen: true };
  if (cursor) {
    filter._id = { $lt: cursor }; // Jobs with _id less than cursor (older)
  }
  
  const jobs = await Job.find(filter)
    .sort({ _id: -1 })  // Newest first (by ObjectID which contains timestamp)
    .limit(parseInt(limit) + 1);  // Get one extra to know if there's a next page
  
  const hasNextPage = jobs.length > limit;
  if (hasNextPage) jobs.pop(); // Remove the extra one
  
  res.json({
    jobs,
    nextCursor: hasNextPage ? jobs[jobs.length - 1]._id : null,
  });
});
```

**This is O(log N) instead of O(N)** — it uses the index directly instead of skipping. But it requires a frontend change (pass cursor instead of page number) and doesn't support "jump to page 50" — only "load more."

### When to Upgrade to Cursor-Based Pagination

- Under 100,000 jobs: skip/limit is fine
- Over 100,000 jobs: switch to cursor-based

Keep skip/limit for now and track when `total` in the pagination response approaches 100,000.

---

## 🎓 What You Know Now

- Axon Hire's jobs list already has skip/limit pagination with `?page=N&limit=N`
- The frontend uses infinite scroll to request new pages as you scroll
- `skip()` is simple but slows down on deep pages
- Cursor-based pagination is the production-scale alternative (implement in Branch 7 when needed)
