// import { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Link } from "react-router-dom";
// import useDebounce from "../hooks/useDebounce"; // 👈 IMPORT

// // --- ICONS ---
// const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/></svg>);
// const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
// const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>);
// const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
// const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
// const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);

// const StatusIcon = ({ status }) => {
//   if (status === "Shortlisted") return <span className="text-emerald-400">🎉</span>;
//   if (status === "Rejected") return <span className="text-red-400">❌</span>;
//   if (status === "Viewed") return <span className="text-blue-400">👀</span>;
//   if (status === "Interviewing") return <span className="text-purple-400">🎤</span>;
//   if (status === "Hired") return <span className="text-cyan-400">🤝</span>;
//   return <span className="text-yellow-400">⏳</span>; 
// };

// // --- HELPER: Get correct file URL ---
// const getFileUrl = (path) => {
//   if (!path) return "#";
//   if (path.startsWith("http")) return path;
//   const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";
//   return `${API_BASE_URL}${path}`;
// };

// // --- SKELETON LOADER ---
// const AppSkeleton = () => (
//     <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl animate-pulse flex flex-col md:flex-row justify-between items-center gap-4 h-[100px]">
//         <div className="flex items-center gap-4 w-full">
//             <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
//             <div className="flex-1">
//                 <div className="h-4 w-1/3 bg-slate-800 rounded mb-2"></div>
//                 <div className="h-3 w-1/4 bg-slate-800 rounded"></div>
//             </div>
//         </div>
//         <div className="h-8 w-24 bg-slate-800 rounded-lg"></div>
//     </div>
// );

// function MyApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter States
//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearch = useDebounce(searchQuery, 300); // 👈 DEBOUNCED

//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedApp, setSelectedApp] = useState(null);

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.get("/applications/my-applications");
//         setApplications(res.data);
//       } catch (err) {
//         console.error("Failed to load applications", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchApps();
//   }, []);

//   // --- ⚡ FILTERING LOGIC ---
//   const filteredApps = applications.filter((app) => {
//     // Use debouncedSearch instead of searchQuery
//     const query = debouncedSearch.toLowerCase();
    
//     const titleMatch = app.jobId?.title?.toLowerCase().includes(query);
//     const companyMatch = app.jobId?.company?.toLowerCase().includes(query);
//     const statusMatch = statusFilter === "All" || app.status === statusFilter;

//     return (titleMatch || companyMatch) && statusMatch;
//   });

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Shortlisted": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//       case "Rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
//       case "Viewed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
//       case "Interviewing": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
//       case "Hired": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
//       default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-[#020617] text-slate-200">
//       <div className="max-w-5xl mx-auto">
        
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-white tracking-tight">My Applications</h2>
//           <p className="text-slate-400 text-sm mt-1">Track the status of your job submissions</p>
//         </div>

//         {/* --- CONTROLS (SEARCH & FILTER) --- */}
//         <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
            
//             {/* Search Bar */}
//             <div className="relative w-full md:w-96">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><SearchIcon /></div>
//                 <input 
//                     type="text" 
//                     placeholder="Search by Job Title or Company..." 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full bg-[#020617] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none placeholder-slate-500"
//                 />
//             </div>

//             {/* Status Dropdown */}
//             <div className="flex items-center gap-2 w-full md:w-auto">
//                 <span className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FilterIcon /> Status:</span>
//                 <select 
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="bg-[#020617] border border-slate-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 cursor-pointer w-full md:w-auto"
//                 >
//                     <option value="All">All Applications</option>
//                     <option value="Submitted">Submitted</option>
//                     <option value="Viewed">Viewed</option>
//                     <option value="Shortlisted">Shortlisted</option>
//                     <option value="Interviewing">Interviewing</option>
//                     <option value="Hired">Hired</option>
//                     <option value="Rejected">Rejected</option>
//                 </select>
//             </div>
//         </div>

//         {loading ? (
//           <div className="grid gap-4">
//               {[1, 2, 3, 4].map((i) => <AppSkeleton key={i} />)}
//           </div>
//         ) : filteredApps.length === 0 ? (
//           <div className="text-center py-24 bg-[#0f172a] rounded-2xl border border-slate-800 border-dashed">
//             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
//             <h3 className="text-xl font-bold text-white mb-2">No Applications Found</h3>
//             <p className="text-slate-400 mb-6">Try adjusting your filters or apply for new jobs.</p>
//             <Link to="/jobs" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
//               Browse Jobs
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {filteredApps.map((app) => (
//               <div 
//                 key={app._id} 
//                 onClick={() => setSelectedApp(app)}
//                 className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-indigo-500/10"
//               >
//                 {/* Job Info */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
//                     <BuildingIcon />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
//                       {app.jobId?.title || "Deleted Job"}
//                     </h3>
//                     <p className="text-sm text-slate-400 font-medium">
//                       {app.jobId?.company} • <span className="text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Status Badge */}
//                 <div className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 ${getStatusStyle(app.status)}`}>
//                   <StatusIcon status={app.status} />
//                   {app.status}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* --- APPLICATION DETAILS MODAL --- */}
//       {selectedApp && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
//           <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full my-8 flex flex-col max-h-[90vh]">
            
//             {/* Header */}
//             <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-start sticky top-0 z-10 rounded-t-2xl">
//               <div className="flex gap-4">
//                   <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
//                     <BuildingIcon />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white leading-tight">
//                         {selectedApp.jobId?.title || "Unknown Role"}
//                     </h3>
//                     <div className="flex items-center gap-2 text-indigo-400 font-medium mt-1">
//                         {selectedApp.jobId?.company}
//                     </div>
//                   </div>
//               </div>
//               <button onClick={() => setSelectedApp(null)} className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
//                 <CloseIcon />
//               </button>
//             </div>

//             {/* Scrollable Content */}
//             <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
                
//                 {/* Status Section */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
//                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Current Status</p>
//                         <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold ${getStatusStyle(selectedApp.status)}`}>
//                             <StatusIcon status={selectedApp.status} /> {selectedApp.status}
//                         </div>
//                     </div>
//                     <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
//                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Applied On</p>
//                         <div className="flex items-center gap-2 text-slate-300 font-medium">
//                             <CalendarIcon /> {new Date(selectedApp.createdAt).toLocaleDateString()}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Resume Section */}
//                 <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
//                     <div className="flex justify-between items-center">
//                         <div>
//                             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Submitted Resume</p>
//                             <p className="text-slate-300 text-sm">Review the document you sent for this application.</p>
//                         </div>
//                         <a 
//                             href={getFileUrl(selectedApp.resumeUrl)} 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
//                         >
//                             <FileIcon /> View PDF
//                         </a>
//                     </div>
//                 </div>

//                 {/* Job Details Section */}
//                 <div>
//                     <h4 className="text-white font-bold mb-4 flex items-center gap-2">
//                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Job Description
//                     </h4>
//                     <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-slate-400 text-sm leading-relaxed whitespace-pre-line">
//                         {selectedApp.jobId?.description || "No description available for this role."}
//                     </div>
//                 </div>

//                 {/* Metadata */}
//                 {selectedApp.jobId?.location && (
//                     <div className="flex gap-4 text-xs text-slate-500">
//                         <span className="flex items-center gap-1"><MapPinIcon /> {selectedApp.jobId.location}</span>
//                         {selectedApp.jobId.salary && <span>• {selectedApp.jobId.salary}</span>}
//                     </div>
//                 )}

//             </div>

//             {/* Footer */}
//             <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-end sticky bottom-0 rounded-b-2xl">
//                 <button onClick={() => setSelectedApp(null)} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm transition-colors border border-slate-700">
//                     Close Details
//                 </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default MyApplications;


//new one//

import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

// ─── ICONS ───
const SearchIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const FilterIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const CloseIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const FileIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const CalIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const PinIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ExternalIcon = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// ── SAME as original — untouched ──
const getFileUrl = (path) => {
  if (!path) return "#";
  if (path.startsWith("http")) return path;
  const API_BASE_URL = import.meta.env.MODE === "production"
    ? "https://axon-hire-mvp.onrender.com"
    : "http://localhost:5000";
  return `${API_BASE_URL}${path}`;
};

// ── STATUS CONFIG ──
const STATUS_CONFIG = {
  Shortlisted:  { color: "var(--green)",  bg: "var(--green-bg)",  emoji: "🎉" },
  Hired:        { color: "var(--cyan,#0e7490)", bg: "var(--cyan-bg,#ecfeff)", emoji: "🤝" },
  Rejected:     { color: "var(--red)",    bg: "var(--red-bg)",    emoji: "✕"  },
  Viewed:       { color: "var(--accent)", bg: "var(--accent-bg)", emoji: "👀" },
  Interviewing: { color: "var(--purple)", bg: "var(--purple-bg)", emoji: "🎤" },
  Submitted:    { color: "var(--orange)", bg: "var(--orange-bg)", emoji: "⏳" },
};
const getStatus = (s) => STATUS_CONFIG[s] || STATUS_CONFIG.Submitted;

// ── SKELETON ──
const AppSkeleton = () => (
  <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
    <div className="ax-skeleton" style={{ width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0 }} />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
      <div className="ax-skeleton" style={{ height: "13px", width: "45%", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "11px", width: "30%", borderRadius: "3px" }} />
    </div>
    <div className="ax-skeleton" style={{ height: "22px", width: "80px", borderRadius: "4px" }} />
  </div>
);

function MyApplications() {
  // ── SAME state as original — untouched ──
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

  // ── SAME logic as original — untouched ──
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/applications/my-applications");
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // ── SAME filtering logic — untouched ──
  const filteredApps = applications.filter((app) => {
    const query = debouncedSearch.toLowerCase();
    const titleMatch   = app.jobId?.title?.toLowerCase().includes(query);
    const companyMatch = app.jobId?.company?.toLowerCase().includes(query);
    const statusMatch  = statusFilter === "All" || app.status === statusFilter;
    return (titleMatch || companyMatch) && statusMatch;
  });

  // ── SAME status style logic — untouched ──
  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":  return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected":     return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Viewed":       return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Interviewing": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Hired":        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default:             return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  // Count per status for the filter tabs
  const statusCounts = ["All", "Submitted", "Viewed", "Shortlisted", "Interviewing", "Hired", "Rejected"].reduce((acc, s) => {
    acc[s] = s === "All" ? applications.length : applications.filter(a => a.status === s).length;
    return acc;
  }, {});

  // Company logo color — deterministic
  const logoColor = (name) => {
    const colors = ["#0057b8","#0891b2","#7c3aed","#16a34a","#d97706","#be185d","#dc2626","#0e7490"];
    return colors[(name?.charCodeAt(0) || 0) % colors.length];
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>
            My Applications
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
            Track the status of every job you've applied to
          </p>
        </div>

        {/* ── SEARCH + FILTER BAR ── */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "200px", background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", borderRadius: "6px", padding: "0 12px", height: "36px" }}>
            <span style={{ color: "var(--text-3)", flexShrink: 0 }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search by role or company…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: "none", outline: "none", background: "transparent", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "var(--text-1)", width: "100%" }}
            />
          </div>

          {/* Status dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "var(--text-3)", display: "flex" }}><FilterIcon /></span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: "7px 10px", border: "1px solid var(--border-strong)", borderRadius: "6px", background: "var(--bg-surface)", color: "var(--text-1)", fontFamily: "Inter, sans-serif", fontSize: "12px", outline: "none", cursor: "pointer" }}
            >
              {Object.entries(statusCounts).map(([s, count]) => (
                <option key={s} value={s}>{s}{count > 0 ? ` (${count})` : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── STATUS SUMMARY PILLS ── */}
        {!loading && applications.length > 0 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            {Object.entries(STATUS_CONFIG).filter(([s]) => statusCounts[s] > 0).map(([s, cfg]) => (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? "All" : s)}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "4px 10px", borderRadius: "4px", border: `1px solid ${statusFilter === s ? cfg.color : "var(--border)"}`,
                  background: statusFilter === s ? cfg.bg : "var(--bg-surface)",
                  color: statusFilter === s ? cfg.color : "var(--text-2)",
                  fontSize: "11px", fontWeight: 500, cursor: "pointer",
                  fontFamily: "Inter, sans-serif", transition: "all 0.15s",
                }}
              >
                <span>{cfg.emoji}</span>
                {s}
                <span style={{ background: statusFilter === s ? cfg.color : "var(--bg-subtle)", color: statusFilter === s ? "white" : "var(--text-3)", borderRadius: "2px", padding: "0 4px", fontSize: "10px", fontWeight: 700 }}>
                  {statusCounts[s]}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── LOADING ── */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[1,2,3,4].map(i => <AppSkeleton key={i} />)}
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && filteredApps.length === 0 && (
          <div style={{ textAlign: "center", padding: "56px 24px", background: "var(--bg-surface)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "6px" }}>
              {applications.length === 0 ? "No applications yet" : "No matches found"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "20px" }}>
              {applications.length === 0 ? "Start applying to jobs to track them here" : "Try a different search or filter"}
            </p>
            {applications.length === 0
              ? <Link to="/jobs" style={{ padding: "8px 20px", background: "var(--accent)", color: "white", borderRadius: "5px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>Browse Jobs</Link>
              : <button onClick={() => { setSearchQuery(""); setStatusFilter("All"); }} style={{ padding: "8px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: "5px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Clear filters</button>
            }
          </div>
        )}

        {/* ── APPLICATION LIST ── */}
        {!loading && filteredApps.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {filteredApps.map(app => {
              const cfg = getStatus(app.status);
              const color = logoColor(app.jobId?.company);
              return (
                <div
                  key={app._id}
                  onClick={() => setSelectedApp(app)}
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "13px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Logo */}
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {app.jobId?.company?.charAt(0) || "?"}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>
                      {app.jobId?.title || "Deleted Job"}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{app.jobId?.company || "—"}</span>
                      <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
                      <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <CalIcon />{new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "4px", background: cfg.bg, color: cfg.color, fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", flexShrink: 0 }}>
                    <span>{cfg.emoji}</span>
                    {app.status}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══ APPLICATION DETAIL MODAL ══ */}
      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
          style={{ position: "fixed", inset: 0, background: "var(--modal-overlay)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "13px", maxWidth: "600px", width: "100%", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)" }}
          >
            {/* Modal header */}
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: "13px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: logoColor(selectedApp.jobId?.company), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                {selectedApp.jobId?.company?.charAt(0) || "?"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>
                  {selectedApp.jobId?.title || "Deleted Job"}
                </div>
                <div style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500 }}>
                  {selectedApp.jobId?.company}
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ width: "28px", height: "28px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-3)", flexShrink: 0 }}>
                <CloseIcon />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Status + Date grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {/* Status */}
                <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "7px" }}>Status</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "4px", background: getStatus(selectedApp.status).bg, color: getStatus(selectedApp.status).color, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {getStatus(selectedApp.status).emoji} {selectedApp.status}
                  </div>
                </div>
                {/* Date */}
                <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "7px" }}>Applied On</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 500, color: "var(--text-1)" }}>
                    <CalIcon />
                    {new Date(selectedApp.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Resume link */}
              <div style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                    <FileIcon />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-1)" }}>Submitted Resume</div>
                    <div style={{ fontSize: "11px", color: "var(--text-3)" }}>The PDF you sent with this application</div>
                  </div>
                </div>
                <a
                  href={getFileUrl(selectedApp.resumeUrl)}
                  target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 14px", borderRadius: "5px", background: "var(--accent)", color: "white", fontSize: "12px", fontWeight: 500, textDecoration: "none" }}
                >
                  <ExternalIcon /> View PDF
                </a>
              </div>

              {/* Job details */}
              {selectedApp.jobId?.description && (
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "8px" }}>About the Role</div>
                  <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.75, background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px", whiteSpace: "pre-line" }}>
                    {selectedApp.jobId.description}
                  </div>
                </div>
              )}

              {/* Location + salary meta */}
              {(selectedApp.jobId?.location || selectedApp.jobId?.salary) && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {selectedApp.jobId?.location && (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-2)", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "4px", padding: "4px 10px" }}>
                      <PinIcon />{selectedApp.jobId.location}
                    </span>
                  )}
                  {selectedApp.jobId?.salary && (
                    <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: 600, background: "var(--green-bg)", border: "1px solid var(--green)", borderRadius: "4px", padding: "4px 10px" }}>
                      {selectedApp.jobId.salary}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedApp(null)} style={{ padding: "8px 20px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-2)", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplications;