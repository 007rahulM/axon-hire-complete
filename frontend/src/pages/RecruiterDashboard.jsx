


// import { useState, useEffect, useRef } from "react";
// import axiosInstance from "../api/axiosInstance";
// import * as XLSX from "xlsx"; 
// import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import ScheduleModal from "../components/ScheduleModal"; 

// // Icons (unchanged)
// const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>);
// const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 21h5v-5"/></svg>);
// const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
// const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
// const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
// const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
// const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>);
// const ListIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
// const BoardIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>);
// const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
// const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
// const BarChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17"/><path d="M5 12h4v8"/></svg>);
// const StopIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18"/></svg>);

// const COLUMNS = [
//   { id: "Submitted", title: "New Applicants", color: "border-blue-500/50" },
//   { id: "Viewed", title: "Viewed", color: "border-indigo-500/50" },
//   { id: "Shortlisted", title: "Shortlisted", color: "border-emerald-500/50" },
//   { id: "Interviewing", title: "Interviewing", color: "border-purple-500/50" },
//   { id: "Hired", title: "Hired", color: "border-cyan-500/50" },
//   { id: "Rejected", title: "Rejected", color: "border-red-500/50" }
// ];

// function RecruiterDashboard() {
//   const [activeTab, setActiveTab] = useState("candidates");
//   const [viewMode, setViewMode] = useState("list"); 
//   const [applications, setApplications] = useState([]);
//   const [myJobs, setMyJobs] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [_page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const observer = useRef(); 
//   const isFetching = useRef(false);
//   const abortControllerRef = useRef(null);

//   const [analyzingId, setAnalyzingId] = useState(null); 
//   const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
//   const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
//   const [analysisMode, setAnalysisMode] = useState("auto"); 
//   const [currentModalApp, setCurrentModalApp] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [pendingDragItem, setPendingDragItem] = useState(null);
//   const [activeDragId, setActiveDragId] = useState(null);

//   const [filterJob, setFilterJob] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterScore, setFilterScore] = useState("All");
//   const [filterDate, setFilterDate] = useState("All");
//   const [validatingSkill, setValidatingSkill] = useState(null); 
//   const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

//   const fetchApplications = async (pageNum = 1, append = false) => {
//     if (isFetching.current) return;
//     try {
//         isFetching.current = true;
//         setLoadingMore(true);
//         const { data } = await axiosInstance.get(`/applications/recruiter?page=${pageNum}&limit=20`);
//         const newApps = data.applications || [];
//         setApplications(prev => append ? [...prev, ...newApps] : newApps);
//         setHasMore(data.hasMore);
//     } catch (err) {
//         console.error("Load failed", err);
//         setError("Failed to load applications.");
//     } finally {
//         setLoadingMore(false);
//         setLoading(false);
//         isFetching.current = false;
//     }
//   };

//   useEffect(() => {
//     const loadTabInitialData = async () => {
//         setLoading(true);
//         if (activeTab === "candidates") {
//             setPage(1);
//             await fetchApplications(1, false);
//         } else if (activeTab === "jobs") {
//             try {
//                 const res = await axiosInstance.get("/jobs/my-jobs");
//                 setMyJobs(Array.isArray(res.data) ? res.data : []);
//             } catch (err) { console.error(err); }
//             setLoading(false);
//         } else if (activeTab === "analytics") {
//             setLoading(false);
//         }
//     };
//     loadTabInitialData();
//   }, [activeTab]);

//   const lastElementRef = (node) => {
//     if (loadingMore) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && hasMore && activeTab === "candidates") {
//             setPage(prevPage => {
//                 const nextPage = prevPage + 1;
//                 fetchApplications(nextPage, true);
//                 return nextPage;
//             });
//         }
//     });
//     if (node) observer.current.observe(node);
//   };

//   const getLatestAnalysis = (app) => {
//     if (!app || !app.aiAnalysis) return null;
//     const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
//     if (history.length === 0) return null;
//     const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
//     return valid || history[0];
//   };

//   const getFilteredApplications = () => {
//     return applications.filter(app => {
//         if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
//         if (filterStatus !== "All" && app.status !== filterStatus) return false;
        
//         const analysis = getLatestAnalysis(app);
//         const score = analysis?.matchScore || analysis?.score || 0;

//         if (filterScore === "High") {
//             if (score < 70) return false;
//         } else if (filterScore === "Medium") {
//             if (score < 40 || score >= 70) return false;
//         } else if (filterScore === "Low") {
//             if (score <= 0 || score >= 40) return false;
//         } else if (filterScore === "Unscored") {
//             if (analysis && score > 0) return false; 
//         }

//         const appDate = new Date(app.createdAt);
//         const today = new Date();
//         if (filterDate === "Today") {
//             if (appDate.toDateString() !== today.toDateString()) return false;
//         }
//         if (filterDate === "Week") {
//             const oneWeekAgo = new Date();
//             oneWeekAgo.setDate(today.getDate() - 7);
//             if (appDate < oneWeekAgo) return false;
//         }
//         return true;
//     });
//   };

//   const getUniqueJobTitles = () => {
//     const titles = applications.map(app => app.jobId?.title).filter(Boolean);
//     return [...new Set(titles)];
//   };

//   const getAnalyticsData = () => {
//     const apps = applications;
//     const statuses = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
//     const scores = { high: 0, medium: 0, low: 0, unscored: 0 };
//     let totalScore = 0;
//     let analyzedCount = 0;

//     apps.forEach(app => {
//       statuses[app.status] = (statuses[app.status] || 0) + 1;
//       const latest = getLatestAnalysis(app);
//       const score = latest?.score ?? latest?.matchScore ?? 0;
      
//       if (score > 0) {
//         analyzedCount++;
//         totalScore += score;
//         if (score >= 70) scores.high++;
//         else if (score >= 40) scores.medium++;
//         else scores.low++;
//       } else {
//         scores.unscored++;
//       }
//     });

//     return {
//       total: apps.length,
//       statuses,
//       scores,
//       avgScore: analyzedCount > 0 ? Math.round(totalScore / analyzedCount) : 0,
//       analyzed: analyzedCount,
//       unanalyzed: apps.length - analyzedCount
//     };
//   };

//   const handleExportExcel = () => {
//     const filteredApps = getFilteredApplications();
//     if (filteredApps.length === 0) return alert("No data to export");
//     const dataToExport = filteredApps.map(app => {
//         const latest = getLatestAnalysis(app);
//         return {
//             "Applicant Name": app.applicantId?.name || "Unknown",
//             "Applicant Email": app.applicantId?.email || "Unknown",
//             "Applied Role": app.jobId?.title || "Deleted Job",
//             "Current Status": app.status,
//             "Application Date": new Date(app.createdAt).toLocaleDateString(),
//             "AI Match Score": latest ? `${latest.matchScore || latest.score}%` : "N/A"
//         };
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates"); 
//     XLSX.writeFile(workbook, `Recruitment_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   const performAnalysis = async (app, force = false, mode = "auto") => {
//     // Don't block if another single analysis is running, only check batch
//     const latest = getLatestAnalysis(app);
//     if (!force && latest && latest.metadata?.status === "SUCCESS") return latest;
//     if (!app.resumeUrl || !app.jobId?._id) return null;

//     setAnalyzingId(app._id);
    
//     try {
//       const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
//       const res = await axiosInstance.post("/ai/analyze", {
//         resumeUrl, 
//         jobId: app.jobId._id, 
//         applicationId: app._id,
//         mode: mode 
//       });

//       if (res.data.success) {
//         const newAnalysis = res.data.analysis;
//         setApplications(prev => prev.map(item => {
//             if (item._id === app._id) {
//                 const oldHistory = Array.isArray(item.aiAnalysis) ? [...item.aiAnalysis] : [];
//                 return { ...item, aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) };
//             }
//             return item;
//         }));
//         if (currentModalApp?._id === app._id) {
//             setCurrentModalApp(prev => ({
//                 ...prev,
//                 aiAnalysis: [newAnalysis, ...(Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [])].slice(0, 5)
//             }));
//         }
//         return newAnalysis;
//       }
//     } catch (err) { 
//       if (err.code !== 'ERR_CANCELED') console.error(err); 
//     } finally { 
//       setAnalyzingId(null);
//     }
//   };

//   const handleAnalyzeAll = async () => {
//     let filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
//     let forceMode = false;
    
//     if (targets.length === 0) {
//         if (!confirm(`Re-analyze visible candidates?`)) return;
//         targets = filteredApps; 
//         forceMode = true;       
//     } else {
//         if (!confirm(`Analyze ${targets.length} candidates?`)) return;
//     }
    
//     setIsAnalyzingAll(true);
//     abortControllerRef.current = new AbortController();
    
//     try {
//       for (let i = 0; i < targets.length; i++) {
//         // Check if cancelled
//         if (abortControllerRef.current && abortControllerRef.current.signal.aborted) {
//           console.log("Analysis cancelled by user");
//           break;
//         }
        
//         const app = targets[i];
//         setCurrentBatchAppId(app._id);
//         await performAnalysis(app, forceMode, analysisMode);
//         await new Promise((r) => setTimeout(r, 1000));
//       }
//     } finally {
//       setCurrentBatchAppId(null);
//       setIsAnalyzingAll(false);
//       abortControllerRef.current = null;
//     }
//   };

//   const handleCancelAnalysis = () => {
//     console.log("Cancel clicked");
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     setIsAnalyzingAll(false);
//     setCurrentBatchAppId(null);
//     setAnalyzingId(null);
//     alert("Analysis cancelled successfully!");
//   };

//   const handleRetryFailed = async () => {
//     const filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => {
//         const latest = getLatestAnalysis(app);
//         return !latest || (latest.matchScore || latest.score) === 0;
//     });
//     if (targets.length === 0) return alert("No failed analyses found.");
//     setIsAnalyzingAll(true);
//     for (const app of targets) {
//       setCurrentBatchAppId(app._id);
//       await performAnalysis(app, true, analysisMode);
//     }
//     setCurrentBatchAppId(null);
//     setIsAnalyzingAll(false);
//   };

//   const handleStatusChange = async (appId, newStatus) => {
//     setApplications(prev => prev.map(app => app._id === appId ? { ...app, status: newStatus } : app));
//     try { await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus }); } catch (err) { console.error(err); }
//   };

//   const handleToggleJob = async (jobId) => {
//       try {
//           const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`);
//           setMyJobs(prev => prev.map(job => 
//               job._id === jobId ? { ...job, isOpen: res.data.job.isOpen } : job
//           ));
//       } catch (_err) { 
//         console.error(_err);
//         alert("Failed to toggle job");
//       }
//   };

//   const handleDeleteJob = async (jobId) => {
//       if (!confirm("Delete this job and all applications?")) return;
//       try {
//           await axiosInstance.delete(`/jobs/${jobId}`);
//           setMyJobs(prev => prev.filter(job => job._id !== jobId));
//       } catch (_err){
//         console.error(_err);
//         alert("Delete failed");
//       }
//   };

//   const handleSaveSkill = async (skillName) => {
//     try {
//       await axiosInstance.post("/ai/skills/add", { canonical: skillName, ...skillForm });
//       setValidatingSkill(null);
//       handleReanalyzeFromModal(); 
//     } catch (err) { console.error(err); }
//   };

//   const handleReanalyzeFromModal = async () => {
//     if (!currentModalApp) return;
//     await performAnalysis(currentModalApp, true, analysisMode);
//   };

//   const handleIndividualAnalyze = async (app) => {
//       await performAnalysis(app, true, analysisMode);
//   };

//   const handleScheduleSubmit = async (scheduleData) => {
//     if (!pendingDragItem) return;
//     try {
//         setApplications(prev => prev.map(app => app._id === pendingDragItem._id ? { ...app, status: "Interviewing", interviewDetails: scheduleData } : app));
//         await axiosInstance.post(`/applications/${pendingDragItem._id}/schedule`, scheduleData);
//         alert("Interview Scheduled!");
//     } catch (err) { console.error(err); }
//   };

//   const openDetails = (app) => { setCurrentModalApp(app); setShowModal(true); };

//   const handleDragStart = (event) => setActiveDragId(event.active.id);
//   const handleDragEnd = (event) => {
//       const { active, over } = event;
//       setActiveDragId(null);
//       if (!over) return;
//       const appId = active.id;
//       const newStatus = over.id;
//       const app = applications.find(a => a._id === appId);
//       if (app && app.status !== newStatus) {
//           if (newStatus === "Interviewing") {
//               setPendingDragItem(app);
//               setShowScheduleModal(true);
//               return;
//           }
//           handleStatusChange(appId, newStatus);
//       }
//   };

//   const getStatusColor = (status) => {
//       switch(status) {
//           case 'Shortlisted': return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
//           case 'Hired': return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
//           case 'Rejected': return "text-red-400 bg-red-500/10 border-red-500/20";
//           case 'Viewed': return "text-blue-400 bg-blue-500/10 border-blue-500/20";
//           case 'Interviewing': return "text-purple-400 bg-purple-500/10 border-purple-500/20";
//           default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
//       }
//   };

//   const renderScoreIndicator = (app) => {
//     const latest = getLatestAnalysis(app);
//     const isAnalyzing = analyzingId === app._id || currentBatchAppId === app._id;
//     if (isAnalyzing) return <span className="text-indigo-400 font-bold text-xs flex items-center gap-2"><span className="animate-spin h-3 w-3 border-2 border-indigo-500 border-t-transparent rounded-full"></span>Auditing...</span>;
//     const scoreValue = latest?.score ?? latest?.matchScore;
//     if (scoreValue !== undefined && scoreValue !== null) {
//         return (
//             <button onClick={() => openDetails(app)} className={`px-4 py-1.5 rounded-full font-bold text-xs border flex items-center gap-2 transition-all hover:scale-105 ${scoreValue >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
//                 <span className={`w-2 h-2 rounded-full ${scoreValue >= 70 ? "bg-emerald-500" : "bg-yellow-500"}`}></span>{scoreValue}%
//             </button>
//         );
//     }
//     return <button onClick={() => handleIndividualAnalyze(app)} className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-800 text-white border-slate-700 hover:bg-slate-700">Analyze</button>;
//   };

//   const renderDiscoveredSkills = () => {
//     const skills = currentModalApp?.discoveredSkills;
//     if (!skills || skills.length === 0) return null;
//     return (
//       <div className="mt-8 pt-8 border-t border-slate-800">
//         <h4 className="text-indigo-400 font-bold text-xs uppercase mb-4 flex items-center gap-2"><SparklesIcon /> Discovered Skills</h4>
//         <div className="flex flex-wrap gap-3">
//           {skills.map((skill, i) => (
//             <div key={i} className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg">
//               <span className="text-slate-300 text-sm">{skill}</span>
//               <button onClick={() => setValidatingSkill(skill)} className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">Approve</button>
//             </div>
//           ))}
//         </div>
//         {validatingSkill && (
//           <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-indigo-500/30">
//             <div className="flex gap-4">
//               <select value={skillForm.category} onChange={(e) => setSkillForm({...skillForm, category: e.target.value})} className="bg-slate-800 text-xs text-white p-2 rounded"><option value="technical-skills">Technical</option><option value="soft-skills">Soft Skill</option></select>
//               <input type="number" value={skillForm.weight} onChange={(e) => setSkillForm({...skillForm, weight: parseFloat(e.target.value)})} className="w-20 bg-slate-800 text-xs text-white p-2 rounded" />
//               <button onClick={() => handleSaveSkill(validatingSkill)} className="bg-indigo-600 px-4 py-2 rounded text-xs font-bold text-white">Confirm</button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
//   const filteredApps = getFilteredApplications();
//   const uniqueJobTitles = getUniqueJobTitles();
//   const activeApp = activeDragId ? applications.find(a => a._id === activeDragId) : null;
//   const analyticsData = getAnalyticsData();

//   return (
//     <div className="min-h-screen p-4 md:p-8 bg-[#020617] text-slate-200 relative pt-[100px] md:pt-[140px]">
//       <style>{`
//         @keyframes float-bg {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animated-bg {
//           background: linear-gradient(-45deg, #1e293b 0%, #0f172a 25%, #1a1f35 50%, #0f172a 75%, #1e293b 100%);
//           background-size: 400% 400%;
//           animation: float-bg 15s ease infinite;
//         }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
//       `}</style>



//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-b border-slate-800 pb-2">
//           <div className="w-full md:w-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Recruiter Dashboard</h2>
//             <div className="flex gap-6 overflow-x-auto pb-1">
//                 <button onClick={() => setActiveTab("candidates")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "candidates" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Applicants</button>
//                 <button onClick={() => setActiveTab("jobs")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "jobs" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Posted Jobs</button>
//                 <button onClick={() => setActiveTab("analytics")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "analytics" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Analytics</button>
//             </div>
//           </div>
          
//           {activeTab === "candidates" && (
//             <div className="flex flex-wrap gap-2 w-full md:w-auto mb-2 md:mb-4">
//                 <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
//                     <button onClick={() => setViewMode("list")} className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}><ListIcon /> List</button>
//                     <button onClick={() => setViewMode("board")} className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${viewMode === 'board' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}><BoardIcon /> Board</button>
//                 </div>
                
//                 <button onClick={handleAnalyzeAll} disabled={isAnalyzingAll || loading || filteredApps.length === 0} className={`px-5 py-2 rounded-lg font-bold shadow-lg flex justify-center items-center gap-2 text-sm border transition-all ${isAnalyzingAll ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-transparent"}`}>
//                 {isAnalyzingAll ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <SparklesIcon />}
//                 {isAnalyzingAll ? "Processing..." : "Batch AI"}
//                 </button>

//                 {isAnalyzingAll && (
//                   <button onClick={handleCancelAnalysis} className="px-5 py-2 rounded-lg font-bold shadow-lg flex justify-center items-center gap-2 text-sm border bg-red-600 hover:bg-red-700 text-white border-transparent transition-all">
//                     <StopIcon /> Cancel
//                   </button>
//                 )}
//             </div>
//           )}
//         </div>

//         {loading && !loadingMore && <div className="text-center py-20 text-slate-500">Loading data...</div>}
//         {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6 text-sm">{error}</div>}

