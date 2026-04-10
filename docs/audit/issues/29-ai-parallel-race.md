# Issue #29 — AI Models Try Sequentially (Slow)

> **Branch**: 4 (AI & Resume Improvements)  
> **Severity**: 🟣 High — users wait 30+ seconds for AI analysis; can drop to 5 seconds

---

## 👥 The Team Room

*Priya is testing the app live. She clicks "Apply" on a job with `autoEvaluate: true`.*

---

**🔴 Priya (PM):** "I clicked Apply 45 seconds ago. The loading spinner is still going. Is it broken?"

**🟠 Ben (Backend):** "It's not broken. It's running the AI analysis. It tried OpenRouter first — that failed with a 503. Then it waited 8 seconds for the timeout. Then it tried Groq — that failed too. Now it's trying Gemini."

**🔴 Priya:** "Why does it try them one at a time? Why not all at once?"

**🟠 Ben:** "...because that's how I wrote it. Sequential `await` calls. One fails, move to next."

**🔵 Fay (Frontend):** "From a UX perspective, 45 seconds is an eternity. Most users will think the app crashed and leave."

**🔴 Priya:** "How long would it take if you ran them in parallel?"

**🟠 Ben:** "Gemini responds in about 4-6 seconds when it works. If we race all three simultaneously and take the first success, total time would be 5-8 seconds max."

**🔴 Priya:** "So we have a 5-second solution and we're doing a 45-second solution. Fix it."

---

## 🔍 Understanding the Problem

### How the current AI carousel works

The current code in `aiServices.js` does something like this:

```js
// This is the current (slow) pattern:
async function analyzeResume(resumeText, jobDescription) {
  // Try OpenRouter first
  try {
    const result = await callOpenRouter(resumeText, jobDescription);
    return result;
  } catch (err) {
    console.log("OpenRouter failed, trying Groq...");
  }

  // Wait for above to fully fail (8-10s timeout), THEN try Groq
  try {
    const result = await callGroq(resumeText, jobDescription);
    return result;
  } catch (err) {
    console.log("Groq failed, trying Gemini...");
  }

  // Wait for that to fail (another 8-10s), THEN try Gemini
  try {
    const result = await callGemini(resumeText, jobDescription);
    return result;
  } catch (err) {
    throw new Error("All AI models failed");
  }
}
```

**Worst case**: 8s (OpenRouter timeout) + 8s (Groq timeout) + 6s (Gemini success) = 22 seconds.  
**Bad case**: All fail = 24+ seconds of waiting, then error.

### The fix: Race them with `Promise.any()`

`Promise.any()` takes an array of promises and resolves as soon as ONE of them succeeds. The others are automatically discarded. If ALL fail, it rejects with an `AggregateError`.

```
Time →  0s         5s         10s
        [OpenRouter] ─── fail (8s) ─────────┐
        [Groq]      ─── success (4s) ─→ WIN │
        [Gemini]    ─── still running... ───┘ (discarded)

Total time: 4 seconds (Groq won the race)
```

---

## 🛠 The Fix

### Step 1: Add per-request timeout to each AI call

Before racing, each call needs a timeout so a slow model doesn't hang the race indefinitely:

```js
// Utility function: wrap any promise with a timeout
function withTimeout(promise, timeoutMs, label) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
}
```

### Step 2: Race the models with `Promise.any()`

In `backend/services/aiServices.js`, replace the sequential try-catch chain:

```js
async function analyzeResume(resumeText, jobDescription) {
  const TIMEOUT_MS = 12000; // 12 seconds max per model

  // Define all the calls — they DON'T start yet (we're building the array)
  const modelCalls = [
    withTimeout(callOpenRouter(resumeText, jobDescription), TIMEOUT_MS, "OpenRouter"),
    withTimeout(callGroq(resumeText, jobDescription), TIMEOUT_MS, "Groq"),
    withTimeout(callGemini(resumeText, jobDescription), TIMEOUT_MS, "Gemini"),
  ];

  // Start ALL calls simultaneously, return first success
  // Promise.any() rejects only if ALL promises reject
  try {
    const result = await Promise.any(modelCalls);
    return result;
  } catch (aggregateError) {
    // AggregateError contains all individual errors
    logger.error("All AI models failed:", aggregateError.errors?.map(e => e.message));
    throw new Error("AI analysis unavailable — all models failed");
  }
}
```

### Step 3: Cost awareness — add a flag to control

