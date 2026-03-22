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



//new one//

import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Feedback() {
  // ── SAME state as original — untouched ──
  const [formData, setFormData] = useState({ category: "General Feedback", message: "", rating: "5" });
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  // ── SAME logic as original — untouched ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axiosInstance.post("/users/feedback", formData);
      setStatus("success");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("Failed to send. Please try again.");
      setStatus("idle");
    }
  };

  // ── SUCCESS SCREEN ──
  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ textAlign: "center", maxWidth: "360px" }}>
          {/* Check circle */}
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--green-bg)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" fill="none" stroke="var(--green)" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "8px" }}>
            Thank you!
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.65, marginBottom: "20px" }}>
            Your feedback helps us build a better hiring platform. Redirecting you to home…
          </p>
          <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", background: "var(--green)", borderRadius: "2px", animation: "ax-progress 3s linear forwards" }} />
          </div>
        </div>
        <style>{`@keyframes ax-progress { from { width: 0% } to { width: 100% } }`}</style>
      </div>
    );
  }

  const categories = [
    "General Feedback",
    "Bug Report",
    "Feature Request",
    "AI Accuracy",
  ];

  const ratingLabels = { "1": "Poor", "2": "Fair", "3": "Good", "4": "Great", "5": "Excellent" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* Header */}
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", color: "var(--accent)", padding: "3px 10px", borderRadius: "3px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "14px" }}>
            <span style={{ width: "5px", height: "5px", background: "var(--accent)", borderRadius: "50%" }} />
            Beta Feedback
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text-1)", marginBottom: "7px" }}>
            Help us improve AxonHire
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.65, maxWidth: "360px", margin: "0 auto" }}>
            We're in beta. Your thoughts directly shape the platform. Takes 30 seconds.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "28px", boxShadow: "var(--shadow)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Category */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", padding: "9px 12px", background: "var(--bg-subtle)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none", cursor: "pointer", transition: "border-color 0.15s" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>
                Experience Rating
                {formData.rating && (
                  <span style={{ marginLeft: "6px", fontWeight: 400, color: "var(--text-3)" }}>
                    — {ratingLabels[formData.rating]}
                  </span>
                )}
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                {["1", "2", "3", "4", "5"].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: n })}
                    style={{
                      flex: 1, height: "40px", borderRadius: "6px", border: `1px solid ${formData.rating === n ? "var(--accent)" : "var(--border)"}`,
                      background: formData.rating === n ? "var(--accent)" : "var(--bg-subtle)",
                      color: formData.rating === n ? "white" : "var(--text-2)",
                      fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {/* Rating bar visual */}
              <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--accent)", borderRadius: "2px", width: `${(parseInt(formData.rating) / 5) * 100}%`, transition: "width 0.3s" }} />
              </div>
            </div>

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Your message *</label>
              <textarea
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="What's working well? What could be better? Any bugs?"
                rows={5}
                style={{ width: "100%", padding: "9px 12px", background: "var(--bg-subtle)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none", resize: "vertical", lineHeight: 1.65, transition: "border-color 0.15s" }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
              />
              {/* Character hint */}
              <div style={{ fontSize: "11px", color: formData.message.length < 10 ? "var(--text-3)" : "var(--green)", textAlign: "right", transition: "color 0.2s" }}>
                {formData.message.length} characters{formData.message.length < 10 && formData.message.length > 0 ? " — a bit more detail helps" : ""}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                width: "100%", padding: "11px", borderRadius: "6px",
                background: status === "sending" ? "var(--bg-subtle)" : "var(--accent)",
                color: status === "sending" ? "var(--text-3)" : "white",
                border: "none", fontFamily: "Inter, sans-serif",
                fontSize: "13px", fontWeight: 600,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {status === "sending" ? (
                <>
                  <span style={{ width: "13px", height: "13px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", animation: "ax-spin 0.7s linear infinite", display: "inline-block" }} />
                  Sending…
                </>
              ) : "Send feedback"}
            </button>

          </form>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "var(--text-3)", lineHeight: 1.6 }}>
          Your feedback is sent directly to the AxonHire team. We read every message.
        </p>
      </div>

      <style>{`@keyframes ax-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Feedback;