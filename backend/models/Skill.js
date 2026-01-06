const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  canonical: { type: String, required: true, unique: true, lowercase: true },
  category: { type: String, default: "uncategorized" },
  synonyms: { type: [String], default: [] },
  implicit: { type: [String], default: [] },
  weight: { type: Number, default: 1.0 },
  section: { type: String, enum: ["experience", "skillsList", "general"], default: "experience" },
  level: { type: String, enum: ["junior", "mid", "senior"], default: "mid" },
  isApproved: { type: Boolean, default: true }, // Approved = Vetted SkillMap
  source: { type: String, enum: ["system", "ai", "recruiter"], default: "system" },
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);