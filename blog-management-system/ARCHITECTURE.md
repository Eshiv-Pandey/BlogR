# BlogR — System Architecture

## Overview

BlogR is a full-stack blog management platform built on the MERN stack (MongoDB, Express, React, Node.js). The frontend and backend are deployed independently on Vercel, communicating over HTTP through a RESTful JSON API.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              React SPA (Vite)                       │  │
│   │                                                     │  │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│   │  │ Navbar   │  │ Footer   │  │  React Router v6  │  │  │
│   │  └──────────┘  └──────────┘  └──────────────────┘  │  │
│   │                                                     │  │
│   │  Pages: HomePage / AddPostPage / EditPostPage /     │  │
│   │         ViewPostPage                                │  │
│   │                                                     │  │
│   │  Components: PostList / PostForm / PostView /       │  │
│   │              SearchBar / Pagination / Loading /     │  │
│   │              ErrorMessage                           │  │
│   │                                                     │  │
│   │  Services: api.js (Axios instance)                  │  │
│   └──────────────────────────┬──────────────────────────┘  │
│                              │ HTTPS / JSON                  │
└──────────────────────────────┼──────────────────────────────┘
                               │
              ┌────────────────▼────────────────┐
              │      Vercel Edge Network         │
              │   (CDN + Serverless Routing)     │
              └────────────────┬────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                       │
        ▼                      ▼                       │
┌───────────────┐   ┌─────────────────────┐           │
│  Frontend     │   │  Backend API         │           │
│  Vercel CDN   │   │  Vercel Serverless   │           │
│               │   │                     │           │
│  /dist (SPA)  │   │  server.js          │           │
│  React bundle │   │  Express app        │           │
│  Static files │   │  @vercel/node       │           │
└───────────────┘   └──────────┬──────────┘           │
                               │                       │
                               ▼                       │
                   ┌─────────────────────┐             │
                   │   MongoDB Atlas      │             │
                   │   (Cloud Database)   │             │
                   │                     │             │
                   │   Collection: posts  │             │
                   │   Text indexes on    │             │
                   │   title/author/cat   │             │
                   └─────────────────────┘             │
```

---

## Component Architecture (Frontend)

```
App.jsx
├── Navbar.jsx              (sticky, glassmorphism)
├── Routes
│   ├── / → HomePage.jsx
│   │       └── PostList.jsx
│   │           ├── SearchBar.jsx
│   │           ├── Filter dropdowns
│   │           ├── Stats grid (4 cards)
│   │           ├── Table of posts
│   │           └── Pagination.jsx
│   │
│   ├── /add → AddPostPage.jsx
│   │           └── PostForm.jsx  (create mode)
│   │
│   ├── /edit/:id → EditPostPage.jsx
│   │                └── PostForm.jsx  (edit mode)
│   │
│   └── /view/:id → ViewPostPage.jsx
│                    └── PostView.jsx
│
├── Footer.jsx
└── Toaster (react-hot-toast)

Shared:
  Loading.jsx        (multi-ring spinner with label)
  ErrorMessage.jsx   (error card with optional retry)
```

---

## Data Flow

### Read (GET posts)

```
User opens HomePage
      │
      ▼
HomePage.jsx calls fetchPosts()
      │
      ▼
api.js → GET /api/posts?page=1&limit=10
      │
      ▼
Express router → posts.js getAllPosts()
      │
      ▼
Mongoose: Post.find().skip().limit()
      │
      ▼
MongoDB Atlas returns documents
      │
      ▼
Response: { success, data: [...], pagination: {...} }
      │
      ▼
PostList.jsx renders table + stat cards
```

### Write (POST / PUT)

```
User fills PostForm and submits
      │
      ▼
React Hook Form validates fields
      │
      ▼ (validation passes)
api.js → POST /api/posts  (or PUT /api/posts/:id)
      │
      ▼
express-validator checks server-side rules
      │
      ▼
Mongoose saves to MongoDB Atlas
      │
      ▼
