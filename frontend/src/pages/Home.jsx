// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// // --- ICONS ---
// const ArrowRight = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>);
// const Cpu = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>);
// const Activity = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
// const FileText = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const Scan = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>);

// // --- MOTO: SIGNAL vs NOISE (Interactive) ---
// const SignalDemo = () => {
//     const [filter, setFilter] = useState(false);

//     return (
//         <div className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group hover:border-indigo-500/30 transition-all">
//             <div className="absolute top-4 right-4 z-20">
//                 <button 
//                     onClick={() => setFilter(!filter)}
//                     className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${filter ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
//                 >
//                     {filter ? "AI Filter: ON" : "AI Filter: OFF"}
//                 </button>
//             </div>

//             {/* The Visual */}
//             <div className="relative w-full h-full flex items-center justify-center">
//                 {/* Noise Particles */}
//                 <div className={`absolute inset-0 transition-opacity duration-1000 ${filter ? 'opacity-10' : 'opacity-100'}`}>
//                     {[...Array(15)].map((_, i) => (
//                         <div key={i} className="absolute text-[8px] text-slate-600 font-mono animate-float"
//                              style={{
//                                  top: `${Math.random() * 100}%`,
//                                  left: `${Math.random() * 100}%`,
//                                  animationDuration: `${3 + Math.random() * 5}s`
//                              }}>
//                             {['bias', 'clutter', 'noise', 'format', 'typo'][i % 5]}
//                         </div>
//                     ))}
//                 </div>

//                 {/* The Signal */}
//                 <div className={`transition-all duration-1000 transform ${filter ? 'scale-110 opacity-100 blur-0' : 'scale-90 opacity-50 blur-sm'}`}>
//                     <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_indigo]">
//                             <Cpu className="text-white" />
//                         </div>
//                         <div>
//                             <div className="h-2 w-24 bg-slate-700 rounded mb-2 overflow-hidden">
//                                 <div className={`h-full bg-white transition-all duration-1000 ${filter ? 'w-full' : 'w-1/3'}`}></div>
//                             </div>
//                             <div className="text-xs font-bold text-white tracking-widest uppercase">Pure Signal</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <p className="absolute bottom-6 text-slate-500 text-xs">
//                 {filter ? "Only qualified candidates remain." : "Recruiting is mostly noise."}
//             </p>
//         </div>
//     );
// };

// // --- STEP 1: THE DIGITIZER (Replaces Prism) ---
// const DigitizerDemo = () => {
//     const [scan, setScan] = useState(false);

//     const toggle = () => {
//         if (scan) return;
//         setScan(true);
//         setTimeout(() => setScan(false), 3000);
//     };

//     return (
//         <div onClick={toggle} className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center cursor-pointer group hover:border-indigo-500/30 transition-all">
            
//             {/* Document */}
//             <div className={`w-32 h-44 bg-slate-800 border border-slate-700 rounded-lg p-3 relative transition-all duration-1000 ${scan ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
//                 <div className="w-8 h-8 bg-slate-600 rounded-full mb-3"></div>
//                 <div className="h-2 w-full bg-slate-600 rounded mb-2"></div>
//                 <div className="h-2 w-2/3 bg-slate-600 rounded mb-4"></div>
//                 <div className="h-1 w-full bg-slate-700 rounded mb-1"></div>
//                 <div className="h-1 w-full bg-slate-700 rounded mb-1"></div>
                
//                 {/* Scanning Bar */}
//                 <div className={`absolute left-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_indigo] transition-all duration-[3s] ease-linear ${scan ? 'top-[100%] opacity-100' : 'top-0 opacity-0'}`}></div>
//             </div>

//             {/* Holographic Projection (Data) */}
//             <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500 ${scan ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
//                 <div className="bg-slate-900/90 backdrop-blur border border-indigo-500/50 p-2 rounded text-xs font-mono text-indigo-300 shadow-xl">
//                     Experience: 5 Years
//                 </div>
//                 <div className="bg-slate-900/90 backdrop-blur border border-purple-500/50 p-2 rounded text-xs font-mono text-purple-300 shadow-xl ml-12">
//                     Skills: React, Node
//                 </div>
//                 <div className="bg-slate-900/90 backdrop-blur border border-emerald-500/50 p-2 rounded text-xs font-mono text-emerald-300 shadow-xl mr-12">
//                     Education: Masters
//                 </div>
//             </div>

//             {!scan && <div className="absolute bottom-6 text-xs text-slate-500 animate-pulse">Click to Digitize</div>}
//         </div>
//     );
// };

// // --- STEP 2: THE SYNAPSE (Kept per request) ---
// const SynapseDemo = () => {
//     const [match, setMatch] = useState(false);

//     return (
//         <div 
//             onMouseEnter={() => setMatch(true)} 
//             onMouseLeave={() => setMatch(false)}
//             className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center cursor-crosshair group hover:border-purple-500/30 transition-all"
//         >
//             <div className="flex w-full max-w-sm justify-between items-center px-8 relative">
//                 <div className="z-10 flex flex-col items-center gap-2">
//                     <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${match ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_purple]' : 'border-slate-700 bg-slate-800'}`}>
//                         <span className="text-[10px] font-bold text-white">JOB</span>
//                     </div>
//                 </div>

//                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-12">
//                      <div className="h-0.5 w-full bg-slate-800 relative overflow-hidden">
//                         <div className={`absolute top-0 left-0 bottom-0 bg-white w-1/2 blur-[2px] transition-all duration-300 ${match ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}`}></div>
//                      </div>
//                 </div>

//                 <div className="z-10 flex flex-col items-center gap-2">
//                     <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 delay-100 ${match ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_indigo]' : 'border-slate-700 bg-slate-800'}`}>
//                         <span className="text-[10px] font-bold text-white">RESUME</span>
//                     </div>
//                 </div>
//             </div>

//             <div className={`mt-8 px-4 py-1 rounded-full text-xs font-bold transition-all duration-500 ${match ? 'bg-white text-black scale-110' : 'bg-slate-800 text-slate-500 scale-100'}`}>
//                 {match ? "NEURAL MATCH DETECTED" : "Hover to Connect"}
//             </div>
//         </div>
//     );
// };

// // --- STEP 3: THE LEADERBOARD (Kept per request) ---
// const LeaderboardDemo = () => {
//     const [candidates, setCandidates] = useState([
//         { id: 1, name: "A. Smith", score: 85 },
//         { id: 2, name: "B. Jones", score: 92 },
//         { id: 3, name: "C. Lee", score: 64 },
//     ]);

//     const shuffle = () => {
//         const newCandidates = candidates.map(c => ({
//             ...c,
//             score: Math.floor(Math.random() * (99 - 60) + 60)
//         })).sort((a, b) => b.score - a.score);
//         setCandidates(newCandidates);
//     };

//     return (
//         <div className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-all">
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2">
//                     <Activity className="text-emerald-500 w-4 h-4" />
//                     <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Live Ranking</span>
//                 </div>
//                 <button onClick={shuffle} className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors">Update</button>
//             </div>

//             <div className="flex-1 space-y-3 relative">
//                 {candidates.map((c, index) => (
//                     <div 
//                         key={c.id}
//                         className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between transition-all duration-500 absolute"
//                         style={{ top: `${index * 60}px`, left: 0, right: 0 }}
//                     >
//                         <div className="flex items-center gap-3">
//                             <div className="text-slate-500 font-mono text-xs w-4">0{index + 1}</div>
//                             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
//                                 {c.name.charAt(0)}
//                             </div>
//                             <span className="text-sm text-slate-300 font-bold">{c.name}</span>
//                         </div>
//                         <div className={`text-xs font-bold px-2 py-1 rounded ${index === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
//                             {c.score}%
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // --- MAIN PAGE ---
// function Home() {
//   const { isLoggedIn, user } = useAuth();
//   const navigate = useNavigate();

//   const handleMainAction = () => {
//     if (isLoggedIn) {
//       if (user?.role === 'recruiter') navigate("/recruiter-dashboard");
//       else navigate("/jobs");
//     } else {
//       navigate("/register");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-32 pb-24 px-6 text-center max-w-6xl mx-auto">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-900/10 to-transparent blur-[120px] -z-10 pointer-events-none"></div>
        
//         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-sm font-bold uppercase tracking-widest mb-8 hover:bg-slate-800 transition-colors cursor-default">
//             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//             Axon is Live
//         </div>

//         <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
//            The Neural Network <br />
//            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-[length:200%_auto]">
//                For Hiring
//            </span>
//         </h1>
//         <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
//            Axon isn't just a job board. It's an intelligence layer that sits between candidates and recruiters, filtering the signal from the noise
//         </p>
        
//         <div className="flex flex-col sm:flex-row justify-center gap-6">
//             <button 
//                 onClick={handleMainAction}
//                 className="px-10 py-5 bg-white text-slate-900 font-bold rounded-full text-lg hover:bg-indigo-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto sm:mx-0"
//             >
//                 {isLoggedIn ? "Enter System" : "Initialize"} <ArrowRight />
//             </button>
//         </div>
//       </section>

//       {/* --- THE STORYBOARD --- */}
//       <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
          
//           {/* MOTO: SIGNAL vs NOISE */}
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//              <div className="space-y-6">
//                  <h2 className="text-4xl md:text-5xl font-bold">Signal vs Noise</h2>
//                  <p className="text-slate-400 text-lg leading-relaxed">
//                      90% of a recruiter's time is spent sifting through noise—bad formats, irrelevant skills, and bias. Axon filters this out instantly, leaving only the pure signal: <strong>Talent</strong>
//                  </p>
//              </div>
//              <div className="perspective-1000"><SignalDemo /></div>
//           </div>

//           {/* STEP 1: DIGITIZER */}
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//               <div className="order-2 md:order-1 perspective-1000"><DigitizerDemo /></div>
//               <div className="order-1 md:order-2 space-y-6">
//                   <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-indigo-500/30 text-xl">1</div>
//                   <h2 className="text-4xl md:text-5xl font-bold">Smart Ingestion</h2>
//                   <p className="text-slate-400 text-lg leading-relaxed">
//                       We treat resumes as raw data input. Our engine scans PDFs and converts them into structured digital profiles in milliseconds
//                   </p>
//               </div>
//           </div>

//           {/* STEP 2: SYNAPSE */}
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//               <div className="order-2 md:order-1 space-y-6">
//                   <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-purple-500/30 text-xl">2</div>
//                   <h2 className="text-4xl md:text-5xl font-bold">Neural Matching</h2>
//                   <p className="text-slate-400 text-lg leading-relaxed">
//                       Keywords aren't enough  We calculate the semantic distance between a candidate's history and your job requirements  A match is only made when the connection is strong
//                   </p>
//               </div>
//               <div className="order-1 md:order-2 perspective-1000"><SynapseDemo /></div>
//           </div>

//           {/* STEP 3: LEADERBOARD */}
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//              <div className="order-2 md:order-1 perspective-1000"><LeaderboardDemo /></div>
//              <div className="order-1 md:order-2 space-y-6">
//                  <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-emerald-500/30 text-xl">3</div>
//                  <h2 className="text-4xl md:text-5xl font-bold">Dynamic Ranking</h2>
//                  <p className="text-slate-400 text-lg leading-relaxed">
//                      Stop sorting by "Date Applied " Axon delivers a live, score-weighted leaderboard  The best candidates float to the top automatically
//                  </p>
//              </div>
//           </div>

//       </div>

//       {/* --- FOOTER --- */}
//       <footer className="py-12 border-t border-slate-800 bg-[#010409] text-center">
//          <div className="flex items-center justify-center gap-2 mb-4">
//              <Cpu className="text-indigo-500 w-6 h-6" />
//              <span className="text-white font-bold text-xl tracking-tight">Axon</span>
//          </div>
//          <p className="text-slate-600 text-sm">System Status: Operational</p>
//          <p className="text-slate-700 text-xs mt-2">© 2026 Axon Intelligence Layer</p>
//       </footer>

//     </div>
//   );
// }

// export default Home;



























// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// // ─── INTERACTIVE DEMOS — exact same logic as original ───
// const SignalDemo = () => {
//   const [filter, setFilter] = useState(false);
//   return (
//     <div style={{ width:"100%",height:"260px",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
//       <div style={{ position:"absolute",top:12,right:12 }}>
//         <button onClick={()=>setFilter(!filter)} style={{ fontSize:"10px",fontWeight:600,padding:"4px 10px",borderRadius:"4px",border:`1px solid ${filter?"var(--accent-mid)":"var(--border-strong)"}`,background:filter?"var(--accent-bg)":"var(--bg-subtle)",color:filter?"var(--accent)":"var(--text-3)",cursor:"pointer",fontFamily:"Inter,sans-serif" }}>
//           {filter?"AI Filter: ON":"AI Filter: OFF"}
//         </button>
//       </div>
//       <div style={{ position:"absolute",inset:0,transition:"opacity 1s",opacity:filter?0.06:1 }}>
//         {["bias","clutter","noise","format","typo","noise","clutter","bias","typo","format"].map((w,i)=>(
//           <div key={i} style={{ position:"absolute",top:`${10+(i*17)%80}%`,left:`${5+(i*23)%85}%`,fontSize:"10px",color:"var(--text-3)",fontFamily:"monospace",opacity:0.7 }}>{w}</div>
//         ))}
//       </div>
//       <div style={{ transition:"all 1s",transform:filter?"scale(1.05)":"scale(0.9)",opacity:filter?1:0.4,filter:filter?"none":"blur(1px)",zIndex:10 }}>
//         <div style={{ display:"flex",alignItems:"center",gap:"14px" }}>
//           <div style={{ width:"40px",height:"40px",background:"var(--accent)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center" }}>
//             <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
//           </div>
//           <div>
//             <div style={{ height:"5px",width:"90px",background:"var(--border)",borderRadius:"3px",overflow:"hidden",marginBottom:"7px" }}>
//               <div style={{ height:"100%",background:"var(--text-1)",borderRadius:"3px",width:filter?"100%":"33%",transition:"width 1s" }}/>
//             </div>
//             <div style={{ fontSize:"10px",fontWeight:700,color:"var(--text-1)",letterSpacing:"0.08em",textTransform:"uppercase" }}>Pure Signal</div>
//           </div>
//         </div>
//       </div>
//       <p style={{ position:"absolute",bottom:12,fontSize:"11px",color:"var(--text-3)" }}>{filter?"Only qualified candidates remain.":"Recruiting is mostly noise."}</p>
//     </div>
//   );
// };

// const DigitizerDemo = () => {
//   const [scan,setScan]=useState(false);
//   const toggle=()=>{ if(scan)return; setScan(true); setTimeout(()=>setScan(false),3000); };
//   return (
//     <div onClick={toggle} style={{ width:"100%",height:"260px",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
//       <div style={{ width:"100px",height:"136px",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"6px",padding:"10px",position:"relative",transition:"all 1s",transform:scan?"scale(0.88)":"scale(1)",opacity:scan?0.35:1 }}>
//         <div style={{ width:"24px",height:"24px",borderRadius:"50%",background:"var(--border-strong)",marginBottom:"8px" }}/>
//         <div style={{ height:"5px",width:"100%",background:"var(--border)",borderRadius:"2px",marginBottom:"5px" }}/>
//         <div style={{ height:"5px",width:"70%",background:"var(--border)",borderRadius:"2px",marginBottom:"10px" }}/>
//         <div style={{ height:"3px",width:"100%",background:"var(--border)",borderRadius:"2px",marginBottom:"4px" }}/>
//         <div style={{ height:"3px",width:"100%",background:"var(--border)",borderRadius:"2px" }}/>
//         <div style={{ position:"absolute",left:0,width:"100%",height:"2px",background:"var(--accent)",top:scan?"100%":"0%",transition:"top 3s linear, opacity 0.3s",opacity:scan?1:0 }}/>
//       </div>
//       <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"7px",opacity:scan?1:0,transition:"opacity 0.5s" }}>
//         {[["Experience: 5 Years","var(--accent)"],["Skills: React, Node","var(--purple)"],["Education: Masters","var(--green)"]].map(([label,color],i)=>(
//           <div key={i} style={{ background:"var(--bg-surface)",border:`1px solid ${color}`,borderRadius:"4px",padding:"4px 10px",fontSize:"11px",fontFamily:"monospace",color,marginLeft:i===1?"36px":i===2?"-36px":"0" }}>{label}</div>
//         ))}
//       </div>
//       {!scan&&<p style={{ position:"absolute",bottom:12,fontSize:"11px",color:"var(--text-3)" }}>Click to digitize</p>}
//     </div>
//   );
// };

// const SynapseDemo = () => {
//   const [match,setMatch]=useState(false);
//   return (
//     <div onMouseEnter={()=>setMatch(true)} onMouseLeave={()=>setMatch(false)} style={{ width:"100%",height:"260px",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"crosshair" }}>
//       <div style={{ display:"flex",alignItems:"center",gap:"44px",position:"relative" }}>
//         <div style={{ position:"absolute",left:"50px",right:"50px",top:"50%",height:"2px",background:"var(--border)",overflow:"hidden" }}>
//           <div style={{ position:"absolute",top:0,left:0,bottom:0,width:"50%",background:"var(--text-1)",transition:"transform 0.4s",transform:match?"translateX(100%)":"translateX(-100%)",filter:"blur(1px)" }}/>
//         </div>
//         <div style={{ width:"48px",height:"48px",borderRadius:"50%",border:`2px solid ${match?"var(--purple)":"var(--border-strong)"}`,background:match?"var(--purple-bg)":"var(--bg-subtle)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s",position:"relative",zIndex:2 }}>
//           <span style={{ fontSize:"9px",fontWeight:700,color:match?"var(--purple)":"var(--text-3)" }}>JOB</span>
//         </div>
//         <div style={{ width:"48px",height:"48px",borderRadius:"50%",border:`2px solid ${match?"var(--accent)":"var(--border-strong)"}`,background:match?"var(--accent-bg)":"var(--bg-subtle)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s 0.1s",position:"relative",zIndex:2 }}>
//           <span style={{ fontSize:"9px",fontWeight:700,color:match?"var(--accent)":"var(--text-3)" }}>CV</span>
//         </div>
//       </div>
//       <div style={{ marginTop:"22px",padding:"4px 14px",borderRadius:"4px",fontSize:"10px",fontWeight:700,background:match?"var(--text-1)":"var(--bg-subtle)",color:match?"var(--bg-surface)":"var(--text-3)",transition:"all 0.4s",letterSpacing:"0.04em" }}>
//         {match?"NEURAL MATCH DETECTED":"Hover to connect"}
//       </div>
//     </div>
//   );
// };

