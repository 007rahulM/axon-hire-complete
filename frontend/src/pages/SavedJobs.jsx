// import { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import useDebounce from "../hooks/useDebounce"; // 👈 IMPORT

// // --- ICONS ---
// const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
// const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
// const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
// const GridIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
// const ListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
// const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
// const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
// const MoneyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);

// // --- SKELETON LOADER ---
// const JobSkeleton = () => (
//   <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl animate-pulse flex flex-col h-[200px]">
//     <div className="flex justify-between items-start mb-4">
//       <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
//       <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
//     </div>
//     <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
//     <div className="h-4 w-1/2 bg-slate-800 rounded mb-auto"></div>
//     <div className="h-4 w-full bg-slate-800 rounded mt-4"></div>
//   </div>
// );

// // --- INTERNAL MODAL COMPONENT (Reused Logic) ---
// function JobDetailsModal({ job, onClose, onRemove }) {
//   if (!job) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
//       <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
//         <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900 sticky top-0 z-10">
//            <div className="flex gap-4">
//               <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner">
//                  <BriefcaseIcon />
//               </div>
//               <div>
//                  <h2 className="text-xl font-bold text-white leading-tight">{job.title}</h2>
//                  <p className="text-indigo-400 font-medium mt-1">{job.company}</p>
//               </div>
//            </div>
//            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><CloseIcon /></button>
//         </div>
        
//         <div className="p-6 overflow-y-auto space-y-6 bg-[#0f111a] custom-scrollbar">
//            <div className="flex gap-4 text-sm text-slate-400">
//               <span className="flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-700"><MapPinIcon /> {job.location || "Remote"}</span>
//               <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-900/10 px-2.5 py-1 rounded-md border border-emerald-900/30"><MoneyIcon /> {job.salary || "N/A"}</span>
//            </div>
           
//            <div>
//               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1 inline-block">Description</h3>
//               <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm">{job.description || "No description provided."}</p>
//            </div>
           
//            {job.requirements && (
//              <div>
//                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1 inline-block">Skills</h3>
//                <div className="flex flex-wrap gap-2">
//                  {job.requirements.map((req, i) => (
//                    <span key={i} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 rounded-lg text-xs font-medium">{req}</span>
//                  ))}
//                </div>
//              </div>
//            )}
//         </div>
        
//         <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-end gap-3 sticky bottom-0 z-10">
//            <button 
//              onClick={onClose}
//              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors border border-slate-700"
//            >
//              Close
//            </button>
//            <button 
//              onClick={() => { onRemove(job._id); onClose(); }} 
//              className="px-6 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
//            >
//              <TrashIcon /> Remove
//            </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SavedJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 🔍 Features: Search, View Mode, Pagination
//   const [searchQuery, setSearchQuery] = useState("");
//   // 👇 2. USE DEBOUNCE (Delays filtering by 300ms)
//   const debouncedSearch = useDebounce(searchQuery, 300);

//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedJob, setSelectedJob] = useState(null); // For Modal

//   const ITEMS_PER_PAGE = 10;

//   useEffect(() => {
//     fetchSavedJobs();
//   }, []);

//   const fetchSavedJobs = async () => {
//     try {
//       setLoading(true); // Ensure loading state is set before fetch
//       const res = await axiosInstance.get("/users/saved-jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (jobId) => {
//     // Optimistic UI Update: Remove immediately
//     const previousJobs = [...jobs];
//     setJobs(prev => prev.filter(job => job._id !== jobId));

//     try {
//       await axiosInstance.put(`/users/save/${jobId}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to remove job");
//       setJobs(previousJobs); // Revert on failure
//     }
//   };

//   // --- FILTERING LOGIC ---
//   const filteredJobs = jobs.filter(job => {
//     // 3. Use debouncedSearch
//     const query = debouncedSearch.toLowerCase();
//     return job.title.toLowerCase().includes(query) || 
//            job.company.toLowerCase().includes(query);
//   });

//   // --- PAGINATION LOGIC ---
//   const indexOfLast = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
//   const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-12 bg-[#020617] px-4 md:px-8 text-slate-200">
//       <div className="max-w-7xl mx-auto">
        
