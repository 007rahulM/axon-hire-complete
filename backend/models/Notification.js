const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  }, 
  message: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["info", "success", "warning", "error"], 
    default: "info" 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  relatedLink: { 
    type: String,
    default: "" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


//indexing for faster retrieval of notifications for a user
notificationSchema.index({ user: 1, createdAt: -1 }); // Get recent notifications for a user quickly
notificationSchema.index({ user: 1, isRead: 1 }); // for unread notification count queries
module.exports = mongoose.model("Notification", notificationSchema);