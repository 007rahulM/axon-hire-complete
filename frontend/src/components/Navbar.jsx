import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "../components/NotificationBell";

const AxonLogoMark = () => (
  <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="13" stroke="var(--accent)" strokeWidth="1.5"/>
    <path d="M10 22 L15 9 L20 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="11.8" y1="17.5" x2="18.2" y2="17.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="15" cy="9" r="2" fill="var(--accent)"/>
    <circle cx="10" cy="22" r="1.5" fill="var(--accent)"/>
    <circle cx="20" cy="22" r="1.5" fill="var(--accent)"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const X = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SunIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("ax-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ax-theme", next === "" ? "light" : next);
    setIsDark(!isDark);
  };

  const handleLogout = () => { logout(); navigate("/login"); };
  const isRecruiter = user?.role === "admin" || user?.role === "recruiter";
  const isCandidate = isLoggedIn && user?.role === "user";
  const active = (p) => location.pathname === p ? "active" : "";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Jobs" },
    ...(isLoggedIn ? [{ to: "/saved-jobs", label: "Saved" }] : []),
    { to: "/ai-bot", label: "AI Prep" },
    ...(isLoggedIn ? [{ to: "/feedback", label: "Feedback" }] : []),
    ...(isRecruiter ? [{ to: "/recruiter-dashboard", label: "Dashboard" }] : []),
    ...(user?.role === "admin" ? [{ to: "/admin-dashboard", label: "Admin" }] : []),
  ];

  return (
    <nav className="ax-nav">
      <div className="ax-nav-inner">
        <div className="ax-logo" onClick={() => navigate("/")}>
          <div className="ax-logo-mark"><AxonLogoMark /></div>
          <span className="ax-logo-text">Axon<span>Hire</span></span>
        </div>

        {/* Desktop links */}
        <div className="ax-nav-links" style={{ display:"none" }} id="ax-desktop-links">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className={`ax-nav-link ${active(l.to)}`}
              style={l.to === "/admin-dashboard" ? { color:"var(--red)" } : {}}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="ax-nav-actions" id="ax-desktop-actions">
          <button className="ax-theme-btn" onClick={toggleTheme} title={isDark ? "Light mode" : "Dark mode"}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate("/login")} className="ax-btn ax-btn-ghost">Sign in</button>
              <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary">Get started</button>
            </>
          ) : (
            <>
              <NotificationBell />
              {isCandidate && (
                <button onClick={() => navigate("/register-recruiter")} className="ax-btn"
                  style={{ background:"var(--purple-bg)", color:"var(--purple)", border:"1px solid var(--border)", fontSize:"12px" }}>
                  Post jobs →
                </button>
              )}
              {isRecruiter && (
                <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ fontSize:"12px" }}>
                  Post a job
                </button>
              )}
              <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost">My Apps</button>
              <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost">Profile</button>
              <button onClick={handleLogout} className="ax-btn"
                style={{ color:"var(--red)", background:"var(--red-bg)", border:"1px solid var(--border)" }}>
                Sign out
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(o => !o)} className="ax-theme-btn" id="ax-hamburger">
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="ax-fade-in" style={{ background:"var(--nav-bg)", borderTop:"1px solid var(--border)", padding:"12px 16px 16px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px", marginBottom:"12px" }}>
            {navLinks.map(l => (
              <button key={l.to} onClick={() => navigate(l.to)}
                style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 10px", background:"none", border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:500, color: location.pathname === l.to ? "var(--accent)" : "var(--text-2)", borderRadius:"6px", borderLeft: location.pathname === l.to ? "2px solid var(--accent)" : "2px solid transparent" }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"8px", borderTop:"1px solid var(--border)", paddingTop:"12px" }}>
            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")} className="ax-btn ax-btn-outline" style={{ width:"100%", justifyContent:"center" }}>Sign in</button>
                <button onClick={() => navigate("/register")} className="ax-btn ax-btn-primary" style={{ width:"100%", justifyContent:"center" }}>Get started free</button>
              </>
            ) : (
              <>
                {isCandidate && <button onClick={() => navigate("/register-recruiter")} className="ax-btn" style={{ width:"100%", justifyContent:"center", background:"var(--purple-bg)", color:"var(--purple)", border:"1px solid var(--border)" }}>Post jobs as Recruiter</button>}
                {isRecruiter && <button onClick={() => navigate("/post-job")} className="ax-btn ax-btn-outline" style={{ width:"100%", justifyContent:"center" }}>Post a job</button>}
                <button onClick={() => navigate("/my-applications")} className="ax-btn ax-btn-ghost" style={{ width:"100%", justifyContent:"center" }}>My Applications</button>
                <button onClick={() => navigate("/profile")} className="ax-btn ax-btn-ghost" style={{ width:"100%", justifyContent:"center" }}>Profile</button>
                <button onClick={handleLogout} className="ax-btn" style={{ width:"100%", justifyContent:"center", color:"var(--red)", background:"var(--red-bg)", border:"1px solid var(--border)" }}>Sign out</button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          #ax-desktop-links { display:flex !important; }
          #ax-hamburger { display:none !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
