# 📚 Axon Hire — Docs Hub

Welcome. This folder is your complete guide to building, fixing, and scaling Axon Hire to 10,000+ users. It's written so that a fresher who just wants to build a product can follow it step by step — and also understand *why* every decision was made.

---

## How This Is Organized

```
docs/
├── README.md           ← You are here. Start here.
│
├── audit/              ← The 46 issues found in the codebase
│   ├── README.md       ← Master list + status of all 46 issues
│   ├── issues/         ← Deep dive on each issue (with teaching)
│   │   ├── 01-double-mongodb-connect.md
│   │   ├── 03-jwt-in-localstorage.md
│   │   └── ... (one file per issue)
│   ├── branch-1-security.md      ← What was fixed + why
│   ├── branch-2-ux.md
│   └── ... (branch-3 through branch-7)
│
├── setup/              ← Manual setup guides for every external tool
│   ├── README.md       ← Which tools need setup and when
│   ├── 01-docker.md    ← Install Docker, run locally
│   ├── 02-upstash-redis.md
│   ├── 03-sentry.md
│   ├── 04-posthog.md
│   ├── 05-github-actions.md
│   └── 06-mongodb-atlas-search.md
│
└── learning/           ← Concept-by-concept teaching (fundamentals to advanced)
    ├── README.md
    ├── 01-web-fundamentals.md
    ├── 04-authentication.md
    └── ... (10 topic files)
```

---

## Where to Start

**Just want to fix bugs and ship?**
→ Go to [`audit/README.md`](./audit/README.md) — shows all 46 issues by priority and status.

**Following a branch to implement?**
→ Go to the branch file, e.g. [`audit/branch-3-performance.md`](./audit/branch-3-performance.md)  
→ Each item in the branch links to its deep-dive issue file in `audit/issues/`

**Need to set up a tool (Docker, Redis, Sentry...)?**
→ Go to [`setup/README.md`](./setup/README.md) — every external tool has a complete step-by-step guide including the manual clicks on websites.

**Want to understand the concepts behind the code?**
→ Go to [`learning/README.md`](./learning/README.md) — 10 topic files from web fundamentals to system design.

---

## Who "Teaches" In These Docs

Each issue deep-dive in `audit/issues/` is written as if a team of seniors is in a room with you:

> **🔴 PM (Priya)** — Thinks about users, business impact, what breaks the product  
> **🟠 Backend Engineer (Ben)** — Writes the Node.js/MongoDB code, explains APIs  
> **🟣 Security Engineer (Sam)** — Spots vulnerabilities, explains attack vectors  
> **🟡 DevOps Engineer (Dev)** — Sets up infrastructure, CI/CD, Docker  
> **🔵 Frontend Engineer (Fay)** — React, UX, performance in the browser  

You'll see their names throughout the issue files. They disagree sometimes. That's realistic.

---

## The Golden Rule of This Codebase

**Every decision in this codebase exists for a reason.**  
This docs folder exists to make sure you know the reason — not just what to type.