// const LeaderboardDemo = () => {
//   const [candidates,setCandidates]=useState([
//     {id:1,name:"A. Smith",score:85},
//     {id:2,name:"B. Jones",score:92},
//     {id:3,name:"C. Lee",score:64},
//   ]);
//   const shuffle=()=>setCandidates(prev=>[...prev].map(c=>({...c,score:Math.floor(Math.random()*39+60)})).sort((a,b)=>b.score-a.score));
//   return (
//     <div style={{ width:"100%",height:"260px",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"14px 16px",display:"flex",flexDirection:"column" }}>
//       <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px" }}>
//         <span style={{ fontSize:"10px",fontWeight:700,color:"var(--green)",textTransform:"uppercase",letterSpacing:"0.07em" }}>Live Ranking</span>
//         <button onClick={shuffle} style={{ fontSize:"10px",background:"var(--bg-subtle)",border:"1px solid var(--border)",color:"var(--text-2)",padding:"3px 8px",borderRadius:"3px",cursor:"pointer",fontFamily:"Inter,sans-serif" }}>Update</button>
//       </div>
//       <div style={{ flex:1,position:"relative" }}>
//         {candidates.map((c,i)=>(
//           <div key={c.id} style={{ position:"absolute",left:0,right:0,top:`${i*58}px`,padding:"9px 10px",borderRadius:"7px",background:"var(--bg-subtle)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:"9px",transition:"top 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
//             <span style={{ fontSize:"9px",color:"var(--text-3)",fontFamily:"monospace",width:"14px" }}>0{i+1}</span>
//             <div style={{ width:"26px",height:"26px",borderRadius:"50%",background:i===0?"var(--accent)":"var(--border-strong)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:700,color:"white" }}>{c.name[0]}</div>
//             <span style={{ fontSize:"12px",color:"var(--text-1)",fontWeight:500,flex:1 }}>{c.name}</span>
//             <span style={{ fontSize:"10px",fontWeight:700,padding:"2px 7px",borderRadius:"3px",background:i===0?"var(--green-bg)":"var(--bg-surface)",color:i===0?"var(--green)":"var(--text-3)",fontFamily:"monospace" }}>{c.score}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── COUNT-UP ANIMATION ───
// function useCountUp(target, duration=1600, start=false) {
//   const [value,setValue]=useState(0);
//   useEffect(()=>{
//     if(!start) return;
//     let t0=null;
//     const step=(ts)=>{ if(!t0)t0=ts; const p=Math.min((ts-t0)/duration,1); setValue(Math.floor(p*target)); if(p<1)requestAnimationFrame(step); };
//     requestAnimationFrame(step);
//   },[target,duration,start]);
//   return value;
// }

// // ─── MAIN ───
// function Home() {
//   const { isLoggedIn, user } = useAuth();
//   const navigate = useNavigate();
//   const [statsVisible,setStatsVisible]=useState(false);
//   const statsRef=useRef(null);

//   // SAME logic as original — untouched
//   const handleMainAction = () => {
//     if (isLoggedIn) {
//       if (user?.role === "recruiter") navigate("/recruiter-dashboard");
//       else navigate("/jobs");
//     } else {
//       navigate("/register");
//     }
//   };

//   useEffect(()=>{
//     const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setStatsVisible(true); },{threshold:0.3});
//     if(statsRef.current)obs.observe(statsRef.current);
//     return()=>obs.disconnect();
//   },[]);

//   const jobCount     = useCountUp(4200,1400,statsVisible);
//   const coCount      = useCountUp(1800,1600,statsVisible);
//   const accCount     = useCountUp(94,1000,statsVisible);

//   return (
//     <div style={{ minHeight:"100vh",background:"var(--bg-page)" }}>

//       {/* ── HERO ── */}
//       <section style={{ background:"var(--bg-surface)",borderBottom:"1px solid var(--border)",padding:"0 24px" }}>
//         <div style={{ maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"480px",alignItems:"stretch" }} className="home-hero-grid">

//           {/* Left text */}
//           <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",padding:"56px 48px 56px 0",borderRight:"1px solid var(--border)" }}>
//             <div style={{ display:"inline-flex",alignItems:"center",gap:"6px",marginBottom:"20px",width:"fit-content" }}>
//               <span style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#22c55e",animation:"ax-pulse-dot 2s infinite" }}/>
//               <span style={{ fontSize:"11px",fontWeight:600,color:"var(--text-3)",letterSpacing:"0.05em" }}>AxonHire is live</span>
//             </div>

//             <h1 style={{ fontSize:"clamp(28px,4vw,42px)",fontWeight:700,letterSpacing:"-0.04em",lineHeight:1.1,color:"var(--text-1)",marginBottom:"16px" }}>
//               The AI hiring layer<br/>
//               <span style={{ color:"var(--accent)" }}>that finds the fit</span>
//             </h1>

//             <p style={{ fontSize:"15px",color:"var(--text-2)",lineHeight:1.7,maxWidth:"400px",marginBottom:"28px" }}>
//               AxonHire sits between candidates and recruiters — scanning resumes, scoring matches, and surfacing the right people automatically.
//             </p>

//             {/* Search */}
//             <div style={{ display:"flex",background:"var(--bg-subtle)",border:"1.5px solid var(--border-strong)",borderRadius:"8px",overflow:"hidden",maxWidth:"440px",marginBottom:"18px" }}>
//               <div style={{ display:"flex",alignItems:"center",gap:"8px",padding:"0 14px",flex:1 }}>
//                 <svg width="14" height="14" fill="none" stroke="var(--text-3)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
//                 <input type="text" placeholder="Role, skill, or company..." onKeyDown={e=>{ if(e.key==="Enter")navigate("/jobs"); }} style={{ border:"none",outline:"none",background:"transparent",fontFamily:"Inter,sans-serif",fontSize:"13px",color:"var(--text-1)",width:"100%",height:"44px" }}/>
//               </div>
//               <button onClick={()=>navigate("/jobs")} style={{ margin:"4px",padding:"0 18px",background:"var(--accent)",color:"white",border:"none",borderRadius:"5px",fontSize:"13px",fontWeight:500,cursor:"pointer",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap" }}>
//                 Search
//               </button>
//             </div>

//             {/* CTAs */}
//             <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
//               <button onClick={handleMainAction} style={{ display:"flex",alignItems:"center",gap:"7px",padding:"10px 22px",background:"var(--accent)",color:"white",border:"none",borderRadius:"6px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif" }}>
//                 {isLoggedIn?"Browse Jobs":"Get started free"}
//                 <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
//               </button>
//               <Link to="/ai-bot" style={{ display:"flex",alignItems:"center",padding:"10px 22px",background:"var(--bg-surface)",color:"var(--text-1)",border:"1px solid var(--border-strong)",borderRadius:"6px",fontSize:"13px",fontWeight:500,textDecoration:"none" }}>
//                 Try AI Prep
//               </Link>
//             </div>
//           </div>

//           {/* Right — preview cards */}
//           <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 0 40px 48px",gap:"10px" }}>
//             {[
//               {title:"Frontend Engineer",co:"Axon Labs",salary:"₹6–10 LPA",tag:"New",color:"#0891b2",match:"94%"},
//               {title:"Data Analyst",co:"InsightIQ",salary:"₹5–9 LPA",tag:"Hot",color:"#0066cc",match:"87%"},
//               {title:"DevOps Engineer",co:"InfraScale Tech",salary:"₹12–20 LPA",tag:"",color:"#7c3aed",match:"71%"},
//             ].map((job,i)=>(
//               <div key={i} onClick={()=>navigate("/jobs")} style={{ background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"10px",padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.15s",opacity:i===0?1:i===1?0.85:0.6,transform:`translateX(${i*12}px)` }}
//                 onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.opacity="1";e.currentTarget.style.transform=`translateX(${i*6}px)`;}}
//                 onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.opacity=i===0?"1":i===1?"0.85":"0.6";e.currentTarget.style.transform=`translateX(${i*12}px)`;}}
//               >
//                 <div style={{ width:"36px",height:"36px",borderRadius:"8px",background:job.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:700,color:"white",flexShrink:0 }}>{job.co[0]}</div>
//                 <div style={{ flex:1,minWidth:0 }}>
//                   <div style={{ fontSize:"13px",fontWeight:600,color:"var(--text-1)",marginBottom:"2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{job.title}</div>
//                   <div style={{ fontSize:"11px",color:"var(--text-3)" }}>{job.co} · {job.salary}</div>
//                 </div>
//                 <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px",flexShrink:0 }}>
//                   <div style={{ fontSize:"11px",fontWeight:700,color:"var(--green)",fontFamily:"monospace" }}>{job.match}</div>
//                   {job.tag&&<span style={{ fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"2px",background:"var(--accent-bg)",color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.04em" }}>{job.tag}</span>}
//                 </div>
//               </div>
//             ))}
//             <p style={{ fontSize:"11px",color:"var(--text-3)",paddingLeft:"4px",marginTop:"2px" }}>AI match score shown for your profile →</p>
//           </div>
//         </div>
//       </section>

//       {/* ── STATS BAR ── */}
//       <div ref={statsRef} style={{ background:"var(--bg-surface)",borderBottom:"1px solid var(--border)" }}>
//         <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-around",flexWrap:"wrap",gap:"12px" }}>
//           {[
//             {num:`${jobCount.toLocaleString()}+`,label:"Active jobs",color:"var(--accent)"},
//             {num:`${coCount.toLocaleString()}+`,label:"Companies hiring",color:"var(--purple)"},
//             {num:`${accCount}%`,label:"AI match accuracy",color:"var(--green)"},
//             {num:"2 min",label:"Avg. time to match",color:"var(--orange)"},
//           ].map((s,i)=>(
//             <React.Fragment key={s.label}>
//               {i>0&&<div style={{ width:"1px",height:"28px",background:"var(--border)" }}/>}
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontSize:"22px",fontWeight:700,color:s.color,letterSpacing:"-0.03em",fontFamily:"monospace" }}>{s.num}</div>
//                 <div style={{ fontSize:"11px",color:"var(--text-3)",marginTop:"2px" }}>{s.label}</div>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* ── HOW IT WORKS ── */}
//       <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"56px 24px" }}>

//         {/* Section title */}
//         <div style={{ textAlign:"center",marginBottom:"36px" }}>
//           <div style={{ fontSize:"10px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:"8px" }}>How it works</div>
//           <h2 style={{ fontSize:"clamp(20px,3vw,28px)",fontWeight:700,letterSpacing:"-0.025em",color:"var(--text-1)" }}>Three steps from resume to offer</h2>
//         </div>

//         {/* 3 step cards */}
//         <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginBottom:"48px" }} className="home-steps-grid">
//           {[
//             {num:"1",title:"Upload your resume",desc:"Upload a PDF once. Our AI reads it and builds your structured profile — skills, experience, education, all extracted automatically.",color:"var(--accent)",bg:"var(--accent-bg)",border:"var(--accent-mid)",demo:<DigitizerDemo/>},
//             {num:"2",title:"AI matches you",desc:"Our neural matching engine scores your profile against every job — not just keywords, but semantic fit. You see a match score for each role.",color:"var(--purple)",bg:"var(--purple-bg)",border:"var(--purple)",demo:<SynapseDemo/>},
//             {num:"3",title:"Recruiters find you",desc:"Recruiters see a ranked leaderboard. The best matches float to the top. No more lost applications — you're visible where it matters.",color:"var(--green)",bg:"var(--green-bg)",border:"var(--green)",demo:<LeaderboardDemo/>},
//           ].map(s=>(
//             <div key={s.num} style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px" }}>
//               <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
//                 <div style={{ width:"26px",height:"26px",borderRadius:"6px",background:s.bg,border:`1px solid ${s.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:s.color }}>{s.num}</div>
//                 <span style={{ fontSize:"13px",fontWeight:600,color:"var(--text-1)" }}>{s.title}</span>
//               </div>
//               <p style={{ fontSize:"12px",color:"var(--text-2)",lineHeight:1.65 }}>{s.desc}</p>
//               {s.demo}
//             </div>
//           ))}
//         </div>

//         {/* Signal demo full width */}
//         <div style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"32px 36px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",alignItems:"center",marginBottom:"48px" }} className="home-signal-grid">
//           <div>
//             <div style={{ fontSize:"10px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:"10px" }}>The Axon Difference</div>
//             <h3 style={{ fontSize:"22px",fontWeight:700,letterSpacing:"-0.02em",color:"var(--text-1)",marginBottom:"12px" }}>We filter noise so<br/>you don't have to</h3>
//             <p style={{ fontSize:"13px",color:"var(--text-2)",lineHeight:1.75,marginBottom:"20px" }}>
//               90% of a recruiter's time is spent sorting bad applications. AxonHire's AI removes unqualified matches before they reach your desk.
//             </p>
//             <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
//               {["Automated resume parsing","Semantic skill matching","AI scoring for every applicant","Live ranked pipeline"].map(f=>(
//                 <div key={f} style={{ display:"flex",alignItems:"center",gap:"8px",fontSize:"13px",color:"var(--text-2)" }}>
//                   <div style={{ width:"15px",height:"15px",borderRadius:"50%",background:"var(--green-bg)",border:"1px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
//                     <svg width="7" height="7" fill="none" stroke="var(--green)" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//                   </div>
//                   {f}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <SignalDemo/>
//         </div>

//         {/* For candidates vs recruiters */}
//         <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"48px" }} className="home-roles-grid">
//           <div style={{ background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",borderRadius:"12px",padding:"28px" }}>
//             <div style={{ fontSize:"10px",fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"10px" }}>For Candidates</div>
//             <h3 style={{ fontSize:"18px",fontWeight:700,letterSpacing:"-0.02em",color:"var(--text-1)",marginBottom:"10px" }}>Land jobs that actually fit you</h3>
//             <p style={{ fontSize:"13px",color:"var(--text-2)",lineHeight:1.7,marginBottom:"20px" }}>Upload your resume, get AI analysis of your strengths, and apply to roles where you have a real shot.</p>
//             <button onClick={()=>navigate(isLoggedIn?"/jobs":"/register")} style={{ padding:"8px 20px",background:"var(--accent)",color:"white",border:"none",borderRadius:"5px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif" }}>
//               {isLoggedIn?"Browse Jobs":"Create free account"}
//             </button>
//           </div>
//           <div style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"28px" }}>
//             <div style={{ fontSize:"10px",fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:"10px" }}>For Recruiters</div>
//             <h3 style={{ fontSize:"18px",fontWeight:700,letterSpacing:"-0.02em",color:"var(--text-1)",marginBottom:"10px" }}>Find the right hire 10x faster</h3>
//             <p style={{ fontSize:"13px",color:"var(--text-2)",lineHeight:1.7,marginBottom:"20px" }}>Post a job, let AI score every applicant, and get a ranked pipeline — no manual screening required.</p>
//             <button onClick={()=>navigate("/post-job")} style={{ padding:"8px 20px",background:"var(--bg-subtle)",color:"var(--text-1)",border:"1px solid var(--border-strong)",borderRadius:"5px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif" }}>
//               Post a Job
//             </button>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div style={{ background:"var(--text-1)",borderRadius:"14px",padding:"40px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"24px",flexWrap:"wrap" }}>
//           <div>
//             <h3 style={{ fontSize:"20px",fontWeight:700,color:"var(--bg-surface)",letterSpacing:"-0.025em",marginBottom:"6px" }}>Ready to use AxonHire?</h3>
//             <p style={{ fontSize:"13px",color:"#888",lineHeight:1.6 }}>Free for candidates. Start in under 2 minutes.</p>
//           </div>
//           <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
//             <button onClick={handleMainAction} style={{ padding:"10px 24px",background:"var(--accent)",color:"white",border:"none",borderRadius:"6px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif" }}>
//               {isLoggedIn?"Go to Jobs":"Sign up free"}
//             </button>
//             <Link to="/ai-bot" style={{ padding:"10px 24px",background:"transparent",color:"var(--bg-page)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"6px",fontSize:"13px",fontWeight:500,textDecoration:"none",display:"inline-block" }}>
//               Try AI Prep
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* ── FOOTER ── */}
//       <footer style={{ borderTop:"1px solid var(--border)",background:"var(--bg-surface)",padding:"24px" }}>
//         <div style={{ maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px" }}>
//           <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
//             <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
//               <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
//               <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
//               <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
//               <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
//               <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
//             </svg>
//             <span style={{ fontSize:"14px",fontWeight:700,color:"var(--text-1)",letterSpacing:"-0.02em" }}>
//               Axon<span style={{ color:"var(--accent)" }}>Hire</span>
//             </span>
//           </div>
//           <p style={{ fontSize:"11px",color:"var(--text-3)" }}>© 2026 AxonHire · System Status: Operational</p>
//         </div>
//       </footer>

