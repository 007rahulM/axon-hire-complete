const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const { sendApplicationEmail, sendStatusUpdateEmail } = require("../utils/emailService");

/*
@route POST /api/applications/:jobId/apply
apply for a job using the user's saved Master Resume (easy apply)
private - user must be logged in
*/
router.post("/:jobId/apply", verifytoken, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    // 1. Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 2. Check if the user has a resume uploaded
    const user = await User.findById(userId);
    if (!user.resumeUrl) {
      return res.status(400).json({ message: "No resume found. Please upload your resume to your profile first." });
    }

    // 3. Check for duplicate application
    const existingApplication = await Application.findOne({
      jobId: jobId,
      applicantId: userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // 4. Create the new application
    const newApplication = new Application({
      jobId: jobId,
      applicantId: userId,
      resumeUrl: user.resumeUrl,
      status: "Submitted"
    });

    await newApplication.save();
    await sendApplicationEmail(user, job.title, job.company);


    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication
    });
  } catch (err) {
    console.error("Application error:", err.message);
    res.status(500).json({ message: "Server error during application" });
  }
});

/*
@route GET /api/applications/recruiter
Get all applications for jobs posted by the logged-in recruiter
private - only recruiter can access
*/
router.get("/recruiter", verifytoken, async (req, res) => {
  try {
    // 🎯 FIX: Use 'req.user.id' directly. 'userId' was not defined here.
    const jobs = await Job.find({ postedBy: req.user.id });

    // Extract just the IDs of those jobs
    const jobIds = jobs.map((job) => job._id);

    // Find applications that match those job Ids
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("applicantId", "name email") // get the candidate's name and email
      .populate("jobId", "title");   // get the job title

    // Send the list back to the frontend
    res.status(200).json(applications);

  } catch (err) {
    console.error("Error fetching applications:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* @route GET /api/applications/my-applications
@desc Get all applications submitted by the logged-in candidate
@access Private (Candidate only)
*/
// backend/routes/applicationRoutes.js

router.get("/my-applications", verifytoken, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicantId: userId })
      // 👇 UPDATE THIS LINE: Added "description" and "requirements"
      .populate("jobId", "title company location salary status description requirements") 
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching user applications:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/*
@route PATCH /api/applications/:id/status
@desc Update application status (Shortlisted, Rejected, etc.)
@access Private (Recruiter only)
*/
router.patch("/:id/status", verifytoken, async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Validate status
    const validStatuses = ["Submitted", "Viewed", "Shortlisted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the application
    const updatedApp = await Application.findByIdAndUpdate(
      applicationId,
      { status: status },
      { new: true } // Return the updated document
   ).populate("applicantId").populate("jobId");

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 👇 ADD THIS LINE (Send email if Shortlisted or Rejected)
    if (status === "Shortlisted" || status === "Rejected") {
        await sendStatusUpdateEmail(
            updatedApp.applicantId, 
            updatedApp.jobId.title, 
            status
        );
    }

    res.status(200).json({ 
      message: `Status updated to ${status}`, 
      application: updatedApp 
    });

  } catch (err) {
    console.error("Status update error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;