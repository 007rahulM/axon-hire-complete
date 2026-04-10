# ⚙️ GitHub Actions — CI/CD Setup Guide

> **What this gives you**: Every time you push code, GitHub automatically runs tests, checks for build errors, and (optionally) deploys to production. If anything fails, you get an email before broken code reaches your users.

---

## 👥 The Team Talks

**🟡 Dev (DevOps):** "Right now, how do you deploy a change?"

**🟠 Ben (Backend):** "I push to GitHub, then manually go to Render and click 'Deploy'."

**🟡 Dev:** "What if the code you just pushed has a bug? A syntax error that breaks the server?"

**🟠 Ben:** "...It deploys broken. Users get errors until I notice and fix it."

**🟡 Dev:** "CI/CD fixes this. CI = Continuous Integration = run tests on every push. CD = Continuous Deployment = automatically deploy when tests pass. The key word is 'when tests pass' — broken code never reaches production."

**🔴 Priya (PM):** "What does 'tests' mean here if we don't have any unit tests yet?"

**🟡 Dev:** "At minimum: run `npm install` and `npm run build`. If the build fails, you know immediately. That catches syntax errors, missing imports, bad TypeScript types. As you add unit tests, those run too. You start with what you have."

---

## Part 1: Understanding GitHub Actions

GitHub Actions is GitHub's built-in CI/CD platform. It's free for public repos and 2,000 minutes/month for private repos.

### How it works:
1. You create a YAML file inside `.github/workflows/` in your repo
2. The file describes: when to run (on push? on PR?), what to run (install, test, build)
3. GitHub runs it on their servers automatically — you don't need any external service

### The vocabulary:
- **Workflow**: The whole YAML file — a pipeline
- **Job**: A group of steps that runs on one server (Ubuntu, etc.)
- **Step**: One command (npm install, npm test, etc.)
- **Runner**: The server GitHub provides to run your job (ubuntu-latest = Ubuntu 22.04)

---

## Part 2: Create the Workflow File

### Step 2.1: Create the directory

If `.github/workflows/` doesn't exist in your repo:

```bash
mkdir -p /home/runner/work/axon-hire-complete/axon-hire-complete/.github/workflows
```

### Step 2.2: Create the CI workflow

Create `.github/workflows/ci.yml`:

```yaml
# This workflow runs on every push and every pull request
name: CI — Lint, Build & Test

on:
  push:
    branches: [main, develop]  # Run when pushing to main or develop
  pull_request:
    branches: [main]           # Run on any PR that targets main

jobs:
  # Job 1: Check the backend
  backend:
    name: Backend (Node.js)
    runs-on: ubuntu-latest      # GitHub provides a fresh Ubuntu server for this

    steps:
      # Step 1: Download your repo code onto the GitHub server
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Install Node.js 20
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
          cache-dependency-path: backend/package-lock.json

      # Step 3: Install dependencies
      # 'npm ci' is like 'npm install' but stricter:
      # - uses package-lock.json exactly (no unexpected updates)
      # - fails if package-lock.json is out of sync with package.json
      - name: Install dependencies
        run: cd backend && npm ci

      # Step 4: Run tests (if you have any)
      # The 'if' condition skips this step if no test script exists
      - name: Run tests
        run: cd backend && npm test
        env:
          # These secrets are set in GitHub — see Part 3 of this guide
          MONGO_URI: ${{ secrets.TEST_MONGO_URI }}
          JWT_SECRET: test-jwt-secret-for-ci-only
          NODE_ENV: test
        # continue-on-error: true  # Uncomment if tests are optional for now

  # Job 2: Check the frontend
  frontend:
    name: Frontend (React + Vite)
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: cd frontend && npm ci

      # Step: Run Vite build
      # This catches: syntax errors, missing imports, bad JSX
      - name: Build
        run: cd frontend && npm run build

      # Step: Run ESLint (if configured)
      # - name: Lint
      #   run: cd frontend && npm run lint
```

