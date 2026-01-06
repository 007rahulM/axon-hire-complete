// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const parseResumeFromUrl = require("../utils/resumeParser");
// const { normalizeSkill } = require("../utils/skillMap");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { generateJSON } = require("../utils/aiServices");

// /**
//  * 🛠️ TOP1 ANALYTICS ENGINE
//  * Handles: Section Weighting (1.5x), Tiered Links, Professional-Only YoE.
//  */
// function calculateTop1Score(aiOutput, jobRequirements, resumeText) {
//   console.log("--- 🚀 TOP1 ANALYTICS START ---");
  
//   const rawRequirements = Array.isArray(jobRequirements) ? [...new Set(jobRequirements)] : [];
//   const normalizedReqs = rawRequirements.map(r => normalizeSkill(r));

//   // 1. LINK DETECTION (Unique & Tiered)
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = ["github.com", "vercel.app", "netlify.app", "github.io", "linkedin.com"];
  
//   const uniqueTrustedLinks = [...new Set(allLinks.filter(link => 
//     trustedDomains.some(domain => link.includes(domain))
//   ))];
  
//   let linkScore = 0;
//   if (uniqueTrustedLinks.length >= 3) linkScore = 10;
//   else if (uniqueTrustedLinks.length >= 1) linkScore = 5;

//   // 2. SKILL MATCHING WITH FALLBACK & WEIGHTING (1.5x)
//   const skillsInExp = (aiOutput.skillsBySection?.experience || []).map(s => normalizeSkill(s));
//   const skillsInList = (aiOutput.skillsBySection?.skillsList || []).map(s => normalizeSkill(s));
//   const generalSkills = (aiOutput.generalSkills || []).map(s => normalizeSkill(s)); // Fallback pool

//   let weightedMatchCount = 0;
//   let matchedSkillsList = [];

//   normalizedReqs.forEach((req, index) => {
//     const originalReq = rawRequirements[index];
//     if (skillsInExp.includes(req)) {
//       weightedMatchCount += 1.5; // Found in Experience/Projects
//       matchedSkillsList.push(originalReq);
//     } else if (skillsInList.includes(req) || generalSkills.includes(req)) {
//       weightedMatchCount += 1.0; // Found in List or via General Fallback
//       matchedSkillsList.push(originalReq);
//     }
//   });

//   const maxPossibleWeight = normalizedReqs.length * 1.5;
//   const skillScore = maxPossibleWeight > 0 ? (weightedMatchCount / maxPossibleWeight) * 60 : 0;

//   // 3. PROFESSIONAL-ONLY EXPERIENCE (Max 20)
//   // Logic: Ignore Education dates. Rahul's BCA dates (08/2023-05/2025) should NOT count.
//   const totalMonths = aiOutput.totalProfessionalMonths || 0;
//   let expScore = 5; // Junior/Fresher
//   if (totalMonths >= 36) expScore = 20; // Senior
//   else if (totalMonths >= 12) expScore = 12; // Mid-level

//   // 4. SYSTEM INTEGRITY (Max 10)
//   const integrityScore = 10;

//   const finalScore = Math.round(skillScore + expScore + linkScore + integrityScore);
  
//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills: [...new Set(matchedSkillsList)],
//     missingRequiredSkills: rawRequirements.filter(r => !matchedSkillsList.includes(r)),
//     experienceRelevance: totalMonths >= 12 ? "High" : "Medium",
//     summary: aiOutput.summary,
//     professionalMonths: totalMonths,
//     uniqueLinks: uniqueTrustedLinks.length
//   };
// }

// router.post("/analyze-resume", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId } = req.body;
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const resumeText = await parseResumeFromUrl(resumeUrl);

//     // AI TASK: SECTION EXTRACTION + FALLBACK GENERAL SCAN
//     const systemPrompt = `
//       You are an ATS Auditor. 
//       STRICT RULES:
//       1. TOTAL PROFESSIONAL MONTHS: Look ONLY at Work Experience sections. IGNORE Education dates. If only Education exists, return 0.
//       2. SECTION SCAN: Extract skills from "Projects/Experience" into "experience". Extract from "Skills list" into "skillsList".
//       3. FALLBACK: If you find technical skills but cannot determine the section, put them in "generalSkills".
      
//       OUTPUT JSON ONLY:
//       {
//         "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] },
//         "totalProfessionalMonths": 0,
//         "summary": "1 sentence match."
//       }
//     `;

//     const result = await generateJSON(systemPrompt, `Analyze:\n"${resumeText}"`);

//     const application = await Application.findById(applicationId);
//     const analysisData = calculateTop1Score(result.data, job.requirements, resumeText);
//     analysisData.provider = result.provider;

//     if (application) {
//       application.aiAnalysis = [analysisData, ...(application.aiAnalysis || [])];
//       await application.save();
//     }

//     res.status(200).json({ success: true, analysis: analysisData });

//   } catch (err) {
//     console.error("ANALYSIS FAILED:", err.message);
//     const status = err.message.includes("INVALID_DOCUMENT") ? 400 : 500;
//     res.status(status).json({ message: err.message });
//   }
// });

// module.exports = router;


// //it works jsut fixinf one issue the one thing goes worng all analysisn is failing here 

// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const parseResumeFromUrl = require("../utils/resumeParser");
// const { normalizeSkill, skillMap } = require("../utils/skillMap");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { generateJSON } = require("../utils/aiServices");




// function calculateTop1Score(aiOutput, jobRequirements, resumeText) {
//   console.log("--- 🚀 TOP1 ANALYTICS START ---");
  
//   const rawRequirements = Array.isArray(jobRequirements) ? [...new Set(jobRequirements)] : [];
//   const normalizedReqs = rawRequirements.map(r => normalizeSkill(r));

//   // 1. LINK DETECTION (Unique & Tiered)
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = ["github.com", "vercel.app", "netlify.app", "github.io", "linkedin.com"];
  
//   const uniqueTrustedLinks = [...new Set(allLinks.filter(link => 
//     trustedDomains.some(domain => link.includes(domain))
//   ))];
  
//   let linkScore = 0;
//   if (uniqueTrustedLinks.length >= 3) linkScore = 10;
//   else if (uniqueTrustedLinks.length >= 1) linkScore = 5;

//   // 2. SKILL MATCHING WITH FALLBACK & WEIGHTING (1.5x)
//   const skillsInExp = (aiOutput.skillsBySection?.experience || []).map(s => normalizeSkill(s));
//   const skillsInList = (aiOutput.skillsBySection?.skillsList || []).map(s => normalizeSkill(s));
//   const generalSkills = (aiOutput.generalSkills || []).map(s => normalizeSkill(s)); // Fallback pool

//   let weightedMatchCount = 0;
//   let matchedSkillsList = [];

//   normalizedReqs.forEach((req, index) => {
//     const originalReq = rawRequirements[index];
//     if (skillsInExp.includes(req)) {
//       weightedMatchCount += 1.5; // Found in Experience/Projects
//       matchedSkillsList.push(originalReq);
//     } else if (skillsInList.includes(req) || generalSkills.includes(req)) {
//       weightedMatchCount += 1.0; // Found in List or via General Fallback
//       matchedSkillsList.push(originalReq);
//     }
//   });

//   const maxPossibleWeight = normalizedReqs.length * 1.5;
//   const skillScore = maxPossibleWeight > 0 ? (weightedMatchCount / maxPossibleWeight) * 60 : 0;

//   // 3. PROFESSIONAL-ONLY EXPERIENCE (Max 20)
//   // Logic: Ignore Education dates. Rahul's BCA dates (08/2023-05/2025) should NOT count.
//   const totalMonths = aiOutput.totalProfessionalMonths || 0;
//   let expScore = 5; // Junior/Fresher
//   if (totalMonths >= 36) expScore = 20; // Senior
//   else if (totalMonths >= 12) expScore = 12; // Mid-level

//   // 4. SYSTEM INTEGRITY (Max 10)
//   const integrityScore = 10;

//   const finalScore = Math.round(skillScore + expScore + linkScore + integrityScore);
  
//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills: [...new Set(matchedSkillsList)],
//     missingRequiredSkills: rawRequirements.filter(r => !matchedSkillsList.includes(r)),
//     experienceRelevance: totalMonths >= 12 ? "High" : "Medium",
//     summary: aiOutput.summary,
//     professionalMonths: totalMonths,
//     uniqueLinks: uniqueTrustedLinks.length
//   };
// }

// // ============================================================================
// // 🛠️ NEW ENGINE HELPERS (The "Witnness" Logic)
// // ============================================================================

// /**
//  * DETERMINISTIC MATH ENGINE
//  * Standardizes scoring across Mode 1 (Standard) and Mode 2 (Professional).
//  */
// function calculateDeterministicScore(skillsMatchData, resumeText, jobRequirements, profMonths = 0) {
//     console.log("--- 🕵️ INTERNAL SCORING LOG START ---");
    
//     // 1. UNIQUE REQUIREMENTS: Fixes the duplicate keyword bug
//     const rawReqs = Array.isArray(jobRequirements) ? [...new Set(jobRequirements)] : [];
//     const normalizedReqs = rawReqs.map(r => normalizeSkill(r));

//     // 2. TIERED LINK DETECTION: (Regex - 100% stable non-AI check)
//     const linkPattern = /(https?:\/\/[^\s]+)/g;
//     const allLinks = resumeText.match(linkPattern) || [];
//     const trustedDomains = ["github.com", "vercel.app", "netlify.app", "github.io"];
//     const uniqueLinks = [...new Set(allLinks.filter(l => trustedDomains.some(d => l.includes(d))))];
    
//     let linkPoints = uniqueLinks.length >= 3 ? 10 : (uniqueLinks.length >= 1 ? 5 : 0);
//     console.log(`Step 1: Trusted Links Found: ${uniqueLinks.length}. Points: ${linkPoints}`);

//     // 3. SECTION WEIGHTING (1.5x for Projects/Experience)
//     const expSkills = (skillsMatchData.experience || []).map(s => normalizeSkill(s));
//     const listSkills = (skillsMatchData.skillsList || []).map(s => normalizeSkill(s));
//     const fallback = (skillsMatchData.generalSkills || []).map(s => normalizeSkill(s));

//     let weightedPoints = 0;
//     let matchedList = [];

//     normalizedReqs.forEach((req, idx) => {
//         if (expSkills.includes(req)) {
//             weightedPoints += 1.5; 
//             matchedList.push(rawReqs[idx]);
//         } else if (listSkills.includes(req) || fallback.includes(req)) {
//             weightedPoints += 1.0;
//             matchedList.push(rawReqs[idx]);
//         }
//     });