//         {/* HEADER SECTION */}
//         <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800 pb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-white tracking-tight">Saved Jobs</h1>
//             <p className="text-slate-400 text-sm mt-1">
//               You have <span className="text-indigo-400 font-bold">{filteredJobs.length}</span> saved positions.
//             </p>
//           </div>

//           {/* CONTROLS: Search & View Toggle */}
//           <div className="flex gap-3 w-full md:w-auto">
//              <div className="relative flex-grow md:w-64">
//                 <div className="absolute left-3 top-2.5 text-slate-500"><SearchIcon /></div>
//                 <input 
//                   type="text" 
//                   placeholder="Search saved jobs..." 
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-500"
//                 />
//              </div>
             
//              {/* View Toggles */}
//              <div className="flex bg-[#0f172a] p-1 rounded-xl border border-slate-700">
//                <button 
//                  onClick={() => setViewMode("grid")}
//                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
//                >
//                  <GridIcon />
//                </button>
//                <button 
//                  onClick={() => setViewMode("list")}
//                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
//                >
//                  <ListIcon />
//                </button>
//              </div>
//           </div>
//         </div>

//         {/* LOADING & EMPTY STATES */}
//         {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                     <JobSkeleton key={i} />
//                 ))}
//             </div>
//         ) : filteredJobs.length === 0 ? (
//           <div className="text-center py-24 bg-[#0f172a] rounded-2xl border border-slate-800 border-dashed">
//             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
//             <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
//             <p className="text-slate-400 text-sm mb-6">You haven't saved any jobs matching your search.</p>
//             <button onClick={() => navigate("/jobs")} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20">Browse Jobs</button>
//           </div>
//         ) : (
//           <>
//             {/* --- GRID VIEW --- */}
//             {viewMode === "grid" ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentJobs.map((job) => (
//                   <div 
//                     key={job._id} 
//                     onClick={() => setSelectedJob(job)}
//                     className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl relative group hover:border-indigo-500/50 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-indigo-500/10 flex flex-col h-full"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="p-3 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700">
//                         <BriefcaseIcon />
//                       </div>
//                       <button 
//                         onClick={(e) => { e.stopPropagation(); handleRemove(job._id); }}
//                         className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-full transition-colors z-10"
//                         title="Remove"
//                       >
//                         <TrashIcon />
//                       </button>
//                     </div>
//                     <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
//                     <p className="text-sm text-slate-400 font-bold mb-4">{job.company}</p>
                    
//                     <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
//                         <span className="text-slate-500 flex items-center gap-1"><MapPinIcon /> {job.location || "Remote"}</span>
//                         <span className="text-emerald-400 font-medium bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/30">{job.salary || "N/A"}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               /* --- LIST VIEW (COMPACT) --- */
//               <div className="flex flex-col gap-3">
//                 {currentJobs.map((job) => (
//                   <div 
//                     key={job._id}
//                     onClick={() => setSelectedJob(job)}
//                     className="flex items-center justify-between bg-[#0f172a] border border-slate-800 p-4 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/30 cursor-pointer transition-all group shadow-sm"
//                   >
//                     <div className="flex items-center gap-4">
//                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-700 group-hover:text-indigo-400 transition-colors">
//                           <BriefcaseIcon />
//                        </div>
//                        <div>
//                           <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
//                           <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
//                        </div>
//                     </div>
//                     <div className="flex items-center gap-6">
//                        <span className="hidden md:block text-xs text-emerald-400 bg-emerald-900/10 px-3 py-1 rounded-md border border-emerald-900/30 font-medium">{job.salary || "N/A"}</span>
//                        <button 
//                           onClick={(e) => { e.stopPropagation(); handleRemove(job._id); }}
//                           className="p-2 text-slate-500 hover:text-red-400 transition-colors hover:bg-slate-900 rounded-full"
//                           title="Remove"
//                         >
//                           <TrashIcon />
//                         </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* --- PAGINATION --- */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center mt-12 gap-2">
//                  <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-800 text-white transition-colors">Prev</button>
//                  <span className="text-slate-500 text-sm px-2">Page {currentPage} of {totalPages}</span>
//                  <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-800 text-white transition-colors">Next</button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* --- MODAL --- */}
//       {selectedJob && (
//         <JobDetailsModal 
//           job={selectedJob} 
//           onClose={() => setSelectedJob(null)} 
//           onRemove={handleRemove} 
//         />
//       )}

//     </div>
//   );
// }

