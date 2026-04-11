# 📡 API Reference

All endpoints are prefixed with `/api`. The backend runs on `http://localhost:5000` in development and `https://axon-hire-mvp.onrender.com` in production.

**Authentication**: Protected routes require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Table of Contents

- [Authentication](#authentication)
- [Jobs](#jobs)
- [Applications](#applications)
- [User Profile](#user-profile)
- [Notifications](#notifications)
- [Job Alerts](#job-alerts)
- [AI Scoring](#ai-scoring)
- [Admin](#admin)

---

## Authentication

### `POST /api/auth/register`
Register a new user (candidate). Sends a 6-digit OTP to the provided email.

**Auth required:** No

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Success response `201`:**
```json
{
  "message": "OTP sent to jane@example.com. Please verify to complete registration."
}
```

---

### `POST /api/auth/verify-otp`
Verify the OTP and activate the user account.

**Auth required:** No

**Request body:**
```json
{
  "email": "jane@example.com",
  "otp": "482910"
}
```

**Success response `200`:**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "email": "...", "role": "user" }
}
```

---

### `POST /api/auth/login`
Login with email and password.

**Auth required:** No

**Request body:**
```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Success response `200`:**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "role": "user" }
}
```

---

### `POST /api/auth/google`
Google OAuth sign-in. Creates account if new user, logs in if existing.

**Auth required:** No

**Request body:**
```json
{
  "token": "<google_id_token>"
}
```

---

### `POST /api/auth/register-recruiter`
Register a new recruiter with a company profile.

**Auth required:** No

**Request body:**
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "password": "securepassword",
  "companyName": "Acme Corp",
  "companyWebsite": "https://acme.com",
  "companyDescription": "We build great things."
}
```

---

### `PUT /api/auth/onboard-recruiter`
Upgrade an existing user account to a recruiter.

**Auth required:** Yes

---

## Jobs

### `GET /api/jobs`
List all active (open) job postings.

**Auth required:** No

**Query parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by title or description |
| `skills` | string | Comma-separated skills to filter by |

**Success response `200`:**
```json
[
  {
    "_id": "...",
    "title": "Frontend Developer",
    "company": { "name": "Acme Corp" },
    "requiredSkills": ["React", "TypeScript"],
    "isOpen": true,
    "createdAt": "..."
  }
]
```

---

### `POST /api/jobs`
Create a new job posting.

**Auth required:** Yes (Recruiter)

**Request body:**
```json
{
  "title": "Senior React Developer",
  "description": "We are looking for...",
  "requiredSkills": ["React", "Node.js", "MongoDB"],
  "experienceRequired": 3,
  "autoEvaluate": true,
  "deadline": "2026-06-01"
}
```

---

### `GET /api/jobs/my-jobs`
Get all jobs posted by the authenticated recruiter.

**Auth required:** Yes (Recruiter)

---

### `DELETE /api/jobs/:id`
Delete a job posting and cascade-delete all its applications.

**Auth required:** Yes (Recruiter — must own the job)

---

### `PATCH /api/jobs/:id/toggle`
Toggle a job between open and closed states.

**Auth required:** Yes (Recruiter — must own the job)

---

## Applications

### `POST /api/applications/:jobId/apply`
Apply for a job. Triggers background AI audit of the candidate's resume.

**Auth required:** Yes (Candidate — must have a resume uploaded)

**Success response `201`:**
```json
{
  "message": "Application submitted successfully.",
  "applicationId": "..."
}
```

> **Note:** AI scoring runs in the background. The response is returned immediately; scores are updated asynchronously.

---

### `GET /api/applications/recruiter`
Get all applications for jobs posted by the authenticated recruiter.

**Auth required:** Yes (Recruiter)

**Query parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `jobId` | ObjectId | Filter by a specific job |
| `status` | string | Filter by status (e.g. `shortlisted`) |
| `minScore` | number | Minimum AI score |

---

### `GET /api/applications/my-applications`
Get the authenticated candidate's application history.

**Auth required:** Yes

**Success response `200`:**
```json
[
  {
    "_id": "...",
    "job": { "title": "Frontend Developer", "company": { "name": "Acme" } },
    "status": "shortlisted",
    "aiScore": 78,
    "matchedSkills": ["React", "TypeScript"],
    "appliedAt": "..."
  }
]
```

---

### `PUT /api/applications/:id/status`
Update the status of an application. Sends a notification to the candidate.

**Auth required:** Yes (Recruiter)

**Request body:**
```json
{
  "status": "shortlisted"
}
```

**Valid statuses:** `submitted` → `viewed` → `shortlisted` → `interviewing` → `hired` | `rejected`

---

### `POST /api/applications/:id/schedule`
Schedule an interview for an application.

**Auth required:** Yes (Recruiter)

**Request body:**
```json
{
  "date": "2026-05-15",
  "time": "14:00",
  "link": "https://meet.google.com/abc-xyz",
  "notes": "Please prepare a React coding challenge."
}
```

---

## User Profile

### `GET /api/users/profile`
Get the authenticated user's full profile.

**Auth required:** Yes

---

### `PUT /api/users/update-profile`
Update profile information.

**Auth required:** Yes

**Request body (all fields optional):**
```json
{
  "name": "Jane Doe",
  "title": "Senior Frontend Developer",
  "about": "Passionate about building great UIs.",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": [
    {
      "role": "Frontend Developer",
      "company": "Acme Corp",
      "duration": "2 years",
      "description": "Built React applications."
    }
  ],
  "education": [
    {
      "institution": "MIT",
      "degree": "B.Sc. Computer Science",
      "year": "2022"
    }
  ]
}
```

---

### `POST /api/users/upload-avatar`
Upload a profile picture.

**Auth required:** Yes

**Content-Type:** `multipart/form-data`

**Form field:** `avatar` — image file (JPG, PNG)

---

### `POST /api/users/upload-resume`
Upload a master resume (PDF). This is used for AI scoring on all future applications.

**Auth required:** Yes

**Content-Type:** `multipart/form-data`

**Form field:** `resume` — PDF file

---

### `PUT /api/users/save/:jobId`
Toggle save/unsave a job. Returns updated saved status.

**Auth required:** Yes

---

### `GET /api/users/saved-jobs`
List all saved jobs for the authenticated user.

**Auth required:** Yes

---

### `POST /api/users/feedback`
Send a feedback email to the Axon Hire team.

**Auth required:** Yes

**Request body:**
```json
{
  "subject": "Feature Request",
  "message": "It would be great if..."
}
```

---

## Notifications

### `GET /api/notifications`
Get all notifications for the authenticated user (most recent first).

**Auth required:** Yes

---

### `PUT /api/notifications/:id/read`
Mark a single notification as read.

**Auth required:** Yes

---

### `PUT /api/notifications/read-all`
Mark all notifications as read.

**Auth required:** Yes

---

## Job Alerts

### `POST /api/alerts/subscribe`
Subscribe to email alerts for new jobs matching a keyword.

**Auth required:** Yes

**Request body:**
```json
{
  "keyword": "React Developer"
}
```

---

## AI Scoring

### `POST /api/ai/analyze`
Run the full AI carousel + deterministic scoring pipeline on a resume URL.

**Auth required:** Yes

**Request body:**
```json
{
  "resumeUrl": "https://res.cloudinary.com/.../resume.pdf",
  "jobId": "<ObjectId>"
}
```

**Success response `200`:**
```json
{
  "score": 82,
  "aiConfidence": 85,
  "matchedSkills": ["React", "Node.js"],
  "missingSkills": ["Docker"],
  "strengths": "Strong frontend experience.",
  "weaknesses": "Limited DevOps exposure.",
  "recommendation": "Shortlist"
}
```

---

### `POST /api/ai/analyze-v3`
Run deterministic v3 scoring (60/30/10 formula) with AI-augmented skill discovery.

**Auth required:** Yes

**Request body:** same as `/api/ai/analyze`

---

## Admin

> All admin endpoints require `role: "admin"` on the JWT.

### `GET /api/admin/stats`
Get platform-wide statistics.

**Success response `200`:**
```json
{
  "totalUsers": 1240,
  "totalJobs": 340,
  "totalApplications": 5820,
  "openJobs": 87
}
```

---

### `GET /api/admin/users`
List all registered users.

---

### `DELETE /api/admin/users/:id`
Permanently delete a user account and all associated data.

---

### `PUT /api/admin/users/:id/role`
Change a user's role.

**Request body:**
```json
{
  "role": "recruiter"
}
```
**Valid roles:** `user`, `recruiter`, `admin`

---

### `GET /api/admin/jobs`
List all job postings across the platform.

---

### `GET /api/admin/applications`
List all applications across the platform.

---

### `GET /api/admin/skills`
View the entire skill taxonomy (approved + pending).

---

### `PATCH /api/admin/skills/:id/approve`
Approve a pending skill submitted via the AI learning loop.

---

## Error Responses

All endpoints return a consistent error format:

```json
{
  "message": "Human-readable error description"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Bad Request — missing or invalid fields |
| `401` | Unauthorized — missing or invalid JWT |
| `403` | Forbidden — insufficient role |
| `404` | Not Found |
| `429` | Too Many Requests — rate limit exceeded |
| `500` | Internal Server Error |