//     const maxPossibleWeight = normalizedReqs.length * 1.5;
//     const skillScore = maxPossibleWeight > 0 ? (weightedPoints / maxPossibleWeight) * 60 : 0;

//     // 4. PROFESSIONAL DURATION TIERING (Ignores college dates)
//     let expPoints = profMonths >= 36 ? 20 : (profMonths >= 12 ? 12 : 5);
//     console.log(`Step 2: Prof. Duration: ${profMonths} months. Points: ${expPoints}`);

//     // 5. FINAL CALCULATION (Integrity Base: 10)
//     const finalScore = Math.round(skillScore + expPoints + linkPoints + 10);
//     console.log(`Step 3: Final Math: Skills(${Math.round(skillScore)}) + Exp(${expPoints}) + Links(${linkPoints}) + Integrity(10) = ${finalScore}%`);

//     return {
//         matchScore: Math.min(100, finalScore),
//         matchedSkills: [...new Set(matchedList)],
//         missingRequiredSkills: rawReqs.filter(r => !matchedList.includes(r)),
//         professionalMonths: profMonths,
//         uniqueLinksFound: uniqueLinks.length
//     };
// }

// // ============================================================================
// // 🚀 NEW ROUTE: MULTI-MODE ANALYSIS (Standard, Professional, Beta)
// // ============================================================================
// router.post("/analyze-v2", verifyToken, async (req, res) => {
//     try {
//         const { resumeUrl, jobId, mode, applicationId } = req.body; 
//         // mode should be: 'standard' | 'professional' | 'beta'
        
//         const job = await Job.findById(jobId);
//         if (!job) return res.status(404).json({ message: "Job not found" });

//         const resumeText = await parseResumeFromUrl(resumeUrl);
//         let finalAnalysis;

//         // --- MODE 1: STANDARD (WORKDAY STYLE - NO AI) ---
//         if (mode === "standard") {
//             console.log("🛠️ RUNNING: Standard Deterministic Mode");
//             // We treat the whole text as a general pool for the local skillMap
//             const mockSectionData = { generalSkills: resumeText.split(/[\s,]+/) };
//             finalAnalysis = calculateDeterministicScore(mockSectionData, resumeText, job.requirements, 0);
//             finalAnalysis.summary = "100% Stable match using local keyword parsing.";
//         } 

//         // --- MODE 2: PROFESSIONAL (AI AUDITOR - AUDITED BY JS) ---
//         else if (mode === "professional") {
//             console.log("🧠 RUNNING: Professional AI Auditor Mode");
//             const systemPrompt = `
//                 ACT AS: ATS Auditor. 
//                 1. EXTRACT technical skills by section (experience/projects vs skillsList).
//                 2. IGNORE education dates (BCA/SSLC/Degree). SUM professional experience months only.
//                 OUTPUT JSON ONLY: { "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] }, "totalMonths": 0, "summary": "" }
//             `;
//             const result = await generateJSON(systemPrompt, `RESUME: ${resumeText}`);

//             // 🛑 FAIL-FAST GUARD
//             if (!result.data || !result.data.skillsBySection) {
//                 return res.status(422).json({ success: false, message: "AI_FAILED", detail: "AI extraction returned invalid structure." });
//             }

//             finalAnalysis = calculateDeterministicScore(result.data.skillsBySection, resumeText, job.requirements, result.data.totalMonths);
//             finalAnalysis.summary = result.data.summary;
//             finalAnalysis.provider = result.provider;
//         }

//         // --- MODE 3: BETA (LEGACY - AI DIRECT SCORING) ---
//         else {
//             console.log("🧪 RUNNING: Beta Legacy Mode");
//             const result = await generateJSON("Act as recruiter. Score this resume 0-100.", resumeText);
//             finalAnalysis = { 
//                 matchScore: result.data.matchScore || 0, 
//                 summary: "Experimental Direct-AI Scoring (Beta)." 
//             };
//             finalAnalysis.provider = result.provider;
//         }

//         // --- 🟢 PERSISTENCE & DISCOVERY ---
//         const application = await Application.findById(applicationId);
//         if (application) {
//             application.aiAnalysis = [finalAnalysis, ...(application.aiAnalysis || [])];
            
//             // Skill Discovery (For future model training)
//             const allAIFound = mode === "professional" ? [
//                 ...result.data.skillsBySection.experience, 
//                 ...result.data.skillsBySection.skillsList
//             ] : [];
            
//             const discoveries = allAIFound.filter(s => normalizeSkill(s) === s.toLowerCase().trim() && !skillMap[s.toLowerCase()]);
//             application.discoveredSkills = [...new Set([...(application.discoveredSkills || []), ...discoveries])];
            
//             await application.save();
//         }

//         res.json({ success: true, analysis: finalAnalysis });

//     } catch (err) {
//         console.error("ANALYSIS_V2_ERROR:", err.message);
//         res.status(500).json({ message: "Analysis engine failed." });
//     }
// });

// // ============================================================================
// // 🏛️ LEGACY ROUTES (DO NOT TOUCH)
// // ============================================================================
// router.post("/analyze-resume", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId } = req.body;
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const resumeText = await parseResumeFromUrl(resumeUrl);

//     // AI TASK: SECTION EXTRACTION + FALLBACK GENERAL SCAN
    // const systemPrompt = `
    //   You are an ATS Auditor. 
    //   STRICT RULES:
    //   1. TOTAL PROFESSIONAL MONTHS: Look ONLY at Work Experience sections. IGNORE Education dates. If only Education exists, return 0.
    //   2. SECTION SCAN: Extract skills from "Projects/Experience" into "experience". Extract from "Skills list" into "skillsList".
    //   3. FALLBACK: If you find technical skills but cannot determine the section, put them in "generalSkills".
      
    //   OUTPUT JSON ONLY:
    //   {
    //     "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] },
    //     "totalProfessionalMonths": 0,
    //     "summary": "1 sentence match."
    //   }
    // `;

//     const result = await generateJSON(systemPrompt, `Analyze:\n"${resumeText}"`);

//     const application = await Application.findById(applicationId);
//     const analysisData = calculateTop1Score(result.data, job.requirements, resumeText);
//     analysisData.provider = result.provider;

//     if (application) {
//       application.aiAnalysis = [analysisData, ...(application.aiAnalysis || [])];
//       await application.save();
//     }

//     res.status(200).json({ success: true, analysis: analysisData });

//   } catch (err) {
//     console.error("ANALYSIS FAILED:", err.message);
//     const status = err.message.includes("INVALID_DOCUMENT") ? 400 : 500;
//     res.status(status).json({ message: err.message });
//   }
// });


// module.exports = router;









//=======================================================//


// //new fixed one  //
//  const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const parseResumeFromUrl = require("../utils/resumeParser");
// const { normalizeSkill, skillMap } = require("../utils/skillMap");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { generateJSON } = require("../utils/aiServices");

// // ============================================================================
// // 🛠️ ANALYTICS ENGINE (The Witness)
// // ============================================================================

// function calculateTop1Score(aiOutput, jobRequirements, resumeText) {
//   console.log("--- 🚀 TOP1 ANALYTICS START ---");
  
//   const rawRequirements = Array.isArray(jobRequirements) ? [...new Set(jobRequirements)] : [];
//   const normalizedReqs = rawRequirements.map(r => normalizeSkill(r));

//   // 1. LINK DETECTION (Unique & Tiered)
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = ["github.com", "vercel.app", "netlify.app", "github.io", "linkedin.com"];
  
//   const uniqueTrustedLinks = [...new Set(allLinks.filter(link => 
//     trustedDomains.some(domain => link.includes(domain))
//   ))];
  
//   let linkScore = 0;
//   if (uniqueTrustedLinks.length >= 3) linkScore = 10;
//   else if (uniqueTrustedLinks.length >= 1) linkScore = 5;

//   // 2. SKILL MATCHING WITH FALLBACK & WEIGHTING (1.5x)
//   const skillsInExp = (aiOutput.skillsBySection?.experience || []).map(s => normalizeSkill(s));
//   const skillsInList = (aiOutput.skillsBySection?.skillsList || []).map(s => normalizeSkill(s));
//   const generalSkills = (aiOutput.generalSkills || []).map(s => normalizeSkill(s));

//   let weightedMatchCount = 0;
//   let matchedSkillsList = [];

//   normalizedReqs.forEach((req, index) => {
//     const originalReq = rawRequirements[index];
//     if (skillsInExp.includes(req)) {
//       weightedMatchCount += 1.5; 
//       matchedSkillsList.push(originalReq);
//     } else if (skillsInList.includes(req) || generalSkills.includes(req)) {
//       weightedMatchCount += 1.0;
//       matchedSkillsList.push(originalReq);
//     }
//   });

//   const maxPossibleWeight = normalizedReqs.length * 1.5;
//   const skillScore = maxPossibleWeight > 0 ? (weightedMatchCount / maxPossibleWeight) * 60 : 0;

//   // 3. PROFESSIONAL EXPERIENCE
//   const totalMonths = aiOutput.totalProfessionalMonths || 0;
//   let expScore = 5; 
//   if (totalMonths >= 36) expScore = 20; 
//   else if (totalMonths >= 12) expScore = 12;

//   // 4. SYSTEM INTEGRITY
//   const integrityScore = 10;

//   const finalScore = Math.round(skillScore + expScore + linkScore + integrityScore);
  
//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills: [...new Set(matchedSkillsList)],
//     missingRequiredSkills: rawRequirements.filter(r => !matchedSkillsList.includes(r)),
//     experienceRelevance: totalMonths >= 12 ? "High" : "Medium",
//     summary: aiOutput.summary,
//     professionalMonths: totalMonths,
//     uniqueLinks: uniqueTrustedLinks.length
//   };
// }

// /**
//  * DETERMINISTIC MATH ENGINE for Multi-mode
//  */
// function calculateDeterministicScore(skillsMatchData, resumeText, jobRequirements, profMonths = 0) {
//     const rawReqs = Array.isArray(jobRequirements) ? [...new Set(jobRequirements)] : [];
//     const normalizedReqs = rawReqs.map(r => normalizeSkill(r));

//     const linkPattern = /(https?:\/\/[^\s]+)/g;
//     const allLinks = resumeText.match(linkPattern) || [];
//     const trustedDomains = ["github.com", "vercel.app", "netlify.app", "github.io"];
//     const uniqueLinks = [...new Set(allLinks.filter(l => trustedDomains.some(d => l.includes(d))))];
//     let linkPoints = uniqueLinks.length >= 3 ? 10 : (uniqueLinks.length >= 1 ? 5 : 0);

