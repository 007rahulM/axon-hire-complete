# Issue #35 — No Accessibility (a11y)

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — users with screen readers, keyboard navigation, or disabilities cannot use the app  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*A visually impaired user sends an email.*

---

**User:** "I use a screen reader (NVDA + Chrome). I tried to use Axon Hire to find a job. I could not navigate the job listings or apply for a job. The buttons have no labels. The modals are not announced. Please help."

**🔴 Priya (PM):** "This user can't use our app at all."

**🔵 Fay (Frontend):** "Screen readers navigate by HTML semantics. If you use `<div onClick={...}>` instead of `<button>`, the screen reader doesn't know it's interactive. Same if buttons have no text, images have no alt text, or modals don't receive focus when they open."

**🟣 Sam (Security):** "In many countries (US, UK, EU), accessibility is a legal requirement for digital products — especially those relating to employment. WCAG 2.1 Level AA is the standard."

---

## 🔍 The Key Accessibility Rules (WCAG 2.1 AA)

### 1. Semantic HTML

Use HTML elements for their intended purpose:

```jsx
// ❌ Bad — a div is not interactive:
<div className="btn-apply" onClick={handleApply}>Apply Now</div>

// ✅ Good — a button is naturally keyboard-focusable, clickable, and announced:
<button className="btn-apply" onClick={handleApply}>Apply Now</button>
```

### 2. ARIA Labels for Icon-Only Elements

```jsx
// ❌ Bad — screen reader says "button" with no context:
<button onClick={closeModal}>✕</button>

// ✅ Good — screen reader says "Close modal button":
<button onClick={closeModal} aria-label="Close modal">✕</button>
```

### 3. Form Labels

```jsx
// ❌ Bad — input has no label:
<input type="email" placeholder="Enter your email" />

// ✅ Good — label is explicitly connected to input:
<label htmlFor="email">Email address</label>
<input id="email" type="email" placeholder="user@example.com" />

// Also acceptable: aria-label
<input
  type="email"
  aria-label="Email address"
  placeholder="user@example.com"
/>
```

### 4. Modal Focus Management

When a modal opens, focus must move into it. When it closes, focus must return to the trigger:

```jsx
// frontend/src/components/Modal.jsx
import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Save the element that triggered the modal
      triggerRef.current = document.activeElement;
      // Move focus into the modal
      modalRef.current?.focus();
    } else if (triggerRef.current) {
      // Return focus to trigger when modal closes
      triggerRef.current.focus();
    }
  }, [isOpen]);
  
  // Trap focus within modal (Tab key shouldn't escape to background)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    
    if (e.key === "Tab") {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];
      
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    // Overlay
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-hidden="true"  // Background is hidden from screen readers when modal is open
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        role="dialog"          // Announces as "dialog" to screen readers
        aria-modal="true"      // Tells screen reader content behind modal is inert
        aria-labelledby="modal-title"  // Points to the title
        tabIndex={-1}          // Allows programmatic focus
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">✕</button>
      </div>
    </div>
  );
}
```

### 5. Image Alt Text

```jsx
// ❌ Bad — decorative logo has no alt text:
<img src="/logo.png" />

// ✅ Good — functional image describes what it is:
<img src="/logo.png" alt="Axon Hire logo" />

// ✅ For purely decorative images:
<img src="/decoration.png" alt="" role="presentation" />
```

### 6. Color Contrast

Text must have sufficient contrast with its background:
- Normal text: 4.5:1 ratio minimum
- Large text (18px+ or 14px bold): 3:1 minimum

Check contrast: https://webaim.org/resources/contrastchecker/

Your gray placeholder text (`#999` on white `#fff`) is contrast ratio 2.85:1 — fails WCAG AA. Use `#767676` or darker.

### 7. Keyboard Navigation

Every interactive element must be reachable and usable with Tab/Enter/Space keys:

```jsx
// Test: Can you use the entire app with just a keyboard? 
// Tab = move forward
// Shift+Tab = move backward
// Enter = activate buttons/links
// Space = toggle checkboxes
// Arrow keys = navigate within components (menus, tabs)
```

### 8. Skip Navigation Link

```jsx
// Add at the very start of your layout:
<a href="#main-content" className="skip-nav">
  Skip to main content
</a>

<Navbar />
<main id="main-content">
  <Routes>...</Routes>
</main>
```

CSS (hidden by default, visible on focus):
```css
.skip-nav {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  z-index: 1001;
}
.skip-nav:focus {
  top: 0;
}
```

---

## 🛠 How to Audit for Accessibility Issues

### Automated Check (5 minutes)

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Check **Accessibility** → Run Audit
4. Fix all items marked red (fail) first, then orange (warning)

### Screen Reader Test (10 minutes)

1. Download NVDA (free) from https://www.nvaccess.org/download/
2. Enable it (`Ctrl+Alt+N`)
3. Try to: find a job, read the description, click Apply
4. If you can't complete the task, that's a real user barrier

---

## ❓ Common Questions

**Q: Is accessibility legally required for us?**  
A: Employment-related applications are covered under ADA in the US and the European Accessibility Act in the EU. As a job board, we're directly in scope. Practically: it also affects your Google ranking (Core Web Vitals include accessibility signals).

**Q: How much work is it to fix?**  
A: The most impactful fixes (semantic HTML, aria-labels on icon buttons, form labels) can be done in a day. Complete WCAG AA compliance is 2-3 weeks of focused work. Start with the automated Lighthouse audit — fix all the "Fails" first.

**Q: Does this affect users who aren't disabled?**  
A: Yes — keyboard navigation, focus management, and good contrast benefit everyone. Power users often prefer keyboard navigation. Good contrast helps in bright sunlight.

---

## 🎓 What You Learned

- `<button>` vs `<div onClick>` is not just semantics — screen readers only announce `<button>` as interactive
- `aria-label` adds invisible descriptions for icon-only UI elements
- Modal accessibility: move focus in → trap focus inside → return focus when closed
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` is the complete modal accessibility pattern
- Lighthouse accessibility audit is a free 5-minute check that catches most common issues
- WCAG 2.1 Level AA is the legal standard in most jurisdictions
