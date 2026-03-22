
// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../api/axiosInstance";
// import ReactMarkdown from "react-markdown";
// import { API_BASE_URL } from "../api/config"; 
// import { 
//   Bot, Terminal, Zap, Code, FileText, 
//   Play, StopCircle, Sparkles, Copy, Check, CheckCircle2 // 👈 Added this
// } from "lucide-react";
// function AIBot() {
//   const { token } = useAuth();
  
//   // --- STATE ---
//   const [jobTitle, setJobTitle] = useState("");
//   const [contentType, setContentType] = useState("questions"); 
//   const [deliveryMode, setDeliveryMode] = useState("stream"); 
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [streamOutput, setStreamOutput] = useState(""); 
//   const [jsonOutput, setJsonOutput] = useState(null);   
//   const [copied, setCopied] = useState(false);

//   const abortControllerRef = useRef(null);
//   // Ref for auto-scrolling
//   const endOfContentRef = useRef(null);

//   // --- HANDLER ---
//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     if (!jobTitle.trim()) return;

//     setIsLoading(true);
//     setStreamOutput("");
//     setJsonOutput(null);
//     setCopied(false);

//     // 1️⃣ STREAMING MODE
//     if (deliveryMode === "stream") {
//       abortControllerRef.current = new AbortController();
//       try {
//         // const response = await fetch("http://localhost:5000/api/ai/generate-questions-stream", {
// // Corrected code
//     const response = await fetch(`${API_BASE_URL}/api/ai/generate-questions-stream`, {

//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           },
//           body: JSON.stringify({ jobTitle, mode: contentType }),
//           signal: abortControllerRef.current.signal,
//         });

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           const text = decoder.decode(value, { stream: true });
//           setStreamOutput((prev) => prev + text);
//         }
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           console.error("Stream Error:", err);
//           setStreamOutput((prev) => prev + "\n\n**[System Error: Connection Interrupted]**");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     } 
    
//     // 2️⃣ STANDARD MODE
//     else {
//       try {
//         const res = await axiosInstance.post("/ai/generate-questions", {
//           jobTitle,
//           mode: contentType
//         });
        
//         // 🔥 FRONTEND SAFETY: If Solver returns an array, fix it.
//         let data = res.data.data;
//         if (contentType === "solver" && Array.isArray(data)) {
//             data = data[0];
//         }
//         setJsonOutput(data);
        
//       } catch (err) {
//         console.error("Standard Generation Error:", err);
//         alert("Failed to generate content.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const stopGeneration = () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//       setIsLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     const textToCopy = deliveryMode === "stream" ? streamOutput : JSON.stringify(jsonOutput, null, 2);
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Auto-scroll the WINDOW, not the div
//   useEffect(() => {
//     if (endOfContentRef.current) {
//       endOfContentRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [streamOutput, jsonOutput]);

//   return (
//     <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
//       {/* 🌌 Background Ambience */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-12 space-y-10">
        
//         {/* ⚡ HEADER */}
//         <div className="text-center space-y-3">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider mb-2">
//             <Sparkles size={12} /> AI-POWERED ARCHITECT V2.0
//           </div>
//           <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
//             Axon <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Intelligence</span>
//           </h1>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
//             Generate interview protocols or solve complex engineering challenges.
//           </p>
//         </div>

//         {/* 🎛️ COMMAND CENTER */}
//         <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl">
//           <div className="bg-[#0b1121]/80 rounded-[20px] p-6 md:p-8 border border-white/5 space-y-8">
            
