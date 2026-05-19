# BlogR : Blog Management System Architecture

## Project Overview

BlogR is a full-stack MERN blog management platform designed to provide a modern editorial workspace for creating, editing, managing, searching, and exporting blog posts efficiently.

The application focuses on:
- Clean and responsive user experience
- Structured content management
- Scalable REST API architecture
- Serverless cloud deployment
- Real-time filtering and search capabilities

The platform is built using:
- **Frontend:** React + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Vercel

---

## Project Goals

- Provide a centralized dashboard for blog management
- Support full CRUD operations on blog posts
- Implement scalable backend architecture
- Enable responsive and modern UI/UX
- Support filtering, searching, and CSV exporting
- Demonstrate production-ready MERN stack practices

---

## Application Entry Points

| Layer | Entry Point | Purpose |
|---|---|---|
| Frontend | `src/main.jsx` | Mounts the React application |
| Frontend App | `src/App.jsx` | Root component and routing |
| Backend | `server.js` | Initializes Express server and middleware |
| Database | `config/database.js` | MongoDB Atlas connection setup |

---

## System Architecture

```mermaid
flowchart TD

    A[Client Browser]
    B[React SPA - Vite]
    C[Axios API Layer]
    D[Vercel Frontend Deployment]
    E[Express.js Backend API]
    F[Vercel Serverless Functions]
    G[MongoDB Atlas]

    A --> B
    B --> C
    C --> D
    D --> F
    F --> E
    E --> G
```

---

## Frontend Architecture

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

    F --> N[PostForm.jsx Create]
    G --> O[PostForm.jsx Edit]

    H --> P[PostView.jsx]

    A --> Q[Loading.jsx]
    A --> R[ErrorMessage.jsx]
    A --> S[Toast Notifications]
```

---

## Backend Request Flow

```mermaid
sequenceDiagram

    participant U as User
    participant F as Frontend
    participant A as Axios
    participant B as Express API
    participant D as MongoDB Atlas

    U->>F: User Action
    F->>A: API Request
    A->>B: HTTP Request
    B->>D: Database Query
    D-->>B: Response Data
    B-->>A: JSON Response
    A-->>F: Parsed Data
    F-->>U: UI Update
```

---

## CRUD Flow

```mermaid
flowchart TD

    A[User Opens Form]
    B[React Hook Form Validation]
    C[Axios POST / PUT]
    D[Express Validator]
    E[MongoDB Save]
    F[Success Response]
    G[Toast + Redirect]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
```

---

## Error Handling Flow

```mermaid
flowchart TD

    A[API Failure]
    B[Axios Interceptor]
    C[Extract Message]
    D[Throw Error]
    E[Component Catch Block]
    F[Render ErrorMessage]
    G[Show Toast]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G
```

---

## Database Schema

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

---

## Project Structure

```mermaid
graph TD

    A[BlogR]

    A --> B[backend]
    A --> C[frontend]

    B --> D[config]
    B --> E[models]
    B --> F[routes]
    B --> G[middleware]
    B --> H[utils]
    B --> I[server.js]

    C --> J[public]
    C --> K[src]

    K --> L[components]
    K --> M[pages]
    K --> N[services]
    K --> O[styles]
    K --> P[App.jsx]
```

---

## Deployment Flow

```mermaid
flowchart LR

    A[GitHub Repository]
    B[Vercel Frontend]
    C[Vercel Backend]
    D[MongoDB Atlas]

    A --> B
    A --> C
    C --> D
    B --> C
```

---

## CORS Validation Flow

```mermaid
flowchart TD

    A[Incoming Request]
    B{Allowed Origin?}

    B -->|localhost| C[Allow]
    B -->|vercel.app| C
    B -->|FRONTEND_URL| C
    B -->|Unknown| D[Reject Request]
```
