# 🛠 Setup Guides — External Tools

> Every tool listed here requires you to do something OUTSIDE of your code editor before writing a single line.  
> These guides cover exactly that: what website to visit, what buttons to click, what environment variables to copy.

---

## Which Tools Need Setup?

| Tool | When You Need It | Guide |
|------|-----------------|-------|
| Docker | When you want a consistent local environment | [01-docker.md](./01-docker.md) |
| Upstash Redis | Branch 3: caching + Branch 4: AI job queue | [02-upstash-redis.md](./02-upstash-redis.md) |
| Sentry | Branch 6: error monitoring | [03-sentry.md](./03-sentry.md) |
| PostHog | Branch 6: product analytics | [04-posthog.md](./04-posthog.md) |
| GitHub Actions | Branch 6: CI/CD pipeline | [05-github-actions.md](./05-github-actions.md) |
| MongoDB Atlas Search | Branch 3: full-text job search | [06-mongodb-atlas-search.md](./06-mongodb-atlas-search.md) |

---

## Important: Secrets Go in `.env`, Never in Git

Every setup guide ends with "add this to your `.env` file." Here's what that means:

**Your `.env` file** is in `backend/.env`. It looks like this:
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=some-long-secret-string
CLOUDINARY_CLOUD_NAME=your-name
```

**Rules**:
1. `.env` is in `.gitignore` — it is never pushed to GitHub
2. When you deploy to Render/Railway, you add the same keys manually in their dashboard
3. If you accidentally commit a secret to GitHub, rotate it (create a new one) immediately

---

## A Note on "Free Tiers"

Every tool in this list has a free tier that's enough to get to 10,000 users:

| Tool | Free Tier Limit |
|------|----------------|
| Upstash Redis | 10,000 requests/day |
| Sentry | 5,000 errors/month |
| PostHog | 1,000,000 events/month |
| GitHub Actions | 2,000 minutes/month (public repos: unlimited) |
| MongoDB Atlas M0 | 512MB, 100 connections |

When you hit limits, upgrade. But start free.
