import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../api/config";
import ReactMarkdown from "react-markdown";

// ─── Icons ───
const BotIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/>
    <path d="M7 15h0M17 15h0"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const MinimizeIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ExpandIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
  </svg>
);
const StopIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
  </svg>
);

const QUICK_PROMPTS = [
  "Interview questions for React Dev",
  "Tell me about yourself",
  "Salary negotiation tips",
  "How to explain employment gap",
];

export default function FloatingAIBot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, token } = useAuth();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [usage, setUsage] = useState(null); // { questionCount, questionLimit }
  const [limitHit, setLimitHit] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);
  const abortRef = useRef(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Don't render on the AI Bot page itself
  if (location.pathname === "/ai-bot") return null;

  // Fetch usage when opened
  useEffect(() => {
    if (open && isLoggedIn && !usage) {
      axiosInstance.get("/ai/usage")
        .then(res => setUsage(res.data))
        .catch(() => {});
    }
  }, [open, isLoggedIn]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // ── Dragging ──
  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ww = widgetRef.current?.offsetWidth || 56;
      const wh = widgetRef.current?.offsetHeight || 56;
      const nx = Math.min(Math.max(e.clientX - dragOffset.current.x, 0), vw - ww);
      const ny = Math.min(Math.max(e.clientY - dragOffset.current.y, 0), vh - wh);
      setPosition({ x: nx, y: ny });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  // Touch drag support
  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const rect = widgetRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const touch = e.touches[0];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ww = widgetRef.current?.offsetWidth || 56;
      const wh = widgetRef.current?.offsetHeight || 56;
      const nx = Math.min(Math.max(touch.clientX - dragOffset.current.x, 0), vw - ww);
      const ny = Math.min(Math.max(touch.clientY - dragOffset.current.y, 0), vh - wh);
      setPosition({ x: nx, y: ny });
    };
    const onEnd = () => setDragging(false);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging]);

  // ── AI Stream ──
  const handleSend = async (promptText) => {
    const query = (promptText || input).trim();
    if (!query || isLoading) return;
    if (!isLoggedIn) { navigate("/login"); return; }

    setInput("");
    setOutput("");
    setLimitHit(false);
    setIsLoading(true);

    abortRef.current = new AbortController();
    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/generate-questions-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ jobTitle: query, mode: "questions" }),
        signal: abortRef.current.signal,
      });

      if (response.status === 429) {
        setLimitHit(true);
        setOutput("");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput(prev => prev + decoder.decode(value, { stream: true }));
      }

      // Refresh usage after successful call
      axiosInstance.get("/ai/usage").then(r => setUsage(r.data)).catch(() => {});
    } catch (err) {
      if (err.name !== "AbortError") {
        setOutput(prev => prev + "\n\n**[Error: Connection interrupted]**");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const openFull = () => { navigate("/ai-bot"); setOpen(false); };

  // ── Default position ──
  const defaultPos = {
    right: "24px",
    bottom: "24px",
    left: "auto",
    top: "auto",
  };
  const customPos = position.x !== null ? {
    left: position.x + "px",
    top: position.y + "px",
    right: "auto",
    bottom: "auto",
  } : defaultPos;

  const remaining = usage ? (
    usage.questionLimit === null ? null :
    Math.max(0, usage.questionLimit - usage.questionCount)
  ) : null;

  return (
    <div
      ref={widgetRef}
      style={{
        position: "fixed",
        zIndex: 9999,
        userSelect: "none",
        ...customPos,
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      {/* ── EXPANDED PANEL ── */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: position.x !== null ? "auto" : "70px",
            top: position.x !== null ? "-400px" : "auto",
            right: position.x !== null ? "auto" : "0",
            left: position.x !== null ? "0" : "auto",
            width: 340,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 14,
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            cursor: "default",
          }}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px",
              background: "var(--accent)",
              cursor: "move",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <BotIcon />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Axon AI Coach</div>
                {remaining !== null && (
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: ".03em" }}>
                    {remaining}/{usage?.questionLimit} free requests left this month
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={openFull} title="Open full page" style={iconBtn}>
                <ExpandIcon />
              </button>
              <button onClick={() => setOpen(false)} title="Close" style={iconBtn}>
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            style={{
              flex: 1, minHeight: 200, maxHeight: 260, overflowY: "auto",
              padding: "12px 14px",
              fontSize: 12, lineHeight: 1.7, color: "var(--text-2)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {limitHit ? (
              <div style={{ textAlign: "center", padding: "20px 8px" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 6 }}>Monthly limit reached</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 14, lineHeight: 1.6 }}>
                  You've used all {usage?.questionLimit || 3} free AI requests this month.
                  Upgrade to recruiter for unlimited access.
                </div>
                <button
                  onClick={() => { navigate("/register-recruiter"); setOpen(false); }}
                  style={{ padding: "8px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Upgrade now →
                </button>
              </div>
            ) : output ? (
              <ReactMarkdown components={{
                p: ({ children, ...p }) => <p style={{ marginBottom: 8, color: "var(--text-2)" }} {...p}>{children}</p>,
                strong: ({ children, ...p }) => <strong style={{ color: "var(--text-1)", fontWeight: 700 }} {...p}>{children}</strong>,
                ul: ({ children, ...p }) => <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 8 }} {...p}>{children}</ul>,
                li: ({ children, ...p }) => <li style={{ display: "flex", gap: 6, marginBottom: 4 }} {...p}><span style={{ color: "var(--accent)", flexShrink: 0 }}>›</span><span>{children}</span></li>,
                h1: ({ children, ...p }) => <h1 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 6, marginTop: 10 }} {...p}>{children}</h1>,
                h2: ({ children, ...p }) => <h2 style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 5, marginTop: 8, textTransform: "uppercase", letterSpacing: ".04em" }} {...p}>{children}</h2>,
                h3: ({ children, ...p }) => <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 4, marginTop: 6 }} {...p}>{children}</h3>,
                code: ({ children, ...p }) => <code style={{ background: "var(--accent-bg)", color: "var(--accent)", padding: "1px 5px", borderRadius: 3, fontSize: 11 }} {...p}>{children}</code>,
              }}>
                {output}
              </ReactMarkdown>
            ) : isLoading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-3)", padding: "8px 0" }}>
                <span style={{ display: "inline-block", width: 2, height: 12, background: "var(--accent)", animation: "ai-caret 1s infinite" }}/>
                <span style={{ fontSize: 11 }}>Generating…</span>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 10 }}>
                  {isLoggedIn ? "Ask anything about interviews, jobs, or career advice:" : "Sign in to use AI coaching:"}
                </div>
                {isLoggedIn && QUICK_PROMPTS.map(p => (
                  <button key={p} onClick={() => handleSend(p)}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 10px", marginBottom: 5, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11, color: "var(--text-2)", cursor: "pointer", fontFamily: "inherit", transition: "all .1s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            {isLoading && output && (
              <span style={{ display: "inline-block", width: 2, height: 12, background: "var(--accent)", marginLeft: 2, animation: "ai-caret 1s infinite", verticalAlign: "middle" }}/>
            )}
          </div>

          {/* Input */}
          {isLoggedIn && !limitHit && (
            <div style={{ padding: "8px 10px", borderTop: "1px solid var(--border)", display: "flex", gap: 6, background: "var(--bg-subtle)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask a question…"
                disabled={isLoading}
                style={{
                  flex: 1, border: "1px solid var(--border-strong)", borderRadius: 6, padding: "7px 10px",
                  fontSize: 12, color: "var(--text-1)", background: "var(--bg-surface)", outline: "none",
                  fontFamily: "Inter, sans-serif", transition: "border-color .1s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
              />
              {isLoading ? (
                <button onClick={stop} style={{ width: 32, height: 32, borderRadius: 6, background: "var(--red-bg)", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <StopIcon />
                </button>
              ) : (
                <button onClick={() => handleSend()} disabled={!input.trim()} style={{ width: 32, height: 32, borderRadius: 6, background: "var(--accent)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: input.trim() ? 1 : 0.4 }}>
                  <SendIcon />
                </button>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <div style={{ padding: "8px 10px", borderTop: "1px solid var(--border)", background: "var(--bg-subtle)", display: "flex", gap: 6 }}>
              <button onClick={() => navigate("/login")} style={{ flex: 1, padding: "7px", background: "var(--accent)", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Sign in to chat
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── FLOATING BUTTON ── */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseDown={!open ? onMouseDown : undefined}
        onTouchStart={!open ? onTouchStart : undefined}
        title="Axon AI Coach"
        style={{
          width: 52, height: 52,
          borderRadius: "50%",
          background: open
            ? "var(--bg-surface)"
            : "linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)",
          border: open ? "2px solid var(--border-strong)" : "none",
          color: open ? "var(--text-1)" : "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: open
            ? "var(--shadow)"
            : "0 4px 20px rgba(0,87,184,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          transition: "transform .15s, box-shadow .15s",
          position: "relative",
          flexShrink: 0,
        }}
        onMouseEnter={e => { if (!dragging) e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open ? <CloseIcon /> : <BotIcon />}

        {/* Usage badge — shows remaining count */}
        {!open && remaining !== null && remaining <= 2 && (
          <span style={{
            position: "absolute", top: -2, right: -2,
            width: 18, height: 18, borderRadius: "50%",
            background: remaining === 0 ? "var(--red)" : "var(--orange)",
            color: "white",
            fontSize: 9, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--bg-page)",
          }}>
            {remaining}
          </span>
        )}
      </button>

      <style>{`
        @keyframes ai-caret { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

const iconBtn = {
  width: 24, height: 24, borderRadius: 5,
  background: "rgba(255,255,255,0.15)",
  border: "none", color: "white",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "background .1s", padding: 0,
};
