# 🏗️ Architecture

This page describes the high-level system design, technology stack, and data flow of Axon Hire.

---

## System Overview

Axon Hire is a **monorepo** containing a React frontend and a Node.js/Express backend. The two communicate exclusively via a REST API. All persistent data lives in **MongoDB Atlas**, and file assets (resumes, avatars) are stored in **Cloudinary**.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│                                                             │
│   React 18 + Vite  ←→  Tailwind CSS + Framer Motion        │
│   DND Kit (Kanban)     Recharts (Analytics)                 │
│   Axios (HTTP)                                              │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS (REST API)
┌────────────────────────────▼────────────────────────────────┐
│                      SERVER LAYER                           │
│                                                             │
│   Node.js + Express 5                                       │
│   JWT Auth  │  Rate Limiting  │  Helmet (Security)          │
│   Multer + Cloudinary (Uploads)                             │
│   Nodemailer (Email)                                        │
│   node-cron (Scheduled Tasks)                               │
└──────────┬──────────────────┬───────────────────────────────┘
           │                  │
┌──────────▼──────┐  ┌────────▼────────────────────────────┐
│  MongoDB Atlas  │  │         AI Carousel                 │
│                 │  │                                     │
│  Users          │  │  1. OpenRouter (Mistral 7B)          │
│  Jobs           │  │  2. Groq (LLaMA 3.3)                │
│  Applications   │  │  3. Gemini 2.5 Flash                │
│  Companies      │  │                                     │
│  Skills         │  │  + pdf-parse (Resume text)          │
│  Notifications  │  │  + matchingEngine (Deterministic)   │
│  JobAlerts      │  │  + skillMap (500+ synonyms)          │
│  Interviews     │  └─────────────────────────────────────┘
└─────────────────┘
           │
┌──────────▼──────────┐
│     Cloudinary      │
│  (Resumes + Avatars)│
└─────────────────────┘
```

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v16+ | Runtime environment |
| **Express 5** | 5.x | REST API framework |
| **MongoDB** | – | NoSQL database |
| **Mongoose** | 7.x | ODM — schema definition & queries |
| **JWT (jsonwebtoken)** | – | Stateless authentication (12h expiry) |
| **bcryptjs** | – | Password hashing (10 salt rounds) |
| **Cloudinary + Multer** | – | File uploads (resumes, avatars) |
| **Nodemailer** | – | Email (OTP, notifications, job alerts) |
| **pdf-parse** | – | Extract text from PDF resumes |
| **node-cron** | – | Scheduled job cleanup |
| **Helmet** | – | Security HTTP headers |
| **express-rate-limit** | – | Brute-force and DoS protection |
| **Morgan + Winston** | – | Structured request logging |
| **OpenAI / Groq / Gemini SDKs** | – | Multi-model AI evaluation |
| **Jest** | – | Unit & integration testing |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React 18** | 18.x | UI library |
| **Vite** | 5.x | Build tool & dev server |
| **Tailwind CSS** | 3.x | Utility-first styling with dark mode |
| **React Router v6** | 6.x | Client-side routing |
| **Framer Motion** | – | Page and component animations |
| **@dnd-kit** | – | Drag-and-drop Kanban board |
| **Recharts** | – | Analytics charts |
| **Axios** | – | HTTP client with auth interceptors |
| **XLSX (SheetJS)** | – | Excel export |
| **Lucide React** | – | Icon system |

---

## Project Structure

```
axon-hire-complete/
│
├── backend/
│   ├── server.js                  # App entry point
│   ├── package.json
│   ├── nodemon.json               # Dev auto-reload config
│   │
│   ├── models/
│   │   ├── User.js                # User schema (candidate/recruiter/admin)
│   │   ├── Job.js                 # Job posting schema
│   │   ├── Application.js         # Application + AI analysis results
│   │   ├── Company.js             # Company profile
│   │   ├── Skill.js               # Global skill taxonomy
│   │   ├── Notification.js        # In-app notifications
│   │   ├── JobAlert.js            # Email alert subscriptions
│   │   └── Interview.js           # Interview scheduling
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # Register, login, OAuth, OTP
│   │   ├── jobRoutes.js           # Job CRUD + deadline cleanup
│   │   ├── applicationRoutes.js   # Apply, status, scheduling
│   │   ├── userRoutes.js          # Profile, resume, avatar, saved jobs
│   │   ├── adminRoutes.js         # Admin dashboard + skill approval
│   │   ├── aiRoutes.js            # AI analysis orchestration
│   │   ├── notificationRoutes.js  # Notification management
│   │   ├── alertRoutes.js         # Job alert subscriptions
│   │   └── interviewRoutes.js     # Interview management (not yet mounted)
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   ├── adminMiddleware.js     # Admin role check
│   │   └── uploadMiddleware.js    # Cloudinary / Multer config
│   │
│   ├── utils/
│   │   ├── aiServices.js          # Multi-model AI carousel
│   │   ├── resumeParser.js        # PDF text extraction + zoning
│   │   ├── matchingEngine.js      # Deterministic scoring (v3)
│   │   ├── skillMap.js            # 500+ skill normalization cache
│   │   ├── durationMath.js        # Experience duration parsing
│   │   ├── emailService.js        # HTML email templates + SMTP
│   │   └── logger.js              # Winston structured logger
│   │
│   └── scripts/
│       └── seedSkills.js          # Seed initial skill taxonomy
│
├── frontend/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json                # SPA routing for Vercel
│   └── src/
│       ├── main.jsx               # React entry point
│       ├── App.jsx                # Route definitions
│       ├── api/
│       │   ├── axiosInstance.js   # Axios config + auth interceptors
│       │   └── config.js          # API base URL
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state
│       ├── routes/
│       │   ├── ProtectedRoute.jsx # Auth guard
│       │   └── AdminRoute.jsx     # Admin role guard
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── NotificationBell.jsx
│       │   ├── ScheduleModal.jsx
│       │   └── RecruiterOnboardingModal.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx / Register.jsx / RegisterRecruiter.jsx / VerifyOTP.jsx
│           ├── Jobs.jsx / PostJob.jsx
│           ├── MyApplications.jsx / SavedJobs.jsx
│           ├── Profile.jsx
│           ├── RecruiterDashboard.jsx
│           ├── AdminDashboard.jsx
│           ├── AIBot.jsx
│           ├── JobAlert.jsx
│           └── Feedback.jsx
│
└── wiki/                          # This documentation
```

---

## Request Lifecycle

Below is an example of a **job application** request lifecycle:

```
Browser (React)
  │
  │  POST /api/applications/:jobId/apply
  │  Authorization: Bearer <jwt>
  │
  ▼
