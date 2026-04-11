# Issue #9 — No File Type Validation on Resume Upload

> **Branch**: 1 (Security Fixes)  
> **Severity**: 🟠 Security — any file type could be uploaded; malware renamed as PDF  
> **Status**: ✅ Fixed

---

## 👥 The Team Room

*Sam is reviewing the upload middleware.*

---

**🟣 Sam (Security):** "Ben, what happens if I rename `malware.exe` to `resume.pdf` and try to upload it?"

**🟠 Ben (Backend):** "The old upload middleware had no file type check. Multer would accept it, Cloudinary would host it, and the URL would be stored in the database."

**🟣 Sam:** "So we'd be hosting and distributing malware through our infrastructure."

**🔴 Priya (PM):** "What's the actual risk? Cloudinary has its own protections, right?"

**🟣 Sam:** "Cloudinary stores what you send. If a recruiter's account is compromised and someone uploads a malicious PDF-looking file, that URL could be shared in notifications, emails, and application links. Anyone who clicks it and opens it could be harmed. Our domain's reputation would be associated with hosting it."

**🟠 Ben:** "Also: some 'PDFs' can contain embedded JavaScript. PDF.js (the default PDF viewer) has had XSS vulnerabilities from malicious PDFs."

**🟣 Sam:** "Right — a crafted PDF isn't just an attack on the server. It's an attack on whoever views the uploaded file. Recruiters view resumes."

---

## 🔍 Understanding the Problem

### How File Upload Works (Without Validation)

```
User selects file → Browser sends multipart/form-data → Multer receives it → 
Cloudinary stores it → URL saved in MongoDB → ✅ No checks at any point
```

### What a Malicious File Upload Looks Like

```bash
# Rename malware:
cp malware.exe resume.pdf

# Upload via curl:
curl -X POST http://localhost:5000/api/users/upload-resume \
  -H "Authorization: Bearer TOKEN" \
  -F "resume=@resume.pdf;type=application/pdf"
```

The `-F "resume=@resume.pdf;type=application/pdf"` manually sets the MIME type to `application/pdf` — the browser reports this to your server. Without validation, the server trusts it.

### What is a MIME Type?

MIME type is the file type label: `application/pdf`, `image/jpeg`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX), etc.

The browser sends the MIME type as the `Content-Type` of the file part. This is the `file.mimetype` value in Multer's `fileFilter` function. 

**The problem**: MIME types are declared by the sender. A browser reports what it thinks the file is, OR what the uploader tells it. They can be spoofed.

### What is a Magic Number?

The first few bytes of a file identify what it actually is. This cannot be spoofed without corrupting the file:

| File type | Magic bytes (hex) | ASCII |
|-----------|-------------------|-------|
| PDF | `25 50 44 46` | `%PDF` |
| ZIP | `50 4B 03 04` | `PK..` |
| EXE | `4D 5A` | `MZ` |
| JPEG | `FF D8 FF` | |
| PNG | `89 50 4E 47` | `.PNG` |

Checking magic bytes is called **file signature validation** and is much harder to spoof than MIME type.

---

## 🛠 The Fix

### What Was Added to `backend/middleware/uploadMiddleware.js`

The current fixed code does:

```js
// 3. File filter: check MIME type
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

// 4. Size limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
```

### Why MIME Type Check + Size Limit Is Sufficient Here

For Axon Hire specifically:
1. Files go directly to Cloudinary (not saved to your server's filesystem)
2. Cloudinary has its own malware scanning in paid tiers
3. The check prevents accidental wrong-file uploads (the most common case)
4. The 5MB limit prevents large file DoS attacks

For higher-security applications, you'd also check magic bytes:

```js
// Advanced: Check the first 4 bytes of the file buffer
// Requires multer's memoryStorage (not CloudinaryStorage) to access file.buffer
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  
  // If using memoryStorage, you can check magic bytes:
  // const isPDF = file.buffer && file.buffer.slice(0, 4).toString() === "%PDF";
  // if (!isPDF) return cb(new Error("File is not a valid PDF"), false);
  
  cb(null, true);
};
```

With `CloudinaryStorage`, the file is streamed directly to Cloudinary without buffering in Node.js memory — so you can't access `file.buffer`. Switching to `memStorage` first and then uploading to Cloudinary manually would enable magic byte checking at the cost of complexity.

### Handle the Error in Your Routes

When `fileFilter` calls `cb(new Error("Only PDF files are allowed"), false)`, Multer throws. You need to catch it:

```js
// In your upload route:
router.post("/upload-resume", verifyToken, (req, res) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      // Multer error (wrong type, file too large, etc.)
      return res.status(400).json({ message: err.message });
    }
    // File uploaded successfully
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    res.json({ resumeUrl: req.file.path });
  });
});
```

---

## ❓ Common Questions

**Q: We said DOCX support is a future feature (Issue #30). Should we allow DOCX uploads now?**  
A: Not until you have a DOCX parser. If you accept DOCX but can't extract text from it for AI analysis, the resume appears blank to the system. The check should match your parsing capability. When you add DOCX support (Issue #30), update the filter to also allow `application/vnd.openxmlformats-officedocument.wordprocessingml.document`.

**Q: What's the "right" file size limit for resumes?**  
A: PDFs are usually 50KB - 2MB. 5MB is generous. Going above 5MB probably means the file contains embedded images or was created wrong. You could set it to 2MB to be stricter — but 5MB won't cause problems.

**Q: Does Cloudinary scan for malware?**  
A: Cloudinary's free plan stores files without scanning. Paid plans include Rekognition-based content moderation. For true malware scanning, you'd integrate a service like VirusTotal API or Cloudmersive Virus Scan before upload.

**Q: Can we show users a preview of their uploaded PDF?**  
A: Yes. Cloudinary can transform PDFs to images: `https://res.cloudinary.com/your-cloud/image/upload/axon_resumes/filename.jpg` (note `.jpg` extension). This lets you show a thumbnail of the first page without embedding the PDF.

---

## 🎓 What You Just Learned

- MIME types are declared by the sender and can be spoofed — don't trust them alone
- Magic number (first bytes of file) validation is stronger but requires buffer access
- For Cloudinary-based uploads, MIME type + size limit is a practical security baseline
- `fileFilter` in Multer is where you reject bad files BEFORE they're uploaded anywhere
- Error handling: Multer's errors must be caught by wrapping the middleware call in a callback
- Always handle `req.file` being undefined — the upload might have failed silently
