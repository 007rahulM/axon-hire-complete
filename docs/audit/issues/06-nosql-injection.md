# Issue #6 — No NoSQL Injection Protection

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🟠 Security — malicious queries can bypass authentication entirely  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Sam is demonstrating an attack on the login endpoint in a local environment.*

---

**🟣 Sam (Security):** "Priya, Ben — watch this. I'm going to log in to any account without knowing the password."

**🔴 Priya (PM):** "That's not possible."

**🟣 Sam:** *opens Postman, sends a request*

```json
POST /api/auth/login
{
  "email": { "$gt": "" },
  "password": "anything"
}
```

The response comes back with a user object and a JWT token.

**🔴 Priya:** "...that worked. You're logged in."

**🟣 Sam:** "As the first user in the database. I didn't know their email. I didn't know their password. The `$gt: ""` is a MongoDB operator that means 'greater than empty string' — which every email satisfies. So MongoDB found the first user in the collection and returned them. The password check was bypassed entirely."

**🟠 Ben (Backend):** "So anyone who knows this trick can log in as any user?"

**🟣 Sam:** "The FIRST user. But with slightly different queries you can target specific users. `{ "email": { "$regex": "admin" } }` would find the admin account."

**🔴 Priya:** "How do we fix it?"

**🟣 Sam:** "One middleware package. It strips MongoDB operators (`$`) from all request bodies before they reach any route handler."

---

## 🔍 Understanding the Problem

### What is NoSQL Injection?

SQL injection is a classic attack where you inject SQL code into a query:
```sql
SELECT * FROM users WHERE email = '' OR '1'='1'
```

NoSQL injection is the MongoDB equivalent. MongoDB queries are JavaScript objects, so if user input is inserted directly into a query, an attacker can inject MongoDB operators.

### The Attack

Your login route probably looks like:
```js
const user = await User.findOne({ email: req.body.email });
```

If `req.body.email` is `"user@example.com"` — fine, works as intended.

But if `req.body.email` is `{ "$gt": "" }`, then the query becomes:
```js
const user = await User.findOne({ email: { "$gt": "" } });
```

MongoDB interprets `$gt: ""` as "find a user whose email is greater than empty string." Every email satisfies this. MongoDB returns the first user in the collection — no email check happens.

### Why Does `bcrypt.compare` Not Save You?

Your login flow is:
1. Find user by email
2. Compare passwords with `bcrypt.compare(inputPassword, user.password)`

If step 1 returns a user (any user), step 2 runs with your `inputPassword` ("anything") against the found user's real hashed password. `bcrypt.compare("anything", realHash)` returns `false` — so the login fails.

UNLESS the attacker knows ANY real password. Or more subtly — the attacker could also inject the password field:
```json
{
  "email": "real@user.com",
  "password": { "$gt": "" }
}
```

If the code does `if (req.body.password === storedHash)` (direct comparison instead of bcrypt), this bypasses the check. The `bcrypt.compare` path is safe here, but the email injection is still a problem because it can leak whether an account exists.

---

## 🛠 The Fix

### Install the package

```bash
cd backend && npm install express-mongo-sanitize
```

### Add middleware to `backend/server.js`

Add this **after** `app.use(express.json())` and **before** all routes:

```js
const mongoSanitize = require("express-mongo-sanitize");

// After: app.use(express.json());
app.use(mongoSanitize()); // Strips $ and . from req.body, req.query, req.params
```

### What It Does

`express-mongo-sanitize` walks through every field in `req.body`, `req.query`, and `req.params`. If any key starts with `$` or contains `.` (dot notation, also used for MongoDB operators), it removes that field entirely.

**Before sanitization**:
```json
{ "email": { "$gt": "" }, "password": "anything" }
```

**After sanitization**:
```json
{ "password": "anything" }
```

The `email` field is gone. Your query becomes `User.findOne({})` which... still returns the first user. Wait.

### Is Removing the Field Enough?

Actually, `mongoSanitize` with the default options replaces prohibited keys with nothing, which can have edge cases. A better approach is to use the `replaceWith` option and then validate:

```js
// Option 1: Remove prohibited keys (default)
app.use(mongoSanitize());

// Option 2: Replace $ with _ (keeps structure, breaks operator)
app.use(mongoSanitize({ replaceWith: "_" }));
// { "email": { "_gt": "" } } → User.findOne({ email: { "_gt": "" } }) → no results
```

But the REAL fix is **input validation** in your routes:

```js
// In authRoutes.js login handler — validate that email is a string:
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  // Validate types before using them in queries
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid input." });
  }
  
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  // ...
});
```

Type checking + `express-mongo-sanitize` = defense in depth.

---

## ❓ Common Questions

**Q: Does this affect all MongoDB queries?**  
A: Only queries that use user input directly. Hard-coded queries like `User.findOne({ role: "admin" })` are safe.

**Q: What's the difference between NoSQL injection and SQL injection?**  
A: SQL injection injects SQL syntax (quotes, semicolons, `OR 1=1`). NoSQL injection injects MongoDB operators (`$gt`, `$where`, `$regex`). The concept is the same — trusting user input as query logic.

**Q: Could `$where` be used for a worse attack?**  
A: Yes. `{ "$where": "function() { while(true) {} }" }` would run an infinite JavaScript loop inside MongoDB. This is a Denial-of-Service attack. MongoDB's `$where` allows arbitrary JavaScript execution. Mongo Sanitize blocks this by stripping `$` keys. Many production MongoDB instances disable `$where` entirely.

**Q: The package says it strips `.` too — why?**  
A: MongoDB allows nested field access with dots: `user.email.domain` in a query would traverse the nested object. Stripping dots prevents escaping to nested fields.

---

## 🎓 What You Just Learned

- MongoDB queries are JavaScript objects — if user input lands directly in a query, operators like `$gt` become part of the query logic
- The attack: send `{ "$gt": "" }` as the email value → MongoDB finds any user
- The fix: `express-mongo-sanitize` strips all MongoDB operator keys from request bodies
- Defense in depth: combine sanitization + type validation + `express-validator` in routes
- `$where` is the most dangerous operator — it executes arbitrary JavaScript in the database process
