import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

// --- ICONS ---
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

function AIBot() {
  // --- State Management ---
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");

  // --- Handlers ---
  const handleGenerate = async (e) => {
    e.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setAiResponse("");
    setError("");

    try {
      // API Call
      const res = await axiosInstance.post("/ai/generate-questions", {
        jobTitle,
      });

      // Success
      setAiResponse(res.data.questions);
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(err.response?.data?.message || "Failed to generate interview questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiResponse);
    alert("Copied to clipboard!"); // Simple feedback
  };

  // --- UI Render ---
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
             Axon Interview Intelligence
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Generate role-specific technical screening questions calibrated to industry standards using advanced AI.
          </p>
        </div>

        {/* Main Input Card - HIGH CONTRAST (White) */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/20 border border-slate-200">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-6 items-end">
            
            {/* Input Field */}
            <div className="flex-grow w-full">
              <label htmlFor="jobTitle" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Target Role
              </label>
              <div className="relative">
                <input
                  id="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-500/30
                ${isLoading 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95"
                }`}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <SparklesIcon /> Generate
                </>
              )}
            </button>
          </form>

          {/* Error Feedback */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {aiResponse && (
          <div className="mt-12 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Generated Assessment
              </h3>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <CopyIcon /> Copy
              </button>
            </div>

            {/* The Output Container - Dark "Terminal" Style for Contrast */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden group">
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50"></div>
              
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-slate-300 leading-relaxed font-mono text-base">
                {aiResponse}
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}

export default AIBot;