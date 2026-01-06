// const express = require("express");
// const router = express.Router();
// const verifytoken = require("../middleware/authMiddleware");
// const Application = require("../models/Application");
// const Job = require("../models/Job");
// const User = require("../models/User");

// const { sendApplicationEmail, sendStatusUpdateEmail } = require("../utils/emailService");

// /*
// @route POST /api/applications/:jobId/apply
// apply for a job using the user's saved Master Resume (easy apply)
// private - user must be logged in
// */
// router.post("/:jobId/apply", verifytoken, async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     const userId = req.user.id;

//     // 1. Check if the job exists
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // 2. Check if the user has a resume uploaded
//     const user = await User.findById(userId);
//     if (!user.resumeUrl) {
//       return res.status(400).json({ message: "No resume found. Please upload your resume to your profile first." });
//     }

//     // 3. Check for duplicate application
//     const existingApplication = await Application.findOne({
//       jobId: jobId,
//       applicantId: userId
//     });

//     if (existingApplication) {
//       return res.status(400).json({ message: "You have already applied for this job" });
//     }

//     // 4. Create the new application
//     const newApplication = new Application({
//       jobId: jobId,
//       applicantId: userId,
//       resumeUrl: user.resumeUrl,
//       status: "Submitted"
//     });

//     await newApplication.save();
//     await sendApplicationEmail(user, job.title, job.company);


//     res.status(201).json({
//       message: "Application submitted successfully",
//       application: newApplication
//     });
//   } catch (err) {
//     console.error("Application error:", err.message);
//     res.status(500).json({ message: "Server error during application" });
//   }
// });

// /*
// @route GET /api/applications/recruiter
// Get all applications for jobs posted by the logged-in recruiter
// private - only recruiter can access
// */
// router.get("/recruiter", verifytoken, async (req, res) => {
//   try {
//     // 🎯 FIX: Use 'req.user.id' directly. 'userId' was not defined here.
//     const jobs = await Job.find({ postedBy: req.user.id });

//     // Extract just the IDs of those jobs
//     const jobIds = jobs.map((job) => job._id);

//     // Find applications that match those job Ids
//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .populate("applicantId", "name email") // get the candidate's name and email
//       .populate("jobId", "title");   // get the job title

//     // Send the list back to the frontend
//     res.status(200).json(applications);

//   } catch (err) {
//     console.error("Error fetching applications:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* @route GET /api/applications/my-applications
// @desc Get all applications submitted by the logged-in candidate
// @access Private (Candidate only)
// */
// // backend/routes/applicationRoutes.js

// router.get("/my-applications", verifytoken, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const applications = await Application.find({ applicantId: userId })
//       // 👇 UPDATE THIS LINE: Added "description" and "requirements"
//       .populate("jobId", "title company location salary status description requirements") 
//       .sort({ createdAt: -1 });

//     res.status(200).json(applications);
//   } catch (err) {
//     console.error("Error fetching user applications:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /*
// @route PATCH /api/applications/:id/status
// @desc Update application status (Shortlisted, Rejected, etc.)
// @access Private (Recruiter only)
// */
// router.patch("/:id/status", verifytoken, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const applicationId = req.params.id;

//     // Validate status
//     const validStatuses = ["Submitted", "Viewed", "Shortlisted", "Rejected"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     // Update the application
//     const updatedApp = await Application.findByIdAndUpdate(
//       applicationId,
//       { status: status },
//       { new: true } // Return the updated document
//    ).populate("applicantId").populate("jobId");

//     if (!updatedApp) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // 👇 ADD THIS LINE (Send email if Shortlisted or Rejected)
//     if (status === "Shortlisted" || status === "Rejected") {
//         await sendStatusUpdateEmail(
//             updatedApp.applicantId, 
//             updatedApp.jobId.title, 
//             status
//         );
//     }

//     res.status(200).json({ 
//       message: `Status updated to ${status}`, 
//       application: updatedApp 
//     });

//   } catch (err) {
//     console.error("Status update error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // 👇 NEW ROUTE: Update Application Status (Drag & Drop)
// // PUT /api/applications/:id/status
// router.put("/:id/status", verifyToken, async (req, res) => {
//   const { status } = req.body;
//   const applicationId = req.params.id;

//   try {
//     // 1. Find the application
//     const application = await Application.findById(applicationId).populate('jobId');
//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // 2. Security Check: Ensure the logged-in user is the RECRUITER who posted the job
//     if (application.jobId.postedBy.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to manage this application" });
//     }

//     // 3. Update Status
//     application.status = status;
//     await application.save();

//     res.json({ message: "Status updated", application });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // 👇 NEW ROUTE: Get Applications for a Recruiter's Jobs (For the Board)
// // GET /api/applications/recruiter
// router.get("/recruiter/all", verifyToken, async (req, res) => {
//     try {
//         // 1. Find all jobs posted by this recruiter
//         const jobs = await Job.find({ postedBy: req.user.id });
//         const jobIds = jobs.map(job => job._id);

//         // 2. Find all applications for those jobs
//         const applications = await Application.find({ jobId: { $in: jobIds } })
//             .populate("applicantId", "name email profilePicture title skills") // Get Rich Profile Data
//             .populate("jobId", "title");

//         res.json(applications);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const Notification = require("../models/Notification"); // ✅ Required for Bell
const { sendApplicationEmail, sendStatusUpdateEmail } = require("../utils/emailService");

