import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";

// --- ICONS ---
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><path d="M7 12v3h10v-3"/></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

function Profile() {
  const { user, login } = useAuth();
  
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState(""); 

  const [appliedJobs, setAppliedJobs] = useState([]);

  const API_BASE_URL = import.meta.env.MODE === "production"
    ? "https://axon-hire.onrender.com"
    : "http://localhost:5000";

  // 1. Load Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/profile");
        setResumeUrl(res.data.resumeUrl);
      } catch (err) { 
        console.error(err); 
      }
    };
    fetchProfile();

    if (user) {
        const savedApplied = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
        setAppliedJobs(savedApplied);
    }
  }, [user]);

  // 2. Upload Handler
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select file first");
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeUrl(res.data.resumeUrl);
      setMessage("Success!");
      setAiAnalysis(null);
      if (login) login(res.data.user, localStorage.getItem("token"));
    } catch { 
      setMessage("Failed."); 
    } 
    finally { setLoading(false); }
  };

  // 3. Self-Check Function
  const handleSelfCheck = async () => {
    if (!resumeUrl) return alert("Upload resume first");
    setAnalyzing(true);
    try {
      const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
      const res = await axiosInstance.post("/ai/evaluate-myself", {
        resumeUrl: fullUrl,
        targetRole: targetRole 
      });

      if (res.data.success) setAiAnalysis(res.data.analysis);
    } catch {
      alert("Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClearHistory = () => {
    if (!user) return;
    setAppliedJobs([]);
    localStorage.removeItem(`appliedJobs_${user.email}`);
  };

  // --- RENDER ---
  return (
    // PAGE BACKGROUND: Deep Slate (#020617)
    <div className="min-h-screen pt-24 pb-12 bg-[#020617] px-4 md:px-8 text-slate-200">
      
      {/* Global Styles (Markdown + Scrollbar Hiding) */}
      <style>{`
        /* Markdown Styles */
        .markdown-text strong { color: #818cf8; font-weight: 700; }
        .markdown-text ul { list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px; color: #cbd5e1; }
        .markdown-text li { margin-bottom: 6px; }
        .markdown-text p { margin-bottom: 12px; line-height: 1.6; }

        /* Hide Scrollbar Styles */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: PROFILE & HISTORY --- */}
        <div className="space-y-6">
            
            {/* 1. Profile Card */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl mb-5 border-4 border-[#0f172a]">
                        <UserIcon />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{user?.name}</h2>
                    <p className="text-slate-400 text-sm mb-5 font-medium">{user?.email}</p>
                    
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
                    </div>
                </div>
            </div>

            {/* 2. Application History */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-white text-lg">Recent Applications</h3>
                   {appliedJobs.length > 0 && (
                      <button onClick={handleClearHistory} className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider">Clear All</button>
                   )}
                </div>
                
                {appliedJobs.length === 0 ? (
                    <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
                        <p className="text-slate-500 text-sm">No jobs applied yet.</p>
                    </div>
                ) : (
                    // ADDED 'scrollbar-hide' CLASS HERE
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
                        {appliedJobs.map((job, i) => (
                           <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all group">
                               <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">
                                  {job.company.charAt(0)}
                               </div>
                               <div className="flex-1 min-w-0">
                                   <p className="text-sm font-bold text-slate-200 truncate group-hover:text-white">{job.title}</p>
                                   <p className="text-xs text-slate-500 truncate">{job.company}</p>
                               </div>
                               <div className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">Applied</div>
                           </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* --- RIGHT COLUMN: RESUME & AI --- */}
        <div className="lg:col-span-2 space-y-6">

            {/* 3. Resume Uploader */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8">
               <div className="flex justify-between items-start mb-6">
                   <div>
                       <h3 className="text-xl font-bold text-white">Master Resume</h3>
                       <p className="text-sm text-slate-400 mt-1">Upload your latest CV to enable AI features.</p>
                   </div>
                   {resumeUrl && (
                       <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active
                       </span>
                   )}
               </div>

               <form onSubmit={handleUpload} className="bg-slate-900/50 rounded-xl p-5 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors group">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="flex-1 text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer"
                      />
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Uploading..." : <><UploadIcon /> Upload PDF</>}
                      </button>
                  </div>
                  {message && (
                      <p className={`text-center text-xs font-bold mt-3 ${message === "Success!" ? "text-emerald-400" : "text-red-400"}`}>
                         {message === "Success!" ? "✅ Resume uploaded successfully" : "❌ Upload failed"}
                      </p>
                  )}
               </form>
            </div>

            {/* 4. AI Analysis Dashboard */}
            {resumeUrl && (
                <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    
                    {!aiAnalysis ? (
                        // EMPTY STATE
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700">
                                <ScanIcon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Resume Health Check</h3>
                            <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm">
                                Enter a target job role (e.g. "Frontend Developer") to see how well your resume matches.
                            </p>
                            
                            <div className="flex max-w-md mx-auto">
                                <input 
                                    type="text" 
                                    className="flex-1 bg-slate-900 border border-slate-700 text-white px-5 py-3 rounded-l-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
                                    placeholder="Enter Job Role..."
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                />
                                <button 
                                    onClick={handleSelfCheck}
                                    disabled={analyzing}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 font-bold text-sm rounded-r-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {analyzing ? "Scanning..." : "Analyze"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        // RESULTS STATE
                        <div className="animate-fadeIn">
                             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-slate-800">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Analysis Report</h3>
                                    <p className="text-sm text-slate-400">Target Role: <span className="text-indigo-400 font-bold">{targetRole || "General"}</span></p>
                                </div>
                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Fit Score</p>
                                        <p className={`text-4xl font-black ${aiAnalysis.matchScore >= 80 ? "text-emerald-400" : aiAnalysis.matchScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                                            {aiAnalysis.matchScore}<span className="text-2xl">%</span>
                                        </p>
                                    </div>
                                    <div className={`h-16 w-16 rounded-2xl border-2 flex items-center justify-center text-2xl bg-slate-900
                                        ${aiAnalysis.matchScore >= 80 ? "border-emerald-500/30 text-emerald-400" : aiAnalysis.matchScore >= 50 ? "border-yellow-500/30 text-yellow-400" : "border-red-500/30 text-red-400"}
                                    `}>
                                        {aiAnalysis.matchScore >= 80 ? "A+" : aiAnalysis.matchScore >= 50 ? "B" : "C"}
                                    </div>
                                </div>
                             </div>

                             {/* Summary Box */}
                             <div className="bg-slate-900/50 p-6 rounded-xl mb-8 border border-slate-800">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase mb-4 tracking-widest">Executive Summary</h4>
                                <div className="text-slate-300 text-sm leading-relaxed markdown-text">
                                    <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
                                </div>
                             </div>

                             <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Identified Strengths
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.matchedSkills?.map((skill, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Missing Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.missingRequiredSkills?.map((skill, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg opacity-80">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                             </div>

                             <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                                <button 
                                    onClick={() => setAiAnalysis(null)}
                                    className="text-slate-500 hover:text-white text-sm font-bold transition-colors uppercase tracking-wider"
                                >
                                    Start New Scan
                                </button>
                             </div>
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

export default Profile;