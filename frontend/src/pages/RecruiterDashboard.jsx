import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

// --- ICONS ---
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
const EyeOffIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>);

function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [applications, setApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analyzingId, setAnalyzingId] = useState(null);
  const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
  const [currentModalApp, setCurrentModalApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filters
  const [filterJob, setFilterJob] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterScore, setFilterScore] = useState("All");
  const [filterDate, setFilterDate] = useState("All");

  const API_BASE_URL = import.meta.env.MODE === "production" ? "https://axon-hire.onrender.com" : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          if (activeTab === "candidates") {
              const res = await axiosInstance.get("/applications/recruiter");
              setApplications(Array.isArray(res.data) ? res.data : []);
          } else {
              const res = await axiosInstance.get("/jobs/my-jobs");
              setMyJobs(Array.isArray(res.data) ? res.data : []);
          }
      } catch (err) {
          console.error("Load failed", err);
          setError("Failed to load data.");
      } finally {
          setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]); 

  // --- HELPERS ---
  const getLatestAnalysis = (app) => {
    if (app.aiAnalysis && Array.isArray(app.aiAnalysis) && app.aiAnalysis.length > 0) return app.aiAnalysis[0];
    if (app.aiAnalysis && app.aiAnalysis.matchScore) return app.aiAnalysis;
    return null;
  };

  const getUniqueJobTitles = () => {
    const titles = applications.map(app => app.jobId?.title).filter(Boolean);
    return [...new Set(titles)];
  };

  const getFilteredApplications = () => {
    return applications.filter(app => {
        if (filterJob !== "All" && app.jobId?.title !== filterJob) return false;
        if (filterStatus !== "All" && app.status !== filterStatus) return false;
        
        const analysis = getLatestAnalysis(app);
        const score = analysis?.matchScore || 0;
        if (filterScore === "High" && score < 70) return false;
        if (filterScore === "Medium" && score < 50) return false;
        if (filterScore === "Low" && score >= 50) return false;
        if (filterScore === "Unscored" && analysis) return false;

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

  // --- ACTIONS ---
  
  // 1. Toggle Job Status (Close/Open)
  const handleToggleJob = async (jobId) => {
      try {
          const res = await axiosInstance.patch(`/jobs/${jobId}/toggle`);
          // Update local state instantly
          setMyJobs(prev => prev.map(job => 
              job._id === jobId ? { ...job, isOpen: res.data.job.isOpen } : job
          ));
      } catch (err) {
          console.error("Toggle failed", err);
          alert("Failed to update job status");
      }
  };

  // 2. Hard Delete (Cascading)
  const handleDeleteJob = async (jobId) => {
      if (!confirm("⚠️ DANGER: This will permanently delete the job AND ALL associated applications.\n\nTo keep the data but stop hiring, click 'Cancel' and use the 'Close Job' button instead.")) return;
      
      try {
          await axiosInstance.delete(`/jobs/${jobId}`);
          setMyJobs(prev => prev.filter(job => job._id !== jobId));
      } catch (err) {
          console.error("Delete failed", err);
          alert("Failed to delete job.");
      }
  };

  const handleStatusChange = async (appId, newStatus) => {
    setApplications((prev) => prev.map((app) => app._id === appId ? { ...app, status: newStatus } : app));
    try {
        await axiosInstance.patch(`/applications/${appId}/status`, { status: newStatus });
    } catch (err) { console.error(err); }
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'Shortlisted': return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
          case 'Rejected': return "text-red-400 bg-red-500/10 border-red-500/20";
          case 'Viewed': return "text-blue-400 bg-blue-500/10 border-blue-500/20";
          default: return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      }
  };

  const performAnalysis = async (app, force = false) => {
    const latest = getLatestAnalysis(app);
    if (!force && latest) return latest;
    if (!app.resumeUrl || !app.jobId?._id) return null;

    try {
      const resumeUrl = app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`;
      const res = await axiosInstance.post("/ai/analyze-resume", {
        resumeUrl: resumeUrl, jobId: app.jobId._id, applicationId: app._id 
      });

      if (res.data.success) {
        const newAnalysis = res.data.analysis;
        setApplications((prev) => prev.map((item) => {
            if (item._id === app._id) {
               const oldHistory = Array.isArray(item.aiAnalysis) ? item.aiAnalysis : [];
               const safeHistory = (!Array.isArray(item.aiAnalysis) && item.aiAnalysis) ? [item.aiAnalysis] : oldHistory;
               return { ...item, aiAnalysis: [newAnalysis, ...safeHistory] };
            }
            return item;
        }));
        return newAnalysis; 
      }
    } catch (err) { console.error(err); return null; }
  };

  const handleAnalyzeAll = async () => {
    let filteredApps = getFilteredApplications();
    let targets = filteredApps.filter((app) => !getLatestAnalysis(app));
    let forceMode = false;

    if (targets.length === 0) {
        if (!confirm("Re-analyze visible candidates?")) return;
        targets = filteredApps; forceMode = true;       
    } else {
        if (!confirm(`Analyze ${targets.length} candidates?`)) return;
    }

    setIsAnalyzingAll(true);
    for (const app of targets) {
      await performAnalysis(app, forceMode);
      await new Promise((r) => setTimeout(r, 5000)); 
    }
    setIsAnalyzingAll(false);
    alert("Batch Analysis Complete!");
  };

  const openDetails = (app) => { setCurrentModalApp(app); setShowModal(true); };
  
  const handleReanalyzeFromModal = async () => {
    if (!currentModalApp) return;
    setAnalyzingId(currentModalApp._id);
    const newData = await performAnalysis(currentModalApp, true);
    if (newData) {
        setCurrentModalApp(prev => {
            const oldHistory = Array.isArray(prev.aiAnalysis) ? prev.aiAnalysis : [];
            const safeHistory = (!Array.isArray(prev.aiAnalysis) && prev.aiAnalysis) ? [prev.aiAnalysis] : oldHistory;
            return { ...prev, aiAnalysis: [newData, ...safeHistory] };
        });
    }
    setAnalyzingId(null);
  };

  const handleIndividualAnalyze = async (app) => {
      setAnalyzingId(app._id);
      await performAnalysis(app, true);
      setAnalyzingId(null);
  };

  const currentAnalysis = currentModalApp ? getLatestAnalysis(currentModalApp) : null;
  const filteredApps = getFilteredApplications();
  const uniqueJobTitles = getUniqueJobTitles();

  const ApplicantCardMobile = ({ app }) => {
      const latest = getLatestAnalysis(app);
      return (
          <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 mb-4 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700"><UserIcon /></div>
                      <div>
                          <div className="font-bold text-white text-sm">{app.applicantId?.name || "Unknown"}</div>
                          <div className="text-xs text-slate-500">{app.applicantId?.email}</div>
                      </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium bg-slate-900 px-2 py-1 rounded border border-slate-800">{app.jobId?.title || "Deleted Job"}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                  <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)} className={`text-xs font-bold uppercase tracking-wide border px-2 py-2 rounded-lg outline-none w-full ${getStatusColor(app.status)}`}>
                      <option value="Submitted" className="bg-slate-900">Submitted</option>
                      <option value="Viewed" className="bg-slate-900">Viewed</option>
                      <option value="Shortlisted" className="bg-slate-900">Shortlisted</option>
                      <option value="Rejected" className="bg-slate-900">Rejected</option>
                  </select>
                  {latest && latest.matchScore != null ? (
                      <button onClick={() => openDetails(app)} className={`w-full justify-center px-2 py-2 rounded-lg font-bold text-xs border flex items-center gap-1 ${latest.matchScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : latest.matchScore >= 50 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                          <span className={`w-2 h-2 rounded-full ${latest.matchScore >= 80 ? "bg-emerald-500" : latest.matchScore >= 50 ? "bg-yellow-500" : "bg-red-500"}`}></span>
                          {latest.matchScore}% Match
                      </button>
                  ) : (
                      <button onClick={() => handleIndividualAnalyze(app)} disabled={analyzingId === app._id || isAnalyzingAll} className="w-full justify-center px-2 py-2 rounded-lg text-xs font-bold bg-slate-800 text-white border border-slate-700">
                          {analyzingId === app._id ? "..." : "Analyze"}
                      </button>
                  )}
              </div>
              {app.resumeUrl ? (
                  <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" className="block text-center w-full py-2 bg-slate-900 rounded-lg text-xs font-bold text-slate-400 border border-slate-800 hover:text-white hover:border-slate-600 transition-colors">
                      View Resume PDF
                  </a>
              ) : <div className="text-center text-xs text-slate-600 italic py-2">No Resume</div>}
          </div>
      );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#020617] text-slate-200 relative pt-[100px] md:pt-[140px]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & TABS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4 border-b border-slate-800 pb-2">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Recruiter Dashboard</h2>
            <div className="flex gap-6 overflow-x-auto pb-1">
                <button onClick={() => setActiveTab("candidates")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "candidates" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Applicants</button>
                <button onClick={() => setActiveTab("jobs")} className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${activeTab === "jobs" ? "text-indigo-400 border-indigo-500" : "text-slate-500 border-transparent"}`}>Posted Jobs</button>
            </div>
          </div>
          
          {activeTab === "candidates" && (
            <div className="w-full md:w-auto mb-2 md:mb-4">
                <button onClick={handleAnalyzeAll} disabled={isAnalyzingAll || loading || filteredApps.length === 0} className={`w-full md:w-auto px-5 py-2 rounded-lg font-bold shadow-lg flex justify-center items-center gap-2 text-sm border transition-all ${isAnalyzingAll ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-transparent"}`}>
                {isAnalyzingAll ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <SparklesIcon />}
                {isAnalyzingAll ? "Processing..." : "Batch AI Analyze"}
                </button>
            </div>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && <div className="text-center py-20 text-slate-500">Loading data...</div>}
        {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6 text-sm">{error}</div>}

        {/* === TAB 1: CANDIDATES === */}
        {!loading && activeTab === "candidates" && (
            <>
                <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl mb-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                        <FilterIcon /> Filters:
                    </div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                        <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto col-span-2 md:col-span-1">
                            <option value="All">All Jobs</option>
                            {uniqueJobTitles.map((title, index) => <option key={index} value={title}>{title}</option>)}
                        </select>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                            <option value="All">All Status</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Viewed">Viewed</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto">
                            <option value="All">All Scores</option>
                            <option value="High">Top Match</option>
                            <option value="Medium">Mid Match</option>
                            <option value="Unscored">Not Scored</option>
                        </select>
                        <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-slate-900 border border-slate-700 text-white text-xs md:text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 w-full md:w-auto col-span-2 md:col-span-1">
                            <option value="All">Any Date</option>
                            <option value="Today">Today</option>
                            <option value="Week">This Week</option>
                        </select>
                    </div>
                </div>

                {filteredApps.length === 0 ? (
                    <div className="p-16 rounded-2xl bg-[#0f172a] border border-slate-800 text-center border-dashed">
                        <h3 className="text-xl font-bold text-white">No Applicants Found</h3>
                        <p className="text-slate-400 mt-1 text-sm">Adjust filters to see more.</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl border border-slate-800 bg-[#0f172a]">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider font-semibold">
                                <th className="p-6">Candidate</th>
                                <th className="p-6">Role</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Resume</th>
                                <th className="p-6">AI Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filteredApps.map((app) => {
                                const latest = getLatestAnalysis(app);
                                return (
                                <tr key={app._id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700"><UserIcon /></div>
                                            <div><div className="font-bold text-white text-sm">{app.applicantId?.name || "Unknown"}</div><div className="text-xs text-slate-500">{app.applicantId?.email}</div></div>
                                        </div>
                                    </td>
                                    <td className="p-6"><span className="text-slate-300 font-medium text-sm">{app.jobId?.title || "Deleted Job"}</span></td>
                                    <td className="p-6">
                                        <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)} className={`bg-transparent text-xs font-bold uppercase tracking-wide border px-3 py-1.5 rounded-lg outline-none cursor-pointer ${getStatusColor(app.status)}`}>
                                            <option value="Submitted" className="bg-slate-900 text-yellow-400">Submitted</option>
                                            <option value="Viewed" className="bg-slate-900 text-blue-400">Viewed</option>
                                            <option value="Shortlisted" className="bg-slate-900 text-emerald-400">Shortlisted</option>
                                            <option value="Rejected" className="bg-slate-900 text-red-400">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="p-6">
                                    {app.resumeUrl ? (
                                        <a href={app.resumeUrl.startsWith("http") ? app.resumeUrl : `${API_BASE_URL}${app.resumeUrl}`} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white text-sm flex items-center gap-2"><FileIcon /> PDF</a>
                                    ) : <span className="text-slate-600 text-sm">Missing</span>}
                                    </td>
                                    <td className="p-6">
                                    {latest && latest.matchScore != null ? (
                                        <button onClick={() => openDetails(app)} className={`px-4 py-1.5 rounded-full font-bold text-xs border flex items-center gap-2 ${latest.matchScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : latest.matchScore >= 50 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                                        <span className={`w-2 h-2 rounded-full ${latest.matchScore >= 80 ? "bg-emerald-500" : latest.matchScore >= 50 ? "bg-yellow-500" : "bg-red-500"}`}></span> {latest.matchScore}%
                                        </button>
                                    ) : (
                                        <button onClick={() => handleIndividualAnalyze(app)} disabled={analyzingId === app._id || isAnalyzingAll} className="px-4 py-2 rounded-lg text-xs font-bold border bg-slate-800 text-white border-slate-700">
                                        {analyzingId === app._id ? "..." : "Analyze"}
                                        </button>
                                    )}
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                            </table>
                        </div>
                        <div className="md:hidden">
                            {filteredApps.map((app) => <ApplicantCardMobile key={app._id} app={app} />)}
                        </div>
                    </>
                )}
            </>
        )}

        {/* === TAB 2: POSTED JOBS (UPDATED with Close/Delete) === */}
        {!loading && activeTab === "jobs" && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {myJobs.length === 0 ? (
                    <div className="col-span-full p-16 rounded-2xl bg-[#0f172a] border border-slate-800 text-center border-dashed">
                        <h3 className="text-xl font-bold text-white">No Jobs Posted</h3>
                    </div>
                ) : (
                    myJobs.map(job => (
                        <div key={job._id} className={`bg-[#0f172a] border p-6 rounded-2xl transition-all group ${job.isOpen ? "border-slate-800 hover:border-indigo-500/50" : "border-slate-800 opacity-60 hover:opacity-100"}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl border ${job.isOpen ? "bg-slate-900 border-slate-700 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}>
                                    <BriefcaseIcon />
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleToggleJob(job._id)}
                                        className={`p-2 rounded-lg transition-colors border ${job.isOpen ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20" : "text-slate-400 border-slate-700 bg-slate-800 hover:text-white"}`}
                                        title={job.isOpen ? "Close Job (Stop applications)" : "Re-open Job"}
                                    >
                                        {job.isOpen ? <EyeIcon /> : <EyeOffIcon />}
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteJob(job._id)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                                        title="Delete Permanently"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <p className="text-xs text-slate-400 uppercase tracking-wide font-bold">{job.company}</p>
                                {!job.isOpen && <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-bold uppercase">Closed</span>}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                <span>Applicants:</span>
                                <span className="font-bold text-white bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">{job.applicantCount || 0}</span>
                            </div>
                            
                            <div className="mt-4 text-xs text-slate-500 text-right">
                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

      </div>

      {/* --- REPORT MODAL --- */}
      {showModal && currentModalApp && currentAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full my-8">
            <div className="bg-[#020617] p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-white">{currentModalApp.applicantId?.name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Role: <span className="text-indigo-400">{currentModalApp.jobId?.title}</span></p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-2xl text-slate-500 hover:text-white">&times;</button>
            </div>

            <div className="p-6 md:p-8 space-y-8 bg-[#0f172a] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-500 font-bold uppercase">Match Score</p>
                        <p className={`text-4xl font-black ${currentAnalysis.matchScore >= 80 ? "text-emerald-400" : "text-yellow-400"}`}>{currentAnalysis.matchScore}%</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-500 font-bold uppercase">Relevance</p>
                        <p className="text-xl font-bold text-white mt-1">{currentAnalysis.experienceRelevance || "N/A"}</p>
                    </div>
                </div>
                <div className="bg-indigo-900/10 p-5 rounded-xl border border-indigo-500/20">
                    <h4 className="text-indigo-400 font-bold text-xs uppercase mb-2">AI Summary</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{currentAnalysis.summary}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2">Matched Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentAnalysis.matchedSkills?.map((s, i) => <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">{s}</span>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-2">Missing Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {currentAnalysis.missingRequiredSkills?.map((s, i) => <span key={i} className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">{s}</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#020617] border-t border-slate-800 flex justify-between items-center sticky bottom-0">
                <button onClick={handleReanalyzeFromModal} disabled={analyzingId === currentModalApp._id} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold">
                    {analyzingId === currentModalApp._id ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <RefreshIcon />} Re-analyze
                </button>
                <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold border border-slate-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;