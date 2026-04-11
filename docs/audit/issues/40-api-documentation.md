# Issue #40 — No API Documentation

> **Branch**: 6 (Developer Experience & Observability)  
> **Severity**: ⚙️ Quality — future developers and third-party integrators can't understand the API  
> **Status**: Branch 6 (pending)

---

## 👥 The Team Room

*A frontend developer (new to the team) asks about the AI scoring endpoint.*

---

**🔵 New Dev:** "What does `POST /api/ai/analyze` accept? What does it return? What happens if the job ID doesn't exist?"

**🟠 Ben (Backend):** "It's in `aiRoutes.js`. Look at the code."

**🔵 New Dev:** "I looked. It accepts `jobId` and `mode`, but I don't know the valid values for `mode`. And the response object has like 15 fields. Does `score` or `matchScore` have priority? Both are present sometimes."

**🟠 Ben:** "They're the same thing. Old name was `matchScore`, new name is `score`. We return both for backward compatibility."

**🔵 New Dev:** "That needs to be documented."

**🔴 Priya (PM):** "When we build a mobile app or allow third-party integrations, this becomes critical. Nobody wants to dig through source code to understand an API."

---

## 🔍 Two Types of API Documentation

### Type 1: OpenAPI/Swagger (Auto-generated from code)

The industry standard. You annotate your routes with JSDoc comments, and Swagger auto-generates an interactive web page where anyone can read the API and even test it directly in the browser.

### Type 2: Postman Collection (Manual but quick)

A JSON file you import into Postman that has all your routes, example requests, and example responses. Faster to set up than Swagger, but must be maintained manually.

For Branch 6: set up Swagger (Type 1) — it auto-updates as you change routes.

---

## 🛠 The Fix (to implement in Branch 6)

### Option A: Swagger with swagger-autogen (Recommended — Minimal Code Change)

`swagger-autogen` scans your route files and generates the OpenAPI spec automatically.

```bash
cd backend && npm install swagger-autogen swagger-ui-express
```

Create `backend/swagger.js`:
```js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Axon Hire API",
    description: "AI-powered recruitment platform API",
    version: "1.0.0",
  },
  host: process.env.NODE_ENV === "production" 
    ? "axon-hire-backend.onrender.com" 
    : "localhost:5000",
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter: Bearer YOUR_TOKEN",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);
```

Add JSDoc comments to your routes:

```js
// backend/routes/authRoutes.js
router.post("/login", async (req, res) => {
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Login with email and password"
    #swagger.description = "Returns a JWT token valid for 12 hours. Account locks after 5 failed attempts."
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", example: "user@example.com" },
              password: { type: "string", example: "password123" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/User" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = { description: "Invalid credentials" }
    #swagger.responses[423] = { description: "Account locked — too many failed attempts" }
  */
  // ... route handler code
});
```

Serve the Swagger UI in `backend/server.js`:
```js
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Serve API docs at /api/docs (admin only in production)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: ".swagger-ui .topbar { display: none }",
}));
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "generate-docs": "node swagger.js"
  }
}
```

Run `npm run generate-docs` to regenerate `swagger.json` after route changes.

### What the Swagger UI Looks Like

At `http://localhost:5000/api/docs`, you'll see:
- A list of all your API routes grouped by tag
- Each route shows: method, path, description, required parameters, request body shape
- "Try it out" button — you can paste a token and test endpoints directly
- Response schemas — shows exactly what fields are returned

### Option B: Postman Collection Export

If Swagger feels like too much overhead right now:
1. In Postman, create a collection named "Axon Hire API"
2. Add every endpoint with a sample request and response
3. Export as JSON → commit to `docs/axon-hire-api.postman_collection.json`
4. Anyone on the team can import it into Postman

---

## ❓ Common Questions

**Q: Should the `/api/docs` endpoint be publicly accessible?**  
A: In development yes. In production, consider restricting to admin users or putting it behind basic auth. Detailed API docs can help attackers understand attack surface.

**Q: What is OpenAPI (formerly Swagger)?**  
A: OpenAPI is a standard specification format (JSON/YAML) for describing REST APIs. Swagger is the tooling (UI, generators) built around OpenAPI. "Swagger spec" and "OpenAPI spec" are often used interchangeably.

**Q: We have both `score` and `matchScore` in responses. How do we document deprecated fields?**  
A: In Swagger:
```js
matchScore: { 
  type: "number", 
  description: "⚠️ Deprecated — use 'score' instead. Returns same value." 
}
```
And in the route: add the deprecation header (see Issue #24).

---

## 🎓 What You Learned

- API documentation tells developers: what endpoints exist, what they accept, what they return, what errors to expect
- Swagger/OpenAPI is the industry standard — generates an interactive web UI from route annotations
- `swagger-autogen` reads your Express route files and creates the spec with minimal manual work
- The Swagger UI "Try it out" feature lets developers test your API right in the browser
- Documenting deprecated fields (`matchScore` vs `score`) prevents confusion and supports backward compat
