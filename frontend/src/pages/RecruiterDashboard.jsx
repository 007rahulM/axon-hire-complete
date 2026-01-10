// import { useState, useEffect, useRef } from "react";
// import axiosInstance from "../api/axiosInstance";
// import * as XLSX from "xlsx"; 
// // --- DRAG & DROP IMPORTS ---
// import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import ScheduleModal from "../components/ScheduleModal"; 

// // --- ICONS ---
// const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>);
// const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>);
// const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
// const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
// const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
// const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
// const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>);
// const ListIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
// const BoardIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>);
// const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
// const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);

// // --- KANBAN COLUMNS ---
// const COLUMNS = [
//   { id: "Submitted", title: "New Applicants", color: "border-blue-500/50" },
//   { id: "Viewed", title: "Viewed", color: "border-indigo-500/50" },
//   { id: "Shortlisted", title: "Shortlisted", color: "border-emerald-500/50" },
//   { id: "Interviewing", title: "Interviewing", color: "border-purple-500/50" },
//   { id: "Hired", title: "Hired", color: "border-cyan-500/50" },
//   { id: "Rejected", title: "Rejected", color: "border-red-500/50" }
// ];

// // function RecruiterDashboard() {
// //   const [activeTab, setActiveTab] = useState("candidates");
// //   const [viewMode, setViewMode] = useState("list"); 
  
// //   const [applications, setApplications] = useState([]);
// //   const [myJobs, setMyJobs] = useState([]); 
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // --- 1. ADD THESE PAGINATION STATES ---
// // const [page, setPage] = useState(1);
// // const [hasMore, setHasMore] = useState(true);
// // const [loadingMore, setLoadingMore] = useState(false);
// // const observer = useRef(); // For Infinite Scroll
  
// //   // Analysis State
// //   const [analyzingId, setAnalyzingId] = useState(null); 
// //   const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
// //   const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
// //   const [analysisMode, setAnalysisMode] = useState("allprofessional"); // Updated to match "allprofessional" backend value

// //   // Modal State (Analysis Details)
// //   const [currentModalApp, setCurrentModalApp] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   // 🗓️ SCHEDULING STATE
// //   const [showScheduleModal, setShowScheduleModal] = useState(false);
// //   const [pendingDragItem, setPendingDragItem] = useState(null);

// //   // Filters
// //   const [filterJob, setFilterJob] = useState("All");
// //   const [filterStatus, setFilterStatus] = useState("All");
// //   const [filterScore, setFilterScore] = useState("All");
// //   const [filterDate, setFilterDate] = useState("All");

// //   // State for Skill Validation
// //   const [validatingSkill, setValidatingSkill] = useState(null); 
// //   const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

// //   // DND State
// //   const [activeDragId, setActiveDragId] = useState(null);

// //   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //           if (activeTab === "candidates") {
// //               const res = await axiosInstance.get("/applications/recruiter");
// //               setApplications(Array.isArray(res.data) ? res.data : []);
// //           } else {
// //               const res = await axiosInstance.get("/jobs/my-jobs");
// //               setMyJobs(Array.isArray(res.data) ? res.data : []);
// //           }
// //       } catch (err) {
// //           console.error("Load failed", err);
// //           setError("Failed to load data.");
// //       } finally {
// //           setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [activeTab]); 
// // const getLatestAnalysis = (app) => {
// //   if (!app || !app.aiAnalysis) return null;
// //   const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
  
// //   if (history.length === 0) return null;

// //   // 🚀 SMART FIND: Look for the first item that actually has a score
// //   const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
  
// //   // Fallback to index 0 if no scores found (to show "0%" instead of "Analyze")
// //   return valid || history[0];
// // };

// //   const getUniqueJobTitles = () => {
// //     const titles = applications.map(app => app.jobId?.title).filter(Boolean);
// //     return [...new Set(titles)];
// //   };

// //   const getFilteredApplications = () => {
// //     return applications.filter(app => {
// //         if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
// //         if (filterStatus !== "All" && app.status !== filterStatus) return false;
        
// //         const analysis = getLatestAnalysis(app);
// //         const score = analysis?.matchScore || 0;
// //         if (filterScore === "High" && score < 70) return false;
// //         if (filterScore === "Medium" && score < 50) return false;
// //         if (filterScore === "Low" && score >= 50) return false;
// //         if (filterScore === "Unscored" && analysis) return false;

// //         const appDate = new Date(app.createdAt);
// //         const today = new Date();
// //         if (filterDate === "Today") {
// //             if (appDate.toDateString() !== today.toDateString()) return false;
// //         }
// //         if (filterDate === "Week") {
// //             const oneWeekAgo = new Date();
// //             oneWeekAgo.setDate(today.getDate() - 7);
// //             if (appDate < oneWeekAgo) return false;
// //         }
// //         return true;
// //     });
// //   };

// //   // --- EXPORT TO EXCEL ---
// //   const handleExportExcel = () => {
// //     const filteredApps = getFilteredApplications();
// //     if (filteredApps.length === 0) return alert("No data to export");

// //     const dataToExport = filteredApps.map(app => {
// //         const latest = getLatestAnalysis(app);
// //         return {
// //             "Applicant Name": app.applicantId?.name || "Unknown",
// //             "Applicant Email": app.applicantId?.email || "Unknown",
// //             "Applied Role": app.jobId?.title || "Deleted Job",
// //             "Current Status": app.status,
// //             "Application Date": new Date(app.createdAt).toLocaleDateString(),
// //             "AI Match Score": latest ? `${latest.matchScore}%` : "N/A",
// //             "Confidence": latest?.metadata?.confidenceLabel || "N/A",
// //             "Method": latest?.metadata?.method || "N/A",
// //             "Resume Link": app.resumeUrl ? (app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`) : "Missing"
// //         };
// //     });

// //     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
// //     const columnWidths = [ { wch: 25 }, { wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 60 } ];
// //     worksheet['!cols'] = columnWidths;

// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates"); 
// //     XLSX.writeFile(workbook, `Recruitment_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
// //   };

// //   // --- ACTIONS ---
// //   const handleToggleJob = async (jobId) => {
// //       try {
// //           const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`);
// //           setMyJobs(prev => prev.map(job => 
// //               job._id === jobId ? { ...job, isOpen: res.data.job.isOpen } : job
// //           ));
// //       } catch (err) { alert("Failed to update job status"); console.error(err); }
// //   };

// //   const handleDeleteJob = async (jobId) => {
// //       if (!confirm("⚠️ DANGER: This will permanently delete the job AND ALL associated applications.")) return;
// //       try {
// //           await axiosInstance.delete(`/jobs/${jobId}`);
// //           setMyJobs(prev => prev.filter(job => job._id !== jobId));
// //       } catch (err) { alert("Failed to delete job."); console.error(err); }
// //   };

// //   const handleStatusChange = async (appId, newStatus) => {
// //     setApplications((prev) => prev.map((app) => app._id === appId ? { ...app, status: newStatus } : app));
// //     try {
// //         await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus });
// //     } catch (err) { console.error(err); }
// //   };

// //   const getStatusColor = (status) => {
// //       switch(status) {
// //           case 'Shortlisted': return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
// //           case 'Hired': return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
// //           case 'Rejected': return "text-red-400 bg-red-500/10 border-red-500/20";
// //           case 'Viewed': return "text-blue-400 bg-blue-500/10 border-blue-500/20";
// //           case 'Interviewing': return "text-purple-400 bg-purple-500/10 border-purple-500/20";
// //           default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
// //       }
// //   };
// //   // --- ADD THIS FETCH FUNCTION ---
// // const fetchApplications = async (pageNum = 1, append = false) => {
// //     try {
// //         setLoadingMore(true);
// //         // This hits the paginated backend route we created earlier
// //         const { data } = await axiosInstance.get(`/api/applications/recruiter?page=${pageNum}&limit=20`);
        
// //         if (append) {
// //             // Add new leads to the existing list
// //             setApplications(prev => [...prev, ...data.applications]);
// //         } else {
// //             // Fresh load
// //             setApplications(data.applications || []);
// //         }
        
// //         setHasMore(data.hasMore);
// //     } catch (err) {
// //         console.error("Load failed", err);
// //     } finally {
// //         setLoadingMore(false);
// //     }
// // };

// //   // 1. Add a 'fetching' ref at the top of your component to stop the loop
// // const isFetching = useRef(false);

// // useEffect(() => {
// //     if (isFetching.current) return; // 🚀 STOP the loop here
    
// //     const fetchData = async () => {
// //       isFetching.current = true;
// //       setLoading(true);
// //       try {
// //           if (activeTab === "candidates") {
// //               const res = await axiosInstance.get("/applications/recruiter");
// //               setApplications(Array.isArray(res.data) ? res.data : []);
// //           } else {
// //               const res = await axiosInstance.get("/jobs/my-jobs");
// //               setMyJobs(Array.isArray(res.data) ? res.data : []);
// //           }
// //       } catch (err) {
// //           console.error("Load failed", err);
// //           setError("Failed to load data.");
// //       } finally {
// //           setLoading(false);
// //           isFetching.current = false; // 🚀 Unlock after finish
// //       }
// //     };
// //     fetchData();
// // }, [activeTab]);

