<p align="center">
  <h1 align="center">🚀 Axon Hire</h1>
  <p align="center">
    <strong>AI-Powered Recruitment Platform — Filter Signal from Noise in Hiring</strong>
  </p>
  <p align="center">
    <a href="https://axon-hire-complete-mvp.vercel.app">Live Demo</a> ·
    <a href="#-features">Features</a> ·
    <a href="#-getting-started">Getting Started</a> ·
    <a href="#-api-reference">API Reference</a>
  </p>
</p>

---

## 📖 Overview

**Axon Hire** is a full-stack, AI-powered job portal and recruitment platform that streamlines the entire hiring process — from job posting to candidate evaluation. It combines **intelligent resume parsing**, **multi-model AI scoring**, and a **Kanban-style recruiter dashboard** to help teams make better hiring decisions, faster.

### Who is it for?

| Role | What You Can Do |
|------|-----------------|
| **Job Seekers** | Discover jobs, apply with AI-assisted profile matching, track applications, and receive real-time notifications |
| **Recruiters** | Post jobs, review AI-scored applications, manage candidates through a drag-and-drop pipeline, schedule interviews, and export data |
| **Admins** | Manage users, moderate jobs, maintain a global skill taxonomy, and view platform-wide analytics |

---

## ✨ Features

### For Job Seekers
- ✅ Register with **OTP email verification** or **Google Sign-In**
- ✅ Upload resume & avatar to cloud storage (Cloudinary)
- ✅ Browse active jobs with search and filters
- ✅ Apply to jobs — triggers a **background AI audit** of your resume
- ✅ View your **AI match score** and matched skills per application
- ✅ Save favourite jobs for later
- ✅ Track application status in a visual timeline
- ✅ Receive **notifications** on status changes (in-app + email)
- ✅ Subscribe to **job alerts** by keyword (email notifications for new postings)

### For Recruiters
- ✅ Register with company profile
- ✅ Post jobs with required skills and auto-evaluation toggle
- ✅ **Kanban board** workflow: Submitted → Viewed → Shortlisted → Interviewing → Hired / Rejected
- ✅ AI-powered candidate scoring with confidence levels
- ✅ **Drag-and-drop** application management
- ✅ Schedule interviews with date, time, link, and notes
- ✅ **Export** applications to Excel
- ✅ Filter by job, score, date, or status

### For Admins
- ✅ View platform-wide stats (users, jobs, applications)
- ✅ Manage users (delete accounts, change roles)
- ✅ Moderate jobs (force delete)
- ✅ **Skill Map** — approve new skills into the global taxonomy

### AI & Intelligence
- 🤖 **Multi-Model AI Carousel**: Tries OpenRouter (Mistral 7B) → Groq (LLaMA 3.3) → Gemini 2.5 with automatic fallback
- 🧮 **Deterministic Scoring**: 60 pts skills + 30 pts experience + 10 pts integrity = 100
- 📑 **Resume Parsing**: Extracts experience, education, and skill sections from PDF resumes
- 🏷️ **Skill Normalization**: 500+ canonical skills with synonym mapping (e.g., "React" = "React.js" = "ReactJS")

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose |
|-----------|---------|
| **Node.js** + **Express 5** | REST API server |
| **MongoDB** + **Mongoose** | NoSQL database |
| **JWT** | Authentication (12-hour token expiry) |
| **bcryptjs** | Password hashing |
| **Cloudinary** + **Multer** | File uploads (resumes, avatars) |
| **Nodemailer** | Email service (OTP, notifications, alerts) |
| **OpenAI / Groq / Gemini** | Multi-model AI evaluation |
| **pdf-parse** | Resume text extraction |
| **node-cron** | Scheduled job cleanup |
| **Helmet** + **CORS** | Security headers |

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite** | Fast development bundler |
| **Tailwind CSS** | Utility-first styling with dark mode |
| **React Router v6** | Client-side routing |
| **Framer Motion** | Smooth animations |
| **DND Kit** | Drag-and-drop Kanban board |
| **Recharts** | Dashboard charts |
| **Axios** | HTTP client with interceptors |
| **XLSX** | Excel export |
| **Lucide React** | Icon library |

---

## 📁 Project Structure