All 3 models run in parallel, which means you make 3 API calls instead of 1 even when the first succeeds. Most of these APIs have generous free tiers, but still:

```js
async function analyzeResume(resumeText, jobDescription, options = {}) {
  const { strategy = "race" } = options;

  if (strategy === "sequential") {
    // Keep old behavior for fallback/testing
    return analyzeResumeSequential(resumeText, jobDescription);
  }

  // Default: race strategy (fastest)
  const TIMEOUT_MS = 12000;
  const modelCalls = [
    withTimeout(callGroq(resumeText, jobDescription), TIMEOUT_MS, "Groq"),      // Try fastest first
    withTimeout(callGemini(resumeText, jobDescription), TIMEOUT_MS, "Gemini"),  // Good fallback
    // OpenRouter last (slower, but more model options)
    withTimeout(callOpenRouter(resumeText, jobDescription), TIMEOUT_MS, "OpenRouter"),
  ];

  try {
    return await Promise.any(modelCalls);
  } catch (err) {
    throw new Error("All AI models failed");
  }
}
```

### Step 4: What about the "winner take all" API cost problem?

**🟠 Ben:** "If Groq wins in 3 seconds, but OpenRouter and Gemini are still running, do we get charged for those calls too?"

**Answer**: Most AI APIs charge based on completion. If you abandon an HTTP request mid-flight (which you can't easily do in Node.js without AbortController), the API may or may not charge.

**Better approach for production**: Use `AbortController` to cancel the losing calls:

```js
async function analyzeResume(resumeText, jobDescription) {
  const TIMEOUT_MS = 12000;

  // Create controllers for each call — lets us cancel them
  const controllers = [new AbortController(), new AbortController(), new AbortController()];

  const modelCalls = [
    callGroq(resumeText, jobDescription, { signal: controllers[0].signal }),
    callGemini(resumeText, jobDescription, { signal: controllers[1].signal }),
    callOpenRouter(resumeText, jobDescription, { signal: controllers[2].signal }),
  ].map((call, i) => 
    withTimeout(call, TIMEOUT_MS, `model-${i}`)
  );

  try {
    // Race all calls
    const result = await Promise.any(modelCalls);
    
    // Cancel the losing calls (to avoid wasting API quota)
    controllers.forEach(c => c.abort());
    
    return result;
  } catch (err) {
    throw new Error("All AI models failed");
  }
}
```

For each model's `callGroq`, `callGemini`, etc., pass the `signal` to the fetch call:
```js
async function callGroq(resumeText, jobDescription, { signal } = {}) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    signal, // <-- This allows cancellation
    headers: { ... },
    body: JSON.stringify({ ... }),
  });
  // ...
}
```

---

## 🧪 Measuring the Improvement

Add timing to confirm the fix works:

```js
async function analyzeResume(resumeText, jobDescription) {
  const start = Date.now();
  try {
    const result = await Promise.any([ /* ... */ ]);
    logger.info(`AI analysis completed in ${Date.now() - start}ms`);
    return result;
  } catch (err) {
    logger.error(`AI analysis failed after ${Date.now() - start}ms`);
    throw err;
  }
}
```

---

## ❓ Common Questions

**Q: What is `Promise.any()` vs `Promise.race()`?**  

| | `Promise.race()` | `Promise.any()` |
|--|--|--|
| Resolves on | First to settle (success OR failure) | First SUCCESS |
| Rejects on | First failure | ALL fail |
| Use case | Timeout patterns | Fallback race |

Use `Promise.any()` here — `Promise.race()` would reject immediately if the first call fails.

**Q: Isn't it wasteful to make 3 API calls when only 1 is needed?**  
A: Yes. For production at scale, use `AbortController` to cancel the losing calls. For getting started, the extra calls are cheap (all are free tier).

**Q: What if I only want to use one model?**  
A: Add an environment variable: `PREFERRED_AI_MODEL=groq`. Only call that model first, fall back to others only if it fails. This saves API quota.

---

## 🎓 What You Just Learned

- `Promise.any()` runs promises in parallel and resolves with the first success
- `AbortController` allows cancelling in-flight HTTP requests
- "Race" architecture is the standard pattern for multi-provider fallback systems (big tech uses this everywhere)
- Measuring performance with `Date.now()` is the first step to improving it
- User-perceived performance matters as much as actual performance — 5 seconds feels fast, 30 seconds feels broken
