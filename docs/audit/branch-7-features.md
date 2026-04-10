# Branch 7 — New Features

> These changes are NOT yet implemented. This document is the implementation guide.

---

## Issue 3: JWT → HttpOnly Cookies (XSS Fix)

**This is the most impactful security change left.**

### What changes:

**Backend** — In every route that issues a token, set it as a cookie instead of returning it in JSON:
```js
res.cookie("token", jwtToken, {
  httpOnly: true,      // JavaScript cannot read this
  secure: true,        // Only sent over HTTPS
  sameSite: "strict",  // CSRF protection
  maxAge: 12 * 60 * 60 * 1000, // 12 hours
});
res.json({ user: { id, name, email, role } }); // No token in body
```

**Frontend** — Remove all `localStorage.setItem("token", ...)` calls. Remove `token` from AuthContext state. Axios sends cookies automatically (set `withCredentials: true`):
```js
const axiosInstance = axios.create({
  baseURL: "...",
  withCredentials: true, // Send cookies with every request
});
```

**CORS** — Add `credentials: true` (already done) and `origin` must be a specific domain (already done — not `*`).

---

## Issue 7: CSRF Protection

After moving to cookies, add CSRF protection:

**Package**: `csrf-csrf`
```bash
npm install csrf-csrf
```

```js
const { doubleCsrfProtection, generateToken } = require("csrf-csrf").doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: "csrf",
  cookieOptions: { sameSite: "strict", secure: true },
});

app.use(doubleCsrfProtection);

// Expose token to frontend on first load
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: generateToken(req, res) });
});
```

Frontend sends the CSRF token as a header with every mutation (POST/PUT/DELETE).

---

## Issue 18: Refresh Token Mechanism

### Why it matters:
12-hour access tokens mean users get logged out in the middle of the work day. Refresh tokens let you issue short-lived access tokens (15 min) and silently renew them with a long-lived refresh token (7 days) without the user noticing.

### Implementation:

**On login**:
```js
const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

// Store refresh token hash in DB
user.refreshToken = User.hashToken(refreshToken);
await user.save();

res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
res.json({ accessToken, user });
```

**Refresh route**:
```js
router.post("/refresh", async (req, res) => {
  const raw = req.cookies.refreshToken;
  const user = await User.findOne({ refreshToken: User.hashToken(raw) });
  if (!user) return res.status(401).json({ message: "Invalid refresh token" });
  
  const decoded = jwt.verify(raw, process.env.REFRESH_SECRET);
  const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  res.json({ accessToken: newAccessToken });
});
```

**Frontend** — Add a response interceptor to axios that automatically calls `/api/auth/refresh` when it gets a 401.

---

## Issue 20: Cover Letter Support

### Backend — Application model:
```js
coverLetter: {
  type: String,
  default: "",
  maxlength: 2000, // Prevent massive text
},
```

### Frontend — Apply Modal:
```jsx
<textarea
  placeholder="Optional: Why are you interested in this role? (max 2000 characters)"
  value={coverLetter}
  onChange={(e) => setCoverLetter(e.target.value)}
  maxLength={2000}
  rows={4}
  className="..."
/>
```

---

## Issue 21: Company Profile Pages

The `Company` model already exists. It just needs to be surfaced in the UI.

**Backend routes to add** (`/api/companies`):
- `GET /api/companies/:id` — company details + open jobs
- `POST /api/companies/:id/follow` — follow a company (add to user's `followedCompanies`)

**Frontend pages to add**:
- `/company/:id` — Logo, description, size, industry, open jobs list, "Follow" button

**Job card update**: Make the company name a link → `/company/:id`

---

## Issue 23: GDPR Compliance

### Delete Account (soft delete):
```js
// User model: add deletedAt field
deletedAt: { type: Date },

// Route: DELETE /api/users/me
user.deletedAt = new Date();
user.email = `deleted_${user._id}@axon.deleted`; // Anonymize immediately
user.name = "Deleted User";
user.resumeUrl = null;
await user.save();
```

A cron job (using `node-cron` — already installed) runs monthly to hard-delete accounts where `deletedAt` is > 30 days ago.

### Download My Data:
```js
// GET /api/users/me/export
const userData = {
  profile: user,
  applications: await Application.find({ applicantId: user._id }),
  notifications: await Notification.find({ user: user._id }),
};
res.setHeader("Content-Disposition", "attachment; filename=my-data.json");
res.json(userData);
```

---

## Issue 24: API Versioning

**Why now and not later**: Once real users are using your API (especially if you build a mobile app or public API), you cannot change routes without breaking them. Add `/api/v1/` now.

**Lowest-friction approach**:
```js
// In server.js — add a v1 router wrapper
const v1Router = express.Router();
v1Router.use("/auth", authRoutes);
v1Router.use("/jobs", jobRoutes);
// ... all other routes

app.use("/api/v1", v1Router);

// Keep old routes as aliases temporarily (for backward compat)
app.use("/api", v1Router);
```

In 3 months, remove the `/api` aliases.

---

## Issue 44 (Infra): Docker Support

**What was missing from the original audit** — no Docker configuration.

Docker lets you run the exact same environment on your laptop, CI, and production. No "it works on my machine" problems.

**`backend/Dockerfile`**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**`docker-compose.yml`** (for local development):
```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file: ./backend/.env
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Run locally: `docker compose up`  
No need to install MongoDB locally — Docker handles it.
