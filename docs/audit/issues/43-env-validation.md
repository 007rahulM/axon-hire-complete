# Issue #43 — No Environment Config Validation

> **Branch**: 6 (Developer Experience & Observability)  
> **Severity**: ⚙️ Quality — missing environment variables cause cryptic runtime errors  
> **Status**: Branch 6 (pending)

---

## 👥 The Team Room

*Ben deploys to a new Render environment. The app starts but login fails silently.*

---

**🟠 Ben (Backend):** "Deployed to staging. App starts. But login returns 500. The logs say 'invalid signature' for JWTs."

**🟡 Dev (DevOps):** "Did you set `JWT_SECRET` in the staging environment?"

**🟠 Ben:** "...no. I forgot. But why didn't the server tell me at startup?"

**🟡 Dev:** "Because there's no startup check. The server starts even when critical environment variables are missing. `JWT_SECRET` defaults to `undefined`. JWTs signed with `undefined` as the secret fail verification on every request."

**🔴 Priya (PM):** "How long did it take to diagnose this?"

**🟠 Ben:** "45 minutes."

**🟡 Dev:** "With env validation, the server would have refused to start with: 'FATAL: JWT_SECRET is required but not set.' Diagnosis time: 2 seconds."

---

## 🔍 The Problem

Your `backend/.env` file has ~15 required variables:
```
MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
SENDGRID_API_KEY (or nodemailer)
GROQ_API_KEY
OPENROUTER_API_KEY
GOOGLE_API_KEY
GOOGLE_CLIENT_ID
FRONTEND_URL
REDIS_URL
...
```

If ANY of these is missing:
- Without validation: server starts, mysterious errors occur at runtime
- With validation: server refuses to start with a clear error message

---

## 🛠 The Fix (to implement in Branch 6)

### Option A: Custom Validation (Zero Dependencies)

Create `backend/utils/validateEnv.js`:

```js
// backend/utils/validateEnv.js
const REQUIRED_ENV_VARS = [
  { key: "MONGO_URI", description: "MongoDB Atlas connection string" },
  { key: "JWT_SECRET", description: "Secret for signing JWT access tokens (min 32 chars)" },
  { key: "CLOUDINARY_CLOUD_NAME", description: "Cloudinary cloud name" },
  { key: "CLOUDINARY_API_KEY", description: "Cloudinary API key" },
  { key: "CLOUDINARY_API_SECRET", description: "Cloudinary API secret" },
  { key: "FRONTEND_URL", description: "Frontend URL (e.g., https://axon-hire.com)" },
];

const OPTIONAL_ENV_VARS = [
  { key: "GROQ_API_KEY", description: "Groq API key (AI carousel attempt 2)" },
  { key: "OPENROUTER_API_KEY", description: "OpenRouter API key (AI carousel attempt 1)" },
  { key: "GOOGLE_API_KEY", description: "Google Gemini API key (AI carousel attempt 3)" },
  { key: "REDIS_URL", description: "Upstash Redis URL (caching + rate limiting)" },
  { key: "SENTRY_DSN", description: "Sentry error monitoring DSN" },
  { key: "SENDGRID_API_KEY", description: "SendGrid API key for transactional emails" },
];

function validateEnv() {
  const missing = [];
  const warnings = [];
  
  // Check required vars
  for (const { key, description } of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      missing.push(`  ❌ ${key} — ${description}`);
    }
  }
  
  // Check optional vars (warn if missing)
  for (const { key, description } of OPTIONAL_ENV_VARS) {
    if (!process.env[key]) {
      warnings.push(`  ⚠️  ${key} — ${description} (optional but recommended)`);
    }
  }
  
  // Check JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    missing.push(`  ❌ JWT_SECRET is too short (${process.env.JWT_SECRET.length} chars — need 32+)`);
  }
  
  // Print warnings (non-fatal)
  if (warnings.length > 0) {
    console.warn("\n⚠️  Optional environment variables not set:");
    warnings.forEach(w => console.warn(w));
    console.warn("");
  }
  
  // Fail fast on missing required vars
  if (missing.length > 0) {
    console.error("\n🚨 FATAL: Required environment variables are missing:");
    missing.forEach(m => console.error(m));
    console.error("\nCreate backend/.env from backend/.env.example and fill in all required values.");
    console.error("See docs/setup/01-render-deployment.md for deployment configuration.\n");
    process.exit(1); // Stop the server immediately
  }
  
  console.log("✅ Environment validation passed");
}

module.exports = validateEnv;
```

Call it at the top of `backend/server.js`:
```js
// MUST be after require("dotenv").config() and before anything else:
require("dotenv").config();
const validateEnv = require("./utils/validateEnv");
validateEnv(); // Crashes the process if required vars are missing
```

### Option B: Using `zod` (Type-Safe, More Powerful)

```bash
cd backend && npm install zod
```

```js
// backend/utils/validateEnv.js
const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  
  // Required
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),
  
  // Optional
  GROQ_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error("\n🚨 FATAL: Environment variable validation failed:");
  console.error(parseResult.error.issues.map(i => `  ❌ ${i.path[0]}: ${i.message}`).join("\n"));
  process.exit(1);
}

// Export typed env object:
module.exports = parseResult.data;
```

Use it instead of `process.env` directly:
```js
const env = require("./utils/validateEnv");
// Now: env.JWT_SECRET is typed string (never undefined)
// vs: process.env.JWT_SECRET (type: string | undefined)
```

### Create `.env.example`

This file is committed to git (unlike `.env`) and shows all variables that need to be set:

```bash
# backend/.env.example
# Copy this file to .env and fill in all values
# DO NOT commit .env to version control

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/axon_hire

# Authentication
JWT_SECRET=your-very-long-random-secret-at-least-32-chars
JWT_REFRESH_SECRET=another-very-long-random-secret-at-least-32-chars

# Cloudinary (resume storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI Services (at least one required for AI features)
GROQ_API_KEY=
OPENROUTER_API_KEY=
GOOGLE_API_KEY=

# Redis (optional — required for caching and rate limiting improvements)
REDIS_URL=

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:5173

# Email (optional — required for OTP and password reset)
SENDGRID_API_KEY=

# Monitoring (optional but recommended for production)
SENTRY_DSN=
```

---

## ❓ Common Questions

**Q: Why `process.exit(1)`? Shouldn't we just log a warning?**  
A: A server that starts without `JWT_SECRET` will sign JWTs with `undefined` as the secret and accept JWTs with `undefined` as the signature — this is a security vulnerability. Silently continuing is worse than crashing. Fail loud and fast.

**Q: What if we use a secrets manager (AWS Secrets Manager, HashiCorp Vault)?**  
A: The validation logic is the same — check that the values are present and valid, regardless of where they came from. The secrets manager injects values into `process.env`; your validation checks them the same way.

**Q: Should `.env.example` have real values?**  
A: No. Use placeholder text. Real credentials in version control is a critical security issue (Issue #2 category). Use obviously fake placeholders: `your-api-key-here`, `CHANGE_ME`, `replace-this`.

---

## 🎓 What You Learned

- Without validation, missing environment variables cause cryptic runtime errors hours into debugging
- Fail fast: check at startup and crash immediately with a clear error message
- `process.exit(1)` is appropriate for startup validation failures — don't hide them
- `.env.example` committed to git tells developers exactly what they need to configure
- `zod` provides type-safe, schema-validated env parsing with helpful error messages
