# Issue #16 — Home.jsx is 1,963 Lines (134KB)

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟡 Performance — massive component causes slow initial load and poor developer experience  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*Fay (Frontend) is doing a code review.*

---

**🔵 Fay (Frontend):** "I need to add a new section to the Home page. I opened `Home.jsx`... it's 1,963 lines."

**🔴 Priya (PM):** "Is that bad?"

**🔵 Fay:** "It's terrible. Finding anything takes 5 minutes of scrolling. There are hero sections, testimonials, feature cards, job categories, FAQ sections, and CTAs all in one file. The component re-renders as a single unit — if one piece of state changes (like a hover effect), the entire 1,963-line component re-evaluates."

**🟠 Ben (Backend):** "What's the impact on users?"

**🔵 Fay:** "Bundle size. Vite code-splits by route — but within the Home route, everything in `Home.jsx` loads together. The JavaScript for a FAQ accordion, a testimonials carousel, job category cards — all loads together even if the user never scrolls down to see any of it."

**🟡 Dev (DevOps):** "What size are we talking?"

**🔵 Fay:** "Let me check... the built chunk for Home is about 134KB. That's 0.5 seconds of parsing time on a mid-range phone on 4G. For comparison, `Jobs.jsx` is 1,100 lines and 80KB — also too large, but better."

**🔴 Priya:** "How do we fix it?"

**🔵 Fay:** "Component decomposition. Split `Home.jsx` into multiple components — `HeroSection.jsx`, `FeaturesSection.jsx`, `TestimonialsSection.jsx`, `FAQSection.jsx`. Each is focused, reusable, and can be lazy-loaded."

---

## 🔍 Understanding the Problem

### Why Large Components Are Slow

React components have a simple rule: when state or props change, the component re-renders. For a small component (50 lines), that re-render is cheap. For a 1,963-line component with dozens of elements:

1. React diffing compares the old and new virtual DOM trees — more nodes = more work
2. All child elements re-evaluate their render functions even if nothing relevant changed
3. Developers reading the code have to understand everything in context

### The Bundle Size Problem

```
Before code splitting:
Home.js chunk = 134KB (all sections: hero + features + testimonials + jobs + FAQ + CTA)
User visits Home page → downloads 134KB → parses 134KB → renders

After code splitting with React.lazy():
Home.js chunk = 20KB (just the hero + navigation between sections)
FAQ.js chunk = 15KB (lazy-loaded when user scrolls to it)
Testimonials.js chunk = 10KB (lazy-loaded)
etc.

User visits Home page → downloads 20KB → renders hero immediately
Scrolls down → loads FAQ chunk only when needed
```

This is called **lazy loading** — load JavaScript only when the user will actually see it.

---

## 🛠 The Fix (to implement in Branch 5)

### Step 1: Identify the Sections in Home.jsx

Open `frontend/src/pages/Home.jsx` and look for major JSX blocks. Common structure:
- Hero section (the big top area with CTA)
- Stats/numbers bar
- How it works / Features section
- Featured jobs preview
- Testimonials / Reviews
- Job categories
- FAQ accordion
- Footer CTA

### Step 2: Create Component Files

Create `frontend/src/components/home/` folder:

```bash
mkdir -p frontend/src/components/home
```

Files to create:
- `HeroSection.jsx`
- `FeaturesSection.jsx`
- `TestimonialsSection.jsx`
- `FAQSection.jsx`
- `JobCategoriesSection.jsx`
- `CTASection.jsx`

### Step 3: Extract Each Section

Take the JSX for each section from `Home.jsx` and make it a standalone component:

```jsx
// frontend/src/components/home/FAQSection.jsx
import { useState } from "react";

const faqs = [
  { q: "How does ATS scoring work?", a: "..." },
  { q: "Is my resume data private?", a: "..." },
  // ...
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? "open" : ""}`}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {faq.q}
          </button>
          {openIndex === i && <p>{faq.a}</p>}
        </div>
      ))}
    </section>
  );
}
```

### Step 4: Use React.lazy in Home.jsx

```jsx
// frontend/src/pages/Home.jsx (cleaned up)
import { lazy, Suspense } from "react";

// Critical: Load immediately (above the fold)
import HeroSection from "../components/home/HeroSection";

// Non-critical: Load only when needed
const FeaturesSection = lazy(() => import("../components/home/FeaturesSection"));
const TestimonialsSection = lazy(() => import("../components/home/TestimonialsSection"));
const FAQSection = lazy(() => import("../components/home/FAQSection"));

export default function Home() {
  return (
    <main>
      {/* Hero loads immediately — it's what users see first */}
      <HeroSection />
      
      {/* Everything below loads lazily */}
      <Suspense fallback={<div className="section-skeleton" />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="section-skeleton" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="section-skeleton" />}>
        <FAQSection />
      </Suspense>
    </main>
  );
}
```

### Step 5: Add Intersection Observer for True Lazy Loading

For even better performance, only load sections when the user scrolls near them:

```jsx
import { useRef, useState, useEffect, lazy, Suspense } from "react";

function LazySection({ component: Component }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "200px" } // Start loading 200px before visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={<div className="skeleton" />}><Component /></Suspense> : <div className="section-placeholder" />}
    </div>
  );
}
```

---

## ❓ Common Questions

**Q: Won't having more files make it harder to navigate?**  
A: Actually easier — you search for "FAQ" and open `FAQSection.jsx` immediately. With a 1,963-line monolith, you search for `faq` and get 40 results across comments, class names, and logic.

**Q: How do I know what size my chunks are?**  
A: Run `npm run build` in the frontend folder. Vite prints the sizes of all chunks:
```
dist/assets/Home-abc123.js     20.30 kB
dist/assets/FAQSection-def456.js  5.12 kB
```

**Q: What is `Suspense`?**  
A: `Suspense` is a React component that shows a fallback (loading UI) while a lazy-loaded component is being downloaded. Without it, lazy loading causes a blank white flash.

**Q: Should I split `Jobs.jsx` too?**  
A: Yes — it's 1,100 lines. Apply the same pattern. Extract `JobCard.jsx`, `FilterPanel.jsx`, `SearchBar.jsx`. Branch 5 covers this.

---

## 🎓 What You Just Learned

- Large components slow React rendering because React re-evaluates everything on every render
- `React.lazy()` + `Suspense` enables code splitting — separate JS files loaded on demand
- `IntersectionObserver` triggers lazy loading based on scroll position
- Component decomposition: each component should do ONE thing (Single Responsibility Principle)
- Vite's build output shows bundle sizes — check them after building
- The goal: the Hero section (above the fold) loads instantly; everything else loads as needed
