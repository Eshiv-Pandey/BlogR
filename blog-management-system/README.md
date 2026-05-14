# Blog Post Management System

A full-stack blog management application built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## 🚀 Features

### Frontend
- ✅ Responsive design (Mobile & Desktop)
- ✅ Three main screens: List View, Add/Edit Form, View Details
- ✅ Advanced search functionality (by title, author, category)
- ✅ Filter by category and status
- ✅ Pagination support
- ✅ Export to CSV functionality
- ✅ Form validation with React Hook Form
- ✅ Toast notifications for success/error feedback
- ✅ Clean component architecture
- ✅ Modern UI with custom styling

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ CRUD operations for blog posts
- ✅ Search API (title, author, category)
- ✅ Pagination support
- ✅ CSV export functionality
- ✅ Input validation with express-validator
- ✅ Comprehensive error handling
- ✅ CORS enabled

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR **MongoDB Atlas** account (recommended) - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM v6
- React Hook Form
- Axios
- React Hot Toast
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- JSON2CSV
- CORS
- Dotenv

## 📦 Installation & Setup

### Option 1: Using MongoDB Atlas (Recommended for Deployment)

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd blog-management-system
```

#### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account
2. Create a new cluster (Free tier M0 is sufficient)
3. Click "Connect" on your cluster
4. Create a database user:
   - Username: `bloguser` (or your choice)
   - Password: Create a strong password (save it!)
5. Choose "Connect your application"
6. Copy the connection string (it will look like):
   ```
   mongodb+srv://bloguser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual password
8. Add your database name after `.net/`: 
   ```
   mongodb+srv://bloguser:yourpassword@cluster0.xxxxx.mongodb.net/blog-management?retryWrites=true&w=majority
   ```

#### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows:
copy .env.example .env
# On Mac/Linux:
cp .env.example .env
```

Edit the `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://bloguser:yourpassword@cluster0.xxxxx.mongodb.net/blog-management?retryWrites=true&w=majority
NODE_ENV=development
```

**Important**: Replace the MONGODB_URI with your actual MongoDB Atlas connection string!

#### Step 4: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Create .env file
# On Windows:
copy .env.example .env
# On Mac/Linux:
cp .env.example .env
```

The `.env` file should contain:
```env
VITE_API_URL=http://localhost:5000/api
```

### Option 2: Using Local MongoDB

If you have MongoDB installed locally:

#### Backend .env:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-management
NODE_ENV=development
```

Make sure MongoDB service is running:
```bash
# Windows (run as Administrator)
net start MongoDB

# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## 🚀 Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

You should see:
```
Server is running on port 5000
Environment: development
MongoDB Connected: <your-mongodb-host>
```

### Start Frontend Development Server

Open a **new terminal** window:

```bash
# From frontend directory
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000` and open automatically in your browser.

## 🧪 Testing the Application

1. **Homepage** - View all blog posts in a table
2. **Add Post** - Click "Add Post" button to create a new post
3. **Search** - Use the search bar to find posts by title, author, or category
4. **Filters** - Filter posts by category and status
5. **View Details** - Click the eye icon to view full post details
6. **Edit Post** - Click the edit icon to modify a post
7. **Delete Post** - Click the trash icon to delete a post
8. **Export CSV** - Click "Export CSV" to download posts as CSV file
9. **Pagination** - Navigate through pages of posts

## 📝 API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (with pagination) |
| GET | `/api/posts/search` | Search posts |
| GET | `/api/posts/export` | Export posts to CSV |
| GET | `/api/posts/:id` | Get single post by ID |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post by ID |
| DELETE | `/api/posts/:id` | Delete post by ID |

### Query Parameters

**Pagination:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Filters:**
- `category` - Filter by category
- `status` - Filter by status (Draft/Published)
- `q` - Search query

**Example:**
```
GET http://localhost:5000/api/posts?page=1&limit=10&category=Technology&status=Published
GET http://localhost:5000/api/posts/search?q=react&page=1
GET http://localhost:5000/api/posts/export?category=Technology
```

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

For production, update `VITE_API_URL` to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 📁 Project Structure

