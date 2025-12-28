// // backend/routes/aiRoutes.js
// // This file handles all routes that talk to the AI

// // 1. Import Express
// const express = require("express");
// // 2. Create the router
// const router = express.Router();
// // 3. Import our "security guard" (JWT checker)
// const verifyToken = require("../middleware/authMiddleware");
// // 4. Import the Google AI library
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const parseResumeFromUrl = require("../utils/resumeParser");

// // 5. Initialize the Google AI client (it reads the key from .env)
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// /*
//  * @route   POST /api/ai/generate-questions
//  * @desc    Generate interview questions using Google Gemini
//  * @access  Private (User must be logged in)
//  */
// // 6. Define the route
// router.post("/generate-questions", verifyToken, async (req, res) => {
//   // 7. Safety net: 'try...catch' block
//   try {
//     // 8. Get the 'jobTitle' from the request body (from Postman/React)
//     const { jobTitle } = req.body;

//     // 9. Validation
//     if (!jobTitle) {
//       return res.status(400).json({ message: "Job title is required." });
//     }

//     // 10.  Use the 'gemini-1.0-pro' model.
//     // This is the most stable and widely available free-tier model.
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

//    const prompt = `
// You are Axon — a structured interview intelligence system used by hiring teams
// to generate consistent, role-appropriate interview questions.

// You are NOT a free-form assistant.
// You operate using recruiter-calibrated logic similar to real interview banks
// used by enterprise companies.

// INPUT:
// JOB TITLE: "${jobTitle}"

// INTERVIEW DESIGN RULES (MANDATORY):

// 1. ROLE CALIBRATION
// - Infer the expected seniority level from the JOB TITLE.
// - Do NOT assume senior or architect-level experience unless explicitly implied.
// - Questions must align with what is realistically asked for this role level.

// 2. QUESTION SELECTION LOGIC
// - Generate exactly 5 interview questions.
// - Questions must reflect:
//   - Frequently asked real-world interview questions
//   - Practical decision-making and applied reasoning
//   - Scenarios candidates are likely to face on the job
// - Avoid trivia, theory-only, or academic questions.

// 3. DIFFICULTY CONTROL
// - At least:
//   - 2 practical / scenario-based questions
//   - 2 technical depth questions
//   - 1 judgment or trade-off question
// - Do NOT exceed realistic difficulty for the inferred role level.
// - Avoid niche tools or advanced architecture unless role-appropriate.

// 4. ANSWER EVALUATION STRUCTURE
// For EACH question, provide:
// - A brief explanation of what the interviewer is evaluating
// - The reasoning a strong candidate should demonstrate
// - A polished, realistic model answer (clear, concise, job-aligned)

// 5. CONSISTENCY & REALISM RULES
// - Do NOT escalate complexity across runs without new input.
// - Do NOT assume technologies not implied by the job title.
// - Answers should demonstrate competence, not perfection.

// OUTPUT FORMAT (STRICT):

// Question 1) <interview question ending with a question mark?>

// Answer:
// <Explanation of intent + strong candidate reasoning + realistic model answer>

// (Repeat for Questions 2–5)

// FORMATTING RULES:
// - Exactly one blank line between Question and Answer
// - No markdown, no bullets, no special formatting
// - Clean, professional, interview-ready language
// - Persona: analytical, precise, calm, recruiter-grade
// - Depth over verbosity; clarity over excess detail

// FINAL CONSTRAINTS:
// - Do NOT mention being an AI
// - Do NOT add extra commentary
// - Do NOT exceed 5 questions
// `;


//     // 12. Call the Google AI API
//     const result = await model.generateContent(prompt);
//     // 13. Get the response
//     const response = await result.response;
//     // 14. Get just the text
//     const questions = response.text();
    
//     // 15. Send the AI's answer back to the user
//     res.status(200).json({ questions });
    
//   } catch (err) {
//     // 16. If anything in the 'try' block fails, send a server error
//     console.error("AI generation error:", err.message);
//     res.status(500).json({ message: "Error generating questions from AI." });
//   }
// });


// /*
// route -POST/api/ai/analyze-resume
// this extract text from resume and analyze it 
// this is a private endpoint and its private only recruiter can acces it

// */
// router.post("/analyze-resume",verifyToken, async(req,res)=>{
//   try{
//     const{resumeUrl,jobTitle}=req.body;

