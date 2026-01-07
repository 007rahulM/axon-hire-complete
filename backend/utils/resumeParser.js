


// const axios = require("axios");
// const pdfLib = require("pdf-parse");

// /**
//  * HELPER: Identifies key zones in the resume text.
//  * This mimics "Big Bull" zonal parsing by finding where the work history starts.
//  */
// const segmentResumeZones = (text) => {
//   // Regex for common Experience headers
//   const experienceHeaderRegex = /(?:PROFESSIONAL\s+)?(?:EXPERIENCE|EMPLOYMENT|WORK\s+HISTORY|CAREER\s+SUMMARY)/i;
  
//   // Regex for the next section (to know where Experience ends)
//   const boundaryHeaderRegex = /(?:EDUCATION|SKILLS|CERTIFICATIONS|PROJECTS|LANGUAGES)/i;

//   const expMatch = text.match(experienceHeaderRegex);
  
//   if (!expMatch) {
//     return { experienceZone: "", generalZone: text };
//   }

//   const startIdx = expMatch.index;
//   const textAfterHeader = text.slice(startIdx + expMatch[0].length);
  
//   // Look for the next section to mark the end of the Experience Zone
//   const endMatch = textAfterHeader.match(boundaryHeaderRegex);
//   const endIdx = endMatch ? endMatch.index : textAfterHeader.length;

//   return {
//     experienceZone: textAfterHeader.slice(0, endIdx).trim(),
//     generalZone: (text.slice(0, startIdx) + " " + textAfterHeader.slice(endIdx)).trim()
//   };
// };

// const parseResumeFromUrl = async (resumeUrl) => {
//   if (!resumeUrl) throw new Error("Resume URL missing.");

//   try {
//     const response = await axios.get(resumeUrl, { responseType: "arraybuffer", timeout: 15000 });
//     const pdfBuffer = response.data;
//     const pdfParser = typeof pdfLib === "function" ? pdfLib : pdfLib.default;

//     const options = {
//       pagerender: (pageData) => pageData.getTextContent().then((t) => t.items.map(i => i.str).join(" "))
//     };

//     const rawData = await pdfParser(pdfBuffer, options);

//     // Initial cleaning
//     let cleanText = rawData.text
//       .replace(/[^\x20-\x7E\n]/g, "") 
//       .replace(/([ \n])\1+/g, "$1")   
//       .replace(/\s+/g, " ")           
//       .trim();
      

//     // Density Guard
//     if (cleanText.length < 50) {
//       throw new Error("INVALID_DOCUMENT: Text too short to be a resume.");
//     }

//     // Limit length for AI token efficiency
//     const finalRawText = cleanText.substring(0, 12000);

//     // Apply Zonal Segmenting
//     const zones = segmentResumeZones(finalRawText);

//     return {
//       fullText: finalRawText,
//       experienceZone: zones.experienceZone,
//       generalZone: zones.generalZone
//     };

//   } catch (err) {
//     console.error(`Parser Error:`, err.message);
//     throw err;
//   }
// };

// module.exports = parseResumeFromUrl;
const axios = require("axios");
const { extractSkillsFromText } = require("./skillMap");

if (typeof global.DOMMatrix === "undefined") {
    global.DOMMatrix = class DOMMatrix {
        constructor() { return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }; }
    };
}

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const extractPdfData = async (buffer) => {
  const data = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true, disableFontFace: true, verbosity: 0 });
  const pdf = await loadingTask.promise;
  let fullText = "";
  let links = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(item => item.str).join(" ") + "\n";
    const annotations = await page.getAnnotations();
    annotations.forEach(anno => { if (anno.subtype === 'Link' && anno.url) links.push(anno.url); });
  }

  // 🚀 FALLBACK: Manual Regex Link Scraper for GitHub/Vercel/LinkedIn [cite: 284, 289]
  const textLinks = fullText.match(/(https?:\/\/[^\s]+)/gi) || [];
  
  return { text: fullText, links: [...new Set([...links, ...textLinks])] };
};

const segmentResumeZones = (text) => {
  // 🚀 UPGRADED: Flexible Regex to handle "WORKING EXPERIENCE" and "PROJECTS" 
  const expHeader = /\b(?:WORKING\s+EXPERIENCE|WORK\s+HISTORY|EMPLOYMENT|PROFESSIONAL\s+EXPERIENCE|PROJECTS|INTERNSHIPS)\b/i;
  const boundaryHeader = /\b(?:EDUCATION|ACADEMICS|SKILLS|CERTIFICATIONS|LANGUAGES|PERSONAL)\b/i;

  const expMatch = text.match(expHeader);
  if (!expMatch) return { experienceZone: "", generalZone: text };

  const startIdx = expMatch.index;
  const textAfterHeader = text.slice(startIdx + expMatch[0].length);
  const endMatch = textAfterHeader.match(boundaryHeader);
  const endIdx = endMatch ? endMatch.index : 800; // Take 800 chars if no end found

  let experienceZone = textAfterHeader.slice(0, endIdx).trim();

  // 🚀 ANTI-POLLUTION: If Education dates leak into the Exp zone, trim them [cite: 312-314]
  if (experienceZone.toLowerCase().includes("university") || experienceZone.toLowerCase().includes("college")) {
      const parts = experienceZone.split(/\b(?:education|academics)\b/i);
      experienceZone = parts[0].trim();
  }

  return { experienceZone, generalZone: (text.slice(0, startIdx) + " " + textAfterHeader.slice(endIdx)).trim() };
};

const parseResumeFromUrl = async (resumeUrl) => {
  if (!resumeUrl) throw new Error("Resume URL missing.");
  try {
    const response = await axios.get(resumeUrl, { responseType: "arraybuffer", timeout: 15000 });
    const { text, links } = await extractPdfData(response.data);
    let cleanText = text.replace(/[^\x20-\x7E\n]/g, "").replace(/\s+/g, " ").trim();
    const zones = segmentResumeZones(cleanText.substring(0, 12000));
    const identifiedSkills = extractSkillsFromText(cleanText);

    return {
      fullText: cleanText.substring(0, 12000),
      experienceZone: zones.experienceZone,
      generalZone: zones.generalZone,
      skills: identifiedSkills,
      links: links 
    };
  } catch (err) { throw err; }
};

module.exports = parseResumeFromUrl;