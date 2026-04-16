


// // frontend/src/components/Navbar.jsx
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import NotificationBell from "../components/NotificationBell"; 

// const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>);
// const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => { setIsOpen(false); }, [location.pathname]);

//   const handleLogout = () => { logout(); navigate("/login"); };

//   const isRecruiter = user?.role === "admin" || user?.role === "recruiter";

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
          
//           {/* LOGO */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
//               <span className="text-white font-black text-xl italic">A</span>
//             </div>
//             <h1 className="text-2xl font-bold tracking-tighter text-white">Axon<span className="text-indigo-400">Hire</span></h1>
//           </div>

//           {/* DESKTOP NAV */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === "/" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Home</Link>
//             <Link to="/jobs" className={`text-sm font-semibold transition-colors ${location.pathname === "/jobs" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Jobs</Link>
            
//             {isLoggedIn && (
//               <>
//                 <Link to="/saved-jobs" className={`text-sm font-semibold transition-colors ${location.pathname === "/saved-jobs" ? "text-pink-400" : "text-slate-300 hover:text-white"}`}>Saved</Link>
//                 {/* 🚀 FEEDBACK LINK ADDED HERE */}
//                 <Link 
//                   to="/feedback" 
//                   className={`text-sm font-semibold transition-colors ${location.pathname === "/feedback" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}
//                 >
//                   Feedback
//                 </Link>
//               </>
//             )}

//             <Link to="/ai-bot" className={`text-sm font-semibold transition-colors ${location.pathname === "/ai-bot" ? "text-emerald-400" : "text-slate-300 hover:text-white"}`}>AI Prep</Link>
            
//             {user && user.role === 'admin' && (
//               <Link to="/admin-dashboard" className="text-red-400 font-bold hover:text-red-300">Admin Panel</Link>
//             )}
            
//             {isRecruiter && (
//               <Link to="/recruiter-dashboard" className={`text-sm font-semibold transition-colors ${location.pathname === "/recruiter-dashboard" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Dashboard</Link>
//             )}
//           </div>

//           {/* ACTIONS */}
//           <div className="hidden md:flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <button onClick={() => navigate("/login")} className="text-slate-300 hover:text-white text-sm font-bold px-4 py-2">Login</button>
//                 <button onClick={() => navigate("/register")} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">Join Axon</button>
//               </>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <NotificationBell />
//                 <div className="h-6 w-[1px] bg-slate-800"></div>

//                 <button 
//                   onClick={() => navigate("/post-job")}
//                   className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all"
//                 >
//                   {isRecruiter ? "Post Job" : "Become Recruiter"}
//                 </button>
                
//                 <button onClick={() => navigate("/my-applications")} className="text-slate-300 hover:text-white text-sm font-bold">My Apps</button>
//                 <button onClick={() => navigate("/profile")} className="text-slate-300 hover:text-white text-sm font-bold">Profile</button>
//                 <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm font-bold px-4 py-2 border border-red-500/20 hover:bg-red-500/10 rounded-xl transition-all">Logout</button>
//               </div>
//             )}
//           </div>

//           {/* MOBILE TOGGLE */}
//           <div className="md:hidden flex items-center gap-4">
//              {isLoggedIn && <NotificationBell />}
//             <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">{isOpen ? <CloseIcon /> : <MenuIcon />}</button>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div className="md:hidden bg-[#0f172a] border-b border-slate-800 animate-slideIn">
//           <div className="px-4 pt-2 pb-6 space-y-2">
//             <div className="py-4 border-b border-slate-800 mb-4">
//                {isLoggedIn ? <p className="text-slate-400 text-sm">Signed in as <span className="text-white font-bold">{user?.name}</span></p> : <p className="text-slate-400 text-sm italic">Unlock AI features by signing in.</p>}
//             </div>
            
//             <button onClick={() => navigate("/")} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-xl font-medium">Home</button>
//             <button onClick={() => navigate("/jobs")} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-xl font-medium">Jobs</button>
//             {isLoggedIn && (
//               <>
//                 <button onClick={() => navigate("/saved-jobs")} className="block w-full text-left p-3 text-pink-400 hover:bg-slate-800 rounded-xl font-medium">Saved Jobs</button>
//                 {/* 🚀 FEEDBACK IN MOBILE MENU */}
//                 <button onClick={() => navigate("/feedback")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">Feedback</button>
//               </>
//             )}
//             <button onClick={() => navigate("/ai-bot")} className="block w-full text-left p-3 text-emerald-400 hover:bg-slate-800 rounded-xl font-medium">AI Bot Prep</button>
            
