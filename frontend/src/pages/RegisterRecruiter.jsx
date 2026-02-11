// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; 
// import axiosInstance from "../api/axiosInstance";
// import { Eye, EyeOff } from "lucide-react";
// // --- ICONS ---
// const UserIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
// );
// const BuildingIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/></svg>
// );

// function RegisterRecruiter() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // --- State Management ---
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [companyName, setCompanyName] = useState("");
//   const [contactEmail, setContactEmail] = useState("");
//   const [website, setWebsite] = useState("");
//   const [companyDescription, setCompanyDescription] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   // New visibility states
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (isSubmitting) return;

//     if (!name || !email || !password || !confirm || !companyName || !contactEmail) {
//       return setError("Please fill out all required fields.");
//     }
//     if (password !== confirm) {
//       return setError("Passwords do not match.");
//     }
//     if (password.length < 6) {
//       return setError("Password must be at least 6 characters.");
//     }

//     setIsSubmitting(true);

//     const submissionData = {
//       name, email, password, confirm,
//       companyName, contactEmail, website, companyDescription
//     };

//     try {
//       setSuccess("Processing your registration...");
//       const res = await axiosInstance.post("/auth/register-recruiter", submissionData);
      
//       login(res.data.user, res.data.token);
//       // Smoother flow: alert removed, direct navigation
//       navigate("/");
//     } catch (err) {
//       setSuccess("");
//       setError(err.response?.data?.message || "Registration failed. Please try again.");
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     // PAGE BACKGROUND: Deep Slate (#020617)
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center py-20 px-4">
      
//       <div className="w-full max-w-3xl bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
        
//         {/* Top Gradient Bar */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>

//         <div className="p-8 md:p-12">
          
//           <div className="text-center mb-10">
//             <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Recruiter Portal</h2>
//             <p className="text-slate-400 mt-2 font-medium text-sm md:text-base">Create your corporate account and start hiring</p>
//           </div>

//           <form onSubmit={handleRegister} className="space-y-10">
            
//             {/* --- SECTION 1: PERSONAL ACCOUNT --- */}
//             <div>
//               <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
//                  <span className="text-indigo-400"><UserIcon /></span>
//                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Account Credentials</h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Full Name</label>
//                   <input type="text" placeholder="Rahul M" value={name} onChange={(e) => setName(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Work Email</label>
//                   <input type="email" placeholder="rahul@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//                 {/* <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Password</label>
//                   <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Confirm Password</label>
//                   <input type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div> */}
//                 {/* Password Field */}
// <div className="relative">
//   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">
//     Password
//   </label>
//   <div className="relative">
//     <input 
//       type={showPassword ? "text" : "password"} 
//       placeholder="••••••••" 
//       value={password} 
//       onChange={(e) => setPassword(e.target.value)} 
//       required
//       className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//     />
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
//     >
//       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//     </button>
//   </div>
// </div>

// {/* Confirm Password Field */}
// <div className="relative">
//   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">
//     Confirm Password
//   </label>
//   <div className="relative">
//     <input 
//       type={showConfirm ? "text" : "password"} 
//       placeholder="••••••••" 
//       value={confirm} 
//       onChange={(e) => setConfirm(e.target.value)} 
//       required
//       className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//     />
//     <button
//       type="button"
//       onClick={() => setShowConfirm(!showConfirm)}
//       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
//     >
//       {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//     </button>
//   </div>
// </div>
//               </div>
//             </div>

//             {/* --- SECTION 2: COMPANY PROFILE --- */}
//             <div>
//               <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
//                  <span className="text-cyan-400"><BuildingIcon /></span>
//                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Company Information</h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Company Name</label>
//                   <input type="text" placeholder="Axon Tech Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Public Contact Email</label>
//                   <input type="email" placeholder="jobs@axon.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//               </div>

//               <div className="space-y-5">
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Website (Optional)</label>
//                   <input type="text" placeholder="https://axon.com" value={website} onChange={(e) => setWebsite(e.target.value)}
//                     className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Mission / Description</label>
//                   <textarea placeholder="Briefly describe your company culture..." value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows="3"
//                     className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm"/>
//                 </div>
//               </div>
//             </div>

//             {/* Error/Success Feedback */}
//             {(error || success) && (
//               <div className={`p-4 rounded-xl text-sm font-medium text-center border ${
//                 error ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"
//               }`}>
//                 {error || success}
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button type="submit" disabled={isSubmitting} 
//                 className={`w-full py-4 font-bold text-white rounded-xl shadow-xl transform transition-all duration-200 
//                   ${isSubmitting 
//                     ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" 
//                     : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/25"
//                   }`}>
//                 {isSubmitting ? "Generating Account..." : "Create Recruiter Account"}
//               </button>
//             </div>

