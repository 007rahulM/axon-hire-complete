import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Register() {
  const [step, setStep] = useState(1); // 1 = Register Form, 2 = OTP Form
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- STEP 1: REGISTER & SEND OTP ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
      return setError("Please fill in all fields.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (formData.password !== formData.confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      await axiosInstance.post("/auth/register", formData);
      setSuccess("OTP sent to your email!");
      setStep(2); // Move to OTP Verification
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: VERIFY OTP ---
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axiosInstance.post("/auth/verify-otp", { 
        email: formData.email, 
        otp 
      });
      setSuccess("Account verified! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or Expired Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 py-12">
      
      <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Brand Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="p-8 md:p-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {step === 1 ? "Candidate Sign Up" : "Verify Email"}
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              {step === 1 ? "Join Axon Hire today" : `Enter the code sent to ${formData.email}`}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center font-medium">
              {success}
            </div>
          )}

          {/* --- STEP 1 FORM --- */}
          {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Rahul M"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Confirm</label>
                  <input
                    name="confirm"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirm}
                    onChange={handleChange}
                    required
                    className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200 mt-2
                  ${loading 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" 
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/25"
                  }`}
              >
                {loading ? "Sending OTP..." : "Create Account"}
              </button>
            </form>
          )}

          {/* --- STEP 2 FORM (OTP) --- */}
          {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block mb-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Enter 6-Digit Code</label>
                <input 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="000000" 
                  maxLength="6"
                  className="w-full p-4 bg-[#020617] border border-slate-700 rounded-xl text-white text-center text-3xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
                  required 
                />
              </div>

              <button 
                disabled={loading} 
                className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200
                  ${loading
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:-translate-y-1 hover:shadow-emerald-500/25"
                  }`}
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-slate-500 text-sm hover:text-white transition-colors"
              >
                &larr; Wrong Email? Go Back
              </button>
            </form>
          )}

          {/* Footer Navigation (Only show on Step 1) */}
          {step === 1 && (
            <div className="mt-8 space-y-4 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">
                  Sign in
                </Link>
              </p>
              
              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-2">Looking to hire talent?</p>
                <Link 
                  to="/register-recruiter"
                  className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
                >
                  Register as a Recruiter <span>&rarr;</span>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Register;