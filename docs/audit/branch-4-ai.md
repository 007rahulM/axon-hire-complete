# Branch 4 — AI & Resume Improvements

> These changes are NOT yet implemented. This document is the implementation guide.

---

## Issue 29: AI Models Try Sequentially (Slow)

### Current behavior:
```
Try OpenRouter → wait up to 10s → fail
Try Groq       → wait up to 10s → fail
Try Gemini     → wait up to 10s → succeed
Total: up to 30 seconds
```

### Fix with Promise.any():
```js
// In aiServices.js
async function generateWithFallback(systemPrompt, userPrompt) {
  try {
    // Race all providers simultaneously. First to succeed wins.
    return await Promise.any([
      callOpenRouter(systemPrompt, userPrompt),
      callGroq(systemPrompt, userPrompt),
      callGemini(systemPrompt, userPrompt),
    ]);
  } catch (err) {
    // AggregateError means ALL three failed
    throw new Error("All AI providers failed");
  }
}
```
**Result**: Analysis completes in ~2-3s (fastest provider) instead of up to 30s.

**Note on `Promise.any` vs `Promise.race`**:
- `Promise.race` — resolves OR rejects with the first settled promise (rejects if the first one fails)
- `Promise.any` — ignores rejections, resolves with the first **successful** result; only rejects if ALL fail
- For AI fallback, you want `Promise.any`.

---

## Issue 27: Resume Scoring is Gameable

### Current integrity score (flawed):
```js
// Anyone can add fake links to their resume
if (resumeText.includes("github.com")) score += 10;
if (resumeText.includes("vercel.app")) score += 10;
```

### Better resume completeness scoring:
```js
function scoreResumeCompleteness(parsedResume) {
  let score = 0;
  const sections = parsedResume.toLowerCase();

  // Has structural sections? (25 pts)
  if (/education|university|degree|bachelor|master/.test(sections)) score += 10;
  if (/experience|worked at|employment|position/.test(sections)) score += 10;
  if (/skills|technologies|proficient/.test(sections)) score += 5;

  // Experience descriptions have substance? (25 pts)
  const experienceWords = countWordsInExperienceSection(parsedResume);
  if (experienceWords > 100) score += 10;
  if (experienceWords > 250) score += 15;

  // Skills mentioned in context (not just a list)? (50 pts)
  // Compare against job requirements — done in matchingEngine
  return Math.min(score, 100);
}
```

---

## Issue 28: No Semantic Matching

### Current approach (keyword matching):
```
Resume: "Built dashboards with React.js"
Job requirement: "React"
Match: ❌ (because "React.js" ≠ "React" in the skill map)
```

### Fix — Option A: Transformers.js (no API cost, runs in Node.js)
```js
// npm install @xenova/transformers
const { pipeline } = require("@xenova/transformers");
const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

async function semanticSimilarity(text1, text2) {
  const [emb1, emb2] = await Promise.all([
    embedder(text1, { pooling: "mean", normalize: true }),
    embedder(text2, { pooling: "mean", normalize: true }),
  ]);
  // Cosine similarity
  return dotProduct(emb1.data, emb2.data);
}
```

### Fix — Option B: Gemini embeddings (already have the key)
```js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

const result = await model.embedContent("React developer with 3 years experience");
const embedding = result.embedding.values; // 768-dimensional vector
```

---

## Issue 14: Same Resume Parsed Multiple Times

### Problem:
If a user applies to 10 jobs that all have `autoEvaluate: true`, their resume PDF is downloaded and parsed 10 times. `pdfjs-dist` is expensive.

### Fix with Redis cache:
```js
// In resumeParser.js
const crypto = require("crypto");
const redis = require("./cache");

async function parseResumeWithCache(resumeUrl) {
  const urlHash = crypto.createHash("md5").update(resumeUrl).digest("hex");
  const cacheKey = `resume:parsed:${urlHash}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const parsed = await parseResumePDF(resumeUrl); // expensive operation
  await redis.setex(cacheKey, 3600, JSON.stringify(parsed)); // cache for 1 hour
  return parsed;
}
```

---

## Issue 30: No DOCX Resume Support

### Package: mammoth
```
npm install mammoth
```

### Add to uploadMiddleware.js fileFilter:
```js
const ALLOWED_MIMES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
if (!ALLOWED_MIMES.includes(file.mimetype)) {
  return cb(new Error("Only PDF and DOCX files are allowed"), false);
}
```

### Add to resumeParser.js:
```js
const mammoth = require("mammoth");

async function extractTextFromDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function parseResume(fileUrl) {
  const buffer = await downloadFile(fileUrl);
  if (fileUrl.endsWith(".docx")) {
    return extractTextFromDocx(buffer);
  }
  return parseResumePDF(buffer); // existing PDF parser
}
```

---

## Issue 31: AI Bot as Floating Widget

### Current: AIBot.jsx is a full page at `/ai-bot`
### Fix: Make it a floating widget that appears on every page

```jsx
// src/components/AIChatWidget.jsx
import { useState } from "react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-96 h-[500px] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col mb-4">
          {/* Chat UI goes here */}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500"
        aria-label="Open AI Assistant"
      >
        🤖
      </button>
    </div>
  );
}
```

Add to `App.jsx` outside the routes (so it renders on every page):
```jsx
<Router>
  <Routes>...</Routes>
  <AIChatWidget />  {/* Always visible */}
</Router>
```
