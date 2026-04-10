# 🐳 Docker — Complete Setup Guide

> **What this gives you**: Your app runs in an identical environment on your laptop, in CI, and on the production server. No more "it works on my machine."

---

## 👥 Before You Start: The Team Talks

**🟡 Dev (DevOps):** "Rahul, you asked about Docker. Before I show you the Dockerfile, let me be very clear — Docker is not just code. There are things you have to install on your computer first. Let me walk you through the whole thing from nothing."

**🔴 Priya (PM):** "Why do we even need Docker? The app runs fine locally."

**🟡 Dev:** "It runs fine on *your* laptop with Node 20 installed. What if a contributor has Node 18? What if Render's server uses a slightly different glibc version? I've seen bugs that only appeared in production because of a 0.3 version difference in a library. Docker eliminates that entire class of problem. You define the exact environment once. Everyone uses that exact environment."

**🟠 Ben (Backend):** "Also — once you have Docker, you don't need to install MongoDB locally at all. `docker compose up` starts the app AND a MongoDB instance in one command. New team members go from 'I just cloned the repo' to 'the app is running' in under 5 minutes."

---

## Part 1: Install Docker on Your Computer

This is the manual part. You cannot skip this.

### Step 1.1: Download Docker Desktop

1. Open your browser
2. Go to: **https://www.docker.com/products/docker-desktop/**
3. Click the big blue download button for your operating system
   - Windows → download the `.exe`
   - macOS (Intel) → download the `.dmg` for Intel chip
   - macOS (Apple Silicon M1/M2/M3) → download the `.dmg` for Apple chip
   - Linux → follow the Linux instructions on that page

### Step 1.2: Install It

**Windows**:
- Double-click the downloaded `.exe` file
- Follow the installer. It may ask you to enable WSL 2 (Windows Subsystem for Linux) — click Yes
- Restart your computer when asked

**macOS**:
- Double-click the downloaded `.dmg` file
- Drag Docker to your Applications folder
- Open Docker from Applications
- It will ask for your Mac password — allow it

**Linux (Ubuntu/Debian)**:
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
# Log out and log back in after this
```

### Step 1.3: Verify the Installation

Open your terminal (Terminal on Mac, Command Prompt or PowerShell on Windows):
```bash
docker --version
```
You should see something like: `Docker version 24.0.7, build afdd53b`

```bash
docker compose version
```
You should see: `Docker Compose version v2.23.3`

If you see a version number, Docker is installed. ✅

---

## Part 2: Understanding What Docker Files Do

Before you write anything, understand what you're writing.

### What is a Dockerfile?

A Dockerfile is a recipe. It says: "Start with this base (official Node.js image), then do these steps (copy my code, install packages), then when the container starts, run this command."

```dockerfile
# "Start from the official Node.js 20 image that uses Alpine Linux (lightweight)"
FROM node:20-alpine

# "Set the working directory inside the container"
WORKDIR /app

# "Copy package.json files FIRST (so the next step is cached if only code changed)"
COPY package*.json ./

# "Install dependencies (--only=production means skip devDependencies)"
RUN npm ci --only=production

# "Now copy the rest of the code"
COPY . .

# "Tell Docker this container listens on port 5000"
EXPOSE 5000

# "When the container starts, run this command"
CMD ["node", "server.js"]
```

**Why copy `package.json` before the rest of the code?**  
Docker builds in layers. If you copy code first, then install packages, any code change rebuilds the "install packages" step. That takes minutes. By copying `package.json` first and installing packages before the code, the "install" layer is cached — it only rebuilds when `package.json` changes. This makes rebuilds 10x faster.

### What is docker-compose.yml?

Docker Compose lets you define and run MULTIPLE containers together. For Axon Hire locally, you need two things running: your Node.js backend AND a MongoDB database. Compose starts both with one command.

---

## Part 3: Create the Docker Files

### Step 3.1: Create `backend/Dockerfile`

Create this file at `/home/runner/work/axon-hire-complete/axon-hire-complete/backend/Dockerfile`:

```dockerfile
FROM node:20-alpine

# Install dumb-init for proper signal handling (graceful shutdown)
RUN apk add --no-cache dumb-init

