# Issue #30 — No DOCX Resume Support

> **Branch**: 4 (AI & Resume Improvements)  
> **Severity**: 🟣 AI — candidates who upload Word documents get zero analysis  
> **Status**: Branch 4 (pending)

---

## 👥 The Team Room

*A candidate complains their AI analysis is empty.*

---

**🔵 Fay (Frontend):** "User complaint: 'I uploaded my resume but the AI score never appeared.' Let me check their profile... their `resumeUrl` points to a `.docx` file."

**🟠 Ben (Backend):** "Our `parseResumeFromUrl` function uses `pdf-parse`. It can only read PDFs. A DOCX file silently fails — it returns empty text. The AI then analyzes empty text and gives a 0 score."

**🔴 Priya (PM):** "What percentage of resumes are Word documents?"

**🟠 Ben:** "Industry surveys say 40-60% of people still create resumes in Microsoft Word."

**🔴 Priya:** "We're silently failing for half our users. This needs fixing."

---

## 🔍 The Problem

### PDF Format vs DOCX Format

**PDF** (Portable Document Format): 
- Stores the visual layout of a document
- Text is embedded in a binary structure
- `pdf-parse` extracts the raw text

**DOCX** (Open XML Word document):
- A ZIP archive containing XML files
- The XML contains structured text with formatting
- Requires a different parser (`mammoth.js` or `officegen`)

Our current code uses `pdf-parse` which cannot open DOCX files. It either throws an error or returns empty text.

### The Silent Failure

```js
// Current parseResumeFromUrl():
const pdfData = await pdfParser(buffer);
// If buffer is a DOCX file, pdf-parse returns { text: "" } or throws
const cleanText = pdfData.text.replace(...); // cleanText = ""
// AI receives empty resume → outputs generic "no skills found" result
// User sees 0% match score with no explanation
```

---

## 🛠 The Fix (to implement in Branch 4)

### Step 1: Install DOCX Parser

```bash
cd backend && npm install mammoth
```

Mammoth converts DOCX to plain text or HTML. It's the standard Node.js DOCX parser.

### Step 2: Update `backend/utils/resumeParser.js`

```js
const mammoth = require("mammoth");
const pdfParse = require("pdf-parse");

// Detect file type from URL or content
function detectFileType(url, buffer) {
  if (url.toLowerCase().endsWith(".docx")) return "docx";
  if (url.toLowerCase().endsWith(".doc")) return "doc";
  if (url.toLowerCase().endsWith(".pdf")) return "pdf";
  
  // Check magic bytes if extension is missing
  if (buffer && buffer[0] === 0x25 && buffer[1] === 0x50) return "pdf"; // %P
  if (buffer && buffer[0] === 0x50 && buffer[1] === 0x4B) return "docx"; // PK (ZIP)
  
  return "pdf"; // Default assumption
}

const parseResumeFromUrl = async (resumeUrl) => {
  if (!resumeUrl) throw new Error("Resume URL missing.");
  
  try {
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
      timeout: 15000,
    });
    
    const buffer = Buffer.from(response.data);
    const fileType = detectFileType(resumeUrl, buffer);
    
    let rawText = "";
    let links = [];
    
    if (fileType === "pdf") {
      // Existing PDF parsing
      const { text, links: pdfLinks } = await extractPdfData(buffer);
      rawText = text;
      links = pdfLinks;
    } else if (fileType === "docx") {
      // New: DOCX parsing with mammoth
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value; // Plain text content
      
      // Extract links from DOCX (mammoth doesn't extract links by default)
      const htmlResult = await mammoth.convertToHtml({ buffer });
      const linkMatches = htmlResult.value.match(/href="([^"]+)"/g) || [];
      links = linkMatches
        .map(href => href.replace(/^href="/, "").replace(/"$/, ""))
        .filter(url => url.startsWith("http"));
    } else {
      throw new Error(`Unsupported file type: ${fileType}. Please upload a PDF or Word document.`);
    }
    
    // Rest of the parsing logic is the same regardless of file type
    let cleanText = rawText.replace(/[^\x20-\x7E\n]/g, "").replace(/\s+/g, " ").trim();
    const zones = segmentResumeZones(cleanText.substring(0, 12000));
    const identifiedSkills = extractSkillsFromText(cleanText);
    
    return {
      fullText: cleanText.substring(0, 12000),
      experienceZone: zones.experienceZone,
      generalZone: zones.generalZone,
      skills: identifiedSkills,
      links,
    };
  } catch (err) {
    throw err;
  }
};
```

### Step 3: Update File Filter in Upload Middleware

```js
// backend/middleware/uploadMiddleware.js — update fileFilter:
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc (older Word format)
  ];
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only PDF and Word documents (.pdf, .docx) are allowed."), false);
  }
  
  cb(null, true);
};
```

### Step 4: Update Cloudinary Storage Format

```js
// backend/middleware/uploadMiddleware.js — update Cloudinary params:
params: async (req, file) => {
  const isPDF = file.mimetype === "application/pdf";
  return {
    folder: "axon_resumes",
    resource_type: "raw", // raw works for both PDF and DOCX
    format: isPDF ? "pdf" : undefined, // Don't force-convert DOCX to PDF
    public_id: `${file.originalname.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}`,
  };
},
```

---

## ❓ Common Questions

**Q: Should we convert DOCX to PDF on the server?**  
A: This requires LibreOffice or a similar server-side tool — complex to install and maintain. Skip conversion; just extract the text for AI analysis and store the original DOCX. Recruiters who want to view the resume can download the original file.

**Q: What about `.doc` (old Word format, not DOCX)?**  
A: `.doc` files are a binary format from Word 97-2003. They're rare today (most users save as DOCX). Mammoth has limited `.doc` support. For now, accept `.docx` only and reject `.doc` with a helpful error message: "Please save your resume as .docx (Word 2007 or newer) or .pdf."

**Q: What does mammoth.js do with formatting?**  
A: `mammoth.extractRawText()` strips all formatting and returns just the text content — which is what we need for AI analysis. `mammoth.convertToHtml()` preserves formatting as HTML — useful if we ever want to show a formatted preview.

**Q: What if the DOCX has images of text (scanned resume)?**  
A: Mammoth can't extract text from images. Neither can PDF parse for scanned PDFs. For image-based resumes, you'd need OCR (Optical Character Recognition) — a much more complex addition. For now, tell users: "For best results, use a text-based resume (not a scanned image)."

---

## 🎓 What You Learned

- PDF and DOCX are fundamentally different formats that require different parsers
- `mammoth.js` is the standard Node.js library for extracting text from DOCX files
- Magic bytes let you detect file type from the binary content, not just the extension
- The parsing logic (zone segmentation, skill extraction) is the same after text extraction — the format change only affects the first step
- Update file filters when you support new file types — and keep the allowed list explicit
