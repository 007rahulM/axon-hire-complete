// backend/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application"); // Import Application to handle cascade delete
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/*
@route GET /api/jobs
@desc Get all ACTIVE jobs (Public)
*/
router.get("/", async (req, res) => {
  try {
    // 👇 FILTER ADDED: Only fetch jobs where isOpen is true
    const jobs = await Job.find({ isOpen: true }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/*
@route GET /api/jobs/my-jobs
@desc Get jobs posted by the logged-in recruiter
@access Private (Recruiter)
*/
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    // Find jobs where postedBy matches the logged-in user
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    
    // Optional: Calculate applicant count for each job
    // We map over jobs and find count. Note: This assumes not too many jobs. 
    // For scaling, we would use aggregation, but this is fine for MVP.
    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
        const count = await Application.countDocuments({ jobId: job._id });
        return { ...job.toObject(), applicantCount: count };
    }));

    res.status(200).json(jobsWithCounts);
  } catch (err) {
    console.error("Error fetching my jobs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/*
@route POST /api/jobs
@desc Create a new job
@access Private (Recruiter/Admin)
*/
router.post("/", [verifyToken, adminMiddleware], async (req, res) => {
  try {
    const { title, company, location, salary ,description, requirements} = req.body;

    if (!title || !company || !location || !salary || !description || !requirements) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    let atsEnabled = true;
    if (!requirements || requirements.length === 0) {
      atsEnabled = false;
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      description,
      requirements: requirements || [],
      atsEnabled, 
      postedBy: req.user.id
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/*
@route DELETE /api/jobs/:id
@desc Delete a job AND all its applications
@access Private (Recruiter - Only Owner)
*/
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check ownership
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // 1. Delete the Job
        await Job.findByIdAndDelete(jobId);
        
        // 2. 🔥 CASCADE DELETE: Delete all applications for this job
        // This ensures they don't show up as "Deleted Job" in your dashboard
        await Application.deleteMany({ jobId: jobId });

        res.json({ message: "Job and associated applications removed" });
    } catch (err) {
        console.error("Delete job error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

/*
@route PATCH /api/jobs/:id/toggle
@desc Toggle job status (Open/Closed) - SAFE VERSION
@access Private (Recruiter Owner)
*/
router.patch("/:id/toggle", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // 1. Find the job first to check ownership
    const job = await Job.findById(jobId);
    
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    // 2. Safe Ownership Check (Convert both to strings to be sure)
    // We handle cases where postedBy might be an object or a string
    const postedById = job.postedBy._id ? job.postedBy._id.toString() : job.postedBy.toString();
    
    if (postedById !== userId) {
      return res.status(401).json({ message: "Not authorized to modify this job" });
    }

    // 3. Determine New Status
    // If isOpen is undefined (old job), assume it was OPEN (true), so we switch to CLOSED (false).
    const currentStatus = job.isOpen === undefined ? true : job.isOpen;
    const newStatus = !currentStatus;

    // 4. Force Update using findByIdAndUpdate
    // This bypasses schema strictness issues on old documents
    const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { $set: { isOpen: newStatus } }, // Explicitly set the field
        { new: true } // Return the updated document
    );

    console.log(`Job ${jobId} toggled to ${newStatus}`); // Log success to server terminal

    res.json({ message: "Job status updated", job: updatedJob });

  } catch (err) {
    console.error("CRITICAL TOGGLE ERROR:", err); // This prints the real error to your VS Code terminal
    res.status(500).json({ message: "Server error during toggle" });
  }
});
module.exports = router;