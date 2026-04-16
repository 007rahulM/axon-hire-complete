

// //new one //

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../api/axiosInstance";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";

// // ─── ICONS ───
// const UploadIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
// const FileIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
// const ScanIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>;
// const PencilIcon = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
// const MagicIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
// const CloseIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
// const SparklesIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
// const CheckIcon = () => <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;

// // shared input style
// const inp = {
//   width: "100%", padding: "9px 12px",
//   background: "var(--bg-subtle)", color: "var(--text-1)",
//   border: "1px solid var(--border-strong)", borderRadius: "6px",
//   fontFamily: "Inter, sans-serif", fontSize: "13px", outline: "none",
//   transition: "border-color 0.15s",
// };
// const onF = e => e.target.style.borderColor = "var(--accent)";
// const onB = e => e.target.style.borderColor = "var(--border-strong)";

// function Profile() {
//   const { user, login } = useAuth();

//   // ── SAME state as original — untouched ──
//   const [activeTab, setActiveTab] = useState("resume");
//   const [showAvatarModal, setShowAvatarModal] = useState(false);
//   const [file, setFile] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState("");
//   const [aiAnalysis, setAiAnalysis] = useState(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [targetRole, setTargetRole] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [profileData, setProfileData] = useState({ title: "", about: "", skills: "", profilePicture: "" });
//   const [profileMsg, setProfileMsg] = useState("");
//   const [avatarSeed, setAvatarSeed] = useState("Felix");
//   const [avatarStyle, setAvatarStyle] = useState("adventurer");

//   const API_BASE_URL = import.meta.env.MODE === "production"
//     ? "https://axon-hire-mvp.onrender.com"
//     : "http://localhost:5000";

//   // ── SAME logic as original — untouched ──
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get("/users/profile");
//         setResumeUrl(res.data.resumeUrl);
//         setProfileData({
//           title: res.data.title || "",
//           about: res.data.about || "",
//           skills: res.data.skills ? res.data.skills.join(", ") : "",
//           profilePicture: res.data.profilePicture || "",
//         });
//       } catch (err) { console.error(err); }
//     };
//     fetchProfile();
//     if (user) {
//       const saved = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
//       setAppliedJobs(saved);
//     }
//   }, [user]);

//   // ── SAME — untouched ──
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Select a file first");
//     const formData = new FormData();
//     formData.append("resume", file);
//     setLoading(true); setUploadProgress(0);
//     try {
//       const res = await axiosInstance.post("/users/upload-resume", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (pe) => setUploadProgress(Math.round((pe.loaded * 100) / pe.total)),
//       });
//       setResumeUrl(res.data.resumeUrl);
//       setMessage("Success!");
//       if (login) login(res.data.user); // Update user context with new resume URL
//     } catch { setMessage("Failed."); }
//     finally { setLoading(false); setTimeout(() => setUploadProgress(0), 2000); }
//   };

//   // ── SAME — untouched ──
//   const handleSelfCheck = async () => {
//     if (!resumeUrl) return alert("Upload resume first to use AI features.");
//     setAnalyzing(true);
//     try {
//       const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
//       const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole });
//       if (res.data.success) setAiAnalysis(res.data.analysis);
//     } catch { alert("Analysis failed."); }
//     finally { setAnalyzing(false); }
//   };

//   // ── SAME — untouched ──
//   const handleSaveProfile = async (e) => {
//     e.preventDefault(); setLoading(true);
//     try {
//       const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
//       await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
//       setProfileMsg("Profile updated!");
//       setTimeout(() => setProfileMsg(""), 3000);
//     } catch { setProfileMsg("Failed to update."); }
//     finally { setLoading(false); }
//   };

//   // ── SAME — untouched ──
//   const generateRandomAvatar = () => {
//     const seeds = ["Felix","Aneka","Milo","Bella","Jack","Luna","Zoe","Leo"];
//     const styles = ["adventurer","bottts","avataaars","lorelei","notionists"];
//     setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
//     setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
//   };

//   // ── SAME — untouched ──
//   const saveGeneratedAvatar = async () => {
//     const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
//     setProfileData(prev => ({ ...prev, profilePicture: url }));
//     try {
//       await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
//       setShowAvatarModal(false);
//     } catch { alert("Failed to save avatar"); }
//   };

//   // ── SAME — untouched ──
//   const handleImageUpload = async (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     const fd = new FormData();
//     fd.append("avatar", f);
//     try {
//       const res = await axiosInstance.post("/users/upload-avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
//       setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
//       setShowAvatarModal(false);
//     } catch { alert("Image upload failed"); }
//   };

//   // ── SAME — untouched ──
//   const handleClearHistory = () => {
//     if (!user) return;
//     setAppliedJobs([]);
//     localStorage.removeItem(`appliedJobs_${user.email}`);
//   };

//   // ── SAME — untouched ──
//   const getAvatarUrl = () => {
//     const pic = profileData.profilePicture;
//     if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
//     if (pic.startsWith("http")) return pic;
//     return `${API_BASE_URL}${pic}`;
//   };

//   // ── Score color helper ──
//   const scoreColor = (s) => s >= 80 ? "var(--green)" : s >= 50 ? "var(--orange)" : "var(--red)";
//   const scoreBg    = (s) => s >= 80 ? "var(--green-bg)" : s >= 50 ? "var(--orange-bg)" : "var(--red-bg)";
//   const scoreGrade = (s) => s >= 80 ? "A+" : s >= 50 ? "B" : "C";

//   return (
//     <div style={{ minHeight: "100vh", background: "var(--bg-page)", padding: "24px" }}>
//       <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", alignItems: "start" }} className="profile-grid">

//         {/* ══ LEFT COLUMN ══ */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

//           {/* Profile card */}
//           <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
//             {/* Banner */}
//             <div style={{ height: "64px", background: "var(--accent-bg)", borderBottom: "1px solid var(--accent-mid)" }} />
//             {/* Avatar + info */}
//             <div style={{ padding: "0 20px 20px", textAlign: "center" }}>
//               <div style={{ position: "relative", display: "inline-block", marginTop: "-28px", marginBottom: "10px" }}>
//                 <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "3px solid var(--bg-surface)", overflow: "hidden", background: "var(--bg-subtle)" }}>
//                   <img src={getAvatarUrl()} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                     onError={e => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`; }} />
//                 </div>
//                 <button onClick={() => setShowAvatarModal(true)}
//                   style={{ position: "absolute", bottom: 0, right: 0, width: "20px", height: "20px", borderRadius: "50%", background: "var(--accent)", border: "2px solid var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
//                   <PencilIcon />
//                 </button>
//               </div>
//               <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{user?.name}</div>
//               <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, marginTop: "2px" }}>{profileData.title || "Ready to work"}</div>
//               <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>{user?.email}</div>
//               <div style={{ marginTop: "10px" }}>
//                 <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "3px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}>
//                   {user?.role === "recruiter" ? "Recruiter" : "Candidate"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Applied jobs history */}
//           <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
//             <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)" }}>Recent Applications</span>
//               {appliedJobs.length > 0 && (
//                 <button onClick={handleClearHistory} style={{ fontSize: "11px", color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Clear</button>
//               )}
//             </div>
//             {appliedJobs.length === 0 ? (
//               <div style={{ padding: "24px 16px", textAlign: "center" }}>
//                 <p style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "10px" }}>No applications yet</p>
//                 <Link to="/jobs" style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Browse jobs →</Link>
//               </div>
//             ) : (
//               <div style={{ maxHeight: "280px", overflowY: "auto" }}>
//                 {appliedJobs.map((job, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
//                     <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "white", flexShrink: 0 }}>
//                       {job.company?.charAt(0)}
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
//                       <div style={{ fontSize: "10px", color: "var(--text-3)" }}>{job.company}</div>
//                     </div>
//                     <span style={{ fontSize: "9px", fontWeight: 600, color: "var(--green)", background: "var(--green-bg)", padding: "1px 6px", borderRadius: "2px", textTransform: "uppercase", flexShrink: 0 }}>Applied</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ══ RIGHT COLUMN ══ */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

//           {/* Tab switcher */}
//           <div style={{ display: "flex", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px", gap: "4px", width: "fit-content" }}>
//             {[{ id: "resume", label: "Resume & AI" }, { id: "details", label: "Edit Profile" }].map(tab => (
//               <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//                 style={{ padding: "7px 18px", borderRadius: "5px", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, transition: "all 0.15s", background: activeTab === tab.id ? "var(--accent)" : "transparent", color: activeTab === tab.id ? "white" : "var(--text-2)" }}>
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* ── TAB: EDIT PROFILE ── */}
//           {activeTab === "details" && (
//             <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
//               <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "20px" }}>Personal Details</h2>
//               <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//                 {profileMsg && (
//                   <div style={{ padding: "9px 12px", borderRadius: "6px", background: profileMsg.includes("!") ? "var(--green-bg)" : "var(--red-bg)", border: `1px solid ${profileMsg.includes("!") ? "var(--green)" : "var(--red)"}`, fontSize: "12px", color: profileMsg.includes("!") ? "var(--green)" : "var(--red)" }}>
//                     {profileMsg}
//                   </div>
//                 )}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                   <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Headline</label>
//                   <input value={profileData.title} onChange={e => setProfileData({ ...profileData, title: e.target.value })} placeholder="e.g. Senior Full Stack Engineer" style={inp} onFocus={onF} onBlur={onB} />
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                   <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>About</label>
//                   <textarea value={profileData.about} onChange={e => setProfileData({ ...profileData, about: e.target.value })} rows={4} placeholder="Tell us about your professional journey…" style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} onFocus={onF} onBlur={onB} />
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//                   <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)" }}>Skills <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(comma separated)</span></label>
//                   <input value={profileData.skills} onChange={e => setProfileData({ ...profileData, skills: e.target.value })} placeholder="React, Node.js, AWS, Python…" style={inp} onFocus={onF} onBlur={onB} />
//                 </div>
//                 <div>
//                   <button type="submit" disabled={loading}
//                     style={{ padding: "9px 22px", borderRadius: "6px", background: loading ? "var(--bg-subtle)" : "var(--accent)", color: loading ? "var(--text-3)" : "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
//                     {loading ? "Saving…" : "Save profile"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ── TAB: RESUME & AI ── */}
//           {activeTab === "resume" && (
//             <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

