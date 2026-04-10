# 10 — System Design: Scaling to 10,000 Users

> Senior engineers think about systems holistically. This doc explains how to think about scaling, not just what code to write.

---

## Current Architecture (What You Have)

```
Browser (React)
      ↓ HTTPS
Vercel (Static hosting — React bundle)
      ↓ API calls
Render (Node.js server — single instance)
      ↓ MongoDB connection
MongoDB Atlas M0 (free tier — 512MB, 100 connections)
      ↓ File uploads
Cloudinary (resume storage — free tier)
      ↓ AI calls
Groq / OpenRouter / Gemini APIs
```

**Characteristics**:
- Single server instance
- No caching layer
- Synchronous (blocking) AI analysis
- Free tier everything → hard limits

---

## What Breaks First at Scale

Let's say you suddenly get 10,000 users. Here's the sequence of failures:

### Day 1 (100 concurrent users):
- MongoDB M0 hits 100 connection limit → new connections refused → `MongoNetworkError`
- But wait — you're double-connecting (Bug #1) → you actually hit the limit at 50 users
- **Fix**: Single connection (done), then consider connection pooling settings

### Day 7 (500 daily active users):
- GET /api/jobs called 5,000 times/day, all hitting MongoDB
- M0 starts throttling queries → responses slow from 50ms to 2s
- **Fix**: Redis cache for job listings (30s TTL)

### Day 30 (2,000 users, 50 recruiters posting jobs):
- AI analysis queue grows — `setImmediate` jobs pile up in event loop
- Memory usage grows → Node.js eventually OOM crashes → Render restarts → all pending analyses LOST
- **Fix**: BullMQ job queue (jobs persist in Redis, survive server restarts)

### Day 90 (5,000 users):
- Render free tier can't handle the load → upgrade to paid instance
- Single instance limits: CPU-bound tasks (AI, PDF parsing) block the event loop
- **Fix**: Separate "worker" processes for CPU-heavy tasks

---

## The Architecture You're Building Towards

```
Browser (React + TanStack Query cache)
      ↓
Vercel / Cloudflare (global CDN — serves React bundle from nearest server)
      ↓ API calls
Load Balancer (distributes traffic across multiple instances)
      ↓
Node.js Server A  ←→  Node.js Server B  (multiple instances on Fly.io)
      ↓
Redis (Upstash)    ←→   Redis (Upstash)
Job Queue (BullMQ)      Cache (30s TTL)
      ↓ workers
AI Worker Process (separate — doesn't block HTTP server)
      ↓
MongoDB Atlas M10 ($57/month — 1,500 connections, proper IOPS)
      ↓
Cloudinary (file storage)
```

**You don't need this today.** But you're making decisions now (BullMQ, Redis, no double connection) that either make this evolution easy or hard.

---

## The Three Questions Before Every Architecture Decision

### 1. "What's the read/write ratio?"
- Job listings: mostly READ (1000 reads per 1 write)
  → Cache aggressively (Redis TTL: 30s)
- Applications: roughly equal
  → Cache user's own applications only
- Notifications: mostly READ after creation
  → Cache, but invalidate immediately on new notification

### 2. "What can be done async?"
If a user doesn't need the result **right now**, do it in the background:
- ✅ AI resume analysis → user can see "Analysis in progress" for 10 seconds
- ✅ Welcome email → user doesn't need confirmation it was sent
- ✅ Job alert emails → batch these every 5 minutes
- ❌ JWT verification → must be synchronous (security)
- ❌ "Did I already apply?" check → must be synchronous (UX)

### 3. "What's the cost of this being wrong?"
- Wrong AI score → recruiter sees wrong number (recoverable, can re-analyze)
- Wrong login → user locked out (serious, need lockout reset mechanism)
- Missing security middleware → all users compromised (catastrophic)
- Priority: safety > security > correctness > performance > features

---

## MongoDB Atlas Tier Comparison

| Tier | Price | Storage | Connections | When to use |
|------|-------|---------|-------------|-------------|
| M0 | Free | 512MB | 100 | Development, early beta |
| M2 | $9/mo | 2GB | 500 | 1k-5k users |
| M5 | $25/mo | 5GB | 500 | 5k-20k users |
| M10 | $57/mo | 10GB+ | 1,500 | 20k+ users |

**Rule**: Upgrade to M2 when you hit 1,000 monthly active users. The $9/month prevents dozens of connection errors per day.

---

## Horizontal vs Vertical Scaling

**Vertical scaling**: Buy a bigger server (more RAM, more CPU)
- Simple — no code changes
- Has a ceiling — you can't infinitely upgrade one machine
- Expensive at the top end

**Horizontal scaling**: Add more servers and distribute load
- Complex — requires stateless servers (no in-memory session state)
- Nearly unlimited ceiling
- Cost-effective

**Axon Hire today**: Vertical (single server on Render)  
**Axon Hire at 10k users**: Horizontal (2-3 Node instances behind Render's load balancer)

**What makes horizontal scaling possible**:
1. **Stateless servers**: No in-memory state (like the current skill cache) that differs between instances. Use Redis for shared state.
2. **Sticky sessions or tokens**: JWTs work perfectly here (they're stateless — each server can verify them without talking to each other)
3. **Shared file storage**: Cloudinary is already shared — files aren't on the server disk

---

## Twelve-Factor App Principles

These principles, created by Heroku engineers, describe how to build software that scales. Axon Hire already follows some:

| Factor | Axon Hire Status | Notes |
|--------|------------------|-------|
| Codebase | ✅ Git | One repo |
| Dependencies | ✅ npm | package.json |
| Config | ⚠️ Partial | .env but no validation |
| Backing services | ✅ | MongoDB, Cloudinary as config |
| Build/release/run | ❌ | No CI/CD yet |
| Processes | ⚠️ | Server has memory state (skill cache) |
| Port binding | ✅ | PORT env var |
| Concurrency | ❌ | Single process |
| Disposability | ⚠️ | Server startup could be faster |
| Dev/prod parity | ❌ | No Docker |
| Logs | ✅ | Winston |
| Admin processes | ❌ | No DB migration tooling |

---

## Estimating MongoDB Size at 10k Users

Back-of-envelope calculation (every senior engineer does this):

```
Users:          10,000 × 2KB = 20MB
Jobs:           10,000 × 5KB = 50MB (50 recruiters × 200 jobs avg)
Applications:   50,000 × 3KB = 150MB (5 apps per user avg)
Notifications:  100,000 × 1KB = 100MB (10 per user)
Skills:         1,000 × 0.5KB = 0.5MB

Total: ~320MB → Fits in M0 (512MB) but barely
```

**Conclusion**: You'll need M2 ($9/month) by the time you hit 10k users just for storage. Plan for it.

---

## Docker — Why Every Production App Needs It

**Problem without Docker**:
- Works on your Mac → fails on Render (different Node version)
- Works on Render → fails on a different team member's machine (different OS)
- "Works on my machine" is a real, painful problem in teams

**What Docker does**:
Packages your app + its exact OS + its exact runtime (Node 20.x) + its exact system libraries into a portable unit called a **container**. Runs identically everywhere.

```
Without Docker: "Why does it work on my Mac but crash on the server?"
With Docker: The production server runs the exact same container as your dev machine.
```

See [Branch 7 docs](../audit/branch-7-features.md) for Docker configuration for Axon Hire.
