
// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal";

// const BriefcaseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
// );

// // 🚀 Icon for the new section
// const BrainIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//   </svg>
// );

// function PostJob() {
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");
//   const [requirements, setRequirements] = useState("");
//   const [deadline, setDeadline] = useState("");

//   // 🚀 NEW STATE: V3 Intelligence Controls 
//   const [autoEvaluate, setAutoEvaluate] = useState(false);
//   const [evaluationMode, setEvaluationMode] = useState("local");

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   if (user && user.role !== "admin" && user.role !== "recruiter") {
//     return <RecruiterOnboardingModal onClose={() => {}} />; 
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const reqArray = requirements.split(",").map((s) => s.trim()).filter(s => s);

//    // PostJob.jsx
// const jobData = { 
//   title, 
//   company, 
//   location, 
//   salary, 
//   description, 
//   requirements: reqArray,
//   deadline,
//   autoEvaluate,    // Ensure this is 'autoEvaluate', not 'atsEnabled'
//   evaluationMode   // Ensure this is 'evaluationMode'
// };

//     try {
//       await axiosInstance.post("/jobs", jobData);
//       alert("Job Posted Successfully!");
//       navigate("/jobs");
//     } catch (err) {
//       console.error("Failed to post job", err);
//       alert("Error: " + (err.response?.data?.message || "Could not post job"));
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-[#020617] text-slate-200">
//       <div className="w-full max-w-3xl p-8 md:p-10 rounded-2xl shadow-2xl bg-[#0f172a] border border-slate-800 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

//         <div className="text-center mb-10">
//           <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 text-indigo-400">
//              <BriefcaseIcon />
//           </div>
//           <h2 className="text-3xl font-bold text-white tracking-tight">Post a New Job</h2>
//           <p className="text-slate-400 mt-2 text-sm">Create a listing and let our system process the best candidates.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* ... Existing Title, Company, Location, Salary Inputs ... */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Job Title</label>
//               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
//             </div>
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Company Name</label>
//               <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Location</label>
//               <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
//             </div>
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Salary Range</label>
//               <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
//             </div>
//           </div>

//           {/* 🚀 NEW: AXON V3 INTELLIGENCE SETTINGS  */}
//           <div className="p-6 rounded-2xl bg-[#1e293b]/30 border border-slate-700 space-y-4">
//             <div className="flex items-center gap-2 text-indigo-400 mb-2">
//                 <BrainIcon />
//                 <h3 className="text-sm font-bold uppercase tracking-widest">Axon V3 Intelligence Settings</h3>
//             </div>

//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm font-bold text-white">Auto-Evaluate on Apply</p>
//                 <p className="text-xs text-slate-500">Automatically score candidates when they submit their resume.</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input type="checkbox" checked={autoEvaluate} onChange={(e) => setAutoEvaluate(e.target.checked)} className="sr-only peer" />
//                 <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
//               </label>
//             </div>

//             {autoEvaluate && (
//               <div className="pt-4 border-t border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
//                 <div>
//                   <p className="text-sm font-bold text-white">Evaluation Mode</p>
//                   <p className="text-xs text-slate-500">Choose between fast Local math or deep AI context.</p>
//                 </div>
//                 <select 
//                   value={evaluationMode} 
//                   onChange={(e) => setEvaluationMode(e.target.value)}
//                   className="bg-[#020617] border border-slate-700 text-xs rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
//                 >
//                   <option value="local">Standard (Local Math)</option>
//                   <option value="ai">AI Fact Extractor</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* ... Rest of existing inputs (Deadline, Skills, Description) ... */}
//           <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Auto-Hide Job On (Optional)</label>
//               <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none" />
//           </div>

//           <div>
//             <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Required Skills (Comma Separated)</label>
//             <input type="text" placeholder="React, Node.js, AWS" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none" />
//           </div>

//           <div>
//             <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Job Description</label>
//             <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none resize-y"></textarea>
//           </div>

//           <button type="submit" disabled={isSubmitting} className={`w-full py-4 font-bold text-lg text-white rounded-xl shadow-xl transition-all ${isSubmitting ? "bg-slate-800" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}>
//             {isSubmitting ? "Publishing..." : "Post Job Now"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostJob;

//new one //


























// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal";

// // ── SAME ICONS as original ──
// const BriefcaseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
//     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
//   </svg>
// );

// const BrainIcon = () => (
//   <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//   </svg>
// );

// function PostJob() {
//   // ── SAME STATE as original — every variable, exact same names ──
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");
//   const [requirements, setRequirements] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [autoEvaluate, setAutoEvaluate] = useState(false);
//   const [evaluationMode, setEvaluationMode] = useState("local");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // ── SAME role check as original ──
//   if (user && user.role !== "admin" && user.role !== "recruiter") {
//     return <RecruiterOnboardingModal onClose={() => {}} />;
//   }

//   // ── SAME handleSubmit as original — zero changes ──
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     const reqArray = requirements.split(",").map((s) => s.trim()).filter(s => s);

//     const jobData = {
//       title,
//       company,
//       location,
//       salary,
//       description,
//       requirements: reqArray,
//       deadline,
//       autoEvaluate,
//       evaluationMode,
//     };

//     try {
//       await axiosInstance.post("/jobs", jobData);
//       alert("Job Posted Successfully!");
//       navigate("/jobs");
//     } catch (err) {
//       console.error("Failed to post job", err);
//       alert("Error: " + (err.response?.data?.message || "Could not post job"));
//       setIsSubmitting(false);
//     }
//   };

//   // ── Shared style helpers using CSS variables from index.css ──
//   const inp = {
//     width: "100%",
//     padding: "9px 12px",
//     background: "var(--bg-subtle)",
//     color: "var(--text-1)",
//     border: "1px solid var(--border-strong)",
//     borderRadius: "6px",
//     fontFamily: "Inter, sans-serif",
//     fontSize: "13px",
//     outline: "none",
//     transition: "border-color 0.15s",
//     boxSizing: "border-box",
//   };

//   const lbl = {
//     fontSize: "11px",
//     fontWeight: 600,
//     color: "var(--text-3)",
//     textTransform: "uppercase",
//     letterSpacing: "0.06em",
//     marginBottom: "5px",
//     display: "block",
//   };

//   const field = { display: "flex", flexDirection: "column", gap: "4px" };
//   const focus = (e) => (e.target.style.borderColor = "var(--accent)");
//   const blur  = (e) => (e.target.style.borderColor = "var(--border-strong)");

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "var(--bg-page)",
//       padding: "80px 24px 48px",
//     }}>
//       <div style={{ maxWidth: "680px", margin: "0 auto" }}>

//         {/* ── Page header ── */}
//         <div style={{ marginBottom: "28px" }}>
//           <div style={{
//             display: "inline-flex", alignItems: "center", gap: "5px",
//             background: "var(--accent-bg)", border: "1px solid var(--accent-mid)",
//             color: "var(--accent)", padding: "3px 10px", borderRadius: "3px",
//             fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em",
//             textTransform: "uppercase", marginBottom: "12px",
//           }}>
//             <span style={{ width: "5px", height: "5px", background: "var(--accent)", borderRadius: "50%" }} />
//             New Listing
//           </div>
//           <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-1)", marginBottom: "5px" }}>
//             Post a New Job
//           </h1>
//           <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
//             Create a listing and let our AI system process the best candidates automatically.
//           </p>
//         </div>

//         {/* ── Form card ── */}
//         <form onSubmit={handleSubmit}>
//           <div style={{
//             background: "var(--bg-surface)",
//             border: "1px solid var(--border)",
//             borderRadius: "12px",
//             padding: "28px",
//             boxShadow: "var(--shadow)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//           }}>

//             {/* Row 1: Title + Company */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//               <div style={field}>
//                 <label style={lbl}>Job Title *</label>
//                 <input
//                   type="text" required value={title}
//                   onChange={e => setTitle(e.target.value)}
//                   placeholder="e.g. Frontend Engineer"
//                   style={inp} onFocus={focus} onBlur={blur}
//                 />
//               </div>
//               <div style={field}>
//                 <label style={lbl}>Company Name *</label>
//                 <input
//                   type="text" required value={company}
//                   onChange={e => setCompany(e.target.value)}
//                   placeholder="e.g. Acme Corp"
//                   style={inp} onFocus={focus} onBlur={blur}
//                 />
//               </div>
//             </div>

//             {/* Row 2: Location + Salary */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//               <div style={field}>
//                 <label style={lbl}>Location *</label>
//                 <input
//                   type="text" required value={location}
//                   onChange={e => setLocation(e.target.value)}
//                   placeholder="e.g. Bengaluru / Remote"
//                   style={inp} onFocus={focus} onBlur={blur}
//                 />
//               </div>
//               <div style={field}>
//                 <label style={lbl}>Salary Range *</label>
//                 <input
//                   type="text" required value={salary}
//                   onChange={e => setSalary(e.target.value)}
//                   placeholder="e.g. ₹8–12 LPA"
//                   style={inp} onFocus={focus} onBlur={blur}
//                 />
//               </div>
//             </div>

//             {/* ── AXON V3 INTELLIGENCE SETTINGS — same logic, restyled ── */}
//             <div style={{
//               background: "var(--accent-bg)",
//               border: "1px solid var(--accent-mid)",
//               borderRadius: "10px",
//               padding: "18px 20px",
//             }}>
//               {/* Section label */}
//               <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
//                 <span style={{ color: "var(--accent)" }}><BrainIcon /></span>
//                 <span style={{
//                   fontSize: "11px", fontWeight: 700,
//                   color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em",
//                 }}>
//                   Axon V3 Intelligence Settings
//                 </span>
//               </div>

//               {/* Auto-evaluate toggle row */}
//               <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
//                 <div>
//                   <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>
//                     Auto-Evaluate on Apply
//                   </p>
//                   <p style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: 1.5 }}>
//                     Automatically score candidates when they submit their resume.
//                   </p>
//                 </div>
//                 {/* Custom toggle — same onChange as original */}
//                 <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
//                   <input
//                     type="checkbox"
//                     checked={autoEvaluate}
//                     onChange={e => setAutoEvaluate(e.target.checked)}
//                     style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
//                   />
//                   <div style={{
//                     width: "42px", height: "24px", borderRadius: "12px",
//                     background: autoEvaluate ? "var(--accent)" : "var(--border-strong)",
//                     position: "relative", transition: "background 0.2s",
//                   }}>
//                     <div style={{
//                       position: "absolute", top: "3px",
//                       left: autoEvaluate ? "21px" : "3px",
//                       width: "18px", height: "18px", borderRadius: "50%",
//                       background: "white", transition: "left 0.2s",
//                       boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
//                     }} />
//                   </div>
//                 </label>
//               </div>

//               {/* Evaluation Mode — only visible when autoEvaluate is ON, same as original */}
//               {autoEvaluate && (
//                 <div style={{
//                   marginTop: "16px", paddingTop: "16px",
//                   borderTop: "1px solid var(--accent-mid)",
//                   display: "flex", alignItems: "flex-start",
//                   justifyContent: "space-between", gap: "16px",
//                   animation: "ax-fadein 0.2s ease",
//                 }}>
//                   <div>
//                     <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>
//                       Evaluation Mode
//                     </p>
//                     <p style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: 1.5 }}>
//                       Choose between fast Local math or deep AI context analysis.
//                     </p>
//                   </div>
//                   <select
//                     value={evaluationMode}
//                     onChange={e => setEvaluationMode(e.target.value)}
//                     style={{
//                       padding: "7px 12px",
//                       background: "var(--bg-subtle)",
//                       color: "var(--text-1)",
//                       border: "1px solid var(--border-strong)",
//                       borderRadius: "6px",
//                       fontFamily: "Inter, sans-serif",
//                       fontSize: "12px",
//                       outline: "none",
//                       cursor: "pointer",
//                       flexShrink: 0,
//                     }}
//                     onFocus={focus} onBlur={blur}
//                   >
//                     <option value="local">Standard (Local Math)</option>
//                     <option value="ai">AI Fact Extractor</option>
//                   </select>
//                 </div>
//               )}
//             </div>

//             {/* Deadline */}
//             <div style={field}>
//               <label style={lbl}>Auto-Hide Job On (Optional)</label>
//               <input
//                 type="date" value={deadline}
//                 onChange={e => setDeadline(e.target.value)}
//                 style={inp} onFocus={focus} onBlur={blur}
//               />
//             </div>

//             {/* Required Skills */}
//             <div style={field}>
//               <label style={lbl}>Required Skills (Comma Separated)</label>
//               <input
//                 type="text" value={requirements}
//                 onChange={e => setRequirements(e.target.value)}
//                 placeholder="React, Node.js, AWS"
//                 style={inp} onFocus={focus} onBlur={blur}
//               />
//               <span style={{ fontSize: "11px", color: "var(--text-3)" }}>
//                 Separate each skill with a comma
//               </span>
//             </div>

//             {/* Divider */}
//             <div style={{ height: "1px", background: "var(--border)" }} />

//             {/* Full Job Description */}
//             <div style={field}>
//               <label style={lbl}>Full Job Description *</label>
//               <textarea
//                 required rows={6} value={description}
//                 onChange={e => setDescription(e.target.value)}
//                 placeholder="Describe the role, team, and what the candidate will be working on…"
//                 style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}
//                 onFocus={focus} onBlur={blur}
//               />
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               style={{
//                 width: "100%", padding: "11px",
//                 borderRadius: "6px",
//                 background: isSubmitting ? "var(--bg-subtle)" : "var(--accent)",
//                 color: isSubmitting ? "var(--text-3)" : "white",
//                 border: "none",
//                 fontFamily: "Inter, sans-serif",
//                 fontSize: "13px", fontWeight: 600,
//                 cursor: isSubmitting ? "not-allowed" : "pointer",
//                 transition: "all 0.15s",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
//               }}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span style={{
//                     width: "13px", height: "13px",
//                     border: "2px solid var(--text-3)", borderTopColor: "transparent",
//                     borderRadius: "50%", animation: "ax-spin 0.7s linear infinite",
//                     display: "inline-block",
//                   }} />
//                   Publishing…
//                 </>
//               ) : (
//                 <>
//                   <BriefcaseIcon />
//                   Post Job Now
//                 </>
//               )}
//             </button>

//           </div>
//         </form>

//         <p style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "var(--text-3)" }}>
//           Jobs go live immediately. AI evaluation begins as soon as the first candidate applies.
//         </p>
//       </div>

//       <style>{`
//         @keyframes ax-spin { to { transform: rotate(360deg); } }
//         @keyframes ax-fadein {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @media (max-width: 540px) {
//           .postjob-row { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default PostJob;



import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal";

// ── ICONS ──
const SparkIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12Z"/></svg>;
const XIcon      = () => <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CheckIcon  = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowIcon  = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const BriefIcon  = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const MapIcon    = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const CoinsIcon  = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>;
const CalIcon    = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const DocIcon    = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;

function PostJob() {
  // ── ALL STATE — exact same as original ──
  const [title, setTitle]               = useState("");
  const [company, setCompany]           = useState("");
  const [location, setLocation]         = useState("");
  const [salary, setSalary]             = useState("");
  const [description, setDescription]   = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline]         = useState("");
  const [autoEvaluate, setAutoEvaluate] = useState(false);
  const [evaluationMode, setEvaluationMode] = useState("local");
  const [isSubmitting, setIsSubmitting] = useState(false);
// Add this state near the other useState declarations
const [type, setType] = useState("Full-time");
  // extra UX state
  const [activeField, setActiveField]   = useState(null);
  const [skillInput, setSkillInput]     = useState("");
  const [skillTags, setSkillTags]       = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ── SAME guard as original — untouched ──
  if (user && user.role !== "admin" && user.role !== "recruiter") {
    return <RecruiterOnboardingModal onClose={() => {}} />;
  }

  // ── SAME submit logic — untouched ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    // support both tag UI + raw comma text
    const tagReqs = skillTags.length > 0 ? skillTags : requirements.split(",").map(s => s.trim()).filter(Boolean);
    const jobData = {
      title, company, location, salary, description,
      requirements: tagReqs, deadline,
      type,
      autoEvaluate, evaluationMode,
    };
    try {
      await axiosInstance.post("/jobs", jobData);
      alert("Job Posted Successfully!");
      navigate("/jobs");
    } catch (err) {
      console.error("Failed to post job", err);
      alert("Error: " + (err.response?.data?.message || "Could not post job"));
      setIsSubmitting(false);
    }
  };

  // skill tag helpers
  const addSkill = (raw) => {
    const parts = raw.split(",").map(s => s.trim()).filter(Boolean);
    parts.forEach(p => {
      if (p && !skillTags.includes(p)) setSkillTags(prev => [...prev, p]);
    });
    setSkillInput("");
    setRequirements(prev => {
      const all = [...skillTags, ...parts].join(", ");
      return all;
    });
  };
  const removeSkill = (s) => {
    const next = skillTags.filter(t => t !== s);
    setSkillTags(next);
    setRequirements(next.join(", "));
  };
  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (skillInput.trim()) addSkill(skillInput);
    }
    if (e.key === "Backspace" && !skillInput && skillTags.length > 0) {
      removeSkill(skillTags[skillTags.length - 1]);
    }
  };

  // sync legacy requirements string with tags when user pastes
  const handleSkillChange = (e) => {
    const val = e.target.value;
    setSkillInput(val);
    if (val.includes(",")) addSkill(val);
  };

  const progress = [title, company, location, salary, description].filter(Boolean).length;
  const progressPct = Math.round((progress / 5) * 100);

  const isFocused = (field) => activeField === field;

  const fieldStyle = (field) => ({
    width: "100%", padding: "10px 14px",
    background: "var(--bg-page)", color: "var(--text-1)",
    border: `1.5px solid ${isFocused(field) ? "var(--accent)" : "var(--border-strong)"}`,
    borderRadius: "8px", fontFamily: "Inter, sans-serif", fontSize: "13px",
    outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
    boxShadow: isFocused(field) ? "0 0 0 3px var(--accent-bg)" : "none",
  });

  const sectionStyle = {
    background: "var(--bg-surface)", border: "1px solid var(--border)",
    borderRadius: "14px", overflow: "hidden",
  };

  const sectionHead = (label, icon, accent) => (
    <div style={{
      padding: "14px 20px", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", gap: "8px",
      background: accent ? `${accent}08` : "var(--bg-subtle)",
    }}>
      <span style={{ color: accent || "var(--text-3)" }}>{icon}</span>
      <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: accent || "var(--text-3)" }}>{label}</span>
    </div>
  );

  const labelStyle = { fontSize: "12px", fontWeight: 600, color: "var(--text-2)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "5px" };
  const reqBadge = <span style={{ fontSize: "9px", padding: "1px 5px", borderRadius: "3px", background: "rgba(239,68,68,.1)", color: "#ef4444", fontWeight: 700 }}>required</span>;

  const SUGGESTIONS = ["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB", "PostgreSQL", "Docker", "GraphQL", "Next.js", "Vue.js", "Redis", "Kubernetes", "Golang", "Java"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <style>{`
        @keyframes pj-spin { to { transform: rotate(360deg); } }
        @keyframes pj-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .pj-tag:hover .pj-tag-x { opacity: 1 !important; }
        .pj-sug:hover { background: var(--accent-bg) !important; color: var(--accent) !important; border-color: var(--accent-mid) !important; }
        .pj-mode:hover { border-color: var(--accent) !important; }
        .pj-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,87,184,.3); }
        .pj-sub-btn { transition: all 0.15s; }
        textarea { resize: vertical; }
      `}</style>

      {/* ── STICKY HEADER ── */}
      <div style={{
        position: "sticky", top: "54px", zIndex: 40,
        background: "var(--bg-surface)", borderBottom: "1px solid var(--border)",
        padding: "0 28px",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.015em" }}>Post a Job</h1>
            <p style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "1px" }}>
              {title ? `"${title}"` : "Fill in the details to find the right candidate"}
            </p>
          </div>

          {/* Progress pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ width: "120px", height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: progressPct === 100 ? "#10b981" : "var(--accent)", borderRadius: "2px", transition: "width 0.3s" }}/>
            </div>
            <span style={{ fontSize: "11px", fontWeight: 600, color: progressPct === 100 ? "#10b981" : "var(--text-3)", whiteSpace: "nowrap" }}>
              {progressPct}% complete
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "28px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* ════ SECTION 1: BASICS ════ */}
          <div style={sectionStyle}>
            {sectionHead("Job Details", <BriefIcon/>, "var(--accent)")}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Title + Company */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Job title {reqBadge}</label>
                  <input
                    value={title} onChange={e => setTitle(e.target.value)} required
                    placeholder="e.g. Senior React Developer"
                    style={fieldStyle("title")}
                    onFocus={() => setActiveField("title")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company name {reqBadge}</label>
                  <input
                    value={company} onChange={e => setCompany(e.target.value)} required
                    placeholder="e.g. Axon Tech Inc."
                    style={fieldStyle("company")}
                    onFocus={() => setActiveField("company")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
              </div>

              {/* Location + Salary + Deadline */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}><MapIcon/> Location {reqBadge}</label>
                  <input
                    value={location} onChange={e => setLocation(e.target.value)} required
                    placeholder="Bangalore or Remote"
                    style={fieldStyle("location")}
                    onFocus={() => setActiveField("location")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
                <div>
                  <label style={labelStyle}><CoinsIcon/> Salary range {reqBadge}</label>
                  <input
                    value={salary} onChange={e => setSalary(e.target.value)} required
                    placeholder="₹8–14 LPA"
                    style={fieldStyle("salary")}
                    onFocus={() => setActiveField("salary")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
                 {/* type dropdown */}
  <div>
    <label style={labelStyle}>Employment type</label>
    <select
      value={type}
      onChange={e => setType(e.target.value)}
      style={{
        ...fieldStyle("type"),
        cursor: "pointer",
        background: "var(--bg-page)",
        color: "var(--text-1)",
      }}
    >
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Remote">Remote (Remote role)</option>
      <option value="Freelance">Freelance</option>
    </select>
  </div>

                <div>
                  <label style={labelStyle}><CalIcon/> Auto-close date</label>
                  <input
                    type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                    style={{ ...fieldStyle("deadline"), colorScheme: "dark" }}
                    onFocus={() => setActiveField("deadline")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ════ SECTION 2: SKILLS ════ */}
          <div style={sectionStyle}>
            {sectionHead("Required Skills", <SparkIcon/>, "#a855f7")}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>

              {/* Tag input */}
              <div>
                <label style={labelStyle}>Skills <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--text-3)" }}>— type and press Enter or comma to add</span></label>
                <div style={{
                  minHeight: "46px", padding: "6px 10px",
                  background: "var(--bg-page)", borderRadius: "8px",
                  border: `1.5px solid ${isFocused("skills") ? "var(--accent)" : "var(--border-strong)"}`,
                  display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center",
                  boxShadow: isFocused("skills") ? "0 0 0 3px var(--accent-bg)" : "none",
                  transition: "all 0.15s", cursor: "text",
                }}>
                  {skillTags.map(s => (
                    <span key={s} className="pj-tag" style={{
                      display: "inline-flex", alignItems: "center", gap: "4px",
                      padding: "3px 8px", borderRadius: "4px",
                      background: "var(--accent-bg)", color: "var(--accent)",
                      border: "1px solid var(--accent-mid)",
                      fontSize: "11px", fontWeight: 600, animation: "pj-in 0.15s ease-out",
                    }}>
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}
                        className="pj-tag-x"
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", opacity: 0, transition: "opacity 0.1s", padding: "0", display: "flex" }}>
                        <XIcon/>
                      </button>
                    </span>
                  ))}
                  <input
                    value={skillInput}
                    onChange={handleSkillChange}
                    onKeyDown={handleSkillKey}
                    onFocus={() => setActiveField("skills")}
                    onBlur={() => { setActiveField(null); if (skillInput.trim()) addSkill(skillInput); }}
                    placeholder={skillTags.length === 0 ? "React, Node.js, AWS…" : ""}
                    style={{ border: "none", outline: "none", background: "transparent", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "var(--text-1)", minWidth: "120px", flex: 1 }}
                  />
                </div>
              </div>

              {/* Suggestion pills */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>Quick add</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {SUGGESTIONS.filter(s => !skillTags.includes(s)).map(s => (
                    <button key={s} type="button" className="pj-sug"
                      onClick={() => { setSkillTags(prev => [...prev, s]); setRequirements(prev => [...skillTags, s].join(", ")); }}
                      style={{ padding: "3px 9px", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-2)", fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.15s" }}>
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live preview */}
              {skillTags.length > 0 && (
                <div style={{ padding: "10px 14px", borderRadius: "7px", background: "var(--bg-subtle)", border: "1px solid var(--border)", fontSize: "12px", color: "var(--text-3)" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-2)" }}>{skillTags.length} skill{skillTags.length !== 1 ? "s" : ""}</span> added — AI will use these to score applicants
                </div>
              )}
            </div>
          </div>

          {/* ════ SECTION 3: DESCRIPTION ════ */}
          <div style={sectionStyle}>
            {sectionHead("Job Description", <DocIcon/>)}
            <div style={{ padding: "20px" }}>
              <label style={labelStyle}>Full description {reqBadge}</label>
              <textarea
                required rows={10}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={`Describe the role in detail. Great descriptions include:\n\n• What you'll be building day-to-day\n• Team size and how you work\n• Tech stack in depth\n• Growth opportunities\n• What makes this role exciting`}
                style={{
                  ...fieldStyle("desc"),
                  lineHeight: 1.7, padding: "12px 14px",
                  boxShadow: isFocused("desc") ? "0 0 0 3px var(--accent-bg)" : "none",
                }}
                onFocus={() => setActiveField("desc")}
                onBlur={() => setActiveField(null)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", color: description.length > 800 ? "#10b981" : "var(--text-3)" }}>
                  {description.length} chars {description.length > 800 && <span style={{ color: "#10b981" }}>✓ great detail</span>}
                </span>
              </div>
            </div>
          </div>

          {/* ════ SECTION 4: AI ════ */}
          <div style={{
            ...sectionStyle,
            border: autoEvaluate ? "1px solid var(--accent-mid)" : "1px solid var(--border)",
            transition: "border-color 0.2s",
          }}>
            {sectionHead("Axon AI Scoring", <SparkIcon/>, "var(--accent)")}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Toggle row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", marginBottom: "4px" }}>Auto-evaluate applicants</div>
                  <div style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: 1.55 }}>
                    Score every resume automatically when someone applies. Saves hours of manual screening.
                  </div>
                </div>
                {/* Toggle */}
                <div
                  onClick={() => setAutoEvaluate(!autoEvaluate)}
                  style={{
                    width: "46px", height: "26px", borderRadius: "13px", flexShrink: 0,
                    background: autoEvaluate ? "var(--accent)" : "var(--border-strong)",
                    position: "relative", cursor: "pointer", transition: "background 0.2s",
                    boxShadow: autoEvaluate ? "0 0 0 3px var(--accent-bg)" : "none",
                  }}
                >
                  <div style={{
                    position: "absolute", top: "4px",
                    left: autoEvaluate ? "22px" : "4px",
                    width: "18px", height: "18px", borderRadius: "50%",
                    background: "white", transition: "left 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {autoEvaluate && <CheckIcon/>}
                  </div>
                </div>
              </div>

              {/* Mode selector — only when on */}
              {autoEvaluate && (
                <div style={{ animation: "pj-in 0.2s ease-out" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-2)", marginBottom: "8px" }}>Evaluation mode</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    {[
                      { value: "local",    label: "Standard",    desc: "Fast keyword matching. Works offline, zero cost.", badge: "Fast" },
                      { value: "ai",       label: "AI Context",  desc: "Deep understanding of experience and fit.", badge: "Smart" },
                      { value: "auto",     label: "Auto",        desc: "Tries AI first, falls back to Standard.", badge: "Best" },
                    ].map(opt => (
                      <button key={opt.value} type="button" className="pj-mode"
                        onClick={() => setEvaluationMode(opt.value)}
                        style={{
                          padding: "14px", borderRadius: "8px", cursor: "pointer", textAlign: "left",
                          border: `1.5px solid ${evaluationMode === opt.value ? "var(--accent)" : "var(--border)"}`,
                          background: evaluationMode === opt.value ? "var(--accent-bg)" : "var(--bg-page)",
                          fontFamily: "Inter, sans-serif", transition: "all 0.15s", position: "relative",
                        }}>
                        {evaluationMode === opt.value && (
                          <div style={{ position: "absolute", top: "8px", right: "8px", width: "16px", height: "16px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CheckIcon/>
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: evaluationMode === opt.value ? "var(--accent)" : "var(--text-1)" }}>{opt.label}</span>
                          <span style={{ fontSize: "9px", padding: "1px 5px", borderRadius: "3px", fontWeight: 700, background: evaluationMode === opt.value ? "var(--accent)" : "var(--bg-subtle)", color: evaluationMode === opt.value ? "white" : "var(--text-3)" }}>{opt.badge}</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-3)", lineHeight: 1.45 }}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Info strip */}
                  <div style={{ marginTop: "10px", padding: "10px 14px", borderRadius: "7px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <SparkIcon/>
                    <span style={{ fontSize: "12px", color: "var(--accent)", lineHeight: 1.5 }}>
                      Axon AI will score applicants out of 100 — Skills (60pts), Experience (30pts), Portfolio (10pts)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ════ PREVIEW CARD (shows when enough is filled) ════ */}
          {title && company && location && (
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px 20px", animation: "pj-in 0.2s ease-out" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "12px" }}>Preview — how candidates will see this</div>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {company.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-1)", marginBottom: "2px" }}>{title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "8px" }}>{company} · {location}{salary && ` · ${salary}`}</div>
                  {skillTags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {skillTags.slice(0, 5).map(s => <span key={s} style={{ padding: "2px 7px", borderRadius: "3px", fontSize: "10px", fontWeight: 600, background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}>{s}</span>)}
                      {skillTags.length > 5 && <span style={{ padding: "2px 7px", fontSize: "10px", color: "var(--text-3)" }}>+{skillTags.length - 5} more</span>}
                    </div>
                  )}
                </div>
                <div style={{ padding: "5px 12px", borderRadius: "4px", background: "var(--accent)", color: "white", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>Apply now</div>
              </div>
            </div>
          )}

          {/* ════ SUBMIT ════ */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", paddingTop: "4px" }}>
            <div style={{ fontSize: "11px", color: "var(--text-3)" }}>
              {progressPct < 100
                ? `${5 - progress} required field${5 - progress !== 1 ? "s" : ""} remaining`
                : <span style={{ color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}><CheckIcon/> All required fields complete</span>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="pj-sub-btn pj-submit"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "11px 28px", borderRadius: "8px", border: "none",
                background: isSubmitting ? "var(--bg-subtle)" : "var(--accent)",
                color: isSubmitting ? "var(--text-3)" : "white",
                fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              {isSubmitting ? (
                <><span style={{ width: "13px", height: "13px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", animation: "pj-spin 0.7s linear infinite", display: "inline-block" }}/> Publishing…</>
              ) : (<>Post job now <ArrowIcon/></>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;