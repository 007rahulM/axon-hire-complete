import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

// --- CONFIG ---
const JOBS_PER_PAGE = 6;

// --- ICONS ---
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="2" x2="12" y2="4"></line><line x1="8" y1="2" x2="8" y2="4"></line><line x1="16" y1="2" x2="16" y2="4"></line></svg>);
const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const MoneyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const InfoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);

// --- JOB CARD COMPONENT ---
function JobCard({ job, onApply, applied, onClick }) {
  const { title, company, location, salary, requirements, description } = job;

  return (
    <div onClick={onClick} className="group relative flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-1 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/50">
      <div className="flex flex-col h-full bg-slate-900/40 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex justify-between items-start mb-5">
          <div className="flex items-start gap-4">
             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors duration-300 shadow-sm">
                <BuildingIcon />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors">{title}</h3>
                <p className="text-sm text-slate-400 font-medium mt-1">{company}</p>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700"><MapPinIcon /> {location || "Remote"}</span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/20 text-emerald-400 text-xs font-medium border border-emerald-800/30"><MoneyIcon /> {salary || "Not Disclosed"}</span>
        </div>

        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {requirements && requirements.length > 0 ? (
                    requirements.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">{skill}</span>
                    ))
                ) : <span className="text-xs text-slate-500 italic flex items-center gap-1"><InfoIcon /> No skills listed</span>}
                {requirements && requirements.length > 3 && <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-500 border border-slate-700">+{requirements.length - 3}</span>}
            </div>
        </div>

        <div className="mb-6 flex-grow">
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
              {description || <span className="italic opacity-50">No description provided.</span>}
          </p>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-700/50">
          <button
            onClick={(e) => { e.stopPropagation(); if(!applied) onApply(); }}
            disabled={applied}
            className={`w-full py-3 px-4 font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2
              ${applied ? "bg-slate-800/50 text-slate-500 cursor-default border border-slate-700" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-900/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"}`}
          >
            {applied ? <><CheckIcon /> Applied</> : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- JOB DETAILS MODAL ---
function JobModal({ job, onClose, onApply, applied }) {
  if (!job) return null;
  const hasDescription = job.description && job.description.trim().length > 0;
  const hasRequirements = job.requirements && job.requirements.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[90vh] relative">
        <div className="p-8 border-b border-slate-800 bg-slate-900 flex justify-between items-start">
            <div className="flex gap-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner"><BuildingIcon /></div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{job.title}</h2>
                    <p className="text-lg text-indigo-400 font-medium mt-1">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-slate-400 text-sm">
                        <span className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700"><MapPinIcon /> {job.location || "Remote"}</span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/30"><MoneyIcon /> {job.salary || "Competitive"}</span>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700"><CloseIcon /></button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8 bg-[#0f111a]">
          {hasDescription ? (
             <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">About the Role</h3>
                <div className="text-slate-300 leading-7 whitespace-pre-line text-sm md:text-base font-light">{job.description}</div>
             </section>
          ) : <div className="text-center p-8 bg-slate-800/30 rounded-xl border border-slate-800 border-dashed"><p className="text-slate-500 italic">No detailed description provided.</p></div>}
          
          {hasRequirements && (
            <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Skills & Requirements</h3>
                <div className="flex flex-wrap gap-2">
                {job.requirements.map((skill, index) => (
                    <span key={index} className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 text-sm font-medium">{skill}</span>
                ))}
                </div>
            </section>
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <button
            onClick={() => !applied && onApply(job)}
            disabled={applied}
            className={`w-full py-4 px-6 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl
              ${applied ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 hover:-translate-y-1"}`}
          >
            {applied ? <> <CheckIcon /> Application Submitted </> : "Apply for this Position"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN JOBS PAGE ---
function Jobs() {
  const { user, isLoggedIn } = useAuth();
  const [jobList, setJobList] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set()); // 🔥 FIX: Using Set for O(1) lookups
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All"); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Jobs
        const jobResponse = await axiosInstance.get("/jobs");
        setJobList(jobResponse.data);

        // 2. Fetch User's Applications (The Fix!)
        if (isLoggedIn) {
          try {
            const appsResponse = await axiosInstance.get("/applications/my-applications");
            // Create a Set of Job IDs the user has applied to
            const ids = new Set(appsResponse.data.map(app => app.jobId?._id || app.jobId));
            setAppliedJobIds(ids);
          } catch (err) {
            console.error("Failed to sync applications", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn]); // Re-run if login status changes

  // --- FILTER LOGIC ---
  const filteredJobs = jobList.filter(job => {
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = 
          job.title.toLowerCase().includes(query) || 
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query); 
      
      const matchesLocation = locationFilter === "All" 
          ? true 
          : locationFilter === "Remote" 
              ? job.location.toLowerCase().includes("remote") 
              : !job.location.toLowerCase().includes("remote");

      return matchesSearch && matchesLocation;
  });

  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApply = async (job) => {
    if (!isLoggedIn || !user) {
      alert("You must be logged in to apply for a job");
      navigate("/login");
      return;
    }
    
    if (!user.resumeUrl) {
      const confirmRedirect = window.confirm("Please upload a resume first. Go to Profile?");
      if (confirmRedirect) navigate("/profile");
      return;
    }

    try {
      await axiosInstance.post(`/applications/${job._id}/apply`);
      
      // Update UI instantly (Optimistic update)
      setAppliedJobIds(prev => new Set(prev).add(job._id));
      
      alert("Application Successful!");
    } catch (err) {
      console.error("Application failed:", err);
      if (err.response?.status === 400) {
         // Backend says "Already applied", so sync the UI
         setAppliedJobIds(prev => new Set(prev).add(job._id));
         alert("You have already applied.");
      } else {
         alert(err.response?.data?.message || "Application failed");
      }
    }
  };

  const isJobApplied = (jobId) => appliedJobIds.has(jobId);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & SEARCH SECTION */}
        <div className="mb-10 flex flex-col gap-6 border-b border-slate-800 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Open Positions</h2>
                    <p className="text-slate-400 text-lg">Find your next role at top companies.</p>
                </div>
                {!loading && (
                    <div className="bg-slate-900 px-5 py-2 rounded-full border border-slate-800 shadow-sm">
                        <span className="text-white font-bold">{filteredJobs.length}</span>
                        <span className="text-slate-400 ml-1">jobs found</span>
                    </div>
                )}
            </div>

            {/* SEARCH BAR */}
            <div className="flex flex-col md:flex-row gap-4 bg-[#0f172a] p-4 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-3.5 text-slate-500"><SearchIcon /></div>
                    <input 
                        type="text" 
                        placeholder="Search by Title, Company, or City..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-400 px-2 font-bold text-sm uppercase tracking-wide"><FilterIcon /> Filter:</div>
                    <select 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                    >
                        <option value="All">All Types</option>
                        <option value="Remote">Remote Only</option>
                        <option value="On-site">On-site</option>
                    </select>
                </div>
            </div>
        </div>

        {/* LOADING & EMPTY STATES */}
        {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-72 bg-slate-900 rounded-2xl border border-slate-800"></div>)}
            </div>
        )}
        
        {!loading && filteredJobs.length === 0 && (
              <div className="text-center py-24 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-white mb-2">No Jobs Found</h3>
                  <p className="text-slate-500 text-lg">Try searching for a different location or title.</p>
                  <button onClick={() => {setSearchQuery(""); setLocationFilter("All");}} className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold underline">Clear all filters</button>
              </div>
        )}

        {/* JOB GRID */}
        {!loading && filteredJobs.length > 0 && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentJobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        applied={isJobApplied(job._id)}
                        onApply={() => handleApply(job)}
                        onClick={() => setSelectedJob(job)} 
                    />
                ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-5 py-2.5 text-sm font-medium rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white shadow-sm">Previous</button>
                        <div className="flex items-center gap-1 px-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button key={number} onClick={() => handlePageChange(number)} className={`w-10 h-10 flex items-center justify-center text-sm rounded-xl transition-all ${currentPage === number ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/50" : "text-slate-500 hover:bg-slate-800 hover:text-white"}`}>{number}</button>
                            ))}
                        </div>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-5 py-2.5 text-sm font-medium rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white shadow-sm">Next</button>
                    </div>
                )}
            </>
        )}
      </div>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={(j) => { handleApply(j); }} applied={isJobApplied(selectedJob._id)} />
      )}
    </div>
  );
}

export default Jobs;