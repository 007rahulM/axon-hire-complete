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

## Files Available

| Issue | File |
|-------|------|
| #1 — MongoDB connects twice | [01-double-mongodb-connect.md](./01-double-mongodb-connect.md) |
| #3 — JWT in localStorage | [03-jwt-in-localstorage.md](./03-jwt-in-localstorage.md) |
| #11 — No Redis caching | [11-redis-caching.md](./11-redis-caching.md) |
| #29 — AI models sequential | [29-ai-parallel-race.md](./29-ai-parallel-race.md) |
| #42 — No CI/CD | [42-cicd-pipeline.md](./42-cicd-pipeline.md) |

More will be added in future branches as those issues are implemented.

## Related: Setup Guides

For issues that require setting up an external tool, see **[`../../setup/`](../../setup/)**:
- Docker setup → `setup/01-docker.md`
- Upstash Redis → `setup/02-upstash-redis.md`
- Sentry → `setup/03-sentry.md`
- PostHog → `setup/04-posthog.md`
- GitHub Actions → `setup/05-github-actions.md`
- MongoDB Atlas Search → `setup/06-mongodb-atlas-search.md`