//         {!loading && activeTab === "candidates" && (
//             <>
//                 <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl mb-6 flex flex-col gap-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
//                             <FilterIcon /> Filters:
//                         </div>
//                         <div className="flex gap-2">
//                             <button onClick={handleRetryFailed} disabled={isAnalyzingAll} className="text-xs font-bold flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded border border-red-500/20 transition-all">
//                                 <RefreshIcon /> Retry Failed
//                             </button>
//                             <button onClick={handleExportExcel} className="text-xs font-bold flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded border border-slate-700">
//                                 <DownloadIcon /> Export Excel
//                             </button>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
//                         <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                             <option value="All">All Jobs</option>
//                             {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
//                         </select>
//                         <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                             <option value="All">All Scores</option>
//                             <option value="High">High (70-100%)</option>
//                             <option value="Medium">Medium (40-69%)</option>
//                             <option value="Low">Low (1-39%)</option>
//                             <option value="Unscored">Not Yet Audited</option>
//                         </select>
//                         <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                             <option value="All">Any Date</option>
//                             <option value="Today">Today</option>
//                             <option value="Week">This Week</option>
//                         </select>
//                         <select value={analysisMode} onChange={(e) => setAnalysisMode(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                           <option value="auto">Auto (AI with Local Fallback)</option>
//                           <option value="standard">Standard (Zonal Keyword Match)</option>
//                           <option value="beta">Beta (Strict AI Analysis)</option>
//                         </select>
//                         {viewMode === 'list' && (
//                             <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                                 <option value="All">All Status</option>
//                                 <option value="Submitted">Submitted</option>
//                                 <option value="Viewed">Viewed</option>
//                                 <option value="Shortlisted">Shortlisted</option>
//                                 <option value="Interviewing">Interviewing</option>
//                                 <option value="Hired">Hired</option>
//                                 <option value="Rejected">Rejected</option>
//                             </select>
//                         )}
//                     </div>
//                 </div>

//                 {viewMode === 'list' && (
//                     filteredApps.length === 0 ? (
//                         <div className="p-16 rounded-2xl bg-[#0f172a] border border-slate-800 text-center border-dashed"><h3 className="text-xl font-bold text-white">No Applicants</h3></div>
//                     ) : (
//                         <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-800 bg-[#0f172a]">
//                             <table className="w-full text-left border-collapse whitespace-nowrap">
//                             <thead>
//                                 <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider font-semibold">
//                                 <th className="p-6">Candidate</th>
//                                 <th className="p-6">Role</th>
//                                 <th className="p-6">Status</th>
//                                 <th className="p-6">Resume</th>
//                                 <th className="p-6">AI Auditor Score</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-800">
//                                 {filteredApps.map((app, index) => {
//                                 const isLast = filteredApps.length === index + 1;
//                                 const isBeingAnalyzed = currentBatchAppId === app._id;
//                                 return (
//                                 <tr key={app._id} ref={isLast ? lastElementRef : null} className={`hover:bg-slate-800/50 transition-colors ${isBeingAnalyzed ? "bg-indigo-900/20 animate-pulse" : ""}`}>
//                                     <td className="p-6">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700 overflow-hidden">
//                                                 {app.applicantId?.profilePicture ? (
//                                                     <img src={app.applicantId.profilePicture.startsWith('http') ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/>
//                                                 ) : <UserIcon />}
//                                             </div>
//                                             <div><div className="font-bold text-white text-base">{app.applicantId?.name || "Unknown"}</div><div className="text-sm text-slate-500">{app.applicantId?.email}</div></div>
//                                         </div>
//                                     </td>
//                                     <td className="p-6"><span className="text-slate-300 font-medium text-sm">{app.jobId?.title || "Deleted Job"}</span></td>
//                                     <td className="p-6">
//                                         <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)} className={`bg-transparent text-xs font-bold uppercase tracking-wide border px-3 py-1.5 rounded-lg outline-none cursor-pointer ${getStatusColor(app.status)}`}>
//                                             <option value="Submitted" className="bg-slate-900 text-yellow-400">Submitted</option>
//                                             <option value="Viewed" className="bg-slate-900 text-blue-400">Viewed</option>
//                                             <option value="Shortlisted" className="bg-slate-900 text-emerald-400">Shortlisted</option>
//                                             <option value="Interviewing" className="bg-slate-900 text-purple-400">Interviewing</option>
//                                             <option value="Hired" className="bg-slate-900 text-cyan-400">Hired</option>
//                                             <option value="Rejected" className="bg-slate-900 text-red-400">Rejected</option>
//                                         </select>
//                                     </td>
//                                     <td className="p-6">
//                                         {app.resumeUrl ? (
//                                             <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white text-sm flex items-center gap-2"><FileIcon /> PDF</a>
//                                         ) : <span className="text-slate-600 text-sm">Missing</span>}
//                                     </td>
//                                     <td className="p-6">
//                                         {renderScoreIndicator(app)}
//                                     </td>
//                                 </tr>
//                                 )})}
//                             </tbody>
//                             </table>
//                             {loadingMore && <div className="p-4 text-center text-xs text-slate-500 uppercase font-bold tracking-widest animate-pulse">Loading More Candidates...</div>}
//                         </div>
//                     )
//                 )}

//                 {viewMode === 'board' && (
//                     <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//                         <div className="grid grid-cols-1 md:grid-cols-6 gap-4 overflow-x-auto h-[650px] pb-4">
//                             {COLUMNS.map((col) => (
//                                 <DroppableColumn 
//                                     key={col.id} 
//                                     column={col} 
//                                     items={filteredApps.filter(a => a.status === col.id)} 
//                                     currentBatchAppId={currentBatchAppId}
//                                     openDetails={openDetails}
//                                 />
//                             ))}
//                         </div>
//                         <DragOverlay>{activeApp ? <KanbanCard app={activeApp} isOverlay /> : null}</DragOverlay>
//                     </DndContext>
//                 )}
//             </>
//         )}

//         {!loading && activeTab === "jobs" && (
//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {myJobs.map(job => (
//                     <div key={job._id} className={`bg-[#0f172a] border p-6 rounded-2xl transition-all group ${job.isOpen ? "border-slate-800 hover:border-indigo-500/50" : "border-slate-800 opacity-60 hover:opacity-100"}`}>
//                         <div className="flex justify-between items-start mb-4">
//                             <div className={`p-3 rounded-xl border ${job.isOpen ? "bg-slate-900 border-slate-700 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}><BriefcaseIcon /></div>
//                             <div className="flex gap-2">
//                                 <button onClick={() => handleToggleJob(job._id)} className={`p-2 rounded-lg transition-colors border ${job.isOpen ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20" : "text-slate-400 border-slate-700 bg-slate-800 hover:text-white"}`}>{job.isOpen ? <EyeIcon /> : <EyeOffIcon />}</button>
//                                 <button onClick={() => handleDeleteJob(job._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-red-500/20"><TrashIcon /></button>
//                             </div>
//                         </div>
//                         <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
//                         <div className="flex items-center gap-2 mb-4"><p className="text-xs text-slate-400 uppercase tracking-wide font-bold">{job.company}</p>{!job.isOpen && <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Closed</span>}</div>
//                         <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800"><span>Applicants:</span><span className="font-bold text-white bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">{job.applicantCount || 0}</span></div>
//                     </div>
//                 ))}
//             </div>
//         )}

//         {!loading && activeTab === "analytics" && (
//     <AnalyticsPage 
//   data={analyticsData} 
//   applications={applications} 
//   getLatestAnalysis={getLatestAnalysis} 
//   uniqueJobTitles={uniqueJobTitles} 
// />
//         )}
//       </div>

//       {showModal && currentModalApp && currentAnalysis && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
//           <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[95vh]">
//             <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-center shrink-0 rounded-t-2xl">
//               <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full border border-slate-700 overflow-hidden bg-slate-800">
//                     {currentModalApp.applicantId?.profilePicture ? (
//                         <img src={currentModalApp.applicantId.profilePicture.startsWith('http') ? currentModalApp.applicantId.profilePicture : `${API_BASE_URL}${currentModalApp.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/>
//                     ) : <UserIcon />}
//                   </div>
//                   <div>
//                       <h3 className="text-xl font-bold text-white">{currentModalApp.applicantId?.name}</h3>
//                       <p className="text-xs text-slate-400 font-bold uppercase mt-1">Role: <span className="text-indigo-400">{currentModalApp.jobId?.title}</span></p>
//                   </div>
//               </div>
//               <button onClick={() => setShowModal(false)} className="text-2xl text-slate-500 hover:text-white transition-colors">&times;</button>
//             </div>
            
//             <div className="p-6 md:p-8 space-y-8 bg-[#0f172a] overflow-y-auto custom-scrollbar">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
//                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Match Score</p>
//                         <p className={`text-4xl font-black ${ (currentAnalysis.score ?? currentAnalysis.matchScore) >= 70 ? "text-emerald-400" : "text-yellow-400"}`}>
//                             {currentAnalysis.score ?? currentAnalysis.matchScore ?? 0}%
//                         </p>
//                     </div>
//                     <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
//                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Exp Level</p>
//                         <p className="text-xl font-bold text-white mt-1">{currentAnalysis.experienceLevel || "N/A"}</p>
//                     </div>
//                     <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
//                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Duration</p>
//                         <p className="text-xl font-bold text-white mt-1">
//                             {currentAnalysis.professionalMonths ?? currentAnalysis.totalMonths ?? 0} Mo
//                         </p>
//                     </div>
//                     <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
//                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Portfolio</p>
//                         <p className="text-xl font-bold text-white mt-1">
//                             {currentAnalysis.uniqueLinksFound ?? currentAnalysis.linkedProfiles ?? 0} Links
//                         </p>
//                     </div>
//                 </div>

//                 <div className={`px-4 py-2 rounded-lg border font-bold text-xs uppercase flex items-center gap-2 w-fit ${currentAnalysis.metadata?.method === 'ai' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-slate-800/50 text-slate-400 border-slate-700"}`}>
//                     {currentAnalysis.metadata?.method === 'ai' && <SparklesIcon />}
//                     Method: {currentAnalysis.metadata?.method === 'local' ? 'Standard Keyword Match' : 'AI Contextual Analysis'}
//                 </div>

//                 <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
//                     <h4 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
//                         <SparklesIcon /> AI Hiring Recommendation
//                     </h4>
//                     <p className="text-slate-200 text-sm leading-relaxed italic font-medium">
//                         "{currentAnalysis.summary || "No detailed assessment generated for this candidate."}"
//                     </p>
//                 </div>

//                 {/* <div className="bg-[#020617] p-5 rounded-xl border border-slate-800">
//                     <h4 className="text-slate-500 font-bold text-[10px] uppercase mb-4 tracking-widest">Deterministic Scoring Math</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Skills</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.skillScore || 0}/60</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Experience</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.expScore || 0}/30</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Integrity</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.integrityScore || 0}/10</div></div>
//                         {/* <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">System</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">10/10</div></div> */}
//                     {/* </div> */}
//                 {/* </div> */} 


//                 <div className="bg-[#020617] p-4 rounded-xl border border-slate-800/50 shadow-inner">
//   <div className="flex items-center gap-2 mb-3">
//     <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
//     <h4 className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]"> Deterministic Engine</h4>
//   </div>

//   <div className="grid grid-cols-3 gap-2">
//     {/* Skills */}
//     <div className="bg-slate-900/50 border border-slate-800 p-2 rounded-lg flex flex-col items-center">
//       <p className="text-[12px] text-slate-600 font-bold uppercase mb-1">Skills</p>
//       <div className="text-xsl font-mono font-black text-indigo-400">
//         {currentAnalysis.breakdown?.skillScore || 0}<span className="text-[15px] opacity-40 ml-0.5">/60</span>
//       </div>
//     </div>

//     {/* Experience */}
//     <div className="bg-slate-900/50 border border-slate-800 p-2 rounded-lg flex flex-col items-center">
//       <p className="text-[12px] text-slate-500 font-bold uppercase mb-1">Exp</p>
//       <div className="text-xsl font-mono font-black text-indigo-400">
//         {currentAnalysis.breakdown?.expScore || 0}<span className="text-[15px] opacity-40 ml-0.5">/30</span>
//       </div>
//     </div>

//     {/* Integrity - Fix the key to integrityScore */}
//     <div className="bg-slate-900/50 border border-slate-800 p-2 rounded-lg flex flex-col items-center">
//       <p className="text-[12px] text-slate-500 font-bold uppercase mb-1">Links</p>
//       <div className="text-xsl font-mono font-black text-emerald-400">
//         {currentAnalysis.breakdown?.integrityScore || 0}<span className="text-[15px] opacity-40 ml-0.5">/10</span>
//       </div>
//     </div>
//   </div>
// </div>

                

//                 {currentModalApp.resumeUrl && (
//                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700"><FileIcon /></div>
//                         <div><h4 className="text-white font-bold text-sm">Full Candidate Resume</h4><p className="text-slate-500 text-xs">Access original PDF for manual review.</p></div>
//                     </div>
//                     <a href={currentModalApp.resumeUrl.startsWith("http") ? currentModalApp.resumeUrl : `${API_BASE_URL}${currentModalApp.resumeUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg">View PDF <ExternalLinkIcon /></a>
//                 </div>
//                 )}

//                 <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                         <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide">Matched Competencies</h4>
//                         <div className="flex flex-wrap gap-2">
//                             {currentAnalysis.matchedSkills?.length > 0 ? 
//                                 currentAnalysis.matchedSkills.map((s, i) => <span key={i} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded border border-emerald-500/20">{s}</span>) 
//                                 : <span className="text-slate-500 text-xs italic">None Detected</span>}
//                         </div>
//                     </div>
//                     <div>
//                         <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide">Missing Skills</h4>
//                         <div className="flex flex-wrap gap-2">
//                             {currentAnalysis.missingRequiredSkills?.length > 0 ? 
//                                 currentAnalysis.missingRequiredSkills.map((s, i) => <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20">{s}</span>) 
//                                 : <span className="text-slate-500 text-xs italic">100% Skill Coverage</span>}
//                         </div>
//                     </div>
//                 </div>

//                 {renderDiscoveredSkills()}
//             </div>
            
//             <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-between items-center shrink-0 rounded-b-2xl">
//                 <button onClick={handleReanalyzeFromModal} disabled={analyzingId === currentModalApp._id} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-all">
//                     {analyzingId === currentModalApp._id ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <RefreshIcon />} Force Re-audit
//                 </button>
//                 <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700 transition-all">Done</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ScheduleModal isOpen={showScheduleModal} onClose={() => { setShowScheduleModal(false); setPendingDragItem(null); }} onSubmit={handleScheduleSubmit} candidateName={pendingDragItem?.applicantId?.name || "Candidate"} />
//     </div>
//   );
// }

// // Analytics Page Component
// function AnalyticsPage({ data, applications, getLatestAnalysis, uniqueJobTitles }) {
//   const [analyticsFilterJob, setAnalyticsFilterJob] = useState("All");
//   const [analyticsFilterScore, setAnalyticsFilterScore] = useState("All");

//   const getFilteredAppsForAnalytics = () => {
//     return applications.filter(app => {
//       if (analyticsFilterJob !== "All" && app.jobId?.title !== analyticsFilterJob) return false;
//       const analysis = getLatestAnalysis(app);
//       const score = analysis?.matchScore || analysis?.score || 0;
//       if (analyticsFilterScore === "High" && score < 70) return false;
//       if (analyticsFilterScore === "Medium" && (score < 40 || score >= 70)) return false;
//       if (analyticsFilterScore === "Low" && (score <= 0 || score >= 40)) return false;
//       if (analyticsFilterScore === "Unscored" && score > 0) return false;
//       return true;
//     });
//   };

//   const filteredAnalyticsApps = getFilteredAppsForAnalytics();

//   const getStatusBreakdown = () => {
//     const breakdown = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
//     filteredAnalyticsApps.forEach(app => {
//       breakdown[app.status] = (breakdown[app.status] || 0) + 1;
//     });
//     return breakdown;
//   };

//   const statusBreakdown = getStatusBreakdown();

//   return (
//     <div className="space-y-6">
//       <div className="flex gap-4 flex-wrap">
//         <select value={analyticsFilterJob} onChange={(e) => setAnalyticsFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
//           <option value="All">All Jobs</option>
//           {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
//         </select>
//         <select value={analyticsFilterScore} onChange={(e) => setAnalyticsFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
//           <option value="All">All Scores</option>
//           <option value="High">High (70-100%)</option>
//           <option value="Medium">Medium (40-69%)</option>
//           <option value="Low">Low (1-39%)</option>
//           <option value="Unscored">Not Yet Audited</option>
//         </select>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//           <p className="text-slate-400 text-sm font-bold uppercase mb-2">Total Applicants</p>
//           <p className="text-3xl font-bold text-white">{filteredAnalyticsApps.length}</p>
//         </div>
//         <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//           <p className="text-slate-400 text-sm font-bold uppercase mb-2">Analyzed</p>
//           <p className="text-3xl font-bold text-indigo-400">{data.analyzed}</p>
//         </div>
//         <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//           <p className="text-slate-400 text-sm font-bold uppercase mb-2">Avg Match Score</p>
//           <p className="text-3xl font-bold text-emerald-400">{data.avgScore}%</p>
//         </div>
//         <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//           <p className="text-slate-400 text-sm font-bold uppercase mb-2">Conversion Rate</p>
//           <p className="text-3xl font-bold text-purple-400">{data.total > 0 ? Math.round((data.statuses.Hired / data.total) * 100) : 0}%</p>
//         </div>
//       </div>

