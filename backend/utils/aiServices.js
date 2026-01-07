// // backend/services/aiService.js
// import axios from "axios"; // ✅ OpenRouter
// import OpenAI from "openai"; // 1. Import OpenAI
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import Groq from "groq-sdk";
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize Clients
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // OpenAI Client
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// /**
//  * 🧹 UNIVERSAL JSON CLEANER
//  * Ensures the AI response is always valid JSON, no matter which provider is used.
//  */
// function cleanAndParseJSON(text) {
//   let cleanText = ""; 

//   try {
//     if (!text) return {};
//     // Remove markdown code blocks (e.g. ```json ... ```)
//     cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
//     return JSON.parse(cleanText);
//   } catch (e) {
//     // Fallback: regex search for JSON object/array
//     const jsonMatch = (cleanText || text).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
//     if (jsonMatch) {
//       try {
//         return JSON.parse(jsonMatch[0]);
//       } catch (e2) {
//         return {}; 
//       }
//     }
//     console.error("Failed to parse JSON:", text);
//     return {}; 
//   }
// }

// /**
//  * 🧠 INTELLIGENT ROUTER
//  * 1. Tries OpenAI (Best Quality/MVP Standard)
//  * 2. Fails over to Gemini (Free Tier)
//  * 3. Fails over to Groq (High Speed)
//  */
// export async function generateJSON(systemPrompt, userPrompt, modelType = "fast") {
  
//    // --- ATTEMPT 1: OPENROUTER (FREE MODEL) ---
//  // --- ATTEMPT 1: OPENROUTER (FREE MODEL) ---
// try {
//     console.log("🤖 Attempting: OpenRouter (DeepSeek)...");

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "deepseek/deepseek-chat", // Kept DeepSeek as you requested
//         temperature: 0,
//         messages: [
//           { role: "system", content: systemPrompt + "\nIMPORTANT: Return JSON only." },
//           { role: "user", content: userPrompt }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "HTTP-Referer": "http://localhost:5000",
//         },
//         timeout: 15000 // 🔥 15 SEC TIMEOUT: Stops hanging!
//       }
//     );

//     const text = response.data.choices[0]?.message?.content || "{}";
//     console.log("✅ Success: Used OpenRouter");
//     return { data: cleanAndParseJSON(text), provider: "OpenRouter" };

//   } catch (err) {
//     console.warn(`⚠️ OpenRouter Failed/Timed Out: ${err.message}`);
//     // Code continues to backup below...
 
//   }
//   // --- ATTEMPT 2: GOOGLE GEMINI (Backup) ---
//   try {
//     console.log("🔄 Switching to Backup: Google Gemini...");
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash", 
//       systemInstruction: systemPrompt,
//       generationConfig: { 
//         temperature: 0.0,
//         responseMimeType: "application/json"
//       }
//     });

//     const result = await model.generateContent(userPrompt);
//     console.log("✅ Success: Used Gemini");
//     return { data: cleanAndParseJSON(result.response.text()), provider: "Gemini" };

//   } catch (err) {
//     console.warn(`⚠️ Gemini Failed: ${err.message}`);
//   }

//   // --- ATTEMPT 3: GROQ (Last Resort) ---
//   try {
//     console.log("⚡ Switching to Last Resort: Groq...");
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       temperature: 0.2,
//       max_tokens: 8000,
//       messages: [
//         { role: "system", content: systemPrompt + "\nIMPORTANT: Return RAW JSON only." },
//         { role: "user", content: userPrompt }
//       ]
//     });

//     const text = completion.choices[0]?.message?.content || "{}";
//     console.log("✅ Success: Used Groq");
//     return { data: cleanAndParseJSON(text), provider: "Groq" };

//   } catch (err) {
//     console.error(`❌ All AI Services Failed: ${err.message}`);
//     throw new Error("AI Services unavailable.");
//   }
// }


const OpenAI = require("openai"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
require("dotenv").config();

// ============================================================================
// 🔌 CLIENT INITIALIZATION
// ============================================================================

// 1. OpenRouter Client (Logic Powerhouse)
const openai = new OpenAI({ 
    apiKey: process.env.OPENROUTER_API_KEY, 
    baseURL: "https://openrouter.ai/api/v1" 
});

// 2. Google Gemini Client (Reliable Backup)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 3. Groq Client (Speed Demon)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


// ============================================================================
// 🧹 HELPER: UNIVERSAL JSON CLEANER
// ============================================================================
function cleanAndParseJSON(text) {
  let cleanText = text || ""; 

  try {
    if (!cleanText) return {};

    // 1. Remove DeepSeek's <think> tags (CRITICAL for R1 model)
    cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    // 2. Remove Markdown Wrappers (```json ... ```)
    cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

    // 3. Attempt Parse
    return JSON.parse(cleanText);

  } catch (e) {
    // 4. Fallback: Regex Search for { ... } or [ ... ]
    const jsonMatch = (cleanText).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      try { return JSON.parse(jsonMatch[0]); } catch (e2) { return {}; }
    }
    console.error("❌ JSON Parse Failed. Raw text:", text);
    return {}; 
  }
}

// ============================================================================
// 🧠 FUNCTION 1: GENERATE JSON (Analysis & Questions)
// 🎯 STRATEGY: OpenRouter (DeepSeek R1 Free) -> Groq -> Gemini
// ============================================================================
// async function generateJSON(systemPrompt, userPrompt) {
  
//   // 1️⃣ PRIORITY: OPENROUTER (DeepSeek R1 - FREE & SMART)
//   try {
//     console.log("🤖 JSON Attempt 1: OpenRouter (DeepSeek R1 Free)...");
//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1-0528:free", // ✅ The Truly Free Model
//       messages: [
//         { role: "system", content: systemPrompt + "\nIMPORTANT: Return strictly JSON only. No thinking trace." },
//         { role: "user", content: userPrompt }
//       ],
//       temperature: 0, // 🔥 Strict Persistence
//     });
    
//     const text = completion.choices[0]?.message?.content || "{}";
//     console.log("✅ Success: Used OpenRouter");
//     return { data: cleanAndParseJSON(text), provider: "OpenRouter (DeepSeek R1)" };

//   } catch (err) {
//     console.warn(`⚠️ OpenRouter Failed: ${err.message}`);
//   }

//   // 2️⃣ FALLBACK: GROQ (Llama 3.3 - FAST)
//   try {
//     console.log("⚡ JSON Attempt 2: Groq (Llama 3)...");
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-0b-versatile",
    

//       temperature: 0, 
//       messages: [
//         { role: "system", content: systemPrompt + "\nIMPORTANT: Return RAW JSON only." },
//         { role: "user", content: userPrompt }
//       ]
//     });

//     const text = completion.choices[0]?.message?.content || "{}";
//     console.log("✅ Success: Used Groq");
//     return { data: cleanAndParseJSON(text), provider: "Groq" };

//   } catch (err) {
//     console.warn(`⚠️ Groq Failed: ${err.message}`);
//   }

//   // 3️⃣ LAST RESORT: GOOGLE GEMINI (Flash - RELIABLE)
//   try {
//     console.log("🔄 JSON Attempt 3: Gemini...");
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash", 
//       systemInstruction: systemPrompt,
//       generationConfig: { 
//           temperature: 0, 
//           responseMimeType: "application/json" 
//       }
//     });

//     const result = await model.generateContent(userPrompt);
//     return { data: cleanAndParseJSON(result.response.text()), provider: "Gemini" };

//   } catch (err) {
//     console.error(`❌ ALL JSON Services Failed: ${err.message}`);
//     throw new Error("AI Services unavailable.");
//   }
// }

async function generateJSON(systemPrompt, userPrompt) {
  // 1️⃣ ATTEMPT 1: OpenRouter (DeepSeek R1)
  try {
    console.log("🤖 Carousel Attempt 1: OpenRouter (DeepSeek)...");
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      temperature: 0.1,
      response_format: { type: "json_object" }
    });
    return { success: true, data: JSON.parse(completion.choices[0].message.content), provider: "DeepSeek" };
  } catch (err) {
    console.warn(`⚠️ OpenRouter Carousel Failed: ${err.message}`);
  }

  // 2️⃣ ATTEMPT 2: Groq (Llama 3.3)
  try {
    console.log("⚡ Carousel Attempt 2: Groq (Llama 3.3)...");
    const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      temperature: 0,
      response_format: { type: "json_object" }
    });
    return { success: true, data: JSON.parse(completion.choices[0].message.content), provider: "Groq" };
  } catch (err) {
    console.warn(`⚠️ Groq Carousel Failed: ${err.message}`);
  }

  // 3️⃣ ATTEMPT 3: Google Gemini (1.5 Flash)
  try {
    console.log("🔄 Carousel Attempt 3: Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`${systemPrompt}\n\nUSER DATA: ${userPrompt}`);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    return { success: true, data: JSON.parse(text), provider: "Gemini" };
  } catch (err) {
    console.error(`❌ CAROUSEL EXHAUSTED: All models failed.`);
    return { success: false, error: "AI_CHAIN_FAILURE" };
  }
}

// ============================================================================
// 🌊 FUNCTION 2: GENERATE STREAM (Chat & Solver)
// 🎯 STRATEGY: Groq -> Gemini (NO OpenRouter)
// ============================================================================
async function generateStream(prompt, res) {
  
  // 1️⃣ PRIORITY: GROQ (Instant Speed)
  try {
    console.log("🌊 Streaming Attempt 1: Groq...");
    const stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        stream: true,
        temperature: 0.6, 
        max_tokens: 1024,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) res.write(content);
    }
    res.end();
    console.log("✅ Success: Used Groq");
    return; 

  } catch (err) {
    console.warn(`⚠️ Groq Stream Failed: ${err.message}`);
  }

  // 2️⃣ FALLBACK: GEMINI (Flash Backup)
  try {
    console.log("🌊 Streaming Attempt 2: Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    
    const result = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6 } 
    });

    for await (const chunk of result.stream) {
      try {
        const chunkText = chunk.text();
        res.write(chunkText);
      } catch (streamErr) {
        // Safe failover
      }
    }
    res.end();
    return; 

  } catch (err) {
    console.error("❌ ALL Streaming Services Failed:", err);
    res.write("\n\n**[System Error: All AI services are busy. Please try again in 1 minute.]**");
    res.end();
  }
}
// // 🔥 FIX: Only ONE generateStream function
// async function generateStream(prompt, res) {
//     try {
//         const stream = await groq.chat.completions.create({
//             model: "llama-3.3-70b-versatile",
//             messages: [{ role: "user", content: prompt }],
//             stream: true,
//         });