Express Middleware Stack
  ├── CORS check
  ├── JSON body parser
  ├── Helmet headers
  ├── Rate limiter (100 req / 15 min per IP)
  ├── authMiddleware — verify JWT, attach req.user
  │
  ▼
applicationRoutes.js — apply handler
  ├── Validate: user has resume uploaded
  ├── Check: not already applied
  ├── Create Application document (status: "submitted")
  ├── Respond 201 to client (fast, non-blocking)
  │
  └── Background (async, does NOT block response)
        ├── resumeParser — fetch PDF from Cloudinary, extract text
        ├── matchingEngine v3 — deterministic 60/30/10 score
        ├── aiServices carousel — OpenRouter → Groq → Gemini
        ├── Update Application with scores, matched skills, AI summary
        ├── Notify candidate (in-app + email)
        └── Notify recruiter (in-app)
```

---

## Rate Limiting

| Endpoint Group | Limit |
|---------------|-------|
| `/api/auth/*` | 5 requests / 15 min (strict — brute-force protection) |
| `/api/jobs`, `/api/ai`, `/api/applications`, `/api/admin`, `/api/notifications`, `/api/alerts`, `/api/users` | 100 requests / 15 min |

---

## Security Measures

- **Helmet** — sets Content-Security-Policy, X-Frame-Options, etc.
- **JWT** — stateless tokens, 12-hour expiry, sent via `Authorization: Bearer` header
- **bcryptjs** — passwords hashed with 10 salt rounds (never stored in plain text)
- **OTP** — 6-digit code, 10-minute expiry, verified before account activation
- **Rate limiting** — prevents brute force on auth endpoints
- **CORS** — whitelisted origins only (production + localhost)
- **Environment variables** — all secrets kept in `.env`, never committed

---

## Background Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| **Expired job cleanup** | Daily (cron) | Closes jobs past their deadline |
| **Skill cache refresh** | On startup + triggered | Reloads skill taxonomy into memory |

---

## Next Steps

- 📡 [API Reference](API-Reference) — All endpoints documented
- 🤖 [AI Scoring System](AI-Scoring-System) — Scoring algorithm deep dive
- 🗄️ [Data Models](Data-Models) — MongoDB schemas
