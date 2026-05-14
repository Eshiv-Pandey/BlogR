# Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Prerequisites Check
```bash
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version
```

### Step 2: MongoDB Atlas Setup (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a cluster (Free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/blog-management?retryWrites=true&w=majority
   ```

### Step 3: Clone and Install

```bash
# Clone the project
git clone <your-repo-url>
cd blog-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-management?retryWrites=true&w=majority
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Open Browser
Navigate to: http://localhost:3000

## ✅ Verification

If everything is working:
- Backend should show: "MongoDB Connected"
- Frontend should open automatically
- You should see an empty table with "Add Post" button

## 🐛 Quick Fixes

**Can't connect to MongoDB?**
- Check your IP is whitelisted in MongoDB Atlas (Network Access → Add IP Address → Allow access from anywhere)
- Verify password in connection string has no special characters (or URL encode them)

**Port 5000 already in use?**
- Change PORT in `backend/.env` to 5001
- Update `frontend/.env` VITE_API_URL to use port 5001

**Frontend can't reach backend?**
- Verify backend is running and shows "Server is running on port 5000"
- Check `frontend/.env` has correct API URL
- Try accessing http://localhost:5000/api/posts in browser

## 📝 Test the App

1. Click "Add Post" button
2. Fill in all required fields
3. Click "Publish Post"
4. You should see your post in the table!

## 🎉 You're Ready!

The application is now running. Check out the main README.md for detailed documentation.
