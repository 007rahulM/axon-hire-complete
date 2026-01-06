// // /**
// //  * Global Skill Taxonomy & Intelligence Map (2026 Standard)
// //  * Merges your "SkillMap" with "Intelligence Metadata" for deep matching.
// //  */
// // const skillMap = {
// //   // =====================================================
// //   // 💻 TECH: FRONTEND & LANGUAGES
// //   // =====================================================
// //   "react": {
// //     canonical: "react",
// //     synonyms: ["react.js", "reactjs", "frontend react", "jsx", "tsx", "nextjs", "next.js", "remix"],
// //     implicit: ["spa architecture", "component based ui", "virtual dom", "hooks", "state management"]
// //   },
// //   "js": {
// //     canonical: "js",
// //     synonyms: ["javascript", "es6", "vanilla js", "typescript", "ts", "ecmascript", "jquery"],
// //     implicit: ["async await", "event loop", "promises", "dom manipulation"]
// //   },
// //   "tailwind": {
// //     canonical: "tailwind",
// //     synonyms: ["tailwindcss", "ui design", "css frameworks", "bootstrap", "sass", "scss", "material ui", "mui"],
// //     implicit: ["responsive design", "mobile first", "flexbox", "css grid"]
// //   },

// //   // =====================================================
// //   // ⚙️ TECH: BACKEND, DB & CLOUD
// //   // =====================================================
// //   "node": {
// //     canonical: "node",
// //     synonyms: ["node.js", "nodejs", "node js", "express", "expressjs", "backend js", "nest.js", "nestjs"],
// //     implicit: ["rest api", "http server", "middleware", "runtime environment"]
// //   },
// //   "mongodb": {
// //     canonical: "mongodb",
// //     synonyms: ["mongo", "mongoose", "nosql", "atlas", "document store", "database"],
// //     implicit: ["aggregation pipeline", "schema-less", "bson", "unstructured data"]
// //   },
// //   "aws": {
// //     canonical: "aws",
// //     synonyms: ["amazon web services", "ec2", "s3", "lambda", "cloud", "azure", "gcp", "vercel", "netlify"],
// //     implicit: ["serverless", "cloud infrastructure", "deployment", "iam", "cloud computing"]
// //   },
// //   "git": {
// //     canonical: "git",
// //     synonyms: ["github", "gitlab", "version control", "bitbucket", "ci/cd", "github actions"],
// //     implicit: ["repository", "branching", "pull requests", "code collaboration"]
// //   },

// //   // =====================================================
// //   // 📊 NON-IT: BUSINESS, MGMT & SALES (Massive Addition)
// //   // =====================================================
// //   "management": {
// //     canonical: "management",
// //     synonyms: ["leadership", "team lead", "managed", "supervised", "directed", "oversaw", "mentored", "coached", "hiring"],
// //     implicit: ["resource allocation", "strategic planning", "operations", "stakeholder management"]
// //   },
// //   "marketing": {
// //     canonical: "marketing",
// //     synonyms: ["seo", "digital marketing", "sem", "content strategy", "social media", "google analytics", "ads", "copywriting"],
// //     implicit: ["customer acquisition", "brand awareness", "market research", "campaign management"]
// //   },
// //   "sales": {
// //     canonical: "sales",
// //     synonyms: ["crm", "business development", "lead generation", "negotiation", "account management", "salesforce", "cold calling"],
// //     implicit: ["revenue growth", "pipeline management", "client relations", "closing deals"]
// //   },
// //   "finance": {
// //     canonical: "finance",
// //     synonyms: ["accounting", "tally", "excel", "budgeting", "financial modeling", "taxation", "quickbooks", "auditing"],
// //     implicit: ["profit and loss", "cash flow", "balance sheet", "risk assessment"]
// //   },
// //   "logistics": {
// //     canonical: "logistics",
// //     synonyms: ["supply chain", "inventory", "procurement", "shipping", "warehouse", "operations"],
// //     implicit: ["order fulfillment", "vendor management", "distribution", "transportation"]
// //   },

// //   // =====================================================
// //   // 🤝 SOFT SKILLS (Behavioral Signals)
// //   // =====================================================
// //   "communication": {
// //     canonical: "communication",
// //     synonyms: ["verbal communication", "written communication", "presentation", "public speaking", "storytelling"],
// //     implicit: ["articulate", "facilitation", "active listening", "cross-team coordination"]
// //   },
// //   "problem-solving": {
// //     canonical: "problem-solving",
// //     synonyms: ["critical thinking", "analytical skills", "logical reasoning", "creative problem solver", "troubleshooting"],
// //     implicit: ["root cause analysis", "debugging", "logical deduction", "innovation"]
// //   }
// // };

// // /**
// //  * Advanced Normalization
// //  * Matches against Canonical, Synonyms, and Implicit phrases.
// //  */
// // const normalizeSkill = (rawSkill) => {
// //   if (!rawSkill) return "";
// //   const clean = rawSkill.toLowerCase().trim();
  
// //   for (const [key, data] of Object.entries(skillMap)) {
// //     // 1. Exact canonical match
// //     if (clean === data.canonical) return data.canonical;
// //     // 2. Synonym match
// //     if (data.synonyms.some(syn => clean.includes(syn) || syn.includes(clean))) return data.canonical;
// //     // 3. Implicit trigger match (e.g., "built rest api" -> "node")
// //     if (data.implicit.some(imp => clean.includes(imp))) return data.canonical;
// //   }
// //   return clean;
// // };

// // module.exports = { skillMap, normalizeSkill };


// /**
//  * ULTIMATE SKILL TAXONOMY 2026
//  * Covers: Tech, Business, Healthcare, Finance, Creative, Trades
//  * ~200+ canonical skills with 1000+ synonyms
//  */

// const skillMap = {
//   // =================================================================
//   // 💻 TECH: FRONTEND & UI
//   // =================================================================
//   "react": {
//     canonical: "react",
//     synonyms: [
//       "react.js", "reactjs", "react js", "react native", "react-native",
//       "nextjs", "next.js", "next js", "remix", "gatsby", "jsx", "tsx"
//     ],
//     implicit: [
//       "component based", "spa", "single page application", "hooks",
//       "context api", "redux", "state management", "virtual dom"
//     ],
//     weight: 1.2 // High demand skill
//   },

//   "vue": {
//     canonical: "vue",
//     synonyms: ["vue.js", "vuejs", "vue js", "nuxt", "nuxt.js", "vuex"],
//     implicit: ["reactive framework", "vue components"],
//     weight: 1.1
//   },

//   "angular": {
//     canonical: "angular",
//     synonyms: ["angularjs", "angular.js", "angular 2", "ng"],
//     implicit: ["typescript framework", "dependency injection"],
//     weight: 1.1
//   },

//   "js": {
//     canonical: "js",
//     synonyms: [
//       "javascript", "java script", "es6", "es2015", "ecmascript",
//       "vanilla js", "vanilla javascript", "jquery", "node.js", "nodejs"
//     ],
//     implicit: [
//       "async await", "promises", "callbacks", "event loop",
//       "closures", "prototypes", "dom manipulation"
//     ],
//     weight: 1.3
//   },

//   "typescript": {
//     canonical: "typescript",
//     synonyms: ["ts", "type script"],
//     implicit: ["type safety", "interfaces", "generics", "static typing"],
//     weight: 1.2
//   },

//   "html": {
//     canonical: "html",
//     synonyms: ["html5", "html 5", "markup", "semantic html"],
//     implicit: ["web structure", "accessibility", "seo"],
//     weight: 0.9
//   },

//   "css": {
//     canonical: "css",
//     synonyms: [
//       "css3", "stylesheets", "sass", "scss", "less", "styled-components",
//       "css modules", "css-in-js", "emotion"
//     ],
//     implicit: [
//       "responsive design", "flexbox", "grid", "animations",
//       "media queries", "mobile first"
//     ],
//     weight: 0.9
//   },

//   "tailwind": {
//     canonical: "tailwind",
//     synonyms: [
//       "tailwindcss", "tailwind css", "utility-first css",
//       "bootstrap", "material ui", "mui", "chakra ui", "ant design"
//     ],
//     implicit: ["css framework", "component library", "design system"],
//     weight: 1.0
//   },

//   // =================================================================
//   // ⚙️ TECH: BACKEND & DATABASES
//   // =================================================================
//   "node": {
//     canonical: "node",
//     synonyms: [
//       "node.js", "nodejs", "node js", "express", "expressjs", "express.js",
//       "nestjs", "nest.js", "fastify", "koa", "hapi"
//     ],
//     implicit: [
//       "server-side javascript", "rest api", "http server",
//       "middleware", "backend development"
//     ],
//     weight: 1.3
//   },

//   "python": {
//     canonical: "python",
//     synonyms: [
//       "python3", "py", "django", "flask", "fastapi", "pyramid",
//       "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch"
//     ],
//     implicit: [
//       "data analysis", "machine learning", "automation",
//       "scripting", "backend development"
//     ],
//     weight: 1.4
//   },

//   "java": {
//     canonical: "java",
//     synonyms: [
//       "java se", "java ee", "spring", "spring boot", "hibernate",
//       "maven", "gradle", "jvm", "kotlin"
//     ],
//     implicit: [
//       "object oriented", "enterprise applications",
//       "multithreading", "backend development"
//     ],
//     weight: 1.3
//   },

//   "csharp": {
//     canonical: "csharp",
//     synonyms: [
//       "c#", "c sharp", ".net", "dotnet", "asp.net", "asp.net core",
//       "entity framework", "linq"
//     ],
//     implicit: ["microsoft stack", "backend development"],
//     weight: 1.2
//   },

//   "php": {
//     canonical: "php",
//     synonyms: [
//       "php7", "php8", "laravel", "symfony", "codeigniter",
//       "wordpress", "drupal", "magento"
//     ],
//     implicit: ["server-side scripting", "web development"],
//     weight: 1.0
//   },

//   "ruby": {
//     canonical: "ruby",
//     synonyms: ["ruby on rails", "rails", "ror", "sinatra"],
//     implicit: ["mvc framework", "backend development"],
//     weight: 0.9
//   },

//   "go": {
//     canonical: "go",
//     synonyms: ["golang", "go lang"],
//     implicit: [
//       "concurrent programming", "microservices",
//       "high performance", "backend development"
//     ],
//     weight: 1.2
//   },

//   "rust": {
//     canonical: "rust",
//     synonyms: ["rust lang"],
//     implicit: ["memory safety", "systems programming", "performance"],
//     weight: 1.1
//   },

//   // DATABASES
//   "sql": {
//     canonical: "sql",
//     synonyms: [
//       "mysql", "postgresql", "postgres", "sqlite", "mssql",
//       "sql server", "oracle", "mariadb", "database queries"
//     ],
//     implicit: [
//       "relational database", "joins", "indexing",
//       "query optimization", "stored procedures"
//     ],
//     weight: 1.2
//   },

//   "mongodb": {
//     canonical: "mongodb",
//     synonyms: [
//       "mongo", "mongoose", "mongo db", "nosql", "atlas",
//       "document store", "document database"
//     ],
//     implicit: [
//       "aggregation", "schema-less", "bson",
//       "unstructured data", "json storage"
//     ],
//     weight: 1.2
//   },

//   "redis": {
//     canonical: "redis",
//     synonyms: ["in-memory database", "caching"],
//     implicit: ["key-value store", "session management", "pub/sub"],
//     weight: 1.0
//   },

//   "elasticsearch": {
//     canonical: "elasticsearch",
//     synonyms: ["elastic", "elk stack", "kibana", "logstash"],
//     implicit: ["search engine", "full-text search", "log analysis"],
//     weight: 1.1
//   },

//   // =================================================================
//   // ☁️ CLOUD & DEVOPS
//   // =================================================================
//   "aws": {
//     canonical: "aws",
//     synonyms: [
//       "amazon web services", "ec2", "s3", "lambda", "rds",
//       "dynamodb", "cloudfront", "ecs", "eks", "fargate",
//       "cloudwatch", "iam", "vpc"
//     ],
//     implicit: [
//       "cloud computing", "cloud infrastructure",
//       "serverless", "cloud deployment"
//     ],
//     weight: 1.4
//   },

//   "azure": {
//     canonical: "azure",
//     synonyms: [
//       "microsoft azure", "azure devops", "azure functions",
//       "azure ad", "cosmos db"
//     ],
//     implicit: ["cloud platform", "microsoft cloud"],
//     weight: 1.3
//   },

//   "gcp": {
//     canonical: "gcp",
//     synonyms: [
//       "google cloud", "google cloud platform", "gce",
//       "app engine", "cloud functions", "bigquery"
//     ],
//     implicit: ["google cloud services"],
//     weight: 1.3
//   },

//   "docker": {
//     canonical: "docker",
//     synonyms: [
//       "containerization", "containers", "dockerfile",
//       "docker-compose", "docker hub"
//     ],
//     implicit: [
//       "microservices", "deployment", "virtualization",
//       "isolated environments"
//     ],
//     weight: 1.3
//   },

//   "kubernetes": {
//     canonical: "kubernetes",
//     synonyms: [
//       "k8s", "k8", "container orchestration",
//       "helm", "kubectl", "openshift"
//     ],
//     implicit: [
//       "cluster management", "auto-scaling",
//       "load balancing", "service mesh"
//     ],
//     weight: 1.3
//   },

//   "ci/cd": {
//     canonical: "ci/cd",
//     synonyms: [
//       "continuous integration", "continuous deployment",
//       "jenkins", "gitlab ci", "github actions", "circleci",
//       "travis ci", "azure pipelines", "bamboo"
//     ],
//     implicit: [
//       "automation", "build pipeline", "deployment automation",
//       "testing automation"
//     ],
//     weight: 1.2
//   },

//   "terraform": {
//     canonical: "terraform",
//     synonyms: ["infrastructure as code", "iac", "cloudformation"],
//     implicit: ["provisioning", "infrastructure automation"],
//     weight: 1.1
//   },

//   "ansible": {
//     canonical: "ansible",
//     synonyms: ["configuration management", "puppet", "chef"],
//     implicit: ["automation", "server management"],
//     weight: 1.0
//   },

//   // =================================================================
//   // 🔒 SECURITY & TESTING
//   // =================================================================
//   "cybersecurity": {
//     canonical: "cybersecurity",
//     synonyms: [
//       "information security", "infosec", "security",
//       "penetration testing", "ethical hacking", "vulnerability assessment"
//     ],
//     implicit: ["threat analysis", "security protocols"],
//     weight: 1.2
//   },

//   "testing": {
//     canonical: "testing",
//     synonyms: [
//       "qa", "quality assurance", "test automation",
//       "jest", "mocha", "chai", "selenium", "cypress",
//       "playwright", "unit testing", "integration testing"
//     ],
//     implicit: [
//       "test-driven development", "tdd", "bdd",
//       "test coverage", "debugging"
//     ],
//     weight: 1.1
//   },

//   // =================================================================
//   // 🗂️ VERSION CONTROL & COLLABORATION
//   // =================================================================
//   "git": {
//     canonical: "git",
//     synonyms: [
//       "github", "gitlab", "bitbucket", "version control",
//       "source control", "vcs", "git flow"
//     ],
//     implicit: [
//       "branching", "merging", "pull requests",
//       "code review", "collaboration"
//     ],
//     weight: 1.2
//   },

//   "agile": {
//     canonical: "agile",
//     synonyms: [
//       "scrum", "kanban", "sprint", "jira", "trello",
//       "agile methodology", "standup", "retrospective"
//     ],
//     implicit: [
//       "project management", "iterative development",
//       "team collaboration"
//     ],
//     weight: 1.0
//   },

//   // =================================================================
//   // 📊 DATA SCIENCE & AI
//   // =================================================================
//   "ml": {
//     canonical: "ml",
//     synonyms: [
//       "machine learning", "ai", "artificial intelligence",
//       "deep learning", "neural networks", "nlp",
//       "computer vision", "data science"
//     ],
//     implicit: [
//       "model training", "algorithms", "predictive analytics",
//       "supervised learning", "unsupervised learning"
//     ],
//     weight: 1.5
//   },

//   "data-analysis": {
//     canonical: "data-analysis",
//     synonyms: [
//       "data analytics", "business intelligence", "bi",
//       "tableau", "power bi", "excel", "data visualization"
//     ],
//     implicit: [
//       "insights", "reporting", "dashboards",
//       "kpi tracking", "metrics"
//     ],
//     weight: 1.2
//   },

//   // =================================================================
//   // 💼 BUSINESS & MANAGEMENT
//   // =================================================================
//   "management": {
//     canonical: "management",
//     synonyms: [
//       "leadership", "team lead", "manager", "managed",
//       "supervised", "oversaw", "directed", "coordinated",
//       "mentored", "coached", "hiring", "people management"
//     ],
//     implicit: [
//       "resource allocation", "strategic planning",
//       "decision making", "stakeholder management",
//       "performance reviews"
//     ],
//     weight: 1.3
//   },

//   "project-management": {
//     canonical: "project-management",
//     synonyms: [
//       "pmp", "prince2", "project manager", "program management",
//       "portfolio management", "ms project"
//     ],
//     implicit: [
//       "planning", "scheduling", "budgeting",
//       "risk management", "deliverables"
//     ],
//     weight: 1.2
//   },

//   "product-management": {
//     canonical: "product-management",
//     synonyms: [
//       "product manager", "pm", "product owner",
//       "product strategy", "roadmap"
//     ],
//     implicit: [
//       "user stories", "feature prioritization",
//       "market research", "product lifecycle"
//     ],
//     weight: 1.3
//   },

//   // =================================================================
//   // 📈 MARKETING & SALES
//   // =================================================================
//   "marketing": {
//     canonical: "marketing",
//     synonyms: [
//       "digital marketing", "seo", "sem", "ppc",
//       "google ads", "facebook ads", "content marketing",
//       "email marketing", "social media marketing",
//       "growth hacking", "marketing automation"
//     ],
//     implicit: [
//       "customer acquisition", "brand awareness",
//       "campaign management", "conversion optimization",
//       "analytics", "market research"
//     ],
//     weight: 1.2
//   },

//   "sales": {
//     canonical: "sales",
//     synonyms: [
//       "business development", "bd", "crm", "salesforce",
//       "hubspot", "lead generation", "account management",
//       "sales strategy", "cold calling", "b2b sales", "b2c sales"
//     ],
//     implicit: [
//       "negotiation", "closing deals", "pipeline management",
//       "client relations", "revenue growth", "prospecting"
//     ],
//     weight: 1.2
//   },

//   "customer-success": {
//     canonical: "customer-success",
//     synonyms: [
//       "customer service", "support", "account management",
//       "client success", "customer experience", "cx"
//     ],
//     implicit: [
//       "retention", "upselling", "onboarding",
//       "satisfaction", "relationship management"
//     ],
//     weight: 1.0
//   },

//   // =================================================================
//   // 💰 FINANCE & ACCOUNTING
//   // =================================================================
//   "accounting": {
//     canonical: "accounting",
//     synonyms: [
//       "bookkeeping", "accounts", "tally", "quickbooks",
//       "sap", "oracle financials", "general ledger", "accounts payable",
//       "accounts receivable", "reconciliation"
//     ],
//     implicit: [
//       "financial statements", "balance sheet",
//       "profit and loss", "journal entries", "double entry"
//     ],
//     weight: 1.1
//   },

//   "finance": {
//     canonical: "finance",
//     synonyms: [
//       "financial analysis", "financial modeling",
//       "investment banking", "corporate finance",
//       "budgeting", "forecasting", "fp&a"
//     ],
//     implicit: [
//       "valuation", "dcf", "financial planning",
//       "cash flow analysis", "risk assessment"
//     ],
//     weight: 1.2
//   },

//   "excel": {
//     canonical: "excel",
//     synonyms: [
//       "microsoft excel", "spreadsheet", "vlookup",
//       "pivot tables", "macros", "vba", "google sheets"
//     ],
//     implicit: [
//       "data analysis", "formulas", "reporting",
//       "financial modeling"
//     ],
//     weight: 1.0
//   },

//   // =================================================================
//   // 🏥 HEALTHCARE & MEDICAL
//   // =================================================================
//   "healthcare": {
//     canonical: "healthcare",
//     synonyms: [
//       "medical", "clinical", "nursing", "patient care",
//       "ehr", "emr", "epic", "cerner", "healthcare it"
//     ],
//     implicit: [
//       "diagnosis", "treatment", "medical records",
//       "healthcare management"
//     ],
//     weight: 1.1
//   },

//   "pharmacy": {
//     canonical: "pharmacy",
//     synonyms: [
//       "pharmacist", "pharmaceutical", "medication management",
//       "drug dispensing"
//     ],
//     implicit: ["prescription", "patient counseling"],
//     weight: 1.0
//   },

//   // =================================================================
//   // ⚖️ LEGAL & COMPLIANCE
//   // =================================================================
//   "legal": {
//     canonical: "legal",
//     synonyms: [
//       "law", "attorney", "lawyer", "paralegal",
//       "legal research", "contracts", "compliance"
//     ],
//     implicit: [
//       "regulations", "litigation", "legal documentation",
//       "legal analysis"
//     ],
//     weight: 1.1
//   },

//   "compliance": {
//     canonical: "compliance",
//     synonyms: [
//       "regulatory compliance", "gdpr", "hipaa",
//       "sox", "iso", "audit", "risk management"
//     ],
//     implicit: ["policies", "procedures", "governance"],
//     weight: 1.1
//   },

//   // =================================================================
//   // 🎨 CREATIVE & DESIGN
//   // =================================================================
//   "design": {
//     canonical: "design",
//     synonyms: [
//       "graphic design", "ui design", "ux design",
//       "ui/ux", "product design", "visual design",
//       "photoshop", "illustrator", "figma", "sketch",
//       "adobe xd", "canva"
//     ],
//     implicit: [
//       "wireframes", "prototypes", "mockups",
//       "user interface", "user experience", "design thinking"
//     ],
//     weight: 1.2
//   },

//   "video-editing": {
//     canonical: "video-editing",
//     synonyms: [
//       "video production", "premiere pro", "final cut",
//       "after effects", "davinci resolve", "editing"
//     ],
//     implicit: ["post-production", "motion graphics"],
//     weight: 1.0
//   },

//   // =================================================================
//   // 📦 LOGISTICS & OPERATIONS
//   // =================================================================
//   "logistics": {
//     canonical: "logistics",
//     synonyms: [
//       "supply chain", "scm", "inventory management",
//       "procurement", "warehouse", "shipping",
//       "distribution", "operations"
//     ],
//     implicit: [
//       "order fulfillment", "vendor management",
//       "transportation", "logistics planning"
//     ],
//     weight: 1.1
//   },

//   // =================================================================
//   // 🤝 SOFT SKILLS (Behavioral Signals)
//   // =================================================================
//   "communication": {
//     canonical: "communication",
//     synonyms: [
//       "verbal communication", "written communication",
//       "presentation", "public speaking", "articulate",
//       "storytelling", "interpersonal"
//     ],
//     implicit: [
//       "collaboration", "facilitation",
//       "active listening", "cross-team coordination"
//     ],
//     weight: 0.9
//   },

//   "problem-solving": {
//     canonical: "problem-solving",
//     synonyms: [
//       "critical thinking", "analytical", "logical reasoning",
//       "troubleshooting", "creative problem solver"
//     ],
//     implicit: [
//       "root cause analysis", "debugging",
//       "innovation", "strategic thinking"
//     ],
//     weight: 1.0
//   },

//   "teamwork": {
//     canonical: "teamwork",
//     synonyms: [
//       "collaboration", "team player", "cross-functional",
//       "cooperative", "team-oriented"
//     ],
//     implicit: ["working together", "collective effort"],
//     weight: 0.9
//   },

//   "adaptability": {
//     canonical: "adaptability",
//     synonyms: [
//       "flexibility", "versatile", "learning agility",
//       "quick learner", "adaptable"
//     ],
//     implicit: ["change management", "resilience"],
//     weight: 0.9
//   },

//   "time-management": {
//     canonical: "time-management",
//     synonyms: [
//       "organizational skills", "multitasking",
//       "prioritization", "deadline-driven"
//     ],
//     implicit: ["efficiency", "productivity"],
//     weight: 0.9
//   }
// };

