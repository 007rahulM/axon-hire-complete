import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce"; // 👈 IMPORT

// --- ICONS ---
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const GridIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
const ListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const MoneyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);

// --- SKELETON LOADER ---
const JobSkeleton = () => (
  <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl animate-pulse flex flex-col h-[200px]">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
      <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
    </div>
    <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-slate-800 rounded mb-auto"></div>
    <div className="h-4 w-full bg-slate-800 rounded mt-4"></div>
  </div>
);

// --- INTERNAL MODAL COMPONENT (Reused Logic) ---
function JobDetailsModal({ job, onClose, onRemove }) {
  if (!job) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900 sticky top-0 z-10">
           <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner">
                 <BriefcaseIcon />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-white leading-tight">{job.title}</h2>
                 <p className="text-indigo-400 font-medium mt-1">{job.company}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><CloseIcon /></button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6 bg-[#0f111a] custom-scrollbar">
           <div className="flex gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-700"><MapPinIcon /> {job.location || "Remote"}</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-900/10 px-2.5 py-1 rounded-md border border-emerald-900/30"><MoneyIcon /> {job.salary || "N/A"}</span>
           </div>
           
           <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1 inline-block">Description</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm">{job.description || "No description provided."}</p>
           </div>
           
           {job.requirements && (
             <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1 inline-block">Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {job.requirements.map((req, i) => (
                   <span key={i} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 rounded-lg text-xs font-medium">{req}</span>
                 ))}
               </div>
             </div>
           )}
        </div>
        
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-end gap-3 sticky bottom-0 z-10">
           <button 
             onClick={onClose}
             className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors border border-slate-700"
           >
             Close
           </button>
           <button 
             onClick={() => { onRemove(job._id); onClose(); }} 
             className="px-6 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
           >
             <TrashIcon /> Remove
           </button>
        </div>
      </div>
    </div>
  );
}

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔍 Features: Search, View Mode, Pagination
  const [searchQuery, setSearchQuery] = useState("");
  // 👇 2. USE DEBOUNCE (Delays filtering by 300ms)
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); // For Modal

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true); // Ensure loading state is set before fetch
      const res = await axiosInstance.get("/users/saved-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    // Optimistic UI Update: Remove immediately
    const previousJobs = [...jobs];
    setJobs(prev => prev.filter(job => job._id !== jobId));

    try {
      await axiosInstance.put(`/users/save/${jobId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to remove job");
      setJobs(previousJobs); // Revert on failure
    }
  };

  // --- FILTERING LOGIC ---
  const filteredJobs = jobs.filter(job => {
    // 3. Use debouncedSearch
    const query = debouncedSearch.toLowerCase();
    return job.title.toLowerCase().includes(query) || 
           job.company.toLowerCase().includes(query);
  });

  // --- PAGINATION LOGIC ---
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020617] px-4 md:px-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Saved Jobs</h1>
            <p className="text-slate-400 text-sm mt-1">
              You have <span className="text-indigo-400 font-bold">{filteredJobs.length}</span> saved positions.
            </p>
          </div>

          {/* CONTROLS: Search & View Toggle */}
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:w-64">
                <div className="absolute left-3 top-2.5 text-slate-500"><SearchIcon /></div>
                <input 
                  type="text" 
                  placeholder="Search saved jobs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-500"
                />
             </div>
             
             {/* View Toggles */}
             <div className="flex bg-[#0f172a] p-1 rounded-xl border border-slate-700">
               <button 
                 onClick={() => setViewMode("grid")}
                 className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
               >
                 <GridIcon />
               </button>
               <button 
                 onClick={() => setViewMode("list")}
                 className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
               >
                 <ListIcon />
               </button>
             </div>
          </div>
        </div>

        {/* LOADING & EMPTY STATES */}
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <JobSkeleton key={i} />
                ))}
            </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-24 bg-[#0f172a] rounded-2xl border border-slate-800 border-dashed">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
            <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
            <p className="text-slate-400 text-sm mb-6">You haven't saved any jobs matching your search.</p>
            <button onClick={() => navigate("/jobs")} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20">Browse Jobs</button>
          </div>
        ) : (
          <>
            {/* --- GRID VIEW --- */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map((job) => (
                  <div 
                    key={job._id} 
                    onClick={() => setSelectedJob(job)}
                    className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl relative group hover:border-indigo-500/50 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-indigo-500/10 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700">
                        <BriefcaseIcon />
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemove(job._id); }}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-full transition-colors z-10"
                        title="Remove"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                    <p className="text-sm text-slate-400 font-bold mb-4">{job.company}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-500 flex items-center gap-1"><MapPinIcon /> {job.location || "Remote"}</span>
                        <span className="text-emerald-400 font-medium bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/30">{job.salary || "N/A"}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- LIST VIEW (COMPACT) --- */
              <div className="flex flex-col gap-3">
                {currentJobs.map((job) => (
                  <div 
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className="flex items-center justify-between bg-[#0f172a] border border-slate-800 p-4 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/30 cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-700 group-hover:text-indigo-400 transition-colors">
                          <BriefcaseIcon />
                       </div>
                       <div>
                          <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                          <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <span className="hidden md:block text-xs text-emerald-400 bg-emerald-900/10 px-3 py-1 rounded-md border border-emerald-900/30 font-medium">{job.salary || "N/A"}</span>
                       <button 
                          onClick={(e) => { e.stopPropagation(); handleRemove(job._id); }}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors hover:bg-slate-900 rounded-full"
                          title="Remove"
                        >
                          <TrashIcon />
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                 <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-800 text-white transition-colors">Prev</button>
                 <span className="text-slate-500 text-sm px-2">Page {currentPage} of {totalPages}</span>
                 <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm disabled:opacity-50 hover:bg-slate-800 text-white transition-colors">Next</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- MODAL --- */}
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