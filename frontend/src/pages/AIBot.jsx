// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// // --- ICONS ---
// const SparklesIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
// );
// const CopyIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
// );
// const ArrowDownIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
// );

// function AIBot() {
//   // --- State Management ---
//   const [jobTitle, setJobTitle] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [questions, setQuestions] = useState([]); // Changed from aiResponse to questions (Array)
//   const [error, setError] = useState("");

//   // --- Handlers ---
//   const handleGenerate = async (e) => {
//     e.preventDefault();
    
//     setIsLoading(true);
//     setQuestions([]); // Clear previous results
//     setError("");

//     try {
//       // API Call
//       const res = await axiosInstance.post("/ai/generate-questions", {
//         jobTitle,
//       });

//       // The backend now returns an Array of Objects.
//       // We must check if it's an array or text before setting state.
//       const data = res.data.questions;
      
//       if (Array.isArray(data)) {
//         setQuestions(data);
//       } else if (typeof data === 'string') {
//         // Fallback if backend sends text (old version)
//         setError("Received unstructured text. Please check backend logic.");
//       }
      
//     } catch (err) {
//       console.error("AI Generation Error:", err);
//       setError(err.response?.data?.message || "Failed to generate interview questions. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyToClipboard = () => {
//     // Convert the objects back to a readable string for copying
//     const textToCopy = questions.map((q, i) => 
//       `Q${i+1}: ${q.question}\nAnswer: ${q.answer}`
//     ).join("\n\n");
    
//     navigator.clipboard.writeText(textToCopy);
//     alert("Interview questions copied to clipboard!");
//   };

//   // --- UI Render ---
//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-200 p-8 pt-24">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Header Section */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
//              Axon Interview Intelligence
//           </h1>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             Generate role-specific technical screening questions calibrated to industry standards.
//           </p>
//         </div>

//         {/* Input Card */}
//         <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20 border border-slate-200 mb-12">
//           <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-6 items-end">
//             <div className="flex-grow w-full">
//               <label htmlFor="jobTitle" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
//                 Target Role
//               </label>
//               <input
//                 id="jobTitle"
//                 type="text"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//                 placeholder="e.g. Senior Backend Engineer"
//                 required
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-500/30
//                 ${isLoading 
//                   ? "bg-slate-400 cursor-not-allowed" 
//                   : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95"
//                 }`}
//             >
//               {isLoading ? "Processing..." : <><SparklesIcon /> Generate</>}
//             </button>
//           </form>
//           {error && (
//             <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
//               ⚠️ {error}
//             </div>
//           )}
//         </div>

//         {/* --- DYNAMIC QUESTION CARDS --- */}
//         {questions.length > 0 && (
//           <div className="animate-fadeIn">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-white flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
//                 Generated Questions
//               </h3>
//               <button onClick={copyToClipboard} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700">
//                 <CopyIcon /> Copy All
//               </button>
//             </div>

//             <div className="space-y-6">
//               {questions.map((q, index) => (
//                 <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-indigo-500/50 transition-colors">
//                   {/* Card Header */}
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-3">
//                       <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider 
//                         ${q.type === 'Technical' ? 'bg-blue-500/10 text-blue-400' : 
//                           q.type === 'Behavioral' ? 'bg-purple-500/10 text-purple-400' : 
//                           'bg-emerald-500/10 text-emerald-400'}`}>
//                         {q.type}
//                       </span>
//                     </div>
//                     <h4 className="text-lg font-medium text-white leading-relaxed">
//                       {q.question}
//                     </h4>
//                   </div>