//             {isRecruiter && <button onClick={() => navigate("/recruiter-dashboard")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">Recruiter Dashboard</button>}
            
//             <button onClick={() => navigate("/post-job")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">
//                {isRecruiter ? "Post a New Job" : "Become a Recruiter"}
//             </button>

//             <div className="pt-4 space-y-3">
//               {!isLoggedIn ? (
//                 <>
//                   <button onClick={() => navigate("/login")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">Login</button>
//                   <button onClick={() => navigate("/register")} className="w-full py-3 text-white bg-indigo-600 rounded-xl font-bold">Sign Up</button>
//                 </>
//               ) : (
//                 <>
//                     <button onClick={() => navigate("/my-applications")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">My Apps</button>
//                     <button onClick={() => navigate("/profile")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">My Profile</button>
//                     <button onClick={handleLogout} className="w-full py-3 text-red-400 border border-red-500/30 rounded-xl font-bold">Log Out</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


//////////////////////////////////////////////////////////////

// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import NotificationBell from "../components/NotificationBell";

// // ─── LOGO MARK SVG ───
// // "A" inside a circle with node dots — represents Axon (neural/network) + Hire
// const AxonLogoMark = () => (
//   <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
//     <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
//     <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
//     <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
//     <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
//   </svg>
// );

// // ─── ICONS ───
// const MenuIcon = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
//     <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
//   </svg>
// );
// const CloseIcon = () => (
//   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
//     <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//   </svg>
// );
// const SunIcon = () => (
//   <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
//     <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
//     <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
//     <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
//   </svg>
// );
// const MoonIcon = () => (
//   <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//   </svg>
// );

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isLoggedIn, user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   // Close mobile menu on route change
//   useEffect(() => { setIsOpen(false); }, [location.pathname]);

//   // Sync theme on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("ax-theme");
//     if (saved === "dark") {
//       document.documentElement.setAttribute("data-theme", "dark");
//       setIsDark(true);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const next = isDark ? "light" : "dark";
//     document.documentElement.setAttribute("data-theme", next);
//     localStorage.setItem("ax-theme", next);
//     setIsDark(!isDark);
//   };

//   const handleLogout = () => { logout(); navigate("/login"); };
//   const isRecruiter = user?.role === "admin" || user?.role === "recruiter";

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="ax-nav">
//       <div className="ax-nav-inner">

//         {/* LOGO */}
//         <div className="ax-logo" onClick={() => navigate("/")}>
//           <div className="ax-logo-mark"><AxonLogoMark /></div>
//           <span className="ax-logo-text">Axon<span>Hire</span></span>
//         </div>

//         {/* DESKTOP LINKS */}
//         <div className="ax-nav-links hidden md:flex">
//           <Link to="/" className={`ax-nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
//           <Link to="/jobs" className={`ax-nav-link ${isActive("/jobs") ? "active" : ""}`}>Jobs</Link>
//           {isLoggedIn && (
//             <Link to="/saved-jobs" className={`ax-nav-link ${isActive("/saved-jobs") ? "active" : ""}`}>Saved</Link>
//           )}
//           <Link to="/ai-bot" className={`ax-nav-link ${isActive("/ai-bot") ? "active" : ""}`}>AI Prep</Link>
//           {isLoggedIn && (
//             <Link to="/feedback" className={`ax-nav-link ${isActive("/feedback") ? "active" : ""}`}>Feedback</Link>
//           )}
//           {user?.role === "admin" && (
//             <Link to="/admin-dashboard" className={`ax-nav-link ${isActive("/admin-dashboard") ? "active" : ""}`} style={{ color: "var(--red)" }}>Admin</Link>
//           )}
//           {isRecruiter && (
//             <Link to="/recruiter-dashboard" className={`ax-nav-link ${isActive("/recruiter-dashboard") ? "active" : ""}`}>Dashboard</Link>
//           )}
//         </div>

//         {/* DESKTOP ACTIONS */}
//         <div className="ax-nav-actions hidden md:flex">
//           {/* Theme toggle */}
//           <button className="ax-theme-btn" onClick={toggleTheme} title={isDark ? "Switch to light" : "Switch to dark"}>
//             {isDark ? <SunIcon /> : <MoonIcon />}
//           </button>

