# Issue #31 — AI Bot Takes Over the Full Page

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — the AI chatbot is a separate full-page experience, breaking user flow  
> **Status**: Branch 5 (pending)

---

## 👥 The Team Room

*Priya is doing a UX review of the AI Bot feature.*

---

**🔴 Priya (PM):** "The AI bot is a separate page — `/ai-bot`. When a user is on the Jobs page and wants to ask the bot 'what jobs match my skills?', they have to navigate away. They lose their search state. That's broken UX."

**🔵 Fay (Frontend):** "Every good chatbot is a floating widget — bottom-right corner, expandable. The page content stays. The user can ask a question and see the answer without leaving what they were doing."

**🔴 Priya:** "Like Intercom, or the ChatGPT widget. Always available, never interrupting."

**🔵 Fay:** "The current `AIBot.jsx` is a full-page component. We need to convert it to a persistent floating widget that's available on every page."

---

## 🔍 The Interaction Design Pattern

### Current (Bad): Full-Page Navigation

```
User is on /jobs → clicks "AI Help" → navigates to /ai-bot → 
asks question → navigates back to /jobs → has to re-apply filters
```

### Better: Floating Widget

```
User is on /jobs → floating button in corner → click → 
chat panel slides open (jobs page still visible behind it) → 
asks question → gets answer → close panel → still on /jobs
```

The user NEVER leaves the current page.

---

## 🛠 The Fix (to implement in Branch 5)

### Step 1: Create a Floating Chat Widget

Create `frontend/src/components/AIChatWidget.jsx`:

```jsx
import { useState, useRef, useEffect } from "react";
import axios from "../utils/axiosInstance";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Axon AI. How can I help you find your next opportunity?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);
  
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await axios.post("/api/ai/chat", {
        messages: [...messages, userMessage],
      });
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.data.reply,
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Floating toggle button */}
      <button
        className="ai-chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#6c63ff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(108, 99, 255, 0.4)",
        }}
      >
        {isOpen ? "✕" : "🤖"}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div
          className="ai-chat-panel"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "360px",
            height: "480px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div style={{ padding: "16px", borderBottom: "1px solid #eee", fontWeight: 600 }}>
            Axon AI Assistant
          </div>
          
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.role === "user" ? "#6c63ff" : "#f5f5f5",
                  color: msg.role === "user" ? "#fff" : "#333",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  maxWidth: "80%",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", color: "#888", fontSize: "14px" }}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid #eee", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{ padding: "8px 16px", backgroundColor: "#6c63ff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

### Step 2: Add to App Layout

```jsx
// frontend/src/App.jsx — add widget at the root level so it's always available:
import AIChatWidget from "./components/AIChatWidget";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          {/* ...all routes... */}
        </Routes>
      </main>
      <AIChatWidget /> {/* Always rendered, visible on every page */}
    </div>
  );
}
```

### Step 3: Keep the `/ai-bot` Page for Users Who Want Full-Screen

Some users might prefer the full-screen experience. Keep `AIBot.jsx` as a route but make the widget the primary way to access it.

---

## ❓ Common Questions

**Q: What z-index should the widget use?**  
A: Higher than any modal you use (modals are typically 500-800). Use 999-1000 for the chat widget. But lower than critical confirmation dialogs (delete account, etc.) which should be 1001+.

**Q: Should the chat history persist across page navigations?**  
A: Yes — since the component is in App.jsx (always mounted), the `messages` state persists as users navigate between pages. It only resets on full page refresh.

**Q: What about mobile — a floating widget might overlap content?**  
A: On mobile, show the widget at 80% of screen width and height when open, with a tap-outside-to-close. Or use a "bottom sheet" pattern (slides up from bottom). Add a media query: `@media (max-width: 768px) { .ai-chat-panel { width: 95vw; right: 2.5vw; } }`

---

## 🎓 What You Learned

- UI patterns matter: full-page navigation breaks user flow; floating widgets don't
- `position: fixed` keeps the widget in the viewport regardless of scroll
- Mounting the widget in `App.jsx` makes it available on every page without re-mounting
- Auto-scroll to the latest message with `scrollIntoView({ behavior: "smooth" })`
- `onKeyDown` with Enter for submit is a UX expectation in chat interfaces
