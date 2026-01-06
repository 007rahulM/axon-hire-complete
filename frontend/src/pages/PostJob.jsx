// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal"; // 👈 IMPORT THIS

// // --- ICONS ---
// const BriefcaseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
// );

// function PostJob() {
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");
//   const [requirements, setRequirements] = useState("");
//   const [deadline, setDeadline] = useState(""); // 👈 NEW: Auto-Hide Date

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // // Access Control
//   // if (user?.role !== "admin" && user?.role !== "recruiter") {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
//   //       <div className="text-center p-8 bg-[#0f172a] rounded-2xl border border-slate-800">
//   //           <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
//   //           <p className="text-slate-400">Recruiter privileges required.</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // 🔄 LOGIC: If not recruiter, show modal instead of Access Denied
//   if (user && user.role !== "admin" && user.role !== "recruiter") {
//     // Pass 'onClose' to refresh/check role, although updateUser handles it live.
//     return <RecruiterOnboardingModal onClose={() => {}} />; 
//   }

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
//       deadline // 👈 Sending to backend
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

//   return (
//     // PAGE BACKGROUND: Deep Slate (#020617)
//     <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-[#020617] text-slate-200">
      
//       <div className="w-full max-w-3xl p-8 md:p-10 rounded-2xl shadow-2xl bg-[#0f172a] border border-slate-800 relative overflow-hidden">
        
//         {/* Top Glow */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

//         <div className="text-center mb-10">
//           <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 text-indigo-400">
//              <BriefcaseIcon />
//           </div>
//           <h2 className="text-3xl font-bold text-white tracking-tight">Post a New Job</h2>
//           <p className="text-slate-400 mt-2 text-sm">Create a listing and let our AI match the best candidates.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
          
//           {/* SECTION 1: Core Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Job Title</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Senior React Dev"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Company Name</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Axon Tech"
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//                 required
//                 className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div>

//           {/* SECTION 2: Logistics */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Location</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Remote / New York"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//                 className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Salary Range</label>
//               <input
//                 type="text"
//                 placeholder="e.g. $120k - $150k"
//                 value={salary}
//                 onChange={(e) => setSalary(e.target.value)}
//                 required
//                 className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
//           </div>

//           {/* SECTION 3: Skills */}
//           <div>
//             <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Required Skills (Comma Separated)</label>
//             <input
//               type="text"
//               placeholder="e.g. React, Node.js, AWS, TypeScript"
//               value={requirements}
//               onChange={(e) => setRequirements(e.target.value)}
//               className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//             />
//             <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Used for AI candidate matching
//             </p>
//           </div>

//           {/* SECTION 4: Description */}
//           <div>
//             <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Job Description</label>
//             <textarea
//               rows="8"
//               placeholder="Describe the role responsibilities, team culture, and day-to-day tasks..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y custom-scrollbar text-sm leading-relaxed"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full py-4 font-bold text-lg text-white rounded-xl shadow-xl transform transition-all duration-200 
//               ${isSubmitting 
//                 ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" 
//                 : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/30"
//               }`}
//           >
//             {isSubmitting ? "Publishing..." : "Post Job Now"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostJob;

// frontend/src/pages/PostJob.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal"; // 👈 IMPORT THIS

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState(""); // 👈 NEW

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔄 LOGIC: If not recruiter, show modal instead of Access Denied
  if (user && user.role !== "admin" && user.role !== "recruiter") {
    // We pass an empty function to onClose because updateUser() in the modal handles state
    return <RecruiterOnboardingModal onClose={() => {}} />; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const reqArray = requirements.split(",").map((s) => s.trim()).filter(s => s);

    const jobData = { 
      title, 
      company, 
      location, 
      salary, 
      description, 
      requirements: reqArray,
      deadline // 👈 Sending to backend
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

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-[#020617] text-slate-200">
      
      <div className="w-full max-w-3xl p-8 md:p-10 rounded-2xl shadow-2xl bg-[#0f172a] border border-slate-800 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 text-indigo-400">
             <BriefcaseIcon />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Post a New Job</h2>
          <p className="text-slate-400 mt-2 text-sm">Create a listing and let our AI match the best candidates.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Job Title</label>
              <input type="text" placeholder="e.g. Senior React Dev" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Company Name</label>
              <input type="text" placeholder="e.g. Axon Tech" value={company} onChange={(e) => setCompany(e.target.value)} required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Location</label>
              <input type="text" placeholder="e.g. Remote / New York" value={location} onChange={(e) => setLocation(e.target.value)} required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Salary Range</label>
              <input type="text" placeholder="e.g. $120k - $150k" value={salary} onChange={(e) => setSalary(e.target.value)} required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
          </div>

          {/* 🗓️ NEW SECTION: Auto-Hide Date */}
          <div>
             <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
               Auto-Hide Job On (Optional)
             </label>
             <input 
               type="date"
               value={deadline}
               onChange={(e) => setDeadline(e.target.value)}
               className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
             />
             <p className="text-xs text-slate-500 mt-2">Job will automatically close after this date.</p>
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Required Skills (Comma Separated)</label>
            <input type="text" placeholder="e.g. React, Node.js, AWS, TypeScript" value={requirements} onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all" />
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Used for AI candidate matching</p>
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Job Description</label>
            <textarea rows="8" placeholder="Describe the role responsibilities..." value={description} onChange={(e) => setDescription(e.target.value)} required
              className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all resize-y custom-scrollbar text-sm leading-relaxed"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className={`w-full py-4 font-bold text-lg text-white rounded-xl shadow-xl transform transition-all duration-200 ${isSubmitting ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/30"}`}>
            {isSubmitting ? "Publishing..." : "Post Job Now"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PostJob;