//     if(!resumeUrl || !jobTitle){
//       return res.status(400).json({message:"Resume Url and Job Title are required"});
//     }
//     // extract text from the pdf url
//     console.log("Extracting text from:",resumeUrl);
//     const resumeText=await parseResumeFromUrl(resumeUrl);

//     //safety check that is the resume empty or just a image
//     if(!resumeText || resumeText.length<50){
//       return res.status(400).json({
//         message:"Resume appears emty or is an image so Please upload a text-based PDF"

//       })}

//       //the brain  construct the promt for gemini here
//       console.log("Asking Gemini to evaluate match...")
//       const model=genAI.getGenerativeModel({model:"gemini-2.5-flash-lite"});

//       // const prompt=`Act as a Senior Tech Recruiter
//       // JOB TITLE:"${jobTitle}"
//       // CANDIDATE RESUME: "${resumeText}"
      
//       // TASK: Evaluate the candidate's relevance to this job.
//       // Output ONLY a JSON object  (no markdown, no extra text) with this format:
//       // {
//       // "matchScore":<number between 0-100>,
//       // "keyStrengths":["<strength 1>" ,"<strength 2>", "<strength 3>"],
//       // "missingSkills":"["<missing 1>","<missing 2>"],
//       // "summary":"<1 sentence verdict>"
//       // }
//       // `;

//       // JOB DESCRIPTION: "${jobDescription}"  ← currently unavailable
//   const prompt = `
// Act as a modern Applicant Tracking System (ATS) used by enterprise tech recruiters.
// You are not a human reviewer. You evaluate resumes using structured, rule-based,
// keyword-driven logic similar to real ATS software.

// INPUTS:
// JOB TITLE: "${jobTitle}"
// CANDIDATE RESUME TEXT: "${resumeText}"

// EVALUATION PROCESS (FOLLOW ALL STEPS INTERNALLY):

// 1. ROLE EXPECTATION INFERENCE
// - Infer core (required) and secondary (preferred) skills from the JOB TITLE
//   using current industry standards.
// - Required skills are mandatory for shortlisting.

// 2. SKILL NORMALIZATION
// - Normalize skill variants and synonyms
//   (e.g., JS → JavaScript, Node → Node.js, ReactJS → React).
// - Treat equivalent technologies as the same skill.

// 3. RESUME STRUCTURE AWARENESS
// - Detect and prioritize relevant sections:
//   Experience > Projects > Skills > Education.
// - Skills mentioned with real usage carry more weight than lists.

// 4. KEYWORD & CONTEXT ANALYSIS
// - Validate skills by contextual usage (projects, responsibilities, outcomes).
// - Ignore keyword stuffing without explanation or evidence.

// 5. EXPERIENCE RELEVANCE ASSESSMENT
// - Evaluate depth based on:
//   - Project complexity
//   - Use of real-world tools
//   - Backend/frontend/system exposure
// - Classify experience relevance as high, medium, or low.

// 6. HARD CONSTRAINTS:
// - If Job Description is not provided, matchScore MUST NOT exceed 85.
// - If a required skill is listed but not demonstrated in projects or experience,
//   it must reduce the score.
// - Do NOT award 100% without JD-based validation.

// 7. SCORING RULES (DETERMINISTIC)
// - Required skills match: 55%
// - Preferred skills match: 20%
// - Experience relevance: 15%
// - Resume clarity and structure: 10%
// - Apply penalties (up to −20%) for:
//   - Missing required skills
//   - Irrelevant or unfocused content
//   - Very shallow or unclear experience

// 8. SCORE SANITY CHECK
// - Scores above 85 require strong evidence.
// - Scores below 40 indicate weak alignment.
// - Final score must be explainable and realistic.

// OUTPUT RULES:
// - Return ONLY valid JSON.
// - No markdown, no explanations, no extra text.
// - Follow the exact schema below.

// OUTPUT FORMAT:
// {
//   "matchScore": <number between 0-100>,
//   "matchedSkills": ["skill1", "skill2"],
//   "missingRequiredSkills": ["missing1", "missing2"],
//   "matchedPreferredSkills": ["skillA"],
//   "experienceRelevance": "high | medium | low",
//   "summary": "<1 sentence ATS-style verdict>"
// }
// `;