//     const expSkills = (skillsMatchData.experience || []).map(s => normalizeSkill(s));
//     const listSkills = (skillsMatchData.skillsList || []).map(s => normalizeSkill(s));
//     const fallback = (skillsMatchData.generalSkills || []).map(s => normalizeSkill(s));

//     let weightedPoints = 0;
//     let matchedList = [];

//     normalizedReqs.forEach((req, idx) => {
//         if (expSkills.includes(req)) {
//             weightedPoints += 1.5; 
//             matchedList.push(rawReqs[idx]);
//         } else if (listSkills.includes(req) || fallback.includes(req)) {
//             weightedPoints += 1.0;
//             matchedList.push(rawReqs[idx]);
//         }
//     });

//     const skillScore = normalizedReqs.length > 0 ? (weightedPoints / (normalizedReqs.length * 1.5)) * 60 : 0;
//     let expPoints = profMonths >= 36 ? 20 : (profMonths >= 12 ? 12 : 5);

//     return {
//         matchScore: Math.min(100, Math.round(skillScore + expPoints + linkPoints + 10)),
//         matchedSkills: [...new Set(matchedList)],
//         missingRequiredSkills: rawReqs.filter(r => !matchedList.includes(r)),
//         professionalMonths: profMonths,
//         uniqueLinksFound: uniqueLinks.length
//     };
// }

// // ============================================================================
// // 🚀 ROUTE: MULTI-MODE ANALYSIS (Analyze V2)
// // ============================================================================
// // ============================================================================
// // 🚀 ROUTE: MULTI-MODE ANALYSIS (Fixed V2)
// // ============================================================================
// // --- UPDATED ANALYZE-V2 ROUTE ---
// router.post("/analyze-v2", verifyToken, async (req, res) => {
//     try {
//         const { resumeUrl, jobId, mode = "professional", applicationId } = req.body; 
//         const job = await Job.findById(jobId);
//         if (!job) return res.status(404).json({ message: "Job not found" });

//         const resumeText = await parseResumeFromUrl(resumeUrl);
//         let finalAnalysis;

//         if (mode === "standard") {
//             const mockSectionData = { generalSkills: resumeText.split(/[\s,]+/) };
//             finalAnalysis = calculateDeterministicScore(mockSectionData, resumeText, job.requirements, 0);
//             finalAnalysis.summary = "Standard keyword match (No AI).";
//             finalAnalysis.status = "SUCCESS";
//         } 
//         else if (mode === "professional") {
//             const systemPrompt = `ACT AS: ATS Auditor. 
//             FORMAT: { "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] }, "totalMonths": 0, "summary": "Short fact." }`;
            
//             const result = await generateJSON(systemPrompt, `RESUME CONTENT:\n${resumeText}`);

//             // FIX: Check if result.data exists and has the correct fields
//             if (!result.data || !result.data.skillsBySection) {
//                 finalAnalysis = {
//                     matchScore: 0,
//                     status: "FAIL", // Mark as FAIL for the "Retry" logic
//                     summary: "AI failed to parse structure.",
//                     provider: result.provider || "Error"
//                 };
//             } else {
//                 // FIX: Ensure result.data.totalMonths is passed to the math engine
//                 finalAnalysis = calculateDeterministicScore(
//                     result.data.skillsBySection, 
//                     resumeText, 
//                     job.requirements, 
//                     result.data.totalMonths || 0 
//                 );
//                 finalAnalysis.summary = result.data.summary;
//                 finalAnalysis.status = "SUCCESS";
//                 finalAnalysis.provider = result.provider;
//             }
//         }
//         else {
//             // Beta Mode Logic...
//             finalAnalysis.status = "SUCCESS";
//         }

//         // Save to Database
//         const application = await Application.findById(applicationId);
//         if (application) {
//             application.aiAnalysis = [finalAnalysis, ...(application.aiAnalysis || [])];
//             await application.save();
//         }

//         res.json({ success: true, analysis: finalAnalysis });
//     } catch (err) {
//         res.status(500).json({ success: false, status: "FAIL" });
//     }
// });
// // ============================================================================
// // 🏛️ LEGACY ROUTE: Hardened with Failure Guards
// // ============================================================================
// router.post("/analyze-resume", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId } = req.body;
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const resumeText = await parseResumeFromUrl(resumeUrl);

//    const systemPrompt = `
//       You are an ATS Auditor. 
//       STRICT RULES:
//       1. TOTAL PROFESSIONAL MONTHS: Look ONLY at Work Experience sections. IGNORE Education dates. If only Education exists, return 0.
//       2. SECTION SCAN: Extract skills from "Projects/Experience" into "experience". Extract from "Skills list" into "skillsList".
//       3. FALLBACK: If you find technical skills but cannot determine the section, put them in "generalSkills".
      
//       OUTPUT JSON ONLY:
//       {
//         "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] },
//         "totalProfessionalMonths": 0,
//         "summary": "1 sentence match."
//       }
//     `;

//     const result = await generateJSON(systemPrompt, `Analyze:\n"${resumeText}"`);

//     // 🛑 FAILURE GUARD: If result is empty or keys are missing
//     let analysisData;
//     if (!result.data || !result.data.skillsBySection) {
//       console.warn("Legacy Route: AI Extraction failed. Sending 0 score fallback.");
//       analysisData = {
//         matchScore: 0,
//         matchedSkills: [],
//         missingRequiredSkills: job.requirements,
//         experienceRelevance: "N/A",
//         summary: "❌ AI Extraction Failed: The system could not read the resume structure correctly. Please try a different model or retry.",
//         professionalMonths: 0,
//         uniqueLinks: 0,
//         provider: result.provider || "Unknown"
//       };
//     } else {
//       analysisData = calculateTop1Score(result.data, job.requirements, resumeText);
//       analysisData.provider = result.provider;
//     }

//     const application = await Application.findById(applicationId);
//     if (application) {
//       application.aiAnalysis = [analysisData, ...(application.aiAnalysis || [])];
//       await application.save();
//     }

//     res.status(200).json({ success: true, analysis: analysisData });

//   } catch (err) {
//     console.error("ANALYSIS FAILED:", err.message);
//     const status = err.message.includes("INVALID_DOCUMENT") ? 400 : 500;
//     res.status(status).json({ message: err.message });
//   }
// });

// module.exports = router; 



//========================================================//
//============it wokrs fine now ==================//

// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const parseResumeFromUrl = require("../utils/resumeParser");
// const { 
//   normalizeSkill, 
//   getSkillWeight, 
//   extractSkillsFromText 
// } = require("../utils/skillMap");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { generateJSON } = require("../utils/aiServices");

// // ============================================================================
// // 🧮 STANDARD MODE: Pure Keyword Matching (No AI)
// // ============================================================================
// function calculateStandardScore(resumeText, jobRequirements) {
//   console.log("--- STANDARD MODE: Keyword Analysis ---");

//   // Extract skills from resume text using our enhanced skillMap
//   const detectedSkills = extractSkillsFromText(resumeText);
//   console.log(`Detected ${detectedSkills.length} skills from resume`);

//   // Normalize job requirements
//   const normalizedReqs = jobRequirements
//     .map(req => normalizeSkill(req))
//     .filter(Boolean);

//   // Calculate matches with weighting
//   let totalWeight = 0;
//   let matchedWeight = 0;
//   const matchedSkills = [];
//   const missingSkills = [];

//   normalizedReqs.forEach((reqSkill) => {
//     const weight = getSkillWeight(reqSkill);
//     totalWeight += weight;

//     if (detectedSkills.includes(reqSkill)) {
//       matchedWeight += weight;
//       matchedSkills.push(reqSkill);
//     } else {
//       missingSkills.push(reqSkill);
//     }
//   });

//   // Skill match score (0-70 points)
//   const skillScore = totalWeight > 0 
//     ? (matchedWeight / totalWeight) * 70 
//     : 0;

