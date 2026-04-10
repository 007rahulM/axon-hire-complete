# Issue #1 — MongoDB Connects Twice in server.js

> **Branch**: 1 (Security/Stability Fixes — do first)  
> **Severity**: 🔴 Critical — wastes connection pool slots, can crash the app at scale

---

## 👥 The Team Room

*Ben and Dev are looking at server.js together.*

---

**🟡 Dev (DevOps):** "Ben, how many database connections does this server open on startup?"

**🟠 Ben (Backend):** "One. At the bottom of server.js."

**🟡 Dev:** "Search for `mongoose.connect` in the file. Count them."

**🟠 Ben:** *searches* "...there are two."

**🟡 Dev:** "Exactly. The first one is at the top level of the file — it runs immediately when Node loads the module. The second is inside a `serverReady` callback — it runs after the server starts listening. Every time your server boots, it creates two separate MongoDB connections."

**🟠 Ben:** "But the app still works fine."

**🟡 Dev:** "It works now with 50 users. MongoDB Atlas M0 free tier allows 100 concurrent connections. At 10,000 users with multiple server instances (or even just restarts), you'll hit the limit. When that happens, new users can't connect to the database. The app doesn't crash — it just silently stops working for new requests."

**🔴 Priya (PM):** "Silent failure is worse than a crash. At least a crash gets noticed."

**🟡 Dev:** "Correct. And this is a one-line fix."

---

## 🔍 Understanding the Problem

### What is a MongoDB connection?

Every time your backend needs to talk to MongoDB (read a user, save a job, etc.), it uses a connection. Instead of opening a new connection for every query (expensive), Mongoose opens a **connection pool** — a set of connections that are shared and reused.

```
Your server → connection pool (5 connections) → MongoDB Atlas
                [conn 1] ─┐
                [conn 2] ─┤
                [conn 3] ─┼─→ MongoDB Atlas
                [conn 4] ─┤
                [conn 5] ─┘
```

### What does Atlas M0 Free Tier allow?

MongoDB Atlas M0 (free tier) allows **100 concurrent connections** per cluster. If you try to open a 101st connection, it's rejected.

With one `mongoose.connect()`, your server opens one connection pool.  
With two `mongoose.connect()`, your server opens TWO connection pools — wasting double the slots.

If you have 3 server instances (Render can spin up multiple instances), that's 6 pools (3 × 2 connections each = 6 slots wasted on 100 available).

At scale, with restart loops and multiple instances, this can exhaust your connection limit.

### Why does the duplicate exist?

This is a common pattern when code grows organically. Someone added a DB connect at the top of the file early on (to test it works). Later, the code was restructured to connect inside a callback. The original call was never removed.

---

## 🛠 The Fix

### What to look for in `backend/server.js`

Search for `mongoose.connect`. You'll find it twice:

**The FIRST one** (near the top, runs immediately):
```js
// Lines ~202-213 — this is the duplicate, REMOVE IT
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
```

**The SECOND one** (inside a function, runs after server starts):
```js
// Lines ~247-257 — KEEP THIS ONE
const serverReady = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // ...
};
```

**The fix**: Delete the first one. Keep the second one.

### Why keep the second one?

The second one is inside `serverReady` — an async function that runs after the HTTP server starts listening. This is the correct pattern: start the web server, connect to the database, then start accepting requests only after both are ready.

If DB connection fails in this pattern, you can handle it gracefully (exit the process, log the error, alert ops). If it's at the top level, a connection failure just logs to console and the app continues without a database — which is worse.

---

## ✅ Verify the Fix

After removing the duplicate:

1. Start the server: `cd backend && node server.js`
2. Look at the startup logs
3. You should see "MongoDB connected" exactly **once**
4. Check Atlas: Dashboard → Cluster → Connect → Metrics → Connections
   You should see connection count = 1 (not 2) when one server instance is running

---

## 🎓 What You Just Learned

- MongoDB connections are a finite resource — Atlas M0 allows 100 concurrent
- Mongoose opens a connection pool on `mongoose.connect()` — if called twice, two pools open
- The correct pattern: connect to DB inside an async startup function, not at the top level
- Dead code from development iterations causes real production bugs — always clean it up
- "Works on my machine with 50 users" ≠ "works in production with 10,000 users"

### The Broader Lesson: Startup Sequencing

A well-structured Node.js server starts up in this order:
```
1. Load environment variables
2. Create Express app
3. Register middleware
4. Register routes
5. Start HTTP server (app.listen)
6. Connect to database
7. Only THEN: log "Server ready"
```

If step 6 fails, the process should exit with an error code. Never silently continue without a database.
