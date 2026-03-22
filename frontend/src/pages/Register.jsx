// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import { Eye, EyeOff } from 'lucide-react';
// import { useAuth } from "../context/AuthContext";

// function Register() {
//   const [step, setStep] = useState(1); // 1 = Register Form, 2 = OTP Form
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

//   // Handle Input Changes
//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // --- STEP 1: REGISTER & SEND OTP ---
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!formData.name || !formData.email || !formData.password || !formData.confirm) {
//       return setError("Please fill in all fields.");
//     }
//     if (formData.password.length < 6) {
//       return setError("Password must be at least 6 characters.");
//     }
//     if (formData.password !== formData.confirm) {
//       return setError("Passwords do not match.");
//     }

//     setLoading(true);

//     try {
//       await axiosInstance.post("/auth/register", formData);
//       setSuccess("OTP sent to your email!");
//       setStep(2); // Move to OTP Verification
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };
// const { login } = useAuth();
//   // --- STEP 2: VERIFY OTP ---
// const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const res = await axiosInstance.post("/auth/verify-otp", { 
//         email: formData.email, 
//         otp 
//       });
      
//       // 🛠 FIX: Auto-login instead of redirecting to login page
//       const { user, token } = res.data;
//       login(user, token);

//       setSuccess("Account verified! Welcome.");
//       setTimeout(() => navigate("/"), 1500); // Redirect to Home
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid or Expired Code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 py-12">
      
//       <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
        
//         {/* Brand Accent Line */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

//         <div className="p-8 md:p-10">
          
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-white tracking-tight">
//               {step === 1 ? "Candidate Sign Up" : "Verify Email"}
//             </h2>
//             <p className="text-slate-400 text-sm mt-2 font-medium">
//               {step === 1 ? "Join Axon Hire today" : `Enter the code sent to ${formData.email}`}
//             </p>
//           </div>

//           {/* Feedback Messages */}
//           {error && (
//             <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="p-3 mb-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center font-medium">
//               {success}
//             </div>
//           )}

//           {/* --- STEP 1 FORM --- */}
//           {step === 1 && (
//             <form onSubmit={handleRegister} className="space-y-5">
//               <div>
//                 <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
//                 <input
//                   name="name"
//                   type="text"
//                   placeholder="Rahul M"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Email Address</label>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//               </div>

//               {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Password</label>
//                   <input
//                     name="password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">Confirm</label>
//                   <input
//                     name="confirm"
//                     type="password"
//                     placeholder="••••••••"
//                     value={formData.confirm}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                   />
//                 </div>
//               </div> */}
//               {/* Password Field */}
//        {/* Password Grid */}
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
  
//   {/* Password Field */}
//   <div className="relative">
//     <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
//       Password
//     </label>
//     <div className="relative">
//       <input
//         name="password"
//         type={showPassword ? "text" : "password"}
//         placeholder="••••••••"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
//       >
//         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   </div>

//   {/* Confirm Password Field */}
//   <div className="relative">
//     <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
//       Confirm
//     </label>
//     <div className="relative">
//       <input
//         name="confirm"
//         type={showConfirmPassword ? "text" : "password"}
//         placeholder="••••••••"
//         value={formData.confirm}
//         onChange={handleChange}
//         required
//         className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//       />
//       <button
//         type="button"
//         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
//       >
//         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   </div>

// </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200 mt-2
//                   ${loading 
//                     ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" 
//                     : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/25"
//                   }`}
//               >
//                 {loading ? "Sending OTP..." : "Create Account"}
//               </button>
//             </form>
//           )}

//           {/* --- STEP 2 FORM (OTP) --- */}
//           {step === 2 && (
//             <form onSubmit={handleVerify} className="space-y-6">
//               <div>
//                 <label className="block mb-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Enter 6-Digit Code</label>
//                 <input 
//                   value={otp} 
//                   onChange={(e) => setOtp(e.target.value)} 
//                   placeholder="000000" 
//                   maxLength="6"
//                   className="w-full p-4 bg-[#020617] border border-slate-700 rounded-xl text-white text-center text-3xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" 
//                   required 
//                 />
//               </div>

//               <button 
//                 disabled={loading} 
//                 className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200
//                   ${loading
//                     ? "bg-slate-800 text-slate-500 cursor-not-allowed"
//                     : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:-translate-y-1 hover:shadow-emerald-500/25"
//                   }`}
//               >
//                 {loading ? "Verifying..." : "Verify & Login"}
//               </button>

//               <button 
//                 type="button" 
//                 onClick={() => setStep(1)} 
//                 className="w-full text-slate-500 text-sm hover:text-white transition-colors"
//               >
//                 &larr; Wrong Email? Go Back
//               </button>
//             </form>
//           )}

//           {/* Footer Navigation (Only show on Step 1) */}
//           {step === 1 && (
//             <div className="mt-8 space-y-4 text-center">
//               <p className="text-slate-400 text-sm">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">
//                   Sign in
//                 </Link>
//               </p>
              
//               <div className="pt-6 border-t border-slate-800">
//                 <p className="text-xs text-slate-500 mb-2">Looking to hire talent?</p>
//                 <Link 
//                   to="/register-recruiter"
//                   className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
//                 >
//                   Register as a Recruiter <span>&rarr;</span>
//                 </Link>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


//new one //


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AxonLogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
    <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
    <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
  </svg>
);