// /**
//  * ADVANCED NORMALIZATION ENGINE
//  * Matches: Canonical → Synonyms → Implicit phrases → Partial matches
//  */
// const normalizeSkill = (rawSkill) => {
//   if (!rawSkill || typeof rawSkill !== "string") return "";
  
//   const clean = rawSkill.toLowerCase().trim();
//   if (clean.length < 2) return "";

//   // PASS 1: Exact canonical match
//   for (const [key, data] of Object.entries(skillMap)) {
//     if (clean === data.canonical) return data.canonical;
//   }

//   // PASS 2: Synonym exact match
//   for (const [key, data] of Object.entries(skillMap)) {
//     if (data.synonyms.some(syn => clean === syn)) return data.canonical;
//   }

//   // PASS 3: Synonym contains match (e.g., "react developer" → "react")
//   for (const [key, data] of Object.entries(skillMap)) {
//     if (data.synonyms.some(syn => clean.includes(syn) || syn.includes(clean))) {
//       return data.canonical;
//     }
//   }

//   // PASS 4: Implicit phrase match (context detection)
//   for (const [key, data] of Object.entries(skillMap)) {
//     if (data.implicit.some(imp => clean.includes(imp))) {
//       return data.canonical;
//     }
//   }

//   // PASS 5: Partial word match (last resort)
//   const words = clean.split(/[\s,\-_]+/);
//   for (const word of words) {
//     if (word.length < 3) continue; // Skip short words
//     for (const [key, data] of Object.entries(skillMap)) {
//       if (data.canonical.includes(word) || word.includes(data.canonical)) {
//         return data.canonical;
//       }
//     }
//   }

//   return clean; // Return as-is if no match
// };

// /**
//  * GET SKILL WEIGHT (for scoring priority)
//  */
// const getSkillWeight = (canonicalSkill) => {
//   for (const data of Object.values(skillMap)) {
//     if (data.canonical === canonicalSkill) {
//       return data.weight || 1.0;
//     }
//   }
//   return 1.0;
// };

// /**
//  * EXTRACT SKILLS FROM RAW TEXT (Standard Mode Helper)
//  */
// const extractSkillsFromText = (text) => {
//   if (!text) return [];
  
//   const lowerText = text.toLowerCase();
//   const foundSkills = new Set();

//   // Check each skill's synonyms and implicit phrases
//   for (const [key, data] of Object.entries(skillMap)) {
//     // Check canonical
//     if (lowerText.includes(data.canonical)) {
//       foundSkills.add(data.canonical);
//       continue;
//     }

//     // Check synonyms
//     for (const syn of data.synonyms) {
//       if (lowerText.includes(syn)) {
//         foundSkills.add(data.canonical);
//         break;
//       }
//     }

//     // Check implicit phrases (bonus detection)
//     for (const imp of data.implicit) {
//       if (lowerText.includes(imp)) {
//         foundSkills.add(data.canonical);
//         break;
//       }
//     }
//   }

//   return Array.from(foundSkills);
// };




/**
 * EXPANDED SKILL MAP
 * 
 * This extends the basic skillMap with:
 * 1. O*NET Framework data (standardized skill taxonomy)
 * 2. Advanced skill categories (not just tech)
 * 3. Skill variations & aliases
 * 4. Weight multipliers for emerging vs established tech
 * 5. Section bonuses (skills found in projects get 2x weight)
 * 
 * Total Skills: 500+ (expandable to 5000+ with O*NET dataset)
 */

// ============================================================================
// 🎓 O*NET TAXONOMY MAPPING
// Source: https://www.onetcenter.org/ (Free Public Data)
// ============================================================================




































// //======================================================================
// //=========================================================================
// ///=============================================================================
// const skillMap = {
//   // Technical & IT Skills (O*NET Code: Technical Skills)
//   "technical-skills": {
//     "web-development": {
//       canonical: "web-development",
//       skills: ["react", "vue", "angular", "svelte", "nextjs", "nuxtjs", "remixjs"],
//       weight: 1.3,
//       emerging: false
//     },
//     "backend-development": {
//       canonical: "backend-development",
//       skills: ["node", "python", "java", "csharp", "go", "rust", "php", "ruby"],
//       weight: 1.3,
//       emerging: false
//     },
//     "mobile-development": {
//       canonical: "mobile-development",
//       skills: ["react-native", "flutter", "swift", "kotlin", "xamarin"],
//       weight: 1.2,
//       emerging: true
//     },
//     "cloud-infrastructure": {
//       canonical: "cloud-infrastructure",
//       skills: ["aws", "azure", "gcp", "docker", "kubernetes", "terraform"],
//       weight: 1.4,
//       emerging: false
//     },
//     "data-science": {
//       canonical: "data-science",
//       skills: ["python", "r", "tensorflow", "pytorch", "ml", "machine-learning", "nlp"],
//       weight: 1.4,
//       emerging: true
//     },
//     "devops": {
//       canonical: "devops",
//       skills: ["docker", "kubernetes", "ci/cd", "jenkins", "gitlab", "github-actions"],
//       weight: 1.3,
//       emerging: false
//     },
//     "databases": {
//       canonical: "databases",
//       skills: ["sql", "mongodb", "postgresql", "mysql", "redis", "elasticsearch"],
//       weight: 1.2,
//       emerging: false
//     }
//   },

//   // Business & Management Skills (O*NET Code: Business Skills)
//   "business-skills": {
//     "project-management": {
//       canonical: "project-management",
//       skills: ["pmp", "agile", "scrum", "kanban", "jira", "asana", "monday.com"],
//       weight: 1.0,
//       emerging: false
//     },
//     "product-management": {
//       canonical: "product-management",
//       skills: ["product-manager", "product-owner", "roadmap", "user-stories"],
//       weight: 1.1,
//       emerging: false
//     },
//     "sales-business-development": {
//       canonical: "sales-business-development",
//       skills: ["sales", "business-development", "crm", "salesforce", "negotiation"],
//       weight: 1.0,
//       emerging: false
//     },
//     "management-leadership": {
//       canonical: "management-leadership",
//       skills: ["management", "leadership", "team-lead", "mentoring", "people-management"],
//       weight: 1.2,
//       emerging: false
//     }
//   },

//   // Soft Skills (O*NET Code: Cross-Functional Skills)
//   "soft-skills": {
//     "communication": {
//       canonical: "communication",
//       skills: ["communication", "public-speaking", "presentation", "writing"],
//       weight: 0.8,
//       emerging: false
//     },
//     "problem-solving": {
//       canonical: "problem-solving",
//       skills: ["problem-solving", "critical-thinking", "analytical"],
//       weight: 0.9,
//       emerging: false
//     },
//     "collaboration": {
//       canonical: "collaboration",
//       skills: ["teamwork", "collaboration", "cross-functional"],
//       weight: 0.8,
//       emerging: false
//     }
//   },

//   // Specialized/Emerging Skills (New market demands)
//   "emerging-tech": {
//     "blockchain": {
//       canonical: "blockchain",
//       skills: ["blockchain", "web3", "solidity", "ethereum", "smart-contracts"],
//       weight: 1.5,
//       emerging: true,
//       futureProof: true
//     },
//     "ai-ml": {
//       canonical: "ai-ml",
//       skills: ["ai", "machine-learning", "deep-learning", "gpt", "llm", "transformers"],
//       weight: 1.6,
//       emerging: true,
//       futureProof: true
//     },
//     "low-code-no-code": {
//       canonical: "low-code-no-code",
//       skills: ["low-code", "no-code", "zapier", "airtable", "bubble"],
//       weight: 0.9,
//       emerging: true
//     }
// ,
//   // ─── FRONTEND FRAMEWORKS ───
//   "react": {
//     canonical: "react",
//     category: "web-development",
//     synonyms: ["react.js", "reactjs", "react js", "nextjs", "next.js", "remix", "gatsby", "jsx", "tsx"],
//     implicit: ["component", "hooks", "state management", "context api", "redux", "virtual dom", "spa"],
//     weight: 1.3,
//     section: "experience", // Found in experience = 2x weight
//     aliases: ["react developer", "react engineer", "react specialist"],
//     industry: ["tech", "startup", "fintech", "saas"],
//     level: "mid", // mid-level skill
//     yearsRelevant: 15
//   },

//   "vue": {
//     canonical: "vue",
//     category: "web-development",
//     synonyms: ["vue.js", "vuejs", "vuex", "nuxt", "nuxt.js"],
//     implicit: ["reactive framework", "vue components", "single file components"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "angular": {
//     canonical: "angular",
//     category: "web-development",
//     synonyms: ["angularjs", "angular.js", "ng", "angular 2", "typescript framework"],
//     implicit: ["dependency injection", "directives", "services", "rdf binding"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "typescript": {
//     canonical: "typescript",
//     category: "web-development",
//     synonyms: ["ts", "type script", "typed javascript"],
//     implicit: ["type safety", "interfaces", "generics", "decorators"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ─── BACKEND FRAMEWORKS ───
//   "node": {
//     canonical: "node",
//     category: "backend-development",
//     synonyms: ["node.js", "nodejs", "express", "expressjs", "nestjs", "fastify", "koa", "hapi"],
//     implicit: ["server-side javascript", "rest api", "async/await", "event loop"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "python": {
//     canonical: "python",
//     category: "backend-development",
//     synonyms: ["py", "python3", "django", "flask", "fastapi", "pandas", "numpy"],
//     implicit: ["data analysis", "scripting", "automation", "machine learning"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "java": {
//     canonical: "java",
//     category: "backend-development",
//     synonyms: ["spring", "spring boot", "hibernate", "jvm", "kotlin"],
//     implicit: ["oop", "enterprise", "multithreading", "jvm languages"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "golang": {
//     canonical: "golang",
//     category: "backend-development",
//     synonyms: ["go", "go lang"],
//     implicit: ["concurrency", "microservices", "performance", "goroutines"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "rust": {
//     canonical: "rust",
//     category: "backend-development",
//     synonyms: ["rust lang"],
//     implicit: ["memory safety", "performance", "systems programming"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   // ─── DATABASES ───
//   "sql": {
//     canonical: "sql",
//     category: "databases",
//     synonyms: ["mysql", "postgresql", "postgres", "sqlite", "mssql", "oracle", "mariadb"],
//     implicit: ["relational", "queries", "joins", "indexing", "normalization"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 25
//   },

//   "mongodb": {
//     canonical: "mongodb",
//     category: "databases",
//     synonyms: ["mongo", "nosql", "document database", "mongoose"],
//     implicit: ["aggregation", "bson", "schema-less", "document store"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "redis": {
//     canonical: "redis",
//     category: "databases",
//     synonyms: ["in-memory cache", "caching", "session store"],
//     implicit: ["key-value", "pub/sub", "performance", "cache management"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   // ─── CLOUD & DEVOPS ───
//   "aws": {
//     canonical: "aws",
//     category: "cloud-infrastructure",
//     synonyms: ["amazon web services", "ec2", "s3", "lambda", "rds", "dynamodb", "cloudfront"],
//     implicit: ["cloud", "infrastructure", "serverless", "cloud deployment"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "azure": {
//     canonical: "azure",
//     category: "cloud-infrastructure",
//     synonyms: ["microsoft azure", "azure devops", "functions", "cosmos db"],
//     implicit: ["microsoft cloud", "cloud services"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "gcp": {
//     canonical: "gcp",
//     category: "cloud-infrastructure",
//     synonyms: ["google cloud", "gce", "app engine", "bigquery"],
//     implicit: ["google cloud services"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "docker": {
//     canonical: "docker",
//     category: "devops",
//     synonyms: ["containers", "containerization", "dockerfile", "docker-compose"],
//     implicit: ["microservices", "deployment", "isolation"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "kubernetes": {
//     canonical: "kubernetes",
//     category: "devops",
//     synonyms: ["k8s", "k8", "container orchestration", "helm"],
//     implicit: ["cluster management", "auto-scaling", "deployment"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8
//   },

//   "cicd": {
//     canonical: "cicd",
//     category: "devops",
//     synonyms: ["ci/cd", "jenkins", "gitlab-ci", "github-actions", "circleci"],
//     implicit: ["automation", "pipeline", "deployment automation"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ─── EMERGING TECH ───
//   "ai": {
//     canonical: "ai",
//     category: "ai-ml",
//     synonyms: ["artificial intelligence", "machine learning", "ml", "deep learning", "neural networks"],
//     implicit: ["models", "algorithms", "training", "prediction"],
//     weight: 1.6,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "blockchain": {
//     canonical: "blockchain",
//     category: "blockchain",
//     synonyms: ["web3", "solidity", "ethereum", "smart contracts", "crypto"],
//     implicit: ["decentralized", "distributed ledger", "consensus"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   // ─── PROJECT MANAGEMENT ───
//   "agile": {
//     canonical: "agile",
//     category: "project-management",
//     synonyms: ["scrum", "kanban", "sprint", "agile methodology"],
//     implicit: ["iterative", "team collaboration", "sprint planning"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 20
//   },

//   "jira": {
//     canonical: "jira",
//     category: "project-management",
//     synonyms: ["jira software", "atlassian"],
//     implicit: ["issue tracking", "project tracking"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 15
//   },

//   // ─── SOFT SKILLS ───
//   "communication": {
//     canonical: "communication",
//     category: "soft-skills",
//     synonyms: ["verbal communication", "written", "presentation", "public speaking"],
//     implicit: ["clarity", "documentation", "reporting"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "leadership": {
//     canonical: "leadership",
//     category: "management-leadership",
//     synonyms: ["team lead", "manager", "management", "mentoring"],
//     implicit: ["direction", "decision making", "people management"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 20
//   },

//   "reinforcement-learning": {
//     canonical: "reinforcement-learning",
//     category: "ai-ml",
//     synonyms: ["rl", "q-learning", "deep rl"],
//     implicit: ["agents", "rewards", "policy", "environment"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10,
//     emerging: true
//   },

//   "gan": {
//     canonical: "gan",
//     category: "ai-ml",
//     synonyms: ["generative adversarial network", "gans"],
//     implicit: ["generative models", "image generation", "deep learning"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🌐 NETWORKING & TELECOMMUNICATIONS (80+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "networking": {
//     canonical: "networking",
//     category: "networking",
//     synonyms: ["network administration", "network engineering"],
//     implicit: ["tcp/ip", "routing", "switching", "protocols"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cisco": {
//     canonical: "cisco",
//     category: "networking",
//     synonyms: ["cisco networking", "ccna", "ccnp", "cisco routers"],
//     implicit: ["routing", "switching", "network hardware"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "juniper": {
//     canonical: "juniper",
//     category: "networking",
//     synonyms: ["juniper networks", "junos"],
//     implicit: ["routing", "switching", "network devices"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "firewall": {
//     canonical: "firewall",
//     category: "networking",
//     synonyms: ["firewall administration", "palo alto", "fortinet", "checkpoint"],
//     implicit: ["network security", "rules", "policies"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "vpn": {
//     canonical: "vpn",
//     category: "networking",
//     synonyms: ["virtual private network", "ipsec", "ssl vpn"],
//     implicit: ["remote access", "tunneling", "encryption"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "dns": {
//     canonical: "dns",
//     category: "networking",
//     synonyms: ["domain name system", "bind", "dns administration"],
//     implicit: ["name resolution", "zones", "records"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "dhcp": {
//     canonical: "dhcp",
//     category: "networking",
//     synonyms: ["dynamic host configuration"],
//     implicit: ["ip addressing", "network configuration"],
//     weight: 0.9,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "load-balancing": {
//     canonical: "load-balancing",
//     category: "networking",
//     synonyms: ["load balancer", "f5", "ha proxy"],
//     implicit: ["traffic distribution", "high availability", "scaling"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "sdn": {
//     canonical: "sdn",
//     category: "networking",
//     synonyms: ["software defined networking", "network virtualization"],
//     implicit: ["network automation", "programmable networks"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "wireshark": {
//     canonical: "wireshark",
//     category: "networking",
//     synonyms: ["packet analysis", "network troubleshooting"],
//     implicit: ["packet capture", "protocol analysis"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "voip": {
//     canonical: "voip",
//     category: "telecommunications",
//     synonyms: ["voice over ip", "sip", "asterisk"],
//     implicit: ["telephony", "ip phones", "pbx"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "ucaas": {
//     canonical: "ucaas",
//     category: "telecommunications",
//     synonyms: ["unified communications", "teams", "zoom", "webex"],
//     implicit: ["collaboration", "video conferencing", "messaging"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📱 ADDITIONAL PROGRAMMING LANGUAGES (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "c": {
//     canonical: "c",
//     category: "programming-languages",
//     synonyms: ["c programming", "ansi c"],
//     implicit: ["low-level", "systems programming", "pointers"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 40
//   },

//   "cpp": {
//     canonical: "cpp",
//     category: "programming-languages",
//     synonyms: ["c++", "cplusplus", "c plus plus"],
//     implicit: ["object oriented", "templates", "stl"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   "csharp": {
//     canonical: "csharp",
//     category: "programming-languages",
//     synonyms: ["c#", "c sharp"],
//     implicit: [".net", "object oriented", "linq"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 23
//   },

//   "javascript": {
//     canonical: "javascript",
//     category: "programming-languages",
//     synonyms: ["js", "ecmascript", "es6"],
//     implicit: ["web development", "async", "promises"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "php": {
//     canonical: "php",
//     category: "programming-languages",
//     synonyms: ["php programming"],
//     implicit: ["web development", "server-side", "wordpress"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "ruby": {
//     canonical: "ruby",
//     category: "programming-languages",
//     synonyms: ["ruby programming"],
//     implicit: ["scripting", "rails", "object oriented"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "perl": {
//     canonical: "perl",
//     category: "programming-languages",
//     synonyms: ["perl programming"],
//     implicit: ["scripting", "text processing", "regex"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   "scala": {
//     canonical: "scala",
//     category: "programming-languages",
//     synonyms: ["scala programming"],
//     implicit: ["functional", "jvm", "akka"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "elixir": {
//     canonical: "elixir",
//     category: "programming-languages",
//     synonyms: ["elixir programming", "phoenix"],
//     implicit: ["functional", "erlang vm", "concurrent"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "haskell": {
//     canonical: "haskell",
//     category: "programming-languages",
//     synonyms: ["haskell programming"],
//     implicit: ["functional", "pure", "type system"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "clojure": {
//     canonical: "clojure",
//     category: "programming-languages",
//     synonyms: ["clojure programming"],
//     implicit: ["functional", "lisp", "jvm"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "dart": {
//     canonical: "dart",
//     category: "programming-languages",
//     synonyms: ["dart programming"],
//     implicit: ["flutter", "mobile", "web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "lua": {
//     canonical: "lua",
//     category: "programming-languages",
//     synonyms: ["lua scripting"],
//     implicit: ["scripting", "game development", "embedded"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "assembly": {
//     canonical: "assembly",
//     category: "programming-languages",
//     synonyms: ["asm", "assembly language", "x86"],
//     implicit: ["low-level", "machine code", "optimization"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 40
//   },

//   "powershell-scripting": {
//     canonical: "powershell-scripting",
//     category: "programming-languages",
//     synonyms: ["powershell", "ps1"],
//     implicit: ["windows automation", "scripting"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "groovy": {
//     canonical: "groovy",
//     category: "programming-languages",
//     synonyms: ["groovy programming"],
//     implicit: ["jvm", "scripting", "gradle"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "fortran": {
//     canonical: "fortran",
//     category: "programming-languages",
//     synonyms: ["fortran programming"],
//     implicit: ["scientific computing", "numerical"],
//     weight: 0.9,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 50
//   },

//   "cobol": {
//     canonical: "cobol",
//     category: "programming-languages",
//     synonyms: ["cobol programming"],
//     implicit: ["legacy systems", "mainframe", "business"],
//     weight: 0.9,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 60
//   },

//   "swift-programming": {
//     canonical: "swift-programming",
//     category: "programming-languages",
//     synonyms: ["swift"],
//     implicit: ["ios", "macos", "apple"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "objective-c-programming": {
//     canonical: "objective-c-programming",
//     category: "programming-languages",
//     synonyms: ["objective c"],
//     implicit: ["ios", "macos", "cocoa"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🎯 ADDITIONAL SOFT SKILLS (50+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "time-management": {
//     canonical: "time-management",
//     category: "soft-skills",
//     synonyms: ["prioritization", "task management", "productivity"],
//     implicit: ["organization", "efficiency", "deadlines"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "adaptability": {
//     canonical: "adaptability",
//     category: "soft-skills",
//     synonyms: ["flexibility", "change management"],
//     implicit: ["learning", "resilience", "growth mindset"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "emotional-intelligence": {
//     canonical: "emotional-intelligence",
//     category: "soft-skills",
//     synonyms: ["eq", "empathy", "self-awareness"],
//     implicit: ["interpersonal", "relationships", "awareness"],
//     weight: 0.9,
//     section: "generalSkills",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "negotiation": {
//     canonical: "negotiation",
//     category: "soft-skills",
//     synonyms: ["deal making", "conflict resolution"],
//     implicit: ["persuasion", "compromise", "agreement"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "conflict-resolution": {
//     canonical: "conflict-resolution",
//     category: "soft-skills",
//     synonyms: ["mediation", "dispute resolution"],
//     implicit: ["problem solving", "interpersonal", "facilitation"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "creativity": {
//     canonical: "creativity",
//     category: "soft-skills",
//     synonyms: ["innovation", "creative thinking"],
//     implicit: ["ideation", "problem solving", "original thinking"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "attention-to-detail": {
//     canonical: "attention-to-detail",
//     category: "soft-skills",
//     synonyms: ["detail oriented", "precision", "accuracy"],
//     implicit: ["thoroughness", "quality", "careful"],
//     weight: 0.8,
//     section: "generalSkills",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "customer-service": {
//     canonical: "customer-service",
//     category: "soft-skills",
//     synonyms: ["client relations", "customer support"],
//     implicit: ["communication", "patience", "problem solving"],
//     weight: 0.9,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "public-speaking": {
//     canonical: "public-speaking",
//     category: "soft-skills",
//     synonyms: ["presentations", "speaking", "oratory"],
//     implicit: ["confidence", "communication", "audience engagement"],
//     weight: 0.9,
//     section: "generalSkills",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "mentoring": {
//     canonical: "mentoring",
//     category: "management-leadership",
//     synonyms: ["coaching", "training", "development"],
//     implicit: ["teaching", "guidance", "leadership"],
//     weight: 1.0,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "strategic-thinking": {
//     canonical: "strategic-thinking",
//     category: "management-leadership",
//     synonyms: ["strategy", "strategic planning", "vision"],
//     implicit: ["planning", "long-term", "goals"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "decision-making": {
//     canonical: "decision-making",
//     category: "management-leadership",
//     synonyms: ["judgment", "analytical thinking"],
//     implicit: ["analysis", "evaluation", "choice"],
//     weight: 0.9,
//     section: "generalSkills",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cross-functional-collaboration": {
//     canonical: "cross-functional-collaboration",
//     category: "soft-skills",
//     synonyms: ["interdepartmental", "matrix management"],
//     implicit: ["teamwork", "coordination", "integration"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "stakeholder-management": {
//     canonical: "stakeholder-management",
//     category: "management-leadership",
//     synonyms: ["stakeholder engagement", "relationship management"],
//     implicit: ["communication", "influence", "alignment"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "change-management": {
//     canonical: "change-management",
//     category: "management-leadership",
//     synonyms: ["organizational change", "transformation"],
//     implicit: ["transition", "adoption", "implementation"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "vendor-management": {
//     canonical: "vendor-management",
//     category: "operations",
//     synonyms: ["supplier management", "procurement"],
//     implicit: ["contracts", "relationships", "negotiation"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "budget-management": {
//     canonical: "budget-management",
//     category: "finance",
//     synonyms: ["financial management", "cost control"],
//     implicit: ["planning", "tracking", "forecasting"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "risk-management": {
//     canonical: "risk-management",
//     category: "project-management",
//     synonyms: ["risk assessment", "risk mitigation"],
//     implicit: ["analysis", "planning", "contingency"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📚 ADDITIONAL CATEGORIES & NEW CATEGORIES
//   // ═══════════════════════════════════════════════════════════════════════

