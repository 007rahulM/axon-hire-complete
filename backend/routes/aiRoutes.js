
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const parseResumeFromUrl = require("../utils/resumeParser");
const { normalizeSkill, getSkillWeight, refreshSkillCache } = require("../utils/skillMap");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Skill = require("../models/Skill"); // Needed for the Learning Loop
const { generateJSON, generateStream } = require("../utils/aiServices");

// Replace internal math with your new utility files
const { calculateV3Score } = require("../utils/matchingEngine");
const { calculateExperienceMonths } = require("../utils/durationMath");
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
// 🧮 DETERMINISTIC SCORING ENGINE (Pure JS Math)
// ============================================================================
function calculateDeterministicScore(extractedData, jobRequirements) {
  const scoreBreakdown = { skillScore: 0, expScore: 0, linkScore: 0, integrity: 10 };

  const normalizedReqs = jobRequirements.map(req => normalizeSkill(req)).filter(Boolean);
  const foundSkills = [
    ...extractedData.skillsBySection.experience,
    ...extractedData.skillsBySection.skillsList,
    ...extractedData.skillsBySection.generalSkills
  ].map(s => normalizeSkill(s));

  // 1. Skill Match (60 Points)
  let matchedCount = 0;
  const matchedList = [];
  normalizedReqs.forEach(req => {
    if (foundSkills.includes(req)) {
      matchedCount++;
      matchedList.push(req);
    }
  });

  const skillRatio = normalizedReqs.length > 0 ? (matchedCount / normalizedReqs.length) : 0;
  scoreBreakdown.skillScore = Math.round(skillRatio * 60);

  // 2. Experience Match (30 Points)
  const months = extractedData.totalMonths || 0;
  if (months >= 60) scoreBreakdown.expScore = 30;
  else if (months >= 36) scoreBreakdown.expScore = 22;
  else if (months >= 12) scoreBreakdown.expScore = 15;
  else if (months > 0) scoreBreakdown.expScore = 5;

  const finalScore = Math.min(100, scoreBreakdown.skillScore + scoreBreakdown.expScore + scoreBreakdown.linkScore + scoreBreakdown.integrity);

  return {
    matchScore: finalScore,
    matchedSkills: [...new Set(matchedList)],
    missingRequiredSkills: jobRequirements.filter(r => !matchedList.includes(normalizeSkill(r))),
    professionalMonths: months,
    breakdown: scoreBreakdown
  };
}


// async function analyzeWithAI(resumeText, jobId, jobTitle) {
// const systemPrompt = `
//     You are an expert ATS Auditor. Analyze the resume for the role of: "${jobTitle}".
    
//     INSTRUCTIONS:
//     1. Extract every technical skill mentioned.
//     2. For each skill, determine its technical category (e.g., "Frontend", "Backend", "Database", "DevOps", "Tools").
    
//     OUTPUT VALID JSON ONLY:
//     {
//       "skillsBySection": {
//         "experience": [{"name": "skill", "category": "type"}],
//         "skillsList": [{"name": "skill", "category": "type"}],
//         "generalSkills": [{"name": "skill", "category": "type"}]
//       },
//       "totalMonths": 0,
//       "summary": "2-sentence professional assessment."
//     }
//   `;
//   try {
//     const result = await generateJSON(systemPrompt, `Resume text:\n${resumeText.substring(0, 8000)}`);
    
//     if (!result.data || !result.data.skillsBySection) {
//       return { success: false, reason: "INVALID_AI_RESPONSE" };
//     }
//     // Return original data + the AI's summary [cite: 90, 93]
//     return { success: true, data: result.data, provider: result.provider };
//   } catch (error) {
//     return { success: false, reason: "AI_ERROR", error: error.message };
//   }
// }

// // ============================================================================
// // 🎯 RESTORED LEGACY CONFIDENCE SCORING
// // ============================================================================
// function calculateConfidence(analysis, extractionMethod) {
//   let confidence = 0.5; // Base confidence [cite: 95]

//   // Add confidence based on matched skills [cite: 96]
//   if (analysis.matchedSkills.length >= 3) confidence += 0.15;
//   else if (analysis.matchedSkills.length >= 1) confidence += 0.1;

//   // Add confidence based on professional experience [cite: 97]
//   if (analysis.professionalMonths >= 12) confidence += 0.15;
//   else if (analysis.professionalMonths > 0) confidence += 0.08;

