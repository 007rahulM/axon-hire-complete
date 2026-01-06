import { useState } from "react";

function ScheduleModal({ isOpen, onClose, onSubmit, candidateName }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    link: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData); // Pass data back to parent
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="bg-slate-900 p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Schedule Interview</h3>
          <p className="text-sm text-slate-400">With <span className="text-indigo-400">{candidateName}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                <input 
                    type="date" 
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
                <input 
                    type="time" 
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500"
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meeting Link (Zoom/Meet)</label>
            <input 
                type="url" 
                required
                placeholder="https://meet.google.com/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500 placeholder-slate-600"
                onChange={(e) => setFormData({...formData, link: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Internal Notes</label>
            <textarea 
                rows="3"
                placeholder="Focus on system design skills..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm outline-none focus:border-indigo-500 placeholder-slate-600"
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-500/20">
                {loading ? "Sending Invite..." : "Confirm & Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleModal;