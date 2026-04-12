import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../api/config";
import ReactMarkdown from "react-markdown";

const BotIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <path d="M12 11V7"/>
    <circle cx="12" cy="5" r="2"/>
    <line x1="8" y1="15" x2="8" y2="15" strokeWidth="3" strokeLinecap="round"/>
    <line x1="16" y1="15" x2="16" y2="15" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);
const X = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const StopIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
  </svg>
);
const ExpandIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
  </svg>
);

const QUICK = [
  "Interview tips for React Developer",
  "How to answer behavioral questions",
  "Salary negotiation scripts",
  "How to explain a career gap",
];

export default function FloatingAIBot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, token } = useAuth();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);
  const abortRef = useRef(null);
  const outRef = useRef(null);
  const inputRef = useRef(null);

  // Don't show on the AI Bot page
  if (location.pathname === "/ai-bot") return null;

  // Auto-scroll
  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [output]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // Mouse drag
  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    const r = widgetRef.current?.getBoundingClientRect();
    if (!r) return;
    dragOffset.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    setDragging(true);
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const ww = widgetRef.current?.offsetWidth || 52;
      const wh = widgetRef.current?.offsetHeight || 52;
      setPos({
        x: Math.min(Math.max(e.clientX - dragOffset.current.x, 0), vw - ww),
        y: Math.min(Math.max(e.clientY - dragOffset.current.y, 0), vh - wh),
      });
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging]);

  // Touch drag
  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    const r = widgetRef.current?.getBoundingClientRect();
    if (!r) return;
    dragOffset.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const t = e.touches[0];
      const vw = window.innerWidth, vh = window.innerHeight;
      const ww = widgetRef.current?.offsetWidth || 52;
      const wh = widgetRef.current?.offsetHeight || 52;
      setPos({
        x: Math.min(Math.max(t.clientX - dragOffset.current.x, 0), vw - ww),
        y: Math.min(Math.max(t.clientY - dragOffset.current.y, 0), vh - wh),
      });
    };
    const end = () => setDragging(false);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => { window.removeEventListener("touchmove", move); window.removeEventListener("touchend", end); };
  }, [dragging]);

  const send = async (q) => {
    const query = (q || input).trim();
    if (!query || loading) return;
    if (!isLoggedIn) { navigate("/login"); return; }
    setInput("");
    setOutput("");
    setLoading(true);
    abortRef.current = new AbortController();
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/generate-questions-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ jobTitle: query, mode: "questions" }),
        signal: abortRef.current.signal,
      });
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput(p => p + dec.decode(value, { stream: true }));
      }
    } catch (err) {
      if (err.name !== "AbortError") setOutput(p => p + "\n\n*[Connection error]*");
    } finally {
      setLoading(false);
    }
  };

  const stop = () => { abortRef.current?.abort(); setLoading(false); };

  const defaultPos = { right: "20px", bottom: "20px", left: "auto", top: "auto" };
  const customPos = pos.x !== null
    ? { left: pos.x + "px", top: pos.y + "px", right: "auto", bottom: "auto" }
    : defaultPos;

  return (
    <div ref={widgetRef} style={{ position:"fixed", zIndex:9999, userSelect:"none", ...customPos, cursor: dragging ? "grabbing" : "default" }}>

      {/* Panel */}
      {open && (
        <div
          style={{ position:"absolute", bottom: pos.x !== null ? "auto" : "64px", top: pos.x !== null ? "-380px" : "auto", right: pos.x !== null ? "auto" : "0", left: pos.x !== null ? "0" : "auto", width:320, background:"var(--bg-surface)", border:"1px solid var(--border-strong)", borderRadius:12, boxShadow:"var(--shadow-lg)", display:"flex", flexDirection:"column", overflow:"hidden" }}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
        >
          {/* Header — draggable */}
          <div
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", background:"var(--accent)", cursor:"grab" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:7, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"white" }}>
                <BotIcon />
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"white" }}>Axon AI Coach</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,.7)" }}>Ask anything about your career</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={() => { navigate("/ai-bot"); setOpen(false); }} title="Open full page"
                style={{ width:22, height:22, borderRadius:4, background:"rgba(255,255,255,.15)", border:"none", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ExpandIcon />
              </button>
              <button onClick={() => setOpen(false)}
                style={{ width:22, height:22, borderRadius:4, background:"rgba(255,255,255,.15)", border:"none", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <X />
              </button>
            </div>
          </div>

          {/* Output */}
          <div ref={outRef} style={{ flex:1, minHeight:200, maxHeight:260, overflowY:"auto", padding:"12px 14px", fontSize:12, lineHeight:1.7, color:"var(--text-2)" }}>
            {output ? (
              <ReactMarkdown components={{
                p: ({children,...p}) => <p style={{ marginBottom:8 }} {...p}>{children}</p>,
                strong: ({children,...p}) => <strong style={{ color:"var(--text-1)", fontWeight:700 }} {...p}>{children}</strong>,
                ul: ({children,...p}) => <ul style={{ paddingLeft:0, listStyle:"none", marginBottom:8 }} {...p}>{children}</ul>,
                li: ({children,...p}) => <li style={{ display:"flex", gap:6, marginBottom:4 }} {...p}><span style={{ color:"var(--accent)", flexShrink:0 }}>›</span><span>{children}</span></li>,
                h1: ({children,...p}) => <h1 style={{ fontSize:13, fontWeight:700, color:"var(--text-1)", marginBottom:6, marginTop:10 }} {...p}>{children}</h1>,
                h2: ({children,...p}) => <h2 style={{ fontSize:12, fontWeight:700, color:"var(--accent)", marginBottom:5, marginTop:8, textTransform:"uppercase", letterSpacing:".04em" }} {...p}>{children}</h2>,
                code: ({children,...p}) => <code style={{ background:"var(--accent-bg)", color:"var(--accent)", padding:"1px 5px", borderRadius:3, fontSize:11, fontFamily:"monospace" }} {...p}>{children}</code>,
              }}>{output}</ReactMarkdown>
            ) : loading ? (
              <div style={{ display:"flex", alignItems:"center", gap:8, color:"var(--text-3)", padding:"8px 0" }}>
                <span style={{ width:2, height:12, background:"var(--accent)", display:"inline-block", animation:"ax-caret 1s infinite" }}/>
                <span style={{ fontSize:11 }}>Generating response…</span>
              </div>
            ) : (
              <div>
                <div style={{ fontSize:11, color:"var(--text-3)", marginBottom:10 }}>
                  {isLoggedIn ? "Try a quick prompt or type your question below:" : "Sign in to use AI coaching"}
                </div>
                {isLoggedIn && QUICK.map(q => (
                  <button key={q} onClick={() => send(q)}
                    style={{ display:"block", width:"100%", textAlign:"left", padding:"6px 10px", marginBottom:5, background:"var(--bg-subtle)", border:"1px solid var(--border)", borderRadius:6, fontSize:11, color:"var(--text-2)", cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all .1s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--text-1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-2)"; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {loading && output && <span style={{ display:"inline-block", width:2, height:12, background:"var(--accent)", marginLeft:2, animation:"ax-caret 1s infinite", verticalAlign:"middle" }}/>}
          </div>

          {/* Input */}
          {isLoggedIn ? (
            <div style={{ padding:"8px 10px", borderTop:"1px solid var(--border)", display:"flex", gap:6, background:"var(--bg-subtle)" }}>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask a question…" disabled={loading}
                className="ax-input" style={{ flex:1, fontSize:12, padding:"7px 10px" }}
              />
              {loading ? (
                <button onClick={stop} style={{ width:32, height:32, borderRadius:6, background:"var(--red-bg)", border:"1px solid var(--red)", color:"var(--red)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <StopIcon />
                </button>
              ) : (
                <button onClick={() => send()} disabled={!input.trim()}
                  style={{ width:32, height:32, borderRadius:6, background:"var(--accent)", border:"none", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, opacity: input.trim() ? 1 : 0.4 }}>
                  <SendIcon />
                </button>
              )}
            </div>
          ) : (
            <div style={{ padding:"8px 10px", borderTop:"1px solid var(--border)", background:"var(--bg-subtle)" }}>
              <button onClick={() => navigate("/login")}
                style={{ width:"100%", padding:"8px", background:"var(--accent)", color:"white", border:"none", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                Sign in to use AI Coach
              </button>
            </div>
          )}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseDown={!open ? onMouseDown : undefined}
        onTouchStart={!open ? onTouchStart : undefined}
        title="Axon AI Coach"
        style={{ width:52, height:52, borderRadius:"50%", background: open ? "var(--bg-surface)" : "var(--accent)", border: open ? "2px solid var(--border-strong)" : "none", color: open ? "var(--text-1)" : "white", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow: open ? "var(--shadow)" : "0 4px 16px rgba(0,87,184,.3)", transition:"transform .15s, box-shadow .15s", flexShrink:0 }}
        onMouseEnter={e => { if (!dragging) e.currentTarget.style.transform = "scale(1.06)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open ? <X /> : <BotIcon />}
      </button>
    </div>
  );
}
