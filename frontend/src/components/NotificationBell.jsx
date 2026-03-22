// import { useState, useEffect, useRef } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Link } from "react-router-dom";

// // --- ICONS ---
// const BellIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>);
// const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
// const InfoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>);

// function NotificationBell() {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // 1. Fetch Data Function
//   const fetchNotifications = async () => {
//     try {
//       const res = await axiosInstance.get("/notifications");
//       setNotifications(res.data.notifications);
//       setUnreadCount(res.data.unreadCount);
//     } catch (err) {
//       console.error("Notification sync failed", err);
//     }
//   };

// // frontend/src/components/NotificationBell.jsx

// useEffect(() => {
//   fetchNotifications(); // Load immediately when the app starts

//   const interval = setInterval(() => {
//     // 💡 Only fetch if the user is actually looking at the page
//     // This saves your Render/Vercel server from constant wake-ups
//     if (document.visibilityState === 'visible') {
//       fetchNotifications();
//     }
//   }, 120000); // Check every 2 minutes (120000ms) instead of 30s

//   return () => clearInterval(interval);
// }, []);

//   // 3. Close Dropdown if clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dropdownRef]);

//   // 4. Mark Single as Read
//   const handleMarkRead = async (id) => {
//     try {
//       await axiosInstance.put(`/notifications/${id}/read`);
//       setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
//       setUnreadCount(prev => Math.max(0, prev - 1));
//     } catch (err) { console.error(err); }
//   };

//   // 5. Mark ALL Read
//   const handleMarkAllRead = async () => {
//     try {
//       await axiosInstance.put("/notifications/read-all");
//       setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
//       setUnreadCount(0);
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="relative z-50" ref={dropdownRef}>
//       {/* --- THE BELL BUTTON --- */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
//       >
//         <BellIcon />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-[#020617] animate-pulse">
//             {unreadCount > 9 ? '9+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {/* --- THE DROPDOWN --- */}
//       {isOpen && (
//         <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fadeIn origin-top-right">
          
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#020617]">
//             <h3 className="font-bold text-white text-sm">Notifications</h3>
//             {unreadCount > 0 && (
//               <button onClick={handleMarkAllRead} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors">
//                 <CheckIcon /> Mark all read
//               </button>
//             )}
//           </div>

//           {/* List */}
//           <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
//             {notifications.length === 0 ? (
//               <div className="p-10 text-center text-slate-500 flex flex-col items-center">
//                 <div className="mb-3 p-3 bg-slate-800 rounded-full text-slate-600"><BellIcon /></div>
//                 <p className="text-sm font-medium">No notifications yet</p>
//                 <p className="text-xs mt-1">We'll let you know when something happens.</p>
//               </div>
//             ) : (
//               notifications.map((notif) => (
//                 <Link 
//                   to={notif.relatedLink || "#"} 
//                   key={notif._id}
//                   onClick={() => handleMarkRead(notif._id)}
//                   className={`block p-4 border-b border-slate-800/50 hover:bg-slate-800 transition-colors relative ${!notif.isRead ? 'bg-indigo-500/5' : ''}`}
//                 >
//                   <div className="flex gap-3 items-start">
//                     {/* Status Dot */}
//                     <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${!notif.isRead ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-transparent'}`}></div>
                    
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start gap-2">
//                         <p className={`text-sm ${!notif.isRead ? 'text-white font-bold' : 'text-slate-400 font-medium'}`}>
//                           {notif.title}
//                         </p>
//                         <span className="text-[10px] text-slate-600 whitespace-nowrap">
//                           {new Date(notif.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
                      
//                       <p className={`text-xs mt-1 ${!notif.isRead ? 'text-slate-300' : 'text-slate-500'}`}>
//                         {notif.message}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             )}
//           </div>
          
//           {/* Footer */}
//           <div className="p-2 bg-[#020617] border-t border-slate-800 text-center">
//              <span className="text-[10px] text-slate-600">Syncs automatically every 30s</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationBell;


//new one //
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

// ─── ICONS ───
const BellIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // ── FETCH — only called when bell is clicked (no polling) ──
  // Previously polled every 120s — removed to stop hammering the backend.
  // Notifications load fresh every time the user opens the bell. Same data, zero waste.
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Notification fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Open/close toggle — fetch on open ──
  const handleToggle = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(prev => !prev);
  };

  // ── SAME click-outside logic — untouched ──
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── SAME mark-read logic — untouched ──
  const handleMarkRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
  };

  // ── SAME mark-all-read logic — untouched ──
  const handleMarkAllRead = async () => {
    try {
      await axiosInstance.put("/notifications/read-all");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ position: "relative", zIndex: 50 }} ref={dropdownRef}>

      {/* ── BELL BUTTON ── */}
      <button
        onClick={handleToggle}
        className="ax-bell"
        style={{ position: "relative" }}
        title="Notifications"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: "4px", right: "4px",
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#e53e3e", border: "1.5px solid var(--nav-bg)",
          }} />
        )}
      </button>

      {/* ── DROPDOWN ── */}
      {isOpen && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 8px)",
          width: "340px", background: "var(--bg-surface)",
          border: "1px solid var(--border)", borderRadius: "10px",
          boxShadow: "var(--shadow-lg)", overflow: "hidden",
          animation: "ax-fade-in 0.15s ease-out",
        }}>

          {/* Header */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-subtle)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)" }}>Notifications</span>
              {unreadCount > 0 && (
                <span style={{ background: "var(--accent)", color: "white", fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "3px" }}>
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--accent)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
              >
                <CheckIcon /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: "360px", overflowY: "auto" }}>
            {loading ? (
              /* Loading state */
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ padding: "14px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div className="ax-skeleton" style={{ width: "7px", height: "7px", borderRadius: "50%", marginTop: "4px", flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div className="ax-skeleton" style={{ height: "11px", width: "75%", borderRadius: "3px" }} />
                      <div className="ax-skeleton" style={{ height: "10px", width: "55%", borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              /* Empty state */
              <div style={{ padding: "36px 16px", textAlign: "center" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "var(--text-3)" }}>
                  <BellIcon />
                </div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-1)", marginBottom: "4px" }}>All caught up</p>
                <p style={{ fontSize: "11px", color: "var(--text-3)" }}>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <Link
                  to={notif.relatedLink || "#"}
                  key={notif._id}
                  onClick={() => handleMarkRead(notif._id)}
                  style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    padding: "12px 14px", borderBottom: "1px solid var(--border)",
                    background: !notif.isRead ? "var(--accent-bg)" : "transparent",
                    textDecoration: "none", transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = !notif.isRead ? "var(--accent-bg)" : "transparent"}
                >
                  {/* Unread dot */}
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50", marginTop: "4px", flexShrink: 0,
                    background: !notif.isRead ? "var(--accent)" : "transparent",
                    border: !notif.isRead ? "none" : "1px solid var(--border)",
                    // borderRadius: "50%",
                  }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "3px" }}>
                      <p style={{ fontSize: "12px", fontWeight: notif.isRead ? 400 : 600, color: "var(--text-1)", lineHeight: 1.4, margin: 0 }}>
                        {notif.title}
                      </p>
                      <span style={{ fontSize: "10px", color: "var(--text-3)", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {new Date(notif.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <p style={{ fontSize: "11px", color: "var(--text-3)", lineHeight: 1.5, margin: 0 }}>
                      {notif.message}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: "8px 14px", borderTop: "1px solid var(--border)", background: "var(--bg-subtle)", textAlign: "center" }}>
            <span style={{ fontSize: "10px", color: "var(--text-3)" }}>
              Loads fresh on each open
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;