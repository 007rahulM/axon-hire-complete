# Issue #44 — Render Free Tier Cold Starts

> **Branch**: 6 (Developer Experience & Observability)  
> **Severity**: 🏗️ Architecture — app takes 30+ seconds to respond after idle period  
> **Status**: Branch 6 (pending)

---

## 👥 The Team Room

*A recruiter tries to log in after the weekend.*

---

**👩‍💼 Recruiter (via Priya):** "I tried to access the app on Monday morning. It took 40 seconds to load and then showed an error. I thought the app was down."

**🟡 Dev (DevOps):** "That's the Render free tier cold start. The server shuts down after 15 minutes of inactivity. The next request has to restart the entire Node.js process, reconnect to MongoDB, warm up the app — 30-60 seconds."

**🔴 Priya (PM):** "This is terrible for first impressions. Recruiters will leave."

**🟡 Dev:** "There are three solutions. The simplest: upgrade to Render Starter tier ($7/month) — no cold starts. The free alternative: a ping service that hits the server every 14 minutes to keep it awake. The proper solution: move the backend to a service that has always-on free tiers."

---

## 🔍 Why Cold Starts Happen

### Render Free Tier Policy

Render's free tier spins down web services that receive no traffic for 15 minutes. When traffic comes back:

```
User Request
  ↓
Render starts the container (~20 seconds)
  ↓  
Node.js process boots (~3 seconds)
  ↓
dotenv loads, mongoose connects, skills cache warms (~5 seconds)
  ↓
Request is actually processed
Total: ~30-60 seconds of wait time
```

The user's HTTP request is held pending during the entire startup. Their browser shows "waiting..." or times out.

### The MongoDB Connection Pool Issue

Cold starts compound the double-connect problem (Issue #1 — already fixed). If the double-connect wasn't fixed, cold starts also meant doubled connection time.

---

## 🛠 The Solutions (choose one)

### Solution 1: Upgrade to Render Starter ($7/month)

The cleanest solution. Render Starter tier has no cold starts. Services are always running.

**How to upgrade**:
1. Go to https://render.com → your service
2. Click **Settings** → **Plan** → change to **Starter**
3. $7/month for the backend service

At product/market fit, $7/month is negligible. For a student project or pre-launch, it's a real cost.

### Solution 2: Keep-Alive Ping Service (Free Workaround)

Use a free cron service to ping your backend every 14 minutes, keeping it warm.

**Option A: GitHub Actions (Free)**

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Render Alive

on:
  schedule:
    # Run every 14 minutes (GitHub Actions minimum is 5 minutes)
    - cron: "*/14 * * * *"
  workflow_dispatch: # Allow manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping backend
        run: |
          curl -f "${{ secrets.BACKEND_URL }}/api/health" || echo "Ping failed (service may be starting up)"
        timeout-minutes: 2
```

Add `BACKEND_URL` as a GitHub repository secret (Settings → Secrets → New secret):
```
BACKEND_URL=https://your-app.onrender.com
```

Add a health endpoint to your backend:
```js
// backend/server.js
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});
```

**Option B: UptimeRobot (Free)**
1. Go to https://uptimerobot.com → Sign up free
2. Add monitor → HTTP(s) type
3. URL: `https://your-app.onrender.com/api/health`
4. Check interval: **5 minutes**
5. Alert when down: email to your team

UptimeRobot also sends you alerts if the app actually goes down, which is a bonus.

**Option C: cron-job.org (Free)**
Similar to UptimeRobot — free cron scheduler that pings a URL on schedule.

### Solution 3: Graceful Cold Start UX (Always Do This Too)

Regardless of which solution you choose, improve the user experience during cold starts:

```jsx
// frontend/src/utils/axiosInstance.js — handle cold start timeouts gracefully:
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      // Show a friendly message instead of a generic error:
      error.userMessage = "The server is starting up. Please wait 30 seconds and try again.";
    }
    return Promise.reject(error);
  }
);
```

Also increase the axios timeout for the first request:
```js
const axiosInstance = axios.create({
  baseURL: ...,
  timeout: 60000, // 60 seconds — accommodates cold start wait time
});
```

### Solution 4: Move to a Free Always-On Platform

If cost is a constraint:

| Platform | Always-On | Free Tier |
|----------|-----------|-----------|
| Railway | ✅ | 500 hours/month (enough for ~16 hours/day) |
| Fly.io | ✅ | 3 shared VMs free |
| Vercel (serverless) | ✅ | Generous free tier (but serverless has its own cold start issues) |
| Render Starter | ✅ | $7/month |

---

## ❓ Common Questions

**Q: Does the ping service cost anything?**  
A: GitHub Actions free tier includes 2,000 minutes/month. The ping workflow runs for ~5 seconds every 14 minutes = ~15 seconds/hour = ~360 seconds/day = ~11,000 seconds/month ≈ 183 minutes/month. Well within free tier.

**Q: Won't pinging the server count as "usage" and inflate our MongoDB connection count?**  
A: The `/api/health` endpoint doesn't hit the database — it just returns a JSON response. No MongoDB queries, no connection overhead.

**Q: What happens if the GitHub Actions ping itself fails?**  
A: The action has `|| echo "Ping failed"` — it doesn't fail the workflow, just logs it. The UptimeRobot solution is better for monitoring because it also sends alerts.

**Q: Is Vercel better for our backend?**  
A: Vercel is serverless (functions spin up per request). It has cold starts too — but usually <100ms for small Node.js functions. However, Mongoose doesn't work well with serverless (connection pooling issues). Use Render/Railway for stateful Node.js apps.

---

## 🎓 What You Learned

- Render free tier spins down after 15 minutes of inactivity
- Cold start = booting the server + reconnecting to MongoDB = 30-60 seconds of user wait
- Keep-alive ping: simple cron job that prevents the server from spinning down
- UptimeRobot also doubles as a monitoring solution (alerts when down)
- Always increase axios timeout to accommodate cold start wait time
- Long-term: Render Starter ($7/month) or Railway is worth the cost for production traffic
