const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const verifyToken = require("../middleware/authMiddleware");
const Skill = require("../models/Skill");



// --- MIDDLEWARE TO CHECK ADMIN ROLE ---
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Chain: Must be Logged In -> AND Must be Admin
const protectAdmin = [verifyToken, isAdmin];

// ==========================================
// 📊 DASHBOARD STATS
// ==========================================
router.get("/stats", protectAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    
    res.json({ totalUsers, totalJobs, totalApplications });
  } catch (err) {
    console.error("Stats Error:", err.message);
    res.status(500).json({ message: "Server error fetching stats" });
  }
});

// ==========================================
// 👥 USER MANAGEMENT
// ==========================================

// Get All Users
router.get("/users", protectAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error("Users Error:", err.message);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Delete User
router.delete("/users/:id", protectAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // Optional: You could cascade delete their jobs/applications here
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting user" });
  }
});

// Update User Role
router.put("/users/:id/role", protectAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'recruiter', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { role: role },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error updating role" });
  }
});

// ==========================================
// 💼 JOB MANAGEMENT
// ==========================================

// Get All Jobs
router.get("/jobs", protectAdmin, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 }); // Fixed: using createdAt
    res.json(jobs);
  } catch (err) {
    console.error("Jobs Error:", err.message);
    res.status(500).json({ message: "Server error fetching jobs" });
  }
});

// Force Delete Job
router.delete("/jobs/:id", protectAdmin, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job removed by Admin" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting job" });
  }
});

// ==========================================
// 📄 APPLICATION MANAGEMENT
// ==========================================

// Get All Applications
router.get("/applications", protectAdmin, async (req, res) => {
  try {
    // 🔥 THE FIX IS HERE: 
    // changed 'userId' -> 'applicantId' 
    // changed 'date' -> 'createdAt'
    const apps = await Application.find()
      .populate('applicantId', 'name email') 
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });
      
    // Transform data slightly to match Frontend expectations if needed
    // (Frontend expects .userId, but DB has .applicantId. We can map it here OR fix frontend)
    // EASIER FIX: Let's map it here so Frontend logic (userId.name) works
    const transformedApps = apps.map(app => ({
      _id: app._id,
      userId: app.applicantId, // Remap applicantId to userId for frontend compatibility
      jobId: app.jobId,
      status: app.status,
      createdAt: app.createdAt
    }));

    res.json(transformedApps);
  } catch (err) {
    console.error("Applications Error:", err.message);
    res.status(500).json({ message: "Server error fetching applications" });
  }
});

// Delete Application
router.delete("/applications/:id", protectAdmin, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting application" });
  }
});

// backend/routes/adminRoutes.js

// Get All Skills for the Skill Map Tab
router.get("/skills", protectAdmin, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ isApproved: 1, canonical: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Skill Map" });
  }
});

router.patch("/skills/:id/approve", verifyToken, protectAdmin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    
    // 🧠 REFRESH THE BRAIN: Sync memory with the new database state
    const { refreshSkillCache } = require("../utils/skillMap");
    await refreshSkillCache(); 
    
    res.json({ success: true, message: "Skill Map synchronized.", skill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;