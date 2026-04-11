# Issue #15 — Missing Database Indexes

> **Branch**: 1 (Security Fixes — added early because they're critical for performance)  
> **Severity**: 🟡 Performance — queries become full table scans at scale  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Dev is showing Priya the MongoDB Atlas performance advisor.*

---

**🟡 Dev (DevOps):** "Priya, look at this Atlas Performance Advisor screenshot. It's showing 4 'slow queries' that are doing full collection scans. Every one of them is something users do constantly."

**🔴 Priya (PM):** "What's a full collection scan?"

**🟡 Dev:** "Imagine your job listings are 50,000 pieces of paper in a pile. You want to find all jobs by a specific recruiter. Without an index, you read every single piece of paper and check if it matches. With an index, it's like having an alphabetical address book — you jump directly to the recruiter's section."

**🟠 Ben (Backend):** "Without indexes: 50,000 documents × time to read each = slow. With indexes: 1 B-tree lookup = fast. Same query, 1,000x different speed."

**🔴 Priya:** "How long does adding indexes take?"

**🟡 Dev:** "You add one line to the Mongoose schema. MongoDB builds the index in the background. In production it takes a few minutes on a large collection. On a new collection it's instant."

**🟠 Ben:** "And for a new codebase like ours with <10,000 documents, it takes milliseconds."

---

## 🔍 Understanding Database Indexes

### What is a B-tree Index?

MongoDB indexes store a sorted copy of a field's values, pointing to the document locations:

```
Without index (Application.applicantId):
Query: "find all applications where applicantId = '6789abc'"
→ MongoDB reads ALL Application documents, checks each one
→ 100,000 documents, reads all 100,000 → slow

With index on applicantId:
→ MongoDB looks up '6789abc' in the B-tree (like a phone book)
→ Jumps directly to matching documents → fast
```

### Types of Indexes

**Single field index** — for queries filtering on one field:
```js
applicationSchema.index({ applicantId: 1 }); // 1 = ascending
```

**Compound index** — for queries filtering on multiple fields:
```js
jobSchema.index({ isOpen: 1, createdAt: -1 }); // isOpen ascending, createdAt descending
```

A compound index also works for queries on just the first field (`isOpen` alone), but NOT for just the second field alone (`createdAt` alone). The order matters.

**Why the compound index `{isOpen: 1, createdAt: -1}` is important:**
```js
// This query uses the compound index efficiently:
Job.find({ isOpen: true }).sort({ createdAt: -1 })
// MongoDB finds all open jobs (using isOpen index) AND they're already sorted by date
// Single B-tree operation
```

Without it:
1. Find all documents where `isOpen: true` — full scan
2. Sort the entire result by `createdAt` — sort in memory

---

## 🛠 What Was Added

### `backend/models/Application.js`

```js
// Already existed:
applicationSchema.index({ jobId: 1, applicantId: 1 }); // Unique application check
applicationSchema.index({ createdAt: -1 }); // Sort by newest

// ADDED:
applicationSchema.index({ applicantId: 1 }); // "My Applications" page — find all apps by one user
```

### `backend/models/Job.js`

```js
// Already existed:
jobSchema.index({ title: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ type: 1 });
jobSchema.index({ createdAt: -1 });

// ADDED:
jobSchema.index({ postedBy: 1 });             // "My Jobs" recruiter page
jobSchema.index({ isOpen: 1, createdAt: -1 }); // Browse open jobs sorted by newest
```

### `backend/models/Notification.js`

```js
// Already existed:
notificationSchema.index({ user: 1, createdAt: -1 }); // Recent notifications

// ADDED:
notificationSchema.index({ user: 1, isRead: 1 }); // Unread notification count badge
```

---

## 📊 Query-Index Mapping (What Each Index Powers)

| Index | Query It Powers | Where Used |
|-------|----------------|------------|
| `Application.applicantId` | "Find all my applications" | `MyApplications.jsx` page |
| `Job.postedBy` | "Find all jobs I posted" | RecruiterDashboard "My Jobs" tab |
| `Job.{isOpen, createdAt}` | "Browse open jobs, newest first" | `Jobs.jsx` main listings page |
| `Notification.{user, isRead}` | "Count unread notifications" | Nav bar notification badge |

### How to Verify Indexes Are Working (Atlas Performance Advisor)

1. Go to https://cloud.mongodb.com
2. Click your cluster → **Performance Advisor** tab
3. Queries that previously showed "collection scan" should now show "index scan"
4. Query execution time should drop from seconds to milliseconds

### How to See What Indexes Exist

In MongoDB Atlas → Collections → your collection → **Indexes** tab. You'll see all indexes listed.

Or in code (for development):
```js
// Get all indexes on the Job collection:
const indexes = await mongoose.connection.collection("jobs").indexes();
console.log(JSON.stringify(indexes, null, 2));
```

---

## ❓ Common Questions

**Q: Can I have too many indexes?**  
A: Yes. Each index takes disk space and slows down writes (because every write must update all relevant indexes). Rule of thumb: add indexes for your most frequently run queries. Don't index fields that are rarely queried.

**Q: What is the `unique: true` index?**  
A: `email: { unique: true }` on the User model is a unique index — MongoDB enforces that no two documents can have the same email. It's also an index, so email lookups are fast.

**Q: What is a "covering index"?**  
A: If all the fields a query needs are in the index, MongoDB never needs to read the actual document — it serves the query entirely from the index. Example: if you index `{ applicantId: 1 }` and query `Application.find({ applicantId: id }).select("_id jobId")` — if `jobId` is also in the index, MongoDB never reads the document collection.

**Q: Do indexes need to be created in order or can I add them later?**  
A: You can add indexes at any time. In production on a large collection, MongoDB builds them in the background — your app stays online. New documents are indexed immediately; old documents are indexed progressively.

---

## 🎓 What You Just Learned

- A database without indexes does a full collection scan for every filtered query
- Full scan on 50,000+ documents = slow, full scan on 10,000,000 documents = unacceptable
- Compound indexes `{a: 1, b: -1}` serve queries filtering on `a`, or on `a` AND `b` together
- You add indexes in the Mongoose schema with `.index()`; MongoDB creates them in the background
- The Atlas Performance Advisor shows which queries need indexes — check it after 1 week of production traffic
- Every `find()` call should have a corresponding index or a very good reason why not
