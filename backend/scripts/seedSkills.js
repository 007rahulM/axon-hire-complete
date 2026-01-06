const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Skill = require("../models/Skill");
const { skillMap } = require("../utils/skillMap");

// This tells Node to look for .env in the root folder specifically
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

const migrateSkills = async () => {
  try {
    // Log the path for debugging so you can see exactly where it is looking
    console.log("📂 Searching for .env at:", envPath);
    
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is still undefined. Please check if the .env file exists in the root folder.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB...");

    const skillsToInsert = Object.keys(skillMap).map(key => ({
      ...skillMap[key],
      canonical: skillMap[key].canonical || key,
      source: "system",
      isApproved: true 
    }));

    await Skill.insertMany(skillsToInsert, { ordered: false });
    
    console.log("✅ Database Brain Initialized: 500+ Skills Migrated.");
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