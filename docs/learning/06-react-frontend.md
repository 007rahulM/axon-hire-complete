# 06 — React Frontend Architecture

> React is the library. Understanding how it works prevents the most common bugs.

---

## The Mental Model: React = State → UI

```
State changes → React re-renders the component → DOM updates automatically
```

You never manually update the DOM (`document.getElementById` etc.). You update state, and React figures out the minimum DOM changes needed.

---

## useState vs useEffect: When to Use Each

### useState: "I need to remember something between renders"
```jsx
const [count, setCount] = useState(0);
// count is the current value
// setCount is how you change it — triggers a re-render
```

### useEffect: "I need to do something when something changes"
```jsx
// Run once when component mounts (empty dependency array)
useEffect(() => {
  fetchJobs();
}, []);

// Run when 'page' changes
useEffect(() => {
  fetchJobs(page);
}, [page]);

// Run on every render (no dependency array) — usually wrong
useEffect(() => {
  fetchJobs(); // This runs on EVERY render — infinite loop risk!
});
```

### Common mistake: infinite loop
```jsx
// WRONG — triggers infinite loop:
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then(setData); // setData triggers re-render
}, [data]);                  // re-render means data changed → runs again → infinite

// CORRECT — runs once:
useEffect(() => {
  fetchData().then(setData);
}, []); // Empty array = "never depends on anything external"
```

---

## Context API: Global State

AuthContext gives every component access to the logged-in user without prop drilling:

```jsx
// 1. Create context
const AuthContext = createContext();

// 2. Provider wraps the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData, token) => { setUser(userData); ... };
  const logout = () => { setUser(null); ... };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Any component can consume it
export function useAuth() {
  return useContext(AuthContext);
}

// 4. Usage in any component (no prop drilling)
function Navbar() {
  const { user, logout } = useAuth();
  return <button onClick={logout}>Logout {user.name}</button>;
}
```

**What AuthContext provides in Axon Hire**:
- `user` — the current user object (id, name, role, email)
- `token` — the JWT (used in axios interceptors)
- `isLoggedIn` — boolean
- `loading` — prevents flash of wrong content on refresh
- `login()` — saves to state + localStorage
- `logout()` — clears state + localStorage + redirects
- `updateUser()` — for profile updates without logging out
- `googleLogin()` — handles Google OAuth

---

## React Router: Client-Side Navigation

React apps are Single Page Applications (SPA). There's only ONE HTML page. React Router intercepts URL changes and renders different components:

```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/jobs" element={<Jobs />} />
  <Route path="/jobs/:id" element={<JobDetail />} />  {/* :id is a param */}
  <Route path="/login" element={<Login />} />
</Routes>

// Getting the :id param in JobDetail.jsx
const { id } = useParams();
```

### ProtectedRoute: Redirect if not logged in
```jsx
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

// Usage:
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
```

---

## Axios Instance: DRY API Calls

Instead of writing `http://localhost:5000/api` in every component, Axon Hire uses a single configured instance:

```js
// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Request interceptor: auto-attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

Usage:
```js
// All of these automatically go to the right backend:
axiosInstance.get("/jobs")           // GET http://localhost:5000/api/jobs
axiosInstance.post("/auth/login", data)  // POST .../api/auth/login
```

---

## The Loading State Pattern

Every async operation needs three states: loading, data, error.

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  axiosInstance.get("/jobs")
    .then(res => setData(res.data))
    .catch(err => setError(err.response?.data?.message || "Failed to load"))
    .finally(() => setLoading(false));
}, []);

// In JSX:
if (loading) return <SkeletonLoader />;
if (error) return <ErrorMessage message={error} />;
return <JobList jobs={data.jobs} />;
```

**With TanStack Query (future)**:
```jsx
const { data, isLoading, error } = useQuery({ ... });
// Same pattern, less boilerplate
```

---

## React Performance: When to Optimize

**Don't optimize prematurely.** First make it work, then make it fast only if it's slow.

### Signs you need optimization:
- Component re-renders when its props haven't changed → `React.memo()`
- Function inside component is re-created every render → `useCallback()`
- Expensive calculation runs every render → `useMemo()`
- Large bundle loads everything at once → `React.lazy()` + `Suspense`

### The most impactful: Code splitting
```jsx
// Lazy load heavy pages — they become separate JS chunks
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AIBot = React.lazy(() => import("./pages/AIBot"));

<Suspense fallback={<PageSpinner />}>
  <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/ai-bot" element={<AIBot />} />
  </Routes>
</Suspense>
```

Most users never visit /admin or /ai-bot. Lazy loading means they never download that code.
