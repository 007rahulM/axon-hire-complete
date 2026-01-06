// // backend/utils/resumeParser.js
// const axios = require("axios");
// const pdfLib = require("pdf-parse");

// const parseResumeFromUrl = async (resumeUrl) => {
//   try {
//     console.log(" Attempting to download:", resumeUrl);

//     // 1. Download the PDF file as a binary buffer
//     const response = await axios.get(resumeUrl, { responseType: "arraybuffer" });
//     const buffer = response.data;

//     console.log(" Download success. Buffer size:", buffer.length);

//     // 2. Safely extract the parsing function
//     // Sometimes the library is exported as 'default', sometimes directly.
//     // We check both to be 100% sure.
//     const pdfParser = pdfLib.default || pdfLib;


//     // 3. Parse the PDF
//     const data = await pdfLib.PDFParse(buffer);
    
//     // 4. Clean up the text (remove newlines and extra spaces)
//     // This makes it easier for the AI to read.
//     const cleanText = data.text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    
//     console.log(" PDF Parsed. Text length:", cleanText.length);
    
//     return cleanText;

//   } catch (err) {
//     console.error("pARSER ERROR:", err.message);
//     // If the error has a response (like 404 from Cloudinary), log it
//     if (err.response) {
//       console.error("   - Status:", err.response.status);
//     }
//     throw new Error("Failed to parse resume PDF");
//   }
// };

// module.exports = parseResumeFromUrl;


// //new one                    //new one                   //new one 

// /**
//  * @fileoverview Utility module for parsing PDF documents from  remote urls
//  * implements defensiev loading for the pdf-parse library
//  * @module utils/resumeParser
//  * @requires axios 
//  * @requires pdf-parse
//  * 
// //  */

// //////////////////////////////////////////////////
// // ================================================================= //

// const axios =require("axios");
// const pdfLib=require("pdf-parse");

// // /*dolads a pdf from a given cloudinary url and extract its raw text content */
// // @async@function parseResumeFromUrl@parama {String} resumeUrl - the absoulute URL of the pdf file like cloudinary links
// // @returns{Promise<string>} - the sanittized ,reaw text extracted from the pdf
// // @thorws{Error}- throws if download fails pdf is invalid, or parsing library fails

// const parseResumeFromUrl=async(resumeUrl)=>{
//   //input validation 
//   if(!resumeUrl || typeof resumeUrl!=="string"){
//     throw new Error("ResumeParser- Invalid Input:resumeUrl must be a non-empty string");

//   }
//   try{
//     console.log(`ResumeParser-  Initiating download stream: ${resumeUrl}`);
//     //1 fetch the file stream
//     //arraybuffer is mandatory for binary files like pdfs
//     //if you forget this the axios tries to read it as a text and corrupts the file
//     const response=await axios.get(resumeUrl,{
//       responseType:"arraybuffer",
//       timeout:10000,//10 secons timeout prevents hanging processes

//     });
    
//     const pdfBuffer=response.data;
//     console.log(`ResumeParser- Download complete. Buffer size: ${pdfBuffer.length} bytes`);

//     //2 the defensive fix for object vs function 
//     //we inspect the library to find the executable function
//     let pdfParserValidator= null;
//     if(typeof pdfLib==="function"){
//       pdfParserValidator=pdfLib;
//     }else if(pdfLib.default && typeof pdfLib.default==="function"){
//       pdfParserValidator=pdfLib.default;
//     }else{
//       //fallback if we cant find it we log the structure to debug 
//       console.error("ResumeParser- Dependcy Inspection:",pdfLib);
//       throw new Error("ResumeParser- Critical: pdf-parse library is not executable");

//     }

//     //3 execute parse
//     const rawData=await pdfParserValidator(pdfBuffer);

//     //4. data sanitization
//     //ai model handle continous text better than jagged lines so
//      const cleanText= rawData.text 
//      .replace(/\n/g, " ") //convert line breaks to spaces
//      .replace(/\s+/g, " ") //collapse multiple spaces into one //this line will make mulliple spaces into one single spaces remove extra spaces
//      .trim();
     
//      console.log(`ResumeParser - Extraction Success Character count: ${cleanText.length}`);

//      return cleanText;
//   }catch(err){
//     //we log the techical errors
//     console.error(`ResumeParser - Execution Failed:`, err.message);
    
//     if(axios.isAxiosError(err)){
//       console.error(`ResumerParser - Network Status:${err.response?.status}`);
      
//     }
  
//   //...but we throw a clean error for the api response
//   throw new Error("Failed to process resume document. Please ensure the file is a valid PDF.");
//   }
// };

// module.exports=parseResumeFromUrl;











// the new one 

// //see below
//  /**
//  * @fileoverview Utility module for parsing PDF documents from remote urls
//  * Implements defensive loading for the pdf-parse library
//  * @module utils/resumeParser
//  * @requires axios 
//  * @requires pdf-parse
//  */

// const axios = require("axios");
// const pdfLib = require("pdf-parse");

