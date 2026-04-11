# 📂 Issue Deep-Dives

Each file in this folder is a detailed breakdown of one audit issue.

## Format of Each File

Every issue file follows this structure:

```
1. Title + severity + which branch

2. 👥 The Team Room
   → The senior team (Priya, Ben, Sam, Dev, Fay) discuss the issue
   → Written like a real conversation — you're listening in
   → This is where you understand WHY it matters, not just what it is

3. 🔍 Understanding the Problem
   → Technical explanation with diagrams/examples
   → No assumed knowledge — if a term is used, it's explained

4. 🛠 Step-by-Step Fix
   → Manual steps (click here, go to this website, copy this key) FIRST
   → Then the code changes
   → Then how to test/verify it worked

5. ❓ Questions You're Probably Asking
   → The questions a fresher actually has that seniors forget to answer

6. 🎓 What You Just Learned
   → Summary of concepts — what this taught you, not just what you fixed
```

## All 46 Issue Files

### 🔴 Critical — Branch 1 (Security)

| # | Issue | Status | File |
|---|-------|--------|------|
| 1 | MongoDB connects twice | ✅ Fixed | [01-double-mongodb-connect.md](./01-double-mongodb-connect.md) |
| 2 | Auth middleware logs all headers | ✅ Fixed | [02-auth-middleware-logging.md](./02-auth-middleware-logging.md) |
| 3 | JWT in localStorage | 🔵 Branch 7 | [03-jwt-in-localstorage.md](./03-jwt-in-localstorage.md) |
| 4 | interviewRoutes not mounted | ✅ Fixed | [04-interview-routes-unmounted.md](./04-interview-routes-unmounted.md) |
| 5 | Rate limiter applied twice | ✅ Fixed | [05-duplicate-rate-limiter.md](./05-duplicate-rate-limiter.md) |
| 6 | No NoSQL injection protection | ✅ Fixed | [06-nosql-injection.md](./06-nosql-injection.md) |
| 7 | No CSRF protection | 🔵 Branch 7 | [07-csrf-protection.md](./07-csrf-protection.md) |
| 8 | No account lockout | ✅ Fixed | [08-account-lockout.md](./08-account-lockout.md) |
| 9 | No file type validation | ✅ Fixed | [09-file-type-validation.md](./09-file-type-validation.md) |
| 10 | OTP stored in plain text | ✅ Fixed | [10-otp-plain-text.md](./10-otp-plain-text.md) |

### 🟡 Performance — Branches 1, 3

| # | Issue | Status | File |
|---|-------|--------|------|
| 11 | No Redis caching layer | 🔵 Branch 3 | [11-redis-caching.md](./11-redis-caching.md) |
| 12 | AI uses setImmediate (not a queue) | 🔵 Branch 3 | [12-ai-job-queue.md](./12-ai-job-queue.md) |
| 13 | No pagination on jobs list | ✅ Already exists | [13-pagination-already-exists.md](./13-pagination-already-exists.md) |
| 14 | Same resume parsed multiple times | 🔵 Branch 4 | [14-resume-parsing-cache.md](./14-resume-parsing-cache.md) |
| 15 | Missing DB indexes | ✅ Fixed | [15-db-indexes.md](./15-db-indexes.md) |

### 🔵 Features — Branches 2, 7

| # | Issue | Status | File |
|---|-------|--------|------|
| 16 | Home.jsx is 1,963 lines | 🔵 Branch 5 | [16-home-jsx-too-large.md](./16-home-jsx-too-large.md) |
| 17 | No forgot password flow | ✅ Fixed | [17-forgot-password.md](./17-forgot-password.md) |
| 18 | No refresh token mechanism | 🔵 Branch 7 | [18-refresh-tokens.md](./18-refresh-tokens.md) |
| 19 | No full-text search | 🔵 Branch 3 | [19-full-text-search.md](./19-full-text-search.md) |
| 20 | No cover letter support | 🔵 Branch 7 | [20-cover-letter.md](./20-cover-letter.md) |
| 21 | No company profile pages | 🔵 Branch 7 | [21-company-profiles.md](./21-company-profiles.md) |
| 22 | No resend OTP | ✅ Fixed | [22-resend-otp.md](./22-resend-otp.md) |
| 23 | No GDPR compliance | 🔵 Branch 7 | [23-gdpr-compliance.md](./23-gdpr-compliance.md) |
| 24 | No API versioning | 🔵 Branch 7 | [24-api-versioning.md](./24-api-versioning.md) |
| 25 | No error monitoring (Sentry) | 🔵 Branch 6 | [25-error-monitoring-sentry.md](./25-error-monitoring-sentry.md) |
| 26 | No product analytics (PostHog) | 🔵 Branch 6 | [26-product-analytics-posthog.md](./26-product-analytics-posthog.md) |

