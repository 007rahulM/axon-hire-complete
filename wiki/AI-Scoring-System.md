# 🤖 AI Scoring System

This page explains how Axon Hire evaluates resumes against job postings — from parsing to final score.

---

## Overview

When a candidate applies for a job, the system runs a **two-phase evaluation** entirely in the background:

| Phase | Type | When | Output |
|-------|------|------|--------|
| **Phase 1** | Deterministic scoring | Instant (sync) | 0–100 numerical score |
| **Phase 2** | AI analysis | Background (async) | Confidence, strengths, weaknesses, recommendation |

The candidate sees their score as soon as Phase 1 completes. The AI summary from Phase 2 is appended once the model responds.

---

## Phase 1 — Deterministic Scoring (v3)

The deterministic engine scores each application out of **100 points** using three components:

```
Total Score = Skills Score (60) + Experience Score (30) + Integrity Score (10)
```

### Component 1 — Skills Match (60 pts)

```
Skills Score = (matched_canonical_skills / required_skills_count) × 60
```

**How it works:**

1. The job posting specifies `requiredSkills` (e.g. `["React", "Node.js", "MongoDB"]`)
2. The resume text is extracted from the uploaded PDF
3. The **Skill Normalization Engine** maps every skill mention to a canonical form:
   - `"React"`, `"React.js"`, `"ReactJS"` → all normalize to `"react"`
   - `"Node"`, `"Node.js"`, `"NodeJS"` → all normalize to `"node.js"`
4. The number of matched skills is divided by the total required skills to produce a ratio
5. That ratio is multiplied by 60

**Skill Map:** The `skillMap.js` utility maintains a cache of 500+ canonical skills and their synonyms, loaded from the MongoDB `Skill` collection at server startup.

---

### Component 2 — Experience Match (30 pts)

```
Experience Score = min(candidate_years / required_years, 1.0) × 30
```

**How it works:**

1. The job specifies `experienceRequired` in years (e.g. `3`)
2. The **Duration Math engine** (`durationMath.js`) parses experience blocks from the resume text:
   - Understands formats like `"2 years 6 months"`, `"Jan 2021 – Present"`, `"2021-2023"`
   - Converts all durations to total months, then to years
3. If the candidate meets or exceeds required experience → full 30 pts
4. Partial experience → proportional score

---

### Component 3 — Integrity Check (10 pts)

This component checks resume **quality and completeness**:

| Check | Points |
|-------|--------|
| Resume has extractable text (not a scanned image) | 3 |
| Resume mentions at least one recognizable skill | 3 |
| Resume contains experience or education sections | 4 |

A resume that fails integrity checks signals an unusable document and scores 0 on this component.

---

## Phase 2 — AI Analysis (Background)

After the deterministic score is returned to the client, an async background task calls the AI carousel.

### Multi-Model Carousel

The system tries AI providers in order, falling back automatically on any failure:

```
1. OpenRouter  (Mistral 7B Instruct)
       ↓ fails?
2. Groq        (LLaMA 3.3 70B)
       ↓ fails?
3. Gemini      (2.5 Flash)
       ↓ fails?
   Use deterministic score only (no AI summary)
```

**Why a carousel?** Each AI provider has rate limits and occasional outages. The fallback chain ensures scoring always completes even if one or two providers are down.

---

### What the AI Produces

The AI model receives a structured prompt containing:
- The job title and required skills
- The parsed resume text (skills, experience, education sections)
- Scoring instructions

The AI returns a JSON response with:

```json
{
  "confidence": 85,
  "matchedSkills": ["React", "TypeScript", "REST APIs"],
  "missingSkills": ["Docker", "Kubernetes"],
  "strengths": "Strong frontend expertise with 4+ years of React experience.",
  "weaknesses": "Limited DevOps and containerization exposure.",
  "recommendation": "Shortlist"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `confidence` | 0–100 | How confident the AI is in its assessment |
| `matchedSkills` | array | Skills the AI found in the resume |
| `missingSkills` | array | Required skills not found |
| `strengths` | string | Positive summary paragraph |
| `weaknesses` | string | Areas for improvement |
| `recommendation` | string | `"Hire"`, `"Shortlist"`, `"Reject"` |

---

## Resume Parser

The `resumeParser.js` utility extracts structured text from PDF resumes:

1. **Fetch** — Downloads the resume PDF from Cloudinary
2. **Extract** — Uses `pdf-parse` to get raw text content
3. **Zone** — Splits the text into logical sections:
   - Skills section
   - Experience section
   - Education section
4. **Return** — Structured object used by both the deterministic engine and the AI prompt builder

> Resumes that are scanned images (no embedded text layer) will fail to parse and receive a low integrity score.

---

## Skill Normalization & Learning Loop

### The Skill Map

`skillMap.js` maintains an in-memory cache of the skill taxonomy:

```javascript
// Example internal structure:
{
  "react.js": "react",       // Canonical form
  "reactjs": "react",
  "react": "react",
  "node": "node.js",
  "nodejs": "node.js",
  "node.js": "node.js",
  // ... 500+ more
}
```

The cache is built from the `Skill` collection in MongoDB and **refreshed at startup** and whenever the admin approves a new skill.

### AI Learning Loop

When the AI model identifies skills in a resume that are **not yet in the skill map**, the system:

1. Extracts the new skill/synonym from the AI response
2. Creates a **pending** entry in the `Skill` collection
3. Notifies admins via the Admin Dashboard
4. Admins can approve or reject the new skill
5. Approved skills are merged into the canonical taxonomy
6. The skill cache is refreshed automatically (with throttling to avoid stampede)

This means the skill map **grows over time** as the platform processes more resumes.

---

## Score Interpretation

| Score Range | Label | Recommended Action |
|-------------|-------|-------------------|
| 85–100 | ⭐ Excellent Match | Strong hire candidate |
| 70–84 | ✅ Good Match | Shortlist for interview |
| 50–69 | 🔶 Partial Match | Review carefully |
| 0–49 | ❌ Poor Match | Likely not suitable |

> These thresholds are suggestions. Recruiters always have final say and can move any candidate through the pipeline manually.

---

## Score Storage

Scores are stored on the `Application` document:

```json
{
  "aiScore": 78,
  "aiConfidence": 85,
  "matchedSkills": ["React", "TypeScript"],
  "missingSkills": ["Docker"],
  "aiSummary": {
    "strengths": "...",
    "weaknesses": "...",
    "recommendation": "Shortlist"
  },
  "scoringVersion": "v3",
  "scoredAt": "2026-04-11T10:00:00.000Z"
}
```

---

## Configuration

There are no special configuration files for the AI system. All AI providers are activated by setting the corresponding environment variable:

| Env Variable | Provider |
|---|---|
| `OPENROUTER_API_KEY` | OpenRouter (Mistral 7B) |
| `GROQ_API_KEY` | Groq (LLaMA 3.3) |
| `GOOGLE_API_KEY` | Gemini 2.5 Flash |

If none are set, the platform still functions — it will use the deterministic score only (no AI summary).
