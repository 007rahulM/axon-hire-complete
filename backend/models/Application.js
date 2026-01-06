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

    aiAnalysis: [
     {
      matchScore: { type: Number },
      experienceRelevance: { type: String },
      summary: { type: String },
      matchedSkills: [String],        // Unique list of matches
      missingRequiredSkills: [String], // Unique list of gaps
      totalMonths: { type: Number },   // Verified Professional Duration
      provider: { type: String },      // "Gemini", "Groq", etc.
      analyzedAt: { type: Date, default: Date.now }
    },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);