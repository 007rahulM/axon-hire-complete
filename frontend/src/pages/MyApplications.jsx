import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce"; // 👈 IMPORT

// --- ICONS ---
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);

const StatusIcon = ({ status }) => {
  if (status === "Shortlisted") return <span className="text-emerald-400">🎉</span>;
  if (status === "Rejected") return <span className="text-red-400">❌</span>;
  if (status === "Viewed") return <span className="text-blue-400">👀</span>;
  if (status === "Interviewing") return <span className="text-purple-400">🎤</span>;
  if (status === "Hired") return <span className="text-cyan-400">🤝</span>;
  return <span className="text-yellow-400">⏳</span>; 
};

// --- HELPER: Get correct file URL ---
const getFileUrl = (path) => {
  if (!path) return "#";
  if (path.startsWith("http")) return path;
  const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";
  return `${API_BASE_URL}${path}`;
};

// --- SKELETON LOADER ---
const AppSkeleton = () => (
    <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl animate-pulse flex flex-col md:flex-row justify-between items-center gap-4 h-[100px]">
        <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
            <div className="flex-1">
                <div className="h-4 w-1/3 bg-slate-800 rounded mb-2"></div>
                <div className="h-3 w-1/4 bg-slate-800 rounded"></div>
            </div>
        </div>
        <div className="h-8 w-24 bg-slate-800 rounded-lg"></div>
    </div>
);

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300); // 👈 DEBOUNCED

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

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

  // --- ⚡ FILTERING LOGIC ---
  const filteredApps = applications.filter((app) => {
    // Use debouncedSearch instead of searchQuery
    const query = debouncedSearch.toLowerCase();
    
    const titleMatch = app.jobId?.title?.toLowerCase().includes(query);
    const companyMatch = app.jobId?.company?.toLowerCase().includes(query);
    const statusMatch = statusFilter === "All" || app.status === statusFilter;

    return (titleMatch || companyMatch) && statusMatch;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Viewed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Interviewing": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Hired": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-[#020617] text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">My Applications</h2>
          <p className="text-slate-400 text-sm mt-1">Track the status of your job submissions</p>
        </div>

        {/* --- CONTROLS (SEARCH & FILTER) --- */}
        <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><SearchIcon /></div>
                <input 
                    type="text" 
                    placeholder="Search by Job Title or Company..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none placeholder-slate-500"
                />
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FilterIcon /> Status:</span>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#020617] border border-slate-700 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 cursor-pointer w-full md:w-auto"
                >
                    <option value="All">All Applications</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Viewed">Viewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
        </div>

        {loading ? (
          <div className="grid gap-4">
              {[1, 2, 3, 4].map((i) => <AppSkeleton key={i} />)}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-24 bg-[#0f172a] rounded-2xl border border-slate-800 border-dashed">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
            <h3 className="text-xl font-bold text-white mb-2">No Applications Found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your filters or apply for new jobs.</p>
            <Link to="/jobs" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredApps.map((app) => (
              <div 
                key={app._id} 
                onClick={() => setSelectedApp(app)}
                className="bg-[#0f172a] p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-indigo-500/10"
              >
                {/* Job Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <BuildingIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {app.jobId?.title || "Deleted Job"}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium">
                      {app.jobId?.company} • <span className="text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 ${getStatusStyle(app.status)}`}>
                  <StatusIcon status={app.status} />
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- APPLICATION DETAILS MODAL --- */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full my-8 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-start sticky top-0 z-10 rounded-t-2xl">
              <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                    <BuildingIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                        {selectedApp.jobId?.title || "Unknown Role"}
                    </h3>
                    <div className="flex items-center gap-2 text-indigo-400 font-medium mt-1">
                        {selectedApp.jobId?.company}
                    </div>
                  </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
                
                {/* Status Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Current Status</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold ${getStatusStyle(selectedApp.status)}`}>
                            <StatusIcon status={selectedApp.status} /> {selectedApp.status}
                        </div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Applied On</p>
                        <div className="flex items-center gap-2 text-slate-300 font-medium">
                            <CalendarIcon /> {new Date(selectedApp.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Resume Section */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Submitted Resume</p>
                            <p className="text-slate-300 text-sm">Review the document you sent for this application.</p>
                        </div>
                        <a 
                            href={getFileUrl(selectedApp.resumeUrl)} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                        >
                            <FileIcon /> View PDF
                        </a>
                    </div>
                </div>

                {/* Job Details Section */}
                <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Job Description
                    </h4>
                    <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                        {selectedApp.jobId?.description || "No description available for this role."}
                    </div>
                </div>

                {/* Metadata */}
                {selectedApp.jobId?.location && (
                    <div className="flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPinIcon /> {selectedApp.jobId.location}</span>
                        {selectedApp.jobId.salary && <span>• {selectedApp.jobId.salary}</span>}
                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-end sticky bottom-0 rounded-b-2xl">
                <button onClick={() => setSelectedApp(null)} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm transition-colors border border-slate-700">
                    Close Details
                </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default MyApplications;