# Issue #28 — No Semantic Matching

> **Branch**: 4 (AI & Resume Improvements)  
> **Severity**: 🟣 AI — "5 years Node.js" and "5 years Express.js" don't match because different words  
> **Status**: Branch 4 (pending)

---

## 👥 The Team Room

*The team is reviewing a near-miss in the ATS system.*

---

**🟠 Ben (Backend):** "A job requires 'Node.js'. A candidate has '5 years backend development with Express.js and Fastify'. The current scorer gives them 0 for Node.js because the word 'Node.js' doesn't appear."

**🔴 Priya (PM):** "But Express.js runs ON Node.js. Any Express developer IS a Node.js developer."

**🟠 Ben:** "Keyword matching doesn't know that. It only knows strings."

**🔵 Fay (Frontend):** "Same with 'ReactJS' vs 'React'. 'UI development' vs 'Frontend'. 'PostgreSQL' vs 'SQL'. The system misses obvious equivalents."

**🟣 Alex (AI):** "This is what semantic search solves. Instead of comparing words, you compare MEANING. Two phrases mean the same thing if they're semantically similar — regardless of the exact words used."

---

## 🔍 Understanding Semantic Matching

### String Matching vs Semantic Matching

```
Job requirement: "Node.js"
Candidate resume: "5 years backend with Express.js and Fastify"

String match: 0% (no "Node.js" found)
Semantic match: ~85% (Express.js is synonymous with Node.js for most intents)
```

### How Semantic Matching Works

Words and phrases are converted to "embeddings" — vectors (lists of numbers) where similar concepts are close together in mathematical space.

```
"Node.js" → [0.2, 0.7, -0.3, 0.9, ...]
"Express.js" → [0.19, 0.72, -0.28, 0.88, ...] ← Very similar vector
"Python" → [-0.4, 0.1, 0.8, -0.2, ...] ← Different vector
```

Similarity = cosine similarity between vectors. Two concepts that are semantically related = high similarity score.

### Current SkillMap Approach

`backend/utils/skillMap.js` already has some manual mappings:

```js
// Existing approach: hard-coded synonyms
const skillMap = {
  "react": ["reactjs", "react.js"],
  "node": ["nodejs", "node.js", "express"],
  // etc.
};
```

This works but requires manual maintenance. You need to manually add every new technology and its synonyms. It'll never be complete.

---

## 🛠 The Fix (to implement in Branch 4)

### Approach 1: Extend the SkillMap (Quick Win, Imperfect)

Expand the existing skill map with more synonyms. This is already partially done. Add more:

```js
// backend/utils/skillMap.js
const skillMap = {
  "react": ["reactjs", "react.js", "react hooks", "react native (web)", "next.js"],
  "node.js": ["nodejs", "node", "express.js", "express", "fastify", "koa", "nestjs"],
  "sql": ["mysql", "postgresql", "postgres", "sqlite", "mariadb", "database queries"],
  "machine learning": ["ml", "ai", "artificial intelligence", "deep learning", "neural networks"],
  "aws": ["amazon web services", "ec2", "s3", "lambda", "cloudfront", "rds"],
  "css": ["scss", "sass", "less", "styled-components", "tailwind", "bootstrap", "ui styling"],
  "javascript": ["js", "es6", "typescript", "ecmascript"],
  "docker": ["containerization", "kubernetes", "k8s", "container orchestration"],
};
```

### Approach 2: Use the AI Model for Semantic Scoring (Medium Effort)

Instead of matching keywords, ask the AI to evaluate skill overlap:

```js
async function semanticSkillMatch(resumeText, jobRequirements) {
  const prompt = `
    Job Requirements: ${jobRequirements.join(", ")}
    
    Candidate's resume skills and experience (summarized): ${resumeText.substring(0, 3000)}
    
    For each job requirement, rate how well the candidate's experience covers it:
    - "full": candidate clearly has this skill (by name or equivalent technology)
    - "partial": candidate has a related skill that overlaps
    - "none": no evidence of this skill
    
    Return JSON: {
      "matches": {
        "Node.js": { "level": "full", "evidence": "Express.js developer for 5 years" },
        "React": { "level": "none", "evidence": null },
        "SQL": { "level": "partial", "evidence": "PostgreSQL mentioned in 2 projects" }
      },
      "overallSemanticScore": 0.72
    }
  `;
  
  return generateJSON(systemPrompt, prompt);
}
```

The AI understands that Express.js = Node.js and gives "full" coverage.

### Approach 3: Vector Embeddings (Advanced — Long Term)

For a truly scalable semantic search, use embedding vectors:

```bash
npm install @xenova/transformers  # Local embedding model (no API needed)
# OR
# Use OpenAI ada-002 embedding API
```

```js
// Generate embedding for a skill:
async function getEmbedding(text) {
  // Using a local model (no cost, runs on your server):
  const { pipeline } = await import("@xenova/transformers");
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return output.data; // Float32Array
}

// Cosine similarity between two vectors:
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
}

// Check if a resume covers a requirement semantically:
async function semanticMatch(requirement, resumeText) {
  const [reqEmbedding, resumeEmbedding] = await Promise.all([
    getEmbedding(requirement),
    getEmbedding(resumeText),
  ]);
  
  const similarity = cosineSimilarity(reqEmbedding, resumeEmbedding);
  return similarity; // 0-1, where 0.8+ is a good semantic match
}
```

**Practical note**: For Branch 4, Approach 2 (AI model evaluation) gives excellent results with minimal code. Approach 3 (vector embeddings) is the scalable long-term solution but requires more infrastructure.

---

## ❓ Common Questions

**Q: What's the difference between semantic search (Issue #19) and semantic matching here?**  
A: Issue #19 is semantic SEARCH — finding jobs that match a search query even with typos/synonyms. Issue #28 is semantic MATCHING — scoring how well a resume covers a job's requirements beyond exact keywords. Same underlying technology, different application.

**Q: "Node.js" and "Express.js" are semantically related — but what about false positives?**  
A: "AWS Lambda" and "Google Cloud Functions" are both serverless, but they're not the same skill. The AI approach returns a "partial" match with an explanation. The recruiter can then decide if "GCP experience" satisfies "AWS required."

**Q: Can we build this without AI API calls?**  
A: Yes — the extended skill map (Approach 1) is purely local. The transformer-based approach (Approach 3, `@xenova/transformers`) also runs locally. Only Approach 2 requires an AI API call.

---

## 🎓 What You Learned

- String matching misses semantically equivalent skills (Express.js ≠ Node.js to a string comparison)
- The `skillMap.js` hard-coded synonyms is a pragmatic partial solution
- AI-based evaluation understands context and technology relationships
- Vector embeddings are the scalable solution: convert concepts to numbers, measure mathematical closeness
- "Semantic" means relating to meaning, not just spelling — semantic matching = meaning-based matching