//       //get response form AI
//       const result=await model.generateContent(prompt);
//       const response=await result.response;
//       const text=response.text();

//       //clean the output (gemini sometimes adds ```json...`` wrappers)
//       const cleanedText=text.replace(/```json/g,"").replace(/```/g, "").trim();
//       const analysisData=JSON.parse(cleanedText);

//       //send the intelligence back to the fornted 
//       res.status(200).json({
//         success:true,
//         analysis:analysisData
//       });
//     }  
    
  
//   catch(err){
//     console.error("AI Analysis Error:", err.message);
//     res.status(500).json({message:"Failed to analyze resume with AI "});
//   }
// });

// // ---------------------------------------------
// // Route 2: CANDIDATE SELF-CHECK (Flexible Mode)
// // ---------------------------------------------
// router.post("/evaluate-myself", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, targetRole } = req.body; // targetRole is Optional

//     if (!resumeUrl) return res.status(400).json({ message: "Resume URL is required" });

//     console.log(`🔍 Candidate Self-Check. Target: ${targetRole || "General"}`);
//     const resumeText = await parseResumeFromUrl(resumeUrl);

//     if (!resumeText || resumeText.length < 50) return res.status(400).json({ message: "Resume empty." });

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

//     // Dynamic Prompt: Did they provide a dream job title?
   
//   let prompt;

// if (targetRole) {
//   // 🎯 ROLE-SPECIFIC CAREER ANALYSIS
//   prompt = `
// Act as a structured Career Evaluation System used by hiring coaches and screening tools.
// You are analytical and role-focused, not motivational.

// INPUTS:
// TARGET ROLE: "${targetRole}"
// CANDIDATE RESUME TEXT: "${resumeText}"

// EVALUATION RULES (FOLLOW STRICTLY):

// 1. ROLE EXPECTATION INFERENCE
// - Infer required and preferred skills for the TARGET ROLE using current industry standards.
// - Required skills are mandatory for role-fit consideration.

// 2. SKILL NORMALIZATION
// - Normalize skill variants and synonyms.
// - Treat equivalent technologies as the same skill.

// 3. EVIDENCE CHECK
// - Skills demonstrated in projects or experience carry more weight than skill lists.
// - Skills listed without evidence are treated as partial matches.

// 4. EXPERIENCE RELEVANCE
// - Assess relevance based on alignment of projects and experience with the TARGET ROLE.
// - Classify experience relevance as High, Medium, or Low.

// 5. SCORING RULES
// - Required skills match: 55%
// - Preferred skills match: 20%
// - Experience relevance: 15%
// - Resume clarity and focus for the role: 10%
// - Apply penalties (up to −20%) for missing critical required skills or unfocused experience.

// 6. SCORE SANITY CHECK
// - Scores above 85 require strong evidence.
// - Scores below 40 indicate weak role alignment.
// - Final score must be realistic and explainable.

// OUTPUT RULES:
// - Output ONLY valid JSON.
// - No markdown, no extra text.

// OUTPUT FORMAT:
// {
//   "matchScore": <0-100 fit for ${targetRole}>,
//   "matchedSkills": ["Skills they have for this role"],
//   "missingRequiredSkills": ["Critical skills missing for ${targetRole}"],
//   "matchedPreferredSkills": ["Bonus skills they have"],
//   "experienceRelevance": "High | Medium | Low",
//   "summary": "<Concrete, role-specific advice to improve chances for this job>"
// }
// `;
// } else {
//   // 🧾 GENERAL RESUME HEALTH CHECK
//   prompt = `
// Act as a Resume Quality Evaluation System used by recruiters and screening software.
// You evaluate resumes objectively for clarity, structure, and impact.

// INPUT:
// CANDIDATE RESUME TEXT: "${resumeText}"

// EVALUATION RULES:

// 1. STRUCTURE & FORMATTING
// - Assess layout clarity, section ordering, readability, and consistency.

// 2. IMPACT & CONTENT QUALITY
// - Evaluate use of metrics, outcomes, and specificity.
// - Penalize vague or generic statements.

// 3. SKILL PRESENTATION
// - Identify strongest skills clearly supported by evidence.
// - Detect weak, missing, or unclear sections.

// 4. SCORING RULES
// - Content clarity and structure: 40%
// - Demonstrated skills and projects: 40%
// - Professional presentation and focus: 20%