---

## Part 3: Add Secrets to GitHub

The CI workflow needs environment variables (like a test MongoDB connection string) to run. You can't put these in the YAML file (that's public). You put them in **GitHub Secrets**.

### Step 3.1: Go to your repo on GitHub

Open your browser and go to:
`https://github.com/007rahulM/axon-hire-complete`

### Step 3.2: Navigate to Secrets

Click: **Settings** (top tab) → **Secrets and variables** (left sidebar) → **Actions**

### Step 3.3: Add a Secret

Click **"New repository secret"**

**Name**: `TEST_MONGO_URI`
**Secret**: Your MongoDB Atlas connection string for a TEST database (create a new Atlas database called `axon_test` — don't use your production database for CI)

Click **"Add secret"**

### Commonly needed secrets for this repo:

| Secret Name | What it is | Where to get it |
|-------------|-----------|-----------------|
| `TEST_MONGO_URI` | Atlas connection for test DB | MongoDB Atlas dashboard |
| `RENDER_DEPLOY_HOOK` | URL that triggers Render deploy | Render → Service → Deploy → Deploy Hook |
| `VERCEL_TOKEN` | Token to deploy frontend | vercel.com → Settings → Tokens |

---

## Part 4: Add Auto-Deploy to Render (CD)

Once your CI passes, auto-deploy the backend.

### Step 4.1: Get Your Render Deploy Hook

1. Go to **https://dashboard.render.com**
2. Click your backend service
3. Click **"Settings"** tab
4. Scroll to **"Deploy Hook"**
5. Copy the URL — it looks like: `https://api.render.com/deploy/srv-xxxx?key=yyyy`

### Step 4.2: Add to GitHub Secrets

Name: `RENDER_DEPLOY_HOOK`
Value: The URL you just copied

### Step 4.3: Add Deploy Job to Workflow

Add this job to `ci.yml` (after the existing jobs):

```yaml
  # Job 3: Deploy to Render (only on push to main, only if CI passes)
  deploy-backend:
    name: Deploy Backend to Render
    runs-on: ubuntu-latest
    needs: [backend, frontend]  # Only runs if both CI jobs succeed
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - name: Trigger Render Deploy
        run: |
          curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"
          echo "Deploy triggered ✅"
```

Now the flow is:
1. You push to main
2. GitHub runs backend tests + frontend build
3. **If both pass**: Render automatically deploys
4. **If either fails**: Deploy does NOT happen, you get an email

---

## Part 5: Understanding the Pull Request Flow

When someone (or you) opens a PR:
1. GitHub runs the CI workflow against that branch
2. The PR page shows a green checkmark ✅ or red X ❌
3. You can (and should) **require CI to pass** before merging

### Set Up Branch Protection:
1. Go to your repo Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Check: **"Require status checks to pass before merging"**
5. Search for and select: `backend` and `frontend` (the job names from your workflow)
6. Check: **"Require branches to be up to date before merging"**
7. Click "Create"

Now no one can merge broken code to main. Including you.

---

## Part 6: Reading CI Output

When a workflow run fails:
1. Go to your repo on GitHub
2. Click the **"Actions"** tab
3. Click the failed run
4. Click the failed job (e.g., "Backend")
5. Expand the failed step — you'll see the exact error

Common errors:
- `npm ci` fails → `package-lock.json` is out of sync → run `npm install` locally and commit the updated lock file
- Build fails → usually a syntax error or import that doesn't exist
- Tests fail → a test assertion is broken — fix the code or the test

---

## What You Learned

- CI/CD automates the "does this code work?" question on every push
- GitHub Actions is free and lives in your repo — no external service needed
- Secrets store sensitive values (API keys, connection strings) safely
- Branch protection rules make it impossible to merge broken code
- The workflow is just a YAML file — you can read and understand every line