//           {!isLoggedIn ? (
//             <>
//               <button onClick={() => navigate("/login")} className="ax-btn ax-btn-ghost">Sign in</button>
//               <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary">Get started</button>
//             </>
//           ) : (
//             <>
//               <NotificationBell />

//               {isRecruiter && (
//                 <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ fontSize: "0.75rem" }}>
//                   Post a job
//                 </button>
//               )}

//               <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost">My Apps</button>
//               <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost">Profile</button>
//               <button onClick={handleLogout} className="ax-btn" style={{ color: "var(--red)", background: "var(--red-bg)", fontSize: "0.8125rem" }}>
//                 Sign out
//               </button>
//             </>
//           )}
//         </div>

//         {/* MOBILE: theme + bell + hamburger */}
//         <div className="md:hidden flex items-center gap-2 ml-auto">
//           <button className="ax-theme-btn" onClick={toggleTheme}>
//             {isDark ? <SunIcon /> : <MoonIcon />}
//           </button>
//           {isLoggedIn && <NotificationBell />}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="ax-theme-btn"
//             style={{ fontSize: "0" }}
//           >
//             {isOpen ? <CloseIcon /> : <MenuIcon />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {isOpen && (
//         <div
//           className="md:hidden ax-fade-in"
//           style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--border)", padding: "8px 0 16px" }}
//         >
//           {/* User info */}
//           <div style={{ padding: "10px 16px 12px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
//             {isLoggedIn
//               ? <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Signed in as <strong style={{ color: "var(--text-1)" }}>{user?.name}</strong></p>
//               : <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Sign in to access all features</p>
//             }
//           </div>

//           {/* Nav links */}
//           {[
//             { to: "/", label: "Home" },
//             { to: "/jobs", label: "Jobs" },
//             ...(isLoggedIn ? [{ to: "/saved-jobs", label: "Saved Jobs" }] : []),
//             { to: "/ai-bot", label: "AI Prep" },
//             ...(isLoggedIn ? [{ to: "/feedback", label: "Feedback" }] : []),
//             ...(isRecruiter ? [{ to: "/recruiter-dashboard", label: "Recruiter Dashboard" }] : []),
//             ...(user?.role === "admin" ? [{ to: "/admin-dashboard", label: "Admin Panel" }] : []),
//           ].map(({ to, label }) => (
//             <button
//               key={to}
//               onClick={() => navigate(to)}
//               style={{
//                 display: "block", width: "100%", textAlign: "left",
//                 padding: "9px 16px", fontSize: "13px", fontWeight: "500",
//                 color: isActive(to) ? "var(--accent)" : "var(--text-2)",
//                 background: "none", border: "none", cursor: "pointer",
//                 fontFamily: "Inter, sans-serif",
//                 borderLeft: isActive(to) ? "2px solid var(--accent)" : "2px solid transparent",
//               }}
//             >
//               {label}
//             </button>
//           ))}

//           {/* Actions */}
//           <div style={{ padding: "12px 16px 0", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid var(--border)", marginTop: "8px" }}>
//             {!isLoggedIn ? (
//               <>
//                 <button onClick={() => navigate("/login")} className="ax-btn ax-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Sign in</button>
//                 <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Get started</button>
//               </>
//             ) : (
//               <>
//                 {isRecruiter && (
//                   <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Post a job</button>
//                 )}
//                 <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost" style={{ width: "100%", justifyContent: "center" }}>My Applications</button>
//                 <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost" style={{ width: "100%", justifyContent: "center" }}>Profile</button>
//                 <button onClick={handleLogout} className="ax-btn" style={{ width: "100%", justifyContent: "center", color: "var(--red)", background: "var(--red-bg)" }}>Sign out</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;





/////////////////////////////////////////////////
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "../components/NotificationBell";
import axiosInstance from "../api/axiosInstance"; // Added for feedback submission

// ─── LOGO MARK SVG ───
const AxonLogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
    <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
    <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
  </svg>
);

// ─── UI ICONS ───
const MenuIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
const CloseIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SunIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