// 5. SCORE SANITY CHECK
// - Scores above 85 indicate strong, job-ready resumes.
// - Scores below 50 indicate significant improvement needed.

// OUTPUT RULES:
// - Output ONLY valid JSON.
// - No markdown, no extra text.

// OUTPUT FORMAT:
// {
//   "matchScore": <0-100 overall resume quality>,
//   "matchedSkills": ["Strongest skills clearly demonstrated"],
//   "missingRequiredSkills": ["Formatting gaps", "Weak or unclear sections"],
//   "matchedPreferredSkills": ["Good resume practices found"],
//   "experienceRelevance": "N/A",
//   "summary": "<Clear, practical feedback on how to improve resume quality>"
// }
// `;
// }


//     const result = await model.generateContent(prompt);
//     const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
//     res.status(200).json({ success: true, analysis: JSON.parse(text) });

//   } catch (err) {
//     console.error("Candidate Check Error:", err.message);
//     res.status(500).json({ message: "Self-evaluation failed." });
//   }
// });


// // 17. Export this router so server.js can use it
// module.exports = router;



// backend/routes/aiRoutes.js
// This file handles all routes that talk to the AI

// 1. Import Express
const express = require("express");
// 2. Create the router
const router = express.Router();
// 3. Import our "security guard" (JWT checker)
const verifyToken = require("../middleware/authMiddleware");
// 4. Import the Google AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");
const parseResumeFromUrl = require("../utils/resumeParser");
const Job=require("../models/Job");
const Application = require("../models/Application"); // Import the model

// 5. Initialize the Google AI client (it reads the key from .env)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/*
 * @route   POST /api/ai/generate-questions
 * @desc    Generate interview questions using Google Gemini
 * @access  Private (User must be logged in)
 */
// 6. Define the route
router.post("/generate-questions", verifyToken, async (req, res) => {
  // 7. Safety net: 'try...catch' block
  try {
    // 8. Get the 'jobTitle' from the request body (from Postman/React)
    const { jobTitle } = req.body;

    // 9. Validation
    if (!jobTitle) {
      return res.status(400).json({ message: "Job title is required." });
    }

    // 10.  Use the 'gemini-1.0-pro' model.
    // This is the most stable and widely available free-tier model.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

   const prompt = `
You are Axon — a structured interview intelligence system used by hiring teams
to generate consistent, role-appropriate interview questions.

You are NOT a free-form assistant.
You operate using recruiter-calibrated logic similar to real interview banks
used by enterprise companies.

INPUT:
JOB TITLE: "${jobTitle}"

INTERVIEW DESIGN RULES (MANDATORY):

1. ROLE CALIBRATION
- Infer the expected seniority level from the JOB TITLE.
- Do NOT assume senior or architect-level experience unless explicitly implied.
- Questions must align with what is realistically asked for this role level.

2. QUESTION SELECTION LOGIC
- Generate exactly 5 interview questions.
- Questions must reflect:
  - Frequently asked real-world interview questions
  - Practical decision-making and applied reasoning
  - Scenarios candidates are likely to face on the job
- Avoid trivia, theory-only, or academic questions.

3. DIFFICULTY CONTROL
- At least:
  - 2 practical / scenario-based questions
  - 2 technical depth questions
  - 1 judgment or trade-off question
- Do NOT exceed realistic difficulty for the inferred role level.
- Avoid niche tools or advanced architecture unless role-appropriate.

4. ANSWER EVALUATION STRUCTURE
For EACH question, provide:
- A brief explanation of what the interviewer is evaluating
- The reasoning a strong candidate should demonstrate
- A polished, realistic model answer (clear, concise, job-aligned)

5. CONSISTENCY & REALISM RULES
- Do NOT escalate complexity across runs without new input.
- Do NOT assume technologies not implied by the job title.
- Answers should demonstrate competence, not perfection.

OUTPUT FORMAT (STRICT):

Question 1) <interview question ending with a question mark?>

Answer:
<Explanation of intent + strong candidate reasoning + realistic model answer>

(Repeat for Questions 2–5)

FORMATTING RULES:
- Exactly one blank line between Question and Answer
- No markdown, no bullets, no special formatting
- Clean, professional, interview-ready language
- Persona: analytical, precise, calm, recruiter-grade
- Depth over verbosity; clarity over excess detail

FINAL CONSTRAINTS:
- Do NOT mention being an AI
- Do NOT add extra commentary
- Do NOT exceed 5 questions
`;


    // 12. Call the Google AI API
    const result = await model.generateContent(prompt);
    // 13. Get the response
    const response = await result.response;
    // 14. Get just the text
    const questions = response.text();
    
    // 15. Send the AI's answer back to the user
    res.status(200).json({ questions });
    
  } catch (err) {
    // 16. If anything in the 'try' block fails, send a server error
    console.error("AI generation error:", err.message);
    res.status(500).json({ message: "Error generating questions from AI." });
  }
});


