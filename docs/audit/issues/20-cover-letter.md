# Issue #20 — No Cover Letter Support

> **Branch**: 7 (New Features)  
> **Severity**: 🔵 Feature — applications are resume-only; no way to add context  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*A recruiter gives feedback.*

---

**🔴 Priya (PM):** "I talked to three recruiters. All three said the same thing: 'I love the ATS scoring, but I still want a cover letter. It tells me WHY they want THIS job, not just what skills they have.'"

**🟠 Ben (Backend):** "The Application model has a `resumeUrl` field. There's no `coverLetter` field."

**🔵 Fay (Frontend):** "And the apply form has no textarea for cover letter. Users can't submit one even if they wanted to."

**🔴 Priya:** "What would it take to add it?"

**🟠 Ben:** "Backend: add a `coverLetter` text field to the Application model, accept it in the apply route. Frontend: add a textarea to the apply modal with a character limit. AI: we could include the cover letter in the AI analysis prompt to improve scoring."

---

## 🛠 The Fix (to implement in Branch 7)

### Part 1: Update Application Model

```js
// backend/models/Application.js — add field:
coverLetter: {
  type: String,
  default: "",
  maxlength: 2000, // ~350 words — typical cover letter length
},
```

### Part 2: Accept in Apply Route

```js
// backend/routes/applicationRoutes.js
router.post("/apply/:jobId", verifyToken, async (req, res) => {
  const { coverLetter } = req.body;
  
  // Validate length
  if (coverLetter && coverLetter.length > 2000) {
    return res.status(400).json({ message: "Cover letter must be under 2000 characters." });
  }
  
  const newApplication = new Application({
    jobId,
    applicantId: userId,
    resumeUrl: user.resumeUrl,
    coverLetter: coverLetter?.trim() || "", // Optional field
    aiAnalysis: [],
  });
  
  await newApplication.save();
  // ...
});
```

### Part 3: Frontend — Add Textarea to Apply Modal

```jsx
// In the apply modal (wherever the "Apply Now" button leads):
const [coverLetter, setCoverLetter] = useState("");
const MAX_CHARS = 2000;

<div className="cover-letter-field">
  <label>Cover Letter (Optional)</label>
  <textarea
    value={coverLetter}
    onChange={(e) => setCoverLetter(e.target.value)}
    placeholder="Tell this recruiter why you're a great fit for this role..."
    maxLength={MAX_CHARS}
    rows={6}
  />
  <span className={coverLetter.length > MAX_CHARS * 0.9 ? "text-red" : "text-gray"}>
    {coverLetter.length}/{MAX_CHARS}
  </span>
</div>
```

### Part 4: Show in Recruiter Dashboard

```jsx
// In RecruiterDashboard.jsx applicant modal:
{application.coverLetter && (
  <div className="cover-letter-section">
    <h4>Cover Letter</h4>
    <p>{application.coverLetter}</p>
  </div>
)}
```

### Part 5 (Optional): Include in AI Analysis

When running AI evaluation, include the cover letter as additional context:

```js
// In performAnalysis():
const userPrompt = `
  JOB DESCRIPTION: ${jobDescription}
  
  RESUME: ${resumeText}
  
  COVER LETTER: ${coverLetter || "Not provided"}
  
  Analyze the match between this candidate and the job...
`;
```

The AI can then comment on alignment between what the cover letter claims and what the resume shows.

---

## ❓ Common Questions

**Q: Should we make cover letters mandatory?**  
A: No. Making them mandatory reduces application volume. Many users (especially for technical roles) prefer to let their resume speak. Make it optional and show "No cover letter provided" in the recruiter view.

**Q: Should we allow rich text (bold, bullets) in cover letters?**  
A: Keep it plain text initially. Rich text requires a text editor (Issue #36) and proper sanitization to prevent XSS in the recruiter's browser. Add rich text in a follow-up.

**Q: What about cover letter length guidance?**  
A: Show guidance in the UI: "Keep it under 300 words. Explain why you want THIS role at THIS company." Character counter helps users self-regulate.

---

## 🎓 What You Learned

- Adding a simple field to an existing feature: model → route validation → frontend input → display
- Optional fields should never block an action (apply without cover letter = still fine)
- Character limits on text fields prevent database storage abuse and UI overflow
- AI prompts improve with more context — cover letters add signal about candidate intent