//               {/* Upload card */}
//               <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "24px" }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
//                   <div>
//                     <h2 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", display: "flex", alignItems: "center", gap: "8px" }}>
//                       Master Resume
//                       {resumeUrl && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />}
//                     </h2>
//                     <p style={{ fontSize: "12px", color: "var(--text-3)", marginTop: "2px" }}>Upload your latest PDF to unlock AI analysis</p>
//                   </div>
//                   {resumeUrl && (
//                     <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`} target="_blank" rel="noreferrer"
//                       style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
//                       <FileIcon /> View current
//                     </a>
//                   )}
//                 </div>

//                 <form onSubmit={handleUpload}>
//                   {!file ? (
//                     <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100px", border: "1.5px dashed var(--border-strong)", borderRadius: "8px", cursor: "pointer", background: "var(--bg-subtle)", transition: "border-color 0.15s" }}
//                       onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
//                       onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
//                     >
//                       <div style={{ color: "var(--text-3)", marginBottom: "6px" }}><UploadIcon /></div>
//                       <p style={{ fontSize: "12px", color: "var(--text-2)" }}><span style={{ color: "var(--accent)", fontWeight: 500 }}>Click to upload</span> or drag & drop</p>
//                       <p style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px" }}>PDF only, max 5MB</p>
//                       <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
//                     </label>
//                   ) : (
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px" }}>
//                       <div style={{ width: "32px", height: "32px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
//                         <FileIcon />
//                       </div>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
//                         <div style={{ fontSize: "11px", color: "var(--text-3)" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
//                       </div>
//                       <div style={{ display: "flex", gap: "7px" }}>
//                         <button type="submit" disabled={loading}
//                           style={{ padding: "6px 14px", borderRadius: "5px", background: "var(--accent)", color: "white", border: "none", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
//                           {loading ? `${uploadProgress}%` : "Upload"}
//                         </button>
//                         <button type="button" onClick={() => setFile(null)}
//                           style={{ width: "28px", height: "28px", borderRadius: "5px", background: "transparent", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                           <CloseIcon />
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {loading && (
//                     <div style={{ marginTop: "10px", height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
//                       <div style={{ height: "100%", background: "var(--accent)", borderRadius: "2px", width: `${uploadProgress}%`, transition: "width 0.3s" }} />
//                     </div>
//                   )}
//                   {message && !loading && (
//                     <p style={{ marginTop: "8px", fontSize: "12px", fontWeight: 500, color: message === "Success!" ? "var(--green)" : "var(--red)" }}>
//                       {message === "Success!" ? "✓ Resume uploaded successfully" : "✗ Upload failed"}
//                     </p>
//                   )}
//                 </form>
//               </div>

//               {/* AI Analysis card */}
//               <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
//                 {/* Top accent */}
//                 <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--purple))" }} />
//                 <div style={{ padding: "24px" }}>
//                   {!aiAnalysis ? (
//                     /* Empty state */
//                     <div style={{ textAlign: "center", padding: "16px 0" }}>
//                       <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "var(--accent)" }}>
//                         <ScanIcon />
//                       </div>
//                       <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-1)", marginBottom: "6px" }}>Evaluate your resume</h3>
//                       <p style={{ fontSize: "12px", color: "var(--text-3)", maxWidth: "360px", margin: "0 auto 20px", lineHeight: 1.6 }}>
//                         Compare your resume against a role to see your match score and missing keywords.
//                       </p>
//                       <div style={{ display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto" }}>
//                         <input
//                           type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)}
//                           placeholder="e.g. Frontend Developer"
//                           style={{ ...inp, flex: 1 }} onFocus={onF} onBlur={onB}
//                         />
//                         <button onClick={handleSelfCheck} disabled={analyzing}
//                           style={{ padding: "9px 18px", borderRadius: "6px", background: analyzing ? "var(--bg-subtle)" : "var(--text-1)", color: analyzing ? "var(--text-3)" : "var(--bg-surface)", border: "none", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, cursor: analyzing ? "not-allowed" : "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}>
//                           {analyzing ? (
//                             <><span style={{ width: "12px", height: "12px", border: "2px solid var(--text-3)", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "ax-spin 0.7s linear infinite" }} />Scanning…</>
//                           ) : "Analyze"}
//                         </button>
//                       </div>
//                       {!resumeUrl && (
//                         <p style={{ marginTop: "10px", fontSize: "11px", color: "var(--orange)", background: "var(--orange-bg)", display: "inline-block", padding: "3px 10px", borderRadius: "4px" }}>
//                           Upload a resume above first
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     /* Results */
//                     <div>
//                       {/* Score header */}
//                       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
//                         <div>
//                           <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>Analysis Report</h3>
//                           <p style={{ fontSize: "12px", color: "var(--text-3)" }}>
//                             Target: <span style={{ color: "var(--accent)", fontWeight: 500 }}>{targetRole || "General"}</span>
//                           </p>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px" }}>
//                           <div style={{ textAlign: "right" }}>
//                             <div style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Match Score</div>
//                             <div style={{ fontSize: "28px", fontWeight: 700, color: scoreColor(aiAnalysis.matchScore), fontFamily: "monospace", letterSpacing: "-0.02em" }}>
//                               {aiAnalysis.matchScore}%
//                             </div>
//                           </div>
//                           <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: scoreBg(aiAnalysis.matchScore), border: `1px solid ${scoreColor(aiAnalysis.matchScore)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: scoreColor(aiAnalysis.matchScore) }}>
//                             {scoreGrade(aiAnalysis.matchScore)}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Summary */}
//                       <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-mid)", borderRadius: "8px", padding: "14px 16px", marginBottom: "18px" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent)", marginBottom: "8px" }}>
//                           <SparklesIcon /> Executive Summary
//                         </div>
//                         <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.75 }}>
//                           <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
//                         </div>
//                       </div>

//                       {/* Skills grid */}
//                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
//                         <div>
//                           <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-2)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}>
//                             <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)" }} />Identified Strengths
//                           </div>
//                           <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                             {aiAnalysis.matchedSkills?.length > 0
//                               ? aiAnalysis.matchedSkills.map((s, i) => <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: 500, background: "var(--green-bg)", color: "var(--green)", border: "1px solid var(--green)" }}>{s}</span>)
//                               : <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>None matched</span>
//                             }
//                           </div>
//                         </div>
//                         <div>
//                           <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-2)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "5px" }}>
//                             <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--red)" }} />Missing Keywords
//                           </div>
//                           <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                             {aiAnalysis.missingRequiredSkills?.length > 0
//                               ? aiAnalysis.missingRequiredSkills.map((s, i) => <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11px", fontWeight: 500, background: "var(--red-bg)", color: "var(--red)", border: "1px solid var(--red)" }}>{s}</span>)
//                               : <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>No missing keywords!</span>
//                             }
//                           </div>
//                         </div>
//                       </div>

//                       {/* Re-scan */}
//                       <button onClick={() => setAiAnalysis(null)}
//                         style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", padding: "0" }}>
//                         <ScanIcon /> Start new scan
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ AVATAR MODAL ══ */}
//       {showAvatarModal && (
//         <div onClick={() => setShowAvatarModal(false)} style={{ position: "fixed", inset: 0, background: "var(--modal-overlay)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
//           <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px", width: "100%", maxWidth: "380px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
//               <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-1)" }}>Identity Forge</h3>
//               <button onClick={() => setShowAvatarModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)" }}><CloseIcon /></button>
//             </div>

//             {/* Avatar preview */}
//             <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid var(--accent-mid)", overflow: "hidden", margin: "0 auto 20px", background: "var(--bg-subtle)" }}>
//               <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" style={{ width: "100%", height: "100%" }} />
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
//               <button onClick={generateRandomAvatar}
//                 style={{ padding: "10px", borderRadius: "7px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-1)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
//                 <MagicIcon /> Randomize
//               </button>
//               <label style={{ padding: "10px", borderRadius: "7px", border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-1)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
//                 <UploadIcon /> Upload photo
//                 <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
//               </label>
//             </div>

//             <button onClick={saveGeneratedAvatar}
//               style={{ width: "100%", padding: "10px", borderRadius: "7px", background: "var(--accent)", color: "white", border: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
//               Confirm identity
//             </button>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes ax-spin { to { transform: rotate(360deg); } }
//         @media(max-width:768px) { .profile-grid { grid-template-columns: 1fr !important; } }
//       `}</style>
//     </div>
//   );
// }

// export default Profile;























//////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import axiosInstance from "../api/axiosInstance";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";

// /* ─── GOOGLE FONTS ─── */
// const FontLink = () => (
//   <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>
// );

// /* ─── DESIGN TOKENS ─── */
// const T = {
//   cream: "#F5F0E8",
//   parchment: "#EDE7D9",
//   sand: "#D6CBBA",
//   ink: "#1A1410",
//   inkMid: "#3D2E22",
//   inkLight: "#7A6A5A",
//   inkFaint: "#B0A090",
//   amber: "#C8861A",
//   amberLight: "#F5E6C8",
//   amberMid: "#E8C97A",
//   sage: "#5A7A5A",
//   sageBg: "#EBF0EB",
//   rose: "#A04040",
//   roseBg: "#F5EAEA",
//   border: "#D0C4B0",
//   borderDark: "#B8AA96",
//   shadow: "0 2px 16px rgba(26,20,16,0.08)",
//   shadowMd: "0 8px 32px rgba(26,20,16,0.12)",
//   serif: "'Playfair Display', Georgia, serif",
//   sans: "'DM Sans', sans-serif",
//   mono: "'DM Mono', monospace",
// };

// /* ─── ICONS (minimal line) ─── */
// const Icon = ({ d, size = 16 }) => (
//   <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
//     {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} strokeLinecap="round" strokeLinejoin="round" />) : <path d={d} strokeLinecap="round" strokeLinejoin="round" />}
//   </svg>
// );

// const Icons = {
//   upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8 12 3 7 8", "M12 3v12"],
//   file: ["M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", "M14 2v6h6"],
//   scan: ["M3 7V5a2 2 0 0 1 2-2h2", "M17 3h2a2 2 0 0 1 2 2v2", "M21 17v2a2 2 0 0 1-2 2h-2", "M7 21H5a2 2 0 0 1-2-2v-2"],
//   pencil: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z",
//   magic: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
//   close: ["M18 6 6 18", "M6 6l12 12"],
//   sparkle: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
//   arrow: "M5 12h14M12 5l7 7-7 7",
//   check: "M20 6 9 17l-5-5",
//   user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
//   briefcase: ["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 11h20", "M6 11V4h12v7"],
// };

// /* ─── SHARED STYLES ─── */
// const css = {
//   input: {
//     width: "100%", boxSizing: "border-box",
//     padding: "11px 14px",
//     background: "white",
//     border: `1.5px solid ${T.border}`,
//     borderRadius: "6px",
//     fontFamily: T.sans,
//     fontSize: "13.5px",
//     color: T.ink,
//     outline: "none",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//   },
//   label: {
//     display: "block",
//     fontFamily: T.sans,
//     fontSize: "11px",
//     fontWeight: 600,
//     letterSpacing: "0.07em",
//     textTransform: "uppercase",
//     color: T.inkLight,
//     marginBottom: "6px",
//   },
//   card: {
//     background: "white",
//     border: `1px solid ${T.border}`,
//     borderRadius: "12px",
//     boxShadow: T.shadow,
//   },
//   btn: {
//     fontFamily: T.sans,
//     fontWeight: 600,
//     fontSize: "13px",
//     cursor: "pointer",
//     border: "none",
//     borderRadius: "6px",
//     transition: "all 0.2s",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "7px",
//   },
// };

// /* ─── PILL TAG ─── */
// const Pill = ({ children, color = T.amber, bg = T.amberLight }) => (
//   <span style={{
//     padding: "3px 10px", borderRadius: "3px", fontSize: "11px", fontWeight: 600,
//     fontFamily: T.sans, letterSpacing: "0.03em",
//     background: bg, color,
//     border: `1px solid ${color}30`,
//   }}>{children}</span>
// );

// /* ─── DIVIDER ─── */
// const Divider = ({ margin = "20px 0" }) => (
//   <div style={{ margin, height: "1px", background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }} />
// );

// /* ─── SECTION HEADING ─── */
// const SectionHead = ({ title, sub, action }) => (
//   <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
//     <div>
//       <h2 style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.2 }}>{title}</h2>
//       {sub && <p style={{ fontFamily: T.sans, fontSize: "12.5px", color: T.inkLight, marginTop: "4px" }}>{sub}</p>}
//     </div>
//     {action}
//   </div>
// );

// /* ─── SCORE RING ─── */
// const ScoreRing = ({ score }) => {
//   const r = 36, circ = 2 * Math.PI * r;
//   const fill = (score / 100) * circ;
//   const color = score >= 80 ? T.sage : score >= 50 ? T.amber : T.rose;
//   const grade = score >= 80 ? "A+" : score >= 50 ? "B" : "C";
//   return (
//     <div style={{ position: "relative", width: "88px", height: "88px", flexShrink: 0 }}>
//       <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
//         <circle cx="44" cy="44" r={r} fill="none" stroke={T.parchment} strokeWidth="6" />
//         <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="6"
//           strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
//           style={{ transition: "stroke-dasharray 1s ease" }} />
//       </svg>
//       <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//         <span style={{ fontFamily: T.mono, fontSize: "15px", fontWeight: 500, color, lineHeight: 1 }}>{score}%</span>
//         <span style={{ fontFamily: T.serif, fontSize: "11px", color, fontStyle: "italic" }}>{grade}</span>
//       </div>
//     </div>
//   );
// };


// /* ══════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════ */
// function Profile() {
//   const { user, login } = useAuth();

//   const [activeTab, setActiveTab] = useState("resume");
//   const [showAvatarModal, setShowAvatarModal] = useState(false);
//   const [file, setFile] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState("");
//   const [aiAnalysis, setAiAnalysis] = useState(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [targetRole, setTargetRole] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [profileData, setProfileData] = useState({ title: "", about: "", skills: "", profilePicture: "" });
//   const [profileMsg, setProfileMsg] = useState("");
//   const [avatarSeed, setAvatarSeed] = useState("Felix");
//   const [avatarStyle, setAvatarStyle] = useState("adventurer");
//   const [dragOver, setDragOver] = useState(false);

//   const API_BASE_URL = import.meta.env.MODE === "production"
//     ? "https://axon-hire-mvp.onrender.com"
//     : "http://localhost:5000";

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get("/users/profile");
//         setResumeUrl(res.data.resumeUrl);
//         setProfileData({
//           title: res.data.title || "",
//           about: res.data.about || "",
//           skills: res.data.skills ? res.data.skills.join(", ") : "",
//           profilePicture: res.data.profilePicture || "",
//         });
//       } catch (err) { console.error(err); }
//     };
//     fetchProfile();
//     if (user) {
//       const saved = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
//       setAppliedJobs(saved);
//     }
//   }, [user]);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Select a file first");
//     const formData = new FormData();
//     formData.append("resume", file);
//     setLoading(true); setUploadProgress(0);
//     try {
//       const res = await axiosInstance.post("/users/upload-resume", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (pe) => setUploadProgress(Math.round((pe.loaded * 100) / pe.total)),
//       });
//       setResumeUrl(res.data.resumeUrl);
//       setMessage("Success!");
//       if (login) login(res.data.user);
//     } catch { setMessage("Failed."); }
//     finally { setLoading(false); setTimeout(() => setUploadProgress(0), 2000); }
//   };

//   const handleSelfCheck = async () => {
//     if (!resumeUrl) return alert("Upload resume first to use AI features.");
//     setAnalyzing(true);
//     try {
//       const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
//       const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole });
//       if (res.data.success) setAiAnalysis(res.data.analysis);
//     } catch { alert("Analysis failed."); }
//     finally { setAnalyzing(false); }
//   };

//   const handleSaveProfile = async (e) => {
//     e.preventDefault(); setLoading(true);
//     try {
//       const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
//       await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
//       setProfileMsg("saved");
//       setTimeout(() => setProfileMsg(""), 3000);
//     } catch { setProfileMsg("error"); }
//     finally { setLoading(false); }
//   };

//   const generateRandomAvatar = () => {
//     const seeds = ["Felix","Aneka","Milo","Bella","Jack","Luna","Zoe","Leo","Nova","Ash"];
//     const styles = ["adventurer","bottts","avataaars","lorelei","notionists","shapes"];
//     setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
//     setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
//   };

//   const saveGeneratedAvatar = async () => {
//     const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
//     setProfileData(prev => ({ ...prev, profilePicture: url }));
//     try {
//       await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
//       setShowAvatarModal(false);
//     } catch { alert("Failed to save avatar"); }
//   };

//   const handleImageUpload = async (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     const fd = new FormData();
//     fd.append("avatar", f);
//     try {
//       const res = await axiosInstance.post("/users/upload-avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
//       setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
//       setShowAvatarModal(false);
//     } catch { alert("Image upload failed"); }
//   };

//   const handleClearHistory = () => {
//     if (!user) return;
//     setAppliedJobs([]);
//     localStorage.removeItem(`appliedJobs_${user.email}`);
//   };

//   const getAvatarUrl = () => {
//     const pic = profileData.profilePicture;
//     if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
//     if (pic.startsWith("http")) return pic;
//     return `${API_BASE_URL}${pic}`;
//   };

//   const handleDrop = (e) => {
//     e.preventDefault(); setDragOver(false);
//     const f = e.dataTransfer.files[0];
//     if (f?.type === "application/pdf") setFile(f);
//   };

//   /* ── TABS CONFIG ── */
//   const tabs = [
//     { id: "resume", label: "Resume & AI" },
//     { id: "details", label: "Edit Profile" },
//   ];

//   return (
//     <>
//       <FontLink />
//       <style>{`
//         * { box-sizing: border-box; }
//         body { background: ${T.cream}; }
//         ::placeholder { color: ${T.sand}; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: ${T.parchment}; }
//         ::-webkit-scrollbar-thumb { background: ${T.sand}; border-radius: 2px; }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
//         @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
//         .profile-main { animation: fadeUp 0.5s ease both; }
//         .tab-panel { animation: fadeUp 0.3s ease both; }
//         .upload-zone:hover { border-color: ${T.amber} !important; background: ${T.amberLight} !important; }
//         .upload-zone.drag-active { border-color: ${T.amber} !important; background: ${T.amberLight} !important; transform: scale(1.01); }
//         .job-row:hover { background: ${T.parchment} !important; }
//         .btn-primary:hover { background: ${T.inkMid} !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,20,16,0.2) !important; }
//         .btn-ghost:hover { background: ${T.parchment} !important; }
//         .nav-tab:hover { color: ${T.ink} !important; }
//         .input-field:focus { border-color: ${T.amber} !important; box-shadow: 0 0 0 3px ${T.amberLight} !important; }
//       `}</style>

//       <div className="profile-main" style={{ minHeight: "100vh", background: T.cream, padding: "28px 20px 60px", fontFamily: T.sans }}>
        
//         {/* ── PAGE HEADER ── */}
//         <div style={{ maxWidth: "1080px", margin: "0 auto 28px" }}>
//           <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
//             <h1 style={{ fontFamily: T.serif, fontSize: "28px", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.02em" }}>
//               My Profile
//             </h1>
//             <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.amber, display: "inline-block", marginBottom: "4px" }} />
//             <span style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkLight }}>{user?.name}</span>
//           </div>
//           <div style={{ marginTop: "6px", height: "1px", background: `linear-gradient(90deg, ${T.borderDark}, transparent)` }} />
//         </div>

//         {/* ── LAYOUT ── */}
//         <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px", alignItems: "start" }} className="profile-grid">

//           {/* ════ LEFT SIDEBAR ════ */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

//             {/* Identity card */}
//             <div style={{ ...css.card, overflow: "hidden" }}>
//               {/* Decorative top stripe */}
//               <div style={{ height: "6px", background: `repeating-linear-gradient(90deg, ${T.amber} 0, ${T.amber} 12px, ${T.amberLight} 12px, ${T.amberLight} 24px)` }} />
              
//               <div style={{ padding: "24px 20px", textAlign: "center" }}>
//                 {/* Avatar */}
//                 <div style={{ position: "relative", display: "inline-block", marginBottom: "14px" }}>
//                   <div style={{
//                     width: "80px", height: "80px", borderRadius: "50%",
//                     border: `3px solid ${T.border}`,
//                     background: T.parchment,
//                     overflow: "hidden",
//                     margin: "0 auto",
//                     boxShadow: `0 4px 16px rgba(26,20,16,0.15)`,
//                   }}>
//                     <img src={getAvatarUrl()} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       onError={e => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`; }} />
//                   </div>
//                   <button onClick={() => setShowAvatarModal(true)} className="btn-ghost"
//                     style={{ position: "absolute", bottom: "0", right: "-2px", width: "24px", height: "24px", borderRadius: "50%", background: T.ink, border: `2px solid white`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", padding: 0 }}>
//                     <Icon d={Icons.pencil} size={10} />
//                   </button>
//                 </div>

//                 <div style={{ fontFamily: T.serif, fontSize: "18px", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>{user?.name}</div>
//                 <div style={{ fontFamily: T.sans, fontSize: "12px", color: T.amber, fontWeight: 500, marginTop: "3px" }}>
//                   {profileData.title || <span style={{ fontStyle: "italic", color: T.inkFaint }}>Add your headline</span>}
//                 </div>
//                 <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.inkFaint, marginTop: "4px" }}>{user?.email}</div>
                
//                 <Divider margin="14px 0" />

//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
//                   <div style={{ color: T.inkLight }}><Icon d={Icons.briefcase} size={13} /></div>
//                   <span style={{ fontFamily: T.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.inkLight }}>
//                     {user?.role === "recruiter" ? "Recruiter" : "Candidate"}
//                   </span>
//                 </div>

//                 {resumeUrl && (
//                   <>
//                     <Divider margin="14px 0" />
//                     <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`}
//                       target="_blank" rel="noreferrer"
//                       style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: T.sans, fontSize: "11.5px", fontWeight: 500, color: T.sage, textDecoration: "none" }}>
//                       <Icon d={Icons.file} size={12} /> View resume
//                       <span style={{ display: "inline-flex", color: T.sage }}><Icon d={Icons.arrow} size={11} /></span>
//                     </a>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Skills preview */}
//             {profileData.skills && (
//               <div style={{ ...css.card, padding: "16px 18px" }}>
//                 <div style={{ fontFamily: T.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: T.inkLight, marginBottom: "10px" }}>Skills</div>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                   {profileData.skills.split(",").slice(0, 10).map((s, i) => (
//                     <span key={i} style={{ padding: "3px 8px", borderRadius: "3px", fontSize: "11px", fontFamily: T.sans, fontWeight: 500, background: T.parchment, color: T.inkMid, border: `1px solid ${T.border}` }}>
//                       {s.trim()}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Applications history */}
//             <div style={{ ...css.card, overflow: "hidden" }}>
//               <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <span style={{ fontFamily: T.serif, fontSize: "14px", fontWeight: 700, color: T.ink, fontStyle: "italic" }}>Applications</span>
//                 {appliedJobs.length > 0 && (
//                   <button onClick={handleClearHistory} className="btn-ghost"
//                     style={{ fontFamily: T.sans, fontSize: "10.5px", color: T.rose, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>
//                     Clear all
//                   </button>
//                 )}
//               </div>

//               {appliedJobs.length === 0 ? (
//                 <div style={{ padding: "28px 18px", textAlign: "center" }}>
//                   <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: T.parchment, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: T.inkFaint }}>
//                     <Icon d={Icons.briefcase} size={16} />
//                   </div>
//                   <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, marginBottom: "10px", fontStyle: "italic" }}>No applications yet</p>
//                   <Link to="/jobs" style={{ fontFamily: T.sans, fontSize: "12px", color: T.amber, fontWeight: 600, textDecoration: "none" }}>
//                     Browse jobs →
//                   </Link>
//                 </div>
//               ) : (
//                 <div style={{ maxHeight: "260px", overflowY: "auto" }}>
//                   {appliedJobs.map((job, i) => (
//                     <div key={i} className="job-row" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 18px", borderBottom: `1px solid ${T.border}`, transition: "background 0.15s", cursor: "default" }}>
//                       <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: T.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: T.cream, fontFamily: T.serif, flexShrink: 0 }}>
//                         {job.company?.charAt(0)}
//                       </div>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
//                         <div style={{ fontFamily: T.sans, fontSize: "10.5px", color: T.inkFaint }}>{job.company}</div>
//                       </div>
//                       <Pill color={T.sage} bg={T.sageBg}>✓</Pill>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ════ RIGHT MAIN AREA ════ */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

//             {/* Tab nav — editorial style */}
//             <div style={{ display: "flex", gap: "0", background: "white", border: `1px solid ${T.border}`, borderRadius: "8px", overflow: "hidden", width: "fit-content", boxShadow: T.shadow }}>
//               {tabs.map((tab, i) => (
//                 <button key={tab.id} className="nav-tab"
//                   onClick={() => setActiveTab(tab.id)}
//                   style={{
//                     padding: "10px 24px",
//                     fontFamily: T.sans, fontSize: "13px", fontWeight: activeTab === tab.id ? 600 : 400,
//                     color: activeTab === tab.id ? T.ink : T.inkLight,
//                     background: activeTab === tab.id ? T.parchment : "white",
//                     border: "none",
//                     borderRight: i < tabs.length - 1 ? `1px solid ${T.border}` : "none",
//                     cursor: "pointer",
//                     transition: "all 0.15s",
//                     position: "relative",
//                     letterSpacing: activeTab === tab.id ? "-0.01em" : 0,
//                   }}>
//                   {tab.label}
//                   {activeTab === tab.id && (
//                     <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "24px", height: "2px", background: T.amber, borderRadius: "1px 1px 0 0" }} />
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* ── EDIT PROFILE TAB ── */}
//             {activeTab === "details" && (
//               <div className="tab-panel" style={{ ...css.card, padding: "28px 32px" }}>
//                 <SectionHead
//                   title="Personal Details"
//                   sub="This information appears on your public profile"
//                 />