// // const performAnalysis = async (app, force = false, mode = "auto") => {
// //     // 🚀 LOCK: Prevent duplicate requests from firing
// //    if (analyzingId || currentBatchAppId) return null;
    
// //     const latest = getLatestAnalysis(app);
// //     if (!force && latest && latest.metadata?.status === "SUCCESS") return latest;
// //     if (!app.resumeUrl || !app.jobId?._id) return null;

// //     setAnalyzingId(app._id);

// //     try {
// //       const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
// //       const res = await axiosInstance.post("/ai/analyze", {
// //         resumeUrl, 
// //         jobId: app.jobId._id, 
// //         applicationId: app._id,
// //         mode: mode 
// //       });

// //       // if (res.data.success) {
// //       //   const newAnalysis = res.data.analysis;
        
// //       //   // 🚀 ATOMIC UPDATE: Put newest result at Index 0
// //       //   setApplications((prev) => prev.map((item) => {
// //       //       if (item._id === app._id) {
// //       //          const oldHistory = Array.isArray(item.aiAnalysis) ? item.aiAnalysis : [];
// //       //          // Filter out any "Processing" or empty placeholders from this session
// //       //          const cleanHistory = oldHistory.filter(h => h.matchScore > 0 || h.score > 0);
// //       //          return { ...item, aiAnalysis: [newAnalysis, ...cleanHistory].slice(0, 5) };
// //       //       }
// //       //       return item;
// //       //   }));
// //       // Inside RecruiterDashboard.jsx -> performAnalysis
// // if (res.data.success) {
// //     const newAnalysis = res.data.analysis;
    
// //     setApplications((prev) => {
// //         // 1. Create a shallow copy of the previous applications array
// //         return prev.map((item) => {
// //             if (item._id === app._id) {
// //                 // 2. Create a NEW object for the specific application
// //                 const oldHistory = Array.isArray(item.aiAnalysis) ? [...item.aiAnalysis] : [];
                
// //                 // 3. Return the updated application with the new analysis at the top
// //                 return { 
// //                     ...item, 
// //                     aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) 
// //                 };
// //             }
// //             return item;
// //         });
// //     });


// //         // Force update the modal immediately
// //         setCurrentModalApp(prev => {
// //             if (prev?._id === app._id) {
// //                 const oldHistory = Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [];
// //                 return { ...prev, aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) };
// //             }
// //             return prev;
// //         });

// //         return newAnalysis;
// //       }
// //     } catch (err) {
// //       console.error("Analysis error:", err);
// //     } finally {
// //       setAnalyzingId(null); // UNLOCK
// //     }
// //   };

// function RecruiterDashboard() {
//   const [activeTab, setActiveTab] = useState("candidates");
//   const [viewMode, setViewMode] = useState("list"); 
  
//   const [applications, setApplications] = useState([]);
//   const [myJobs, setMyJobs] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // --- 1. PAGINATION & SCROLL STATES ---
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const observer = useRef(); 
//   const isFetching = useRef(false); // Ref to prevent double-loading loops

//   // Analysis State
//   const [analyzingId, setAnalyzingId] = useState(null); 
//   const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
//   const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
//   const [analysisMode, setAnalysisMode] = useState("allprofessional"); 

//   // Modal State
//   const [currentModalApp, setCurrentModalApp] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Scheduling & DND
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [pendingDragItem, setPendingDragItem] = useState(null);
//   const [activeDragId, setActiveDragId] = useState(null);

//   // Filters
//   const [filterJob, setFilterJob] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterScore, setFilterScore] = useState("All");
//   const [filterDate, setFilterDate] = useState("All");

//   const [validatingSkill, setValidatingSkill] = useState(null); 
//   const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

//   // --- 2. THE PAGINATED FETCH FUNCTION ---
//   const fetchApplications = async (pageNum = 1, append = false) => {
//     if (isFetching.current) return;
//     try {
//         isFetching.current = true;
//         setLoadingMore(true);
        
//         // Note: Using /applications/recruiter (assuming axiosInstance base is /api)
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

//   // --- 3. MERGED EFFECT: HANDLES INITIAL LOAD & TAB SWITCHING ---
//   useEffect(() => {
//     const loadTabInitialData = async () => {
//         setLoading(true);
//         if (activeTab === "candidates") {
//             setPage(1); // Reset page for fresh tab
//             await fetchApplications(1, false);
//         } else {
//             try {
//                 const res = await axiosInstance.get("/jobs/my-jobs");
//                 setMyJobs(Array.isArray(res.data) ? res.data : []);
//             } catch (err) { 
//                 console.error(err); 
//                 setError("Failed to load jobs.");
//             }
//             setLoading(false);
//         }
//     };
//     loadTabInitialData();
//   }, [activeTab]);

//   // --- 4. SCROLL OBSERVER LOGIC ---
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

//   // --- HELPERS & ACTIONS ---
//   const getLatestAnalysis = (app) => {
//     if (!app || !app.aiAnalysis) return null;
//     const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
//     if (history.length === 0) return null;
//     // Checks matchScore (V2) or score (V3)
//     const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
//     return valid || history[0];
//   };

//   const getFilteredApplications = () => {
//     return applications.filter(app => {
//         if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
//         if (filterStatus !== "All" && app.status !== filterStatus) return false;
        
//         const analysis = getLatestAnalysis(app);
//         const score = analysis?.matchScore || analysis?.score || 0;
//         if (filterScore === "High" && score < 70) return false;
//         if (filterScore === "Medium" && score < 50) return false;
//         if (filterScore === "Low" && score >= 50) return false;
//         if (filterScore === "Unscored" && analysis) return false;

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

//   const performAnalysis = async (app, force = false, mode = "auto") => {
//     if (analyzingId || currentBatchAppId) return null;
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
//     } catch (err) { console.error("Analysis error:", err); } finally { setAnalyzingId(null); }
//   };

//   const handleSaveSkill = async (skillName) => {
//     try {
//       await axiosInstance.post("/ai/skills/add", {
//         canonical: skillName,
//         ...skillForm
//       });
//       alert(`Skill "${skillName}" added to Global Map!`);
//       setValidatingSkill(null);
//       handleReanalyzeFromModal(); 
//     } catch (err) {
//         console.error("Save skill error:", err);
//       alert("Failed to save skill.");
//     }
//   };

//   const handleAnalyzeAll = async () => {
//     let filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
//     let forceMode = false;

//     if (targets.length === 0) {
//         if (!confirm(`Re-analyze visible candidates using ${analysisMode} mode?`)) return;
//         targets = filteredApps; forceMode = true;       
//     } else {
//         if (!confirm(`Analyze ${targets.length} candidates using ${analysisMode} mode?`)) return;
//     }

//     setIsAnalyzingAll(true);
//     for (const app of targets) {
//       setCurrentBatchAppId(app._id);
//       await performAnalysis(app, forceMode, analysisMode);
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//     setCurrentBatchAppId(null);
//     setIsAnalyzingAll(false);
//     alert("Batch Analysis Complete!");
//   };

//   const handleRetryFailed = async () => {
//     const filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => {
//         const latest = getLatestAnalysis(app);
//         return !latest || latest.matchScore === 0 || latest.metadata?.status === "FAIL";
//     });

//     if (targets.length === 0) return alert("No failed analyses found to retry.");
//     if (!confirm(`Retry ${targets.length} failed candidates?`)) return;

//     setIsAnalyzingAll(true);
//     for (const app of targets) {
//       setCurrentBatchAppId(app._id);
//       await performAnalysis(app, true, analysisMode);
//       await new Promise((r) => setTimeout(r, 800));
//     }
//     setCurrentBatchAppId(null);
//     setIsAnalyzingAll(false);
//     alert("Retry Complete!");
//   };

//   const openDetails = (app) => { setCurrentModalApp(app); setShowModal(true); };

//   const handleReanalyzeFromModal = async () => {
//     if (!currentModalApp) return;
//     setAnalyzingId(currentModalApp._id);
//     const newData = await performAnalysis(currentModalApp, true, analysisMode);
//     if (newData) {
//         setCurrentModalApp(prev => {
//             const oldHistory = Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : (prev.aiAnalysis ? [prev.aiAnalysis] : []);
//             return { ...prev, aiAnalysis: [newData, ...oldHistory] };
//         });
//     }
//     setAnalyzingId(null);
//   };

//   const handleIndividualAnalyze = async (app) => {
//       setAnalyzingId(app._id);
//       await performAnalysis(app, true, analysisMode);
//       setAnalyzingId(null);
//   };

//   const handleScheduleSubmit = async (scheduleData) => {
//     if (!pendingDragItem) return;
//     try {
//         setApplications(prev => prev.map(app => app._id === pendingDragItem._id ? { ...app, status: "Interviewing", interviewDetails: scheduleData } : app));
//         await axiosInstance.post(`/applications/${pendingDragItem._id}/schedule`, scheduleData);
//         alert("Interview Scheduled!");
//     } catch (err) { alert("Failed to schedule."); 
//     console.error(err);
//     }
//   };

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

//   const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
//   const filteredApps = getFilteredApplications();
//   const uniqueJobTitles = getUniqueJobTitles();
//   const activeApp = activeDragId ? applications.find(a => a._id === activeDragId) : null;