# Create non-root user for security (never run Node.js as root in production)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy dependency files first (Docker layer cache optimization)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Switch to non-root user
USER appuser

# Expose the port (this is documentation — it doesn't actually open the port)
EXPOSE 5000

# Use dumb-init to handle OS signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

### Step 3.2: Create `backend/.dockerignore`

This tells Docker what NOT to copy into the container (like `.gitignore` but for Docker):

```
node_modules
*.log
.env
.env.*
uploads/
.git
*.md
coverage/
.nyc_output
```

**Why exclude `node_modules`?** The packages are installed fresh inside the container using `npm ci`. Your local `node_modules` (which might be built for your OS) would conflict.

**Why exclude `.env`?** Your secrets should never be baked into a Docker image. They're injected at runtime via environment variables.

### Step 3.3: Create `docker-compose.yml` at the project root

```yaml
version: "3.9"

services:
  # The Node.js backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"           # host:container — your browser hits localhost:5000
    environment:
      - NODE_ENV=development
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/axon_dev  # "mongo" = the service name below
    env_file:
      - ./backend/.env         # Your secrets (Cloudinary, JWT, etc.)
    volumes:
      - ./backend:/app         # Mount local code — file changes reflect immediately
      - /app/node_modules      # But keep the container's node_modules (don't overwrite)
    depends_on:
      mongo:
        condition: service_healthy  # Wait for MongoDB to be ready before starting
    restart: unless-stopped

  # MongoDB database (no installation needed!)
  mongo:
    image: mongo:7.0           # Official MongoDB 7 image from Docker Hub
    ports:
      - "27017:27017"          # Exposes MongoDB to your local tools (Compass, etc.)
    volumes:
      - mongo_data:/data/db    # Persistent volume — data survives container restarts
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

# Named volume — Docker manages this storage on your machine
volumes:
  mongo_data:
```

---

## Part 4: Running It

Open your terminal in the project root directory (the folder that contains `frontend/` and `backend/`):

```bash
# Start everything (first time: builds the image, downloads MongoDB)
docker compose up

# You'll see output like:
# [+] Building backend... 
# [+] mongo | MongoDB starting
# [+] backend | Server started on port 5000
```

**First run takes 2-3 minutes** because it downloads the Node.js and MongoDB images. After that, starts in under 10 seconds.

```bash
# Run in the background (detached mode) — terminal stays free
docker compose up -d

# See what's running
docker compose ps

# See logs
docker compose logs backend
docker compose logs mongo

# Stop everything
docker compose down

# Stop AND delete the database (clears all your local data)
docker compose down -v
```

---

## Part 5: Common Problems and How to Fix Them

**"Port 5000 is already in use"**  
Something else is running on port 5000. Either stop it, or change the port in `docker-compose.yml`: `"5001:5000"` (access via localhost:5001).

**"Cannot connect to MongoDB"**  
In your backend `.env`, the `MONGO_URI` for Docker should be: `mongodb://mongo:27017/axon_dev` (not localhost, not Atlas). The service name `mongo` is how containers find each other.

**"My code changes don't show up"**  
If you're running without the volume mount, you need to rebuild: `docker compose up --build`

**"I want to use my real Atlas database"**  
Remove the `mongo:` service from compose and change `MONGO_URI` back to your Atlas connection string. Use Docker only for the backend container.

---

## Part 6: For Production (When Deploying to Fly.io or Railway)

These platforms read your `Dockerfile` directly. You push your code, they build the image and run it. No docker-compose needed in production — that's only for local development.

**Fly.io** (recommended, has free tier with no cold starts):
```bash
# Install fly CLI
brew install flyctl  # macOS
# OR: curl -L https://fly.io/install.sh | sh  # Linux

# Login
fly auth login

# Deploy (reads your Dockerfile automatically)
fly launch
fly deploy
```

**Railway** (also good, simple):
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Railway auto-detects the Dockerfile and deploys

---

## What You Learned

- Docker packages your app + its environment into a reproducible unit
- `Dockerfile` = recipe for one container
- `docker-compose.yml` = recipe for multiple containers running together
- Never put secrets in Dockerfiles — use environment variables
- The `node_modules` exclusion trick makes rebuilds fast
- Production platforms (Fly.io, Railway) read your Dockerfile and handle the rest
