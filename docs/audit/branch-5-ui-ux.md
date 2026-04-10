# Branch 5 — UI/UX Polish

> These changes are NOT yet implemented. This document is the implementation guide.

---

## Issue 32: No Skeleton Loading States

### Why skeletons feel faster than spinners:
Spinners indicate "something is happening, we don't know what." Skeletons show the shape of the content that's loading — the brain starts processing the layout before the data arrives, making the perceived wait shorter.

### Tailwind skeleton component:
```jsx
// src/components/JobCardSkeleton.jsx
export default function JobCardSkeleton() {
  return (
    <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 animate-pulse">
      <div className="h-5 bg-slate-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-slate-800 rounded w-1/2 mb-6" />
      <div className="h-4 bg-slate-800 rounded w-full mb-2" />
      <div className="h-4 bg-slate-800 rounded w-5/6" />
    </div>
  );
}
```

Use in Jobs.jsx:
```jsx
{isLoading ? (
  Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
) : (
  jobs.map(job => <JobCard key={job._id} job={job} />)
)}
```

---

## Issue 33: No Onboarding Flow

### Add an onboarding progress checklist to the candidate dashboard:
```jsx
// src/components/OnboardingChecklist.jsx
const steps = [
  { label: "Create account", done: true },
  { label: "Upload your resume", done: !!user.resumeUrl },
  { label: "Add skills to your profile", done: user.skills.length > 0 },
  { label: "Apply to your first job", done: hasApplied },
];

// Dismiss once all steps are done, or user clicks "dismiss"
// Store dismissed state in localStorage
```

---

## Issue 34: SEO (React Helmet)

**Package**: `react-helmet-async` (already installed in this project)

### Add meta tags to key pages:
```jsx
// In Jobs.jsx
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Software Engineer Jobs | Axon Hire</title>
  <meta name="description" content="Find your next tech job. Browse 1,000+ software engineering positions." />
  <meta property="og:title" content="Software Engineer Jobs | Axon Hire" />
</Helmet>
```

Wrap the app in `<HelmetProvider>` in `main.jsx`.

---

## Issue 35: Accessibility (a11y)

### Critical fixes:
```jsx
// Icon-only buttons need aria-label
<button aria-label="Close modal">✕</button>
<button aria-label="Save job">🔖</button>

// Modals need role and focus management
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Apply for Job</h2>
</div>

// Form inputs need associated labels
<label htmlFor="email">Email</label>
<input id="email" type="email" ... />
```

**Tool**: Install the axe DevTools browser extension and run it on each page. Fix all "Critical" and "Serious" issues first.

---

## Issue 36: Rich Text Editor for Job Descriptions

**Package**: Tiptap (free, MIT license)

```
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
```

```jsx
// In PostJob.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const editor = useEditor({
  extensions: [StarterKit],
  content: description,
  onUpdate: ({ editor }) => setDescription(editor.getHTML()),
});

<EditorContent editor={editor} className="bg-slate-900 rounded-xl p-4 text-white min-h-[200px]" />
```

Store as HTML in MongoDB. When rendering job descriptions, use `dangerouslySetInnerHTML` with a DOMPurify sanitizer to prevent XSS.

---

## Issue 37: Dark Mode Toggle

```jsx
// src/components/DarkModeToggle.jsx
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark" || 
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} aria-label="Toggle dark mode">
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
```

Add to Navbar.jsx.

---

## Forgot Password & Reset Password Pages (needed for Branch 2 backend routes)

```jsx
// src/pages/ForgotPassword.jsx
// - Email input form
// - Calls POST /api/auth/forgot-password
// - Shows "If that email exists, a reset link has been sent"

// src/pages/ResetPassword.jsx  
// - Gets token from URL: useParams()
// - New password + confirm password inputs
// - Calls POST /api/auth/reset-password/:token
// - Redirect to /login on success
```

Add routes in App.jsx:
```jsx
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
```