//   // Link detection (0-15 points)
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = [
//     "github.com", "linkedin.com", "portfolio",
//     "vercel.app", "netlify.app", "github.io"
//   ];
//   const uniqueLinks = [...new Set(
//     allLinks.filter(link => 
//       trustedDomains.some(domain => link.includes(domain))
//     )
//   )];
//   const linkScore = Math.min(uniqueLinks.length * 5, 15);

//   // Experience detection (0-15 points)
//   const expPatterns = [
//     /(\d+)\+?\s*(years?|yrs?)/gi,
//     /(\d+)\s*months?/gi,
//     /(intern|internship|trainee)/gi,
//     /(junior|mid-level|senior|lead)/gi
//   ];
//   let expScore = 5; // Base score
//   for (const pattern of expPatterns) {
//     if (pattern.test(resumeText)) {
//       expScore = Math.min(expScore + 5, 15);
//     }
//   }

//   const finalScore = Math.round(skillScore + linkScore + expScore);

//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills,
//     missingRequiredSkills: missingSkills,
//     summary: `Standard keyword match found ${matchedSkills.length}/${normalizedReqs.length} required skills.`,
//     status: "SUCCESS",
//     mode: "standard",
//     detectedSkillsCount: detectedSkills.length,
//     linksFound: uniqueLinks.length
//   };
// }

// // ============================================================================
// // 🤖 PROFESSIONAL MODE: AI-Powered with Fallback
// // ============================================================================
// async function calculateProfessionalScore(resumeText, jobRequirements, appId) {
//   console.log("--- PROFESSIONAL MODE: AI Analysis ---");

//   const systemPrompt = `You are an ATS (Applicant Tracking System) analyzer.

// CRITICAL RULES:
// 1. Extract skills from EXPERIENCE/PROJECTS sections → put in "experience" array
// 2. Extract skills from dedicated SKILLS sections → put in "skillsList" array
// 3. If you find technical skills but can't identify section → put in "generalSkills"
// 4. Calculate TOTAL PROFESSIONAL MONTHS from work experience ONLY (ignore education dates)
// 5. If resume has NO work experience, set totalMonths to 0

// REQUIRED JSON OUTPUT (no markdown, no explanation):
// {
//   "skillsBySection": {
//     "experience": ["skill1", "skill2"],
//     "skillsList": ["skill3", "skill4"],
//     "generalSkills": ["skill5"]
//   },
//   "totalMonths": 0,
//   "summary": "One sentence about candidate fit"
// }`;

//   try {
//     // Attempt AI analysis
//     const result = await generateJSON(
//       systemPrompt,
//       `Analyze this resume:\n\n${resumeText.substring(0, 4000)}`
//     );

//     // VALIDATION: Check if AI returned valid structure
//     if (!result.data || 
//         !result.data.skillsBySection ||
//         typeof result.data.totalMonths === 'undefined') {
      
//       console.warn("⚠️ AI returned invalid structure, using fallback");
//       return calculateStandardScore(resumeText, jobRequirements);
//     }

//     // Extract AI-detected skills
//     const aiSkills = {
//       experience: result.data.skillsBySection.experience || [],
//       skillsList: result.data.skillsBySection.skillsList || [],
//       generalSkills: result.data.skillsBySection.generalSkills || []
//     };

//     // Calculate score using deterministic math
//     const score = calculateDeterministicScore(
//       aiSkills,
//       resumeText,
//       jobRequirements,
//       result.data.totalMonths || 0
//     );

//     // Add AI metadata
//     score.summary = result.data.summary || "AI analysis complete";
//     score.provider = result.provider || "Unknown";
//     score.mode = "professional";
//     score.status = "SUCCESS";

//     return score;

//   } catch (error) {
//     console.error("❌ AI Analysis failed:", error.message);
    
//     // FALLBACK: Use standard mode if AI fails
//     console.log("🔄 Falling back to Standard Mode");
//     const fallbackScore = calculateStandardScore(resumeText, jobRequirements);
//     fallbackScore.summary = "AI failed - using keyword matching as fallback";
//     fallbackScore.provider = "Fallback";
//     return fallbackScore;
//   }
// }

// // ============================================================================
// // 🧮 DETERMINISTIC SCORING (Used by Professional Mode)
// // ============================================================================
// function calculateDeterministicScore(
//   aiSkills, 
//   resumeText, 
//   jobRequirements, 
//   profMonths = 0
// ) {
//   // Normalize all detected skills
//   const expSkills = aiSkills.experience.map(s => normalizeSkill(s));
//   const listSkills = aiSkills.skillsList.map(s => normalizeSkill(s));
//   const generalSkills = aiSkills.generalSkills.map(s => normalizeSkill(s));

//   // Normalize job requirements
//   const normalizedReqs = jobRequirements
//     .map(req => normalizeSkill(req))
//     .filter(Boolean);

//   // Calculate weighted matches
//   let totalWeight = 0;
//   let matchedWeight = 0;
//   const matchedSkills = [];
//   const missingSkills = [];

//   normalizedReqs.forEach((reqSkill) => {
//     const weight = getSkillWeight(reqSkill);
//     totalWeight += weight;

//     // Priority: Experience > Skills List > General
//     if (expSkills.includes(reqSkill)) {
//       matchedWeight += weight * 1.5; // 50% bonus for experience
//       matchedSkills.push(reqSkill);
//     } else if (listSkills.includes(reqSkill)) {
//       matchedWeight += weight * 1.2; // 20% bonus for listed
//       matchedSkills.push(reqSkill);
//     } else if (generalSkills.includes(reqSkill)) {
//       matchedWeight += weight;
//       matchedSkills.push(reqSkill);
//     } else {
//       missingSkills.push(reqSkill);
//     }
//   });

//   // Skill score (0-60 points)
//   const skillScore = totalWeight > 0 
//     ? (matchedWeight / (totalWeight * 1.5)) * 60 
//     : 0;

//   // Experience score (0-20 points)
//   let expScore = 5; // Base
//   if (profMonths >= 60) expScore = 20;       // 5+ years
//   else if (profMonths >= 36) expScore = 15;  // 3+ years
//   else if (profMonths >= 12) expScore = 10;  // 1+ year

//   // Link score (0-10 points)
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = [
//     "github.com", "linkedin.com", "portfolio",
//     "vercel.app", "netlify.app"
//   ];
//   const uniqueLinks = [...new Set(
//     allLinks.filter(link => 
//       trustedDomains.some(domain => link.includes(domain))
//     )
//   )];
//   const linkScore = Math.min(uniqueLinks.length * 3, 10);

//   // Base integrity score (always 10 points)
//   const integrityScore = 10;

//   const finalScore = Math.round(
//     skillScore + expScore + linkScore + integrityScore
//   );

//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills: [...new Set(matchedSkills)],
//     missingRequiredSkills: missingSkills,
//     professionalMonths: profMonths,
//     experienceRelevance: profMonths >= 24 ? "High" : 
//                         profMonths >= 12 ? "Medium" : "Low",
//     linksFound: uniqueLinks.length,
//     breakdown: {
//       skillScore: Math.round(skillScore),
//       expScore,
//       linkScore,
//       integrityScore
//     }
//   };
// }

// // ============================================================================
// // 🚀 MAIN ROUTE: ANALYZE-V2 (Multi-Mode)
// // ============================================================================
// router.post("/analyze-v2", verifyToken, async (req, res) => {
//   try {
//     const { 
//       resumeUrl, 
//       jobId, 
//       applicationId,
//       mode = "professional" 
//     } = req.body;

//     // Validate inputs
//     if (!resumeUrl || !jobId || !applicationId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields"
//       });
//     }

//     // Fetch job
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found"
//       });
//     }

//     // Parse resume
//     const resumeText = await parseResumeFromUrl(resumeUrl);
//     if (!resumeText || resumeText.trim().length < 50) {
//       return res.status(400).json({
//         success: false,
//         message: "Resume text too short or invalid"
//       });
//     }

//     let finalAnalysis;

//     // MODE ROUTING
//     switch (mode) {
//       case "standard":
//         finalAnalysis = calculateStandardScore(
//           resumeText, 
//           job.requirements
//         );
//         break;

//       case "professional":
//         finalAnalysis = await calculateProfessionalScore(
//           resumeText,
//           job.requirements,
//           applicationId
//         );
//         break;

//       case "beta":
//         // Original AI implementation (from your analyze-resume route)
//         finalAnalysis = await calculateBetaScore(
//           resumeText,
//           job.requirements
//         );
//         break;

//       default:
//         return res.status(400).json({
//           success: false,
//           message: "Invalid mode"
//         });
//     }

//     // Save to database
//     const application = await Application.findById(applicationId);
//     if (application) {
//       const existingAnalysis = Array.isArray(application.aiAnalysis) 
//         ? application.aiAnalysis 
//         : [];
      
//       application.aiAnalysis = [finalAnalysis, ...existingAnalysis];
//       await application.save();
//     }

//     res.json({
//       success: true,
//       analysis: finalAnalysis
//     });

//   } catch (err) {
//     console.error("ANALYSIS FAILED:", err);
//     res.status(500).json({
//       success: false,
//       status: "FAIL",
//       message: err.message
//     });
//   }
// });

// // ============================================================================
// // 🧪 BETA MODE: Original AI (Legacy)
// // ============================================================================
// async function calculateBetaScore(resumeText, jobRequirements) {
//   console.log("--- BETA MODE: Original AI ---");
  
//   const systemPrompt = `You are an ATS Auditor.
// STRICT RULES:
// 1. TOTAL PROFESSIONAL MONTHS: Look ONLY at Work Experience sections. IGNORE Education dates. If only Education exists, return 0.
// 2. SECTION SCAN: Extract skills from "Projects/Experience" into "experience". Extract from "Skills list" into "skillsList".
// 3. FALLBACK: If you find technical skills but cannot determine the section, put them in "generalSkills".

// OUTPUT JSON ONLY:
// {
//   "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] },
//   "totalProfessionalMonths": 0,
//   "summary": "1 sentence match."
// }`;

//   try {
//     const result = await generateJSON(
//       systemPrompt,
//       `Analyze:\n"${resumeText.substring(0, 4000)}"`
//     );

//     if (!result.data || !result.data.skillsBySection) {
//       // Beta mode fallback
//       return {
//         matchScore: 0,
//         matchedSkills: [],
//         missingRequiredSkills: jobRequirements,
//         summary: "Beta AI extraction failed",
//         status: "FAIL",
//         mode: "beta"
//       };
//     }

//     // Use the original calculateTop1Score logic
//     return calculateTop1Score(
//       result.data,
//       jobRequirements,
//       resumeText,
//       result.provider
//     );

//   } catch (err) {
//     return {
//       matchScore: 0,
//       matchedSkills: [],
//       missingRequiredSkills: jobRequirements,
//       summary: "Beta AI error",
//       status: "FAIL",
//       mode: "beta"
//     };
//   }
// }

// // Original scoring function (for beta mode)
// function calculateTop1Score(aiOutput, jobRequirements, resumeText, provider) {
//   const rawRequirements = Array.isArray(jobRequirements) 
//     ? [...new Set(jobRequirements)] 
//     : [];
//   const normalizedReqs = rawRequirements.map(r => normalizeSkill(r));

//   // Link detection
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const allLinks = resumeText.match(linkPattern) || [];
//   const trustedDomains = [
//     "github.com", "vercel.app", "netlify.app", 
//     "github.io", "linkedin.com"
//   ];
//   const uniqueTrustedLinks = [...new Set(
//     allLinks.filter(link => 
//       trustedDomains.some(domain => link.includes(domain))
//     )
//   )];
//   let linkScore = uniqueTrustedLinks.length >= 3 ? 10 : 
//                   uniqueTrustedLinks.length >= 1 ? 5 : 0;

//   // Skill matching
//   const skillsInExp = (aiOutput.skillsBySection?.experience || [])
//     .map(s => normalizeSkill(s));
//   const skillsInList = (aiOutput.skillsBySection?.skillsList || [])
//     .map(s => normalizeSkill(s));
//   const generalSkills = (aiOutput.generalSkills || [])
//     .map(s => normalizeSkill(s));

//   let weightedMatchCount = 0;
//   let matchedSkillsList = [];

//   normalizedReqs.forEach((req, index) => {
//     const originalReq = rawRequirements[index];
//     if (skillsInExp.includes(req)) {
//       weightedMatchCount += 1.5;
//       matchedSkillsList.push(originalReq);
//     } else if (skillsInList.includes(req) || generalSkills.includes(req)) {
//       weightedMatchCount += 1.0;
//       matchedSkillsList.push(originalReq);
//     }
//   });

//   const maxPossibleWeight = normalizedReqs.length * 1.5;
//   const skillScore = maxPossibleWeight > 0 
//     ? (weightedMatchCount / maxPossibleWeight) * 60 
//     : 0;

//   // Experience
//   const totalMonths = aiOutput.totalProfessionalMonths || 0;
//   let expScore = 5;
//   if (totalMonths >= 36) expScore = 20;
//   else if (totalMonths >= 12) expScore = 12;

//   const integrityScore = 10;
//   const finalScore = Math.round(
//     skillScore + expScore + linkScore + integrityScore
//   );

//   return {
//     matchScore: Math.min(100, finalScore),
//     matchedSkills: [...new Set(matchedSkillsList)],
//     missingRequiredSkills: rawRequirements.filter(
//       r => !matchedSkillsList.includes(r)
//     ),
//     experienceRelevance: totalMonths >= 12 ? "High" : "Medium",
//     summary: aiOutput.summary,
//     professionalMonths: totalMonths,
//     uniqueLinks: uniqueTrustedLinks.length,
//     provider,
//     mode: "beta",
//     status: "SUCCESS"
//   };
// }

// // ============================================================================
// // 🏛️ LEGACY ROUTE (Keep for backward compatibility)
// // ============================================================================
// router.post("/analyze-resume", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId } = req.body;
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const resumeText = await parseResumeFromUrl(resumeUrl);

//     // Use beta mode for legacy route
//     const analysisData = await calculateBetaScore(
//       resumeText,
//       job.requirements
//     );

//     const application = await Application.findById(applicationId);
//     if (application) {
//       application.aiAnalysis = [
//         analysisData,
//         ...(application.aiAnalysis || [])
//       ];
//       await application.save();
//     }

//     res.status(200).json({
//       success: true,
//       analysis: analysisData
//     });

//   } catch (err) {
//     console.error("LEGACY ANALYSIS FAILED:", err.message);
//     const status = err.message.includes("INVALID_DOCUMENT") ? 400 : 500;
//     res.status(status).json({ message: err.message });
//   }
// });

// module.exports = router;

//=================================================
//================new one done by claude 
 
/**
 * UNIFIED AI ANALYSIS ROUTE
 * Single endpoint that handles all analysis modes with intelligent fallback
 * 
 * Features:
 * - Auto fallback (AI → Local if AI fails)
 * - Confidence scoring
 * - Deterministic scoring (same input = same output)
 * - Edge case handling
 * - Metadata tracking for recruiter transparency
 */

// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const parseResumeFromUrl = require("../utils/resumeParser");
// const { normalizeSkill, getSkillWeight, extractSkillsFromText } = require("../utils/skillMap");
// const Job = require("../models/Job");
// const Application = require("../models/Application");
// const { generateJSON } = require("../utils/aiServices");

// // ============================================================================
// // 🔧 CONFIGURATION & CONSTANTS
// // ============================================================================

// const SCORING_CONFIG = {
//   MAX_SKILL_SCORE: 60,
//   MAX_EXP_SCORE: 20,
//   MAX_LINK_SCORE: 10,
//   BASE_INTEGRITY: 10,
//   TRUSTED_DOMAINS: ["github.com", "linkedin.com", "vercel.app", "netlify.app", "github.io", "portfolio"]
// };

// const MIN_RESUME_LENGTH = 100; // Minimum characters to be valid resume

// /**
//  * DETERMINISTIC SCORING ENGINE
//  * Updated to use Zonal Data for "Standard Mode" parity.
//  * Add this after your SCORING_CONFIG object.
//  */
// /**
//  * 🎯 FIXED SCORING ENGINE
//  * Fixes variable name mismatches and implements "Summed" experience logic.
//  */
// function calculateDeterministicScore(extractedData, resumeZones, jobRequirements) {
//   // 1. Initialize the score object (replacing 'scoreBreakdown' with 'score') 
//   const score = { 
//     skillScore: 0, 
//     expScore: 0, 
//     linkScore: 0, 
//     integrityScore: SCORING_CONFIG.BASE_INTEGRITY 
//   };

//   const normalizedReqs = jobRequirements
//     .map(req => normalizeSkill(req))
//     .filter(Boolean);

//   // 2. Map skills from AI or Local Zones
//   const skillsFromExp = extractedData.experience?.length > 0 
//     ? extractedData.experience.map(s => normalizeSkill(s)) 
//     : extractSkillsFromText(resumeZones.experienceZone);

//   const skillsGeneral = extractedData.generalSkills?.length > 0
//     ? extractedData.generalSkills.map(s => normalizeSkill(s))
//     : extractSkillsFromText(resumeZones.generalZone);

//   const skillsFromList = (extractedData.skillsList || []).map(s => normalizeSkill(s));

//   let totalWeight = 0;
//   let matchedWeight = 0;
//   const matchedSkills = [];

//   normalizedReqs.forEach((reqSkill) => {
//     const weight = getSkillWeight(reqSkill);
//     totalWeight += weight;

//     if (skillsFromExp.includes(reqSkill)) {
//       matchedWeight += weight * 1.5;
//       matchedSkills.push(reqSkill);
//     } else if (skillsFromList.includes(reqSkill)) {
//       matchedWeight += weight * 1.2;
//       matchedSkills.push(reqSkill);
//     } else if (skillsGeneral.includes(reqSkill)) {
//       matchedWeight += weight * 1.0;
//       matchedSkills.push(reqSkill);
//     }
//   });

//   const maxPossibleWeight = totalWeight * 1.5;
//   score.skillScore = maxPossibleWeight > 0 
//     ? Math.round((matchedWeight / maxPossibleWeight) * SCORING_CONFIG.MAX_SKILL_SCORE)
//     : 0;

  
// // 🔴 FIX: Using 'score' consistently instead of 'scoreBreakdown'
//   // ─── SECTION 2: EXPERIENCE SCORING (0-20 points) ───
//   const months = extractedData.totalMonths || 0;
//   if (months >= 60) score.expScore = 20; 
//   else if (months >= 36) score.expScore = 15;
//   else if (months >= 12) score.expScore = 10;
//   else if (months > 0) score.expScore = 5;

//   // ─── SECTION 3: LINK DETECTION (0-10 points) ───
//   const links = resumeZones.fullText.match(/(https?:\/\/[^\s]+)/g) || [];
//   const uniqueLinks = [...new Set(links.filter(link => 
//     SCORING_CONFIG.TRUSTED_DOMAINS.some(domain => link.includes(domain))
//   ))];

//   if (uniqueLinks.length >= 3) score.linkScore = 10;
//   else if (uniqueLinks.length >= 2) score.linkScore = 7;
//   else if (uniqueLinks.length >= 1) score.linkScore = 5;

//   // ─── SECTION 4: INTEGRITY SCORE (10 points) ───
//   score.integrityScore = 10; 

//   // ─── FINAL CALCULATION ───
//   const finalScore = Math.min(100, 
//     score.skillScore + 
//     score.expScore + 
//     score.linkScore + 
//     score.integrityScore
//   );

//   return {
//     matchScore: finalScore,
//     matchedSkills: [...new Set(matchedSkills)],
//     missingRequiredSkills: normalizedReqs.filter(r => !matchedSkills.includes(r)), // Fixed key name here too
//     professionalMonths: months,
//     breakdown: score, // This correctly sends back the breakdown
//     experienceLevel: months >= 36 ? "Experienced" : months >= 12 ? "Intermediate" : "Junior",
//     linkedProfiles: uniqueLinks.length
//   };
// // ============================================================================
// // 🤖 AI EXTRACTION MODE (Try to use AI, fallback to local)
// // ============================================================================

// async function analyzeWithAI(resumeText, jobId) {
//   const systemPrompt = `You are an ATS (Applicant Tracking System) analyzer.

// STRICT RULES:
// 1. Extract ONLY technical skills from EXPERIENCE/PROJECTS sections → put in "experience"
// 2. Extract skills from dedicated SKILLS sections → put in "skillsList"
// 3. Unknown skills → put in "generalSkills"
// 4. Calculate PROFESSIONAL MONTHS from work experience ONLY (ignore education)
// 5. If NO work experience → totalMonths = 0
// 6. Return VALID JSON only

// OUTPUT FORMAT (MUST BE VALID JSON):
// {
//   "skillsBySection": {
//     "experience": ["skill1", "skill2"],
//     "skillsList": ["skill3"],
//     "generalSkills": ["skill4"]
//   },
//   "totalMonths": 24,
//   "summary": "Brief 1-sentence assessment"
// }`;

//   try {
//     console.log("🤖 AI Extraction: Attempting AI analysis...");
    
//     const result = await generateJSON(systemPrompt, `Resume text (first 4000 chars):\n${resumeText.substring(0, 4000)}`);

//     // Validate AI response structure
//     if (!result.data || !result.data.skillsBySection || typeof result.data.totalMonths === 'undefined') {
//       console.warn("⚠️ AI returned invalid structure, falling back to local");
//       return {
//         success: false,
//         reason: "INVALID_AI_RESPONSE",
//         data: null,
//         provider: result.provider || "Unknown"
//       };
//     }

//     console.log("✅ AI Extraction: Success");
//     return {
//       success: true,
//       data: result.data,
//       provider: result.provider,
//       reason: "AI_SUCCESS"
//     };
//   } catch (error) {
//     console.error("❌ AI Extraction Failed:", error.message);
//     return {
//       success: false,
//       reason: "AI_ERROR",
//       error: error.message,
//       data: null,
//       provider: "None"
//     };
//   }
// }

// // ============================================================================
// // 📍 LOCAL EXTRACTION MODE (Fallback - Always Works)
// // ============================================================================

// function analyzeLocal(resumeText) {
//   console.log("📍 Local Extraction: Using keyword matching...");

//   const detectedSkills = extractSkillsFromText(resumeText);

//   // Simple professional months detection
//   const monthPattern = /(\d+)\s*(?:months?|mos?)/gi;
//   const yearPattern = /(\d+)\+?\s*(?:years?|yrs?)/gi;

//   let totalMonths = 0;
  
//   const yearMatches = resumeText.matchAll(yearPattern);
//   for (const match of yearMatches) {
//     totalMonths += parseInt(match[1]) * 12;
//   }

//   const monthMatches = resumeText.matchAll(monthPattern);
//   for (const match of monthMatches) {
//     totalMonths += parseInt(match[1]);
//   }

//   console.log(`✅ Local Extraction: Found ${detectedSkills.length} skills, ${totalMonths} months experience`);

//   return {
//     success: true,
//     data: {
//       skillsBySection: {
//         experience: detectedSkills,
//         skillsList: [],
//         generalSkills: []
//       },
//       totalMonths: totalMonths,
//       summary: `Found ${detectedSkills.length} technical skills and ${totalMonths} months of experience.`
//     },
//     provider: "Local/Keyword",
//     reason: "LOCAL_SUCCESS"
//   };
// }

// // ============================================================================
// // 🎯 CONFIDENCE SCORING (How much can we trust this result?)
// // ============================================================================

// function calculateConfidence(analysis, extractionMethod) {
//   let confidence = 0.5; // Base confidence

//   // Bonus: If multiple skills matched
//   if (analysis.matchedSkills.length >= 3) confidence += 0.15;
//   else if (analysis.matchedSkills.length >= 1) confidence += 0.1;

//   // Bonus: If experience found
//   if (analysis.professionalMonths >= 12) confidence += 0.15;
//   else if (analysis.professionalMonths > 0) confidence += 0.08;

//   // Bonus: If portfolio links found
//   if (analysis.linkedProfiles >= 2) confidence += 0.1;
//   else if (analysis.linkedProfiles >= 1) confidence += 0.05;

//   // AI extraction is more trustworthy IF successful
//   if (extractionMethod === "ai") confidence += 0.1;
  
//   // Local extraction is reliable but less nuanced
//   if (extractionMethod === "local") confidence += 0.05;

//   return Math.min(1, confidence); // Cap at 1.0
// }

// // ============================================================================
// // 🚨 EDGE CASE HANDLERS
// // ============================================================================

// function handleEdgeCases(resumeText, extractionResult, jobId) {
//   const warnings = [];
//   const errors = [];

//   // Edge Case 1: Resume too short (corrupted?)
//   if (resumeText.length < MIN_RESUME_LENGTH) {
//     errors.push("Resume content too short (possibly corrupted or invalid PDF)");
//     return { valid: false, warnings, errors };
//   }

//   // Edge Case 2: No skills detected at all
//   if (extractionResult.data.skillsBySection.experience.length === 0 &&
//       extractionResult.data.skillsBySection.skillsList.length === 0 &&
//       extractionResult.data.skillsBySection.generalSkills.length === 0) {
//     warnings.push("No technical skills detected in resume (possible edge case)");
//   }

//   // Edge Case 3: No experience data
//   if (extractionResult.data.totalMonths === 0 || extractionResult.data.totalMonths === undefined) {
//     warnings.push("No professional experience duration found (may be fresher or parsing issue)");
//   }

//   // Edge Case 4: Score seems unrealistic
//   if (extractionResult.score && extractionResult.score < 10 && extractionResult.data.skillsBySection.experience.length > 5) {
//     warnings.push("Low match score despite multiple skills detected (possible skill name mismatch)");
//   }

//   return { valid: true, warnings, errors };
// }

// // ============================================================================
// // 🔄 MAIN ANALYSIS ORCHESTRATOR
// // ============================================================================

// /**
//  * 🔄 MAIN ANALYSIS ORCHESTRATOR
//  * Coordinates parsing, AI/Local extraction, and the scoring engine.
//  */
// async function performAnalysis(resumeUrl, jobId, mode = "auto") {
//   try {
//     // STEP 1: Parse resume (Now returns an object with zones)
//     console.log(`\n📄 ANALYSIS START: Mode=${mode}`);
//     const resumeData = await parseResumeFromUrl(resumeUrl);

//     // 🔴 FIX: Check the 'fullText' property of the object
//     if (!resumeData || !resumeData.fullText || resumeData.fullText.trim().length < MIN_RESUME_LENGTH) {
//       throw new Error("INVALID_RESUME: Resume text too short or empty");
//     }

//     // STEP 2: Get job requirements
//     const job = await Job.findById(jobId);
//     if (!job) throw new Error("JOB_NOT_FOUND");

//     // STEP 3: Try extraction based on mode
//     let extractionResult;

//     if (mode === "force-ai") {
//       extractionResult = await analyzeWithAI(resumeData.fullText, jobId);
//       if (!extractionResult.success) {
//         throw new Error(`AI_FAILED: ${extractionResult.reason}`);
//       }
//     } else if (mode === "force-local") {
//       extractionResult = analyzeLocal(resumeData.fullText);
//     } else {
//     //   // AUTO mode logic
//     //   extractionResult = await analyzeWithAI(resumeData.fullText, jobId);

//     //   if (!extractionResult.success) {
//     //     console.log(`⚠️ AI failed (${extractionResult.reason}), falling back to local...`);
//     //     extractionResult = analyzeLocal(resumeData.fullText);
//     //     extractionResult.aiAttempted = true;
//     //     extractionResult.aiFailedReason = extractionResult.reason;
//     //   }
//     // }

//     // Try AI for "auto" or "force-ai" modes
//       extractionResult = await analyzeWithAI(resumeData.fullText, jobId);

//       // 🔴 CHANGE: Instead of falling back to local, we report the failure
//       if (!extractionResult.success) {
//         return {
//           success: true, // The request finished, but AI logic failed
//           analysis: {
//             matchScore: 0,
//             summary: "AI Extraction failed. Please retry.",
//             metadata: {
//               status: "FAILED",
//               canRetry: true,
//               error: extractionResult.reason,
//               timestamp: new Date()
//             }
//           }
//         };
//       }
//     }

//     // STEP 4: Calculate deterministic score
//     // 🔴 FIX: Passing 'resumeData' object which contains our zones
//     const scoreData = calculateDeterministicScore(
//       extractionResult.data.skillsBySection,
//       resumeData, 
//       job.requirements
//     );

//     // STEP 5: Check edge cases
//     const edgeCaseCheck = handleEdgeCases(resumeData.fullText, extractionResult, jobId);
    
//     if (!edgeCaseCheck.valid) {
//       return {
//         success: false,
//         error: edgeCaseCheck.errors[0],
//         errors: edgeCaseCheck.errors,
//         warnings: edgeCaseCheck.warnings
//       };
//     }

//     // STEP 6: Calculate confidence
//     const confidence = calculateConfidence(scoreData, extractionResult.provider === "Local/Keyword" ? "local" : "ai");

//     // STEP 7: Build final response
//     return {
//       success: true,
//       analysis: {
//         matchScore: scoreData.matchScore,
//         matchedSkills: scoreData.matchedSkills,
//         missingRequiredSkills: scoreData.missingRequiredSkills,
//         breakdown: scoreData.breakdown,
//         professionalMonths: scoreData.professionalMonths,
//         experienceLevel: scoreData.experienceLevel,
//         linkedProfiles: scoreData.linkedProfiles,
//         summary: extractionResult.data.summary,
        
//         metadata: {
//           provider: extractionResult.provider,
//           method: extractionResult.provider === "Local/Keyword" ? "local" : "ai",
//           aiAttempted: extractionResult.aiAttempted || false,
//           aiFailedReason: extractionResult.aiFailedReason || null,
//           confidence: confidence,
//           confidenceLabel: 
//             confidence >= 0.8 ? "High (Trust this score)" :
//             confidence >= 0.5 ? "Medium (Verify manually)" :
//             "Low (Review carefully)",
//           warnings: edgeCaseCheck.warnings,
//           timestamp: new Date()
//         }
//       }
//     };




// // ============================================================================
// // 🌐 MAIN ROUTE: POST /api/ai/analyze
// // ============================================================================

// router.post("/analyze", verifyToken, async (req, res) => {
//   try {
//     const { resumeUrl, jobId, applicationId, mode = "auto" } = req.body;

//     // Validation
//     if (!resumeUrl || !jobId || !applicationId) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields: resumeUrl, jobId, applicationId"
//       });
//     }

//     if (!["allprofessional", "standard", "beta"].includes(mode)) {
//       return res.status(400).json({
//         success: false,
//         error: `Invalid mode: ${mode}. Must be 'auto', 'force-ai', or 'force-local'`
//       });
//     }

//     // Perform analysis
//     const result = await performAnalysis(resumeUrl, jobId, mode);

//     if (!result.success) {
//       return res.status(400).json(result);
//     }

//     // Save to database
//     const application = await Application.findById(applicationId);
//     if (application) {
//       const existingAnalysis = Array.isArray(application.aiAnalysis) 
//         ? application.aiAnalysis 
//         : [];
      
//       application.aiAnalysis = [result.analysis, ...existingAnalysis];
//       await application.save();
//     }

//     // Return success
//     res.json({
//       success: true,
//       analysis: result.analysis
//     });

//   } catch (error) {
//     console.error("Route error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Server error during analysis"
//     });
//   }
// });




const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const parseResumeFromUrl = require("../utils/resumeParser");
const { normalizeSkill, getSkillWeight, extractSkillsFromText } = require("../utils/skillMap");
const Job = require("../models/Job");
const Application = require("../models/Application");
const { generateJSON, generateStream } = require("../utils/aiServices");

// ============================================================================
// 🔧 CONFIGURATION & CONSTANTS
// ============================================================================

const SCORING_CONFIG = {
  MAX_SKILL_SCORE: 60,
  MAX_EXP_SCORE: 20,
  MAX_LINK_SCORE: 10,
  BASE_INTEGRITY: 10,
  TRUSTED_DOMAINS: ["github.com", "linkedin.com", "vercel.app", "netlify.app", "github.io", "portfolio"]
};

const MIN_RESUME_LENGTH = 100;

// ============================================================================
// 🎯 DETERMINISTIC SCORING ENGINE
// ============================================================================
// function calculateDeterministicScore(extractedData, resumeZones, jobRequirements) {
//   const score = { 
//     skillScore: 0, 
//     expScore: 0, 
//     linkScore: 0, 
//     integrityScore: SCORING_CONFIG.BASE_INTEGRITY 
//   };

//   const normalizedReqs = jobRequirements
//     .map(req => normalizeSkill(req))
//     .filter(Boolean);

//   const skillsFromExp = extractedData.experience?.length > 0 
//     ? extractedData.experience.map(s => normalizeSkill(s)) 
//     : extractSkillsFromText(resumeZones.experienceZone);

//   const skillsGeneral = extractedData.generalSkills?.length > 0
//     ? extractedData.generalSkills.map(s => normalizeSkill(s))
//     : extractSkillsFromText(resumeZones.generalZone);

//   const skillsFromList = (extractedData.skillsList || []).map(s => normalizeSkill(s));

//   let totalWeight = 0;
//   let matchedWeight = 0;
//   const matchedSkills = [];

//   normalizedReqs.forEach((reqSkill) => {
//     const weight = getSkillWeight(reqSkill);
//     totalWeight += weight;

//     if (skillsFromExp.includes(reqSkill)) {
//       matchedWeight += weight * 1.5;
//       matchedSkills.push(reqSkill);
//     } else if (skillsFromList.includes(reqSkill)) {
//       matchedWeight += weight * 1.2;
//       matchedSkills.push(reqSkill);
//     } else if (skillsGeneral.includes(reqSkill)) {
//       matchedWeight += weight * 1.0;
//       matchedSkills.push(reqSkill);
//     }
//   });

//   const maxPossibleWeight = totalWeight * 1.5;
//   score.skillScore = maxPossibleWeight > 0 
//     ? Math.round((matchedWeight / maxPossibleWeight) * SCORING_CONFIG.MAX_SKILL_SCORE)
//     : 0;

//   const months = extractedData.totalMonths || 0;
//   if (months >= 60) score.expScore = 20; 
//   else if (months >= 36) score.expScore = 15;
//   else if (months >= 12) score.expScore = 10;
//   else if (months > 0) score.expScore = 5;

//   const links = resumeZones.fullText.match(/(https?:\/\/[^\s]+)/g) || [];
//   const uniqueLinks = [...new Set(links.filter(link => 
//     SCORING_CONFIG.TRUSTED_DOMAINS.some(domain => link.includes(domain))
//   ))];

//   if (uniqueLinks.length >= 3) score.linkScore = 10;
//   else if (uniqueLinks.length >= 2) score.linkScore = 7;
//   else if (uniqueLinks.length >= 1) score.linkScore = 5;

//   score.integrityScore = 10; 

//   const finalScore = Math.min(100, 
//     score.skillScore + score.expScore + score.linkScore + score.integrityScore
//   );

//   return {
//     matchScore: finalScore,
//     matchedSkills: [...new Set(matchedSkills)],
//     missingRequiredSkills: normalizedReqs.filter(r => !matchedSkills.includes(r)),
//     professionalMonths: months,
//     breakdown: score,
//     experienceLevel: months >= 36 ? "Experienced" : months >= 12 ? "Intermediate" : "Junior",
//     linkedProfiles: uniqueLinks.length
//   };
// }

function calculateDeterministicScore(extractedData, resumeZones, jobRequirements) {
  const score = { 
    skillScore: 0, 
    expScore: 0, 
    linkScore: 0, 
    integrityScore: SCORING_CONFIG.BASE_INTEGRITY 
  };

  const normalizedReqs = jobRequirements
    .map(req => normalizeSkill(req))
    .filter(Boolean);

  // 1. COMBINE ALL SECTIONS: Treat all found skills equally
  const allFoundSkills = [
    ...(extractedData.experience || []),
    ...(extractedData.skillsList || []),
    ...(extractedData.generalSkills || [])
  ].map(s => (typeof s === 'string' ? normalizeSkill(s) : normalizeSkill(s.name)));

  // Fallback to text extraction if sections are empty
  const textExtracted = [
    ...extractSkillsFromText(resumeZones.experienceZone),
    ...extractSkillsFromText(resumeZones.generalZone)
  ];

  const uniqueFoundSkills = [...new Set([...allFoundSkills, ...textExtracted])];

  // 2. FLAT MATCHING: No more weights or section-based multipliers
  let matchedCount = 0;
  const matchedSkills = [];

  normalizedReqs.forEach((reqSkill) => {
    if (uniqueFoundSkills.includes(reqSkill)) {
      matchedCount++;
      matchedSkills.push(reqSkill);
    }
  });

  // 3. SCORE CALCULATION: Percentage based on total required
  const skillMatchRatio = normalizedReqs.length > 0 ? (matchedCount / normalizedReqs.length) : 0;
  score.skillScore = Math.round(skillMatchRatio * SCORING_CONFIG.MAX_SKILL_SCORE);

  // Keep months and link scoring as they are (they work well)
  const months = extractedData.totalMonths || 0;
  if (months >= 60) score.expScore = 20; 
  else if (months >= 36) score.expScore = 15;
  else if (months >= 12) score.expScore = 10;
  else if (months > 0) score.expScore = 5;

  const finalScore = Math.min(100, 
    score.skillScore + score.expScore + score.linkScore + score.integrityScore
  );

  return {
    matchScore: finalScore,
    matchedSkills: [...new Set(matchedSkills)],
    missingRequiredSkills: normalizedReqs.filter(r => !matchedSkills.includes(r)),
    professionalMonths: months,
    breakdown: score
  };
}



// // ============================================================================
// // 🤖 AI EXTRACTION MODE
// // ============================================================================
// async function analyzeWithAI(resumeText, jobId) {
//   const systemPrompt = `You are an ATS analyzer. Return VALID JSON only.`;
//   try {
//     const result = await generateJSON(systemPrompt, `Resume text:\n${resumeText.substring(0, 4000)}`);
//     if (!result.data || !result.data.skillsBySection) {
//       return { success: false, reason: "INVALID_AI_RESPONSE" };
//     }
//     return { success: true, data: result.data, provider: result.provider };
//   } catch (error) {
//     return { success: false, reason: "AI_ERROR", error: error.message };
//   }
// }

async function analyzeWithAI(resumeText, jobId, jobTitle) {
const systemPrompt = `
    You are an expert ATS Auditor. Analyze the resume for the role of: "${jobTitle}".
    
    INSTRUCTIONS:
    1. Extract every technical skill mentioned.
    2. For each skill, determine its technical category (e.g., "Frontend", "Backend", "Database", "DevOps", "Tools").
    
    OUTPUT VALID JSON ONLY:
    {
      "skillsBySection": {
        "experience": [{"name": "skill", "category": "type"}],
        "skillsList": [{"name": "skill", "category": "type"}],
        "generalSkills": [{"name": "skill", "category": "type"}]
      },
      "totalMonths": 0,
      "summary": "2-sentence professional assessment."
    }
  `;
  try {
    const result = await generateJSON(systemPrompt, `Resume text:\n${resumeText.substring(0, 8000)}`);
    
    if (!result.data || !result.data.skillsBySection) {
      return { success: false, reason: "INVALID_AI_RESPONSE" };
    }
    // Return original data + the AI's summary [cite: 90, 93]
    return { success: true, data: result.data, provider: result.provider };
  } catch (error) {
    return { success: false, reason: "AI_ERROR", error: error.message };
  }
}

// ============================================================================
// 🎯 RESTORED LEGACY CONFIDENCE SCORING
// ============================================================================
function calculateConfidence(analysis, extractionMethod) {
  let confidence = 0.5; // Base confidence [cite: 95]

  // Add confidence based on matched skills [cite: 96]
  if (analysis.matchedSkills.length >= 3) confidence += 0.15;
  else if (analysis.matchedSkills.length >= 1) confidence += 0.1;

  // Add confidence based on professional experience [cite: 97]
  if (analysis.professionalMonths >= 12) confidence += 0.15;
  else if (analysis.professionalMonths > 0) confidence += 0.08;

  // Add confidence based on linked profiles [cite: 98]
  if (analysis.linkedProfiles >= 2) confidence += 0.1;
  else if (analysis.linkedProfiles >= 1) confidence += 0.05;

  // ⚖️ FAIRNESS FIX: Use 0.08 boost for both methods to keep scoring balanced
  // This replaces the old +0.1 for AI and +0.05 for Local
  confidence += 0.08; 

  return Math.min(1, confidence); 
}

// ============================================================================
// 🚨 RESTORED LEGACY EDGE CASE HANDLERS
// ============================================================================
function handleEdgeCases(resumeText, extractionResult, jobId) {
  const warnings = [];
  const errors = [];

  if (resumeText.length < MIN_RESUME_LENGTH) {
    errors.push("Resume content too short (possibly corrupted or invalid PDF)");
    return { valid: false, warnings, errors };
  }

  // Edge Case 2: No skills detected
  if (extractionResult.data.skillsBySection.experience.length === 0 &&
      extractionResult.data.skillsBySection.skillsList.length === 0 &&
      extractionResult.data.skillsBySection.generalSkills.length === 0) {
    warnings.push("No technical skills detected in resume (possible edge case)");
  }

  // Edge Case 3: No experience duration
  if (extractionResult.data.totalMonths === 0 || extractionResult.data.totalMonths === undefined) {
    warnings.push("No professional experience duration found (may be fresher or parsing issue)");
  }

  // Edge Case 4: Unrealistic score check
  if (extractionResult.score && extractionResult.score < 10 && extractionResult.data.skillsBySection.experience.length > 5) {
    warnings.push("Low match score despite multiple skills detected (possible skill name mismatch)");
  }

  return { valid: true, warnings, errors };
}
// ============================================================================
// 🔄 MAIN ANALYSIS ORCHESTRATOR (FIXED)
// ============================================================================
async function performAnalysis(resumeUrl, jobId, mode = "auto") {
  try {
    const resumeData = await parseResumeFromUrl(resumeUrl);
    if (!resumeData || !resumeData.fullText) throw new Error("INVALID_RESUME");

    const job = await Job.findById(jobId);
    if (!job) throw new Error("JOB_NOT_FOUND");

    let extractionResult;

if (mode === "beta") {
      extractionResult = await analyzeWithAI(resumeData.fullText, jobId, job.title);
    } else if (mode === "standard") {
      // ✅ PASS THE OBJECT, NOT THE TEXT
      extractionResult = analyzeLocal(resumeData); 
    } else {
      extractionResult = await analyzeWithAI(resumeData.fullText, jobId, job.title);
      // ✅ PASS THE OBJECT HERE TOO
      if (!extractionResult.success) extractionResult = analyzeLocal(resumeData);
    }

    // 🚨 NEW: INTEGRATE EDGE CASE HANDLER
    const validation = handleEdgeCases(resumeData.fullText, extractionResult, jobId);
    if (!validation.valid) {
      throw new Error(validation.errors[0] || "Resume validation failed");
    }

    // Determine score using the deterministic engine
    const scoreData = calculateDeterministicScore(
      extractionResult.data.skillsBySection,
      resumeData, 
      job.requirements
    );

    const confidence = calculateConfidence(scoreData, extractionResult.provider === "Local/Keyword" ? "local" : "ai");

    return {
      success: true,
      analysis: {
        ...scoreData,
        summary: extractionResult.data.summary,
        // ✅ Add warnings to metadata so the UI can show them
        warnings: validation.warnings, 
        metadata: {
          provider: extractionResult.provider,
          confidence: confidence,
          timestamp: new Date()
        }
      }
    };
  } catch (error) {
    console.error("❌ ANALYSIS FAILED:", error.message);
    return { success: false, error: error.message };
  }
}


function analyzeLocal(resumeData) {
  // 🧹 CLEANING: Replace "Function 32" corrupt spaces with real spaces
  const cleanExpZone = (resumeData.experienceZone || "").replace(/\s+/g, ' ').trim();
  
  const expSkills = extractSkillsFromText(cleanExpZone);
  const genSkills = extractSkillsFromText(resumeData.generalZone);
  
  // 🕒 Date Scanner Fix
  const dateRegex = /(?:19|20)\d{2}/g;
  const yearsFound = cleanExpZone.match(dateRegex) || [];
  
  let estimatedMonths = 0;
  if (yearsFound.length >= 2) {
    const years = yearsFound.map(Number);
    const duration = Math.max(...years) - Math.min(...years);
    estimatedMonths = Math.max(12, duration * 12); 
  }

  return {
    success: true,
    data: {
      skillsBySection: { experience: expSkills, skillsList: [], generalSkills: genSkills },
      totalMonths: estimatedMonths,
      summary: "Standard Zonal Analysis complete." 
    },
    provider: "Local/Keyword"
  };
}

// ============================================================================
// 🌐 MAIN ROUTE: /analyze

// ============================================================================
router.post("/analyze", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, jobId, applicationId, mode = "auto" } = req.body;
    const result = await performAnalysis(resumeUrl, jobId, mode);

    if (!result.success) return res.status(400).json(result);

    const application = await Application.findById(applicationId);
    
    if (application) {
      const Skill = require("../models/Skill"); 
      const { refreshSkillCache } = require("../utils/skillMap");
      
      // 🧠 AUTONOMOUS BRAIN SYNC
      const sections = result.analysis.skillsBySection || {};
      const allDiscovered = [
        ...(sections.experience || []),
        ...(sections.skillsList || []),
        ...(sections.generalSkills || [])
      ];

      if (allDiscovered.length > 0) {
        for (const skillItem of allDiscovered) {
          // AI fetches category (type) and name as objects
          const name = (typeof skillItem === 'string' ? skillItem : skillItem.name).toLowerCase().trim();
          const category = skillItem.category || "technical"; // Hidden background category

          await Skill.findOneAndUpdate(
            { canonical: name }, 
            { 
              $set: {
                canonical: name, 
                isApproved: true, // ⚡ AUTO-APPROVE
                category: category, 
                weight: 1.0       // ⚡ FLAT WEIGHT: No variation
              }
            }, 
            { upsert: true }
          );
        }
        // 🔄 Sync Brain Immediately
        await refreshSkillCache(); 
      }

      application.aiAnalysis = [result.analysis, ...(application.aiAnalysis || [])];
      await application.save();
    }

    // 🛡️ CRITICAL: Send the response back to the frontend
    res.json({ success: true, analysis: result.analysis });

  } catch (error) {
    console.error("❌ Analysis Route Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}); 
    
//     if (application) {
//       const Skill = require("../models/Skill"); 
//       const { refreshSkillCache } = require("../utils/skillMap");
      
//       // 🧠 AUTONOMOUS BRAIN SYNC
//       // AI directly injects and APPROVES the skill into the global map
//       const matchedSkills = result.analysis.matchedSkills || [];

//       if (matchedSkills.length > 0) {
//         for (const skillName of matchedSkills) {
//           const canonicalName = skillName.toLowerCase().trim();
          
//           await Skill.findOneAndUpdate(
//             { canonical: canonicalName }, 
//             { 
//               $set: {
//                 canonical: canonicalName, 
//                 isApproved: true,       // ⚡ AUTO-APPROVE: No human intervention
//                 category: "technical",  // Auto-categorized as technical
//                 weight: 1.1             // Standard AI discovery weight
//               }
//             }, 
//             { upsert: true }
//           );
//         }
//         // 🔄 Immediate Sync: Force the local keyword scanner to learn these now
//         await refreshSkillCache(); 
//       }

//       application.aiAnalysis = [result.analysis, ...(application.aiAnalysis || [])];
//       await application.save();
//     }

//     res.json({ success: true, analysis: result.analysis });
//   } catch (error) {
//     console.error("Analysis Route Error:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// }); // 🛡️ This closing brace is likely what was missing!

// Inside backend/routes/aiRoutes.js -> router.post("/analyze")
// Inside router.post("/analyze", ...)

// ============================================================================
// 🧪 TEST ROUTE: POST /api/ai/test-analysis
// For debugging - returns detailed logs
// ============================================================================

router.post("/test-analysis", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, jobId, mode = "auto" } = req.body;

    if (!resumeUrl || !jobId) {
      return res.status(400).json({ error: "Missing resumeUrl or jobId" });
    }

    const result = await performAnalysis(resumeUrl, jobId, mode);

    res.json({
      ...result,
      debugInfo: {
        timestamp: new Date(),
        mode: mode,
        note: "Test endpoint - use /analyze in production"
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 🚀 ROUTE 3: GENERATE QUESTIONS (JSON Mode)
// ============================================================================
router.post("/generate-questions", verifyToken, async (req, res) => {
  try {
    const { jobTitle, mode } = req.body;
    if (!jobTitle) return res.status(400).json({ message: "Input required." });

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "solver") {
        // 🧠 SOLVER MODE
        systemPrompt = `
          You are a Senior Technical Mentor.
          
          INPUT ANALYSIS:
          1. If input is a JOB TITLE (e.g. "React Dev"), create a coding challenge.
          2. If input is a PROBLEM (e.g. "Solve 10+10"), solve it.

          OUTPUT JSON OBJECT ONLY:
          {
            "title": "Title",
            "challenge": "Problem description",
            "approach": ["Step 1", "Step 2"],
            "codeSolution": "Code string",
            "whyItMatters": "Reason"
          }
        `;
        userPrompt = `Solve/Create for: "${jobTitle}"`;
    } else {
        // 🎤 INTERVIEW MODE
        systemPrompt = `
          You are an Interview Architect.
          Generate 5 interview questions for: "${jobTitle}".
          OUTPUT JSON ARRAY:
          [{ "type": "Technical", "question": "...", "intent": "...", "answer": "..." }]
        `;
        userPrompt = `Questions for: "${jobTitle}"`;
    }

    const result = await generateJSON(systemPrompt, userPrompt);
    let data = result.data;

    // 🔥 FIX: WHITE PAGE BUG
    // If Solver returns an Array, force it to be an Object
    if (mode === "solver" && Array.isArray(data)) {
        data = data[0]; 
    }

    res.status(200).json({ 
        data: data, 
        meta: { provider: result.provider, mode } 
    });

  } catch (err) {
    console.error("Route Error:", err.message);
    res.status(500).json({ message: "Generation failed." });
  }
});

// ============================================================================
// 🚀 ROUTE 4: STREAMING (Chat / Solver Mode)
// ============================================================================
router.post("/generate-questions-stream", verifyToken, async (req, res) => {
    try {
        const { jobTitle, mode } = req.body;
        if (!jobTitle) return res.status(400).json({ message: "Input required." });

        // 1. Set headers for streaming
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no"); 

    let prompt = "";

    if (mode === "solver") {
        // 🧠 SOLVER MODE
        // 🔥 FIX: Strict formatting to prevent "Wall of Text"
        prompt = `
          Act as a Senior Engineer.
          USER INPUT: "${jobTitle}"

          INSTRUCTIONS:
          If input is a Role, create a problem. If it's a specific question, solve it.

          FORMATTING RULES:
          1. Use # Headers.
          2. Use \`\`\` code blocks.
          3. IMPORTANT: Leave a BLANK LINE between every paragraph.
        `;
    } else {
        // 🎤 INTERVIEW MODE
        // 🔥 FIX: Forced double newlines
        prompt = `
          Act as a Technical Recruiter.
          Generate 5 questions for: "${jobTitle}".
          
          FORMATTING RULES:
          1. Numbered List (1., 2., 3...).
          2. **Bold** key terms.
          3. CRITICAL: Put TWO NEWLINES (\n\n) between every question.
        `;
    }

    await generateStream(prompt, res);

  } catch (err) {
    console.error("Stream Error:", err);
    if (!res.headersSent) res.status(500).json({ message: "Stream failed" });
    else res.end();
  }
});


// ============================================================================
// 📌 ROUTE 3: SELF EVALUATION (ATS & Gap Analysis Mode)
// ============================================================================
router.post("/evaluate-myself", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, targetRole, jobDescription } = req.body;
    if (!resumeUrl) return res.status(400).json({ message: "Resume URL required" });

    // 1. Get Resume Data and extract text
    const resumeData = await parseResumeFromUrl(resumeUrl);
    if (!resumeData || !resumeData.fullText) {
        throw new Error("Could not extract text from resume.");
    }
    const resumeText = resumeData.fullText;
 const systemPrompt = `
  You are an expert Technical Recruiter and Career Auditor specializing in high-growth tech firms. Your goal is to provide a "brutally honest" but constructive Gap Analysis for a candidate's resume.

  CONTEXT:
  - Target Role: "${targetRole || "Software Engineer"}"
  ${jobDescription ? `- Context from Job Description: "${jobDescription.substring(0, 500)}"` : ""}

  EVALUATION GUIDELINES:
  1. IMPACT (1-10): Search for quantitative results. Penalize generic task descriptions (e.g., "Responsible for writing code"). Reward specific metrics (e.g., "Reduced latency by 40% using Redis").
  2. RELEVANCE (1-10): Analyze the stack. If the target is ${targetRole}, does the resume prioritize the right languages and frameworks? 
  3. STRUCTURE (1-10): Check for ATS readability. Evaluate information density—too much fluff lowers this score.

  CRITICAL ANALYSIS RULES:
  - "matchedSkills": Only include hard skills actually present in the text.
  - "missingRequiredSkills": This is the most important part. Identify "Dealbreaker" technologies or concepts common for a ${targetRole} that this candidate has ignored. 
  - "executiveSummary": Write this like a recruiter's internal note to a hiring manager. Be direct. If the resume is weak, say why.

  STRICT OUTPUT FORMAT:
  - Return ONLY a valid JSON object.
  - No markdown formatting like \`\`\`json.
  - No "thinking" text or introductory remarks.

  JSON SCHEMA:
  {
    "ratings": { "impact": 1-10, "relevance": 1-10, "structure": 1-10 },
    "matchedSkills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
    "missingRequiredSkills": ["CriticalMissing1", "CriticalMissing2", "CriticalMissing3"],
    "executiveSummary": "Concise, 2-3 sentence assessment of professional standing."
  }
`;

// 3. Prepare User Prompt - Use a substring to stay within token limits
    const userPrompt = `Analyze this resume for the role of ${targetRole}:\n"${resumeText.substring(0, 12000)}"`;

    // 4. Call AI Service - Remove the "smart" parameter
    const result = await generateJSON(systemPrompt, userPrompt);
    
    if (!result || !result.data) {
        throw new Error("AI failed to return data");
    }
    
    const aiData = result.data;

    // 5. Scoring Logic
    const r = aiData.ratings || { impact: 5, relevance: 5, structure: 5 };
    const calculatedScore = Math.round((r.relevance * 4) + (r.impact * 4) + (r.structure * 2));

    const finalResponse = {
        matchScore: Math.min(100, Math.max(0, calculatedScore)),
        ratings: r,
        matchedSkills: Array.isArray(aiData.matchedSkills) ? aiData.matchedSkills : [], 
        missingRequiredSkills: Array.isArray(aiData.missingRequiredSkills) ? aiData.missingRequiredSkills : [],
        summary: aiData.executiveSummary || "Analysis complete.",
        provider: result.provider
    };

    res.status(200).json({ success: true, analysis: finalResponse });

  } catch (err) {
    console.error("❌ Self Check Error:", err.message);
    res.status(500).json({ success: false, message: err.message || "Self-evaluation failed." });
  }
});
module.exports = router;