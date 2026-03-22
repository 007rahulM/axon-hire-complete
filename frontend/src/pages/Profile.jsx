

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../api/axiosInstance";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom"; // 👈 Needed for "Browse Jobs"

// // --- ICONS ---
// const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const ScanIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><path d="M7 12v3h10v-3"/></svg>);
// const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>);
// const MagicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
// const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
// const RobotIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>);
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
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* --- LEFT COLUMN: PROFILE CARD --- */}
//         <div className="space-y-6">
//             <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center relative overflow-hidden shadow-2xl">
//                 <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/30 to-transparent"></div>
                
//                 <div className="relative z-10">
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
//                     <div className="text-center py-10 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed flex flex-col items-center justify-center">
//                         <p className="text-slate-500 text-sm mb-4">No jobs applied yet.</p>
//                         <Link to="/jobs" className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
//                             Browse Jobs
//                         </Link>
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
                    
//                     {/* 1. Resume Uploader Card (REDESIGNED) */}
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

//                         {/* NEW: Custom Drag & Drop Zone */}
//                         <form onSubmit={handleUpload} className="group relative">
//                             {!file ? (
//                                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 hover:border-indigo-500/50 transition-all">
//                                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                         <div className="mb-2 p-2 bg-slate-800 rounded-full text-slate-400 group-hover:text-indigo-400 transition-colors">
//                                             <UploadIcon />
//                                         </div>
//                                         <p className="text-sm text-slate-400"><span className="font-bold text-indigo-400">Click to upload</span> or drag and drop</p>
//                                         <p className="text-xs text-slate-500 mt-1">PDF (Max 5MB)</p>
//                                     </div>
//                                     <input type="file" className="hidden" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
//                                 </label>
//                             ) : (
//                                 <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-xl">
//                                     <div className="flex items-center gap-3">
//                                         <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
//                                             <FileIcon />
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</p>
//                                             <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <button 
//                                             type="submit" 
//                                             disabled={loading}
//                                             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
//                                         >
//                                             {loading ? `Uploading ${uploadProgress}%` : "Upload Now"}
//                                         </button>
//                                         <button type="button" onClick={() => setFile(null)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><CloseIcon /></button>
//                                     </div>
//                                 </div>
//                             )}

//                             {loading && (
//                                 <div className="w-full bg-slate-800 rounded-full h-1 mt-4 overflow-hidden">
//                                     <div className="bg-indigo-500 h-1 rounded-full transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
//                                 </div>
//                             )}

//                             {message && !loading && (
//                                 <p className={`text-center text-xs font-bold mt-3 ${message === "Success!" ? "text-emerald-400" : "text-red-400"}`}>
//                                     {message === "Success!" ? "✅ Resume uploaded successfully" : "❌ Upload failed"}
//                                 </p>
//                             )}
//                         </form>
//                     </div>

//                     {/* 2. AI Analysis Dashboard */}
//                     <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 relative overflow-hidden shadow-xl">
//                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        
//                         {!aiAnalysis ? (
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


//new one //

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

// ─── ICONS ───
const UploadIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const FileIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const ScanIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>;
const PencilIcon = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
const MagicIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const CloseIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SparklesIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const CheckIcon = () => <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;

// shared input style
const inp = {
  width: "100%", padding: "9px 12px",
  background: "var(--bg-subtle)", color: "var(--text-1)",
  border: "1px solid var(--border-strong)", borderRadius: "6px",
  fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
  transition: "border-color 0.15s",
};
const onF = e => e.target.style.borderColor = "var(--accent)";
const onB = e => e.target.style.borderColor = "var(--border-strong)";

