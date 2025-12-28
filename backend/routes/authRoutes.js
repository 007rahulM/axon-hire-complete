// backend/routes/authRoutes.js
//handles user registration and login logic

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const { sendWelcomeEmail, sendOtpEmail } = require("../utils/emailService"); // Updated imports

// --- 1. REGISTER (Step 1: Send OTP) ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) return res.status(400).json({ message: "Fill all fields" });
    if (password !== confirm) return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes from now

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: true, // Not verified yet
      otp,
      otpExpires
    });

    await newUser.save();
    
    // Send the Code
    await sendOtpEmail(email, otp);

    res.status(201).json({ message: "OTP sent to email", email: email });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- 2. VERIFY OTP (Step 2: Activate Account) ---
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if OTP matches and hasn't expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Activate User
    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined;
    await user.save();

    // Send the nice Welcome Email now
    await sendWelcomeEmail(user);

    res.status(200).json({ message: "Account verified successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// --- 3. LOGIN (Check Verification) ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    // 🔒 SECURITY CHECK: Is account verified?
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//-- 2   new recruiter register route
router.post("/register-recruiter",async(req,res)=>{
  try{
    // extract the data from the request body
    const {name,email,password,confirm,companyName,contactEmail,website,companyDescription}=req.body;
    //we accept use info and company info
    if(!name ||!email||!password||!confirm||!companyName ||!contactEmail){
      return res.status(400).json({message:"Please enter all required fields"});
    }
    //check if user exists
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json({message:"User already exists"});

    // create the user role:recruiter
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User(
      {name,email,password:hashedPassword,confirm,role:"recruiter" } //here force role to be recruiter
    );
    const savedUser=await newUser.save();

    // create the company linled to the user
    const newCompany=new Company({
      owner:savedUser._id,  //link to the new recruiter
      name:companyName,
      contactEmail:contactEmail,
      website:website ||"",
      description:companyDescription || ""  
    
    });

    await newCompany.save();
    //send success response auto-login logic
    const payload={ id:savedUser._id,email:savedUser.email,role:savedUser.role};
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"12h"});

    res.status(201).json({
      message:"Recruiter registered successfully",
      token,
      user:{id:savedUser._id,name:savedUser.name,email:savedUser.email,role:savedUser.role},
      Company:newCompany
    });
   }catch(err){
    console.error("Recruiter registration error:",err);
    res.status(500).json({message:"Server error during registration"});
   }
});





// // login with JWT
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" }); // This is the 400 Bad Request you see
    
//     //comapre password with hashed one
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" }); // This is also a 400 Bad Request

//     //check jwt token
//     const payload = {
//       id: user._id,
//       email: user.email,
//       role: user.role, //  includinng the role
//     };
//     const token = jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" } // expires in 12 hour
//     );

//     // send toke +user data to the frontend
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });



module.exports = router;