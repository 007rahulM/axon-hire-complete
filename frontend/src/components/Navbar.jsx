
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
//                 <Link to="/saved-jobs" className={`text-sm font-semibold transition-colors ${location.pathname === "/saved-jobs" ? "text-pink-400" : "text-slate-300 hover:text-white"}`}>Saved</Link>
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

//                 {/* 🎯 CHANGED: Visible to EVERYONE. If clicked by non-recruiter, PostJob.jsx handles the upgrade */}
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
//             {isLoggedIn && <button onClick={() => navigate("/saved-jobs")} className="block w-full text-left p-3 text-pink-400 hover:bg-slate-800 rounded-xl font-medium">Saved Jobs</button>}
//             <button onClick={() => navigate("/ai-bot")} className="block w-full text-left p-3 text-emerald-400 hover:bg-slate-800 rounded-xl font-medium">AI Bot Prep</button>
            
//             {isRecruiter && <button onClick={() => navigate("/recruiter-dashboard")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">Recruiter Dashboard</button>}
            
//             {/* Mobile Post Job / Upgrade */}
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


// frontend/src/components/Navbar.jsx
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "../components/NotificationBell"; 

const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/login"); };

  const isRecruiter = user?.role === "admin" || user?.role === "recruiter";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-xl italic">A</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">Axon<span className="text-indigo-400">Hire</span></h1>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === "/" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Home</Link>
            <Link to="/jobs" className={`text-sm font-semibold transition-colors ${location.pathname === "/jobs" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Jobs</Link>
            
            {isLoggedIn && (
              <>
                <Link to="/saved-jobs" className={`text-sm font-semibold transition-colors ${location.pathname === "/saved-jobs" ? "text-pink-400" : "text-slate-300 hover:text-white"}`}>Saved</Link>
                {/* 🚀 FEEDBACK LINK ADDED HERE */}
                <Link 
                  to="/feedback" 
                  className={`text-sm font-semibold transition-colors ${location.pathname === "/feedback" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}
                >
                  Feedback
                </Link>
              </>
            )}

            <Link to="/ai-bot" className={`text-sm font-semibold transition-colors ${location.pathname === "/ai-bot" ? "text-emerald-400" : "text-slate-300 hover:text-white"}`}>AI Prep</Link>
            
            {user && user.role === 'admin' && (
              <Link to="/admin-dashboard" className="text-red-400 font-bold hover:text-red-300">Admin Panel</Link>
            )}
            
            {isRecruiter && (
              <Link to="/recruiter-dashboard" className={`text-sm font-semibold transition-colors ${location.pathname === "/recruiter-dashboard" ? "text-indigo-400" : "text-slate-300 hover:text-white"}`}>Dashboard</Link>
            )}
          </div>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")} className="text-slate-300 hover:text-white text-sm font-bold px-4 py-2">Login</button>
                <button onClick={() => navigate("/register")} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">Join Axon</button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <NotificationBell />
                <div className="h-6 w-[1px] bg-slate-800"></div>

                <button 
                  onClick={() => navigate("/post-job")}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all"
                >
                  {isRecruiter ? "Post Job" : "Become Recruiter"}
                </button>
                
                <button onClick={() => navigate("/my-applications")} className="text-slate-300 hover:text-white text-sm font-bold">My Apps</button>
                <button onClick={() => navigate("/profile")} className="text-slate-300 hover:text-white text-sm font-bold">Profile</button>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm font-bold px-4 py-2 border border-red-500/20 hover:bg-red-500/10 rounded-xl transition-all">Logout</button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
             {isLoggedIn && <NotificationBell />}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">{isOpen ? <CloseIcon /> : <MenuIcon />}</button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-800 animate-slideIn">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="py-4 border-b border-slate-800 mb-4">
               {isLoggedIn ? <p className="text-slate-400 text-sm">Signed in as <span className="text-white font-bold">{user?.name}</span></p> : <p className="text-slate-400 text-sm italic">Unlock AI features by signing in.</p>}
            </div>
            
            <button onClick={() => navigate("/")} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-xl font-medium">Home</button>
            <button onClick={() => navigate("/jobs")} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-xl font-medium">Jobs</button>
            {isLoggedIn && (
              <>
                <button onClick={() => navigate("/saved-jobs")} className="block w-full text-left p-3 text-pink-400 hover:bg-slate-800 rounded-xl font-medium">Saved Jobs</button>
                {/* 🚀 FEEDBACK IN MOBILE MENU */}
                <button onClick={() => navigate("/feedback")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">Feedback</button>
              </>
            )}
            <button onClick={() => navigate("/ai-bot")} className="block w-full text-left p-3 text-emerald-400 hover:bg-slate-800 rounded-xl font-medium">AI Bot Prep</button>
            
            {isRecruiter && <button onClick={() => navigate("/recruiter-dashboard")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">Recruiter Dashboard</button>}
            
            <button onClick={() => navigate("/post-job")} className="block w-full text-left p-3 text-indigo-400 hover:bg-slate-800 rounded-xl font-medium">
               {isRecruiter ? "Post a New Job" : "Become a Recruiter"}
            </button>

            <div className="pt-4 space-y-3">
              {!isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/login")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">Login</button>
                  <button onClick={() => navigate("/register")} className="w-full py-3 text-white bg-indigo-600 rounded-xl font-bold">Sign Up</button>
                </>
              ) : (
                <>
                    <button onClick={() => navigate("/my-applications")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">My Apps</button>
                    <button onClick={() => navigate("/profile")} className="w-full py-3 text-white bg-slate-800 rounded-xl font-bold">My Profile</button>
                    <button onClick={handleLogout} className="w-full py-3 text-red-400 border border-red-500/30 rounded-xl font-bold">Log Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;