// // Replace your renderScoreIndicator helper (around line 1780)
// const renderScoreIndicator = (app) => {
//   const latest = getLatestAnalysis(app);
//   const isAnalyzing = analyzingId === app._id || currentBatchAppId === app._id;

//   if (isAnalyzing) {
//     return (
//       <span className="text-indigo-400 font-bold text-xs flex items-center gap-2">
//         <span className="animate-spin h-3 w-3 border-2 border-indigo-500 border-t-transparent rounded-full"></span> 
//         Auditing...
//       </span>
//     );
//   }

//   // 🚀 FIX: Check every possible score key used by V2 and V3
//   const scoreValue = latest?.score ?? latest?.matchScore;

//   if (scoreValue !== undefined && scoreValue !== null) {
//     return (
//       <div className="flex flex-col items-start gap-1">
//         <button 
//           onClick={() => openDetails(app)} 
//           className={`px-4 py-1.5 rounded-full font-bold text-xs border flex items-center gap-2 transition-all hover:scale-105 ${
//             scoreValue >= 70 
//               ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
//               : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
//           }`}
//         >
//           <span className={`w-2 h-2 rounded-full ${scoreValue >= 70 ? "bg-emerald-500" : "bg-yellow-500"}`}></span> 
//           {scoreValue}%
//         </button>
//       </div>
//     );
//   }

//   return (
//     <button 
//       onClick={() => handleIndividualAnalyze(app)} 
//       className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-800 text-white border-slate-700 hover:bg-slate-700 transition-all active:scale-95"
//     >
//       Analyze
//     </button>
//   );
// };

// const renderDiscoveredSkills = () => {
//   const skills = currentModalApp?.discoveredSkills || currentAnalysis?.discoveredSkills;
//   if (!skills || skills.length === 0) return null;

//   return (
//     <div className="mt-8 pt-8 border-t border-slate-800">
//       <h4 className="text-indigo-400 font-bold text-xs uppercase mb-4 flex items-center gap-2">
//         <SparklesIcon /> Discovered Skills (Validated via Map)
//       </h4>
//       <div className="flex flex-wrap gap-3">
//         {skills.map((skill, i) => (
//           <div key={i} className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg">
//             <span className="text-slate-300 text-sm">{skill}</span>
//             <button 
//               onClick={() => setValidatingSkill(skill)}
//               className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded hover:bg-indigo-500/40 transition-all"
//             >
//               Approve
//             </button>
//           </div>
//         ))}
//       </div>

//       {validatingSkill && (
//         <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-indigo-500/30 animate-fadeIn">
//           <p className="text-xs text-slate-400 mb-3">Adding <span className="text-white font-bold">"{validatingSkill}"</span> to Global Skill Map:</p>
//           <div className="flex gap-4">
//             <select 
//               value={skillForm.category}
//               onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
//               className="bg-slate-800 border border-slate-700 text-xs text-white p-2 rounded outline-none"
//             >
//               <option value="technical-skills">Technical</option>
//               <option value="soft-skills">Soft Skill</option>
//               <option value="emerging-tech">Emerging Tech</option>
//             </select>
//             <input 
//               type="number" step="0.1" 
//               value={skillForm.weight}
//               onChange={(e) => setSkillForm({...skillForm, weight: parseFloat(e.target.value)})}
//               className="w-20 bg-slate-800 border border-slate-700 text-xs text-white p-2 rounded outline-none"
//               placeholder="Weight"
//             />
//             <button onClick={() => handleSaveSkill(validatingSkill)} className="bg-indigo-600 px-4 py-2 rounded text-xs font-bold text-white hover:bg-indigo-500">
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


  
//   return (
//     <div className="min-h-screen p-4 md:p-8 bg-[#020617] text-slate-200 relative pt-[100px] md:pt-[140px]">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-b border-slate-800 pb-2">
//           <div className="w-full md:w-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Recruiter Dashboard</h2>
//             <div className="flex gap-6 overflow-x-auto pb-1">
//                 <button onClick={() => setActiveTab("candidates")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "candidates" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Applicants</button>
//                 <button onClick={() => setActiveTab("jobs")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "jobs" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Posted Jobs</button>
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
//             </div>
//           )}
//         </div>

//         {loading && <div className="text-center py-20 text-slate-500">Loading data...</div>}
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
//                         <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto col-span-2 md:col-span-1">
//                             <option value="All">All Jobs</option>
//                             {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
//                         </select>
//                         <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                             <option value="All">All Scores</option>
//                             <option value="High">Top Match</option>
//                             <option value="Medium">Mid Match</option>
//                             <option value="Unscored">Not Scored</option>
//                         </select>
//                         <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
//                             <option value="All">Any Date</option>
//                             <option value="Today">Today</option>
//                             <option value="Week">This Week</option>
//                         </select>
                        
//                        {/* Updated MODE SELECTOR in RecruiterDashboard.jsx */}
//                            <select 
//                               value={analysisMode} 
//                               onChange={(e) => setAnalysisMode(e.target.value)} 
//                                 className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto"
//                                 >
//     <option value="auto">Auto (AI with Local Fallback)</option>
//     <option value="standard">Standard (Zonal Keyword Match)</option>
//     <option value="beta">Beta (Strict AI Analysis)</option>
// </select>

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
//                                 {filteredApps.map((app) => {
//                                 //const latest = getLatestAnalysis(app);
//                                 const isBeingAnalyzed = currentBatchAppId === app._id;
//                                 return (
//                                 <tr key={app._id} className={`hover:bg-slate-800/50 transition-colors ${isBeingAnalyzed ? "bg-indigo-900/20 animate-pulse" : ""}`}>
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
//       </div>

//  {/* 🚀 REPLACEMENT MODAL START */}
//       {showModal && currentModalApp && currentAnalysis && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
//           <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[95vh]">
            
//             {/* 🚀 Header */}
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
            
//             {/* 🚀 Content */}
//             <div className="p-6 md:p-8 space-y-8 bg-[#0f172a] overflow-y-auto custom-scrollbar">
                
//                 {/* 📊 Summary Stats Cards */}
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

//                 {/* 🏷️ Method Badge */}
//                 <div className="flex flex-wrap gap-3 items-center">
//                     <div className={`px-4 py-2 rounded-lg border font-bold text-xs uppercase flex items-center gap-2 ${currentAnalysis.metadata?.method === 'ai' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-slate-800/50 text-slate-400 border-slate-700"}`}>
//                         {currentAnalysis.metadata?.method === 'ai' && <SparklesIcon />}
//                         Method: {currentAnalysis.metadata?.method === 'local' ? 'Standard Keyword Match' : 'AI Contextual Analysis'}
//                     </div>
//                 </div>

//                 {/* 🧠 AI Summary Card */}
//                 <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
//                     <h4 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
//                         <SparklesIcon /> AI Hiring Recommendation
//                     </h4>
//                     <p className="text-slate-200 text-sm leading-relaxed italic font-medium">
//                         "{currentAnalysis.summary || "No detailed assessment generated for this candidate."}"
//                     </p>
//                 </div>

//                 {/* 🧮 Math Breakdown */}
//                 <div className="bg-[#020617] p-5 rounded-xl border border-slate-800">
//                     <h4 className="text-slate-500 font-bold text-[10px] uppercase mb-4 tracking-widest">Deterministic Scoring Math</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Skills</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.skillScore || 0}/60</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Experience</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.expScore || 0}/30</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Integrity</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.integrityScore || 0}/10</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">System</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">10/10</div></div>
//                     </div>
//                 </div>

//                 {/* 📄 PDF Link Card */}
//                 {currentModalApp.resumeUrl && (
//                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700"><FileIcon /></div>
//                         <div><h4 className="text-white font-bold text-sm">Full Candidate Resume</h4><p className="text-slate-500 text-xs">Access original PDF for manual review.</p></div>
//                     </div>
//                     <a href={currentModalApp.resumeUrl.startsWith("http") ? currentModalApp.resumeUrl : `${API_BASE_URL}${currentModalApp.resumeUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg">View PDF <ExternalLinkIcon /></a>
//                 </div>
//                 )}

//                 {/* ✅ Competency Grid */}
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

//                 {/* 🧠 Discovered Skills Learning Loop (FIXES ESLINT ERROR) */}
//                 {renderDiscoveredSkills()}
//             </div>
            
//             {/* 🚀 Sticky Footer */}
//             <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-between items-center shrink-0 rounded-b-2xl">
//                 <button onClick={handleReanalyzeFromModal} disabled={analyzingId === currentModalApp._id} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-all">
//                     {analyzingId === currentModalApp._id ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <RefreshIcon />} Force Re-audit
//                 </button>
//                 <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700 transition-all">Done</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* 🚀 REPLACEMENT MODAL END */}

//       <ScheduleModal isOpen={showScheduleModal} onClose={() => { setShowScheduleModal(false); setPendingDragItem(null); }} onSubmit={handleScheduleSubmit} candidateName={pendingDragItem?.applicantId?.name || "Candidate"} />
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---
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
//     const latest = app.aiAnalysis && (Array.isArray(app.aiAnalysis) ? app.aiAnalysis[0] : app.aiAnalysis);
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
//                 {/* 🆕 Card Metadata Info */}
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



