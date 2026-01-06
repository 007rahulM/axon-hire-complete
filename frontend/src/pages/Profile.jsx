// // frontend/src/pages/Profile.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../api/axiosInstance";
// import ReactMarkdown from "react-markdown";

// // --- ICONS ---
// const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
// const ScanIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><path d="M7 12v3h10v-3"/></svg>);
// const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>);
// const MagicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
// const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
// const RobotIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>);
// // 👇 ADDED THIS MISSING ICON
// const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);

// function Profile() {
//   const { user, login } = useAuth();
  
//   const [activeTab, setActiveTab] = useState("resume");
//   const [showAvatarModal, setShowAvatarModal] = useState(false);

//   // Legacy State
//   const [file, setFile] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0); 
//   const [message, setMessage] = useState("");
//   const [aiAnalysis, setAiAnalysis] = useState(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [targetRole, setTargetRole] = useState(""); 
//   const [appliedJobs, setAppliedJobs] = useState([]);

//   // Rich Profile State
//   const [profileData, setProfileData] = useState({
//     title: "", about: "", skills: "", profilePicture: ""
//   });
//   const [profileMsg, setProfileMsg] = useState("");

//   const [avatarSeed, setAvatarSeed] = useState("Felix");
//   const [avatarStyle, setAvatarStyle] = useState("adventurer");

//   const API_BASE_URL = import.meta.env.MODE === "production"
//     ? "https://axon-hire.onrender.com"
//     : "http://localhost:5000";

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get("/users/profile");
//         setResumeUrl(res.data.resumeUrl);
//         setProfileData({
//             title: res.data.title || "",
//             about: res.data.about || "",
//             skills: res.data.skills ? res.data.skills.join(", ") : "",
//             profilePicture: res.data.profilePicture || "" 
//         });
//       } catch (err) { console.error(err); }
//     };
//     fetchProfile();

//     if (user) {
//         const savedApplied = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
//         setAppliedJobs(savedApplied);
//     }
//   }, [user]);

//   // Handlers
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Select file first");
//     const formData = new FormData();
//     formData.append("resume", file);
    
//     setLoading(true);
//     setUploadProgress(0);
    