201 Created / 200 OK response
      │
      ▼
toast.success() + navigate('/')
```

### Error Flow

```
Any API call fails
      │
      ▼
Axios interceptor catches error
      │
      ▼
Normalises message from response.data.message
      │
      ▼
Throws new Error(message)
      │
      ▼
catch block in page component:
  - setError(err.message)     → renders ErrorMessage.jsx
  - toast.error(err.message)  → shows toast
```

---

## Backend Architecture

```
server.js  (entry point)
│
├── dotenv.config()           Load env vars
├── connectDB()               MongoDB connection
│
├── CORS middleware            Allow *.vercel.app + localhost
├── express.json()            Parse JSON bodies
├── express.urlencoded()      Parse form data
│
├── GET /                     Health check
├── /api/posts → posts.js     All post routes
│   ├── GET    /              getAllPosts
│   ├── GET    /search        searchPosts
│   ├── GET    /export        exportToCSV
│   ├── GET    /:id           getPostById
│   ├── POST   /              createPost
│   ├── PUT    /:id           updatePost
│   └── DELETE /:id           deletePost
│
├── 404 handler
└── errorHandler middleware    Centralised error responses
```

---

## Database Schema

**Collection:** `posts`

```
Field             Type        Constraints
─────────────────────────────────────────────────────────
_id               ObjectId    Auto-generated
title             String      Required, max 200 chars
authorName        String      Required
email             String      Required, valid email format
category          String      Enum: Technology | Design |
                              Business | Lifestyle | Other
tags              [String]    Default: []
status            String      Enum: Draft | Published
                              Default: Draft
thumbnailUrl      String      Optional URL
shortDescription  String      Required, max 300 chars
content           String      Required
createdAt         Date        Auto (timestamps: true)
updatedAt         Date        Auto (timestamps: true)
```

**Indexes:**
- Default `_id` index
- Compound text index on `title`, `authorName`, `category` (powers `/search` endpoint)

---

## CORS Policy

The backend uses a dynamic CORS allowlist:

| Origin | Allowed |
|--------|---------|
| `http://localhost:5173` | Yes (local dev) |
| `http://localhost:3000` | Yes (legacy local dev) |
| `https://*.vercel.app` | Yes (all Vercel deployments via regex) |
| `FRONTEND_URL` env var | Yes (custom domains, comma-separated) |
| All other origins | Blocked |

This means all Vercel preview URLs are allowed automatically without manual configuration.

---

## Vercel Deployment Model

### Frontend (Static SPA)

```
vercel.json:
  rewrites: [{ source: "/(.*)", destination: "/index.html" }]

Effect: All URL paths return index.html, allowing React Router
        to handle client-side navigation.
```

### Backend (Serverless Functions)

```
vercel.json:
  builds: [{ src: "server.js", use: "@vercel/node" }]
  routes: [{ src: "/(.*)", dest: "server.js" }]

Effect: Every HTTP request is handled by server.js running as
        a serverless function. Cold starts apply (~200-800ms
        on first request after inactivity).
```

---

## Security Considerations

| Area | Approach |
|------|----------|
| Input validation | express-validator on all write endpoints |
| CORS | Explicit allowlist, blocks unknown origins |
| Sensitive data | `.env` never committed (`.gitignore`), `.env.example` provided |
| Database | MongoDB Atlas network access can be restricted to specific IPs in production |
| Error messages | Server errors return generic messages, not stack traces, in production |

---

## Limitations and Future Improvements

| Area | Current | Potential Improvement |
|------|---------|----------------------|
| Auth | None | JWT auth + user accounts |
| Image upload | URL input only | Direct file upload to Cloudinary/S3 |
| Rich text | Plain textarea | Markdown or WYSIWYG editor |
| Cold starts | Present (serverless) | Keep-alive pings or migrate to Railway |
| Search | MongoDB text index | Algolia or Meilisearch for relevance |
| Testing | None | Jest + React Testing Library |
| Rate limiting | None | express-rate-limit middleware |
