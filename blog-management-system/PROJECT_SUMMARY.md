# BlogR — Project Summary

## What Is BlogR?

BlogR is a full-stack blog management platform built with the MERN stack. It gives content teams a clean, focused workspace to create, edit, publish, and export blog posts.

**Live:** [blogrfrontend.vercel.app](https://blogrfrontend.vercel.app)  
**API:** [blog-r-tvm2.vercel.app/api](https://blog-r-tvm2.vercel.app/api)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Custom CSS, Plus Jakarta Sans + Inter (Google Fonts) |
| Forms | React Hook Form |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Validation | express-validator |
| Export | json2csv |
| Deployment | Vercel (frontend + backend, separate projects) |

---

## Features

### Core CRUD
- Create posts with title, author, email, category, tags, status, thumbnail URL, summary, and body
- Edit any existing post with pre-populated form
- Delete with confirmation
- View full post detail in a clean article layout

### Discovery
- Full-text search across title, author, and category
- Filter by category (Technology, Design, Business, Lifestyle, Other)
- Filter by status (Draft, Published)
- Pagination with smart page number display

### Utility
- CSV export respecting active search and filters
- 10-post seed script with real Unsplash thumbnails for instant demo
- Toast notifications on every user action
- Inline form validation with error messages

### Design
- Purple/violet brand palette with gradient accents
- Glassmorphism navbar with backdrop blur
- Animated gradient stat cards with hover lift
- Multi-ring loading spinner
- Styled error state with retry support
- Fully responsive (mobile and desktop)
- Custom BlogR SVG favicon

---

## Project Structure

```
BlogR/blog-management-system/
├── backend/
│   ├── config/database.js       MongoDB connection
│   ├── models/Post.js           Mongoose schema
│   ├── routes/posts.js          All 7 API endpoints
│   ├── middleware/errorHandler.js
│   ├── utils/csvExport.js
│   ├── seed.js                  Demo data seeder
│   ├── server.js
│   └── vercel.json
│
└── frontend/
    ├── public/favicon.svg       BlogR brand favicon
    ├── src/
    │   ├── components/
    │   │   ├── Layout/          Navbar, Footer
    │   │   ├── Posts/           PostList, PostForm, PostView,
    │   │   │                    SearchBar, Pagination
    │   │   └── Common/          Loading, ErrorMessage
    │   ├── pages/               HomePage, AddPostPage,
    │   │                        EditPostPage, ViewPostPage
    │   ├── services/api.js      Axios instance + API methods
    │   └── styles/global.css    Full design system
    └── vercel.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List posts (paginated, filterable) |
| GET | `/api/posts/search` | Full-text search |
| GET | `/api/posts/export` | CSV download |
| GET | `/api/posts/:id` | Single post |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

---

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | Full project documentation, API reference, troubleshooting |
| `SETUP_GUIDE.md` | Local development quickstart (5 minutes) |
| `DEPLOYMENT_GUIDE.md` | Step-by-step Vercel deployment guide |
| `ARCHITECTURE.md` | System architecture, data flow, schema, CORS, security |
| `VSCODE_SETUP.md` | VS Code extensions and workspace configuration |

---

## Running Locally

```bash
# 1. Install
cd backend && npm install
cd ../frontend && npm install

# 2. Configure (see SETUP_GUIDE.md)
# backend/.env  → MONGODB_URI, NODE_ENV
# frontend/.env → VITE_API_URL

# 3. Run
cd backend && npm run dev      # localhost:5000
cd frontend && npm run dev     # localhost:5173

# 4. Seed demo data
cd backend && node seed.js
```

---

## Created By

**Eshiv Pandey**  
Stack: MERN (MongoDB, Express, React, Node.js)  
Build tool: Vite  
Deployed: Vercel
