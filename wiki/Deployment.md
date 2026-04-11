# 🌐 Deployment

This page covers how to deploy Axon Hire to production — frontend on **Vercel** and backend on **Render**.

---

## Architecture Overview

```
Users  ──▶  Vercel (Frontend)  ──▶  Render (Backend API)  ──▶  MongoDB Atlas
                                                         ├──▶  Cloudinary (Files)
                                                         └──▶  Gmail SMTP (Email)
```

---

## Frontend → Vercel

### Steps

1. **Push your code to GitHub** (already done if you forked the repo)

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
   - Select the `axon-hire-complete` repository

3. **Configure the project**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)

4. **Add Environment Variables** (in Vercel project settings → Environment Variables):
   ```
   VITE_GOOGLE_CLIENT_ID = your-google-oauth-client-id
   ```
   
   > If your backend is deployed to a custom URL, also set:
   > ```
   > VITE_API_URL = https://your-backend.onrender.com/api
   > ```

5. **Deploy** — Vercel auto-deploys on every push to `main`

### SPA Routing Fix

The `frontend/vercel.json` file is already included and handles client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This ensures that direct URL access (e.g. `https://your-app.vercel.app/jobs`) doesn't return a 404.

---

## Backend → Render

### Steps

1. **Push your code to GitHub**

2. **Create a Web Service on Render**
   - Go to [render.com](https://render.com) → New → Web Service
   - Connect your GitHub account and select the repository

3. **Configure the service**
   - **Name:** `axon-hire-backend` (or any name)
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

4. **Add Environment Variables** (in Render service → Environment tab):

   ```
   MONGO_URI              = mongodb+srv://...
   JWT_SECRET             = your-secret-min-32-chars
   EMAIL_USER             = your@gmail.com
   EMAIL_PASS             = your-gmail-app-password
   CLOUDINARY_CLOUD_NAME  = your-cloud-name
   CLOUDINARY_API_KEY     = your-api-key
   CLOUDINARY_API_SECRET  = your-api-secret
   OPENROUTER_API_KEY     = your-openrouter-key  (optional but recommended)
   GROQ_API_KEY           = your-groq-key        (optional)
   GOOGLE_API_KEY         = your-gemini-key      (optional)
   GOOGLE_CLIENT_ID       = your-google-client-id
   CRON_SECRET            = any-random-string
   PORT                   = 10000
   ```

   > Render sets `PORT` automatically — use `10000` as default if manually required.

5. **Deploy** — Render auto-deploys on every push to `main`

### Seed Skills (First Deploy Only)

After your first successful deployment, open a **Shell** in the Render dashboard and run:

```bash
node scripts/seedSkills.js
```

This populates the 500+ canonical skills needed for accurate AI scoring.

---

## CORS Configuration

After deployment, update the CORS `origin` whitelist in `backend/server.js` to include your Vercel URL:

```js
cors({
  origin: [
    "https://your-app.vercel.app",   // ← add this
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  ...
})
```

Commit and push — Render will redeploy automatically.

---

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a **Database User** with read/write access
3. Whitelist **all IPs** (`0.0.0.0/0`) for Render compatibility (or use Render's static outbound IPs if on a paid plan)
4. Copy the **Connection String** and replace `<username>` and `<password>` in `MONGO_URI`

---

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → copy **Cloud Name**, **API Key**, **API Secret**
3. No special configuration needed — the upload middleware handles folder structure automatically

---

## Gmail SMTP Setup

1. Enable **2-Factor Authentication** on your Gmail account
2. Go to **Google Account → Security → App Passwords**
3. Create an app password for "Mail" → use it as `EMAIL_PASS`
4. Use your Gmail address as `EMAIL_USER`

> Standard Gmail passwords will **not** work — you must use an App Password.

---

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → **APIs & Services → Credentials → Create OAuth 2.0 Client ID**
3. **Authorized JavaScript Origins:**
   ```
   https://your-app.vercel.app
   http://localhost:5173
   ```
4. **Authorized Redirect URIs:** (not needed for implicit flow — leave empty or add your domain)
5. Copy the **Client ID** → use as `VITE_GOOGLE_CLIENT_ID` (frontend) and `GOOGLE_CLIENT_ID` (backend)

---

## Deployment Checklist

Before going live, verify:

- [ ] MongoDB Atlas cluster is running and IP whitelist includes `0.0.0.0/0`
- [ ] All required environment variables are set on Render
- [ ] `VITE_GOOGLE_CLIENT_ID` is set on Vercel
- [ ] Vercel domain is added to Google Cloud Console OAuth origins
- [ ] Vercel domain is added to CORS whitelist in `backend/server.js`
- [ ] `node scripts/seedSkills.js` has been run once on the deployed backend
- [ ] Health check passes: `GET https://your-backend.onrender.com/` returns `"job portal backend is running"`

---

## URLs Reference

| Service | Default URL |
|---------|-------------|
| **Frontend** | `https://your-app.vercel.app` |
| **Backend** | `https://your-backend.onrender.com` |
| **Backend Health** | `https://your-backend.onrender.com/` |
| **API Base** | `https://your-backend.onrender.com/api` |

---

## Keeping Render Awake (Free Tier)

Render's free tier spins down after 15 minutes of inactivity. To avoid cold starts:

- **Option A:** Use a service like [UptimeRobot](https://uptimerobot.com/) to ping `https://your-backend.onrender.com/` every 10 minutes
- **Option B:** Upgrade to Render's paid tier ($7/month) for always-on instances