//                 <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
//                   {profileMsg && (
//                     <div style={{
//                       padding: "10px 14px", borderRadius: "6px", fontSize: "12.5px", fontFamily: T.sans,
//                       background: profileMsg === "saved" ? T.sageBg : T.roseBg,
//                       border: `1px solid ${profileMsg === "saved" ? T.sage : T.rose}`,
//                       color: profileMsg === "saved" ? T.sage : T.rose,
//                       display: "flex", alignItems: "center", gap: "8px",
//                     }}>
//                       {profileMsg === "saved" ? <><Icon d={Icons.check} size={13} /> Profile saved successfully</> : <>✗ Failed to update profile</>}
//                     </div>
//                   )}

//                   <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
//                     <div>
//                       <label style={css.label}>Professional headline</label>
//                       <input className="input-field" value={profileData.title}
//                         onChange={e => setProfileData({ ...profileData, title: e.target.value })}
//                         placeholder="e.g. Senior Full Stack Engineer"
//                         style={css.input} />
//                     </div>

//                     <div>
//                       <label style={css.label}>About</label>
//                       <textarea className="input-field" value={profileData.about}
//                         onChange={e => setProfileData({ ...profileData, about: e.target.value })}
//                         rows={5} placeholder="Tell us about your professional journey…"
//                         style={{ ...css.input, resize: "vertical", lineHeight: 1.7 }} />
//                     </div>

