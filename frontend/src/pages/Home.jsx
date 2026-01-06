import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- ICONS ---
const ArrowRight = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>);
const Cpu = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>);
const Activity = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
const FileText = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const Scan = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>);

// --- MOTO: SIGNAL vs NOISE (Interactive) ---
const SignalDemo = () => {
    const [filter, setFilter] = useState(false);

    return (
        <div className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center group hover:border-indigo-500/30 transition-all">
            <div className="absolute top-4 right-4 z-20">
                <button 
                    onClick={() => setFilter(!filter)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${filter ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                >
                    {filter ? "AI Filter: ON" : "AI Filter: OFF"}
                </button>
            </div>

            {/* The Visual */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Noise Particles */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${filter ? 'opacity-10' : 'opacity-100'}`}>
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="absolute text-[8px] text-slate-600 font-mono animate-float"
                             style={{
                                 top: `${Math.random() * 100}%`,
                                 left: `${Math.random() * 100}%`,
                                 animationDuration: `${3 + Math.random() * 5}s`
                             }}>
                            {['bias', 'clutter', 'noise', 'format', 'typo'][i % 5]}
                        </div>
                    ))}
                </div>

                {/* The Signal */}
                <div className={`transition-all duration-1000 transform ${filter ? 'scale-110 opacity-100 blur-0' : 'scale-90 opacity-50 blur-sm'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_indigo]">
                            <Cpu className="text-white" />
                        </div>
                        <div>
                            <div className="h-2 w-24 bg-slate-700 rounded mb-2 overflow-hidden">
                                <div className={`h-full bg-white transition-all duration-1000 ${filter ? 'w-full' : 'w-1/3'}`}></div>
                            </div>
                            <div className="text-xs font-bold text-white tracking-widest uppercase">Pure Signal</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="absolute bottom-6 text-slate-500 text-xs">
                {filter ? "Only qualified candidates remain." : "Recruiting is mostly noise."}
            </p>
        </div>
    );
};

// --- STEP 1: THE DIGITIZER (Replaces Prism) ---
const DigitizerDemo = () => {
    const [scan, setScan] = useState(false);

    const toggle = () => {
        if (scan) return;
        setScan(true);
        setTimeout(() => setScan(false), 3000);
    };

    return (
        <div onClick={toggle} className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center cursor-pointer group hover:border-indigo-500/30 transition-all">
            
            {/* Document */}
            <div className={`w-32 h-44 bg-slate-800 border border-slate-700 rounded-lg p-3 relative transition-all duration-1000 ${scan ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
                <div className="w-8 h-8 bg-slate-600 rounded-full mb-3"></div>
                <div className="h-2 w-full bg-slate-600 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-slate-600 rounded mb-4"></div>
                <div className="h-1 w-full bg-slate-700 rounded mb-1"></div>
                <div className="h-1 w-full bg-slate-700 rounded mb-1"></div>
                
                {/* Scanning Bar */}
                <div className={`absolute left-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_indigo] transition-all duration-[3s] ease-linear ${scan ? 'top-[100%] opacity-100' : 'top-0 opacity-0'}`}></div>
            </div>

            {/* Holographic Projection (Data) */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500 ${scan ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-slate-900/90 backdrop-blur border border-indigo-500/50 p-2 rounded text-xs font-mono text-indigo-300 shadow-xl">
                    Experience: 5 Years
                </div>
                <div className="bg-slate-900/90 backdrop-blur border border-purple-500/50 p-2 rounded text-xs font-mono text-purple-300 shadow-xl ml-12">
                    Skills: React, Node
                </div>
                <div className="bg-slate-900/90 backdrop-blur border border-emerald-500/50 p-2 rounded text-xs font-mono text-emerald-300 shadow-xl mr-12">
                    Education: Masters
                </div>
            </div>

            {!scan && <div className="absolute bottom-6 text-xs text-slate-500 animate-pulse">Click to Digitize</div>}
        </div>
    );
};

// --- STEP 2: THE SYNAPSE (Kept per request) ---
const SynapseDemo = () => {
    const [match, setMatch] = useState(false);

    return (
        <div 
            onMouseEnter={() => setMatch(true)} 
            onMouseLeave={() => setMatch(false)}
            className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center cursor-crosshair group hover:border-purple-500/30 transition-all"
        >
            <div className="flex w-full max-w-sm justify-between items-center px-8 relative">
                <div className="z-10 flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${match ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_purple]' : 'border-slate-700 bg-slate-800'}`}>
                        <span className="text-[10px] font-bold text-white">JOB</span>
                    </div>
                </div>

                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-12">
                     <div className="h-0.5 w-full bg-slate-800 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 bottom-0 bg-white w-1/2 blur-[2px] transition-all duration-300 ${match ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}`}></div>
                     </div>
                </div>

                <div className="z-10 flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 delay-100 ${match ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_indigo]' : 'border-slate-700 bg-slate-800'}`}>
                        <span className="text-[10px] font-bold text-white">RESUME</span>
                    </div>
                </div>
            </div>

            <div className={`mt-8 px-4 py-1 rounded-full text-xs font-bold transition-all duration-500 ${match ? 'bg-white text-black scale-110' : 'bg-slate-800 text-slate-500 scale-100'}`}>
                {match ? "NEURAL MATCH DETECTED" : "Hover to Connect"}
            </div>
        </div>
    );
};

// --- STEP 3: THE LEADERBOARD (Kept per request) ---
const LeaderboardDemo = () => {
    const [candidates, setCandidates] = useState([
        { id: 1, name: "A. Smith", score: 85 },
        { id: 2, name: "B. Jones", score: 92 },
        { id: 3, name: "C. Lee", score: 64 },
    ]);

    const shuffle = () => {
        const newCandidates = candidates.map(c => ({
            ...c,
            score: Math.floor(Math.random() * (99 - 60) + 60)
        })).sort((a, b) => b.score - a.score);
        setCandidates(newCandidates);
    };

    return (
        <div className="w-full h-[300px] bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-all">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Activity className="text-emerald-500 w-4 h-4" />
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Live Ranking</span>
                </div>
                <button onClick={shuffle} className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors">Update</button>
            </div>

            <div className="flex-1 space-y-3 relative">
                {candidates.map((c, index) => (
                    <div 
                        key={c.id}
                        className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between transition-all duration-500 absolute"
                        style={{ top: `${index * 60}px`, left: 0, right: 0 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-slate-500 font-mono text-xs w-4">0{index + 1}</div>
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                {c.name.charAt(0)}
                            </div>
                            <span className="text-sm text-slate-300 font-bold">{c.name}</span>
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded ${index === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                            {c.score}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
function Home() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleMainAction = () => {
    if (isLoggedIn) {
      if (user?.role === 'recruiter') navigate("/recruiter-dashboard");
      else navigate("/jobs");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-6 text-center max-w-6xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-900/10 to-transparent blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-sm font-bold uppercase tracking-widest mb-8 hover:bg-slate-800 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Axon OS v1.0
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
           The Neural Network <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-[length:200%_auto]">
               For Hiring.
           </span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
           Axon isn't just a job board. It's an intelligence layer that sits between candidates and recruiters, filtering the signal from the noise.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
                onClick={handleMainAction}
                className="px-10 py-5 bg-white text-slate-900 font-bold rounded-full text-lg hover:bg-indigo-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto sm:mx-0"
            >
                {isLoggedIn ? "Enter System" : "Initialize"} <ArrowRight />
            </button>
        </div>
      </section>

      {/* --- THE STORYBOARD --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
          
          {/* MOTO: SIGNAL vs NOISE */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="space-y-6">
                 <h2 className="text-4xl md:text-5xl font-bold">Signal vs. Noise.</h2>
                 <p className="text-slate-400 text-lg leading-relaxed">
                     90% of a recruiter's time is spent sifting through noise—bad formats, irrelevant skills, and bias. Axon filters this out instantly, leaving only the pure signal: <strong>Talent.</strong>
                 </p>
             </div>
             <div className="perspective-1000"><SignalDemo /></div>
          </div>

          {/* STEP 1: DIGITIZER */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 perspective-1000"><DigitizerDemo /></div>
              <div className="order-1 md:order-2 space-y-6">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-indigo-500/30 text-xl">1</div>
                  <h2 className="text-4xl md:text-5xl font-bold">Smart Ingestion.</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                      We treat resumes as raw data input. Our engine scans PDFs and converts them into structured digital profiles in milliseconds.
                  </p>
              </div>
          </div>

          {/* STEP 2: SYNAPSE */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 space-y-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-purple-500/30 text-xl">2</div>
                  <h2 className="text-4xl md:text-5xl font-bold">Neural Matching.</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                      Keywords aren't enough. We calculate the semantic distance between a candidate's history and your job requirements. A match is only made when the connection is strong.
                  </p>
              </div>
              <div className="order-1 md:order-2 perspective-1000"><SynapseDemo /></div>
          </div>

          {/* STEP 3: LEADERBOARD */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1 perspective-1000"><LeaderboardDemo /></div>
             <div className="order-1 md:order-2 space-y-6">
                 <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-white font-bold border border-emerald-500/30 text-xl">3</div>
                 <h2 className="text-4xl md:text-5xl font-bold">Dynamic Ranking.</h2>
                 <p className="text-slate-400 text-lg leading-relaxed">
                     Stop sorting by "Date Applied." Axon delivers a live, score-weighted leaderboard. The best candidates float to the top automatically.
                 </p>
             </div>
          </div>

      </div>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-800 bg-[#010409] text-center">
         <div className="flex items-center justify-center gap-2 mb-4">
             <Cpu className="text-indigo-500 w-6 h-6" />
             <span className="text-white font-bold text-xl tracking-tight">Axon.</span>
         </div>
         <p className="text-slate-600 text-sm">System Status: Operational.</p>
         <p className="text-slate-700 text-xs mt-2">© 2024 Axon Intelligence Layer.</p>
      </footer>

    </div>
  );
}

export default Home;