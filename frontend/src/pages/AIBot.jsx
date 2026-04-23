
//new one //
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import { API_BASE_URL } from "../api/config";
import {
  Bot, Terminal, Zap, Code, FileText,
  Play, StopCircle, Sparkles, Copy, Check, CheckCircle2
} from "lucide-react";

function AIBot() {
  const { token } = useAuth();

  // ── ALL ORIGINAL STATE — untouched ──
  const [jobTitle, setJobTitle] = useState("");
  const [contentType, setContentType] = useState("questions");
  const [deliveryMode, setDeliveryMode] = useState("stream");
  const [isLoading, setIsLoading] = useState(false);
  const [streamOutput, setStreamOutput] = useState("");
  const [jsonOutput, setJsonOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  const abortControllerRef = useRef(null);
  const endOfContentRef = useRef(null);

  // ── ALL ORIGINAL HANDLERS — untouched ──
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;
    setIsLoading(true);
    setStreamOutput("");
    setJsonOutput(null);
    setCopied(false);

    if (deliveryMode === "stream") {
      abortControllerRef.current = new AbortController();
      try {
        const response = await fetch(`${API_BASE_URL}/api/ai/generate-questions-stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ jobTitle, mode: contentType }),
          signal: abortControllerRef.current.signal,
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setStreamOutput((prev) => prev + decoder.decode(value, { stream: true }));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setStreamOutput((prev) => prev + "\n\n**[System Error: Connection Interrupted]**");
        }
      } finally { setIsLoading(false); }
    } else {
      try {
        const res = await axiosInstance.post("/ai/generate-questions", { jobTitle, mode: contentType });
        let data = res.data.data;
        if (contentType === "solver" && Array.isArray(data)) data = data[0];
        setJsonOutput(data);
      } catch (err) {
        console.error(err);
        alert("Failed to generate content.");
      } finally { setIsLoading(false); }
    }
  };

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  const handleCopy = () => {
    const text = deliveryMode === "stream" ? streamOutput : JSON.stringify(jsonOutput, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    endOfContentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamOutput, jsonOutput]);

  const hasOutput = (deliveryMode === "stream" && (streamOutput || isLoading)) ||
                    (deliveryMode === "normal" && jsonOutput);

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg-page)", fontFamily:"Inter,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @keyframes ai-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes ai-spin  { to{transform:rotate(360deg)} }
        @keyframes ai-in    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes ai-bar   { 0%{width:0%} 60%{width:85%} 100%{width:100%} }
        @keyframes ai-caret { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ai-float {
          0%,100%{transform:translateY(0px) rotate(0deg)}
          33%{transform:translateY(-8px) rotate(1deg)}
          66%{transform:translateY(-4px) rotate(-1deg)}
        }

        .ai-card { transition: border-color .2s, box-shadow .2s; }
        .ai-card:hover { border-color: var(--accent-mid) !important; box-shadow: 0 4px 24px rgba(0,87,184,.08) !important; }

        .ai-seg-btn { transition: all .15s; }
        .ai-tab:hover:not(.active) { background: var(--bg-subtle) !important; color: var(--text-2) !important; }

        .ai-submit:not(:disabled):hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,87,184,.3) !important;
        }
        .ai-submit:disabled { opacity: .45; cursor: not-allowed; }

        .ai-q-card { transition: all .2s; }
        .ai-q-card:hover { border-color: var(--accent-mid) !important; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,87,184,.08) !important; }

        /* particle dots */
        .ai-dot { position:absolute; border-radius:50%; animation: ai-float linear infinite; }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div style={{ position:"relative", overflow:"hidden", background:"var(--bg-surface)", borderBottom:"1px solid var(--border)", padding:"48px 24px 40px" }}>
        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"var(--accent)", opacity:.05, filter:"blur(60px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:20, right:-40, width:160, height:160, borderRadius:"50%", background:"#7c3aed", opacity:.06, filter:"blur(50px)", pointerEvents:"none" }}/>

        {/* floating particles */}
        {[
          {s:4,x:"15%",y:"20%",dur:"4s",c:"var(--accent)"},
          {s:3,x:"82%",y:"60%",dur:"5.5s",c:"#7c3aed"},
          {s:5,x:"60%",y:"15%",dur:"3.5s",c:"var(--accent)"},
          {s:3,x:"92%",y:"25%",dur:"6s",c:"#059669"},
          {s:4,x:"5%",y:"70%",dur:"4.5s",c:"#7c3aed"},
        ].map((p,i)=>(
          <div key={i} className="ai-dot" style={{ width:p.s, height:p.s, left:p.x, top:p.y, background:p.c, opacity:.35, animationDuration:p.dur, animationDelay:`${i*0.7}s` }}/>
        ))}

        <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative" }}>
          {/* badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:20, border:"1px solid var(--accent-mid)", background:"var(--accent-bg)", marginBottom:20 }}>
            <svg width="11" height="11" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>
            <span style={{ fontSize:10, fontWeight:700, color:"var(--accent)", letterSpacing:".07em", textTransform:"uppercase" }}>AI-Powered Architect v2.0</span>
          </div>

          <h1 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, letterSpacing:"-0.04em", color:"var(--text-1)", lineHeight:1.1, marginBottom:12 }}>
            Axon{" "}
            <span style={{ position:"relative", display:"inline-block" }}>
              <span style={{ color:"var(--accent)" }}>Intelligence</span>
              {/* underline bar */}
              <span style={{ position:"absolute", bottom:-4, left:0, right:0, height:3, borderRadius:2, background:"linear-gradient(90deg,var(--accent),#7c3aed)", opacity:.6 }}/>
            </span>
          </h1>
          <p style={{ fontSize:14, color:"var(--text-3)", lineHeight:1.7, maxWidth:440, margin:"0 auto" }}>
            Generate interview protocols or solve complex engineering challenges — powered by Axon AI.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth:760, margin:"0 auto", padding:"32px 20px 48px" }}>

        {/* ── COMMAND CARD ── */}
        <div className="ai-card" style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:14, overflow:"hidden", marginBottom:20 }}>

          {/* input row */}
          <div style={{ padding:"16px 16px 0" }}>
            <div style={{ display:"flex", background:"var(--bg-subtle)", border:"1.5px solid var(--border-strong)", borderRadius:9, overflow:"hidden", transition:"border-color .15s" }}
              onFocusCapture={e=>e.currentTarget.style.borderColor="var(--accent)"}
              onBlurCapture={e=>e.currentTarget.style.borderColor="var(--border-strong)"}
            >
              <div style={{ display:"flex", alignItems:"center", paddingLeft:14, color:"var(--text-3)" }}>
                <Bot size={18}/>
              </div>
              <input
                type="text"
                value={jobTitle}
                onChange={e=>setJobTitle(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter") handleGenerate(e); }}
                placeholder="e.g. 'Senior React Dev' or 'Solve 10+10'…"
                style={{ flex:1, background:"transparent", border:"none", outline:"none", padding:"13px 12px", fontSize:14, color:"var(--text-1)", fontFamily:"Inter,sans-serif" }}
              />
              <div style={{ padding:6 }}>
                {!isLoading ? (
                  <button className="ai-submit" onClick={handleGenerate} disabled={!jobTitle.trim()}
                    style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", background:"var(--accent)", color:"white", border:"none", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all .15s" }}>
                    <Play size={13} fill="white" stroke="none"/> Initialize
                  </button>
                ) : (
                  <button onClick={stopGeneration}
                    style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", background:"rgba(239,68,68,.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,.3)", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    <StopCircle size={13}/> Abort
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* settings row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:16 }}>

            {/* Protocol */}
            <div>
              <div style={{ fontSize:9, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Protocol</div>
              <div style={{ display:"flex", background:"var(--bg-subtle)", borderRadius:7, padding:3, border:"1px solid var(--border)" }}>
                {[
                  {val:"questions", label:"Interview", icon:<FileText size={12}/>},
                  {val:"solver",    label:"Solver",    icon:<Code size={12}/>},
                ].map(opt=>{
                  const active = contentType===opt.val;
                  return (
                    <button key={opt.val} className="ai-tab" onClick={()=>setContentType(opt.val)}
                      style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"7px 10px", borderRadius:5, border:"none", background:active?"var(--bg-surface)":"transparent", color:active?"var(--text-1)":"var(--text-3)", fontSize:11, fontWeight:active?700:500, cursor:"pointer", fontFamily:"inherit", boxShadow:active?"0 1px 4px rgba(0,0,0,.08)":"none", transition:"all .15s" }}>
                      <span style={{ color:active?"var(--accent)":"var(--text-3)" }}>{opt.icon}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <div style={{ fontSize:9, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Transmission</div>
              <div style={{ display:"flex", background:"var(--bg-subtle)", borderRadius:7, padding:3, border:"1px solid var(--border)" }}>
                {[
                  {val:"stream", label:"Stream",   icon:<Terminal size={12}/>, activeColor:"#059669"},
                  {val:"normal", label:"Standard",  icon:<Zap size={12}/>,      activeColor:"var(--accent)"},
                ].map(opt=>{
                  const active = deliveryMode===opt.val;
                  return (
                    <button key={opt.val} className="ai-tab" onClick={()=>setDeliveryMode(opt.val)}
                      style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"7px 10px", borderRadius:5, border:"none", background:active?"var(--bg-surface)":"transparent", color:active?opt.activeColor:"var(--text-3)", fontSize:11, fontWeight:active?700:500, cursor:"pointer", fontFamily:"inherit", boxShadow:active?"0 1px 4px rgba(0,0,0,.08)":"none", transition:"all .15s" }}>
                      {opt.icon}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* loading progress bar */}
          {isLoading && (
            <div style={{ height:2, background:"var(--border)", overflow:"hidden" }}>
              <div style={{ height:"100%", background:"linear-gradient(90deg,var(--accent),#7c3aed)", animation:"ai-bar 2.5s ease-out forwards" }}/>
            </div>
          )}
        </div>

        {/* ── STREAM OUTPUT ── */}
        {deliveryMode === "stream" && (streamOutput || isLoading) && (
          <div style={{ animation:"ai-in .3s ease-out" }}>
            {/* output header bar */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#059669", animation:isLoading?"ai-pulse 1.2s infinite":"none", display:"inline-block" }}/>
                <span style={{ fontSize:10, fontWeight:700, color:"#059669", fontFamily:"monospace", letterSpacing:".06em" }}>
                  {isLoading?"LIVE UPLINK · ESTABLISHED":"OUTPUT · COMPLETE"}
                </span>
              </div>
              <button onClick={handleCopy}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:5, border:"1px solid var(--border)", background:"var(--bg-surface)", color:copied?"#059669":"var(--text-3)", fontSize:10, fontWeight:600, cursor:"pointer", fontFamily:"monospace", transition:"all .15s" }}>
                {copied ? <><Check size={11}/> Copied</> : <><Copy size={11}/> Copy log</>}
              </button>
            </div>

            {/* terminal box */}
            <div style={{ background:"var(--bg-subtle)", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden" }}>
              {/* terminal title bar */}
              <div style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#ef4444", opacity:.7 }}/>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#f59e0b", opacity:.7 }}/>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#22c55e", opacity:.7 }}/>
                <span style={{ marginLeft:6, fontSize:10, color:"var(--text-3)", fontFamily:"monospace" }}>axon-stream · output</span>
              </div>

              <div style={{ padding:"20px 22px", fontFamily:"monospace", fontSize:13, lineHeight:1.8, color:"var(--text-1)", minHeight:320 }}>
                <ReactMarkdown components={{
                  code({inline, children, ...props}) {
                    return !inline ? (
                      <div style={{ margin:"14px 0", borderRadius:7, overflow:"hidden", border:"1px solid var(--border)" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 12px", background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                          <span style={{ fontSize:9, fontWeight:700, color:"var(--accent)", textTransform:"uppercase", letterSpacing:".06em" }}>code</span>
                          <span style={{ fontSize:9, color:"var(--text-3)", fontFamily:"monospace" }}>copy</span>
                        </div>
                        <code style={{ display:"block", padding:"14px 16px", overflowX:"auto", color:"var(--accent)", background:"var(--bg-page)", fontSize:12 }} {...props}>{children}</code>
                      </div>
                    ) : (
                      <code style={{ background:"var(--accent-bg)", color:"var(--accent)", padding:"1px 6px", borderRadius:3, fontSize:12 }} {...props}>{children}</code>
                    );
                  },
                  h1: ({children,...p})=><h1 style={{ fontSize:20, fontWeight:800, color:"var(--text-1)", marginTop:24, marginBottom:12, paddingBottom:8, borderBottom:"1px solid var(--border)", fontFamily:"inherit" }} {...p}>{children}</h1>,
                  h2: ({children,...p})=><h2 style={{ fontSize:15, fontWeight:700, color:"var(--accent)", marginTop:18, marginBottom:8, textTransform:"uppercase", letterSpacing:".05em", fontFamily:"inherit" }} {...p}>{children}</h2>,
                  h3: ({children,...p})=><h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-1)", marginTop:14, marginBottom:6, fontFamily:"inherit" }} {...p}>{children}</h3>,
                  p:  ({children,...p})=><p style={{ marginBottom:12, color:"var(--text-2)", fontFamily:"inherit" }} {...p}>{children}</p>,
                  ul: ({children,...p})=><ul style={{ marginBottom:12, paddingLeft:0, listStyle:"none" }} {...p}>{children}</ul>,
                  li: ({children,...p})=><li style={{ display:"flex", gap:8, marginBottom:4, color:"var(--text-2)" }} {...p}><span style={{ color:"var(--accent)", flexShrink:0, marginTop:1 }}>›</span><span>{children}</span></li>,
                  strong: ({children,...p})=><strong style={{ color:"var(--text-1)", fontWeight:700, background:"var(--accent-bg)", padding:"0 4px", borderRadius:2 }} {...p}>{children}</strong>,
                }}>{streamOutput}</ReactMarkdown>
                {isLoading && (
                  <span style={{ display:"inline-block", width:2, height:14, background:"var(--accent)", marginLeft:2, animation:"ai-caret 1s infinite", verticalAlign:"middle" }}/>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STANDARD OUTPUT ── */}
        {deliveryMode === "normal" && jsonOutput && (
          <div style={{ animation:"ai-in .3s ease-out" }}>

            {/* Questions grid */}
            {contentType === "questions" && Array.isArray(jsonOutput) && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {jsonOutput.map((q, idx) => (
                  <div key={idx} className="ai-q-card" style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                      <div style={{ width:28, height:28, borderRadius:6, background:"var(--accent-bg)", border:"1px solid var(--accent-mid)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"var(--accent)", flexShrink:0, fontFamily:"monospace" }}>{idx+1}</div>
                      <span style={{ fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:3, textTransform:"uppercase", letterSpacing:".06em", background:q.type==="Technical"?"rgba(37,99,235,.1)":"rgba(124,58,237,.1)", color:q.type==="Technical"?"#2563eb":"#7c3aed", border:`1px solid ${q.type==="Technical"?"rgba(37,99,235,.25)":"rgba(124,58,237,.25)"}`, marginTop:5 }}>{q.type}</span>
                    </div>
                    <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text-1)", marginBottom:14, lineHeight:1.5 }}>{q.question}</h3>
                    <div style={{ background:"var(--bg-subtle)", borderRadius:8, padding:"13px 15px", border:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:10 }}>
                      <div>
                        <div style={{ fontSize:9, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>Intent</div>
                        <p style={{ fontSize:12, color:"var(--text-2)", lineHeight:1.65, margin:0 }}>{q.intent}</p>
                      </div>
                      <div style={{ borderTop:"1px solid var(--border)", paddingTop:10 }}>
                        <div style={{ fontSize:9, fontWeight:700, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:5 }}>Model Answer</div>
                        <p style={{ fontSize:12, color:"var(--text-1)", lineHeight:1.65, margin:0 }}>{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Solver output */}
            {contentType === "solver" && jsonOutput && (
              <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
                {/* solver header */}
                <div style={{ padding:"24px 24px 20px", borderBottom:"1px solid var(--border)", background:"var(--bg-subtle)" }}>
                  <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text-1)", marginBottom:8, letterSpacing:"-0.02em" }}>{jsonOutput.title||"Solver Output"}</h2>
                  <p style={{ fontSize:13, color:"var(--text-2)", lineHeight:1.7, margin:0 }}>{jsonOutput.whyItMatters}</p>
                </div>

                <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:20 }}>
                  {/* Challenge */}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <div style={{ width:24, height:24, borderRadius:5, background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Zap size={12} color="#f59e0b"/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--text-1)" }}>The Challenge</span>
                    </div>
                    <p style={{ fontSize:13, color:"var(--text-2)", lineHeight:1.72, paddingLeft:32, borderLeft:"2px solid var(--border)", margin:0 }}>{jsonOutput.challenge}</p>
                  </div>

                  {/* Approach */}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <div style={{ width:24, height:24, borderRadius:5, background:"rgba(5,150,105,.1)", border:"1px solid rgba(5,150,105,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <CheckCircle2 size={12} color="#059669"/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--text-1)" }}>Strategic Approach</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                      {jsonOutput.approach?.map((step, i) => (
                        <div key={i} style={{ display:"flex", gap:10, padding:"10px 13px", borderRadius:7, background:"var(--bg-subtle)", border:"1px solid var(--border)" }}>
                          <span style={{ fontSize:10, fontWeight:700, color:"var(--accent)", fontFamily:"monospace", flexShrink:0, paddingTop:1 }}>0{i+1}</span>
                          <span style={{ fontSize:12, color:"var(--text-1)", lineHeight:1.6 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation */}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <div style={{ width:24, height:24, borderRadius:5, background:"rgba(236,72,153,.1)", border:"1px solid rgba(236,72,153,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Code size={12} color="#ec4899"/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--text-1)" }}>Implementation</span>
                    </div>
                    <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid var(--border)" }}>
                      <div style={{ display:"flex", gap:6, padding:"8px 13px", background:"var(--bg-surface)", borderBottom:"1px solid var(--border)" }}>
                        {["#ef4444","#f59e0b","#22c55e"].map((c,i)=><div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c, opacity:.7 }}/>)}
                        <span style={{ marginLeft:6, fontSize:9, color:"var(--text-3)", fontFamily:"monospace" }}>solution.js</span>
                      </div>
                      <div style={{ padding:"16px 18px", background:"var(--bg-page)", fontFamily:"monospace", fontSize:12 }}>
                        <ReactMarkdown>{`\`\`\`javascript\n${jsonOutput.codeSolution}\n\`\`\``}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div ref={endOfContentRef}/>
      </div>
    </div>
  );
}

export default AIBot;