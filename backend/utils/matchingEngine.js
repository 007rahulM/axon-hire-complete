// const { getSkillWeight } = require("./skillMap");

// /**
//  *
//  * Stops "Node.js" vs "Nodejs" mismatch and filters junk links.
//  */
// const calculateV3Score = (candidateData, jobRequirements, targetMonths = 24) => {
//   let skillPoints = 0;
//   let expPoints = 0;
//   let integrityPoints = 0;

//   const matchedSkills = [];
//   const missingSkills = [];

//   // 🚀 FIX 1: Punctuation-Proof Normalization
//   // This turns "Node.js" and "Nodejs" both into "nodejs" for matching.
//   const normalize = (str) => str.replace(/[^a-z0-9+#]/g, "");
//   const foundSkillsNormalized = (candidateData.skills || []).map(s => normalize(s));

//   // 1. SKILLS CALCULATION (60 Points Max)
//   if (jobRequirements && jobRequirements.length > 0) {
//     let totalWeight = 0;
//     let earnedWeight = 0;

//     jobRequirements.forEach(req => {
//       const weight = getSkillWeight(req.toLowerCase());
//       totalWeight += weight;

//       if (foundSkillsNormalized.includes(normalize(req))) {
//         earnedWeight += weight;
//         matchedSkills.push(req);
//       } else {
//         missingSkills.push(req);
//       }
//     });
//     skillPoints = totalWeight > 0 ? (earnedWeight / totalWeight) * 60 : 0;
//   }

//   // 2. EXPERIENCE CALCULATION (30 Points Max)
//   // Ensures Education dates don't inflate the score
//   const months = Number(candidateData.totalMonths) || 0;
//   expPoints = months >= targetMonths ? 30 : (months / targetMonths) * 30;


//   // Only counts GitHub, Vercel, Netlify, Render, or Portfolio links.
//   const portfolioKeywords = ['github', 'vercel', 'netlify', 'portfolio', 'render', 'io', 'onrender'];
//   const validLinks = (candidateData.links || []).filter(link => 
//     portfolioKeywords.some(kw => link.toLowerCase().includes(kw)) && !link.includes('@')
//   );

//   if (validLinks.length >= 3) {
//     integrityPoints = 10;
//   } else if (validLinks.length >= 1) {
//     integrityPoints = 5;
//   }

//   const finalScore = Math.round(skillPoints + expPoints + integrityPoints);

//   return {
//     score: Math.min(100, finalScore),
//     matchedSkills,
//     missingRequiredSkills: missingSkills,
//     professionalMonths: months,
//     uniqueLinksFound: validLinks.length, 
//     breakdown: {
//       skillScore: Math.round(skillPoints),
//       expScore: Math.round(expPoints),
//       integrityScore: integrityPoints
//     }
//   };
// };

// module.exports = { calculateV3Score };






//========================================
const { getSkillWeight, normalizeSkill } = require("./skillMap");

const calculateV3Score = (candidateData, jobRequirements, targetMonths = 24) => {
  let skillPoints = 0;
  let expPoints = 0;
  let integrityPoints = 0;

  const matchedSkills = [];
  const missingSkills = [];

  // Normalize job requirements using the same function
  const normalizedReqs = (jobRequirements || []).map(req => normalizeSkill(req)).filter(Boolean);

  // Candidate skills are already canonical? Use normalizeSkill to be safe
  const foundSkillsNormalized = (candidateData.skills || []).map(s => normalizeSkill(s));

  // 1. SKILLS (60 points max)
  if (normalizedReqs.length > 0) {
    let totalWeight = 0;
    let earnedWeight = 0;

    normalizedReqs.forEach(req => {
      const weight = getSkillWeight(req);
      totalWeight += weight;

      if (foundSkillsNormalized.includes(req)) {
        earnedWeight += weight;
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });
    skillPoints = totalWeight > 0 ? (earnedWeight / totalWeight) * 60 : 0;
  }

  // 2. EXPERIENCE (30 points max)
  const months = Number(candidateData.totalMonths) || 0;
  expPoints = months >= targetMonths ? 30 : (months / targetMonths) * 30;

  // 3. LINKS (10 points max)
  const portfolioKeywords = ['github', 'vercel', 'netlify', 'portfolio', 'render', 'io', 'onrender'];
  const validLinks = (candidateData.links || []).filter(link =>
    portfolioKeywords.some(kw => link.toLowerCase().includes(kw)) && !link.includes('@')
  );
  integrityPoints = validLinks.length >= 3 ? 10 : validLinks.length >= 1 ? 5 : 0;

  const finalScore = Math.round(skillPoints + expPoints + integrityPoints);

  return {
    score: Math.min(100, finalScore),
    matchedSkills,
    missingRequiredSkills: missingSkills,
    professionalMonths: months,
    uniqueLinksFound: validLinks.length,
    breakdown: {
      skillScore: Math.round(skillPoints),
      expScore: Math.round(expPoints),
      integrityScore: integrityPoints
    }
  };
};

module.exports = { calculateV3Score };