//       {/* Global keyframes */}
//       <style>{`
//         @keyframes ax-pulse-dot {
//           0%,100% { box-shadow:0 0 0 3px rgba(34,197,94,0.2); }
//           50%      { box-shadow:0 0 0 6px rgba(34,197,94,0.06); }
//         }
//         @media(max-width:768px){
//           .home-hero-grid   { grid-template-columns:1fr !important; }
//           .home-steps-grid  { grid-template-columns:1fr !important; }
//           .home-signal-grid { grid-template-columns:1fr !important; }
//           .home-roles-grid  { grid-template-columns:1fr !important; }
//           .home-hero-grid > div:first-child { border-right:none !important; border-bottom:1px solid var(--border); padding-right:0 !important; }
//           .home-hero-grid > div:last-child  { padding-left:0 !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;

















// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// // ── ALL ORIGINAL DEMO LOGIC — untouched ──
// const SignalDemo = () => {
//   const [filter,setFilter]=useState(false);
//   return(
//     <div style={{width:"100%",height:200,background:"var(--bg-page)",border:"1px solid var(--border)",borderRadius:8,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
//       <button onClick={()=>setFilter(!filter)} style={{position:"absolute",top:8,right:8,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,border:`1px solid ${filter?"var(--accent-mid)":"var(--border)"}`,background:filter?"var(--accent-bg)":"var(--bg-subtle)",color:filter?"var(--accent)":"var(--text-3)",cursor:"pointer",fontFamily:"inherit",letterSpacing:".05em"}}>
//         {filter?"FILTER ON":"FILTER OFF"}
//       </button>
//       <div style={{position:"absolute",inset:0,transition:"opacity 1.2s",opacity:filter?.03:1}}>
//         {["bias","clutter","noise","format","typo","noise","clutter","bias","typo","format","noise","bias"].map((w,i)=>(
//           <div key={i} style={{position:"absolute",top:`${8+(i*18)%76}%`,left:`${4+(i*21)%88}%`,fontSize:9,color:"var(--text-3)",fontFamily:"monospace",opacity:.5}}>{w}</div>
//         ))}
//       </div>
//       <div style={{zIndex:10,transition:"all 1s",transform:filter?"scale(1.04)":"scale(0.9)",opacity:filter?1:0.28,filter:filter?"none":"blur(1px)"}}>
//         <div style={{display:"flex",alignItems:"center",gap:10}}>
//           <div style={{width:32,height:32,background:"var(--accent)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}>
//             <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
//           </div>
//           <div>
//             <div style={{height:3,width:68,background:"var(--border)",borderRadius:2,overflow:"hidden",marginBottom:5}}><div style={{height:"100%",background:"var(--accent)",width:filter?"100%":"28%",transition:"width 1s",borderRadius:2}}/></div>
//             <div style={{fontSize:9,fontWeight:700,color:"var(--text-1)",letterSpacing:".07em"}}>PURE SIGNAL</div>
//           </div>
//         </div>
//       </div>
//       <p style={{position:"absolute",bottom:8,fontSize:9,color:"var(--text-3)"}}>{filter?"Only qualified talent":"90% of apps are noise"}</p>
//     </div>
//   );
// };

// const DigitizerDemo = () => {
//   const [scan,setScan]=useState(false);
//   const go=()=>{if(scan)return;setScan(true);setTimeout(()=>setScan(false),3000);};
//   return(
//     <div onClick={go} style={{width:"100%",height:200,background:"var(--bg-page)",border:"1px solid var(--border)",borderRadius:8,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
//       <div style={{width:76,height:100,background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:5,padding:8,position:"relative",transition:"all 1s",transform:scan?"scale(0.8)":"scale(1)",opacity:scan?.15:1}}>
//         <div style={{width:16,height:16,borderRadius:"50%",background:"var(--border)",marginBottom:6}}/><div style={{height:3,width:"100%",background:"var(--border)",borderRadius:2,marginBottom:3}}/><div style={{height:3,width:"60%",background:"var(--border)",borderRadius:2,marginBottom:7}}/><div style={{height:2,width:"100%",background:"var(--border)",borderRadius:1,marginBottom:2}}/><div style={{height:2,width:"100%",background:"var(--border)",borderRadius:1}}/>
//         <div style={{position:"absolute",left:0,width:"100%",height:"1.5px",background:"var(--accent)",top:scan?"100%":"0%",transition:"top 3s linear,opacity .3s",opacity:scan?1:0}}/>
//       </div>
//       <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,opacity:scan?1:0,transition:"opacity .5s"}}>
//         {[["Experience: 5 yrs","var(--accent)"],["Skills: React, Node","#7c3aed"],["Education: Masters","#059669"]].map(([l,c],i)=>(
//           <div key={i} style={{background:"var(--bg-subtle)",border:`1px solid ${c}`,borderRadius:3,padding:"3px 9px",fontSize:9,fontFamily:"monospace",color:c,marginLeft:i===1?"20px":i===2?"-20px":"0"}}>{l}</div>
//         ))}
//       </div>
//       {!scan&&<p style={{position:"absolute",bottom:8,fontSize:9,color:"var(--text-3)"}}>Click to digitize</p>}
//     </div>
//   );
// };

// const SynapseDemo = () => {
//   const [m,setM]=useState(false);
//   return(
//     <div onMouseEnter={()=>setM(true)} onMouseLeave={()=>setM(false)} style={{width:"100%",height:200,background:"var(--bg-page)",border:"1px solid var(--border)",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"crosshair"}}>
//       <div style={{display:"flex",alignItems:"center",gap:32,position:"relative"}}>
//         <div style={{position:"absolute",left:"40px",right:"40px",top:"50%",height:"1.5px",background:"var(--border)",overflow:"hidden"}}>
//           <div style={{position:"absolute",top:0,left:0,bottom:0,width:"50%",background:"var(--text-2)",transition:"transform .4s",transform:m?"translateX(100%)":"translateX(-100%)",filter:"blur(1px)"}}/>
//         </div>
//         {[["JOB","#7c3aed"],["CV","var(--accent)"]].map(([label,color],i)=>(
//           <div key={i} style={{width:40,height:40,borderRadius:"50%",border:`2px solid ${m?color:"var(--border-strong)"}`,background:m?`${color}10`:"var(--bg-subtle)",display:"flex",alignItems:"center",justifyContent:"center",transition:`all .4s ${i*.1}s`,zIndex:2,position:"relative"}}>
//             <span style={{fontSize:8,fontWeight:700,color:m?color:"var(--text-3)"}}>{label}</span>
//           </div>
//         ))}
//       </div>
//       <div style={{marginTop:16,padding:"2px 10px",borderRadius:3,fontSize:9,fontWeight:700,background:m?"var(--text-1)":"transparent",border:"1px solid var(--border)",color:m?"var(--bg-page)":"var(--text-3)",transition:"all .4s",letterSpacing:".05em"}}>
//         {m?"MATCH FOUND":"Hover to match"}
//       </div>
//     </div>
//   );
// };

// const LeaderboardDemo = () => {
//   const [c,setC]=useState([{id:1,n:"A. Smith",s:85},{id:2,n:"B. Jones",s:92},{id:3,n:"C. Lee",s:64}]);
//   const shuffle=()=>setC(p=>[...p].map(x=>({...x,s:Math.floor(Math.random()*39+60)})).sort((a,b)=>b.s-a.s));
//   return(
//     <div style={{width:"100%",height:200,background:"var(--bg-page)",border:"1px solid var(--border)",borderRadius:8,padding:"12px 12px 8px",display:"flex",flexDirection:"column"}}>
//       <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
//         <span style={{fontSize:9,fontWeight:700,color:"#059669",letterSpacing:".07em"}}>LIVE RANKING</span>
//         <button onClick={shuffle} style={{fontSize:9,background:"var(--bg-subtle)",border:"1px solid var(--border)",color:"var(--text-2)",padding:"1px 6px",borderRadius:2,cursor:"pointer",fontFamily:"inherit"}}>Update</button>
//       </div>
//       <div style={{flex:1,position:"relative"}}>
//         {c.map((x,i)=>(
//           <div key={x.id} style={{position:"absolute",left:0,right:0,top:`${i*44}px`,padding:"6px 8px",borderRadius:5,background:"var(--bg-subtle)",border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:7,transition:"top .5s cubic-bezier(.4,0,.2,1)"}}>
//             <span style={{fontSize:8,color:"var(--text-3)",fontFamily:"monospace",width:11}}>0{i+1}</span>
//             <div style={{width:20,height:20,borderRadius:"50%",background:i===0?"var(--accent)":"var(--border-strong)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"white"}}>{x.n[0]}</div>
//             <span style={{fontSize:11,color:"var(--text-1)",fontWeight:500,flex:1}}>{x.n}</span>
//             <span style={{fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:2,background:i===0?"rgba(5,150,105,.1)":"var(--bg-subtle)",color:i===0?"#059669":"var(--text-3)",fontFamily:"monospace"}}>{x.s}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ── COUNT-UP HOOK — original logic ──
// function useCountUp(target,dur=1400,go=false){
//   const [v,setV]=useState(0);
//   useEffect(()=>{
//     if(!go)return;
//     let t0=null;
//     const step=(ts)=>{ if(!t0)t0=ts; const p=Math.min((ts-t0)/dur,1); setV(Math.floor(p*target)); if(p<1)requestAnimationFrame(step); };
//     requestAnimationFrame(step);
//   },[target,dur,go]);
//   return v;
// }

// function useVisible(thresh=0.15){
//   const ref=useRef(null);
//   const [vis,setVis]=useState(false);
//   useEffect(()=>{
//     const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:thresh});
//     if(ref.current)obs.observe(ref.current);
//     return()=>obs.disconnect();
//   },[thresh]);
//   return [ref,vis];
// }

// // ── MAIN ──
// export default function Home(){
//   const {isLoggedIn,user}=useAuth();
//   const navigate=useNavigate();
//   const [search,setSearch]=useState("");
//   const [statsRef,statsVis]=useVisible(0.2);
//   const j=useCountUp(4200,1400,statsVis);
//   const c=useCountUp(1800,1600,statsVis);
//   const a=useCountUp(94,1000,statsVis);

//   const go=()=>{
//     if(isLoggedIn){ user?.role==="recruiter"?navigate("/recruiter-dashboard"):navigate("/jobs"); }
//     else navigate("/register");
//   };

//   return(
//     <div style={{minHeight:"100vh",background:"var(--bg-page)",fontFamily:"Inter,sans-serif"}}>
// <style>{`
// @keyframes hfade{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
// @keyframes hbar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
// @keyframes hpulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.18)}50%{box-shadow:0 0 0 7px rgba(34,197,94,.03)}}
// @keyframes hticker{0%{transform:translateY(0)}33%{transform:translateY(-24px)}66%{transform:translateY(-48px)}100%{transform:translateY(-72px)}}
// .ha0{animation:hfade .55s .05s both}
// .ha1{animation:hfade .55s .15s both}
// .ha2{animation:hfade .55s .25s both}
// .ha3{animation:hfade .55s .35s both}
// .ha4{animation:hfade .55s .45s both}
// .hcard{transition:border-color .2s,transform .2s,box-shadow .2s}
// .hcard:hover{border-color:var(--accent)!important;transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,87,184,.09)!important}
// .hjob{transition:all .15s}
// .hjob:hover{border-color:var(--accent)!important;transform:translateX(3px)}
// .hbtn{transition:all .15s}
// .hbtn:hover{filter:brightness(1.1);transform:translateY(-1px)}
// .hlink:hover{color:var(--accent)!important;border-color:var(--accent)!important}
// .hft{transition:color .15s}
// .hft:hover{color:var(--accent)!important}
// @media(max-width:860px){
//   .hgrid{grid-template-columns:1fr!important}
//   .hleft{border-right:none!important;border-bottom:1px solid var(--border);padding:40px 20px!important}
//   .hright{padding:32px 20px!important}
//   .h3col{grid-template-columns:1fr!important}
//   .h2col{grid-template-columns:1fr!important}
//   .htrust{grid-template-columns:1fr 1fr!important}
// }
// `}</style>

// {/* ══════════════════════════════════════
//     HERO — full-bleed split layout
// ══════════════════════════════════════ */}
// <section style={{background:"var(--bg-surface)",borderBottom:"1px solid var(--border)"}}>
// <div className="hgrid" style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"52fr 48fr",minHeight:520}}>

//   {/* ── LEFT PANEL ── */}
//   <div className="hleft" style={{padding:"60px 56px 60px 40px",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"center"}}>

//     {/* live pill */}
//     <div className="ha0" style={{display:"inline-flex",alignItems:"center",gap:7,padding:"5px 13px",borderRadius:20,background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.2)",width:"fit-content",marginBottom:22}}>
//       <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",animation:"hpulse 2s infinite",display:"inline-block"}}/>
//       <span style={{fontSize:11,fontWeight:600,color:"#059669",letterSpacing:".03em"}}>AxonHire is live — 4,200+ jobs</span>
//     </div>

//     {/* headline — ticker for action words */}
//     <div className="ha1" style={{marginBottom:4}}>
//       <div style={{fontSize:"clamp(32px,3.8vw,46px)",fontWeight:800,letterSpacing:"-.045em",lineHeight:1.05,color:"var(--text-1)",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
//         <span>The AI layer</span>
//       </div>
//       <div style={{fontSize:"clamp(32px,3.8vw,46px)",fontWeight:800,letterSpacing:"-.045em",lineHeight:1.05,marginBottom:6,display:"flex",alignItems:"center",gap:0}}>
//         <span style={{color:"var(--text-1)"}}>between</span>&nbsp;
//         {/* animated role ticker */}
//         <span style={{overflow:"hidden",height:"1.1em",display:"inline-block",verticalAlign:"bottom"}}>
//           <span style={{display:"flex",flexDirection:"column",animation:"hticker 4s 1s steps(1) infinite"}}>
//             {["talent","you","hires","teams"].map(w=>(
//               <span key={w} style={{color:"var(--accent)",height:"1.1em",display:"block",lineHeight:"1.05em"}}>{w}</span>
//             ))}
//           </span>
//         </span>
//         <span style={{color:"var(--text-1)"}}>&nbsp;&amp; jobs</span>
//       </div>
//     </div>

//     {/* accent underline */}
//     <div className="ha1" style={{width:56,height:3,background:"var(--accent)",borderRadius:2,marginBottom:20,transformOrigin:"left",animation:"hbar .7s .3s both"}}/>

//     <p className="ha2" style={{fontSize:14,color:"var(--text-2)",lineHeight:1.78,maxWidth:400,marginBottom:28}}>
//       AxonHire's AI reads every resume, scores every match, and delivers a ranked shortlist — so recruiters stop guessing and candidates stop being overlooked.
//     </p>

//     {/* search */}
//     <div className="ha3" style={{marginBottom:16,maxWidth:440}}>
//       <div style={{display:"flex",background:"var(--bg-subtle)",border:"1.5px solid var(--border-strong)",borderRadius:8,overflow:"hidden",transition:"border-color .15s"}}
//         onFocusCapture={e=>e.currentTarget.style.borderColor="var(--accent)"}
//         onBlurCapture={e=>e.currentTarget.style.borderColor="var(--border-strong)"}
//       >
//         <div style={{display:"flex",alignItems:"center",paddingLeft:12,color:"var(--text-3)"}}>
//           <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
//         </div>
//         <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&navigate("/jobs")}
//           placeholder="Role, skill, or company…"
//           style={{flex:1,border:"none",outline:"none",background:"transparent",fontFamily:"Inter,sans-serif",fontSize:13,color:"var(--text-1)",height:44,padding:"0 10px"}}/>
//         <button onClick={()=>navigate("/jobs")} style={{margin:4,padding:"0 16px",background:"var(--accent)",color:"white",border:"none",borderRadius:5,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
//           Search jobs
//         </button>
//       </div>
//     </div>

//     {/* CTAs */}
//     <div className="ha3" style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
//       <button className="hbtn" onClick={go}
//         style={{display:"flex",alignItems:"center",gap:7,padding:"10px 22px",background:"var(--accent)",color:"white",border:"none",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 2px 10px rgba(0,87,184,.2)"}}>
//         {isLoggedIn?"Browse Jobs":"Get started free"}
//         <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
//       </button>
//       <Link to="/ai-bot" className="hlink"
//         style={{display:"flex",alignItems:"center",padding:"10px 20px",color:"var(--text-2)",border:"1px solid var(--border-strong)",borderRadius:6,fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .15s"}}>
//         Try AI Coach
//       </Link>
//     </div>

//     {/* social proof avatars */}
//     <div className="ha4" style={{display:"flex",alignItems:"center",gap:10}}>
//       <div style={{display:"flex"}}>
//         {["#0891b2","#7c3aed","#059669","#ea580c","#2563eb"].map((bg,i)=>(
//           <div key={i} style={{width:26,height:26,borderRadius:"50%",background:bg,border:"2px solid var(--bg-surface)",marginLeft:i?-7:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"white",zIndex:5-i,position:"relative"}}>
//             {String.fromCharCode(65+i)}
//           </div>
//         ))}
//       </div>
//       <span style={{fontSize:11,color:"var(--text-3)",lineHeight:1.4}}>
//         <strong style={{color:"var(--text-2)",fontWeight:600}}>12,000+</strong> professionals joined this month
//       </span>
//     </div>
//   </div>

//   {/* ── RIGHT PANEL — live pipeline preview ── */}
//   <div className="hright" style={{padding:"44px 40px 44px 48px",display:"flex",flexDirection:"column",justifyContent:"center",gap:10}}>

//     {/* mini header */}
//     <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
//       <span style={{fontSize:10,fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".07em"}}>AI-matched for you</span>
//       <button onClick={()=>navigate("/jobs")} style={{fontSize:10,color:"var(--accent)",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:0}}>See all →</button>
//     </div>