```
blog-management-system/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── Post.js              # Post schema
│   ├── routes/
│   │   └── posts.js             # Post routes & controllers
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling middleware
│   ├── utils/
│   │   └── csvExport.js         # CSV export utility
│   ├── .env                      # Environment variables
│   ├── server.js                 # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── Posts/
│   │   │   │   ├── PostList.jsx
│   │   │   │   ├── PostForm.jsx
│   │   │   │   ├── PostView.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── Pagination.jsx
│   │   │   └── Common/
│   │   │       ├── Loading.jsx
│   │   │       └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AddPostPage.jsx
│   │   │   ├── EditPostPage.jsx
│   │   │   └── ViewPostPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # API service
│   │   ├── styles/
│   │   │   └── global.css        # Global styles
│   │   ├── App.jsx               # Main App component
│   │   └── main.jsx              # Entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

## 🚢 Deployment

### Backend Deployment (Render / Railway / Heroku)

#### Using Render (Recommended - Free Tier Available):

1. Create account on [Render](https://render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: blog-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
6. Click "Create Web Service"
7. Copy your service URL (e.g., `https://blog-backend.onrender.com`)

#### Using Railway:

1. Sign up at [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the Variables tab
5. Deploy will start automatically
6. Copy your service URL

#### Using Heroku:

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create blog-backend-app

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Vercel / Netlify)

#### Using Vercel (Recommended):

1. Sign up at [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://blog-backend.onrender.com/api`)
6. Click "Deploy"
7. Your site will be live at `https://your-app.vercel.app`

#### Using Netlify:

1. Sign up at [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL
6. Click "Deploy site"

### Post-Deployment:

1. Update frontend `.env` with production backend URL
2. Update backend CORS settings if needed (in `server.js`):
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-url.vercel.app'
   }));
   ```
3. Test all functionality on the live site

## 🐛 Troubleshooting

### Backend Issues:

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED
```
- Check if MongoDB is running locally
- Verify MongoDB Atlas connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas (Network Access)
- Ensure password in connection string is URL-encoded

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- Change PORT in `.env` file to a different port (e.g., 5001)
- Or kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Frontend Issues:

**API Connection Error:**
- Verify backend is running on http://localhost:5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors
- Ensure backend has CORS enabled

**Module Not Found:**
```
Error: Cannot find module 'react-router-dom'
```
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Common Issues:

**Validation Errors:**
- Check all required fields are filled
- Verify email format is correct
- Check category is one of the allowed values
- Check status is either "Draft" or "Published"

**Images Not Loading:**
- Verify thumbnail URL is a valid image URL
- Check if image URL is accessible
- Image will hide automatically if URL is invalid

## 📊 Sample Data

You can use this sample data to test the application:

**Post 1:**
- Title: Getting Started with React Hooks
- Author: Sarah Johnson
- Email: sarah@example.com
- Category: Technology
- Status: Published
- Tags: react, javascript, hooks
- Thumbnail: https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800
- Short Description: Learn how to use React Hooks to build modern, functional components.
- Content: React Hooks revolutionized how we write React components...

**Post 2:**
- Title: Modern UI Design Principles
- Author: Michael Chen
- Email: michael@example.com
- Category: Design
- Status: Published
- Tags: design, ui, ux
- Thumbnail: https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800
- Short Description: Explore the fundamental principles of modern user interface design.
- Content: Good UI design is invisible. It enables users to accomplish their goals...

## 👨‍💻 Development

### Available Scripts:

**Backend:**
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style:

- Use meaningful variable and function names
- Keep components small and focused
- Follow React best practices
- Use async/await for asynchronous operations
- Handle errors gracefully with try-catch
- Add comments for complex logic

## 📄 License

This project is created for assessment purposes.

## 🤝 Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Verify all environment variables are set correctly
3. Check the browser console and server logs for errors
4. Ensure all dependencies are installed correctly

## ✅ Checklist

- [x] CRUD API for blog posts
- [x] Pagination support
- [x] Search functionality
- [x] Export to CSV
- [x] MongoDB integration
- [x] Responsive design
- [x] Form validation
- [x] Error handling
- [x] Component-based architecture
- [x] Clean file structure
- [x] Success/failure notifications
- [x] Multiple routing
- [x] No inline styles
- [x] Good naming conventions
- [x] Connected to real API

## 🎯 Assignment Requirements Met

✅ Backend:
- CRUD API with pagination
- Search API (title, author, category)
- Export to CSV API
- MongoDB with Mongoose

✅ Frontend:
- Responsive design (Mobile/Desktop)
- Field validation
- 3 screens (List, Add/Edit, View)
- Multiple routing
- Component-based architecture
- Consistent file structure
- Error handling with notifications
- React with Vite
- Connected to real API
- No inline styles
- Good naming conventions

## 📞 Contact

For questions or support, please refer to the troubleshooting section or check the application logs.
