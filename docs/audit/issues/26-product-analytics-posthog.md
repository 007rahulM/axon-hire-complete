# Issue #26 — No Product Analytics (PostHog)

> **Branch**: 6 (Developer Experience & Observability)  
> **Severity**: 🔵 Feature — you're building features without knowing if users actually use them  
> **Status**: Branch 6 (pending)

---

## 👥 The Team Room

*Priya is asking about the AI evaluation feature.*

---

**🔴 Priya (PM):** "Did anyone use the AI evaluation button we launched 3 weeks ago?"

**🟠 Ben (Backend):** "I don't know. We don't track that."

**🔴 Priya:** "We built it in two weeks. We don't know if a single recruiter has clicked it."

**🔵 Fay (Frontend):** "The server logs show API calls to `/api/applications/evaluate`, but I can't tell how many unique users made those calls, or whether they're using the results."

**🔴 Priya:** "This is how you waste engineering time. You build features nobody uses, and you don't know what IS working to build more of it. We need analytics."

**🟡 Dev (DevOps):** "PostHog is open source product analytics. You track events — 'user clicked AI evaluate button', 'user viewed analysis result', 'recruiter shortlisted candidate'. Then you see funnels: of 100 people who saw the AI evaluate button, 60 clicked it, 40 saw results, 10 took action on the results."

---

## 🔍 What Product Analytics Tells You

### Events vs Pageviews

**Pageviews** (what Google Analytics tracks): "1,247 people visited `/jobs` today."

**Events** (what PostHog tracks): 
- "284 users searched for jobs"
- "187 users opened a job detail"
- "94 users clicked Apply"
- "67 users completed the application"

From that funnel: 94 users started an application, 67 finished it. **29% drop-off on the apply form**. Why? PostHog session recording shows: the cover letter textarea is confusing. 80% of users who abandoned the form spent 10+ seconds on the cover letter field and then left.

Without analytics: you never know the cover letter is a problem. With analytics: you fix it in the next sprint.

### Key Events to Track for Axon Hire

**Job Seeker Journey:**
1. `page_viewed` (Home)
2. `job_searched` (Search term entered)
3. `job_viewed` (Job card clicked)
4. `apply_started` (Apply button clicked)
5. `apply_completed` (Application submitted)
6. `analysis_viewed` (User opened their AI analysis result)

**Recruiter Journey:**
1. `job_posted` (New job created)
2. `applications_viewed` (Recruiter opened applicant list)
3. `ai_evaluate_clicked` (AI evaluation triggered)
4. `candidate_shortlisted` / `candidate_rejected`
5. `interview_scheduled`

---

## 🛠 The Fix

### Manual Setup First — Create a PostHog Account

**Follow the complete manual steps in:**  
**→ [`docs/setup/04-posthog.md`](../../setup/04-posthog.md)**

That guide covers:
1. Go to https://app.posthog.com → Sign up (free: 1M events/month)
2. Create project → copy the **Project API Key** (looks like `phc_abc123...`)
3. Note your **API Host** (usually `https://app.posthog.com` for cloud)

### Frontend Integration

```bash
cd frontend && npm install posthog-js
```

```js
// frontend/src/main.jsx — initialize once, before React renders
import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com",
  capture_pageview: false, // We'll manually track meaningful page views
  autocapture: true, // Automatically tracks clicks, form submissions, etc.
  session_recording: {
    maskAllInputs: true, // Don't record what users type (privacy)
  },
  loaded: (ph) => {
    if (import.meta.env.DEV) ph.opt_out_capturing(); // Don't track in development
  },
});
```

Add to `frontend/.env`:
```
VITE_POSTHOG_KEY=phc_abc123...
VITE_POSTHOG_HOST=https://app.posthog.com
```

### Identify Users After Login

```js
// In AuthContext.jsx, in the login() function:
import posthog from "posthog-js";

const login = (userData, token) => {
  // ... existing login logic ...
  
  // Identify the user in PostHog
  posthog.identify(userData._id, {
    name: userData.name,
    role: userData.role,
    // Don't send email unless you have explicit consent in your privacy policy
  });
};

// On logout:
const logout = () => {
  // ... existing logout logic ...
  posthog.reset(); // Clear the identified user
};
```

### Track Key Events

Create `frontend/src/utils/analytics.js`:

```js
import posthog from "posthog-js";

// Wrapper so you can swap analytics providers later
export const trackEvent = (event, properties = {}) => {
  posthog.capture(event, properties);
};

export const trackPageView = (pageName, properties = {}) => {
  posthog.capture("$pageview", { page: pageName, ...properties });
};
```

Use in components:

```jsx
// In Jobs.jsx — when search is performed:
import { trackEvent } from "../utils/analytics";

const handleSearch = (query) => {
  trackEvent("job_searched", { 
    search_term: query,
    results_count: jobs.length 
  });
};

// In ApplicationModal.jsx — when apply is clicked:
const handleApply = async () => {
  trackEvent("apply_started", { job_id: job._id, job_title: job.title });
  try {
    await axios.post(...);
    trackEvent("apply_completed", { job_id: job._id });
  } catch (err) {
    trackEvent("apply_failed", { error: err.message });
  }
};

// In RecruiterDashboard.jsx — when AI evaluate runs:
const handleEvaluate = () => {
  trackEvent("ai_evaluate_clicked", {
    job_id: currentJob._id,
    application_count: applications.length
  });
};
```

### Build a Funnel in PostHog Dashboard

1. PostHog dashboard → **Insights** → **New Insight** → **Funnel**
2. Add steps:
   - Step 1: Event = `page_viewed` where `page = jobs`
   - Step 2: Event = `job_viewed`
   - Step 3: Event = `apply_started`
   - Step 4: Event = `apply_completed`
3. You'll see the % who complete each step
4. Click on any step to see a recording of sessions that dropped off there

---

## ❓ Common Questions

**Q: Is PostHog free?**  
A: Yes, 1 million events per month free. At 1,000 daily active users doing 10 events each = 10,000 events/day = 300,000/month. Well within free tier.

**Q: Does PostHog comply with GDPR?**  
A: PostHog Cloud (EU) stores data in Frankfurt, Germany. PostHog can also be self-hosted for full data ownership. For GDPR: show a cookie consent banner (Issue #23) and only initialize PostHog after consent.

**Q: What's the difference between PostHog and Google Analytics?**  
A: Google Analytics = traffic metrics (pageviews, bounce rate). PostHog = product metrics (funnels, user behavior, session recordings, feature flags, A/B testing). They serve different purposes. PostHog is specifically designed for product teams building software.

**Q: `autocapture: true` — what does that track automatically?**  
A: Every click, every form submission, every page navigation — automatically, without any code. But it can capture sensitive input if not careful. Disable it or use `maskAllInputs: true` to be safe.

---

## 🎓 What You Learned

- Product analytics = understanding user behavior, not just traffic numbers
- Events are more valuable than pageviews: "started apply" vs "completed apply" reveals drop-off
- Identify users on login so you can segment analytics by role (recruiter vs job seeker)
- `posthog.reset()` on logout prevents sessions from being merged across users on shared devices
- Funnels show you WHERE users drop off — session recordings show you WHY
- Don't track in development (`opt_out_capturing()`) — keep analytics data clean