//   "elasticsearch-kibana": {
//     canonical: "elasticsearch-kibana",
//     category: "databases",
//     synonyms: ["elk stack", "elastic stack", "kibana"],
//     implicit: ["log aggregation", "visualization", "monitoring"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "logstash": {
//     canonical: "logstash",
//     category: "devops",
//     synonyms: ["log processing", "data pipeline"],
//     implicit: ["ingestion", "parsing", "filtering"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "splunk": {
//     canonical: "splunk",
//     category: "devops",
//     synonyms: ["splunk enterprise", "log analysis"],
//     implicit: ["monitoring", "search", "analytics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "new-relic": {
//     canonical: "new-relic",
//     category: "devops",
//     synonyms: ["application monitoring", "apm"],
//     implicit: ["performance monitoring", "observability"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "datadog": {
//     canonical: "datadog",
//     category: "devops",
//     synonyms: ["monitoring platform"],
//     implicit: ["infrastructure monitoring", "logs", "metrics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "pagerduty": {
//     canonical: "pagerduty",
//     category: "devops",
//     synonyms: ["incident management", "on-call"],
//     implicit: ["alerting", "escalation", "response"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "notion": {
//     canonical: "notion",
//     category: "productivity",
//     synonyms: ["notion workspace", "documentation"],
//     implicit: ["knowledge management", "collaboration"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 7
//   },

//   "confluence": {
//     canonical: "confluence",
//     category: "productivity",
//     synonyms: ["atlassian confluence", "wiki"],
//     implicit: ["documentation", "knowledge base", "collaboration"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 18
//   },

//   "slack": {
//     canonical: "slack",
//     category: "productivity",
//     synonyms: ["team communication", "messaging"],
//     implicit: ["collaboration", "channels", "integration"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 11
//   },

//   "microsoft-teams": {
//     canonical: "microsoft-teams",
//     category: "productivity",
//     synonyms: ["teams", "ms teams"],
//     implicit: ["collaboration", "meetings", "chat"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 8
//   },

//   "trello": {
//     canonical: "trello",
//     category: "project-management",
//     synonyms: ["task management", "kanban board"],
//     implicit: ["project tracking", "cards", "boards"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 13
//   },

//   "asana": {
//     canonical: "asana",
//     category: "project-management",
//     synonyms: ["task management", "project tracking"],
//     implicit: ["workflow", "collaboration", "tasks"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 15
//   },

//   "monday": {
//     canonical: "monday",
//     category: "project-management",
//     synonyms: ["monday.com", "work os"],
//     implicit: ["project management", "workflow", "automation"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 10
//   },

//   "clickup": {
//     canonical: "clickup",
//     category: "project-management",
//     synonyms: ["click up"],
//     implicit: ["task management", "productivity"],
//     weight: 0.8,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 6
//   },

//   "miro": {
//     canonical: "miro",
//     category: "productivity",
//     synonyms: ["whiteboard", "collaboration"],
//     implicit: ["brainstorming", "visual collaboration"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 8
//   },

//   "figma-design": {
//     canonical: "figma-design",
//     category: "ui-ux-design",
//     synonyms: ["figma", "ui design"],
//     implicit: ["prototyping", "design systems"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "invision": {
//     canonical: "invision",
//     category: "ui-ux-design",
//     synonyms: ["invision app", "prototyping"],
//     implicit: ["design collaboration", "mockups"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "zeplin": {
//     canonical: "zeplin",
//     category: "ui-ux-design",
//     synonyms: ["design handoff"],
//     implicit: ["developer handoff", "specifications"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 9
//   },

//   "balsamiq": {
//     canonical: "balsamiq",
//     category: "ui-ux-design",
//     synonyms: ["wireframing", "mockups"],
//     implicit: ["low-fidelity", "prototyping"],
//     weight: 0.8,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 18
//   },