//       {/* Score Distribution */}
//       <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//         <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><BarChartIcon /> Score Distribution</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
//             <div className="text-emerald-400 font-bold text-2xl">{data.scores.high}</div>
//             <p className="text-slate-400 text-xs uppercase mt-1">High (70-100%)</p>
//             <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
//               <div className="bg-emerald-500" style={{width: `${data.total > 0 ? (data.scores.high / data.total) * 100 : 0}%`, height: '100%'}}></div>
//             </div>
//           </div>
//           <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
//             <div className="text-yellow-400 font-bold text-2xl">{data.scores.medium}</div>
//             <p className="text-slate-400 text-xs uppercase mt-1">Medium (40-69%)</p>
//             <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
//               <div className="bg-yellow-500" style={{width: `${data.total > 0 ? (data.scores.medium / data.total) * 100 : 0}%`, height: '100%'}}></div>
//             </div>
//           </div>
//           <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
//             <div className="text-orange-400 font-bold text-2xl">{data.scores.low}</div>
//             <p className="text-slate-400 text-xs uppercase mt-1">Low (1-39%)</p>
//             <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
//               <div className="bg-orange-500" style={{width: `${data.total > 0 ? (data.scores.low / data.total) * 100 : 0}%`, height: '100%'}}></div>
//             </div>
//           </div>
//           <div className="bg-slate-600/10 border border-slate-600/20 rounded-lg p-4">
//             <div className="text-slate-400 font-bold text-2xl">{data.scores.unscored}</div>
//             <p className="text-slate-400 text-xs uppercase mt-1">Unscored</p>
//             <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
//               <div className="bg-slate-600" style={{width: `${data.total > 0 ? (data.scores.unscored / data.total) * 100 : 0}%`, height: '100%'}}></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status Distribution */}
//       <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//         <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><BarChartIcon /> Status Pipeline</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {[
//             { label: 'Submitted', value: statusBreakdown.Submitted, color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
//             { label: 'Viewed', value: statusBreakdown.Viewed, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
//             { label: 'Shortlisted', value: statusBreakdown.Shortlisted, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
//             { label: 'Interviewing', value: statusBreakdown.Interviewing, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
//             { label: 'Hired', value: statusBreakdown.Hired, color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
//             { label: 'Rejected', value: statusBreakdown.Rejected, color: 'bg-red-500/10 border-red-500/20 text-red-400' }
//           ].map((status, i) => (
//             <div key={i} className={`border rounded-lg p-4 ${status.color}`}>
//               <div className={`font-bold text-2xl ${status.color.split(' ')[2]}`}>{status.value}</div>
//               <p className="text-slate-400 text-xs uppercase mt-1">{status.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Top Performers */}
//       <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
//         <h3 className="text-white font-bold text-lg mb-4">Top Performers</h3>
//         <div className="space-y-3">
//           {filteredAnalyticsApps
//             .map(app => {
//               const analysis = getLatestAnalysis(app);
//               return { app, score: analysis?.matchScore ?? analysis?.score ?? 0 };
//             })
//             .sort((a, b) => b.score - a.score)
//             .slice(0, 5)
//             .map((item, i) => (
//               <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <span className="text-indigo-400 font-bold">#{i + 1}</span>
//                   <div className="min-w-0">
//                     <p className="font-bold text-white truncate">{item.app.applicantId?.name || "Unknown"}</p>
//                     <p className="text-xs text-slate-400 truncate">{item.app.jobId?.title || "Deleted Job"}</p>
//                   </div>
//                 </div>
//                 <span className={`font-bold text-sm px-3 py-1 rounded whitespace-nowrap ${item.score >= 70 ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}`}>{item.score}%</span>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function DroppableColumn({ column, items, currentBatchAppId, openDetails }) {
//     const { setNodeRef } = useDroppable({ id: column.id });
//     return (
//         <div ref={setNodeRef} className={`bg-[#0f172a] rounded-xl border-t-4 ${column.color} flex flex-col h-full min-h-[500px]`}>
//             <div className="p-3 border-b border-slate-800 bg-slate-900/50 rounded-t-xl flex justify-between items-center"><h3 className="font-bold text-sm text-slate-200">{column.title}</h3><span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span></div>
//             <div className="p-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
//                 {items.map((app) => ( <DraggableCard key={app._id} app={app} isBeingAnalyzed={currentBatchAppId === app._id} openDetails={openDetails} /> ))}
//             </div>
//         </div>
//     );
// }

// function DraggableCard({ app, isBeingAnalyzed, openDetails }) {
//     const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: app._id });
//     const style = transform ? { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 50 : 1 } : undefined;
//     return ( <div ref={setNodeRef} style={style} {...listeners} {...attributes}> <KanbanCard app={app} isBeingAnalyzed={isBeingAnalyzed} openDetails={openDetails} /> </div> );
// }

// function KanbanCard({ app, isOverlay, isBeingAnalyzed, openDetails }) {
//     const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";
//     const getLatestAnalysis = (app) => {
//       if (!app || !app.aiAnalysis) return null;
//       const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
//       if (history.length === 0) return null;
//       const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
//       return valid || history[0];
//     };
//     const latest = getLatestAnalysis(app);
//     const handleClick = () => { if (!isOverlay) openDetails(app); };
//     return (
//         <div onClick={handleClick} className={`p-4 rounded-lg bg-slate-800 border border-slate-700 shadow-sm hover:border-indigo-500/50 cursor-grab group relative transition-all ${isOverlay ? 'shadow-2xl ring-2 ring-indigo-500 rotate-2 cursor-grabbing' : ''} ${isBeingAnalyzed ? 'ring-1 ring-indigo-400' : ''}`} >
//             {isBeingAnalyzed && <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div></div>}
//             <div className="flex items-center gap-3 mb-3 pointer-events-none"> 
//                 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600">
//                     {app.applicantId?.profilePicture ? <img src={app.applicantId.profilePicture.startsWith('http') ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/> : <UserIcon />}
//                 </div>
//                 <div className="min-w-0"><h4 className="font-bold text-[15px] text-white truncate">{app.applicantId?.name}</h4><p className="text-xs text-slate-400 truncate">{app.jobId?.title}</p></div>
//             </div>
//             <div className="flex flex-col gap-2">
//                 <div className="flex justify-between items-center">
//                     {latest ? ( <span className={`text-xs font-bold px-2.5 py-1 rounded w-fit ${latest.matchScore > 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>Score: {latest.matchScore}%</span> ) : <span className="text-xs text-slate-500 italic">No AI Score</span>}
//                     {app.resumeUrl && ( <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-white bg-slate-700/50 p-1.5 rounded-md border border-slate-600 hover:border-slate-500 transition-colors" title="View Resume"> <FileIcon /> </a> )}
//                 </div>
//                 {latest && latest.metadata && (
//                     <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter text-slate-500 px-1">
//                         <span>{latest.metadata.method === 'local' ? 'Standard' : 'AI'} Match</span>
//                         {latest.metadata.confidenceLabel && <span>{latest.metadata.confidenceLabel.split(' ')[0]} Trust</span>}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RecruiterDashboard;


//new one//
// import { useState, useEffect, useRef } from "react";
// import axiosInstance from "../api/axiosInstance";
// import * as XLSX from "xlsx";
// import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import ScheduleModal from "../components/ScheduleModal";

// // ── SAME ICONS as original ──
// const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>);
// const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 21h5v-5"/></svg>);
// const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
// const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
// const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
// const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
// const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>);
// const ListIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
// const BoardIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>);
// const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
// const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
// const BarChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17"/><path d="M5 12h4v8"/></svg>);
// const StopIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18"/></svg>);

// // ── SAME COLUMNS as original ──
// const COLUMNS = [
//   { id: "Submitted",   title: "New",          accent: "#3b82f6" },
//   { id: "Viewed",      title: "Viewed",       accent: "#6366f1" },
//   { id: "Shortlisted", title: "Shortlisted",  accent: "#10b981" },
//   { id: "Interviewing",title: "Interviewing", accent: "#a855f7" },
//   { id: "Hired",       title: "Hired",        accent: "#06b6d4" },
//   { id: "Rejected",    title: "Rejected",     accent: "#ef4444" },
// ];

// function RecruiterDashboard() {
//   // ── ALL STATE — exact same as original ──
//   const [activeTab, setActiveTab] = useState("candidates");
//   const [viewMode, setViewMode] = useState("list");
//   const [applications, setApplications] = useState([]);
//   const [myJobs, setMyJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [_page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const observer = useRef();
//   const isFetching = useRef(false);
//   const abortControllerRef = useRef(null);

//   const [analyzingId, setAnalyzingId] = useState(null);
//   const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
//   const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
//   const [analysisMode, setAnalysisMode] = useState("auto");
//   const [currentModalApp, setCurrentModalApp] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [pendingDragItem, setPendingDragItem] = useState(null);
//   const [activeDragId, setActiveDragId] = useState(null);

//   const [filterJob, setFilterJob] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterScore, setFilterScore] = useState("All");
//   const [filterDate, setFilterDate] = useState("All");
//   const [validatingSkill, setValidatingSkill] = useState(null);
//   const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

//   // ── ALL FUNCTIONS — exact same as original, zero changes ──
//   const fetchApplications = async (pageNum = 1, append = false) => {
//     if (isFetching.current) return;
//     try {
//       isFetching.current = true;
//       setLoadingMore(true);
//       const { data } = await axiosInstance.get(`/applications/recruiter?page=${pageNum}&limit=20`);
//       const newApps = data.applications || [];
//       setApplications(prev => append ? [...prev, ...newApps] : newApps);
//       setHasMore(data.hasMore);
//     } catch (err) {
//       console.error("Load failed", err);
//       setError("Failed to load applications.");
//     } finally {
//       setLoadingMore(false);
//       setLoading(false);
//       isFetching.current = false;
//     }
//   };

//   useEffect(() => {
//     const loadTabInitialData = async () => {
//       setLoading(true);
//       if (activeTab === "candidates") {
//         setPage(1);
//         await fetchApplications(1, false);
//       } else if (activeTab === "jobs") {
//         try {
//           const res = await axiosInstance.get("/jobs/my-jobs");
//           setMyJobs(Array.isArray(res.data) ? res.data : []);
//         } catch (err) { console.error(err); }
//         setLoading(false);
//       } else if (activeTab === "analytics") {
//         setLoading(false);
//       }
//     };
//     loadTabInitialData();
//   }, [activeTab]);

//   const lastElementRef = (node) => {
//     if (loadingMore) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore && activeTab === "candidates") {
//         setPage(prevPage => {
//           const nextPage = prevPage + 1;
//           fetchApplications(nextPage, true);
//           return nextPage;
//         });
//       }
//     });
//     if (node) observer.current.observe(node);
//   };

//   const getLatestAnalysis = (app) => {
//     if (!app || !app.aiAnalysis) return null;
//     const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
//     if (history.length === 0) return null;
//     const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
//     return valid || history[0];
//   };

//   const getFilteredApplications = () => {
//     return applications.filter(app => {
//       if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
//       if (filterStatus !== "All" && app.status !== filterStatus) return false;
//       const analysis = getLatestAnalysis(app);
//       const score = analysis?.matchScore || analysis?.score || 0;
//       if (filterScore === "High") { if (score < 70) return false; }
//       else if (filterScore === "Medium") { if (score < 40 || score >= 70) return false; }
//       else if (filterScore === "Low") { if (score <= 0 || score >= 40) return false; }
//       else if (filterScore === "Unscored") { if (analysis && score > 0) return false; }
//       const appDate = new Date(app.createdAt);
//       const today = new Date();
//       if (filterDate === "Today") { if (appDate.toDateString() !== today.toDateString()) return false; }
//       if (filterDate === "Week") {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(today.getDate() - 7);
//         if (appDate < oneWeekAgo) return false;
//       }
//       return true;
//     });
//   };

//   const getUniqueJobTitles = () => {
//     const titles = applications.map(app => app.jobId?.title).filter(Boolean);
//     return [...new Set(titles)];
//   };

//   const getAnalyticsData = () => {
//     const apps = applications;
//     const statuses = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
//     const scores = { high: 0, medium: 0, low: 0, unscored: 0 };
//     let totalScore = 0;
//     let analyzedCount = 0;
//     apps.forEach(app => {
//       statuses[app.status] = (statuses[app.status] || 0) + 1;
//       const latest = getLatestAnalysis(app);
//       const score = latest?.score ?? latest?.matchScore ?? 0;
//       if (score > 0) {
//         analyzedCount++;
//         totalScore += score;
//         if (score >= 70) scores.high++;
//         else if (score >= 40) scores.medium++;
//         else scores.low++;
//       } else { scores.unscored++; }
//     });
//     return {
//       total: apps.length, statuses, scores,
//       avgScore: analyzedCount > 0 ? Math.round(totalScore / analyzedCount) : 0,
//       analyzed: analyzedCount,
//       unanalyzed: apps.length - analyzedCount
//     };
//   };

//   const handleExportExcel = () => {
//     const filteredApps = getFilteredApplications();
//     if (filteredApps.length === 0) return alert("No data to export");
//     const dataToExport = filteredApps.map(app => {
//       const latest = getLatestAnalysis(app);
//       return {
//         "Applicant Name": app.applicantId?.name || "Unknown",
//         "Applicant Email": app.applicantId?.email || "Unknown",
//         "Applied Role": app.jobId?.title || "Deleted Job",
//         "Current Status": app.status,
//         "Application Date": new Date(app.createdAt).toLocaleDateString(),
//         "AI Match Score": latest ? `${latest.matchScore || latest.score}%` : "N/A"
//       };
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
//     XLSX.writeFile(workbook, `Recruitment_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
//   };

//   const performAnalysis = async (app, force = false, mode = "auto") => {
//     const latest = getLatestAnalysis(app);
//     if (!force && latest && latest.metadata?.status === "SUCCESS") return latest;
//     if (!app.resumeUrl || !app.jobId?._id) return null;
//     setAnalyzingId(app._id);
//     try {
//       const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
//       const res = await axiosInstance.post("/ai/analyze", {
//         resumeUrl, jobId: app.jobId._id, applicationId: app._id, mode
//       });
//       if (res.data.success) {
//         const newAnalysis = res.data.analysis;
//         setApplications(prev => prev.map(item => {
//           if (item._id === app._id) {
//             const oldHistory = Array.isArray(item.aiAnalysis) ? [...item.aiAnalysis] : [];
//             return { ...item, aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) };
//           }
//           return item;
//         }));
//         if (currentModalApp?._id === app._id) {
//           setCurrentModalApp(prev => ({
//             ...prev,
//             aiAnalysis: [newAnalysis, ...(Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [])].slice(0, 5)
//           }));
//         }
//         return newAnalysis;
//       }
//     } catch (err) {
//       if (err.code !== 'ERR_CANCELED') console.error(err);
//     } finally {
//       setAnalyzingId(null);
//     }
//   };

//   const handleAnalyzeAll = async () => {
//     let filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
//     let forceMode = false;
//     if (targets.length === 0) {
//       if (!confirm(`Re-analyze visible candidates?`)) return;
//       targets = filteredApps;
//       forceMode = true;
//     } else {
//       if (!confirm(`Analyze ${targets.length} candidates?`)) return;
//     }
//     setIsAnalyzingAll(true);
//     abortControllerRef.current = new AbortController();
//     try {
//       for (let i = 0; i < targets.length; i++) {
//         if (abortControllerRef.current && abortControllerRef.current.signal.aborted) break;
//         const app = targets[i];
//         setCurrentBatchAppId(app._id);
//         await performAnalysis(app, forceMode, analysisMode);
//         await new Promise((r) => setTimeout(r, 1000));
//       }
//     } finally {
//       setCurrentBatchAppId(null);
//       setIsAnalyzingAll(false);
//       abortControllerRef.current = null;
//     }
//   };

//   const handleCancelAnalysis = () => {
//     if (abortControllerRef.current) abortControllerRef.current.abort();
//     setIsAnalyzingAll(false);
//     setCurrentBatchAppId(null);
//     setAnalyzingId(null);
//     alert("Analysis cancelled successfully!");
//   };

//   const handleRetryFailed = async () => {
//     const filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => {
//       const latest = getLatestAnalysis(app);
//       return !latest || (latest.matchScore || latest.score) === 0;
//     });
//     if (targets.length === 0) return alert("No failed analyses found.");
//     setIsAnalyzingAll(true);
//     for (const app of targets) {
//       setCurrentBatchAppId(app._id);
//       await performAnalysis(app, true, analysisMode);
//     }
//     setCurrentBatchAppId(null);
//     setIsAnalyzingAll(false);
//   };

//   const handleStatusChange = async (appId, newStatus) => {
//     setApplications(prev => prev.map(app => app._id === appId ? { ...app, status: newStatus } : app));
//     try { await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus }); } catch (err) { console.error(err); }
//   };

//   const handleToggleJob = async (jobId) => {
//     try {
//       const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`);
//       setMyJobs(prev => prev.map(job => job._id === jobId ? { ...job, isOpen: res.data.job.isOpen } : job));
//     } catch (_err) { console.error(_err); alert("Failed to toggle job"); }
//   };

//   const handleDeleteJob = async (jobId) => {
//     if (!confirm("Delete this job and all applications?")) return;
//     try {
//       await axiosInstance.delete(`/jobs/${jobId}`);
//       setMyJobs(prev => prev.filter(job => job._id !== jobId));
//     } catch (_err) { console.error(_err); alert("Delete failed"); }
//   };

//   const handleSaveSkill = async (skillName) => {
//     try {
//       await axiosInstance.post("/ai/skills/add", { canonical: skillName, ...skillForm });
//       setValidatingSkill(null);
//       handleReanalyzeFromModal();
//     } catch (err) { console.error(err); }
//   };

//   const handleReanalyzeFromModal = async () => {
//     if (!currentModalApp) return;
//     await performAnalysis(currentModalApp, true, analysisMode);
//   };

//   const handleIndividualAnalyze = async (app) => {
//     await performAnalysis(app, true, analysisMode);
//   };

//   const handleScheduleSubmit = async (scheduleData) => {
//     if (!pendingDragItem) return;
//     try {
//       setApplications(prev => prev.map(app => app._id === pendingDragItem._id ? { ...app, status: "Interviewing", interviewDetails: scheduleData } : app));
//       await axiosInstance.post(`/applications/${pendingDragItem._id}/schedule`, scheduleData);
//       alert("Interview Scheduled!");
//     } catch (err) { console.error(err); }
//   };

//   const openDetails = (app) => { setCurrentModalApp(app); setShowModal(true); };
//   const handleDragStart = (event) => setActiveDragId(event.active.id);
//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     setActiveDragId(null);
//     if (!over) return;
//     const appId = active.id;
//     const newStatus = over.id;
//     const app = applications.find(a => a._id === appId);
//     if (app && app.status !== newStatus) {
//       if (newStatus === "Interviewing") {
//         setPendingDragItem(app);
//         setShowScheduleModal(true);
//         return;
//       }
//       handleStatusChange(appId, newStatus);
//     }
//   };

//   const getStatusStyle = (status) => {
//     const map = {
//       Shortlisted:  { color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)"  },
//       Hired:        { color: "#06b6d4", bg: "rgba(6,182,212,0.1)",   border: "rgba(6,182,212,0.2)"   },
//       Rejected:     { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.2)"   },
//       Viewed:       { color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)"  },
//       Interviewing: { color: "#a855f7", bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.2)"  },
//       Submitted:    { color: "#eab308", bg: "rgba(234,179,8,0.1)",   border: "rgba(234,179,8,0.2)"   },
//     };
//     return map[status] || map.Submitted;
//   };

//   const renderScoreIndicator = (app) => {
//     const latest = getLatestAnalysis(app);
//     const isAnalyzing = analyzingId === app._id || currentBatchAppId === app._id;
//     if (isAnalyzing) return (
//       <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
//         <span style={{ width: "12px", height: "12px", border: "2px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%", animation: "rd-spin 0.7s linear infinite", display: "inline-block" }} />
//         Auditing…
//       </span>
//     );
//     const scoreValue = latest?.score ?? latest?.matchScore;
//     if (scoreValue !== undefined && scoreValue !== null) {
//       const isHigh = scoreValue >= 70;
//       return (
//         <button
//           onClick={() => openDetails(app)}
//           style={{
//             display: "flex", alignItems: "center", gap: "6px",
//             padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700,
//             border: `1px solid ${isHigh ? "rgba(16,185,129,0.3)" : "rgba(234,179,8,0.3)"}`,
//             background: isHigh ? "rgba(16,185,129,0.1)" : "rgba(234,179,8,0.1)",
//             color: isHigh ? "#10b981" : "#eab308",
//             cursor: "pointer", transition: "transform 0.15s",
//           }}
//           onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
//           onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//         >
//           <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isHigh ? "#10b981" : "#eab308" }} />
//           {scoreValue}%
//         </button>
//       );
//     }
//     return (
//       <button
//         onClick={() => handleIndividualAnalyze(app)}
//         style={{
//           padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
//           background: "var(--bg-subtle)", color: "var(--text-2)",
//           border: "1px solid var(--border-strong)", cursor: "pointer", transition: "all 0.15s",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--accent)"; }}
//         onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
//       >
//         Analyze
//       </button>
//     );
//   };

