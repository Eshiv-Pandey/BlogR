# BlogR — System Architecture

## Overview

BlogR is a full-stack blog management platform built on the MERN stack (MongoDB, Express, React, Node.js). The frontend and backend are deployed independently on Vercel and communicate through a RESTful JSON API.

---

# High-Level Architecture

```mermaid
flowchart TD

    A[Client Browser]
    B[React SPA - Vite]
    C[React Router v6]
    D[Reusable Components]
    E[Axios API Layer]

    F[Vercel Edge Network]
    G[Frontend Deployment<br/>Static SPA]
    H[Backend Deployment<br/>Express Serverless API]

    I[MongoDB Atlas]

    A --> B
    B --> C
    B --> D
    D --> E

    E -->|HTTPS / JSON| F

    F --> G
    F --> H

    H -->|Mongoose Queries| I
```

---

# Frontend Component Architecture

```mermaid
graph TD

    A[App.jsx]

    A --> B[Navbar.jsx]
    A --> C[Footer.jsx]
    A --> D[React Router]

    D --> E[HomePage.jsx]
    D --> F[AddPostPage.jsx]
    D --> G[EditPostPage.jsx]
    D --> H[ViewPostPage.jsx]

    E --> I[PostList.jsx]
    I --> J[SearchBar.jsx]
    I --> K[Pagination.jsx]
    I --> L[Stats Cards]
    I --> M[Posts Table]

    F --> N[PostForm.jsx Create Mode]
    G --> O[PostForm.jsx Edit Mode]

    H --> P[PostView.jsx]

    A --> Q[react-hot-toast]
    A --> R[Loading.jsx]
    A --> S[ErrorMessage.jsx]
```

---

# Data Flow

## Read Flow (GET Posts)

```mermaid
sequenceDiagram

    participant U as User
    participant F as React Frontend
    participant A as Axios API
    participant B as Express Backend
    participant D as MongoDB Atlas

    U->>F: Open Home Page
    F->>A: fetchPosts()
    A->>B: GET /api/posts
    B->>D: Post.find().skip().limit()
    D-->>B: Return Documents
    B-->>A: JSON Response
    A-->>F: Posts + Pagination
    F-->>U: Render Table + Stats
```

---

## Write Flow (Create / Update Post)

```mermaid
sequenceDiagram

    participant U as User
    participant F as PostForm.jsx
    participant A as Axios API
    participant B as Express Backend
    participant D as MongoDB Atlas

    U->>F: Submit Form
    F->>F: React Hook Form Validation
    F->>A: POST / PUT Request
    A->>B: Send JSON Payload
    B->>B: express-validator Validation
    B->>D: Save / Update Document
    D-->>B: Success
    B-->>A: 201 / 200 Response
    A-->>F: Success Response
    F-->>U: Toast + Redirect
```

---

## Error Handling Flow

```mermaid
flowchart TD

    A[API Request Fails]
    B[Axios Interceptor]
    C[Extract Error Message]
    D[Throw New Error]
    E[Page Catch Block]
    F[Render ErrorMessage.jsx]
    G[Display toast.error]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G
```

---

---

# Database Schema

## Collection: `posts`

```mermaid
erDiagram

    POSTS {
        ObjectId _id
        String title
        String authorName
        String email
        String category
        String[] tags
        String status
        String thumbnailUrl
        String shortDescription
        String content
        Date createdAt
        Date updatedAt
    }
```

### Field Constraints

| Field | Type | Constraints |
|---|---|---|
| title | String | Required, max 200 chars |
| authorName | String | Required |
| email | String | Required, valid email |
| category | String | Enum based |
| tags | Array[String] | Optional |
| status | String | Draft / Published |
| shortDescription | String | Required, max 300 chars |
| content | String | Required |

### Indexes

- Default `_id` index
- Compound text index on:
  - `title`
  - `authorName`
  - `category`

---

# CORS Policy

```mermaid
flowchart LR

    A[Incoming Request]

    A --> B{Origin Allowed?}

    B -->|localhost| C[Allow]
    B -->|vercel.app| C
    B -->|FRONTEND_URL| C
    B -->|Unknown Origin| D[Block Request]
```

---

---

# Security Considerations

| Area | Implementation |
|---|---|
| Input Validation | express-validator |
| CORS | Explicit allowlist |
| Sensitive Data | `.env` ignored via `.gitignore` |
| Database Security | MongoDB Atlas IP restrictions |
| Error Handling | Generic production error messages |

---

# Future Improvements

| Area | Current | Future Improvement |
|---|---|---|
| Authentication | None | JWT + User Accounts |
| Image Upload | URL only | Cloudinary / S3 |
| Rich Text Editor | Plain textarea | Markdown / WYSIWYG |
| Search | MongoDB Text Index | Algolia / Meilisearch |
| Testing | None | Jest + RTL |
| Rate Limiting | None | express-rate-limit |
| Cold Starts | Present | Railway / Keep-alive |
