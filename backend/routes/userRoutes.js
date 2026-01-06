// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const upload = require("../middleware/uploadMiddleware"); // Your Resume Uploader
// const User = require("../models/User");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // --- 1. LOCAL IMAGE UPLOAD CONFIG (For Avatars) ---
// // Fix: Ensure folder exists to prevent crash
// const uploadDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const avatarStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, "avatar-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const avatarUpload = multer({ 
//   storage: avatarStorage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|webp/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) return cb(null, true);
//     cb(new Error("Images Only!"));
//   }
// });

// // ==========================================
// // 🟢 AVATAR UPLOAD ROUTE (The New Feature)
// // ==========================================
// router.post("/upload-avatar", verifyToken, avatarUpload.single("avatar"), async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Save relative path
//     const avatarUrl = `/uploads/${req.file.filename}`;
    
//     user.profilePicture = avatarUrl;
//     await user.save();

//     res.json({ message: "Avatar updated!", profilePicture: avatarUrl });
//   } catch (err) {
//     console.error("Avatar Upload Error:", err);
//     res.status(500).json({ message: "Image upload failed" });
//   }
// });

// // ==========================================
// // 🟢 RESUME UPLOAD (Your Legacy Logic - Untouched)
// // ==========================================
// router.post("/upload-resume", verifyToken, (req, res) => {
//     const uploadSingle = upload.single("resume");

//     uploadSingle(req, res, async (err) => {
//         if (err) {
//             console.error("Upload Middleware Error:", err);
//             return res.status(500).json({ message: "File upload failed", error: err.message });
//         }

//         try {
//             if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//             const cloudUrl = req.file.path;
//             const user = await User.findById(req.user.id);
//             if (!user) return res.status(404).json({ message: "User not found" });
            
//             user.resumeUrl = cloudUrl;
//             await user.save();

//             res.status(200).json({
//                 message: "Resume uploaded successfully",
//                 user: user,
//                 resumeUrl: cloudUrl,
//             });

//         } catch (dbErr) {
//             console.error("Database Error:", dbErr.message);
//             res.status(500).json({ message: "Server error during database save" });
//         }
//     });
// });

// // ==========================================
// // 🟢 PROFILE DATA ROUTES
// // ==========================================

// router.get("/profile", verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user);
//     } catch (err) {
//         console.error("Profile error:", err.message);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Use this for saving Title/Bio/Skills/Avatar
// router.put("/update-profile", verifyToken, async (req, res) => {
//   try {
//     const { title, about, skills, experience, profilePicture } = req.body;
    
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Only update fields that are actually sent
//     if (title !== undefined) user.title = title;
//     if (about !== undefined) user.about = about;
//     if (skills !== undefined) user.skills = skills;
//     if (experience !== undefined) user.experience = experience;
//     if (profilePicture !== undefined) user.profilePicture = profilePicture;

//     await user.save();
    
//     const updatedUser = await User.findById(req.user.id).select("-password");
//     res.json({ message: "Profile updated successfully!", user: updatedUser });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // LEGACY: CLOUDINARY UPLOADER (Do not touch)
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// --- CLOUDINARY CONFIGURATION FOR AVATARS ---
// We assume you have the same packages installed as your legacy uploader:
// npm install cloudinary multer-storage-cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary (It usually picks up env vars automatically, 
// but we ensure it uses the credentials if loaded by dotenv)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Storage Engine specifically for Avatars
const avatarCloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'axon_avatars', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: "limit" }] // Optional: Resize to save space
    },
});

const avatarUpload = multer({ storage: avatarCloudStorage });

// ==========================================
// 🟢 AVATAR UPLOAD ROUTE (NOW USES CLOUDINARY)
// ==========================================
router.post("/upload-avatar", verifyToken, avatarUpload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // FIX: req.file.path from Cloudinary Storage is the full HTTP URL
    const avatarUrl = req.file.path; 
    
    user.profilePicture = avatarUrl;
    await user.save();

    res.json({ message: "Avatar updated to Cloud!", profilePicture: avatarUrl });
  } catch (err) {
    console.error("Avatar Upload Error:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// ==========================================
// 🟢 RESUME UPLOAD (LEGACY - CLOUDINARY)
// ==========================================
// This uses the 'upload' middleware imported at the top. 
// WE DO NOT TOUCH THIS LOGIC.
router.post("/upload-resume", verifyToken, (req, res) => {
    const uploadSingle = upload.single("resume");

    uploadSingle(req, res, async (err) => {
        if (err) {
            console.error("Upload Middleware Error:", err);
            return res.status(500).json({ message: "File upload failed", error: err.message });
        }

        try {
            if (!req.file) return res.status(400).json({ message: "No file uploaded" });

            // LEGACY CODE: req.file.path comes from Cloudinary Storage
            const cloudUrl = req.file.path;
            
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            
            user.resumeUrl = cloudUrl;
            await user.save();

            res.status(200).json({
                message: "Resume uploaded successfully",
                user: user,
                resumeUrl: cloudUrl,
            });

        } catch (dbErr) {
            console.error("Database Error:", dbErr.message);
            res.status(500).json({ message: "Server error during database save" });
        }
    });
});

// ==========================================
// 🟢 PROFILE DATA ROUTES
// ==========================================

router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        console.error("Profile error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Use this for saving Title/Bio/Skills/Avatar URL manually
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { title, about, skills, experience, profilePicture } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update fields that are actually sent
    if (title !== undefined) user.title = title;
    if (about !== undefined) user.about = about;
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});



// ==========================================
// 🟢 SAVED JOBS FEATURE
// ==========================================

//  Toggle Save/Unsave Job
router.put("/save/:jobId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.jobId;

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already saved
    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      // Remove it (Unsave)
      user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
      await user.save();
      return res.json({ message: "Job removed from saved list", saved: false });
    } else {
      // Add it (Save)
      user.savedJobs.push(jobId);
      await user.save();
      return res.json({ message: "Job saved successfully", saved: true });
    }
  } catch (err) {
    console.error("Save Job Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. Get All Saved Jobs (Populated)
router.get("/saved-jobs", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "savedJobs",
      populate: { path: "postedBy", select: "name" } // Optional: get recruiter name
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.savedJobs);
  } catch (err) {
    console.error("Fetch Saved Jobs Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;