//   const renderDiscoveredSkills = () => {
//     const skills = currentModalApp?.discoveredSkills;
//     if (!skills || skills.length === 0) return null;
//     return (
//       <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
//         <h4 style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
//           <SparklesIcon /> Discovered Skills
//         </h4>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//           {skills.map((skill, i) => (
//             <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", padding: "6px 10px", borderRadius: "6px" }}>
//               <span style={{ fontSize: "13px", color: "var(--text-1)" }}>{skill}</span>
//               <button
//                 onClick={() => setValidatingSkill(skill)}
//                 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)", padding: "2px 6px", borderRadius: "3px", cursor: "pointer" }}
//               >
//                 Approve
//               </button>
//             </div>
//           ))}
//         </div>
//         {validatingSkill && (
//           <div style={{ marginTop: "12px", padding: "14px", background: "var(--bg-subtle)", borderRadius: "8px", border: "1px solid var(--accent-mid)" }}>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <select value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}
//                 style={{ background: "var(--bg-page)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "5px", padding: "6px 8px", fontSize: "12px", outline: "none" }}>
//                 <option value="technical-skills">Technical</option>
//                 <option value="soft-skills">Soft Skill</option>
//               </select>
//               <input type="number" value={skillForm.weight} onChange={e => setSkillForm({ ...skillForm, weight: parseFloat(e.target.value) })}
//                 style={{ width: "70px", background: "var(--bg-page)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "5px", padding: "6px 8px", fontSize: "12px", outline: "none" }} />
//               <button onClick={() => handleSaveSkill(validatingSkill)}
//                 style={{ background: "var(--accent)", color: "white", border: "none", borderRadius: "5px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
//                 Confirm
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
//   const filteredApps = getFilteredApplications();
//   const uniqueJobTitles = getUniqueJobTitles();
//   const activeApp = activeDragId ? applications.find(a => a._id === activeDragId) : null;
//   const analyticsData = getAnalyticsData();

//   // ── shared select style ──
//   const sel = {
//     background: "var(--bg-subtle)", color: "var(--text-1)",
//     border: "1px solid var(--border-strong)", borderRadius: "6px",
//     padding: "7px 10px", fontSize: "12px", outline: "none",
//     fontFamily: "Inter, sans-serif", cursor: "pointer",
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "var(--bg-page)", paddingTop: "80px", paddingBottom: "48px" }}>
//       <style>{`
//         @keyframes rd-spin { to { transform: rotate(360deg); } }
//         @keyframes rd-fadein { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }
//         .rd-table tr:hover td { background: var(--bg-subtle); }
//         .rd-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
//         .rd-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .rd-scrollbar::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }
//         .rd-tab-btn { background: none; border: none; font-family: Inter,sans-serif; cursor: pointer; padding: 10px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.15s; border-bottom: 2px solid transparent; white-space: nowrap; }
//       `}</style>

//       <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

//         {/* ── Page header + tabs ── */}
//         <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border)", paddingBottom: "0" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
//             <div>
//               <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-1)", marginBottom: "16px" }}>
//                 Recruiter Dashboard
//               </h1>
//               <div style={{ display: "flex", gap: "28px", overflowX: "auto" }}>
//                 {[
//                   { id: "candidates", label: "Applicants" },
//                   { id: "jobs",       label: "Posted Jobs" },
//                   { id: "analytics",  label: "Analytics"   },
//                 ].map(t => (
//                   <button
//                     key={t.id}
//                     className="rd-tab-btn"
//                     onClick={() => setActiveTab(t.id)}
//                     style={{
//                       color: activeTab === t.id ? "var(--accent)" : "var(--text-3)",
//                       borderBottomColor: activeTab === t.id ? "var(--accent)" : "transparent",
//                     }}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Candidates tab action buttons */}
//             {activeTab === "candidates" && (
//               <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
//                 {/* View mode toggle */}
//                 <div style={{ display: "flex", background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", borderRadius: "6px", padding: "3px", gap: "2px" }}>
//                   {[
//                     { mode: "list",  Icon: ListIcon,  label: "List"  },
//                     { mode: "board", Icon: BoardIcon, label: "Board" },
//                   ].map(({ mode, Icon, label }) => (
//                     <button
//                       key={mode}
//                       onClick={() => setViewMode(mode)}
//                       style={{
//                         display: "flex", alignItems: "center", gap: "5px",
//                         padding: "5px 10px", borderRadius: "4px", border: "none",
//                         background: viewMode === mode ? "var(--bg-surface)" : "transparent",
//                         color: viewMode === mode ? "var(--text-1)" : "var(--text-3)",
//                         fontSize: "12px", fontWeight: 600, cursor: "pointer",
//                         boxShadow: viewMode === mode ? "var(--shadow)" : "none",
//                         fontFamily: "Inter, sans-serif", transition: "all 0.15s",
//                       }}
//                     >
//                       <Icon /> {label}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Batch AI button */}
//                 <button
//                   onClick={handleAnalyzeAll}
//                   disabled={isAnalyzingAll || loading || filteredApps.length === 0}
//                   style={{
//                     display: "flex", alignItems: "center", gap: "6px",
//                     padding: "7px 14px", borderRadius: "6px", border: "none",
//                     background: isAnalyzingAll ? "var(--bg-subtle)" : "var(--accent)",
//                     color: isAnalyzingAll ? "var(--text-3)" : "white",
//                     fontSize: "12px", fontWeight: 600, cursor: isAnalyzingAll ? "not-allowed" : "pointer",
//                     fontFamily: "Inter, sans-serif", transition: "all 0.15s",
//                   }}
//                 >
//                   {isAnalyzingAll
//                     ? <><span style={{ width: "12px", height: "12px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", animation: "rd-spin 0.7s linear infinite", display: "inline-block" }} /> Processing…</>
//                     : <><SparklesIcon /> Batch AI</>
//                   }
//                 </button>

//                 {/* Cancel button — only when analyzing */}
//                 {isAnalyzingAll && (
//                   <button
//                     onClick={handleCancelAnalysis}
//                     style={{
//                       display: "flex", alignItems: "center", gap: "6px",
//                       padding: "7px 14px", borderRadius: "6px", border: "none",
//                       background: "#ef4444", color: "white",
//                       fontSize: "12px", fontWeight: 600, cursor: "pointer",
//                       fontFamily: "Inter, sans-serif",
//                     }}
//                   >
//                     <StopIcon /> Cancel
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading / error */}
//         {loading && !loadingMore && (
//           <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-3)", fontSize: "13px" }}>
//             Loading data…
//           </div>
//         )}
//         {error && (
//           <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#ef4444", fontSize: "13px", marginBottom: "20px" }}>
//             {error}
//           </div>
//         )}

//         {/* ── CANDIDATES TAB ── */}
//         {!loading && activeTab === "candidates" && (
//           <>
//             {/* Filter bar */}
//             <div style={{
//               background: "var(--bg-surface)", border: "1px solid var(--border)",
//               borderRadius: "10px", padding: "14px 18px", marginBottom: "20px",
//             }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-3)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//                   <FilterIcon /> Filters
//                 </div>
//                 <div style={{ display: "flex", gap: "8px" }}>
//                   <button
//                     onClick={handleRetryFailed}
//                     disabled={isAnalyzingAll}
//                     style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "5px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
//                   >
//                     <RefreshIcon /> Retry Failed
//                   </button>
//                   <button
//                     onClick={handleExportExcel}
//                     style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "5px", border: "1px solid var(--border-strong)", background: "var(--bg-subtle)", color: "var(--text-2)", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
//                   >
//                     <DownloadIcon /> Export Excel
//                   </button>
//                 </div>
//               </div>

//               <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                 <select value={filterJob}    onChange={e => setFilterJob(e.target.value)}    style={sel}>
//                   <option value="All">All Jobs</option>
//                   {uniqueJobTitles.map((t, i) => <option key={i} value={t}>{t}</option>)}
//                 </select>
//                 <select value={filterScore}  onChange={e => setFilterScore(e.target.value)}  style={sel}>
//                   <option value="All">All Scores</option>
//                   <option value="High">High (70–100%)</option>
//                   <option value="Medium">Medium (40–69%)</option>
//                   <option value="Low">Low (1–39%)</option>
//                   <option value="Unscored">Not Yet Audited</option>
//                 </select>
//                 <select value={filterDate}   onChange={e => setFilterDate(e.target.value)}   style={sel}>
//                   <option value="All">Any Date</option>
//                   <option value="Today">Today</option>
//                   <option value="Week">This Week</option>
//                 </select>
//                 <select value={analysisMode} onChange={e => setAnalysisMode(e.target.value)} style={sel}>
//                   <option value="auto">Auto (AI + Local Fallback)</option>
//                   <option value="standard">Standard (Keyword Match)</option>
//                   <option value="beta">Beta (Strict AI)</option>
//                 </select>
//                 {viewMode === "list" && (
//                   <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={sel}>
//                     <option value="All">All Status</option>
//                     <option value="Submitted">Submitted</option>
//                     <option value="Viewed">Viewed</option>
//                     <option value="Shortlisted">Shortlisted</option>
//                     <option value="Interviewing">Interviewing</option>
//                     <option value="Hired">Hired</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 )}
//               </div>
//             </div>

//             {/* LIST VIEW */}
//             {viewMode === "list" && (
//               filteredApps.length === 0 ? (
//                 <div style={{ padding: "64px", background: "var(--bg-surface)", border: "2px dashed var(--border)", borderRadius: "12px", textAlign: "center" }}>
//                   <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-1)", marginBottom: "6px" }}>No Applicants</p>
//                   <p style={{ fontSize: "13px", color: "var(--text-3)" }}>Try adjusting your filters.</p>
//                 </div>
//               ) : (
//                 <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
//                   <div style={{ overflowX: "auto" }} className="rd-scrollbar">
//                     <table className="rd-table" style={{ width: "100%", borderCollapse: "collapse", whiteSpace: "nowrap" }}>
//                       <thead>
//                         <tr style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
//                           {["Candidate", "Role", "Status", "Resume", "AI Score"].map(h => (
//                             <th key={h} style={{ padding: "11px 20px", textAlign: "left", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)" }}>
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredApps.map((app, index) => {
//                           const isLast = filteredApps.length === index + 1;
//                           const isBeingAnalyzed = currentBatchAppId === app._id;
//                           const st = getStatusStyle(app.status);
//                           return (
//                             <tr
//                               key={app._id}
//                               ref={isLast ? lastElementRef : null}
//                               style={{
//                                 borderBottom: "1px solid var(--border)",
//                                 background: isBeingAnalyzed ? "rgba(99,102,241,0.05)" : "transparent",
//                                 transition: "background 0.15s",
//                               }}
//                             >
//                               {/* Candidate */}
//                               <td style={{ padding: "14px 20px" }}>
//                                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                                   <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", flexShrink: 0 }}>
//                                     {app.applicantId?.profilePicture
//                                       ? <img src={app.applicantId.profilePicture.startsWith("http") ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                                       : <UserIcon />}
//                                   </div>
//                                   <div>
//                                     <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-1)" }}>{app.applicantId?.name || "Unknown"}</div>
//                                     <div style={{ fontSize: "11px", color: "var(--text-3)" }}>{app.applicantId?.email}</div>
//                                   </div>
//                                 </div>
//                               </td>
//                               {/* Role */}
//                               <td style={{ padding: "14px 20px", fontSize: "13px", color: "var(--text-2)" }}>{app.jobId?.title || "Deleted Job"}</td>
//                               {/* Status select */}
//                               <td style={{ padding: "14px 20px" }}>
//                                 <select
//                                   value={app.status}
//                                   onChange={e => handleStatusChange(app._id, e.target.value)}
//                                   style={{
//                                     background: st.bg, color: st.color,
//                                     border: `1px solid ${st.border}`,
//                                     borderRadius: "5px", padding: "4px 8px",
//                                     fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
//                                     outline: "none", cursor: "pointer",
//                                     fontFamily: "Inter, sans-serif",
//                                   }}
//                                 >
//                                   {["Submitted","Viewed","Shortlisted","Interviewing","Hired","Rejected"].map(s => (
//                                     <option key={s} value={s} style={{ background: "var(--bg-page)", color: "var(--text-1)" }}>{s}</option>
//                                   ))}
//                                 </select>
//                               </td>
//                               {/* Resume */}
//                               <td style={{ padding: "14px 20px" }}>
//                                 {app.resumeUrl
//                                   ? <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--accent)", fontWeight: 500 }}><FileIcon /> PDF</a>
//                                   : <span style={{ fontSize: "12px", color: "var(--text-3)" }}>Missing</span>}
//                               </td>
//                               {/* Score */}
//                               <td style={{ padding: "14px 20px" }}>{renderScoreIndicator(app)}</td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                     {loadingMore && (
//                       <div style={{ padding: "14px", textAlign: "center", fontSize: "11px", color: "var(--text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
//                         Loading more candidates…
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             )}

//             {/* BOARD VIEW */}
//             {viewMode === "board" && (
//               <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(200px, 1fr))", gap: "12px", overflowX: "auto", height: "660px", paddingBottom: "8px" }} className="rd-scrollbar">
//                   {COLUMNS.map(col => (
//                     <DroppableColumn
//                       key={col.id}
//                       column={col}
//                       items={filteredApps.filter(a => a.status === col.id)}
//                       currentBatchAppId={currentBatchAppId}
//                       openDetails={openDetails}
//                     />
//                   ))}
//                 </div>
//                 <DragOverlay>{activeApp ? <KanbanCard app={activeApp} isOverlay /> : null}</DragOverlay>
//               </DndContext>
//             )}
//           </>
//         )}

//         {/* ── JOBS TAB ── */}
//         {!loading && activeTab === "jobs" && (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
//             {myJobs.length === 0 && (
//               <div style={{ gridColumn: "1/-1", padding: "64px", background: "var(--bg-surface)", border: "2px dashed var(--border)", borderRadius: "12px", textAlign: "center" }}>
//                 <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-1)", marginBottom: "6px" }}>No Jobs Posted</p>
//                 <p style={{ fontSize: "13px", color: "var(--text-3)" }}>Post a job to see it here.</p>
//               </div>
//             )}
//             {myJobs.map(job => (
//               <div
//                 key={job._id}
//                 style={{
//                   background: "var(--bg-surface)", border: "1px solid var(--border)",
//                   borderRadius: "10px", padding: "20px", transition: "border-color 0.15s",
//                   opacity: job.isOpen ? 1 : 0.6,
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.borderColor = job.isOpen ? "var(--accent)" : "var(--border)"}
//                 onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
//                   <div style={{ width: "36px", height: "36px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
//                     <BriefcaseIcon />
//                   </div>
//                   <div style={{ display: "flex", gap: "6px" }}>
//                     <button
//                       onClick={() => handleToggleJob(job._id)}
//                       style={{
//                         width: "30px", height: "30px", borderRadius: "6px", border: "none", cursor: "pointer",
//                         background: job.isOpen ? "rgba(16,185,129,0.1)" : "var(--bg-subtle)",
//                         color: job.isOpen ? "#10b981" : "var(--text-3)",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                       }}
//                       title={job.isOpen ? "Close job" : "Open job"}
//                     >
//                       {job.isOpen ? <EyeIcon /> : <EyeOffIcon />}
//                     </button>
//                     <button
//                       onClick={() => handleDeleteJob(job._id)}
//                       style={{ width: "30px", height: "30px", borderRadius: "6px", border: "none", cursor: "pointer", background: "transparent", color: "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
//                       onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#ef4444"; }}
//                       onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-3)"; }}
//                       title="Delete job"
//                     >
//                       <TrashIcon />
//                     </button>
//                   </div>
//                 </div>

//                 <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-1)", marginBottom: "4px" }}>{job.title}</h3>
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
//                   <span style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{job.company}</span>
//                   {!job.isOpen && <span style={{ fontSize: "9px", background: "var(--bg-subtle)", color: "var(--text-3)", padding: "2px 6px", borderRadius: "3px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Closed</span>}
//                 </div>

//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "6px", padding: "8px 12px" }}>
//                   <span style={{ fontSize: "12px", color: "var(--text-3)" }}>Applicants</span>
//                   <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent)" }}>{job.applicantCount || 0}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── ANALYTICS TAB ── */}
//         {!loading && activeTab === "analytics" && (
//           <AnalyticsPage
//             data={analyticsData}
//             applications={applications}
//             getLatestAnalysis={getLatestAnalysis}
//             uniqueJobTitles={uniqueJobTitles}
//           />
//         )}
//       </div>

//       {/* ── CANDIDATE DETAIL MODAL ── */}
//       {showModal && currentModalApp && currentAnalysis && (
//         <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", padding: "16px" }}>
//           <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "14px", width: "100%", maxWidth: "820px", maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

//             {/* Modal header */}
//             <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                 <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--border-strong)", overflow: "hidden", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)" }}>
//                   {currentModalApp.applicantId?.profilePicture
//                     ? <img src={currentModalApp.applicantId.profilePicture.startsWith("http") ? currentModalApp.applicantId.profilePicture : `${API_BASE_URL}${currentModalApp.applicantId.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                     : <UserIcon />}
//                 </div>
//                 <div>
//                   <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)" }}>{currentModalApp.applicantId?.name}</div>
//                   <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>
//                     Role: <span style={{ color: "var(--accent)", fontWeight: 600 }}>{currentModalApp.jobId?.title}</span>
//                   </div>
//                 </div>
//               </div>
//               <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "var(--text-3)", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>×</button>
//             </div>

//             {/* Modal body */}
//             <div style={{ padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }} className="rd-scrollbar">

