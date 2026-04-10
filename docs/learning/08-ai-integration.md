# 08 — AI Integration in Axon Hire

> Calling AI APIs reliably is harder than it looks. Here's how the current system works and how to improve it.

---

## The AI Carousel Pattern (Current Implementation)

Axon Hire uses multiple AI providers as fallbacks:

```
1. Try OpenRouter (fastest, cheapest)
2. If fails → Try Groq (fast, free tier)  
3. If fails → Try Gemini (Google, reliable)
4. If all fail → return error
```

**Why multiple providers?**
- AI APIs have rate limits (Groq: 30 req/min free)
- Providers go down (OpenRouter had outages)
- Different models have different strengths

**Current problem**: Sequential fallback. If OpenRouter takes 10s to timeout before trying Groq, analysis takes 20s total.

**Fix with Promise.any()**: Race all providers simultaneously:
```js
const result = await Promise.any([
  callOpenRouter(prompt),
  callGroq(prompt),
  callGemini(prompt),
]);
// Returns as soon as the FIRST one succeeds (~2s instead of 20s)
```

---

## Structured Output: Getting JSON from AI

AI models return text. You need structured data (JSON). Two approaches:

### Approach 1: JSON mode (supported by Groq, OpenAI)
```js
const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [{ role: "user", content: prompt }],
  response_format: { type: "json_object" }, // Force JSON output
});
// completion.choices[0].message.content is guaranteed to be valid JSON
```

### Approach 2: Prompt engineering + parsing
```js
const systemPrompt = `
You are a resume analyzer. 
RESPOND ONLY WITH VALID JSON. NO OTHER TEXT.
Format: {"matchScore": 85, "matchedSkills": ["React", "Node.js"], "missing": ["Docker"]}
`;
// Then parse: JSON.parse(response.content)
// Wrap in try/catch — AI sometimes still includes text before the JSON
```

### Robust JSON extraction:
```js
function extractJSON(text) {
  // Find JSON between { and } even if there's text around it
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in response");
  return JSON.parse(match[0]);
}
```

---

## Resume Parsing Pipeline

```
1. User uploads resume (PDF)
2. Cloudinary stores it, returns URL
3. On application submit:
   a. Download PDF from Cloudinary URL
   b. Extract text with pdfjs-dist
   c. Pass text to AI with job requirements
   d. AI returns match score, matched skills, missing skills
   e. Save to application.aiAnalysis
```

### pdfjs-dist: How it works
```js
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

async function extractTextFromPDF(pdfBuffer) {
  const doc = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
  let text = "";
  
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(" ");
  }
  
  return text;
}
```

**Why it's expensive**: For each page, pdfjs renders font data, positional data, and text. For a 5-page resume, this is significant computation. That's why caching parsed results in Redis saves real time.

---

## The Prompt Engineering Craft

The quality of AI output depends heavily on the prompt. For resume analysis:

### Bad prompt:
```
"Analyze this resume and give a score."
```

### Good prompt (production quality):
```
You are an expert technical recruiter ATS system. 
Your task is to analyze a candidate's resume against a job posting.

RULES:
1. Be objective and data-driven
2. Only count skills you can CONFIRM from the resume text
3. Do not infer skills — if it's not written, it's not there

JOB REQUIREMENTS: ${jobRequirements.join(", ")}

RESUME TEXT: ${resumeText}

Respond ONLY with this JSON:
{
  "matchScore": <0-100 integer>,
  "matchedSkills": [<array of skills found in resume that match requirements>],
  "missingSkills": [<array of required skills NOT found in resume>],
  "experienceSummary": "<one sentence about candidate's relevant experience>",
  "recommendation": "<hire/maybe/reject>"
}
```

**Key principles**:
- Give the AI a clear role ("You are an expert...")
- Specify exact output format
- Add constraints ("Only count skills you can CONFIRM")
- Use delimiters to separate data from instructions

---

## AI Integrity Score: Current vs Better

### Current (gameable):
```js
// Anyone can put "github.com/fake-profile" in their resume
if (text.includes("github.com")) score += 10;
if (text.includes("vercel.app")) score += 10;
```

### Better (resume completeness scoring):
```js
function scoreResumeCompleteness(text) {
  const t = text.toLowerCase();
  let score = 0;
  
  // Structural completeness (does it have the key sections?)
  if (/education|degree|university|bachelor|master|phd/.test(t)) score += 20;
  if (/experience|worked|employment|position|role/.test(t)) score += 20;
  if (/skills|technologies|proficient|expertise/.test(t)) score += 10;
  
  // Content substance (are descriptions detailed?)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 200) score += 15;  // At least 200 words
  if (wordCount > 400) score += 15;  // Substantial content
  
  // Action verbs in experience (indicates real descriptions, not just titles)
  const actionVerbs = /built|developed|designed|implemented|led|managed|improved|reduced|increased/;
  if (actionVerbs.test(t)) score += 20;
  
  return Math.min(score, 100);
}
```

---

## Semantic Search: Beyond Keyword Matching

### The problem with keywords:
- Job requires "React" 
- Resume says "ReactJS" or "React.js" or "built SPAs with a modern JS framework"
- Keyword match fails

### Embeddings: turning text into numbers
An embedding converts text into a vector (array of numbers) where similar meanings are close together in vector space:
```
"React" → [0.12, -0.45, 0.67, ...]    (768 numbers)
"ReactJS" → [0.11, -0.44, 0.68, ...]  (very close!)
"Vue.js" → [0.08, -0.40, 0.55, ...]   (somewhat close — also a JS framework)
"MySQL" → [-0.23, 0.12, -0.34, ...]   (far away — different domain)
```

### Cosine similarity:
```js
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
  // 1.0 = identical meaning, 0.0 = unrelated, -1.0 = opposite
}
```

### Using Gemini embeddings (free, already have the key):
```js
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const result = await model.embedContent("React developer 3 years");
const vector = result.embedding.values;
```

This gives semantic matching without any keyword normalization.
