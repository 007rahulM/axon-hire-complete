# Issue #27 — Resume Scoring is Gameable

> **Branch**: 4 (AI & Resume Improvements)  
> **Severity**: 🟣 AI — candidates who keyword-stuff their resumes get unfair high scores  
> **Status**: Branch 4 (pending)

---

## 👥 The Team Room

*A recruiter notices something suspicious.*

---

**👩‍💼 Recruiter (via Priya):** "I had a candidate with a 95% ATS match. His resume literally had a section at the bottom: 'Skills: React, Node.js, TypeScript, Docker, Kubernetes, AWS, GraphQL...' — 40 skills listed. He couldn't explain any of them in the interview. He'd clearly just copy-pasted the job requirements."

**🔴 Priya (PM):** "Our ATS system rewarded keyword stuffing. That's useless to recruiters."

**🟠 Ben (Backend):** "The current scoring compares the job requirements list against the resume text. It counts how many requirement keywords appear in the resume. If someone lists 'React' 10 times, it still just counts as one match — but if they list 50 keywords that are in the job description, they score 50/50."

**🟡 Dev (DevOps):** "This is the whole problem with keyword matching. It rewards gaming the system, not actual skill."

**🟠 Ben:** "AI-based evaluation is better because the model understands context. If you list 'React' but your project descriptions never mention React, the AI notices that inconsistency."

---

## 🔍 Understanding the Problem

### Current Scoring: Keyword Matching

```
Job requires: ["React", "Node.js", "TypeScript", "MongoDB"]
Resume contains: "React React React Node.js TypeScript MongoDB Redis Python Java"

Score = (matched keywords / total keywords) = 4/4 = 100%
```

The candidate added a keyword list at the bottom. 100% score. They may have no real React experience.

### What AI Scoring Considers (Better Approach)

Instead of "does the word appear?", AI scoring asks:
- "Does their experience demonstrate using React in real projects?"
- "How many months did they work with React-based technologies?"
- "Do their project descriptions match what the job requires?"
- "Are their claimed skills consistent with their described experience?"

---

## 🛠 The Fix (to implement in Branch 4)

### Approach 1: Penalize Keyword-Dense Sections

Detect a "skill list" section and reduce its weight in scoring:

```js
// In backend/utils/scoring.js or matchingEngine.js:
function calculateSkillScore(skillSection, generalSection, jobRequirements) {
  // Skills found in the general section (projects, experience) get full weight
  const generalSkillMatches = jobRequirements.filter(skill => 
    generalSection.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Skills ONLY in the skill list section get reduced weight (50%)
  const listOnlySkillMatches = jobRequirements.filter(skill => 
    skillSection.toLowerCase().includes(skill.toLowerCase()) &&
    !generalSection.toLowerCase().includes(skill.toLowerCase())
  );
  
  const fullWeightScore = generalSkillMatches.length;
  const halfWeightScore = listOnlySkillMatches.length * 0.5;
  
  return (fullWeightScore + halfWeightScore) / jobRequirements.length;
}
```

### Approach 2: AI Contextual Verification

When the AI model is available, use it to verify claimed skills:

```js
const verificationPrompt = `
  A candidate claims these skills: ${claimedSkills.join(", ")}
  
  Here is their work experience section: 
  ${experienceZone}
  
  For each claimed skill, determine if the experience section provides EVIDENCE of using that skill.
  Evidence = the skill is mentioned in a project description, achievement, or responsibility — not just listed.
  
  Return JSON: {
    "verified": ["React", "Node.js"],  // Skills with evidence in experience
    "unverified": ["Kubernetes", "AWS"], // Skills listed but no evidence
    "confidence": 0.85
  }
`;
```

### Approach 3: Score Breakdown Transparency

Instead of hiding the scoring logic, show recruiters what the score means:

```json
{
  "overallScore": 72,
  "breakdown": {
    "skillMatch": {
      "score": 80,
      "matched": ["React", "Node.js", "MongoDB"],
      "missing": ["TypeScript"],
      "note": "React and Node.js are evidenced in project descriptions. MongoDB is listed skills only."
    },
    "experienceRelevance": {
      "score": 65,
      "totalMonths": 18,
      "relevantMonths": 12,
      "note": "1 year of relevant full-stack experience"
    },
    "profileCompleteness": {
      "score": 90,
      "hasLinks": true,
      "hasProfilePicture": true,
      "note": "Portfolio and GitHub found"
    }
  }
}
```

When recruiters can see the breakdown, they can make better decisions. "80% skill match but 'MongoDB is listed skills only'" is useful context.

### Approach 4: Recruiter Override (Already Implemented)

The `overruledSkills` field in the Application model lets recruiters manually mark skills as present or absent — overriding the AI score. This is the safety valve when the AI is wrong.

---

## ❓ Common Questions

**Q: Can we completely eliminate gaming?**  
A: No. ATS gaming is a cat-and-mouse game. Resume writing coaches already teach "mirror the job description." Your defense: prioritize demonstrated experience (project descriptions) over skill lists, show score breakdowns so recruiters can see through keyword stuffing, and use AI evaluation that understands context.

**Q: What if legitimate candidates have detailed skill sections?**  
A: The section-weighting approach (Approach 1) rewards candidates who ALSO have experience evidence. A candidate with React in both their skill list AND their project descriptions scores higher than one with React only in the skill list.

**Q: Is AI scoring 100% reliable?**  
A: No. AI models have biases and make mistakes. That's why the recruiter override exists and why we show score breakdowns. AI scoring is a filter and prioritization tool, not a final decision-maker.

---

## 🎓 What You Learned

- Keyword matching scores keyword density, not skill competence — it's gameable by design
- The fix: weight evidence-in-experience higher than evidence-in-skills-list
- AI contextual scoring understands "this person used React in 3 projects" vs "this person listed React"
- Transparency (score breakdown) helps recruiters see through gaming
- Recruiter override is the human-in-the-loop safety valve for when the system gets it wrong
- The goal isn't a perfect algorithm — it's helping recruiters spend time on the right candidates