// /**
//  * Downloads a PDF from a given URL (Cloudinary) and extracts its raw text content.
//  * @param {String} resumeUrl - The absolute URL of the PDF file.
//  * @returns {Promise<string>} - The sanitized, raw text extracted from the PDF.
//  */
// const parseResumeFromUrl = async (resumeUrl) => {
//   // Input validation 
//   if (!resumeUrl || typeof resumeUrl !== "string") {
//     throw new Error("ResumeParser - Invalid Input: resumeUrl must be a non-empty string");
//   }

//   try {
//     console.log(`ResumeParser - Initiating download stream: ${resumeUrl}`);

//     // 1. Fetch the file stream
//     // "arraybuffer" is MANDATORY for binary files like PDFs.
//     // If you forget this, axios tries to read it as text and corrupts the file.
//     const response = await axios.get(resumeUrl, {
//       responseType: "arraybuffer",
//       timeout: 10000, // 10 seconds timeout prevents hanging processes
//     });
    
//     const pdfBuffer = response.data;
//     console.log(`ResumeParser - Download complete. Buffer size: ${pdfBuffer.length} bytes`);

//     // 2. Defensive fix for object vs function export in pdf-parse
//     let pdfParserValidator = null;
//     if (typeof pdfLib === "function") {
//       pdfParserValidator = pdfLib;
//     } else if (pdfLib.default && typeof pdfLib.default === "function") {
//       pdfParserValidator = pdfLib.default;
//     } else {
//       console.error("ResumeParser - Dependency Inspection:", pdfLib);
//       throw new Error("ResumeParser - Critical: pdf-parse library is not executable");
//     }

//     // 3. Execute parse
//     const rawData = await pdfParserValidator(pdfBuffer);

//     // 4. Data sanitization
//     // AI models handle continuous text better than jagged lines.
//     const cleanText = rawData.text 
//       .replace(/\n/g, " ") // Convert line breaks to spaces
//       .replace(/\s+/g, " ") // Collapse multiple spaces into one
//       .trim();
      
//     console.log(`ResumeParser - Extraction Success. Character count: ${cleanText.length}`);

//     return cleanText;

//   } catch (err) {
//     // Log technical errors
//     console.error(`ResumeParser - Execution Failed:`, err.message);
    
//     if (axios.isAxiosError(err)) {
//       console.error(`ResumeParser - Network Status: ${err.response?.status}`);
//     }
  
//     // Throw a clean error for the API response
//     throw new Error("Failed to process resume document. Please ensure the file is a valid PDF.");
//   }
// };

// module.exports = parseResumeFromUrl;


const axios = require("axios");
const pdfLib = require("pdf-parse");

/**
 * HELPER: Identifies key zones in the resume text.
 * This mimics "Big Bull" zonal parsing by finding where the work history starts.
 */
const segmentResumeZones = (text) => {
  // Regex for common Experience headers
  const experienceHeaderRegex = /(?:PROFESSIONAL\s+)?(?:EXPERIENCE|EMPLOYMENT|WORK\s+HISTORY|CAREER\s+SUMMARY)/i;
  
  // Regex for the next section (to know where Experience ends)
  const boundaryHeaderRegex = /(?:EDUCATION|SKILLS|CERTIFICATIONS|PROJECTS|LANGUAGES)/i;

  const expMatch = text.match(experienceHeaderRegex);
  
  if (!expMatch) {
    return { experienceZone: "", generalZone: text };
  }

  const startIdx = expMatch.index;
  const textAfterHeader = text.slice(startIdx + expMatch[0].length);
  
  // Look for the next section to mark the end of the Experience Zone
  const endMatch = textAfterHeader.match(boundaryHeaderRegex);
  const endIdx = endMatch ? endMatch.index : textAfterHeader.length;

  return {
    experienceZone: textAfterHeader.slice(0, endIdx).trim(),
    generalZone: (text.slice(0, startIdx) + " " + textAfterHeader.slice(endIdx)).trim()
  };
};

const parseResumeFromUrl = async (resumeUrl) => {
  if (!resumeUrl) throw new Error("Resume URL missing.");

  try {
    const response = await axios.get(resumeUrl, { responseType: "arraybuffer", timeout: 15000 });
    const pdfBuffer = response.data;
    const pdfParser = typeof pdfLib === "function" ? pdfLib : pdfLib.default;

    const options = {
      pagerender: (pageData) => pageData.getTextContent().then((t) => t.items.map(i => i.str).join(" "))
    };

    const rawData = await pdfParser(pdfBuffer, options);

    // Initial cleaning
    let cleanText = rawData.text
      .replace(/[^\x20-\x7E\n]/g, "") 
      .replace(/([ \n])\1+/g, "$1")   
      .replace(/\s+/g, " ")           
      .trim();
      

    // Density Guard
    if (cleanText.length < 50) {
      throw new Error("INVALID_DOCUMENT: Text too short to be a resume.");
    }

    // Limit length for AI token efficiency
    const finalRawText = cleanText.substring(0, 12000);

    // Apply Zonal Segmenting
    const zones = segmentResumeZones(finalRawText);

    return {
      fullText: finalRawText,
      experienceZone: zones.experienceZone,
      generalZone: zones.generalZone
    };

  } catch (err) {
    console.error(`Parser Error:`, err.message);
    throw err;
  }
};

module.exports = parseResumeFromUrl;