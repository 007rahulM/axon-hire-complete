// const nodemailer = require("nodemailer");

// // 1. Configure the Transporter (Connects to Gmail)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // --- 🎨 THE PROFESSIONAL TEMPLATE BUILDER ---
// // This function wraps every email in a beautiful HTML layout
// const createTemplate = (title, bodyContent, buttonText, buttonLink) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head> 
//       <style>
//         body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
//         .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
//         .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; }
//         .logo { color: white; font-size: 24px; font-weight: 800; letter-spacing: -1px; margin: 0; }
//         .content { padding: 40px 30px; color: #334155; line-height: 1.6; font-size: 16px; }
//         .h1 { color: #1e293b; font-size: 22px; font-weight: 700; margin-top: 0; }
//         .btn { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
//         .btn:hover { background-color: #4338ca; }
//         .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
//         .highlight { color: #4f46e5; font-weight: 600; }
//         .status-box { background-color: #f1f5f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0; border-radius: 4px; }
//         .prepare-list { background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px 20px; border-radius: 8px; margin-top: 20px; }
//         .prepare-list li { margin-bottom: 8px; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1 class="logo">Axon Hire</h1>
//         </div>

//         <div class="content">
//           <h2 class="h1">${title}</h2>
//           ${bodyContent}
          
//           ${buttonText ? `<div style="text-align: center;"><a href="${buttonLink}" class="btn" style="color: white;">${buttonText}</a></div>` : ''}
//         </div>

//         <div class="footer">
//           <p>&copy; ${new Date().getFullYear()} Axon Hire Intelligence. All rights reserved.</p>
//           <p>Automated Notification • Do not reply</p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // --- HELPER: Sending Logic ---
// const sendEmail = async (to, subject, htmlContent) => {
//   try {
//     const mailOptions = {
//       from: `"Axon Hire" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
//       to: to,
//       subject: subject,
//       html: htmlContent,
//     };

//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//       const info = await transporter.sendMail(mailOptions);
//       console.log(`✅ Email sent to ${to} | ID: ${info.messageId}`);
//     } else {
//       console.log(`⚠️ Email Simulation (No Creds): To ${to}`);
//     }
//   } catch (error) {
//     console.error("❌ Email failed:", error.message);
//   }
// };

// // --- 📧 1. WELCOME EMAIL ---
// const sendWelcomeEmail = async (user) => {
//   const subject = "Welcome to the Future of Hiring";
//   const body = `
//     <p>Hi <strong>${user.name}</strong>,</p>
//     <p>Welcome to <span class="highlight">Axon Hire</span>. Your account has been successfully created.</p>
//     <p>You are now part of an intelligent ecosystem that filters noise and highlights talent. To get started, please upload your master resume to unlock our AI scoring engine.</p>
//   `;
  
//   const html = createTemplate("Account Activated", body, "Go to Dashboard", "https://axon-hire-complete-mvp.vercel.app");
//   await sendEmail(user.email, subject, html);
// };

// // --- 📧 2. APPLICATION RECEIVED ---
// const sendApplicationEmail = async (user, jobTitle, companyName) => {
//   const subject = `Application Received: ${jobTitle}`;
//   const body = `
//     <p>Hi ${user.name},</p>
//     <p>This email confirms that your application for <strong>${jobTitle}</strong> at <span class="highlight">${companyName}</span> has been securely transmitted.</p>
//     <div class="status-box">
//       <strong>Status:</strong> Submitted<br/>
//       <strong>Next Step:</strong> Our AI and Recruiting team will review your profile.
//     </div>
//     <p>Good luck!</p>
//   `;

//   const html = createTemplate("Application Sent", body, "Track Application", "https://axon-hire-complete-mvp.vercel.app/my-applications");
//   await sendEmail(user.email, subject, html);
// };

// // --- 📧 3. STATUS UPDATE (Shortlisted or Rejected) ---
// const sendStatusUpdateEmail = async (user, jobTitle, status) => {
//   const isShortlisted = status === "Shortlisted";
//   const subject = isShortlisted ? `🎉 Good News! Shortlisted for ${jobTitle}` : `Update on your application for ${jobTitle}`;
  
//   let content = "";

//   if (isShortlisted) {
//     // 🔥 THE "PREPARE" SECTION YOU REQUESTED
//     content = `
//       <p>Hi ${user.name},</p>
//       <p>Great news! Your profile stood out. You have been <strong>Shortlisted</strong> for the <span class="highlight">${jobTitle}</span> position.</p>
      
