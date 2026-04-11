# Issue #32 — No Skeleton Loading States

> **Branch**: 5 (UI/UX Polish)  
> **Severity**: 🟤 UX — blank white screen while data loads feels broken  
> **Status**: Branch 5 (partially done in Jobs.jsx)

---

## 👥 The Team Room

*Priya records a screen capture of the app on a slow 3G connection.*

---

**🔴 Priya (PM):** "Watch this. I load the Jobs page. There's a blank white screen for 2.3 seconds. Then all the job cards appear at once. Users think it crashed."

**🔵 Fay (Frontend):** "That's the API call loading. The component renders immediately, but there's no data yet."

**🔴 Priya:** "I've seen apps that show gray boxes where the content will be. It's obvious something is loading. I don't feel like the app broke."

**🔵 Fay:** "Skeleton screens. Instead of a spinner, you show the shape of the content — gray placeholder rectangles that match the layout of what's coming. It sets expectations. The user can tell there will be job cards here."

---

## 🔍 Spinner vs Skeleton vs Empty State

### Spinner (Old Pattern)
```
┌─────────────────┐
│       ⏳        │
│    Loading...   │
└─────────────────┘
```
User sees: "Something is happening but I don't know what or for how long."

### Skeleton Screen (Modern Pattern)
```
┌─────────────────────────────────┐
│  ▓▓▓▓▓▓▓  ░░░░░░░░░░░░░░░░    │
│  ░░░░░░░░░░░░░░░░░░░░░░░░       │
│  ░░░░░░░  ░░░░░░░              │
└─────────────────────────────────┘
```
User sees: "Three job cards are loading. They'll appear here soon."

Skeleton screens **reduce perceived load time** — users estimate the wait as ~40% shorter compared to spinners.

---

## 🛠 The Fix

### Jobs.jsx Already Has Skeleton Cards

`Jobs.jsx` already has a `SkeletonCard` component. The pattern to follow in other pages:

```jsx
// The skeleton component (already in Jobs.jsx — adapt this pattern):
const SkeletonCard = () => (
  <div className="ax-job-card skeleton-card">
    <div className="ax-skeleton" style={{ width: "38px", height: "38px", borderRadius: "8px" }} />
    <div style={{ flex: 1 }}>
      <div className="ax-skeleton" style={{ height: "12px", width: "55%", borderRadius: "3px" }} />
      <div className="ax-skeleton" style={{ height: "14px", width: "75%", borderRadius: "3px", marginTop: "6px" }} />
    </div>
  </div>
);

// Use it:
{isLoading ? (
  Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)
) : (
  jobs.map(job => <JobCard key={job._id} job={job} />)
)}
```

### CSS for Skeleton Animation

```css
/* Add to your global CSS or a skeleton.css file: */
.ax-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e8e8e8 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

The shimmer effect moves from right to left, creating a "wave" appearance that signals activity.

### Pages That Need Skeleton States

Apply the same pattern to these pages:

**MyApplications.jsx** — application cards:
```jsx
const ApplicationSkeleton = () => (
  <div className="application-card">
    <div className="ax-skeleton" style={{ height: "20px", width: "60%" }} />
    <div className="ax-skeleton" style={{ height: "14px", width: "40%", marginTop: "8px" }} />
    <div className="ax-skeleton" style={{ height: "28px", width: "80px", marginTop: "12px" }} />
  </div>
);
```

**Profile.jsx** — profile header:
```jsx
const ProfileSkeleton = () => (
  <div className="profile-header">
    <div className="ax-skeleton" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
    <div>
      <div className="ax-skeleton" style={{ height: "24px", width: "200px" }} />
      <div className="ax-skeleton" style={{ height: "16px", width: "150px", marginTop: "8px" }} />
    </div>
  </div>
);
```

**Notifications** — notification items:
```jsx
const NotificationSkeleton = () => (
  <div className="notification-item">
    <div className="ax-skeleton" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
    <div style={{ flex: 1 }}>
      <div className="ax-skeleton" style={{ height: "14px", width: "70%" }} />
      <div className="ax-skeleton" style={{ height: "12px", width: "50%", marginTop: "4px" }} />
    </div>
  </div>
);
```

### The Loading State Pattern

```jsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true); // Start as true!
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/jobs");
      setData(response.data.jobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Always set to false, whether success or error
    }
  };
  
  fetchData();
}, []);

// Render:
if (error) return <ErrorMessage message={error} />;

return (
  <div>
    {isLoading
      ? Array(6).fill(null).map((_, i) => <SkeletonCard key={i} />)
      : data.map(item => <RealCard key={item._id} data={item} />)
    }
  </div>
);
```

---

## ❓ Common Questions

**Q: Should I use skeleton screens everywhere, even for fast API calls?**  
A: Only if the loading state is visible for more than ~300ms. For very fast calls (<200ms), a flash of skeleton before content is actually MORE jarring than nothing. Use a minimum delay or only show skeleton after 300ms:

```js
useEffect(() => {
  const timer = setTimeout(() => setShowSkeleton(true), 300);
  return () => clearTimeout(timer);
}, []);
```

**Q: What's the difference between a skeleton and a spinner?**  
A: Skeleton = shape of the expected content (layout-aware). Spinner = generic loading indicator. For content-heavy pages (lists, cards), skeleton is better. For single operations (file upload, form submit), a button spinner or progress bar is better.

**Q: Can I use a library instead of writing custom CSS?**  
A: Yes — `react-loading-skeleton` is a popular library with easy setup. But since `ax-skeleton` is already used in `Jobs.jsx`, extend that pattern for consistency.

---

## 🎓 What You Learned

- Skeleton screens reduce PERCEIVED load time by setting expectations about the layout
- The shimmer animation signals "something is loading here" without being intrusive
- Always start `isLoading` as `true` — so the skeleton shows on initial render, not after first render
- `finally { setIsLoading(false) }` ensures loading state clears even on errors
- Apply the pattern to all pages that fetch data: MyApplications, Profile, RecruiterDashboard, Admin