//     {/* job cards */}
//     {[
//       {title:"Frontend Engineer",  co:"Axon Labs",       sal:"₹6–10 LPA",  tag:"New",   col:"#0891b2", match:94, s:["React","TypeScript"]},
//       {title:"Data Analyst",       co:"InsightIQ",       sal:"₹5–9 LPA",   tag:"Hot",   col:"#2563eb", match:87, s:["Python","SQL"]},
//       {title:"DevOps Engineer",    co:"InfraScale",      sal:"₹12–20 LPA", tag:"",      col:"#7c3aed", match:72, s:["Docker","AWS"]},
//       {title:"Product Designer",   co:"Studio Minimal",  sal:"₹8–14 LPA",  tag:"",      col:"#ea580c", match:61, s:["Figma","UX"]},
//     ].map((j,i)=>(
//       <div key={i} className="hjob" onClick={()=>navigate("/jobs")}
//         style={{background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,opacity:1-i*.17,animation:`hfade .45s ${.1+i*.07}s both`}}>
//         <div style={{width:34,height:34,borderRadius:7,background:j.col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"white",flexShrink:0}}>{j.co[0]}</div>
//         <div style={{flex:1,minWidth:0}}>
//           <div style={{fontSize:12,fontWeight:700,color:"var(--text-1)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:1}}>{j.title}</div>
//           <div style={{fontSize:10,color:"var(--text-3)"}}>{j.co} · {j.sal}</div>
//         </div>
//         <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
//           <div style={{display:"flex",alignItems:"center",gap:4}}>
//             <div style={{width:32,height:3,borderRadius:2,background:"var(--border)",overflow:"hidden"}}>
//               <div style={{height:"100%",background:j.match>=85?"#059669":j.match>=70?"var(--accent)":"#f59e0b",width:`${j.match}%`,borderRadius:2}}/>
//             </div>
//             <span style={{fontSize:10,fontWeight:700,color:j.match>=85?"#059669":j.match>=70?"var(--accent)":"#f59e0b",fontFamily:"monospace"}}>{j.match}%</span>
//           </div>
//           <div style={{display:"flex",gap:2}}>
//             {j.s.map(s=><span key={s} style={{fontSize:8,padding:"1px 4px",borderRadius:2,background:"var(--bg-surface)",border:"1px solid var(--border)",color:"var(--text-3)"}}>{s}</span>)}
//             {j.tag&&<span style={{fontSize:8,padding:"1px 4px",borderRadius:2,background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",color:"var(--accent)",fontWeight:700}}>{j.tag}</span>}
//           </div>
//         </div>
//       </div>
//     ))}

//     {/* AI score explainer */}
//     <div style={{marginTop:4,padding:"9px 12px",borderRadius:7,background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",display:"flex",gap:9,alignItems:"flex-start"}}>
//       <svg width="13" height="13" style={{flexShrink:0,marginTop:1}} fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>
//       <span style={{fontSize:10,color:"var(--accent)",lineHeight:1.55}}>Match % = your AI fit score. Upload your resume to unlock real scores for every job.</span>
//     </div>
//   </div>
// </div>
// </section>

// {/* ══════════════════════════════════════
//     STATS BAR — dark, punchy numbers
// ══════════════════════════════════════ */}
// <div ref={statsRef} style={{background:"#0f172a",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
//   <div style={{maxWidth:1280,margin:"0 auto",padding:"20px 40px",display:"flex",alignItems:"center",justifyContent:"space-around",flexWrap:"wrap",gap:10}}>
//     {[
//       {n:`${j.toLocaleString()}+`,  l:"Active jobs",         c:"#60a5fa"},
//       {n:`${c.toLocaleString()}+`,  l:"Companies hiring",    c:"#a78bfa"},
//       {n:`${a}%`,                    l:"AI match accuracy",   c:"#34d399"},
//       {n:"< 2 min",                  l:"Time to match",       c:"#fbbf24"},
//       {n:"Free",                     l:"For candidates",      c:"#f472b6"},
//     ].map((s,i)=>(
//       <React.Fragment key={s.l}>
//         {i>0&&<div style={{width:1,height:28,background:"rgba(255,255,255,.1)"}}/>}
//         <div style={{textAlign:"center"}}>
//           <div style={{fontSize:22,fontWeight:700,color:s.c,letterSpacing:"-.03em",fontFamily:"monospace"}}>{s.n}</div>
//           <div style={{fontSize:10,color:"rgba(255,255,255,.38)",marginTop:2}}>{s.l}</div>
//         </div>
//       </React.Fragment>
//     ))}
//   </div>
// </div>

// {/* ══════════════════════════════════════
//     BODY — everything below the fold
// ══════════════════════════════════════ */}
// <div style={{maxWidth:1280,margin:"0 auto",padding:"60px 40px 72px"}}>

//   {/* ── SECTION: HOW IT WORKS ── */}
//   <div style={{textAlign:"center",marginBottom:36}}>
//     <p style={{fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:8}}>How it works</p>
//     <h2 style={{fontSize:"clamp(22px,2.8vw,32px)",fontWeight:800,letterSpacing:"-.04em",color:"var(--text-1)",marginBottom:10}}>Three steps. Everything is clear.</h2>
//     <p style={{fontSize:13,color:"var(--text-2)",maxWidth:460,margin:"0 auto",lineHeight:1.72}}>No tutorials. No onboarding emails. Every screen tells you exactly what's happening and why.</p>
//   </div>

//   <div className="h3col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:56}}>
//     {[
//       {n:"01",c:"var(--accent)",bg:"var(--accent-bg)",bc:"var(--accent-mid)",
//        title:"Upload once, matched forever",
//        body:"Drop your PDF. Our AI extracts skills, experience, and education — then scores you against every job posting, automatically.",
//        demo:<DigitizerDemo/>},
//       {n:"02",c:"#7c3aed",bg:"rgba(124,58,237,.08)",bc:"rgba(124,58,237,.25)",
//        title:"AI scores every match 0–100",
//        body:"Not keyword matching — semantic understanding. We compare what you've done against what the job needs and give a real fit score.",
//        demo:<SynapseDemo/>},
//       {n:"03",c:"#059669",bg:"rgba(5,150,105,.08)",bc:"rgba(5,150,105,.25)",
//        title:"Best candidates rise to the top",
//        body:"Recruiters see a live ranked leaderboard — highest scores first. You compete on skill, not on who applied first.",
//        demo:<LeaderboardDemo/>},
//     ].map((s,i)=>(
//       <div key={s.n} className="hcard"
//         style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:10,padding:18,display:"flex",flexDirection:"column",gap:10}}>
//         <div style={{display:"flex",alignItems:"center",gap:8}}>
//           <span style={{padding:"2px 8px",borderRadius:3,background:s.bg,border:`1px solid ${s.bc}`,fontSize:9,fontWeight:700,color:s.c,fontFamily:"monospace"}}>{s.n}</span>
//           <span style={{fontSize:12,fontWeight:700,color:"var(--text-1)"}}>{s.title}</span>
//         </div>
//         <p style={{fontSize:11,color:"var(--text-2)",lineHeight:1.68,margin:0}}>{s.body}</p>
//         {s.demo}
//       </div>
//     ))}
//   </div>

//   {/* ── SECTION: SIGNAL vs NOISE ── */}
//   <div className="h2col hcard" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:12,padding:"32px 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center",marginBottom:48}}>
//     <div>
//       <p style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:10}}>The core insight</p>
//       <h3 style={{fontSize:"clamp(18px,2.2vw,24px)",fontWeight:800,letterSpacing:"-.03em",color:"var(--text-1)",marginBottom:12,lineHeight:1.2}}>Most recruiting is just sorting noise. We remove it.</h3>
//       <p style={{fontSize:13,color:"var(--text-2)",lineHeight:1.78,marginBottom:20}}>The average recruiter spends 7 hours per job screening resumes that don't fit. AxonHire's AI does it in seconds — so your time goes to the candidates who actually matter.</p>
//       <div style={{display:"flex",flexDirection:"column",gap:9}}>
//         {[
//           {t:"Automated resume parsing",       s:"PDF → structured profile in under 2 seconds",   c:"var(--accent)"},
//           {t:"Semantic skill matching",         s:"Context-aware, not just keyword search",         c:"#7c3aed"},
//           {t:"AI score for every applicant",    s:"0–100 match score assigned automatically",       c:"#059669"},
//           {t:"Live ranked pipeline",            s:"Highest match always at the top of your list",   c:"#ea580c"},
//         ].map(f=>(
//           <div key={f.t} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
//             <div style={{width:5,height:5,borderRadius:"50%",background:f.c,flexShrink:0,marginTop:6}}/>
//             <div>
//               <div style={{fontSize:12,fontWeight:600,color:"var(--text-1)"}}>{f.t}</div>
//               <div style={{fontSize:11,color:"var(--text-3)",lineHeight:1.5}}>{f.s}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <SignalDemo/>
//   </div>

//   {/* ── SECTION: CANDIDATES vs RECRUITERS ── */}
//   <p style={{fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"var(--text-3)",textAlign:"center",marginBottom:24}}>Built for both sides</p>
//   <div className="h2col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:48}}>

//     <div className="hcard" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:12,padding:"26px 28px",position:"relative",overflow:"hidden"}}>
//       <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"var(--accent)",borderRadius:"12px 12px 0 0"}}/>
//       <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
//         <div style={{width:36,height:36,borderRadius:8,background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <svg width="16" height="16" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//         </div>
//         <div>
//           <div style={{fontSize:9,fontWeight:700,color:"var(--accent)",letterSpacing:".07em",textTransform:"uppercase"}}>For candidates</div>
//           <div style={{fontSize:14,fontWeight:800,color:"var(--text-1)",letterSpacing:"-.02em"}}>Land jobs you actually fit</div>
//         </div>
//       </div>
//       <p style={{fontSize:12,color:"var(--text-2)",lineHeight:1.72,marginBottom:18}}>Upload once. See your AI score for every role before you even apply. Stop sending your resume into the void.</p>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:20}}>
//         {["AI resume analysis","Match score per job","One-click apply","Interview AI coach"].map(f=>(
//           <div key={f} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"var(--text-2)",padding:"6px 8px",borderRadius:5,background:"var(--bg-subtle)",border:"1px solid var(--border)"}}>
//             <svg width="10" height="10" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//             {f}
//           </div>
//         ))}
//       </div>
//       <button className="hbtn" onClick={()=>navigate(isLoggedIn?"/jobs":"/register")}
//         style={{padding:"8px 20px",background:"var(--accent)",color:"white",border:"none",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
//         {isLoggedIn?"Browse jobs":"Start free"}
//       </button>
//     </div>

//     <div className="hcard" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:12,padding:"26px 28px",position:"relative",overflow:"hidden"}}>
//       <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"#7c3aed",borderRadius:"12px 12px 0 0"}}/>
//       <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
//         <div style={{width:36,height:36,borderRadius:8,background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <svg width="16" height="16" fill="none" stroke="#7c3aed" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
//         </div>
//         <div>
//           <div style={{fontSize:9,fontWeight:700,color:"#7c3aed",letterSpacing:".07em",textTransform:"uppercase"}}>For recruiters</div>
//           <div style={{fontSize:14,fontWeight:800,color:"var(--text-1)",letterSpacing:"-.02em"}}>Hire 10× faster, miss nobody</div>
//         </div>
//       </div>
//       <p style={{fontSize:12,color:"var(--text-2)",lineHeight:1.72,marginBottom:18}}>Post a job and get a ranked shortlist in minutes. AI scores every applicant. You spend time on real conversations, not CV sorting.</p>
//       <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:20}}>
//         {["AI ranks all applicants","Kanban pipeline","Batch AI scoring","Excel export"].map(f=>(
//           <div key={f} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"var(--text-2)",padding:"6px 8px",borderRadius:5,background:"var(--bg-subtle)",border:"1px solid var(--border)"}}>
//             <svg width="10" height="10" fill="none" stroke="#7c3aed" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//             {f}
//           </div>
//         ))}
//       </div>
//       <button className="hbtn" onClick={()=>navigate("/post-job")}
//         style={{padding:"8px 20px",background:"rgba(124,58,237,.08)",color:"#7c3aed",border:"1px solid rgba(124,58,237,.3)",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
//         Post a job
//       </button>
//     </div>
//   </div>

//   {/* ── AI COACH BANNER ── */}
//   <div className="hcard" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:12,padding:"24px 32px",display:"flex",alignItems:"center",gap:24,marginBottom:48,flexWrap:"wrap"}}>
//     <div style={{width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,var(--accent-bg),rgba(124,58,237,.06))",border:"1px solid var(--accent-mid)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
//       <svg width="20" height="20" fill="none" stroke="var(--accent)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>
//     </div>
//     <div style={{flex:1,minWidth:240}}>
//       <div style={{fontSize:9,fontWeight:700,color:"var(--accent)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:4}}>Free AI Interview Coach</div>
//       <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",letterSpacing:"-.02em",marginBottom:4}}>Prepare for any interview — right now</div>
//       <p style={{fontSize:12,color:"var(--text-2)",lineHeight:1.65,margin:0}}>Ask anything: mock questions, salary negotiation, how to explain a gap, cover letter help. It's free and instant.</p>
//     </div>
//     <Link to="/ai-bot" className="hbtn"
//       style={{padding:"10px 24px",background:"var(--accent)",color:"white",borderRadius:7,fontSize:13,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0,display:"inline-block"}}>
//       Open AI Coach →
//     </Link>
//   </div>

//   {/* ── TRUST GRID ── */}
//   <div className="htrust" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:56}}>
//     {[
//       {icon:<svg width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
//        t:"Your data is safe",s:"Resumes stored securely, never shared without consent."},
//       {icon:<svg width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
//        t:"Results in seconds",s:"AI scoring runs the moment you apply — no waiting."},
//       {icon:<svg width="18" height="18" fill="none" stroke="#059669" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//        t:"Fair matching",s:"Skills and experience only — never demographics."},
//       {icon:<svg width="18" height="18" fill="none" stroke="#7c3aed" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
//        t:"Full transparency",s:"See exactly which skills drove your AI score."},
//     ].map(t=>(
//       <div key={t.t} className="hcard" style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:9,padding:"16px 14px"}}>
//         <div style={{marginBottom:10}}>{t.icon}</div>
//         <div style={{fontSize:12,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{t.t}</div>
//         <div style={{fontSize:11,color:"var(--text-3)",lineHeight:1.55}}>{t.s}</div>
//       </div>
//     ))}
//   </div>

//   {/* ── FINAL CTA ── */}
//   <div style={{background:"#0f172a",borderRadius:14,padding:"44px 52px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap",position:"relative",overflow:"hidden"}}>
//     <div style={{position:"absolute",right:-50,top:-50,width:200,height:200,borderRadius:"50%",background:"rgba(99,102,241,.08)",pointerEvents:"none"}}/>
//     <div style={{position:"absolute",left:-30,bottom:-60,width:180,height:180,borderRadius:"50%",background:"rgba(5,150,105,.06)",pointerEvents:"none"}}/>
//     <div style={{position:"relative"}}>
//       <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Ready to get started?</div>
//       <h3 style={{fontSize:"clamp(18px,2.2vw,26px)",fontWeight:800,color:"white",letterSpacing:"-.03em",marginBottom:8}}>Find your fit today.</h3>
//       <p style={{fontSize:13,color:"rgba(255,255,255,.42)",lineHeight:1.65,maxWidth:400,margin:0}}>Free for candidates. No credit card. Takes under 2 minutes to create your profile and start seeing your match scores.</p>
//     </div>
//     <div style={{display:"flex",gap:10,flexWrap:"wrap",flexShrink:0,position:"relative"}}>
//       <button className="hbtn" onClick={go}
//         style={{padding:"11px 28px",background:"var(--accent)",color:"white",border:"none",borderRadius:7,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 18px rgba(0,87,184,.3)"}}>
//         {isLoggedIn?"Go to Jobs":"Sign up free"}
//       </button>
//       <Link to="/ai-bot" className="hlink"
//         style={{padding:"11px 22px",background:"transparent",color:"rgba(255,255,255,.55)",border:"1px solid rgba(255,255,255,.14)",borderRadius:7,fontSize:13,fontWeight:500,textDecoration:"none",display:"inline-block",transition:"all .15s"}}>
//         Try AI Coach
//       </Link>
//     </div>
//   </div>

// </div>

// {/* ── FOOTER ── */}
// <footer style={{borderTop:"1px solid var(--border)",background:"var(--bg-surface)",padding:"20px 40px"}}>
//   <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
//     <div style={{display:"flex",alignItems:"center",gap:8}}>
//       <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
//         <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
//         <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
//         <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
//         <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
//         <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
//       </svg>
//       <span style={{fontSize:13,fontWeight:700,color:"var(--text-1)",letterSpacing:"-.02em"}}>Axon<span style={{color:"var(--accent)"}}>Hire</span></span>
//     </div>
//     <div style={{display:"flex",gap:20}}>
//       {[["Jobs","/jobs"],["Post a Job","/post-job"],["AI Coach","/ai-bot"],["Dashboard","/recruiter-dashboard"],["Feedback","/feedback"]].map(([l,h])=>(
//         <Link key={l} to={h} className="hft" style={{fontSize:11,color:"var(--text-3)",textDecoration:"none"}}>{l}</Link>
//       ))}
//     </div>
//     <p style={{fontSize:10,color:"var(--text-3)"}}>© 2026 AxonHire · System operational</p>
//   </div>
// </footer>

//     </div>
//   );
// }



////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function useVisible(thresh = 0.12) {
//   const ref = useRef(null);
//   const [vis, setVis] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: thresh });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [thresh]);
//   return [ref, vis];
// }