//========================================================================================================================================================================================================================================================================================================================================================================================================================================================================//



// import { useState, useEffect, useRef } from "react";
// import axiosInstance from "../api/axiosInstance";
// import * as XLSX from "xlsx"; 
// // --- DRAG & DROP IMPORTS ---
// import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import ScheduleModal from "../components/ScheduleModal"; 

// // --- ICONS ---
// const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>);
// const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>);
// const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
// const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
// const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
// const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
// const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>);
// const ListIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
// const BoardIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>);
// const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
// const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);

// // --- KANBAN COLUMNS ---
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



//   // --- 1. PAGINATION & SCROLL STATES ---
//   // Fix: Renamed unused 'page' to '_page' to satisfy ESLint
//   const [_page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const observer = useRef(); 
//   const isFetching = useRef(false); // Ref to prevent double-loading loops

//   // Analysis State
//   const [analyzingId, setAnalyzingId] = useState(null); 
//   const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
//   const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
//   const [analysisMode, setAnalysisMode] = useState("allprofessional"); 

//   // Modal State
//   const [currentModalApp, setCurrentModalApp] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Scheduling & DND
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [pendingDragItem, setPendingDragItem] = useState(null);
//   const [activeDragId, setActiveDragId] = useState(null);

//   // Filters
//   const [filterJob, setFilterJob] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterScore, setFilterScore] = useState("All");
//   const [filterDate, setFilterDate] = useState("All");

//   const [validatingSkill, setValidatingSkill] = useState(null); 
//   const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

//   // --- 2. THE PAGINATED FETCH FUNCTION ---
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

//   // --- 3. MAIN EFFECT: HANDLES TAB SWITCHING ---
//   useEffect(() => {
//     const loadTabInitialData = async () => {
//         setLoading(true);
//         if (activeTab === "candidates") {
//             setPage(1); // Reset page for fresh tab
//             await fetchApplications(1, false);
//         } else {
//             try {
//                 const res = await axiosInstance.get("/jobs/my-jobs");
//                 setMyJobs(Array.isArray(res.data) ? res.data : []);
//             } catch (err) { console.error(err); }
//             setLoading(false);
//         }
//     };
//     loadTabInitialData();
//   }, [activeTab]);

//   // --- 4. SCROLL OBSERVER LOGIC ---
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

//   // --- HELPERS & ACTIONS ---
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
        
//     const analysis = getLatestAnalysis(app);
//         const score = analysis?.matchScore || analysis?.score || 0;

//         // 🎯 NEW PRECISE SCORING LOGIC
//         if (filterScore === "High") {
//             if (score < 70) return false; // Only 70% to 100%
//         } else if (filterScore === "Medium") {
//             if (score < 40 || score >= 70) return false; // Only 40% to 69%
//         } else if (filterScore === "Low") {
//             if (score <= 0 || score >= 40) return false; // Only 1% to 39%
//         } else if (filterScore === "Unscored") {
//             // Check if analysis exists and has a real score
//             if (analysis && score > 0) return false; 
//         }
//         // 📅 Date Filter


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

// // --- UPDATE performAnalysis ---
// const performAnalysis = async (app, force = false, mode = "auto") => {
//   if (analyzingId || currentBatchAppId) return null;
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
//     } catch (err) { console.error(err); } finally { setAnalyzingId(null); }
//   };

//   const handleAnalyzeAll = async () => {
//     let filteredApps = getFilteredApplications();
//     let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
//     let forceMode = false;
//     if (targets.length === 0) {
//         if (!confirm(`Re-analyze visible candidates?`)) return;
//         targets = filteredApps; forceMode = true;       
//     } else {
//         if (!confirm(`Analyze ${targets.length} candidates?`)) return;
//     }
//     setIsAnalyzingAll(true);
//     for (const app of targets) {
//       setCurrentBatchAppId(app._id);
//       await performAnalysis(app, forceMode, analysisMode);
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//     setCurrentBatchAppId(null);
//     setIsAnalyzingAll(false);
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
//         alert("Failed to toggle job"); } // Fix: ESLint unused 'err'
//   };

//   const handleDeleteJob = async (jobId) => {
//       if (!confirm("Delete this job and all applications?")) return;
//       try {
//           await axiosInstance.delete(`/jobs/${jobId}`);
//           setMyJobs(prev => prev.filter(job => job._id !== jobId));
//       } catch (_err){
//         console.error(_err);
//        alert("Delete failed"); } // Fix: ESLint unused 'err'
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
//     const skills = currentModalApp?.discoveredSkills || currentAnalysis?.discoveredSkills;
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

//   return (
//     <div className="min-h-screen p-4 md:p-8 bg-[#020617] text-slate-200 relative pt-[100px] md:pt-[140px]">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-b border-slate-800 pb-2">
//           <div className="w-full md:w-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Recruiter Dashboard</h2>
//             <div className="flex gap-6 overflow-x-auto pb-1">
//                 <button onClick={() => setActiveTab("candidates")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "candidates" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Applicants</button>
//                 <button onClick={() => setActiveTab("jobs")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "jobs" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Posted Jobs</button>
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
//                        <select 
//     value={filterScore} 
//     onChange={(e) => setFilterScore(e.target.value)} 
//     className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto"
// >
//     <option value="All">All Scores</option>
//     <option value="High">High (70-100%)</option>
//     <option value="Medium">Medium (40-69%)</option>
//     <option value="Low">Low (1-39%)</option>
//     <option value="Unscored">Not Yet Audited</option>
// </select>
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
//       </div>

//  {/* 🚀 REPLACEMENT MODAL START */}
//       {showModal && currentModalApp && currentAnalysis && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
//           <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[95vh]">
            
//             {/* 🚀 Header */}
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
            
//             {/* 🚀 Content */}
//             <div className="p-6 md:p-8 space-y-8 bg-[#0f172a] overflow-y-auto custom-scrollbar">
                
//                 {/* 📊 Summary Stats Cards */}
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

//                 {/* 🏷️ Method Badge */}
//                 <div className="flex flex-wrap gap-3 items-center">
//                     <div className={`px-4 py-2 rounded-lg border font-bold text-xs uppercase flex items-center gap-2 ${currentAnalysis.metadata?.method === 'ai' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-slate-800/50 text-slate-400 border-slate-700"}`}>
//                         {currentAnalysis.metadata?.method === 'ai' && <SparklesIcon />}
//                         Method: {currentAnalysis.metadata?.method === 'local' ? 'Standard Keyword Match' : 'AI Contextual Analysis'}
//                     </div>
//                 </div>

//                 {/* 🧠 AI Summary Card */}
//                 <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
//                     <h4 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
//                         <SparklesIcon /> AI Hiring Recommendation
//                     </h4>
//                     <p className="text-slate-200 text-sm leading-relaxed italic font-medium">
//                         "{currentAnalysis.summary || "No detailed assessment generated for this candidate."}"
//                     </p>
//                 </div>

//                 {/* 🧮 Math Breakdown */}
//                 <div className="bg-[#020617] p-5 rounded-xl border border-slate-800">
//                     <h4 className="text-slate-500 font-bold text-[10px] uppercase mb-4 tracking-widest">Deterministic Scoring Math</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Skills</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.skillScore || 0}/60</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Experience</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.expScore || 0}/30</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Integrity</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.integrityScore || 0}/10</div></div>
//                         <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">System</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">10/10</div></div>
//                     </div>
//                 </div>

//                 {/* 📄 PDF Link Card */}
//                 {currentModalApp.resumeUrl && (
//                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700"><FileIcon /></div>
//                         <div><h4 className="text-white font-bold text-sm">Full Candidate Resume</h4><p className="text-slate-500 text-xs">Access original PDF for manual review.</p></div>
//                     </div>
//                     <a href={currentModalApp.resumeUrl.startsWith("http") ? currentModalApp.resumeUrl : `${API_BASE_URL}${currentModalApp.resumeUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg">View PDF <ExternalLinkIcon /></a>
//                 </div>
//                 )}

//                 {/* ✅ Competency Grid */}
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

//                 {/* 🧠 Discovered Skills Learning Loop (FIXES ESLINT ERROR) */}
//                 {renderDiscoveredSkills()}
//             </div>
            
//             {/* 🚀 Sticky Footer */}
//             <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-between items-center shrink-0 rounded-b-2xl">
//                 <button onClick={handleReanalyzeFromModal} disabled={analyzingId === currentModalApp._id} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-all">
//                     {analyzingId === currentModalApp._id ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <RefreshIcon />} Force Re-audit
//                 </button>
//                 <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700 transition-all">Done</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* 🚀 REPLACEMENT MODAL END */}

//       <ScheduleModal isOpen={showScheduleModal} onClose={() => { setShowScheduleModal(false); setPendingDragItem(null); }} onSubmit={handleScheduleSubmit} candidateName={pendingDragItem?.applicantId?.name || "Candidate"} />
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---
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
//     const latest = app.aiAnalysis && (Array.isArray(app.aiAnalysis) ? app.aiAnalysis[0] : app.aiAnalysis);
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
//                 {/* 🆕 Card Metadata Info */}
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