//       <div class="prepare-list">
//         <h3 style="margin-top:0; color: #b45309;">🚀 How to Prepare Next:</h3>
//         <ul style="padding-left: 20px; color: #92400e;">
//           <li>Review the job description thoroughly.</li>
//           <li>Prepare for a technical screening call.</li>
//           <li>Have your portfolio or GitHub ready to present.</li>
//           <li>Expect an email or call from the recruiter soon.</li>
//         </ul>
//       </div>
//     `;
//   } else {
//     // Rejected (Polite Version)
//     content = `
//       <p>Hi ${user.name},</p>
//       <p>Thank you for giving us the opportunity to review your profile for the <strong>${jobTitle}</strong> role.</p>
//       <p>While your background is impressive, we have decided to move forward with other candidates who match our current needs more closely.</p>
//       <p>We encourage you to apply for other openings in the future.</p>
//     `;
//   }

//   const html = createTemplate(
//     isShortlisted ? "Congratulations!" : "Application Update", 
//     content, 
//     "View Details", 
//     "https://axon-hire-complete-mvp.vercel.app/my-applications"
//   );
  
//   await sendEmail(user.email, subject, html);
// };
// // --- 📧 4. SEND OTP CODE ---
// const sendOtpEmail = async (email, otpCode) => {
//   const subject = "Verify your Email - Axon Hire";
//   const body = `
//     <div style="text-align: center;">
//       <p>Please use the following code to verify your account:</p>
//       <h1 style="font-size: 32px; letter-spacing: 5px; color: #4f46e5; margin: 20px 0;">${otpCode}</h1>
//       <p>This code will expire in 10 minutes.</p>
//     </div>
//   `;
  
//   const html = createTemplate("Verify Your Account", body, null, null);
//   await sendEmail(email, subject, html);
// };

// // --- 📧 5. INTERVIEW INVITATION ---
// const sendInterviewEmail = async (user, jobTitle, company, details) => {
//   const subject = `Interview Invitation: ${jobTitle} at ${company}`;
  
//   const body = `
//     <p>Hi ${user.name},</p>
//     <p>We were impressed by your profile and would like to invite you for an interview for the <strong>${jobTitle}</strong> position.</p>
    
//     <div class="status-box" style="background-color: #f0fdf4; border-left: 4px solid #16a34a;">
//       <h3 style="margin: 0 0 10px 0; color: #166534;">🗓️ Interview Details</h3>
//       <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(details.date).toDateString()}</p>
//       <p style="margin: 5px 0;"><strong>Time:</strong> ${details.time}</p>
//       <p style="margin: 5px 0;"><strong>Link:</strong> <a href="${details.link}" target="_blank">${details.link}</a></p>
//     </div>

//     <p>Please make sure to join the link 5 minutes early. If this time does not work, reply to this email immediately.</p>
//   `;

//   const html = createTemplate("You're Invited!", body, "Join Meeting", details.link);
//   await sendEmail(user.email, subject, html);
// };

// // backend/utils/emailService.js

// // ... existing code ...

// // --- 📧 6. ADMIN FEEDBACK EMAIL ---
// const sendFeedbackEmail = async (userEmail, userName, category, message) => {
//   const subject = `New User Feedback: ${category}`;
//   const adminEmail = process.env.EMAIL_USER; // Sends to yourself

//   const body = `
//     <div class="status-box">
//       <h3 style="margin: 0 0 10px 0; color: #4f46e5;">📩 New Feedback Received</h3>
//       <p><strong>From:</strong> ${userName} (${userEmail})</p>
//       <p><strong>Category:</strong> ${category}</p>
//       <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;">
//       <p style="white-space: pre-wrap;">${message}</p>
//     </div>
//   `;

//   const html = createTemplate("Feedback Received", body, null, null);
//   await sendEmail(adminEmail, subject, html);
// };

// // Update exports at the bottom
// module.exports = { 
//     sendWelcomeEmail, 
//     sendApplicationEmail, 
//     sendStatusUpdateEmail, 
//     sendOtpEmail, 
//     sendInterviewEmail,
//     sendFeedbackEmail // 👈 Add this
// };

// // Don't forget to add it to exports!
// // module.exports = { sendWelcomeEmail, sendApplicationEmail, sendStatusUpdateEmail, sendOtpEmail, sendInterviewEmail ,sendFeedbackEmail};




const nodemailer = require("nodemailer");

