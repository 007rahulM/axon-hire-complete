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
| 2 | Auth middleware logs all headers | 🔴 Critical | ✅ Fixed | [issues/02](./issues/02-auth-middleware-logging.md) |
| 3 | JWT stored in localStorage | 🔴 Critical | 🔵 Branch 7 | [issues/03](./issues/03-jwt-in-localstorage.md) |
| 4 | interviewRoutes not mounted | 🔴 Critical | ✅ Fixed | [issues/04](./issues/04-interview-routes-unmounted.md) |
| 5 | Rate limiter on /api/users twice | 🔴 Critical | ✅ Fixed | [issues/05](./issues/05-duplicate-rate-limiter.md) |
| 6 | No NoSQL injection protection | 🟠 Security | ✅ Fixed | [issues/06](./issues/06-nosql-injection.md) |
| 7 | No CSRF protection | 🟠 Security | 🔵 Branch 7 | [issues/07](./issues/07-csrf-protection.md) |
| 8 | No account lockout | 🟠 Security | ✅ Fixed | [issues/08](./issues/08-account-lockout.md) |
| 9 | No file type validation on upload | 🟠 Security | ✅ Fixed | [issues/09](./issues/09-file-type-validation.md) |
| 10 | OTP stored in plain text | 🟠 Security | ✅ Fixed | [issues/10](./issues/10-otp-plain-text.md) |
| 11 | No Redis caching layer | 🟡 Performance | Branch 3 | [issues/11](./issues/11-redis-caching.md) |
| 12 | AI uses setImmediate (not a queue) | 🟡 Performance | Branch 3 | [issues/12](./issues/12-ai-job-queue.md) |
| 13 | No pagination on jobs list | 🟡 Performance | ✅ Already exists | [issues/13](./issues/13-pagination-already-exists.md) |
| 14 | Same resume parsed multiple times | 🟡 Performance | Branch 4 | [issues/14](./issues/14-resume-parsing-cache.md) |
| 15 | Missing DB indexes | 🟡 Performance | ✅ Fixed | [issues/15](./issues/15-db-indexes.md) |
| 16 | Home.jsx is 1,963 lines | 🟡 Performance | Branch 5 | [issues/16](./issues/16-home-jsx-too-large.md) |
| 17 | No forgot password flow | 🔵 Feature | ✅ Fixed | [issues/17](./issues/17-forgot-password.md) |
| 18 | No refresh token mechanism | 🔵 Feature | Branch 7 | [issues/18](./issues/18-refresh-tokens.md) |
| 19 | No full-text search | 🔵 Feature | Branch 3 | [issues/19](./issues/19-full-text-search.md) + [setup/06](../setup/06-mongodb-atlas-search.md) |
| 20 | No cover letter support | 🔵 Feature | Branch 7 | [issues/20](./issues/20-cover-letter.md) |
| 21 | No company profile pages | 🔵 Feature | Branch 7 | [issues/21](./issues/21-company-profiles.md) |
| 22 | No resend OTP | 🔵 Feature | ✅ Fixed | [issues/22](./issues/22-resend-otp.md) |
| 23 | No GDPR compliance | 🔵 Feature | Branch 7 | [issues/23](./issues/23-gdpr-compliance.md) |
| 24 | No API versioning | 🔵 Feature | Branch 7 | [issues/24](./issues/24-api-versioning.md) |
| 25 | No error monitoring (Sentry) | 🔵 Feature | Branch 6 | [issues/25](./issues/25-error-monitoring-sentry.md) + [setup/03](../setup/03-sentry.md) |
| 26 | No product analytics (PostHog) | 🔵 Feature | Branch 6 | [issues/26](./issues/26-product-analytics-posthog.md) + [setup/04](../setup/04-posthog.md) |
| 27 | Resume scoring is gameable | 🟣 AI | Branch 4 | [issues/27](./issues/27-gameable-scoring.md) |
| 28 | No semantic matching | 🟣 AI | Branch 4 | [issues/28](./issues/28-semantic-matching.md) |
| 29 | AI models try sequentially | 🟣 AI | Branch 4 | [issues/29](./issues/29-ai-parallel-race.md) |
| 30 | No DOCX resume support | 🟣 AI | Branch 4 | [issues/30](./issues/30-docx-support.md) |
| 31 | AI Bot is a full page | 🟣 AI | Branch 5 | [issues/31](./issues/31-ai-bot-floating-widget.md) |
| 32 | No skeleton loading states | 🟤 UX | Branch 5 | [issues/32](./issues/32-skeleton-loading.md) |
| 33 | No onboarding flow | 🟤 UX | Branch 5 | [issues/33](./issues/33-onboarding-flow.md) |
| 34 | No SEO | 🟤 UX | Branch 6 | [issues/34](./issues/34-seo.md) |
| 35 | No accessibility (a11y) | 🟤 UX | Branch 5 | [issues/35](./issues/35-accessibility.md) |
| 36 | No rich text editor for jobs | 🟤 UX | Branch 5 | [issues/36](./issues/36-rich-text-editor.md) |
| 37 | No dark mode toggle | 🟤 UX | Branch 5 | [issues/37](./issues/37-dark-mode.md) |
| 38 | Massive dead code | ⚙️ Quality | Branch 6 | [issues/38](./issues/38-dead-code.md) |
| 39 | No TypeScript | ⚙️ Quality | Branch 6 | [issues/39](./issues/39-typescript.md) |
| 40 | No API documentation | ⚙️ Quality | Branch 6 | [issues/40](./issues/40-api-documentation.md) |
| 41 | No frontend state management | ⚙️ Quality | Branch 3 | [issues/41](./issues/41-state-management.md) |
| 42 | No CI/CD pipeline | ⚙️ Quality | Branch 6 | [issues/42](./issues/42-cicd-pipeline.md) + [setup/05](../setup/05-github-actions.md) |
| 43 | No env config validation | ⚙️ Quality | Branch 6 | [issues/43](./issues/43-env-validation.md) |
| 44 | Render free tier cold starts | 🏗️ Arch | Branch 6 | [issues/44](./issues/44-render-cold-starts.md) |
| 45 | No message queue for background jobs | 🏗️ Arch | Branch 3 | [issues/45](./issues/45-message-queue.md) + [setup/02](../setup/02-upstash-redis.md) |
| 46 | Admin API not separated | 🏗️ Arch | Branch 7 | [issues/46](./issues/46-admin-api-separation.md) |