// ─── NAV LINK ICONS ───
const HomeIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BriefcaseIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const BookmarkIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const BotIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
const FeedbackIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const ShieldIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const DashboardIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
const UserIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LogoutIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const PlusIcon = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Feedback Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Sync theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("ax-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ax-theme", next);
    setIsDark(!isDark);
  };

  const handleLogoutInitiate = () => {
    setShowLogoutModal(true);
  };

  const processLogout = async (withFeedback = false) => {
    if (withFeedback && feedbackText.trim()) {
      setIsSubmitting(true);
      try {
        // Replace with your actual feedback endpoint if needed
        await axiosInstance.post("/feedback", { text: feedbackText, type: "logout_feedback" });
      } catch (err) {
        console.error("Failed to submit feedback", err);
      }
    }
    
    setIsSubmitting(false);
    setShowLogoutModal(false);
    setFeedbackText("");
    logout();
    navigate("/login");
  };

  const isRecruiter = user?.role === "admin" || user?.role === "recruiter";
  const isActive = (path) => location.pathname === path;

  // Shared Link Style helper
  const linkStyle = { display: "flex", alignItems: "center", gap: "6px" };

  return (
    <>
      <nav className="ax-nav">
        <div className="ax-nav-inner">

          {/* LOGO */}
          <div className="ax-logo" onClick={() => navigate("/")}>
            <div className="ax-logo-mark"><AxonLogoMark /></div>
            <span className="ax-logo-text">Axon<span>Hire</span></span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="ax-nav-links hidden md:flex">
            <Link to="/" className={`ax-nav-link ${isActive("/") ? "active" : ""}`} style={linkStyle}>
              <HomeIcon /> Home
            </Link>
            <Link to="/jobs" className={`ax-nav-link ${isActive("/jobs") ? "active" : ""}`} style={linkStyle}>
              <BriefcaseIcon /> Jobs
            </Link>
            {isLoggedIn && (
              <Link to="/saved-jobs" className={`ax-nav-link ${isActive("/saved-jobs") ? "active" : ""}`} style={linkStyle}>
                <BookmarkIcon /> Saved
              </Link>
            )}
            <Link to="/ai-bot" className={`ax-nav-link ${isActive("/ai-bot") ? "active" : ""}`} style={linkStyle}>
              <BotIcon /> AI Prep
            </Link>
            
            {/* Feedback is now available for everyone */}
            <Link to="/feedback" className={`ax-nav-link ${isActive("/feedback") ? "active" : ""}`} style={linkStyle}>
              <FeedbackIcon /> Feedback
            </Link>

            {user?.role === "admin" && (
              <Link to="/admin-dashboard" className={`ax-nav-link ${isActive("/admin-dashboard") ? "active" : ""}`} style={{ ...linkStyle, color: "var(--red)" }}>
                <ShieldIcon /> Admin
              </Link>
            )}
            {isRecruiter && (
              <Link to="/recruiter-dashboard" className={`ax-nav-link ${isActive("/recruiter-dashboard") ? "active" : ""}`} style={linkStyle}>
                <DashboardIcon /> Dashboard
              </Link>
            )}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="ax-nav-actions hidden md:flex">
            {/* Theme toggle */}
            <button className="ax-theme-btn" onClick={toggleTheme} title={isDark ? "Switch to light" : "Switch to dark"}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")} className="ax-btn ax-btn-ghost" style={linkStyle}>
                   Sign in
                </button>
                <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary" style={linkStyle}>
                   Get started
                </button>
              </>
            ) : (
              <>
                <NotificationBell />

                {isRecruiter && (
                  <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ ...linkStyle, fontSize: "0.75rem" }}>
                    <PlusIcon /> Post a job
                  </button>
                )}

                <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost" style={linkStyle}>
                  My Apps
                </button>
                <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost" style={linkStyle}>
                  <UserIcon /> Profile
                </button>
                <button onClick={handleLogoutInitiate} className="ax-btn" style={{ ...linkStyle, color: "var(--red)", background: "var(--red-bg)", fontSize: "0.8125rem" }}>
                  <LogoutIcon /> Sign out
                </button>
              </>
            )}
          </div>

          {/* MOBILE: theme + bell + hamburger */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button className="ax-theme-btn" onClick={toggleTheme}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            {isLoggedIn && <NotificationBell />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ax-theme-btn"
              style={{ fontSize: "0" }}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div
            className="md:hidden ax-fade-in"
            style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--border)", padding: "8px 0 16px" }}
          >
            {/* User info */}
            <div style={{ padding: "10px 16px 12px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
              {isLoggedIn
                ? <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Signed in as <strong style={{ color: "var(--text-1)" }}>{user?.name}</strong></p>
                : <p style={{ fontSize: "12px", color: "var(--text-3)" }}>Sign in to access all features</p>
              }
            </div>

            {/* Nav links */}
            {[
              { to: "/", label: "Home", icon: <HomeIcon /> },
              { to: "/jobs", label: "Jobs", icon: <BriefcaseIcon /> },
              ...(isLoggedIn ? [{ to: "/saved-jobs", label: "Saved Jobs", icon: <BookmarkIcon /> }] : []),
              { to: "/ai-bot", label: "AI Prep", icon: <BotIcon /> },
              { to: "/feedback", label: "Feedback", icon: <FeedbackIcon /> }, // Public now
              ...(isRecruiter ? [{ to: "/recruiter-dashboard", label: "Recruiter Dashboard", icon: <DashboardIcon /> }] : []),
              ...(user?.role === "admin" ? [{ to: "/admin-dashboard", label: "Admin Panel", icon: <ShieldIcon /> }] : []),
            ].map(({ to, label, icon }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left",
                  padding: "10px 16px", fontSize: "13px", fontWeight: "500",
                  color: isActive(to) ? "var(--accent)" : "var(--text-2)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  borderLeft: isActive(to) ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                {icon} {label}
              </button>
            ))}

            {/* Actions */}
            <div style={{ padding: "12px 16px 0", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid var(--border)", marginTop: "8px" }}>
              {!isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/login")} className="ax-btn ax-btn-outline" style={{ width: "100%", justifyContent: "center" }}>Sign in</button>
                  <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Get started</button>
                </>
              ) : (
                <>
                  {isRecruiter && (
                    <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ width: "100%", justifyContent: "center", ...linkStyle }}>
                      <PlusIcon /> Post a job
                    </button>
                  )}
                  <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost" style={{ width: "100%", justifyContent: "flex-start", ...linkStyle }}>
                    <BriefcaseIcon /> My Applications
                  </button>
                  <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost" style={{ width: "100%", justifyContent: "flex-start", ...linkStyle }}>
                    <UserIcon /> Profile
                  </button>
                  <button onClick={handleLogoutInitiate} className="ax-btn" style={{ width: "100%", justifyContent: "flex-start", color: "var(--red)", background: "var(--red-bg)", ...linkStyle }}>
                    <LogoutIcon /> Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* LOGOUT FEEDBACK MODAL */}
      {showLogoutModal && (
        <div style={{ position: "fixed", inset: 0, background: "var(--modal-overlay, rgba(0,0,0,0.65))", backdropFilter: "blur(4px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="ax-fade-in" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px", width: "100%", maxWidth: "400px", boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0,0,0,0.15))" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", marginBottom: "12px" }}>
              <FeedbackIcon />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-1)", margin: 0 }}>Leaving so soon?</h3>
            </div>
            
            <p style={{ fontSize: "13px", color: "var(--text-2)", marginBottom: "20px", lineHeight: 1.5 }}>
              Before you sign out, we'd love to hear about your experience today. Any quick feedback?
            </p>

            <textarea 
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what you liked, or what we can improve..."
              style={{
                width: "100%", padding: "12px", background: "var(--bg-subtle)", color: "var(--text-1)",
                border: "1px solid var(--border-strong)", borderRadius: "8px", fontFamily: "Inter, sans-serif", 
                fontSize: "13px", outline: "none", resize: "vertical", minHeight: "100px", marginBottom: "20px",
                transition: "border-color 0.15s"
              }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border-strong)"}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                onClick={() => processLogout(true)} 
                disabled={!feedbackText.trim() || isSubmitting}
                className="ax-btn ax-btn-primary" 
                style={{ width: "100%", justifyContent: "center", padding: "10px", opacity: !feedbackText.trim() ? 0.6 : 1 }}
              >
                {isSubmitting ? "Submitting..." : "Submit & Sign out"}
              </button>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="ax-btn ax-btn-outline" 
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => processLogout(false)} 
                  className="ax-btn ax-btn-ghost" 
                  style={{ flex: 1, justifyContent: "center", color: "var(--text-3)" }}
                >
                  Skip & Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;