//         for await (const chunk of stream) {
//             const content = chunk.choices[0]?.delta?.content || "";
//             if (content) {
//                 res.write(content); // Sends data piece by piece
//             }
//         }
//         res.end(); // Tells the frontend we are finished
//     } catch (err) {
//         console.error("Stream Error:", err);
//         res.write("\n\n[System Error: AI service busy]");
//         res.end();
//     }
// }





module.exports = { generateJSON, generateStream };

// const OpenAI = require("openai");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Groq = require("groq-sdk");
// require("dotenv").config();

// // ============================================================================
// // 🔌 CLIENT INITIALIZATION
// // ============================================================================
// const openai = new OpenAI({ 
//     apiKey: process.env.OPENROUTER_API_KEY, 
//     baseURL: "https://openrouter.ai/api/v1" 
// });
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // ============================================================================
// // 🧹 HELPER: UNIVERSAL JSON CLEANER
// // ============================================================================
// function cleanAndParseJSON(text) {
//   let cleanText = text || "";
//   try {
//     if (!cleanText) return {};

//     // 1. Remove DeepSeek's <think> tags (CRITICAL for R1 models)
//     cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

//     // 2. Remove Markdown Wrappers (```json ... ```)
//     cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

//     return JSON.parse(cleanText);
//   } catch (e) {
//     // 3. Fallback: Regex Search for the first { or [ to find the JSON object
//     const jsonMatch = cleanText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
//     if (jsonMatch) {
//       try { return JSON.parse(jsonMatch[0]); } catch (e2) { return {}; }
//     }
//     return {};
//   }
// }

// // ============================================================================
// // 🧠 FUNCTION 1: GENERATE JSON (Audit & Analysis)
// // ============================================================================
// async function generateJSON(systemPrompt, userPrompt) {
  
//   // 1️⃣ PRIORITY: OPENROUTER (DeepSeek R1 - Smart & Free)
//   try {
//     console.log("🤖 Attempt 1: OpenRouter (DeepSeek)...");
//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-r1:free",
//       messages: [
//         { role: "system", content: systemPrompt + "\nReturn ONLY valid JSON. No prose." },
//         { role: "user", content: userPrompt }
//       ],
//       temperature: 0, 
//     });
//     const text = completion.choices[0]?.message?.content || "{}";
//     return { data: cleanAndParseJSON(text), provider: "DeepSeek (OpenRouter)" };
//   } catch (err) {
//     console.warn(`⚠️ OpenRouter Failed: ${err.message}`);
//   }

//   // 2️⃣ FALLBACK: GEMINI (Flash - Reliable Backup)
//   try {
//     console.log("🔄 Attempt 2: Gemini Failover...");
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       systemInstruction: systemPrompt,
//       generationConfig: { temperature: 0, responseMimeType: "application/json" }
//     });
//     const result = await model.generateContent(userPrompt);
//     return { data: cleanAndParseJSON(result.response.text()), provider: "Gemini" };
//   } catch (err) {
//     console.warn(`⚠️ Gemini Failed: ${err.message}`);
//   }

//   // 3️⃣ LAST RESORT: GROQ (Llama 3 - High Speed)
//   try {
//     console.log("⚡ Attempt 3: Groq Last Resort...");
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: userPrompt }
//       ]
//     });
//     return { data: cleanAndParseJSON(completion.choices[0]?.message?.content), provider: "Groq" };
//   } catch (err) {
//     console.error("❌ ALL SERVICES FAILED");
//     throw new Error("AI Services Unavailable");
//   }
// }

// // ============================================================================
// // 🌊 FUNCTION 2: GENERATE STREAM (Interview Prep / Solver)
// // ============================================================================
// async function generateStream(prompt, res) {
//   try {
//     const stream = await groq.chat.completions.create({
//         model: "llama-3.3-70b-versatile",
//         messages: [{ role: "user", content: prompt }],
//         stream: true,
//     });

//     for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content || "";
//         if (content) res.write(content);
//     }
//     res.end();
//   } catch (err) {
//     res.write("\n\n[System: AI currently busy. Switching to backup...]");
//     // Gemini fallback logic for streaming would go here
//     res.end();
//   }
// }

// module.exports = { generateJSON, generateStream };