# 🗄️ Data Models

This page documents all MongoDB schemas used by Axon Hire.

---

## User

**Collection:** `users`  
**File:** `backend/models/User.js`

Represents all platform users — candidates, recruiters, and admins.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Full name |
| `email` | String | ✅ | Unique email address |
| `password` | String | No | Hashed password (absent for Google OAuth users) |
| `googleId` | String | No | Google OAuth ID (sparse unique index) |
| `date` | Date | – | Registration date (auto) |
| `role` | String | – | `"user"` \| `"recruiter"` \| `"admin"` (default: `"user"`) |
| `resumeUrl` | String | – | Cloudinary URL of master resume PDF |
| `title` | String | – | Professional headline (e.g. "Senior React Developer") |
| `about` | String | – | Bio / about me |
| `skills` | [String] | – | Array of skill strings |
| `experience` | [Object] | – | Array of `{ role, company, duration, description }` |
| `education` | [Object] | – | Array of `{ institution, degree, year }` |
| `profilePicture` | String | – | Cloudinary URL of avatar image |
| `savedJobs` | [ObjectId] | – | References to saved `Job` documents |
| `isVerified` | Boolean | – | Email OTP verified (default: `false`) |
| `otp` | String | – | 6-digit OTP code (cleared after verification) |
| `otpExpires` | Date | – | OTP expiry timestamp (10 minutes from send) |

**Indexes:** `email` (ascending), `savedJobs` (ascending)

---

## Job

**Collection:** `jobs`  
**File:** `backend/models/Job.js`

Represents a job posting created by a recruiter.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Job title |
| `description` | String | ✅ | Full job description |
| `requiredSkills` | [String] | ✅ | Skills required for the role |
| `experienceRequired` | Number | – | Years of experience required (default: 0) |
| `company` | ObjectId | ✅ | Reference to `Company` |
| `postedBy` | ObjectId | ✅ | Reference to `User` (recruiter) |
| `isOpen` | Boolean | – | Whether the job is accepting applications (default: `true`) |
| `autoEvaluate` | Boolean | – | Whether to run AI scoring automatically (default: `true`) |
| `deadline` | Date | – | Application deadline (cron closes job after this date) |
| `createdAt` | Date | – | Auto-set by Mongoose timestamps |
| `updatedAt` | Date | – | Auto-set by Mongoose timestamps |

---

## Application

**Collection:** `applications`  
**File:** `backend/models/Application.js`

Represents a candidate's application to a job, including AI analysis results.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `job` | ObjectId | ✅ | Reference to `Job` |
| `applicant` | ObjectId | ✅ | Reference to `User` (candidate) |
| `resumeUrl` | String | ✅ | Cloudinary URL of resume used for this application |
| `status` | String | – | `"submitted"` \| `"viewed"` \| `"shortlisted"` \| `"interviewing"` \| `"hired"` \| `"rejected"` |
| `aiScore` | Number | – | Deterministic score 0–100 |
| `aiConfidence` | Number | – | AI model confidence 0–100 |
| `matchedSkills` | [String] | – | Skills matched between resume and job |
| `missingSkills` | [String] | – | Required skills not found in resume |
| `aiSummary` | Object | – | `{ strengths, weaknesses, recommendation }` |
| `scoringVersion` | String | – | Scoring algorithm version (e.g. `"v3"`) |
| `scoredAt` | Date | – | When scoring completed |
| `interviewSchedule` | Object | – | `{ date, time, link, notes }` |
| `appliedAt` | Date | – | Auto-set on creation |

**Unique constraint:** One application per `(job, applicant)` pair.

---

## Company

**Collection:** `companies`  
**File:** `backend/models/Company.js`

Represents a company profile associated with a recruiter.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Company name |
| `website` | String | – | Company website URL |
| `description` | String | – | About the company |
| `logo` | String | – | Cloudinary URL of company logo |
| `recruiter` | ObjectId | ✅ | Reference to `User` (recruiter owner) |
| `createdAt` | Date | – | Auto-set |

---

## Skill

**Collection:** `skills`  
**File:** `backend/models/Skill.js`

Global skill taxonomy used for normalization and scoring.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `canonical` | String | ✅ | The official canonical form (e.g. `"react"`) |
| `synonyms` | [String] | – | Alternate forms (`["React.js", "ReactJS", "React"]`) |
| `approved` | Boolean | – | Admin-approved (default: `false` for AI-discovered skills) |
| `category` | String | – | Skill category (e.g. `"Frontend"`, `"Backend"`, `"DevOps"`) |
| `createdAt` | Date | – | Auto-set |

**Note:** The `skillMap.js` utility loads all approved skills into an in-memory cache at startup for fast O(1) lookups.

---

## Notification

**Collection:** `notifications`  
**File:** `backend/models/Notification.js`

In-app notifications sent to users when their application status changes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recipient` | ObjectId | ✅ | Reference to `User` |
| `message` | String | ✅ | Notification text |
| `type` | String | – | Notification type (e.g. `"status_update"`, `"new_application"`) |
| `isRead` | Boolean | – | Whether the user has read it (default: `false`) |
| `relatedJob` | ObjectId | – | Reference to `Job` (optional) |
| `relatedApplication` | ObjectId | – | Reference to `Application` (optional) |
| `createdAt` | Date | – | Auto-set |

---

## JobAlert

**Collection:** `jobalerts`  
**File:** `backend/models/JobAlert.js`

Stores a user's email subscription for new job postings matching a keyword.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user` | ObjectId | ✅ | Reference to `User` |
| `email` | String | ✅ | Email address to send alerts to |
| `keyword` | String | ✅ | Search keyword (e.g. `"React Developer"`) |
| `createdAt` | Date | – | Auto-set |

**Behavior:** When a new job is posted, the system checks all active alerts and sends matching emails.

---

## Interview

**Collection:** `interviews`  
**File:** `backend/models/Interview.js`

Dedicated interview scheduling document (currently embedded in `Application.interviewSchedule` in practice; this model is available for future standalone interview management).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `application` | ObjectId | ✅ | Reference to `Application` |
| `recruiter` | ObjectId | ✅ | Reference to `User` (recruiter) |
| `candidate` | ObjectId | ✅ | Reference to `User` (candidate) |
| `date` | Date | ✅ | Interview date |
| `time` | String | ✅ | Interview time (e.g. `"14:00"`) |
| `link` | String | – | Video call link |
| `notes` | String | – | Notes for the candidate |
| `createdAt` | Date | – | Auto-set |

---

## Relationships Diagram

```
User ──────────────────── Company
 │  (recruiter owns)          │
 │                            │
 │  (posts)                   │
 └──────────────────── Job ───┘
          │
          │ (receives applications)
          │
    Application ─────── User (applicant)
          │
          └── Notification ─── User (recipient)

User ──── JobAlert (keyword subscriptions)
User ──── Skill[] (user's self-reported skills array)
Skill (global taxonomy — used by matchingEngine)
```