// function useCountUp(target, dur = 1400, go = false) {
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (!go) return;
//     let t0 = null;
//     const step = (ts) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / dur, 1); setV(Math.floor(p * target)); if (p < 1) requestAnimationFrame(step); };
//     requestAnimationFrame(step);
//   }, [target, dur, go]);
//   return v;
// }

// // ── SVG ILLUSTRATION: AI Brain / Neural Network ──
// function AIBrainIllustration() {
//   return (
//     <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "100%" }}>
//       <style>{`
//         @keyframes pulse-node { 0%,100%{r:7;opacity:1} 50%{r:9;opacity:.7} }
//         @keyframes pulse-node2 { 0%,100%{r:5;opacity:.8} 50%{r:7;opacity:.5} }
//         @keyframes flow-line { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
//         @keyframes orbit { from{transform:rotate(0deg) translateX(58px) rotate(0deg)} to{transform:rotate(360deg) translateX(58px) rotate(-360deg)} }
//         @keyframes orbit2 { from{transform:rotate(120deg) translateX(42px) rotate(-120deg)} to{transform:rotate(480deg) translateX(42px) rotate(-480deg)} }
//         @keyframes orbit3 { from{transform:rotate(240deg) translateX(34px) rotate(-240deg)} to{transform:rotate(600deg) translateX(34px) rotate(-600deg)} }
//         @keyframes float-card { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
//         @keyframes score-fill { from{width:0} to{width:88%} }
//         @keyframes score-fill2 { from{width:0} to{width:72%} }
//         @keyframes score-fill3 { from{width:0} to{width:94%} }
//         @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
//         .n1{animation:pulse-node 2.2s ease-in-out infinite}
//         .n2{animation:pulse-node 2.2s .4s ease-in-out infinite}
//         .n3{animation:pulse-node 2.2s .8s ease-in-out infinite}
//         .n4{animation:pulse-node 2.2s 1.2s ease-in-out infinite}
//         .n5{animation:pulse-node2 2.8s .6s ease-in-out infinite}
//         .n6{animation:pulse-node2 2.8s 1.1s ease-in-out infinite}
//         .n7{animation:pulse-node2 2.8s 1.6s ease-in-out infinite}
//         .l1{stroke-dasharray:200;animation:flow-line 3s linear infinite}
//         .l2{stroke-dasharray:200;animation:flow-line 3s .5s linear infinite}
//         .l3{stroke-dasharray:200;animation:flow-line 3s 1s linear infinite}
//         .l4{stroke-dasharray:200;animation:flow-line 3s 1.5s linear infinite}
//         .card1{animation:float-card 4s ease-in-out infinite}
//         .card2{animation:float-card 4s .8s ease-in-out infinite}
//         .sf1{animation:score-fill 2s .5s both}
//         .sf2{animation:score-fill2 2s .8s both}
//         .sf3{animation:score-fill3 2s 1.1s both}
//       `}</style>

//       {/* Background grid */}
//       <defs>
//         <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
//           <path d="M28 0H0V28" fill="none" stroke="#0057B812" strokeWidth="0.5"/>
//         </pattern>
//       </defs>
//       <rect width="420" height="320" fill="url(#grid)" rx="16"/>

//       {/* Center brain circle */}
//       <circle cx="210" cy="155" r="52" fill="#0057B808" stroke="#0057B830" strokeWidth="1.5"/>
//       <circle cx="210" cy="155" r="38" fill="#0057B810" stroke="#0057B840" strokeWidth="1"/>
//       <circle cx="210" cy="155" r="24" fill="#0057B818" stroke="#0057B860" strokeWidth="1"/>

//       {/* Orbiting dots */}
//       <g style={{ transformOrigin: "210px 155px" }}>
//         <circle className="n1" cx="268" cy="155" r="7" fill="#0057B8" opacity=".9"/>
//       </g>
//       <g style={{ transformOrigin: "210px 155px", animation: "orbit2 5s linear infinite" }}>
//         <circle cx="252" cy="119" r="5" fill="#7c3aed" opacity=".8"/>
//       </g>
//       <g style={{ transformOrigin: "210px 155px", animation: "orbit3 7s linear infinite" }}>
//         <circle cx="176" cy="130" r="4" fill="#059669" opacity=".7"/>
//       </g>

//       {/* Neural connection lines */}
//       <line className="l1" x1="80" y1="80" x2="210" y2="155" stroke="#0057B850" strokeWidth="1.2"/>
//       <line className="l2" x1="340" y1="70" x2="210" y2="155" stroke="#7c3aed50" strokeWidth="1.2"/>
//       <line className="l3" x1="60" y1="240" x2="210" y2="155" stroke="#0057B850" strokeWidth="1.2"/>
//       <line className="l4" x1="360" y1="250" x2="210" y2="155" stroke="#05966950" strokeWidth="1.2"/>
//       <line className="l1" x1="210" y1="30" x2="210" y2="155" stroke="#7c3aed40" strokeWidth="1"/>

//       {/* Nodes */}
//       <circle className="n2" cx="80" cy="80" r="7" fill="#0057B8"/>
//       <circle className="n3" cx="340" cy="70" r="6" fill="#7c3aed"/>
//       <circle className="n4" cx="60" cy="240" r="7" fill="#0057B8"/>
//       <circle className="n5" cx="360" cy="250" r="5" fill="#059669"/>
//       <circle className="n6" cx="210" cy="30" r="6" fill="#7c3aed"/>
//       <circle className="n7" cx="380" cy="155" r="5" fill="#0057B8"/>

//       {/* Secondary connections */}
//       <line x1="80" y1="80" x2="340" y2="70" stroke="#0057B820" strokeWidth="0.8"/>
//       <line x1="60" y1="240" x2="360" y2="250" stroke="#0057B820" strokeWidth="0.8"/>
//       <line x1="80" y1="80" x2="60" y2="240" stroke="#0057B815" strokeWidth="0.6"/>

//       {/* Brain icon in center */}
//       <g transform="translate(197,143)">
//         <path d="M13 2C9.5 2 7 4.5 7 7.5c0 .5.1 1 .2 1.5C5.4 9.7 4 11.2 4 13c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4 0-1.8-1.4-3.3-3.2-3.9.1-.5.2-1 .2-1.5C19 4.5 16.5 2 13 2z" fill="#0057B8" opacity=".9"/>
//         <line x1="13" y1="6" x2="13" y2="10" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
//         <line x1="10" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
//       </g>

//       {/* Floating card 1 — Resume score */}
//       <g className="card1" transform="translate(0,0)">
//         <rect x="12" y="108" width="120" height="72" rx="9" fill="white" stroke="#0057B825" strokeWidth="1"/>
//         <rect x="12" y="108" width="120" height="72" rx="9" fill="#0057B806"/>
//         <circle cx="32" cy="128" r="10" fill="#0057B815"/>
//         <path d="M28 128.5 l3 3 5-5" stroke="#0057B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//         <rect x="48" y="122" width="60" height="4" rx="2" fill="#0057B820"/>
//         <rect x="48" y="130" width="40" height="3" rx="1.5" fill="#0057B810"/>
//         <text x="22" y="156" fontSize="8" fill="#0057B880" fontFamily="Inter,sans-serif" fontWeight="600">MATCH SCORE</text>
//         <rect x="22" y="160" width="82" height="6" rx="3" fill="#0057B815"/>
//         <rect x="22" y="160" className="sf3" height="6" rx="3" fill="#0057B8"/>
//         <text x="108" y="166" fontSize="8" fill="#059669" fontFamily="monospace" fontWeight="700">94%</text>
//       </g>

//       {/* Floating card 2 — AI ranked */}
//       <g className="card2" transform="translate(0,0)">
//         <rect x="288" y="98" width="118" height="80" rx="9" fill="white" stroke="#7c3aed25" strokeWidth="1"/>
//         <rect x="288" y="98" width="118" height="80" rx="9" fill="#7c3aed05"/>
//         <text x="298" y="115" fontSize="8" fill="#7c3aed" fontFamily="Inter,sans-serif" fontWeight="700">AI RANKED</text>
//         {[
//           { name: "B. Jones", score: "92%", w: "sf3", color: "#059669", y: 0 },
//           { name: "A. Smith", score: "85%", w: "sf1", color: "#0057B8", y: 20 },
//           { name: "C. Lee",   score: "71%", w: "sf2", color: "#f59e0b", y: 40 },
//         ].map((r, i) => (
//           <g key={i} transform={`translate(0,${r.y})`}>
//             <circle cx="302" cy="129" r="7" fill={r.color} opacity=".15"/>
//             <text x="299" y="132" fontSize="7" fill={r.color} fontFamily="Inter,sans-serif" fontWeight="700">{i+1}</text>
//             <text x="314" y="132" fontSize="8" fill="#1e293b" fontFamily="Inter,sans-serif">{r.name}</text>
//             <text x="378" y="132" fontSize="8" fill={r.color} fontFamily="monospace" fontWeight="700">{r.score}</text>
//           </g>
//         ))}
//       </g>

//       {/* Bottom card — live hiring */}
//       <rect x="110" y="244" width="200" height="52" rx="9" fill="white" stroke="#05966925" strokeWidth="1"/>
//       <circle cx="130" cy="262" r="8" fill="#05966915"/>
//       <path d="M127 262 l2.5 2.5 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//       <text x="144" y="258" fontSize="9" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="700">HIRE FASTER</text>
//       <text x="144" y="270" fontSize="8" fill="#64748b" fontFamily="Inter,sans-serif">4,200+ jobs · AI-matched</text>
//       <rect x="120" y="278" width="160" height="4" rx="2" fill="#05966915"/>
//       <rect x="120" y="278" width="140" height="4" rx="2" fill="#059669" opacity=".5"/>
//     </svg>
//   );
// }

// // ── SVG ILLUSTRATION: How AI Scoring Works ──
// function ScoringIllustration() {
//   return (
//     <svg viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
//       <style>{`
//         @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
//         @keyframes check-draw { from{stroke-dashoffset:30} to{stroke-dashoffset:0} }
//         @keyframes fade-tag { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:none} }
//         .sl{animation:scanline 2.5s linear infinite}
//         .ck{stroke-dasharray:30;animation:check-draw .4s 1.5s both}
//         .ck2{stroke-dasharray:30;animation:check-draw .4s 1.8s both}
//         .ck3{stroke-dasharray:30;animation:check-draw .4s 2.1s both}
//         .tg1{animation:fade-tag .4s 1.5s both}
//         .tg2{animation:fade-tag .4s 1.8s both}
//         .tg3{animation:fade-tag .4s 2.1s both}
//       `}</style>

//       {/* Resume doc */}
//       <rect x="20" y="30" width="100" height="128" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
//       <circle cx="44" cy="52" r="10" fill="#0057B815"/>
//       <rect x="60" y="46" width="50" height="5" rx="2.5" fill="#0057B820"/>
//       <rect x="60" y="55" width="35" height="3" rx="1.5" fill="#e2e8f0"/>
//       <rect x="28" y="74" width="84" height="3" rx="1.5" fill="#e2e8f0"/>
//       <rect x="28" y="82" width="84" height="3" rx="1.5" fill="#e2e8f0"/>
//       <rect x="28" y="90" width="60" height="3" rx="1.5" fill="#e2e8f0"/>
//       <rect x="28" y="104" width="84" height="3" rx="1.5" fill="#0057B815"/>
//       <rect x="28" y="112" width="70" height="3" rx="1.5" fill="#0057B815"/>
//       <rect x="28" y="120" width="84" height="3" rx="1.5" fill="#7c3aed15"/>
//       <rect x="28" y="128" width="50" height="3" rx="1.5" fill="#7c3aed15"/>
//       {/* scan line */}
//       <clipPath id="docClip"><rect x="20" y="30" width="100" height="128" rx="8"/></clipPath>
//       <rect x="20" y="30" width="100" height="3" fill="#0057B840" clipPath="url(#docClip)" className="sl"/>

//       {/* Arrow */}
//       <path d="M128 94 L158 94" stroke="#0057B850" strokeWidth="1.5" strokeDasharray="4 3"/>
//       <path d="M153 90 L158 94 L153 98" stroke="#0057B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

//       {/* AI Box */}
//       <rect x="162" y="68" width="56" height="52" rx="10" fill="#0057B8"/>
//       <text x="190" y="88" fontSize="9" fill="white" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">AI</text>
//       <text x="190" y="100" fontSize="7" fill="white" opacity=".7" fontFamily="Inter,sans-serif" textAnchor="middle">scoring</text>
//       <text x="190" y="112" fontSize="7" fill="white" opacity=".7" fontFamily="Inter,sans-serif" textAnchor="middle">engine</text>
//       {/* pulsing ring */}
//       <circle cx="190" cy="94" r="28" fill="none" stroke="#0057B840" strokeWidth="8" opacity=".5"/>

//       {/* Arrow out */}
//       <path d="M222 94 L252 94" stroke="#0057B850" strokeWidth="1.5" strokeDasharray="4 3"/>
//       <path d="M247 90 L252 94 L247 98" stroke="#0057B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

//       {/* Output tags */}
//       <g className="tg1">
//         <rect x="256" y="34" width="100" height="22" rx="5" fill="#05966910" stroke="#05966940" strokeWidth="1"/>
//         <polyline className="ck" points="266,45 270,49 278,41" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//         <text x="284" y="49" fontSize="9" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="600">Skills match</text>
//       </g>
//       <g className="tg2">
//         <rect x="256" y="62" width="100" height="22" rx="5" fill="#0057B810" stroke="#0057B840" strokeWidth="1"/>
//         <polyline className="ck2" points="266,73 270,77 278,69" stroke="#0057B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//         <text x="284" y="77" fontSize="9" fill="#0057B8" fontFamily="Inter,sans-serif" fontWeight="600">Experience</text>
//       </g>
//       <g className="tg3">
//         <rect x="256" y="90" width="100" height="22" rx="5" fill="#7c3aed10" stroke="#7c3aed40" strokeWidth="1"/>
//         <polyline className="ck3" points="266,101 270,105 278,97" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//         <text x="284" y="105" fontSize="9" fill="#7c3aed" fontFamily="Inter,sans-serif" fontWeight="600">Culture fit</text>
//       </g>

//       {/* Score badge */}
//       <rect x="276" y="126" width="60" height="36" rx="8" fill="#0057B8"/>
//       <text x="306" y="140" fontSize="8" fill="white" opacity=".8" fontFamily="Inter,sans-serif" textAnchor="middle">SCORE</text>
//       <text x="306" y="155" fontSize="16" fill="white" fontFamily="monospace" fontWeight="700" textAnchor="middle">94%</text>

//       {/* Bottom label */}
//       <text x="190" y="210" fontSize="10" fill="#64748b" fontFamily="Inter,sans-serif" textAnchor="middle">Resume → AI Analysis → Match Score</text>
//     </svg>
//   );
// }

// // ── SVG ILLUSTRATION: Pipeline / Kanban preview ──
// function PipelineIllustration() {
//   return (
//     <svg viewBox="0 0 400 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
//       <style>{`
//         @keyframes card-move { 0%{transform:translateX(0)} 60%{transform:translateX(82px)} 100%{transform:translateX(82px)} }
//         @keyframes card-appear { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
//         @keyframes highlight-col { 0%,100%{fill:#0057B808} 50%{fill:#0057B815} }
//         .cm1{animation:card-move 4s 1s ease-in-out infinite}
//         .ca1{animation:card-appear .5s .3s both}
//         .ca2{animation:card-appear .5s .5s both}
//         .ca3{animation:card-appear .5s .7s both}
//         .ca4{animation:card-appear .5s .9s both}
//       `}</style>

//       {/* Column headers */}
//       {[
//         { x: 8,   label: "New",         color: "#6366f1", count: 3 },
//         { x: 90,  label: "Viewed",      color: "#3b82f6", count: 2 },
//         { x: 172, label: "Shortlisted", color: "#10b981", count: 2 },
//         { x: 254, label: "Interview",   color: "#a855f7", count: 1 },
//         { x: 336, label: "Hired",       color: "#06b6d4", count: 1 },
//       ].map((col, i) => (
//         <g key={i}>
//           <rect x={col.x} y="8" width="74" height="182" rx="7" fill={`${col.color}08`} stroke={`${col.color}25`} strokeWidth="1"/>
//           <rect x={col.x} y="8" width="74" height="26" rx="7" fill={`${col.color}15`}/>
//           <rect x={col.x + 7} y="8" width="74" height="8" rx="0" fill={`${col.color}15`}/>
//           <text x={col.x + 37} y="24" fontSize="8" fill={col.color} fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">{col.label}</text>
//           <circle cx={col.x + 60} cy="20" r="7" fill={`${col.color}20`}/>
//           <text x={col.x + 60} y="23" fontSize="8" fill={col.color} fontFamily="monospace" fontWeight="700" textAnchor="middle">{col.count}</text>
//         </g>
//       ))}

//       {/* Cards in New column */}
//       {[
//         { y: 42,  name: "A. Smith", score: 94, color: "#059669" },
//         { y: 76,  name: "B. Jones", score: 87, color: "#0057B8" },
//         { y: 110, name: "C. Lee",   score: 71, color: "#f59e0b" },
//       ].map((card, i) => (
//         <g key={i} className={`ca${i+1}`}>
//           <rect x="12" y={card.y} width="66" height="28" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
//           <circle cx="24" cy={card.y + 14} r="7" fill={`${card.color}20`}/>
//           <text x="24" y={card.y + 17} fontSize="7" fill={card.color} fontFamily="monospace" fontWeight="700" textAnchor="middle">{card.name[0]}</text>
//           <text x="34" y={card.y + 12} fontSize="7" fill="#334155" fontFamily="Inter,sans-serif" fontWeight="600">{card.name}</text>
//           <text x="34" y={card.y + 22} fontSize="7" fill={card.color} fontFamily="monospace" fontWeight="700">{card.score}%</text>
//         </g>
//       ))}

