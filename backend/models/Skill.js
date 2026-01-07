// backend/models/Skill.js
const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  canonical: { type: String, required: true, unique: true, lowercase: true },
  synonyms: { type: [String], default: [] }, // e.g., ["react.js", "reactjs", "frontend react"]
  category: { type: String, default: "technical" },
  isApproved: { type: Boolean, default: true }, // Set to true by default for auto-growth
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);