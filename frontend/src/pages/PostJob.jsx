
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecruiterOnboardingModal from "../components/RecruiterOnboardingModal";

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

// 🚀 Icon for the new section
const BrainIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");

  // 🚀 NEW STATE: V3 Intelligence Controls 
  const [autoEvaluate, setAutoEvaluate] = useState(false);
  const [evaluationMode, setEvaluationMode] = useState("local");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user && user.role !== "admin" && user.role !== "recruiter") {
    return <RecruiterOnboardingModal onClose={() => {}} />; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const reqArray = requirements.split(",").map((s) => s.trim()).filter(s => s);

   // PostJob.jsx
const jobData = { 
  title, 
  company, 
  location, 
  salary, 
  description, 
  requirements: reqArray,
  deadline,
  autoEvaluate,    // Ensure this is 'autoEvaluate', not 'atsEnabled'
  evaluationMode   // Ensure this is 'evaluationMode'
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
          <p className="text-slate-400 mt-2 text-sm">Create a listing and let our system process the best candidates.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ... Existing Title, Company, Location, Salary Inputs ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Job Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Company Name</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Salary Range</label>
              <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} required className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white focus:border-indigo-500 outline-none" />
            </div>
          </div>

          {/* 🚀 NEW: AXON V3 INTELLIGENCE SETTINGS  */}
          <div className="p-6 rounded-2xl bg-[#1e293b]/30 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <BrainIcon />
                <h3 className="text-sm font-bold uppercase tracking-widest">Axon V3 Intelligence Settings</h3>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Auto-Evaluate on Apply</p>
                <p className="text-xs text-slate-500">Automatically score candidates when they submit their resume.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={autoEvaluate} onChange={(e) => setAutoEvaluate(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {autoEvaluate && (
              <div className="pt-4 border-t border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <p className="text-sm font-bold text-white">Evaluation Mode</p>
                  <p className="text-xs text-slate-500">Choose between fast Local math or deep AI context.</p>
                </div>
                <select 
                  value={evaluationMode} 
                  onChange={(e) => setEvaluationMode(e.target.value)}
                  className="bg-[#020617] border border-slate-700 text-xs rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                >
                  <option value="local">Standard (Local Math)</option>
                  <option value="ai">AI Fact Extractor</option>
                </select>
              </div>
            )}
          </div>

          {/* ... Rest of existing inputs (Deadline, Skills, Description) ... */}
          <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Auto-Hide Job On (Optional)</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Required Skills (Comma Separated)</label>
            <input type="text" placeholder="React, Node.js, AWS" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Job Description</label>
            <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white outline-none resize-y"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className={`w-full py-4 font-bold text-lg text-white rounded-xl shadow-xl transition-all ${isSubmitting ? "bg-slate-800" : "bg-gradient-to-r from-indigo-600 to-purple-600"}`}>
            {isSubmitting ? "Publishing..." : "Post Job Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;