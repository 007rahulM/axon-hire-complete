const nodemailer = require("nodemailer");

// 1. Configure the Transporter (Connects to Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 🎨 THE PROFESSIONAL TEMPLATE BUILDER ---
// This function wraps every email in a beautiful HTML layout
const createTemplate = (title, bodyContent, buttonText, buttonLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; }
        .logo { color: white; font-size: 24px; font-weight: 800; letter-spacing: -1px; margin: 0; }
        .content { padding: 40px 30px; color: #334155; line-height: 1.6; font-size: 16px; }
        .h1 { color: #1e293b; font-size: 22px; font-weight: 700; margin-top: 0; }
        .btn { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
        .btn:hover { background-color: #4338ca; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        .highlight { color: #4f46e5; font-weight: 600; }
        .status-box { background-color: #f1f5f9; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0; border-radius: 4px; }
        .prepare-list { background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px 20px; border-radius: 8px; margin-top: 20px; }
        .prepare-list li { margin-bottom: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Axon Hire</h1>
        </div>

        <div class="content">
          <h2 class="h1">${title}</h2>
          ${bodyContent}
          
          ${buttonText ? `<div style="text-align: center;"><a href="${buttonLink}" class="btn" style="color: white;">${buttonText}</a></div>` : ''}
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Axon Hire Intelligence. All rights reserved.</p>
          <p>Automated Notification • Do not reply</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// --- HELPER: Sending Logic ---
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: '"Axon Hire" <axon.hire.project@gmail.com>',
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
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>Welcome to <span class="highlight">Axon Hire</span>. Your account has been successfully created.</p>
    <p>You are now part of an intelligent ecosystem that filters noise and highlights talent. To get started, please upload your master resume to unlock our AI scoring engine.</p>
  `;
  
  const html = createTemplate("Account Activated", body, "Go to Dashboard", "https://axon-hire.vercel.app/login");
  await sendEmail(user.email, subject, html);
};

// --- 📧 2. APPLICATION RECEIVED ---
const sendApplicationEmail = async (user, jobTitle, companyName) => {
  const subject = `Application Received: ${jobTitle}`;
  const body = `
    <p>Hi ${user.name},</p>
    <p>This email confirms that your application for <strong>${jobTitle}</strong> at <span class="highlight">${companyName}</span> has been securely transmitted.</p>
    <div class="status-box">
      <strong>Status:</strong> Submitted<br/>
      <strong>Next Step:</strong> Our AI and Recruiting team will review your profile.
    </div>
    <p>Good luck!</p>
  `;

  const html = createTemplate("Application Sent", body, "Track Application", "https://axon-hire.vercel.app/my-applications");
  await sendEmail(user.email, subject, html);
};

// --- 📧 3. STATUS UPDATE (Shortlisted or Rejected) ---
const sendStatusUpdateEmail = async (user, jobTitle, status) => {
  const isShortlisted = status === "Shortlisted";
  const subject = isShortlisted ? `🎉 Good News! Shortlisted for ${jobTitle}` : `Update on your application for ${jobTitle}`;
  
  let content = "";

  if (isShortlisted) {
    // 🔥 THE "PREPARE" SECTION YOU REQUESTED
    content = `
      <p>Hi ${user.name},</p>
      <p>Great news! Your profile stood out. You have been <strong>Shortlisted</strong> for the <span class="highlight">${jobTitle}</span> position.</p>
      
      <div class="prepare-list">
        <h3 style="margin-top:0; color: #b45309;">🚀 How to Prepare Next:</h3>
        <ul style="padding-left: 20px; color: #92400e;">
          <li>Review the job description thoroughly.</li>
          <li>Prepare for a technical screening call.</li>
          <li>Have your portfolio or GitHub ready to present.</li>
          <li>Expect an email or call from the recruiter soon.</li>
        </ul>
      </div>
    `;
  } else {
    // Rejected (Polite Version)
    content = `
      <p>Hi ${user.name},</p>
      <p>Thank you for giving us the opportunity to review your profile for the <strong>${jobTitle}</strong> role.</p>
      <p>While your background is impressive, we have decided to move forward with other candidates who match our current needs more closely.</p>
      <p>We encourage you to apply for other openings in the future.</p>
    `;
  }

  const html = createTemplate(
    isShortlisted ? "Congratulations!" : "Application Update", 
    content, 
    "View Details", 
    "https://axon-hire.vercel.app/my-applications"
  );
  
  await sendEmail(user.email, subject, html);
};
// --- 📧 4. SEND OTP CODE ---
const sendOtpEmail = async (email, otpCode) => {
  const subject = "Verify your Email - Axon Hire";
  const body = `
    <div style="text-align: center;">
      <p>Please use the following code to verify your account:</p>
      <h1 style="font-size: 32px; letter-spacing: 5px; color: #4f46e5; margin: 20px 0;">${otpCode}</h1>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `;
  
  const html = createTemplate("Verify Your Account", body, null, null);
  await sendEmail(email, subject, html);
};

// Don't forget to add it to exports!
module.exports = { sendWelcomeEmail, sendApplicationEmail, sendStatusUpdateEmail, sendOtpEmail };