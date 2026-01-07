import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  AreaChart, Area, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
// ✅ IMPORT MOTION CORRECTLY
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "../hooks/useDebounce";

// --- ICONS ---
// Add this to the Icons section in AdminDashboard.jsx 
const SparklesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
);
const EditIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>);
const TrashIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const JobIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const UserIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const AppIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const RefreshIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>);

const COLORS = ['#6366f1', '#10b981', '#f43f5e'];

// Variants for Framer Motion
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0 });
  const [data, setData] = useState({ users: [], jobs: [], applications: [] });
  const [loading, setLoading] = useState(true);
  
  // Controls
  const [searchQuery, setSearchQuery] = useState("");
  // ⚡ Debounce the search query to prevent lag
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [editingUser, setEditingUser] = useState(null);

  // New Filters
  const [roleFilter, setRoleFilter] = useState("All");
  const [jobStatusFilter, setJobStatusFilter] = useState("All");
  const [appStatusFilter, setAppStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);




  useEffect(() => { fetchData(); }, []);

  // Add these functions inside your AdminDashboard component
const handleApproveSkill = async (skillId) => {
  try {
    // Call the new admin route to approve the skill [cite: 355]
    const res = await axiosInstance.patch(`/admin/skills/${skillId}/approve`);
    
    if (res.data.success) {
      // Update local data to reflect approval [cite: 356]
      setData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s._id === skillId ? { ...s, isApproved: true } : s)
      }));
      alert("Brain Synchronized: Skill approved and cache refreshed.");
    }
  } catch (err) {
    console.error("Approval failed", err);
    alert("Failed to sync skill map.");
  }
};