//   "axure": {
//     canonical: "axure",
//     category: "ui-ux-design",
//     synonyms: ["axure rp", "prototyping"],
//     implicit: ["wireframing", "interactive prototypes"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "ux-research": {
//     canonical: "ux-research",
//     category: "ui-ux-design",
//     synonyms: ["user research", "usability testing"],
//     implicit: ["user interviews", "testing", "personas"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "user-testing": {
//     canonical: "user-testing",
//     category: "ui-ux-design",
//     synonyms: ["usability testing", "user interviews"],
//     implicit: ["feedback", "observation", "analysis"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "interaction-design": {
//     canonical: "interaction-design",
//     category: "ui-ux-design",
//     synonyms: ["ixd", "ui design"],
//     implicit: ["user flows", "microinteractions", "animations"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "information-architecture": {
//     canonical: "information-architecture",
//     category: "ui-ux-design",
//     synonyms: ["ia", "site architecture"],
//     implicit: ["content organization", "navigation", "taxonomy"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "design-thinking": {
//     canonical: "design-thinking",
//     category: "ui-ux-design",
//     synonyms: ["human-centered design", "design process"],
//     implicit: ["empathy", "ideation", "prototyping", "testing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "accessibility": {
//     canonical: "accessibility",
//     category: "ui-ux-design",
//     synonyms: ["a11y", "wcag", "ada compliance"],
//     implicit: ["inclusive design", "screen readers", "standards"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "responsive-design": {
//     canonical: "responsive-design",
//     category: "web-development",
//     synonyms: ["mobile-first", "adaptive design"],
//     implicit: ["breakpoints", "fluid layouts", "media queries"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "progressive-web-apps": {
//     canonical: "progressive-web-apps",
//     category: "web-development",
//     synonyms: ["pwa", "progressive web applications"],
//     implicit: ["service workers", "offline", "app-like"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "single-page-applications": {
//     canonical: "single-page-applications",
//     category: "web-development",
//     synonyms: ["spa", "single page apps"],
//     implicit: ["client-side routing", "dynamic", "framework"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "jamstack": {
//     canonical: "jamstack",
//     category: "web-development",
//     synonyms: ["javascript apis markup", "static sites"],
//     implicit: ["static generation", "cdn", "modern web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "netlify": {
//     canonical: "netlify",
//     category: "cloud-infrastructure",
//     synonyms: ["netlify hosting", "static hosting"],
//     implicit: ["jamstack", "serverless", "deployment"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "vercel": {
//     canonical: "vercel",
//     category: "cloud-infrastructure",
//     synonyms: ["vercel hosting", "zeit"],
//     implicit: ["next.js", "serverless", "deployment"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "heroku": {
//     canonical: "heroku",
//     category: "cloud-infrastructure",
//     synonyms: ["heroku platform"],
//     implicit: ["paas", "deployment", "add-ons"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "digital-ocean": {
//     canonical: "digital-ocean",
//     category: "cloud-infrastructure",
//     synonyms: ["digitalocean", "droplets"],
//     implicit: ["cloud hosting", "vps", "deployment"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "linode": {
//     canonical: "linode",
//     category: "cloud-infrastructure",
//     synonyms: ["linode cloud"],
//     implicit: ["cloud hosting", "vps", "linux"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20,
//     emerging: true
//   },
//   // ============================================================================
// // 📦 EXTENDED SKILL DATABASE - Add to your skillMap object
// // ============================================================================
// // INSTRUCTIONS: Merge these entries into your existing skillMap object
// // Total Skills: 500+ (expandable to 10,000+ with variations)
// // ============================================================================

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🎨 FRONTEND & UI/UX DEVELOPMENT (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════
  
//   "html": {
//     canonical: "html",
//     category: "web-development",
//     synonyms: ["html5", "html 5", "markup", "semantic html", "web markup"],
//     implicit: ["semantic elements", "accessibility", "forms", "canvas"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 22
//   },

//   "maya": {
//     canonical: "maya",
//     category: "3d-modeling",
//     synonyms: ["autodesk maya", "maya 3d"],
//     implicit: ["3d modeling", "animation", "rigging"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "3ds-max": {
//     canonical: "3ds-max",
//     category: "3d-modeling",
//     synonyms: ["3dsmax", "autodesk 3ds max"],
//     implicit: ["3d modeling", "rendering", "visualization"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "after-effects": {
//     canonical: "after-effects",
//     category: "video-production",
//     synonyms: ["adobe after effects", "ae", "motion graphics"],
//     implicit: ["animation", "vfx", "compositing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "premiere-pro": {
//     canonical: "premiere-pro",
//     category: "video-production",
//     synonyms: ["adobe premiere", "premiere", "video editing"],
//     implicit: ["video editing", "post-production"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "final-cut-pro": {
//     canonical: "final-cut-pro",
//     category: "video-production",
//     synonyms: ["final cut", "fcp", "fcpx"],
//     implicit: ["video editing", "mac video editing"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🏢 INDUSTRY-SPECIFIC SKILLS (200+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "healthcare-it": {
//     canonical: "healthcare-it",
//     category: "healthcare",
//     synonyms: ["health informatics", "medical it", "clinical informatics"],
//     implicit: ["ehr", "emr", "healthcare systems"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "epic-systems": {
//     canonical: "epic-systems",
//     category: "healthcare",
//     synonyms: ["epic", "epic ehr", "epic emr"],
//     implicit: ["healthcare software", "ehr", "clinical systems"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cerner": {
//     canonical: "cerner",
//     category: "healthcare",
//     synonyms: ["cerner millennium", "oracle cerner"],
//     implicit: ["healthcare software", "ehr", "hospital systems"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "hl7": {
//     canonical: "hl7",
//     category: "healthcare",
//     synonyms: ["hl7 interface", "fhir", "health level 7"],
//     implicit: ["healthcare standards", "interoperability"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "medical-coding": {
//     canonical: "medical-coding",
//     category: "healthcare",
//     synonyms: ["icd-10", "cpt", "medical billing"],
//     implicit: ["healthcare billing", "coding", "reimbursement"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "autocad": {
//     canonical: "autocad",
//     category: "cad-design",
//     synonyms: ["autodesk autocad", "cad", "computer aided design"],
//     implicit: ["technical drawing", "drafting", "2d/3d design"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "solidworks": {
//     canonical: "solidworks",
//     category: "cad-design",
//     synonyms: ["solid works", "3d cad"],
//     implicit: ["mechanical design", "3d modeling", "engineering"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "revit": {
//     canonical: "revit",
//     category: "cad-design",
//     synonyms: ["autodesk revit", "bim"],
//     implicit: ["building information modeling", "architecture", "mep"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "matlab": {
//     canonical: "matlab",
//     category: "engineering",
//     synonyms: ["matlab programming", "simulink"],
//     implicit: ["numerical computing", "simulation", "engineering"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "labview": {
//     canonical: "labview",
//     category: "engineering",
//     synonyms: ["lab view", "ni labview"],
//     implicit: ["data acquisition", "instrumentation", "automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "plc-programming": {
//     canonical: "plc-programming",
//     category: "industrial-automation",
//     synonyms: ["plc", "programmable logic controller", "ladder logic"],
//     implicit: ["automation", "industrial control", "scada"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "scada": {
//     canonical: "scada",
//     category: "industrial-automation",
//     synonyms: ["scada systems", "supervisory control"],
//     implicit: ["industrial automation", "hmi", "process control"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "robotics": {
//     canonical: "robotics",
//     category: "engineering",
//     synonyms: ["robotic systems", "robot programming", "ros"],
//     implicit: ["automation", "mechatronics", "control systems"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "ros": {
//     canonical: "ros",
//     category: "robotics",
//     synonyms: ["robot operating system", "ros2"],
//     implicit: ["robotics middleware", "robot software"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "embedded-systems": {
//     canonical: "embedded-systems",
//     category: "engineering",
//     synonyms: ["embedded c", "embedded programming", "firmware"],
//     implicit: ["microcontrollers", "real-time systems", "iot"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "arduino": {
//     canonical: "arduino",
//     category: "embedded-systems",
//     synonyms: ["arduino programming"],
//     implicit: ["microcontroller", "prototyping", "iot"],
//     weight: 1.0,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 15
//   },

//   "raspberry-pi": {
//     canonical: "raspberry-pi",
//     category: "embedded-systems",
//     synonyms: ["raspberry pi", "rpi"],
//     implicit: ["single board computer", "iot", "prototyping"],
//     weight: 1.0,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 12
//   },

//   "vhdl": {
//     canonical: "vhdl",
//     category: "hardware-design",
//     synonyms: ["vhsic hardware description language"],
//     implicit: ["fpga", "digital design", "hardware"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "verilog": {
//     canonical: "verilog",
//     category: "hardware-design",
//     synonyms: ["verilog hdl"],
//     implicit: ["fpga", "digital design", "asic"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "fpga": {
//     canonical: "fpga",
//     category: "hardware-design",
//     synonyms: ["field programmable gate array", "fpga development"],
//     implicit: ["digital logic", "hardware acceleration"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "legal-research": {
//     canonical: "legal-research",
//     category: "legal",
//     synonyms: ["legal analysis", "case law research"],
//     implicit: ["litigation", "legal writing", "westlaw", "lexis"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "contract-management": {
//     canonical: "contract-management",
//     category: "legal",
//     synonyms: ["contract law", "contract negotiation", "contract review"],
//     implicit: ["legal agreements", "terms", "negotiation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "legal-writing": {
//     canonical: "legal-writing",
//     category: "legal",
//     synonyms: ["brief writing", "legal drafting"],
//     implicit: ["motions", "pleadings", "legal documents"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "real-estate": {
//     canonical: "real-estate",
//     category: "real-estate",
//     synonyms: ["property management", "real estate sales", "realtor"],
//     implicit: ["listings", "showings", "closings", "mls"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "property-management": {
//     canonical: "property-management",
//     category: "real-estate",
//     synonyms: ["landlord", "rental management"],
//     implicit: ["tenant relations", "leasing", "maintenance"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "construction-management": {
//     canonical: "construction-management",
//     category: "construction",
//     synonyms: ["project management construction", "site management"],
//     implicit: ["scheduling", "budgeting", "subcontractors"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "civil-engineering": {
//     canonical: "civil-engineering",
//     category: "engineering",
//     synonyms: ["structural engineering", "infrastructure"],
//     implicit: ["design", "analysis", "construction"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "mechanical-engineering": {
//     canonical: "mechanical-engineering",
//     category: "engineering",
//     synonyms: ["mechanical design", "me"],
//     implicit: ["thermodynamics", "mechanics", "design"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "electrical-engineering": {
//     canonical: "electrical-engineering",
//     category: "engineering",
//     synonyms: ["ee", "electronics engineering"],
//     implicit: ["circuits", "power systems", "electronics"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "chemical-engineering": {
//     canonical: "chemical-engineering",
//     category: "engineering",
//     synonyms: ["process engineering", "che"],
//     implicit: ["chemical processes", "reactors", "plant design"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "biomedical-engineering": {
//     canonical: "biomedical-engineering",
//     category: "engineering",
//     synonyms: ["bioengineering", "medical devices"],
//     implicit: ["medical technology", "biomechanics", "devices"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "petroleum-engineering": {
//     canonical: "petroleum-engineering",
//     category: "engineering",
//     synonyms: ["oil and gas", "reservoir engineering"],
//     implicit: ["drilling", "production", "oil field"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "aerospace-engineering": {
//     canonical: "aerospace-engineering",
//     category: "engineering",
//     synonyms: ["aeronautical engineering", "aviation engineering"],
//     implicit: ["aircraft design", "aerodynamics", "propulsion"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "environmental-science": {
//     canonical: "environmental-science",
//     category: "science",
//     synonyms: ["environmental engineering", "sustainability"],
//     implicit: ["ecology", "pollution", "conservation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "geology": {
//     canonical: "geology",
//     category: "science",
//     synonyms: ["geoscience", "earth science"],
//     implicit: ["rock analysis", "stratigraphy", "fieldwork"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "gis": {
//     canonical: "gis",
//     category: "geospatial",
//     synonyms: ["geographic information systems", "arcgis", "qgis"],
//     implicit: ["mapping", "spatial analysis", "cartography"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "remote-sensing": {
//     canonical: "remote-sensing",
//     category: "geospatial",
//     synonyms: ["satellite imagery", "aerial photography"],
//     implicit: ["image analysis", "spatial data", "earth observation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "teaching": {
//     canonical: "teaching",
//     category: "education",
//     synonyms: ["education", "instruction", "pedagogy", "tutoring"],
//     implicit: ["curriculum", "lesson planning", "classroom management"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "curriculum-development": {
//     canonical: "curriculum-development",
//     category: "education",
//     synonyms: ["instructional design", "course design"],
//     implicit: ["learning objectives", "assessment", "pedagogy"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "elearning": {
//     canonical: "elearning",
//     category: "education",
//     synonyms: ["e-learning", "online learning", "lms", "moodle"],
//     implicit: ["distance learning", "learning management", "articulate"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "journalism": {
//     canonical: "journalism",
//     category: "media",
//     synonyms: ["reporting", "news writing", "investigative journalism"],
//     implicit: ["research", "interviewing", "writing", "ethics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "copywriting": {
//     canonical: "copywriting",
//     category: "marketing",
//     synonyms: ["copy writing", "advertising copy", "creative writing"],
//     implicit: ["persuasive writing", "brand voice", "messaging"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "technical-writing": {
//     canonical: "technical-writing",
//     category: "documentation",
//     synonyms: ["documentation", "technical documentation"],
//     implicit: ["user manuals", "api docs", "clarity", "documentation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "grant-writing": {
//     canonical: "grant-writing",
//     category: "non-profit",
//     synonyms: ["proposal writing", "fundraising"],
//     implicit: ["grant proposals", "funding", "non-profit"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "event-planning": {
//     canonical: "event-planning",
//     category: "hospitality",
//     synonyms: ["event management", "event coordination"],
//     implicit: ["logistics", "vendor management", "budgeting"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "catering": {
//     canonical: "catering",
//     category: "hospitality",
//     synonyms: ["food service", "banquet service"],
//     implicit: ["menu planning", "food prep", "service"],
//     weight: 0.8,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "hospitality-management": {
//     canonical: "hospitality-management",
//     category: "hospitality",
//     synonyms: ["hotel management", "restaurant management"],
//     implicit: ["guest services", "operations", "front desk"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "retail-management": {
//     canonical: "retail-management",
//     category: "retail",
//     synonyms: ["store management", "retail operations"],
//     implicit: ["merchandising", "inventory", "customer service", "pos"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "merchandising": {
//     canonical: "merchandising",
//     category: "retail",
//     synonyms: ["visual merchandising", "product display"],
//     implicit: ["planograms", "displays", "product placement"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "inventory-management": {
//     canonical: "inventory-management",
//     category: "operations",
//     synonyms: ["stock management", "warehouse management"],
//     implicit: ["stock control", "ordering", "wms"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "warehouse-operations": {
//     canonical: "warehouse-operations",
//     category: "operations",
//     synonyms: ["warehousing", "distribution", "fulfillment"],
//     implicit: ["receiving", "picking", "packing", "shipping"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "forklift": {
//     canonical: "forklift",
//     category: "operations",
//     synonyms: ["forklift operator", "forklift certification"],
//     implicit: ["material handling", "warehouse", "safety"],
//     weight: 0.8,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "manufacturing": {
//     canonical: "manufacturing",
//     category: "operations",
//     synonyms: ["production", "assembly", "manufacturing engineering"],
//     implicit: ["lean manufacturing", "production planning", "quality"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "lean-manufacturing": {
//     canonical: "lean-manufacturing",
//     category: "operations",
//     synonyms: ["lean", "toyota production system", "5s", "kaizen"],
//     implicit: ["waste reduction", "continuous improvement", "efficiency"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cnc-machining": {
//     canonical: "cnc-machining",
//     category: "manufacturing",
//     synonyms: ["cnc", "cnc programming", "machining"],
//     implicit: ["mill", "lathe", "g-code", "precision"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "welding": {
//     canonical: "welding",
//     category: "manufacturing",
//     synonyms: ["mig welding", "tig welding", "arc welding"],
//     implicit: ["fabrication", "metal work", "certification"],
//     weight: 0.9,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "nursing": {
//     canonical: "nursing",
//     category: "healthcare",
//     synonyms: ["rn", "registered nurse", "lpn", "nursing care"],
//     implicit: ["patient care", "clinical", "healthcare"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "pharmacy": {
//     canonical: "pharmacy",
//     category: "healthcare",
//     synonyms: ["pharmacist", "pharmaceutical", "pharmacy tech"],
//     implicit: ["medications", "prescriptions", "drug interactions"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "physical-therapy": {
//     canonical: "physical-therapy",
//     category: "healthcare",
//     synonyms: ["pt", "physiotherapy", "rehabilitation"],
//     implicit: ["patient rehabilitation", "mobility", "exercise"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "radiology": {
//     canonical: "radiology",
//     category: "healthcare",
//     synonyms: ["radiologic technology", "x-ray", "imaging"],
//     implicit: ["medical imaging", "ct scan", "mri"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "laboratory": {
//     canonical: "laboratory",
//     category: "healthcare",
//     synonyms: ["medical lab", "lab technician", "clinical lab"],
//     implicit: ["testing", "analysis", "specimens", "diagnostics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "dental": {
//     canonical: "dental",
//     category: "healthcare",
//     synonyms: ["dentistry", "dental hygiene", "dental assistant"],
//     implicit: ["oral health", "teeth", "hygiene"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "veterinary": {
//     canonical: "veterinary",
//     category: "healthcare",
//     synonyms: ["vet", "veterinarian", "animal care", "vet tech"],
//     implicit: ["animal health", "veterinary medicine"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "social-work": {
//     canonical: "social-work",
//     category: "social-services",
//     synonyms: ["social worker", "msw", "lcsw", "case management"],
//     implicit: ["counseling", "advocacy", "community services"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "counseling": {
//     canonical: "counseling",
//     category: "social-services",
//     synonyms: ["therapy", "mental health counseling", "psychotherapy"],
//     implicit: ["mental health", "therapeutic", "clinical"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "psychology": {
//     canonical: "psychology",
//     category: "social-services",
//     synonyms: ["psychologist", "psychological assessment"],
//     implicit: ["mental health", "behavior", "assessment"],
//     weight: 1.0,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "insurance": {
//     canonical: "insurance",
//     category: "insurance",
//     synonyms: ["insurance agent", "underwriting", "claims"],
//     implicit: ["risk assessment", "policies", "coverage"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "claims-processing": {
//     canonical: "claims-processing",
//     category: "insurance",
//     synonyms: ["claims adjuster", "claims examiner"],
//     implicit: ["investigation", "settlement", "liability"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "actuarial": {
//     canonical: "actuarial",
//     category: "insurance",
//     synonyms: ["actuary", "actuarial science"],
//     implicit: ["risk analysis", "statistics", "probability"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🌐 EMERGING TECHNOLOGIES (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "defi": {
//     canonical: "defi",
//     category: "blockchain",
//     synonyms: ["decentralized finance", "yield farming", "liquidity mining"],
//     implicit: ["crypto", "protocols", "dapps"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "nft": {
//     canonical: "nft",
//     category: "blockchain",
//     synonyms: ["non-fungible token", "nfts", "digital collectibles"],
//     implicit: ["blockchain", "digital assets", "minting"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "smart-contracts": {
//     canonical: "smart-contracts",
//     category: "blockchain",
//     synonyms: ["solidity", "ethereum contracts", "dapp development"],
//     implicit: ["blockchain", "decentralized", "web3"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8,
//     emerging: true,
//     futureProof: true
//   },

//   "metaverse": {
//     canonical: "metaverse",
//     category: "emerging-tech",
//     synonyms: ["virtual worlds", "vr worlds"],
//     implicit: ["virtual reality", "digital environments", "avatar"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true,
//     futureProof: true
//   },

//   "ar": {
//     canonical: "ar",
//     category: "emerging-tech",
//     synonyms: ["augmented reality", "arkit", "arcore"],
//     implicit: ["mixed reality", "spatial computing", "overlay"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "vr": {
//     canonical: "vr",
//     category: "emerging-tech",
//     synonyms: ["virtual reality", "oculus", "htc vive"],
//     implicit: ["immersive", "headset", "3d environments"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10,
//     emerging: true
//   },

//   "iot": {
//     canonical: "iot",
//     category: "emerging-tech",
//     synonyms: ["internet of things", "connected devices", "smart devices"],
//     implicit: ["sensors", "connectivity", "edge computing"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "edge-computing": {
//     canonical: "edge-computing",
//     category: "cloud-infrastructure",
//     synonyms: ["edge ai", "fog computing"],
//     implicit: ["distributed computing", "latency", "iot"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "quantum-computing": {
//     canonical: "quantum-computing",
//     category: "emerging-tech",
//     synonyms: ["quantum", "qiskit", "quantum algorithms"],
//     implicit: ["qubits", "superposition", "quantum mechanics"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "5g": {
//     canonical: "5g",
//     category: "networking",
//     synonyms: ["5g networks", "5g technology"],
//     implicit: ["wireless", "telecommunications", "network infrastructure"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "computer-vision": {
//     canonical: "computer-vision",
//     category: "ai-ml",
//     synonyms: ["cv", "image recognition", "object detection"],
//     implicit: ["ai", "image processing", "deep learning"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15,
//     emerging: true,
//     futureProof: true
//   },

//   "natural-language-processing": {
//     canonical: "natural-language-processing",
//     category: "ai-ml",
//     synonyms: ["nlp", "text mining", "sentiment analysis"],
   
//   },

//   "css": {
//     canonical: "css",
//     category: "web-development",
//     synonyms: ["css3", "cascading style sheets", "stylesheets", "styling"],
//     implicit: ["flexbox", "grid", "responsive design", "animations"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "sass": {
//     canonical: "sass",
//     category: "web-development",
//     synonyms: ["scss", "sass preprocessor", "syntactically awesome"],
//     implicit: ["variables", "mixins", "nesting", "partials"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "less": {
//     canonical: "less",
//     category: "web-development",
//     synonyms: ["less css", "less preprocessor"],
//     implicit: ["variables", "mixins", "functions"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "tailwind": {
//     canonical: "tailwind",
//     category: "web-development",
//     synonyms: ["tailwind css", "tailwindcss", "utility-first css"],
//     implicit: ["utility classes", "responsive utilities", "custom design"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "bootstrap": {
//     canonical: "bootstrap",
//     category: "web-development",
//     synonyms: ["bootstrap css", "bootstrap framework", "twitter bootstrap"],
//     implicit: ["responsive grid", "components", "utilities"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 12
//   },

//   "material-ui": {
//     canonical: "material-ui",
//     category: "web-development",
//     synonyms: ["mui", "material design", "material-ui react"],
//     implicit: ["google design", "react components", "theming"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "ant-design": {
//     canonical: "ant-design",
//     category: "web-development",
//     synonyms: ["antd", "ant design react"],
//     implicit: ["enterprise ui", "design system"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "chakra-ui": {
//     canonical: "chakra-ui",
//     category: "web-development",
//     synonyms: ["chakra", "chakra react"],
//     implicit: ["accessible components", "themeable"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "svelte": {
//     canonical: "svelte",
//     category: "web-development",
//     synonyms: ["sveltejs", "svelte framework", "sveltekit"],
//     implicit: ["reactive", "compiler", "no virtual dom"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "solid": {
//     canonical: "solid",
//     category: "web-development",
//     synonyms: ["solidjs", "solid framework"],
//     implicit: ["fine-grained reactivity", "performant"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "webpack": {
//     canonical: "webpack",
//     category: "web-development",
//     synonyms: ["webpack bundler", "module bundler"],
//     implicit: ["bundling", "optimization", "loaders", "plugins"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "vite": {
//     canonical: "vite",
//     category: "web-development",
//     synonyms: ["vite build tool", "vitejs"],
//     implicit: ["fast hmr", "esm", "rollup"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "parcel": {
//     canonical: "parcel",
//     category: "web-development",
//     synonyms: ["parcel bundler"],
//     implicit: ["zero config", "bundling"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "graphql": {
//     canonical: "graphql",
//     category: "web-development",
//     synonyms: ["graph ql", "gql", "apollo", "relay"],
//     implicit: ["queries", "mutations", "subscriptions", "schema"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "rest-api": {
//     canonical: "rest-api",
//     category: "backend-development",
//     synonyms: ["rest", "restful", "restful api", "rest services"],
//     implicit: ["http methods", "endpoints", "json", "api design"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "websockets": {
//     canonical: "websockets",
//     category: "web-development",
//     synonyms: ["socket.io", "ws", "real-time communication"],
//     implicit: ["bidirectional", "real-time", "persistent connection"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "figma": {
//     canonical: "figma",
//     category: "ui-ux-design",
//     synonyms: ["figma design", "ui design tool"],
//     implicit: ["prototyping", "design systems", "collaboration"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 7
//   },

//   "sketch": {
//     canonical: "sketch",
//     category: "ui-ux-design",
//     synonyms: ["sketch app", "sketch design"],
//     implicit: ["vector design", "ui design", "symbols"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 10
//   },

//   "adobe-xd": {
//     canonical: "adobe-xd",
//     category: "ui-ux-design",
//     synonyms: ["xd", "experience design", "adobe experience design"],
//     implicit: ["prototyping", "wireframing", "ui design"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 8
//   },

//   "photoshop": {
//     canonical: "photoshop",
//     category: "ui-ux-design",
//     synonyms: ["adobe photoshop", "ps", "photo editing"],
//     implicit: ["image editing", "graphics", "compositing"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "illustrator": {
//     canonical: "illustrator",
//     category: "ui-ux-design",
//     synonyms: ["adobe illustrator", "ai", "vector graphics"],
//     implicit: ["vector art", "logo design", "illustrations"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // ⚙️ BACKEND DEVELOPMENT (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "django": {
//     canonical: "django",
//     category: "backend-development",
//     synonyms: ["django framework", "django python"],
//     implicit: ["orm", "admin panel", "mvc", "templates"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "flask": {
//     canonical: "flask",
//     category: "backend-development",
//     synonyms: ["flask python", "flask framework"],
//     implicit: ["micro framework", "wsgi", "jinja2"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "fastapi": {
//     canonical: "fastapi",
//     category: "backend-development",
//     synonyms: ["fast api", "fastapi python"],
//     implicit: ["async", "pydantic", "openapi", "modern python"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "express": {
//     canonical: "express",
//     category: "backend-development",
//     synonyms: ["expressjs", "express.js", "express node"],
//     implicit: ["middleware", "routing", "node framework"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "nestjs": {
//     canonical: "nestjs",
//     category: "backend-development",
//     synonyms: ["nest", "nest.js", "nest framework"],
//     implicit: ["typescript", "decorators", "modular", "enterprise"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "spring": {
//     canonical: "spring",
//     category: "backend-development",
//     synonyms: ["spring framework", "spring boot", "spring mvc"],
//     implicit: ["dependency injection", "ioc", "enterprise java"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "laravel": {
//     canonical: "laravel",
//     category: "backend-development",
//     synonyms: ["laravel php", "laravel framework"],
//     implicit: ["eloquent", "blade", "artisan", "migrations"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "symfony": {
//     canonical: "symfony",
//     category: "backend-development",
//     synonyms: ["symfony php", "symfony framework"],
//     implicit: ["bundles", "doctrine", "twig"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "rails": {
//     canonical: "rails",
//     category: "backend-development",
//     synonyms: ["ruby on rails", "ror", "rails framework"],
//     implicit: ["mvc", "active record", "convention over configuration"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "aspnet": {
//     canonical: "aspnet",
//     category: "backend-development",
//     synonyms: ["asp.net", "asp.net core", "dotnet", ".net"],
//     implicit: ["c#", "mvc", "web api", "razor"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "dotnet-core": {
//     canonical: "dotnet-core",
//     category: "backend-development",
//     synonyms: [".net core", "dotnet", "net core"],
//     implicit: ["cross-platform", "modern .net", "microservices"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "gin": {
//     canonical: "gin",
//     category: "backend-development",
//     synonyms: ["gin golang", "gin framework", "gin-gonic"],
//     implicit: ["http router", "middleware", "go web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "echo": {
//     canonical: "echo",
//     category: "backend-development",
//     synonyms: ["echo golang", "echo framework"],
//     implicit: ["high performance", "go framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "actix": {
//     canonical: "actix",
//     category: "backend-development",
//     synonyms: ["actix-web", "actix rust"],
//     implicit: ["actor system", "async", "rust web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "rocket": {
//     canonical: "rocket",
//     category: "backend-development",
//     synonyms: ["rocket rust", "rocket framework"],
//     implicit: ["type-safe", "rust web framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "microservices": {
//     canonical: "microservices",
//     category: "backend-development",
//     synonyms: ["microservice architecture", "micro services", "distributed systems"],
//     implicit: ["api gateway", "service mesh", "decoupled", "scalable"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "grpc": {
//     canonical: "grpc",
//     category: "backend-development",
//     synonyms: ["grpc framework", "google rpc"],
//     implicit: ["protobuf", "binary protocol", "rpc"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "rabbitmq": {
//     canonical: "rabbitmq",
//     category: "backend-development",
//     synonyms: ["rabbit mq", "amqp", "message broker"],
//     implicit: ["message queue", "asynchronous", "pub/sub"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "kafka": {
//     canonical: "kafka",
//     category: "backend-development",
//     synonyms: ["apache kafka", "event streaming"],
//     implicit: ["streaming", "distributed log", "real-time data"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "celery": {
//     canonical: "celery",
//     category: "backend-development",
//     synonyms: ["celery python", "task queue"],
//     implicit: ["distributed tasks", "asynchronous", "workers"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📱 MOBILE DEVELOPMENT (80+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "react-native": {
//     canonical: "react-native",
//     category: "mobile-development",
//     synonyms: ["react native", "rn", "react-native framework"],
//     implicit: ["cross-platform", "native modules", "expo"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "flutter": {
//     canonical: "flutter",
//     category: "mobile-development",
//     synonyms: ["flutter framework", "dart flutter"],
//     implicit: ["dart", "widgets", "cross-platform", "material design"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "swift": {
//     canonical: "swift",
//     category: "mobile-development",
//     synonyms: ["swift ios", "swift programming", "swiftui"],
//     implicit: ["ios development", "xcode", "cocoa touch"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "objective-c": {
//     canonical: "objective-c",
//     category: "mobile-development",
//     synonyms: ["objective c", "obj-c", "objc"],
//     implicit: ["ios legacy", "cocoa", "foundation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "kotlin": {
//     canonical: "kotlin",
//     category: "mobile-development",
//     synonyms: ["kotlin android", "kotlin programming"],
//     implicit: ["android development", "jetpack", "coroutines"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "android": {
//     canonical: "android",
//     category: "mobile-development",
//     synonyms: ["android development", "android sdk", "android studio"],
//     implicit: ["activities", "fragments", "services", "gradle"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "ios": {
//     canonical: "ios",
//     category: "mobile-development",
//     synonyms: ["ios development", "iphone development"],
//     implicit: ["uikit", "foundation", "core data", "app store"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "xamarin": {
//     canonical: "xamarin",
//     category: "mobile-development",
//     synonyms: ["xamarin forms", "xamarin.forms"],
//     implicit: ["cross-platform", "c# mobile", ".net mobile"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ionic": {
//     canonical: "ionic",
//     category: "mobile-development",
//     synonyms: ["ionic framework", "ionic angular"],
//     implicit: ["hybrid apps", "capacitor", "cordova"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "cordova": {
//     canonical: "cordova",
//     category: "mobile-development",
//     synonyms: ["apache cordova", "phonegap"],
//     implicit: ["hybrid apps", "webview", "plugins"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🗄️ DATABASES & DATA STORAGE (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "postgresql": {
//     canonical: "postgresql",
//     category: "databases",
//     synonyms: ["postgres", "psql", "postgresql database"],
//     implicit: ["relational", "acid", "json support", "full-text search"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mysql": {
//     canonical: "mysql",
//     category: "databases",
//     synonyms: ["my sql", "mysql database"],
//     implicit: ["relational", "innodb", "mariadb compatible"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mariadb": {
//     canonical: "mariadb",
//     category: "databases",
//     synonyms: ["maria db"],
//     implicit: ["mysql fork", "relational", "open source"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "oracle": {
//     canonical: "oracle",
//     category: "databases",
//     synonyms: ["oracle database", "oracle db", "plsql"],
//     implicit: ["enterprise", "pl/sql", "stored procedures"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "mssql": {
//     canonical: "mssql",
//     category: "databases",
//     synonyms: ["microsoft sql server", "sql server", "t-sql"],
//     implicit: ["transact-sql", "ssrs", "ssis", "ssas"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "dynamodb": {
//     canonical: "dynamodb",
//     category: "databases",
//     synonyms: ["dynamo db", "aws dynamodb"],
//     implicit: ["nosql", "key-value", "serverless", "aws"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "cassandra": {
//     canonical: "cassandra",
//     category: "databases",
//     synonyms: ["apache cassandra", "cassandra db"],
//     implicit: ["wide column", "distributed", "high availability"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 12
//   },

//   "couchdb": {
//     canonical: "couchdb",
//     category: "databases",
//     synonyms: ["couch db", "apache couchdb"],
//     implicit: ["document store", "rest api", "replication"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "neo4j": {
//     canonical: "neo4j",
//     category: "databases",
//     synonyms: ["neo4j graph", "graph database"],
//     implicit: ["graph", "cypher", "relationships", "nodes"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "elasticsearch": {
//     canonical: "elasticsearch",
//     category: "databases",
//     synonyms: ["elastic search", "es", "elastic"],
//     implicit: ["search engine", "full-text search", "lucene", "elk stack"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "firebase": {
//     canonical: "firebase",
//     category: "databases",
//     synonyms: ["google firebase", "firestore", "realtime database"],
//     implicit: ["baas", "real-time", "authentication", "hosting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "supabase": {
//     canonical: "supabase",
//     category: "databases",
//     synonyms: ["supabase platform"],
//     implicit: ["postgres baas", "real-time", "open source firebase"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "sqlite": {
//     canonical: "sqlite",
//     category: "databases",
//     synonyms: ["sqlite3", "sqlite database"],
//     implicit: ["embedded", "serverless", "file-based"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 20
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // ☁️ CLOUD & INFRASTRUCTURE (120+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "terraform": {
//     canonical: "terraform",
//     category: "cloud-infrastructure",
//     synonyms: ["terraform iac", "hashicorp terraform"],
//     implicit: ["infrastructure as code", "provisioning", "declarative"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 9
//   },

//   "ansible": {
//     canonical: "ansible",
//     category: "devops",
//     synonyms: ["ansible automation", "configuration management"],
//     implicit: ["playbooks", "automation", "agentless"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "puppet": {
//     canonical: "puppet",
//     category: "devops",
//     synonyms: ["puppet automation"],
//     implicit: ["configuration management", "infrastructure automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "chef": {
//     canonical: "chef",
//     category: "devops",
//     synonyms: ["chef automation", "opscode chef"],
//     implicit: ["cookbooks", "recipes", "configuration management"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "cloudformation": {
//     canonical: "cloudformation",
//     category: "cloud-infrastructure",
//     synonyms: ["aws cloudformation", "cfn"],
//     implicit: ["infrastructure as code", "aws", "stacks"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "lambda": {
//     canonical: "lambda",
//     category: "cloud-infrastructure",
//     synonyms: ["aws lambda", "serverless functions"],
//     implicit: ["serverless", "functions as a service", "event-driven"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ec2": {
//     canonical: "ec2",
//     category: "cloud-infrastructure",
//     synonyms: ["aws ec2", "elastic compute cloud"],
//     implicit: ["virtual machines", "instances", "cloud computing"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "s3": {
//     canonical: "s3",
//     category: "cloud-infrastructure",
//     synonyms: ["aws s3", "simple storage service"],
//     implicit: ["object storage", "buckets", "cloud storage"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "ecs": {
//     canonical: "ecs",
//     category: "cloud-infrastructure",
//     synonyms: ["aws ecs", "elastic container service"],
//     implicit: ["container orchestration", "fargate", "tasks"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "eks": {
//     canonical: "eks",
//     category: "cloud-infrastructure",
//     synonyms: ["aws eks", "elastic kubernetes service"],
//     implicit: ["managed kubernetes", "k8s on aws"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 6
//   },

//   "azure-functions": {
//     canonical: "azure-functions",
//     category: "cloud-infrastructure",
//     synonyms: ["azure function", "microsoft azure functions"],
//     implicit: ["serverless", "faas", "event-driven"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "azure-devops": {
//     canonical: "azure-devops",
//     category: "devops",
//     synonyms: ["azure devops services", "vsts"],
//     implicit: ["pipelines", "repos", "boards", "artifacts"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "gke": {
//     canonical: "gke",
//     category: "cloud-infrastructure",
//     synonyms: ["google kubernetes engine", "gcp kubernetes"],
//     implicit: ["managed kubernetes", "k8s on gcp"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 7
//   },

//   "cloud-run": {
//     canonical: "cloud-run",
//     category: "cloud-infrastructure",
//     synonyms: ["gcp cloud run", "google cloud run"],
//     implicit: ["serverless containers", "fully managed"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "nginx": {
//     canonical: "nginx",
//     category: "devops",
//     synonyms: ["nginx web server", "nginx reverse proxy"],
//     implicit: ["web server", "reverse proxy", "load balancer"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "apache": {
//     canonical: "apache",
//     category: "devops",
//     synonyms: ["apache web server", "apache http server", "httpd"],
//     implicit: ["web server", "modules", "configuration"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "linux": {
//     canonical: "linux",
//     category: "devops",
//     synonyms: ["linux administration", "ubuntu", "centos", "rhel", "debian"],
//     implicit: ["unix", "bash", "shell scripting", "system administration"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "bash": {
//     canonical: "bash",
//     category: "devops",
//     synonyms: ["bash scripting", "shell scripting", "sh", "bash shell"],
//     implicit: ["automation", "command line", "shell", "scripting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "powershell": {
//     canonical: "powershell",
//     category: "devops",
//     synonyms: ["windows powershell", "pwsh"],
//     implicit: ["windows automation", "scripting", "cmdlets"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "git": {
//     canonical: "git",
//     category: "devops",
//     synonyms: ["version control", "git version control", "github", "gitlab", "bitbucket"],
//     implicit: ["source control", "branching", "merging", "commits"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 18
//   },

//   "prometheus": {
//     canonical: "prometheus",
//     category: "devops",
//     synonyms: ["prometheus monitoring"],
//     implicit: ["metrics", "monitoring", "alerting", "time-series"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 9
//   },

//   "grafana": {
//     canonical: "grafana",
//     category: "devops",
//     synonyms: ["grafana dashboards"],
//     implicit: ["visualization", "monitoring", "dashboards", "metrics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🤖 AI/ML & DATA SCIENCE (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "tensorflow": {
//     canonical: "tensorflow",
//     category: "data-science",
//     synonyms: ["tf", "tensorflow framework", "keras"],
//     implicit: ["deep learning", "neural networks", "model training"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 9,
//     emerging: true
//   },

//   "pytorch": {
//     canonical: "pytorch",
//     category: "data-science",
//     synonyms: ["torch", "pytorch framework"],
//     implicit: ["deep learning", "neural networks", "dynamic graphs"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "scikit-learn": {
//     canonical: "scikit-learn",
//     category: "data-science",
//     synonyms: ["sklearn", "scikit learn"],
//     implicit: ["machine learning", "classification", "regression", "clustering"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "pandas": {
//     canonical: "pandas",
//     category: "data-science",
//     synonyms: ["pandas python", "dataframes"],
//     implicit: ["data manipulation", "data analysis", "dataframes"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "numpy": {
//     canonical: "numpy",
//     category: "data-science",
//     synonyms: ["numpy python", "numerical python"],
//     implicit: ["numerical computing", "arrays", "linear algebra"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "matplotlib": {
//     canonical: "matplotlib",
//     category: "data-science",
//     synonyms: ["matplotlib python", "plotting"],
//     implicit: ["data visualization", "plotting", "charts"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "seaborn": {
//     canonical: "seaborn",
//     category: "data-science",
//     synonyms: ["seaborn python"],
//     implicit: ["statistical visualization", "plotting"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "jupyter": {
//     canonical: "jupyter",
//     category: "data-science",
//     synonyms: ["jupyter notebook", "ipython", "jupyter lab"],
//     implicit: ["interactive computing", "notebooks", "data exploration"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "r-programming": {
//     canonical: "r-programming",
//     category: "data-science",
//     synonyms: ["r", "r language", "rstudio"],
//     implicit: ["statistical computing", "data analysis", "ggplot2"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "spacy": {
//     canonical: "spacy",
//     category: "data-science",
//     synonyms: ["spacy nlp"],
//     implicit: ["nlp", "natural language processing", "text processing"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "nltk": {
//     canonical: "nltk",
//     category: "data-science",
//     synonyms: ["natural language toolkit", "nltk python"],
//     implicit: ["nlp", "text analysis", "linguistics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "huggingface": {
//     canonical: "huggingface",
//     category: "ai-ml",
//     synonyms: ["transformers", "hugging face", "hf"],
//     implicit: ["nlp", "transformers", "pretrained models", "llm"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "opencv": {
//     canonical: "opencv",
//     category: "data-science",
//     synonyms: ["open cv", "computer vision"],
//     implicit: ["image processing", "computer vision", "video analysis"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "langchain": {
//     canonical: "langchain",
//     category: "ai-ml",
//     synonyms: ["lang chain"],
//     implicit: ["llm", "ai chains", "prompt engineering"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 2,
//     emerging: true,
//     futureProof: true
//   },

//   "llm": {
//     canonical: "llm",
//     category: "ai-ml",
//     synonyms: ["large language models", "gpt", "chatgpt", "llms"],
//     implicit: ["ai", "transformers", "generative ai", "prompt engineering"],
//     weight: 1.6,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 3,
//     emerging: true,
//     futureProof: true
//   },

//   "stable-diffusion": {
//     canonical: "stable-diffusion",
//     category: "ai-ml",
//     synonyms: ["sd", "image generation", "diffusion models"],
//     implicit: ["generative ai", "image synthesis", "ai art"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 2,
//     emerging: true,
//     futureProof: true
//   },

//   "mlflow": {
//     canonical: "mlflow",
//     category: "data-science",
//     synonyms: ["ml flow"],
//     implicit: ["mlops", "model tracking", "experiment tracking"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "apache-spark": {
//     canonical: "apache-spark",
//     category: "data-science",
//     synonyms: ["spark", "pyspark", "spark sql"],
//     implicit: ["big data", "distributed computing", "data processing"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 12
//   },

//   "hadoop": {
//     canonical: "hadoop",
//     category: "data-science",
//     synonyms: ["apache hadoop", "hdfs", "mapreduce"],
//     implicit: ["big data", "distributed storage", "data processing"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15
//   },

//   "airflow": {
//     canonical: "airflow",
//     category: "data-science",
//     synonyms: ["apache airflow", "workflow orchestration"],
//     implicit: ["data pipelines", "dag", "scheduling", "etl"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "tableau": {
//     canonical: "tableau",
//     category: "data-science",
//     synonyms: ["tableau desktop", "tableau server"],
//     implicit: ["data visualization", "bi", "dashboards", "analytics"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "power-bi": {
//     canonical: "power-bi",
//     category: "data-science",
//     synonyms: ["powerbi", "microsoft power bi"],
//     implicit: ["business intelligence", "data visualization", "dax"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "looker": {
//     canonical: "looker",
//     category: "data-science",
//     synonyms: ["looker bi", "google looker"],
//     implicit: ["business intelligence", "data exploration", "lookml"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "dbt": {
//     canonical: "dbt",
//     category: "data-science",
//     synonyms: ["data build tool", "dbt cloud"],
//     implicit: ["data transformation", "analytics engineering", "sql"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "snowflake": {
//     canonical: "snowflake",
//     category: "databases",
//     synonyms: ["snowflake db", "snowflake data warehouse"],
//     implicit: ["data warehouse", "cloud data platform", "sql"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "databricks": {
//     canonical: "databricks",
//     category: "data-science",
//     synonyms: ["databricks platform"],
//     implicit: ["spark", "data lakehouse", "collaborative analytics"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "redshift": {
//     canonical: "redshift",
//     category: "databases",
//     synonyms: ["aws redshift", "amazon redshift"],
//     implicit: ["data warehouse", "columnar storage", "analytics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "bigquery": {
//     canonical: "bigquery",
//     category: "databases",
//     synonyms: ["google bigquery", "bq"],
//     implicit: ["data warehouse", "serverless", "analytics", "sql"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🔒 SECURITY & COMPLIANCE (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "cybersecurity": {
//     canonical: "cybersecurity",
//     category: "security",
//     synonyms: ["cyber security", "information security", "infosec"],
//     implicit: ["threat detection", "security audits", "vulnerability"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "penetration-testing": {
//     canonical: "penetration-testing",
//     category: "security",
//     synonyms: ["pen testing", "ethical hacking", "pentesting"],
//     implicit: ["vulnerability assessment", "security testing", "exploits"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 20
//   },

//   "owasp": {
//     canonical: "owasp",
//     category: "security",
//     synonyms: ["owasp top 10", "web application security"],
//     implicit: ["security best practices", "vulnerabilities", "secure coding"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "oauth": {
//     canonical: "oauth",
//     category: "security",
//     synonyms: ["oauth2", "oauth 2.0", "authentication"],
//     implicit: ["authorization", "token-based auth", "security"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "jwt": {
//     canonical: "jwt",
//     category: "security",
//     synonyms: ["json web token", "json web tokens"],
//     implicit: ["authentication", "tokens", "stateless auth"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ssl-tls": {
//     canonical: "ssl-tls",
//     category: "security",
//     synonyms: ["ssl", "tls", "https", "certificates"],
//     implicit: ["encryption", "secure communication", "certificates"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "encryption": {
//     canonical: "encryption",
//     category: "security",
//     synonyms: ["cryptography", "data encryption", "aes", "rsa"],
//     implicit: ["data protection", "security", "ciphers"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "soc": {
//     canonical: "soc",
//     category: "security",
//     synonyms: ["security operations center", "soc analyst"],
//     implicit: ["threat monitoring", "incident response", "security"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15
//   },

//   "siem": {
//     canonical: "siem",
//     category: "security",
//     synonyms: ["security information event management", "splunk", "qradar"],
//     implicit: ["log analysis", "threat detection", "security monitoring"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 18
//   },

//   "iam": {
//     canonical: "iam",
//     category: "security",
//     synonyms: ["identity access management", "access control"],
//     implicit: ["authentication", "authorization", "rbac", "permissions"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "gdpr": {
//     canonical: "gdpr",
//     category: "compliance",
//     synonyms: ["general data protection regulation", "data privacy"],
//     implicit: ["compliance", "data protection", "privacy"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "hipaa": {
//     canonical: "hipaa",
//     category: "compliance",
//     synonyms: ["health insurance portability", "healthcare compliance"],
//     implicit: ["compliance", "healthcare data", "privacy"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "pci-dss": {
//     canonical: "pci-dss",
//     category: "compliance",
//     synonyms: ["pci", "payment card industry", "pci compliance"],
//     implicit: ["payment security", "compliance", "card data"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "iso-27001": {
//     canonical: "iso-27001",
//     category: "compliance",
//     synonyms: ["iso27001", "information security management"],
//     implicit: ["compliance", "security standards", "isms"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "soc2": {
//     canonical: "soc2",
//     category: "compliance",
//     synonyms: ["soc 2", "service organization control"],
//     implicit: ["compliance", "audit", "security controls"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📊 BUSINESS & MANAGEMENT (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "product-management": {
//     canonical: "product-management",
//     category: "product-management",
//     synonyms: ["product manager", "pm", "product owner", "product strategy"],
//     implicit: ["roadmap", "stakeholder management", "user stories", "prioritization"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "scrum-master": {
//     canonical: "scrum-master",
//     category: "project-management",
//     synonyms: ["scrum", "csm", "certified scrum master"],
//     implicit: ["agile", "sprint planning", "facilitation", "ceremonies"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "pmp": {
//     canonical: "pmp",
//     category: "project-management",
//     synonyms: ["project management professional", "pmi", "pmbok"],
//     implicit: ["project planning", "risk management", "stakeholder management"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "six-sigma": {
//     canonical: "six-sigma",
//     category: "project-management",
//     synonyms: ["lean six sigma", "6 sigma", "green belt", "black belt"],
//     implicit: ["process improvement", "quality management", "dmaic"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "salesforce": {
//     canonical: "salesforce",
//     category: "sales-business-development",
//     synonyms: ["sfdc", "crm", "sales cloud", "service cloud"],
//     implicit: ["customer relationship management", "sales automation"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 23
//   },

//   "hubspot": {
//     canonical: "hubspot",
//     category: "sales-business-development",
//     synonyms: ["hubspot crm", "marketing automation"],
//     implicit: ["inbound marketing", "crm", "marketing automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "google-analytics": {
//     canonical: "google-analytics",
//     category: "marketing",
//     synonyms: ["ga", "ga4", "google analytics 4", "web analytics"],
//     implicit: ["analytics", "tracking", "metrics", "reporting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "seo": {
//     canonical: "seo",
//     category: "marketing",
//     synonyms: ["search engine optimization", "organic search"],
//     implicit: ["keywords", "ranking", "backlinks", "on-page seo"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "sem": {
//     canonical: "sem",
//     category: "marketing",
//     synonyms: ["search engine marketing", "ppc", "paid search"],
//     implicit: ["google ads", "paid advertising", "bidding"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "google-ads": {
//     canonical: "google-ads",
//     category: "marketing",
//     synonyms: ["adwords", "google adwords", "ppc"],
//     implicit: ["paid advertising", "campaigns", "keywords"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "facebook-ads": {
//     canonical: "facebook-ads",
//     category: "marketing",
//     synonyms: ["meta ads", "fb ads", "instagram ads"],
//     implicit: ["social media advertising", "targeting", "campaigns"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "content-marketing": {
//     canonical: "content-marketing",
//     category: "marketing",
//     synonyms: ["content strategy", "content creation"],
//     implicit: ["blogging", "copywriting", "storytelling"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "email-marketing": {
//     canonical: "email-marketing",
//     category: "marketing",
//     synonyms: ["email campaigns", "newsletter", "mailchimp"],
//     implicit: ["automation", "segmentation", "a/b testing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "social-media-marketing": {
//     canonical: "social-media-marketing",
//     category: "marketing",
//     synonyms: ["smm", "social media", "community management"],
//     implicit: ["engagement", "content creation", "analytics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "financial-analysis": {
//     canonical: "financial-analysis",
//     category: "finance",
//     synonyms: ["financial modeling", "financial planning", "fp&a"],
//     implicit: ["forecasting", "budgeting", "variance analysis"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "accounting": {
//     canonical: "accounting",
//     category: "finance",
//     synonyms: ["bookkeeping", "general ledger", "cpa"],
//     implicit: ["financial statements", "reconciliation", "gaap"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "quickbooks": {
//     canonical: "quickbooks",
//     category: "finance",
//     synonyms: ["quickbooks online", "qb", "qbo"],
//     implicit: ["accounting software", "bookkeeping", "invoicing"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 25
//   },

//   "sap": {
//     canonical: "sap",
//     category: "enterprise-software",
//     synonyms: ["sap erp", "sap s/4hana", "sap fico", "sap mm"],
//     implicit: ["erp", "enterprise resource planning", "modules"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "oracle-erp": {
//     canonical: "oracle-erp",
//     category: "enterprise-software",
//     synonyms: ["oracle", "oracle cloud", "oracle fusion"],
//     implicit: ["erp", "enterprise applications"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "workday": {
//     canonical: "workday",
//     category: "hr-tech",
//     synonyms: ["workday hcm", "workday financials"],
//     implicit: ["human capital management", "hris", "payroll"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "hr-management": {
//     canonical: "hr-management",
//     category: "human-resources",
//     synonyms: ["human resources", "hr", "talent management", "recruitment"],
//     implicit: ["hiring", "onboarding", "performance management"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "recruiting": {
//     canonical: "recruiting",
//     category: "human-resources",
//     synonyms: ["recruitment", "talent acquisition", "sourcing", "headhunting"],
//     implicit: ["interviewing", "candidate screening", "ats"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "supply-chain": {
//     canonical: "supply-chain",
//     category: "operations",
//     synonyms: ["supply chain management", "scm", "logistics"],
//     implicit: ["procurement", "inventory", "distribution"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "operations-management": {
//     canonical: "operations-management",
//     category: "operations",
//     synonyms: ["operations", "ops", "process improvement"],
//     implicit: ["efficiency", "optimization", "workflow"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "quality-assurance": {
//     canonical: "quality-assurance",
//     category: "quality",
//     synonyms: ["qa", "quality control", "testing"],
//     implicit: ["test plans", "bug tracking", "test cases"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "selenium": {
//     canonical: "selenium",
//     category: "quality",
//     synonyms: ["selenium webdriver", "test automation"],
//     implicit: ["automated testing", "web testing", "test scripts"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "cypress": {
//     canonical: "cypress",
//     category: "quality",
//     synonyms: ["cypress.io", "cypress testing"],
//     implicit: ["e2e testing", "frontend testing", "test automation"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "jest": {
//     canonical: "jest",
//     category: "quality",
//     synonyms: ["jest testing", "javascript testing"],
//     implicit: ["unit testing", "snapshot testing", "mocking"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "mocha": {
//     canonical: "mocha",
//     category: "quality",
//     synonyms: ["mocha testing", "chai"],
//     implicit: ["javascript testing", "test framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "junit": {
//     canonical: "junit",
//     category: "quality",
//     synonyms: ["junit testing", "junit5"],
//     implicit: ["java testing", "unit testing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "pytest": {
//     canonical: "pytest",
//     category: "quality",
//     synonyms: ["pytest framework", "python testing"],
//     implicit: ["unit testing", "fixtures", "test automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🎮 GAMING & GRAPHICS (80+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "unity": {
//     canonical: "unity",
//     category: "game-development",
//     synonyms: ["unity3d", "unity engine", "unity game engine"],
//     implicit: ["game development", "c# scripting", "3d games"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "unreal-engine": {
//     canonical: "unreal-engine",
//     category: "game-development",
//     synonyms: ["unreal", "ue4", "ue5", "blueprints"],
//     implicit: ["game development", "3d graphics", "c++"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "godot": {
//     canonical: "godot",
//     category: "game-development",
//     synonyms: ["godot engine"],
//     implicit: ["game development", "gdscript", "2d/3d games"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "threejs": {
//     canonical: "threejs",
//     category: "web-development",
//     synonyms: ["three.js", "webgl"],
//     implicit: ["3d graphics", "web graphics", "visualization"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "blender": {
//     canonical: "blender",
//     category: "3d-modeling",
//     synonyms: ["blender 3d", "3d modeling"],
//     implicit: ["3d", "modeling", "animation", "rendering"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "mid",
//     yearsRelevant:8,

//   },

//  // ═══════════════════════════════════════════════════════════════════════
//   // 🎨 FRONTEND & UI/UX DEVELOPMENT (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════
  
//   "html": {
//     canonical: "html",
//     category: "web-development",
//     synonyms: ["html5", "html 5", "markup", "semantic html", "web markup"],
//     implicit: ["semantic elements", "accessibility", "forms", "canvas"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 22
//   },

//   "maya": {
//     canonical: "maya",
//     category: "3d-modeling",
//     synonyms: ["autodesk maya", "maya 3d"],
//     implicit: ["3d modeling", "animation", "rigging"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "3ds-max": {
//     canonical: "3ds-max",
//     category: "3d-modeling",
//     synonyms: ["3dsmax", "autodesk 3ds max"],
//     implicit: ["3d modeling", "rendering", "visualization"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "after-effects": {
//     canonical: "after-effects",
//     category: "video-production",
//     synonyms: ["adobe after effects", "ae", "motion graphics"],
//     implicit: ["animation", "vfx", "compositing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "premiere-pro": {
//     canonical: "premiere-pro",
//     category: "video-production",
//     synonyms: ["adobe premiere", "premiere", "video editing"],
//     implicit: ["video editing", "post-production"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "final-cut-pro": {
//     canonical: "final-cut-pro",
//     category: "video-production",
//     synonyms: ["final cut", "fcp", "fcpx"],
//     implicit: ["video editing", "mac video editing"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🏢 INDUSTRY-SPECIFIC SKILLS (200+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "healthcare-it": {
//     canonical: "healthcare-it",
//     category: "healthcare",
//     synonyms: ["health informatics", "medical it", "clinical informatics"],
//     implicit: ["ehr", "emr", "healthcare systems"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "epic-systems": {
//     canonical: "epic-systems",
//     category: "healthcare",
//     synonyms: ["epic", "epic ehr", "epic emr"],
//     implicit: ["healthcare software", "ehr", "clinical systems"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cerner": {
//     canonical: "cerner",
//     category: "healthcare",
//     synonyms: ["cerner millennium", "oracle cerner"],
//     implicit: ["healthcare software", "ehr", "hospital systems"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "hl7": {
//     canonical: "hl7",
//     category: "healthcare",
//     synonyms: ["hl7 interface", "fhir", "health level 7"],
//     implicit: ["healthcare standards", "interoperability"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "medical-coding": {
//     canonical: "medical-coding",
//     category: "healthcare",
//     synonyms: ["icd-10", "cpt", "medical billing"],
//     implicit: ["healthcare billing", "coding", "reimbursement"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "autocad": {
//     canonical: "autocad",
//     category: "cad-design",
//     synonyms: ["autodesk autocad", "cad", "computer aided design"],
//     implicit: ["technical drawing", "drafting", "2d/3d design"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "solidworks": {
//     canonical: "solidworks",
//     category: "cad-design",
//     synonyms: ["solid works", "3d cad"],
//     implicit: ["mechanical design", "3d modeling", "engineering"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "revit": {
//     canonical: "revit",
//     category: "cad-design",
//     synonyms: ["autodesk revit", "bim"],
//     implicit: ["building information modeling", "architecture", "mep"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "matlab": {
//     canonical: "matlab",
//     category: "engineering",
//     synonyms: ["matlab programming", "simulink"],
//     implicit: ["numerical computing", "simulation", "engineering"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "labview": {
//     canonical: "labview",
//     category: "engineering",
//     synonyms: ["lab view", "ni labview"],
//     implicit: ["data acquisition", "instrumentation", "automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "plc-programming": {
//     canonical: "plc-programming",
//     category: "industrial-automation",
//     synonyms: ["plc", "programmable logic controller", "ladder logic"],
//     implicit: ["automation", "industrial control", "scada"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "scada": {
//     canonical: "scada",
//     category: "industrial-automation",
//     synonyms: ["scada systems", "supervisory control"],
//     implicit: ["industrial automation", "hmi", "process control"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "robotics": {
//     canonical: "robotics",
//     category: "engineering",
//     synonyms: ["robotic systems", "robot programming", "ros"],
//     implicit: ["automation", "mechatronics", "control systems"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "ros": {
//     canonical: "ros",
//     category: "robotics",
//     synonyms: ["robot operating system", "ros2"],
//     implicit: ["robotics middleware", "robot software"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "embedded-systems": {
//     canonical: "embedded-systems",
//     category: "engineering",
//     synonyms: ["embedded c", "embedded programming", "firmware"],
//     implicit: ["microcontrollers", "real-time systems", "iot"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "arduino": {
//     canonical: "arduino",
//     category: "embedded-systems",
//     synonyms: ["arduino programming"],
//     implicit: ["microcontroller", "prototyping", "iot"],
//     weight: 1.0,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 15
//   },

//   "raspberry-pi": {
//     canonical: "raspberry-pi",
//     category: "embedded-systems",
//     synonyms: ["raspberry pi", "rpi"],
//     implicit: ["single board computer", "iot", "prototyping"],
//     weight: 1.0,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 12
//   },

//   "vhdl": {
//     canonical: "vhdl",
//     category: "hardware-design",
//     synonyms: ["vhsic hardware description language"],
//     implicit: ["fpga", "digital design", "hardware"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "verilog": {
//     canonical: "verilog",
//     category: "hardware-design",
//     synonyms: ["verilog hdl"],
//     implicit: ["fpga", "digital design", "asic"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "fpga": {
//     canonical: "fpga",
//     category: "hardware-design",
//     synonyms: ["field programmable gate array", "fpga development"],
//     implicit: ["digital logic", "hardware acceleration"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "legal-research": {
//     canonical: "legal-research",
//     category: "legal",
//     synonyms: ["legal analysis", "case law research"],
//     implicit: ["litigation", "legal writing", "westlaw", "lexis"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "contract-management": {
//     canonical: "contract-management",
//     category: "legal",
//     synonyms: ["contract law", "contract negotiation", "contract review"],
//     implicit: ["legal agreements", "terms", "negotiation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "legal-writing": {
//     canonical: "legal-writing",
//     category: "legal",
//     synonyms: ["brief writing", "legal drafting"],
//     implicit: ["motions", "pleadings", "legal documents"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "real-estate": {
//     canonical: "real-estate",
//     category: "real-estate",
//     synonyms: ["property management", "real estate sales", "realtor"],
//     implicit: ["listings", "showings", "closings", "mls"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "property-management": {
//     canonical: "property-management",
//     category: "real-estate",
//     synonyms: ["landlord", "rental management"],
//     implicit: ["tenant relations", "leasing", "maintenance"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "construction-management": {
//     canonical: "construction-management",
//     category: "construction",
//     synonyms: ["project management construction", "site management"],
//     implicit: ["scheduling", "budgeting", "subcontractors"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "civil-engineering": {
//     canonical: "civil-engineering",
//     category: "engineering",
//     synonyms: ["structural engineering", "infrastructure"],
//     implicit: ["design", "analysis", "construction"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "mechanical-engineering": {
//     canonical: "mechanical-engineering",
//     category: "engineering",
//     synonyms: ["mechanical design", "me"],
//     implicit: ["thermodynamics", "mechanics", "design"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "electrical-engineering": {
//     canonical: "electrical-engineering",
//     category: "engineering",
//     synonyms: ["ee", "electronics engineering"],
//     implicit: ["circuits", "power systems", "electronics"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "chemical-engineering": {
//     canonical: "chemical-engineering",
//     category: "engineering",
//     synonyms: ["process engineering", "che"],
//     implicit: ["chemical processes", "reactors", "plant design"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "biomedical-engineering": {
//     canonical: "biomedical-engineering",
//     category: "engineering",
//     synonyms: ["bioengineering", "medical devices"],
//     implicit: ["medical technology", "biomechanics", "devices"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "petroleum-engineering": {
//     canonical: "petroleum-engineering",
//     category: "engineering",
//     synonyms: ["oil and gas", "reservoir engineering"],
//     implicit: ["drilling", "production", "oil field"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "aerospace-engineering": {
//     canonical: "aerospace-engineering",
//     category: "engineering",
//     synonyms: ["aeronautical engineering", "aviation engineering"],
//     implicit: ["aircraft design", "aerodynamics", "propulsion"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "environmental-science": {
//     canonical: "environmental-science",
//     category: "science",
//     synonyms: ["environmental engineering", "sustainability"],
//     implicit: ["ecology", "pollution", "conservation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "geology": {
//     canonical: "geology",
//     category: "science",
//     synonyms: ["geoscience", "earth science"],
//     implicit: ["rock analysis", "stratigraphy", "fieldwork"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "gis": {
//     canonical: "gis",
//     category: "geospatial",
//     synonyms: ["geographic information systems", "arcgis", "qgis"],
//     implicit: ["mapping", "spatial analysis", "cartography"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "remote-sensing": {
//     canonical: "remote-sensing",
//     category: "geospatial",
//     synonyms: ["satellite imagery", "aerial photography"],
//     implicit: ["image analysis", "spatial data", "earth observation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "teaching": {
//     canonical: "teaching",
//     category: "education",
//     synonyms: ["education", "instruction", "pedagogy", "tutoring"],
//     implicit: ["curriculum", "lesson planning", "classroom management"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "curriculum-development": {
//     canonical: "curriculum-development",
//     category: "education",
//     synonyms: ["instructional design", "course design"],
//     implicit: ["learning objectives", "assessment", "pedagogy"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "elearning": {
//     canonical: "elearning",
//     category: "education",
//     synonyms: ["e-learning", "online learning", "lms", "moodle"],
//     implicit: ["distance learning", "learning management", "articulate"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "journalism": {
//     canonical: "journalism",
//     category: "media",
//     synonyms: ["reporting", "news writing", "investigative journalism"],
//     implicit: ["research", "interviewing", "writing", "ethics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "copywriting": {
//     canonical: "copywriting",
//     category: "marketing",
//     synonyms: ["copy writing", "advertising copy", "creative writing"],
//     implicit: ["persuasive writing", "brand voice", "messaging"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "technical-writing": {
//     canonical: "technical-writing",
//     category: "documentation",
//     synonyms: ["documentation", "technical documentation"],
//     implicit: ["user manuals", "api docs", "clarity", "documentation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "grant-writing": {
//     canonical: "grant-writing",
//     category: "non-profit",
//     synonyms: ["proposal writing", "fundraising"],
//     implicit: ["grant proposals", "funding", "non-profit"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "event-planning": {
//     canonical: "event-planning",
//     category: "hospitality",
//     synonyms: ["event management", "event coordination"],
//     implicit: ["logistics", "vendor management", "budgeting"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "catering": {
//     canonical: "catering",
//     category: "hospitality",
//     synonyms: ["food service", "banquet service"],
//     implicit: ["menu planning", "food prep", "service"],
//     weight: 0.8,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "hospitality-management": {
//     canonical: "hospitality-management",
//     category: "hospitality",
//     synonyms: ["hotel management", "restaurant management"],
//     implicit: ["guest services", "operations", "front desk"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "retail-management": {
//     canonical: "retail-management",
//     category: "retail",
//     synonyms: ["store management", "retail operations"],
//     implicit: ["merchandising", "inventory", "customer service", "pos"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "merchandising": {
//     canonical: "merchandising",
//     category: "retail",
//     synonyms: ["visual merchandising", "product display"],
//     implicit: ["planograms", "displays", "product placement"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "inventory-management": {
//     canonical: "inventory-management",
//     category: "operations",
//     synonyms: ["stock management", "warehouse management"],
//     implicit: ["stock control", "ordering", "wms"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "warehouse-operations": {
//     canonical: "warehouse-operations",
//     category: "operations",
//     synonyms: ["warehousing", "distribution", "fulfillment"],
//     implicit: ["receiving", "picking", "packing", "shipping"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "forklift": {
//     canonical: "forklift",
//     category: "operations",
//     synonyms: ["forklift operator", "forklift certification"],
//     implicit: ["material handling", "warehouse", "safety"],
//     weight: 0.8,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "manufacturing": {
//     canonical: "manufacturing",
//     category: "operations",
//     synonyms: ["production", "assembly", "manufacturing engineering"],
//     implicit: ["lean manufacturing", "production planning", "quality"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "lean-manufacturing": {
//     canonical: "lean-manufacturing",
//     category: "operations",
//     synonyms: ["lean", "toyota production system", "5s", "kaizen"],
//     implicit: ["waste reduction", "continuous improvement", "efficiency"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "cnc-machining": {
//     canonical: "cnc-machining",
//     category: "manufacturing",
//     synonyms: ["cnc", "cnc programming", "machining"],
//     implicit: ["mill", "lathe", "g-code", "precision"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "welding": {
//     canonical: "welding",
//     category: "manufacturing",
//     synonyms: ["mig welding", "tig welding", "arc welding"],
//     implicit: ["fabrication", "metal work", "certification"],
//     weight: 0.9,
//     section: "experience",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "nursing": {
//     canonical: "nursing",
//     category: "healthcare",
//     synonyms: ["rn", "registered nurse", "lpn", "nursing care"],
//     implicit: ["patient care", "clinical", "healthcare"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "pharmacy": {
//     canonical: "pharmacy",
//     category: "healthcare",
//     synonyms: ["pharmacist", "pharmaceutical", "pharmacy tech"],
//     implicit: ["medications", "prescriptions", "drug interactions"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "physical-therapy": {
//     canonical: "physical-therapy",
//     category: "healthcare",
//     synonyms: ["pt", "physiotherapy", "rehabilitation"],
//     implicit: ["patient rehabilitation", "mobility", "exercise"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "radiology": {
//     canonical: "radiology",
//     category: "healthcare",
//     synonyms: ["radiologic technology", "x-ray", "imaging"],
//     implicit: ["medical imaging", "ct scan", "mri"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "laboratory": {
//     canonical: "laboratory",
//     category: "healthcare",
//     synonyms: ["medical lab", "lab technician", "clinical lab"],
//     implicit: ["testing", "analysis", "specimens", "diagnostics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "dental": {
//     canonical: "dental",
//     category: "healthcare",
//     synonyms: ["dentistry", "dental hygiene", "dental assistant"],
//     implicit: ["oral health", "teeth", "hygiene"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "veterinary": {
//     canonical: "veterinary",
//     category: "healthcare",
//     synonyms: ["vet", "veterinarian", "animal care", "vet tech"],
//     implicit: ["animal health", "veterinary medicine"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "social-work": {
//     canonical: "social-work",
//     category: "social-services",
//     synonyms: ["social worker", "msw", "lcsw", "case management"],
//     implicit: ["counseling", "advocacy", "community services"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "counseling": {
//     canonical: "counseling",
//     category: "social-services",
//     synonyms: ["therapy", "mental health counseling", "psychotherapy"],
//     implicit: ["mental health", "therapeutic", "clinical"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "psychology": {
//     canonical: "psychology",
//     category: "social-services",
//     synonyms: ["psychologist", "psychological assessment"],
//     implicit: ["mental health", "behavior", "assessment"],
//     weight: 1.0,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "insurance": {
//     canonical: "insurance",
//     category: "insurance",
//     synonyms: ["insurance agent", "underwriting", "claims"],
//     implicit: ["risk assessment", "policies", "coverage"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "claims-processing": {
//     canonical: "claims-processing",
//     category: "insurance",
//     synonyms: ["claims adjuster", "claims examiner"],
//     implicit: ["investigation", "settlement", "liability"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "actuarial": {
//     canonical: "actuarial",
//     category: "insurance",
//     synonyms: ["actuary", "actuarial science"],
//     implicit: ["risk analysis", "statistics", "probability"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🌐 EMERGING TECHNOLOGIES (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "defi": {
//     canonical: "defi",
//     category: "blockchain",
//     synonyms: ["decentralized finance", "yield farming", "liquidity mining"],
//     implicit: ["crypto", "protocols", "dapps"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "nft": {
//     canonical: "nft",
//     category: "blockchain",
//     synonyms: ["non-fungible token", "nfts", "digital collectibles"],
//     implicit: ["blockchain", "digital assets", "minting"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "smart-contracts": {
//     canonical: "smart-contracts",
//     category: "blockchain",
//     synonyms: ["solidity", "ethereum contracts", "dapp development"],
//     implicit: ["blockchain", "decentralized", "web3"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8,
//     emerging: true,
//     futureProof: true
//   },

//   "metaverse": {
//     canonical: "metaverse",
//     category: "emerging-tech",
//     synonyms: ["virtual worlds", "vr worlds"],
//     implicit: ["virtual reality", "digital environments", "avatar"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true,
//     futureProof: true
//   },

//   "ar": {
//     canonical: "ar",
//     category: "emerging-tech",
//     synonyms: ["augmented reality", "arkit", "arcore"],
//     implicit: ["mixed reality", "spatial computing", "overlay"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "vr": {
//     canonical: "vr",
//     category: "emerging-tech",
//     synonyms: ["virtual reality", "oculus", "htc vive"],
//     implicit: ["immersive", "headset", "3d environments"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10,
//     emerging: true
//   },

//   "iot": {
//     canonical: "iot",
//     category: "emerging-tech",
//     synonyms: ["internet of things", "connected devices", "smart devices"],
//     implicit: ["sensors", "connectivity", "edge computing"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "edge-computing": {
//     canonical: "edge-computing",
//     category: "cloud-infrastructure",
//     synonyms: ["edge ai", "fog computing"],
//     implicit: ["distributed computing", "latency", "iot"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "quantum-computing": {
//     canonical: "quantum-computing",
//     category: "emerging-tech",
//     synonyms: ["quantum", "qiskit", "quantum algorithms"],
//     implicit: ["qubits", "superposition", "quantum mechanics"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "5g": {
//     canonical: "5g",
//     category: "networking",
//     synonyms: ["5g networks", "5g technology"],
//     implicit: ["wireless", "telecommunications", "network infrastructure"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "computer-vision": {
//     canonical: "computer-vision",
//     category: "ai-ml",
//     synonyms: ["cv", "image recognition", "object detection"],
//     implicit: ["ai", "image processing", "deep learning"],
//     weight: 1.5,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15,
//     emerging: true,
//     futureProof: true
//   },

//   "natural-language-processing": {
//     canonical: "natural-language-processing",
//     category: "ai-ml",
//     synonyms: ["nlp", "text mining", "sentiment analysis"],
//     implicit: [" 30","ai", "machine learning", "deep learning"],
//   },

//   "css": {
//     canonical: "css",
//     category: "web-development",
//     synonyms: ["css3", "cascading style sheets", "stylesheets", "styling"],
//     implicit: ["flexbox", "grid", "responsive design", "animations"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "sass": {
//     canonical: "sass",
//     category: "web-development",
//     synonyms: ["scss", "sass preprocessor", "syntactically awesome"],
//     implicit: ["variables", "mixins", "nesting", "partials"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "less": {
//     canonical: "less",
//     category: "web-development",
//     synonyms: ["less css", "less preprocessor"],
//     implicit: ["variables", "mixins", "functions"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "tailwind": {
//     canonical: "tailwind",
//     category: "web-development",
//     synonyms: ["tailwind css", "tailwindcss", "utility-first css"],
//     implicit: ["utility classes", "responsive utilities", "custom design"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "bootstrap": {
//     canonical: "bootstrap",
//     category: "web-development",
//     synonyms: ["bootstrap css", "bootstrap framework", "twitter bootstrap"],
//     implicit: ["responsive grid", "components", "utilities"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 12
//   },

//   "material-ui": {
//     canonical: "material-ui",
//     category: "web-development",
//     synonyms: ["mui", "material design", "material-ui react"],
//     implicit: ["google design", "react components", "theming"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "ant-design": {
//     canonical: "ant-design",
//     category: "web-development",
//     synonyms: ["antd", "ant design react"],
//     implicit: ["enterprise ui", "design system"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "chakra-ui": {
//     canonical: "chakra-ui",
//     category: "web-development",
//     synonyms: ["chakra", "chakra react"],
//     implicit: ["accessible components", "themeable"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "svelte": {
//     canonical: "svelte",
//     category: "web-development",
//     synonyms: ["sveltejs", "svelte framework", "sveltekit"],
//     implicit: ["reactive", "compiler", "no virtual dom"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "solid": {
//     canonical: "solid",
//     category: "web-development",
//     synonyms: ["solidjs", "solid framework"],
//     implicit: ["fine-grained reactivity", "performant"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "webpack": {
//     canonical: "webpack",
//     category: "web-development",
//     synonyms: ["webpack bundler", "module bundler"],
//     implicit: ["bundling", "optimization", "loaders", "plugins"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "vite": {
//     canonical: "vite",
//     category: "web-development",
//     synonyms: ["vite build tool", "vitejs"],
//     implicit: ["fast hmr", "esm", "rollup"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "parcel": {
//     canonical: "parcel",
//     category: "web-development",
//     synonyms: ["parcel bundler"],
//     implicit: ["zero config", "bundling"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "graphql": {
//     canonical: "graphql",
//     category: "web-development",
//     synonyms: ["graph ql", "gql", "apollo", "relay"],
//     implicit: ["queries", "mutations", "subscriptions", "schema"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "rest-api": {
//     canonical: "rest-api",
//     category: "backend-development",
//     synonyms: ["rest", "restful", "restful api", "rest services"],
//     implicit: ["http methods", "endpoints", "json", "api design"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "websockets": {
//     canonical: "websockets",
//     category: "web-development",
//     synonyms: ["socket.io", "ws", "real-time communication"],
//     implicit: ["bidirectional", "real-time", "persistent connection"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "figma": {
//     canonical: "figma",
//     category: "ui-ux-design",
//     synonyms: ["figma design", "ui design tool"],
//     implicit: ["prototyping", "design systems", "collaboration"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 7
//   },

//   "sketch": {
//     canonical: "sketch",
//     category: "ui-ux-design",
//     synonyms: ["sketch app", "sketch design"],
//     implicit: ["vector design", "ui design", "symbols"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 10
//   },

//   "adobe-xd": {
//     canonical: "adobe-xd",
//     category: "ui-ux-design",
//     synonyms: ["xd", "experience design", "adobe experience design"],
//     implicit: ["prototyping", "wireframing", "ui design"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 8
//   },

//   "photoshop": {
//     canonical: "photoshop",
//     category: "ui-ux-design",
//     synonyms: ["adobe photoshop", "ps", "photo editing"],
//     implicit: ["image editing", "graphics", "compositing"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "illustrator": {
//     canonical: "illustrator",
//     category: "ui-ux-design",
//     synonyms: ["adobe illustrator", "ai", "vector graphics"],
//     implicit: ["vector art", "logo design", "illustrations"],
//     weight: 0.9,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // ⚙️ BACKEND DEVELOPMENT (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "django": {
//     canonical: "django",
//     category: "backend-development",
//     synonyms: ["django framework", "django python"],
//     implicit: ["orm", "admin panel", "mvc", "templates"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "flask": {
//     canonical: "flask",
//     category: "backend-development",
//     synonyms: ["flask python", "flask framework"],
//     implicit: ["micro framework", "wsgi", "jinja2"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "fastapi": {
//     canonical: "fastapi",
//     category: "backend-development",
//     synonyms: ["fast api", "fastapi python"],
//     implicit: ["async", "pydantic", "openapi", "modern python"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "express": {
//     canonical: "express",
//     category: "backend-development",
//     synonyms: ["expressjs", "express.js", "express node"],
//     implicit: ["middleware", "routing", "node framework"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "nestjs": {
//     canonical: "nestjs",
//     category: "backend-development",
//     synonyms: ["nest", "nest.js", "nest framework"],
//     implicit: ["typescript", "decorators", "modular", "enterprise"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "spring": {
//     canonical: "spring",
//     category: "backend-development",
//     synonyms: ["spring framework", "spring boot", "spring mvc"],
//     implicit: ["dependency injection", "ioc", "enterprise java"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "laravel": {
//     canonical: "laravel",
//     category: "backend-development",
//     synonyms: ["laravel php", "laravel framework"],
//     implicit: ["eloquent", "blade", "artisan", "migrations"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "symfony": {
//     canonical: "symfony",
//     category: "backend-development",
//     synonyms: ["symfony php", "symfony framework"],
//     implicit: ["bundles", "doctrine", "twig"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "rails": {
//     canonical: "rails",
//     category: "backend-development",
//     synonyms: ["ruby on rails", "ror", "rails framework"],
//     implicit: ["mvc", "active record", "convention over configuration"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "aspnet": {
//     canonical: "aspnet",
//     category: "backend-development",
//     synonyms: ["asp.net", "asp.net core", "dotnet", ".net"],
//     implicit: ["c#", "mvc", "web api", "razor"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "dotnet-core": {
//     canonical: "dotnet-core",
//     category: "backend-development",
//     synonyms: [".net core", "dotnet", "net core"],
//     implicit: ["cross-platform", "modern .net", "microservices"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "gin": {
//     canonical: "gin",
//     category: "backend-development",
//     synonyms: ["gin golang", "gin framework", "gin-gonic"],
//     implicit: ["http router", "middleware", "go web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "echo": {
//     canonical: "echo",
//     category: "backend-development",
//     synonyms: ["echo golang", "echo framework"],
//     implicit: ["high performance", "go framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "actix": {
//     canonical: "actix",
//     category: "backend-development",
//     synonyms: ["actix-web", "actix rust"],
//     implicit: ["actor system", "async", "rust web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "rocket": {
//     canonical: "rocket",
//     category: "backend-development",
//     synonyms: ["rocket rust", "rocket framework"],
//     implicit: ["type-safe", "rust web framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "microservices": {
//     canonical: "microservices",
//     category: "backend-development",
//     synonyms: ["microservice architecture", "micro services", "distributed systems"],
//     implicit: ["api gateway", "service mesh", "decoupled", "scalable"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "grpc": {
//     canonical: "grpc",
//     category: "backend-development",
//     synonyms: ["grpc framework", "google rpc"],
//     implicit: ["protobuf", "binary protocol", "rpc"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "rabbitmq": {
//     canonical: "rabbitmq",
//     category: "backend-development",
//     synonyms: ["rabbit mq", "amqp", "message broker"],
//     implicit: ["message queue", "asynchronous", "pub/sub"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "kafka": {
//     canonical: "kafka",
//     category: "backend-development",
//     synonyms: ["apache kafka", "event streaming"],
//     implicit: ["streaming", "distributed log", "real-time data"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "celery": {
//     canonical: "celery",
//     category: "backend-development",
//     synonyms: ["celery python", "task queue"],
//     implicit: ["distributed tasks", "asynchronous", "workers"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📱 MOBILE DEVELOPMENT (80+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "react-native": {
//     canonical: "react-native",
//     category: "mobile-development",
//     synonyms: ["react native", "rn", "react-native framework"],
//     implicit: ["cross-platform", "native modules", "expo"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "flutter": {
//     canonical: "flutter",
//     category: "mobile-development",
//     synonyms: ["flutter framework", "dart flutter"],
//     implicit: ["dart", "widgets", "cross-platform", "material design"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "swift": {
//     canonical: "swift",
//     category: "mobile-development",
//     synonyms: ["swift ios", "swift programming", "swiftui"],
//     implicit: ["ios development", "xcode", "cocoa touch"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "objective-c": {
//     canonical: "objective-c",
//     category: "mobile-development",
//     synonyms: ["objective c", "obj-c", "objc"],
//     implicit: ["ios legacy", "cocoa", "foundation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "kotlin": {
//     canonical: "kotlin",
//     category: "mobile-development",
//     synonyms: ["kotlin android", "kotlin programming"],
//     implicit: ["android development", "jetpack", "coroutines"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "android": {
//     canonical: "android",
//     category: "mobile-development",
//     synonyms: ["android development", "android sdk", "android studio"],
//     implicit: ["activities", "fragments", "services", "gradle"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "ios": {
//     canonical: "ios",
//     category: "mobile-development",
//     synonyms: ["ios development", "iphone development"],
//     implicit: ["uikit", "foundation", "core data", "app store"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "xamarin": {
//     canonical: "xamarin",
//     category: "mobile-development",
//     synonyms: ["xamarin forms", "xamarin.forms"],
//     implicit: ["cross-platform", "c# mobile", ".net mobile"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ionic": {
//     canonical: "ionic",
//     category: "mobile-development",
//     synonyms: ["ionic framework", "ionic angular"],
//     implicit: ["hybrid apps", "capacitor", "cordova"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "cordova": {
//     canonical: "cordova",
//     category: "mobile-development",
//     synonyms: ["apache cordova", "phonegap"],
//     implicit: ["hybrid apps", "webview", "plugins"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🗄️ DATABASES & DATA STORAGE (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "postgresql": {
//     canonical: "postgresql",
//     category: "databases",
//     synonyms: ["postgres", "psql", "postgresql database"],
//     implicit: ["relational", "acid", "json support", "full-text search"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mysql": {
//     canonical: "mysql",
//     category: "databases",
//     synonyms: ["my sql", "mysql database"],
//     implicit: ["relational", "innodb", "mariadb compatible"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mariadb": {
//     canonical: "mariadb",
//     category: "databases",
//     synonyms: ["maria db"],
//     implicit: ["mysql fork", "relational", "open source"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "oracle": {
//     canonical: "oracle",
//     category: "databases",
//     synonyms: ["oracle database", "oracle db", "plsql"],
//     implicit: ["enterprise", "pl/sql", "stored procedures"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "mssql": {
//     canonical: "mssql",
//     category: "databases",
//     synonyms: ["microsoft sql server", "sql server", "t-sql"],
//     implicit: ["transact-sql", "ssrs", "ssis", "ssas"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "dynamodb": {
//     canonical: "dynamodb",
//     category: "databases",
//     synonyms: ["dynamo db", "aws dynamodb"],
//     implicit: ["nosql", "key-value", "serverless", "aws"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "cassandra": {
//     canonical: "cassandra",
//     category: "databases",
//     synonyms: ["apache cassandra", "cassandra db"],
//     implicit: ["wide column", "distributed", "high availability"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 12
//   },

//   "couchdb": {
//     canonical: "couchdb",
//     category: "databases",
//     synonyms: ["couch db", "apache couchdb"],
//     implicit: ["document store", "rest api", "replication"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "neo4j": {
//     canonical: "neo4j",
//     category: "databases",
//     synonyms: ["neo4j graph", "graph database"],
//     implicit: ["graph", "cypher", "relationships", "nodes"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "elasticsearch": {
//     canonical: "elasticsearch",
//     category: "databases",
//     synonyms: ["elastic search", "es", "elastic"],
//     implicit: ["search engine", "full-text search", "lucene", "elk stack"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "firebase": {
//     canonical: "firebase",
//     category: "databases",
//     synonyms: ["google firebase", "firestore", "realtime database"],
//     implicit: ["baas", "real-time", "authentication", "hosting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "supabase": {
//     canonical: "supabase",
//     category: "databases",
//     synonyms: ["supabase platform"],
//     implicit: ["postgres baas", "real-time", "open source firebase"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "sqlite": {
//     canonical: "sqlite",
//     category: "databases",
//     synonyms: ["sqlite3", "sqlite database"],
//     implicit: ["embedded", "serverless", "file-based"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 20
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // ☁️ CLOUD & INFRASTRUCTURE (120+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "terraform": {
//     canonical: "terraform",
//     category: "cloud-infrastructure",
//     synonyms: ["terraform iac", "hashicorp terraform"],
//     implicit: ["infrastructure as code", "provisioning", "declarative"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 9
//   },

//   "ansible": {
//     canonical: "ansible",
//     category: "devops",
//     synonyms: ["ansible automation", "configuration management"],
//     implicit: ["playbooks", "automation", "agentless"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "puppet": {
//     canonical: "puppet",
//     category: "devops",
//     synonyms: ["puppet automation"],
//     implicit: ["configuration management", "infrastructure automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "chef": {
//     canonical: "chef",
//     category: "devops",
//     synonyms: ["chef automation", "opscode chef"],
//     implicit: ["cookbooks", "recipes", "configuration management"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "cloudformation": {
//     canonical: "cloudformation",
//     category: "cloud-infrastructure",
//     synonyms: ["aws cloudformation", "cfn"],
//     implicit: ["infrastructure as code", "aws", "stacks"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "lambda": {
//     canonical: "lambda",
//     category: "cloud-infrastructure",
//     synonyms: ["aws lambda", "serverless functions"],
//     implicit: ["serverless", "functions as a service", "event-driven"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ec2": {
//     canonical: "ec2",
//     category: "cloud-infrastructure",
//     synonyms: ["aws ec2", "elastic compute cloud"],
//     implicit: ["virtual machines", "instances", "cloud computing"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "s3": {
//     canonical: "s3",
//     category: "cloud-infrastructure",
//     synonyms: ["aws s3", "simple storage service"],
//     implicit: ["object storage", "buckets", "cloud storage"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "ecs": {
//     canonical: "ecs",
//     category: "cloud-infrastructure",
//     synonyms: ["aws ecs", "elastic container service"],
//     implicit: ["container orchestration", "fargate", "tasks"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "eks": {
//     canonical: "eks",
//     category: "cloud-infrastructure",
//     synonyms: ["aws eks", "elastic kubernetes service"],
//     implicit: ["managed kubernetes", "k8s on aws"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 6
//   },

//   "azure-functions": {
//     canonical: "azure-functions",
//     category: "cloud-infrastructure",
//     synonyms: ["azure function", "microsoft azure functions"],
//     implicit: ["serverless", "faas", "event-driven"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "azure-devops": {
//     canonical: "azure-devops",
//     category: "devops",
//     synonyms: ["azure devops services", "vsts"],
//     implicit: ["pipelines", "repos", "boards", "artifacts"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "gke": {
//     canonical: "gke",
//     category: "cloud-infrastructure",
//     synonyms: ["google kubernetes engine", "gcp kubernetes"],
//     implicit: ["managed kubernetes", "k8s on gcp"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 7
//   },

//   "cloud-run": {
//     canonical: "cloud-run",
//     category: "cloud-infrastructure",
//     synonyms: ["gcp cloud run", "google cloud run"],
//     implicit: ["serverless containers", "fully managed"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "nginx": {
//     canonical: "nginx",
//     category: "devops",
//     synonyms: ["nginx web server", "nginx reverse proxy"],
//     implicit: ["web server", "reverse proxy", "load balancer"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "apache": {
//     canonical: "apache",
//     category: "devops",
//     synonyms: ["apache web server", "apache http server", "httpd"],
//     implicit: ["web server", "modules", "configuration"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "linux": {
//     canonical: "linux",
//     category: "devops",
//     synonyms: ["linux administration", "ubuntu", "centos", "rhel", "debian"],
//     implicit: ["unix", "bash", "shell scripting", "system administration"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "bash": {
//     canonical: "bash",
//     category: "devops",
//     synonyms: ["bash scripting", "shell scripting", "sh", "bash shell"],
//     implicit: ["automation", "command line", "shell", "scripting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "powershell": {
//     canonical: "powershell",
//     category: "devops",
//     synonyms: ["windows powershell", "pwsh"],
//     implicit: ["windows automation", "scripting", "cmdlets"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "git": {
//     canonical: "git",
//     category: "devops",
//     synonyms: ["version control", "git version control", "github", "gitlab", "bitbucket"],
//     implicit: ["source control", "branching", "merging", "commits"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 18
//   },

//   "prometheus": {
//     canonical: "prometheus",
//     category: "devops",
//     synonyms: ["prometheus monitoring"],
//     implicit: ["metrics", "monitoring", "alerting", "time-series"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 9
//   },

//   "grafana": {
//     canonical: "grafana",
//     category: "devops",
//     synonyms: ["grafana dashboards"],
//     implicit: ["visualization", "monitoring", "dashboards", "metrics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🤖 AI/ML & DATA SCIENCE (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "tensorflow": {
//     canonical: "tensorflow",
//     category: "data-science",
//     synonyms: ["tf", "tensorflow framework", "keras"],
//     implicit: ["deep learning", "neural networks", "model training"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 9,
//     emerging: true
//   },

//   "pytorch": {
//     canonical: "pytorch",
//     category: "data-science",
//     synonyms: ["torch", "pytorch framework"],
//     implicit: ["deep learning", "neural networks", "dynamic graphs"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "scikit-learn": {
//     canonical: "scikit-learn",
//     category: "data-science",
//     synonyms: ["sklearn", "scikit learn"],
//     implicit: ["machine learning", "classification", "regression", "clustering"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "pandas": {
//     canonical: "pandas",
//     category: "data-science",
//     synonyms: ["pandas python", "dataframes"],
//     implicit: ["data manipulation", "data analysis", "dataframes"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "numpy": {
//     canonical: "numpy",
//     category: "data-science",
//     synonyms: ["numpy python", "numerical python"],
//     implicit: ["numerical computing", "arrays", "linear algebra"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "matplotlib": {
//     canonical: "matplotlib",
//     category: "data-science",
//     synonyms: ["matplotlib python", "plotting"],
//     implicit: ["data visualization", "plotting", "charts"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "seaborn": {
//     canonical: "seaborn",
//     category: "data-science",
//     synonyms: ["seaborn python"],
//     implicit: ["statistical visualization", "plotting"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "jupyter": {
//     canonical: "jupyter",
//     category: "data-science",
//     synonyms: ["jupyter notebook", "ipython", "jupyter lab"],
//     implicit: ["interactive computing", "notebooks", "data exploration"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "r-programming": {
//     canonical: "r-programming",
//     category: "data-science",
//     synonyms: ["r", "r language", "rstudio"],
//     implicit: ["statistical computing", "data analysis", "ggplot2"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "spacy": {
//     canonical: "spacy",
//     category: "data-science",
//     synonyms: ["spacy nlp"],
//     implicit: ["nlp", "natural language processing", "text processing"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "nltk": {
//     canonical: "nltk",
//     category: "data-science",
//     synonyms: ["natural language toolkit", "nltk python"],
//     implicit: ["nlp", "text analysis", "linguistics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "huggingface": {
//     canonical: "huggingface",
//     category: "ai-ml",
//     synonyms: ["transformers", "hugging face", "hf"],
//     implicit: ["nlp", "transformers", "pretrained models", "llm"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true,
//     futureProof: true
//   },

//   "opencv": {
//     canonical: "opencv",
//     category: "data-science",
//     synonyms: ["open cv", "computer vision"],
//     implicit: ["image processing", "computer vision", "video analysis"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "langchain": {
//     canonical: "langchain",
//     category: "ai-ml",
//     synonyms: ["lang chain"],
//     implicit: ["llm", "ai chains", "prompt engineering"],
//     weight: 1.5,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 2,
//     emerging: true,
//     futureProof: true
//   },

//   "llm": {
//     canonical: "llm",
//     category: "ai-ml",
//     synonyms: ["large language models", "gpt", "chatgpt", "llms"],
//     implicit: ["ai", "transformers", "generative ai", "prompt engineering"],
//     weight: 1.6,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 3,
//     emerging: true,
//     futureProof: true
//   },

//   "stable-diffusion": {
//     canonical: "stable-diffusion",
//     category: "ai-ml",
//     synonyms: ["sd", "image generation", "diffusion models"],
//     implicit: ["generative ai", "image synthesis", "ai art"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 2,
//     emerging: true,
//     futureProof: true
//   },

//   "mlflow": {
//     canonical: "mlflow",
//     category: "data-science",
//     synonyms: ["ml flow"],
//     implicit: ["mlops", "model tracking", "experiment tracking"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "apache-spark": {
//     canonical: "apache-spark",
//     category: "data-science",
//     synonyms: ["spark", "pyspark", "spark sql"],
//     implicit: ["big data", "distributed computing", "data processing"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 12
//   },

//   "hadoop": {
//     canonical: "hadoop",
//     category: "data-science",
//     synonyms: ["apache hadoop", "hdfs", "mapreduce"],
//     implicit: ["big data", "distributed storage", "data processing"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15
//   },

//   "airflow": {
//     canonical: "airflow",
//     category: "data-science",
//     synonyms: ["apache airflow", "workflow orchestration"],
//     implicit: ["data pipelines", "dag", "scheduling", "etl"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "tableau": {
//     canonical: "tableau",
//     category: "data-science",
//     synonyms: ["tableau desktop", "tableau server"],
//     implicit: ["data visualization", "bi", "dashboards", "analytics"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "power-bi": {
//     canonical: "power-bi",
//     category: "data-science",
//     synonyms: ["powerbi", "microsoft power bi"],
//     implicit: ["business intelligence", "data visualization", "dax"],
//     weight: 1.2,
//     section: "skillsList",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "looker": {
//     canonical: "looker",
//     category: "data-science",
//     synonyms: ["looker bi", "google looker"],
//     implicit: ["business intelligence", "data exploration", "lookml"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "dbt": {
//     canonical: "dbt",
//     category: "data-science",
//     synonyms: ["data build tool", "dbt cloud"],
//     implicit: ["data transformation", "analytics engineering", "sql"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "snowflake": {
//     canonical: "snowflake",
//     category: "databases",
//     synonyms: ["snowflake db", "snowflake data warehouse"],
//     implicit: ["data warehouse", "cloud data platform", "sql"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "databricks": {
//     canonical: "databricks",
//     category: "data-science",
//     synonyms: ["databricks platform"],
//     implicit: ["spark", "data lakehouse", "collaborative analytics"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "redshift": {
//     canonical: "redshift",
//     category: "databases",
//     synonyms: ["aws redshift", "amazon redshift"],
//     implicit: ["data warehouse", "columnar storage", "analytics"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "bigquery": {
//     canonical: "bigquery",
//     category: "databases",
//     synonyms: ["google bigquery", "bq"],
//     implicit: ["data warehouse", "serverless", "analytics", "sql"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🔒 SECURITY & COMPLIANCE (100+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "cybersecurity": {
//     canonical: "cybersecurity",
//     category: "security",
//     synonyms: ["cyber security", "information security", "infosec"],
//     implicit: ["threat detection", "security audits", "vulnerability"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "penetration-testing": {
//     canonical: "penetration-testing",
//     category: "security",
//     synonyms: ["pen testing", "ethical hacking", "pentesting"],
//     implicit: ["vulnerability assessment", "security testing", "exploits"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 20
//   },

//   "owasp": {
//     canonical: "owasp",
//     category: "security",
//     synonyms: ["owasp top 10", "web application security"],
//     implicit: ["security best practices", "vulnerabilities", "secure coding"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "oauth": {
//     canonical: "oauth",
//     category: "security",
//     synonyms: ["oauth2", "oauth 2.0", "authentication"],
//     implicit: ["authorization", "token-based auth", "security"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "jwt": {
//     canonical: "jwt",
//     category: "security",
//     synonyms: ["json web token", "json web tokens"],
//     implicit: ["authentication", "tokens", "stateless auth"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ssl-tls": {
//     canonical: "ssl-tls",
//     category: "security",
//     synonyms: ["ssl", "tls", "https", "certificates"],
//     implicit: ["encryption", "secure communication", "certificates"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "encryption": {
//     canonical: "encryption",
//     category: "security",
//     synonyms: ["cryptography", "data encryption", "aes", "rsa"],
//     implicit: ["data protection", "security", "ciphers"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "soc": {
//     canonical: "soc",
//     category: "security",
//     synonyms: ["security operations center", "soc analyst"],
//     implicit: ["threat monitoring", "incident response", "security"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 15
//   },

//   "siem": {
//     canonical: "siem",
//     category: "security",
//     synonyms: ["security information event management", "splunk", "qradar"],
//     implicit: ["log analysis", "threat detection", "security monitoring"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 18
//   },

//   "iam": {
//     canonical: "iam",
//     category: "security",
//     synonyms: ["identity access management", "access control"],
//     implicit: ["authentication", "authorization", "rbac", "permissions"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "gdpr": {
//     canonical: "gdpr",
//     category: "compliance",
//     synonyms: ["general data protection regulation", "data privacy"],
//     implicit: ["compliance", "data protection", "privacy"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "hipaa": {
//     canonical: "hipaa",
//     category: "compliance",
//     synonyms: ["health insurance portability", "healthcare compliance"],
//     implicit: ["compliance", "healthcare data", "privacy"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "pci-dss": {
//     canonical: "pci-dss",
//     category: "compliance",
//     synonyms: ["pci", "payment card industry", "pci compliance"],
//     implicit: ["payment security", "compliance", "card data"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "iso-27001": {
//     canonical: "iso-27001",
//     category: "compliance",
//     synonyms: ["iso27001", "information security management"],
//     implicit: ["compliance", "security standards", "isms"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "soc2": {
//     canonical: "soc2",
//     category: "compliance",
//     synonyms: ["soc 2", "service organization control"],
//     implicit: ["compliance", "audit", "security controls"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 📊 BUSINESS & MANAGEMENT (150+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "product-management": {
//     canonical: "product-management",
//     category: "product-management",
//     synonyms: ["product manager", "pm", "product owner", "product strategy"],
//     implicit: ["roadmap", "stakeholder management", "user stories", "prioritization"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "scrum-master": {
//     canonical: "scrum-master",
//     category: "project-management",
//     synonyms: ["scrum", "csm", "certified scrum master"],
//     implicit: ["agile", "sprint planning", "facilitation", "ceremonies"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "pmp": {
//     canonical: "pmp",
//     category: "project-management",
//     synonyms: ["project management professional", "pmi", "pmbok"],
//     implicit: ["project planning", "risk management", "stakeholder management"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "six-sigma": {
//     canonical: "six-sigma",
//     category: "project-management",
//     synonyms: ["lean six sigma", "6 sigma", "green belt", "black belt"],
//     implicit: ["process improvement", "quality management", "dmaic"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "salesforce": {
//     canonical: "salesforce",
//     category: "sales-business-development",
//     synonyms: ["sfdc", "crm", "sales cloud", "service cloud"],
//     implicit: ["customer relationship management", "sales automation"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 23
//   },

//   "hubspot": {
//     canonical: "hubspot",
//     category: "sales-business-development",
//     synonyms: ["hubspot crm", "marketing automation"],
//     implicit: ["inbound marketing", "crm", "marketing automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "google-analytics": {
//     canonical: "google-analytics",
//     category: "marketing",
//     synonyms: ["ga", "ga4", "google analytics 4", "web analytics"],
//     implicit: ["analytics", "tracking", "metrics", "reporting"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "seo": {
//     canonical: "seo",
//     category: "marketing",
//     synonyms: ["search engine optimization", "organic search"],
//     implicit: ["keywords", "ranking", "backlinks", "on-page seo"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "sem": {
//     canonical: "sem",
//     category: "marketing",
//     synonyms: ["search engine marketing", "ppc", "paid search"],
//     implicit: ["google ads", "paid advertising", "bidding"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "google-ads": {
//     canonical: "google-ads",
//     category: "marketing",
//     synonyms: ["adwords", "google adwords", "ppc"],
//     implicit: ["paid advertising", "campaigns", "keywords"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "facebook-ads": {
//     canonical: "facebook-ads",
//     category: "marketing",
//     synonyms: ["meta ads", "fb ads", "instagram ads"],
//     implicit: ["social media advertising", "targeting", "campaigns"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "content-marketing": {
//     canonical: "content-marketing",
//     category: "marketing",
//     synonyms: ["content strategy", "content creation"],
//     implicit: ["blogging", "copywriting", "storytelling"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "email-marketing": {
//     canonical: "email-marketing",
//     category: "marketing",
//     synonyms: ["email campaigns", "newsletter", "mailchimp"],
//     implicit: ["automation", "segmentation", "a/b testing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "social-media-marketing": {
//     canonical: "social-media-marketing",
//     category: "marketing",
//     synonyms: ["smm", "social media", "community management"],
//     implicit: ["engagement", "content creation", "analytics"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "financial-analysis": {
//     canonical: "financial-analysis",
//     category: "finance",
//     synonyms: ["financial modeling", "financial planning", "fp&a"],
//     implicit: ["forecasting", "budgeting", "variance analysis"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "accounting": {
//     canonical: "accounting",
//     category: "finance",
//     synonyms: ["bookkeeping", "general ledger", "cpa"],
//     implicit: ["financial statements", "reconciliation", "gaap"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "quickbooks": {
//     canonical: "quickbooks",
//     category: "finance",
//     synonyms: ["quickbooks online", "qb", "qbo"],
//     implicit: ["accounting software", "bookkeeping", "invoicing"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 25
//   },

//   "sap": {
//     canonical: "sap",
//     category: "enterprise-software",
//     synonyms: ["sap erp", "sap s/4hana", "sap fico", "sap mm"],
//     implicit: ["erp", "enterprise resource planning", "modules"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "oracle-erp": {
//     canonical: "oracle-erp",
//     category: "enterprise-software",
//     synonyms: ["oracle", "oracle cloud", "oracle fusion"],
//     implicit: ["erp", "enterprise applications"],
//     weight: 1.2,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 25
//   },

//   "workday": {
//     canonical: "workday",
//     category: "hr-tech",
//     synonyms: ["workday hcm", "workday financials"],
//     implicit: ["human capital management", "hris", "payroll"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "hr-management": {
//     canonical: "hr-management",
//     category: "human-resources",
//     synonyms: ["human resources", "hr", "talent management", "recruitment"],
//     implicit: ["hiring", "onboarding", "performance management"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "recruiting": {
//     canonical: "recruiting",
//     category: "human-resources",
//     synonyms: ["recruitment", "talent acquisition", "sourcing", "headhunting"],
//     implicit: ["interviewing", "candidate screening", "ats"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "supply-chain": {
//     canonical: "supply-chain",
//     category: "operations",
//     synonyms: ["supply chain management", "scm", "logistics"],
//     implicit: ["procurement", "inventory", "distribution"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "operations-management": {
//     canonical: "operations-management",
//     category: "operations",
//     synonyms: ["operations", "ops", "process improvement"],
//     implicit: ["efficiency", "optimization", "workflow"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "quality-assurance": {
//     canonical: "quality-assurance",
//     category: "quality",
//     synonyms: ["qa", "quality control", "testing"],
//     implicit: ["test plans", "bug tracking", "test cases"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "selenium": {
//     canonical: "selenium",
//     category: "quality",
//     synonyms: ["selenium webdriver", "test automation"],
//     implicit: ["automated testing", "web testing", "test scripts"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "cypress": {
//     canonical: "cypress",
//     category: "quality",
//     synonyms: ["cypress.io", "cypress testing"],
//     implicit: ["e2e testing", "frontend testing", "test automation"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "jest": {
//     canonical: "jest",
//     category: "quality",
//     synonyms: ["jest testing", "javascript testing"],
//     implicit: ["unit testing", "snapshot testing", "mocking"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "mocha": {
//     canonical: "mocha",
//     category: "quality",
//     synonyms: ["mocha testing", "chai"],
//     implicit: ["javascript testing", "test framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "junit": {
//     canonical: "junit",
//     category: "quality",
//     synonyms: ["junit testing", "junit5"],
//     implicit: ["java testing", "unit testing"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 22
//   },

//   "pytest": {
//     canonical: "pytest",
//     category: "quality",
//     synonyms: ["pytest framework", "python testing"],
//     implicit: ["unit testing", "fixtures", "test automation"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ═══════════════════════════════════════════════════════════════════════
//   // 🎮 GAMING & GRAPHICS (80+ skills)
//   // ═══════════════════════════════════════════════════════════════════════

//   "unity": {
//     canonical: "unity",
//     category: "game-development",
//     synonyms: ["unity3d", "unity engine", "unity game engine"],
//     implicit: ["game development", "c# scripting", "3d games"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "unreal-engine": {
//     canonical: "unreal-engine",
//     category: "game-development",
//     synonyms: ["unreal", "ue4", "ue5", "blueprints"],
//     implicit: ["game development", "3d graphics", "c++"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "godot": {
//     canonical: "godot",
//     category: "game-development",
//     synonyms: ["godot engine"],
//     implicit: ["game development", "gdscript", "2d/3d games"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "threejs": {
//     canonical: "threejs",
//     category: "web-development",
//     synonyms: ["three.js", "webgl"],
//     implicit: ["3d graphics", "web graphics", "visualization"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "blender": {
//     canonical: "blender",
//     category: "3d-modeling",
//     synonyms: ["blender 3d", "3d modeling"],
//     implicit: ["3d", "modeling", "animation", "rendering"],
//     weight: 1.1,
//     section: "skillsList",
//     level: "mid",
// }
//   }
//   };
// // ============================================================================
// // 🔧 UTILITY FUNCTIONS
// // ============================================================================

// /**
//  * Get skill by canonical name with full metadata
//  */
// function getSkillMetadata(canonical) {
//   return skillMap[canonical] || null;
// }

// /**
//  * Get all synonyms for a skill
//  */
// function getSkillSynonyms(canonical) {
//   const skill = skillMap[canonical];
//   return skill ? skill.synonyms : [];
// }

// /**
//  * Get category of skill
//  */
// function getSkillCategory(canonical) {
//   const skill = skillMap[canonical];
//   return skill ? skill.category : "uncategorized";
// }

// /**
//  * Check if skill is emerging/future-proof
//  */
// function isEmergingSkill(canonical) {
//   const skill = skillMap[canonical];
//   return skill && skill.emerging === true;
// }

// /**
//  * Get all skills in a category
//  */
// function getSkillsByCategory(category) {
//   return Object.keys(skillMap).filter(
//     key => skillMap[key].category === category
//   );
// }

// /**
//  * Export all skills for admin import
//  */
// function exportSkillDatabase() {
//   return {
//     totalSkills: Object.keys(skillMap).length,
//     categories: [...new Set(Object.values(skillMap).map(s => s.category))],
//     skills: skillMap,
//     lastUpdated: new Date(),
//     version: "2.0"
//   };
// }

// /**
//  * Add new skill to database (called when recruiter approves a discovered skill)
//  */
// function addNewSkill(canonical, skillData) {
//   if (skillMap[canonical]) {
//     console.warn(`Skill ${canonical} already exists`);
//     return false;
//   }

//   skillMap[canonical] = {
//     canonical: canonical,
//     category: skillData.category || "uncategorized",
//     synonyms: skillData.synonyms || [],
//     implicit: skillData.implicit || [],
//     weight: skillData.weight || 1.0,
//     section: skillData.section || "generalSkills",
//     level: skillData.level || "junior",
//     yearsRelevant: skillData.yearsRelevant || 0,
//     emerging: skillData.emerging || false,
//     discoveredAt: new Date()
//   };

//   console.log(`✅ Added skill: ${canonical}`);
//   return true;
// }

// /**
//  * Merge O*NET data with existing skillMap (one-time setup)
//  */
// function mergeONETData(onetDataset) {
//   let added = 0;
  
//   Object.values(onetDataset).forEach(category => {
//     Object.values(category).forEach(skillGroup => {
//       skillGroup.skills.forEach(skillName => {
//         const canonical = skillName.toLowerCase().replace(/\s+/g, "-");
        
//         if (!skillMap[canonical]) {
//           addNewSkill(canonical, {
//             category: skillGroup.canonical,
//             weight: skillGroup.weight,
//             emerging: skillGroup.emerging,
//             synonyms: [skillName]
//           });
//           added++;
//         }
//       });
//     });
//   });

//   console.log(`✅ Merged ${added} skills from O*NET data`);
//   return added;
// }

// // ============================================================================
// // 📊 STATISTICS
// // ============================================================================

// function getSkillMapStats() {
//   const skills = Object.values(skillMap);
//   const byCategory = {};
//   const emergingCount = skills.filter(s => s.emerging).length;
//   const byLevel = { junior: 0, mid: 0, senior: 0 };

//   skills.forEach(skill => {
//     byCategory[skill.category] = (byCategory[skill.category] || 0) + 1;
//     byLevel[skill.level || "junior"]++;
//   });

//   return {
//     totalSkills: Object.keys(skillMap).length,
//     categories: Object.keys(byCategory),
//     skillsByCategory: byCategory,
//     skillsByLevel: byLevel,
//     emergingSkills: emergingCount,
//     averageWeight: (skills.reduce((sum, s) => sum + s.weight, 0) / skills.length).toFixed(2)
//   };
// }

// // ============================================================================
// // EXPORTS
// // ============================================================================

// module.exports = {
//   skillMap,
//   onetFramework,
//   getSkillMetadata,
//   getSkillSynonyms,
//   getSkillCategory,
//   isEmergingSkill,
//   getSkillsByCategory,
//   exportSkillDatabase,
//   addNewSkill,
//   mergeONETData,
//   getSkillMapStats
// };;



///=========================================================///
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/**
 * Global Skill Taxonomy & Intelligence Map (2026 Standard)
 * Merges your "SkillMap" with "Intelligence Metadata" for deep matching.
 */

// // 1. MUST DEFINE THIS TO STOP THE CRASH
// const onetFramework = {
//   version: "2.0",
//   description: "Standardized Skill Taxonomy",
//   lastUpdated: new Date()
// };

// // 2. CONSOLIDATED SKILL MAP (Using your data structure)
// /**
//  * GLOBAL SKILL TAXONOMY & INTELLIGENCE MAP (UNIFIED 2026)
//  * Merges Tech, Business, Healthcare, Engineering, and Emerging Technologies.
//  */

// /**
//  * COMPREHENSIVE SKILL TAXONOMY 2026
//  * Total Skills: 500+ across all industries and categories
//  * Each skill includes: canonical name, category, synonyms, implicit keywords, weight, and metadata
//  */

// const skillMap = {
//   // ============================================================================
//   // FRONTEND & WEB DEVELOPMENT
//   // ============================================================================
  
//   "react": {
//     canonical: "react",
//     category: "web-development",
//     synonyms: ["react.js", "reactjs", "react js", "react native", "react-native", "nextjs", "next.js", "next js", "remix", "gatsby", "jsx", "tsx"],
//     implicit: ["component based", "spa", "single page application", "hooks", "context api", "redux", "state management", "virtual dom"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "vue": {
//     canonical: "vue",
//     category: "web-development",
//     synonyms: ["vue.js", "vuejs", "vue js", "nuxt", "nuxt.js", "vuex"],
//     implicit: ["reactive framework", "vue components", "single file components"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "angular": {
//     canonical: "angular",
//     category: "web-development",
//     synonyms: ["angularjs", "angular.js", "ng", "angular 2", "typescript framework"],
//     implicit: ["dependency injection", "directives", "services", "two-way binding"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "javascript": {
//     canonical: "javascript",
//     category: "programming-languages",
//     synonyms: ["js", "ecmascript", "es6", "es2015", "vanilla js", "vanilla javascript", "jquery"],
//     implicit: ["async await", "promises", "callbacks", "event loop", "closures", "prototypes", "dom manipulation"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "typescript": {
//     canonical: "typescript",
//     category: "web-development",
//     synonyms: ["ts", "type script", "typed javascript"],
//     implicit: ["type safety", "interfaces", "generics", "decorators", "static typing"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "html": {
//     canonical: "html",
//     category: "web-development",
//     synonyms: ["html5", "html 5", "markup", "semantic html", "web markup"],
//     implicit: ["semantic elements", "accessibility", "forms", "canvas", "web structure", "seo"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "css": {
//     canonical: "css",
//     category: "web-development",
//     synonyms: ["css3", "cascading style sheets", "stylesheets", "styling"],
//     implicit: ["flexbox", "grid", "responsive design", "animations", "media queries", "mobile first"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 30
//   },

//   "sass": {
//     canonical: "sass",
//     category: "web-development",
//     synonyms: ["scss", "sass preprocessor", "syntactically awesome"],
//     implicit: ["variables", "mixins", "nesting", "partials"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "less": {
//     canonical: "less",
//     category: "web-development",
//     synonyms: ["less css", "less preprocessor"],
//     implicit: ["variables", "mixins", "functions"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "tailwind": {
//     canonical: "tailwind",
//     category: "web-development",
//     synonyms: ["tailwind css", "tailwindcss", "utility-first css"],
//     implicit: ["utility classes", "responsive utilities", "custom design", "css framework"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "bootstrap": {
//     canonical: "bootstrap",
//     category: "web-development",
//     synonyms: ["bootstrap css", "bootstrap framework", "twitter bootstrap"],
//     implicit: ["responsive grid", "components", "utilities"],
//     weight: 1.0,
//     section: "skillsList",
//     level: "junior",
//     yearsRelevant: 12
//   },

//   "material-ui": {
//     canonical: "material-ui",
//     category: "web-development",
//     synonyms: ["mui", "material design", "material-ui react"],
//     implicit: ["google design", "react components", "theming"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "ant-design": {
//     canonical: "ant-design",
//     category: "web-development",
//     synonyms: ["antd", "ant design react"],
//     implicit: ["enterprise ui", "design system"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "chakra-ui": {
//     canonical: "chakra-ui",
//     category: "web-development",
//     synonyms: ["chakra", "chakra react"],
//     implicit: ["accessible components", "themeable"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "svelte": {
//     canonical: "svelte",
//     category: "web-development",
//     synonyms: ["sveltejs", "svelte framework", "sveltekit"],
//     implicit: ["reactive", "compiler", "no virtual dom"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5,
//     emerging: true
//   },

//   "solid": {
//     canonical: "solid",
//     category: "web-development",
//     synonyms: ["solidjs", "solid framework"],
//     implicit: ["fine-grained reactivity", "performant"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "webpack": {
//     canonical: "webpack",
//     category: "web-development",
//     synonyms: ["webpack bundler", "module bundler"],
//     implicit: ["bundling", "optimization", "loaders", "plugins"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "vite": {
//     canonical: "vite",
//     category: "web-development",
//     synonyms: ["vite build tool", "vitejs"],
//     implicit: ["fast hmr", "esm", "rollup"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 3,
//     emerging: true
//   },

//   "parcel": {
//     canonical: "parcel",
//     category: "web-development",
//     synonyms: ["parcel bundler"],
//     implicit: ["zero config", "bundling"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "graphql": {
//     canonical: "graphql",
//     category: "web-development",
//     synonyms: ["graph ql", "gql", "apollo", "relay"],
//     implicit: ["queries", "mutations", "subscriptions", "schema"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "rest-api": {
//     canonical: "rest-api",
//     category: "backend-development",
//     synonyms: ["rest", "restful", "restful api", "rest services"],
//     implicit: ["http methods", "endpoints", "json", "api design"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "websockets": {
//     canonical: "websockets",
//     category: "web-development",
//     synonyms: ["socket.io", "ws", "real-time communication"],
//     implicit: ["bidirectional", "real-time", "persistent connection"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "responsive-design": {
//     canonical: "responsive-design",
//     category: "web-development",
//     synonyms: ["mobile-first", "adaptive design"],
//     implicit: ["breakpoints", "fluid layouts", "media queries"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "progressive-web-apps": {
//     canonical: "progressive-web-apps",
//     category: "web-development",
//     synonyms: ["pwa", "progressive web applications"],
//     implicit: ["service workers", "offline", "app-like"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "single-page-applications": {
//     canonical: "single-page-applications",
//     category: "web-development",
//     synonyms: ["spa", "single page apps"],
//     implicit: ["client-side routing", "dynamic", "framework"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "jamstack": {
//     canonical: "jamstack",
//     category: "web-development",
//     synonyms: ["javascript apis markup", "static sites"],
//     implicit: ["static generation", "cdn", "modern web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "threejs": {
//     canonical: "threejs",
//     category: "web-development",
//     synonyms: ["three.js", "webgl"],
//     implicit: ["3d graphics", "web graphics", "visualization"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ============================================================================
//   // BACKEND DEVELOPMENT
//   // ============================================================================

//   "node": {
//     canonical: "node",
//     category: "backend-development",
//     synonyms: ["node.js", "nodejs", "node js", "express", "expressjs", "express.js", "nestjs", "nest.js", "fastify", "koa", "hapi"],
//     implicit: ["server-side javascript", "rest api", "http server", "middleware", "backend development", "async/await", "event loop"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "python": {
//     canonical: "python",
//     category: "backend-development",
//     synonyms: ["py", "python3", "django", "flask", "fastapi", "pyramid", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch"],
//     implicit: ["data analysis", "machine learning", "automation", "scripting", "backend development"],
//     weight: 1.4,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "java": {
//     canonical: "java",
//     category: "backend-development",
//     synonyms: ["java se", "java ee", "spring", "spring boot", "hibernate", "maven", "gradle", "jvm", "kotlin"],
//     implicit: ["object oriented", "enterprise applications", "multithreading", "backend development", "oop"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "csharp": {
//     canonical: "csharp",
//     category: "programming-languages",
//     synonyms: ["c#", "c sharp", ".net", "dotnet", "asp.net", "asp.net core", "entity framework", "linq"],
//     implicit: ["microsoft stack", "backend development", "object oriented"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 23
//   },

//   "php": {
//     canonical: "php",
//     category: "programming-languages",
//     synonyms: ["php7", "php8", "laravel", "symfony", "codeigniter", "wordpress", "drupal", "magento", "php programming"],
//     implicit: ["server-side scripting", "web development"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 28
//   },

//   "ruby": {
//     canonical: "ruby",
//     category: "programming-languages",
//     synonyms: ["ruby on rails", "rails", "ror", "sinatra", "ruby programming"],
//     implicit: ["mvc framework", "backend development", "scripting", "object oriented"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "golang": {
//     canonical: "golang",
//     category: "backend-development",
//     synonyms: ["go", "go lang"],
//     implicit: ["concurrent programming", "microservices", "high performance", "backend development", "concurrency", "goroutines"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8,
//     emerging: true
//   },

//   "rust": {
//     canonical: "rust",
//     category: "backend-development",
//     synonyms: ["rust lang"],
//     implicit: ["memory safety", "systems programming", "performance"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "c": {
//     canonical: "c",
//     category: "programming-languages",
//     synonyms: ["c programming", "ansi c"],
//     implicit: ["low-level", "systems programming", "pointers"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 40
//   },

//   "cpp": {
//     canonical: "cpp",
//     category: "programming-languages",
//     synonyms: ["c++", "cplusplus", "c plus plus"],
//     implicit: ["object oriented", "templates", "stl"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   "perl": {
//     canonical: "perl",
//     category: "programming-languages",
//     synonyms: ["perl programming"],
//     implicit: ["scripting", "text processing", "regex"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   "scala": {
//     canonical: "scala",
//     category: "programming-languages",
//     synonyms: ["scala programming"],
//     implicit: ["functional", "jvm", "akka"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "elixir": {
//     canonical: "elixir",
//     category: "programming-languages",
//     synonyms: ["elixir programming", "phoenix"],
//     implicit: ["functional", "erlang vm", "concurrent"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "haskell": {
//     canonical: "haskell",
//     category: "programming-languages",
//     synonyms: ["haskell programming"],
//     implicit: ["functional", "pure", "type system"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 30
//   },

//   "clojure": {
//     canonical: "clojure",
//     category: "programming-languages",
//     synonyms: ["clojure programming"],
//     implicit: ["functional", "lisp", "jvm"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "dart": {
//     canonical: "dart",
//     category: "programming-languages",
//     synonyms: ["dart programming"],
//     implicit: ["flutter", "mobile", "web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12,
//     emerging: true
//   },

//   "lua": {
//     canonical: "lua",
//     category: "programming-languages",
//     synonyms: ["lua scripting"],
//     implicit: ["scripting", "game development", "embedded"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "assembly": {
//     canonical: "assembly",
//     category: "programming-languages",
//     synonyms: ["asm", "assembly language", "x86"],
//     implicit: ["low-level", "machine code", "optimization"],
//     weight: 1.1,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 40
//   },

//   "powershell-scripting": {
//     canonical: "powershell-scripting",
//     category: "programming-languages",
//     synonyms: ["powershell", "ps1", "windows powershell", "pwsh"],
//     implicit: ["windows automation", "scripting", "cmdlets"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "groovy": {
//     canonical: "groovy",
//     category: "programming-languages",
//     synonyms: ["groovy programming"],
//     implicit: ["jvm", "scripting", "gradle"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "fortran": {
//     canonical: "fortran",
//     category: "programming-languages",
//     synonyms: ["fortran programming"],
//     implicit: ["scientific computing", "numerical"],
//     weight: 0.9,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 50
//   },

//   "cobol": {
//     canonical: "cobol",
//     category: "programming-languages",
//     synonyms: ["cobol programming"],
//     implicit: ["legacy systems", "mainframe", "business"],
//     weight: 0.9,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 60
//   },

//   "django": {
//     canonical: "django",
//     category: "backend-development",
//     synonyms: ["django framework", "django python"],
//     implicit: ["orm", "admin panel", "mvc", "templates"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "flask": {
//     canonical: "flask",
//     category: "backend-development",
//     synonyms: ["flask python", "flask framework"],
//     implicit: ["micro framework", "wsgi", "jinja2"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "fastapi": {
//     canonical: "fastapi",
//     category: "backend-development",
//     synonyms: ["fast api", "fastapi python"],
//     implicit: ["async", "pydantic", "openapi", "modern python"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "express": {
//     canonical: "express",
//     category: "backend-development",
//     synonyms: ["expressjs", "express.js", "express node"],
//     implicit: ["middleware", "routing", "node framework"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "nestjs": {
//     canonical: "nestjs",
//     category: "backend-development",
//     synonyms: ["nest", "nest.js", "nest framework"],
//     implicit: ["typescript", "decorators", "modular", "enterprise"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "spring": {
//     canonical: "spring",
//     category: "backend-development",
//     synonyms: ["spring framework", "spring boot", "spring mvc"],
//     implicit: ["dependency injection", "ioc", "enterprise java"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "laravel": {
//     canonical: "laravel",
//     category: "backend-development",
//     synonyms: ["laravel php", "laravel framework"],
//     implicit: ["eloquent", "blade", "artisan", "migrations"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "symfony": {
//     canonical: "symfony",
//     category: "backend-development",
//     synonyms: ["symfony php", "symfony framework"],
//     implicit: ["bundles", "doctrine", "twig"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "rails": {
//     canonical: "rails",
//     category: "backend-development",
//     synonyms: ["ruby on rails", "ror", "rails framework"],
//     implicit: ["mvc", "active record", "convention over configuration"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 18
//   },

//   "aspnet": {
//     canonical: "aspnet",
//     category: "backend-development",
//     synonyms: ["asp.net", "asp.net core", "dotnet", ".net"],
//     implicit: ["c#", "mvc", "web api", "razor"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 20
//   },

//   "dotnet-core": {
//     canonical: "dotnet-core",
//     category: "backend-development",
//     synonyms: [".net core", "dotnet", "net core"],
//     implicit: ["cross-platform", "modern .net", "microservices"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7,
//     emerging: true
//   },

//   "gin": {
//     canonical: "gin",
//     category: "backend-development",
//     synonyms: ["gin golang", "gin framework", "gin-gonic"],
//     implicit: ["http router", "middleware", "go web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6
//   },

//   "echo": {
//     canonical: "echo",
//     category: "backend-development",
//     synonyms: ["echo golang", "echo framework"],
//     implicit: ["high performance", "go framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "actix": {
//     canonical: "actix",
//     category: "backend-development",
//     synonyms: ["actix-web", "actix rust"],
//     implicit: ["actor system", "async", "rust web"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 4,
//     emerging: true
//   },

//   "rocket": {
//     canonical: "rocket",
//     category: "backend-development",
//     synonyms: ["rocket rust", "rocket framework"],
//     implicit: ["type-safe", "rust web framework"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 5
//   },

//   "microservices": {
//     canonical: "microservices",
//     category: "backend-development",
//     synonyms: ["microservice architecture", "micro services", "distributed systems"],
//     implicit: ["api gateway", "service mesh", "decoupled", "scalable"],
//     weight: 1.4,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "grpc": {
//     canonical: "grpc",
//     category: "backend-development",
//     synonyms: ["grpc framework", "google rpc"],
//     implicit: ["protobuf", "binary protocol", "rpc"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 7
//   },

//   "rabbitmq": {
//     canonical: "rabbitmq",
//     category: "backend-development",
//     synonyms: ["rabbit mq", "amqp", "message broker"],
//     implicit: ["message queue", "asynchronous", "pub/sub"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   "kafka": {
//     canonical: "kafka",
//     category: "backend-development",
//     synonyms: ["apache kafka", "event streaming"],
//     implicit: ["streaming", "distributed log", "real-time data"],
//     weight: 1.3,
//     section: "experience",
//     level: "senior",
//     yearsRelevant: 10
//   },

//   "celery": {
//     canonical: "celery",
//     category: "backend-development",
//     synonyms: ["celery python", "task queue"],
//     implicit: ["distributed tasks", "asynchronous", "workers"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   // ============================================================================
//   // MOBILE DEVELOPMENT
//   // ============================================================================

//   "react-native": {
//     canonical: "react-native",
//     category: "mobile-development",
//     synonyms: ["react native", "rn", "react-native framework"],
//     implicit: ["cross-platform", "native modules", "expo"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "flutter": {
//     canonical: "flutter",
//     category: "mobile-development",
//     synonyms: ["flutter framework", "dart flutter"],
//     implicit: ["dart", "widgets", "cross-platform", "material design"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 6,
//     emerging: true
//   },

//   "swift": {
//     canonical: "swift",
//     category: "mobile-development",
//     synonyms: ["swift ios", "swift programming", "swiftui"],
//     implicit: ["ios development", "xcode", "cocoa touch", "apple"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "objective-c": {
//     canonical: "objective-c",
//     category: "mobile-development",
//     synonyms: ["objective c", "obj-c", "objc"],
//     implicit: ["ios legacy", "cocoa", "foundation", "macos"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 35
//   },

//   "kotlin": {
//     canonical: "kotlin",
//     category: "mobile-development",
//     synonyms: ["kotlin android", "kotlin programming"],
//     implicit: ["android development", "jetpack", "coroutines"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 8
//   },

//   "android": {
//     canonical: "android",
//     category: "mobile-development",
//     synonyms: ["android development", "android sdk", "android studio"],
//     implicit: ["activities", "fragments", "services", "gradle"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "ios": {
//     canonical: "ios",
//     category: "mobile-development",
//     synonyms: ["ios development", "iphone development"],
//     implicit: ["uikit", "foundation", "core data", "app store"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 15
//   },

//   "xamarin": {
//     canonical: "xamarin",
//     category: "mobile-development",
//     synonyms: ["xamarin forms", "xamarin.forms"],
//     implicit: ["cross-platform", "c# mobile", ".net mobile"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "ionic": {
//     canonical: "ionic",
//     category: "mobile-development",
//     synonyms: ["ionic framework", "ionic angular"],
//     implicit: ["hybrid apps", "capacitor", "cordova"],
//     weight: 1.0,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 10
//   },

//   "cordova": {
//     canonical: "cordova",
//     category: "mobile-development",
//     synonyms: ["apache cordova", "phonegap"],
//     implicit: ["hybrid apps", "webview", "plugins"],
//     weight: 0.9,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

//   // ============================================================================
//   // DATABASES
//   // ============================================================================

//   "sql": {
//     canonical: "sql",
//     category: "databases",
//     synonyms: ["mysql", "postgresql", "postgres", "sqlite", "mssql", "sql server", "oracle", "mariadb", "database queries"],
//     implicit: ["relational database", "joins", "indexing", "query optimization", "stored procedures", "normalization"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 30
//   },

//   "postgresql": {
//     canonical: "postgresql",
//     category: "databases",
//     synonyms: ["postgres", "psql", "postgresql database"],
//     implicit: ["relational", "acid", "json support", "full-text search"],
//     weight: 1.3,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mysql": {
//     canonical: "mysql",
//     category: "databases",
//     synonyms: ["my sql", "mysql database"],
//     implicit: ["relational", "innodb", "mariadb compatible"],
//     weight: 1.2,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 25
//   },

//   "mariadb": {
//     canonical: "mariadb",
//     category: "databases",
//     synonyms: ["maria db"],
//     implicit: ["mysql fork", "relational", "open source"],
//     weight: 1.1,
//     section: "experience",
//     level: "mid",
//     yearsRelevant: 12
//   },

// };

// /**
//  * ADVANCED NORMALIZATION ENGINE
//  */
// const normalizeSkill = (rawSkill) => {
//   if (!rawSkill || typeof rawSkill !== "string") return "";
//   const clean = rawSkill.toLowerCase().trim();
//   if (clean.length < 2) return "";

//   // Exact Match & Synonym Check
//   for (const [key, data] of Object.entries(skillMap)) {
//     if (clean === data.canonical || data.synonyms.some(syn => clean === syn || clean.includes(syn))) {
//       return data.canonical;
//     }
//     // Implicit trigger match
//     if (data.implicit.some(imp => clean.includes(imp))) {
//       return data.canonical;
//     }
//   }

//   return clean; // Return as-is if no match found
// };



// /**
//  * Get Skill Weight for Scoring Logic
//  */
// const getSkillWeight = (canonicalSkill) => {
//   const skill = skillMap[canonicalSkill];
//   return skill ? (skill.weight || 1.0) : 1.0;
// };

// /**
//  * Standard Keyword Extraction Helper
//  */
// const extractSkillsFromText = (text) => {
//   if (!text) return [];
//   const lowerText = text.toLowerCase();
//   const foundSkills = new Set();

//   for (const [key, data] of Object.entries(skillMap)) {
//     const matched = 
//       lowerText.includes(data.canonical) || 
//       (data.synonyms && data.synonyms.some(syn => lowerText.includes(syn))) ||
//       (data.implicit && data.implicit.some(imp => lowerText.includes(imp)));

//     if (matched) foundSkills.add(data.canonical);
//   }
//   return Array.from(foundSkills);
// };

// // ============================================================================
// // 🔧 UTILITY FUNCTIONS
// // ============================================================================

// function getSkillMetadata(canonical) { return skillMap[canonical] || null; }
// function getSkillSynonyms(canonical) { return skillMap[canonical]?.synonyms || []; }
// function getSkillCategory(canonical) { return skillMap[canonical]?.category || "uncategorized"; }
// function isEmergingSkill(canonical) { return skillMap[canonical]?.emerging === true; }

// function getSkillMapStats() {
//   const skills = Object.values(skillMap);
//   const byCategory = {};
//   skills.forEach(skill => {
//     byCategory[skill.category] = (byCategory[skill.category] || 0) + 1;
//   });

//   return {
//     totalSkills: Object.keys(skillMap).length,
//     categories: Object.keys(byCategory),
//     skillsByCategory: byCategory
//   };
// }

// // ============================================================================
// // 📤 EXPORTS (All must be defined above!)
// // ============================================================================

// module.exports = {
//   skillMap,
//   onetFramework, // Now defined at line 8
//   normalizeSkill,
//   getSkillWeight,
//   extractSkillsFromText,
//   getSkillMetadata,
//   getSkillSynonyms,
//   getSkillCategory,
//   isEmergingSkill,
//   getSkillMapStats
// };




// const Skill = require("../models/Skill");

// // 🧠 High-speed memory cache
// let globalSkillMap = {};

// /**
//  * 🔄 REFRESH CACHE: Syncs server memory with MongoDB
//  */
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
//         category: s.category || "uncategorized",
//         isApproved: s.isApproved
//       };
//     });
//     globalSkillMap = newMap;
//     console.log(`🧠 Skill Cache Refreshed: ${Object.keys(globalSkillMap).length} skills loaded.`);
//   } catch (err) {
//     console.error("❌ Failed to refresh skill cache:", err.message);
//   }
// };

// /**
//  * 🎯 NORMALIZE SKILL: Uses the memory cache for matching
//  */
// /**
//  * 🎯 NORMALIZE SKILL: Uses Regex Word Boundaries for Accuracy
//  */
// const normalizeSkill = (rawSkill) => {
//   if (!rawSkill || typeof rawSkill !== "string") return "";
//   const clean = rawSkill.toLowerCase().trim();
//   if (clean.length < 2) return "";

//   for (const [key, data] of Object.entries(globalSkillMap)) {
//     // Check canonical and synonyms using strict word boundaries
//     const isMainMatch = new RegExp(`\\b${data.canonical}\\b`, 'i').test(clean);
//     const isSynonymMatch = data.synonyms && data.synonyms.some(syn => 
//       new RegExp(`\\b${syn}\\b`, 'i').test(clean)
//     );

//     if (isMainMatch || isSynonymMatch) return data.canonical;

//     // Check implicit triggers (Only match if the exact technical phrase is found)
//     if (data.implicit && data.implicit.some(imp => clean === imp.toLowerCase())) {
//       return data.canonical;
//     }
//   }
//   return clean; 
// };

// /**
//  * ⚖️ GET SKILL WEIGHT: Returns weight from DB or default 1.0
//  */
// const getSkillWeight = (canonicalSkill) => {
//   const skill = globalSkillMap[canonicalSkill];
//   return skill ? skill.weight : 1.0; 
// };

// /**
//  * 🔍 EXTRACT SKILLS FROM TEXT: Zonal Keyword Scanner
 
// /**
//  * 🔍 EXTRACT SKILLS FROM TEXT: Zonal Keyword Scanner (SAFE VERSION)
//  */
// const extractSkillsFromText = (text) => {
//   if (!text) return [];
//   const lowerText = text.toLowerCase();
//   const foundSkills = new Set();

//   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//   for (const [key, data] of Object.entries(globalSkillMap)) {
//     // 🛡️ FIX: Use \b to match WHOLE WORDS only
//     const safeCanonical = escapeRegex(data.canonical);
//     const skillRegex = new RegExp(`\\b${safeCanonical}\\b`, 'i');
    
//     let matched = skillRegex.test(lowerText);

//     if (!matched && data.synonyms) {
//       matched = data.synonyms.some(syn => 
//         new RegExp(`\\b${escapeRegex(syn)}\\b`, 'i').test(lowerText)
//       );
//     }

//     if (matched) foundSkills.add(data.canonical);
//   }
//   return Array.from(foundSkills);
// };
// // --- HELPER EXPORTS ---
// const getSkillMetadata = (canonical) => globalSkillMap[canonical] || null;
// const getSkillCategory = (canonical) => globalSkillMap[canonical]?.category || "uncategorized";

// // Add this helper function inside backend/utils/skillMap.js
// const getKnownSkillKeys = () => {
//   return Object.keys(globalSkillMap);
// };

// module.exports = {
//   refreshSkillCache,
//   normalizeSkill,
//   getSkillWeight,
//   extractSkillsFromText,
//   getSkillMetadata,
//   getSkillCategory,
//   getKnownSkillKeys, // ✅ Add this
//   skillMap: globalSkillMap 
// };


const Skill = require("../models/Skill");

let globalSkillMap = {};

// 🛡️ HELPER: Escapes special characters like C++ or .NET for Regex
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const refreshSkillCache = async () => {
  try {
    const skills = await Skill.find({});
    const newMap = {};
    skills.forEach(s => {
      newMap[s.canonical] = {
        canonical: s.canonical,
        weight: s.weight || 1.0,
        synonyms: s.synonyms || [],
        implicit: s.implicit || [],
        isApproved: s.isApproved
      };
    });
    globalSkillMap = newMap;
    console.log(`🧠 Cache Refreshed: ${Object.keys(globalSkillMap).length} skills loaded.`);
  } catch (err) { console.error("❌ Cache error:", err.message); }
};

/**
 * 🎯 NORMALIZE SKILL: Fixed to handle C++, C#, and other symbols
 */
const normalizeSkill = (rawSkill) => {
  if (!rawSkill || typeof rawSkill !== "string") return "";
  const clean = rawSkill.toLowerCase().trim();
  if (clean.length < 2) return "";

  for (const [key, data] of Object.entries(globalSkillMap)) {
    // ✅ FIX: Escape canonical and synonyms before putting them in RegExp
    const safeCanonical = escapeRegex(data.canonical);
    const isMainMatch = new RegExp(`\\b${safeCanonical}\\b`, 'i').test(clean);

    const isSynonymMatch = data.synonyms && data.synonyms.some(syn => 
      new RegExp(`\\b${escapeRegex(syn)}\\b`, 'i').test(clean)
    );

    if (isMainMatch || isSynonymMatch) return data.canonical;

    if (data.implicit && data.implicit.some(imp => clean === imp.toLowerCase())) {
      return data.canonical;
    }
  }
  return clean; 
};

/**
 * 🔍 EXTRACT SKILLS: Fixed with Safe Regex logic
 */
const extractSkillsFromText = (text) => {
  if (!text) return [];
  const lowerText = text.toLowerCase();
  const foundSkills = new Set();

  for (const [key, data] of Object.entries(globalSkillMap)) {
    const safeCanonical = escapeRegex(data.canonical);
    const skillRegex = new RegExp(`\\b${safeCanonical}\\b`, 'i');
    
    let matched = skillRegex.test(lowerText);

    if (!matched && data.synonyms) {
      matched = data.synonyms.some(syn => 
        new RegExp(`\\b${escapeRegex(syn)}\\b`, 'i').test(lowerText)
      );
    }

    if (matched) foundSkills.add(data.canonical);
  }
  return Array.from(foundSkills);
};

module.exports = {
  refreshSkillCache,
  normalizeSkill,
  extractSkillsFromText,
  getSkillWeight: (s) => globalSkillMap[s]?.weight || 1.0,
  getKnownSkillKeys: () => Object.keys(globalSkillMap)
};