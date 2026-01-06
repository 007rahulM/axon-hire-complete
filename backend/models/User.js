//this file defineds how a "user" looks in MongoDB(a schema)

//import mongoose to create schema
const mongoose = require("mongoose");

//create user schema(structure of a user document)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //cannot be empty
  },
  email: {
    type: String,
    required: true,
    unique: true, //no duplicate emails
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String, // 👈 ADD THIS
    unique: true,
    sparse: true
},
  date: {
    type: Date,
    default: Date.now, //automatically store date when user registeres
  },
  // new thing: add the role field
  role: {
    type: String,
    enum: ["user", "admin","recruiter"], //the only possible values
    default: "user", //new sinups are user by default
  },

  //resume url 
  //this will store the path to the the user's master resume
  //we se default null so we  know if they've uploaded one yet
  resumeUrl:{
    type:String,
    default:null,
  },
// 👇 NEW RICH PROFILE FIELDS (Safe to add)
  title: { type: String, default: "" },          // e.g. "Senior React Developer"
  about: { type: String, default: "" },          // e.g. "Passionate coder..."
  skills: { type: [String], default: [] },       // e.g. ["React", "Node.js"]
  experience: [{
    role: String,
    company: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  profilePicture: { type: String, default: "" }, // Cloudinary URL


  // ✅ ADD THIS NEW FIELD:
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],

  
// 👇 NEW FIELDS FOR OTP
  isVerified: { type: Boolean, default: false }, // Cannot login if false
  otp: { type: String }, // The 6-digit code
  otpExpires: { type: Date } // Code expires in 10 mins
});

//export the model to use in other files
module.exports = mongoose.model("User", userSchema);