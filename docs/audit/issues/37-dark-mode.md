# Issue #37 — No Dark Mode Toggle

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — 80% of developer-audience apps offer dark mode; users expect it  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*Priya is doing a competitive analysis.*

---

**🔴 Priya (PM):** "LinkedIn has dark mode. GitHub has dark mode. Every job board targeting tech workers has dark mode. We don't. Tech candidates are our primary audience."

**🔵 Fay (Frontend):** "Dark mode is actually not that hard to add. The key is using CSS custom properties (variables) for all colors. Once you do that, flipping dark mode is one class toggle on the `<html>` element."

**🔴 Priya:** "And respecting the user's OS preference automatically — some people have their whole OS in dark mode and expect every app to follow."

**🔵 Fay:** "That's `prefers-color-scheme: dark` media query. We can detect it and default to dark mode for those users."

---

## 🛠 The Fix (to implement in Branch 5)

### Step 1: Audit and Convert to CSS Custom Properties

First, replace all hard-coded color values in CSS/JSX with CSS variables:

```css
/* frontend/src/styles/variables.css or in your global.css */
:root {
  /* Light mode (default) */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-card: #ffffff;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
  --color-primary: #6c63ff;
  --color-primary-hover: #5b54e8;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Dark mode overrides */
[data-theme="dark"] {
  --color-bg: #0f0f1a;
  --color-bg-secondary: #1a1a2e;
  --color-bg-card: #1e1e35;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-border: #2d2d4e;
  --color-border-hover: #3d3d6e;
  --color-primary: #7c73ff;
  --color-primary-hover: #6c63ff;
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* Respect OS preference automatically */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f0f1a;
    /* ... all dark values ... */
  }
}
```

### Step 2: Dark Mode Context and Toggle

```js
// frontend/src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check saved preference first
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    
    // Fall back to OS preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  
  useEffect(() => {
    // Apply theme to the <html> element
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

Wrap your app:
```jsx
// frontend/src/main.jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Step 3: Toggle Button in Navbar

```jsx
// frontend/src/components/Navbar.jsx
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"; // or use emoji

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav>
      {/* ...other nav items... */}
      
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="theme-toggle"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
```

### Step 4: Use Variables in Components

Replace hard-coded colors in CSS with variables:

```css
/* Before (hard-coded): */
.job-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #1a1a2e;
}

/* After (uses variables): */
.job-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}
```

Do this for every component systematically. Run a global search for hex color values (`#[0-9a-fA-F]{3,6}`) and replace them with appropriate variables.

---

## ❓ Common Questions

**Q: What about inline styles in JSX? (There are many in RecruiterDashboard.jsx)**  
A: Inline styles can't use CSS variables directly in the value — they use the CSS variable function:
```jsx
// ✅ Inline styles can use CSS variables:
<div style={{ backgroundColor: "var(--color-bg-card)" }} />

// OR use a hook:
const { theme } = useTheme();
<div style={{ backgroundColor: theme === "dark" ? "#1e1e35" : "#ffffff" }} />
```

**Q: What about third-party components that hard-code colors?**  
A: Most accept `className` or `style` props. For charts (if you add any), pass color arrays based on the theme. For deeply styled third-party components, wrapping with CSS overrides using `:root[data-theme=dark] .component-class { ... }` works.

**Q: Should default be light or dark?**  
A: Use the OS preference (`prefers-color-scheme`). Respect what the user has already configured at the system level. They chose dark mode in their OS because they prefer it everywhere.

**Q: How do I prevent a "flash of wrong theme" (FOUT) on page load?**  
A: The React context initializes after the JS loads, which can cause a brief flash. Prevent it with a script in your `index.html` `<head>` (before React loads):
```html
<script>
  (function() {
    const saved = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", saved || preferred);
  })();
</script>
```

---

## 🎓 What You Learned

- CSS custom properties (variables) are the foundation of theming — define colors as variables, switch the variable values for theme change
- `data-theme` attribute on `<html>` + CSS variable overrides = clean, no-JS theme system
- `localStorage` persists the user's preference across sessions
- `prefers-color-scheme` detects the OS-level dark/light preference
- Prevent flash of wrong theme with a synchronous script in `<head>` that sets the attribute before React boots