//   // Add confidence based on linked profiles [cite: 98]
//   if (analysis.linkedProfiles >= 2) confidence += 0.1;
//   else if (analysis.linkedProfiles >= 1) confidence += 0.05;

//   // ⚖️ FAIRNESS FIX: Use 0.08 boost for both methods to keep scoring balanced
//   // This replaces the old +0.1 for AI and +0.05 for Local
//   confidence += 0.08; 

//   return Math.min(1, confidence); 
// }

// // ============================================================================
// // 🚨 RESTORED LEGACY EDGE CASE HANDLERS
// // ============================================================================
// function handleEdgeCases(resumeText, extractionResult, jobId) {
//   const warnings = [];
//   const errors = [];

//   if (resumeText.length < MIN_RESUME_LENGTH) {
//     errors.push("Resume content too short (possibly corrupted or invalid PDF)");
//     return { valid: false, warnings, errors };
//   }

//   // Edge Case 2: No skills detected
//   if (extractionResult.data.skillsBySection.experience.length === 0 &&
//       extractionResult.data.skillsBySection.skillsList.length === 0 &&
//       extractionResult.data.skillsBySection.generalSkills.length === 0) {
//     warnings.push("No technical skills detected in resume (possible edge case)");
//   }

//   // Edge Case 3: No experience duration
//   if (extractionResult.data.totalMonths === 0 || extractionResult.data.totalMonths === undefined) {
//     warnings.push("No professional experience duration found (may be fresher or parsing issue)");
//   }

//   // Edge Case 4: Unrealistic score check
//   if (extractionResult.score && extractionResult.score < 10 && extractionResult.data.skillsBySection.experience.length > 5) {
//     warnings.push("Low match score despite multiple skills detected (possible skill name mismatch)");
//   }

//   return { valid: true, warnings, errors };
// }



// ////////////////////////////////////////////////////////////////////////////////////////
// //=================================================================================
// //🔄 MAIN ANALYSIS ORCHESTRATOR (V3 TEACHER-STUDENT)//
// // ============================================================================
// async function performAnalysis(resumeUrl, jobId, mode = "auto") {
//   try {
//     console.log(`\n--- ANALYSIS START | MODE: ${mode.toUpperCase()} ---`);
    
//     const resumeData = await parseResumeFromUrl(resumeUrl);
//     const job = await Job.findById(jobId);
//     if (!job) throw new Error("JOB_NOT_FOUND");

//     console.log(`Resume Parsed: ${resumeData.fullText.length} chars.`);

//     let extractedFacts = null;
//     let providerName = "Local-V3";

//     // 1. AI EXTRACTION PHASE (Try Carousel for Beta/Auto)
//     if (mode === "beta" || mode === "auto") {
//    // Inside performAnalysis in aiRoutes.js
// // const systemPrompt = `
// //   ACT AS: A Strict ATS Fact Extractor.
// //   TASK: Extract ONLY raw data points from the resume text.
  
// //   STRICT RULES:
// //   1. "skills": Extract every technical tool/language.
// //   2. "totalMonths": Extract ONLY professional WORK/INTERNSHIP experience months. 
// //      - CRITICAL: DO NOT count Education dates (e.g., BCA, PUC, SSLC) as work experience.
// //   3. "links": Extract ONLY links to GitHub, Vercel, Netlify, or Portfolios. 
// //      - CRITICAL: DO NOT include emails or university homepages.
// //   4. "learningDiscovery": Identify all technical terms and 3 synonyms each and in this formt {
// //     "canonical": "linkedin-marketing",
// //     "synonyms": ["LinkedIn ads", "LinkedIn campaigns"],
// //     "category": "Marketing & Sales"
// //   }
  
// //   RETURN VALID JSON ONLY: { "skills": [], "totalMonths": 0, "links": [], "summary": "", "learningDiscovery": [] }
// // `;

// const systemPrompt = `
// ACT AS: Resume Skills Extractor for ATS System.

// TASK: Extract skills from resume and discover new technical terms.

// INPUT: Resume text for role "${job.title}"

// OUTPUT RULES:
// 1. "skills": Array of ALL technical skills/tools found (e.g., ["React", "Python", "Docker"])
// 2. "totalMonths": ONLY professional work experience months (IGNORE education dates)
// 3. "links": ONLY GitHub, portfolio, or project links (NO emails, NO universities)
// 4. "summary": One sentence about candidate fit
// 5. "learningDiscovery": NEW/RARE technical terms found that might be:
//    - Synonyms of known skills (e.g., "Express.js" for "Node.js")
//    - New frameworks/tools (e.g., "Zustand", "Bun", "Hono")
//    - Specialized skills (e.g., "WebGL", "Three.js")

