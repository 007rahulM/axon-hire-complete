# 🔍 MongoDB Atlas Search — Full-Text Search Setup Guide

> **What this gives you**: Users can search jobs by title, company, or description with typo-tolerance and relevance ranking — like Google Search for your job listings — built into your existing MongoDB database for free.

---

## 👥 The Team Talks

**🔴 Priya (PM):** "If someone types 'Recat developer' (typo for React), they get zero results. That's a bad experience."

**🟠 Ben (Backend):** "Right now we use MongoDB regex: `{ title: { $regex: keyword } }`. Regex doesn't handle typos. It also does a full collection scan — at 50,000 jobs that's slow."

**🔴 Priya:** "How do we fix it?"

**🟠 Ben:** "MongoDB Atlas has a built-in full-text search engine called Atlas Search. It's Lucene under the hood — the same engine that powers Elasticsearch. You configure it in the Atlas dashboard, then change a few lines of code. And it's free on the M0 tier."

**🟡 Dev (DevOps):** "The manual part is creating the search index in Atlas. The code part is changing `$regex` to `$search`. Ben, walk them through both."

---

## Part 1: Create a Search Index in MongoDB Atlas

This is the manual part — you do this in the Atlas website, not in code.

### Step 1.1: Log in to MongoDB Atlas

Open your browser: **https://cloud.mongodb.com**

Log in with your account.

### Step 1.2: Open Your Cluster

You should see your cluster (probably named something like `Cluster0` or `axon-hire`). Click on it.

### Step 1.3: Navigate to Search

In the cluster view, look for the **"Search"** tab at the top. It might say **"Atlas Search"**.

Click it.

### Step 1.4: Create a Search Index

Click **"Create Search Index"**.

You'll see two options:
- **Visual Editor** (easier for beginners — use this)
- **JSON Editor** (more control)

Click **"Visual Editor"** → **"Next"**

### Step 1.5: Configure the Index

