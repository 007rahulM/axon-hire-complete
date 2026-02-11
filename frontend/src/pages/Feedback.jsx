// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const SparklesIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
//     <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
//   </svg>
// );

// function Feedback() {
//   const [formData, setFormData] = useState({ category: "General", message: "", rating: "5" });
//   const [status, setStatus] = useState("idle"); // idle, sending, success
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("sending");
//     try {
//       await axiosInstance.post("/users/feedback", formData);
//       setStatus("success");
//       setTimeout(() => navigate("/"), 3000); // Redirect after showing success
//     } catch (err) {
//         console.error("Feedback submission error:", err);
//       alert("Failed to send. Please try again.");
//       setStatus("idle");
//     }
//   };

//   if (status === "success") {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
//         <div className="text-center animate-bounce">
//           <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
//             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">Awesome!</h2>
//           <p className="text-slate-400">Your feedback helps us build the future of hiring.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#020617] pt-[140px] p-6 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      
//       <div className="max-w-2xl mx-auto relative z-10">
//         <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
//           <div className="flex items-center gap-3 mb-6">
//             <SparklesIcon />
//             <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">User Experience</span>
//           </div>
          
//           <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Help us improve <span className="text-indigo-500">Axon</span></h1>
//           <p className="text-slate-400 mb-10 text-lg">We're in beta. Your thoughts directly influence our AI engine and interface.</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
//                 <select 
//                   value={formData.category}
//                   onChange={(e) => setFormData({...formData, category: e.target.value})}
//                   className="w-full bg-[#020617] border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
//                 >
//                   <option>General Feedback</option>
//                   <option>Bug Report</option>
//                   <option>Feature Request</option>
//                   <option>AI Accuracy</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Experience Rating</label>
//                 <div className="flex justify-between bg-[#020617] border border-slate-800 p-2 rounded-2xl">
//                   {["1", "2", "3", "4", "5"].map((num) => (
//                     <button
//                       key={num}
//                       type="button"
//                       onClick={() => setFormData({...formData, rating: num})}
//                       className={`w-10 h-10 rounded-xl font-bold transition-all ${formData.rating === num ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-500 hover:text-white"}`}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Your Message</label>
//               <textarea 
//                 required
//                 value={formData.message}
//                 onChange={(e) => setFormData({...formData, message: e.target.value})}
//                 className="w-full bg-[#020617] border border-slate-800 text-white p-4 rounded-2xl h-40 outline-none focus:border-indigo-500 transition-all resize-none"
//                 placeholder="What's on your mind?"
//               />
//             </div>

//             <button 
//               type="submit"
//               disabled={status === "sending"}
//               className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
//             >
//               {status === "sending" ? "Transmitting..." : "Send Feedback to Admin"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feedback;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import useDebounce from "../hooks/useDebounce";

// --- CONFIG ---
const JOBS_PER_PAGE = 12;

// --- DESIGN THEME SELECTOR ---
const THEMES = {
  DEFAULT: 'default',
  BRUTALIST: 'brutalist',
  GLASS: 'glass',
  CYBER: 'cyber'
};

// --- ICONS (Universal) ---
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="2" x2="12" y2="4"></line><line x1="8" y1="2" x2="8" y2="4"></line><line x1="16" y1="2" x2="16" y2="4"></line></svg>);
const MapPinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const MoneyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const InfoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={filled ? "text-rose-500" : "text-slate-400"}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);
const GridIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
const ListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
const BellIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>);
const ArrowIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>);
const SparkleIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
const ZapIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const PaletteIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>);

