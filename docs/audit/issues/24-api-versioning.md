# Issue #24 — No API Versioning

> **Branch**: 7 (New Features & Architecture)  
> **Severity**: 🔵 Feature — breaking changes will break mobile/third-party clients  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*Ben is planning to rename a field in the API response.*

---

**🟠 Ben (Backend):** "I want to rename `matchScore` to `atsScore` in the AI analysis response. It's clearer."

**🔴 Priya (PM):** "Do you know how many places in the frontend use `matchScore`?"

**🟠 Ben:** *searches* "...about 23 places."

**🔴 Priya:** "And what if we had a mobile app or third-party integrations using our API?"

**🟠 Ben:** "They'd all break the moment we deploy."

**🔴 Priya:** "This is why APIs need version numbers. `GET /api/v1/jobs` stays the same forever. You add `GET /api/v2/jobs` when you make breaking changes. Old clients use v1. New clients use v2. Both work at the same time."

---

## 🔍 Understanding API Versioning

### What Is a Breaking Change?

A breaking change is any API modification that makes existing clients fail:
- Renaming a field (`matchScore` → `atsScore`)
- Removing a field
- Changing a field's type (string → array)
- Changing the URL path
- Requiring a new required parameter

### What Is NOT a Breaking Change (Safe to Deploy Anytime)

- Adding a NEW optional field to a response
- Adding a NEW optional query parameter
- Improving error messages
- Performance improvements

### The Versioning Strategies

**URL path versioning** (most common, recommended):
```
/api/v1/jobs
/api/v2/jobs
```

**Header versioning** (cleaner URLs, but less visible):
```
GET /api/jobs
Accept-Version: v2
```

**Query parameter versioning** (simple but pollutes URLs):
```
GET /api/jobs?version=2
```

For Axon Hire: URL path versioning is the clearest approach.

---

## 🛠 The Fix (to implement in Branch 7)

### Step 1: Restructure `backend/server.js` Route Mounting

```js
// Create version-specific route files or just namespace with prefix:
const v1Router = express.Router();

// Mount all existing routes under v1:
v1Router.use("/auth", authRoutes);
v1Router.use("/users", userRoutes);
v1Router.use("/jobs", jobRoutes);
v1Router.use("/applications", applicationRoutes);
v1Router.use("/interview", interviewRoutes);
v1Router.use("/notifications", notificationRoutes);
v1Router.use("/admin", adminRoutes);
v1Router.use("/ai", aiRoutes);

// Mount v1 at /api/v1
app.use("/api/v1", v1Router);

// Backward compatibility: /api/* still works (points to v1)
// This prevents breaking the existing frontend which uses /api/...
app.use("/api", v1Router);
```

### Step 2: When to Create v2

Create v2 ONLY when you have breaking changes. Example:

```js
const v2Router = express.Router();

// v2 uses the new field names and response shape
v2Router.use("/auth", authRoutesV2);
v2Router.use("/jobs", jobRoutesV2);
// v2 endpoints that haven't changed still use v1 handlers:
v2Router.use("/notifications", notificationRoutes); // No changes in v2

app.use("/api/v2", v2Router);
```

### Step 3: Deprecation Warning

When v1 is outdated, send a deprecation header (not remove it immediately):

```js
// Middleware for v1 that adds deprecation warning:
v1Router.use((req, res, next) => {
  res.setHeader("Deprecation", "true");
  res.setHeader("Sunset", "2025-12-31"); // Date when v1 will be removed
  res.setHeader("Link", `</api/v2${req.url}>; rel="successor-version"`);
  next();
});
```

Clients see the header in logs and have time to migrate before the sunset date.

### Step 4: Update Frontend to Use Versioned Path

```js
// frontend/src/utils/axiosInstance.js
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  // Before: `${import.meta.env.VITE_API_URL}/api`
});
```

---

## ❓ Common Questions

**Q: We don't have a mobile app or third-party users. Why does this matter?**  
A: Even with just a web frontend, versioning matters: if you deploy a breaking API change and the frontend is cached in the CDN (old version), users get a broken experience until the cache refreshes. With versioning, both the old and new frontend version work simultaneously.

**Q: Do we need versioning before launch?**  
A: Not urgently. Add it before you launch to third-party developers (public API) or before you build a mobile app. For now, just mount everything under both `/api` and `/api/v1`.

**Q: What's the difference between versioning and feature flags?**  
A: API versioning keeps old and new behavior simultaneously by URL. Feature flags turn new behavior on/off per user. Both have their place — versioning is for API contract stability, feature flags are for gradual rollouts.

---

## 🎓 What You Learned

- A breaking API change silently breaks all clients who haven't updated
- URL versioning `/api/v1/` is the simplest, most visible approach
- Keep v1 running forever (or until sunset date) — never force-remove it
- Backward compat: keep `/api/` pointing to v1 so nothing breaks during migration
- Deprecation headers give clients advance warning before you remove a version
