# Issue #46 — Admin API Not Separated

> **Branch**: 7 (New Features & Architecture)  
> **Severity**: 🏗️ Architecture — admin endpoints mixed with public API, increasing attack surface  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*Sam is doing a security review of the routes.*

---

**🟣 Sam (Security):** "Ben, where are the admin endpoints?"

**🟠 Ben (Backend):** "Mixed in with the regular routes. `GET /api/admin/users`, `DELETE /api/admin/user/:id`, `PATCH /api/admin/job/:id`. They're protected by `verifyToken` and a role check."

**🟣 Sam:** "So admin endpoints are accessible from the same domain as user endpoints. Same base URL, same rate limits, same CORS headers. If there's ever an injection vulnerability in one of the public routes, the same request might be able to reach admin routes."

**🔴 Priya (PM):** "What's the alternative?"

**🟣 Sam:** "Two approaches. First, separate admin routes with a stronger auth middleware (requires admin role + IP allowlisting). Second, completely separate subdomain or service: `admin.axon-hire.com/api/...`. Full separation means a bug in the public API literally cannot reach admin functions."

**🟠 Ben:** "The subdomain approach is the proper architecture. But right now, the immediate fix is a much stronger admin middleware."

---

## 🔍 The Problem

### Current Admin Protection

```js
// backend/middleware/authMiddleware.js
const verifyToken = (req, res, next) => { ... }; // Just verifies JWT

// backend/routes/adminRoutes.js
router.use(verifyToken); // JWT required
router.get("/users", async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
  // ...
});
```

This works but:
1. The role check is inside each route handler — easy to forget in new routes
2. No middleware-level protection — a developer adding a new admin route might forget the check
3. Admin endpoints share the same rate limit pool as public endpoints (if you hammer `/api/users`, the counter also affects `/api/admin/users`)
4. No additional authentication factors — one stolen JWT = full admin access

### What Stronger Admin Protection Looks Like

```
Before request reaches admin handler:
1. Valid JWT (via verifyToken)
2. Role === "admin" (via adminOnly middleware)
3. IP in allowlist (optional — for internal tools)
4. Request rate: max 20 requests/minute (separate pool)
5. All admin actions logged with user ID and timestamp
```

---

## 🛠 The Fix (to implement in Branch 7)

### Step 1: Create Dedicated Admin Middleware

```js
// backend/middleware/adminMiddleware.js
const ADMIN_IP_ALLOWLIST = process.env.ADMIN_IP_ALLOWLIST?.split(",") || [];
const adminLogger = require("../utils/logger");

const adminOnly = (req, res, next) => {
  // 1. Must have a valid user (verifyToken runs before this)
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  
  // 2. Must be admin role
  if (req.user.role !== "admin") {
    adminLogger.warn(`Non-admin access attempt to admin route`, {
      userId: req.user.id,
      role: req.user.role,
      path: req.path,
      ip: req.ip,
    });
    return res.status(403).json({ message: "Admin access required." });
  }
  
  // 3. Optional: IP allowlisting for admin routes
  if (ADMIN_IP_ALLOWLIST.length > 0) {
    const clientIp = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
    if (!ADMIN_IP_ALLOWLIST.includes(clientIp)) {
      adminLogger.error(`Admin access from non-allowlisted IP: ${clientIp}`, {
        userId: req.user.id,
        path: req.path,
      });
      return res.status(403).json({ message: "Access denied from this location." });
    }
  }
  
  // 4. Log all admin actions
  adminLogger.info(`Admin action: ${req.method} ${req.path}`, {
    adminId: req.user.id,
    ip: req.ip,
    body: req.method !== "GET" ? JSON.stringify(req.body).substring(0, 200) : undefined,
  });
  
  next();
};

module.exports = adminOnly;
```

### Step 2: Apply to All Admin Routes

```js
// backend/routes/adminRoutes.js
const verifyToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { rateLimit } = require("express-rate-limit");

// Strict rate limit for admin actions
const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,             // Max 20 admin requests per minute
  message: { message: "Too many admin requests." },
  keyGenerator: (req) => req.user?.id || req.ip, // Rate limit per admin user
});

// Apply auth + admin check + rate limit to ALL admin routes:
router.use(verifyToken, adminOnly, adminLimiter);

// Now routes don't need individual role checks:
router.get("/users", async (req, res) => {
  // No need for: if (req.user.role !== "admin") return res.status(403)...
  // adminOnly middleware already handled that
  const users = await User.find().lean();
  res.json(users);
});
```

### Step 3: Admin Action Audit Log

```js
// backend/models/AdminLog.js
const adminLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // "DELETE_USER", "BAN_JOB", etc.
  targetId: { type: mongoose.Schema.Types.ObjectId }, // What was affected
  targetType: { type: String }, // "User", "Job", "Application"
  details: { type: Object }, // Additional context
  ip: { type: String },
  timestamp: { type: Date, default: Date.now },
});

adminLogSchema.index({ adminId: 1, timestamp: -1 });
module.exports = mongoose.model("AdminLog", adminLogSchema);
```

Use it for destructive actions:
```js
// In admin routes — when deleting a user:
router.delete("/users/:id", async (req, res) => {
  const targetUser = await User.findById(req.params.id);
  
  await User.findByIdAndDelete(req.params.id);
  
  // Log the action
  await AdminLog.create({
    adminId: req.user.id,
    action: "DELETE_USER",
    targetId: targetUser._id,
    targetType: "User",
    details: { email: targetUser.email, role: targetUser.role },
    ip: req.ip,
  });
  
  res.json({ message: "User deleted." });
});
```

### Step 4 (Long-Term): Admin Subdomain

When your admin usage grows, separate the admin panel completely:

```
User-facing API: api.axon-hire.com → Render service 1
Admin API:       admin.axon-hire.com → Render service 2 (private, IP-restricted)
```

Service 2 can be:
- Private (not public-facing) — only accessible from your office IP
- Completely separate codebase
- Different deployment pipeline (only deployed manually by a senior engineer)

---

## ❓ Common Questions

**Q: What is an IP allowlist and how do we set it up?**  
A: Add `ADMIN_IP_ALLOWLIST=YOUR_OFFICE_IP,YOUR_HOME_IP` to your `.env`. Find your IP at https://api.ipify.org. When set, admin routes only accept requests from those IPs.

**Q: What if the admin needs to work from different locations?**  
A: VPN. All admins connect to a VPN that terminates at a fixed IP. That IP is on the allowlist. Modern VPN solutions (Tailscale) are free for small teams.

**Q: We only have one admin. Is this overkill?**  
A: Even with one admin, a single stolen admin JWT currently gives an attacker full access to everything. Middleware-level role checking + logging + rate limiting significantly reduces blast radius. The IP allowlist is optional — the role check + logging is not.

---

## 🎓 What You Learned

- Admin routes should have a dedicated middleware layer — not per-route role checks
- Middleware-level protection means a developer adding a new admin route can't accidentally forget authorization
- All admin actions should be logged (who did what, when, from where)
- IP allowlisting is the most effective additional protection for admin APIs
- Long-term architecture: admin on a completely separate subdomain or service isolates it from public API vulnerabilities
