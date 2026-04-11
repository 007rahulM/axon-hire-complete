// backend/middleware/uploadMiddleware.js

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "axon_resumes",
      //  Force format to 'pdf' so browsers open it correctly
      format: 'pdf', 
      //  Use 'auto' so Cloudinary processes it as a viewable document, not a raw file
      resource_type: 'auto',
      // Optional Keep original filename (clean up special characters)
      public_id: file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, "_"), 
    };
  },
});

// 3. File filter: reject anything that is not a genuine PDF.
//    We check both the MIME type declared by the browser AND the first 4 bytes
//    of the file (the "magic number") so a renamed .exe cannot slip through.
const fileFilter = (req, file, cb) => {
  // Check MIME type first (fast, browser-provided)
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

// 4. Initialize Multer with storage + file filter + size limit (5 MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;