//       {/* Moving card animation */}
//       <g className="cm1">
//         <rect x="12" y="42" width="66" height="28" rx="5" fill="#0057B8" stroke="#0057B8" strokeWidth="1" opacity=".15"/>
//       </g>

//       {/* Cards in Shortlisted */}
//       {[
//         { y: 42, name: "X. Wang", score: 91 },
//         { y: 76, name: "D. Patel", score: 83 },
//       ].map((card, i) => (
//         <g key={i} className="ca3">
//           <rect x="176" y={card.y} width="66" height="28" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
//           <circle cx="188" cy={card.y + 14} r="7" fill="#10b98120"/>
//           <text x="188" y={card.y + 17} fontSize="7" fill="#10b981" fontFamily="monospace" fontWeight="700" textAnchor="middle">{card.name[0]}</text>
//           <text x="198" y={card.y + 12} fontSize="7" fill="#334155" fontFamily="Inter,sans-serif" fontWeight="600">{card.name}</text>
//           <text x="198" y={card.y + 22} fontSize="7" fill="#10b981" fontFamily="monospace" fontWeight="700">{card.score}%</text>
//         </g>
//       ))}

//       {/* Hired card */}
//       <g className="ca4">
//         <rect x="340" y="42" width="66" height="28" rx="5" fill="#06b6d410" stroke="#06b6d440" strokeWidth="1"/>
//         <circle cx="352" cy="56" r="7" fill="#06b6d420"/>
//         <path d="M349 56 l2.5 2.5 4-4" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//         <text x="362" y="53" fontSize="7" fill="#06b6d4" fontFamily="Inter,sans-serif" fontWeight="600">E. Kim</text>
//         <text x="362" y="63" fontSize="7" fill="#06b6d4" fontFamily="monospace" fontWeight="700">HIRED ✓</text>
//       </g>
//     </svg>
//   );
// }

// // ── LOGO SVG ──
// function AxonLogo({ size = 28, showText = true }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
//         <circle cx="16" cy="16" r="14" stroke="#0057B8" strokeWidth="1.5" fill="#0057B808"/>
//         {/* A shape made of neural nodes */}
//         <circle cx="16" cy="7" r="2.5" fill="#0057B8"/>
//         <circle cx="9" cy="23" r="2" fill="#0057B8"/>
//         <circle cx="23" cy="23" r="2" fill="#0057B8"/>
//         <circle cx="12.5" cy="17" r="1.5" fill="#7c3aed"/>
//         <circle cx="19.5" cy="17" r="1.5" fill="#7c3aed"/>
//         {/* Lines */}
//         <line x1="16" y1="9.5" x2="9" y2="21" stroke="#0057B8" strokeWidth="1.5" strokeLinecap="round"/>
//         <line x1="16" y1="9.5" x2="23" y2="21" stroke="#0057B8" strokeWidth="1.5" strokeLinecap="round"/>
//         <line x1="11.8" y1="17.5" x2="20.2" y2="17.5" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round"/>
//       </svg>
//       {showText && (
//         <span style={{ fontSize: size * 0.57, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "Inter,sans-serif", color: "var(--text-1)" }}>
//           Axon<span style={{ color: "#0057B8" }}>Hire</span>
//         </span>
//       )}
//     </div>
//   );
// }

// export default function Home() {
//   const { isLoggedIn, user } = useAuth();
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [statsRef, statsVis] = useVisible(0.2);
//   const [heroRef, heroVis] = useVisible(0.1);
//   const [howRef, howVis] = useVisible(0.1);
//   const [pipeRef, pipeVis] = useVisible(0.1);
//   const [whoRef, whoVis] = useVisible(0.1);

//   const j = useCountUp(4200, 1400, statsVis);
//   const c = useCountUp(1800, 1600, statsVis);
//   const a = useCountUp(94, 1000, statsVis);

//   const go = () => {
//     if (isLoggedIn) { user?.role === "recruiter" ? navigate("/recruiter-dashboard") : navigate("/jobs"); }
//     else navigate("/register");
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "Inter,sans-serif" }}>
//       <style>{`
//         @keyframes hf { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
//         @keyframes hb { from{transform:scaleX(0)} to{transform:scaleX(1)} }
//         @keyframes hp { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)} 50%{box-shadow:0 0 0 7px rgba(34,197,94,.04)} }
//         @keyframes hglow { 0%,100%{opacity:.5} 50%{opacity:1} }
//         .ha0{animation:hf .55s .05s both} .ha1{animation:hf .55s .15s both}
//         .ha2{animation:hf .55s .25s both} .ha3{animation:hf .55s .35s both}
//         .ha4{animation:hf .55s .45s both} .ha5{animation:hf .55s .55s both}
//         .hbtn{transition:all .15s}
//         .hbtn:hover{filter:brightness(1.1);transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,87,184,.28)!important}
//         .hsec{transition:all .15s;cursor:pointer}
//         .hsec:hover{border-color:#0057B8!important;transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,87,184,.09)!important}
//         .hjob{transition:all .15s;cursor:pointer}
//         .hjob:hover{border-color:#0057B8!important;transform:translateX(4px)}
//         .hlink{transition:all .15s}
//         .hlink:hover{border-color:#0057B8!important;color:#0057B8!important}
//         .hft{transition:color .15s}
//         .hft:hover{color:#0057B8!important}
//         @media(max-width:860px){
//           .hgrid{grid-template-columns:1fr!important}
//           .hleft{border-right:none!important;border-bottom:1px solid var(--border);padding:36px 20px!important}
//           .hright{padding:32px 20px!important}
//           .h3col{grid-template-columns:1fr!important}
//           .h2col{grid-template-columns:1fr!important}
//         }
//       `}</style>

//       {/* ══ HERO ══ */}
//       <section style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
//         <div className="hgrid" ref={heroRef} style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "52fr 48fr", minHeight: 560 }}>

//           {/* Left */}
//           <div className="hleft" style={{ padding: "52px 48px 52px 40px", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//             <div className="ha0" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)", width: "fit-content", marginBottom: 22 }}>
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "hp 2s infinite", display: "inline-block" }}/>
//               <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", letterSpacing: ".03em" }}>AxonHire is live · 4,200+ open jobs</span>
//             </div>

//             <h1 className="ha1" style={{ fontSize: "clamp(32px,4.2vw,48px)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1.08, color: "var(--text-1)", marginBottom: 6 }}>
//               The AI layer between
//             </h1>
//             <h1 className="ha1" style={{ fontSize: "clamp(30px,3.8vw,44px)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 1.08, color: "#0057B8", marginBottom: 6 }}>
//               talent and opportunity.
//             </h1>
//             <div className="ha1" style={{ width: 52, height: 3, background: "#0057B8", borderRadius: 2, marginBottom: 18, transformOrigin: "left", animation: "hb .7s .3s both" }}/>

//             <p className="ha2" style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.78, maxWidth: 400, marginBottom: 28 }}>
//               AxonHire reads every resume, scores every match 0–100, and delivers a ranked shortlist — so recruiters stop guessing and candidates stop being overlooked.
//             </p>

//             {/* Search */}
//             <div className="ha3" style={{ marginBottom: 16, maxWidth: 440 }}>
//               <div style={{ display: "flex", background: "var(--bg-subtle)", border: "1.5px solid var(--border-strong)", borderRadius: 8, overflow: "hidden", transition: "border-color .15s" }}
//                 onFocusCapture={e => e.currentTarget.style.borderColor = "#0057B8"}
//                 onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
//               >
//                 <div style={{ display: "flex", alignItems: "center", paddingLeft: 12, color: "var(--text-3)" }}>
//                   <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
//                 </div>
//                 <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && navigate("/jobs")}
//                   placeholder="Role, skill, or company…"
//                   style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-1)", height: 44, padding: "0 10px" }}/>
//                 <button onClick={() => navigate("/jobs")} style={{ margin: 4, padding: "0 16px", background: "#0057B8", color: "white", border: "none", borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
//                   Search
//                 </button>
//               </div>
//             </div>

//             <div className="ha3" style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 24 }}>
//               <button className="hbtn" onClick={go}
//                 style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 22px", background: "#0057B8", color: "white", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 12px rgba(0,87,184,.22)" }}>
//                 {isLoggedIn ? "Browse Jobs" : "Get started — free"}
//                 <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
//               </button>
//               <Link to="/ai-bot" className="hlink"
//                 style={{ display: "flex", alignItems: "center", padding: "10px 20px", color: "var(--text-2)", border: "1px solid var(--border-strong)", borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
//                 Try AI Coach
//               </Link>
//             </div>

//             {/* Social proof */}
//             <div className="ha4" style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <div style={{ display: "flex" }}>
//                 {["#0891b2","#7c3aed","#059669","#ea580c","#2563eb"].map((bg, i) => (
//                   <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: bg, border: "2px solid var(--bg-surface)", marginLeft: i ? -7 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white", position: "relative", zIndex: 5 - i }}>
//                     {String.fromCharCode(65 + i)}
//                   </div>
//                 ))}
//               </div>
//               <span style={{ fontSize: 11, color: "var(--text-3)" }}>
//                 <strong style={{ color: "var(--text-2)", fontWeight: 600 }}>12,000+</strong> professionals joined this month
//               </span>
//             </div>
//           </div>

//           {/* Right — AI Brain illustration + job cards */}
//           <div className="hright" style={{ padding: "28px 28px 28px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
//             <div style={{ borderRadius: 12, background: "var(--bg-subtle)", border: "1px solid var(--border)", padding: "12px 8px 0px", marginBottom: 4 }}>
//               <AIBrainIllustration />
//             </div>

//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
//               <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".07em" }}>AI-matched for your profile</span>
//               <button onClick={() => navigate("/jobs")} style={{ fontSize: 10, color: "#0057B8", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>See all →</button>
//             </div>

//             {[
//               { title: "Frontend Engineer", co: "Axon Labs",   sal: "₹6–10 LPA",  col: "#0891b2", match: 94, tag: "New" },
//               { title: "Data Analyst",      co: "InsightIQ",   sal: "₹5–9 LPA",   col: "#2563eb", match: 87, tag: "Hot" },
//               { title: "DevOps Engineer",   co: "InfraScale",  sal: "₹12–20 LPA", col: "#7c3aed", match: 72, tag: ""    },
//             ].map((jb, i) => (
//               <div key={i} className="hjob" onClick={() => navigate("/jobs")}
//                 style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, opacity: 1 - i * .18 }}>
//                 <div style={{ width: 32, height: 32, borderRadius: 7, background: jb.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>{jb.co[0]}</div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{jb.title}</div>
//                   <div style={{ fontSize: 10, color: "var(--text-3)" }}>{jb.co} · {jb.sal}</div>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                     <div style={{ width: 44, height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
//                       <div style={{ height: "100%", background: jb.match >= 85 ? "#059669" : jb.match >= 70 ? "#0057B8" : "#f59e0b", width: `${jb.match}%`, borderRadius: 2 }}/>
//                     </div>
//                     <span style={{ fontSize: 11, fontWeight: 700, color: jb.match >= 85 ? "#059669" : jb.match >= 70 ? "#0057B8" : "#f59e0b", fontFamily: "monospace" }}>{jb.match}%</span>
//                   </div>
//                   {jb.tag && <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: "#0057B810", border: "1px solid #0057B830", color: "#0057B8", fontWeight: 700 }}>{jb.tag}</span>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ STATS ══ */}
//       <div ref={statsRef} style={{ background: "#0f172a", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 10 }}>
//           {[
//             { n: `${j.toLocaleString()}+`, l: "Active jobs",        c: "#60a5fa" },
//             { n: `${c.toLocaleString()}+`, l: "Companies hiring",   c: "#a78bfa" },
//             { n: `${a}%`,                   l: "AI match accuracy",  c: "#34d399" },
//             { n: "< 2 min",                 l: "Time to first match",c: "#fbbf24" },
//             { n: "Free",                    l: "For candidates",     c: "#f472b6" },
//           ].map((s, i) => (
//             <React.Fragment key={s.l}>
//               {i > 0 && <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.1)" }}/>}
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontSize: 24, fontWeight: 700, color: s.c, letterSpacing: "-.03em", fontFamily: "monospace" }}>{s.n}</div>
//                 <div style={{ fontSize: 10, color: "rgba(255,255,255,.38)", marginTop: 2 }}>{s.l}</div>
//               </div>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* ══ BODY ══ */}
//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 40px 72px" }}>

//         {/* HOW AI SCORING WORKS */}
//         <div ref={howRef} style={{ opacity: howVis ? 1 : 0, transform: howVis ? "none" : "translateY(24px)", transition: "all .6s .1s", marginBottom: 56 }}>
//           <div className="h2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "36px 44px" }}>
//             <div>
//               <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 10 }}>How it works</div>
//               <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, letterSpacing: "-.035em", color: "var(--text-1)", marginBottom: 12, lineHeight: 1.2 }}>AI scores every resume against every job. Automatically.</h2>
//               <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.78, marginBottom: 22 }}>Upload your PDF once. Our AI reads it, extracts skills and experience, then scores it against every job on the platform — giving you and recruiters a real match number, not a guess.</p>
//               <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
//                 {[
//                   { n: "01", t: "Resume parsing",      d: "PDF → structured profile in under 2 seconds",        c: "#0057B8" },
//                   { n: "02", t: "Semantic matching",   d: "Context-aware — we understand what skills mean",      c: "#7c3aed" },
//                   { n: "03", t: "Score generation",    d: "0–100 match score per job, assigned instantly",       c: "#059669" },
//                   { n: "04", t: "Ranked pipeline",     d: "Recruiters see highest scores first, always",         c: "#ea580c" },
//                 ].map(f => (
//                   <div key={f.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
//                     <span style={{ fontSize: 9, fontWeight: 700, color: f.c, fontFamily: "monospace", background: `${f.c}12`, padding: "2px 7px", borderRadius: 3, flexShrink: 0, marginTop: 1 }}>{f.n}</span>
//                     <div>
//                       <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)" }}>{f.t}</div>
//                       <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.5 }}>{f.d}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <div style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: "20px 16px" }}><ScoringIllustration /></div>
//             </div>
//           </div>
//         </div>

//         {/* PIPELINE PREVIEW */}
//         <div ref={pipeRef} style={{ opacity: pipeVis ? 1 : 0, transform: pipeVis ? "none" : "translateY(24px)", transition: "all .6s .1s", marginBottom: 56 }}>
//           <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "36px 44px" }}>
//             <div className="h2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
//               <div>
//                 <div style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: "16px 12px" }}>
//                   <PipelineIllustration />
//                 </div>
//               </div>
//               <div>
//                 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 10 }}>For recruiters</div>
//                 <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, letterSpacing: "-.035em", color: "var(--text-1)", marginBottom: 12, lineHeight: 1.2 }}>A live ranked pipeline. Zero manual sorting.</h2>
//                 <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.78, marginBottom: 22 }}>Post a job, let AI score every applicant, drag them through stages. The best candidates are always at the top. One click exports your shortlist to Excel.</p>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 22 }}>
//                   {["AI scores all applicants","Drag-and-drop kanban","Batch AI analysis","Excel export","Resume viewer","Schedule interviews","Email applicants","Analytics dashboard"].map(f => (
//                     <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-2)", padding: "6px 8px", borderRadius: 5, background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
//                       <svg width="10" height="10" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//                       {f}
//                     </div>
//                   ))}
//                 </div>
//                 <button className="hbtn" onClick={() => navigate("/post-job")}
//                   style={{ padding: "9px 20px", background: "#0057B8", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
//                   Post a job free →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOR WHO */}
//         <div ref={whoRef} style={{ opacity: whoVis ? 1 : 0, transform: whoVis ? "none" : "translateY(24px)", transition: "all .6s .1s", marginBottom: 48 }}>
//           <div style={{ textAlign: "center", marginBottom: 28 }}>
//             <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>Built for both sides</div>
//             <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, letterSpacing: "-.035em", color: "var(--text-1)" }}>Whether you're hiring or being hired.</h2>
//           </div>

//           <div className="h2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 44 }}>
//             {/* Candidate card */}
//             <div className="hsec" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "26px 28px", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#0057B8", borderRadius: "12px 12px 0 0" }}/>
//               {/* Mini candidate illustration */}
//               <div style={{ width: "100%", marginBottom: 18, background: "var(--bg-subtle)", borderRadius: 8, padding: "8px 4px" }}>
//                 <svg viewBox="0 0 320 95" style={{ width: "100%", height: 95 }}>
//                   {/* Score cards */}
//                   {[
//                     { x: 10, job: "Frontend Eng", score: 94, color: "#059669" },
//                     { x: 118, job: "Data Analyst", score: 87, color: "#0057B8" },
//                     { x: 226, job: "DevOps", score: 71, color: "#f59e0b" },
//                   ].map((c, i) => (
//                     <g key={i}>
//                       <rect x={c.x} y="5" width="86" height="80" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
//                       <text x={c.x + 43} y="24" fontSize="8.5" fill="#64748b" fontFamily="Inter,sans-serif" textAnchor="middle">{c.job}</text>
//                       <text x={c.x + 43} y="56" fontSize="26" fill={c.color} fontFamily="monospace" fontWeight="700" textAnchor="middle">{c.score}%</text>
//                       <text x={c.x + 43} y="72" fontSize="7.5" fill="#94a3b8" fontFamily="Inter,sans-serif" textAnchor="middle">match score</text>
//                     </g>
//                   ))}
//                 </svg>
//               </div>
//               <div style={{ fontSize: 10, fontWeight: 700, color: "#0057B8", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 8 }}>For candidates</div>
//               <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-.02em", marginBottom: 8 }}>See your fit score before you apply</h3>
//               <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.72, marginBottom: 18 }}>Upload once. See your AI match score for every role. Apply knowing you have a real shot.</p>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
//                 {["AI resume analysis","Score per job","Interview AI coach","One-click apply"].map(f => (
//                   <div key={f} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-2)", padding: "5px 8px", borderRadius: 4, background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
//                     <svg width="9" height="9" fill="none" stroke="#0057B8" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//                     {f}
//                   </div>
//                 ))}
//               </div>
//               <button className="hbtn" onClick={() => navigate(isLoggedIn ? "/jobs" : "/register")}
//                 style={{ padding: "8px 20px", background: "#0057B8", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
//                 {isLoggedIn ? "Browse jobs" : "Start for free"}
//               </button>
//             </div>

