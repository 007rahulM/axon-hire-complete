import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
  </svg>
);

function Feedback() {
  const [formData, setFormData] = useState({ category: "General", message: "", rating: "5" });
  const [status, setStatus] = useState("idle"); // idle, sending, success
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axiosInstance.post("/users/feedback", formData);
      setStatus("success");
      setTimeout(() => navigate("/"), 3000); // Redirect after showing success
    } catch (err) {
        console.error("Feedback submission error:", err);
      alert("Failed to send. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="text-center animate-bounce">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Awesome!</h2>
          <p className="text-slate-400">Your feedback helps us build the future of hiring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-[140px] p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <SparklesIcon />
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">User Experience</span>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Help us improve <span className="text-indigo-500">Axon</span></h1>
          <p className="text-slate-400 mb-10 text-lg">We're in beta. Your thoughts directly influence our AI engine and interface.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#020617] border border-slate-800 text-white p-4 rounded-2xl outline-none focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option>General Feedback</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>AI Accuracy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Experience Rating</label>
                <div className="flex justify-between bg-[#020617] border border-slate-800 p-2 rounded-2xl">
                  {["1", "2", "3", "4", "5"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, rating: num})}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${formData.rating === num ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-500 hover:text-white"}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Your Message</label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#020617] border border-slate-800 text-white p-4 rounded-2xl h-40 outline-none focus:border-indigo-500 transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <button 
              type="submit"
              disabled={status === "sending"}
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {status === "sending" ? "Transmitting..." : "Send Feedback to Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;