/*
route -POST/api/ai/analyze-resume
this extract text from resume and analyze it 
this is a private endpoint and its private only recruiter can acces it

*/
// function calculateATSScore(extracted, requiredSkillsCount) {
//   const matchedRequired = extracted.matchedRequiredSkills || [];
//   const missingRequired = extracted.missingRequiredSkills || [];
//   const matchedPreferred = extracted.matchedPreferredSkills || [];

//   const M = matchedRequired.length;
//   const X = missingRequired.length;
//   const R = requiredSkillsCount;

//   /* =====================================================
//      CASE 1: JOB HAS NO REQUIRED SKILLS (LEGACY / BAD DATA)
//      ===================================================== */
//   if (R === 0) {
//     const bonusSkillScore = Math.min(
//       40,
//       matchedPreferred.length * 5
//     );

//     const experienceScore =
//       extracted.experienceRelevance === "high" ? 20 :
//       extracted.experienceRelevance === "medium" ? 12 : 6;

//     const rawScore = bonusSkillScore + experienceScore;

//     const finalScore = Math.min(60, rawScore);

//     return {
//       matchScore: finalScore,
//       matchedSkills: matchedPreferred,
//       missingRequiredSkills: [],
//       matchedPreferredSkills: matchedPreferred,
//       experienceRelevance: extracted.experienceRelevance || "low",
//       summary: "Job lacks required skills; score based on general profile alignment"
//     };
//   }

//   /* =====================================================
//      CASE 2: NORMAL ATS FLOW (REQUIRED SKILLS PRESENT)
//      ===================================================== */

//   // Required skills score (55)
//   const requiredSkillScore = Math.round((M / R) * 55);

//   // Bonus skills score (20 max)
//   const bonusSkillScore = Math.min(
//     20,
//     matchedPreferred.length * 5
//   );

//   // Experience relevance score (15)
//   const experienceScore =
//     extracted.experienceRelevance === "high" ? 15 :
//     extracted.experienceRelevance === "medium" ? 8 : 3;

//   // Resume structure score (fixed & deterministic)
//   const structureScore = 6;

//   const rawScore =
//     requiredSkillScore +
//     bonusSkillScore +
//     experienceScore +
//     structureScore;

//   // Hard caps based on missing required skills
//   const missingRatio = X / R;
//   let cap = 100;

//   if (missingRatio > 0.6) cap = 40;
//   else if (missingRatio > 0.4) cap = 60;
//   else if (missingRatio <= 0.2) cap = 90;

//   const finalScore = Math.min(rawScore, cap);

//   // Verdict
//   let summary =
//     finalScore < 40 ? "Weak alignment" :
//     finalScore < 65 ? "Partial match" :
//     finalScore < 85 ? "Strong match" :
//     "Near-perfect match";

//   return {
//     matchScore: finalScore,
//     matchedSkills: matchedRequired,
//     missingRequiredSkills: missingRequired,
//     matchedPreferredSkills: matchedPreferred,
//     experienceRelevance: extracted.experienceRelevance || "low",
//     summary
//   };
// }

// router.post("/analyze-resume", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId } = req.body;

//     if (!resumeUrl || !jobId) {
//       return res.status(400).json({ message: "Resume Url and Job ID are required" });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found in database" });
//     }

//     // 🔥 ATS DISABLED GUARD
// if (job.atsEnabled === false) {
//   return res.status(400).json({
//     message: "ATS scoring disabled for this job (no required skills provided)"
//   });
// }

