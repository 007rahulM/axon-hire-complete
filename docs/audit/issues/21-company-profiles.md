# Issue #21 — No Company Profile Pages

> **Branch**: 7 (New Features)  
> **Severity**: 🔵 Feature — recruiters can't showcase their company; candidates can't research employers  
> **Status**: Branch 7 (pending)

---

## 👥 The Team Room

*Priya interviews a job seeker.*

---

**🔴 Priya (PM):** "Before applying to a job, what do you check?"

*Job seeker:* "I look at the company. What do they do, how big are they, what's the culture like. If I can't find that, I skip the job."

**🔴 Priya:** *to team* "We have a Company model in the database. We store company data when recruiters register. But there's no page that shows it to job seekers."

**🟠 Ben (Backend):** "The company data is in MongoDB. We just need an API endpoint that returns it, and a frontend page that displays it."

**🔵 Fay (Frontend):** "And links from the job cards — 'posted by [Company Name]' should be clickable."

---

## 🛠 The Fix (to implement in Branch 7)

### Current State of the Company Model (`backend/models/Company.js`)

The Company model exists. Check what fields it has — likely:
```js
// backend/models/Company.js (existing)
{
  name: String,
  description: String,
  website: String,
  logo: String,       // Cloudinary URL
  industry: String,
  size: String,       // "1-10", "11-50", "51-200", etc.
  location: String,
  foundedYear: Number,
  recruiterId: ObjectId  // Links to the User who registered
}
```

### Part 1: Add Public Company API Endpoint

```js
// backend/routes/userRoutes.js or a new companyRoutes.js:

// GET /api/companies/:id — public route, no auth required
router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id)
    .select("name description website logo industry size location foundedYear");
  
  if (!company) return res.status(404).json({ message: "Company not found." });
  
  // Also fetch active jobs for this company
  const jobs = await Job.find({ 
    isOpen: true,
    // Join through recruiter → company relationship
  }).sort({ createdAt: -1 }).limit(10).lean();
  
  res.json({ company, jobs });
});
```

### Part 2: Company Profile Page (`frontend/src/pages/Company.jsx`)

```jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function CompanyProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios.get(`/api/companies/${id}`).then(r => setData(r.data));
  }, [id]);
  
  if (!data) return <div className="skeleton-page" />;
  
  const { company, jobs } = data;
  
  return (
    <main className="company-profile">
      <header>
        <img src={company.logo} alt={company.name} className="company-logo" />
        <h1>{company.name}</h1>
        <p>{company.industry} · {company.size} employees · {company.location}</p>
        {company.website && <a href={company.website} target="_blank">Visit Website</a>}
      </header>
      
      <section>
        <h2>About {company.name}</h2>
        <p>{company.description}</p>
      </section>
      
      <section>
        <h2>Open Positions ({jobs.length})</h2>
        {jobs.map(job => <JobCard key={job._id} job={job} />)}
      </section>
    </main>
  );
}
```

### Part 3: Add Route in `App.jsx`

```jsx
// In your routes:
<Route path="/company/:id" element={<CompanyProfile />} />
```

### Part 4: Make Job Cards Linkable

```jsx
// In JobCard.jsx:
<Link to={`/company/${job.postedBy?._id}`}>
  {job.company}
</Link>
```

---

## ❓ Common Questions

**Q: Should job seekers be able to "follow" a company?**  
A: Yes — in Branch 7. A follow creates a subscription. When the company posts new jobs, the follower gets a notification (or email if they've enabled job alerts for that company).

**Q: What if a company hasn't filled in their profile?**  
A: Show a default placeholder: "This company hasn't added their profile yet." and show only their job listings.

---

## 🎓 What You Learned

- A Company page is just a data display pattern: fetch by ID → show fields + related data (open jobs)
- The route relationship: Job `postedBy` → User (recruiter) → Company
- Making clickable company names on job cards is a tiny change with big UX impact
- Company profiles help job seekers make informed decisions = higher application quality