//                     <div>
//                       <label style={css.label}>
//                         Skills
//                         <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: "5px", color: T.inkFaint }}>comma separated</span>
//                       </label>
//                       <input className="input-field" value={profileData.skills}
//                         onChange={e => setProfileData({ ...profileData, skills: e.target.value })}
//                         placeholder="React, Node.js, AWS, Python…"
//                         style={css.input} />
//                       {profileData.skills && (
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "8px" }}>
//                           {profileData.skills.split(",").filter(s => s.trim()).map((s, i) => (
//                             <span key={i} style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontFamily: T.sans, background: T.amberLight, color: T.amber, border: `1px solid ${T.amberMid}` }}>
//                               {s.trim()}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div style={{ paddingTop: "4px" }}>
//                     <button type="submit" disabled={loading} className="btn-primary"
//                       style={{ ...css.btn, background: T.ink, color: T.cream, padding: "10px 24px", boxShadow: "0 2px 8px rgba(26,20,16,0.15)", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
//                       {loading ? "Saving…" : <><Icon d={Icons.check} size={14} /> Save profile</>}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* ── RESUME & AI TAB ── */}
//             {activeTab === "resume" && (
//               <div className="tab-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

//                 {/* Upload card */}
//                 <div style={{ ...css.card, padding: "28px 32px" }}>
//                   <SectionHead
//                     title="Master Resume"
//                     sub="Upload your latest PDF CV to unlock AI-powered analysis"
//                     action={resumeUrl && (
//                       <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`}
//                         target="_blank" rel="noreferrer"
//                         style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: T.amber, textDecoration: "none" }}>
//                         <Icon d={Icons.file} size={13} /> View current
//                       </a>
//                     )}
//                   />

