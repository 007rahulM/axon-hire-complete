const express = require("express");
const router = express.Router();
const JobAlert = require("../models/JobAlert"); 
// Import your auth middleware to get the user's ID
//const userAuth = require("../middlewares/authMiddleware"); 
const verifyToken = require("../middleware/authMiddleware");

// POST /api/alerts/subscribe
// User sends: { keywords: ["React", "Node"] }
router.post("/subscribe", verifyToken, async (req, res) => {
  try {
    const { keywords } = req.body; 
    
    // We get the user ID and Email from the token (via userAuth middleware)
    const userId = req.user.id;   
    const userEmail = req.user.email; 

    if (!keywords || keywords.length === 0) {
      return res.status(400).json({ message: "Please provide keywords" });
    }

    // Check if this user already has an alert setup
    let alert = await JobAlert.findOne({ userId });

    if (alert) {
      // If yes, add new keywords to existing list (removing duplicates)
      const uniqueKeywords = [...new Set([...alert.keywords, ...keywords])];
      alert.keywords = uniqueKeywords;
      await alert.save();
    } else {
      // If no, create a new alert entry
      alert = await JobAlert.create({
        userId,
        userEmail,
        keywords
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Job Alert Subscribed Successfully!", 
      data: alert 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in subscribing to alerts" });
  }
});

module.exports = router;