```
axon-hire-complete/
│
├── backend/
│   ├── server.js                  # Express app entry point
│   ├── package.json
│   ├── nodemon.json               # Dev auto-reload config
│   ├── models/
│   │   ├── User.js                # User schema (candidate, recruiter, admin)
│   │   ├── Job.js                 # Job posting schema
│   │   ├── Application.js         # Application + AI analysis results
│   │   ├── Company.js             # Company profile
│   │   ├── Skill.js               # Global skill taxonomy
│   │   ├── Notification.js        # In-app notifications
│   │   ├── JobAlert.js            # Job alert subscriptions
│   │   └── Interview.js           # Interview scheduling
│   ├── routes/
│   │   ├── authRoutes.js          # Register, login, OAuth, OTP
│   │   ├── jobRoutes.js           # Job CRUD + deadline cleanup
│   │   ├── applicationRoutes.js   # Apply, status updates, scheduling
│   │   ├── userRoutes.js          # Profile, resume, avatar, saved jobs
│   │   ├── adminRoutes.js         # Admin dashboard + skill approval
│   │   ├── aiRoutes.js            # AI analysis orchestration
│   │   ├── notificationRoutes.js  # Notification management
│   │   ├── alertRoutes.js         # Job alert subscriptions
│   │   └── interviewRoutes.js     # Interview management
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   ├── adminMiddleware.js     # Admin role check
│   │   └── uploadMiddleware.js    # Cloudinary upload config
│   ├── utils/
│   │   ├── aiServices.js          # Multi-model AI carousel
│   │   ├── resumeParser.js        # PDF text extraction + zoning
│   │   ├── matchingEngine.js      # Deterministic skill scoring (v3)
│   │   ├── skillMap.js            # 500+ skill normalization cache
│   │   ├── durationMath.js        # Experience duration parsing
│   │   └── emailService.js        # HTML email templates + sending
│   └── scripts/
│       └── seedSkills.js          # Seed initial skill taxonomy
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json                # SPA routing for Vercel
│   ├── index.html
│   └── src/
│       ├── main.jsx               # React entry point
│       ├── App.jsx                # Route definitions
│       ├── index.css              # Global styles (Tailwind)
│       ├── api/
│       │   ├── axiosInstance.js    # Axios config + auth interceptors
│       │   └── config.js          # API base URL
│       ├── context/
│       │   └── AuthContext.jsx    # Global auth state (user, token)
│       ├── routes/
│       │   ├── ProtectedRoute.jsx # Auth guard
│       │   └── AdminRoute.jsx     # Admin guard
│       ├── components/
│       │   ├── Navbar.jsx         # Navigation bar + notifications
│       │   ├── NotificationBell.jsx # Real-time notification dropdown
│       │   ├── ScheduleModal.jsx  # Interview scheduling modal
│       │   └── RecruiterOnboardingModal.jsx
│       └── pages/
│           ├── Home.jsx           # Landing page
│           ├── Login.jsx          # Login form
│           ├── Register.jsx       # User registration
│           ├── RegisterRecruiter.jsx
│           ├── Jobs.jsx           # Browse job listings
│           ├── MyApplications.jsx # Application history
│           ├── SavedJobs.jsx      # Saved jobs list
│           ├── Profile.jsx        # Profile management
│           ├── PostJob.jsx        # Create/edit job
│           ├── RecruiterDashboard.jsx # Kanban board
│           ├── AdminDashboard.jsx # Admin control panel
│           ├── AIBot.jsx          # AI chat assistant
│           ├── JobAlert.jsx       # Alert subscription
│           └── Feedback.jsx       # Feedback form
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** (comes with Node.js)
- **MongoDB** — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or a local instance
- **Cloudinary** account — [Sign up free](https://cloudinary.com/)
- **Gmail** account with [App Password](https://support.google.com/accounts/answer/185833) enabled
- **Google Cloud** project with OAuth 2.0 Client ID — [Console](https://console.cloud.google.com/) (Frontend needs `VITE_GOOGLE_CLIENT_ID`)
- AI API keys (at least one): [OpenRouter](https://openrouter.ai/), [Groq](https://console.groq.com/), or [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/007rahulM/axon-hire-complete.git
cd axon-hire-complete
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/axon-hire

# Authentication
JWT_SECRET=your-secret-key-min-32-characters

# Email (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI Services (at least one required)
OPENROUTER_API_KEY=your-openrouter-key
GROQ_API_KEY=your-groq-key
GOOGLE_API_KEY=your-google-gemini-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-oauth-client-id

# Cron Job Security
CRON_SECRET=your-cron-secret

# Server
PORT=5000
```

Start the backend:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

> **Required once for accurate skill scoring**: Seed the initial skill taxonomy:
> ```bash
> node scripts/seedSkills.js
> ```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` (or `.env`) file in `frontend/`:

```env
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Start the frontend:

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview
```

### 4. Access the Application

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |
| Deployed API (prod) | https://axon-hire-mvp.onrender.com/api |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Set the **Root Directory** to `frontend`
4. Vercel auto-detects Vite — builds and deploys automatically
5. The `vercel.json` handles SPA routing

### Backend → Render

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the **Root Directory** to `backend`
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`
5. Add all environment variables from the `.env` file to the Render dashboard

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user (sends OTP) | No |
| POST | `/api/auth/verify-otp` | Verify OTP and activate account | No |
| POST | `/api/auth/login` | Login with email & password | No |
| POST | `/api/auth/google` | Google OAuth login | No |
| POST | `/api/auth/register-recruiter` | Recruiter signup with company | No |
| PUT | `/api/auth/onboard-recruiter` | Upgrade user to recruiter | Yes |

