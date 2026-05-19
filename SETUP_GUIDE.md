# BlogR — Quick Setup Guide

Get the application running locally in under 5 minutes.

---

## Prerequisites

```bash
node --version   # Must be v16 or higher
npm --version    # Comes with Node.js
```

You also need a **MongoDB Atlas** account. Sign up free at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register).

---

## Step 1 — Get a MongoDB connection string

1. Log in to MongoDB Atlas
2. Create a free **M0** cluster if you don't have one
3. Click **Connect** on the cluster
4. Choose **Connect your application**
5. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` and add your database name:
   ```
   mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/blogr?retryWrites=true&w=majority
   ```
7. Go to **Network Access** and add `0.0.0.0/0` to allow connections from anywhere

---

## Step 2 — Clone and install

```bash
git clone https://github.com/Eshiv-Pandey/BlogR.git
cd BlogR/blog-management-system

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## Step 3 — Configure environment variables

**Backend** — create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/blogr?retryWrites=true&w=majority
NODE_ENV=development
```

**Frontend** — create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Step 4 — Start the app

Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd blog-management-system/backend
npm run dev
```
Expected output:
```
Server is running on port 5000
Environment: development
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

**Terminal 2 — Frontend:**
```bash
cd blog-management-system/frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Step 5 — Load demo data (recommended)

```bash
cd blog-management-system/backend
node seed.js
```

This inserts 10 demo posts across all categories with real Unsplash thumbnails so you can explore the platform immediately.

---

## Quick Fixes

| Problem | Fix |
|---------|-----|
| MongoDB connection error | Check IP whitelist in Atlas (0.0.0.0/0) and verify password in URI |
| Port 5000 already in use | Set `PORT=5001` in `backend/.env` and update `VITE_API_URL` |
| Frontend cannot reach backend | Check `VITE_API_URL` includes `/api` at the end |
| Build error on Vercel | Check lucide-react icon names match your installed version |

---

For full documentation see `README.md`.  
For Vercel deployment steps see `DEPLOYMENT_GUIDE.md`.  
For system architecture see `ARCHITECTURE.md`.
