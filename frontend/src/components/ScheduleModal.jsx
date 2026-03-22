// import { useState } from "react";

// function ScheduleModal({ isOpen, onClose, onSubmit, candidateName }) {
//   const [formData, setFormData] = useState({
//     date: "",
//     time: "",
//     link: "",
//     notes: ""
//   });
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await onSubmit(formData); // Pass data back to parent
//     setLoading(false);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
//       <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
//         <div className="bg-slate-900 p-6 border-b border-slate-800">
//           <h3 className="text-xl font-bold text-white">Schedule Interview</h3>
//           <p className="text-sm text-slate-400">With <span className="text-indigo-400">{candidateName}</span></p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
//                 <input 
//                     type="date" 
//                     required
//                     className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500"
//                     onChange={(e) => setFormData({...formData, date: e.target.value})}
//                 />
//             </div>
//             <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
//                 <input 
//                     type="time" 
//                     required
//                     className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500"
//                     onChange={(e) => setFormData({...formData, time: e.target.value})}
//                 />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meeting Link (Zoom/Meet)</label>
//             <input 
//                 type="url" 
//                 required
//                 placeholder="https://meet.google.com/..."
//                 className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500 placeholder-slate-600"
//                 onChange={(e) => setFormData({...formData, link: e.target.value})}
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Internal Notes</label>
//             <textarea 
//                 rows="3"
//                 placeholder="Focus on system design skills..."
//                 className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500 placeholder-slate-600"
//                 onChange={(e) => setFormData({...formData, notes: e.target.value})}
//             ></textarea>
//           </div>

//           <div className="pt-4 flex gap-3">
//             <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors">Cancel</button>
//             <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-500/20">
//                 {loading ? "Sending Invite..." : "Confirm & Send"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ScheduleModal;

//new one //

import { useState } from "react";

// ─── ICONS ───
const CloseIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CalIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LinkIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const inp = {
  width: "100%", padding: "9px 12px",
  background: "var(--bg-subtle)", color: "var(--text-1)",
  border: "1px solid var(--border-strong)", borderRadius: "6px",
  fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
  transition: "border-color 0.15s",
};
const onF = e => e.target.style.borderColor = "var(--accent)";
const onB = e => e.target.style.borderColor = "var(--border-strong)";

// ── SAME props as original — untouched: isOpen, onClose, onSubmit, candidateName ──
function ScheduleModal({ isOpen, onClose, onSubmit, candidateName }) {
  // ── SAME state as original — untouched ──
  const [formData, setFormData] = useState({ date: "", time: "", link: "", notes: "" });
  const [loading, setLoading] = useState(false);

  // ── SAME guard as original — untouched ──
  if (!isOpen) return null;

  // ── SAME logic as original — untouched ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "var(--modal-overlay)",
        zIndex: 9500, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: "14px", width: "100%", maxWidth: "440px",
          boxShadow: "var(--shadow-lg)", animation: "ax-fade-in 0.15s ease-out",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
            <CalIcon />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.015em", color: "var(--text-1)", marginBottom: "2px" }}>
              Schedule Interview
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
              With <span style={{ color: "var(--accent)", fontWeight: 500 }}>{candidateName}</span>
            </p>
          </div>
          <button
            type="button" onClick={onClose}
            style={{ width: "28px", height: "28px", borderRadius: "5px", border: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-3)", flexShrink: 0 }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>

          {/* Date + Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Date *</label>
              <input
                type="date" required
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                style={{ ...inp, colorScheme: "light dark" }}
                onFocus={onF} onBlur={onB}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Time *</label>
              <input
                type="time" required
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                style={{ ...inp, colorScheme: "light dark" }}
                onFocus={onF} onBlur={onB}
              />
            </div>
          </div>

          {/* Meeting link */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Meeting link *</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-3)", display: "flex", pointerEvents: "none" }}>
                <LinkIcon />
              </div>
              <input
                type="url" required
                placeholder="https://meet.google.com/…"
                onChange={e => setFormData({ ...formData, link: e.target.value })}
                style={{ ...inp, paddingLeft: "32px" }}
                onFocus={onF} onBlur={onB}
              />
            </div>
          </div>

          {/* Notes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>
              Internal notes <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(not sent to candidate)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Focus areas, interview format, things to assess…"
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}
              onFocus={onF} onBlur={onB}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "8px", paddingTop: "2px" }}>
            <button
              type="button" onClick={onClose}
              style={{ flex: 1, padding: "9px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-surface)", color: "var(--text-2)", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              style={{ flex: 2, padding: "9px", borderRadius: "6px", background: loading ? "var(--bg-subtle)" : "var(--accent)", color: loading ? "var(--text-3)" : "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
            >
              {loading ? (
                <><span style={{ width: "13px", height: "13px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", animation: "ax-spin 0.7s linear infinite", display: "inline-block" }} />Sending invite…</>
              ) : "Confirm & send invite"}
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes ax-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default ScheduleModal;