//               {/* Score cards */}
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
//                 {[
//                   { label: "Match Score", value: `${currentAnalysis.score ?? currentAnalysis.matchScore ?? 0}%`, highlight: true },
//                   { label: "Exp Level", value: currentAnalysis.experienceLevel || "N/A" },
//                   { label: "Duration", value: `${currentAnalysis.professionalMonths ?? currentAnalysis.totalMonths ?? 0} Mo` },
//                   { label: "Portfolio", value: `${currentAnalysis.uniqueLinksFound ?? currentAnalysis.linkedProfiles ?? 0} Links` },
//                 ].map((card, i) => {
//                   const score = currentAnalysis.score ?? currentAnalysis.matchScore ?? 0;
//                   return (
//                     <div key={i} style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px" }}>
//                       <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{card.label}</div>
//                       <div style={{ fontSize: i === 0 ? "28px" : "18px", fontWeight: 800, color: i === 0 ? (score >= 70 ? "#10b981" : "#eab308") : "var(--text-1)" }}>
//                         {card.value}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Analysis method badge */}
//               <div style={{
//                 display: "inline-flex", alignItems: "center", gap: "6px",
//                 padding: "4px 10px", borderRadius: "4px", width: "fit-content",
//                 background: currentAnalysis.metadata?.method === "ai" ? "var(--accent-bg)" : "var(--bg-subtle)",
//                 border: `1px solid ${currentAnalysis.metadata?.method === "ai" ? "var(--accent-mid)" : "var(--border)"}`,
//                 color: currentAnalysis.metadata?.method === "ai" ? "var(--accent)" : "var(--text-3)",
//                 fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
//               }}>
//                 {currentAnalysis.metadata?.method === "ai" && <SparklesIcon />}
//                 Method: {currentAnalysis.metadata?.method === "local" ? "Standard Keyword Match" : "AI Contextual Analysis"}
//               </div>

//               {/* AI Recommendation */}
//               <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "8px", padding: "16px 18px" }}>
//                 <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}>
//                   <SparklesIcon /> AI Hiring Recommendation
//                 </div>
//                 <p style={{ fontSize: "13px", color: "var(--text-1)", lineHeight: 1.65, fontStyle: "italic" }}>
//                   "{currentAnalysis.summary || "No detailed assessment generated for this candidate."}"
//                 </p>
//               </div>

//               {/* Deterministic Engine */}
//               <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 16px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
//                   <div style={{ width: "3px", height: "12px", background: "var(--accent)", borderRadius: "2px" }} />
//                   <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Deterministic Engine</span>
//                 </div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
//                   {[
//                     { label: "Skills", value: currentAnalysis.breakdown?.skillScore || 0, max: 60 },
//                     { label: "Exp", value: currentAnalysis.breakdown?.expScore || 0, max: 30 },
//                     { label: "Links", value: currentAnalysis.breakdown?.integrityScore || 0, max: 10 },
//                   ].map((item, i) => (
//                     <div key={i} style={{ background: "var(--bg-page)", border: "1px solid var(--border)", borderRadius: "6px", padding: "10px", textAlign: "center" }}>
//                       <div style={{ fontSize: "10px", color: "var(--text-3)", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
//                       <div style={{ fontFamily: "monospace", fontWeight: 800, color: "var(--accent)", fontSize: "16px" }}>
//                         {item.value}<span style={{ fontSize: "11px", opacity: 0.5 }}>/{item.max}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Resume link */}
//               {currentModalApp.resumeUrl && (
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 16px" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                     <div style={{ width: "32px", height: "32px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><FileIcon /></div>
//                     <div>
//                       <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)" }}>Full Candidate Resume</div>
//                       <div style={{ fontSize: "11px", color: "var(--text-3)" }}>Original PDF for manual review</div>
//                     </div>
//                   </div>
//                   <a
//                     href={currentModalApp.resumeUrl.startsWith("http") ? currentModalApp.resumeUrl : `${API_BASE_URL}${currentModalApp.resumeUrl}`}
//                     target="_blank" rel="noreferrer"
//                     style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 14px", background: "var(--accent)", color: "white", borderRadius: "6px", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}
//                   >
//                     View PDF <ExternalLinkIcon />
//                   </a>
//                 </div>
//               )}

//               {/* Matched / Missing skills */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//                 <div>
//                   <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Matched Competencies</div>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                     {currentAnalysis.matchedSkills?.length > 0
//                       ? currentAnalysis.matchedSkills.map((s, i) => <span key={i} style={{ padding: "3px 8px", background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>{s}</span>)
//                       : <span style={{ fontSize: "12px", color: "var(--text-3)", fontStyle: "italic" }}>None Detected</span>}
//                   </div>
//                 </div>
//                 <div>
//                   <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Missing Skills</div>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                     {currentAnalysis.missingRequiredSkills?.length > 0
//                       ? currentAnalysis.missingRequiredSkills.map((s, i) => <span key={i} style={{ padding: "3px 8px", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>{s}</span>)
//                       : <span style={{ fontSize: "12px", color: "var(--text-3)", fontStyle: "italic" }}>100% Skill Coverage</span>}
//                   </div>
//                 </div>
//               </div>

//               {renderDiscoveredSkills()}
//             </div>