const fetchData = async () => {
  try {
    setLoading(true);
    // Use individual await or catch blocks to prevent one error from breaking everything
    const [statsRes, usersRes, jobsRes, appsRes, skillsRes] = await Promise.allSettled([
      axiosInstance.get("/admin/stats"),
      axiosInstance.get("/admin/users"),
      axiosInstance.get("/admin/jobs"),
      axiosInstance.get("/admin/applications"),
      axiosInstance.get("/admin/skills")
    ]);

    // Only set data if the specific request succeeded
    if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
    setData({
      users: usersRes.status === 'fulfilled' ? usersRes.value.data : [],
      jobs: jobsRes.status === 'fulfilled' ? jobsRes.value.data : [],
      applications: appsRes.status === 'fulfilled' ? appsRes.value.data : [],
      skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data : []
    });
  } catch (err) {
    console.error("Fetch failed", err);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (type, id) => {
    if (!window.confirm("⚠️ DANGER: Confirm deletion.")) return;
    try {
      await axiosInstance.delete(`/admin/${type}/${id}`);
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item._id !== id) }));
    } catch (err) { alert("Delete failed"); console.error(err); }
  };

  const handleUpdateRole = async (newRole) => {
    if (!editingUser) return;
    try {
      await axiosInstance.put(`/admin/users/${editingUser._id}/role`, { role: newRole });
      setData(prev => ({ ...prev, users: prev.users.map(u => u._id === editingUser._id ? { ...u, role: newRole } : u) }));
      setEditingUser(null);
    } catch (err) { alert("Role Update Failed"); console.error(err); }
  };

  // --- DYNAMIC FILTERING LOGIC ---
  const getFilteredData = () => {
    const lowerSearch = debouncedSearch.toLowerCase();
    
    if (activeTab === 'users') {
        return data.users.filter(u => {
            const matchesSearch = u.name.toLowerCase().includes(lowerSearch) || u.email.toLowerCase().includes(lowerSearch);
            const matchesRole = roleFilter === "All" || u.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }
    if (activeTab === 'jobs') {
        return data.jobs.filter(j => {
             const matchesSearch = j.title.toLowerCase().includes(lowerSearch) || j.company.toLowerCase().includes(lowerSearch);
             const isOpen = j.isOpen === true; 
             const matchesStatus = jobStatusFilter === "All" 
                ? true 
                : jobStatusFilter === "Open" ? isOpen 
                : !isOpen; 
             return matchesSearch && matchesStatus;
        });
    }
    if (activeTab === 'applications') {
        return data.applications.filter(a => {
            const matchesSearch = (a.userId?.name || "").toLowerCase().includes(lowerSearch) || 
                                  (a.jobId?.title || "").toLowerCase().includes(lowerSearch);
            const matchesStatus = appStatusFilter === "All" || a.status === appStatusFilter;
            return matchesSearch && matchesStatus;
        });
    }
    // 🟢 ADD THIS: Handle the Skills tab filtering
    if (activeTab === 'skills') {
        return (data.skills || []).filter(s => 
            s.canonical.toLowerCase().includes(lowerSearch) ||
            s.category.toLowerCase().includes(lowerSearch)
        );
    }
    return [];
  };

const filteredData = getFilteredData();

// --- MOVE THE PAGINATION LOGIC HERE ---
const itemsPerPage = 20;
const paginatedData = filteredData.slice(
  (currentPage - 1) * itemsPerPage, 
  currentPage * itemsPerPage
);

  const growthData = [
    { name: 'Jan', users: 4 }, { name: 'Feb', users: 12 }, { name: 'Mar', users: 20 },
    { name: 'Apr', users: 35 }, { name: 'May', users: 48 }, { name: 'Jun', users: stats.totalUsers || 55 },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center font-mono">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-indigo-400 animate-pulse">Initializing Admin Core...</p>
    </div>
  );

  return (
<div className="min-h-screen bg-[#020617] p-4 md:p-12 pt-44 text-white overflow-hidden relative font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">ADMIN <span className="text-indigo-500">NEXUS</span></h1>
            <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest uppercase">System Control v2.0 • Active</p>
          </div>
          <button onClick={fetchData} className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-500/50"><RefreshIcon /></button>
        </div>

        {/* 1. INTERACTIVE STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="indigo" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <StatCard title="Active Jobs" value={stats.totalJobs} icon="💼" color="emerald" isActive={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} />
          <StatCard title="Applications" value={stats.totalApplications} icon="📄" color="rose" isActive={activeTab === 'applications'} onClick={() => setActiveTab('applications')} />
        </div>

        {/* CHARTS (Users Tab Only) */}
        <AnimatePresence mode="wait">
        {activeTab === "users" && (
            <motion.div 
  initial={{ opacity: 0, y: 20 }} // Changed height:0 to y:20
  animate={{ opacity: 1, y: 0 }} 
  exit={{ opacity: 0, y: 20 }} 
  transition={{ duration: 0.4 }}
  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
            <div className="bg-[#0f172a]/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col min-h-[250px]">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">User Acquisition</h3>
                <ResponsiveContainer width="100%" height="100%"><AreaChart data={growthData}><defs><linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} /><Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorU)" /></AreaChart></ResponsiveContainer>
            </div>
            <div className="bg-[#0f172a]/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col min-h-[250px]">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Role Distribution</h3>
                <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: 'Candidates', value: data.users.filter(u => u.role === 'user').length || 1 }, { name: 'Recruiters', value: data.users.filter(u => u.role === 'recruiter').length || 1 }, { name: 'Admins', value: data.users.filter(u => u.role === 'admin').length || 1 }]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">{COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} stroke="rgba(0,0,0,0)" />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} /><Legend /></PieChart></ResponsiveContainer>
            </div>
            </motion.div>
        )}
        </AnimatePresence>

        {/* TABS & FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#1e293b]/50 p-4 rounded-xl border border-slate-700 mt-8 sticky top-24 z-20 backdrop-blur-md shadow-lg">
           <div className="flex gap-2 p-1 bg-slate-900 rounded-lg w-full md:w-auto overflow-x-auto">
              <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<UserIcon />} label="Users" color="indigo" />
              <TabButton active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={<JobIcon />} label="Jobs" color="emerald" />
              <TabButton active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} icon={<AppIcon />} label="Apps" color="rose" />
              <TabButton 
  active={activeTab === 'skills'} 
  onClick={() => setActiveTab('skills')} 
  icon={<SparklesIcon />} // You can reuse your SparklesIcon
  label="Skill Map" 
  color="indigo" 
/>
           </div>

           <div className="flex items-center gap-4 w-full md:w-auto">
               {/* Dynamic Filter Dropdowns */}
               {activeTab === 'users' && (
                   <select 
                       value={roleFilter} 
                       onChange={(e) => setRoleFilter(e.target.value)} 
                       className="bg-[#020617] border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500"
                   >
                       <option value="All">All Roles</option>
                       <option value="user">Candidate</option>
                       <option value="recruiter">Recruiter</option>
                       <option value="admin">Admin</option>
                   </select>
               )}

               {activeTab === 'jobs' && (
                   <select 
                       value={jobStatusFilter} 
                       onChange={(e) => setJobStatusFilter(e.target.value)} 
                       className="bg-[#020617] border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500"
                   >
                       <option value="All">All Status</option>
                       <option value="Open">Open</option>
                       <option value="Closed">Closed</option>
                   </select>
               )}

               {activeTab === 'applications' && (
                   <select 
                       value={appStatusFilter} 
                       onChange={(e) => setAppStatusFilter(e.target.value)} 
                       className="bg-[#020617] border border-slate-700 text-white text-xs rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500"
                   >
                       <option value="All">All Status</option>
                       <option value="Submitted">Submitted</option>
                       <option value="Viewed">Viewed</option>
                       <option value="Shortlisted">Shortlisted</option>
                       <option value="Interviewing">Interviewing</option>
                       <option value="Hired">Hired</option>
                       <option value="Rejected">Rejected</option>
                   </select>
               )}

               <div className="relative w-full md:w-64">
                  <div className="absolute left-3 top-3 text-slate-400"><SearchIcon /></div>
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`} 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full bg-[#020617] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-500" 
                  />
               </div>
           </div>
        </div>

        {/* --- DYNAMIC TABLE --- */}
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl min-h-[400px]">
        <div className="overflow-x-auto">
          {/* ⬇️ PASTE THE PAGINATION CONTROLS EXACTLY HERE ⬇️ */}
<div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <p className="text-xs text-slate-500 font-mono">
Showing {paginatedData.length} of {filteredData.length} {activeTab}
          </p>
          <div className="flex gap-2">
            <button 
  disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1); // ✅ This uses the variable and fixes ESLint
                window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
              className="px-3 py-1 bg-slate-800 rounded border border-slate-700 disabled:opacity-30 text-xs hover:bg-indigo-600 transition-colors"
            >
              Previous
            </button>
            <button 
  disabled={currentPage * itemsPerPage >= filteredData.length}
              onClick={() => {
                setCurrentPage(p => p + 1); // ✅ This uses the variable and fixes ESLint
                window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
              className="px-3 py-1 bg-slate-800 rounded border border-slate-700 disabled:opacity-30 text-xs hover:bg-indigo-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
            <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-900/90 text-slate-400 text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
                {activeTab === 'users' && <tr><th className="p-4">User Identity</th><th className="p-4">Role</th><th className="p-4 text-right">Action</th></tr>}
                {activeTab === 'jobs' && <tr><th className="p-4">Job Title</th><th className="p-4">Posted By</th><th className="p-4">Salary</th><th className="p-4 text-right">Action</th></tr>}
                {activeTab === 'applications' && <tr><th className="p-4">Candidate</th><th className="p-4">Applied For</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr>}
                {/* 🟢 ADD THIS: Skills Header Row */}
    {activeTab === 'skills' && <tr><th className="p-4">Skill Name</th><th className="p-4">Category</th><th className="p-4">Weight</th><th className="p-4 text-right">Action</th></tr>}

            </thead>
            
    <motion.tbody 
  variants={containerVariants} 
  initial="hidden" 
  animate="show" 
  className="divide-y divide-slate-800/50 text-sm"
>
  <AnimatePresence mode="popLayout">
    {/* {filteredData.length > 0 ? filteredData.map((item) => ( */}
     {paginatedData.length > 0 ? paginatedData.map((item) => (
      <motion.tr 
        key={item._id} 
        variants={itemVariants} 
        layout 
        className="hover:bg-slate-800/30 transition-colors"
      >{activeTab === 'skills' && (
        <>
          <td className="p-4 font-bold text-white">{item.canonical}</td>
          <td className="p-4 text-slate-400 text-xs uppercase">{item.category}</td>
          <td className="p-4"><span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 font-mono">x{item.weight}</span></td>
          <td className="p-4 text-right">
            {!item.isApproved && (
              <button onClick={() => handleApproveSkill(item._id)} className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded hover:bg-emerald-500/40 transition-all border border-emerald-500/20 mr-2">Approve</button>
            )}
            <button onClick={() => handleDelete('skills', item._id)} className="p-2 text-slate-500 hover:text-rose-400"><TrashIcon /></button>
          </td>
        </>
      )}{activeTab === 'users' && (
        <>
          <td className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">{item.name?.charAt(0)}</div>
              <div><div className="font-bold text-white">{item.name}</div><div className="text-slate-500 text-xs">{item.email}</div></div>
            </div>
          </td>
          <td className="p-4"><Badge role={item.role} /></td>
          <td className="p-4 text-right flex justify-end gap-2">
            <button onClick={() => setEditingUser(item)} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"><EditIcon /></button>
            <button onClick={() => handleDelete('users', item._id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><TrashIcon /></button>
          </td>
        </>
      )}{activeTab === 'jobs' && (
        <>
          <td className="p-4"><div className="font-bold text-white">{item.title}</div><div className="text-slate-500 text-xs">📍 {item.location}</div></td>
          <td className="p-4"><div className="text-slate-300 bg-slate-800/50 px-2 py-1 rounded inline-block">{item.postedBy?.name || "Unknown"}</div></td>
          <td className="p-4 text-emerald-400 font-mono text-xs font-bold">{item.salary}</td>
          <td className="p-4 text-right"><button onClick={() => handleDelete('jobs', item._id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><TrashIcon /></button></td>
        </>
      )}{activeTab === 'applications' && (
        <>
          <td className="p-4"><div className="font-bold text-white">{item.userId?.name || "Deleted User"}</div><div className="text-slate-500 text-xs">{item.userId?.email}</div></td>
          <td className="p-4"><div className="text-indigo-300 font-medium">{item.jobId?.title || "Deleted Job"}</div><div className="text-slate-500 text-xs">{item.jobId?.company}</div></td>
          <td className="p-4"><StatusBadge status={item.status} /></td>
          <td className="p-4 text-right"><button onClick={() => handleDelete('applications', item._id)} className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><TrashIcon /></button></td>
        </>
      )}</motion.tr>
    )) : (
      <motion.tr><td colSpan="4" className="p-12 text-center text-slate-500 italic">No records found.</td></motion.tr>
    )}
  </AnimatePresence>
</motion.tbody>
            </table>
        </div>
        {/* ⬇️ PASTE THE PAGINATION CONTROLS EXACTLY HERE ⬇️ */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <p className="text-xs text-slate-500 font-mono">
            Showing {paginatedData.length} of {filteredData.length} {activeTab}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => p - 1); // ✅ This uses the variable and fixes ESLint
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1 bg-slate-800 rounded border border-slate-700 disabled:opacity-30 text-xs hover:bg-indigo-600 transition-colors"
            >
              Previous
            </button>
            <button 
              disabled={currentPage * itemsPerPage >= filteredData.length}
              onClick={() => {
                setCurrentPage(p => p + 1); // ✅ This uses the variable and fixes ESLint
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1 bg-slate-800 rounded border border-slate-700 disabled:opacity-30 text-xs hover:bg-indigo-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
        
        </div>

      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
               <h3 className="text-lg font-bold text-white mb-4">Edit Role: <span className="text-indigo-400">{editingUser.name}</span></h3>
               <div className="space-y-2 mb-6">
                  {['user', 'recruiter', 'admin'].map((role) => (
                    <button key={role} onClick={() => handleUpdateRole(role)} className={`w-full p-3 rounded-lg text-left font-bold border transition-all ${editingUser.role === role ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
               </div>
               <button onClick={() => setEditingUser(null)} className="w-full py-3 text-slate-400 hover:text-white text-sm font-bold transition-colors">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBCOMPONENTS ---
function StatCard({ title, value, icon, color, isActive, onClick }) {
  const colorClasses = {
    indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20",
  };
  const activeGlow = isActive ? `ring-1 ring-${color}-400 shadow-[0_0_20px_rgba(var(--${color}-500),0.15)] scale-[1.02]` : 'hover:border-opacity-50';
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick} className={`bg-gradient-to-br ${colorClasses[color]} border p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all duration-300 ${isActive ? 'bg-opacity-30 border-opacity-100' : 'border-opacity-30'} ${activeGlow}`}>
      <div className="flex justify-between items-start mb-4"><div className="p-3 bg-slate-900/50 rounded-xl text-2xl shadow-inner">{icon}</div><span className={`text-xs font-bold px-2 py-1 rounded bg-slate-900/50 border border-white/5 ${colorClasses[color].split(' ')[2]}`}>+12%</span></div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p><p className="text-3xl font-black text-white mt-1">{value || 0}</p>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label, color }) {
    const activeClass = active 
        ? (color === 'indigo' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : color === 'emerald' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-600 text-white shadow-lg shadow-rose-500/20')
        : 'text-slate-400 hover:text-white hover:bg-slate-800';
    return (
        <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${activeClass}`}>
            {icon} {label}
        </button>
    );
}

function Badge({ role }) {
    const styles = {
        admin: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        recruiter: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        user: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    };
    return <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${styles[role] || styles.user}`}>{role}</span>;
}

function StatusBadge({ status }) {
    const styles = {
        accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        hired: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        shortlisted: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    const s = status ? status.toLowerCase() : 'pending';
    return <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${styles[s] || styles.pending}`}>{s}</span>;
}

export default AdminDashboard;