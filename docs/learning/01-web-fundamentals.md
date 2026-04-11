# 01 — How the Web Works

> Before you can build a backend, you need to understand what happens when someone visits your website.

---

## The Request-Response Cycle

When a user visits `https://axon-hire.vercel.app`:

```
Browser (Chrome)          Internet           Vercel (Frontend)
     |                       |                      |
     |------ GET / --------->|--------------------->|
     |                       |                      | Sends HTML/JS/CSS
     |<----- HTML -----------|<---------------------|
     |                       |
     | (Browser executes JS, React boots)
     |
     | (React calls your backend)
     |
     |------ GET /api/jobs -->|---------> Render (Backend, Node.js)
     |                        |                     |
     |                        |                     | Queries MongoDB
     |                        |                     | Returns JSON
     |<----- JSON jobs -------|<--------------------|
     |
     | (React renders job cards)
```

**Key insight**: Your React app and Node.js server are TWO separate programs. They communicate via HTTP (the same protocol your browser uses). React runs in the **browser** (client-side). Node.js runs on **Render's servers** (server-side).

---

## HTTP Methods — What They Mean

| Method | Used For | Example |
|--------|----------|---------|
| GET | Read data (no side effects) | Get list of jobs |
| POST | Create new data | Submit a job application |
| PUT | Replace an entire document | Update full profile |
| PATCH | Update part of a document | Change just your name |
| DELETE | Remove data | Delete a job posting |

**Why it matters in your code**:
```js
router.get("/", ...)     // List all jobs
router.post("/", ...)    // Create a job
router.put("/:id", ...)  // Replace a job
router.delete("/:id")    // Delete a job
```

---

## HTTP Status Codes — What to Return When

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Invalid input from the user |
| 401 | Unauthorized | Not logged in (no token) |
| 403 | Forbidden | Logged in but not allowed (wrong role) |
| 404 | Not Found | Resource doesn't exist |
| 423 | Locked | Account locked (used for lockout) |
| 500 | Internal Server Error | Something crashed on your server |

**In Axon Hire**: When a user tries to login and their account is locked, you return 423. When their password is wrong, you return 400. When their token is valid but they're not an admin, you return 403.

---

## JSON — The Language Servers Speak

JavaScript Object Notation. It's how your frontend and backend share data.

```json
{
  "user": {
    "id": "abc123",
    "name": "Rahul",
    "role": "recruiter"
  },
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**In Express**: `res.json({ user, token })` automatically:
1. Converts the JavaScript object to a JSON string
2. Sets `Content-Type: application/json` header
3. Sends the response

**In React/Axios**: `res.data` gives you the parsed JavaScript object back.

---

## CORS — Why Your React App Can Talk to Your Backend

Browsers block JavaScript from making requests to a different domain/port than the page it's running on. This is a security feature called the **Same-Origin Policy**.

`localhost:5173` (React) trying to talk to `localhost:5000` (Node) = **blocked by default**.

CORS (Cross-Origin Resource Sharing) is how your server says "I allow requests from this other domain":
```js
app.use(cors({
  origin: ["http://localhost:5173", "https://axon-hire.vercel.app"],
  credentials: true, // Allow cookies
}));
```

**What goes wrong**: If you forget `credentials: true`, cookies won't be sent. If you use `origin: "*"` (any domain), cookies are also blocked. You need a specific origin list AND `credentials: true` to make cookies work.

---

## Environment Variables — The Secret Safe

Sensitive values (database passwords, API keys, JWT secrets) must NEVER be in your code. If they are, anyone who reads your GitHub repo can steal them.

```bash
# .env file (never commit this to git)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/axon
JWT_SECRET=my-super-secret-key-that-nobody-can-guess
```

```js
// In your code
process.env.MONGO_URI     // Reads from .env
process.env.JWT_SECRET
```

**How `dotenv` works**: `require("dotenv").config()` reads your `.env` file and sets each key as an environment variable. This is why it must be the **very first line** of `server.js` — before anything else tries to use `process.env`.

**In production (Render)**: You set env vars in the dashboard. They're injected at runtime, not from a file.

---

## Exercise: Trace a Login Request

Follow this chain in the code:

1. User submits login form in `Login.jsx`
2. `axiosInstance.post("/auth/login", { email, password })` sends HTTP POST to backend
3. Express routes it to `authRoutes.js` → `router.post("/login", ...)`
4. Route handler reads `req.body.email`, `req.body.password`
5. `User.findOne({ email })` queries MongoDB
6. `bcrypt.compare(password, user.password)` checks the hash
7. `jwt.sign({ id, role }, process.env.JWT_SECRET)` creates a token
8. `res.json({ token, user })` sends back to React
9. `login(data.user, data.token)` saves to AuthContext + localStorage
10. `navigate("/")` redirects to home

Can you trace this in the code right now? Open each file and follow the data.