//             {/* AI Coach card */}
//             <div className="hsec" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "26px 28px", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#7c3aed", borderRadius: "12px 12px 0 0" }}/>
//               {/* Mini chat illustration */}
//               <div style={{ width: "100%", marginBottom: 18, background: "var(--bg-subtle)", borderRadius: 8, padding: "8px 4px" }}>
//                 <svg viewBox="0 0 320 95" style={{ width: "100%", height: 95 }}>
//                   {[
//                     { x: 10, y: 8, w: 180, text: "How do I answer 'Tell me about yourself'?", user: true },
//                     { x: 130, y: 36, w: 180, text: "Start with your most recent role and...", user: false },
//                     { x: 10, y: 58, w: 140, text: "What about salary negotiation?", user: true },
//                   ].map((m, i) => (
//                     <g key={i}>
//                       <rect x={m.x} y={m.y} width={m.w} height="22" rx="6" fill={m.user ? "#0057B8" : "white"} stroke={m.user ? "none" : "#e2e8f0"} strokeWidth="1"/>
//                       <text x={m.x + 8} y={m.y + 14} fontSize="7.5" fill={m.user ? "white" : "#334155"} fontFamily="Inter,sans-serif">{m.text}</text>
//                     </g>
//                   ))}
//                 </svg>
//               </div>
//               <div style={{ fontSize: 10, fontWeight: 700, color: "#7c3aed", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 8 }}>Free AI Coach</div>
//               <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-.02em", marginBottom: 8 }}>Prepare for any interview — right now</h3>
//               <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.72, marginBottom: 18 }}>Ask anything: mock questions, salary tips, how to explain a gap, cover letter help. Free and instant.</p>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
//                 {["Mock interviews","Salary guidance","Cover letters","Gap explanations"].map(f => (
//                   <div key={f} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-2)", padding: "5px 8px", borderRadius: 4, background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
//                     <svg width="9" height="9" fill="none" stroke="#7c3aed" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
//                     {f}
//                   </div>
//                 ))}
//               </div>
//               <Link to="/ai-bot"
//                 style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 20px", background: "rgba(124,58,237,.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,.3)", borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
//                 Open AI Coach →
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* TRUST */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginBottom: 52 }}>
//           {[
//             { svg: <svg width="18" height="18" fill="none" stroke="#0057B8" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, t: "Secure by default",    s: "Resumes stored encrypted. Never shared without consent." },
//             { svg: <svg width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,          t: "Instant results",      s: "AI scoring runs the moment you apply — no waiting." },
//             { svg: <svg width="18" height="18" fill="none" stroke="#059669" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,           t: "Always up to date",    s: "Job listings refresh in real time. You never see stale data." },
//             { svg: <svg width="18" height="18" fill="none" stroke="#7c3aed" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,             t: "Full transparency",    s: "See exactly why you got your AI score." },
//           ].map(t => (
//             <div key={t.t} className="hsec" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 9, padding: "16px 14px" }}>
//               <div style={{ marginBottom: 10 }}>{t.svg}</div>
//               <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>{t.t}</div>
//               <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.55 }}>{t.s}</div>
//             </div>
//           ))}
//         </div>

