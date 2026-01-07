const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs"); // Added to read the file
const Skill = require("../models/Skill");

// Path setup
const envPath = path.resolve(__dirname, "../.env");
const jsonPath = path.resolve(__dirname, "./skills.json"); // Path to your json data
dotenv.config({ path: envPath });

const migrateSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB...");

    // --- ADD THIS SECTION TO CLEAR OLD DATA ---
    // console.log("🗑️ Clearing existing skills to ensure a fresh start...");
    // await Skill.deleteMany({}); 
    // ------------------------------------------

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const skillsArray = JSON.parse(rawData);

    const skillsToInsert = skillsArray.map(item => ({
      canonical: item.canonical.toLowerCase(), // 
      synonyms: item.synonyms, // 
      category: item.category, // 
      source: "system",
      isApproved: true 
    }));

    await Skill.insertMany(skillsToInsert, { ordered: false });
    
    console.log(`✅ Success: ${skillsToInsert.length} Skills Migrated.`);
    process.exit(0);
  } catch (err) {
    if (err.code === 11000) {
      console.log("⚠️ Migration finished (duplicates were skipped).");
      process.exit(0);
    } else {
      console.error("❌ Migration failed:", err.message);
      process.exit(1);
    }
  }
};

migrateSkills();