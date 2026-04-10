# 🧠 Axon Hire — Full Product & Engineering Audit

> **Goal**: Scale to 10,000+ users without crashes, security breaches, or poor UX.

---

## How to Navigate This Audit

Each issue has two places to look:

1. **This table** — quick reference: what it is, severity, and current status
2. **[`issues/`](./issues/)** — deep-dive file with the **team discussing it in plain English**, step-by-step fix instructions including manual steps, and teaching

**If you need to set up an external tool** (Redis, Docker, Sentry, etc.) → see [`../setup/`](../setup/) for complete manual guides (which website to go to, which buttons to click, where to copy the key).

---

## The Team

Every issue deep-dive is written as if this team is in the room with you:

| Persona | Role | Focus |
|---------|------|-------|
| 🔴 **Priya** | Product Manager | User impact, business risk |
| 🟠 **Ben** | Backend Engineer | Node.js, MongoDB, APIs |
| 🟣 **Sam** | Security Engineer | Vulnerabilities, attack vectors |
| 🟡 **Dev** | DevOps Engineer | Infrastructure, Docker, CI/CD |
| 🔵 **Fay** | Frontend Engineer | React, UX, performance |

---

## Branch Map

| Branch | Focus | Priority |
|--------|-------|----------|
| [Branch 1](./branch-1-security.md) | Security Fixes | 🔴 Do First |
| [Branch 2](./branch-2-ux.md) | Critical Missing UX | 🟠 Do Second |
| [Branch 3](./branch-3-performance.md) | Performance & Scale | 🟡 Third |
| [Branch 4](./branch-4-ai.md) | AI & Resume Improvements | 🟣 Fourth |
| [Branch 5](./branch-5-ui-ux.md) | UI/UX Polish | 🟤 Fifth |
| [Branch 6](./branch-6-devex.md) | Developer Experience & Infra | ⚙️ Sixth |
| [Branch 7](./branch-7-features.md) | New Features | 🔵 Seventh |

---

## Quick Reference: All 46 Issues

| # | Issue | Severity | Status | Deep-Dive |
|---|-------|----------|--------|-----------|
| 1 | MongoDB connects twice | 🔴 Critical | ✅ Fixed | [issues/01](./issues/01-double-mongodb-connect.md) |
| 2 | Auth middleware logs all headers | 🔴 Critical | ✅ Fixed | — |
| 3 | JWT stored in localStorage | 🔴 Critical | 🔵 Branch 7 | [issues/03](./issues/03-jwt-in-localstorage.md) |
| 4 | interviewRoutes not mounted | 🔴 Critical | ✅ Fixed | — |
| 5 | Rate limiter on /api/users twice | 🔴 Critical | ✅ Fixed | — |
| 6 | No NoSQL injection protection | 🟠 Security | ✅ Fixed | — |
| 7 | No CSRF protection | 🟠 Security | 🔵 Branch 7 | — |
| 8 | No account lockout | 🟠 Security | ✅ Fixed | — |
| 9 | No file type validation on upload | 🟠 Security | ✅ Fixed | — |
| 10 | OTP stored in plain text | 🟠 Security | ✅ Fixed | — |
| 11 | No Redis caching layer | 🟡 Performance | Branch 3 | [issues/11](./issues/11-redis-caching.md) |
| 12 | AI uses setImmediate (not a queue) | 🟡 Performance | Branch 3 | — |
| 13 | No pagination on jobs list | 🟡 Performance | ✅ Already exists | — |
| 14 | Same resume parsed multiple times | 🟡 Performance | Branch 4 | — |
| 15 | Missing DB indexes | 🟡 Performance | ✅ Fixed | — |
| 16 | Home.jsx is 134KB | 🟡 Performance | Branch 5 | — |
| 17 | No forgot password flow | 🔵 Feature | ✅ Fixed | — |
| 18 | No refresh token mechanism | 🔵 Feature | Branch 7 | — |
| 19 | No full-text search | 🔵 Feature | Branch 3 | [setup/06](../setup/06-mongodb-atlas-search.md) |
| 20 | No cover letter support | 🔵 Feature | Branch 7 | — |
| 21 | No company profile pages | 🔵 Feature | Branch 7 | — |
| 22 | No resend OTP | 🔵 Feature | ✅ Fixed | — |
| 23 | No GDPR compliance | 🔵 Feature | Branch 7 | — |
| 24 | No API versioning | 🔵 Feature | Branch 7 | — |
| 25 | No error monitoring (Sentry) | 🔵 Feature | Branch 6 | [setup/03](../setup/03-sentry.md) |
| 26 | No product analytics (PostHog) | 🔵 Feature | Branch 6 | [setup/04](../setup/04-posthog.md) |
| 27 | Resume scoring is gameable | 🟣 AI | Branch 4 | — |
| 28 | No semantic matching | 🟣 AI | Branch 4 | — |
| 29 | AI models try sequentially | 🟣 AI | Branch 4 | [issues/29](./issues/29-ai-parallel-race.md) |
| 30 | No DOCX resume support | 🟣 AI | Branch 4 | — |
| 31 | AI Bot is a full page | 🟣 AI | Branch 5 | — |
| 32 | No skeleton loading states | 🟤 UX | Branch 5 | — |
| 33 | No onboarding flow | 🟤 UX | Branch 5 | — |
| 34 | No SEO | 🟤 UX | Branch 6 | — |
| 35 | No accessibility (a11y) | 🟤 UX | Branch 5 | — |
| 36 | No rich text editor for jobs | 🟤 UX | Branch 5 | — |
| 37 | No dark mode toggle | 🟤 UX | Branch 5 | — |
| 38 | Massive dead code | ⚙️ Quality | Branch 6 | — |
| 39 | No TypeScript | ⚙️ Quality | Branch 6 | — |
| 40 | No API documentation | ⚙️ Quality | Branch 6 | — |
| 41 | No frontend state management | ⚙️ Quality | Branch 3 | — |
| 42 | No CI/CD pipeline | ⚙️ Quality | Branch 6 | [issues/42](./issues/42-cicd-pipeline.md) + [setup/05](../setup/05-github-actions.md) |
| 43 | No env config validation | ⚙️ Quality | Branch 6 | — |
| 44 | Render free tier cold starts | 🏗️ Arch | Branch 6 | [setup/01](../setup/01-docker.md) |
| 45 | No message queue for background jobs | 🏗️ Arch | Branch 3 | [setup/02](../setup/02-upstash-redis.md) |
| 46 | Admin API not separated | 🏗️ Arch | Branch 7 | — |
