
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
// ... existing imports
const parseResumeFromUrl = require("../utils/resumeParser");
const { calculateV3Score } = require("../utils/matchingEngine");
const { calculateExperienceMonths } = require("../utils/durationMath");

// ... existing imports (resumeParser, matchingEngine, durationMath, etc.)

// router.post("/:jobId/apply", verifyToken, async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const userId = req.user.id;

//     // 1. Fetch Job and User settings
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const user = await User.findById(userId);
//     if (!user.resumeUrl) return res.status(400).json({ message: "No resume found." });

//     const existingApplication = await Application.findOne({ jobId, applicantId: userId });
//     if (existingApplication) return res.status(400).json({ message: "Already applied" });

//     let aiAnalysisData = [];

//     // 🚀 LOGIC GATE: Only evaluate if recruiter enabled it
//     if (job.autoEvaluate) {
//       console.log(`🚀 Auto-Evaluating in ${job.evaluationMode} mode...`);
      
//       const parsedData = await parseResumeFromUrl(user.resumeUrl);
//       const totalMonths = calculateExperienceMonths(parsedData.experienceZone);
      
//       // We run the Deterministic Math regardless, but can tag the source
//       const analysis = calculateV3Score(
//         { skills: parsedData.skills, totalMonths, links: parsedData.links }, 
//         job.requirements || []
//       );

//       aiAnalysisData = [{
//         matchScore: analysis.score,
//         matchedSkills: analysis.matchedSkills,
//         missingRequiredSkills: analysis.missingSkills,
//         totalMonths: totalMonths,
//         uniqueLinksFound: analysis.uniqueLinksFound,
//         provider: job.evaluationMode === "ai" ? "AI-Fact-Extractor" : "Local-Deterministic",
//         breakdown: analysis.breakdown,
//         summary: `Auto-evaluated on application (${job.evaluationMode} mode).`
//       }];
//     }

//     // 2. Save Application
//     const newApplication = new Application({
//       jobId,
//       applicantId: userId,
//       resumeUrl: user.resumeUrl,
//       status: "Submitted",
//       aiAnalysis: aiAnalysisData // Will be empty if autoEvaluate is OFF
//     });

//     await newApplication.save();

//     // 🔔 Notifications (Your original code)
//     await Notification.create({
//         user: userId,
//         title: "Application Sent",
//         message: `You successfully applied for ${job.title} at ${job.company}.`,
//         type: "success",
//         relatedLink: "/my-applications"
//     });
    
//     sendApplicationEmail(user, job.title, job.company).catch(e => console.log("Email fail:", e.message));

//     res.status(201).json({ message: "Application submitted", application: newApplication });
//   } catch (err) {
//     console.error("V3 Apply Error:", err);
//     res.status(500).json({ message: "Server error during application" });
//   }
// });

//================================================================================================
router.post("/:jobId/apply", verifyToken, async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // 1. Fetch Job and User settings
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const user = await User.findById(userId);
    if (!user.resumeUrl) return res.status(400).json({ message: "No resume found in your profile." });

    const existingApplication = await Application.findOne({ jobId, applicantId: userId });
    if (existingApplication) return res.status(400).json({ message: "You have already applied for this position." });

    let aiAnalysisData = [];

    // 🚀 LOGIC GATE: Only evaluate if recruiter enabled it
    if (job.autoEvaluate) {
      try {
        console.log(`🚀 Auto-Evaluating Application for Job: ${job.title} (${job.evaluationMode} mode)`);
        
        // A. Parse the resume content from URL
        const parsedData = await parseResumeFromUrl(user.resumeUrl);
        
        // B. Calculate duration (Math)
        const totalMonths = calculateExperienceMonths(parsedData.experienceZone || []);
        
        // C. Run the Matching Engine
        const analysis = calculateV3Score(
          { 
            skills: parsedData.skills || [], 
            totalMonths: totalMonths || 0, 
            links: parsedData.links || [] 
          }, 
          job.requirements || []
        );

        // D. STRUCTURE DATA FOR DASHBOARD V2/V3 COMPATIBILITY
        aiAnalysisData = [{
          score: analysis.score,           // Used by Dashboard V3
          matchScore: analysis.score,      // Used by Dashboard V2
          matchedSkills: analysis.matchedSkills || [],
          missingRequiredSkills: analysis.missingSkills || [],
          professionalMonths: totalMonths,
          uniqueLinksFound: analysis.uniqueLinksFound || 0,
          metadata: {
            status: "SUCCESS",
            method: job.evaluationMode === "ai" ? "ai" : "local",
            timestamp: new Date(),
            confidenceLabel: analysis.score > 70 ? "High Trust" : "Standard Trust"
          },
          summary: `Auto-Audit: Candidate matches ${analysis.score}% of the required skills.`
        }];
      } catch (evalError) {
        console.error("Auto-Evaluation Step Failed:", evalError.message);
        // We don't block the application if AI fails, we just save it as unscored
      }
    }

    // 2. Save Application
    const newApplication = new Application({
      jobId,
      applicantId: userId,
      resumeUrl: user.resumeUrl,
      status: "Submitted",
      aiAnalysis: aiAnalysisData 
    });

    await newApplication.save();

    // 🔔 Send Notification (Bell Icon)
    await Notification.create({
        user: userId,
        title: "Application Sent",
        message: `You successfully applied for ${job.title} at ${job.company}.`,
        type: "success",
        relatedLink: "/my-applications"
    });
    
    // 📧 Send Confirmation Email
    sendApplicationEmail(user, job.title, job.company).catch(e => console.log("Email fail:", e.message));

    res.status(201).json({ 
      success: true, 
      message: "Application submitted successfully", 
      application: newApplication 
    });

  } catch (err) {
    console.error("V3 Apply Route Error:", err);
    res.status(500).json({ message: "Server error during application process" });
  }
});
//==============================================================================
/* @route GET /api/applications/recruiter
  Get ALL applications for this recruiter
*/
/* @route GET /api/applications/recruiter */
// router.get("/recruiter", verifyToken, async (req, res) => {
//   try {
//     // Find jobs posted by this recruiter
//     const jobs = await Job.find({ postedBy: req.user.id });
//     const jobIds = jobs.map((job) => job._id);

//     // 🚀 FIX: Added .select("+aiAnalysis") to ensure scores are sent to frontend
//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .populate("applicantId", "name email profilePicture title skills")
//       .populate("jobId", "title company")
//       .select("+aiAnalysis") // 👈 This is the critical line
//       .sort({ createdAt: -1 });

//     res.status(200).json(applications);
//   } catch (err) {
//     console.error("Fetch Recruiter Apps Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

/* @route GET /api/applications/recruiter */
router.get("/recruiter", verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Default to 20 leads
    const skip = (page - 1) * limit;

    const jobs = await Job.find({ postedBy: req.user.id });
    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({ jobId: { $in: jobIds } });

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("applicantId", "name email profilePicture title skills")
      .populate("jobId", "title company")
      .select("+aiAnalysis")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      applications,
      hasMore: skip + applications.length < totalApplications,
      total: totalApplications
    });
  } catch (err) {
    console.error("Fetch Recruiter Apps Error:", err);
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
    try {
        const jobs = await Job.find({ postedBy: req.user.id });
        const jobIds = jobs.map((job) => job._id);
        
        // 🚀 FIX: Sync this with the main recruiter route
        const applications = await Application.find({ jobId: { $in: jobIds } })
          .populate("applicantId", "name email profilePicture title skills")
          .populate("jobId", "title company")
          .select("+aiAnalysis"); // 👈 This ensures the "Done" state persists
          
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
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