// 1. Configure the Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 🎨 THE "SUPERB" PREMIUM TEMPLATE BUILDER ---
// Completely rebuilt for flawless mobile responsiveness and modern SaaS aesthetics
const createTemplate = (title, bodyContent, buttonText, buttonLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head> 
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${title}</title>
      <style type="text/css">
        /* Client-specific Resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Base Styles */
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        
        /* Layout Structure */
        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7fa; padding: 40px 0; }
        .main-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid #eaedf2; }
        
        /* Header - Top Accent Border for Premium Feel */
        .header { padding: 35px 30px 30px; text-align: center; border-bottom: 1px solid #eaedf2; border-top: 6px solid #0052cc; }
        .logo { font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
        .logo span:first-child { color: #0f172a; }
        .logo span:last-child { color: #0052cc; }
        
        /* Content & Typography */
        .content { padding: 40px 40px 30px; }
        .title { color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 20px 0; }
        p { color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; }
        .highlight { color: #0f172a; font-weight: 600; }
        
        /* Call to Action - Beautiful Green Button */
        .btn-wrapper { text-align: center; margin: 35px 0 10px 0; }
        .btn { display: inline-block; background-color: #15803d; color: #ffffff !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: background-color 0.2s; }
        
        /* Premium Info Cards */
        .info-card { background-color: #f8fafc; border-radius: 8px; padding: 20px 25px; margin: 25px 0; border-left: 4px solid #0052cc; }
        .success-card { background-color: #f0fdf4; border-radius: 8px; padding: 20px 25px; margin: 25px 0; border-left: 4px solid #16a34a; }
        .card-title { margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #0f172a; }
        .card-text { margin: 0; font-size: 15px; color: #475569; }
        
        /* Flawless OTP Box */
        .otp-container { text-align: center; margin: 35px 0; }
        .otp-box { display: inline-block; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px 35px; letter-spacing: 8px; font-size: 36px; font-weight: 700; color: #0f172a; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        
        /* Footer */
        .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #eaedf2; }
        .footer p { color: #94a3b8; font-size: 13px; margin: 0 0 5px 0; }

        /* 📱 MOBILE MEDIA QUERIES (The Magic Sauce) */
        @media only screen and (max-width: 620px) {
          .wrapper { padding: 15px !important; background-color: #ffffff !important; }
          .main-container { max-width: 100% !important; border-radius: 8px !important; box-shadow: none !important; border: 1px solid #eaedf2 !important; }
          .content { padding: 30px 20px !important; }
          .header { padding: 25px 20px !important; }
          .title { font-size: 20px !important; }
          p { font-size: 15px !important; }
          /* Mobile Button becomes full width for easy tapping */
          .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 16px 0 !important; }
          /* Mobile OTP scales down perfectly */
          .otp-box { font-size: 28px !important; padding: 18px 20px !important; letter-spacing: 6px !important; width: 100% !important; box-sizing: border-box !important; }
          .info-card, .success-card { padding: 15px !important; }
        }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <div class="main-container">
          <div class="header">
            <h1 class="logo">
              <span>Axon</span><span>Hire</span>
            </h1>
          </div>

          <div class="content">
            <h2 class="title">${title}</h2>
            ${bodyContent}
            
            ${buttonText ? `
            <div class="btn-wrapper">
              <a href="${buttonLink}" class="btn">${buttonText}</a>
            </div>` : ''}
          </div>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} AxonHire Intelligence. All rights reserved.</p>
            <p>Automated Notification • Please do not reply to this email.</p>
          </div>
        </div>
      </center>
    </body>
    </html>
  `;
};

// --- HELPER: Sending Logic ---
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"AxonHire" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${to} | ID: ${info.messageId}`);
    } else {
      console.log(`⚠️ Email Simulation (No Creds): To ${to}`);
    }
  } catch (error) {
    console.error("❌ Email failed:", error.message);
  }
};

// --- 📧 1. WELCOME EMAIL ---
const sendWelcomeEmail = async (user) => {
  const subject = "Welcome to the Future of Hiring";
  const body = `
    <p>Hi ${user.name},</p>
    <p>Welcome to <span class="highlight">AxonHire</span>. Your account has been successfully verified and is now fully active.</p>
    <p>You have joined an intelligent ecosystem designed to cut through the noise and highlight true talent. To get started, upload your master resume to unlock our AI scoring engine.</p>
  `;
  const html = createTemplate("Account Activated", body, "Go to Dashboard", "https://axon-hire-complete-mvp.vercel.app");
  await sendEmail(user.email, subject, html);
};

// --- 📧 2. APPLICATION RECEIVED ---
const sendApplicationEmail = async (user, jobTitle, companyName) => {
  const subject = `Application Received: ${jobTitle}`;
  const body = `
    <p>Hi ${user.name},</p>
    <p>This email confirms that your application for the <strong>${jobTitle}</strong> position at <span class="highlight">${companyName}</span> has been securely transmitted.</p>
    <div class="info-card">
      <h4 class="card-title">Status: Submitted successfully</h4>
      <p class="card-text">Our AI matching engine and the recruiting team are currently reviewing your profile. We will notify you as soon as there is an update.</p>
    </div>
  `;
  const html = createTemplate("Application Sent", body, "Track Application", "https://axon-hire-complete-mvp.vercel.app/my-applications");
  await sendEmail(user.email, subject, html);
};

// --- 📧 3. STATUS UPDATE ---
const sendStatusUpdateEmail = async (user, jobTitle, status) => {
  const isShortlisted = status === "Shortlisted";
  const subject = isShortlisted ? `Action Required: Shortlisted for ${jobTitle}` : `Update regarding your application for ${jobTitle}`;
  let content = "";

  if (isShortlisted) {
    content = `
      <p>Hi ${user.name},</p>
      <p>Great news! Your profile stood out from the crowd. You have been <strong>officially shortlisted</strong> for the <span class="highlight">${jobTitle}</span> position.</p>
      
      <div class="success-card">
        <h4 class="card-title">🚀 Next Steps & Preparation:</h4>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 15px;">
          <li style="margin-bottom: 8px;">Review the core requirements in the job description thoroughly.</li>
          <li style="margin-bottom: 8px;">Prepare for a technical screening call with the hiring team.</li>
          <li style="margin-bottom: 8px;">Ensure your portfolio or GitHub repositories are up to date.</li>
          <li>Keep an eye on your inbox for an official interview invitation.</li>
        </ul>
      </div>
    `;
  } else {
    content = `
      <p>Hi ${user.name},</p>
      <p>Thank you for taking the time to apply for the <strong>${jobTitle}</strong> role.</p>
      <p>While your background is impressive, the team has decided to move forward with other candidates whose experience more closely aligns with our immediate needs for this specific role.</p>
      <p>We encourage you to keep your AxonHire profile updated and apply for future openings that match your skill set.</p>
    `;
  }

  const html = createTemplate(isShortlisted ? "Congratulations!" : "Application Update", content, "View Application Status", "https://axon-hire-complete-mvp.vercel.app/my-applications");
  await sendEmail(user.email, subject, html);
};

// --- 📧 4. SEND OTP CODE ---
const sendOtpEmail = async (email, otpCode) => {
  const subject = "Verify your email address - AxonHire";
  const body = `
    <p style="text-align: center;">You requested an email verification code for your AxonHire account. Please enter the code below to complete your secure sign-in.</p>
    
    <div class="otp-container">
      <div class="otp-box">${otpCode}</div>
    </div>
    
    <p style="text-align: center; font-size: 14px; color: #64748b; margin-top: 0;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
  `;
  const html = createTemplate("Verify your email", body, null, null);
  await sendEmail(email, subject, html);
};

// --- 📧 5. INTERVIEW INVITATION ---
const sendInterviewEmail = async (user, jobTitle, company, details) => {
  const subject = `Interview Invitation: ${jobTitle} at ${company}`;
  const body = `
    <p>Hi ${user.name},</p>
    <p>We are excited to invite you to an interview for the <strong>${jobTitle}</strong> position.</p>
    
    <div class="info-card">
      <h4 class="card-title" style="margin-bottom: 12px;">🗓️ Interview Details</h4>
      <p class="card-text" style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date(details.date).toDateString()}</p>
      <p class="card-text" style="margin-bottom: 8px;"><strong>Time:</strong> ${details.time}</p>
      <p class="card-text"><strong>Link:</strong> <a href="${details.link}" target="_blank" style="color: #0052cc; font-weight: 600;">Join Meeting Room</a></p>
    </div>

    <p>Please ensure you are in a quiet environment and try to join the meeting 5 minutes early. If you need to reschedule, reply to this email immediately.</p>
  `;
  const html = createTemplate("You're Invited!", body, "Join Meeting", details.link);
  await sendEmail(user.email, subject, html);
};

// --- 📧 6. ADMIN FEEDBACK EMAIL ---
const sendFeedbackEmail = async (userEmail, userName, category, message) => {
  const subject = `System Feedback: ${category}`;
  const adminEmail = process.env.EMAIL_USER; 
  const body = `
    <div class="info-card">
      <h4 class="card-title" style="margin-bottom: 16px;">📩 New User Feedback</h4>
      <p class="card-text" style="margin-bottom: 8px;"><strong>From:</strong> ${userName} (<a href="mailto:${userEmail}" style="color: #0052cc;">${userEmail}</a>)</p>
      <p class="card-text" style="margin-bottom: 16px;"><strong>Category:</strong> ${category}</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;">
      <h4 class="card-title" style="font-size: 14px; color: #64748b;">Message:</h4>
      <p class="card-text" style="white-space: pre-wrap;">${message}</p>
    </div>
  `;
  const html = createTemplate("Feedback Received", body, null, null);
  await sendEmail(adminEmail, subject, html);
};

module.exports = { 
  sendWelcomeEmail, 
  sendApplicationEmail, 
  sendStatusUpdateEmail, 
  sendOtpEmail, 
  sendInterviewEmail,
  sendFeedbackEmail 
};