//           </form>

//           <p className="mt-10 text-center text-slate-500 text-sm">
//             Not a recruiter?{" "}
//             <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">
//               Register as Candidate
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterRecruiter;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have this context for login
import axiosInstance from "../api/axiosInstance";
import { Eye, EyeOff } from "lucide-react";

// --- ICONS ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/></svg>
);

function RegisterRecruiter() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Ensure you have this hook

  // --- State Management ---
  const [step, setStep] = useState(1); // 1 = Form, 2 = OTP
  const [otp, setOtp] = useState("");  // Store OTP input
  
  // Personal Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  // Company Data
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- STEP 1: SUBMIT DETAILS & SEND OTP ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isSubmitting) return;

    // Basic Validation
    if (!name || !email || !password || !confirm || !companyName || !contactEmail) {
      return setError("Please fill out all required fields.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setIsSubmitting(true);

    const accountData = { name, email, password, confirm };

    try {
      // 1. Call Backend to create Unverified User & Send OTP
      await axiosInstance.post("/auth/register-recruiter", accountData);
      
      setSuccess(`OTP sent to ${email}`);
      setStep(2); // <--- SWITCH TO STEP 2 (OTP FORM)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STEP 2: VERIFY OTP & CREATE COMPANY ---
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      // 2. Prepare the payload. 
      // NOTE: We pass 'companyData' here because your backend /verify-otp endpoint checks for it!
      const verifyPayload = {
        email: email,
        otp: otp,
        companyData: {
          companyName,
          contactEmail,
          website,
          companyDescription
        }
      };

      const res = await axiosInstance.post("/auth/verify-otp", verifyPayload);
      
      // 3. Login the user using the token from response
      const { user, token } = res.data;
      login(user, token);

      setSuccess("Account verified! Redirecting...");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center py-20 px-4">
      
      <div className="w-full max-w-3xl bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>

        <div className="p-8 md:p-12">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {step === 1 ? "Recruiter Portal" : "Verify Email"}
            </h2>
            <p className="text-slate-400 mt-2 font-medium text-sm md:text-base">
              {step === 1 ? "Create your corporate account and start hiring" : `Enter the code sent to ${email}`}
            </p>
          </div>

          {/* Feedback Messages */}
          {(error || success) && (
            <div className={`p-4 mb-6 rounded-xl text-sm font-medium text-center border ${
              error ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"
            }`}>
              {error || success}
            </div>
          )}

          {/* --- STEP 1: REGISTRATION FORM --- */}
          {step === 1 && (
            <form onSubmit={handleRegister} className="space-y-10">
              
              {/* Account Credentials */}
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
                   <span className="text-indigo-400"><UserIcon /></span>
                   <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Account Credentials</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Full Name</label>
                    <input type="text" placeholder="Rahul M" value={name} onChange={(e) => setName(e.target.value)} required
                      className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Work Email</label>
                    <input type="email" placeholder="rahul@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showConfirm ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={confirm} 
                        onChange={(e) => setConfirm(e.target.value)} 
                        required
                        className="w-full p-3.5 pr-12 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Profile */}
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
                   <span className="text-cyan-400"><BuildingIcon /></span>
                   <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Company Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Company Name</label>
                    <input type="text" placeholder="Axon Tech Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
                      className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Public Contact Email</label>
                    <input type="email" placeholder="jobs@axon.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required
                      className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Website (Optional)</label>
                    <input type="text" placeholder="https://axon.com" value={website} onChange={(e) => setWebsite(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-500 tracking-wider">Mission / Description</label>
                    <textarea placeholder="Briefly describe your company culture..." value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows="3"
                      className="w-full p-4 rounded-xl bg-[#020617] border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm"/>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} 
                  className={`w-full py-4 font-bold text-white rounded-xl shadow-xl transform transition-all duration-200 
                    ${isSubmitting 
                      ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-indigo-500/25"
                    }`}>
                  {isSubmitting ? "Sending OTP..." : "Create Recruiter Account"}
                </button>
              </div>

              <p className="mt-10 text-center text-slate-500 text-sm">
                Not a recruiter?{" "}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors underline decoration-indigo-500/30 underline-offset-4">
                  Register as Candidate
                </Link>
              </p>
            </form>
          )}

          {/* --- STEP 2: OTP VERIFICATION --- */}
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
                disabled={isSubmitting} 
                className={`w-full py-4 font-bold text-white rounded-xl shadow-lg transform transition-all duration-200
                  ${isSubmitting
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 hover:-translate-y-1 hover:shadow-emerald-500/25"
                  }`}
              >
                {isSubmitting ? "Verifying..." : "Verify & Setup Company"}
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

        </div>
      </div>
    </div>
  );
}

export default RegisterRecruiter;