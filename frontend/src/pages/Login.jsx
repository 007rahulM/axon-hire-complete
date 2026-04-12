// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// import { useAuth } from "../context/AuthContext";
// // 👇 NEW IMPORT: Google Button Component
// import { GoogleLogin } from '@react-oauth/google';
// import { Eye,EyeOff } from "lucide-react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const[showPassword,setShowPassword]=useState(false);
  
//   const navigate = useNavigate();
//   // 👇 UPDATE: Get googleLogin from context
//   const { login, googleLogin } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     try {
//       const res = await axiosInstance.post("/auth/login", { email, password });
//       const { token, user } = res.data;
      
//       login(user, token);
//       // Removed alert("Login successful") for a smoother flow
//       navigate("/"); 
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//       setIsSubmitting(false);
//     }
//   };
// // 👇 NEW: Handle Google Login Success
//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       console.log("Google response:", credentialResponse); // Debug log
//       // Send ONLY the credential string to context
//       await googleLogin(credentialResponse.credential);
//       navigate("/"); 
//     } catch (error) {
//       console.error("Google Login Failed:", error);
//       setError("Google Login Failed. Please try again.");
//     }
//   };

//   return (
//     // PAGE BACKGROUND: Deep Slate (#020617) matches the rest of the app
//     <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      
//       {/* LOGIN CARD */}
//       <div className="w-full max-w-md bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden mt-10">
        
//         {/* Top Gradient Accent (The "Glow") */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

//         <div className="p-8 md:p-10">
          
//           {/* Header Section */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
//             <p className="text-slate-400 text-sm mt-2">Sign in to access your dashboard</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Email Field */}
//             <div>
//               <label className="block mb-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@company.com"
//                 required
//                 className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
// {/* Password Field */}
// <div className="relative">
//   <div className="flex justify-between items-center mb-2">
//     <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
//       Password
//     </label>
//   </div>
  
//   <div className="relative">
//     <input
//       // 👁️ Logic: toggle between "text" and "password"
//       type={showPassword ? "text" : "password"}
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       placeholder="••••••••"
//       required
//       // 🎨 Theme: use bg-slate-50 for light mode and bg-slate-950 for dark
//  className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//     />
    
//     {/* The Toggle Button */}
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
//     >
//       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//     </button>
//   </div>
// </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-3.5 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200
//                 ${isSubmitting 
//                   ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
//                   : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 hover:shadow-indigo-500/25"
//                 }`}
//             >
//               {isSubmitting ? "Signing in..." : "Sign In"}
//             </button>

//             {/* 👇 GOOGLE LOGIN SECTION */}
//             <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-slate-800"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-[#0f172a] text-slate-500">Or continue with</span>
//                 </div>
//             </div>

//             <div className="flex justify-center">
//                 <GoogleLogin
//                     onSuccess={handleGoogleSuccess}
//                     onError={() => console.log('Login Failed')}
//                     theme="filled_black" // Fits your Dark Theme perfectly
//                     shape="pill"
//                     width="100%"
//                 />
//             </div>

//           </form>

//           {/* Footer / Register Link */}
//           <p className="mt-8 text-center text-slate-400 text-sm">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
//               Create one now
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

// ─── LOGO MARK (same as Navbar) ───
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // ── SAME as original — untouched ──
  const { login, googleLogin } = useAuth();

  // ── SAME logic as original — untouched ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { user } = res.data;
      login(user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  // ── SAME logic as original — untouched ──
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate("/");
    } catch (error) {
      console.error("Google Login Failed:", error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-page)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* ── LOGO ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "32px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <AxonLogoMark />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.03em" }}>
            Axon<span style={{ color: "var(--accent)" }}>Hire</span>
          </span>
        </div>

        {/* ── CARD ── */}
        <div style={{
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          borderRadius: "12px", padding: "32px", boxShadow: "var(--shadow)",
        }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "5px" }}>
              Welcome back
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
              Sign in to your AxonHire account
            </p>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%", padding: "9px 12px",
                  background: "var(--bg-subtle)", color: "var(--text-1)",
                  border: "1px solid var(--border-strong)", borderRadius: "6px",
                  fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--accent)"}
                onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", padding: "9px 40px 9px 12px",
                    background: "var(--bg-subtle)", color: "var(--text-1)",
                    border: "1px solid var(--border-strong)", borderRadius: "6px",
                    fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--accent)"}
                  onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-3)", display: "flex", alignItems: "center",
                    padding: "2px",
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: "10px 12px", borderRadius: "6px",
                background: "var(--red-bg)", border: "1px solid var(--red)",
                fontSize: "12px", color: "var(--red)", lineHeight: 1.5,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%", padding: "10px", borderRadius: "6px",
                background: isSubmitting ? "var(--bg-subtle)" : "var(--accent)",
                color: isSubmitting ? "var(--text-3)" : "white",
                border: "none", fontFamily: "Inter, sans-serif",
                fontSize: "13px", fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.15s", marginTop: "2px",
              }}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* ── DIVIDER ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "11px", color: "var(--text-3)", whiteSpace: "nowrap" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {/* ── GOOGLE LOGIN — same component, same handler ── */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed. Please try again.")}
              theme="outline"
              shape="rectangular"
              width="336"
            />
          </div>

          {/* ── FOOTER LINKS ── */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Register as recruiter */}
        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "var(--text-3)" }}>
          Hiring?{" "}
          <Link to="/register-recruiter" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
            Create a recruiter account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;