// FORMAT FOR learningDiscovery:
// [
//   {
//     "canonical": "zustand",
//     "synonyms": ["Zustand", "zustand state management"],
//     "category": "Frontend"
//   },
//   {
//     "canonical": "express-js",
//     "synonyms": ["Express.js", "Express", "ExpressJS"],
//     "category": "Backend"
//   }
// ]

// RETURN VALID JSON ONLY (no markdown, no code fences):
// {
//   "skills": [],
//   "totalMonths": 0,
//   "links": [],
//   "summary": "",
//   "learningDiscovery": []
// }
// `;

//       console.log(`AI Chain: Attempting extraction...`);
//       const aiResult = await generateJSON(systemPrompt, `RESUME TEXT:\n${resumeData.fullText.substring(0, 10000)}`);
      
//       if (aiResult.success) {
//         extractedFacts = aiResult.data;
//         providerName = aiResult.provider;
//         // 🚀 NEW DEBUG LINES: See the raw AI output in console
//     console.log(`📝 AI SUMMARY: ${extractedFacts.summary}`);
//     console.log(`🛠️ AI DISCOVERY: Found ${extractedFacts.learningDiscovery?.length || 0} terms.`);
//         console.log(`AI Success via ${providerName}`);
//       } else if (mode === "beta") {
//         // STRICT BETA: Return error instead of falling back to 10% score
//         console.error("BETA ERROR: AI Carousel exhausted.");
//         return { 
//           success: false, 
//           error: "STRICT_BETA_FAILED", 
//           detail: "Beta Mode requires high-fidelity AI which is currently unavailable." 
//         };
//       }
//     }

//     // 2. FALLBACK PHASE (Auto Fallback or Standard Mode)
//     if (!extractedFacts) {
//       console.log(`Fallback: Using Local ZMath & Keyword Mapping.`);
//       extractedFacts = {
//         skills: resumeData.skills,
//         totalMonths: calculateExperienceMonths(resumeData.experienceZone),
//         summary: mode === "standard" ? "Standard zonal analysis complete." : "Local fallback used (AI Rate Limited)."
//       };
//     }

//     // 3. SCORING PHASE (Deterministic 60/30/10)
//     const finalAnalysis = calculateV3Score({ 
//       skills: extractedFacts.skills || [], 
//       totalMonths: Number(extractedFacts.totalMonths) || 0,
//       links: resumeData.links || [] 
//     }, job.requirements || []);

//     // 4. CONSOLE DEBUGGING
//     console.log(`\n--- [V3 SCORECARD: ${job.title}] ---`);
//     console.table({
//       "Result Method": providerName.includes("Local") ? "LOCAL" : "AI",
//       "Provider": providerName,
//       "Match Score": `${finalAnalysis.score}%`
//     });
//     console.log(`MATCHED: ${finalAnalysis.matchedSkills.join(", ")}`);
//     console.log(`------------------------------------\n`);

//  return {
//       success: true,
//       analysis: {
//         ...finalAnalysis,
//         // 🚀 FORCE SYNC: Ensure both keys exist so UI always finds the number
//         matchScore: finalAnalysis.score, 
//         score: finalAnalysis.score,
//         summary: extractedFacts.summary,
//         metadata: { 
//           provider: providerName, 
//           status: "SUCCESS", 
//           timestamp: new Date(),
//           method: providerName.includes("Local") ? "local" : "ai" 
//         }
//       }
//     };
//   } catch (error) {
//     console.error(`ORCHESTRATOR ERROR: ${error.message}`);
//     return { success: false, error: error.message };
//   }
// }
//============================================================================
//============================================================================

