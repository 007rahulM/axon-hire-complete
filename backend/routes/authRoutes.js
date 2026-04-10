// backend/routes/authRoutes.js
//handles user registration and login logic

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/Company");
const { sendWelcomeEmail, sendOtpEmail } = require("../utils/emailService"); // Updated imports
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const verifyToken = require("../middleware/authMiddleware");
const crypto=require("crypto");
const {body,validationResult}=require("express-validator");
const logger=require("../utils/logger");

router.post("/register",[
  body('name').notEmpty().withMessage('Name is required'),
    body("email").notEmpty().withMessage("Valid email is required"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters"),
    body("confirm").custom((value,{req})=>value===req.body.password).withMessage("Password do not match"),
  
], async (req, res) => {

//check validation results
const erros=validationResult(req);
if(!erros.isEmpty()){
  return res.status(400).json({errors:erros.array()});
}


  try {

    
    // 🛠 FIX 1: Corrected typo 'passowrd' to 'password'
    const { name, email, password, confirm } = req.body;
    
    // 🛠 FIX 2: Ensure all check variables match the destructured names
    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "Fill all fields" });
    }
    
    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    //logger .info  of attempting to user register 
    logger.info(`New user registration attempt: ${email}`);
    
    // Check if user exists and if they are verified
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "User already exists and is verified. Please login" });
      }
      
      // If unverified, update their details so they can try again (Idempotent Registration)
      user.name = name;
      user.password = await bcrypt.hash(password, 10);
    } else {
      // Create a brand new user record
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        isVerified: false // 🛠 FIX 3: Corrected 'isVerifiedLfalse' typo
      });
    }

    // Secure OTP generation using crypto
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = User.hashToken(otp); // store only the hash — never the raw OTP
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await user.save();

    // Send email after saving so we have a record to verify against 
    await sendOtpEmail(email, otp); //
    
    res.status(200).json({ message: "OTP sent to email", email: email });
  } catch (err) {

    //on error logger
    logger.error(`Registration failed for ${email}: ${err.message}`);

    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- 2. VERIFY OTP (Step 2: Activate Account) ---
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp ,companyData } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if OTP matches (compare hash) and hasn't expired
    const hashedInput = User.hashToken(otp);
    if (user.otp !== hashedInput || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Activate User
    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined;
    await user.save();

    //laxy initialization:Create Company profile only after verification 
    if(user.role==="recruiter" && companyData){
      const newCompany=new Company({
        owner:user._id,
        name:companyData.companyName,
        contactEmail:companyData.contactEmail,
        website:companyData.website||"",
        description:companyData.companyDescription||""
      });
      await newCompany.save();
      console.log(`Verified Recruiter: ${user.email} | Created Company:${companyData.companyName}`);
    }
  const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Send the nice Welcome Email now
    await sendWelcomeEmail(user);
res.status(200).json({ 
      message: "Account verified successfully!",
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Verification Error:",err);
    res.status(500).json({ message: "Server error" });
  }
});