//                   {/* Interactive Details Section */}
//                   <div className="bg-slate-900/50 p-4 border-t border-slate-700">
//                     <details className="group">
//                       <summary className="flex items-center cursor-pointer text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors select-none">
//                         <span className="mr-2">View Model Answer & Intent</span>
//                         <span className="transform group-open:rotate-180 transition-transform"><ArrowDownIcon /></span>
//                       </summary>
//                       <div className="mt-4 pl-4 border-l-2 border-indigo-500/30 space-y-3">
//                         <div>
//                           <p className="text-xs font-bold text-slate-500 uppercase mb-1">Interviewer Intent</p>
//                           <p className="text-slate-300 text-sm">{q.intent}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs font-bold text-slate-500 uppercase mb-1">Model Answer</p>
//                           <p className="text-slate-300 text-sm leading-relaxed">{q.answer}</p>
//                         </div>
//                       </div>
//                     </details>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default AIBot;

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import { API_BASE_URL } from "../api/config"; 
import { 
  Bot, Terminal, Zap, Code, FileText, 
  Play, StopCircle, Sparkles, Copy, Check, CheckCircle2 // 👈 Added this
} from "lucide-react";
function AIBot() {
  const { token } = useAuth();
  
  // --- STATE ---
  const [jobTitle, setJobTitle] = useState("");
  const [contentType, setContentType] = useState("questions"); 
  const [deliveryMode, setDeliveryMode] = useState("stream"); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [streamOutput, setStreamOutput] = useState(""); 
  const [jsonOutput, setJsonOutput] = useState(null);   
  const [copied, setCopied] = useState(false);

  const abortControllerRef = useRef(null);
  // Ref for auto-scrolling
  const endOfContentRef = useRef(null);

  // --- HANDLER ---
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    setIsLoading(true);
    setStreamOutput("");
    setJsonOutput(null);
    setCopied(false);

    // 1️⃣ STREAMING MODE
    if (deliveryMode === "stream") {
      abortControllerRef.current = new AbortController();
      try {
        // const response = await fetch("http://localhost:5000/api/ai/generate-questions-stream", {
        const response = await fetch(`${API_BASE_URL}/ai/generate-questions-stream`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ jobTitle, mode: contentType }),
          signal: abortControllerRef.current.signal,
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          setStreamOutput((prev) => prev + text);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Stream Error:", err);
          setStreamOutput((prev) => prev + "\n\n**[System Error: Connection Interrupted]**");
        }
      } finally {
        setIsLoading(false);
      }
    } 
    
    // 2️⃣ STANDARD MODE
    else {
      try {
        const res = await axiosInstance.post("/ai/generate-questions", {
          jobTitle,
          mode: contentType
        });
        
        // 🔥 FRONTEND SAFETY: If Solver returns an array, fix it.
        let data = res.data.data;
        if (contentType === "solver" && Array.isArray(data)) {
            data = data[0];
        }
        setJsonOutput(data);
        
      } catch (err) {
        console.error("Standard Generation Error:", err);
        alert("Failed to generate content.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = deliveryMode === "stream" ? streamOutput : JSON.stringify(jsonOutput, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auto-scroll the WINDOW, not the div
  useEffect(() => {
    if (endOfContentRef.current) {
      endOfContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamOutput, jsonOutput]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* 🌌 Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-12 space-y-10">
        
        {/* ⚡ HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider mb-2">
            <Sparkles size={12} /> AI-POWERED ARCHITECT V2.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            Axon <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Generate interview protocols or solve complex engineering challenges.
          </p>
        </div>

        {/* 🎛️ COMMAND CENTER */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl">
          <div className="bg-[#0b1121]/80 rounded-[20px] p-6 md:p-8 border border-white/5 space-y-8">
            
            {/* INPUT ROW */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
              <div className="relative flex items-center bg-[#020617] rounded-xl border border-slate-700 overflow-hidden">
                <div className="pl-6 text-slate-500">
                  <Bot size={24} />
                </div>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Ask anything... e.g., 'Senior React Dev' or 'Solve 10+10'"
                  className="w-full bg-transparent text-white text-lg px-6 py-5 outline-none placeholder-slate-600 font-medium"
                />
                <div className="pr-2">
                  {!isLoading ? (
                    <button onClick={handleGenerate} className="bg-white text-black hover:bg-indigo-50 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      <Play size={18} fill="black" /> <span className="hidden md:inline">Initialize</span>
                    </button>
                  ) : (
                    <button onClick={stopGeneration} className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 border border-rose-500/50">
                      <StopCircle size={18} /> <span className="hidden md:inline">Abort</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SETTINGS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Protocol</label>
                <div className="flex bg-[#020617] p-1.5 rounded-xl border border-slate-800">
                  <button onClick={() => setContentType("questions")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${contentType === 'questions' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                    <FileText size={16} /> Interview
                  </button>
                  <button onClick={() => setContentType("solver")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${contentType === 'solver' ? 'bg-slate-800 text-indigo-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                    <Code size={16} /> Solver
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Transmission</label>
                <div className="flex bg-[#020617] p-1.5 rounded-xl border border-slate-800">
                  <button onClick={() => setDeliveryMode("stream")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${deliveryMode === 'stream' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/50' : 'text-slate-500 hover:text-slate-300'}`}>
                    <Terminal size={16} /> Stream
                  </button>
                  <button onClick={() => setDeliveryMode("normal")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${deliveryMode === 'normal' ? 'bg-indigo-950/30 text-indigo-400 border border-indigo-900/50' : 'text-slate-500 hover:text-slate-300'}`}>
                    <Zap size={16} /> Standard
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= OUTPUT VISUALIZER ================= */}

        {/* MODE 1: THE TERMINAL (Streaming) */}
        {deliveryMode === "stream" && (streamOutput || isLoading) && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex justify-between items-end mb-3 px-2">
              <span className="text-xs font-mono text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE_UPLINK :: ESTABLISHED
              </span>
              <button onClick={handleCopy} className="text-xs font-mono text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} 
                {copied ? "COPIED" : "COPY LOG"}
              </button>
            </div>
            
            {/* 🔥 SCROLL FIX: Removed max-h, added min-h. It will grow naturally. */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-black rounded-2xl border border-emerald-900/30 p-8 min-h-[400px] font-mono text-sm md:text-base leading-relaxed text-emerald-50/90 shadow-2xl">
                <ReactMarkdown
                  components={{
                    code({inline, children, ...props}) {
                      return !inline ? (
                        <div className="my-6 rounded-lg overflow-hidden border border-emerald-900/50 bg-[#05110b]">
                          <div className="bg-[#022c22] px-4 py-1.5 text-[10px] uppercase text-emerald-500 font-bold border-b border-emerald-900/50 flex justify-between tracking-wider">
                            <span>Codeblock</span><span>Copy</span>
                          </div>
                          <code className="block p-4 overflow-x-auto text-emerald-200" {...props}>{children}</code>
                        </div>
                      ) : (
                        <code className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded text-sm" {...props}>{children}</code>
                      );
                    },
                    h1: (props) => <h1 className="text-2xl font-black text-white mt-8 mb-6 pb-4 border-b border-emerald-900/30 tracking-tight" {...props} />,
                    h2: (props) => <h2 className="text-xl font-bold text-emerald-400 mt-8 mb-4 uppercase tracking-wider" {...props} />,
                    h3: (props) => <h3 className="text-lg font-bold text-white mt-6 mb-3" {...props} />,
                    p: (props) => <p className="mb-6 opacity-90" {...props} />,
                    ul: (props) => <ul className="space-y-3 mb-6" {...props} />,
                    li: (props) => <li className="flex gap-3" {...props}><span className="text-emerald-500 select-none">›</span><span>{props.children}</span></li>,
                    strong: (props) => <strong className="text-white font-bold bg-emerald-900/20 px-1 rounded" {...props} />
                  }}
                >
                  {streamOutput}
                </ReactMarkdown>
                
                {isLoading && <div className="mt-4 flex gap-1"><span className="w-1.5 h-4 bg-emerald-500 animate-pulse"></span></div>}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: THE CARDS (Standard) */}
        {deliveryMode === "normal" && jsonOutput && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            
            {/* Content Type: Questions Grid */}
            {contentType === "questions" && Array.isArray(jsonOutput) && (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {jsonOutput.map((q, idx) => (
                  <div key={idx} className="bg-[#0b1121] rounded-2xl border border-slate-800 p-8 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-slate-400 font-mono text-sm border border-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner">{idx + 1}</span>
                      <div><span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${q.type === 'Technical' ? 'bg-blue-950 text-blue-400 border border-blue-900' : 'bg-purple-950 text-purple-400 border border-purple-900'}`}>{q.type}</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-6 leading-snug">{q.question}</h3>
                    <div className="bg-[#020617] rounded-xl p-5 border border-slate-800 space-y-4">
                      <div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Intent</p><p className="text-slate-400 text-sm leading-relaxed">{q.intent}</p></div>
                      <div className="pt-4 border-t border-slate-800"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Model Answer</p><p className="text-slate-300 text-sm leading-relaxed">{q.answer}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content Type: Solver View */}
            {/* 🔥 FIX: Now handles both Object and Array correctly. No more white page. */}
            {contentType === "solver" && jsonOutput && (
              <div className="bg-[#0b1121] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="bg-[#1e293b]/20 p-8 md:p-10 border-b border-slate-800">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{jsonOutput.title || "Solver Output"}</h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">{jsonOutput.whyItMatters}</p>
                </div>
                <div className="p-8 md:p-10 space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4"><span className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500"><Zap size={20} /></span>The Challenge</h3>
                    <p className="text-slate-300 text-lg leading-relaxed pl-12 border-l-2 border-slate-800">{jsonOutput.challenge}</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6"><span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><CheckCircle2 size={20} /></span>Strategic Approach</h3>
                    <div className="grid gap-4 pl-2">
                      {jsonOutput.approach?.map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#020617] border border-slate-800">
                          <span className="text-indigo-500 font-mono font-bold pt-1">0{i+1}</span><span className="text-slate-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-6"><span className="p-2 rounded-lg bg-pink-500/10 text-pink-500"><Code size={20} /></span>Implementation</h3>
                    <div className="bg-[#020617] rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
                      <div className="flex gap-2 px-4 py-3 bg-[#0f172a] border-b border-slate-800">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <pre className="p-6 overflow-x-auto text-sm font-mono text-indigo-100/90 leading-loose">{jsonOutput.codeSolution}</pre>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dummy div to scroll to */}
        <div ref={endOfContentRef}></div>

      </div>
    </div>
  );
}

export default AIBot;