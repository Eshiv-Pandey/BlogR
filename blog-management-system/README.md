# BlogR — Blog Management System

> A full-stack editorial workspace for managing, publishing, and exporting blog posts. Built with React, Node.js, Express, and MongoDB.

**Live Demo:** [blogrfrontend.vercel.app](https://blogrfrontend.vercel.app)  
**Backend API:** [blog-r-tvm2.vercel.app/api](https://blog-r-tvm2.vercel.app/api)

---

## Features

### Frontend
- Glassmorphism UI with purple/violet design system and Plus Jakarta Sans typography
- Listing view with sortable table, real-time search, and category/status filters
- Add, Edit, and View Detail pages with full form validation
- Pagination with smart page number display
- CSV export with active filter support
- Toast notifications for all user actions
- Responsive layout for mobile and desktop
- Custom BlogR favicon and branding

### Backend
- RESTful API with Express.js
- MongoDB with Mongoose ODM and text search indexes
- Full CRUD for blog posts
- Paginated list and search endpoints
- CSV export endpoint
- Input validation with express-validator
- Centralized error handling middleware
- CORS configured for all Vercel deployment URLs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6 |
| Forms | React Hook Form |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Styling | Custom CSS (no UI library) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Validation | express-validator |
| Export | json2csv |
| Deployment | Vercel (both frontend and backend) |

---

## Prerequisites

- **Node.js** v16 or higher — [nodejs.org](https://nodejs.org/)
- **MongoDB Atlas** account (free tier is sufficient) — [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register)
- **Git** — [git-scm.com](https://git-scm.com/)

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Eshiv-Pandey/BlogR.git
cd BlogR/blog-management-system
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blogr?retryWrites=true&w=majority
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
# App running on http://localhost:5173
```

### 4. Seed demo data (optional)

```bash
cd backend
node seed.js
# Inserts 10 demo posts with real Unsplash thumbnails
```

---

## API Reference

### Base URL
```
Local:      http://localhost:5000/api
Production: https://blog-r-tvm2.vercel.app/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List posts with pagination and filters |
| GET | `/posts/search` | Full-text search across posts |
| GET | `/posts/export` | Download filtered posts as CSV |
| GET | `/posts/:id` | Get a single post by ID |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `category` | string | Filter by: Technology, Design, Business, Lifestyle, Other |
| `status` | string | Filter by: Draft, Published |
| `q` | string | Search query (title, author, category) |

### Example Requests

```bash
# Get page 2 of published Technology posts
GET /api/posts?page=2&limit=10&category=Technology&status=Published

# Search for "react"
GET /api/posts/search?q=react&page=1

# Export all Design posts as CSV
GET /api/posts/export?category=Design
```

### Post Schema

```json
{
  "title":            "string (required, max 200)",
  "authorName":       "string (required)",
  "email":            "string (required, valid email)",
  "category":         "Technology | Design | Business | Lifestyle | Other",
  "tags":             ["string"],
  "status":           "Draft | Published",
  "thumbnailUrl":     "string (optional URL)",
  "shortDescription": "string (required, max 300)",
  "content":          "string (required)"
}
```

---

## Project Structure

```
BlogR/blog-management-system/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── Post.js              # Mongoose schema + text indexes
│   ├── routes/
│   │   └── posts.js             # Routes and controllers
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handler
│   ├── utils/
│   │   └── csvExport.js         # CSV generation utility
│   ├── seed.js                  # Demo data seeder (10 posts)
│   ├── server.js                # App entry point
│   ├── vercel.json              # Vercel serverless config
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── favicon.svg          # BlogR favicon
    ├── src/
    │   ├── components/
    │   │   ├── Layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Footer.jsx
    │   │   ├── Posts/
    │   │   │   ├── PostList.jsx
    │   │   │   ├── PostForm.jsx
    │   │   │   ├── PostView.jsx
    │   │   │   ├── SearchBar.jsx
    │   │   │   └── Pagination.jsx
    │   │   └── Common/
    │   │       ├── Loading.jsx
    │   │       └── ErrorMessage.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── AddPostPage.jsx
    │   │   ├── EditPostPage.jsx
    │   │   └── ViewPostPage.jsx
    │   ├── services/
    │   │   └── api.js           # Axios instance + API methods
    │   ├── styles/
    │   │   └── global.css       # Design system and all styles
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vercel.json              # SPA rewrite rules
    ├── .env.example
    └── package.json
```

---

## Environment Variables

### Backend

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | No | Server port (default: 5000) |
| `FRONTEND_URL` | No | Custom domain for CORS (Vercel URLs allowed automatically) |

### Frontend

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Full backend API URL including `/api` |

---

## Deployment (Vercel)

Both services deploy to Vercel as separate projects from the same GitHub repo.

See `DEPLOYMENT_GUIDE.md` for the full step-by-step guide.

**Quick reference:**

| Project | Root Directory | Key Env Var |
|---------|---------------|-------------|
| Backend | `blog-management-system/backend` | `MONGODB_URI`, `NODE_ENV=production` |
| Frontend | `blog-management-system/frontend` | `VITE_API_URL=https://<backend>.vercel.app/api` |

---

## Scripts

### Backend
```bash
npm run dev    # Development server with nodemon
npm start      # Production server
node seed.js   # Seed database with 10 demo posts
```

### Frontend
```bash
npm run dev     # Development server (localhost:5173)
npm run build   # Production build
npm run preview # Preview production build locally
```

---

## Troubleshooting

**CORS error in browser console**
- Confirm the backend has redeployed after any env var changes
- Check `VITE_API_URL` ends with `/api` (not just the domain)
- All `*.vercel.app` origins are allowed automatically

**MongoDB connection refused**
- Go to MongoDB Atlas > Network Access > Add `0.0.0.0/0`
- Verify the `MONGODB_URI` has the correct password (URL-encode special characters)

**Build fails on Vercel (`is not exported by`)**
- A Lucide React icon name may not exist in your installed version
- Check `lucide-react` version in `package.json` and verify icon names at [lucide.dev](https://lucide.dev)

**Port 5000 already in use locally**
- Set `PORT=5001` in `backend/.env`
- Update `VITE_API_URL` in `frontend/.env` accordingly

---

## License

MIT
