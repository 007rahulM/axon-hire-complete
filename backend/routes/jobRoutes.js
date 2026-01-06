// backend/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application"); // Import Application to handle cascade delete
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 👇 NEW IMPORTS FOR JOB ALERTS
const JobAlert = require("../models/JobAlert");
const nodemailer = require("nodemailer");

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
    const { title, company, location, salary, description, requirements, deadline } = req.body;

    if (!title || !company || !location || !salary || !description || !requirements) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const newJob = new Job({
      title, company, location, salary, description,
      requirements: requirements || [],
      atsEnabled: requirements?.length > 0,
      deadline, // Saved to DB
      postedBy: req.user.id
    });

    const savedJob = await newJob.save();

    // ✅ STEP 1: Send the response IMMEDIATELY
    // This stops the frontend from hanging and prevents timeouts.
    res.status(201).json(savedJob);

    // ✅ STEP 2: Background Task (Emails & Notifications)
    // setImmediate moves this logic out of the main request-response cycle.
    setImmediate(async () => {
      try {
        const matchingAlerts = await JobAlert.find({ keywords: { $in: [title] } });

        if (matchingAlerts.length > 0) {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "codementoraiyt@gmail.com",
              pass: "YOUR_APP_PASSWORD" 
            }
          });

          // Send notifications to DB first (Fast)
          const Notification = require("../models/Notification");
          const notifs = matchingAlerts.map(alert => ({
            user: alert.userId, // Ensure your Alert model has userId
            title: "New Job Match!",
            message: `${company} just posted a ${title} position.`,
            relatedLink: "/jobs"
          }));
          await Notification.insertMany(notifs);

          // Send Emails (Slow - now safe because it's in background)
          matchingAlerts.forEach(alert => {
            const mailOptions = {
              from: '"Axon Hire" <codementoraiyt@gmail.com>',
              to: alert.userEmail,
              subject: `🔥 New Job Alert: ${title}`,
              html: `<h3>New Job Found: ${title}</h3><p>Posted by ${company}</p>`
            };
            transporter.sendMail(mailOptions);
          });
        }
      } catch (bgError) {
        console.error("Background Alert Error:", bgError);
      }
    });

  } catch (err) {
    console.error("Error posting job:", err.message);
    if (!res.headersSent) res.status(500).json({ message: "Server error" });
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

    // 2. Safe Ownership Check
    const postedById = job.postedBy._id ? job.postedBy._id.toString() : job.postedBy.toString();
    
    if (postedById !== userId) {
      return res.status(401).json({ message: "Not authorized to modify this job" });
    }

    // 3. Determine New Status
    const currentStatus = job.isOpen === undefined ? true : job.isOpen;
    const newStatus = !currentStatus;

    // 4. Force Update
    const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { $set: { isOpen: newStatus } }, 
        { new: true } 
    );

    console.log(`Job ${jobId} toggled to ${newStatus}`);

    res.json({ message: "Job status updated", job: updatedJob });

  } catch (err) {
    console.error("CRITICAL TOGGLE ERROR:", err); 
    res.status(500).json({ message: "Server error during toggle" });
  }
});

// @route   POST /api/jobs/cron/cleanup
router.post("/cron/cleanup", async (req, res) => {
  try {
    // 1. Check for the Secret Key in the headers
    const cronSecret = req.headers["x-cron-auth"];
    
    // You should put this secret in your .env file
    if (cronSecret !== process.env.CRON_SECRET) {
      return res.status(401).json({ message: "Unauthorized: Invalid Secret Key" });
    }

    const now = new Date();
    const result = await Job.updateMany(
      { deadline: { $lt: now }, isOpen: true },
      { $set: { isOpen: false } }
    );
    
    res.json({ success: true, closedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;