//🔄 MAIN ANALYSIS ORCHESTRATOR (V3 TEACHER-STUDENT)//
// ============================================================================
async function performAnalysis(resumeUrl, jobId, mode = "auto") {
  try {
    console.log(`\n--- ANALYSIS START | MODE: ${mode.toUpperCase()} ---`);
    
    const resumeData = await parseResumeFromUrl(resumeUrl);
    const job = await Job.findById(jobId);
    if (!job) throw new Error("JOB_NOT_FOUND");

    console.log(`Resume Parsed: ${resumeData.fullText.length} chars.`);

    let extractedFacts = null;
    let providerName = "Local-V3";

    // 1. AI EXTRACTION PHASE (Try Carousel for Beta/Auto)
    if (mode === "beta" || mode === "auto") {
      
      // ✅ FIXED PROMPT (No more typos or invalid JSON)
      const systemPrompt = `
ACT AS: Resume Skills Extractor for ATS System.

TASK: Extract skills from resume and discover new technical terms.

INPUT: Resume text for role "${job.title}"

OUTPUT RULES:
1. "skills": Array of ALL technical skills/tools found (e.g., ["React", "Python", "Docker"])
2. "totalMonths": ONLY professional work experience months (IGNORE education dates)
3. "links": ONLY GitHub, portfolio, or project links (NO emails, NO universities)
4. "summary": One sentence about candidate fit
5. "learningDiscovery": NEW/RARE technical terms found that might be:
   - Synonyms of known skills (e.g., "Express.js" for "Node.js")
   - New frameworks/tools (e.g., "Zustand", "Bun", "Hono")
   - Specialized skills (e.g., "WebGL", "Three.js")

FORMAT FOR learningDiscovery:
[
  {
    "canonical": "zustand",
    "synonyms": ["Zustand", "zustand state management"],
    "category": "Frontend"
  },
  {
    "canonical": "express-js",
    "synonyms": ["Express.js", "Express", "ExpressJS"],
    "category": "Backend"
  }
]

RETURN VALID JSON ONLY (no markdown, no code fences):
{
  "skills": [],
  "totalMonths": 0,
  "links": [],
  "summary": "",
  "learningDiscovery": []
}
`;

      console.log(`AI Chain: Attempting extraction...`);
      const aiResult = await generateJSON(systemPrompt, `RESUME TEXT:\n${resumeData.fullText.substring(0, 10000)}`);
      
      if (aiResult.success) {
        extractedFacts = aiResult.data;
        providerName = aiResult.provider;
        
        // 🚀 DEBUG: See what AI returned
        console.log(`📝 AI SUMMARY: ${extractedFacts.summary}`);
        console.log(`🛠️ AI DISCOVERY: Found ${extractedFacts.learningDiscovery?.length || 0} terms.`);
        console.log(`AI Success via ${providerName}`);
        
        // ============================================================
        // 🧠 LEARNING LOOP - ADD THIS SECTION HERE!
        // ============================================================
        const discovery = extractedFacts.learningDiscovery || [];
        
        if (discovery.length > 0) {
          console.log(`\n🧠 LEARNING LOOP ACTIVATED: Processing ${discovery.length} new skills...`);
          
          try {
            // Build bulk operations for MongoDB
            const bulkOps = discovery.map(item => ({
              updateOne: {
                filter: { 
                  canonical: item.canonical.toLowerCase().trim() 
                },
                update: { 
                  $set: { 
                    isApproved: true,
                    category: item.category || "technical-skills" 
                  }, 
                  $addToSet: { 
                    synonyms: { 
                      $each: (item.synonyms || []).map(s => s.toLowerCase().trim()) 
                    } 
                  },
                  $setOnInsert: { 
                    weight: 1.0,
                    createdAt: new Date()
                  }
                },
                upsert: true
              }
            }));
            
            // Save to database
            const result = await Skill.bulkWrite(bulkOps);
            console.log(`✅ Saved ${result.upsertedCount} new skills, updated ${result.modifiedCount} existing skills`);
            
            // 🚀 THROTTLED CACHE REFRESH (max once per 30 seconds)
            if (!global.lastCacheRefresh || Date.now() - global.lastCacheRefresh > 30000) {
              console.log(`🔄 Refreshing skill cache...`);
              await refreshSkillCache();
              global.lastCacheRefresh = Date.now();
              console.log(`✅ Skill map updated!`);
            } else {
              console.log(`⏭️ Skipping cache refresh (throttled)`);
            }
            
          } catch (saveError) {
            console.error(`❌ Learning loop failed:`, saveError.message);
            // Don't throw - learning failure shouldn't break analysis
          }
        } else {
          console.log(`ℹ️ No new skills discovered in this resume.`);
        }
        
        // 🗑️ REMOVE learningDiscovery from response (don't send to frontend)
        delete extractedFacts.learningDiscovery;
        // ============================================================
        
      } else if (mode === "beta") {
        // STRICT BETA: Return error instead of falling back
        console.error("BETA ERROR: AI Carousel exhausted.");
        return { 
          success: false, 
          error: "STRICT_BETA_FAILED", 
          detail: "Beta Mode requires high-fidelity AI which is currently unavailable." 
        };
      }
    }

    // 2. FALLBACK PHASE (Auto Fallback or Standard Mode)
    if (!extractedFacts) {
      console.log(`Fallback: Using Local ZMath & Keyword Mapping.`);
      extractedFacts = {
        skills: resumeData.skills,
        totalMonths: calculateExperienceMonths(resumeData.experienceZone),
        summary: mode === "standard" ? "Standard zonal analysis complete." : "Local fallback used (AI Rate Limited)."
      };
    }

    // 3. SCORING PHASE (Deterministic 60/30/10)
    const finalAnalysis = calculateV3Score({ 
      skills: extractedFacts.skills || [], 
      totalMonths: Number(extractedFacts.totalMonths) || 0,
      links: resumeData.links || [] 
    }, job.requirements || []);

    // 4. CONSOLE DEBUGGING
    console.log(`\n--- [V3 SCORECARD: ${job.title}] ---`);
    console.table({
      "Result Method": providerName.includes("Local") ? "LOCAL" : "AI",
      "Provider": providerName,
      "Match Score": `${finalAnalysis.score}%`
    });
    console.log(`MATCHED: ${finalAnalysis.matchedSkills.join(", ")}`);
    console.log(`------------------------------------\n`);

    return {
      success: true,
      analysis: {
        ...finalAnalysis,
        // 🚀 FORCE SYNC: Ensure both keys exist so UI always finds the number
        matchScore: finalAnalysis.score, 
        score: finalAnalysis.score,
        summary: extractedFacts.summary,
        metadata: { 
          provider: providerName, 
          status: "SUCCESS", 
          timestamp: new Date(),
          method: providerName.includes("Local") ? "local" : "ai" 
        }
      }
    };
  } catch (error) {
    console.error(`ORCHESTRATOR ERROR: ${error.message}`);
    return { success: false, error: error.message };
  }
}





