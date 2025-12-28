import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, user } = res.data;
      
      login(user, token);
      // Removed alert("Login successful") for a smoother flow
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  return (
    // PAGE BACKGROUND: Deep Slate (#020617) matches the rest of the app
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      
      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Top Gradient Accent (The "Glow") */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="p-8 md:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-sm mt-2">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Password
                </label>
                {/* Optional: Add Forgot Password link here later */}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200
                ${isSubmitting 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 hover:shadow-indigo-500/25"
                }`}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Footer / Register Link */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Create one now
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;