

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDebounce from "../hooks/useDebounce";

const JOBS_PER_PAGE = 12;

// ─── ICONS ───
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const SalaryIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const BookmarkIcon = ({ filled }) => (
  <svg width="13" height="13" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
    style={{ color: filled ? "var(--accent)" : "var(--text-3)" }}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const GridIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const ListIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const BellIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

// ─── SKELETON CARD ───
const SkeletonCard = () => (
  <div style={{
    background: "var(--bg-surface)", border: "1px solid var(--border)",
    borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px",
  }}>
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      <div className="ax-skeleton" style={{ width: "38px", height: "38px", borderRadius: "8px", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
        <div className="ax-skeleton" style={{ height: "12px", width: "55%", borderRadius: "3px" }} />
        <div className="ax-skeleton" style={{ height: "14px", width: "75%", borderRadius: "3px" }} />
      </div>
    </div>
    <div style={{ display: "flex", gap: "6px" }}>
      <div className="ax-skeleton" style={{ height: "10px", width: "70px", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "10px", width: "50px", borderRadius: "3px" }} />
    </div>
    <div style={{ display: "flex", gap: "5px" }}>
      {[50, 60, 45].map((w, i) => (
        <div key={i} className="ax-skeleton" style={{ height: "20px", width: `${w}px`, borderRadius: "3px" }} />
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
      <div className="ax-skeleton" style={{ height: "13px", width: "80px", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "28px", width: "64px", borderRadius: "4px" }} />
    </div>
  </div>
);

// ─── JOB ALERT (same logic, new style) ───
function JobAlert() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setStatus("loading");
    setMsg("");
    try {
      await axiosInstance.post("/alerts/subscribe", { keywords: [keyword] });
      setStatus("success");
      setMsg(`You'll be notified when "${keyword}" jobs are posted.`);
      setKeyword("");
      setTimeout(() => { setStatus("idle"); setMsg(""); }, 4000);
    } catch (err) {
      setStatus("error");
      setMsg(err.response?.status === 401 ? "Sign in to subscribe to alerts." : "Failed. Try again.");
    }
  };

  return (
    <div style={{
      background: "var(--bg-surface)", border: "1px solid var(--border)",
      borderRadius: "10px", padding: "16px 20px", marginBottom: "16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "16px", flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "var(--accent-bg)", border: "1px solid var(--accent-mid)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--accent)", flexShrink: 0,
        }}>
          <BellIcon />
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)" }}>Get job alerts</div>
          <div style={{ fontSize: "11px", color: "var(--text-3)" }}>Email notifications when new roles match your skill</div>
        </div>
      </div>

      <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "7px", flex: 1, maxWidth: "380px" }}>
        <input
          type="text"
          placeholder="Skill (e.g. React, Python)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1, padding: "7px 12px", borderRadius: "5px",
            border: "1px solid var(--border-strong)", background: "var(--bg-subtle)",
            color: "var(--text-1)", fontFamily: "Inter, sans-serif", fontSize: "12px", outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          style={{
            padding: "7px 16px", borderRadius: "5px", border: "none",
            background: status === "success" ? "var(--green-bg)" : "var(--accent)",
            color: status === "success" ? "var(--green)" : "white",
            fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500,
            cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s",
          }}
        >
          {status === "loading" ? "Saving…" : status === "success" ? "Subscribed!" : "Notify me"}
        </button>
      </form>

      {msg && (
        <div style={{
          width: "100%", fontSize: "11px", fontWeight: 500,
          color: status === "success" ? "var(--green)" : "var(--red)",
          paddingTop: "4px",
        }}>{msg}</div>
      )}
    </div>
  );
}

// ─── JOB CARD ───
function JobCard({ job, applied, isSaved, onApply, onToggleSave, onClick }) {
  const { title, company, location, salary, requirements, description } = job;
  const [hover, setHover] = useState(false);

  // Color based on first letter of company
  const colors = ["#0057b8","#0891b2","#7c3aed","#16a34a","#d97706","#be185d","#dc2626","#0e7490"];
  const colorIndex = (company?.charCodeAt(0) || 0) % colors.length;
  const logoColor = colors[colorIndex];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg-surface)",
        border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "10px", padding: "18px", cursor: "pointer",
        transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
        transform: hover ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow)" : "none",
        display: "flex", flexDirection: "column", gap: "11px", position: "relative",
      }}
    >
      {/* Card top */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
        {/* Company logo */}
        <div style={{
          width: "38px", height: "38px", borderRadius: "8px",
          background: logoColor, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "14px", fontWeight: 700,
          color: "white", flexShrink: 0, border: "1px solid rgba(0,0,0,0.08)",
        }}>
          {company?.charAt(0) || "?"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 500, marginBottom: "2px" }}>
            {company}
          </div>
          <div style={{
            fontSize: "14px", fontWeight: 600, color: hover ? "var(--accent)" : "var(--text-1)",
            lineHeight: 1.3, letterSpacing: "-0.01em", transition: "color 0.15s",
          }}>
            {title}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(job._id); }}
          style={{
            width: "26px", height: "26px", borderRadius: "4px",
            border: `1px solid ${isSaved ? "var(--accent)" : "var(--border)"}`,
            background: isSaved ? "var(--accent-bg)" : "var(--bg-surface)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
          }}
          title={isSaved ? "Unsave" : "Save job"}
        >
          <BookmarkIcon filled={isSaved} />
        </button>
      </div>

      {/* Location + type */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--text-2)" }}>
          <LocationIcon />{location || "Remote"}
        </span>
        <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
     <span style={{ fontSize: "11px", color: "var(--text-2)" }}>{job.type || "Full-time"}</span>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {requirements && requirements.length > 0 ? (
          <>
            {requirements.slice(0, 3).map((skill, i) => (
              <span key={i} className="ax-skill-tag">{skill}</span>
            ))}
            {requirements.length > 3 && (
              <span className="ax-skill-tag" style={{ color: "var(--text-3)" }}>
                +{requirements.length - 3}
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize: "11px", color: "var(--text-3)", fontStyle: "italic" }}>No skills listed</span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "10px", borderTop: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, color: "var(--green)" }}>
          <SalaryIcon />{salary || "Not disclosed"}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); if (!applied) onApply(); }}
          disabled={applied}
          style={{
            padding: "5px 14px", borderRadius: "4px", fontSize: "11px", fontWeight: 600,
            border: "none", cursor: applied ? "default" : "pointer",
            background: applied ? "var(--bg-subtle)" : "var(--accent)",
            color: applied ? "var(--text-3)" : "white",
            fontFamily: "Inter, sans-serif", transition: "all 0.15s",
            display: "flex", alignItems: "center", gap: "5px",
          }}
        >
          {applied ? <><CheckIcon />Applied</> : "Apply now"}
        </button>
      </div>
    </div>
  );
}

// ─── JOB ROW (list view) ───
function JobRow({ job, applied, isSaved, onApply, onToggleSave, onClick }) {
  const colors = ["#0057b8","#0891b2","#7c3aed","#16a34a","#d97706","#be185d","#dc2626","#0e7490"];
  const logoColor = colors[(job.company?.charCodeAt(0) || 0) % colors.length];

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: "10px", padding: "14px 18px", cursor: "pointer",
        transition: "all 0.15s", display: "grid",
        gridTemplateColumns: "38px 1fr auto", gap: "12px", alignItems: "center",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: logoColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "white" }}>
        {job.company?.charAt(0)}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>{job.title}</div>
        <div style={{ fontSize: "11px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span>{job.company}</span>
          <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
          <span>{job.location || "Remote"}</span>
          <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
<span>{job.type || "Full-time"}</span>
          <span style={{ width: "2px", height: "2px", background: "var(--text-3)", borderRadius: "50%" }} />
          <span>{job.salary || "Not disclosed"}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={e => { e.stopPropagation(); onToggleSave(job._id); }} style={{ width: "26px", height: "26px", borderRadius: "4px", border: `1px solid ${isSaved ? "var(--accent)" : "var(--border)"}`, background: isSaved ? "var(--accent-bg)" : "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <BookmarkIcon filled={isSaved} />
        </button>
        <button onClick={e => { e.stopPropagation(); if (!applied) onApply(); }} disabled={applied} style={{ padding: "5px 14px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, border: "none", cursor: applied ? "default" : "pointer", background: applied ? "var(--bg-subtle)" : "var(--accent)", color: applied ? "var(--text-3)" : "white", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
          {applied ? <><CheckIcon />Applied</> : "Apply"}
        </button>
      </div>
    </div>
  );
}

// ─── JOB MODAL ───
function JobModal({ job, onClose, onApply, applied, isSaved, onToggleSave }) {
  if (!job) return null;

  const colors = ["#0057b8","#0891b2","#7c3aed","#16a34a","#d97706","#be185d","#dc2626","#0e7490"];
  const logoColor = colors[(job.company?.charCodeAt(0) || 0) % colors.length];

  return (
    <>
      <Helmet><title>{job.title} at {job.company} | AxonHire</title></Helmet>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "var(--modal-overlay)",
          zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px", animation: "ax-fade-in 0.15s ease-out",
        }}
      >
        {/* Modal */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: "12px", maxWidth: "620px", width: "100%",
            maxHeight: "88vh", display: "flex", flexDirection: "column",
            boxShadow: "var(--shadow-lg)", animation: "ax-modal-in 0.18s ease-out",
          }}
        >
          {/* Modal header */}
          <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "flex-start", gap: "14px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: logoColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: "white", flexShrink: 0 }}>
              {job.company?.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 500, marginBottom: "3px" }}>{job.company}</div>
              <div style={{ fontSize: "19px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: "8px" }}>{job.title}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {[
                  { icon: <LocationIcon />, label: job.location || "Remote" },
                  { icon: <SalaryIcon />, label: job.salary || "Not disclosed" },
                ].map((p, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 9px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "11px", color: "var(--text-2)", background: "var(--bg-subtle)" }}>
                    {p.icon}{p.label}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ width: "28px", height: "28px", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-3)", flexShrink: 0 }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Modal body */}
          <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "18px" }}>
            {job.description ? (
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "8px" }}>About the role</div>
                <div style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.75, whiteSpace: "pre-line" }}>{job.description}</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px", background: "var(--bg-subtle)", borderRadius: "8px", border: "1px dashed var(--border)", fontSize: "13px", color: "var(--text-3)", fontStyle: "italic" }}>
                No description provided for this role.
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-3)", marginBottom: "8px" }}>Skills & Requirements</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {job.requirements.map((skill, i) => (
                    <span key={i} style={{ padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: 500, background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal footer */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Salary</div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--green)", letterSpacing: "-0.01em" }}>{job.salary || "Not disclosed"}</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => onToggleSave(job._id)}
                style={{
                  padding: "8px 14px", border: `1px solid ${isSaved ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "5px", background: isSaved ? "var(--accent-bg)" : "var(--bg-surface)",
                  color: isSaved ? "var(--accent)" : "var(--text-2)",
                  fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "5px",
                }}
              >
                <BookmarkIcon filled={isSaved} />
                {isSaved ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => !applied && onApply(job)}
                disabled={applied}
                style={{
                  padding: "8px 22px", borderRadius: "5px",
                  background: applied ? "var(--bg-subtle)" : "var(--accent)",
                  color: applied ? "var(--text-3)" : "white", border: "none",
                  fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600,
                  cursor: applied ? "default" : "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: "6px",
                }}
              >
                {applied ? <><CheckIcon />Applied</> : "Apply for this role"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN JOBS PAGE ───
function Jobs() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // ── All original state ──
  const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [locationFilter, setLocationFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedJob, setSelectedJob] = useState(null);

  // ── Load-more state (replaces pagination) ──
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  // Reset visible count when filters change
  useEffect(() => { setVisibleCount(JOBS_PER_PAGE); }, [debouncedSearch, locationFilter]);

  // ── Original fetch logic — untouched ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobResponse = await axiosInstance.get("/jobs");
        // Backend returns { jobs, pagination } — extract the array
        const jobs = Array.isArray(jobResponse.data)
          ? jobResponse.data
          : (jobResponse.data.jobs || []);
        setJobList(jobs);
        setFilteredJobs(jobs);

        if (isLoggedIn) {
          try {
            const appsResponse = await axiosInstance.get("/applications/my-applications");
            const appIds = new Set(appsResponse.data.map(app => app.jobId?._id || app.jobId));
            setAppliedJobIds(appIds);

            const savedResponse = await axiosInstance.get("/users/saved-jobs");
            const saveIds = new Set(savedResponse.data.map(job => job._id));
            setSavedJobIds(saveIds);
          } catch (err) {
            console.error("Sync failed", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn]);

  // ── Original filter logic — untouched ──
  useEffect(() => {
    const query = debouncedSearch.toLowerCase();
    const results = jobList.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);
      const matchesLocation =
        locationFilter === "All" ? true
        : locationFilter === "Remote" ? job.location.toLowerCase().includes("remote")
        : !job.location.toLowerCase().includes("remote");
      return matchesSearch && matchesLocation;
    });
    setFilteredJobs(results);
    setVisibleCount(JOBS_PER_PAGE);
  }, [debouncedSearch, locationFilter, jobList]);

  // ── Original toggleSave — untouched ──
  const toggleSave = async (jobId) => {
    if (!isLoggedIn) { alert("Please login to save jobs."); return; }
    try {
      const newSet = new Set(savedJobIds);
      if (newSet.has(jobId)) newSet.delete(jobId);
      else newSet.add(jobId);
      setSavedJobIds(newSet);
      await axiosInstance.put(`/users/save/${jobId}`);
    } catch (err) {
      console.error("Failed to toggle save:", err);
      alert("Action failed");
    }
  };

  // ── Original handleApply — untouched ──
  const handleApply = async (job) => {
    if (!isLoggedIn || !user) {
      alert("You must be logged in to apply for a job");
      navigate("/login");
      return;
    }
    if (!user.resumeUrl) {
      const confirmRedirect = window.confirm("Please upload a resume first. Go to Profile?");
      if (confirmRedirect) navigate("/profile");
      return;
    }
    try {
      await axiosInstance.post(`/applications/${job._id}/apply`);
      setAppliedJobIds(prev => new Set(prev).add(job._id));
      alert("Application Successful!");
    } catch (err) {
      console.error("Application failed:", err);
      if (err.response?.status === 400) {
        setAppliedJobIds(prev => new Set(prev).add(job._id));
        alert("You have already applied.");
      } else {
        alert(err.response?.data?.message || "Application failed");
      }
    }
  };

  // ── Load more handler ──
  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + JOBS_PER_PAGE);
      setLoadingMore(false);
    }, 400);
  }, []);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;
  const remaining = filteredJobs.length - visibleCount;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <Helmet><title>Open Positions | AxonHire</title></Helmet>

      {/* ── SEARCH BAR ── */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "14px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>

          {/* Search box */}
          <div style={{ display: "flex", background: "var(--bg-subtle)", border: "1.5px solid var(--border-strong)", borderRadius: "7px", overflow: "hidden", flex: 1, maxWidth: "580px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 13px", flex: 1 }}>
              <span style={{ color: "var(--text-3)", flexShrink: 0 }}><SearchIcon /></span>
              <input
                type="text"
                placeholder="Job title, company, or skill..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "var(--text-1)", background: "transparent", width: "100%", height: "40px" }}
              />
            </div>
          </div>

          {/* Location filter */}
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--border-strong)", borderRadius: "7px", background: "var(--bg-surface)", color: "var(--text-1)", fontFamily: "Inter, sans-serif", fontSize: "12px", cursor: "pointer", outline: "none" }}
          >
            <option value="All">All locations</option>
            <option value="Remote">Remote only</option>
            <option value="On-site">On-site</option>
          </select>

          {/* View toggle */}
          <div style={{ display: "flex", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "6px", padding: "3px", gap: "2px" }}>
            {[
              { mode: "grid", icon: <GridIcon /> },
              { mode: "list", icon: <ListIcon /> },
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  width: "30px", height: "30px", borderRadius: "4px", border: "none", cursor: "pointer",
                  background: viewMode === mode ? "var(--bg-surface)" : "transparent",
                  color: viewMode === mode ? "var(--accent)" : "var(--text-3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: viewMode === mode ? "var(--shadow-sm)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Result count */}
          {!loading && (
            <span style={{ fontSize: "12px", color: "var(--text-3)", whiteSpace: "nowrap" }}>
              <strong style={{ color: "var(--text-1)" }}>{filteredJobs.length.toLocaleString()}</strong> jobs found
            </span>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px" }}>

        {/* Job Alert */}
        <JobAlert />

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredJobs.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 24px", background: "var(--bg-surface)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-1)", marginBottom: "6px" }}>No jobs found</h3>
            <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "20px" }}>Try a different search or clear your filters</p>
            <button
              onClick={() => { setSearchQuery(""); setLocationFilter("All"); }}
              style={{ padding: "8px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: "5px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Jobs grid / list */}
        {!loading && filteredJobs.length > 0 && (
          <>
            {viewMode === "grid" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
                {visibleJobs.map(job => (
                  <JobCard
                    key={job._id}
                    job={job}
                    applied={appliedJobIds.has(job._id)}
                    isSaved={savedJobIds.has(job._id)}
                    onApply={() => handleApply(job)}
                    onToggleSave={toggleSave}
                    onClick={() => setSelectedJob(job)}
                  />
                ))}

                {/* Skeleton placeholders while loading more */}
                {loadingMore && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {visibleJobs.map(job => (
                  <JobRow
                    key={job._id}
                    job={job}
                    applied={appliedJobIds.has(job._id)}
                    isSaved={savedJobIds.has(job._id)}
                    onApply={() => handleApply(job)}
                    onToggleSave={toggleSave}
                    onClick={() => setSelectedJob(job)}
                  />
                ))}
                {loadingMore && Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="ax-skeleton" style={{ height: "66px", borderRadius: "10px" }} />
                ))}
              </div>
            )}

            {/* ── LOAD MORE ── */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <p style={{ fontSize: "12px", color: "var(--text-3)", marginBottom: "12px" }}>
                  Showing <strong style={{ color: "var(--text-1)" }}>{visibleJobs.length}</strong> of <strong style={{ color: "var(--text-1)" }}>{filteredJobs.length}</strong> jobs
                </p>
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  style={{
                    padding: "10px 32px", border: "1px solid var(--border-strong)",
                    borderRadius: "6px", background: "var(--bg-surface)",
                    color: "var(--text-1)", fontFamily: "Inter, sans-serif",
                    fontSize: "13px", fontWeight: 500, cursor: loadingMore ? "default" : "pointer",
                    transition: "all 0.15s", opacity: loadingMore ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { if (!loadingMore) { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}}
                  onMouseLeave={e => { e.target.style.borderColor = "var(--border-strong)"; e.target.style.color = "var(--text-1)"; }}
                >
                  {loadingMore ? "Loading…" : `Load ${Math.min(remaining, JOBS_PER_PAGE)} more jobs`}
                </button>
              </div>
            )}

            {/* All loaded */}
            {!hasMore && filteredJobs.length > JOBS_PER_PAGE && (
              <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "var(--text-3)" }}>
                All {filteredJobs.length} jobs loaded
              </div>
            )}
          </>
        )}
      </div>

      {/* ── JOB MODAL ── */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={(j) => { handleApply(j); }}
          applied={appliedJobIds.has(selectedJob._id)}
          isSaved={savedJobIds.has(selectedJob._id)}
          onToggleSave={toggleSave}
        />
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes ax-modal-in {
          from { transform: translateY(10px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Jobs;