// export default SavedJobs;


//new one//

import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const ITEMS_PER_PAGE = 10;

// ─── ICONS ───
const SearchIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const GridIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const ListIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const TrashIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const CloseIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const PinIcon   = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const SalIcon   = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const BookmarkFilledIcon = () => <svg width="13" height="13" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;

// logo color — deterministic
const logoColor = (name) => {
  const colors = ["#0057b8","#0891b2","#7c3aed","#16a34a","#d97706","#be185d","#dc2626","#0e7490"];
  return colors[(name?.charCodeAt(0) || 0) % colors.length];
};

// ── SKELETON ──
const JobSkeleton = () => (
  <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
      <div className="ax-skeleton" style={{ width: "38px", height: "38px", borderRadius: "8px", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
        <div className="ax-skeleton" style={{ height: "11px", width: "40%", borderRadius: "3px" }} />
        <div className="ax-skeleton" style={{ height: "13px", width: "65%", borderRadius: "3px" }} />
      </div>
    </div>
    <div style={{ display: "flex", gap: "5px" }}>
      <div className="ax-skeleton" style={{ height: "10px", width: "60px", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "10px", width: "50px", borderRadius: "3px" }} />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
      <div className="ax-skeleton" style={{ height: "12px", width: "70px", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "26px", width: "60px", borderRadius: "4px" }} />
    </div>
  </div>
);

// ── JOB DETAILS MODAL ──
function JobDetailsModal({ job, onClose, onRemove }) {
  if (!job) return null;
  const color = logoColor(job.company);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "var(--modal-overlay)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "13px", maxWidth: "580px", width: "100%", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)" }}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: "13px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: "white", flexShrink: 0 }}>
            {job.company?.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>{job.title}</div>
            <div style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500, marginBottom: "8px" }}>{job.company}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {job.location && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 9px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "11px", color: "var(--text-2)", background: "var(--bg-subtle)" }}>
                  <PinIcon />{job.location}
                </span>
              )}
              {job.salary && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 9px", border: "1px solid var(--green)", borderRadius: "4px", fontSize: "11px", color: "var(--green)", background: "var(--green-bg)", fontWeight: 600 }}>
                  <SalIcon />{job.salary}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-3)", flexShrink: 0 }}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          {job.description ? (
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "8px" }}>About the Role</div>
              <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.75, whiteSpace: "pre-line", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px" }}>
                {job.description}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px", background: "var(--bg-subtle)", borderRadius: "8px", border: "1px dashed var(--border)", fontSize: "13px", color: "var(--text-3)", fontStyle: "italic" }}>
              No description provided.
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "8px" }}>Skills Required</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {job.requirements.map((skill, i) => (
                  <span key={i} style={{ padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: 500, background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => { onRemove(job._id); onClose(); }}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "5px", border: "1px solid var(--red)", background: "var(--red-bg)", color: "var(--red)", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}
          >
            <TrashIcon /> Remove from saved
          </button>
          <button onClick={onClose} style={{ padding: "7px 18px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-2)", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──
function SavedJobs() {
  // ── SAME state as original — untouched ──
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  // ── SAME logic as original — untouched ──
  useEffect(() => { fetchSavedJobs(); }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users/saved-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── SAME logic as original — untouched ──
  const handleRemove = async (jobId) => {
    const previousJobs = [...jobs];
    setJobs(prev => prev.filter(job => job._id !== jobId));
    try {
      await axiosInstance.put(`/users/save/${jobId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to remove job");
      setJobs(previousJobs);
    }
  };

  // ── SAME filtering logic — untouched ──
  const filteredJobs = jobs.filter(job => {
    const query = debouncedSearch.toLowerCase();
    return job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
  });

  // ── SAME pagination logic — untouched ──
  const indexOfLast  = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentJobs  = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages   = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", padding: "24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>Saved Jobs</h1>
            <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
              {loading ? "Loading…" : <><strong style={{ color: "var(--text-1)" }}>{filteredJobs.length}</strong> saved positions</>}
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: "7px", background: "var(--bg-surface)", border: "1px solid var(--border-strong)", borderRadius: "6px", padding: "0 12px", height: "34px", width: "220px" }}>
              <span style={{ color: "var(--text-3)", flexShrink: 0 }}><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search saved jobs…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ border: "none", outline: "none", background: "transparent", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "var(--text-1)", width: "100%" }}
              />
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "6px", padding: "3px", gap: "2px" }}>
              {[{ mode: "grid", icon: <GridIcon /> }, { mode: "list", icon: <ListIcon /> }].map(({ mode, icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  style={{ width: "28px", height: "28px", borderRadius: "4px", border: "none", cursor: "pointer", background: viewMode === mode ? "var(--bg-hover)" : "transparent", color: viewMode === mode ? "var(--accent)" : "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
            {[1,2,3,4,5,6].map(i => <JobSkeleton key={i} />)}
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && filteredJobs.length === 0 && (
          <div style={{ textAlign: "center", padding: "56px 24px", background: "var(--bg-surface)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📌</div>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "6px" }}>
              {jobs.length === 0 ? "No saved jobs yet" : "No matches found"}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "20px" }}>
              {jobs.length === 0 ? "Bookmark jobs while browsing to save them here" : "Try a different search term"}
            </p>
            <button
              onClick={() => jobs.length === 0 ? navigate("/jobs") : setSearchQuery("")}
              style={{ padding: "8px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: "5px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              {jobs.length === 0 ? "Browse Jobs" : "Clear search"}
            </button>
          </div>
        )}

        {/* ── GRID VIEW ── */}
        {!loading && filteredJobs.length > 0 && viewMode === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
            {currentJobs.map(job => {
              const color = logoColor(job.company);
              return (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "18px", cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", gap: "11px", position: "relative" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Top */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                      {job.company?.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 500, marginBottom: "2px" }}>{job.company}</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", lineHeight: 1.3 }}>{job.title}</div>
                    </div>
                    {/* Saved indicator */}
                    <div style={{ color: "var(--accent)", flexShrink: 0 }}><BookmarkFilledIcon /></div>
                  </div>

                  {/* Location + salary */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "var(--text-2)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><PinIcon />{job.location || "Remote"}</span>
                    {job.salary && <><span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} /><span style={{ color: "var(--green)", fontWeight: 600 }}>{job.salary}</span></>}
                  </div>

                  {/* Skills */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {job.requirements.slice(0, 3).map((s, i) => (
                        <span key={i} style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "10px", fontWeight: 500, background: "var(--bg-subtle)", color: "var(--text-2)", border: "1px solid var(--border)" }}>{s}</span>
                      ))}
                      {job.requirements.length > 3 && <span style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "10px", color: "var(--text-3)", background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>+{job.requirements.length - 3}</span>}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                    <button
                      onClick={e => { e.stopPropagation(); handleRemove(job._id); }}
                      style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-3)", fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.background = "var(--red-bg)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.background = "var(--bg-subtle)"; }}
                    >
                      <TrashIcon /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {!loading && filteredJobs.length > 0 && viewMode === "list" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {currentJobs.map(job => {
              const color = logoColor(job.company);
              return (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "13px 16px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "12px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "7px", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {job.company?.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)", marginBottom: "2px" }}>{job.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "5px" }}>
                      <span>{job.company}</span>
                      <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
                      <span>{job.location || "Remote"}</span>
                      {job.salary && <><span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} /><span style={{ color: "var(--green)", fontWeight: 600 }}>{job.salary}</span></>}
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleRemove(job._id); }}
                    style={{ width: "28px", height: "28px", borderRadius: "5px", border: "1px solid var(--border)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-3)", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.background = "var(--red-bg)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PAGINATION — same logic, new look ── */}
        {!loading && totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "24px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ padding: "6px 14px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: currentPage === 1 ? "var(--text-3)" : "var(--text-1)", fontFamily: "Inter, sans-serif", fontSize: "12px", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              ← Prev
            </button>

            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => handlePageChange(n)}
                  style={{ width: "32px", height: "32px", borderRadius: "5px", border: `1px solid ${currentPage === n ? "var(--accent)" : "var(--border)"}`, background: currentPage === n ? "var(--accent)" : "var(--bg-surface)", color: currentPage === n ? "white" : "var(--text-2)", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: currentPage === n ? 600 : 400, cursor: "pointer" }}>
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ padding: "6px 14px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: currentPage === totalPages ? "var(--text-3)" : "var(--text-1)", fontFamily: "Inter, sans-serif", fontSize: "12px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}

export default SavedJobs;