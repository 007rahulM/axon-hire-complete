# Issue #4 — Interview Routes Not Mounted

> **Branch**: 1 (Security Fixes — also a broken feature)  
> **Severity**: 🔴 Critical — the entire interview management feature returns 404  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*A recruiter filed a support ticket: "I can't schedule interviews. The button does nothing."*

---

**🔴 Priya (PM):** "Ben, I'm getting complaints. The interview scheduling feature isn't working."

**🟠 Ben (Backend):** "Let me check... I'll hit the endpoint directly: `POST /api/interview`. I'm getting 404."

**🔵 Fay (Frontend):** "The frontend is calling `/api/interview/schedule` — it's been calling it for weeks. We built the whole UI. The button is there."

**🟠 Ben:** *opens server.js* "...oh no. `// app.use('/api/interview', interviewRoutes)` — it's commented out."

**🔴 Priya:** "Commented out?! When did that happen?"

**🟠 Ben:** "I think when I was cleaning up the file. I accidentally commented it out instead of the old route. The route file exists, it has all the logic, it's just... never connected to Express."

**🟡 Dev (DevOps):** "How long has this been broken?"

**🟠 Ben:** "...looking at the git history... 3 weeks."

**🔴 Priya:** "3 weeks. All interview features have been 404 for 3 weeks and nobody caught it. We need API tests."

**🟡 Dev:** "We also need CI that would catch this. But first — one line fix."

---

## 🔍 Understanding the Problem

### How Express Route Mounting Works

An Express app is like a telephone switchboard. Each `app.use()` line says: "If a request comes in that starts with this path, forward it to this handler."

```
Request: POST /api/jobs       → jobRoutes.js handles it      ✅
Request: GET  /api/users      → userRoutes.js handles it     ✅
Request: POST /api/interview  → ???                          ❌ (404 Not Found)
```

The file `interviewRoutes.js` exists and has all the logic. But because the `app.use()` line was commented out, Express didn't know it existed. Every request to `/api/interview/*` fell through to Express's default 404 handler.

### What Does Express 404 Look Like?

When no route matches, Express sends:
```json
{ "message": "Not Found" }
```
or just an HTML page that says "Cannot POST /api/interview/schedule".

The frontend gets a 404, the error handling shows a generic error, and the user just sees a button that doesn't work. No crash, no obvious indication — it silently fails.

### Why Is This a "Security" Issue Too?

It's listed under Branch 1 because:
1. When routes are accidentally removed, features silently break — this is a reliability issue
2. Accidentally commenting out a security-sensitive route (e.g., logout, revoke token) could leave a security gap
3. The pattern of disconnecting routes means your server's route map might not match what you think is live

---

## 🛠 The Fix

### Where to look in `backend/server.js`:

Search for `interviewRoutes`. You'll find something like:

```js
// This was the broken version:
const interviewRoutes = require("./routes/interviewRoutes");
// app.use("/api/interview", interviewRoutes); // ← COMMENTED OUT — remove the //
```

### The fix — remove the comment:

```js
const interviewRoutes = require("./routes/interviewRoutes");
app.use("/api/interview", interviewRoutes); // ✅ Now mounted
```

### How to Verify It Works

Start your server and hit the endpoint:
```bash
curl -X GET http://localhost:5000/api/interview \
  -H "Authorization: Bearer YOUR_TOKEN"
```

You should get back a JSON response (not 404). In your browser's Network tab, `POST /api/interview/schedule` should now return 200 or 400 (validation error) instead of 404.

---

## ❓ Common Questions

**Q: How do I know which routes are actually mounted?**  
A: Add this utility function to `server.js` temporarily during development:

```js
// Temporary route debugger — print all registered routes on startup
function printRoutes(app) {
  app._router.stack
    .filter(r => r.handle && r.handle.stack)
    .forEach(r => {
      r.handle.stack.forEach(s => {
        if (s.route) {
          Object.keys(s.route.methods).forEach(m =>
            console.log(`  [${m.toUpperCase()}] ${r.regexp.source.replace('\\/?(?=\\/|$)', '')}${s.route.path}`)
          );
        }
      });
    });
}

// Call after all routes are registered:
printRoutes(app);
```

This prints every route your server knows about. A missing route is immediately obvious.

**Q: Is there a better way to prevent this in the future?**  
A: Yes — integration tests. A test that does:
```js
const response = await request(app).post("/api/interview/schedule").send({...});
expect(response.status).not.toBe(404); // Fails immediately if route is missing
```

This catches missing routes in CI before they reach production. See Issue #42 (CI/CD).

**Q: Why wasn't this caught sooner?**  
A: No automated testing. Manual testing was only done on "main" flows (login, apply, jobs). The interview feature was built and not re-tested after a cleanup. This is exactly why every feature needs at least one integration test.

---

## 🎓 What You Just Learned

- `app.use("/path", routerFile)` is what "mounts" a route — without it, the router file does nothing
- Express has no way to warn you that a route file exists but isn't mounted
- The symptom is always 404 — which looks like a network problem or a bug in the frontend
- Debugging: check `server.js` to verify the route is mounted before digging into the route logic
- Prevention: integration test that hits every critical route and checks it's not 404
- CI (Issue #42) catches this before it reaches production
