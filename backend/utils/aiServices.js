
// const OpenAI = require("openai"); 
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Groq = require("groq-sdk");
// require("dotenv").config();

// // ============================================================================
// // 🔌 CLIENT INITIALIZATION
// // ============================================================================

// // 1. OpenRouter Client (Logic Powerhouse)
// const openai = new OpenAI({ 
//     apiKey: process.env.OPENROUTER_API_KEY, 
//     baseURL: "https://openrouter.ai/api/v1" 
// });

// // 2. Google Gemini Client (Reliable Backup)
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // 3. Groq Client (Speed Demon)
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


// // ============================================================================
// // 🧹 HELPER: UNIVERSAL JSON CLEANER
// // ============================================================================
// function cleanAndParseJSON(text) {
//   let cleanText = text || ""; 

//   try {
//     if (!cleanText) return {};

//     // 1. Remove DeepSeek's <think> tags (CRITICAL for R1 model)
//     cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

//     // 2. Remove Markdown Wrappers (```json ... ```)
//     cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

//     // 3. Attempt Parse
//     return JSON.parse(cleanText);

//   } catch (e) {
//     // 4. Fallback: Regex Search for { ... } or [ ... ]
//     const jsonMatch = (cleanText).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
//     if (jsonMatch) {
//       try { return JSON.parse(jsonMatch[0]); } catch (e2) { return {}; }
//     }
//     console.error("❌ JSON Parse Failed. Raw text:", text);
//     return {}; 
//   }
// }


// async function generateJSON(systemPrompt, userPrompt) {
//   // 1️⃣ ATTEMPT 1: OpenRouter (DeepSeek R1)
//   try {
//     console.log("🤖 Carousel Attempt 1: OpenRouter (DeepSeek)...");
//     const completion = await openai.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct:free",
//       messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
//       temperature: 0.1,
//       response_format: { type: "json_object" }
//     });
//     return { success: true, data: JSON.parse(completion.choices[0].message.content), provider: "DeepSeek" };
//   } catch (err) {
//     console.warn(`⚠️ OpenRouter Carousel Failed: ${err.message}`);
//   }

//   // 2️⃣ ATTEMPT 2: Groq (Llama 3.3)
//   try {
//     console.log("⚡ Carousel Attempt 2: Groq (Llama 3.3)...");
//     const completion = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//       messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
//       temperature: 0,
//       response_format: { type: "json_object" }
//     });
//     return { success: true, data: JSON.parse(completion.choices[0].message.content), provider: "Groq" };
//   } catch (err) {
//     console.warn(`⚠️ Groq Carousel Failed: ${err.message}`);
//   }

//   // 3️⃣ ATTEMPT 3: Google Gemini (1.5 Flash)
//   try {
//     console.log("🔄 Carousel Attempt 3: Gemini...");
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//     const result = await model.generateContent(`${systemPrompt}\n\nUSER DATA: ${userPrompt}`);
//     const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
//     return { success: true, data: JSON.parse(text), provider: "Gemini" };
//   } catch (err) {
//     console.error(`❌ CAROUSEL EXHAUSTED: All models failed.`);
//     return { success: false, error: "AI_CHAIN_FAILURE" };
//   }
// }

// // ============================================================================
// // 🌊 FUNCTION 2: GENERATE STREAM (Chat & Solver)
// // 🎯 STRATEGY: Groq -> Gemini (NO OpenRouter)
// // ============================================================================
// async function generateStream(prompt, res) {
  
//   // 1️⃣ PRIORITY: GROQ (Instant Speed)
//   try {
//     console.log("🌊 Streaming Attempt 1: Groq...");
//     const stream = await groq.chat.completions.create({
//         model: "llama-3.3-70b-versatile",
//         messages: [{ role: "user", content: prompt }],
//         stream: true,
//         temperature: 0.6, 
//         max_tokens: 1024,
//     });

//     for await (const chunk of stream) {
//         const content = chunk.choices[0]?.delta?.content || "";
//         if (content) res.write(content);
//     }
//     res.end();
//     console.log("✅ Success: Used Groq");
//     return; 

//   } catch (err) {
//     console.warn(`⚠️ Groq Stream Failed: ${err.message}`);
//   }