### Jobs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/jobs` | List all active jobs | No |
| POST | `/api/jobs` | Create a new job | Yes (Recruiter) |
| GET | `/api/jobs/my-jobs` | Get recruiter's posted jobs | Yes (Recruiter) |
| DELETE | `/api/jobs/:id` | Delete a job (cascade) | Yes (Recruiter) |
| PATCH | `/api/jobs/:id/toggle` | Open/close a job | Yes (Recruiter) |

### Applications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/applications/:jobId/apply` | Apply for a job (triggers AI audit) | Yes |
| GET | `/api/applications/recruiter` | Get all applications for recruiter's jobs | Yes (Recruiter) |
| GET | `/api/applications/my-applications` | Get candidate's application history | Yes |
| PUT | `/api/applications/:id/status` | Update application status | Yes (Recruiter) |
| POST | `/api/applications/:id/schedule` | Schedule interview | Yes (Recruiter) |

### User Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/update-profile` | Update bio, skills, experience | Yes |
| POST | `/api/users/upload-avatar` | Upload profile picture | Yes |
| POST | `/api/users/upload-resume` | Upload master resume (PDF) | Yes |
| PUT | `/api/users/save/:jobId` | Toggle save/unsave a job | Yes |
| GET | `/api/users/saved-jobs` | List all saved jobs | Yes |
| POST | `/api/users/feedback` | Send feedback email | Yes |

### Notifications & Alerts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/notifications` | Get user notifications | Yes |
| PUT | `/api/notifications/:id/read` | Mark notification as read | Yes |
| PUT | `/api/notifications/read-all` | Mark all as read | Yes |
| POST | `/api/alerts/subscribe` | Subscribe to job alerts | Yes |

### Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/stats` | Platform-wide statistics | Yes (Admin) |
| GET | `/api/admin/users` | List all users | Yes (Admin) |
| DELETE | `/api/admin/users/:id` | Delete a user | Yes (Admin) |
| PUT | `/api/admin/users/:id/role` | Change user role | Yes (Admin) |
| GET | `/api/admin/jobs` | List all jobs | Yes (Admin) |
| GET | `/api/admin/applications` | List all applications | Yes (Admin) |
| GET | `/api/admin/skills` | View skill taxonomy | Yes (Admin) |
| PATCH | `/api/admin/skills/:id/approve` | Approve a new skill | Yes (Admin) |

---

## 🔒 Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Register   │────▶│  Send OTP    │────▶│ Verify OTP  │
│   (Email)    │     │  via Email   │     │ (6 digits)  │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                 │
                    ┌──────────────┐              ▼
                    │ Google OAuth │────▶  Account Active
                    │   Sign-In   │       ┌──────┴──────┐
                    └──────────────┘       │    Login    │
                                          └──────┬──────┘
                                                 ▼
                                          JWT Token (12h)
                                          Stored in localStorage
                                          Sent via Authorization header
```

- **JWT tokens** expire after 12 hours
- **OTP codes** expire after 10 minutes
- Passwords are hashed using **bcryptjs** (10 salt rounds)
- Expired/invalid tokens trigger automatic redirect to login

---

## 🤖 How AI Scoring Works

When a candidate applies, the system runs a **two-phase evaluation**:

### Phase 1 — Deterministic Score (Instant)
| Component | Weight | How It Works |
|-----------|--------|-------------|
| **Skills Match** | 60 pts | Canonical skill normalization against 500+ synonyms |
| **Experience** | 30 pts | Parsed duration vs. job requirements |
| **Integrity** | 10 pts | Resume quality and completeness check |

### Phase 2 — AI Analysis (Background)
The system uses a **multi-model carousel** for resilience:

1. **OpenRouter** (Mistral 7B) — First attempt
2. **Groq** (LLaMA 3.3) — Fallback if OpenRouter fails
3. **Gemini 2.5 Flash** — Final fallback

The AI provides:
- Confidence score (0–100)
- Matched and missing skills
- Strengths and weaknesses summary
- Hiring recommendation

---

## 🧪 Linting

```bash
# Frontend linting
cd frontend
npm run lint
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "Add my feature"`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📬 Feedback & Support

Have a question or suggestion? Use the in-app **Feedback** form or open a [GitHub Issue](https://github.com/007rahulM/axon-hire-complete/issues).

---

<p align="center">
  Built with ❤️ by the Axon Hire Team
</p>