//-- 2. New Recruiter Register Route
router.post("/register-recruiter",[
body('name').notEmpty().withMessage("Name is required"),
body("email").isEmail().withMessage("Valid email is required"),
body("password").isLength({min:6}).withMessage("Password must be at least 6 characters"),
body("confirm").custom((value,{req})=>value==req.body.password).withMessage("Passwords do not match"),

],
   async (req, res) => {

    //check validation results
    const erros=validationResult(req);
    if(!erros.isEmpty()){
      return res.status(400).json({erros:erros.array()});
    }

  try {
    // Extract data from the request body
    const { name, email, password, confirm } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // CHECK IF USER EXISTS
    // We use 'let' here because we might need to reassign 'user' if they don't exist yet
    let user = await User.findOne({ email });

    if (user) {
      // If user exists and is already verified, stop them.
      if (user.isVerified) {
        return res.status(400).json({ message: "Account already exists. Please login" });
      }

      // If unverified, update their info to allow retrying (Idempotent)
      user.name = name;
      user.password = await bcrypt.hash(password, 10);
    } else {
      // CREATE NEW USER (Recruiter)
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: "recruiter", // Explicitly set role
        isVerified: false
      });
    }

    // GENERATE OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = User.hashToken(otp); // store only the hash
    
    // Set Expiration: 10 minutes (10 * 60s * 1000ms)
    user.otpExpires = Date.now() + 10 * 60 * 1000; 

    await user.save();
    
    // Send email
    await sendOtpEmail(email, otp);

    // Response: 200 OK. 
    // We do NOT send a token here, so the user is NOT logged in yet.
    res.status(200).json({ message: "Recruiter OTP sent", email });

  } catch (err) {
    console.error("Recruiter Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//     // create the user role:recruiter
//     const hashedPassword=await bcrypt.hash(password,10);
//     const newUser=new User(
//       {name,email,password:hashedPassword,confirm,role:"recruiter" } //here force role to be recruiter
//     );
//     const savedUser=await newUser.save();

//     // create the company linled to the user
//     const newCompany=new Company({
//       owner:savedUser._id,  //link to the new recruiter
//       name:companyName,
//       contactEmail:contactEmail,
//       website:website ||"",
//       description:companyDescription || ""  
    
//     });

//     await newCompany.save();
//     //send success response auto-login logic
//     const payload={ id:savedUser._id,email:savedUser.email,role:savedUser.role};
//     const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"12h"});

//     res.status(201).json({
//       message:"Recruiter registered successfully",
//       token,
//       user:{id:savedUser._id,name:savedUser.name,email:savedUser.email,role:savedUser.role},
//       Company:newCompany
//     });
//    }catch(err){
//     console.error("Recruiter registration error:",err);
//     res.status(500).json({message:"Server error during registration"});
//    }
// });





// login with JWT
router.post("/login",[
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({min:6}).withMessage("Password must be at least 6 characters")

], async (req, res) => {

  //check validation results
  const errors=validationResult(req);
  if(!errors.isEmpty()){
logger.error(`Validation failed :${JSON.stringify(errors.array())}`,{email:req.body.email});
    return res.status(400).json({errors:errors.array()});
  }
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" }); // This is the 400 Bad Request you see
    
//we check isVerified before we run bcrypt.compare
//this saves cpu resorces on unverifed accounts
if(!user.isVerified){
  return res.status(403).json({
    message:"Please verify your email before logging in ",
    isVerified:false,
    email:user.email
  });
}

// --- ACCOUNT LOCKOUT CHECK ---
// If account is locked and the lock window hasn't expired yet, reject immediately.
if (user.lockUntil && user.lockUntil > Date.now()) {
  const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
  return res.status(423).json({
    message: `Account locked due to too many failed attempts. Try again in ${minutesLeft} minute(s).`,
  });
}

    //comapre password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment failed attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= User.MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + User.LOCK_DURATION);
        user.loginAttempts = 0; // reset counter after locking
      }
      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

// Reset lockout counters on successful login
user.loginAttempts = 0;
user.lockUntil = undefined;
await user.save();

    //check jwt token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, //  includinng the role
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" } // expires in 12 hour
    );

    // send toke +user data to the frontend
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

//  POST /api/auth/google 
router.post("/google", async (req, res) => {
  try {
    // Debug log to see exactly what frontend sent
    console.log("🔹 Google Route Hit. Body:", req.body);

    const { token } = req.body;
    
    //  Don't crash if token is missing
    if (!token) {
        console.error("❌ Error: No token found in request body.");
        return res.status(400).json({ message: "No token provided" });
    }

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { name, email, sub } = ticket.getPayload(); // sub is the google ID
    console.log("✅ Google Verified User:", email);

    // 2. Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but has no googleId, link it
      if (!user.googleId) {
        user.googleId = sub;
        await user.save();
      }
    } else {
      // 3. Create new user if not exists
      console.log("Creating new Google user...");
      user = await User.create({
        name,
        email,
        googleId: sub,
        role: "user", // Default role
        // 🛠 Fix: Add dummy password if your User model requires it
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10) 
      });
    }

    // 4. Generate YOUR App Token (JWT)
    const appToken = jwt.sign(
       { id: user._id, role: user.role, email: user.email }, 
       process.env.JWT_SECRET, 
       { expiresIn: "1d" }
    );

    // Send success response
    res.json({ 
        message: "Google Login Successful",
        token: appToken, 
        user: { id: user._id, name: user.name, role: user.role, email: user.email } 
    });

  } catch (err) {
    console.error("❌ Google Auth Error:", err.message);
    // Return 400 instead of 500 to prevent app crash loop
    res.status(400).json({ message: "Google Login Failed: " + err.message });
  }
});