//     const resumeText = await parseResumeFromUrl(resumeUrl);
//     if (!resumeText || resumeText.length < 50) {
//       return res.status(400).json({
//         message: "Resume appears empty or image-based"
//       });
//     }
 
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-pro" });
//     const prompt = `
// You are an information extraction engine for an Applicant Tracking System.
// You do NOT calculate scores.
// You do NOT write verdicts.

// RULES:
// - Do NOT infer skills.
// - Do NOT guess.
// - Extract only what is explicitly present.
// - Output must be factual and stable.

// INPUTS:
// JOB TITLE: "${job.title}"
// JOB DESCRIPTION: "${job.description}"
// REQUIRED SKILLS: "${job.requirements.join(", ")}"
// RESUME TEXT: "${resumeText}"

// TASKS:
// 1. For each REQUIRED SKILL:
//    - Mark it as present ONLY if explicitly found in resume text.
//    - Otherwise mark it as missing.

// 2. Extract NON-required technical skills explicitly mentioned.

// 3. Classify experience relevance to JOB DESCRIPTION as:
//    - high
//    - medium
//    - low

// OUTPUT JSON ONLY:
// {
//   "matchedRequiredSkills": [],
//   "missingRequiredSkills": [],
//   "matchedPreferredSkills": [],
//   "experienceRelevance": "high | medium | low"
// }
// `;


//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

//     let extractedData;
//     try {
//       extractedData = JSON.parse(cleanedText);
//     } catch {
//       return res.status(500).json({ message: "AI returned invalid JSON" });
//     }

//     // 🔥 MATHEMATICAL ATS SCORING (DETERMINISTIC)
//     const analysisData = calculateATSScore(
//       extractedData,
//       job.requirements.length
//     );

//     analysisData.analyzedAt = new Date();

//     // Save to DB (your logic preserved)
//    if (applicationId) {
//   try {
//     // ✅ Normal case: aiAnalysis is already an array
//     await Application.findByIdAndUpdate(applicationId, {
//       $push: {
//         aiAnalysis: {
//           $each: [analysisData],
//           $position: 0
//         }
//       }
//     });
//   } catch (err) {
//     // 🔥 Legacy fix: aiAnalysis was stored as an object
//     if (
//       err.codeName === "BadValue" ||
//       err.message.includes("must be an array")
//     ) {
//       console.log("⚠️ Legacy aiAnalysis detected. Migrating document...");

//       const oldDoc = await Application.findById(applicationId);

//       const newHistory = [analysisData];

//       if (
//         oldDoc.aiAnalysis &&
//         typeof oldDoc.aiAnalysis === "object" &&
//         !Array.isArray(oldDoc.aiAnalysis)
//       ) {
//         newHistory.push(oldDoc.aiAnalysis);
//       }

//       await Application.findByIdAndUpdate(applicationId, {
//         aiAnalysis: newHistory
//       });

//       console.log("✅ aiAnalysis migration successful.");
//     } else {
//       throw err;
//     }
//   }
// }


//     res.status(200).json({ success: true, analysis: analysisData });

//   } catch (err) {
//     console.error("AI Analysis Error:", err);
//     res.status(500).json({ message: "AI Analysis Failed" });
//   }
// });

// --- HELPER: Mathematical Scoring (Your Custom Logic) ---
function calculateATSScore(extracted, requiredSkillsCount) {
  const matchedRequired = extracted.matchedRequiredSkills || [];
  const missingRequired = extracted.missingRequiredSkills || [];
  const matchedPreferred = extracted.matchedPreferredSkills || [];

  const M = matchedRequired.length;
  const X = missingRequired.length;
  const R = requiredSkillsCount;

  // Case 1: No required skills defined
  if (R === 0) {
    const bonusSkillScore = Math.min(40, matchedPreferred.length * 5);
    const experienceScore = extracted.experienceRelevance === "high" ? 20 : extracted.experienceRelevance === "medium" ? 12 : 6;
    const finalScore = Math.min(60, bonusSkillScore + experienceScore);
    return {
      matchScore: finalScore,
      matchedSkills: matchedPreferred,
      missingRequiredSkills: [],
      matchedPreferredSkills: matchedPreferred,
      experienceRelevance: extracted.experienceRelevance || "low",
      summary: "Job lacks required skills; score based on general profile alignment"
    };
  }

  // Case 2: Normal Scoring
  const requiredSkillScore = Math.round((M / R) * 55);
  const bonusSkillScore = Math.min(20, matchedPreferred.length * 5);
  const experienceScore = extracted.experienceRelevance === "high" ? 15 : extracted.experienceRelevance === "medium" ? 8 : 3;
  const structureScore = 6;

  const rawScore = requiredSkillScore + bonusSkillScore + experienceScore + structureScore;

  // Penalties
  const missingRatio = X / R;
  let cap = 100;
  if (missingRatio > 0.6) cap = 40;
  else if (missingRatio > 0.4) cap = 60;
  else if (missingRatio <= 0.2) cap = 90;

  const finalScore = Math.min(rawScore, cap);

  let summary =
    finalScore < 40 ? "Weak alignment" :
    finalScore < 65 ? "Partial match" :
    finalScore < 85 ? "Strong match" :
    "Near-perfect match";

  return {
    matchScore: finalScore,
    matchedSkills: matchedRequired,
    missingRequiredSkills: missingRequired,
    matchedPreferredSkills: matchedPreferred,
    experienceRelevance: extracted.experienceRelevance || "low",
    summary
  };
}