// ============================================================================
// 🌐 MAIN ROUTE: POST /api/ai/analyze
// ============================================================================
router.post("/analyze", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, jobId, applicationId, mode = "auto" } = req.body;
    const result = await performAnalysis(resumeUrl, jobId, mode);

    if (result.success) {
      const application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ success: false, error: "App not found" });

      // // 🧠 OPTIMIZED LEARNING LOOP
      // const discovery = result.analysis.learningDiscovery || [];
      // if (discovery.length > 0) {
      //   // Run updates in background so the user doesn't wait
      //   const bulkOps = discovery.map(item => ({
      //     updateOne: {
      //       filter: { canonical: item.canonical.toLowerCase().trim() },
      //       update: { 
      //         $set: { isApproved: true }, 
      //         $addToSet: { synonyms: { $each: (item.synonyms || []).map(s => s.toLowerCase().trim()) } },
      //         $setOnInsert: { weight: 1.0 }
      //       },
      //       upsert: true
      //     }
      //   }));
        
      //   await Skill.bulkWrite(bulkOps).catch(e => console.error("Bulk save failed"));
        
      //   // 🚀 CRITICAL: Throttle the cache refresh. 
      //   // Only refresh if it's been more than 30 seconds since the last one.
      //   if (!global.lastCacheRefresh || Date.now() - global.lastCacheRefresh > 30000) {
      //       await refreshSkillCache();
      //       global.lastCacheRefresh = Date.now();
      //   }
      // }

      // delete result.analysis.learningDiscovery;
      application.aiAnalysis = [result.analysis, ...(application.aiAnalysis || [])];
      await application.save();
    }
    res.json(result);
  } catch (error) {
    console.error("❌ BACKEND CRASH PREVENTED:", error.message);
    res.status(500).json({ success: false, error: "Server overloaded or parsing failed." });
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

// ============================================================================
// 🚀 THE V3 ANALYSIS ROUTE
// ============================================================================
router.post("/analyze-v3", verifyToken, async (req, res) => {
  try {
    const { resumeUrl, jobId, applicationId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // 1. ZONAL PARSING
    const resumeData = await parseResumeFromUrl(resumeUrl);

    // 2. ENTITY EXTRACTION PROMPT
    // const systemPrompt = `
    //   ACT AS: A JSON Entity Extractor.
    //   TASK: Convert resume text into a strict data object.
      
    //   RULES:
    //   1. Extract all technical skills.
    //   2. Identify "experience" (found in job descriptions), "skillsList" (found in tools sections), and "generalSkills" (rest).
    //   3. Calculate total professional months (IGNORE education dates).
    //   4. RETURN ONLY JSON.

    //   SCHEMA:
    //   {
    //     "skillsBySection": { "experience": [], "skillsList": [], "generalSkills": [] },
    //     "totalMonths": 0,
    //     "summary": "1 sentence fit assessment."
    //   }
    // `;

    const systemPrompt = `
ACT AS: A strict resume JSON parser for an ATS system.

OBJECTIVE:
Parse resume text into a structured JSON object with ZERO assumptions.

SECTION DETECTION RULES:
First, identify resume sections using headings or semantic meaning.
Common section names include but are not limited to:
- EXPERIENCE / WORK EXPERIENCE / PROFESSIONAL EXPERIENCE
- PROJECTS
- ACHIEVEMENTS / ACCOMPLISHMENTS
- SKILLS / TECHNICAL SKILLS / TOOLS
- EDUCATION (IGNORE COMPLETELY)
- CERTIFICATIONS (IGNORE DATES)
- SUMMARY / PROFILE (IGNORE FOR DATES)

IMPORTANT:
If a section is not clearly identifiable, DO NOT infer.

DATE CALCULATION RULES:
- Calculate total professional months using ONLY date ranges found inside EXPERIENCE sections.
- IGNORE ALL dates found in:
  - EDUCATION
  - CERTIFICATIONS
  - PROJECTS
  - ACHIEVEMENTS
- If experience dates overlap, do NOT double count.
- If no valid experience dates exist, return totalMonths = 0.

LINK EXTRACTION RULES:
- Extract links ONLY if they appear inside:
  - PROJECTS
  - ACHIEVEMENTS
- Ignore links found in EDUCATION, CERTIFICATIONS, or headers/footers.
- Accept only valid URLs (GitHub, portfolio, live demo, etc).

SKILL EXTRACTION RULES:
- experience: skills explicitly used in job descriptions.
- skillsList: skills/tools listed under SKILLS or TOOLS sections.
- generalSkills: remaining technical skills found elsewhere EXCEPT education.
- Do NOT invent or normalize skills beyond what is explicitly written.

STRICT OUTPUT RULES:
- Return ONLY valid JSON.
- Do NOT include explanations or extra text.
- Do NOT hallucinate missing fields.
- If data is missing, use empty arrays or 0.

SCHEMA:
{
  "skillsBySection": {
    "experience": [],
    "skillsList": [],
    "generalSkills": []
  },
  "projectLinks": [],
  "totalMonths": 0,
  "summary": "1 sentence fit assessment based strictly on experience and skills."
}
`;

    const result = await generateJSON(systemPrompt, `RESUME TEXT:\n${resumeData.fullText}`);

    if (!result.data || !result.data.skillsBySection) {
      throw new Error("AI failed to extract structured entities.");
    }

    // 3. THE AUTONOMOUS LEARNING LOOP (Direct DB Injection)
    const allFoundSkills = [
      ...result.data.skillsBySection.experience,
      ...result.data.skillsBySection.skillsList,
      ...result.data.skillsBySection.generalSkills
    ];

    if (allFoundSkills.length > 0) {
      for (const rawName of allFoundSkills) {
        const canonical = rawName.toLowerCase().trim();
        if (canonical.length < 2) continue;

        // Directly update/create the skill to improve Local Mode for everyone
        await Skill.findOneAndUpdate(
          { canonical },
          { 
            $set: { canonical, isApproved: true },
            $addToSet: { synonyms: rawName } // Save variations as synonyms
          },
          { upsert: true }
        );
      }
      // Force refresh the memory cache so Local Mode gets smarter immediately
      await refreshSkillCache();
    }

    // 4. CALCULATE FINAL SCORE (Code Math)
    const analysis = calculateDeterministicScore(result.data, job.requirements);
    analysis.summary = result.data.summary;
    analysis.provider = result.provider;

    // 5. SAVE TO APPLICATION
    const application = await Application.findById(applicationId);
    if (application) {
      application.aiAnalysis = [analysis, ...(application.aiAnalysis || [])];
      await application.save();
    }

    res.json({ success: true, analysis });

  } catch (err) {
    console.error("V3_ENGINE_ERROR:", err.message);
    res.status(500).json({ message: "Entity extraction failed.", detail: err.message });
  }
});
module.exports = router;