//         {/* FINAL CTA */}
//         <div style={{ background: "#0f172a", borderRadius: 14, padding: "48px 52px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", right: -60, top: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(0,87,184,.12)", pointerEvents: "none" }}/>
//           <div style={{ position: "absolute", left: -40, bottom: -70, width: 200, height: 200, borderRadius: "50%", background: "rgba(124,58,237,.08)", pointerEvents: "none" }}/>
//           <div style={{ position: "relative" }}>
//             <AxonLogo size={28} showText={true} />
//             <h3 style={{ fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 800, color: "white", letterSpacing: "-.03em", margin: "12px 0 8px" }}>Find your fit today. It's free.</h3>
//             <p style={{ fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.65, maxWidth: 400, margin: 0 }}>No credit card. Takes under 2 minutes. Start seeing your AI match scores immediately.</p>
//           </div>
//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flexShrink: 0, position: "relative" }}>
//             <button className="hbtn" onClick={go}
//               style={{ padding: "11px 28px", background: "#0057B8", color: "white", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 18px rgba(0,87,184,.35)" }}>
//               {isLoggedIn ? "Go to Jobs" : "Sign up free"}
//             </button>
//             <Link to="/ai-bot" className="hlink"
//               style={{ padding: "11px 22px", background: "transparent", color: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 7, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-block" }}>
//               Try AI Coach
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)", padding: "20px 40px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
//           <AxonLogo size={22} showText={true} />
//           <div style={{ display: "flex", gap: 20 }}>
//             {[["Jobs", "/jobs"], ["Post a Job", "/post-job"], ["AI Coach", "/ai-bot"], ["Dashboard", "/recruiter-dashboard"], ["Feedback", "/feedback"]].map(([l, h]) => (
//               <Link key={l} to={h} className="hft" style={{ fontSize: 11, color: "var(--text-3)", textDecoration: "none" }}>{l}</Link>
//             ))}
//           </div>
//           <p style={{ fontSize: 10, color: "var(--text-3)" }}>© 2026 AxonHire · Operational</p>
//         </div>
//       </footer>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── GOOGLE FONTS (Editorial Typography) ───
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
  `}</style>
);

// ─── HOOKS (Preserved from your original code) ───
function useVisible(thresh = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: thresh });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [thresh]);
  return [ref, vis];
}

function useCountUp(target, dur = 1400, go = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const step = (ts) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / dur, 1); setV(Math.floor(p * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [target, dur, go]);
  return v;
}

// ─── SVGS (Preserved exactly from your original code to guarantee they work) ───
function AIBrainIllustration() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "100%" }}>
      <style>{`
        @keyframes pulse-node { 0%,100%{r:7;opacity:1} 50%{r:9;opacity:.7} }
        @keyframes pulse-node2 { 0%,100%{r:5;opacity:.8} 50%{r:7;opacity:.5} }
        @keyframes flow-line { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
        @keyframes orbit { from{transform:rotate(0deg) translateX(58px) rotate(0deg)} to{transform:rotate(360deg) translateX(58px) rotate(-360deg)} }
        @keyframes orbit2 { from{transform:rotate(120deg) translateX(42px) rotate(-120deg)} to{transform:rotate(480deg) translateX(42px) rotate(-480deg)} }
        @keyframes orbit3 { from{transform:rotate(240deg) translateX(34px) rotate(-240deg)} to{transform:rotate(600deg) translateX(34px) rotate(-600deg)} }
        @keyframes float-card { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes score-fill { from{width:0} to{width:88%} }
        @keyframes score-fill2 { from{width:0} to{width:72%} }
        @keyframes score-fill3 { from{width:0} to{width:94%} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .n1{animation:pulse-node 2.2s ease-in-out infinite}
        .n2{animation:pulse-node 2.2s .4s ease-in-out infinite}
        .n3{animation:pulse-node 2.2s .8s ease-in-out infinite}
        .n4{animation:pulse-node 2.2s 1.2s ease-in-out infinite}
        .n5{animation:pulse-node2 2.8s .6s ease-in-out infinite}
        .n6{animation:pulse-node2 2.8s 1.1s ease-in-out infinite}
        .n7{animation:pulse-node2 2.8s 1.6s ease-in-out infinite}
        .l1{stroke-dasharray:200;animation:flow-line 3s linear infinite}
        .l2{stroke-dasharray:200;animation:flow-line 3s .5s linear infinite}
        .l3{stroke-dasharray:200;animation:flow-line 3s 1s linear infinite}
        .l4{stroke-dasharray:200;animation:flow-line 3s 1.5s linear infinite}
        .card1{animation:float-card 4s ease-in-out infinite}
        .card2{animation:float-card 4s .8s ease-in-out infinite}
        .sf1{animation:score-fill 2s .5s both}
        .sf2{animation:score-fill2 2s .8s both}
        .sf3{animation:score-fill3 2s 1.1s both}
      `}</style>
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="420" height="320" fill="url(#grid)" rx="16"/>
      <circle cx="210" cy="155" r="52" fill="var(--accent)" opacity="0.05" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.3"/>
      <circle cx="210" cy="155" r="38" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4"/>
      <circle cx="210" cy="155" r="24" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.6"/>
      <g style={{ transformOrigin: "210px 155px" }}><circle className="n1" cx="268" cy="155" r="7" fill="var(--accent)" opacity=".9"/></g>
      <g style={{ transformOrigin: "210px 155px", animation: "orbit2 5s linear infinite" }}><circle cx="252" cy="119" r="5" fill="#7c3aed" opacity=".8"/></g>
      <g style={{ transformOrigin: "210px 155px", animation: "orbit3 7s linear infinite" }}><circle cx="176" cy="130" r="4" fill="#059669" opacity=".7"/></g>
      <line className="l1" x1="80" y1="80" x2="210" y2="155" stroke="var(--accent)" strokeWidth="1.2" opacity="0.5"/>
      <line className="l2" x1="340" y1="70" x2="210" y2="155" stroke="#7c3aed" strokeWidth="1.2" opacity="0.5"/>
      <line className="l3" x1="60" y1="240" x2="210" y2="155" stroke="var(--accent)" strokeWidth="1.2" opacity="0.5"/>
      <line className="l4" x1="360" y1="250" x2="210" y2="155" stroke="#059669" strokeWidth="1.2" opacity="0.5"/>
      <line className="l1" x1="210" y1="30" x2="210" y2="155" stroke="#7c3aed" strokeWidth="1" opacity="0.4"/>
      <circle className="n2" cx="80" cy="80" r="7" fill="var(--accent)"/>
      <circle className="n3" cx="340" cy="70" r="6" fill="#7c3aed"/>
      <circle className="n4" cx="60" cy="240" r="7" fill="var(--accent)"/>
      <circle className="n5" cx="360" cy="250" r="5" fill="#059669"/>
      <circle className="n6" cx="210" cy="30" r="6" fill="#7c3aed"/>
      <circle className="n7" cx="380" cy="155" r="5" fill="var(--accent)"/>
      <line x1="80" y1="80" x2="340" y2="70" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2"/>
      <line x1="60" y1="240" x2="360" y2="250" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2"/>
      <line x1="80" y1="80" x2="60" y2="240" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15"/>
      <g transform="translate(197,143)">
        <path d="M13 2C9.5 2 7 4.5 7 7.5c0 .5.1 1 .2 1.5C5.4 9.7 4 11.2 4 13c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4 0-1.8-1.4-3.3-3.2-3.9.1-.5.2-1 .2-1.5C19 4.5 16.5 2 13 2z" fill="var(--accent)" opacity=".9"/>
        <line x1="13" y1="6" x2="13" y2="10" stroke="var(--bg-surface)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="10" y1="9" x2="16" y2="9" stroke="var(--bg-surface)" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
      <g className="card1" transform="translate(0,0)">
        <rect x="12" y="108" width="120" height="72" rx="9" fill="var(--bg-surface)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.25"/>
        <rect x="12" y="108" width="120" height="72" rx="9" fill="var(--accent)" opacity="0.05"/>
        <circle cx="32" cy="128" r="10" fill="var(--accent)" opacity="0.15"/>
        <path d="M28 128.5 l3 3 5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <rect x="48" y="122" width="60" height="4" rx="2" fill="var(--accent)" opacity="0.2"/>
        <rect x="48" y="130" width="40" height="3" rx="1.5" fill="var(--accent)" opacity="0.1"/>
        <text x="22" y="156" fontSize="8" fill="var(--accent)" opacity="0.8" fontFamily="Inter,sans-serif" fontWeight="600">MATCH SCORE</text>
        <rect x="22" y="160" width="82" height="6" rx="3" fill="var(--accent)" opacity="0.15"/>
        <rect x="22" y="160" className="sf3" height="6" rx="3" fill="var(--accent)"/>
        <text x="108" y="166" fontSize="8" fill="#059669" fontFamily="monospace" fontWeight="700">94%</text>
      </g>
      <g className="card2" transform="translate(0,0)">
        <rect x="288" y="98" width="118" height="80" rx="9" fill="var(--bg-surface)" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.25"/>
        <rect x="288" y="98" width="118" height="80" rx="9" fill="#7c3aed" opacity="0.05"/>
        <text x="298" y="115" fontSize="8" fill="#7c3aed" fontFamily="Inter,sans-serif" fontWeight="700">AI RANKED</text>
        {[
          { name: "B. Jones", score: "92%", w: "sf3", color: "#059669", y: 0 },
          { name: "A. Smith", score: "85%", w: "sf1", color: "var(--accent)", y: 20 },
          { name: "C. Lee",   score: "71%", w: "sf2", color: "#f59e0b", y: 40 },
        ].map((r, i) => (
          <g key={i} transform={`translate(0,${r.y})`}>
            <circle cx="302" cy="129" r="7" fill={r.color} opacity=".15"/>
            <text x="299" y="132" fontSize="7" fill={r.color} fontFamily="Inter,sans-serif" fontWeight="700">{i+1}</text>
            <text x="314" y="132" fontSize="8" fill="var(--text-1)" fontFamily="Inter,sans-serif">{r.name}</text>
            <text x="378" y="132" fontSize="8" fill={r.color} fontFamily="monospace" fontWeight="700">{r.score}</text>
          </g>
        ))}
      </g>
      <rect x="110" y="244" width="200" height="52" rx="9" fill="var(--bg-surface)" stroke="#059669" strokeWidth="1" strokeOpacity="0.25"/>
      <circle cx="130" cy="262" r="8" fill="#059669" opacity="0.15"/>
      <path d="M127 262 l2.5 2.5 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="144" y="258" fontSize="9" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="700">HIRE FASTER</text>
      <text x="144" y="270" fontSize="8" fill="var(--text-3)" fontFamily="Inter,sans-serif">4,200+ jobs · AI-matched</text>
      <rect x="120" y="278" width="160" height="4" rx="2" fill="#059669" opacity="0.15"/>
      <rect x="120" y="278" width="140" height="4" rx="2" fill="#059669" opacity=".5"/>
    </svg>
  );
}

function ScoringIllustration() {
  return (
    <svg viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
      <style>{`
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes check-draw { from{stroke-dashoffset:30} to{stroke-dashoffset:0} }
        @keyframes fade-tag { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:none} }
        .sl{animation:scanline 2.5s linear infinite}
        .ck{stroke-dasharray:30;animation:check-draw .4s 1.5s both}
        .ck2{stroke-dasharray:30;animation:check-draw .4s 1.8s both}
        .ck3{stroke-dasharray:30;animation:check-draw .4s 2.1s both}
        .tg1{animation:fade-tag .4s 1.5s both}
        .tg2{animation:fade-tag .4s 1.8s both}
        .tg3{animation:fade-tag .4s 2.1s both}
      `}</style>
      <rect x="20" y="30" width="100" height="128" rx="8" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1.5"/>
      <circle cx="44" cy="52" r="10" fill="var(--accent)" opacity="0.15"/>
      <rect x="60" y="46" width="50" height="5" rx="2.5" fill="var(--accent)" opacity="0.2"/>
      <rect x="60" y="55" width="35" height="3" rx="1.5" fill="var(--border-strong)"/>
      <rect x="28" y="74" width="84" height="3" rx="1.5" fill="var(--border-strong)"/>
      <rect x="28" y="82" width="84" height="3" rx="1.5" fill="var(--border-strong)"/>
      <rect x="28" y="90" width="60" height="3" rx="1.5" fill="var(--border-strong)"/>
      <rect x="28" y="104" width="84" height="3" rx="1.5" fill="var(--accent)" opacity="0.15"/>
      <rect x="28" y="112" width="70" height="3" rx="1.5" fill="var(--accent)" opacity="0.15"/>
      <rect x="28" y="120" width="84" height="3" rx="1.5" fill="#7c3aed" opacity="0.15"/>
      <rect x="28" y="128" width="50" height="3" rx="1.5" fill="#7c3aed" opacity="0.15"/>
      <clipPath id="docClip"><rect x="20" y="30" width="100" height="128" rx="8"/></clipPath>
      <rect x="20" y="30" width="100" height="3" fill="var(--accent)" opacity="0.4" clipPath="url(#docClip)" className="sl"/>
      <path d="M128 94 L158 94" stroke="var(--accent)" opacity="0.5" strokeWidth="1.5" strokeDasharray="4 3"/>
      <path d="M153 90 L158 94 L153 98" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="162" y="68" width="56" height="52" rx="10" fill="var(--accent)"/>
      <text x="190" y="88" fontSize="9" fill="var(--bg-surface)" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">AI</text>
      <text x="190" y="100" fontSize="7" fill="var(--bg-surface)" opacity=".7" fontFamily="Inter,sans-serif" textAnchor="middle">scoring</text>
      <text x="190" y="112" fontSize="7" fill="var(--bg-surface)" opacity=".7" fontFamily="Inter,sans-serif" textAnchor="middle">engine</text>
      <circle cx="190" cy="94" r="28" fill="none" stroke="var(--accent)" strokeWidth="8" opacity=".2"/>
      <path d="M222 94 L252 94" stroke="var(--accent)" opacity="0.5" strokeWidth="1.5" strokeDasharray="4 3"/>
      <path d="M247 90 L252 94 L247 98" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <g className="tg1">
        <rect x="256" y="34" width="100" height="22" rx="5" fill="#059669" opacity="0.1" stroke="#059669" strokeWidth="1" strokeOpacity="0.4"/>
        <polyline className="ck" points="266,45 270,49 278,41" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="284" y="49" fontSize="9" fill="#059669" fontFamily="Inter,sans-serif" fontWeight="600">Skills match</text>
      </g>
      <g className="tg2">
        <rect x="256" y="62" width="100" height="22" rx="5" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4"/>
        <polyline className="ck2" points="266,73 270,77 278,69" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="284" y="77" fontSize="9" fill="var(--accent)" fontFamily="Inter,sans-serif" fontWeight="600">Experience</text>
      </g>
      <g className="tg3">
        <rect x="256" y="90" width="100" height="22" rx="5" fill="#7c3aed" opacity="0.1" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.4"/>
        <polyline className="ck3" points="266,101 270,105 278,97" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="284" y="105" fontSize="9" fill="#7c3aed" fontFamily="Inter,sans-serif" fontWeight="600">Culture fit</text>
      </g>
      <rect x="276" y="126" width="60" height="36" rx="8" fill="var(--accent)"/>
      <text x="306" y="140" fontSize="8" fill="var(--bg-surface)" opacity=".8" fontFamily="Inter,sans-serif" textAnchor="middle">SCORE</text>
      <text x="306" y="155" fontSize="16" fill="var(--bg-surface)" fontFamily="monospace" fontWeight="700" textAnchor="middle">94%</text>
      <text x="190" y="210" fontSize="10" fill="var(--text-3)" fontFamily="Inter,sans-serif" textAnchor="middle">Resume → AI Analysis → Match Score</text>
    </svg>
  );
}

function PipelineIllustration() {
  return (
    <svg viewBox="0 0 400 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
      <style>{`
        @keyframes card-move { 0%{transform:translateX(0)} 60%{transform:translateX(82px)} 100%{transform:translateX(82px)} }
        @keyframes card-appear { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        .cm1{animation:card-move 4s 1s ease-in-out infinite}
        .ca1{animation:card-appear .5s .3s both}
        .ca2{animation:card-appear .5s .5s both}
        .ca3{animation:card-appear .5s .7s both}
        .ca4{animation:card-appear .5s .9s both}
      `}</style>
      {[
        { x: 8,   label: "New",         color: "#6366f1", count: 3 },
        { x: 90,  label: "Viewed",      color: "#3b82f6", count: 2 },
        { x: 172, label: "Shortlisted", color: "#10b981", count: 2 },
        { x: 254, label: "Interview",   color: "#a855f7", count: 1 },
        { x: 336, label: "Hired",       color: "#06b6d4", count: 1 },
      ].map((col, i) => (
        <g key={i}>
          <rect x={col.x} y="8" width="74" height="182" rx="7" fill={col.color} opacity="0.05" stroke={col.color} strokeWidth="1" strokeOpacity="0.25"/>
          <rect x={col.x} y="8" width="74" height="26" rx="7" fill={col.color} opacity="0.1"/>
          <rect x={col.x + 7} y="8" width="74" height="8" rx="0" fill={col.color} opacity="0.1"/>
          <text x={col.x + 37} y="24" fontSize="8" fill={col.color} fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">{col.label}</text>
          <circle cx={col.x + 60} cy="20" r="7" fill={col.color} opacity="0.2"/>
          <text x={col.x + 60} y="23" fontSize="8" fill={col.color} fontFamily="monospace" fontWeight="700" textAnchor="middle">{col.count}</text>
        </g>
      ))}
      {[
        { y: 42,  name: "A. Smith", score: 94, color: "#059669" },
        { y: 76,  name: "B. Jones", score: 87, color: "var(--accent)" },
        { y: 110, name: "C. Lee",   score: 71, color: "#f59e0b" },
      ].map((card, i) => (
        <g key={i} className={`ca${i+1}`}>
          <rect x="12" y={card.y} width="66" height="28" rx="5" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1"/>
          <circle cx="24" cy={card.y + 14} r="7" fill={card.color} opacity="0.2"/>
          <text x="24" y={card.y + 17} fontSize="7" fill={card.color} fontFamily="monospace" fontWeight="700" textAnchor="middle">{card.name[0]}</text>
          <text x="34" y={card.y + 12} fontSize="7" fill="var(--text-1)" fontFamily="Inter,sans-serif" fontWeight="600">{card.name}</text>
          <text x="34" y={card.y + 22} fontSize="7" fill={card.color} fontFamily="monospace" fontWeight="700">{card.score}%</text>
        </g>
      ))}
      <g className="cm1">
        <rect x="12" y="42" width="66" height="28" rx="5" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" opacity=".15"/>
      </g>
      {[
        { y: 42, name: "X. Wang", score: 91 },
        { y: 76, name: "D. Patel", score: 83 },
      ].map((card, i) => (
        <g key={i} className="ca3">
          <rect x="176" y={card.y} width="66" height="28" rx="5" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="1"/>
          <circle cx="188" cy={card.y + 14} r="7" fill="#10b981" opacity="0.2"/>
          <text x="188" y={card.y + 17} fontSize="7" fill="#10b981" fontFamily="monospace" fontWeight="700" textAnchor="middle">{card.name[0]}</text>
          <text x="198" y={card.y + 12} fontSize="7" fill="var(--text-1)" fontFamily="Inter,sans-serif" fontWeight="600">{card.name}</text>
          <text x="198" y={card.y + 22} fontSize="7" fill="#10b981" fontFamily="monospace" fontWeight="700">{card.score}%</text>
        </g>
      ))}
      <g className="ca4">
        <rect x="340" y="42" width="66" height="28" rx="5" fill="#06b6d4" opacity="0.1" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.4"/>
        <circle cx="352" cy="56" r="7" fill="#06b6d4" opacity="0.2"/>
        <path d="M349 56 l2.5 2.5 4-4" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="362" y="53" fontSize="7" fill="#06b6d4" fontFamily="Inter,sans-serif" fontWeight="600">E. Kim</text>
        <text x="362" y="63" fontSize="7" fill="#06b6d4" fontFamily="monospace" fontWeight="700">HIRED ✓</text>
      </g>
    </svg>
  );
}

function AxonLogo({ size = 28, showText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="var(--accent)" strokeWidth="1.5" fill="var(--accent)" fillOpacity="0.08"/>
        <circle cx="16" cy="7" r="2.5" fill="var(--accent)"/>
        <circle cx="9" cy="23" r="2" fill="var(--accent)"/>
        <circle cx="23" cy="23" r="2" fill="var(--accent)"/>
        <circle cx="12.5" cy="17" r="1.5" fill="#7c3aed"/>
        <circle cx="19.5" cy="17" r="1.5" fill="#7c3aed"/>
        <line x1="16" y1="9.5" x2="9" y2="21" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="9.5" x2="23" y2="21" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11.8" y1="17.5" x2="20.2" y2="17.5" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      {showText && (
        <span style={{ fontSize: size * 0.57, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "Inter,sans-serif", color: "var(--text-1)" }}>
          Axon<span style={{ color: "var(--accent)" }}>Hire</span>
        </span>
      )}
    </div>
  );
}


// ─── MAIN HOME COMPONENT ───
export default function Home() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [heroRef, heroVis] = useVisible(0.1);
  const [howRef, howVis] = useVisible(0.1);
  const [candRef, candVis] = useVisible(0.1);
  const [pipeRef, pipeVis] = useVisible(0.1);
  const [statsRef, statsVis] = useVisible(0.2);

  const j = useCountUp(4200, 1400, statsVis);
  const c = useCountUp(1800, 1600, statsVis);
  const a = useCountUp(94, 1000, statsVis);

  const go = () => {
    if (isLoggedIn) {
      user?.role === "recruiter" || user?.role === "admin" ? navigate("/recruiter-dashboard") : navigate("/jobs");
    } else {
      navigate("/register");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", fontFamily: "Inter,sans-serif", overflowX: "hidden" }}>
      <FontLink />
      
      {/* ─── SCOPED CSS FOR THE REDESIGN ─── */}
      <style>{`
        .editorial { font-family: 'Playfair Display', Georgia, serif; }
        
        .ax-fade { opacity: 0; transform: translateY(24px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .ax-fade.visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        
        .ax-btn {
          padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease; border: none; font-family: inherit;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ax-btn-primary { background: var(--text-1); color: var(--bg-page); }
        .ax-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        
        .ax-btn-outline { background: transparent; color: var(--text-1); border: 1px solid var(--border-strong); }
        .ax-btn-outline:hover { border-color: var(--text-1); }

        .ax-bento {
          background: var(--bg-surface); border: 1px solid var(--border); border-radius: 16px;
          transition: all 0.3s ease; padding: 32px;
        }
        .ax-bento:hover { border-color: var(--border-strong); box-shadow: 0 12px 32px rgba(0,0,0,0.06); transform: translateY(-2px); }

        .ax-input {
          display: flex; align-items: center; background: var(--bg-subtle);
          border: 1px solid var(--border-strong); border-radius: 8px; padding: 4px;
          transition: border-color 0.2s;
        }
        .ax-input:focus-within { border-color: var(--accent); }
        .ax-input input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--text-1); padding: 0 16px; font-family: inherit; font-size: 14px;
        }

        .ax-glow { position: absolute; filter: blur(100px); border-radius: 50%; z-index: 0; opacity: 0.15; pointer-events: none; }

        @media(max-width: 860px) {
          .ax-grid { grid-template-columns: 1fr !important; }
          .ax-swap-mobile { order: -1; }
        }
      `}</style>

      {/* ══ ACT 1: HERO ══ */}
      <section style={{ position: "relative", padding: "80px 24px 60px", borderBottom: "1px solid var(--border)" }}>
        <div className="ax-glow" style={{ top: 0, left: 0, width: "50%", height: "100%", background: "var(--accent)" }} />
        
        <div ref={heroRef} className="ax-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }}>
          
          <div className={`ax-fade ${heroVis ? 'visible' : ''}`}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)", letterSpacing: "0.03em" }}>Intelligent hiring is here</span>
            </div>

            <h1 className="editorial" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-1)", marginBottom: 20 }}>
              The AI layer between <br/>
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>talent</span> & opportunity.
            </h1>

            <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 40, maxWidth: 480 }}>
              AxonHire reads every resume, scores every match, and delivers a ranked shortlist. Candidates stop guessing; recruiters stop sorting.
            </p>

            <div className="ax-input" style={{ maxWidth: 400, marginBottom: 24 }}>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                onKeyDown={e => e.key === "Enter" && navigate("/jobs")}
                placeholder="Role, skill, or company..."
              />
              <button onClick={() => navigate("/jobs")} className="ax-btn ax-btn-primary" style={{ padding: "10px 20px" }}>Search</button>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button onClick={go} className="ax-btn" style={{ background: "var(--accent)", color: "white" }}>
                {isLoggedIn ? "Browse Jobs" : "Get started for free"}
              </button>
              <Link to="/ai-bot" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border-strong)" }}>
                Try AI Coach
              </Link>
            </div>
          </div>

          <div className={`ax-fade delay-1 ${heroVis ? 'visible' : ''}`} style={{ position: "relative" }}>
            <div className="ax-bento" style={{ padding: "20px 16px" }}>
              <AIBrainIllustration />
            </div>
          </div>

        </div>
      </section>

      {/* ══ ACT 2: HOW IT WORKS (The Problem & AI Solution) ══ */}
      <section style={{ padding: "100px 24px", background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div ref={howRef} style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          <div className={`ax-fade ${howVis ? 'visible' : ''}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 12 }}>How it works</div>
            <h2 className="editorial" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 16 }}>
              AI scores every resume. <br/> <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Automatically.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
              Upload your PDF once. Our engine extracts the narrative, understands semantic context, and scores it against every job on the platform in seconds.
            </p>
          </div>

          <div className={`ax-grid ax-fade delay-1 ${howVis ? 'visible' : ''}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { n: "01", t: "Semantic Parsing", d: "We map your entire career narrative, not just Ctrl+F keywords." },
                { n: "02", t: "Contextual Scoring", d: "0–100 match score assigned instantly based on true skill alignment." },
                { n: "03", t: "Actionable Insights", d: "Identify exact skill gaps before you apply, eliminating the guesswork." }
              ].map(step => (
                <div key={step.n} className="ax-bento" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                   <div style={{ padding: "4px 8px", borderRadius: 4, background: "var(--bg-subtle)", color: "var(--text-1)", fontFamily: "monospace", fontWeight: 700, fontSize: 12, border: "1px solid var(--border-strong)" }}>
                     {step.n}
                   </div>
                   <div>
                     <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", marginBottom: 6 }}>{step.t}</h4>
                     <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, margin: 0 }}>{step.d}</p>
                   </div>
                </div>
              ))}
            </div>
            
            <div className="ax-bento" style={{ padding: "40px 24px", display: "flex", justifyContent: "center", background: "var(--bg-subtle)" }}>
              <div style={{ maxWidth: 400, width: "100%" }}><ScoringIllustration /></div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ ACT 3: CANDIDATE JOURNEY ══ */}
      <section style={{ padding: "100px 24px", background: "var(--bg-page)", borderBottom: "1px solid var(--border)" }}>
        <div ref={candRef} className="ax-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          
          <div className={`ax-fade ${candVis ? 'visible' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>For Candidates</div>
            <h2 className="editorial" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 20 }}>
              Stop sending your resume <br/> into the void.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 32 }}>
              See your AI match score for every role upfront. Apply knowing you have a real shot, and use our free AI Coach to prepare for the interview.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {["Instant Match Scores", "Missing Keyword Alerts", "AI Interview Prep", "One-Click Apply"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> {f}
                </div>
              ))}
            </div>

            <button onClick={() => navigate(isLoggedIn ? "/jobs" : "/register")} className="ax-btn ax-btn-primary">
              {isLoggedIn ? "Browse Jobs" : "Create Profile Free"}
            </button>
          </div>

          <div className={`ax-fade delay-1 ${candVis ? 'visible' : ''}`}>
             <div className="ax-bento" style={{ padding: 24, borderTop: "4px solid var(--accent)" }}>
                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                  {[
                    { job: "Frontend Eng", score: 94, color: "#10b981" },
                    { job: "Data Analyst", score: 87, color: "var(--accent)" },
                    { job: "DevOps", score: 71, color: "#f59e0b" },
                  ].map((c, i) => (
                    <div key={i} style={{ flex: "0 0 130px", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 16px", textAlign: "center", background: "var(--bg-page)" }}>
                       <div style={{ fontSize: 12, color: "var(--text-1)", fontWeight: 500, marginBottom: 12, whiteSpace: "nowrap" }}>{c.job}</div>
                       <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "monospace", color: c.color }}>{c.score}%</div>
                       <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Match Score</div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* ══ ACT 4: RECRUITER PIPELINE ══ */}
      <section style={{ padding: "100px 24px", background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div ref={pipeRef} className="ax-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          
          <div className={`ax-fade delay-1 ax-swap-mobile ${pipeVis ? 'visible' : ''}`}>
             <div className="ax-bento" style={{ padding: "24px 16px", background: "var(--bg-subtle)" }}>
                <PipelineIllustration />
             </div>
          </div>

          <div className={`ax-fade ${pipeVis ? 'visible' : ''}`}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981", marginBottom: 16 }}>For Recruiters</div>
            <h2 className="editorial" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 20 }}>
              A live ranked pipeline. <br/> Zero manual sorting.
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 32 }}>
              Post a job, let AI score every applicant, and drag them through stages. The best candidates are always at the top.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {["Drag & Drop Kanban", "Batch Analysis", "Excel Export", "Bias-Free Scoring"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> {f}
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline">
              Post a job free →
            </button>
          </div>

        </div>
      </section>

      {/* ══ ACT 5: STATS & FINAL CTA ══ */}
      <section style={{ padding: "80px 24px" }}>
        
        {/* Stats */}
        <div ref={statsRef} style={{ maxWidth: 1000, margin: "0 auto 80px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 32, padding: "32px 0", borderBottom: "1px solid var(--border)" }}>
          {[
            { num: j, label: "Active Jobs", col: "var(--text-1)" },
            { num: c, label: "Companies Hiring", col: "var(--text-1)" },
            { num: a, suffix: "%", label: "Match Accuracy", col: "#10b981" }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "monospace", color: stat.col, letterSpacing: "-0.04em", marginBottom: 4 }}>
                {stat.num}{stat.suffix || "+"}
              </div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-3)", fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 className="editorial" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 20 }}>
            Ready to rewrite your narrative?
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Whether you're hiring top talent or looking to be hired, AxonHire is the bridge. Free for candidates. Free to post for recruiters.
          </p>
          <button onClick={go} className="ax-btn ax-btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            {isLoggedIn ? "Go to Dashboard" : "Create your free account"}
          </button>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <AxonLogo size={24} showText={true} />
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Jobs", "/jobs"], ["Post a Job", "/post-job"], ["AI Coach", "/ai-bot"], ["Dashboard", "/recruiter-dashboard"], ["Feedback", "/feedback"]].map(([l, h]) => (
              <Link key={l} to={h} style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none", fontWeight: 500 }}>
                {l}
              </Link>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-3)", margin: 0 }}>© {new Date().getFullYear()} AxonHire · Operational</p>
        </div>
      </footer>
    </div>
  );
}