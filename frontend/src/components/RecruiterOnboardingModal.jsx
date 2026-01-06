// frontend/src/components/RecruiterOnboardingModal.jsx
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Need this to redirect on cancel

// ICONS
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="16" y1="2" x2="16" y2="4"/></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

function RecruiterOnboardingModal({ onClose }) {
  const { updateUser } = useAuth();
  const navigate = useNavigate(); // Hook to redirect
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    website: "",
    description: "",
    logo: "",      // New
    size: "1-10",  // New
    industry: "",  // New
    location: ""   // New
  });
  const [loading, setLoading] = useState(false);

  // Handle Input Changes cleanly
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put("/auth/onboard-recruiter", formData);
      updateUser(res.data.user, res.data.token);
      alert("✅ Organization Profile Created!");
      onClose(); 
    } catch (err) {
      console.error(err);
      alert("Failed to upgrade account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Cancel / X Button
  const handleCancel = () => {
    if(window.confirm("Cancel onboarding? You will remain a candidate.")) {
        navigate("/"); // Redirect home if they cancel
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto">
      
      {/* 🚀 WIDER CONTAINER (max-w-2xl) for better spacing */}
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#020617] p-6 flex justify-between items-start border-b border-slate-800">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                    <BuildingIcon />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Setup Organization</h2>
                    <p className="text-slate-400 text-sm">Establish your company identity on AxonHire.</p>
                </div>
            </div>
            {/* ❌ THE CANCEL BUTTON YOU ASKED FOR */}
            <button onClick={handleCancel} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <CloseIcon />
            </button>
        </div>

        {/* Professional Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Row 1: Basics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Company Name *</label>
                <input required name="companyName" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="Acme Corp" onChange={handleChange} />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Recruiting Email *</label>
                <input required type="email" name="contactEmail" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="careers@acme.com" onChange={handleChange} />
            </div>
          </div>

          {/* Row 2: Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Industry</label>
                <input name="industry" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="Fintech, AI..." onChange={handleChange} />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Size</label>
                <select name="size" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" onChange={handleChange}>
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="201-1000">201-1000 Employees</option>
                    <option value="1000+">1000+ Employees</option>
                </select>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Location (HQ)</label>
                <input name="location" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="San Francisco, CA" onChange={handleChange} />
             </div>
          </div>

          {/* Row 3: Branding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Website</label>
                <input name="website" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="https://acme.com" onChange={handleChange} />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Logo URL (Optional)</label>
                <input name="logo" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" placeholder="https://acme.com/logo.png" onChange={handleChange} />
             </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Company Bio</label>
            <textarea name="description" rows="3" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 outline-none resize-none" placeholder="Briefly describe your mission and culture..." onChange={handleChange} />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg transform active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Complete Setup & Post Job"}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">By continuing, you agree to our Recruiter Terms of Service.</p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RecruiterOnboardingModal;