### 🟣 AI — Branch 4

| # | Issue | Status | File |
|---|-------|--------|------|
| 27 | Resume scoring is gameable | 🔵 Branch 4 | [27-gameable-scoring.md](./27-gameable-scoring.md) |
| 28 | No semantic matching | 🔵 Branch 4 | [28-semantic-matching.md](./28-semantic-matching.md) |
| 29 | AI models try sequentially | 🔵 Branch 4 | [29-ai-parallel-race.md](./29-ai-parallel-race.md) |
| 30 | No DOCX resume support | 🔵 Branch 4 | [30-docx-support.md](./30-docx-support.md) |

### 🟤 UX — Branch 5

| # | Issue | Status | File |
|---|-------|--------|------|
| 31 | AI Bot is a full page | 🔵 Branch 5 | [31-ai-bot-floating-widget.md](./31-ai-bot-floating-widget.md) |
| 32 | No skeleton loading states | 🔵 Branch 5 (partial) | [32-skeleton-loading.md](./32-skeleton-loading.md) |
| 33 | No onboarding flow | 🔵 Branch 5 | [33-onboarding-flow.md](./33-onboarding-flow.md) |
| 34 | No SEO | 🔵 Branch 6 (partial) | [34-seo.md](./34-seo.md) |
| 35 | No accessibility (a11y) | 🔵 Branch 5 | [35-accessibility.md](./35-accessibility.md) |
| 36 | No rich text editor for jobs | 🔵 Branch 5 | [36-rich-text-editor.md](./36-rich-text-editor.md) |
| 37 | No dark mode toggle | 🔵 Branch 5 | [37-dark-mode.md](./37-dark-mode.md) |

### ⚙️ Code Quality — Branch 6

| # | Issue | Status | File |
|---|-------|--------|------|
| 38 | Massive dead code | 🔵 Branch 6 | [38-dead-code.md](./38-dead-code.md) |
| 39 | No TypeScript | 🔵 Branch 6 | [39-typescript.md](./39-typescript.md) |
| 40 | No API documentation | 🔵 Branch 6 | [40-api-documentation.md](./40-api-documentation.md) |
| 41 | No frontend state management | 🔵 Branch 3 | [41-state-management.md](./41-state-management.md) |
| 42 | No CI/CD pipeline | 🔵 Branch 6 | [42-cicd-pipeline.md](./42-cicd-pipeline.md) |
| 43 | No env config validation | 🔵 Branch 6 | [43-env-validation.md](./43-env-validation.md) |

### 🏗️ Architecture — Branches 3, 6, 7

| # | Issue | Status | File |
|---|-------|--------|------|
| 44 | Render free tier cold starts | 🔵 Branch 6 | [44-render-cold-starts.md](./44-render-cold-starts.md) |
| 45 | No message queue for background jobs | 🔵 Branch 3 | [45-message-queue.md](./45-message-queue.md) |
| 46 | Admin API not separated | 🔵 Branch 7 | [46-admin-api-separation.md](./46-admin-api-separation.md) |

## Related: Setup Guides

For issues that require setting up an external tool, see **[`../../setup/`](../../setup/)**:
- Docker setup → `setup/01-docker.md`
- Upstash Redis → `setup/02-upstash-redis.md`
- Sentry → `setup/03-sentry.md`
- PostHog → `setup/04-posthog.md`
- GitHub Actions → `setup/05-github-actions.md`
- MongoDB Atlas Search → `setup/06-mongodb-atlas-search.md`
