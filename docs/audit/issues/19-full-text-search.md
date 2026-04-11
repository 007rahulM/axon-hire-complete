# Issue #19 — No Full-Text Job Search

> **Branch**: 3 (Performance & Scale)  
> **Severity**: 🔵 Feature — regex search is slow and has no typo tolerance  
> **Status**: Branch 3 (pending)

---

## 👥 The Team Room

*Priya is testing the search bar.*

---

**🔴 Priya (PM):** "I typed 'React develoepr' with a typo. Zero results. Our main job category has zero results because of one typo."

**🟠 Ben (Backend):** "The current search uses MongoDB regex: `{ title: { $regex: 'React develoepr', $options: 'i' } }`. Regex is exact — it looks for that exact string. 'develoepr' doesn't appear in any job title, so zero results."

**🔴 Priya:** "Google handles typos. Every job site I've ever used handles typos. Why don't we?"

**🟠 Ben:** "Because regex doesn't do fuzzy matching. We need a full-text search engine. MongoDB Atlas has one built in — Atlas Search. It's based on Lucene (the same engine Elasticsearch uses), supports typo tolerance, relevance ranking, and partial matches."

**🔵 Fay (Frontend):** "Does it cost extra?"

**🟠 Ben:** "Free on M0 Atlas tier. But it requires manual setup in the Atlas dashboard before we write any code."

---

## 🔍 Understanding the Problem

### What regex Search Does

```js
Job.find({ title: { $regex: "React developer", $options: "i" } })
```

MongoDB scans EVERY job document and checks if the title contains the exact string "React developer" (case-insensitive). 

- ✅ Finds: "Senior React Developer", "React developer wanted"
- ❌ Misses: "React develoepr" (typo), "ReactJS Developer" (different name), "React Dev" (abbreviation)

### What Atlas Search Does

Atlas Search uses an inverted index — it maps every unique word to the documents containing it:

```
Index entry: "developer" → [job1, job5, job12, job45...]
Index entry: "react" → [job1, job5, job7, job22...]
```

With fuzzy matching (`maxEdits: 1`):
- "develoepr" → Atlas finds "developer" (1 edit: swap two chars)
- "Recat" → Atlas finds "React" (1 edit: swap two chars)

And it returns results ranked by relevance score — job titles matching "React developer" score higher than job descriptions that mention it in passing.

---

## 🛠 The Fix

### Manual Setup First (Atlas Dashboard)

The code won't work until you create the search index in Atlas. Follow the complete guide:

**→ [`docs/setup/06-mongodb-atlas-search.md`](../../setup/06-mongodb-atlas-search.md)**

That guide covers:
1. Go to https://cloud.mongodb.com
2. Select your cluster → Search tab
3. Create index named `jobs_search` on the `jobs` collection
4. Configure which fields to search (title, description, company, skills, location)
5. Wait 1-5 minutes for index to build

**You cannot skip this step. The code below will throw errors if the index doesn't exist.**

### Backend Code Change (`backend/routes/jobRoutes.js`)

Replace the regex filter for title with Atlas Search pipeline:

```js
router.get("/", async (req, res) => {
  const { page = 1, limit = 12, title, location, type } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  if (title) {
    // Atlas Search path (when user is searching)
    const pipeline = [
      {
        $search: {
          index: "jobs_search",
          compound: {
            must: [{
              text: {
                query: title,
                path: ["title", "description", "company", "skills"],
                fuzzy: { maxEdits: 1, prefixLength: 3 },
              },
            }],
            filter: [{ equals: { path: "isOpen", value: true } }],
          },
        },
      },
      ...(location ? [{ $match: { location: { $regex: location, $options: "i" } } }] : []),
      ...(type ? [{ $match: { type } }] : []),
      { $addFields: { score: { $meta: "searchScore" } } },
      { $sort: { score: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "recruiter",
          pipeline: [{ $project: { name: 1, profilePicture: 1 } }],
        },
      },
      { $addFields: { postedBy: { $arrayElemAt: ["$recruiter", 0] } } },
      { $unset: "recruiter" },
    ];

    const jobs = await Job.aggregate(pipeline);
    return res.json({ jobs, pagination: { page: parseInt(page), limit: parseInt(limit) } });
  }

  // No search term — regular sorted list
  const filter = { isOpen: true };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (type) filter.type = type;

  const [jobs, total] = await Promise.all([
    Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit))
      .populate("postedBy", "name profilePicture").lean(),
    Job.countDocuments(filter),
  ]);

  res.json({ jobs, pagination: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
});
```

### What `fuzzy: { maxEdits: 1, prefixLength: 3 }` Means

- `maxEdits: 1` — allow 1 character difference (typo tolerance): "React" ↔ "Recat", "developer" ↔ "devloper"
- `prefixLength: 3` — the first 3 characters must match exactly: "Rea..." must start with "Rea", not just any 3-character difference

Without `prefixLength`, "React" might match completely unrelated words that happen to differ by one character. The prefix constraint keeps results relevant.

### Fallback for Local Development

Atlas Search only works with MongoDB Atlas (not local Docker MongoDB):

```js
// Graceful fallback when Atlas Search is unavailable:
try {
  const jobs = await Job.aggregate(pipeline);
  return res.json({ jobs });
} catch (err) {
  if (err.message.includes("$search") || err.message.includes("search index")) {
    // Atlas Search not available — fall back to regex
    const jobs = await Job.find({ 
      isOpen: true,
      title: { $regex: title, $options: "i" }
    }).sort({ createdAt: -1 }).limit(parseInt(limit)).lean();
    return res.json({ jobs });
  }
  throw err;
}
```

---

## ❓ Common Questions

**Q: What happens to the regex search we have now?**  
A: It's replaced for the `title` parameter. Location filtering still uses regex (Atlas Search handles full-text; exact location matching is still fine with regex).

**Q: Can Atlas Search index nested fields (like `skills: ["React", "Node.js"]`)?**  
A: Yes — arrays are automatically expanded. Atlas Search indexes each element of an array. So `skills: ["React", "Node.js"]` means "React" and "Node.js" are each indexed, and searching for "React" will find jobs with React in their skills array.

**Q: What is a "relevance score"?**  
A: Atlas Search assigns each result a score based on how well it matches. A job with "React" in the title scores higher than one with "React" only in the description. `$meta: "searchScore"` retrieves this score, and we sort by it so the best matches appear first.

**Q: Will this break if the Atlas index doesn't exist yet?**  
A: Yes — MongoDB throws an error if `$search` references a non-existent index. That's why the fallback is important.

---

## 🎓 What You Just Learned

- Regex search: exact string matching, no typo tolerance, full collection scan
- Atlas Search: Lucene-based inverted index, fuzzy matching, relevance ranking, fast
- Full-text search requires a search index created in the Atlas dashboard (manual step)
- `maxEdits: 1` allows one character substitution — handles most typos
- `prefixLength: 3` prevents irrelevant fuzzy matches by requiring the prefix to be exact
- Relevance score (`$meta: "searchScore"`) ranks results by quality, not just date