//             {/* Modal footer */}
//             <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
//               <button
//                 onClick={handleReanalyzeFromModal}
//                 disabled={analyzingId === currentModalApp._id}
//                 style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--text-3)", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "color 0.15s" }}
//                 onMouseEnter={e => e.currentTarget.style.color = "var(--text-1)"}
//                 onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}
//               >
//                 {analyzingId === currentModalApp._id
//                   ? <span style={{ width: "14px", height: "14px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", animation: "rd-spin 0.7s linear infinite", display: "inline-block" }} />
//                   : <RefreshIcon />}
//                 Force Re-audit
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={{ padding: "8px 20px", background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", color: "var(--text-1)", borderRadius: "6px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Schedule modal — same as original */}
//       <ScheduleModal
//         isOpen={showScheduleModal}
//         onClose={() => { setShowScheduleModal(false); setPendingDragItem(null); }}
//         onSubmit={handleScheduleSubmit}
//         candidateName={pendingDragItem?.applicantId?.name || "Candidate"}
//       />
//     </div>
//   );
// }

// // ── ANALYTICS PAGE — same logic, restyled ──
// function AnalyticsPage({ data, applications, getLatestAnalysis, uniqueJobTitles }) {
//   const [analyticsFilterJob, setAnalyticsFilterJob] = useState("All");
//   const [analyticsFilterScore, setAnalyticsFilterScore] = useState("All");

//   const getFilteredAppsForAnalytics = () => {
//     return applications.filter(app => {
//       if (analyticsFilterJob !== "All" && app.jobId?.title !== analyticsFilterJob) return false;
//       const analysis = getLatestAnalysis(app);
//       const score = analysis?.matchScore || analysis?.score || 0;
//       if (analyticsFilterScore === "High" && score < 70) return false;
//       if (analyticsFilterScore === "Medium" && (score < 40 || score >= 70)) return false;
//       if (analyticsFilterScore === "Low" && (score <= 0 || score >= 40)) return false;
//       if (analyticsFilterScore === "Unscored" && score > 0) return false;
//       return true;
//     });
//   };

//   const filteredAnalyticsApps = getFilteredAppsForAnalytics();

//   const getStatusBreakdown = () => {
//     const breakdown = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
//     filteredAnalyticsApps.forEach(app => {
//       breakdown[app.status] = (breakdown[app.status] || 0) + 1;
//     });
//     return breakdown;
//   };

//   const statusBreakdown = getStatusBreakdown();

//   const sel = { background: "var(--bg-subtle)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "6px", padding: "7px 10px", fontSize: "12px", outline: "none", fontFamily: "Inter, sans-serif", cursor: "pointer" };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

//       {/* Filters */}
//       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//         <select value={analyticsFilterJob} onChange={e => setAnalyticsFilterJob(e.target.value)} style={sel}>
//           <option value="All">All Jobs</option>
//           {uniqueJobTitles.map((t, i) => <option key={i} value={t}>{t}</option>)}
//         </select>
//         <select value={analyticsFilterScore} onChange={e => setAnalyticsFilterScore(e.target.value)} style={sel}>
//           <option value="All">All Scores</option>
//           <option value="High">High (70–100%)</option>
//           <option value="Medium">Medium (40–69%)</option>
//           <option value="Low">Low (1–39%)</option>
//           <option value="Unscored">Not Yet Audited</option>
//         </select>
//       </div>

//       {/* KPI cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
//         {[
//           { label: "Total Applicants", value: filteredAnalyticsApps.length, color: "var(--text-1)" },
//           { label: "Analyzed",         value: data.analyzed,               color: "var(--accent)"  },
//           { label: "Avg Match Score",  value: `${data.avgScore}%`,          color: "#10b981"        },
//           { label: "Conversion Rate",  value: `${data.total > 0 ? Math.round((data.statuses.Hired / data.total) * 100) : 0}%`, color: "#a855f7" },
//         ].map((kpi, i) => (
//           <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px 20px" }}>
//             <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>{kpi.label}</div>
//             <div style={{ fontSize: "26px", fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* Score distribution */}
//       <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
//         <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-1)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
//           <BarChartIcon /> Score Distribution
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
//           {[
//             { label: "High (70–100%)", value: data.scores.high,    color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)" },
//             { label: "Med (40–69%)",   value: data.scores.medium,  color: "#eab308", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.2)"  },
//             { label: "Low (1–39%)",    value: data.scores.low,     color: "#f97316", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.2)" },
//             { label: "Unscored",       value: data.scores.unscored,color: "var(--text-3)", bg: "var(--bg-subtle)", border: "var(--border)" },
//           ].map((s, i) => (
//             <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px", padding: "14px" }}>
//               <div style={{ fontSize: "22px", fontWeight: 800, color: s.color }}>{s.value}</div>
//               <div style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "4px" }}>{s.label}</div>
//               <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden", marginTop: "8px" }}>
//                 <div style={{ height: "100%", background: s.color, width: `${data.total > 0 ? (s.value / data.total) * 100 : 0}%`, transition: "width 0.4s" }} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Status pipeline */}
//       <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
//         <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-1)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
//           <BarChartIcon /> Status Pipeline
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px" }}>
//           {[
//             { label: "Submitted",   value: statusBreakdown.Submitted,   color: "#eab308", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.2)"   },
//             { label: "Viewed",      value: statusBreakdown.Viewed,      color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)"  },
//             { label: "Shortlisted", value: statusBreakdown.Shortlisted, color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)"  },
//             { label: "Interviewing",value: statusBreakdown.Interviewing,color: "#a855f7", bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.2)"  },
//             { label: "Hired",       value: statusBreakdown.Hired,       color: "#06b6d4", bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.2)"   },
//             { label: "Rejected",    value: statusBreakdown.Rejected,    color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)"   },
//           ].map((s, i) => (
//             <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px", padding: "12px" }}>
//               <div style={{ fontSize: "22px", fontWeight: 800, color: s.color }}>{s.value}</div>
//               <div style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "3px" }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Top performers */}
//       <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
//         <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-1)", marginBottom: "16px" }}>Top Performers</div>
//         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//           {filteredAnalyticsApps
//             .map(app => { const analysis = getLatestAnalysis(app); return { app, score: analysis?.matchScore ?? analysis?.score ?? 0 }; })
//             .sort((a, b) => b.score - a.score)
//             .slice(0, 5)
//             .map((item, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "7px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
//                   <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "12px", flexShrink: 0 }}>#{i + 1}</span>
//                   <div style={{ minWidth: 0 }}>
//                     <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.app.applicantId?.name || "Unknown"}</div>
//                     <div style={{ fontSize: "11px", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.app.jobId?.title || "Deleted Job"}</div>
//                   </div>
//                 </div>
//                 <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "4px", whiteSpace: "nowrap", flexShrink: 0, background: item.score >= 70 ? "rgba(16,185,129,0.1)" : "rgba(234,179,8,0.1)", color: item.score >= 70 ? "#10b981" : "#eab308" }}>
//                   {item.score}%
//                 </span>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── KANBAN COMPONENTS — same logic, restyled ──
// function DroppableColumn({ column, items, currentBatchAppId, openDetails }) {
//   const { setNodeRef } = useDroppable({ id: column.id });
//   return (
//     <div ref={setNodeRef} style={{ background: "var(--bg-surface)", borderRadius: "10px", borderTop: `3px solid ${column.accent}`, display: "flex", flexDirection: "column", height: "100%", minHeight: "500px", overflow: "hidden" }}>
//       <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-subtle)", flexShrink: 0 }}>
//         <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{column.title}</span>
//         <span style={{ background: "var(--bg-page)", border: "1px solid var(--border)", color: "var(--text-3)", fontSize: "10px", fontWeight: 700, padding: "1px 7px", borderRadius: "10px" }}>{items.length}</span>
//       </div>
//       <div style={{ padding: "8px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }} className="rd-scrollbar">
//         {items.map(app => (
//           <DraggableCard key={app._id} app={app} isBeingAnalyzed={currentBatchAppId === app._id} openDetails={openDetails} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function DraggableCard({ app, isBeingAnalyzed, openDetails }) {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: app._id });
//   const style = transform ? { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 50 : 1 } : undefined;
//   return (
//     <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       <KanbanCard app={app} isBeingAnalyzed={isBeingAnalyzed} openDetails={openDetails} />
//     </div>
//   );
// }

// function KanbanCard({ app, isOverlay, isBeingAnalyzed, openDetails }) {
//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";
//   const getLatestAnalysis = (app) => {
//     if (!app || !app.aiAnalysis) return null;
//     const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
//     if (history.length === 0) return null;
//     const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
//     return valid || history[0];
//   };
//   const latest = getLatestAnalysis(app);

//   return (
//     <div
//       onClick={() => { if (!isOverlay && openDetails) openDetails(app); }}
//       style={{
//         padding: "12px", borderRadius: "8px",
//         background: "var(--bg-subtle)", border: `1px solid var(--border-strong)`,
//         cursor: "grab", position: "relative", transition: "border-color 0.15s",
//         boxShadow: isOverlay ? "0 12px 32px rgba(0,0,0,0.3)" : "none",
//         transform: isOverlay ? "rotate(2deg)" : "none",
//         outline: isBeingAnalyzed ? "1px solid var(--accent)" : "none",
//       }}
//       onMouseEnter={e => !isOverlay && (e.currentTarget.style.borderColor = "var(--accent)")}
//       onMouseLeave={e => !isOverlay && (e.currentTarget.style.borderColor = "var(--border-strong)")}
//     >
//       {isBeingAnalyzed && (
//         <div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.15)", borderRadius: "8px", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <span style={{ width: "20px", height: "20px", border: "2px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%", animation: "rd-spin 0.7s linear infinite", display: "inline-block" }} />
//         </div>
//       )}
//       <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", pointerEvents: "none" }}>
//         <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-page)", border: "1px solid var(--border)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", flexShrink: 0 }}>
//           {app.applicantId?.profilePicture
//             ? <img src={app.applicantId.profilePicture.startsWith("http") ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             : <UserIcon />}
//         </div>
//         <div style={{ minWidth: 0 }}>
//           <div style={{ fontWeight: 600, fontSize: "12px", color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.applicantId?.name}</div>
//           <div style={{ fontSize: "10px", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.jobId?.title}</div>
//         </div>
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         {latest
//           ? <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", background: latest.matchScore > 70 ? "rgba(16,185,129,0.1)" : "rgba(234,179,8,0.1)", color: latest.matchScore > 70 ? "#10b981" : "#eab308" }}>
//               {latest.matchScore ?? latest.score}%
//             </span>
//           : <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>No score</span>}
//         {app.resumeUrl && (
//           <a
//             href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`}
//             target="_blank" rel="noreferrer"
//             onPointerDown={e => e.stopPropagation()}
//             onClick={e => e.stopPropagation()}
//             style={{ color: "var(--text-3)", background: "var(--bg-page)", padding: "4px", borderRadius: "5px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}
//             title="View Resume"
//           >
//             <FileIcon />
//           </a>
//         )}
//       </div>
//       {latest?.metadata && (
//         <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "9px", color: "var(--text-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
//           <span>{latest.metadata.method === "local" ? "Standard" : "AI"} Match</span>
//           {latest.metadata.confidenceLabel && <span>{latest.metadata.confidenceLabel.split(" ")[0]} Trust</span>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RecruiterDashboard;




































//==================================
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import * as XLSX from "xlsx";
import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ScheduleModal from "../components/ScheduleModal";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const UserIcon     = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileIcon     = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>);
const RefreshIcon  = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 21h5v-5"/></svg>);
const FilterIcon   = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const TrashIcon    = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const BriefcaseIcon= () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const EyeIcon      = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
const EyeOffIcon   = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>);
const ListIcon     = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
const BoardIcon    = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const ExternalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
const BarChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>);
const StopIcon     = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>);
const GlobeIcon    = () => (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const MailIcon     = () => (<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);

// ORIGINAL column IDs preserved exactly
const COLUMNS = [
  { id: "Submitted",    title: "New",          accent: "#6366f1", bg: "rgba(99,102,241,.07)"  },
  { id: "Viewed",       title: "Viewed",       accent: "#3b82f6", bg: "rgba(59,130,246,.07)"  },
  { id: "Shortlisted",  title: "Shortlisted",  accent: "#10b981", bg: "rgba(16,185,129,.07)"  },
  { id: "Interviewing", title: "Interviewing", accent: "#a855f7", bg: "rgba(168,85,247,.07)"  },
  { id: "Hired",        title: "Hired",        accent: "#06b6d4", bg: "rgba(6,182,212,.07)"   },
  { id: "Rejected",     title: "Rejected",     accent: "#ef4444", bg: "rgba(239,68,68,.07)"   },
];

const API_BASE_URL = import.meta.env.MODE === "production"
  ? "https://axon-hire-mvp.onrender.com" : "http://localhost:5000";

const colAccent  = (id) => COLUMNS.find(c => c.id === id)?.accent || "var(--text-3)";
const colBg      = (id) => COLUMNS.find(c => c.id === id)?.bg     || "var(--bg-subtle)";
const scoreColor = (s)  => s >= 70 ? "#10b981" : s >= 40 ? "#eab308" : "#ef4444";
const avatarHue  = (name = "") => { let h = 0; for (let i = 0; i < name.length; i++) h = (h*31+name.charCodeAt(i))%360; return h; };

function Spinner({ size = 12, color = "var(--accent)" }) {
  return <span style={{ width: size, height: size, border: `2px solid ${color}`, borderTopColor: "transparent", borderRadius: "50%", animation: "rd-spin 0.7s linear infinite", display: "inline-block", flexShrink: 0 }} />;
}

function Avatar({ name = "", photo, size = 32 }) {
  const hue = avatarHue(name);
  if (photo) { const src = photo.startsWith("http") ? photo : `${API_BASE_URL}${photo}`; return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />; }
  return <div style={{ width: size, height: size, borderRadius: "50%", background: `hsl(${hue},55%,50%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(size*0.38), fontWeight: 700, color: "#fff", flexShrink: 0 }}>{name.charAt(0).toUpperCase()||"?"}</div>;
}

// getLatestAnalysis as a standalone helper used inside KanbanCard
function getLatestAnalysisFromApp(app) {
  if (!app?.aiAnalysis) return null;
  const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
  if (!history.length) return null;
  return history.find(h => (h.score||0)>0 || (h.matchScore||0)>0) || history[0];
}

function KanbanCard({ app, isOverlay, isBeingAnalyzed, onOpen }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: app._id });
  const latest = getLatestAnalysisFromApp(app);
  const score  = latest?.matchScore ?? latest?.score;
  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1, position: "relative", background: "var(--bg-surface)", border: `1px solid ${isBeingAnalyzed ? "var(--accent)" : "var(--border)"}`, borderRadius: "9px", padding: "10px 12px", cursor: isOverlay ? "grabbing" : "grab", boxShadow: isOverlay ? "0 14px 40px rgba(0,0,0,.3)" : "0 1px 3px rgba(0,0,0,.06)", userSelect: "none", transition: "border-color .15s" }}
      {...listeners} {...attributes}
      onClick={e => { if (!isOverlay) { e.stopPropagation(); onOpen(app); } }}
    >
      {isBeingAnalyzed && <div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,.15)", borderRadius: "9px", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner size={18}/></div>}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", pointerEvents: "none" }}>
        <Avatar name={app.applicantId?.name||""} photo={app.applicantId?.profilePicture} size={28}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.applicantId?.name||"Unknown"}</div>
          <div style={{ fontSize: "10px", color: "var(--text-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.jobId?.title||"—"}</div>
        </div>
        {score != null && <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", background: `${scoreColor(score)}15`, color: scoreColor(score), border: `1px solid ${scoreColor(score)}28`, whiteSpace: "nowrap" }}>{score}%</span>}
      </div>
      {latest?.metadata && <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "9px", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", pointerEvents: "none" }}><span>{latest.metadata.method==="local"?"Standard":"AI"}</span>{latest.metadata.confidenceLabel&&<span>{latest.metadata.confidenceLabel.split(" ")[0]} Trust</span>}</div>}
      {app.resumeUrl && <a href={app.resumeUrl.startsWith("http")?app.resumeUrl:`${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" onPointerDown={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()} title="View Resume" style={{ position:"absolute",top:8,right:8,width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"4px",color:"var(--text-3)",textDecoration:"none" }}><FileIcon/></a>}
    </div>
  );
}

function DroppableColumn({ column, items, currentBatchAppId, onOpen }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  return (
    <div ref={setNodeRef} style={{ minWidth: 190, flex: 1, background: isOver?`${column.accent}10`:"var(--bg-subtle)", border: `1px solid ${isOver?column.accent+"50":"var(--border)"}`, borderTop: `3px solid ${column.accent}`, borderRadius: "10px", display: "flex", flexDirection: "column", height: "100%", minHeight: 480, transition: "background .15s, border-color .15s" }}>
      <div style={{ padding: "9px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-surface)", borderRadius: "8px 8px 0 0", flexShrink: 0 }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: ".06em" }}>{column.title}</span>
        <span style={{ fontSize: "10px", fontWeight: 700, color: column.accent, background: `${column.accent}15`, padding: "1px 7px", borderRadius: "10px" }}>{items.length}</span>
      </div>
      <div style={{ padding: "8px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map(app => <KanbanCard key={app._id} app={app} isBeingAnalyzed={currentBatchAppId===app._id} onOpen={onOpen}/>)}
        {items.length===0 && <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",color:"var(--text-3)",border:`1.5px dashed ${column.accent}22`,borderRadius:"7px",minHeight:60 }}>Drop here</div>}
      </div>
    </div>
  );
}

function AnalyticsPage({ data, applications, getLatestAnalysis, uniqueJobTitles }) {
  const [analyticsFilterJob, setAnalyticsFilterJob]     = useState("All");
  const [analyticsFilterScore, setAnalyticsFilterScore] = useState("All");
  // Get score for any app — handles both direct aiScore and aiAnalysis array
  const getScore = (app) => {
    if (app.aiScore != null) return app.aiScore;
    const a = getLatestAnalysis(app);
    return a?.matchScore ?? a?.score ?? 0;
  };

  const filteredApps = applications.filter(app => {
    if (analyticsFilterJob !== "All" && app.jobId?.title !== analyticsFilterJob) return false;
    const score = getScore(app);
    if (analyticsFilterScore==="High"&&score<70) return false;
    if (analyticsFilterScore==="Medium"&&(score<40||score>=70)) return false;
    if (analyticsFilterScore==="Low"&&(score<=0||score>=40)) return false;
    if (analyticsFilterScore==="Unscored") { const a=getLatestAnalysis(app); if(a&&score>0) return false; }
    return true;
  });
  const sb = { Submitted:0, Viewed:0, Shortlisted:0, Interviewing:0, Hired:0, Rejected:0 };
  filteredApps.forEach(a => { sb[a.status]=(sb[a.status]||0)+1; });
  const timelineData = (() => {
    const map={};
    [...filteredApps].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt)).forEach(a=>{
      const d=new Date(a.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"});
      map[d]=(map[d]||0)+1;
    });
    return Object.entries(map).slice(-14).map(([date,count])=>({date,count}));
  })();
  // Compute analytics from filteredApps
  const scoredApps    = filteredApps.filter(a => getScore(a) > 0);
  const totalFiltered = filteredApps.length;
  const avgScoreCalc  = scoredApps.length > 0
    ? Math.round(scoredApps.reduce((s,a) => s + getScore(a), 0) / scoredApps.length)
    : 0;

  const sel = { background:"var(--bg-surface)",color:"var(--text-1)",border:"1px solid var(--border)",borderRadius:"7px",padding:"7px 10px",fontSize:"12px",outline:"none",fontFamily:"inherit",cursor:"pointer" };
  const card = { background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"12px",padding:"18px 20px" };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
      <div style={{ display:"flex",gap:"10px",flexWrap:"wrap" }}>
        <select value={analyticsFilterJob} onChange={e=>setAnalyticsFilterJob(e.target.value)} style={sel} title="Filter analytics by job posting"><option value="All">All Jobs</option>{uniqueJobTitles.map((t,i)=><option key={i} value={t}>{t}</option>)}</select>
        <select value={analyticsFilterScore} onChange={e=>setAnalyticsFilterScore(e.target.value)} style={sel} title="Filter analytics by score range"><option value="All">All Scores</option><option value="High">High (70–100%)</option><option value="Medium">Medium (40–69%)</option><option value="Low">Low (1–39%)</option><option value="Unscored">Not Yet Audited</option></select>
        <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:"var(--text-3)" }}>
          <span style={{ fontWeight:600,color:"var(--text-1)" }}>{totalFiltered}</span> applicants ·
          <span style={{ fontWeight:600,color:"var(--accent)" }}>{scoredApps.length}</span> scored ·
          <span style={{ fontWeight:600,color:"#10b981" }}>avg {avgScoreCalc}%</span>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px" }}>
        {[
          {l:"Total Applicants", v:totalFiltered,         c:"var(--text-1)", tip:"Total applicants matching current filters"},
          {l:"AI Scored",        v:scoredApps.length,     c:"var(--accent)",  tip:"Applicants that have been analyzed by AI"},
          {l:"Avg AI Score",     v:`${avgScoreCalc}%`,    c:"#10b981",       tip:"Average match score across all scored applicants"},
          {l:"Hired Rate",       v:`${sb.Hired>0?Math.round((sb.Hired/totalFiltered)*100):0}%`, c:"#a855f7", tip:"Percentage of applicants moved to Hired stage"},
        ].map((k,i)=>(
          <div key={i} title={k.tip} style={{...card,textAlign:"center",cursor:"default"}}><div style={{fontSize:"26px",fontWeight:800,color:k.c,letterSpacing:"-0.03em"}}>{k.v}</div><div style={{fontSize:"10px",color:"var(--text-3)",marginTop:"4px",fontWeight:600}}>{k.l}</div></div>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px" }}>
        <div style={card}><div style={{fontSize:"11px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"12px"}}>Applications Over Time</div>
          <ResponsiveContainer width="100%" height={130}><AreaChart data={timelineData}><defs><linearGradient id="rdGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25}/><stop offset="100%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient></defs><Tooltip contentStyle={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:7,fontSize:11}}/><Area type="monotone" dataKey="count" stroke="var(--accent)" strokeWidth={2} fill="url(#rdGrad)" dot={false}/></AreaChart></ResponsiveContainer>
        </div>
        <div style={card}><div style={{fontSize:"11px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"12px"}}>Score Distribution</div>
          <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
            {(() => {
              const high=filteredApps.filter(a=>getScore(a)>=70).length;
              const med=filteredApps.filter(a=>{const s=getScore(a);return s>=40&&s<70;}).length;
              const low=filteredApps.filter(a=>{const s=getScore(a);return s>0&&s<40;}).length;
              const unscored=filteredApps.filter(a=>getScore(a)===0).length;
              return [{l:"High (70–100%)",v:high,c:"#10b981"},{l:"Medium (40–69%)",v:med,c:"#eab308"},{l:"Low (1–39%)",v:low,c:"#f97316"},{l:"Unscored",v:unscored,c:"var(--text-3)"}];
            })().map(s=>(
              <div key={s.l} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{fontSize:"9px",fontWeight:700,color:s.c,width:80,textAlign:"right",flexShrink:0}}>{s.l}</span>
                <div style={{flex:1,height:6,borderRadius:3,background:"var(--border)",overflow:"hidden"}}><div style={{height:"100%",background:s.c,width:`${data.total>0?(s.v/data.total)*100:0}%`,transition:"width .4s"}}/></div>
                <span style={{fontSize:"11px",fontWeight:700,color:"var(--text-2)",width:20,textAlign:"right"}}>{s.v}</span>
              </div>
            ))})
          </div>
        </div>
      </div>
      <div style={card}><div style={{fontSize:"11px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"12px"}}>Pipeline Status</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"7px"}}>
          {COLUMNS.map(col=>(
            <div key={col.id} style={{textAlign:"center",padding:"10px 6px",borderRadius:"7px",background:`${col.accent}08`,border:`1px solid ${col.accent}20`}}>
              <div style={{fontSize:"20px",fontWeight:800,color:col.accent}}>{sb[col.id]||0}</div>
              <div style={{fontSize:"9px",color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".04em",marginTop:"2px"}}>{col.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={card}><div style={{fontSize:"11px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"10px"}}>Top Performers</div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
          {filteredApps.map(app=>({ app, score: getScore(app) })).sort((a,b)=>b.score-a.score).slice(0,5).map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"7px"}}>
              <span style={{fontWeight:700,color:"var(--accent)",fontSize:"11px",minWidth:18}}>#{i+1}</span>
              <Avatar name={item.app.applicantId?.name||""} photo={item.app.applicantId?.profilePicture} size={24}/>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:"12px",color:"var(--text-1)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.app.applicantId?.name||"Unknown"}</div><div style={{fontSize:"10px",color:"var(--text-3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.app.jobId?.title||"—"}</div></div>
              <span style={{fontSize:"11px",fontWeight:700,padding:"3px 9px",borderRadius:"5px",background:`${scoreColor(item.score)}10`,color:scoreColor(item.score)}}>{item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecruiterDashboard() {
  const [activeTab, setActiveTab]               = useState("candidates");
  const [viewMode, setViewMode]                 = useState("list");
  const [applications, setApplications]         = useState([]);
  const [myJobs, setMyJobs]                     = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState("");
  const [_page, setPage]                        = useState(1);
  const [hasMore, setHasMore]                   = useState(true);
  const [loadingMore, setLoadingMore]           = useState(false);
  const observer                                = useRef();
  const isFetching                              = useRef(false);
  const abortControllerRef                      = useRef(null);

  const [analyzingId, setAnalyzingId]           = useState(null);
  const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
  const [isAnalyzingAll, setIsAnalyzingAll]     = useState(false);
  const [analysisMode, setAnalysisMode]         = useState("auto");
  const [currentModalApp, setCurrentModalApp]   = useState(null);
  const [showModal, setShowModal]               = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingDragItem, setPendingDragItem]   = useState(null);
  const [activeDragId, setActiveDragId]         = useState(null);
  const [filterJob, setFilterJob]               = useState("All");
  const [filterStatus, setFilterStatus]         = useState("All");
  const [filterScore, setFilterScore]           = useState("All");
  const [filterDate, setFilterDate]             = useState("All");
  const [validatingSkill, setValidatingSkill]   = useState(null);
  const [skillForm, setSkillForm]               = useState({ category: "technical-skills", weight: 1.0 });

  // streaming batch (new)
  const [allPagesProcessing, setAllPagesProcessing] = useState(false);
  const [streamProgress, setStreamProgress]     = useState({ page: 1, analyzed: 0, total: 0, currentName: '', currentIdx: 0 });
  const cancelStreamRef                         = useRef(false);

  const fetchApplications = async (pageNum = 1, append = false) => {
    if (isFetching.current) return;
    try {
      isFetching.current = true; setLoadingMore(true);
      const { data } = await axiosInstance.get(`/applications/recruiter?page=${pageNum}&limit=20`);
      const newApps = data.applications || [];
      setApplications(prev => append ? [...prev, ...newApps] : newApps);
      setHasMore(data.hasMore);
    } catch (err) { console.error("Load failed", err); setError("Failed to load applications."); }
    finally { setLoadingMore(false); setLoading(false); isFetching.current = false; }
  };

  useEffect(() => {
    const loadTabData = async () => {
      setLoading(true);
      if (activeTab === "candidates") { setPage(1); await fetchApplications(1, false); }
      else if (activeTab === "jobs") {
        try { const res = await axiosInstance.get("/jobs/my-jobs"); const d = res.data; setMyJobs(Array.isArray(d) ? d : (d.jobs||[])); }
        catch (err) { console.error(err); }
        setLoading(false);
      } else { setLoading(false); }
    };
    loadTabData();
  }, [activeTab]);

  const lastElementRef = (node) => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && activeTab === "candidates") {
        setPage(prev => { const next = prev+1; fetchApplications(next, true); return next; });
      }
    });
    if (node) observer.current.observe(node);
  };

  // ORIGINAL getLatestAnalysis — takes full app object
  const getLatestAnalysis = (app) => {
    if (!app?.aiAnalysis) return null;
    const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
    if (!history.length) return null;
    return history.find(h => (h.score||0)>0||(h.matchScore||0)>0) || history[0];
  };

  // ORIGINAL performAnalysis — correct endpoint /ai/analyze, checks res.data.success
  const performAnalysis = async (app, force = false, mode = "auto") => {
    const latest = getLatestAnalysis(app);
    if (!force && latest && latest.metadata?.status === "SUCCESS") return latest;
    if (!app.resumeUrl || !app.jobId?._id) return null;
    setAnalyzingId(app._id);
    try {
      const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
      const res = await axiosInstance.post("/ai/analyze", { resumeUrl, jobId: app.jobId._id, applicationId: app._id, mode });
      if (res.data.success) {
        const newAnalysis = res.data.analysis;
        setApplications(prev => prev.map(item => {
          if (item._id !== app._id) return item;
          const oldHistory = Array.isArray(item.aiAnalysis) ? [...item.aiAnalysis] : [];
          return { ...item, aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) };
        }));
        setCurrentModalApp(prev => {
          if (!prev || prev._id !== app._id) return prev;
          const oldH = Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [];
          return { ...prev, aiAnalysis: [newAnalysis, ...oldH].slice(0, 5) };
        });
        return newAnalysis;
      }
    } catch (err) { if (err.code !== "ERR_CANCELED") console.error("Analysis error:", err); }
    finally { setAnalyzingId(null); }
  };

  // ── BATCH AI: analyzes currently loaded apps (original behavior preserved exactly) ──
  const handleAnalyzeAll = async () => {
    const filtered = getFilteredApplications();
    const unscored = filtered.filter(a => !getLatestAnalysis(a));
    let targets = unscored;
    let forceMode = false;

    if (targets.length === 0) {
      if (!confirm(`Re-analyze all ${filtered.length} visible candidates?`)) return;
      targets = filtered;
      forceMode = true;
    }

    setIsAnalyzingAll(true);
    setStreamProgress({ page: _page, analyzed: 0, total: targets.length, currentName: "" });
    abortControllerRef.current = new AbortController();
    cancelStreamRef.current = false;

    try {
      for (let i = 0; i < targets.length; i++) {
        if (cancelStreamRef.current || abortControllerRef.current?.signal.aborted) break;
        const app = targets[i];
        setCurrentBatchAppId(app._id);
        setStreamProgress(p => ({
          ...p,
          analyzed: i,
          total: targets.length,
          currentName: app.applicantId?.name || "Unknown",
          currentIdx: i + 1,
        }));
        await performAnalysis(app, forceMode, analysisMode);
        await new Promise(r => setTimeout(r, 600));
      }
    } finally {
      setCurrentBatchAppId(null);
      setIsAnalyzingAll(false);
      setAllPagesProcessing(false);
      abortControllerRef.current = null;
      setStreamProgress(p => ({ ...p, currentName: "", analyzed: p.total }));
    }
  };

  // ── STREAM ALL: auto-loads pages and analyzes as it goes ──
  // Mimics the IntersectionObserver scroll: load 20 → analyze → load next 20 → analyze → ...
  const handleStreamAll = async () => {
    setIsAnalyzingAll(true);
    setAllPagesProcessing(true);
    cancelStreamRef.current = false;
    abortControllerRef.current = new AbortController();

    let streamPage = 1;
    let totalAnalyzed = 0;
    let totalSeen = 0;

    try {
      while (true) {
        if (cancelStreamRef.current || abortControllerRef.current?.signal.aborted) break;

        // Fetch this page (independent of scroll refs — doesn't conflict)
        const res = await axiosInstance.get(`/applications/recruiter?page=${streamPage}&limit=20`);
        const data = res.data;
        const pageApps = Array.isArray(data) ? data : (data.applications || []);
        const more = data.hasMore ?? (pageApps.length === 20);

        if (!pageApps.length) break;
        totalSeen += pageApps.length;

        // Merge into main state so scroll also sees them
        setApplications(prev => {
          const ids = new Set(prev.map(a => a._id));
          const fresh = pageApps.filter(a => !ids.has(a._id));
          return [...prev, ...fresh];
        });
        // Keep scroll state in sync
        setHasMore(more);
        if (more) setPage(streamPage + 1);

        // Update progress to show page number
        setStreamProgress(p => ({
          ...p,
          page: streamPage,
          total: totalSeen,
          analyzed: totalAnalyzed,
        }));

        // Analyze unscored apps from this page
        const unscored = pageApps.filter(a => a.resumeUrl && a.jobId?._id && !getLatestAnalysis(a));
        for (const app of unscored) {
          if (cancelStreamRef.current || abortControllerRef.current?.signal.aborted) break;
          setCurrentBatchAppId(app._id);
          setStreamProgress(p => ({
            ...p,
            currentName: app.applicantId?.name || "Unknown",
            currentIdx: totalAnalyzed + 1,
          }));
          try {
            await performAnalysis(app, false, analysisMode);
            totalAnalyzed++;
            setStreamProgress(p => ({ ...p, analyzed: totalAnalyzed }));
          } catch (_e) { /* skip */ }
          await new Promise(r => setTimeout(r, 500));
        }

        if (!more || cancelStreamRef.current) break;
        streamPage++;
      }
    } catch (err) {
      console.error("Stream all error:", err);
    } finally {
      setCurrentBatchAppId(null);
      setIsAnalyzingAll(false);
      setAllPagesProcessing(false);
      abortControllerRef.current = null;
      setStreamProgress(p => ({ ...p, currentName: "" }));
    }
  };

  const handleCancelAnalysis = () => {
    abortControllerRef.current?.abort();
    cancelStreamRef.current = true;
    setIsAnalyzingAll(false);
    setAllPagesProcessing(false);
    setCurrentBatchAppId(null);
    setAnalyzingId(null);
    setStreamProgress({ page: 1, analyzed: 0, total: 0, currentName: "" });
  };

  const handleRetryFailed = async () => {
    const filtered = getFilteredApplications();
    const targets = filtered.filter(a => { const l=getLatestAnalysis(a); return !l||(l.matchScore??l.score??0)===0; });
    if (!targets.length) return alert("No failed analyses found.");
    setIsAnalyzingAll(true);
    for (const app of targets) { setCurrentBatchAppId(app._id); await performAnalysis(app, true, analysisMode); }
    setCurrentBatchAppId(null); setIsAnalyzingAll(false);
  };

  const handleReanalyzeFromModal = async () => { if (!currentModalApp) return; await performAnalysis(currentModalApp, true, analysisMode); };
  const handleIndividualAnalyze  = async (app) => { await performAnalysis(app, true, analysisMode); };

  // ORIGINAL export with matchScore||score and % suffix
  const handleExportExcel = () => {
    const filtered = getFilteredApplications();
    if (!filtered.length) return alert("No data to export");
    const rows = filtered.map(app => {
      const latest = getLatestAnalysis(app);
      return { "Applicant Name": app.applicantId?.name||"Unknown", "Applicant Email": app.applicantId?.email||"Unknown", "Applied Role": app.jobId?.title||"Deleted Job", "Current Status": app.status, "Application Date": new Date(app.createdAt).toLocaleDateString(), "AI Match Score": latest?`${latest.matchScore??latest.score??0}%`:"N/A", "Analysis Method": latest?.metadata?.method||"N/A" };
    });
    const ws = XLSX.utils.json_to_sheet(rows); const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    XLSX.writeFile(wb, `Recruitment_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const handleStatusChange = async (appId, newStatus) => {
    setApplications(prev => prev.map(a => a._id===appId?{...a,status:newStatus}:a));
    try { await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus }); } catch (err) { console.error(err); }
  };

  const handleToggleJob = async (jobId) => {
    try { const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`); setMyJobs(prev => prev.map(j => j._id===jobId?{...j,isOpen:res.data.job.isOpen}:j)); }
    catch (err) { console.error(err); alert("Failed to toggle job"); }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm("Delete this job and all applications?")) return;
    try { await axiosInstance.delete(`/jobs/${jobId}`); setMyJobs(prev => prev.filter(j => j._id!==jobId)); }
    catch (err) { console.error(err); alert("Delete failed"); }
  };

  const handleSaveSkill = async (skillName) => {
    try { await axiosInstance.post("/ai/skills/add", { canonical: skillName, ...skillForm }); setValidatingSkill(null); handleReanalyzeFromModal(); }
    catch (err) { console.error(err); }
  };

  const renderDiscoveredSkills = () => {
    const skills = currentModalApp?.discoveredSkills;
    if (!skills?.length) return null;
    return (
      <div style={{ marginTop:"20px",paddingTop:"20px",borderTop:"1px solid var(--border)" }}>
        <div style={{ fontSize:"11px",fontWeight:700,color:"var(--accent)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:"10px",display:"flex",alignItems:"center",gap:"5px" }}><SparklesIcon/> Discovered Skills</div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
          {skills.map((skill,i) => (
            <div key={i} style={{ display:"flex",alignItems:"center",gap:"5px",background:"var(--bg-subtle)",border:"1px solid var(--border)",padding:"5px 10px",borderRadius:"5px" }}>
              <span style={{ fontSize:"12px",color:"var(--text-1)" }}>{skill}</span>
              <button onClick={()=>setValidatingSkill(skill)} style={{ fontSize:"9px",fontWeight:700,textTransform:"uppercase",background:"var(--accent-bg)",color:"var(--accent)",border:"1px solid var(--accent-mid)",padding:"2px 5px",borderRadius:"3px",cursor:"pointer",fontFamily:"inherit" }}>Approve</button>
            </div>
          ))}
        </div>
        {validatingSkill && (
          <div style={{ marginTop:"10px",padding:"12px",background:"var(--bg-subtle)",borderRadius:"7px",border:"1px solid var(--accent-mid)" }}>
            <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center" }}>
              <select value={skillForm.category} onChange={e=>setSkillForm({...skillForm,category:e.target.value})} style={{ background:"var(--bg-page)",color:"var(--text-1)",border:"1px solid var(--border)",borderRadius:"5px",padding:"5px 8px",fontSize:"11px",outline:"none",fontFamily:"inherit" }}><option value="technical-skills">Technical</option><option value="soft-skills">Soft Skill</option></select>
              <input type="number" value={skillForm.weight} step="0.1" min="0.1" max="2" onChange={e=>setSkillForm({...skillForm,weight:parseFloat(e.target.value)})} style={{ width:"60px",background:"var(--bg-page)",color:"var(--text-1)",border:"1px solid var(--border)",borderRadius:"5px",padding:"5px 8px",fontSize:"11px",outline:"none" }}/>
              <button onClick={()=>handleSaveSkill(validatingSkill)} style={{ background:"var(--accent)",color:"white",border:"none",borderRadius:"5px",padding:"5px 12px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>Confirm "{validatingSkill}"</button>
              <button onClick={()=>setValidatingSkill(null)} style={{ background:"none",border:"none",color:"var(--text-3)",cursor:"pointer",fontSize:"11px",fontFamily:"inherit" }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleScheduleSubmit = async (scheduleData) => {
    if (!pendingDragItem) return;
    try {
      setApplications(prev => prev.map(a => a._id===pendingDragItem._id?{...a,status:"Interviewing",interviewDetails:scheduleData}:a));
      await axiosInstance.post(`/applications/${pendingDragItem._id}/schedule`, scheduleData);
      alert("Interview Scheduled!");
    } catch (err) { console.error(err); }
  };

  const openDetails     = (app) => { setCurrentModalApp(app); setShowModal(true); };
  const handleDragStart = (event) => setActiveDragId(event.active.id);
  const handleDragEnd   = (event) => {
    const { active, over } = event; setActiveDragId(null);
    if (!over) return;
    const app = applications.find(a => a._id===active.id);
    if (app && app.status !== over.id) {
      if (over.id === "Interviewing") { setPendingDragItem(app); setShowScheduleModal(true); }
      else { handleStatusChange(active.id, over.id); }
    }
  };

  const getFilteredApplications = () => applications.filter(app => {
    if (filterJob!=="All"&&app.jobId?.title!==filterJob) return false;
    if (filterStatus!=="All"&&app.status!==filterStatus) return false;
    const analysis=getLatestAnalysis(app); const score=analysis?.matchScore??analysis?.score??0;
    if (filterScore==="High"&&score<70) return false;
    if (filterScore==="Medium"&&(score<40||score>=70)) return false;
    if (filterScore==="Low"&&(score<=0||score>=40)) return false;
    if (filterScore==="Unscored"&&analysis&&score>0) return false;
    const appDate=new Date(app.createdAt); const today=new Date();
    if (filterDate==="Today"&&appDate.toDateString()!==today.toDateString()) return false;
    if (filterDate==="Week") { const w=new Date(); w.setDate(today.getDate()-7); if(appDate<w) return false; }
    return true;
  });

  const getUniqueJobTitles = () => [...new Set(applications.map(a=>a.jobId?.title).filter(Boolean))];
  const getAnalyticsData = () => {
    const statuses={Submitted:0,Viewed:0,Shortlisted:0,Interviewing:0,Hired:0,Rejected:0};
    const scores={high:0,medium:0,low:0,unscored:0}; let totalScore=0,analyzed=0;
    applications.forEach(app => {
      statuses[app.status]=(statuses[app.status]||0)+1;
      // Check both direct aiScore field and aiAnalysis array
      const latest=getLatestAnalysis(app);
      const score = app.aiScore ?? latest?.matchScore ?? latest?.score ?? 0;
      if (score>0) { analyzed++; totalScore+=score; if(score>=70)scores.high++; else if(score>=40)scores.medium++; else scores.low++; }
      else scores.unscored++;
    });
    return { total:applications.length,statuses,scores,avgScore:analyzed>0?Math.round(totalScore/analyzed):0,analyzed,unanalyzed:applications.length-analyzed };
  };

  const renderScoreIndicator = (app) => {
    const latest=getLatestAnalysis(app); const isAnalyzing=analyzingId===app._id||currentBatchAppId===app._id;
    if (isAnalyzing) return <span style={{ display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"var(--accent)",fontWeight:600 }}><Spinner size={11}/> Auditing…</span>;
    const scoreValue = latest?.matchScore??latest?.score;
    if (scoreValue!=null) {
      const color=scoreColor(scoreValue);
      return <button onClick={()=>openDetails(app)} title="View full analysis" style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:700,border:`1px solid ${color}30`,background:`${color}0d`,color,cursor:"pointer",transition:"transform .1s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><span style={{width:6,height:6,borderRadius:"50%",background:color}}/>{scoreValue}%</button>;
    }
    return <button onClick={()=>handleIndividualAnalyze(app)} title="Run AI analysis" style={{ padding:"4px 10px",borderRadius:"5px",fontSize:"11px",fontWeight:600,background:"var(--bg-subtle)",color:"var(--text-2)",border:"1px solid var(--border)",cursor:"pointer",fontFamily:"inherit" }} onMouseEnter={e=>{e.currentTarget.style.background="var(--accent)";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--bg-subtle)";e.currentTarget.style.color="var(--text-2)";}}>Score</button>;
  };

  const filteredApps    = getFilteredApplications();
  const uniqueJobTitles = getUniqueJobTitles();
  const activeApp       = activeDragId ? applications.find(a=>a._id===activeDragId) : null;
  const analyticsData   = getAnalyticsData();
  const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
  const isAnyBatch      = isAnalyzingAll || allPagesProcessing;
  const sel = { background:"var(--bg-surface)",color:"var(--text-1)",border:"1px solid var(--border)",borderRadius:"7px",padding:"7px 10px",fontSize:"12px",outline:"none",fontFamily:"inherit",cursor:"pointer" };

  return (
    <div style={{ minHeight:"100vh",background:"var(--bg-page)",paddingBottom:"48px" }}>
      <style>{`
        @keyframes rd-spin { to { transform: rotate(360deg); } }
        @keyframes rd-in   { from { opacity:0;transform:translateY(-4px); } to { opacity:1;transform:none; } }
        @keyframes rd-pulse{ 0%,100%{opacity:1} 50%{opacity:.5} }
        .rd-row { cursor: pointer; transition: background 0.1s; border-bottom: 1px solid var(--border); }
        .rd-row:hover { background: var(--bg-subtle) !important; }
        .rd-tab { background:none;border:none;border-bottom:2px solid transparent;font-family:inherit;cursor:pointer;padding:9px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;transition:color .15s;white-space:nowrap;color:var(--text-3); }
        .rd-tab:hover { color:var(--text-1); }
        .rd-tab-active { color:var(--accent)!important;border-bottom:2px solid var(--accent)!important; }
        .rd-scrollbar::-webkit-scrollbar { width:4px;height:4px; }
        .rd-scrollbar::-webkit-scrollbar-thumb { background:var(--border);border-radius:3px; }
        /* Tooltip */
        [title] { position: relative; }
        button[title]:hover::after, a[title]:hover::after {
          content: attr(title);
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: #1e293b;
          color: #e2e8f0;
          font-size: 10px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 5px;
          pointer-events: none;
          z-index: 9999;
          font-family: inherit;
          border: 1px solid #334155;
          box-shadow: 0 4px 12px rgba(0,0,0,.3);
          max-width: 220px;
          text-align: center;
          white-space: normal;
        }
        button[title]:hover::before, a[title]:hover::before {
          content: '';
          position: absolute;
          bottom: calc(100% + 1px);
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #334155;
          pointer-events: none;
          z-index: 9999;
        }
        /* Batch analyzing row pulse */
        .rd-analyzing { animation: rd-pulse 1.2s ease-in-out infinite; background: rgba(99,102,241,.03) !important; }
        /* Score badge hover */
        .rd-score-btn:hover { transform: scale(1.06) !important; }
        /* Card hover */
        .rd-job-card:hover { border-color: var(--accent) !important; }
      `}</style>

      {/* STICKY HEADER */}
      <div style={{ background:"var(--bg-surface)",borderBottom:"1px solid var(--border)",padding:"0 28px",position:"sticky",top:"54px",zIndex:30 }}>
        <div style={{ maxWidth:"1320px",margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px",paddingTop:"14px" }}>
            <div>
              <h1 style={{ fontSize:"17px",fontWeight:800,color:"var(--text-1)",letterSpacing:"-0.02em" }}>Recruiter Dashboard</h1>
              <p style={{ fontSize:"11px",color:"var(--text-3)",marginTop:"2px" }}>
                {applications.length} applicants ·{" "}
                <span style={{ color:"var(--accent)",fontWeight:600 }}>{applications.filter(a=>getLatestAnalysis(a)).length}</span> scored ·{" "}
                {myJobs.filter(j=>j.isOpen).length} active jobs
                {hasMore && <span style={{ marginLeft:4,fontSize:"10px",color:"var(--text-3)" }}>· more to load</span>}
              </p>
            </div>
            {activeTab==="candidates" && (
              <div style={{ display:"flex",gap:"7px",flexWrap:"wrap",alignItems:"center" }}>
                {/* Live AI progress — shows when batch or stream is running */}
                {isAnyBatch && (
                  <div style={{ display:"flex",flexDirection:"column",gap:"4px",padding:"8px 12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--accent-mid)",minWidth:220,flexShrink:0 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"6px" }}>
                        <span style={{ width:7,height:7,borderRadius:"50%",background:"var(--accent)",display:"inline-block",animation:"rd-pulse .85s ease-in-out infinite",flexShrink:0 }}/>
                        <span style={{ fontSize:"11px",fontWeight:700,color:"var(--accent)",fontVariantNumeric:"tabular-nums" }}>
                          {streamProgress.analyzed}{streamProgress.total>0?`/${streamProgress.total}`:""} scored
                          {allPagesProcessing && <span style={{ marginLeft:5,fontSize:"10px",color:"var(--accent)",opacity:.75 }}>· pg {streamProgress.page}</span>}
                        </span>
                      </div>
                      <span style={{ fontSize:"10px",color:"var(--text-3)",fontVariantNumeric:"tabular-nums" }}>
                        {streamProgress.total>0 ? Math.round((streamProgress.analyzed/streamProgress.total)*100) : 0}%
                      </span>
                    </div>
                    <div style={{ height:3,background:"var(--border)",borderRadius:2,overflow:"hidden" }}>
                      <div style={{ height:"100%",background:"var(--accent)",borderRadius:2,width:`${streamProgress.total>0?(streamProgress.analyzed/streamProgress.total)*100:0}%`,transition:"width 0.5s ease" }}/>
                    </div>
                    {streamProgress.currentName && (
                      <div style={{ fontSize:"10px",color:"var(--text-3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:200 }}>
                        → <span style={{ color:"var(--text-2)",fontWeight:600 }}>{streamProgress.currentName}</span>
                      </div>
                    )}
                  </div>
                )}
                {/* View toggle */}
                <div style={{ display:"flex",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"7px",padding:"3px" }}>
                  {[{m:"list",l:"List",tip:"List view",Ic:ListIcon},{m:"board",l:"Board",tip:"Kanban board view",Ic:BoardIcon}].map(({m,l,tip,Ic})=>(
                    <button key={m} onClick={()=>setViewMode(m)} title={tip} style={{ display:"flex",alignItems:"center",gap:"5px",padding:"5px 9px",borderRadius:"5px",border:"none",background:viewMode===m?"var(--bg-surface)":"transparent",color:viewMode===m?"var(--text-1)":"var(--text-3)",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>
                      <Ic/> {l}
                    </button>
                  ))}
                </div>
                {isAnyBatch ? (
                  <button onClick={handleCancelAnalysis}
                    title="Stop analysis — keeps all scores already computed"
                    style={{ display:"flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid #ef4444",background:"rgba(239,68,68,.08)",color:"#ef4444",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>
                    <StopIcon/> Cancel
                  </button>
                ) : <>
                  <button onClick={handleAnalyzeAll}
                    disabled={getFilteredApplications().length===0}
                    title="Score currently loaded applicants. If all already scored, asks to re-analyze them."
                    style={{ display:"flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid var(--accent-mid)",background:"var(--accent-bg)",color:"var(--accent)",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:getFilteredApplications().length===0?0.5:1 }}>
                    <SparklesIcon/> Batch AI
                  </button>
                  {hasMore && (
                    <button onClick={handleStreamAll}
                      title="Load ALL pages + score everyone. Loads 20 at a time (same as scrolling), analyzes each batch before loading next. Shows live progress."
                      style={{ display:"flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text-2)",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>
                      <GlobeIcon/> Score All Pages
                    </button>
                  )}
                  <button onClick={handleRetryFailed}
                    title="Re-run analysis on 0% scored applicants"
                    style={{ display:"flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid rgba(239,68,68,.3)",background:"rgba(239,68,68,.06)",color:"#ef4444",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>
                    <RefreshIcon/> Retry
                  </button>
                  <button onClick={handleExportExcel}
                    title="Export filtered list to Excel with AI scores"
                    style={{ display:"flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text-2)",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>
                    <DownloadIcon/> Export
                  </button>
                </>}
              </div>
            )}
          </div>
          <div style={{ display:"flex",gap:"24px",marginTop:"8px" }}>
            {[{id:"candidates",l:"Applicants"},{id:"jobs",l:"Posted Jobs"},{id:"analytics",l:"Analytics"}].map(t=>(
              <button key={t.id} className={`rd-tab${activeTab===t.id?" rd-tab-active":""}`} onClick={()=>setActiveTab(t.id)}>{t.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1320px",margin:"0 auto",padding:"20px 28px" }}>
        {loading&&!loadingMore && <div style={{ textAlign:"center",padding:"80px",color:"var(--text-3)",fontSize:"13px" }}>Loading…</div>}
        {error && <div style={{ padding:"11px 14px",background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:"7px",color:"#ef4444",fontSize:"12px",marginBottom:"14px" }}>{error}</div>}

        {/* CANDIDATES TAB */}
        {!loading&&activeTab==="candidates" && <>
          <div style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"10px",padding:"12px 16px",marginBottom:"14px",animation:"rd-in 0.2s ease-out" }}>
            <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center" }}>
              <div style={{ fontSize:"10px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".07em",display:"flex",alignItems:"center",gap:"4px",marginRight:"2px" }}><FilterIcon/> Filters</div>
              <select value={filterJob}    onChange={e=>setFilterJob(e.target.value)}    style={sel} title="Filter by job"><option value="All">All Jobs</option>{uniqueJobTitles.map((t,i)=><option key={i} value={t}>{t}</option>)}</select>
              <select value={filterScore}  onChange={e=>setFilterScore(e.target.value)}  style={sel} title="Filter by AI score"><option value="All">All Scores</option><option value="High">High (70–100%)</option><option value="Medium">Medium (40–69%)</option><option value="Low">Low (1–39%)</option><option value="Unscored">Not Yet Audited</option></select>
              <select value={filterDate}   onChange={e=>setFilterDate(e.target.value)}   style={sel} title="Filter by date"><option value="All">Any Date</option><option value="Today">Today</option><option value="Week">This Week</option></select>
              {viewMode==="list" && <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={sel} title="Filter by stage"><option value="All">All Stages</option>{COLUMNS.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}</select>}
              <select value={analysisMode} onChange={e=>setAnalysisMode(e.target.value)} style={{...sel,color:"var(--accent)",borderColor:"var(--accent-mid)",background:"var(--accent-bg)"}} title="AI mode"><option value="auto">Auto (AI + fallback)</option><option value="standard">Standard (keyword)</option><option value="beta">Beta (strict AI)</option></select>
              {(filterJob!=="All"||filterScore!=="All"||filterDate!=="All"||filterStatus!=="All") && <button onClick={()=>{setFilterJob("All");setFilterScore("All");setFilterDate("All");setFilterStatus("All");}} style={{ padding:"6px 10px",borderRadius:"6px",border:"1px solid var(--border)",background:"none",color:"var(--text-3)",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>✕ Clear</button>}
              <span style={{ marginLeft:"auto",fontSize:"11px",color:"var(--text-3)" }}>{filteredApps.length} of {applications.length}</span>
            </div>
          </div>

          {viewMode==="list" && (
            filteredApps.length===0 ? (
              <div style={{ padding:"60px",background:"var(--bg-surface)",border:"2px dashed var(--border)",borderRadius:"12px",textAlign:"center" }}><div style={{fontSize:"28px",marginBottom:"12px"}}>🔍</div><p style={{fontSize:"14px",fontWeight:700,color:"var(--text-1)"}}>No applicants match</p><p style={{fontSize:"12px",color:"var(--text-3)",marginTop:"4px"}}>Try adjusting your filters</p></div>
            ) : (
              <div style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"10px",overflow:"hidden",animation:"rd-in 0.2s ease-out" }}>
                <div style={{ overflowX:"auto" }} className="rd-scrollbar">
                  <table style={{ width:"100%",borderCollapse:"collapse",whiteSpace:"nowrap" }}>
                    <thead><tr style={{ background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)" }}>
                      {["Candidate","Role","Stage","Resume","AI Score"].map(h => <th key={h} style={{ padding:"10px 18px",textAlign:"left",fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:"var(--text-3)" }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {filteredApps.map((app,idx) => {
                        const isLast=idx===filteredApps.length-1; const isBeingBatched=currentBatchAppId===app._id; const accent=colAccent(app.status);
                        return (
                          <tr key={app._id} className={`rd-row${isBeingBatched?" rd-analyzing":""}`} ref={isLast?lastElementRef:null} onClick={()=>openDetails(app)} style={{ background:isBeingBatched?"rgba(99,102,241,.04)":"transparent" }}>
                            <td style={{ padding:"12px 18px" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                                <Avatar name={app.applicantId?.name||""} photo={app.applicantId?.profilePicture} size={34}/>
                                <div><div style={{ fontWeight:600,fontSize:"13px",color:"var(--text-1)" }}>{app.applicantId?.name||"Unknown"}</div><div style={{ fontSize:"11px",color:"var(--text-3)" }}>{app.applicantId?.email}</div></div>
                              </div>
                            </td>
                            <td style={{ padding:"12px 18px",fontSize:"12px",color:"var(--text-2)" }}>{app.jobId?.title||"Deleted Job"}</td>
                            <td style={{ padding:"12px 18px" }}>
                              <select value={app.status} onChange={e=>handleStatusChange(app._id,e.target.value)} style={{ background:colBg(app.status),color:accent,border:`1px solid ${accent}35`,borderRadius:"5px",padding:"3px 7px",fontSize:"10px",fontWeight:700,textTransform:"uppercase",outline:"none",cursor:"pointer",fontFamily:"inherit" }}>
                                {COLUMNS.map(c=><option key={c.id} value={c.id} style={{ background:"var(--bg-page)",color:"var(--text-1)" }}>{c.title}</option>)}
                              </select>
                            </td>
                            <td style={{ padding:"12px 18px" }}>
                              {app.resumeUrl ? <a href={app.resumeUrl.startsWith("http")?app.resumeUrl:`${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" title="Open resume PDF" style={{ display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"11px",color:"var(--accent)",fontWeight:500,textDecoration:"none" }}><FileIcon/> PDF</a> : <span style={{ fontSize:"11px",color:"var(--text-3)" }}>—</span>}
                            </td>
                            <td style={{ padding:"12px 18px" }}>{renderScoreIndicator(app)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {loadingMore && <div style={{ padding:"12px",textAlign:"center",fontSize:"11px",color:"var(--text-3)",fontWeight:700,textTransform:"uppercase",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}><Spinner size={9} color="var(--text-3)"/> Loading more…</div>}
                </div>
              </div>
            )
          )}

          {viewMode==="board" && (
            <div style={{ animation:"rd-in 0.2s ease-out" }}>
              <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div style={{ display:"flex",gap:"10px",overflowX:"auto",height:"660px",paddingBottom:"8px" }} className="rd-scrollbar">
                  {COLUMNS.map(col => <DroppableColumn key={col.id} column={col} items={filteredApps.filter(a=>a.status===col.id)} currentBatchAppId={currentBatchAppId} onOpen={openDetails}/>)}
                </div>
                <DragOverlay>{activeApp?<KanbanCard app={activeApp} isOverlay onOpen={()=>{}}/>:null}</DragOverlay>
              </DndContext>
            </div>
          )}
        </>}

        {/* JOBS TAB */}
        {!loading&&activeTab==="jobs" && (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"14px",animation:"rd-in 0.2s ease-out" }}>
            {myJobs.length===0 && <div style={{ gridColumn:"1/-1",padding:"60px",background:"var(--bg-surface)",border:"2px dashed var(--border)",borderRadius:"12px",textAlign:"center" }}><p style={{fontSize:"14px",fontWeight:700,color:"var(--text-1)"}}>No jobs posted yet</p></div>}
            {myJobs.map(job => (
              <div key={job._id} style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"10px",padding:"18px 20px",opacity:job.isOpen?1:0.65,transition:"border-color .15s" }} onMouseEnter={e=>e.currentTarget.style.borderColor="var(--accent)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px" }}>
                  <div style={{ width:34,height:34,background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",borderRadius:"7px",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)" }}><BriefcaseIcon/></div>
                  <div style={{ display:"flex",gap:"5px" }}>
                    <button onClick={()=>handleToggleJob(job._id)} title={job.isOpen?"Close":"Open"} style={{ width:27,height:27,borderRadius:"5px",border:"none",cursor:"pointer",background:job.isOpen?"rgba(16,185,129,.1)":"var(--bg-subtle)",color:job.isOpen?"#10b981":"var(--text-3)",display:"flex",alignItems:"center",justifyContent:"center" }}>{job.isOpen?<EyeIcon/>:<EyeOffIcon/>}</button>
                    <button onClick={()=>handleDeleteJob(job._id)} title="Delete" style={{ width:27,height:27,borderRadius:"5px",border:"none",cursor:"pointer",background:"none",color:"var(--text-3)",display:"flex",alignItems:"center",justifyContent:"center" }} onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,.1)";e.currentTarget.style.color="#ef4444";}} onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="var(--text-3)";}}><TrashIcon/></button>
                  </div>
                </div>
                <div style={{ fontSize:"14px",fontWeight:700,color:"var(--text-1)",marginBottom:"3px" }}>{job.title}</div>
                <div style={{ display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px" }}>
                  <span style={{ fontSize:"11px",color:"var(--text-3)",fontWeight:600,textTransform:"uppercase",letterSpacing:".04em" }}>{job.company}</span>
                  {!job.isOpen&&<span style={{ fontSize:"9px",background:"var(--bg-subtle)",color:"var(--text-3)",padding:"1px 5px",borderRadius:"3px",fontWeight:700,textTransform:"uppercase" }}>Closed</span>}
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"6px",padding:"7px 12px" }}>
                  <span style={{ fontSize:"11px",color:"var(--text-3)" }}>Applicants</span>
                  <span style={{ fontSize:"13px",fontWeight:700,color:"var(--accent)" }}>{job.applicantCount||0}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {!loading&&activeTab==="analytics" && (
          <div style={{ animation:"rd-in 0.2s ease-out" }}>
            <AnalyticsPage data={analyticsData} applications={applications} getLatestAnalysis={getLatestAnalysis} uniqueJobTitles={uniqueJobTitles}/>
          </div>
        )}
      </div>

      {/* CANDIDATE DETAIL MODAL */}
      {showModal&&currentModalApp&&currentAnalysis && (
        <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.7)",backdropFilter:"blur(6px)",padding:"16px" }}>
          <div style={{ background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:"14px",width:"100%",maxWidth:"840px",maxHeight:"93vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 64px rgba(0,0,0,.45)",animation:"rd-in 0.2s ease-out" }}>

            <div style={{ padding:"17px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0,background:"var(--bg-subtle)",borderRadius:"14px 14px 0 0" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"11px" }}>
                <Avatar name={currentModalApp.applicantId?.name||""} photo={currentModalApp.applicantId?.profilePicture} size={38}/>
                <div><div style={{ fontSize:"15px",fontWeight:800,color:"var(--text-1)" }}>{currentModalApp.applicantId?.name}</div><div style={{ fontSize:"11px",color:"var(--text-3)",marginTop:"2px" }}>Applied for: <span style={{ color:"var(--accent)",fontWeight:600 }}>{currentModalApp.jobId?.title}</span></div></div>
              </div>
              <button onClick={()=>setShowModal(false)} style={{ background:"none",border:"none",color:"var(--text-3)",fontSize:"20px",cursor:"pointer",lineHeight:1,padding:"4px 8px",borderRadius:"5px" }}>×</button>
            </div>

            <div className="rd-scrollbar" style={{ padding:"22px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"18px" }}>
              {/* Score cards */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px" }}>
                {[
                  { label:"Match Score", value:`${currentAnalysis.matchScore??currentAnalysis.score??0}%`, big:true },
                  { label:"Experience",  value:currentAnalysis.experienceLevel||"N/A" },
                  { label:"Duration",    value:`${currentAnalysis.professionalMonths??currentAnalysis.totalMonths??0} mo` },
                  { label:"Portfolio",   value:`${currentAnalysis.uniqueLinksFound??currentAnalysis.linkedProfiles??0} links` },
                ].map((card,i) => {
                  const raw=currentAnalysis.matchScore??currentAnalysis.score??0;
                  return <div key={i} style={{ background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"8px",padding:"11px 14px" }}><div style={{ fontSize:"9px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:"5px" }}>{card.label}</div><div style={{ fontSize:i===0?"26px":"15px",fontWeight:800,color:i===0?scoreColor(raw):"var(--text-1)",letterSpacing:"-0.02em" }}>{card.value}</div></div>;
                })}
              </div>

              {/* Method badge */}
              <div style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 9px",borderRadius:"4px",width:"fit-content",background:currentAnalysis.metadata?.method==="ai"?"var(--accent-bg)":"var(--bg-subtle)",border:`1px solid ${currentAnalysis.metadata?.method==="ai"?"var(--accent-mid)":"var(--border)"}`,color:currentAnalysis.metadata?.method==="ai"?"var(--accent)":"var(--text-3)",fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em" }}>
                {currentAnalysis.metadata?.method==="ai"&&<SparklesIcon/>}
                {currentAnalysis.metadata?.method==="local"?"Standard keyword match":"AI contextual analysis"}
              </div>

              {/* AI Recommendation / summary */}
              {(currentAnalysis.summary||currentAnalysis.recommendation) && (
                <div style={{ background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",borderRadius:"8px",padding:"13px 16px" }}>
                  <div style={{ fontSize:"10px",fontWeight:700,color:"var(--accent)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:"7px",display:"flex",alignItems:"center",gap:"4px" }}><SparklesIcon/> AI Hiring Recommendation</div>
                  <p style={{ fontSize:"13px",color:"var(--text-1)",lineHeight:1.65,fontStyle:"italic" }}>"{currentAnalysis.summary||currentAnalysis.recommendation}"</p>
                </div>
              )}

              {/* Deterministic engine */}
              <div style={{ background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"8px",padding:"13px 16px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:"6px",marginBottom:"11px" }}><div style={{ width:3,height:12,background:"var(--accent)",borderRadius:"2px" }}/><span style={{ fontSize:"10px",fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:".09em" }}>Deterministic Engine</span></div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px" }}>
                  {[{label:"Skills",value:currentAnalysis.breakdown?.skillScore||0,max:60},{label:"Exp",value:currentAnalysis.breakdown?.expScore||0,max:30},{label:"Links",value:currentAnalysis.breakdown?.integrityScore||0,max:10}].map((item,i)=>(
                    <div key={i} style={{ background:"var(--bg-page)",border:"1px solid var(--border)",borderRadius:"5px",padding:"9px",textAlign:"center" }}>
                      <div style={{ fontSize:"9px",color:"var(--text-3)",fontWeight:700,textTransform:"uppercase",marginBottom:"3px" }}>{item.label}</div>
                      <div style={{ fontFamily:"monospace",fontWeight:800,color:"var(--accent)",fontSize:"15px" }}>{item.value}<span style={{ fontSize:"10px",opacity:.45 }}>/{item.max}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume */}
              {currentModalApp.resumeUrl && (
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:"7px",padding:"11px 15px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:"9px" }}>
                    <div style={{ width:30,height:30,background:"var(--accent-bg)",border:"1px solid var(--accent-mid)",borderRadius:"5px",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)" }}><FileIcon/></div>
                    <div><div style={{ fontSize:"12px",fontWeight:600,color:"var(--text-1)" }}>Full Candidate Resume</div><div style={{ fontSize:"10px",color:"var(--text-3)" }}>Original PDF for manual review</div></div>
                  </div>
                  <a href={currentModalApp.resumeUrl.startsWith("http")?currentModalApp.resumeUrl:`${API_BASE_URL}${currentModalApp.resumeUrl}`} target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:"4px",padding:"6px 13px",background:"var(--accent)",color:"#fff",borderRadius:"6px",fontSize:"11px",fontWeight:600,textDecoration:"none" }}>View PDF <ExternalIcon/></a>
                </div>
              )}

              {/* Matched / Missing — supports both missingRequiredSkills and missingSkills field names */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px" }}>
                <div>
                  <div style={{ fontSize:"11px",fontWeight:700,color:"var(--text-2)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"7px" }}>Matched Competencies</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:"5px" }}>
                    {currentAnalysis.matchedSkills?.length>0 ? currentAnalysis.matchedSkills.map((s,i)=><span key={i} style={{ padding:"3px 8px",background:"rgba(16,185,129,.09)",color:"#10b981",border:"1px solid rgba(16,185,129,.2)",borderRadius:"4px",fontSize:"10px",fontWeight:600 }}>{s}</span>) : <span style={{ fontSize:"11px",color:"var(--text-3)",fontStyle:"italic" }}>None detected</span>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:"11px",fontWeight:700,color:"var(--text-2)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"7px" }}>Missing Skills</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:"5px" }}>
                    {((currentAnalysis.missingRequiredSkills||currentAnalysis.missingSkills)?.length>0) ? (currentAnalysis.missingRequiredSkills||currentAnalysis.missingSkills).map((s,i)=><span key={i} style={{ padding:"3px 8px",background:"rgba(239,68,68,.07)",color:"#ef4444",border:"1px solid rgba(239,68,68,.18)",borderRadius:"4px",fontSize:"10px",fontWeight:600 }}>{s}</span>) : <span style={{ fontSize:"11px",color:"var(--text-3)",fontStyle:"italic" }}>100% coverage</span>}
                  </div>
                </div>
              </div>

              {/* Schedule + Email */}
              <div style={{ display:"flex",gap:"7px",flexWrap:"wrap" }}>
                <button onClick={()=>{setShowModal(false);setPendingDragItem(currentModalApp);setShowScheduleModal(true);}} style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid rgba(168,85,247,.3)",background:"rgba(168,85,247,.07)",color:"#a855f7",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>📅 Schedule Interview</button>
                {currentModalApp.applicantId?.email && <a href={`mailto:${currentModalApp.applicantId.email}`} style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"7px 13px",borderRadius:"7px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text-2)",fontSize:"12px",fontWeight:600,textDecoration:"none" }}><MailIcon/> Email Candidate</a>}
              </div>

              {renderDiscoveredSkills()}
            </div>

            <div style={{ padding:"13px 24px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0,background:"var(--bg-subtle)",borderRadius:"0 0 14px 14px" }}>
              <button onClick={handleReanalyzeFromModal} disabled={analyzingId===currentModalApp._id} title="Force re-run AI analysis" style={{ display:"flex",alignItems:"center",gap:"5px",background:"none",border:"none",color:"var(--text-3)",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"color .15s" }} onMouseEnter={e=>e.currentTarget.style.color="var(--text-1)"} onMouseLeave={e=>e.currentTarget.style.color="var(--text-3)"}>
                {analyzingId===currentModalApp._id?<Spinner size={11} color="var(--text-3)"/>:<RefreshIcon/>} Force Re-audit
              </button>
              <button onClick={()=>setShowModal(false)} style={{ padding:"7px 18px",background:"var(--bg-surface)",border:"1px solid var(--border)",color:"var(--text-1)",borderRadius:"7px",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>Done</button>
            </div>
          </div>
        </div>
      )}

      <ScheduleModal isOpen={showScheduleModal} onClose={()=>{setShowScheduleModal(false);setPendingDragItem(null);}} onSubmit={handleScheduleSubmit} candidateName={pendingDragItem?.applicantId?.name||"Candidate"}/>
    </div>
  );
}

export default RecruiterDashboard;