//                   <form onSubmit={handleUpload}>
//                     {!file ? (
//                       <label className="upload-zone"
//                         onDragOver={e => { e.preventDefault(); setDragOver(true); }}
//                         onDragLeave={() => setDragOver(false)}
//                         onDrop={handleDrop}
//                         style={{
//                           display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//                           width: "100%", height: "120px",
//                           border: `2px dashed ${dragOver ? T.amber : T.sand}`,
//                           borderRadius: "8px",
//                           cursor: "pointer",
//                           background: dragOver ? T.amberLight : T.parchment,
//                           transition: "all 0.2s",
//                         }}>
//                         <div style={{ color: T.inkLight, marginBottom: "8px" }}><Icon d={Icons.upload} size={22} /></div>
//                         <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkMid, margin: 0 }}>
//                           <span style={{ fontWeight: 600, color: T.amber }}>Click to upload</span> or drag & drop
//                         </p>
//                         <p style={{ fontFamily: T.sans, fontSize: "11px", color: T.inkFaint, marginTop: "4px" }}>PDF only · max 5MB</p>
//                         <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
//                       </label>
//                     ) : (
//                       <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: T.parchment, border: `1.5px solid ${T.amber}40`, borderRadius: "8px" }}>
//                         <div style={{ width: "36px", height: "44px", background: T.amberLight, border: `1px solid ${T.amberMid}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, flexShrink: 0 }}>
//                           <Icon d={Icons.file} size={16} />
//                         </div>
//                         <div style={{ flex: 1, minWidth: 0 }}>
//                           <div style={{ fontFamily: T.sans, fontSize: "13px", fontWeight: 500, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
//                           <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.inkFaint, marginTop: "2px" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
//                         </div>
//                         <div style={{ display: "flex", gap: "8px" }}>
//                           <button type="submit" disabled={loading} className="btn-primary"
//                             style={{ ...css.btn, background: T.ink, color: T.cream, padding: "8px 18px", fontSize: "12px" }}>
//                             {loading ? `${uploadProgress}%` : "Upload"}
//                           </button>
//                           <button type="button" onClick={() => setFile(null)} className="btn-ghost"
//                             style={{ ...css.btn, width: "32px", height: "32px", padding: 0, justifyContent: "center", background: "white", border: `1px solid ${T.border}`, color: T.inkLight }}>
//                             <Icon d={Icons.close} size={13} />
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {loading && (
//                       <div style={{ marginTop: "12px", height: "3px", background: T.parchment, borderRadius: "2px", overflow: "hidden" }}>
//                         <div style={{ height: "100%", background: T.amber, borderRadius: "2px", width: `${uploadProgress}%`, transition: "width 0.3s" }} />
//                       </div>
//                     )}

//                     {message && !loading && (
//                       <p style={{ marginTop: "10px", fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: message === "Success!" ? T.sage : T.rose }}>
//                         {message === "Success!" ? "✓ Resume uploaded successfully" : "✗ Upload failed. Please try again."}
//                       </p>
//                     )}
//                   </form>
//                 </div>

//                 {/* AI Analysis card */}
//                 <div style={{ ...css.card, overflow: "hidden" }}>
//                   {/* Decorative header bar */}
//                   <div style={{ padding: "14px 32px", borderBottom: `1px solid ${T.border}`, background: T.parchment, display: "flex", alignItems: "center", gap: "10px" }}>
//                     <div style={{ color: T.amber }}><Icon d={Icons.sparkle} size={15} /></div>
//                     <span style={{ fontFamily: T.serif, fontSize: "15px", fontWeight: 700, color: T.ink, fontStyle: "italic" }}>AI Resume Analyst</span>
//                     <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.inkFaint, marginLeft: "auto", letterSpacing: "0.05em" }}>Powered by AI</span>
//                   </div>

//                   <div style={{ padding: "28px 32px" }}>
//                     {!aiAnalysis ? (
//                       /* ─ EMPTY STATE ─ */
//                       <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
//                         <div style={{ flex: 1 }}>
//                           <h3 style={{ fontFamily: T.serif, fontSize: "22px", fontWeight: 700, color: T.ink, margin: "0 0 8px", lineHeight: 1.2 }}>
//                             How does your resume<br /><em>stack up?</em>
//                           </h3>
//                           <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkLight, lineHeight: 1.7, marginBottom: "20px" }}>
//                             Enter a target role and let our AI evaluate your resume—scoring your match, flagging missing keywords, and delivering an executive summary.
//                           </p>

//                           <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//                             <input className="input-field" type="text" value={targetRole}
//                               onChange={e => setTargetRole(e.target.value)}
//                               placeholder="e.g. Frontend Developer"
//                               style={{ ...css.input, flex: "1", minWidth: "180px" }}
//                               onKeyDown={e => e.key === "Enter" && handleSelfCheck()}
//                             />
//                             <button onClick={handleSelfCheck} disabled={analyzing} className="btn-primary"
//                               style={{ ...css.btn, background: T.ink, color: T.cream, padding: "11px 22px", fontSize: "13px", opacity: analyzing ? 0.7 : 1, cursor: analyzing ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
//                               {analyzing
//                                 ? <><span style={{ width: "12px", height: "12px", border: `2px solid ${T.cream}`, borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Scanning…</>
//                                 : <><Icon d={Icons.scan} size={14} />Analyze</>}
//                             </button>
//                           </div>

//                           {!resumeUrl && (
//                             <p style={{ marginTop: "10px", fontFamily: T.sans, fontSize: "11.5px", color: T.rose, background: T.roseBg, display: "inline-block", padding: "4px 10px", borderRadius: "4px", border: `1px solid ${T.rose}30` }}>
//                               Upload a resume above to enable analysis
//                             </p>
//                           )}
//                         </div>

//                         {/* Decorative score mockup */}
//                         <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", opacity: 0.25 }}>
//                           <ScoreRing score={82} />
//                           <div style={{ fontFamily: T.mono, fontSize: "10px", color: T.inkLight, textAlign: "center", lineHeight: 1.5 }}>
//                             match<br />score
//                           </div>
//                         </div>
//                       </div>

//                     ) : (
//                       /* ─ RESULTS ─ */
//                       <div style={{ animation: "fadeUp 0.4s ease both" }}>

//                         {/* Score row */}
//                         <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", background: T.parchment, borderRadius: "10px", border: `1px solid ${T.border}`, marginBottom: "22px" }}>
//                           <ScoreRing score={aiAnalysis.matchScore} />
//                           <div style={{ flex: 1 }}>
//                             <div style={{ fontFamily: T.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.inkLight, marginBottom: "4px" }}>Match Score</div>
//                             <div style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>
//                               {aiAnalysis.matchScore >= 80 ? "Excellent match" : aiAnalysis.matchScore >= 50 ? "Good match" : "Needs improvement"}
//                             </div>
//                             <div style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkLight, marginTop: "3px" }}>
//                               Target role: <span style={{ color: T.amber, fontWeight: 600 }}>{targetRole || "General"}</span>
//                             </div>
//                           </div>
//                           <button onClick={() => setAiAnalysis(null)} className="btn-ghost"
//                             style={{ ...css.btn, padding: "8px 14px", background: "white", border: `1px solid ${T.border}`, color: T.inkLight, fontSize: "11.5px", borderRadius: "6px" }}>
//                             <Icon d={Icons.scan} size={13} /> New scan
//                           </button>
//                         </div>

//                         {/* Summary */}
//                         <div style={{ marginBottom: "22px" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
//                             <div style={{ color: T.amber }}><Icon d={Icons.sparkle} size={13} /></div>
//                             <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkLight }}>Executive Summary</span>
//                           </div>
//                           <div style={{ fontFamily: T.sans, fontSize: "13.5px", color: T.inkMid, lineHeight: 1.8, padding: "16px 20px", background: T.amberLight, borderRadius: "8px", borderLeft: `3px solid ${T.amber}` }}>
//                             <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
//                           </div>
//                         </div>

//                         {/* Skills grid */}
//                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
//                           {/* Strengths */}
//                           <div style={{ padding: "16px 18px", background: T.sageBg, borderRadius: "8px", border: `1px solid ${T.sage}30` }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
//                               <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.sage, flexShrink: 0 }} />
//                               <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.sage }}>Strengths</span>
//                             </div>
//                             <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                               {aiAnalysis.matchedSkills?.length > 0
//                                 ? aiAnalysis.matchedSkills.map((s, i) => (
//                                   <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11.5px", fontFamily: T.sans, fontWeight: 500, background: "white", color: T.sage, border: `1px solid ${T.sage}40` }}>{s}</span>
//                                 ))
//                                 : <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, fontStyle: "italic" }}>None identified</span>}
//                             </div>
//                           </div>

//                           {/* Gaps */}
//                           <div style={{ padding: "16px 18px", background: T.roseBg, borderRadius: "8px", border: `1px solid ${T.rose}30` }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
//                               <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.rose, flexShrink: 0 }} />
//                               <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.rose }}>Gaps to fill</span>
//                             </div>
//                             <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
//                               {aiAnalysis.missingRequiredSkills?.length > 0
//                                 ? aiAnalysis.missingRequiredSkills.map((s, i) => (
//                                   <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11.5px", fontFamily: T.sans, fontWeight: 500, background: "white", color: T.rose, border: `1px solid ${T.rose}40` }}>{s}</span>
//                                 ))
//                                 : <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, fontStyle: "italic" }}>No gaps found — great job!</span>}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ════ AVATAR MODAL ════ */}
//         {showAvatarModal && (
//           <div onClick={() => setShowAvatarModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(26,20,16,0.65)", backdropFilter: "blur(6px)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
//             <div onClick={e => e.stopPropagation()} style={{ background: "white", border: `1px solid ${T.border}`, borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "360px", boxShadow: T.shadowMd, animation: "fadeUp 0.3s ease both" }}>

//               {/* Header */}
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
//                 <h3 style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, margin: 0, fontStyle: "italic" }}>Identity Forge</h3>
//                 <button onClick={() => setShowAvatarModal(false)} className="btn-ghost"
//                   style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.parchment, border: "none", cursor: "pointer", color: T.inkLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <Icon d={Icons.close} size={13} />
//                 </button>
//               </div>
//               <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, marginBottom: "22px" }}>Generate a unique avatar or upload a photo</p>

//               {/* Preview */}
//               <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: `3px solid ${T.border}`, overflow: "hidden", margin: "0 auto 22px", background: T.parchment, boxShadow: T.shadow }}>
//                 <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" style={{ width: "100%", height: "100%" }} />
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
//                 <button onClick={generateRandomAvatar} className="btn-ghost"
//                   style={{ ...css.btn, justifyContent: "center", padding: "11px", background: T.parchment, border: `1px solid ${T.border}`, color: T.ink, fontSize: "12.5px", borderRadius: "8px" }}>
//                   <Icon d={Icons.magic} size={13} /> Randomize
//                 </button>
//                 <label style={{ ...css.btn, justifyContent: "center", padding: "11px", background: T.parchment, border: `1px solid ${T.border}`, color: T.ink, fontSize: "12.5px", borderRadius: "8px", cursor: "pointer" }}>
//                   <Icon d={Icons.upload} size={13} /> Upload photo
//                   <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
//                 </label>
//               </div>

//               <button onClick={saveGeneratedAvatar} className="btn-primary"
//                 style={{ ...css.btn, width: "100%", justifyContent: "center", padding: "12px", background: T.ink, color: T.cream, fontSize: "13.5px", borderRadius: "8px", boxShadow: "0 4px 16px rgba(26,20,16,0.2)" }}>
//                 <Icon d={Icons.check} size={14} /> Confirm identity
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── Responsive ── */}
//         <style>{`
//           @media (max-width: 768px) {
//             .profile-grid { grid-template-columns: 1fr !important; }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }

// export default Profile;




import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

/* ─── GOOGLE FONTS ─── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>
);

/* ─── DESIGN TOKENS (Mapped to your global CSS variables!) ─── */
const T = {
  surface: "var(--bg-surface)",
  cream: "var(--bg-page)",
  parchment: "var(--bg-subtle)",
  sand: "var(--border-strong)",
  ink: "var(--text-1)",
  inkMid: "var(--text-2)",
  inkLight: "var(--text-3)",
  inkFaint: "var(--text-3)",
  amber: "var(--accent)",
  amberLight: "var(--accent-bg)",
  amberMid: "var(--accent-mid)",
  sage: "var(--green)",
  sageBg: "var(--green-bg)",
  rose: "var(--red)",
  roseBg: "var(--red-bg)",
  orange: "var(--orange)", // Added for scores
  orangeBg: "var(--orange-bg)",
  border: "var(--border)",
  borderDark: "var(--border-strong)",
  shadow: "var(--shadow-sm, 0 2px 16px rgba(0,0,0,0.08))",
  shadowMd: "var(--shadow-md, 0 8px 32px rgba(0,0,0,0.12))",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

/* ─── ICONS (minimal line) ─── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} strokeLinecap="round" strokeLinejoin="round" />) : <path d={d} strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

const Icons = {
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8 12 3 7 8", "M12 3v12"],
  file: ["M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", "M14 2v6h6"],
  scan: ["M3 7V5a2 2 0 0 1 2-2h2", "M17 3h2a2 2 0 0 1 2 2v2", "M21 17v2a2 2 0 0 1-2 2h-2", "M7 21H5a2 2 0 0 1-2-2v-2"],
  pencil: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z",
  magic: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
  close: ["M18 6 6 18", "M6 6l12 12"],
  sparkle: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6 9 17l-5-5",
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  briefcase: ["M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 11h20", "M6 11V4h12v7"],
};

/* ─── SHARED STYLES ─── */
const css = {
  input: {
    width: "100%", boxSizing: "border-box",
    padding: "11px 14px",
    background: T.surface,
    border: `1.5px solid ${T.borderDark}`,
    borderRadius: "6px",
    fontFamily: T.sans,
    fontSize: "13.5px",
    color: T.ink,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  label: {
    display: "block",
    fontFamily: T.sans,
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: T.inkLight,
    marginBottom: "6px",
  },
  card: {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: "12px",
    boxShadow: T.shadow,
  },
  btn: {
    fontFamily: T.sans,
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
  },
};

/* ─── PILL TAG ─── */
const Pill = ({ children, color = T.amber, bg = T.amberLight }) => (
  <span style={{
    padding: "3px 10px", borderRadius: "3px", fontSize: "11px", fontWeight: 600,
    fontFamily: T.sans, letterSpacing: "0.03em",
    background: bg, color,
    border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
  }}>{children}</span>
);

/* ─── DIVIDER ─── */
const Divider = ({ margin = "20px 0" }) => (
  <div style={{ margin, height: "1px", background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }} />
);

/* ─── SECTION HEADING ─── */
const SectionHead = ({ title, sub, action }) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
    <div>
      <h2 style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.2 }}>{title}</h2>
      {sub && <p style={{ fontFamily: T.sans, fontSize: "12.5px", color: T.inkLight, marginTop: "4px" }}>{sub}</p>}
    </div>
    {action}
  </div>
);

