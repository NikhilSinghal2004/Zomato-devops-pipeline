# Zomato DevOps Pipeline Project

## Overview
A full-stack Zomato-like app using Docker Compose, Node.js (Express), PostgreSQL, and a Vite-based frontend.

## Project Structure
- `backend/` — Node.js Express API (Sequelize, JWT, bcryptjs)
- `frontend/` — Vite-based frontend (React or Vue)
- `docker-compose.yml` — Orchestrates db, backend, frontend

## Prerequisites
- Docker Desktop (Windows/Mac/Linux)
- Node.js & npm (if running frontend/backend locally)

## Quick Start (Recommended: Docker Compose)
1. **Start Docker Desktop** and wait for it to be running.
2. **Open PowerShell and navigate to the project:**
   ```powershell
   cd "C:\Users\nikhi\OneDrive\Desktop\zomato-CICD\Zomato-devops-pipeline"
   ```
3. **Start all services:**
   ```powershell
   docker compose up -d
   ```
4. **Check containers:**
   ```powershell
   docker compose ps
   ```
5. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend health: [http://localhost:4000/healthz](http://localhost:4000/healthz)

6. **Stop everything:**
   ```powershell
   docker compose down
   ```

## Running Locally (without Docker)
- **Backend:**
  ```powershell
  cd backend
  npm install
  npm run dev
  ```
- **Frontend:**
  ```powershell
  cd frontend
  npm install
  npm run dev
  ```

## Troubleshooting
- **Docker not running:** Start Docker Desktop first.
- **Port in use:** Stop other apps using 3000/4000/5432.
- **DB connection errors:** Wait a few seconds, then restart backend: `docker compose restart backend`
- **Logs:**
  ```powershell
  docker compose logs backend --tail 100
  docker compose logs frontend --tail 100
  ```

## Security Note
- The `/debug` route has been removed for production safety. Never expose sensitive debug/admin endpoints in production.

---

For more help, ask your AI agent or check the codebase for details.
