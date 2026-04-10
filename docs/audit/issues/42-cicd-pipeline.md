# Issue #42 — No CI/CD Pipeline

> **Branch**: 6 (Developer Experience & Infra)  
> **Severity**: 🔵 Important — broken code reaches production without automatic checks

---

## 👥 The Team Room

*It's Monday morning. Ben pushed a "quick fix" to main on Friday night.*

---

**🔴 Priya (PM):** "We had 3 users email us over the weekend. The app was broken. Jobs page was blank."

**🟠 Ben (Backend):** "I pushed a fix at 11pm on Friday. I must have introduced a bug."

**🟡 Dev (DevOps):** "Did you test it before pushing?"

**🟠 Ben:** "I tested on my laptop. It worked."

**🟡 Dev:** "Did the build succeed? Did any tests run?"

**🟠 Ben:** "...I just pushed. I don't have a local test setup."

**🟡 Dev:** "This is exactly what CI/CD is for. If you had a CI pipeline, your push would have triggered an automated build. The build would have caught the error. The deploy would NOT have happened. Users would have never seen the broken version."

**🔴 Priya:** "How do we set this up so this never happens again?"

**🟡 Dev:** "One YAML file. 30 minutes of setup. Never deploys broken code again."

---

## 🔍 Understanding CI/CD

### What is CI? (Continuous Integration)

Every time you push code, a server automatically:
1. Checks out your code
2. Installs dependencies
3. Runs the build
4. Runs tests (if you have them)
5. Reports success ✅ or failure ❌

If it fails → you get an email. The deploy does NOT happen.

### What is CD? (Continuous Deployment)

When CI passes on the `main` branch:
1. Automatically trigger a deploy to Render (backend)
2. Vercel auto-deploys the frontend (it already does this if you connected the repo)

### The full flow:

```
You push code to GitHub
         ↓
GitHub Actions starts a runner (a Ubuntu server GitHub provides for free)
         ↓
Runner: checkout code → npm ci → npm run build → npm test
         ↓ (if all pass)
Runner: curl Render deploy hook → Render deploys
         ↓
You get a green checkmark. Users get the new code.
         ↓ (if anything fails)
You get an email. Users see nothing (old code stays live).
```

---

## 🛠 Step-by-Step Setup

### Step 1: Read the Full Setup Guide

This issue has extensive manual steps. The complete guide is here:  
**[`docs/setup/05-github-actions.md`](../../setup/05-github-actions.md)**

It covers:
- The full CI workflow YAML file (with line-by-line explanations)
- How to add GitHub Secrets (for your API keys)
- How to get the Render deploy hook URL
- How to set branch protection rules (so PRs can't merge with failing CI)

### Step 2: What the YAML File Does (Plain English Summary)

The workflow at `.github/workflows/ci.yml` does this:

**When you push to `main` or open a PR against `main`**:

Job 1 — Backend check:
- Install Node.js 20
- `npm ci` in `backend/` (install all dependencies exactly from lockfile)
- `npm test` (if tests exist)

Job 2 — Frontend check:
- Install Node.js 20
- `npm ci` in `frontend/`
- `npm run build` (build the React app — catches syntax errors, broken imports)

Job 3 — Deploy (only on push to main, only if Jobs 1&2 pass):
- `curl` the Render deploy hook URL

### Step 3: The Dependency Chain (Important)

```yaml
deploy-backend:
  needs: [backend, frontend]  # This means: only run if BOTH passed
```

This `needs:` keyword is how you chain jobs. Without it, all jobs run in parallel regardless of each other's outcome.

---

## 📋 Checklist: Getting CI Working Today

Even if you have zero tests, you can have CI catching build errors in 30 minutes:

- [ ] Create `.github/workflows/ci.yml` with the YAML from the setup guide
- [ ] Push it to main: `git add .github && git commit -m "ci: add CI/CD workflow" && git push`
- [ ] Go to your repo on GitHub → Actions tab → see the workflow running
- [ ] Fix any errors that appear (usually: wrong paths, missing scripts in package.json)
- [ ] Add `RENDER_DEPLOY_HOOK` secret (see setup guide Part 3)
- [ ] Set branch protection rules (setup guide Part 5)
- [ ] Test it: push a deliberate build error → confirm CI fails and no deploy happens → fix it → confirm CI passes and deploys

---

## ❓ Common Questions

**Q: I don't have any tests. Is CI still useful?**  
A: Yes. The build step alone catches ~80% of regressions (syntax errors, broken imports, missing dependencies). Tests catch logic errors. Both matter. Start with the build check. Add tests incrementally.

**Q: How do I write tests?**  
The learning docs cover testing: [`docs/learning/02-nodejs-express.md`](../../learning/02-nodejs-express.md) — search for "testing" section.  
Short answer: use `jest` for unit tests, `supertest` for API endpoint tests.

**Q: CI passed but my deploy is broken. How?**  
A: CI catches build-time errors. Some runtime errors only appear with real data, specific env vars, or race conditions. This is why you also need: error monitoring (Sentry — see Issue #25) and staging environments.

**Q: What's a "staging environment"?**  
A: A copy of production with real infrastructure but fake/test data. You deploy to staging first, test manually, then promote to production. For a small app, you can simulate this with a separate Render service connected to a separate MongoDB database.

---

## 🎓 What You Just Learned

- CI/CD is a safety net that catches mistakes before they reach users
- GitHub Actions is free, lives in your repo, and needs no external services
- The `needs:` keyword creates job dependencies (deploy only if tests pass)
- Branch protection rules make it impossible to bypass CI (even as the repo owner)
- "Works on my laptop" is not deployment. CI is deployment.
- Even with zero tests, building the project catches ~80% of regressions
