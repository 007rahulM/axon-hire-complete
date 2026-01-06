const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Notification = require("../models/Notification"); // Import Model directly

// 1. GET MY NOTIFICATIONS (Bell Icon)
router.get("/", verifyToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
       .limit(20);
    
    const unreadCount = await Notification.countDocuments({ 
        user: req.user.id, 
        isRead: false 
    });

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error("Notif Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. MARK ONE AS READ
router.put("/:id/read", verifyToken, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. MARK ALL AS READ
router.put("/read-all", verifyToken, async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id }, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;