//             {/* INPUT ROW */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
//               <div className="relative flex items-center bg-[#020617] rounded-xl border border-slate-700 overflow-hidden">
//                 <div className="pl-6 text-slate-500">
//                   <Bot size={24} />
//                 </div>
//                 <input
//                   type="text"
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="Ask anything... e.g., 'Senior React Dev' or 'Solve 10+10'"
//                   className="w-full bg-transparent text-white text-lg px-6 py-5 outline-none placeholder-slate-600 font-medium"
//                 />
//                 <div className="pr-2">
//                   {!isLoading ? (
//                     <button onClick={handleGenerate} className="bg-white text-black hover:bg-indigo-50 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
//                       <Play size={18} fill="black" /> <span className="hidden md:inline">Initialize</span>
//                     </button>
//                   ) : (
//                     <button onClick={stopGeneration} className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 border border-rose-500/50">
//                       <StopCircle size={18} /> <span className="hidden md:inline">Abort</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* SETTINGS ROW */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div className="space-y-3">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Protocol</label>
//                 <div className="flex bg-[#020617] p-1.5 rounded-xl border border-slate-800">
//                   <button onClick={() => setContentType("questions")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${contentType === 'questions' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
//                     <FileText size={16} /> Interview
//                   </button>
//                   <button onClick={() => setContentType("solver")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${contentType === 'solver' ? 'bg-slate-800 text-indigo-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
//                     <Code size={16} /> Solver
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Transmission</label>
//                 <div className="flex bg-[#020617] p-1.5 rounded-xl border border-slate-800">
//                   <button onClick={() => setDeliveryMode("stream")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${deliveryMode === 'stream' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/50' : 'text-slate-500 hover:text-slate-300'}`}>
//                     <Terminal size={16} /> Stream
//                   </button>
//                   <button onClick={() => setDeliveryMode("normal")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${deliveryMode === 'normal' ? 'bg-indigo-950/30 text-indigo-400 border border-indigo-900/50' : 'text-slate-500 hover:text-slate-300'}`}>
//                     <Zap size={16} /> Standard
//                   </button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ================= OUTPUT VISUALIZER ================= */}

//         {/* MODE 1: THE TERMINAL (Streaming) */}
//         {deliveryMode === "stream" && (streamOutput || isLoading) && (
//           <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
//             <div className="flex justify-between items-end mb-3 px-2">
//               <span className="text-xs font-mono text-emerald-500 flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                 LIVE_UPLINK :: ESTABLISHED
//               </span>
//               <button onClick={handleCopy} className="text-xs font-mono text-slate-500 hover:text-white transition-colors flex items-center gap-2">
//                 {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} 
//                 {copied ? "COPIED" : "COPY LOG"}
//               </button>
//             </div>
            
//             {/* 🔥 SCROLL FIX: Removed max-h, added min-h. It will grow naturally. */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-20"></div>
//               <div className="relative bg-black rounded-2xl border border-emerald-900/30 p-8 min-h-[400px] font-mono text-sm md:text-base leading-relaxed text-emerald-50/90 shadow-2xl">
//                 <ReactMarkdown
//                   components={{
//                     code({inline, children, ...props}) {
//                       return !inline ? (
//                         <div className="my-6 rounded-lg overflow-hidden border border-emerald-900/50 bg-[#05110b]">
//                           <div className="bg-[#022c22] px-4 py-1.5 text-[10px] uppercase text-emerald-500 font-bold border-b border-emerald-900/50 flex justify-between tracking-wider">
//                             <span>Codeblock</span><span>Copy</span>
//                           </div>
//                           <code className="block p-4 overflow-x-auto text-emerald-200" {...props}>{children}</code>
//                         </div>
//                       ) : (
//                         <code className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded text-sm" {...props}>{children}</code>
//                       );
//                     },
//                     h1: (props) => <h1 className="text-2xl font-black text-white mt-8 mb-6 pb-4 border-b border-emerald-900/30 tracking-tight" {...props} />,
//                     h2: (props) => <h2 className="text-xl font-bold text-emerald-400 mt-8 mb-4 uppercase tracking-wider" {...props} />,
//                     h3: (props) => <h3 className="text-lg font-bold text-white mt-6 mb-3" {...props} />,
//                     p: (props) => <p className="mb-6 opacity-90" {...props} />,
//                     ul: (props) => <ul className="space-y-3 mb-6" {...props} />,
//                     li: (props) => <li className="flex gap-3" {...props}><span className="text-emerald-500 select-none">›</span><span>{props.children}</span></li>,
//                     strong: (props) => <strong className="text-white font-bold bg-emerald-900/20 px-1 rounded" {...props} />
//                   }}
//                 >
//                   {streamOutput}
//                 </ReactMarkdown>
                
