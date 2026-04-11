# Issue #14 — Same Resume Parsed Multiple Times

> **Branch**: 4 (AI & Resume Improvements)  
> **Severity**: 🟡 Performance — every AI analysis re-downloads and re-parses the PDF  
> **Status**: Branch 4 (pending)

---

## 👥 The Team Room

*Ben is looking at the AI analysis flow.*

---

**🟠 Ben (Backend):** "When a recruiter has 100 applications for one job, and they run 'Evaluate All' — what happens?"

**🔵 Fay (Frontend):** "The button sends all 100 application IDs to the backend."

**🟠 Ben:** "And for each one, the backend calls `parseResumeFromUrl(user.resumeUrl)`. That function downloads the PDF from Cloudinary over HTTP, parses it with pdf-parse, extracts text. For 100 applicants, that's 100 HTTP downloads and 100 PDF parses."

**🟡 Dev (DevOps):** "Even if 30 of them applied with the SAME resume URL — because they updated their profile, but previous applications kept the old URL — you'd download and parse the same file multiple times."

**🟠 Ben:** "And for users who apply to 10 different jobs — every time any of those jobs runs an analysis, the same resume gets re-downloaded and re-parsed."

**🔴 Priya (PM):** "What's the cost?"

**🟠 Ben:** "Each PDF parse takes 200-500ms plus the network time to download from Cloudinary (50-100ms). For 100 applications: 100 × 300ms minimum = 30 seconds of serial parsing before even calling AI. And Cloudinary's bandwidth counts against our plan."

**🟡 Dev:** "Cache the parsed resume text. The PDF URL is stable — same URL, same content. Parse once, cache the result."

---

## 🔍 Understanding the Problem

### What `parseResumeFromUrl` Does

```js
const parseResumeFromUrl = async (resumeUrl) => {
  // Step 1: HTTP GET to Cloudinary (50-100ms, uses bandwidth)
  const response = await axios.get(resumeUrl, { responseType: "arraybuffer" });
  
  // Step 2: PDF parsing with pdf-parse (200-500ms, CPU)
  const { text, links } = await extractPdfData(response.data);
  
  // Step 3: Text cleaning and zone segmentation (fast)
  const cleanText = text.replace(...).trim();
  const zones = segmentResumeZones(cleanText);
  
  // Step 4: Skill extraction (fast)
  const skills = extractSkillsFromText(cleanText);
  
  return { fullText, experienceZone, generalZone, skills, links };
};
```

This runs for EVERY AI analysis request, even if we've already parsed this exact resume URL 50 times.

### The Solution: Cache Parsed Resume Text

The resume URL is a stable identifier. Cache the parsed result by URL. The cache invalidation strategy: 
- TTL of 1 hour (a user updating their resume generates a new Cloudinary URL anyway)
- On URL change, the old cache key naturally becomes unused

---

## 🛠 The Fix (to implement in Branch 4)

### Step 1: Add caching to `resumeParser.js`

```js
const redis = require("./cache"); // The Upstash Redis utility from Issue #11

const parseResumeFromUrl = async (resumeUrl) => {
  if (!resumeUrl) throw new Error("Resume URL missing.");
  
  // Step 1: Check cache
  const cacheKey = `resume:parsed:${Buffer.from(resumeUrl).toString("base64").slice(0, 60)}`;
  
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Resume cache HIT:", resumeUrl.slice(-20));
    return cached; // @upstash/redis auto-parses JSON
  }
  
  // Step 2: Cache miss — parse the PDF
  try {
    const response = await axios.get(resumeUrl, { responseType: "arraybuffer", timeout: 15000 });
    const { text, links } = await extractPdfData(response.data);
    let cleanText = text.replace(/[^\x20-\x7E\n]/g, "").replace(/\s+/g, " ").trim();
    const zones = segmentResumeZones(cleanText.substring(0, 12000));
    const identifiedSkills = extractSkillsFromText(cleanText);

    const result = {
      fullText: cleanText.substring(0, 12000),
      experienceZone: zones.experienceZone,
      generalZone: zones.generalZone,
      skills: identifiedSkills,
      links: links,
    };

    // Step 3: Cache for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, result);
    
    return result;
  } catch (err) {
    throw err;
  }
};
```

### Step 2: Why This Doesn't Break When Resumes Change

When a user uploads a new resume, Cloudinary creates a NEW URL:
```
Old: https://res.cloudinary.com/axon/raw/upload/axon_resumes/john_resume_v1
New: https://res.cloudinary.com/axon/raw/upload/axon_resumes/john_resume_v2
```

The new URL is a different cache key → cache miss → fresh parse. The old cached result for `v1` just expires after 1 hour.

However, if you're using the `public_id` override in Cloudinary (same filename each time), the URL stays the same but the content changes. In that case, reduce TTL to 30 minutes and invalidate cache when a resume upload succeeds:

```js
// In the upload-resume route, after successful Cloudinary upload:
const cacheKey = `resume:parsed:${Buffer.from(resumeUrl).toString("base64").slice(0, 60)}`;
await redis.del(cacheKey); // Invalidate on new upload
```

### Step 3: Impact at Scale

Without caching:
- 100 applications for one job → 100 × 300ms = 30 seconds of parsing
- Cloudinary: 100 × 500KB = 50MB bandwidth per analysis run

With caching:
- 100 applications → check 100 cache keys (fast) → only parse the ones not cached (~10 unique resumes)
- 10 × 300ms = 3 seconds
- Bandwidth: only 10 × 500KB = 5MB

**10x faster, 10x less bandwidth.**

---

## ❓ Common Questions

**Q: Is 1 hour TTL too long? What if someone uploads a new resume and applies immediately?**  
A: For existing applications (already submitted), the resume URL is saved in the `Application` document. Changing the resume doesn't retroactively change old applications. For new applications after a resume update, the new Cloudinary URL generates a new cache key anyway.

**Q: What if Redis is unavailable?**  
A: The `cache.js` utility has a graceful fallback (returns `null` for get, does nothing for set). If Redis is down, parsing continues without caching — slower, but functional.

**Q: Should we cache the full AI analysis result too?**  
A: The parsed resume text is stable (same PDF → same text). The AI analysis depends on BOTH the resume AND the job description. If the job description changes, the analysis result should change too. Cache the parsed text (stable), not the AI analysis result (job-dependent).

---

## 🎓 What You Just Learned

- Downloading + parsing a PDF is expensive (300ms+ per document)
- The same resume URL always produces the same parsed text — perfect for caching
- Cache key = a transformation of the URL (base64 to make it safe as a Redis key)
- TTL of 1 hour is generous because new resume uploads create new URLs
- Separate what's cacheable (stable data) from what isn't (user-specific, time-sensitive data)
- This optimization compounds with Issue #29 (AI parallel race) — faster parsing + faster AI = much better UX
