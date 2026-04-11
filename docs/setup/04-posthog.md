# 📊 PostHog — Product Analytics Setup Guide

> **What this gives you**: You'll know which jobs get the most views, which pages users drop off on, what percentage of people who browse a job actually apply, and much more — without guessing.

---

## 👥 The Team Talks

**🔴 Priya (PM):** "We have 500 users. I have no idea what they're doing in the app. Are they looking at jobs? Are they applying? Do they come back after registering?"

**🔵 Fay (Frontend):** "Right now, the only way to know is to ask them directly. We have zero data."

**🔴 Priya:** "That's a huge problem. You can't improve a product you can't measure."

**🟡 Dev (DevOps):** "PostHog fixes this. It's analytics — but privacy-first, open source, and has a free tier that covers a million events per month. You add a few `posthog.capture()` calls at key moments, and suddenly you have a full picture of how users use the product."

**🔵 Fay:** "What does 'events' mean here?"

**🟡 Dev:** "An event is any action: user viewed a job, user clicked Apply, user submitted an application, user abandoned the flow. You define what matters, PostHog records it."

---

## Part 1: Create a PostHog Account

### Step 1.1: Go to PostHog

Open your browser: **https://app.posthog.com**

### Step 1.2: Sign Up

Click **"Get Started for Free"**.

Sign up with:
- GitHub (fastest)
- Google
- Email

### Step 1.3: Create Your Project

After signing in:
1. Click **"Create project"** or name your first project
2. **Project name**: `Axon Hire`
3. **Region**: Choose EU (GDPR compliant) or US — your choice

### Step 1.4: Get Your Project API Key

After creating the project, you'll see a setup page with this:

```js
posthog.init('phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', { ... })
```

That `phc_xxxx...` string is your **Project API Key**. Copy it.

You can always find it later: PostHog dashboard → Settings → Project → Project API Key.

---

## Part 2: Add Key to `.env`

Open `frontend/.env` (or `frontend/.env.local`):

```bash
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://app.posthog.com
```

Add to Vercel: Dashboard → Your Project → Settings → Environment Variables.

---

## Part 3: Install the Package

```bash
cd frontend && npm install posthog-js
```

---

## Part 4: Initialize in `frontend/src/main.jsx`

```jsx
import posthog from "posthog-js";

// Initialize PostHog before React renders
// Only run in production so you don't pollute analytics with your own testing
if (import.meta.env.MODE === "production") {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    // Don't track users across sites (privacy-friendly)
    cross_subdomain_cookie: false,
    // Session recording — see exactly how users interact with your UI
    // Disable initially if you're worried about privacy; enable for debugging UX issues
    disable_session_recording: false,
    // Only load session recording when user has opted in (optional — good for GDPR)
    // session_recording: { maskTextSelector: '*' }  // masks all text for privacy
  });
}

// Then rest of main.jsx:
import { createRoot } from "react-dom/client";
// etc.
```

---

## Part 5: Identify Your Users

When a user logs in, tell PostHog who they are. This links all events to a specific user profile:

```js
// In AuthContext.jsx, in your login() function, after setting user state:
import posthog from "posthog-js";

const login = (userData, token) => {
  setUser(userData);
  localStorage.setItem("token", token);
  
  // Tell PostHog who this user is
  if (typeof posthog !== "undefined") {
    posthog.identify(userData._id, {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    });
  }
};

// On logout, reset the PostHog identity:
const logout = () => {
  setUser(null);
  localStorage.removeItem("token");
  posthog.reset(); // Forget who this user was
};
```

---

## Part 6: Track Key Events

Add these `posthog.capture()` calls at the moments that matter:

```js
import posthog from "posthog-js";

// When user views a job:
posthog.capture("job_viewed", {
  job_id: job._id,
  job_title: job.title,
  company: job.company,
  location: job.location,
});

// When user clicks "Apply Now":
posthog.capture("apply_button_clicked", {
  job_id: job._id,
  job_title: job.title,
});

// When application is submitted successfully:
posthog.capture("application_submitted", {
  job_id: job._id,
  had_resume: !!resumeUrl,
  had_cover_letter: !!coverLetter,
});

// When user completes profile:
posthog.capture("profile_completed", {
  has_skills: user.skills.length > 0,
  has_experience: user.experience.length > 0,
  has_resume: !!user.resumeUrl,
});
```

---

## Part 7: See Your Data in PostHog Dashboard

Go to **https://app.posthog.com** → your project.

**Insight → Trends**: See how many `job_viewed` events happened each day  
**Insight → Funnels**: Create a funnel: `job_viewed → apply_button_clicked → application_submitted`  
This shows you the conversion rate and where people drop off.  
**Insight → Retention**: See how many users come back on Day 1, Day 7, Day 30.  
**Session Recordings**: Watch recordings of real user sessions to see where they get confused.  
**Feature Flags**: Roll out new features to 10% of users first, see if metrics improve.

---

## Part 8: The "North Star Metric" Question

**🔴 Priya:** "What's the ONE metric we should care about most?"

For a job platform, the north star metric is usually: **Applications submitted per week**.

Everything else (job views, profile completions, return visits) feeds into that. If applications/week is growing, the product is working. If it's flat, dig into the funnel to find where users are dropping off.

PostHog's funnel insight will show you exactly that.

---

## What You Learned

- Analytics isn't tracking — it's understanding what your users actually do vs what you think they do
- `posthog.identify()` links events to user profiles so you can see individual journeys
- `posthog.capture()` is how you record important moments
- Funnels show conversion rates — where users enter and where they drop off
- The north star metric for Axon Hire is applications submitted per week