//                 {isLoading && <div className="mt-4 flex gap-1"><span className="w-1.5 h-4 bg-emerald-500 animate-pulse"></span></div>}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MODE 2: THE CARDS (Standard) */}
//         {deliveryMode === "normal" && jsonOutput && (
//           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            
//             {/* Content Type: Questions Grid */}
//             {contentType === "questions" && Array.isArray(jsonOutput) && (
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                 {jsonOutput.map((q, idx) => (
//                   <div key={idx} className="bg-[#0b1121] rounded-2xl border border-slate-800 p-8 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group">
//                     <div className="flex items-start gap-4 mb-4">
//                       <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-slate-400 font-mono text-sm border border-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner">{idx + 1}</span>
//                       <div><span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${q.type === 'Technical' ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-purple-950 text-purple-400 border border-purple-900'}`}>{q.type}</span></div>
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-6 leading-snug">{q.question}</h3>
//                     <div className="bg-[#020617] rounded-xl p-5 border border-slate-800 space-y-4">
//                       <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Intent</p><p className="text-slate-400 text-sm leading-relaxed">{q.intent}</p></div>
//                       <div className="pt-4 border-t border-slate-800"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Model Answer</p><p className="text-slate-300 text-sm leading-relaxed">{q.answer}</p></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Content Type: Solver View */}
//             {/* 🔥 FIX: Now handles both Object and Array correctly. No more white page. */}
//             {contentType === "solver" && jsonOutput && (
//               <div className="bg-[#0b1121] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
//                 <div className="bg-[#1e293b]/20 p-8 md:p-10 border-b border-slate-800">
//                   <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{jsonOutput.title || "Solver Output"}</h2>
//                   <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">{jsonOutput.whyItMatters}</p>
//                 </div>
//                 <div className="p-8 md:p-10 space-y-12">
//                   <section>
//                     <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4"><span className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500"><Zap size={20} /></span>The Challenge</h3>
//                     <p className="text-slate-300 text-lg leading-relaxed pl-12 border-l-2 border-slate-800">{jsonOutput.challenge}</p>
//                   </section>
//                   <section>
//                     <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6"><span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><CheckCircle2 size={20} /></span>Strategic Approach</h3>
//                     <div className="grid gap-4 pl-2">
//                       {jsonOutput.approach?.map((step, i) => (
//                         <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#020617] border border-slate-800">
//                           <span className="text-indigo-500 font-mono font-bold pt-1">0{i+1}</span><span className="text-slate-300">{step}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>
//                   {/* <section>
//                     <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6"><span className="p-2 rounded-lg bg-pink-500/10 text-pink-500"><Code size={20} /></span>Implementation</h3>
//                     <div className="bg-[#020617] rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
//                       <div className="flex gap-2 px-4 py-3 bg-[#0f172a] border-b border-slate-800">
//                         <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
//                         <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                         <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                       </div>
//                       <pre className="p-6 overflow-x-auto text-sm font-mono text-indigo-100/90 leading-loose">{jsonOutput.codeSolution}</pre>
//                     </div>
//                   </section> */}

//                   <section>
//   <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
//     <span className="p-2 rounded-lg bg-pink-500/10 text-pink-500"><Code size={20} /></span>
//     Implementation
//   </h3>
//   <div className="bg-[#020617] rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
//     {/* Terminal Header */}
//     <div className="flex gap-2 px-4 py-3 bg-[#0f172a] border-b border-slate-800">
//       <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
//       <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//       <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//     </div>
//     {/* Using ReactMarkdown to make it look "Very Good" and grow naturally */}
//     <div className="p-6 text-sm font-mono text-indigo-100/90">
//       <ReactMarkdown>
//         {`\`\`\`javascript\n${jsonOutput.codeSolution}\n\`\`\``}
//       </ReactMarkdown>
//     </div>
//   </div>
// </section>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Dummy div to scroll to */}
//         <div ref={endOfContentRef}></div>

//       </div>
//     </div>
//   );
// }

// export default AIBot;


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