/* ─── SCORE RING ─── */
const ScoreRing = ({ score }) => {
  const r = 36, circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 80 ? T.sage : score >= 50 ? T.orange : T.rose;
  const grade = score >= 80 ? "A+" : score >= 50 ? "B" : "C";
  return (
    <div style={{ position: "relative", width: "88px", height: "88px", flexShrink: 0 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="44" cy="44" r={r} fill="none" stroke={T.parchment} strokeWidth="6" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: T.mono, fontSize: "15px", fontWeight: 500, color, lineHeight: 1 }}>{score}%</span>
        <span style={{ fontFamily: T.serif, fontSize: "11px", color, fontStyle: "italic" }}>{grade}</span>
      </div>
    </div>
  );
};


/* ══════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════ */
function Profile() {
  const { user, login } = useAuth();

  const [activeTab, setActiveTab] = useState("resume");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profileData, setProfileData] = useState({ title: "", about: "", skills: "", profilePicture: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("Felix");
  const [avatarStyle, setAvatarStyle] = useState("adventurer");
  const [dragOver, setDragOver] = useState(false);

  const API_BASE_URL = import.meta.env.MODE === "production"
    ? "https://axon-hire-mvp.onrender.com"
    : "http://localhost:5000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/profile");
        setResumeUrl(res.data.resumeUrl);
        setProfileData({
          title: res.data.title || "",
          about: res.data.about || "",
          skills: res.data.skills ? res.data.skills.join(", ") : "",
          profilePicture: res.data.profilePicture || "",
        });
      } catch (err) { console.error(err); }
    };
    fetchProfile();
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`appliedJobs_${user.email}`)) || [];
      setAppliedJobs(saved);
    }
  }, [user]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first");
    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true); setUploadProgress(0);
    try {
      const res = await axiosInstance.post("/users/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (pe) => setUploadProgress(Math.round((pe.loaded * 100) / pe.total)),
      });
      setResumeUrl(res.data.resumeUrl);
      setMessage("Success!");
      if (login) login(res.data.user);
    } catch { setMessage("Failed."); }
    finally { setLoading(false); setTimeout(() => setUploadProgress(0), 2000); }
  };

  const handleSelfCheck = async () => {
    if (!resumeUrl) return alert("Upload resume first to use AI features.");
    setAnalyzing(true);
    try {
      const fullUrl = resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`;
      const res = await axiosInstance.post("/ai/evaluate-myself", { resumeUrl: fullUrl, targetRole });
      if (res.data.success) setAiAnalysis(res.data.analysis);
    } catch { alert("Analysis failed."); }
    finally { setAnalyzing(false); }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const skillsArray = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
      await axiosInstance.put("/users/update-profile", { ...profileData, skills: skillsArray });
      setProfileMsg("saved");
      setTimeout(() => setProfileMsg(""), 3000);
    } catch { setProfileMsg("error"); }
    finally { setLoading(false); }
  };

  const generateRandomAvatar = () => {
    const seeds = ["Felix","Aneka","Milo","Bella","Jack","Luna","Zoe","Leo","Nova","Ash"];
    const styles = ["adventurer","bottts","avataaars","lorelei","notionists","shapes"];
    setAvatarSeed(seeds[Math.floor(Math.random() * seeds.length)] + Math.random());
    setAvatarStyle(styles[Math.floor(Math.random() * styles.length)]);
  };

  const saveGeneratedAvatar = async () => {
    const url = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;
    setProfileData(prev => ({ ...prev, profilePicture: url }));
    try {
      await axiosInstance.put("/users/update-profile", { ...profileData, profilePicture: url });
      setShowAvatarModal(false);
    } catch { alert("Failed to save avatar"); }
  };

  const handleImageUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const fd = new FormData();
    fd.append("avatar", f);
    try {
      const res = await axiosInstance.post("/users/upload-avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setProfileData(prev => ({ ...prev, profilePicture: res.data.profilePicture }));
      setShowAvatarModal(false);
    } catch { alert("Image upload failed"); }
  };

  const handleClearHistory = () => {
    if (!user) return;
    setAppliedJobs([]);
    localStorage.removeItem(`appliedJobs_${user.email}`);
  };

  const getAvatarUrl = () => {
    const pic = profileData.profilePicture;
    if (!pic) return `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`;
    if (pic.startsWith("http")) return pic;
    return `${API_BASE_URL}${pic}`;
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") setFile(f);
  };

  /* ── TABS CONFIG ── */
  const tabs = [
    { id: "resume", label: "Resume & AI" },
    { id: "details", label: "Edit Profile" },
  ];

  return (
    <>
      <FontLink />
      <style>{`
        * { box-sizing: border-box; }
        body { background: ${T.cream}; }
        ::placeholder { color: ${T.sand}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.parchment}; }
        ::-webkit-scrollbar-thumb { background: ${T.sand}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        .profile-main { animation: fadeUp 0.5s ease both; }
        .tab-panel { animation: fadeUp 0.3s ease both; }
        .upload-zone:hover { border-color: ${T.amber} !important; background: ${T.amberLight} !important; }
        .upload-zone.drag-active { border-color: ${T.amber} !important; background: ${T.amberLight} !important; transform: scale(1.01); }
        .job-row:hover { background: ${T.parchment} !important; }
        .btn-primary:hover { background: ${T.inkMid} !important; transform: translateY(-1px); box-shadow: ${T.shadowMd} !important; }
        .btn-ghost:hover { background: ${T.parchment} !important; }
        .nav-tab:hover { color: ${T.ink} !important; }
        .input-field:focus { border-color: ${T.amber} !important; box-shadow: 0 0 0 3px ${T.amberLight} !important; }
      `}</style>

      <div className="profile-main" style={{ minHeight: "100vh", background: T.cream, padding: "28px 20px 60px", fontFamily: T.sans }}>
        
        {/* ── PAGE HEADER ── */}
        <div style={{ maxWidth: "1080px", margin: "0 auto 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <h1 style={{ fontFamily: T.serif, fontSize: "28px", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.02em" }}>
              My Profile
            </h1>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.amber, display: "inline-block", marginBottom: "4px" }} />
            <span style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkLight }}>{user?.name}</span>
          </div>
          <div style={{ marginTop: "6px", height: "1px", background: `linear-gradient(90deg, ${T.borderDark}, transparent)` }} />
        </div>

        {/* ── LAYOUT ── */}
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px", alignItems: "start" }} className="profile-grid">

          {/* ════ LEFT SIDEBAR ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Identity card */}
            <div style={{ ...css.card, overflow: "hidden" }}>
              {/* Decorative top stripe */}
              <div style={{ height: "6px", background: `repeating-linear-gradient(90deg, ${T.amber} 0, ${T.amber} 12px, ${T.amberLight} 12px, ${T.amberLight} 24px)` }} />
              
              <div style={{ padding: "24px 20px", textAlign: "center" }}>
                {/* Avatar */}
                <div style={{ position: "relative", display: "inline-block", marginBottom: "14px" }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    border: `3px solid ${T.surface}`,
                    background: T.parchment,
                    overflow: "hidden",
                    margin: "0 auto",
                    boxShadow: T.shadow,
                  }}>
                    <img src={getAvatarUrl()} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`; }} />
                  </div>
                  <button onClick={() => setShowAvatarModal(true)} className="btn-ghost"
                    style={{ position: "absolute", bottom: "0", right: "-2px", width: "24px", height: "24px", borderRadius: "50%", background: T.amber, border: `2px solid ${T.surface}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", padding: 0 }}>
                    <Icon d={Icons.pencil} size={10} />
                  </button>
                </div>

                <div style={{ fontFamily: T.serif, fontSize: "18px", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>{user?.name}</div>
                <div style={{ fontFamily: T.sans, fontSize: "12px", color: T.amber, fontWeight: 500, marginTop: "3px" }}>
                  {profileData.title || <span style={{ fontStyle: "italic", color: T.inkFaint }}>Add your headline</span>}
                </div>
                <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.inkFaint, marginTop: "4px" }}>{user?.email}</div>
                
                <Divider margin="14px 0" />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <div style={{ color: T.inkLight }}><Icon d={Icons.briefcase} size={13} /></div>
                  <span style={{ fontFamily: T.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.inkLight }}>
                    {user?.role === "recruiter" ? "Recruiter" : "Candidate"}
                  </span>
                </div>

                {resumeUrl && (
                  <>
                    <Divider margin="14px 0" />
                    <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`}
                      target="_blank" rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: T.sans, fontSize: "11.5px", fontWeight: 500, color: T.sage, textDecoration: "none" }}>
                      <Icon d={Icons.file} size={12} /> View resume
                      <span style={{ display: "inline-flex", color: T.sage }}><Icon d={Icons.arrow} size={11} /></span>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Skills preview */}
            {profileData.skills && (
              <div style={{ ...css.card, padding: "16px 18px" }}>
                <div style={{ fontFamily: T.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: T.inkLight, marginBottom: "10px" }}>Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {profileData.skills.split(",").slice(0, 10).map((s, i) => (
                    <span key={i} style={{ padding: "3px 8px", borderRadius: "3px", fontSize: "11px", fontFamily: T.sans, fontWeight: 500, background: T.parchment, color: T.inkMid, border: `1px solid ${T.border}` }}>
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applications history */}
            <div style={{ ...css.card, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.serif, fontSize: "14px", fontWeight: 700, color: T.ink, fontStyle: "italic" }}>Applications</span>
                {appliedJobs.length > 0 && (
                  <button onClick={handleClearHistory} className="btn-ghost"
                    style={{ fontFamily: T.sans, fontSize: "10.5px", color: T.rose, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>
                    Clear all
                  </button>
                )}
              </div>

              {appliedJobs.length === 0 ? (
                <div style={{ padding: "28px 18px", textAlign: "center" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: T.parchment, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: T.inkFaint }}>
                    <Icon d={Icons.briefcase} size={16} />
                  </div>
                  <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, marginBottom: "10px", fontStyle: "italic" }}>No applications yet</p>
                  <Link to="/jobs" style={{ fontFamily: T.sans, fontSize: "12px", color: T.amber, fontWeight: 600, textDecoration: "none" }}>
                    Browse jobs →
                  </Link>
                </div>
              ) : (
                <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                  {appliedJobs.map((job, i) => (
                    <div key={i} className="job-row" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 18px", borderBottom: `1px solid ${T.border}`, transition: "background 0.15s", cursor: "default" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: T.amber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "white", fontFamily: T.serif, flexShrink: 0 }}>
                        {job.company?.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.title}</div>
                        <div style={{ fontFamily: T.sans, fontSize: "10.5px", color: T.inkFaint }}>{job.company}</div>
                      </div>
                      <Pill color={T.sage} bg={T.sageBg}>✓</Pill>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ════ RIGHT MAIN AREA ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Tab nav — editorial style */}
            <div style={{ display: "flex", gap: "0", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", overflow: "hidden", width: "fit-content", boxShadow: T.shadow }}>
              {tabs.map((tab, i) => (
                <button key={tab.id} className="nav-tab"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "10px 24px",
                    fontFamily: T.sans, fontSize: "13px", fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? T.ink : T.inkLight,
                    background: activeTab === tab.id ? T.parchment : T.surface,
                    border: "none",
                    borderRight: i < tabs.length - 1 ? `1px solid ${T.border}` : "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    position: "relative",
                    letterSpacing: activeTab === tab.id ? "-0.01em" : 0,
                  }}>
                  {tab.label}
                  {activeTab === tab.id && (
                    <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "24px", height: "2px", background: T.amber, borderRadius: "1px 1px 0 0" }} />
                  )}
                </button>
              ))}
            </div>

            {/* ── EDIT PROFILE TAB ── */}
            {activeTab === "details" && (
              <div className="tab-panel" style={{ ...css.card, padding: "28px 32px" }}>
                <SectionHead
                  title="Personal Details"
                  sub="This information appears on your public profile"
                />

                <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {profileMsg && (
                    <div style={{
                      padding: "10px 14px", borderRadius: "6px", fontSize: "12.5px", fontFamily: T.sans,
                      background: profileMsg === "saved" ? T.sageBg : T.roseBg,
                      border: `1px solid ${profileMsg === "saved" ? T.sage : T.rose}`,
                      color: profileMsg === "saved" ? T.sage : T.rose,
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      {profileMsg === "saved" ? <><Icon d={Icons.check} size={13} /> Profile saved successfully</> : <>✗ Failed to update profile</>}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                    <div>
                      <label style={css.label}>Professional headline</label>
                      <input className="input-field" value={profileData.title}
                        onChange={e => setProfileData({ ...profileData, title: e.target.value })}
                        placeholder="e.g. Senior Full Stack Engineer"
                        style={css.input} />
                    </div>

                    <div>
                      <label style={css.label}>About</label>
                      <textarea className="input-field" value={profileData.about}
                        onChange={e => setProfileData({ ...profileData, about: e.target.value })}
                        rows={5} placeholder="Tell us about your professional journey…"
                        style={{ ...css.input, resize: "vertical", lineHeight: 1.7 }} />
                    </div>

                    <div>
                      <label style={css.label}>
                        Skills
                        <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: "5px", color: T.inkFaint }}>comma separated</span>
                      </label>
                      <input className="input-field" value={profileData.skills}
                        onChange={e => setProfileData({ ...profileData, skills: e.target.value })}
                        placeholder="React, Node.js, AWS, Python…"
                        style={css.input} />
                      {profileData.skills && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "8px" }}>
                          {profileData.skills.split(",").filter(s => s.trim()).map((s, i) => (
                            <span key={i} style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontFamily: T.sans, background: T.amberLight, color: T.amber, border: `1px solid ${T.amberMid}` }}>
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ paddingTop: "4px" }}>
                    <button type="submit" disabled={loading} className="btn-primary"
                      style={{ ...css.btn, background: T.amber, color: "white", padding: "10px 24px", boxShadow: T.shadow, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                      {loading ? "Saving…" : <><Icon d={Icons.check} size={14} /> Save profile</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── RESUME & AI TAB ── */}
            {activeTab === "resume" && (
              <div className="tab-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Upload card */}
                <div style={{ ...css.card, padding: "28px 32px" }}>
                  <SectionHead
                    title="Master Resume"
                    sub="Upload your latest PDF CV to unlock AI-powered analysis"
                    action={resumeUrl && (
                      <a href={resumeUrl.startsWith("http") ? resumeUrl : `${API_BASE_URL}${resumeUrl}`}
                        target="_blank" rel="noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: T.amber, textDecoration: "none" }}>
                        <Icon d={Icons.file} size={13} /> View current
                      </a>
                    )}
                  />

                  <form onSubmit={handleUpload}>
                    {!file ? (
                      <label className="upload-zone"
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          width: "100%", height: "120px",
                          border: `2px dashed ${dragOver ? T.amber : T.borderDark}`,
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: dragOver ? T.amberLight : T.parchment,
                          transition: "all 0.2s",
                        }}>
                        <div style={{ color: T.inkLight, marginBottom: "8px" }}><Icon d={Icons.upload} size={22} /></div>
                        <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkMid, margin: 0 }}>
                          <span style={{ fontWeight: 600, color: T.amber }}>Click to upload</span> or drag & drop
                        </p>
                        <p style={{ fontFamily: T.sans, fontSize: "11px", color: T.inkFaint, marginTop: "4px" }}>PDF only · max 5MB</p>
                        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                      </label>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: T.parchment, border: `1.5px solid color-mix(in srgb, ${T.amber} 40%, transparent)`, borderRadius: "8px" }}>
                        <div style={{ width: "36px", height: "44px", background: T.amberLight, border: `1px solid ${T.amberMid}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, flexShrink: 0 }}>
                          <Icon d={Icons.file} size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: T.sans, fontSize: "13px", fontWeight: 500, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
                          <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.inkFaint, marginTop: "2px" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button type="submit" disabled={loading} className="btn-primary"
                            style={{ ...css.btn, background: T.amber, color: "white", padding: "8px 18px", fontSize: "12px" }}>
                            {loading ? `${uploadProgress}%` : "Upload"}
                          </button>
                          <button type="button" onClick={() => setFile(null)} className="btn-ghost"
                            style={{ ...css.btn, width: "32px", height: "32px", padding: 0, justifyContent: "center", background: T.surface, border: `1px solid ${T.border}`, color: T.inkLight }}>
                            <Icon d={Icons.close} size={13} />
                          </button>
                        </div>
                      </div>
                    )}

                    {loading && (
                      <div style={{ marginTop: "12px", height: "3px", background: T.parchment, borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: T.amber, borderRadius: "2px", width: `${uploadProgress}%`, transition: "width 0.3s" }} />
                      </div>
                    )}

                    {message && !loading && (
                      <p style={{ marginTop: "10px", fontFamily: T.sans, fontSize: "12px", fontWeight: 500, color: message === "Success!" ? T.sage : T.rose }}>
                        {message === "Success!" ? "✓ Resume uploaded successfully" : "✗ Upload failed. Please try again."}
                      </p>
                    )}
                  </form>
                </div>

                {/* AI Analysis card */}
                <div style={{ ...css.card, overflow: "hidden" }}>
                  {/* Decorative header bar */}
                  <div style={{ padding: "14px 32px", borderBottom: `1px solid ${T.border}`, background: T.parchment, display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ color: T.amber }}><Icon d={Icons.sparkle} size={15} /></div>
                    <span style={{ fontFamily: T.serif, fontSize: "15px", fontWeight: 700, color: T.ink, fontStyle: "italic" }}>AI Resume Analyst</span>
                    <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.inkFaint, marginLeft: "auto", letterSpacing: "0.05em" }}>Powered by AI</span>
                  </div>

                  <div style={{ padding: "28px 32px" }}>
                    {!aiAnalysis ? (
                      /* ─ EMPTY STATE ─ */
                      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: T.serif, fontSize: "22px", fontWeight: 700, color: T.ink, margin: "0 0 8px", lineHeight: 1.2 }}>
                            How does your resume<br /><em>stack up?</em>
                          </h3>
                          <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.inkLight, lineHeight: 1.7, marginBottom: "20px" }}>
                            Enter a target role and let our AI evaluate your resume—scoring your match, flagging missing keywords, and delivering an executive summary.
                          </p>

                          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <input className="input-field" type="text" value={targetRole}
                              onChange={e => setTargetRole(e.target.value)}
                              placeholder="e.g. Frontend Developer"
                              style={{ ...css.input, flex: "1", minWidth: "180px" }}
                              onKeyDown={e => e.key === "Enter" && handleSelfCheck()}
                            />
                            <button onClick={handleSelfCheck} disabled={analyzing} className="btn-primary"
                              style={{ ...css.btn, background: T.ink, color: T.surface, padding: "11px 22px", fontSize: "13px", opacity: analyzing ? 0.7 : 1, cursor: analyzing ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
                              {analyzing
                                ? <><span style={{ width: "12px", height: "12px", border: `2px solid ${T.surface}`, borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Scanning…</>
                                : <><Icon d={Icons.scan} size={14} />Analyze</>}
                            </button>
                          </div>

                          {!resumeUrl && (
                            <p style={{ marginTop: "10px", fontFamily: T.sans, fontSize: "11.5px", color: T.rose, background: T.roseBg, display: "inline-block", padding: "4px 10px", borderRadius: "4px", border: `1px solid color-mix(in srgb, ${T.rose} 30%, transparent)` }}>
                              Upload a resume above to enable analysis
                            </p>
                          )}
                        </div>

                        {/* Decorative score mockup */}
                        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", opacity: 0.25 }}>
                          <ScoreRing score={82} />
                          <div style={{ fontFamily: T.mono, fontSize: "10px", color: T.inkLight, textAlign: "center", lineHeight: 1.5 }}>
                            match<br />score
                          </div>
                        </div>
                      </div>

                    ) : (
                      /* ─ RESULTS ─ */
                      <div style={{ animation: "fadeUp 0.4s ease both" }}>

                        {/* Score row */}
                        <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", background: T.parchment, borderRadius: "10px", border: `1px solid ${T.border}`, marginBottom: "22px" }}>
                          <ScoreRing score={aiAnalysis.matchScore} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: T.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: T.inkLight, marginBottom: "4px" }}>Match Score</div>
                            <div style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>
                              {aiAnalysis.matchScore >= 80 ? "Excellent match" : aiAnalysis.matchScore >= 50 ? "Good match" : "Needs improvement"}
                            </div>
                            <div style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkLight, marginTop: "3px" }}>
                              Target role: <span style={{ color: T.amber, fontWeight: 600 }}>{targetRole || "General"}</span>
                            </div>
                          </div>
                          <button onClick={() => setAiAnalysis(null)} className="btn-ghost"
                            style={{ ...css.btn, padding: "8px 14px", background: T.surface, border: `1px solid ${T.border}`, color: T.inkLight, fontSize: "11.5px", borderRadius: "6px" }}>
                            <Icon d={Icons.scan} size={13} /> New scan
                          </button>
                        </div>

                        {/* Summary */}
                        <div style={{ marginBottom: "22px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                            <div style={{ color: T.amber }}><Icon d={Icons.sparkle} size={13} /></div>
                            <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkLight }}>Executive Summary</span>
                          </div>
                          <div style={{ fontFamily: T.sans, fontSize: "13.5px", color: T.inkMid, lineHeight: 1.8, padding: "16px 20px", background: T.amberLight, borderRadius: "8px", borderLeft: `3px solid ${T.amber}` }}>
                            <ReactMarkdown>{aiAnalysis.summary}</ReactMarkdown>
                          </div>
                        </div>

                        {/* Skills grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                          {/* Strengths */}
                          <div style={{ padding: "16px 18px", background: T.sageBg, borderRadius: "8px", border: `1px solid color-mix(in srgb, ${T.sage} 30%, transparent)` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.sage, flexShrink: 0 }} />
                              <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.sage }}>Strengths</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                              {aiAnalysis.matchedSkills?.length > 0
                                ? aiAnalysis.matchedSkills.map((s, i) => (
                                  <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11.5px", fontFamily: T.sans, fontWeight: 500, background: T.surface, color: T.sage, border: `1px solid color-mix(in srgb, ${T.sage} 40%, transparent)` }}>{s}</span>
                                ))
                                : <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, fontStyle: "italic" }}>None identified</span>}
                            </div>
                          </div>

                          {/* Gaps */}
                          <div style={{ padding: "16px 18px", background: T.roseBg, borderRadius: "8px", border: `1px solid color-mix(in srgb, ${T.rose} 30%, transparent)` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.rose, flexShrink: 0 }} />
                              <span style={{ fontFamily: T.sans, fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.rose }}>Gaps to fill</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                              {aiAnalysis.missingRequiredSkills?.length > 0
                                ? aiAnalysis.missingRequiredSkills.map((s, i) => (
                                  <span key={i} style={{ padding: "3px 9px", borderRadius: "3px", fontSize: "11.5px", fontFamily: T.sans, fontWeight: 500, background: T.surface, color: T.rose, border: `1px solid color-mix(in srgb, ${T.rose} 40%, transparent)` }}>{s}</span>
                                ))
                                : <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, fontStyle: "italic" }}>No gaps found — great job!</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ════ AVATAR MODAL ════ */}
        {showAvatarModal && (
          <div onClick={() => setShowAvatarModal(false)} style={{ position: "fixed", inset: 0, background: "var(--modal-overlay, rgba(0,0,0,0.65))", backdropFilter: "blur(6px)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "360px", boxShadow: T.shadowMd, animation: "fadeUp 0.3s ease both" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <h3 style={{ fontFamily: T.serif, fontSize: "20px", fontWeight: 700, color: T.ink, margin: 0, fontStyle: "italic" }}>Identity Forge</h3>
                <button onClick={() => setShowAvatarModal(false)} className="btn-ghost"
                  style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.parchment, border: "none", cursor: "pointer", color: T.inkLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon d={Icons.close} size={13} />
                </button>
              </div>
              <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.inkFaint, marginBottom: "22px" }}>Generate a unique avatar or upload a photo</p>

              {/* Preview */}
              <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: `3px solid ${T.border}`, overflow: "hidden", margin: "0 auto 22px", background: T.parchment, boxShadow: T.shadow }}>
                <img src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`} alt="Preview" style={{ width: "100%", height: "100%" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <button onClick={generateRandomAvatar} className="btn-ghost"
                  style={{ ...css.btn, justifyContent: "center", padding: "11px", background: T.parchment, border: `1px solid ${T.border}`, color: T.ink, fontSize: "12.5px", borderRadius: "8px" }}>
                  <Icon d={Icons.magic} size={13} /> Randomize
                </button>
                <label style={{ ...css.btn, justifyContent: "center", padding: "11px", background: T.parchment, border: `1px solid ${T.border}`, color: T.ink, fontSize: "12.5px", borderRadius: "8px", cursor: "pointer" }}>
                  <Icon d={Icons.upload} size={13} /> Upload photo
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                </label>
              </div>

              <button onClick={saveGeneratedAvatar} className="btn-primary"
                style={{ ...css.btn, width: "100%", justifyContent: "center", padding: "12px", background: T.amber, color: "white", fontSize: "13.5px", borderRadius: "8px", boxShadow: T.shadowMd }}>
                <Icon d={Icons.check} size={14} /> Confirm identity
              </button>
            </div>
          </div>
        )}

        {/* ── Responsive ── */}
        <style>{`
          @media (max-width: 768px) {
            .profile-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}

export default Profile;