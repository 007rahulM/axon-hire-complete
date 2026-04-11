# 🚀 Axon Hire — Project Wiki

> **AI-Powered Recruitment Platform — Filter Signal from Noise in Hiring**

Welcome to the official Axon Hire wiki. Use the navigation below to find exactly what you need.

---

## 📚 Wiki Pages

| Page | Description |
|------|-------------|
| [🏠 Home](Home) | You are here — project overview and navigation |
| [⚡ Getting Started](Getting-Started) | Clone, configure, and run the app locally |
| [🏗️ Architecture](Architecture) | System design, tech stack, and data flow |
| [📡 API Reference](API-Reference) | Full REST API endpoint documentation |
| [🤖 AI Scoring System](AI-Scoring-System) | How resume scoring and AI evaluation work |
| [🗄️ Data Models](Data-Models) | MongoDB schema documentation |
| [🔒 Authentication](Authentication) | Auth flows, JWT, OTP, and Google OAuth |
| [🌐 Deployment](Deployment) | Deploy frontend (Vercel) and backend (Render) |
| [🤝 Contributing](Contributing) | How to contribute to the project |

---

## 📖 Project Overview

**Axon Hire** is a full-stack, AI-powered job portal and recruitment platform that streamlines the entire hiring process — from job posting to candidate evaluation.

It combines **intelligent resume parsing**, **multi-model AI scoring**, and a **Kanban-style recruiter dashboard** to help teams make better hiring decisions, faster.

### 🎯 Who is it for?

| Role | What You Can Do |
|------|-----------------|
| **Job Seekers** | Discover jobs, apply with AI-assisted profile matching, track applications, and receive real-time notifications |
| **Recruiters** | Post jobs, review AI-scored applications, manage candidates through a drag-and-drop pipeline, schedule interviews, and export data |
| **Admins** | Manage users, moderate jobs, maintain a global skill taxonomy, and view platform-wide analytics |

---

## ✨ Key Highlights

- 🤖 **Multi-Model AI**: Tries OpenRouter → Groq → Gemini with automatic fallback
- 🧮 **Deterministic Scoring**: 60 pts skills + 30 pts experience + 10 pts integrity = 100
- 📋 **Kanban Board**: Drag-and-drop candidate pipeline management
- 🔔 **Real-time Notifications**: In-app + email alerts for application status changes
- 🏷️ **500+ Skill Normalization**: Canonical skills with synonym mapping
- 📊 **Analytics Dashboard**: Platform-wide stats for admins

---

## 🔗 Quick Links

- **Live Demo**: [axon-hire-complete-mvp.vercel.app](https://axon-hire-complete-mvp.vercel.app)
- **Backend API**: [axon-hire-mvp.onrender.com/api](https://axon-hire-mvp.onrender.com/api)
- **GitHub Repository**: [007rahulM/axon-hire-complete](https://github.com/007rahulM/axon-hire-complete)
- **Issues & Bug Reports**: [GitHub Issues](https://github.com/007rahulM/axon-hire-complete/issues)

---

## 🛠 Quick Start (TL;DR)

```bash
# 1. Clone
git clone https://github.com/007rahulM/axon-hire-complete.git
cd axon-hire-complete

# 2. Install & configure backend
cd backend && npm install
cp .env.example .env   # Edit .env with your keys

# 3. Install & configure frontend
cd ../frontend && npm install
echo "VITE_GOOGLE_CLIENT_ID=your-key" > .env.local

# 4. Start both servers
cd backend && npm run dev   # http://localhost:5000
cd frontend && npm run dev  # http://localhost:5173
```

→ See [Getting Started](Getting-Started) for the full setup guide.

---

*Built with ❤️ by the Axon Hire Team*
