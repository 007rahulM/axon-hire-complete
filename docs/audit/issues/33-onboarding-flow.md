# Issue #33 — No Onboarding Flow

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — new users don't know what to do first; resume upload is hidden  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*Priya is reviewing user analytics (once PostHog is set up).*

---

**🔴 Priya (PM):** "Our funnel shows: 100 users register, 67 verify their email. Of those 67, only 12 upload a resume within 24 hours. And without a resume, the AI scoring is useless."

**🔵 Fay (Frontend):** "After OTP verification, users land on... the home page. There's no 'welcome, here's what to do next' moment."

**🔴 Priya:** "Every successful SaaS has an onboarding flow. A sequence of steps that guides new users to their first 'aha moment.' For us, that's seeing their AI analysis score. But to get there, they need to upload a resume and apply to a job."

**🟠 Ben (Backend):** "We could detect if a user has never completed onboarding and redirect them to a guided setup."

---

## 🔍 What a Good Onboarding Flow Does

### The "Aha Moment"

Every product has a key moment when users understand the value. For Axon Hire:
- **Job seekers**: Seeing their AI match score on a specific job
- **Recruiters**: Seeing ranked candidates on a job they posted

Everything in onboarding should drive the user to that moment as fast as possible.

### The Onboarding Steps (Job Seeker)

```
Step 1: Welcome screen ("You're verified! Let's set up your profile")
Step 2: Upload resume (biggest blocker — do it first while motivated)
Step 3: Add 3 top skills (quick, builds profile quality)
Step 4: Browse one job and apply (the aha moment — see your AI score)
```

Total time: 3-5 minutes. User value unlocked immediately.

---

## 🛠 The Fix (to implement in Branch 5)

### Step 1: Add Onboarding Status to User Model

```js
// backend/models/User.js — add field:
onboardingCompleted: { type: Boolean, default: false },
```

### Step 2: Create Onboarding Wizard Page

Create `frontend/src/pages/Onboarding.jsx`:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";

const STEPS = [
  { id: 1, title: "Welcome to Axon Hire!", description: "Let's set up your profile in 3 quick steps." },
  { id: 2, title: "Upload Your Resume", description: "Our AI needs your resume to match you with jobs." },
  { id: 3, title: "Add Your Skills", description: "Tell us what you're good at." },
  { id: 4, title: "You're ready!", description: "Browse jobs and see your AI match scores." },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const handleResumeUpload = async () => {
    if (!resumeFile) return setStep(3); // Allow skipping
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("resume", resumeFile);
    
    await axios.post("/api/users/upload-resume", formData);
    setIsLoading(false);
    setStep(3);
  };
  
  const handleSkillsSubmit = async () => {
    if (skills.length > 0) {
      await axios.patch("/api/users/profile", { skills });
    }
    setStep(4);
  };
  
  const handleFinish = async () => {
    await axios.patch("/api/users/profile", { onboardingCompleted: true });
    navigate("/jobs"); // Send to jobs page to find their first match
  };
  
  // Progress indicator
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  
  return (
    <div className="onboarding-container">
      {/* Progress bar */}
      <div className="onboarding-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <span>Step {step} of {STEPS.length}</span>
      </div>
      
      {step === 1 && (
        <div className="onboarding-step">
          <h1>Welcome, {user?.name?.split(" ")[0]}! 🎉</h1>
          <p>You're almost ready. Let's take 3 minutes to set up your profile so our AI can find your best matches.</p>
          <button onClick={() => setStep(2)} className="btn-primary btn-lg">
            Let's go →
          </button>
          <button onClick={handleFinish} className="btn-ghost">
            Skip setup, browse jobs
          </button>
        </div>
      )}
      
      {step === 2 && (
        <div className="onboarding-step">
          <h2>Upload Your Resume</h2>
          <p>Our AI reads your resume to match you with relevant jobs and calculate your fit score.</p>
          <div
            className="upload-dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); setResumeFile(e.dataTransfer.files[0]); }}
          >
            {resumeFile ? (
              <p>✅ {resumeFile.name}</p>
            ) : (
              <>
                <p>Drag your resume here</p>
                <p>or</p>
                <label className="btn-secondary">
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
                <p className="hint">PDF or Word document, max 5MB</p>
              </>
            )}
          </div>
          <button onClick={handleResumeUpload} disabled={isLoading} className="btn-primary">
            {isLoading ? "Uploading..." : "Continue →"}
          </button>
          <button onClick={() => setStep(3)} className="btn-ghost">Skip for now</button>
        </div>
      )}
      
      {step === 3 && (
        <div className="onboarding-step">
          <h2>What are your top skills?</h2>
          <p>Add up to 10 skills. This helps us show you the most relevant jobs.</p>
          <div className="skill-input-area">
            <div className="skill-tags">
              {skills.map((s, i) => (
                <span key={i} className="skill-tag">
                  {s} <button onClick={() => setSkills(skills.filter((_, j) => j !== i))}>×</button>
                </span>
              ))}
            </div>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && skillInput.trim() && skills.length < 10) {
                  setSkills([...skills, skillInput.trim()]);
                  setSkillInput("");
                }
              }}
              placeholder="Type a skill and press Enter"
            />
          </div>
          <button onClick={handleSkillsSubmit} className="btn-primary">
            {skills.length > 0 ? "Save Skills →" : "Skip →"}
          </button>
        </div>
      )}
      
      {step === 4 && (
        <div className="onboarding-step">
          <div className="success-icon">🚀</div>
          <h2>You're all set!</h2>
          <p>Browse jobs and see your personalized AI match scores. Good luck!</p>
          <button onClick={handleFinish} className="btn-primary btn-lg">
            Browse Jobs →
          </button>
        </div>
      )}
    </div>
  );
}
```

### Step 3: Redirect to Onboarding After OTP Verification

```jsx
// In VerifyOTP.jsx — after successful verification:
if (!user.onboardingCompleted) {
  navigate("/onboarding");
} else {
  navigate(user.role === "recruiter" ? "/recruiter-dashboard" : "/jobs");
}
```

### Step 4: Add Route

```jsx
// In App.jsx:
<Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
```

---

## ❓ Common Questions

**Q: What if a user closes the browser during onboarding?**  
A: `onboardingCompleted` is still `false`. On their next login, check if it's `false` and show a "continue setup" prompt — or just let them proceed normally (don't force onboarding twice).

**Q: Should onboarding be mandatory?**  
A: No. Always provide a "Skip" option at every step. Forced onboarding increases drop-off. Guided onboarding with easy skips has the highest completion rate.

**Q: Do recruiters need a different onboarding?**  
A: Yes. Recruiter onboarding: company profile setup → post first job. The first "aha moment" for a recruiter is seeing applicants on their job.

---

## 🎓 What You Learned

- Onboarding gets users to the "aha moment" — the point where they understand the app's value
- Multi-step wizards with progress indicators reduce cognitive load
- Always allow skipping — forced onboarding increases drop-off
- Drag-and-drop upload areas are more inviting than "Browse Files" buttons
- After OTP verification is the best moment to start onboarding (user is most motivated)
