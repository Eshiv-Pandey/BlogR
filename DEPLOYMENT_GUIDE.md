# BlogR — Deployment Guide (Vercel)

This guide covers deploying both the backend API and the React frontend to Vercel as separate projects from the same GitHub repository.

---

## Overview

| Project | Service | Root Directory |
|---------|---------|---------------|
| Backend API | Vercel (Node.js serverless) | `blog-management-system/backend` |
| Frontend App | Vercel (Vite SPA) | `blog-management-system/frontend` |

Deploy the **backend first** so you have its URL ready when configuring the frontend.

---

## Prerequisites

- Code pushed to GitHub (repo: `Eshiv-Pandey/BlogR`)
- MongoDB Atlas cluster with `0.0.0.0/0` in Network Access
- Vercel account at [vercel.com](https://vercel.com)

---

## Step 1 — Deploy the Backend

### 1.1 Create a new Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to `Eshiv-Pandey/BlogR`
3. In **Configure Project**, set:
   - **Root Directory:** `blog-management-system/backend`
   - **Framework Preset:** Other
   - **Build Command:** *(leave blank)*
   - **Output Directory:** *(leave blank)*

### 1.2 Add environment variables

In the **Environment Variables** section before deploying, add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/blogr?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |

> Leave `FRONTEND_URL` blank for now. All `*.vercel.app` origins are already allowed by the CORS configuration.

### 1.3 Deploy

Click **Deploy**. Wait for the build to complete.

### 1.4 Copy your backend URL

It will look like: `https://blog-r-tvm2.vercel.app`

**Verify the API is live:**
```
https://blog-r-tvm2.vercel.app/api/posts
```
Should return a JSON response with `{ success: true, data: [...] }`.

---

## Step 2 — Deploy the Frontend

### 2.1 Create another new Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Eshiv-Pandey/BlogR` again (second separate project)
3. Set:
   - **Root Directory:** `blog-management-system/frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 2.2 Add environment variable

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://blog-r-tvm2.vercel.app/api` |

Replace `blog-r-tvm2` with your actual backend project name.

### 2.3 Deploy

Click **Deploy**. The frontend will be live at something like `https://blogrfrontend.vercel.app`.

---

## Step 3 — Verify

Open your frontend URL in the browser.

**Checks to run:**

- [ ] Posts load on the homepage (confirms CORS and API URL are correct)
- [ ] Creating a post works
- [ ] Editing a post works
- [ ] Deleting a post works
- [ ] CSV export downloads correctly
- [ ] No errors in browser DevTools (F12 > Console)

**Common issue:** If posts do not load, open DevTools > Network and look at the failed request URL. It should be `https://your-backend.vercel.app/api/posts`. If it shows a different URL, check `VITE_API_URL` in the frontend environment variables.

---

## Step 4 — Seed Demo Data

To populate the live database with demo posts, run the seed script locally against your production MongoDB URI:

```bash
cd blog-management-system/backend

# Temporarily update MONGODB_URI in .env to your Atlas production URI
node seed.js
```

This inserts 10 posts and clears any existing data.

---

## Redeploying After Changes

Vercel automatically redeploys both projects when you push to `main`.

To manually redeploy:
1. Go to the project on Vercel
2. Click **Deployments** tab
3. Click the three-dot menu on the latest deployment
4. Click **Redeploy**

> After changing any environment variable on Vercel, you must redeploy for the change to take effect.

---

## Environment Variables Reference

### Backend (Vercel project settings)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | Full Atlas connection string |
| `NODE_ENV` | Yes | Set to `production` |
| `FRONTEND_URL` | No | Custom domain for CORS. All `*.vercel.app` URLs are allowed automatically |

### Frontend (Vercel project settings)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend URL ending in `/api` |

---

## Troubleshooting

**CORS error (`No Access-Control-Allow-Origin`)**
- The backend allows all `*.vercel.app` origins automatically
- If using a custom domain, add it as `FRONTEND_URL` in backend env vars and redeploy

**API returns 404 for all routes**
- Check that `blog-management-system/backend` is set as the Root Directory
- Confirm `vercel.json` exists in the backend folder

**Frontend shows blank page after refresh**
- `vercel.json` in the frontend folder handles SPA routing rewrites
- If missing, all routes except `/` return 404

**Build fails (`is not exported by`)**
- A Lucide React icon name does not exist in the installed version
- Run `npm run build` locally to get the exact error, then fix the import

**MongoDB connection fails**
- Add `0.0.0.0/0` to Network Access in MongoDB Atlas
- URL-encode special characters in the password (e.g., `@` becomes `%40`)
