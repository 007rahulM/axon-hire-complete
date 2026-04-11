# 02 — Node.js & Express

> Node.js is the runtime. Express is the framework that makes building HTTP servers easy.

---

## What is Node.js?

JavaScript runs in the browser. Node.js lets JavaScript run on a **server** (your computer, Render's servers). Same language, different environment.

**Key characteristics**:
- **Single-threaded**: One main thread handles all requests (unlike Java/Go which use threads)
- **Non-blocking I/O**: Instead of waiting for database queries, Node.js registers a callback and handles other requests in the meantime
- **Event loop**: The mechanism that makes non-blocking I/O work

### Why non-blocking matters:

**Blocking (Java-style)**:
```
Request A arrives → Thread 1 handles it → waits 200ms for DB → returns response
Request B arrives → Thread 2 handles it → waits 200ms for DB → returns response
(Needs multiple threads to handle multiple requests simultaneously)
```

**Non-blocking (Node.js)**:
```
Request A arrives → starts DB query → registers callback → moves on
Request B arrives → starts DB query → registers callback → moves on
DB query A completes → event loop calls callback → sends response
DB query B completes → event loop calls callback → sends response
(One thread handles both — no waiting, no threads)
```

**The catch**: If you do something **CPU-intensive** (like parsing a large PDF), it BLOCKS the event loop for everyone. That's why AI/PDF analysis should go in a job queue (a separate worker process).

---

## Express: Building Routes

```js
const express = require("express");
const app = express();

// Middleware: runs on EVERY request
app.use(express.json()); // Parse JSON body
app.use(cors());          // Allow cross-origin requests

// Route: runs only for matching requests
app.get("/api/jobs", (req, res) => {
  res.json({ jobs: [] });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body; // Parsed by express.json()
  // ...
  res.status(200).json({ token, user });
});

app.listen(5000, () => console.log("Server on port 5000"));
```

### The middleware chain:

Every request passes through middleware in order:
```
Request → CORS → express.json() → mongoSanitize → helmet → morgan → route handler → Response
```

If a middleware calls `next()`, the request continues. If it calls `res.json()`, the chain stops.

---

## Async/Await — Reading Code Linearly

JavaScript is asynchronous. Without async/await, code using callbacks or promises is hard to read:

```js
// Callback hell (old way — avoid):
User.findOne({ email }, (err, user) => {
  if (err) return res.status(500).json({ message: "Error" });
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });
    jwt.sign({ id: user._id }, secret, {}, (err, token) => {
      res.json({ token });
    });
  });
});

// async/await (modern way — much cleaner):
try {
  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "12h" });
  res.json({ token });
} catch (err) {
  res.status(500).json({ message: "Server error" });
}
```

**Rule**: Always use async/await in route handlers. Always wrap in try/catch. Always handle errors.

---

## Middleware: The Guard System

```js
// authMiddleware.js — runs before protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();             // Continue to the actual route handler
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

// In a route file:
router.get("/profile", verifyToken, async (req, res) => {
  // req.user is available here because authMiddleware set it
  const user = await User.findById(req.user.id);
  res.json(user);
});
```

### Order matters:
```js
app.use("/api/admin", [verifyToken, adminMiddleware]); // Auth first, then role check
```

If `verifyToken` fails → returns 401 immediately → `adminMiddleware` never runs.

---

## Router: Organizing Routes

Without a Router, all routes would be in server.js (becomes unmanageable):

```js
// server.js — add routes as mini-apps
app.use("/api/auth", authRoutes);   // handles /api/auth/login, /api/auth/register
app.use("/api/jobs", jobRoutes);    // handles /api/jobs/, /api/jobs/:id
app.use("/api/users", userRoutes);

// authRoutes.js — only sees /login, /register (the /api/auth prefix is stripped)
const router = express.Router();
router.post("/login", ...);   // Full path: POST /api/auth/login
router.post("/register", ...);
module.exports = router;
```

---

## Error Handling

### Why you need a global error handler:
Any unhandled `throw` in a route handler crashes the process. The global handler catches everything:

```js
// At the BOTTOM of server.js (after all routes):
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: "Internal Server Error" });
});
```

### The 4-argument signature `(err, req, res, next)` is what tells Express this is an error handler.

### To pass an error to the global handler:
```js
router.get("/something", async (req, res, next) => {
  try {
    // ...
  } catch (err) {
    next(err); // Pass to global error handler
  }
});
```

---

## Environment Variables: Why `dotenv` Must Be First

```js
// server.js — CORRECT
require("dotenv").config(); // MUST be line 1

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI); // process.env is populated
```

```js
// server.js — WRONG
const mongoose = require("mongoose");
require("dotenv").config(); // Too late — mongoose imported before env was set
mongoose.connect(process.env.MONGO_URI); // undefined!
```