// --- JOB CARD COMPONENTS (Theme-specific) ---
function JobCardDefault({ job, onApply, applied, isSaved, onToggleSave, onClick }) {
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
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors line-clamp-1">{job.title}</h3>
                <p className="text-sm text-slate-400 font-medium mt-1">{job.company}</p>
             </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onToggleSave(job._id); }} className="p-2 rounded-full hover:bg-slate-800 transition-colors z-10" title={isSaved ? "Remove from Saved" : "Save Job"}>
            <HeartIcon filled={isSaved} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700"><MapPinIcon /> {job.location || "Remote"}</span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/20 text-emerald-400 text-xs font-medium border border-emerald-800/30"><MoneyIcon /> {job.salary || "Not Disclosed"}</span>
        </div>
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {job.requirements && job.requirements.length > 0 ? (
                    job.requirements.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">{skill}</span>
                    ))
                ) : <span className="text-xs text-slate-500 italic flex items-center gap-1"><InfoIcon /> No skills listed</span>}
                {job.requirements && job.requirements.length > 3 && <span className="px-2 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-500 border border-slate-700">+{job.requirements.length - 3}</span>}
            </div>
        </div>
        <div className="mb-6 flex-grow">
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
              {job.description || <span className="italic opacity-50">No description provided.</span>}
          </p>
        </div>
        <div className="mt-auto pt-5 border-t border-slate-700/50">
          <button onClick={(e) => { e.stopPropagation(); if(!applied) onApply(); }} disabled={applied} className={`w-full py-3 px-4 font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${applied ? "bg-slate-800/50 text-slate-500 cursor-default border border-slate-700" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-900/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"}`}>
            {applied ? <><CheckIcon /> Applied</> : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function JobCardBrutalist({ job, onApply, applied, onClick }) {
  return (
    <div onClick={onClick} className="group border-2 border-black hover:border-blue-600 bg-white p-6 cursor-pointer transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="w-12 h-12 border-2 border-black bg-blue-600 flex items-center justify-center mb-4">
        <span className="text-2xl font-black text-white">{job.company?.[0] || 'C'}</span>
      </div>
      <h3 className="text-xl font-black text-black mb-1 leading-tight group-hover:text-blue-600 transition-colors">{job.title}</h3>
      <p className="text-sm font-bold text-gray-600 mb-4">{job.company}</p>
      <div className="flex flex-wrap gap-3 mb-4 text-xs font-bold text-gray-600">
        <span className="flex items-center gap-1"><MapPinIcon />{job.location || "Remote"}</span>
        <span className="flex items-center gap-1"><MoneyIcon />{job.salary || "Competitive"}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {job.requirements?.slice(0, 3).map((skill, i) => (
          <span key={i} className="px-2 py-1 border border-black text-xs font-bold bg-gray-100">{skill}</span>
        ))}
      </div>
      <button onClick={(e) => { e.stopPropagation(); if (!applied) onApply(); }} disabled={applied} className={`w-full py-3 px-4 font-black text-sm border-2 border-black transition-all flex items-center justify-center gap-2 ${applied ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-blue-600 hover:border-blue-600 hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}`}>
        {applied ? <><CheckIcon /> APPLIED</> : <> APPLY NOW <ArrowIcon /></>}
      </button>
    </div>
  );
}

function JobCardGlass({ job, onApply, applied, onClick }) {
  return (
    <div onClick={onClick} className="group relative cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:translate-y-[-4px]">
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <SparkleIcon />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
          <BuildingIcon />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{job.title}</h3>
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">{job.company}</p>
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-6">
          <span className="flex items-center gap-1 px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm"><MapPinIcon />{job.location || "Remote"}</span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full font-semibold">${job.salary || "Competitive"}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {job.requirements?.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold border border-purple-500/20">{skill}</span>
          ))}
        </div>
        <button onClick={(e) => { e.stopPropagation(); if (!applied) onApply(); }} disabled={applied} className={`w-full py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg ${applied ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02]"}`}>
          {applied ? "✓ Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

function JobCardCyber({ job, onApply, applied, onClick }) {
  return (
    <div onClick={onClick} className="group relative cursor-pointer">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-75 blur transition-opacity duration-500" />
      <div className="relative bg-gray-900 border border-cyan-500/30 rounded-lg p-6 transition-all duration-300 hover:border-cyan-500">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Active</span>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
          <BuildingIcon />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{job.title}</h3>
        <p className="text-sm font-semibold text-gray-400 mb-4 font-mono">{job.company}</p>
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-4" />
        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4 font-mono">
          <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded">📍 {job.location || "Remote"}</span>
          <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">💰 {job.salary || "Competitive"}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {job.requirements?.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded text-xs font-mono font-semibold hover:bg-cyan-500/20 transition-colors">{skill}</span>
          ))}
        </div>
        <button onClick={(e) => { e.stopPropagation(); if (!applied) onApply(); }} disabled={applied} className={`w-full py-3 px-4 rounded font-bold text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${applied ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700" : "bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.02]"}`}>
          {applied ? "✓ Applied" : <><ZapIcon /> Apply Now</>}
        </button>
      </div>
    </div>
  );
}