function Profile() {
  const { user, login } = useAuth();

  // ── SAME state as original — untouched ──
  const [activeTab, setActiveTab] = useState("resume");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profileData, setProfileData] = useState({ title: "", about: "", skills: "", profilePicture: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("Felix");
  const [avatarStyle, setAvatarStyle] = useState("adventurer");

  const API_BASE_URL = import.meta.env.MODE === "production"
    ? "https://axon-hire-mvp.onrender.com"
    : "http://localhost:5000";

  // ── SAME logic as original — untouched ──
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/profile");
        setResumeUrl(res.data.resumeUrl);
        setProfileData({
          title: res.data.title || "",
          about: res.data.about || "",
          skills: res.data.skills ? res.data.skills.join(", ") : "",
          profilePicture: res.data.profilePicture || "",
        });
      } catch (err) { console.error(err); }
    };
    fetchProfile();
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
      setAppliedJobs(saved);
    }
  }, [user]);

  // ── SAME — untouched ──
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first");
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true); setUploadProgress(0);
    try {
      const res = await axiosInstance.post("/users/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (pe) => setUploadProgress(Math.round((pe.loaded * 100) / pe.total)),
      });
      setResumeUrl(res.data.resumeUrl);
      setMessage("Success!");
      if (login) login(res.data.user, localStorage.getItem("token"));
    } catch { setMessage("Failed."); }
    finally { setLoading(false); setTimeout(() => setUploadProgress(0), 2000); }
  };

  // ── SAME — untouched ──
  const handleSelfCheck = async () => {
    if (!resumeUrl) return alert("Upload resume first to use AI features.");
    setAnalyzing(true);
    try {
      const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
      const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole });
      if (res.data.success) setAiAnalysis(res.data.analysis);
    } catch { alert("Analysis failed."); }
    finally { setAnalyzing(false); }
  };

  // ── SAME — untouched ──
  const handleSaveProfile = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
      await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
      setProfileMsg("Profile updated!");
      setTimeout(() => setProfileMsg(""), 3000);
    } catch { setProfileMsg("Failed to update."); }
    finally { setLoading(false); }
  };

  // ── SAME — untouched ──
  const generateRandomAvatar = () => {
    const seeds = ["Felix","Aneka","Milo","Bella","Jack","Luna","Zoe","Leo"];
    const styles = ["adventurer","bottts","avataaars","lorelei","notionists"];
    setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
    setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
  };

  // ── SAME — untouched ──
  const saveGeneratedAvatar = async () => {
    const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
    setProfileData(prev => ({ ...prev, profilePicture: url }));
    try {
      await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
      setShowAvatarModal(false);
    } catch { alert("Failed to save avatar"); }
  };

  // ── SAME — untouched ──
  const handleImageUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const fd = new FormData();
    fd.append("avatar", f);
    try {
      const res = await axiosInstance.post("/users/upload-avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
      setShowAvatarModal(false);
    } catch { alert("Image upload failed"); }
  };

  // ── SAME — untouched ──
  const handleClearHistory = () => {
    if (!user) return;
    setAppliedJobs([]);
    localStorage.removeItem(`appliedJobs_${user.email}`);
  };

  // ── SAME — untouched ──
  const getAvatarUrl = () => {
    const pic = profileData.profilePicture;
    if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
    if (pic.startsWith("http")) return pic;
    return `${API_BASE_URL}${pic}`;
  };

  // ── Score color helper ──
  const scoreColor = (s) => s >= 80 ? "var(--green)" : s >= 50 ? "var(--orange)" : "var(--red)";
  const scoreBg    = (s) => s >= 80 ? "var(--green-bg)" : s >= 50 ? "var(--orange-bg)" : "var(--red-bg)";
  const scoreGrade = (s) => s >= 80 ? "A+" : s >= 50 ? "B" : "C";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", padding: "24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", alignItems: "start" }} className="profile-grid">

        {/* ══ LEFT COLUMN ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Profile card */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
            {/* Banner */}
            <div style={{ height: "64px", background: "var(--accent-bg)", borderBottom: "1px solid var(--accent-mid)" }} />
            {/* Avatar + info */}
            <div style={{ padding: "0 20px 20px", textAlign: "center" }}>
              <div style={{ position: "relative", display: "inline-block", marginTop: "-28px", marginBottom: "10px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "3px solid var(--bg-surface)", overflow: "hidden", background: "var(--bg-subtle)" }}>
                  <img src={getAvatarUrl()} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`; }} />
                </div>
                <button onClick={() => setShowAvatarModal(true)}
                  style={{ position: "absolute", bottom: 0, right: 0, width: "20px", height: "20px", borderRadius: "50%", background: "var(--accent)", border: "2px solid var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
                  <PencilIcon />
                </button>
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{user?.name}</div>
              <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, marginTop: "2px" }}>{profileData.title || "Ready to work"}</div>
              <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>{user?.email}</div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "3px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}>
                  {user?.role === "recruiter" ? "Recruiter" : "Candidate"}
                </span>
              </div>
            </div>
          </div>

          {/* Applied jobs history */}
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)" }}>Recent Applications</span>
              {appliedJobs.length > 0 && (
                <button onClick={handleClearHistory} style={{ fontSize: "11px", color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Clear</button>
              )}
            </div>
            {appliedJobs.length === 0 ? (
              <div style={{ padding: "24px 16px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "10px" }}>No applications yet</p>
                <Link to="/jobs" style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Browse jobs →</Link>
              </div>
            ) : (
              <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                {appliedJobs.map((job, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                      {job.company?.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-3)" }}>{job.company}</div>
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: 600, color: "var(--green)", background: "var(--green-bg)", padding: "1px 6px", borderRadius: "2px", textTransform: "uppercase", flexShrink: 0 }}>Applied</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Tab switcher */}
          <div style={{ display: "flex", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px", gap: "4px", width: "fit-content" }}>
            {[{ id: "resume", label: "Resume & AI" }, { id: "details", label: "Edit Profile" }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: "7px 18px", borderRadius: "5px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, transition: "all 0.15s", background: activeTab === tab.id ? "var(--accent)" : "transparent", color: activeTab === tab.id ? "white" : "var(--text-2)" }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── TAB: EDIT PROFILE ── */}
          {activeTab === "details" && (
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "20px" }}>Personal Details</h2>
              <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {profileMsg && (
                  <div style={{ padding: "9px 12px", borderRadius: "6px", background: profileMsg.includes("!") ? "var(--green-bg)" : "var(--red-bg)", border: `1px solid ${profileMsg.includes("!") ? "var(--green)" : "var(--red)"}`, fontSize: "12px", color: profileMsg.includes("!") ? "var(--green)" : "var(--red)" }}>
                    {profileMsg}
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Headline</label>
                  <input value={profileData.title} onChange={e => setProfileData({ ...profileData, title: e.target.value })} placeholder="e.g. Senior Full Stack Engineer" style={inp} onFocus={onF} onBlur={onB} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>About</label>
                  <textarea value={profileData.about} onChange={e => setProfileData({ ...profileData, about: e.target.value })} rows={4} placeholder="Tell us about your professional journey…" style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} onFocus={onF} onBlur={onB} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Skills <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(comma separated)</span></label>
                  <input value={profileData.skills} onChange={e => setProfileData({ ...profileData, skills: e.target.value })} placeholder="React, Node.js, AWS, Python…" style={inp} onFocus={onF} onBlur={onB} />
                </div>
                <div>
                  <button type="submit" disabled={loading}
                    style={{ padding: "9px 22px", borderRadius: "6px", background: loading ? "var(--bg-subtle)" : "var(--accent)", color: loading ? "var(--text-3)" : "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "Saving…" : "Save profile"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── TAB: RESUME & AI ── */}
          {activeTab === "resume" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Upload card */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h2 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", display: "flex", alignItems: "center", gap: "8px" }}>
                      Master Resume
                      {resumeUrl && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />}
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "2px" }}>Upload your latest PDF to unlock AI analysis</p>
                  </div>
                  {resumeUrl && (
                    <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
                      <FileIcon /> View current
                    </a>
                  )}
                </div>

                <form onSubmit={handleUpload}>
                  {!file ? (
                    <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100px", border: "1.5px dashed var(--border-strong)", borderRadius: "8px", cursor: "pointer", background: "var(--bg-subtle)", transition: "border-color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
                    >
                      <div style={{ color: "var(--text-3)", marginBottom: "6px" }}><UploadIcon /></div>
                      <p style={{ fontSize: "12px", color: "var(--text-2)" }}><span style={{ color: "var(--accent)", fontWeight: 500 }}>Click to upload</span> or drag & drop</p>
                      <p style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>PDF only, max 5MB</p>
                      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                    </label>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                      <div style={{ width: "32px", height: "32px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                        <FileIcon />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
                        <div style={{ fontSize: "11px", color: "var(--text-3)" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <div style={{ display: "flex", gap: "7px" }}>
                        <button type="submit" disabled={loading}
                          style={{ padding: "6px 14px", borderRadius: "5px", background: "var(--accent)", color: "white", border: "none", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                          {loading ? `${uploadProgress}%` : "Upload"}
                        </button>
                        <button type="button" onClick={() => setFile(null)}
                          style={{ width: "28px", height: "28px", borderRadius: "5px", background: "transparent", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  )}

                  {loading && (
                    <div style={{ marginTop: "10px", height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "var(--accent)", borderRadius: "2px", width: `${uploadProgress}%`, transition: "width 0.3s" }} />
                    </div>
                  )}
                  {message && !loading && (
                    <p style={{ marginTop: "8px", fontSize: "12px", fontWeight: 500, color: message === "Success!" ? "var(--green)" : "var(--red)" }}>
                      {message === "Success!" ? "✓ Resume uploaded successfully" : "✗ Upload failed"}
                    </p>
                  )}
                </form>
              </div>

              {/* AI Analysis card */}
              <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
                {/* Top accent */}
                <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--purple))" }} />
                <div style={{ padding: "24px" }}>
                  {!aiAnalysis ? (
                    /* Empty state */
                    <div style={{ textAlign: "center", padding: "16px 0" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "var(--accent)" }}>
                        <ScanIcon />
                      </div>
                      <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", marginBottom: "6px" }}>Evaluate your resume</h3>
                      <p style={{ fontSize: "12px", color: "var(--text-3)", maxWidth: "360px", margin: "0 auto 20px", lineHeight: 1.6 }}>
                        Compare your resume against a role to see your match score and missing keywords.
                      </p>
                      <div style={{ display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto" }}>
                        <input
                          type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)}
                          placeholder="e.g. Frontend Developer"
                          style={{ ...inp, flex: 1 }} onFocus={onF} onBlur={onB}
                        />
                        <button onClick={handleSelfCheck} disabled={analyzing}
                          style={{ padding: "9px 18px", borderRadius: "6px", background: analyzing ? "var(--bg-subtle)" : "var(--text-1)", color: analyzing ? "var(--text-3)" : "var(--bg-surface)", border: "none", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, cursor: analyzing ? "not-allowed" : "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}>
                          {analyzing ? (
                            <><span style={{ width: "12px", height: "12px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "ax-spin 0.7s linear infinite" }} />Scanning…</>
                          ) : "Analyze"}
                        </button>
                      </div>
                      {!resumeUrl && (
                        <p style={{ marginTop: "10px", fontSize: "11px", color: "var(--orange)", background: "var(--orange-bg)", display: "inline-block", padding: "3px 10px", borderRadius: "4px" }}>
                          Upload a resume above first
                        </p>
                      )}
                    </div>
                  ) : (
                    /* Results */
                    <div>
                      {/* Score header */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                        <div>
                          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>Analysis Report</h3>
                          <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
                            Target: <span style={{ color: "var(--accent)", fontWeight: 500 }}>{targetRole || "General"}</span>
                          </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px" }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Match Score</div>
                            <div style={{ fontSize: "28px", fontWeight: 700, color: scoreColor(aiAnalysis.matchScore), fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                              {aiAnalysis.matchScore}%
                            </div>
                          </div>
                          <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: scoreBg(aiAnalysis.matchScore), border: `1px solid ${scoreColor(aiAnalysis.matchScore)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: scoreColor(aiAnalysis.matchScore) }}>
                            {scoreGrade(aiAnalysis.matchScore)}
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "8px", padding: "14px 16px", marginBottom: "18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent)", marginBottom: "8px" }}>
                          <SparklesIcon /> Executive Summary
                        </div>
                        <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.75 }}>
                          <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
                        </div>
                      </div>

                      {/* Skills grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-2)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)" }} />Identified Strengths
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {aiAnalysis.matchedSkills?.length > 0
                              ? aiAnalysis.matchedSkills.map((s, i) => <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: 500, background: "var(--green-bg)", color: "var(--green)", border: "1px solid var(--green)" }}>{s}</span>)
                              : <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>None matched</span>
                            }
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-2)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--red)" }} />Missing Keywords
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {aiAnalysis.missingRequiredSkills?.length > 0
                              ? aiAnalysis.missingRequiredSkills.map((s, i) => <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: 500, background: "var(--red-bg)", color: "var(--red)", border: "1px solid var(--red)" }}>{s}</span>)
                              : <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>No missing keywords!</span>
                            }
                          </div>
                        </div>
                      </div>

                      {/* Re-scan */}
                      <button onClick={() => setAiAnalysis(null)}
                        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", padding: "0" }}>
                        <ScanIcon /> Start new scan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ AVATAR MODAL ══ */}
      {showAvatarModal && (
        <div onClick={() => setShowAvatarModal(false)} style={{ position: "fixed", inset: 0, background: "var(--modal-overlay)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px", width: "100%", maxWidth: "380px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)" }}>Identity Forge</h3>
              <button onClick={() => setShowAvatarModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)" }}><CloseIcon /></button>
            </div>

            {/* Avatar preview */}
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid var(--accent-mid)", overflow: "hidden", margin: "0 auto 20px", background: "var(--bg-subtle)" }}>
              <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" style={{ width: "100%", height: "100%" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              <button onClick={generateRandomAvatar}
                style={{ padding: "10px", borderRadius: "7px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-1)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <MagicIcon /> Randomize
              </button>
              <label style={{ padding: "10px", borderRadius: "7px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-1)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <UploadIcon /> Upload photo
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
              </label>
            </div>

            <button onClick={saveGeneratedAvatar}
              style={{ width: "100%", padding: "10px", borderRadius: "7px", background: "var(--accent)", color: "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
              Confirm identity
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ax-spin { to { transform: rotate(360deg); } }
        @media(max-width:768px) { .profile-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

export default Profile;