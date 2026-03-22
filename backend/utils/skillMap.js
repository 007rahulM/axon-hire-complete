// const Skill = require("../models/Skill");

// let globalSkillMap = {};

// // 🛡️ HELPER: Escapes special characters like C++ or .NET for Regex
// const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// const refreshSkillCache = async () => {
//   try {
//     const skills = await Skill.find({});
//     const newMap = {};
//     skills.forEach(s => {
//       newMap[s.canonical] = {
//         canonical: s.canonical,
//         weight: s.weight || 1.0,
//         synonyms: s.synonyms || [],
//         implicit: s.implicit || [],
//         isApproved: s.isApproved
//       };
//     });
//     globalSkillMap = newMap;
//     console.log(`🧠 Cache Refreshed: ${Object.keys(globalSkillMap).length} skills loaded.`);
//   } catch (err) { console.error("❌ Cache error:", err.message); }
// };

// /**
//  * 🎯 NORMALIZE SKILL: Fixed to handle C++, C#, and other symbols
//  */
// const normalizeSkill = (rawSkill) => {
//   if (!rawSkill || typeof rawSkill !== "string") return "";
//   const clean = rawSkill.toLowerCase().trim();
//   if (clean.length < 2) return "";

//   for (const [key, data] of Object.entries(globalSkillMap)) {
//     // ✅ FIX: Escape canonical and synonyms before putting them in RegExp
//     const safeCanonical = escapeRegex(data.canonical);
//     const isMainMatch = new RegExp(`\\b${safeCanonical}\\b`, 'i').test(clean);

//     const isSynonymMatch = data.synonyms && data.synonyms.some(syn => 
//       new RegExp(`\\b${escapeRegex(syn)}\\b`, 'i').test(clean)
//     );

//     if (isMainMatch || isSynonymMatch) return data.canonical;

//     if (data.implicit && data.implicit.some(imp => clean === imp.toLowerCase())) {
//       return data.canonical;
//     }
//   }
//   return clean; 
// };

// // Replace extractSkillsFromText in backend/utils/skillMap.js
// const extractSkillsFromText = (text) => {
//   if (!text) return [];
//   // 🚀 Normalize text: Remove extra spaces and common tech separators
//   const lowerText = text.toLowerCase().replace(/[\/\(\)]/g, ' '); 
//   const foundSkills = new Set();

//   for (const [key, data] of Object.entries(globalSkillMap)) {
//     // 🚀 NEW: Create a Tech-Flexible Regex
//     // This looks for the skill followed by a non-alphanumeric character or end of string
//     const safeCanonical = escapeRegex(data.canonical);
//     const techRegex = new RegExp(`(?:^|[^a-z0-9])${safeCanonical}(?=[^a-z0-9]|$)`, 'i');

//     let matched = techRegex.test(lowerText);
    
//     // Check Synonyms with the same tech-flexible logic
//     if (!matched && data.synonyms) {
//       matched = data.synonyms.some(syn => {
//         const safeSyn = escapeRegex(syn);
//         return new RegExp(`(?:^|[^a-z0-9])${safeSyn}(?=[^a-z0-9]|$)`, 'i').test(lowerText);
//       });
//     }

//     if (matched) foundSkills.add(data.canonical);
//   }
//   return Array.from(foundSkills);
// };

// module.exports = {
//   refreshSkillCache,
//   normalizeSkill,
//   extractSkillsFromText,
//   getSkillWeight: (s) => globalSkillMap[s]?.weight || 1.0,
//   getKnownSkillKeys: () => Object.keys(globalSkillMap)
// };


//new one //
const Skill = require("../models/Skill");

let globalSkillMap = {};

// Helper to escape regex special chars
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Refresh cache from MongoDB
const refreshSkillCache = async () => {
  try {
    const skills = await Skill.find({});
    const newMap = {};
    skills.forEach(s => {
      newMap[s.canonical] = {
        canonical: s.canonical,
        weight: s.weight || 1.0,
        synonyms: s.synonyms || [],
        isApproved: s.isApproved
      };
    });
    globalSkillMap = newMap;
    console.log(`🧠 Skill Cache Refreshed: ${Object.keys(globalSkillMap).length} skills loaded.`);
  } catch (err) {
    console.error("❌ Failed to refresh skill cache:", err.message);
  }
};

// Normalize a skill string to its canonical form
const normalizeSkill = (rawSkill) => {
  if (!rawSkill || typeof rawSkill !== "string") return "";
  const clean = rawSkill.toLowerCase().trim();
  if (clean.length < 2) return "";

  for (const [key, data] of Object.entries(globalSkillMap)) {
    const safeCanonical = escapeRegex(data.canonical);
    if (new RegExp(`\\b${safeCanonical}\\b`, 'i').test(clean)) {
      return data.canonical;
    }

    if (data.synonyms) {
      for (const syn of data.synonyms) {
        const safeSyn = escapeRegex(syn);
        if (new RegExp(`\\b${safeSyn}\\b`, 'i').test(clean)) {
          return data.canonical;
        }
      }
    }
  }
  return clean;
};

// Extract skills from a block of text
const extractSkillsFromText = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase().replace(/[\/\(\)]/g, ' ');
  const foundSkills = new Set();

  for (const [key, data] of Object.entries(globalSkillMap)) {
    const safeCanonical = escapeRegex(data.canonical);
    const techRegex = new RegExp(`(?:^|[^a-z0-9])${safeCanonical}(?=[^a-z0-9]|$)`, 'i');
    let matched = techRegex.test(lowerText);

    if (!matched && data.synonyms) {
      matched = data.synonyms.some(syn => {
        const safeSyn = escapeRegex(syn);
        return new RegExp(`(?:^|[^a-z0-9])${safeSyn}(?=[^a-z0-9]|$)`, 'i').test(lowerText);
      });
    }

    if (matched) foundSkills.add(data.canonical);
  }
  return Array.from(foundSkills);
};

// Helper to get skill weight
const getSkillWeight = (canonical) => {
  return globalSkillMap[canonical]?.weight || 1.0;
};

// Helper to list all known skill keys (for debugging)
const getKnownSkillKeys = () => Object.keys(globalSkillMap);

module.exports = {
  refreshSkillCache,
  normalizeSkill,
  extractSkillsFromText,
  getSkillWeight,
  getKnownSkillKeys
};