// --- SKELETON LOADER ---
const JobSkeleton = () => (
  <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl animate-pulse flex flex-col h-[280px]">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-slate-800 rounded-lg"></div>
      <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
    </div>
    <div className="h-6 w-3/4 bg-slate-800 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-slate-800 rounded mb-6"></div>
    <div className="flex gap-2 mb-auto">
        <div className="h-6 w-16 bg-slate-800 rounded-full"></div>
        <div className="h-6 w-16 bg-slate-800 rounded-full"></div>
    </div>
    <div className="h-10 w-full bg-slate-800 rounded-xl mt-4"></div>
  </div>
);

// --- JOB ALERT COMPONENT ---
function JobAlert() {
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('idle');
    const [msg, setMsg] = useState('');
  
    const handleSubscribe = async (e) => {
      e.preventDefault();
      if(!keyword.trim()) return;
      setStatus('loading');
      setMsg('');
      try {
        await axiosInstance.post('/alerts/subscribe', { keywords: [keyword] });
        setStatus('success');
        setMsg(`Success! You will be emailed when "${keyword}" jobs are posted.`);
        setKeyword('');
        setTimeout(() => { setStatus('idle'); setMsg(''); }, 4000);
      } catch (err) {
        console.error("Alert Error:", err);
        setStatus('error');
        setMsg(err.response?.status === 401 ? "Please login to subscribe." : "Failed to subscribe. Try again.");
      } 
    };
  
    return (
      <div className="mb-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border border-indigo-500/30 p-1 shadow-lg shadow-indigo-500/10">
          <div className="bg-slate-900/50 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 animate-pulse">
                      <BellIcon />
                  </div>
                  <div>
                      <h3 className="text-white font-bold text-lg">Get Instant Job Alerts</h3>
                      <p className="text-slate-400 text-sm">Don't miss out. Get notified via email for new roles.</p>
                  </div>
              </div>
              <form onSubmit={handleSubscribe} className="flex-1 w-full md:w-auto md:max-w-md flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                      <input type="text" placeholder="Skill (e.g. React, Python)" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <button type="submit" disabled={status === 'loading' || status === 'success'} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${status === 'success' ? 'bg-emerald-600 text-white shadow-emerald-900/50 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50 hover:-translate-y-0.5'}`}>
                      {status === 'loading' ? 'Saving...' : status === 'success' ? 'Subscribed!' : 'Notify Me'}
                  </button>
              </form>
          </div>
          {(msg) && (
              <div className={`text-center py-2 text-xs font-bold rounded-b-xl ${status === 'success' ? 'text-emerald-400 bg-emerald-900/20' : 'text-rose-400 bg-rose-900/20'}`}>
                  {msg}
              </div>
          )}
      </div>
    );
}

