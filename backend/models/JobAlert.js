const mongoose = require("mongoose");

const jobAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String, // We need this to send the email later
    required: true,
  },
  // Example: ["React", "Remote", "Intern"]
  keywords: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobAlert", jobAlertSchema);