//   // 2️⃣ FALLBACK: GEMINI (Flash Backup)
//   try {
//     console.log("🌊 Streaming Attempt 2: Gemini...");
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    
//     const result = await model.generateContentStream({
//         contents: [{ role: "user", parts: [{ text: prompt }] }],
//         generationConfig: { temperature: 0.6 } 
//     });

//     for await (const chunk of result.stream) {
//       try {
//         const chunkText = chunk.text();
//         res.write(chunkText);
//       } catch (streamErr) {
//         // Safe failover
//       }
//     }
//     res.end();
//     return; 

//   } catch (err) {
//     console.error("❌ ALL Streaming Services Failed:", err);
//     res.write("\n\n**[System Error: All AI services are busy. Please try again in 1 minute.]**");
//     res.end();
//   }
// }

// module.exports = { generateJSON, generateStream };








///==================================
//new one to check//

const OpenAI = require("openai"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");
require("dotenv").config();

// ----------------------------------------------------------------------------
// Client initialization – fail gracefully if keys missing
// ----------------------------------------------------------------------------
const openai = process.env.OPENROUTER_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY, baseURL: "https://openrouter.ai/api/v1" })
  : null;

const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

if (!openai && !genAI && !groq) {
  console.error("❌ No AI API keys found! AI features will not work.");
}

// ----------------------------------------------------------------------------
// Helper: clean and parse JSON from AI responses
// ----------------------------------------------------------------------------
function cleanAndParseJSON(text) {
  let cleanText = text || "";
  try {
    if (!cleanText) return {};

    // Remove <think> tags (DeepSeek R1)
    cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    // Remove markdown code fences
    cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

    // Attempt to parse
    return JSON.parse(cleanText);
  } catch (e) {
    // Fallback: find first JSON object or array in the string
    const jsonMatch = cleanText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e2) {
        // Ignore
      }
    }
    console.error("❌ JSON Parse Failed. Raw text:", text.substring(0, 200));
    return {};
  }
}

// ----------------------------------------------------------------------------
// generateJSON – carousel with OpenRouter, Groq, Gemini
// ----------------------------------------------------------------------------
async function generateJSON(systemPrompt, userPrompt) {
  const models = [];

  if (openai) models.push({
    name: "OpenRouter",
    call: async () => {
      const completion = await openai.chat.completions.create({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
        temperature: 0.1,
        response_format: { type: "json_object" }
      });
      return { data: cleanAndParseJSON(completion.choices[0].message.content), provider: "DeepSeek" };
    }
  });

  if (groq) models.push({
    name: "Groq",
    call: async () => {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
        temperature: 0,
        response_format: { type: "json_object" }
      });
      return { data: cleanAndParseJSON(completion.choices[0].message.content), provider: "Groq" };
    }
  });

  if (genAI) models.push({
    name: "Gemini",
    call: async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(`${systemPrompt}\n\nUSER DATA: ${userPrompt}`);
      const text = result.response.text();
      return { data: cleanAndParseJSON(text), provider: "Gemini" };
    }
  });

  // Try each model
  for (const model of models) {
    try {
      console.log(`🤖 Carousel Attempt: ${model.name}...`);
      const result = await model.call();
      if (result.data && Object.keys(result.data).length > 0) {
        return { success: true, data: result.data, provider: result.provider };
      }
    } catch (err) {
      console.warn(`⚠️ ${model.name} failed: ${err.message}`);
    }
  }

  console.error("❌ CAROUSEL EXHAUSTED: All models failed.");
  return { success: false, error: "AI_CHAIN_FAILURE" };
}

// ----------------------------------------------------------------------------
// generateStream – streaming for chat / solver (Groq → Gemini)
// ----------------------------------------------------------------------------
async function generateStream(prompt, res) {
  // Try Groq first
  if (groq) {
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
  }

  // Fallback to Gemini
  if (genAI) {
    try {
      console.log("🌊 Streaming Attempt 2: Gemini...");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const result = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6 }
      });
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        res.write(chunkText);
      }
      res.end();
      console.log("✅ Success: Used Gemini");
      return;
    } catch (err) {
      console.error("❌ Gemini Stream Failed:", err);
    }
  }

  // No working service
  console.error("❌ ALL Streaming Services Failed");
  res.write("\n\n**[System Error: All AI services are busy. Please try again in 1 minute.]**");
  res.end();
}

module.exports = { generateJSON, generateStream };