/* @route POST /api/applications/:jobId/apply
  Apply for a job (Legacy - Easy Apply)
*/
router.post("/:jobId/apply", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const user = await User.findById(userId);
    if (!user.resumeUrl) {
      return res.status(400).json({ message: "No resume found. Please upload to profile." });
    }

    const existingApplication = await Application.findOne({ jobId: jobId, applicantId: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "Already applied" });
    }

    const newApplication = new Application({
      jobId: jobId,
      applicantId: userId,
      resumeUrl: user.resumeUrl,
      status: "Submitted"
    });

    await newApplication.save();

    // 🔔 NOTIFICATION: Confirmation for Candidate
    await Notification.create({
        user: req.user.id,
        title: "Application Sent",
        message: `You successfully applied for ${job.title} at ${job.company}.`,
        type: "success",
        relatedLink: "/my-applications"
    });
    
    // Email (Non-blocking)
    sendApplicationEmail(user, job.title, job.company).catch(e => console.log("Email fail:", e.message));

    res.status(201).json({ message: "Application submitted", application: newApplication });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* @route GET /api/applications/recruiter
  Get ALL applications for this recruiter
*/
router.get("/recruiter", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("applicantId", "name email profilePicture title skills")
      .populate("jobId", "title");

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* @route GET /api/applications/my-applications
  Get Candidate's History
*/
router.get("/my-applications", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ applicantId: userId })
      .populate("jobId", "title company location salary status description requirements") 
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* @route PUT /api/applications/:id/status
  THE SMART TRIGGER (Merges Logic + Notifications)
*/
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appId = req.params.id;

    // 1. Fetch Application AND Populate Data needed for Logic
    const application = await Application.findById(appId)
        .populate('jobId')
        .populate('applicantId');

    if (!application) return res.status(404).json({ message: "Application not found" });

    // 2. SECURITY: Check if logged-in recruiter owns this job
    // (Legacy logic preserved for security)
    if (application.jobId.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to manage this application" });
    }

    // 3. Update Status
    application.status = status;
    await application.save();

    // ======================================================
    // 🔔 4. SMART NOTIFICATION SYSTEM
    // ======================================================
    
    let notifTitle = "Application Update";
    let notifMessage = `Your status for ${application.jobId.title} has changed to ${status}.`;
    let notifType = "info";

    if (status === "Shortlisted") {
        notifTitle = "🎉 Congratulations!";
        notifMessage = `You have been shortlisted for ${application.jobId.title}!`;
        notifType = "success";
    } else if (status === "Rejected") {
        notifTitle = "Application Update";
        notifMessage = `Update regarding your application for ${application.jobId.title}.`;
        notifType = "error"; 
    } else if (status === "Interviewing") {
        notifTitle = "Interview Scheduled";
        notifMessage = `You moved to the Interview stage for ${application.jobId.title}.`;
        notifType = "warning";
    } else if (status === "Hired") {
        notifTitle = "You're Hired!";
        notifMessage = `Congratulations! You got the job at ${application.jobId.company}.`;
        notifType = "success";
    }

    // A. Save to Database (Bell Icon)
    await Notification.create({
        user: application.applicantId._id, // Send to Candidate
        title: notifTitle,
        message: notifMessage,
        type: notifType,
        relatedLink: "/my-applications"
    });

    // B. Send Email (Only for major updates to avoid spam)
    if (["Shortlisted", "Rejected", "Interviewing", "Hired"].includes(status)) {
        sendStatusUpdateEmail(application.applicantId, application.jobId.title, status)
            .catch(err => console.error("Email trigger failed:", err.message));
    }
    // ======================================================

    res.json({ message: "Status updated", application });

  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Alias route
router.get("/recruiter/all", verifyToken, async (req, res) => {
    // Redirect logic to main handler
    const jobs = await Job.find({ postedBy: req.user.id });
    const jobIds = jobs.map((job) => job._id);
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("applicantId", "name email profilePicture title skills")
      .populate("jobId", "title");
    res.json(applications);
});

/* @route POST /api/applications/:id/schedule
   Handles Status Change + Notification + Email + DB Update
*/
router.post("/:id/schedule", verifyToken, async (req, res) => {
  try {
    const { date, time, link, notes } = req.body;
    const appId = req.params.id;

    // 1. Update Application (Status -> Interviewing AND Save Details)
    const app = await Application.findByIdAndUpdate(
      appId,
      {
        status: "Interviewing",
        interviewDetails: { date, time, link, notes }
      },
      { new: true }
    ).populate("applicantId jobId");

    if (!app) return res.status(404).json({ message: "Application not found" });

    // 2. Create Notification
    await Notification.create({
      user: app.applicantId._id,
      title: "Interview Scheduled",
      message: `Interview for ${app.jobId.title} on ${new Date(date).toLocaleDateString()} at ${time}.`,
      type: "warning",
      relatedLink: "/my-applications"
    });

    // 3. Send Email
    // Using sendInterviewEmail imported from utils
    const { sendInterviewEmail } = require("../utils/emailService");
    sendInterviewEmail(
        app.applicantId, 
        app.jobId.title, 
        app.jobId.company, 
        { date, time, link }
    ).catch(e => console.error("Email fail:", e.message));

    res.json({ success: true, application: app });

  } catch (err) {
    console.error("Schedule Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;