// Reusable styled input
const inputStyle = {
  width: "100%", padding: "9px 12px",
  background: "var(--bg-subtle)", color: "var(--text-1)",
  border: "1px solid var(--border-strong)", borderRadius: "6px",
  fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
  transition: "border-color 0.15s",
};
const onFocus = e => e.target.style.borderColor = "var(--accent)";
const onBlur  = e => e.target.style.borderColor = "var(--border-strong)";

function Register() {
  // ── SAME state as original — untouched ──
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // ── SAME as original ──
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── SAME logic as original — untouched ──
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!formData.name || !formData.email || !formData.password || !formData.confirm)
      return setError("Please fill in all fields.");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (formData.password !== formData.confirm)
      return setError("Passwords do not match.");
    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", formData);
      setSuccess("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // ── SAME logic as original — untouched ──
  const handleVerify = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { email: formData.email, otp });
      const { user, token } = res.data;
      login(user, token);
      setSuccess("Account verified! Welcome.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "32px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <AxonLogoMark />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.03em" }}>
            Axon<span style={{ color: "var(--accent)" }}>Hire</span>
          </span>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px", boxShadow: "var(--shadow)" }}>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            {[{ n: 1, label: "Account" }, { n: 2, label: "Verify" }].map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {i > 0 && <div style={{ width: "32px", height: "1px", background: step >= s.n ? "var(--accent)" : "var(--border)" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: step >= s.n ? "var(--accent)" : "var(--bg-subtle)", border: `1px solid ${step >= s.n ? "var(--accent)" : "var(--border-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: step >= s.n ? "white" : "var(--text-3)", transition: "all 0.2s" }}>
                    {step > s.n ? <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> : s.n}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: step >= s.n ? "var(--text-1)" : "var(--text-3)" }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>Create your account</h1>
                <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Join AxonHire — free for candidates</p>
              </div>

              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Full name</label>
                  <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Rahul M" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Email address</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>

                {/* Password + Confirm */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* Password */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" required
                        style={{ ...inputStyle, paddingRight: "36px" }} onFocus={onFocus} onBlur={onBlur} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        style={{ position: "absolute", right: "9px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center", padding: "2px" }}>
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Confirm</label>
                    <div style={{ position: "relative" }}>
                      <input name="confirm" type={showConfirmPassword ? "text" : "password"} value={formData.confirm} onChange={handleChange} placeholder="••••••••" required
                        style={{ ...inputStyle, paddingRight: "36px" }} onFocus={onFocus} onBlur={onBlur} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ position: "absolute", right: "9px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center", padding: "2px" }}>
                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error / Success */}
                {error && <div style={{ padding: "9px 12px", borderRadius: "6px", background: "var(--red-bg)", border: "1px solid var(--red)", fontSize: "12px", color: "var(--red)" }}>{error}</div>}
                {success && <div style={{ padding: "9px 12px", borderRadius: "6px", background: "var(--green-bg)", border: "1px solid var(--green)", fontSize: "12px", color: "var(--green)" }}>{success}</div>}

                {/* Submit */}
                <button type="submit" disabled={loading}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: loading ? "var(--bg-subtle)" : "var(--accent)", color: loading ? "var(--text-3)" : "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.15s", marginTop: "2px" }}>
                  {loading ? "Sending OTP…" : "Create account"}
                </button>
              </form>

              {/* Footer links */}
              <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Sign in</Link>
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
                  Hiring talent?{" "}
                  <Link to="/register-recruiter" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Create recruiter account</Link>
                </p>
              </div>
            </>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "4px" }}>Verify your email</h1>
                <p style={{ fontSize: "12px", color: "var(--text-3)", lineHeight: 1.6 }}>
                  We sent a 6-digit code to <strong style={{ color: "var(--text-2)" }}>{formData.email}</strong>
                </p>
              </div>

              <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>6-digit code</label>
                  <input
                    type="text" value={otp} onChange={e => setOtp(e.target.value)}
                    placeholder="000000" maxLength={6} required
                    style={{ width: "100%", padding: "14px 12px", background: "var(--bg-subtle)", color: "var(--text-1)", border: "1px solid var(--border-strong)", borderRadius: "6px", fontFamily: "JetBrains Mono, monospace", fontSize: "24px", outline: "none", textAlign: "center", letterSpacing: "0.45em", transition: "border-color 0.15s" }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>

                {error   && <div style={{ padding: "9px 12px", borderRadius: "6px", background: "var(--red-bg)",   border: "1px solid var(--red)",   fontSize: "12px", color: "var(--red)"   }}>{error}</div>}
                {success && <div style={{ padding: "9px 12px", borderRadius: "6px", background: "var(--green-bg)", border: "1px solid var(--green)", fontSize: "12px", color: "var(--green)" }}>{success}</div>}

                <button type="submit" disabled={loading}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: loading ? "var(--bg-subtle)" : "var(--green)", color: loading ? "var(--text-3)" : "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.15s" }}>
                  {loading ? "Verifying…" : "Verify & sign in"}
                </button>

                <button type="button" onClick={() => { setStep(1); setError(""); setSuccess(""); setOtp(""); }}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", background: "transparent", color: "var(--text-3)", border: "1px solid var(--border)", fontFamily: "Inter, sans-serif", fontSize: "12px", cursor: "pointer" }}>
                  ← Wrong email? Go back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;