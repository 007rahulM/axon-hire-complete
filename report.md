# Axon Hire – Operational Report

## Overview
Axon Hire is a full‑stack recruitment platform with an Express/MongoDB API (`backend/`) and a React + Vite client (`frontend/`). The backend handles authentication (OTP + Google), job/application workflows, AI scoring, notifications, and admin tooling. The frontend provides the recruiter dashboard, application Kanban, AI scoring views, and auth flows.

## Repository Layout
- `backend/`: Express app (server.js), Mongoose models, route modules, middleware, AI utilities, Jest tests.
- `frontend/`: React app (Vite), Tailwind styling, auth/route guards, API client.
- `README.md`: Primary end‑to‑end guide with API tables and deployment notes.

## Setup & Environment
1) Backend
```
cd backend
npm install
```
Create `backend/.env` (see README for details):
```
MONGO_URI=...
JWT_SECRET=...               # 32+ chars recommended
EMAIL_USER=...
EMAIL_PASS=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
OPENROUTER_API_KEY=...       # at least one AI key required
GROQ_API_KEY=...
GOOGLE_API_KEY=...
GOOGLE_CLIENT_ID=...
CRON_SECRET=...
PORT=5000
```
Start:
```
npm run dev    # hot reload
npm start      # production
```
One‑time data seed (skill taxonomy):
```
node scripts/seedSkills.js
```

2) Frontend
```
cd frontend
npm install
```
Create `frontend/.env.local`:
```
VITE_GOOGLE_CLIENT_ID=...
```
Run:
```
npm run dev       # http://localhost:5173
npm run build
npm run preview
```

## Testing & Quality
- Backend: `cd backend && npm test` (Jest with @shelf/jest-mongodb). Dependencies must be installed first.
- Frontend: `cd frontend && npm run lint` (ESLint).

## Deployment (from README)
- Frontend → Vercel (root: `frontend/`, Vite autodetected; `vercel.json` handles SPA routing).
- Backend → Render (root: `backend/`, build `npm install`, start `npm start`; mirror `.env` vars in dashboard).

## Key Features Snapshot
- Auth: OTP + Google OAuth, JWT (12h), recruiter onboarding, admin role gating.
- Jobs & Applications: CRUD, Kanban statuses, scheduling, notifications, job alerts.
- AI: Carousel (OpenRouter → Groq → Gemini) with deterministic 60/30/10 scoring; resume parsing and skill normalization cache.
- Files/Email: Cloudinary uploads; Nodemailer for OTP/alerts.

## Quick API Reference
Full endpoint tables are in `README.md` (Authentication, Jobs, Applications, Users, Notifications/Alerts, AI, Admin). Use `frontend/src/api/config.js` to point the UI to your backend (`API_BASE_URL`).