// --- Route 2: Analyze Resume (FIXED SAVING LOGIC) ---
router.post("/analyze-resume", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, jobId, applicationId } = req.body;

    if (!resumeUrl || !jobId) {
      return res.status(400).json({ message: "Resume Url and Job ID are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found in database" });
    }

    if (job.atsEnabled === false) {
      return res.status(400).json({ message: "ATS scoring disabled for this job" });
    }

    const resumeText = await parseResumeFromUrl(resumeUrl);
    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({ message: "Resume appears empty or image-based" });
    }

    // AI Processing
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const prompt = `
      You are an information extraction engine for an ATS.
      Extract factual data. Do not score.
      INPUTS:
      JOB TITLE: "${job.title}"
      JOB DESCRIPTION: "${job.description}"
      REQUIRED SKILLS: "${job.requirements.join(", ")}"
      RESUME TEXT: "${resumeText}"

      OUTPUT JSON ONLY:
      {
        "matchedRequiredSkills": [],
        "missingRequiredSkills": [],
        "matchedPreferredSkills": [],
        "experienceRelevance": "high | medium | low"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
    let extractedData;
    try {
      extractedData = JSON.parse(text);
    } catch {
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    // Mathematical Scoring
    const analysisData = calculateATSScore(extractedData, job.requirements.length);
    analysisData.analyzedAt = new Date();

    // ===============================================
    // 🔥 FIXED: SELF-HEALING DATABASE SAVE
    // ===============================================
    if (applicationId) {
        // 1. Fetch the document first (Safe)
        const appDoc = await Application.findById(applicationId);
        
        if (appDoc) {
            // 2. Prepare the new history array
            // Start with the NEW result
            let newHistory = [analysisData];

            // 3. Check existing data (Is it Array or Object?)
            if (Array.isArray(appDoc.aiAnalysis)) {
                // If it's already an array, add old items to it
                newHistory.push(...appDoc.aiAnalysis);
            } else if (appDoc.aiAnalysis && typeof appDoc.aiAnalysis === 'object') {
                // If it's an old Object (Legacy), save it into the array
                newHistory.push(appDoc.aiAnalysis);
            }

            // 4. Overwrite the field with the correct Array structure
            appDoc.aiAnalysis = newHistory;
            await appDoc.save();
            console.log("✅ Analysis saved successfully (Self-Healed).");
        }
    }
    // ===============================================

    res.status(200).json({ success: true, analysis: analysisData });

  } catch (err) {
    console.error("AI Analysis Error:", err);
    res.status(500).json({ message: "AI Analysis Failed" });
  }
});
// ---------------------------------------------
// Route 2: CANDIDATE SELF-CHECK (Flexible Mode)
// ---------------------------------------------
router.post("/evaluate-myself", verifyToken, async (req, res) => {
  try {
    // 🎯 UPDATE: Added jobDescription and requirements to inputs
    const { resumeUrl, targetRole, jobDescription, requirements } = req.body; 

    if (!resumeUrl) return res.status(400).json({ message: "Resume URL is required" });

    console.log(`🔍 Candidate Self-Check. Target: ${targetRole || "General"}`);
    const resumeText = await parseResumeFromUrl(resumeUrl);

    if (!resumeText || resumeText.length < 50) return res.status(400).json({ message: "Resume empty." });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Dynamic Prompt: Did they provide a dream job title?
   
  let prompt;

if (targetRole) {
  // 🎯 ROLE-SPECIFIC CAREER ANALYSIS
  prompt = `