**Index Name**: Type `jobs_search` (you'll use this name in your code)

**Database and Collection**: 
- Select your database (probably `axon` or `axon_dev`)
- Select the `jobs` collection

Click **"Next"**

### Step 1.6: Set Which Fields to Search

By default Atlas will index ALL fields. You can refine this.

Click **"Refine Your Index"** for more control.

Under "Field Mappings", click **"Add Field"** for each of these:

| Field Name | Data Type | Options |
|-----------|-----------|---------|
| `title` | String | Enable "Index Analyzer" |
| `description` | String | Enable "Index Analyzer" |
| `company` | String | Enable "Index Analyzer" |
| `location` | String | Enable "Index Analyzer" |
| `skills` | String | Enable "Index Analyzer" |

Click **"Save Changes"** → **"Create Search Index"**

### Step 1.7: Wait for the Index to Build

Atlas will show a progress bar. The index builds in 1-5 minutes for a small collection. You'll see "Active" status when it's ready.

---

## Part 2: Understand What a Search Index Is

**🟠 Ben:** "A search index is a separate data structure that Atlas builds alongside your regular MongoDB documents. It breaks every word in your documents into tokens, removes common words ('the', 'and'), and stores everything in a way that makes text search super fast."

**Example**:  
Document: `{ title: "Senior React Developer" }`  
Search index stores: `["senior", "react", "developer"]`  

When you search for "react dev", the search engine finds "react" ✅ and "developer" (partial match) ✅.

**Why regex is worse**:  
`{ title: { $regex: "react" } }` → reads EVERY document, checks if "react" appears → slow at scale.  
`$search` → jumps directly to the pre-built index → fast regardless of collection size.

---

## Part 3: Update the Backend Code

### Step 3.1: Update `backend/routes/jobRoutes.js`

Find the GET `/` route (the jobs list). Replace the regex-based filtering with Atlas Search:

```js
// BEFORE (slow regex search):
router.get("/", async (req, res) => {
  const { title, location, type } = req.query;
  const filter = { isOpen: true };
  if (title) filter.title = { $regex: title, $options: "i" };
  if (location) filter.location = { $regex: location, $options: "i" };
  // ...
  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json(jobs);
});
```

```js
// AFTER (fast Atlas Search with typo-tolerance):
router.get("/", async (req, res) => {
  try {
    const { title, location, type, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // If there's a search query, use Atlas Search
    // If no search query, fall back to regular find() with sort
    if (title) {
      const pipeline = [
        {
          $search: {
            index: "jobs_search",     // The index name you created in Atlas
            compound: {
              must: [
                {
                  text: {
                    query: title,
                    path: ["title", "description", "company", "skills"],
                    fuzzy: {
                      maxEdits: 1,      // Allow 1 typo (e.g., "Recat" matches "React")
                      prefixLength: 3,  // First 3 chars must be correct
                    },
                  },
                },
              ],
              filter: [
                {
                  equals: {
                    path: "isOpen",
                    value: true,        // Only show open jobs
                  },
                },
              ],
            },
          },
        },
        // Add location filter if provided
        ...(location ? [{ $match: { location: { $regex: location, $options: "i" } } }] : []),
        // Add type filter if provided
        ...(type ? [{ $match: { type } }] : []),
        // Add relevance score to results
        {
          $addFields: {
            score: { $meta: "searchScore" },
          },
        },
        // Sort by relevance score (most relevant first)
        { $sort: { score: -1 } },
        // Pagination
        { $skip: skip },
        { $limit: parseInt(limit) },
        // Populate company/recruiter info if needed
        {
          $lookup: {
            from: "users",
            localField: "postedBy",
            foreignField: "_id",
            as: "recruiterInfo",
            pipeline: [{ $project: { name: 1, profilePicture: 1 } }],
          },
        },
        {
          $addFields: {
            postedBy: { $arrayElemAt: ["$recruiterInfo", 0] },
          },
        },
        { $unset: "recruiterInfo" },
      ];

      const jobs = await Job.aggregate(pipeline);

      // Count total for pagination (Atlas Search count is separate)
      const countPipeline = [
        {
          $searchMeta: {
            index: "jobs_search",
            compound: {
              must: [
                {
                  text: {
                    query: title,
                    path: ["title", "description", "company", "skills"],
                    fuzzy: { maxEdits: 1, prefixLength: 3 },
                  },
                },
              ],
              filter: [
                { equals: { path: "isOpen", value: true } },
              ],
            },
          },
        },
      ];
      const countResult = await Job.aggregate(countPipeline);
      const total = countResult[0]?.count?.lowerBound || 0;

      return res.json({
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      });
    }

    // No search term — return all open jobs sorted by newest
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

    res.json({
      jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    logger.error("Job search failed:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});
```

---

## Part 4: Test It

Start your server and try these URLs:

```
# Normal search (no typo):
http://localhost:5000/api/jobs?title=React

# Typo tolerance test (should still return React jobs):
http://localhost:5000/api/jobs?title=Recat

# Partial word:
http://localhost:5000/api/jobs?title=dev

# With location filter:
http://localhost:5000/api/jobs?title=backend&location=Bangalore
```

If you get results for the typo test, Atlas Search is working correctly.

---

## Important: Atlas Search Requires Atlas (Not Local MongoDB)

**🟠 Ben:** "One thing to note — Atlas Search only works with MongoDB Atlas. It doesn't work with the local MongoDB in Docker Compose."

**So what do you do for local development?**

Option A: Point your dev `.env` to your Atlas cluster (easiest)
Option B: Use the regex fallback when Atlas Search fails:

```js
// In the catch block of the Atlas Search route:
} catch (err) {
  if (err.message.includes("$search")) {
    // Atlas Search not available (local dev) — fall back to regex
    const jobs = await Job.find({
      isOpen: true,
      title: { $regex: title, $options: "i" }
    }).sort({ createdAt: -1 }).limit(12);
    return res.json({ jobs, pagination: { page: 1, limit: 12, total: jobs.length } });
  }
  throw err;
}
```

---

## What You Learned

- Atlas Search is Lucene-based full-text search built into MongoDB Atlas
- You configure it in the Atlas dashboard (manual step) then query it in code (`$search`)
- Fuzzy matching (`maxEdits: 1`) handles typos
- Relevance scoring (`$meta: "searchScore"`) ranks most relevant results first
- It's free on M0 — no cost until you upgrade your cluster tier
