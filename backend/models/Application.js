const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: [
        "Submitted",
        "Viewed",
        "Shortlisted",
        "Interviewing",
        "Hired",
        "Rejected",
      ],
      default: "Submitted",
    },

    // 🟢 NEW: Recruiter Manual Overrides
    // If a recruiter clicks "I found this skill," we save it here.
    // Our logic will then ignore the AI and add the points.
    overruledSkills: {
      type: [String],
      default: [],
    },

    // 🟢 NEW: Skills found that were NOT in our SkillMap. 
  // We store these here so the Admin can "Approve" them into the global map later.
  discoveredSkills: { type: [String], default: [] },

    interviewDetails: {
      date: { type: Date },
      time: { type: String },
      link: { type: String },
      notes: { type: String },
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

  aiAnalysis: {
      type: [
        {
          matchScore: { type: Number },
          score: { type: Number }, // 🚀 Add this to support both keys
          experienceRelevance: { type: String },
          summary: { type: String },
          matchedSkills: [String],
          missingRequiredSkills: [String],
          totalMonths: { type: Number },
          professionalMonths: { type: Number }, // 🚀 Add this to match V3
          uniqueLinksFound: { type: Number }, // 🚀 Add this for Portfolio sync
          provider: { type: String },
          metadata: { type: Object }, // 🚀 Ensure metadata is stored
          breakdown: { type: Object }, // 🚀 Store the 60/30/10 math
          analyzedAt: { type: Date, default: Date.now }
        },
      ],
      default: [],
      select: true, // 👈 🚀 FORCE Mongoose to always include this in results
    },
  },
  {
    timestamps: true,
  }
);

//indexies here  to make queries faster when we search for all applications for a job or by a user
applicationSchema.index({ jobId: 1, applicantId: 1 });//to quickly find if a user has already applied to a job
applicationSchema.index({ createdAt: -1 }); //to quickly sort applications by most recent
applicationSchema.index({ applicantId: 1 }); // for "my-applications" route — find all apps by a user

module.exports = mongoose.model("Application", applicationSchema);