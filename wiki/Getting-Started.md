# ⚡ Getting Started

This guide walks you through setting up Axon Hire on your local machine from scratch.

---

## Prerequisites

Before you begin, make sure you have the following:

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | v16 or higher | [Download](https://nodejs.org/) |
| **npm** | Comes with Node.js | – |
| **MongoDB** | Any | [Atlas free tier](https://www.mongodb.com/atlas) or local |
| **Cloudinary account** | – | [Sign up free](https://cloudinary.com/) — for file storage |
| **Gmail + App Password** | – | [Enable App Passwords](https://support.google.com/accounts/answer/185833) |
| **Google Cloud OAuth** | – | [Console](https://console.cloud.google.com/) — for Google Sign-In |
| **AI API key** (at least one) | – | [OpenRouter](https://openrouter.ai/), [Groq](https://console.groq.com/), or [Google AI Studio](https://aistudio.google.com/) |

---

## 1. Clone the Repository

```bash
git clone https://github.com/007rahulM/axon-hire-complete.git
cd axon-hire-complete
```

---

## 2. Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# ── Database ──────────────────────────────────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/axon-hire

# ── Authentication ────────────────────────────────────────────────────────────
JWT_SECRET=your-secret-key-min-32-characters

# ── Email (Gmail SMTP) ────────────────────────────────────────────────────────
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# ── Cloudinary (File Storage) ─────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ── AI Services (at least one required) ──────────────────────────────────────
OPENROUTER_API_KEY=your-openrouter-key
GROQ_API_KEY=your-groq-key
GOOGLE_API_KEY=your-google-gemini-key

# ── Google OAuth ──────────────────────────────────────────────────────────────
GOOGLE_CLIENT_ID=your-google-oauth-client-id

# ── Cron Job Security ─────────────────────────────────────────────────────────
CRON_SECRET=your-cron-secret

# ── Server ────────────────────────────────────────────────────────────────────
PORT=5000
```

> **Tip:** Never commit `.env` to version control. It is already listed in `.gitignore`.

### Seed the Skill Taxonomy (Required Once)

Run this **once** after your first launch to populate the 500+ canonical skills database:

```bash
node scripts/seedSkills.js
```

### Start the Backend

```bash
# Development — with auto-reload via nodemon
npm run dev

# Production
npm start
```

The backend runs on **http://localhost:5000** by default.

---

## 3. Frontend Setup

### Install Dependencies

```bash
cd ../frontend
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

> The Google Client ID must match the one set in your Google Cloud Console's **Authorized JavaScript origins** (add `http://localhost:5173`).

### Start the Frontend

```bash
# Development — with hot module reload
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview
```

The frontend runs on **http://localhost:5173** by default.

---

## 4. Access the Application

| Service | URL |
|---------|-----|
| **Frontend (Dev)** | http://localhost:5173 |
| **Backend API (Dev)** | http://localhost:5000 |
| **Deployed Frontend** | https://axon-hire-complete-mvp.vercel.app |
| **Deployed Backend API** | https://axon-hire-mvp.onrender.com/api |

---

## 5. Create Your First Admin Account

1. Register as a regular user via the app
2. In MongoDB Atlas (or your local DB), find the user document
3. Set the `role` field to `"admin"`
4. Log in again — the Admin Dashboard link will appear in the navbar

---

## 6. Run Tests

```bash
# From the backend directory
cd backend
npm test
```

Tests use **Jest** with an in-memory MongoDB. Ensure your test environment does not connect to a live database.

---

## Common Issues

### Backend won't start
- Check that `MONGO_URI` in `.env` is correct and your IP is whitelisted in MongoDB Atlas
- Ensure `JWT_SECRET` is at least 32 characters long

### OTP emails not arriving
- Verify `EMAIL_USER` and `EMAIL_PASS` are correct
- Confirm you are using a **Gmail App Password**, not your regular Gmail password
- Check the spam/junk folder

### AI scoring not working
- At least one of `OPENROUTER_API_KEY`, `GROQ_API_KEY`, or `GOOGLE_API_KEY` must be set and valid
- The system falls back automatically: OpenRouter → Groq → Gemini

### CORS errors in the browser
- The backend whitelist in `server.js` allows `http://localhost:5173` and `http://localhost:5174` by default
- If you're running the frontend on a different port, add it to the `origin` array in `server.js`

---

## Next Steps

- 📡 [API Reference](API-Reference) — Explore all available endpoints
- 🏗️ [Architecture](Architecture) — Understand how the system is built
- 🤖 [AI Scoring System](AI-Scoring-System) — Learn how resume evaluation works
