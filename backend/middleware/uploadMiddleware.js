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


//3 create the file filter 
//this checks the MIME type of the file If its not a PDf it throws an error
const fileFilter=(req,file,cb)=>{
  if(file.mimetype!=="application/pdf"){
    //reject the file and send an error messahe
    return cb(new Error("Only PDF files are allowed"),false);
  }
  //accept the file
  cb(null,true);
};

//4 initialize multer with filter and limits (UPPATEed one)

const upload=multer({
  storage:storage,
  fileFilter:fileFilter, //apply the pdf restriction 
  limits:{fileSize:2*1024*1024} //limit file size to 2MB (prevents server crashes from huge files)

})


module.exports = upload;