//     try {
//       const res = await axiosInstance.post("/users/upload-resume", formData, { 
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (progressEvent) => {
//               const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(percent);
//           }
//       });
//       setResumeUrl(res.data.resumeUrl);
//       setMessage("Success!");
//       if (login) login(res.data.user, localStorage.getItem("token"));
//     } catch { setMessage("Failed."); } 
//     finally { 
//         setLoading(false); 
//         setTimeout(() => setUploadProgress(0), 2000); 
//     }
//   };

//   const handleSelfCheck = async () => {
//     if (!resumeUrl) return alert("Upload resume first to use AI features.");
//     setAnalyzing(true);
//     try {
//       const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
//       const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole: targetRole });
//       if (res.data.success) setAiAnalysis(res.data.analysis);
//     } catch { alert("Analysis failed. Please check backend AI service."); } 
//     finally { setAnalyzing(false); }
//   };

//   const handleSaveProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//         const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
//         await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
//         setProfileMsg("✅ Profile updated successfully!");
//         // Clear message after 3 seconds
//         setTimeout(() => setProfileMsg(""), 3000);
//     } catch { setProfileMsg("❌ Failed to update."); } 
//     finally { setLoading(false); }
//   };

//   const generateRandomAvatar = () => {
//     const seeds = ["Felix", "Aneka", "Milo", "Bella", "Jack", "Luna", "Zoe", "Leo"];
//     const styles = ["adventurer", "bottts", "avataaars", "lorelei", "notionists"];
//     setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
//     setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
//   };

//   const saveGeneratedAvatar = async () => {
//     const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
//     setProfileData(prev => ({ ...prev, profilePicture: url }));
//     try {
//         await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
//         setShowAvatarModal(false);
//     } catch { alert("Failed to save avatar"); }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("avatar", file);
//     try {
//         const res = await axiosInstance.post("/users/upload-avatar", formData, { headers: { "Content-Type": "multipart/form-data" } });
//         setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
//         setShowAvatarModal(false);
//     } catch { alert("Image upload failed"); }
//   };

//   const handleClearHistory = () => {
//     if (!user) return;
//     setAppliedJobs([]);
//     localStorage.removeItem(`appliedJobs_${user.email}`);
//   };

//   const getAvatarUrl = () => {
//     const pic = profileData.profilePicture;
//     if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
//     if (pic.startsWith("http")) return pic;
//     return `${API_BASE_URL}${pic}`;
//   };
  

//   return (
//     <div className="min-h-screen pt-24 pb-12 bg-[#020617] px-4 md:px-8 text-slate-200">
      
//       <style>{`
//         .markdown-text strong { color: #818cf8; font-weight: 700; }
//         .markdown-text ul { list-style-type: disc; padding-left: 20px; margin-top: 10px; margin-bottom: 10px; color: #cbd5e1; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//       `}</style>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* --- LEFT COLUMN: PROFILE CARD --- */}
//         <div className="space-y-6">
//             <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center relative overflow-hidden shadow-2xl">
//                 <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/30 to-transparent"></div>
                
//                 <div className="relative z-10">
//                     {/* AVATAR DISPLAY */}
//                     <div className="relative w-32 h-32 mx-auto mb-5 group">
//                         <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-[#0f172a] overflow-hidden">
//                             <img 
//                                 src={getAvatarUrl()} 
//                                 alt="Avatar" 
//                                 className="w-full h-full object-cover" 
//                                 onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}` }}
//                             />
//                         </div>
//                         <button 
//                             onClick={() => setShowAvatarModal(true)}
//                             className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full border-4 border-[#0f172a] hover:bg-indigo-500 transition-transform hover:scale-110 shadow-lg cursor-pointer"
//                             title="Customize Identity"
//                         >
//                             <PencilIcon />
//                         </button>
//                     </div>

//                     <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{user?.name}</h2>
//                     <p className="text-indigo-400 font-bold text-sm mb-1">{profileData.title || "Ready to Work"}</p>
//                     <p className="text-slate-400 text-sm mb-5 font-medium">{user?.email}</p>
                    
//                     <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                       {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
//                     </div>
//                 </div>
//             </div>

//             {/* Application History */}
//             <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 shadow-xl">
//                 <div className="flex justify-between items-center mb-6">
//                    <h3 className="font-bold text-white text-lg">Recent Applications</h3>
//                    {appliedJobs.length > 0 && <button onClick={handleClearHistory} className="text-xs font-bold text-slate-500 hover:text-red-400 uppercase">Clear</button>}
//                 </div>
//                 {appliedJobs.length === 0 ? (
//                     <div className="text-center py-8 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
//                         <p className="text-slate-500 text-sm">No jobs applied yet.</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
//                         {appliedJobs.map((job, i) => (
//                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
//                                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-700">{job.company.charAt(0)}</div>
//                                <div className="flex-1 min-w-0">
//                                    <p className="text-sm font-bold text-slate-200 truncate">{job.title}</p>
//                                    <p className="text-xs text-slate-500 truncate">{job.company}</p>
//                                </div>
//                                <div className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Applied</div>
//                            </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>

//         {/* --- RIGHT COLUMN: TABS & CONTENT --- */}
//         <div className="lg:col-span-2 space-y-6">
            
//             {/* Custom Tab Switcher */}
//             <div className="bg-[#0f172a] p-1.5 rounded-xl border border-slate-800 inline-flex">
//                 <button 
//                     onClick={() => setActiveTab("resume")} 
//                     className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'resume' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
//                 >
//                     Resume & AI Analysis
//                 </button>
//                 <button 
//                     onClick={() => setActiveTab("details")} 
//                     className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
//                 >
//                     Edit Profile Details
//                 </button>
//             </div>

//             {/* TAB CONTENT: EDIT DETAILS */}
//             {activeTab === "details" && (
//                 <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 animate-fadeIn shadow-xl">
//                     <h3 className="text-xl font-bold text-white mb-6">Personal Details</h3>
//                     <form onSubmit={handleSaveProfile} className="space-y-6">
//                         {profileMsg && <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-center rounded-xl text-indigo-400 font-bold text-sm animate-pulse">{profileMsg}</div>}
                        
//                         <div>
//                             <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Headline</label>
//                             <input value={profileData.title} onChange={(e) => setProfileData({...profileData, title: e.target.value})} className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="e.g. Senior Full Stack Engineer" />
//                         </div>
                        
//                         <div>
//                             <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">About</label>
//                             <textarea value={profileData.about} onChange={(e) => setProfileData({...profileData, about: e.target.value})} rows="4" className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600 resize-none" placeholder="Tell us about your professional journey..." />
//                         </div>
                        
//                         <div>
//                             <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Skills (Comma Separated)</label>
//                             <input value={profileData.skills} onChange={(e) => setProfileData({...profileData, skills: e.target.value})} className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="React, Node.js, AWS, Python..." />
//                         </div>
                        
//                         <div className="pt-4">
//                             <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto">
//                                 {loading ? "Saving Changes..." : "Save Profile"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* TAB CONTENT: RESUME & AI */}
//             {activeTab === "resume" && (
//                 <div className="space-y-6 animate-fadeIn">
                    
//                     {/* 1. Resume Uploader Card */}
//                     <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 shadow-xl">
//                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//                             <div>
//                                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
//                                     Master Resume
//                                     {resumeUrl && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
//                                 </h3>
//                                 <p className="text-sm text-slate-400 mt-1">Upload your latest PDF CV to unlock AI analysis.</p>
//                             </div>
//                             {resumeUrl && (
//                                 <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/30 underline-offset-4">
//                                     View Current Resume
//                                 </a>
//                             )}
//                         </div>

//                         <form onSubmit={handleUpload} className="bg-slate-900/50 rounded-xl p-6 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors group">
//                             <div className="flex flex-col md:flex-row gap-4 items-center">
//                                 <input 
//                                     type="file" 
//                                     accept="application/pdf"
//                                     onChange={(e) => setFile(e.target.files[0])}
//                                     className="flex-1 text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer w-full"
//                                 />
//                                 <button 
//                                     type="submit" 
//                                     disabled={loading}
//                                     className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
//                                 >
//                                     {loading ? `Uploading ${uploadProgress}%` : <><UploadIcon /> Upload PDF</>}
//                                 </button>
//                             </div>
                            
//                             {/* Progress Bar */}
//                             {loading && (
//                                 <div className="w-full bg-slate-800 rounded-full h-1.5 mt-5 overflow-hidden">
//                                     <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
//                                 </div>
//                             )}

//                             {message && !loading && (
//                                 <p className={`text-center text-xs font-bold mt-4 ${message === "Success!" ? "text-emerald-400" : "text-red-400"}`}>
//                                     {message === "Success!" ? "✅ Resume uploaded successfully" : "❌ Upload failed"}
//                                 </p>
//                             )}
//                         </form>
//                     </div>

//                     {/* 2. AI Analysis Dashboard */}
//                     <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 relative overflow-hidden shadow-xl">
//                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        
//                         {!aiAnalysis ? (
//                             // EMPTY STATE / INPUT STATE
//                             <div className="text-center py-8">
//                                 <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 text-indigo-400">
//                                     <ScanIcon />
//                                 </div>
//                                 <h3 className="text-xl font-bold text-white mb-2">Evaluate Your Resume</h3>
//                                 <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm">
//                                     Compare your resume against a specific job title to see your Match Score and missing keywords.
//                                 </p>
                                
//                                 <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-2">
//                                     <input 
//                                         type="text" 
//                                         className="flex-1 bg-[#020617] border border-slate-700 text-white px-5 py-3.5 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
//                                         placeholder="e.g. Frontend Developer"
//                                         value={targetRole}
//                                         onChange={(e) => setTargetRole(e.target.value)}
//                                     />
//                                     <button 
//                                         onClick={handleSelfCheck}
//                                         disabled={analyzing}
//                                         className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3.5 font-bold text-sm rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
//                                     >
//                                         {analyzing ? (
//                                             <>
//                                                 <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
//                                                 Scanning...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <RobotIcon /> Analyze
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                                 {!resumeUrl && (
//                                     <p className="text-xs text-red-400 mt-4 font-medium bg-red-500/10 inline-block px-3 py-1 rounded-lg border border-red-500/20">
//                                         ⚠️ Please upload a resume above first.
//                                     </p>
//                                 )}
//                             </div>
//                         ) : (
//                             // RESULTS STATE
//                             <div className="animate-fadeIn">
//                                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-slate-800">
//                                     <div>
//                                         <h3 className="text-2xl font-bold text-white mb-1">Analysis Report</h3>
//                                         <p className="text-sm text-slate-400">Target Role: <span className="text-indigo-400 font-bold">{targetRole || "General"}</span></p>
//                                     </div>
//                                     <div className="flex items-center gap-4 mt-4 md:mt-0 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
//                                         <div className="text-right">
//                                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Match Score</p>
//                                             <p className={`text-3xl font-black ${aiAnalysis.matchScore >= 80 ? "text-emerald-400" : aiAnalysis.matchScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
//                                                 {aiAnalysis.matchScore}%
//                                             </p>
//                                         </div>
//                                         <div className={`h-12 w-1 bg-slate-800 rounded-full`}></div>
//                                         <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-xl font-bold bg-slate-900 border-2
//                                             ${aiAnalysis.matchScore >= 80 ? "border-emerald-500/30 text-emerald-400" : aiAnalysis.matchScore >= 50 ? "border-yellow-500/30 text-yellow-400" : "border-red-500/30 text-red-400"}
//                                         `}>
//                                             {aiAnalysis.matchScore >= 80 ? "A+" : aiAnalysis.matchScore >= 50 ? "B" : "C"}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Summary Box */}
//                                 <div className="bg-indigo-900/10 p-6 rounded-xl mb-8 border border-indigo-500/20">
//                                     <h4 className="text-xs font-bold text-indigo-400 uppercase mb-3 tracking-widest flex items-center gap-2">
//                                         <SparklesIcon /> Executive Summary
//                                     </h4>
//                                     <div className="text-slate-300 text-sm leading-relaxed markdown-text">
//                                         <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
//                                     </div>
//                                 </div>

//                                 <div className="grid md:grid-cols-2 gap-8">
//                                     <div>
//                                         <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
//                                             <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span> Identified Strengths
//                                         </h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {aiAnalysis.matchedSkills?.length > 0 ? (
//                                                 aiAnalysis.matchedSkills.map((skill, i) => (
//                                                     <span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
//                                                         {skill}
//                                                     </span>
//                                                 ))
//                                             ) : <span className="text-slate-500 text-sm italic">No specific skills matched.</span>}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
//                                             <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span> Missing Keywords
//                                         </h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {aiAnalysis.missingRequiredSkills?.length > 0 ? (
//                                                 aiAnalysis.missingRequiredSkills.map((skill, i) => (
//                                                     <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg opacity-90">
//                                                         {skill}
//                                                     </span>
//                                                 ))
//                                             ) : <span className="text-slate-500 text-sm italic">Great job! No major keywords missing.</span>}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-8 pt-6 border-t border-slate-800 text-center">
//                                     <button 
//                                         onClick={() => setAiAnalysis(null)}
//                                         className="text-slate-500 hover:text-white text-sm font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-2 mx-auto hover:bg-slate-800 px-4 py-2 rounded-lg"
//                                     >
//                                         <ScanIcon /> Start New Scan
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>

//       </div>

//      {showAvatarModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
//             <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative text-center">
//                 <button onClick={() => setShowAvatarModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><CloseIcon /></button>
//                 <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">IDENTITY FORGE</h3>
//                 <p className="text-slate-400 text-sm mb-8">Generate a unique digital persona or upload your own.</p>
                
//                 <div className="w-40 h-40 mx-auto bg-slate-900 rounded-full border-4 border-indigo-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)] overflow-hidden">
//                     <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" className="w-full h-full object-cover"/>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                     <button onClick={generateRandomAvatar} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-700 hover:border-indigo-500 transition-all shadow-lg"><MagicIcon /> Randomize</button>
//                     <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-lg"><UploadIcon /> Upload Photo<input type="file" accept="image/*" hidden onChange={handleImageUpload} /></label>
//                 </div>
                
//                 <button onClick={saveGeneratedAvatar} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95">Confirm Identity</button>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// export default Profile;


import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom"; // 👈 Needed for "Browse Jobs"

// --- ICONS ---
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const ScanIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><path d="M7 12v3h10v-3"/></svg>);
const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>);
const MagicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const RobotIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);