import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import * as XLSX from "xlsx"; 
import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ScheduleModal from "../components/ScheduleModal"; 

// Icons (unchanged)
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>);
const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 21h5v-5"/></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></svg>);
const ListIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
const BoardIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
const BarChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5H17"/><path d="M5 12h4v8"/></svg>);
const StopIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18"/></svg>);

const COLUMNS = [
  { id: "Submitted", title: "New Applicants", color: "border-blue-500/50" },
  { id: "Viewed", title: "Viewed", color: "border-indigo-500/50" },
  { id: "Shortlisted", title: "Shortlisted", color: "border-emerald-500/50" },
  { id: "Interviewing", title: "Interviewing", color: "border-purple-500/50" },
  { id: "Hired", title: "Hired", color: "border-cyan-500/50" },
  { id: "Rejected", title: "Rejected", color: "border-red-500/50" }
];

function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [viewMode, setViewMode] = useState("list"); 
  const [applications, setApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [_page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef(); 
  const isFetching = useRef(false);
  const abortControllerRef = useRef(null);

  const [analyzingId, setAnalyzingId] = useState(null); 
  const [currentBatchAppId, setCurrentBatchAppId] = useState(null);
  const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
  const [analysisMode, setAnalysisMode] = useState("auto"); 
  const [currentModalApp, setCurrentModalApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [pendingDragItem, setPendingDragItem] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);

  const [filterJob, setFilterJob] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterScore, setFilterScore] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [validatingSkill, setValidatingSkill] = useState(null); 
  const [skillForm, setSkillForm] = useState({ category: "technical-skills", weight: 1.0 });

  const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

  const fetchApplications = async (pageNum = 1, append = false) => {
    if (isFetching.current) return;
    try {
        isFetching.current = true;
        setLoadingMore(true);
        const { data } = await axiosInstance.get(`/applications/recruiter?page=${pageNum}&limit=20`);
        const newApps = data.applications || [];
        setApplications(prev => append ? [...prev, ...newApps] : newApps);
        setHasMore(data.hasMore);
    } catch (err) {
        console.error("Load failed", err);
        setError("Failed to load applications.");
    } finally {
        setLoadingMore(false);
        setLoading(false);
        isFetching.current = false;
    }
  };

  useEffect(() => {
    const loadTabInitialData = async () => {
        setLoading(true);
        if (activeTab === "candidates") {
            setPage(1);
            await fetchApplications(1, false);
        } else if (activeTab === "jobs") {
            try {
                const res = await axiosInstance.get("/jobs/my-jobs");
                setMyJobs(Array.isArray(res.data) ? res.data : []);
            } catch (err) { console.error(err); }
            setLoading(false);
        } else if (activeTab === "analytics") {
            setLoading(false);
        }
    };
    loadTabInitialData();
  }, [activeTab]);

  const lastElementRef = (node) => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && activeTab === "candidates") {
            setPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchApplications(nextPage, true);
                return nextPage;
            });
        }
    });
    if (node) observer.current.observe(node);
  };

  const getLatestAnalysis = (app) => {
    if (!app || !app.aiAnalysis) return null;
    const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
    if (history.length === 0) return null;
    const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
    return valid || history[0];
  };

  const getFilteredApplications = () => {
    return applications.filter(app => {
        if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
        if (filterStatus !== "All" && app.status !== filterStatus) return false;
        
        const analysis = getLatestAnalysis(app);
        const score = analysis?.matchScore || analysis?.score || 0;

        if (filterScore === "High") {
            if (score < 70) return false;
        } else if (filterScore === "Medium") {
            if (score < 40 || score >= 70) return false;
        } else if (filterScore === "Low") {
            if (score <= 0 || score >= 40) return false;
        } else if (filterScore === "Unscored") {
            if (analysis && score > 0) return false; 
        }

        const appDate = new Date(app.createdAt);
        const today = new Date();
        if (filterDate === "Today") {
            if (appDate.toDateString() !== today.toDateString()) return false;
        }
        if (filterDate === "Week") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            if (appDate < oneWeekAgo) return false;
        }
        return true;
    });
  };

  const getUniqueJobTitles = () => {
    const titles = applications.map(app => app.jobId?.title).filter(Boolean);
    return [...new Set(titles)];
  };

  const getAnalyticsData = () => {
    const apps = applications;
    const statuses = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
    const scores = { high: 0, medium: 0, low: 0, unscored: 0 };
    let totalScore = 0;
    let analyzedCount = 0;

    apps.forEach(app => {
      statuses[app.status] = (statuses[app.status] || 0) + 1;
      const latest = getLatestAnalysis(app);
      const score = latest?.score ?? latest?.matchScore ?? 0;
      
      if (score > 0) {
        analyzedCount++;
        totalScore += score;
        if (score >= 70) scores.high++;
        else if (score >= 40) scores.medium++;
        else scores.low++;
      } else {
        scores.unscored++;
      }
    });

    return {
      total: apps.length,
      statuses,
      scores,
      avgScore: analyzedCount > 0 ? Math.round(totalScore / analyzedCount) : 0,
      analyzed: analyzedCount,
      unanalyzed: apps.length - analyzedCount
    };
  };

  const handleExportExcel = () => {
    const filteredApps = getFilteredApplications();
    if (filteredApps.length === 0) return alert("No data to export");
    const dataToExport = filteredApps.map(app => {
        const latest = getLatestAnalysis(app);
        return {
            "Applicant Name": app.applicantId?.name || "Unknown",
            "Applicant Email": app.applicantId?.email || "Unknown",
            "Applied Role": app.jobId?.title || "Deleted Job",
            "Current Status": app.status,
            "Application Date": new Date(app.createdAt).toLocaleDateString(),
            "AI Match Score": latest ? `${latest.matchScore || latest.score}%` : "N/A"
        };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates"); 
    XLSX.writeFile(workbook, `Recruitment_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const performAnalysis = async (app, force = false, mode = "auto") => {
    // Don't block if another single analysis is running, only check batch
    const latest = getLatestAnalysis(app);
    if (!force && latest && latest.metadata?.status === "SUCCESS") return latest;
    if (!app.resumeUrl || !app.jobId?._id) return null;

    setAnalyzingId(app._id);
    
    try {
      const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
      const res = await axiosInstance.post("/ai/analyze", {
        resumeUrl, 
        jobId: app.jobId._id, 
        applicationId: app._id,
        mode: mode 
      });

      if (res.data.success) {
        const newAnalysis = res.data.analysis;
        setApplications(prev => prev.map(item => {
            if (item._id === app._id) {
                const oldHistory = Array.isArray(item.aiAnalysis) ? [...item.aiAnalysis] : [];
                return { ...item, aiAnalysis: [newAnalysis, ...oldHistory].slice(0, 5) };
            }
            return item;
        }));
        if (currentModalApp?._id === app._id) {
            setCurrentModalApp(prev => ({
                ...prev,
                aiAnalysis: [newAnalysis, ...(Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [])].slice(0, 5)
            }));
        }
        return newAnalysis;
      }
    } catch (err) { 
      if (err.code !== 'ERR_CANCELED') console.error(err); 
    } finally { 
      setAnalyzingId(null);
    }
  };

  const handleAnalyzeAll = async () => {
    let filteredApps = getFilteredApplications();
    let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
    let forceMode = false;
    
    if (targets.length === 0) {
        if (!confirm(`Re-analyze visible candidates?`)) return;
        targets = filteredApps; 
        forceMode = true;       
    } else {
        if (!confirm(`Analyze ${targets.length} candidates?`)) return;
    }
    
    setIsAnalyzingAll(true);
    abortControllerRef.current = new AbortController();
    
    try {
      for (let i = 0; i < targets.length; i++) {
        // Check if cancelled
        if (abortControllerRef.current && abortControllerRef.current.signal.aborted) {
          console.log("Analysis cancelled by user");
          break;
        }
        
        const app = targets[i];
        setCurrentBatchAppId(app._id);
        await performAnalysis(app, forceMode, analysisMode);
        await new Promise((r) => setTimeout(r, 1000));
      }
    } finally {
      setCurrentBatchAppId(null);
      setIsAnalyzingAll(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelAnalysis = () => {
    console.log("Cancel clicked");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsAnalyzingAll(false);
    setCurrentBatchAppId(null);
    setAnalyzingId(null);
    alert("Analysis cancelled successfully!");
  };

  const handleRetryFailed = async () => {
    const filteredApps = getFilteredApplications();
    let targets = filteredApps.filter((app) => {
        const latest = getLatestAnalysis(app);
        return !latest || (latest.matchScore || latest.score) === 0;
    });
    if (targets.length === 0) return alert("No failed analyses found.");
    setIsAnalyzingAll(true);
    for (const app of targets) {
      setCurrentBatchAppId(app._id);
      await performAnalysis(app, true, analysisMode);
    }
    setCurrentBatchAppId(null);
    setIsAnalyzingAll(false);
  };

  const handleStatusChange = async (appId, newStatus) => {
    setApplications(prev => prev.map(app => app._id === appId ? { ...app, status: newStatus } : app));
    try { await axiosInstance.put(`/applications/${appId}/status`, { status: newStatus }); } catch (err) { console.error(err); }
  };

  const handleToggleJob = async (jobId) => {
      try {
          const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`);
          setMyJobs(prev => prev.map(job => 
              job._id === jobId ? { ...job, isOpen: res.data.job.isOpen } : job
          ));
      } catch (_err) { 
        console.error(_err);
        alert("Failed to toggle job");
      }
  };

  const handleDeleteJob = async (jobId) => {
      if (!confirm("Delete this job and all applications?")) return;
      try {
          await axiosInstance.delete(`/jobs/${jobId}`);
          setMyJobs(prev => prev.filter(job => job._id !== jobId));
      } catch (_err){
        console.error(_err);
        alert("Delete failed");
      }
  };

  const handleSaveSkill = async (skillName) => {
    try {
      await axiosInstance.post("/ai/skills/add", { canonical: skillName, ...skillForm });
      setValidatingSkill(null);
      handleReanalyzeFromModal(); 
    } catch (err) { console.error(err); }
  };

  const handleReanalyzeFromModal = async () => {
    if (!currentModalApp) return;
    await performAnalysis(currentModalApp, true, analysisMode);
  };

  const handleIndividualAnalyze = async (app) => {
      await performAnalysis(app, true, analysisMode);
  };

  const handleScheduleSubmit = async (scheduleData) => {
    if (!pendingDragItem) return;
    try {
        setApplications(prev => prev.map(app => app._id === pendingDragItem._id ? { ...app, status: "Interviewing", interviewDetails: scheduleData } : app));
        await axiosInstance.post(`/applications/${pendingDragItem._id}/schedule`, scheduleData);
        alert("Interview Scheduled!");
    } catch (err) { console.error(err); }
  };

  const openDetails = (app) => { setCurrentModalApp(app); setShowModal(true); };

  const handleDragStart = (event) => setActiveDragId(event.active.id);
  const handleDragEnd = (event) => {
      const { active, over } = event;
      setActiveDragId(null);
      if (!over) return;
      const appId = active.id;
      const newStatus = over.id;
      const app = applications.find(a => a._id === appId);
      if (app && app.status !== newStatus) {
          if (newStatus === "Interviewing") {
              setPendingDragItem(app);
              setShowScheduleModal(true);
              return;
          }
          handleStatusChange(appId, newStatus);
      }
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'Shortlisted': return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
          case 'Hired': return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
          case 'Rejected': return "text-red-400 bg-red-500/10 border-red-500/20";
          case 'Viewed': return "text-blue-400 bg-blue-500/10 border-blue-500/20";
          case 'Interviewing': return "text-purple-400 bg-purple-500/10 border-purple-500/20";
          default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      }
  };

  const renderScoreIndicator = (app) => {
    const latest = getLatestAnalysis(app);
    const isAnalyzing = analyzingId === app._id || currentBatchAppId === app._id;
    if (isAnalyzing) return <span className="text-indigo-400 font-bold text-xs flex items-center gap-2"><span className="animate-spin h-3 w-3 border-2 border-indigo-500 border-t-transparent rounded-full"></span>Auditing...</span>;
    const scoreValue = latest?.score ?? latest?.matchScore;
    if (scoreValue !== undefined && scoreValue !== null) {
        return (
            <button onClick={() => openDetails(app)} className={`px-4 py-1.5 rounded-full font-bold text-xs border flex items-center gap-2 transition-all hover:scale-105 ${scoreValue >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                <span className={`w-2 h-2 rounded-full ${scoreValue >= 70 ? "bg-emerald-500" : "bg-yellow-500"}`}></span>{scoreValue}%
            </button>
        );
    }
    return <button onClick={() => handleIndividualAnalyze(app)} className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-800 text-white border-slate-700 hover:bg-slate-700">Analyze</button>;
  };

  const renderDiscoveredSkills = () => {
    const skills = currentModalApp?.discoveredSkills;
    if (!skills || skills.length === 0) return null;
    return (
      <div className="mt-8 pt-8 border-t border-slate-800">
        <h4 className="text-indigo-400 font-bold text-xs uppercase mb-4 flex items-center gap-2"><SparklesIcon /> Discovered Skills</h4>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg">
              <span className="text-slate-300 text-sm">{skill}</span>
              <button onClick={() => setValidatingSkill(skill)} className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">Approve</button>
            </div>
          ))}
        </div>
        {validatingSkill && (
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-indigo-500/30">
            <div className="flex gap-4">
              <select value={skillForm.category} onChange={(e) => setSkillForm({...skillForm, category: e.target.value})} className="bg-slate-800 text-xs text-white p-2 rounded"><option value="technical-skills">Technical</option><option value="soft-skills">Soft Skill</option></select>
              <input type="number" value={skillForm.weight} onChange={(e) => setSkillForm({...skillForm, weight: parseFloat(e.target.value)})} className="w-20 bg-slate-800 text-xs text-white p-2 rounded" />
              <button onClick={() => handleSaveSkill(validatingSkill)} className="bg-indigo-600 px-4 py-2 rounded text-xs font-bold text-white">Confirm</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
  const filteredApps = getFilteredApplications();
  const uniqueJobTitles = getUniqueJobTitles();
  const activeApp = activeDragId ? applications.find(a => a._id === activeDragId) : null;
  const analyticsData = getAnalyticsData();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#020617] text-slate-200 relative pt-[100px] md:pt-[140px]">
      <style>{`
        @keyframes float-bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animated-bg {
          background: linear-gradient(-45deg, #1e293b 0%, #0f172a 25%, #1a1f35 50%, #0f172a 75%, #1e293b 100%);
          background-size: 400% 400%;
          animation: float-bg 15s ease infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>



      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-b border-slate-800 pb-2">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Recruiter Dashboard</h2>
            <div className="flex gap-6 overflow-x-auto pb-1">
                <button onClick={() => setActiveTab("candidates")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "candidates" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Applicants</button>
                <button onClick={() => setActiveTab("jobs")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "jobs" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Posted Jobs</button>
                <button onClick={() => setActiveTab("analytics")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "analytics" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Analytics</button>
            </div>
          </div>
          
          {activeTab === "candidates" && (
            <div className="flex flex-wrap gap-2 w-full md:w-auto mb-2 md:mb-4">
                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                    <button onClick={() => setViewMode("list")} className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}><ListIcon /> List</button>
                    <button onClick={() => setViewMode("board")} className={`p-2 rounded flex items-center gap-2 text-xs font-bold ${viewMode === 'board' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}><BoardIcon /> Board</button>
                </div>
                
                <button onClick={handleAnalyzeAll} disabled={isAnalyzingAll || loading || filteredApps.length === 0} className={`px-5 py-2 rounded-lg font-bold shadow-lg flex justify-center items-center gap-2 text-sm border transition-all ${isAnalyzingAll ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-transparent"}`}>
                {isAnalyzingAll ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <SparklesIcon />}
                {isAnalyzingAll ? "Processing..." : "Batch AI"}
                </button>

                {isAnalyzingAll && (
                  <button onClick={handleCancelAnalysis} className="px-5 py-2 rounded-lg font-bold shadow-lg flex justify-center items-center gap-2 text-sm border bg-red-600 hover:bg-red-700 text-white border-transparent transition-all">
                    <StopIcon /> Cancel
                  </button>
                )}
            </div>
          )}
        </div>

        {loading && !loadingMore && <div className="text-center py-20 text-slate-500">Loading data...</div>}
        {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6 text-sm">{error}</div>}

        {!loading && activeTab === "candidates" && (
            <>
                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl mb-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                            <FilterIcon /> Filters:
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleRetryFailed} disabled={isAnalyzingAll} className="text-xs font-bold flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded border border-red-500/20 transition-all">
                                <RefreshIcon /> Retry Failed
                            </button>
                            <button onClick={handleExportExcel} className="text-xs font-bold flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded border border-slate-700">
                                <DownloadIcon /> Export Excel
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                        <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                            <option value="All">All Jobs</option>
                            {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
                        </select>
                        <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                            <option value="All">All Scores</option>
                            <option value="High">High (70-100%)</option>
                            <option value="Medium">Medium (40-69%)</option>
                            <option value="Low">Low (1-39%)</option>
                            <option value="Unscored">Not Yet Audited</option>
                        </select>
                        <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                            <option value="All">Any Date</option>
                            <option value="Today">Today</option>
                            <option value="Week">This Week</option>
                        </select>
                        <select value={analysisMode} onChange={(e) => setAnalysisMode(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                          <option value="auto">Auto (AI with Local Fallback)</option>
                          <option value="standard">Standard (Zonal Keyword Match)</option>
                          <option value="beta">Beta (Strict AI Analysis)</option>
                        </select>
                        {viewMode === 'list' && (
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                                <option value="All">All Status</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Viewed">Viewed</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        )}
                    </div>
                </div>

                {viewMode === 'list' && (
                    filteredApps.length === 0 ? (
                        <div className="p-16 rounded-2xl bg-[#0f172a] border border-slate-800 text-center border-dashed"><h3 className="text-xl font-bold text-white">No Applicants</h3></div>
                    ) : (
                        <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-800 bg-[#0f172a]">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider font-semibold">
                                <th className="p-6">Candidate</th>
                                <th className="p-6">Role</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Resume</th>
                                <th className="p-6">AI Auditor Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filteredApps.map((app, index) => {
                                const isLast = filteredApps.length === index + 1;
                                const isBeingAnalyzed = currentBatchAppId === app._id;
                                return (
                                <tr key={app._id} ref={isLast ? lastElementRef : null} className={`hover:bg-slate-800/50 transition-colors ${isBeingAnalyzed ? "bg-indigo-900/20 animate-pulse" : ""}`}>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700 overflow-hidden">
                                                {app.applicantId?.profilePicture ? (
                                                    <img src={app.applicantId.profilePicture.startsWith('http') ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/>
                                                ) : <UserIcon />}
                                            </div>
                                            <div><div className="font-bold text-white text-base">{app.applicantId?.name || "Unknown"}</div><div className="text-sm text-slate-500">{app.applicantId?.email}</div></div>
                                        </div>
                                    </td>
                                    <td className="p-6"><span className="text-slate-300 font-medium text-sm">{app.jobId?.title || "Deleted Job"}</span></td>
                                    <td className="p-6">
                                        <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)} className={`bg-transparent text-xs font-bold uppercase tracking-wide border px-3 py-1.5 rounded-lg outline-none cursor-pointer ${getStatusColor(app.status)}`}>
                                            <option value="Submitted" className="bg-slate-900 text-yellow-400">Submitted</option>
                                            <option value="Viewed" className="bg-slate-900 text-blue-400">Viewed</option>
                                            <option value="Shortlisted" className="bg-slate-900 text-emerald-400">Shortlisted</option>
                                            <option value="Interviewing" className="bg-slate-900 text-purple-400">Interviewing</option>
                                            <option value="Hired" className="bg-slate-900 text-cyan-400">Hired</option>
                                            <option value="Rejected" className="bg-slate-900 text-red-400">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="p-6">
                                        {app.resumeUrl ? (
                                            <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white text-sm flex items-center gap-2"><FileIcon /> PDF</a>
                                        ) : <span className="text-slate-600 text-sm">Missing</span>}
                                    </td>
                                    <td className="p-6">
                                        {renderScoreIndicator(app)}
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                            </table>
                            {loadingMore && <div className="p-4 text-center text-xs text-slate-500 uppercase font-bold tracking-widest animate-pulse">Loading More Candidates...</div>}
                        </div>
                    )
                )}

                {viewMode === 'board' && (
                    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 overflow-x-auto h-[650px] pb-4">
                            {COLUMNS.map((col) => (
                                <DroppableColumn 
                                    key={col.id} 
                                    column={col} 
                                    items={filteredApps.filter(a => a.status === col.id)} 
                                    currentBatchAppId={currentBatchAppId}
                                    openDetails={openDetails}
                                />
                            ))}
                        </div>
                        <DragOverlay>{activeApp ? <KanbanCard app={activeApp} isOverlay /> : null}</DragOverlay>
                    </DndContext>
                )}
            </>
        )}

        {!loading && activeTab === "jobs" && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {myJobs.map(job => (
                    <div key={job._id} className={`bg-[#0f172a] border p-6 rounded-2xl transition-all group ${job.isOpen ? "border-slate-800 hover:border-indigo-500/50" : "border-slate-800 opacity-60 hover:opacity-100"}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl border ${job.isOpen ? "bg-slate-900 border-slate-700 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}><BriefcaseIcon /></div>
                            <div className="flex gap-2">
                                <button onClick={() => handleToggleJob(job._id)} className={`p-2 rounded-lg transition-colors border ${job.isOpen ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20" : "text-slate-400 border-slate-700 bg-slate-800 hover:text-white"}`}>{job.isOpen ? <EyeIcon /> : <EyeOffIcon />}</button>
                                <button onClick={() => handleDeleteJob(job._id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-red-500/20"><TrashIcon /></button>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-2 mb-4"><p className="text-xs text-slate-400 uppercase tracking-wide font-bold">{job.company}</p>{!job.isOpen && <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Closed</span>}</div>
                        <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800"><span>Applicants:</span><span className="font-bold text-white bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">{job.applicantCount || 0}</span></div>
                    </div>
                ))}
            </div>
        )}

        {!loading && activeTab === "analytics" && (
    <AnalyticsPage 
  data={analyticsData} 
  applications={applications} 
  getLatestAnalysis={getLatestAnalysis} 
  uniqueJobTitles={uniqueJobTitles} 
/>
        )}
      </div>

      {showModal && currentModalApp && currentAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[95vh]">
            <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-center shrink-0 rounded-t-2xl">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 overflow-hidden bg-slate-800">
                    {currentModalApp.applicantId?.profilePicture ? (
                        <img src={currentModalApp.applicantId.profilePicture.startsWith('http') ? currentModalApp.applicantId.profilePicture : `${API_BASE_URL}${currentModalApp.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/>
                    ) : <UserIcon />}
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-white">{currentModalApp.applicantId?.name}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase mt-1">Role: <span className="text-indigo-400">{currentModalApp.jobId?.title}</span></p>
                  </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-2xl text-slate-500 hover:text-white transition-colors">&times;</button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8 bg-[#0f172a] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Match Score</p>
                        <p className={`text-4xl font-black ${ (currentAnalysis.score ?? currentAnalysis.matchScore) >= 70 ? "text-emerald-400" : "text-yellow-400"}`}>
                            {currentAnalysis.score ?? currentAnalysis.matchScore ?? 0}%
                        </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Exp Level</p>
                        <p className="text-xl font-bold text-white mt-1">{currentAnalysis.experienceLevel || "N/A"}</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Duration</p>
                        <p className="text-xl font-bold text-white mt-1">
                            {currentAnalysis.professionalMonths ?? currentAnalysis.totalMonths ?? 0} Mo
                        </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Portfolio</p>
                        <p className="text-xl font-bold text-white mt-1">
                            {currentAnalysis.uniqueLinksFound ?? currentAnalysis.linkedProfiles ?? 0} Links
                        </p>
                    </div>
                </div>

                <div className={`px-4 py-2 rounded-lg border font-bold text-xs uppercase flex items-center gap-2 w-fit ${currentAnalysis.metadata?.method === 'ai' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-slate-800/50 text-slate-400 border-slate-700"}`}>
                    {currentAnalysis.metadata?.method === 'ai' && <SparklesIcon />}
                    Method: {currentAnalysis.metadata?.method === 'local' ? 'Standard Keyword Match' : 'AI Contextual Analysis'}
                </div>

                <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
                    <h4 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
                        <SparklesIcon /> AI Hiring Recommendation
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed italic font-medium">
                        "{currentAnalysis.summary || "No detailed assessment generated for this candidate."}"
                    </p>
                </div>

                <div className="bg-[#020617] p-5 rounded-xl border border-slate-800">
                    <h4 className="text-slate-500 font-bold text-[10px] uppercase mb-4 tracking-widest">Deterministic Scoring Math</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Skills</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.skillScore || 0}/60</div></div>
                        <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Experience</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.expScore || 0}/30</div></div>
                        <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">Integrity</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">{currentAnalysis.breakdown?.integrityScore || 0}/10</div></div>
                        <div><p className="text-[9px] text-slate-600 font-bold mb-1 uppercase">System</p><div className="bg-slate-900 border border-slate-800 p-2 rounded text-sm font-bold text-indigo-400">10/10</div></div>
                    </div>
                </div>

                {currentModalApp.resumeUrl && (
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700"><FileIcon /></div>
                        <div><h4 className="text-white font-bold text-sm">Full Candidate Resume</h4><p className="text-slate-500 text-xs">Access original PDF for manual review.</p></div>
                    </div>
                    <a href={currentModalApp.resumeUrl.startsWith("http") ? currentModalApp.resumeUrl : `${API_BASE_URL}${currentModalApp.resumeUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg">View PDF <ExternalLinkIcon /></a>
                </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide">Matched Competencies</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentAnalysis.matchedSkills?.length > 0 ? 
                                currentAnalysis.matchedSkills.map((s, i) => <span key={i} className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded border border-emerald-500/20">{s}</span>) 
                                : <span className="text-slate-500 text-xs italic">None Detected</span>}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide">Missing Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentAnalysis.missingRequiredSkills?.length > 0 ? 
                                currentAnalysis.missingRequiredSkills.map((s, i) => <span key={i} className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded border border-red-500/20">{s}</span>) 
                                : <span className="text-slate-500 text-xs italic">100% Skill Coverage</span>}
                        </div>
                    </div>
                </div>

                {renderDiscoveredSkills()}
            </div>
            
            <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-between items-center shrink-0 rounded-b-2xl">
                <button onClick={handleReanalyzeFromModal} disabled={analyzingId === currentModalApp._id} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-all">
                    {analyzingId === currentModalApp._id ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <RefreshIcon />} Force Re-audit
                </button>
                <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700 transition-all">Done</button>
            </div>
          </div>
        </div>
      )}

      <ScheduleModal isOpen={showScheduleModal} onClose={() => { setShowScheduleModal(false); setPendingDragItem(null); }} onSubmit={handleScheduleSubmit} candidateName={pendingDragItem?.applicantId?.name || "Candidate"} />
    </div>
  );
}

// Analytics Page Component
function AnalyticsPage({ data, applications, getLatestAnalysis, uniqueJobTitles }) {
  const [analyticsFilterJob, setAnalyticsFilterJob] = useState("All");
  const [analyticsFilterScore, setAnalyticsFilterScore] = useState("All");

  const getFilteredAppsForAnalytics = () => {
    return applications.filter(app => {
      if (analyticsFilterJob !== "All" && app.jobId?.title !== analyticsFilterJob) return false;
      const analysis = getLatestAnalysis(app);
      const score = analysis?.matchScore || analysis?.score || 0;
      if (analyticsFilterScore === "High" && score < 70) return false;
      if (analyticsFilterScore === "Medium" && (score < 40 || score >= 70)) return false;
      if (analyticsFilterScore === "Low" && (score <= 0 || score >= 40)) return false;
      if (analyticsFilterScore === "Unscored" && score > 0) return false;
      return true;
    });
  };

  const filteredAnalyticsApps = getFilteredAppsForAnalytics();

  const getStatusBreakdown = () => {
    const breakdown = { Submitted: 0, Viewed: 0, Shortlisted: 0, Interviewing: 0, Hired: 0, Rejected: 0 };
    filteredAnalyticsApps.forEach(app => {
      breakdown[app.status] = (breakdown[app.status] || 0) + 1;
    });
    return breakdown;
  };

  const statusBreakdown = getStatusBreakdown();

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <select value={analyticsFilterJob} onChange={(e) => setAnalyticsFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
          <option value="All">All Jobs</option>
          {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
        </select>
        <select value={analyticsFilterScore} onChange={(e) => setAnalyticsFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
          <option value="All">All Scores</option>
          <option value="High">High (70-100%)</option>
          <option value="Medium">Medium (40-69%)</option>
          <option value="Low">Low (1-39%)</option>
          <option value="Unscored">Not Yet Audited</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm font-bold uppercase mb-2">Total Applicants</p>
          <p className="text-3xl font-bold text-white">{filteredAnalyticsApps.length}</p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm font-bold uppercase mb-2">Analyzed</p>
          <p className="text-3xl font-bold text-indigo-400">{data.analyzed}</p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm font-bold uppercase mb-2">Avg Match Score</p>
          <p className="text-3xl font-bold text-emerald-400">{data.avgScore}%</p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm font-bold uppercase mb-2">Conversion Rate</p>
          <p className="text-3xl font-bold text-purple-400">{data.total > 0 ? Math.round((data.statuses.Hired / data.total) * 100) : 0}%</p>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><BarChartIcon /> Score Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="text-emerald-400 font-bold text-2xl">{data.scores.high}</div>
            <p className="text-slate-400 text-xs uppercase mt-1">High (70-100%)</p>
            <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
              <div className="bg-emerald-500" style={{width: `${data.total > 0 ? (data.scores.high / data.total) * 100 : 0}%`, height: '100%'}}></div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="text-yellow-400 font-bold text-2xl">{data.scores.medium}</div>
            <p className="text-slate-400 text-xs uppercase mt-1">Medium (40-69%)</p>
            <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
              <div className="bg-yellow-500" style={{width: `${data.total > 0 ? (data.scores.medium / data.total) * 100 : 0}%`, height: '100%'}}></div>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="text-orange-400 font-bold text-2xl">{data.scores.low}</div>
            <p className="text-slate-400 text-xs uppercase mt-1">Low (1-39%)</p>
            <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
              <div className="bg-orange-500" style={{width: `${data.total > 0 ? (data.scores.low / data.total) * 100 : 0}%`, height: '100%'}}></div>
            </div>
          </div>
          <div className="bg-slate-600/10 border border-slate-600/20 rounded-lg p-4">
            <div className="text-slate-400 font-bold text-2xl">{data.scores.unscored}</div>
            <p className="text-slate-400 text-xs uppercase mt-1">Unscored</p>
            <div className="mt-2 bg-slate-900 rounded h-2 overflow-hidden">
              <div className="bg-slate-600" style={{width: `${data.total > 0 ? (data.scores.unscored / data.total) * 100 : 0}%`, height: '100%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><BarChartIcon /> Status Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Submitted', value: statusBreakdown.Submitted, color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
            { label: 'Viewed', value: statusBreakdown.Viewed, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
            { label: 'Shortlisted', value: statusBreakdown.Shortlisted, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
            { label: 'Interviewing', value: statusBreakdown.Interviewing, color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
            { label: 'Hired', value: statusBreakdown.Hired, color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
            { label: 'Rejected', value: statusBreakdown.Rejected, color: 'bg-red-500/10 border-red-500/20 text-red-400' }
          ].map((status, i) => (
            <div key={i} className={`border rounded-lg p-4 ${status.color}`}>
              <div className={`font-bold text-2xl ${status.color.split(' ')[2]}`}>{status.value}</div>
              <p className="text-slate-400 text-xs uppercase mt-1">{status.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Top Performers</h3>
        <div className="space-y-3">
          {filteredAnalyticsApps
            .map(app => {
              const analysis = getLatestAnalysis(app);
              return { app, score: analysis?.matchScore ?? analysis?.score ?? 0 };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-indigo-400 font-bold">#{i + 1}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{item.app.applicantId?.name || "Unknown"}</p>
                    <p className="text-xs text-slate-400 truncate">{item.app.jobId?.title || "Deleted Job"}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm px-3 py-1 rounded whitespace-nowrap ${item.score >= 70 ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}`}>{item.score}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function DroppableColumn({ column, items, currentBatchAppId, openDetails }) {
    const { setNodeRef } = useDroppable({ id: column.id });
    return (
        <div ref={setNodeRef} className={`bg-[#0f172a] rounded-xl border-t-4 ${column.color} flex flex-col h-full min-h-[500px]`}>
            <div className="p-3 border-b border-slate-800 bg-slate-900/50 rounded-t-xl flex justify-between items-center"><h3 className="font-bold text-sm text-slate-200">{column.title}</h3><span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span></div>
            <div className="p-2 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                {items.map((app) => ( <DraggableCard key={app._id} app={app} isBeingAnalyzed={currentBatchAppId === app._id} openDetails={openDetails} /> ))}
            </div>
        </div>
    );
}

function DraggableCard({ app, isBeingAnalyzed, openDetails }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: app._id });
    const style = transform ? { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 50 : 1 } : undefined;
    return ( <div ref={setNodeRef} style={style} {...listeners} {...attributes}> <KanbanCard app={app} isBeingAnalyzed={isBeingAnalyzed} openDetails={openDetails} /> </div> );
}

function KanbanCard({ app, isOverlay, isBeingAnalyzed, openDetails }) {
    const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";
    const getLatestAnalysis = (app) => {
      if (!app || !app.aiAnalysis) return null;
      const history = Array.isArray(app.aiAnalysis) ? app.aiAnalysis : [app.aiAnalysis];
      if (history.length === 0) return null;
      const valid = history.find(h => (h.score !== undefined && h.score > 0) || (h.matchScore !== undefined && h.matchScore > 0));
      return valid || history[0];
    };
    const latest = getLatestAnalysis(app);
    const handleClick = () => { if (!isOverlay) openDetails(app); };
    return (
        <div onClick={handleClick} className={`p-4 rounded-lg bg-slate-800 border border-slate-700 shadow-sm hover:border-indigo-500/50 cursor-grab group relative transition-all ${isOverlay ? 'shadow-2xl ring-2 ring-indigo-500 rotate-2 cursor-grabbing' : ''} ${isBeingAnalyzed ? 'ring-1 ring-indigo-400' : ''}`} >
            {isBeingAnalyzed && <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div></div>}
            <div className="flex items-center gap-3 mb-3 pointer-events-none"> 
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600">
                    {app.applicantId?.profilePicture ? <img src={app.applicantId.profilePicture.startsWith('http') ? app.applicantId.profilePicture : `${API_BASE_URL}${app.applicantId.profilePicture}`} alt="Avatar" className="w-full h-full object-cover"/> : <UserIcon />}
                </div>
                <div className="min-w-0"><h4 className="font-bold text-[15px] text-white truncate">{app.applicantId?.name}</h4><p className="text-xs text-slate-400 truncate">{app.jobId?.title}</p></div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    {latest ? ( <span className={`text-xs font-bold px-2.5 py-1 rounded w-fit ${latest.matchScore > 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>Score: {latest.matchScore}%</span> ) : <span className="text-xs text-slate-500 italic">No AI Score</span>}
                    {app.resumeUrl && ( <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} className="text-slate-400 hover:text-white bg-slate-700/50 p-1.5 rounded-md border border-slate-600 hover:border-slate-500 transition-colors" title="View Resume"> <FileIcon /> </a> )}
                </div>
                {latest && latest.metadata && (
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter text-slate-500 px-1">
                        <span>{latest.metadata.method === 'local' ? 'Standard' : 'AI'} Match</span>
                        {latest.metadata.confidenceLabel && <span>{latest.metadata.confidenceLabel.split(' ')[0]} Trust</span>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecruiterDashboard;