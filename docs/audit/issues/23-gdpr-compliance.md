# Issue #23 — No GDPR Compliance

> **Branch**: 7 (New Features & Architecture)  
> **Severity**: 🔵 Feature / Legal — required if you have EU users  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*The company's first investor asks about data compliance.*

---

**💼 Investor:** "Do you comply with GDPR?"

**🔴 Priya (PM):** "Can you explain what GDPR requires for a product like ours?"

**🟣 Sam (Security):** "GDPR — General Data Protection Regulation — applies if ANY of your users are in the EU. It gives users specific rights over their personal data. It's a European law, but it's become the global benchmark. Many investors and enterprise customers ask for it even in India and the US."

**🔴 Priya:** "What specifically do we need to build?"

**🟣 Sam:** "There are 8 user rights. The ones most relevant to us are: the right to access their data, the right to delete their account and all data, and the right to know what data we store. We need to build two things: a 'Download My Data' feature and a 'Delete My Account' feature."

---

## 🔍 What GDPR Requires

### The 8 Rights (Simplified)

| Right | What It Means | What to Build |
|-------|--------------|---------------|
| Right to Access | "Show me all data you have on me" | "Download My Data" export |
| Right to Erasure | "Delete everything about me" | "Delete My Account" with full cascade |
| Right to Rectification | "Fix incorrect data" | Edit profile (already exists) |
| Right to Portability | "Give me my data in a usable format" | JSON/CSV download |
| Right to Object | "Stop processing my data for marketing" | Unsubscribe from emails |
| Right to Restriction | "Pause processing, don't delete yet" | Account suspension (not deletion) |
| Right to be Informed | "Tell me what you collect and why" | Privacy Policy page |
| Right not to be profiled | "Don't use my data for automated decisions" | Explain ATS scoring in privacy policy |

For a startup, focus on the top two (Access + Erasure) plus a Privacy Policy.

---

## 🛠 The Fix (to implement in Branch 7)

### Feature 1: Delete My Account

This is the most important. When a user deletes their account, cascade-delete ALL related data:

```js
// backend/routes/userRoutes.js
router.delete("/me", verifyToken, async (req, res) => {
  const userId = req.user.id;
  
  // 1. Confirm by requiring password
  const { password } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found." });
  
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Incorrect password." });
  }
  
  // 2. Cascade delete in correct order (remove references before the root document)
  
  // Delete all applications
  await Application.deleteMany({ applicantId: userId });
  
  // Delete all notifications
  await Notification.deleteMany({ user: userId });
  
  // Delete all job alerts
  await JobAlert.deleteMany({ user: userId });
  
  // If recruiter: delete their jobs and all applications to those jobs
  if (user.role === "recruiter") {
    const recruiterJobs = await Job.find({ postedBy: userId });
    const jobIds = recruiterJobs.map(j => j._id);
    await Application.deleteMany({ jobId: { $in: jobIds } });
    await Job.deleteMany({ postedBy: userId });
  }
  
  // Delete resume from Cloudinary
  if (user.resumeUrl) {
    const publicId = extractCloudinaryPublicId(user.resumeUrl);
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  }
  
  // Delete profile picture from Cloudinary
  if (user.profilePicture) {
    const publicId = extractCloudinaryPublicId(user.profilePicture);
    await cloudinary.uploader.destroy(publicId);
  }
  
  // 3. Delete the user
  await User.findByIdAndDelete(userId);
  
  // 4. Clear session cookies
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  
  res.status(200).json({ message: "Your account and all associated data have been deleted." });
});

// Helper to extract public_id from Cloudinary URL:
function extractCloudinaryPublicId(url) {
  // Cloudinary URL: https://res.cloudinary.com/cloud-name/image/upload/v123/axon_resumes/filename.pdf
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  const pathWithVersion = parts[1]; // v123/axon_resumes/filename.pdf
  const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, ""); // axon_resumes/filename.pdf
  return pathWithoutVersion.replace(/\.[^.]+$/, ""); // axon_resumes/filename (no extension)
}
```

### Feature 2: Download My Data

```js
// GET /api/users/my-data — returns all user data as JSON
router.get("/my-data", verifyToken, async (req, res) => {
  const userId = req.user.id;
  
  const [user, applications, notifications] = await Promise.all([
    User.findById(userId).select("-password -otp -otpExpires -resetPasswordToken -loginAttempts -lockUntil").lean(),
    Application.find({ applicantId: userId }).populate("jobId", "title company location").lean(),
    Notification.find({ user: userId }).lean(),
  ]);
  
  const dataExport = {
    exportDate: new Date().toISOString(),
    account: user,
    applications: applications.map(a => ({
      job: a.jobId?.title,
      company: a.jobId?.company,
      appliedAt: a.appliedAt,
      status: a.status,
      coverLetter: a.coverLetter,
    })),
    notifications: notifications.map(n => ({
      title: n.title,
      message: n.message,
      createdAt: n.createdAt,
    })),
  };
  
  res.setHeader("Content-Disposition", "attachment; filename=axon-hire-data-export.json");
  res.setHeader("Content-Type", "application/json");
  res.json(dataExport);
});
```

### Feature 3: Privacy Policy Page

Create `frontend/src/pages/Privacy.jsx` — a static page explaining:
- What data you collect (email, name, resume, profile picture, IP address for rate limiting)
- Why (to run the service, send notifications, improve the product)
- How long you keep it (until account deletion, or as required by law)
- Contact for GDPR requests: `privacy@axon-hire.com`

### Feature 4: Cookie Consent Banner

If you use analytics (PostHog — Issue #26) or monitoring cookies, EU law requires consent:

```jsx
// frontend/src/components/CookieBanner.jsx
const [consented, setConsented] = useState(localStorage.getItem("cookieConsent"));

if (consented) return null;

return (
  <div className="cookie-banner">
    <p>We use cookies for analytics and improving the product. 
    <a href="/privacy">Learn more</a></p>
    <button onClick={() => { localStorage.setItem("cookieConsent", "yes"); setConsented("yes"); }}>
      Accept
    </button>
    <button onClick={() => { localStorage.setItem("cookieConsent", "no"); setConsented("no"); }}>
      Decline
    </button>
  </div>
);
```

---

## ❓ Common Questions

**Q: Do we NEED GDPR if we're based in India?**  
A: If you have ANY EU users, GDPR technically applies to you regardless of your location. India's PDPB (Personal Data Protection Bill) has similar requirements. Practically: investors and enterprise customers expect it. Build it proactively.

**Q: What's the penalty for non-compliance?**  
A: Up to €20 million or 4% of global annual revenue, whichever is higher. For a startup, even a small fine could be devastating. More practically: a GDPR complaint can damage reputation with enterprise customers.

**Q: Do we need a Data Protection Officer (DPO)?**  
A: Only if you're a large-scale data processor. For a startup, a designated "data privacy contact" (a real email address) in your privacy policy is sufficient.

---

## 🎓 What You Learned

- GDPR = 8 user rights; focus on "Delete My Account" and "Download My Data" first
- Account deletion must be a cascade — every related document in every collection must be deleted
- Resume/profile pictures stored in Cloudinary must also be deleted (you're paying for storage + it's their data)
- Privacy Policy is not just legal boilerplate — it tells users what you collect and builds trust
- Cookie consent banners are required in the EU when using analytics cookies