function Profile() {
  const { user, login } = useAuth();
  
  const [activeTab, setActiveTab] = useState("resume");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Legacy State
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [message, setMessage] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState(""); 
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Rich Profile State
  const [profileData, setProfileData] = useState({
    title: "", about: "", skills: "", profilePicture: ""
  });
  const [profileMsg, setProfileMsg] = useState("");

  const [avatarSeed, setAvatarSeed] = useState("Felix");
  const [avatarStyle, setAvatarStyle] = useState("adventurer");

  const API_BASE_URL = import.meta.env.MODE === "production"
    ? "https://axon-hire.onrender.com"
    : "http://localhost:5000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/profile");
        setResumeUrl(res.data.resumeUrl);
        setProfileData({
            title: res.data.title || "",
            about: res.data.about || "",
            skills: res.data.skills ? res.data.skills.join(", ") : "",
            profilePicture: res.data.profilePicture || "" 
        });
      } catch (err) { console.error(err); }
    };
    fetchProfile();

    if (user) {
        const savedApplied = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
        setAppliedJobs(savedApplied);
    }
  }, [user]);

  // Handlers
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select file first");
    const formData = new FormData();
    formData.append("resume", file);
    
    setLoading(true);
    setUploadProgress(0);
    
    try {
      const res = await axiosInstance.post("/users/upload-resume", formData, { 
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
          }
      });
      setResumeUrl(res.data.resumeUrl);
      setMessage("Success!");
      if (login) login(res.data.user, localStorage.getItem("token"));
    } catch { setMessage("Failed."); } 
    finally { 
        setLoading(false); 
        setTimeout(() => setUploadProgress(0), 2000); 
    }
  };

  const handleSelfCheck = async () => {
    if (!resumeUrl) return alert("Upload resume first to use AI features.");
    setAnalyzing(true);
    try {
      const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
      const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole: targetRole });
      if (res.data.success) setAiAnalysis(res.data.analysis);
    } catch { alert("Analysis failed. Please check backend AI service."); } 
    finally { setAnalyzing(false); }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
        await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
        setProfileMsg("✅ Profile updated successfully!");
        setTimeout(() => setProfileMsg(""), 3000);
    } catch { setProfileMsg("❌ Failed to update."); } 
    finally { setLoading(false); }
  };

  const generateRandomAvatar = () => {
    const seeds = ["Felix", "Aneka", "Milo", "Bella", "Jack", "Luna", "Zoe", "Leo"];
    const styles = ["adventurer", "bottts", "avataaars", "lorelei", "notionists"];
    setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
    setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
  };

  const saveGeneratedAvatar = async () => {
    const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
    setProfileData(prev => ({ ...prev, profilePicture: url }));
    try {
        await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
        setShowAvatarModal(false);
    } catch { alert("Failed to save avatar"); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
        const res = await axiosInstance.post("/users/upload-avatar", formData, { headers: { "Content-Type": "multipart/form-data" } });
        setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
        setShowAvatarModal(false);
    } catch { alert("Image upload failed"); }
  };

  const handleClearHistory = () => {
    if (!user) return;
    setAppliedJobs([]);
    localStorage.removeItem(`appliedJobs_${user.email}`);
  };

  const getAvatarUrl = () => {
    const pic = profileData.profilePicture;
    if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
    if (pic.startsWith("http")) return pic;
    return `${API_BASE_URL}${pic}`;
  };
  

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020617] px-4 md:px-8 text-slate-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: PROFILE CARD --- */}
        <div className="space-y-6">
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/30 to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="relative w-32 h-32 mx-auto mb-5 group">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-[#0f172a] overflow-hidden">
                            <img 
                                src={getAvatarUrl()} 
                                alt="Avatar" 
                                className="w-full h-full object-cover" 
                                onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}` }}
                            />
                        </div>
                        <button 
                            onClick={() => setShowAvatarModal(true)}
                            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full border-4 border-[#0f172a] hover:bg-indigo-500 transition-transform hover:scale-110 shadow-lg cursor-pointer"
                            title="Customize Identity"
                        >
                            <PencilIcon />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{user?.name}</h2>
                    <p className="text-indigo-400 font-bold text-sm mb-1">{profileData.title || "Ready to Work"}</p>
                    <p className="text-slate-400 text-sm mb-5 font-medium">{user?.email}</p>
                    
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {user?.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
                    </div>
                </div>
            </div>

            {/* Application History */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-white text-lg">Recent Applications</h3>
                   {appliedJobs.length > 0 && <button onClick={handleClearHistory} className="text-xs font-bold text-slate-500 hover:text-red-400 uppercase">Clear</button>}
                </div>
                {appliedJobs.length === 0 ? (
                    <div className="text-center py-10 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed flex flex-col items-center justify-center">
                        <p className="text-slate-500 text-sm mb-4">No jobs applied yet.</p>
                        <Link to="/jobs" className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {appliedJobs.map((job, i) => (
                           <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                               <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-700">{job.company.charAt(0)}</div>
                               <div className="flex-1 min-w-0">
                                   <p className="text-sm font-bold text-slate-200 truncate">{job.title}</p>
                                   <p className="text-xs text-slate-500 truncate">{job.company}</p>
                               </div>
                               <div className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Applied</div>
                           </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* --- RIGHT COLUMN: TABS & CONTENT --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Custom Tab Switcher */}
            <div className="bg-[#0f172a] p-1.5 rounded-xl border border-slate-800 inline-flex">
                <button 
                    onClick={() => setActiveTab("resume")} 
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'resume' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Resume & AI Analysis
                </button>
                <button 
                    onClick={() => setActiveTab("details")} 
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Edit Profile Details
                </button>
            </div>

            {/* TAB CONTENT: EDIT DETAILS */}
            {activeTab === "details" && (
                <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 animate-fadeIn shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6">Personal Details</h3>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        {profileMsg && <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-center rounded-xl text-indigo-400 font-bold text-sm animate-pulse">{profileMsg}</div>}
                        
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Headline</label>
                            <input value={profileData.title} onChange={(e) => setProfileData({...profileData, title: e.target.value})} className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="e.g. Senior Full Stack Engineer" />
                        </div>
                        
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">About</label>
                            <textarea value={profileData.about} onChange={(e) => setProfileData({...profileData, about: e.target.value})} rows="4" className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600 resize-none" placeholder="Tell us about your professional journey..." />
                        </div>
                        
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Skills (Comma Separated)</label>
                            <input value={profileData.skills} onChange={(e) => setProfileData({...profileData, skills: e.target.value})} className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-600" placeholder="React, Node.js, AWS, Python..." />
                        </div>
                        
                        <div className="pt-4">
                            <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto">
                                {loading ? "Saving Changes..." : "Save Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* TAB CONTENT: RESUME & AI */}
            {activeTab === "resume" && (
                <div className="space-y-6 animate-fadeIn">
                    
                    {/* 1. Resume Uploader Card (REDESIGNED) */}
                    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 shadow-xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    Master Resume
                                    {resumeUrl && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">Upload your latest PDF CV to unlock AI analysis.</p>
                            </div>
                            {resumeUrl && (
                                <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/30 underline-offset-4">
                                    View Current Resume
                                </a>
                            )}
                        </div>

                        {/* NEW: Custom Drag & Drop Zone */}
                        <form onSubmit={handleUpload} className="group relative">
                            {!file ? (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500/50 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="mb-2 p-2 bg-slate-800 rounded-full text-slate-400 group-hover:text-indigo-400 transition-colors">
                                            <UploadIcon />
                                        </div>
                                        <p className="text-sm text-slate-400"><span className="font-bold text-indigo-400">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-slate-500 mt-1">PDF (Max 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                                </label>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                                            <FileIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</p>
                                            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            type="submit" 
                                            disabled={loading}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                                        >
                                            {loading ? `Uploading ${uploadProgress}%` : "Upload Now"}
                                        </button>
                                        <button type="button" onClick={() => setFile(null)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><CloseIcon /></button>
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div className="w-full bg-slate-800 rounded-full h-1 mt-4 overflow-hidden">
                                    <div className="bg-indigo-500 h-1 rounded-full transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            )}

                            {message && !loading && (
                                <p className={`text-center text-xs font-bold mt-3 ${message === "Success!" ? "text-emerald-400" : "text-red-400"}`}>
                                    {message === "Success!" ? "✅ Resume uploaded successfully" : "❌ Upload failed"}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* 2. AI Analysis Dashboard */}
                    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        
                        {!aiAnalysis ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 text-indigo-400">
                                    <ScanIcon />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Evaluate Your Resume</h3>
                                <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm">
                                    Compare your resume against a specific job title to see your Match Score and missing keywords.
                                </p>
                                
                                <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-2">
                                    <input 
                                        type="text" 
                                        className="flex-1 bg-[#020617] border border-slate-700 text-white px-5 py-3.5 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
                                        placeholder="e.g. Frontend Developer"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                    />
                                    <button 
                                        onClick={handleSelfCheck}
                                        disabled={analyzing}
                                        className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3.5 font-bold text-sm rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {analyzing ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                                                Scanning...
                                            </>
                                        ) : (
                                            <>
                                                <RobotIcon /> Analyze
                                            </>
                                        )}
                                    </button>
                                </div>
                                {!resumeUrl && (
                                    <p className="text-xs text-red-400 mt-4 font-medium bg-red-500/10 inline-block px-3 py-1 rounded-lg border border-red-500/20">
                                        ⚠️ Please upload a resume above first.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="animate-fadeIn">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-slate-800">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Analysis Report</h3>
                                        <p className="text-sm text-slate-400">Target Role: <span className="text-indigo-400 font-bold">{targetRole || "General"}</span></p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 md:mt-0 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Match Score</p>
                                            <p className={`text-3xl font-black ${aiAnalysis.matchScore >= 80 ? "text-emerald-400" : aiAnalysis.matchScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                                                {aiAnalysis.matchScore}%
                                            </p>
                                        </div>
                                        <div className={`h-12 w-1 bg-slate-800 rounded-full`}></div>
                                        <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-xl font-bold bg-slate-900 border-2
                                            ${aiAnalysis.matchScore >= 80 ? "border-emerald-500/30 text-emerald-400" : aiAnalysis.matchScore >= 50 ? "border-yellow-500/30 text-yellow-400" : "border-red-500/30 text-red-400"}
                                        `}>
                                            {aiAnalysis.matchScore >= 80 ? "A+" : aiAnalysis.matchScore >= 50 ? "B" : "C"}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-900/10 p-6 rounded-xl mb-8 border border-indigo-500/20">
                                    <h4 className="text-xs font-bold text-indigo-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                        <SparklesIcon /> Executive Summary
                                    </h4>
                                    <div className="text-slate-300 text-sm leading-relaxed markdown-text">
                                        <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span> Identified Strengths
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {aiAnalysis.matchedSkills?.length > 0 ? (
                                                aiAnalysis.matchedSkills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : <span className="text-slate-500 text-sm italic">No specific skills matched.</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span> Missing Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {aiAnalysis.missingRequiredSkills?.length > 0 ? (
                                                aiAnalysis.missingRequiredSkills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg opacity-90">
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : <span className="text-slate-500 text-sm italic">Great job! No major keywords missing.</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                                    <button 
                                        onClick={() => setAiAnalysis(null)}
                                        className="text-slate-500 hover:text-white text-sm font-bold transition-colors uppercase tracking-wider flex items-center justify-center gap-2 mx-auto hover:bg-slate-800 px-4 py-2 rounded-lg"
                                    >
                                        <ScanIcon /> Start New Scan
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

      </div>

     {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-[#0f172a] border border-slate-700 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative text-center">
                <button onClick={() => setShowAvatarModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><CloseIcon /></button>
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">IDENTITY FORGE</h3>
                <p className="text-slate-400 text-sm mb-8">Generate a unique digital persona or upload your own.</p>
                
                <div className="w-40 h-40 mx-auto bg-slate-900 rounded-full border-4 border-indigo-500/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)] overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" className="w-full h-full object-cover"/>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={generateRandomAvatar} className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-700 hover:border-indigo-500 transition-all shadow-lg"><MagicIcon /> Randomize</button>
                    <label className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-lg"><UploadIcon /> Upload Photo<input type="file" accept="image/*" hidden onChange={handleImageUpload} /></label>
                </div>
                
                <button onClick={saveGeneratedAvatar} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95">Confirm Identity</button>
            </div>
        </div>
      )}
    </div>
  );
}
 
export default Profile;