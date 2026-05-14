# Deployment Guide

This guide will help you deploy your Blog Management System to production.

## 🌐 Deployment Architecture

- **Backend**: Render / Railway / Heroku
- **Frontend**: Vercel / Netlify
- **Database**: MongoDB Atlas (already cloud-based)

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster is created and accessible
- [ ] All code is committed to GitHub repository
- [ ] Environment variables are documented
- [ ] Application works locally without errors
- [ ] All dependencies are listed in package.json

## 🚀 Backend Deployment

### Option 1: Render (Recommended - Free Tier)

#### Step-by-Step:

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: blog-management-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add the following:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-management?retryWrites=true&w=majority
   NODE_ENV = production
   PORT = 5000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Copy your service URL: `https://blog-management-backend.onrender.com`

6. **Test Backend**
   - Visit: `https://your-backend-url.onrender.com`
   - You should see: `{"success":true,"message":"Blog Management API","version":"1.0.0"}`

#### Important Notes for Render:
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Upgrade to paid plan for always-on service

### Option 2: Railway

1. **Sign Up**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Railway auto-detects Node.js
   - Set root directory to `backend` in settings
   - Add environment variables in "Variables" tab:
   ```
   MONGODB_URI=your-mongodb-uri
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway automatically deploys
   - Copy your service URL from settings

### Option 3: Heroku

```bash
# Install Heroku CLI
# Windows: Download from https://devcenter.heroku.com/articles/heroku-cli
# Mac: brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create blog-management-backend

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set NODE_ENV=production

# Deploy backend only
git subtree push --prefix backend heroku main

# View logs
heroku logs --tail
```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step-by-Step:

1. **Create Vercel Account**
   - Go to https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```
   - Important: Use your actual backend URL from Render!

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `https://your-app.vercel.app`

6. **Configure Domain (Optional)**
   - Go to project settings → Domains
   - Add custom domain if you have one

### Option 2: Netlify

1. **Sign Up**
   - Go to https://www.netlify.com/
   - Sign up with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository

3. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Add Environment Variable**
   - Go to Site settings → Environment variables
   - Add:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live at: `https://random-name.netlify.app`

6. **Change Site Name (Optional)**
   - Site settings → Change site name

## 🔧 Post-Deployment Configuration

### Update Backend CORS

Edit `backend/server.js` to allow your frontend domain:

```javascript
const cors = require('cors');

// Replace with your actual frontend URL
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app.vercel.app',
  'https://your-app.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Commit and push changes to trigger re-deployment.

### MongoDB Atlas Security

1. **Network Access**
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
   - This is necessary for services like Render/Railway

2. **Database Access**
   - Verify your database user has read/write permissions
   - Password should not contain special characters (or URL encode them)

## 🧪 Testing Production

### Test Backend:
```bash
# Health check
curl https://your-backend-url.onrender.com

# Get posts (should return empty array initially)
curl https://your-backend-url.onrender.com/api/posts

# Create a test post
curl -X POST https://your-backend-url.onrender.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "authorName": "Test Author",
    "email": "test@example.com",
    "category": "Technology",
    "status": "Published",
    "shortDescription": "This is a test post",
    "content": "Test content here",
    "tags": ["test"]
  }'
```

### Test Frontend:
1. Visit your deployed frontend URL
2. Click "Add Post"
3. Fill in all fields
4. Click "Publish Post"
5. Verify post appears in the table
6. Test all features:
   - Search
   - Filters
   - Edit
   - View
   - Delete
   - Export CSV

## 🔄 Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:

1. **Make changes to your code**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. **Automatic deployment triggers**
4. **Check deployment status** in Vercel/Render dashboard
5. **Test changes** on live site

## 📊 Monitoring

### Render:
- Dashboard shows logs and metrics
- View logs: Click on service → Logs tab
- Monitor usage and performance

### Vercel:
- Dashboard shows deployment status
- Analytics available in project settings
- View build logs for debugging

### MongoDB Atlas:
- Monitor database performance
- View metrics in Atlas dashboard
- Set up alerts for high usage

## 🐛 Troubleshooting Production Issues

### Backend Issues:

**Service not starting:**
- Check logs in Render/Railway dashboard
- Verify all environment variables are set
- Ensure MongoDB URI is correct

**MongoDB connection timeout:**
- Verify MongoDB Atlas allows access from 0.0.0.0/0
- Check if database user credentials are correct
- Ensure database name is in the connection string

**API returning 500 errors:**
- Check backend logs
- Verify data validation rules
- Test API endpoints with curl/Postman

### Frontend Issues:

**Blank page or loading forever:**
- Check browser console for errors
- Verify VITE_API_URL points to correct backend
- Check if backend is accessible from browser

**CORS errors:**
- Update backend CORS configuration
- Ensure frontend domain is allowed
- Re-deploy backend after CORS changes

**Build fails:**
- Check build logs in Vercel/Netlify
- Verify all dependencies are in package.json
- Ensure environment variables are set

## 💡 Production Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use different MongoDB databases for dev/prod
   - Keep production credentials secure

2. **Monitoring**
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Monitor error rates
   - Check performance regularly

3. **Backups**
   - Enable MongoDB Atlas automated backups
   - Regular database exports
   - Keep code in version control

4. **Security**
   - Use HTTPS only (automatic with Vercel/Render)
   - Validate all inputs
   - Keep dependencies updated

5. **Performance**
   - Enable caching where possible
   - Optimize images
   - Use CDN for static assets (automatic with Vercel)

## 📝 Deployment Checklist

Backend (Render/Railway):
- [ ] Service created and deployed
- [ ] Environment variables configured
- [ ] MongoDB connection successful
- [ ] API endpoints accessible
- [ ] Logs show no errors

Frontend (Vercel/Netlify):
- [ ] Project imported and deployed
- [ ] VITE_API_URL points to backend
- [ ] Build successful
- [ ] Site loads without errors
- [ ] All features work

Final Steps:
- [ ] Test all CRUD operations
- [ ] Test search and filters
- [ ] Test CSV export
- [ ] Test on mobile devices
- [ ] Share URLs with stakeholders

## 🎉 You're Live!

Your Blog Management System is now deployed and accessible worldwide!

**Share these URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com/api`

## 📞 Support

If you encounter issues:
1. Check logs in respective dashboards
2. Review this guide's troubleshooting section
3. Verify all environment variables
4. Test locally first to isolate issues