// --- JOB DETAILS MODAL ---
function JobModal({ job, onClose, onApply, applied, isSaved, onToggleSave }) {
  if (!job) return null;
  const hasDescription = job.description && job.description.trim().length > 0;
  const hasRequirements = job.requirements && job.requirements.length > 0;

  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company} | Axon Hire</title>
      </Helmet>
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
          <div className="p-6 border-t border-slate-800 bg-slate-900 flex gap-4">
            <button onClick={() => onToggleSave(job._id)} className={`p-4 rounded-xl border transition-colors ${isSaved ? "bg-rose-500/10 border-rose-500/30 text-rose-500" : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`} title="Save Job">
                <HeartIcon filled={isSaved} />
            </button>
            <button onClick={() => !applied && onApply(job)} disabled={applied} className={`flex-1 py-4 px-6 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${applied ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 hover:-translate-y-1"}`}>
              {applied ? <> <CheckIcon /> Application Submitted </> : "Apply for this Position"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// --- MAIN JOBS PAGE ---
function Jobs() {
  const { user, isLoggedIn } = useAuth();
  const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [savedJobIds, setSavedJobIds] = useState(new Set()); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [locationFilter, setLocationFilter] = useState("All"); 
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [theme, setTheme] = useState(THEMES.DEFAULT); // Theme state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobResponse = await axiosInstance.get("/jobs");
        setJobList(jobResponse.data);
        setFilteredJobs(jobResponse.data);

        if (isLoggedIn) {
          try {
            const appsResponse = await axiosInstance.get("/applications/my-applications");
            const appIds = new Set(appsResponse.data.map(app => app.jobId?._id || app.jobId));
            setAppliedJobIds(appIds);

            const savedResponse = await axiosInstance.get("/users/saved-jobs");
            const saveIds = new Set(savedResponse.data.map(job => job._id));
            setSavedJobIds(saveIds);
          } catch (err) {
            console.error("Sync failed", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
      const query = debouncedSearch.toLowerCase();
      const results = jobList.filter(job => {
          const matchesSearch = 
              job.title.toLowerCase().includes(query) || 
              job.company.toLowerCase().includes(query) ||
              job.location.toLowerCase().includes(query); 
          const matchesLocation = locationFilter === "All" ? true : locationFilter === "Remote" ? job.location.toLowerCase().includes("remote") : !job.location.toLowerCase().includes("remote");
          return matchesSearch && matchesLocation;
      });
      setFilteredJobs(results);
      setCurrentPage(1);
  }, [debouncedSearch, locationFilter, jobList]);

  const toggleSave = async (jobId) => {
    if (!isLoggedIn) {
        alert("Please login to save jobs.");
        return;
    }
    try {
        const newSet = new Set(savedJobIds);
        if (newSet.has(jobId)) {
            newSet.delete(jobId);
        } else {
            newSet.add(jobId);
        }
        setSavedJobIds(newSet);
        await axiosInstance.put(`/users/save/${jobId}`);
    } catch (err) {
        console.error("Failed to toggle save:", err);
        alert("Action failed");
    }
  };

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
      setAppliedJobIds(prev => new Set(prev).add(job._id));
      alert("Application Successful!");
    } catch (err) {
      console.error("Application failed:", err);
      if (err.response?.status === 400) {
         setAppliedJobIds(prev => new Set(prev).add(job._id));
         alert("You have already applied.");
      } else {
         alert(err.response?.data?.message || "Application failed");
      }
    }
  };

  // Theme-specific container classes
  const getContainerClass = () => {
    switch(theme) {
      case THEMES.BRUTALIST:
        return "min-h-screen bg-white pt-24 pb-16 px-6";
      case THEMES.GLASS:
        return "min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 pt-24 pb-16 px-6 relative overflow-hidden";
      case THEMES.CYBER:
        return "min-h-screen bg-black pt-24 pb-16 px-6 relative overflow-hidden";
      default:
        return "min-h-screen pt-24 pb-12 px-4 md:px-8 bg-slate-950 text-slate-200";
    }
  };

  // Render appropriate card component
  const renderJobCard = (job) => {
    const props = {
      key: job._id,
      job,
      applied: appliedJobIds.has(job._id),
      isSaved: savedJobIds.has(job._id),
      onApply: () => handleApply(job),
      onToggleSave: toggleSave,
      onClick: () => setSelectedJob(job)
    };

    switch(theme) {
      case THEMES.BRUTALIST:
        return <JobCardBrutalist {...props} />;
      case THEMES.GLASS:
        return <JobCardGlass {...props} />;
      case THEMES.CYBER:
        return <JobCardCyber {...props} />;
      default:
        return <JobCardDefault {...props} />;
    }
  };

  return (
    <div className={getContainerClass()}>
      <Helmet>
        <title>Open Positions | Axon Hire</title>
      </Helmet>

      {/* Glass theme background orbs */}
      {theme === THEMES.GLASS && (
        <>
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </>
      )}

      {/* Cyber theme background */}
      {theme === THEMES.CYBER && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* THEME SWITCHER */}
        <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700">
            <PaletteIcon />
            <span className="text-xs font-bold text-white">Theme</span>
          </div>
          <button onClick={() => setTheme(THEMES.DEFAULT)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${theme === THEMES.DEFAULT ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Default</button>
          <button onClick={() => setTheme(THEMES.BRUTALIST)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${theme === THEMES.BRUTALIST ? 'bg-black text-white border-2 border-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Brutalist</button>
          <button onClick={() => setTheme(THEMES.GLASS)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${theme === THEMES.GLASS ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Glass</button>
          <button onClick={() => setTheme(THEMES.CYBER)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${theme === THEMES.CYBER ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>Cyber</button>
        </div>

        {/* HEADER & SEARCH */}
        <div className="mb-10 flex flex-col gap-6 border-b border-slate-800 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className={`text-4xl font-bold mb-2 tracking-tight ${theme === THEMES.BRUTALIST ? 'text-black' : theme === THEMES.CYBER ? 'text-white font-mono' : 'text-white'}`}>
                      {theme === THEMES.CYBER ? '<> OPEN_POSITIONS' : 'Open Positions'}
                    </h2>
                    <p className={`text-lg ${theme === THEMES.BRUTALIST ? 'text-gray-600 font-bold' : theme === THEMES.CYBER ? 'text-gray-400 font-mono' : 'text-slate-400'}`}>
                      {theme === THEMES.CYBER && '// '}Find your next role at top companies.
                    </p>
                </div>
                {!loading && (
                    <div className={`px-5 py-2 rounded-full border shadow-sm ${theme === THEMES.BRUTALIST ? 'bg-white border-black' : theme === THEMES.CYBER ? 'bg-gray-900 border-cyan-500/30 font-mono' : 'bg-slate-900 border-slate-800'}`}>
                        <span className={`font-bold ${theme === THEMES.BRUTALIST ? 'text-black' : 'text-white'}`}>{filteredJobs.length}</span>
                        <span className={`ml-1 ${theme === THEMES.BRUTALIST ? 'text-gray-600 font-bold' : theme === THEMES.CYBER ? 'text-gray-400' : 'text-slate-400'}`}>jobs found</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-[#0f172a] p-4 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-3.5 text-slate-500"><SearchIcon /></div>
                    <input type="text" placeholder="Search by Title, Company, or City..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-slate-500" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-400 px-2 font-bold text-sm uppercase tracking-wide"><FilterIcon /> Filter:</div>
                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
                        <option value="All">All Types</option>
                        <option value="Remote">Remote Only</option>
                        <option value="On-site">On-site</option>
                    </select>
                    <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 ml-2">
                        <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}><GridIcon /></button>
                        <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}><ListIcon /></button>
                    </div>
                </div>
            </div>
        </div>

        {theme === THEMES.DEFAULT && <JobAlert />}

        {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => <JobSkeleton key={i} />)}
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

        {!loading && filteredJobs.length > 0 && (
            <>
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentJobs.map(renderJobCard)}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {currentJobs.map((job) => (
                            <div key={job._id} onClick={() => setSelectedJob(job)} className="flex items-center justify-between bg-[#0f172a] border border-slate-800 p-5 rounded-xl hover:bg-slate-800/50 hover:border-indigo-500/30 cursor-pointer transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 border border-slate-700 group-hover:text-indigo-400">
                                        <BuildingIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                                        <p className="text-sm text-slate-400">{job.company} • {job.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="hidden md:block text-sm font-medium text-emerald-400 bg-emerald-900/10 px-3 py-1 rounded border border-emerald-900/30">{job.salary || "Competitive"}</span>
                                    <button onClick={(e) => { e.stopPropagation(); toggleSave(job._id); }} className="p-2 text-slate-500 hover:text-rose-500 hover:bg-slate-900 rounded-full transition-colors">
                                        <HeartIcon filled={savedJobIds.has(job._id)} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

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
        <JobModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
            onApply={(j) => { handleApply(j); }} 
            applied={appliedJobIds.has(selectedJob._id)}
            isSaved={savedJobIds.has(selectedJob._id)}
            onToggleSave={toggleSave}
        />
      )}
    </div>
  );
}

export default Jobs;