// ------------------------------------------------------------------
// NEW ROUTE: UPGRADE USER TO RECRUITER (Onboarding)
// ------------------------------------------------------------------
// --- 5. NEW RECRUITER ONBOARDING ROUTE ---
// Inside backend/routes/authRoutes.js

router.put("/onboard-recruiter", [
  body("companyName").notEmpty().withMessage("Company Name is required"),
  body("contactEmail").isEmail().withMessage("Valid company emial is required"),
  body("website").optional().isURL().withMessage("Valid URL is required for website"),
  body("description").optional().isLength({ max: 500 }).withMessage("Description can be up to 500 characters long"),

],
  
  verifyToken, async (req, res) => {


    //check validation results
    const erros=validationResult(req);
    if(!erros.isEmpty()){
      return res.status(400).json({erros:erros.array()});
    }

  try {
    //  Extract new fields
    const { companyName, contactEmail, website, description, logo, size, industry, location } = req.body;
    const userId = req.user.id;

    if (!companyName || !contactEmail) {
      return res.status(400).json({ message: "Company Name and Email are required." });
    }

    const existingCompany = await Company.findOne({ owner: userId });
    if (existingCompany) {
      return res.status(400).json({ message: "You already have a company profile." });
    }

    const newCompany = new Company({
      owner: userId,
      name: companyName,
      contactEmail,
      website,
      description,
      // Save new fields
      logo: logo || "",
      size: size || "",
      industry: industry || "",
      location: location || ""
    });
    await newCompany.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "recruiter" },
      { new: true }
    ).select("-password");

    const newToken = jwt.sign(
      { id: updatedUser._id, role: "recruiter", email: updatedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      message: "Upgrade successful",
      user: updatedUser,
      token: newToken,
      company: newCompany
    });

  } catch (err) {
    console.error("Onboarding Error:", err);
    res.status(500).json({ message: "Server Error during onboarding" });
  }
});

// --- RESEND OTP ---
// Lets a user request a fresh OTP if their email went to spam or expired.
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Account is already verified" });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = User.hashToken(otp);
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "A new OTP has been sent to your email" });
  } catch (err) {
    logger.error(`Resend OTP failed for ${req.body.email}: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

// --- FORGOT PASSWORD ---
// Sends a one-time password-reset link to the user's email.
// We store only the SHA-256 hash of the token in the DB; the raw token is in the link.
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    // Always return 200 to avoid leaking which emails are registered
    if (!user) return res.status(200).json({ message: "If that email exists, a reset link has been sent" });

    // Generate a cryptographically secure random token
    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = User.hashToken(rawToken);
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Build the reset URL that will be emailed to the user
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

    // Re-use the existing email transporter from emailService or nodemailer directly
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Axon Hire" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Axon Hire password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password. This link expires in 1 hour.</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, ignore this email.</p>
      `,
    });

    res.status(200).json({ message: "If that email exists, a reset link has been sent" });
  } catch (err) {
    logger.error(`Forgot password failed: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

// --- RESET PASSWORD ---
// Validates the reset token (by hashing the incoming raw token and comparing),
// then saves the new hashed password and clears the token fields.
router.post("/reset-password/:token", [
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const hashedToken = User.hashToken(req.params.token);
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Reset link is invalid or has expired" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    // Clear any lockout state too
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    logger.error(`Reset password failed: ${err.message}`);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;