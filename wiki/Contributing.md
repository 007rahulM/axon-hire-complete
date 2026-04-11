# 🤝 Contributing

Thank you for your interest in contributing to Axon Hire! This guide covers everything you need to know to get started.

---

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all experience levels.

---

## Getting Started

### 1. Fork the Repository

Click **Fork** on the [GitHub repository page](https://github.com/007rahulM/axon-hire-complete) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/axon-hire-complete.git
cd axon-hire-complete
```

### 3. Set Up the Project Locally

Follow the [Getting Started](Getting-Started) guide to run the project locally.

### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/your-bug-description
```

---

## Development Workflow

### Making Changes

- Keep changes focused — one feature or fix per pull request
- Follow the existing code style (ES modules, camelCase variables, etc.)
- Add comments for non-obvious logic
- Don't break existing functionality

### Running Tests

```bash
# Backend tests (Jest)
cd backend
npm test
```

### Linting

```bash
# Frontend linting (ESLint)
cd frontend
npm run lint
```

Fix all lint errors before submitting a PR.

---

## Submitting a Pull Request

### 1. Commit Your Changes

```bash
git add .
git commit -m "feat: add skill autocomplete to job posting form"
```

**Commit message conventions:**

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation only |
| `refactor:` | Code restructuring (no behavior change) |
| `test:` | Adding or updating tests |
| `chore:` | Build, config, dependency updates |

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Open a Pull Request

- Go to the original repo on GitHub
- Click **New Pull Request** → select your fork and branch
- Fill in the PR template:
  - **What does this PR do?**
  - **How to test it?**
  - **Screenshots** (if UI changes)
- Request a review

---

## Project Structure Guidelines

### Backend

- **New routes** → add to the appropriate file in `backend/routes/`
- **New models** → add to `backend/models/`
- **Shared utilities** → add to `backend/utils/`
- **New middleware** → add to `backend/middleware/`
- Always add the route to `backend/server.js`

### Frontend

- **New pages** → add to `frontend/src/pages/`
- **Reusable components** → add to `frontend/src/components/`
- **New routes** → register in `frontend/src/App.jsx`
- Use `AuthContext` for accessing the logged-in user
- Use `axiosInstance` for all API calls (handles auth token automatically)

---

## Areas to Contribute

Here are some good areas to work on:

### 🐛 Bug Fixes
Check the [open issues](https://github.com/007rahulM/axon-hire-complete/issues) labeled `bug`.

### ✨ Features
- Resume builder (generate resumes from profile data)
- Direct messaging between recruiters and candidates
- Calendar view for interview scheduling
- Advanced job filters (salary range, remote/hybrid/onsite)
- Resume preview in the application viewer
- Bulk actions in the recruiter dashboard

### 📚 Documentation
- Improve this wiki
- Add JSDoc comments to utility functions
- Add Swagger/OpenAPI spec for the REST API

### 🧪 Tests
- Increase backend test coverage
- Add frontend component tests (Vitest + Testing Library)

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/007rahulM/axon-hire-complete/issues/new) with:

1. **Description** — What happened?
2. **Steps to reproduce** — Exact steps that trigger the bug
3. **Expected behavior** — What should have happened?
4. **Actual behavior** — What did happen?
5. **Environment** — OS, browser, Node.js version
6. **Screenshots or logs** — If applicable

---

## Requesting Features

Open a [GitHub Issue](https://github.com/007rahulM/axon-hire-complete/issues/new) with the `enhancement` label. Describe:

1. **The problem** you're trying to solve
2. **Your proposed solution**
3. **Alternatives considered**

---

## License

By contributing, you agree that your contributions will be licensed under the **ISC License** that covers this project.
