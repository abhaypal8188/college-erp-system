# SmartCampus ERP - Vercel Deployment Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Prerequisites
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ MongoDB Atlas account (free tier available)

### Step 2: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your user password)

### Step 3: Deploy to Vercel

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/smartcampus-erp)

#### Option B: Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

### Step 4: Configure Environment Variables
In your Vercel dashboard, go to Project Settings > Environment Variables and add:

**For the API (Backend):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcampus-erp
CLIENT_URL=https://your-app-name.vercel.app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**For the Client (Frontend):**
```
REACT_APP_API_URL=https://your-app-name.vercel.app/api
```

### Step 5: Update Client Configuration
After deployment, update the client `.env` file with your production API URL:

```env
REACT_APP_API_URL=https://your-app-name.vercel.app/api
```

### Step 5: Access Your App
- Frontend: `https://your-project-name.vercel.app`
- API: `https://your-project-name.vercel.app/api/`

### Step 6: Test the Application
1. Visit your deployed URL
2. Try registering a new admin account
3. Login and explore the dashboard

## 🔧 Project Structure for Vercel

```
├── api/                    # Serverless API functions
│   ├── index.js           # Main API handler
│   ├── auth.js           # Authentication routes
│   ├── students.js       # Student management
│   └── ...               # Other route files
├── client/                # React frontend
│   ├── build/            # Production build (auto-generated)
│   └── src/              # Source code
├── vercel.json           # Vercel configuration
└── README.md
```

## 🛠 Troubleshooting

### Build Fails
- Check that all dependencies are listed in `api/package.json`
- Ensure environment variables are set correctly
- Check Vercel build logs for specific errors

### API Not Working
- Verify MongoDB connection string
- Check JWT secret is set
- Ensure API routes are properly exported

### Frontend Issues
- Clear browser cache
- Check that API base URL is correct in frontend code

### 404 NOT_FOUND on API Endpoints
- Verify that `vercel.json` is in the project root
- Ensure `zeroConfig: false` is set in build configs to disable auto-detection
- Check that `api/index.js` is properly exporting the Express app
- Ensure API environment variables (MONGODB_URI, JWT_SECRET, etc.) are set in Vercel Dashboard
- Redeploy after updating `vercel.json`:
  ```bash
  git add vercel.json
  git commit -m "Fix Vercel API routes"
  git push origin main
  ```
  Then trigger a redeploy from Vercel Dashboard

## ✅ Deployment Verification

Test the following URLs after deployment:

```bash
# Health check
https://your-project-name.vercel.app/api/health

# Expected response:
{"status":"OK","message":"SmartCampus ERP Server is running"}

# Frontend
https://your-project-name.vercel.app
```

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first with `npm run dev` in api/ and client/ directories

## 🎯 What's Included

- ✅ Full MERN stack setup
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Responsive UI with Tailwind CSS
- ✅ MongoDB integration
- ✅ Vercel-optimized configuration
- ✅ Production-ready build

Happy deploying! 🚀