Act as a structured Career Evaluation System used by hiring coaches and screening tools.
You are analytical and role-focused, not motivational.

INPUTS:
TARGET ROLE: "${targetRole}"
${jobDescription ? `JOB DESCRIPTION: "${jobDescription}"` : ""}
${requirements ? `REQUIRED SKILLS: "${requirements.join(", ")}"` : ""}
CANDIDATE RESUME TEXT: "${resumeText}"

EVALUATION RULES (FOLLOW STRICTLY):

1. ROLE EXPECTATION INFERENCE
- If a Job Description is provided, use it as the GROUND TRUTH for required skills.
- If not, infer required and preferred skills for the TARGET ROLE using current industry standards.
- Required skills are mandatory for role-fit consideration.

2. SKILL NORMALIZATION
- Normalize skill variants and synonyms.
- Treat equivalent technologies as the same skill.

3. EVIDENCE CHECK
- Skills demonstrated in projects or experience carry more weight than skill lists.
- Skills listed without evidence are treated as partial matches.

4. EXPERIENCE RELEVANCE
- Assess relevance based on alignment of projects and experience with the TARGET ROLE (and Description if present).
- Classify experience relevance as High, Medium, or Low.

5. SCORING RULES
- Required skills match: 55%
- Preferred skills match: 20%
- Experience relevance: 15%
- Resume clarity and focus for the role: 10%
- Apply penalties (up to −20%) for missing critical required skills or unfocused experience.

6. SCORE SANITY CHECK
- Scores above 85 require strong evidence.
- Scores below 40 indicate weak role alignment.
- Final score must be realistic and explainable.

OUTPUT RULES:
- Output ONLY valid JSON.
- No markdown, no extra text.

OUTPUT FORMAT:
{
  "matchScore": <0-100 fit for ${targetRole}>,
  "matchedSkills": ["Skills they have for this role"],
  "missingRequiredSkills": ["Critical skills missing for ${targetRole}"],
  "matchedPreferredSkills": ["Bonus skills they have"],
  "experienceRelevance": "High | Medium | Low",
  "summary": "<Concrete, role-specific advice to improve chances for this job>"
}
`;
} else {
  // 🧾 GENERAL RESUME HEALTH CHECK
  prompt = `
Act as a Resume Quality Evaluation System used by recruiters and screening software.
You evaluate resumes objectively for clarity, structure, and impact.

INPUT:
CANDIDATE RESUME TEXT: "${resumeText}"

EVALUATION RULES:

1. STRUCTURE & FORMATTING
- Assess layout clarity, section ordering, readability, and consistency.

2. IMPACT & CONTENT QUALITY
- Evaluate use of metrics, outcomes, and specificity.
- Penalize vague or generic statements.

3. SKILL PRESENTATION
- Identify strongest skills clearly supported by evidence.
- Detect weak, missing, or unclear sections.

4. SCORING RULES
- Content clarity and structure: 40%
- Demonstrated skills and projects: 40%
- Professional presentation and focus: 20%

5. SCORE SANITY CHECK
- Scores above 85 indicate strong, job-ready resumes.
- Scores below 50 indicate significant improvement needed.

OUTPUT RULES:
- Output ONLY valid JSON.
- No markdown, no extra text.

OUTPUT FORMAT:
{
  "matchScore": <0-100 overall resume quality>,
  "matchedSkills": ["Strongest skills clearly demonstrated"],
  "missingRequiredSkills": ["Formatting gaps", "Weak or unclear sections"],
  "matchedPreferredSkills": ["Good resume practices found"],
  "experienceRelevance": "N/A",
  "summary": "<Clear, practical feedback on how to improve resume quality>"
}
`;
}


    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
    res.status(200).json({ success: true, analysis: JSON.parse(text) });

  } catch (err) {
    console.error("Candidate Check Error:", err.message);
    res.status(500).json({ message: "Self-evaluation failed." });
  }
});


// 17. Export this router so server.js can use it
module.exports = router;