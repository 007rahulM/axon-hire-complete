# Issue #41 — No Frontend State Management

> **Branch**: 3 (Performance & Scale)  
> **Severity**: ⚙️ Quality — global state lives only in AuthContext; adding more causes prop drilling hell  
> **Status**: Branch 3 (pending)

---

## 👥 The Team Room

*Fay is working on notifications.*

---

**🔵 Fay (Frontend):** "I need the notification count in the Navbar. The notification count is fetched in `Profile.jsx`. To share it with Navbar, I'd have to lift state up to `App.jsx` and pass it down through every component that sits between App and Navbar."

**🔴 Priya (PM):** "How deep is that nesting?"

**🔵 Fay:** "App → Layout → Navbar. But any component in between that doesn't need the notifications still has to accept it as a prop and pass it down. That's called prop drilling."

**🟠 Ben (Backend):** "We have `AuthContext` for user authentication state. Can't you add notifications there?"

**🔵 Fay:** "I could, but then AuthContext grows to handle everything — notifications, job filters, saved jobs, unread counts, modals. That becomes an unmaintainable god-object. We need a proper state management solution."

---

## 🔍 The Problem: Prop Drilling

```
App (has notification count)
  ↓ passes notificationCount
  Layout (doesn't need it, but must pass it)
    ↓ passes notificationCount
    Sidebar (doesn't need it, but must pass it)
      ↓ passes notificationCount
      Navbar (needs it!)
```

Every component in the tree must know about data it doesn't use — just to pass it down. Adding a new global value means updating every component in the path.

### The Solution: Global State

A global store is accessible from any component directly, without prop drilling:

```
Navbar: const { notificationCount } = useNotifications();  // Direct!
Profile: const { notificationCount, decrement } = useNotifications(); // Direct!
```

No intermediate components involved.

---

## 🔍 Choosing a State Management Library

| Library | Bundle Size | Complexity | Best For |
|---------|------------|------------|---------|
| React Context (built-in) | 0 KB | Low | Simple, rarely-changing global state (auth, theme) |
| **Zustand** | 2.9 KB | Low | Medium apps, quick to add, minimal boilerplate |
| Redux Toolkit | 45 KB | High | Large apps, complex state transitions |
| Jotai | 3 KB | Low | Atomic state, highly composable |

**For Axon Hire: Zustand**. It's tiny, simple, and requires almost no boilerplate. Perfect for adding specific slices of global state without the ceremony of Redux.

---

## 🛠 The Fix (to implement in Branch 3)

### Install Zustand

```bash
cd frontend && npm install zustand
```

### Create a Notification Store

```js
// frontend/src/stores/notificationStore.js
import { create } from "zustand";
import axios from "../utils/axiosInstance";

export const useNotificationStore = create((set, get) => ({
  // State
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  
  // Actions
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get("/api/notifications");
      const unread = data.filter(n => !n.isRead).length;
      set({ notifications: data, unreadCount: unread, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },
  
  markAsRead: async (notificationId) => {
    await axios.patch(`/api/notifications/${notificationId}/read`);
    set((state) => ({
      notifications: state.notifications.map(n =>
        n._id === notificationId ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },
  
  markAllAsRead: async () => {
    await axios.patch("/api/notifications/read-all");
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },
  
  // Add a notification from a real-time event (WebSocket/SSE)
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));
```

### Use in Any Component

```jsx
// frontend/src/components/Navbar.jsx
import { useNotificationStore } from "../stores/notificationStore";

export default function Navbar() {
  const unreadCount = useNotificationStore(state => state.unreadCount);
  
  return (
    <nav>
      {/* ... */}
      <button className="notification-btn">
        🔔
        {unreadCount > 0 && (
          <span className="badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
        )}
      </button>
    </nav>
  );
}
```

```jsx
// frontend/src/pages/Profile.jsx
import { useNotificationStore } from "../stores/notificationStore";
import { useEffect } from "react";

export default function Profile() {
  const { notifications, fetchNotifications, markAsRead } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, []);
  
  return (
    <div>
      {notifications.map(n => (
        <div 
          key={n._id} 
          className={n.isRead ? "" : "unread"}
          onClick={() => markAsRead(n._id)}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
```

No prop drilling. Both components access the same store directly.

### Other Stores to Create

```
frontend/src/stores/
  notificationStore.js  ← notifications, unread count
  jobFilterStore.js     ← search query, filters (location, type, salary)
  uiStore.js           ← modal states, sidebar open/closed, loading states
```

**Keep `AuthContext`** — it's already working and auth is a special case (wraps the app, needed by routing).

### What NOT to Put in Global State

Not everything should be global:
- Form input values → local state (`useState`)
- Modal open/close for a single component → local state
- Fetched data that only one component uses → local state with `useEffect`

Global state is for data that's shared between multiple components that don't have a direct parent-child relationship.

---

## ❓ Common Questions

**Q: Why not just use React Context for everything?**  
A: React Context re-renders ALL consumers when ANY value changes. If `AuthContext` has notifications, user data, and theme, every component that reads ANY of those re-renders on every change. Zustand uses selective subscriptions — `useNotificationStore(state => state.unreadCount)` only re-renders when `unreadCount` changes.

**Q: What is Redux? Is it better than Zustand?**  
A: Redux is the original React state management library. It's very strict about how state is changed (actions + reducers), which is great for large teams but verbose for small ones. Redux Toolkit reduced the boilerplate, but Zustand is still simpler for most cases. Use Redux if you need time-travel debugging or a very large team needs strict state update patterns.

**Q: Does Zustand work with React DevTools?**  
A: Yes — with the Redux DevTools integration (optional):
```js
import { devtools } from "zustand/middleware";
const useStore = create(devtools((set) => ({ ... })));
```

---

## 🎓 What You Learned

- Prop drilling: passing data through multiple layers of components that don't need it
- Global state: accessible from any component without prop drilling
- Zustand: a 2.9KB library that creates global stores with actions (functions that update state)
- Selective subscriptions: `useStore(state => state.x)` only re-renders when `x` changes
- Keep AuthContext for authentication; use Zustand for feature-specific global state
- Not everything should be global — local state for local concerns
