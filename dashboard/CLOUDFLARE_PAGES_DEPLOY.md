# 🚀 Deploy Dashboard to Cloudflare Pages

Complete guide to deploy your AutoWasha RPG Dashboard to Cloudflare Pages (hosting your site at `https://eyewasha.com` or `https://dashboard.eyewasha.com`).

---

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ A Cloudflare account (you already have one)
- ✅ Your domain added to Cloudflare (`eyewasha.com`)
- ✅ A GitHub account (free)
- ✅ Git installed on your computer
- ✅ Backend running on `https://api.eyewasha.com` ✅

---

## 🎯 What We're Doing

```
Your Computer (Local)
	↓
	└─→ Push dashboard files to GitHub
			↓
			└─→ Cloudflare Pages auto-deploys
					↓
					└─→ Dashboard live at https://eyewasha.com
```

---

## ✅ Step 1: Create GitHub Repository

### 1.1 Create a new repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `autowasha-dashboard` (or anything you want)
   - **Description:** "AutoWasha RPG Dashboard"
   - **Visibility:** Public (required for free Pages)
   - ✅ **Initialize with README** (check this)
3. Click: **Create repository**

### 1.2 Copy your repository URL

On the repository page, click **Code** → **HTTPS** and copy the URL:

```
https://github.com/YOUR-USERNAME/autowasha-dashboard.git
```

You'll need this in the next step.

---

## 📁 Step 2: Set Up Git on Your Computer

### 2.1 Open PowerShell in your repo folder

```powershell
cd C:\Users\carte\source\repos\AutoWasha
```

### 2.2 Initialize git (if not already done)

```powershell
git init
git config user.name "Your Name"
git config user.email "your-email@gmail.com"
```

### 2.3 Add GitHub as remote

Replace `YOUR-USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/autowasha-dashboard.git
```

### 2.4 Verify it worked

```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR-USERNAME/autowasha-dashboard.git (fetch)
origin  https://github.com/YOUR-USERNAME/autowasha-dashboard.git (push)
```

---

## 📤 Step 3: Push Dashboard to GitHub

### 3.1 Stage your dashboard files

```powershell
git add dashboard/
```

### 3.2 Create initial commit

```powershell
git commit -m "Initial dashboard commit"
```

### 3.3 Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

When prompted, use your GitHub username and a **Personal Access Token** as password:
1. Go to: https://github.com/settings/tokens/new
2. Select: `repo` scope
3. Generate and copy the token
4. Paste it as your password in PowerShell

---

## 🌐 Step 4: Deploy to Cloudflare Pages

### 4.1 Log in to Cloudflare Dashboard

Go to: https://dash.cloudflare.com

### 4.2 Navigate to Pages

1. Left sidebar → **Pages**
2. Click: **Create a project**

### 4.3 Connect your GitHub repository

1. Click: **Connect to Git**
2. Select: **GitHub** (if not already selected)
3. Authorize Cloudflare to access GitHub
4. Search for your repository: `autowasha-dashboard`
5. Click: **Select**

### 4.4 Configure build settings

Fill in these fields:

| Field | Value |
|-------|-------|
| **Project name** | `autowasha` or `dashboard` |
| **Production branch** | `main` |
| **Framework preset** | `None` (static site) |
| **Build command** | *(leave empty)* |
| **Build output directory** | `dashboard` |
| **Environment variables** | *(see next section)* |

### 4.5 Add environment variables (Important!)

You need to tell your dashboard where the backend API is.

Click: **Add environment variable**

Add these:

```
Name:  VITE_API_URL
Value: https://api.eyewasha.com

Name:  VITE_BACKEND_URL
Value: https://api.eyewasha.com

Name:  REACT_APP_API_URL
Value: https://api.eyewasha.com
```

*(Add all three - the app will use whichever naming convention it uses)*

### 4.6 Deploy

Click: **Save and Deploy**

Cloudflare will automatically:
1. Clone your repository
2. Build the site
3. Deploy to their global network
4. Give you a URL like `https://autowasha.pages.dev`

---

## 🎉 Step 5: Set Custom Domain

### 5.1 After deployment completes

1. In Cloudflare Pages, click your project
2. Go to: **Settings** → **Domains**
3. Click: **Add domain**

### 5.2 Choose where to host it

**Option A: Main domain** (Recommended)
```
https://eyewasha.com
```

**Option B: Subdomain**
```
https://dashboard.eyewasha.com
```

### 5.3 Add custom domain

1. Enter your choice (e.g., `eyewasha.com`)
2. Cloudflare will verify ownership
3. Click: **Activate domain**

Your dashboard is now live! 🎉

---

## 🔗 Step 6: Update Dashboard API URLs

Your dashboard needs to know where the backend is. Check the API configuration file:

### 6.1 Open the API config

```
dashboard\js\api.js
```

### 6.2 Make sure it has the correct backend URL

It should say:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.eyewasha.com';
```

Or check `dashboard\js\utils.js` for similar configuration.

### 6.3 If it's hardcoded to localhost, fix it

Find lines that say:
```javascript
http://localhost:5000
http://127.0.0.1:5000
```

And replace with:
```javascript
https://api.eyewasha.com
```

### 6.4 Commit and push the change

```powershell
git add dashboard/
git commit -m "Update API URL to production backend"
git push
```

Cloudflare Pages will automatically redeploy! ✅

---

## ✅ Verify Everything Works

### Test 1: Can you reach your dashboard?

1. Go to: `https://eyewasha.com` (or your custom domain)
2. You should see the dashboard homepage
3. Navigation should work (Dashboard, Leaderboard, etc.)

### Test 2: Is the backend connected?

1. On the dashboard, look for "🔧 SYSTEM STATUS"
2. It should say: "Backend: 🟢 Online"
3. If it says "🔴 Offline", the API URL is wrong

### Test 3: Socket.IO connection

1. Open browser DevTools (F12)
2. Go to: Console
3. You should see: "Connected to backend" (or similar)
4. If you see CORS errors, the API URL is wrong

---

## 🔄 Automatic Redeployment

Every time you:

```powershell
git push
```

Cloudflare Pages **automatically**:
1. ✅ Detects the push
2. ✅ Pulls your latest code
3. ✅ Rebuilds the site
4. ✅ Deploys to global CDN

Takes ~2-5 minutes. Your site updates automatically!

---

## 🚀 Daily Workflow Now

### Morning

```powershell
# Start backend and tunnel (as before)
C:\Users\carte\source\repos\AutoWasha\startup\STARTUP.bat
```

### Then

Your dashboard is already running on the internet at:
```
https://eyewasha.com
```

**No additional steps needed!** Cloudflare Pages hosts it 24/7.

### If you change dashboard code

```powershell
cd C:\Users\carte\source\repos\AutoWasha

git add dashboard/
git commit -m "Update dashboard feature"
git push

# Wait 2-5 minutes for Cloudflare to redeploy
# Then refresh: https://eyewasha.com
```

### Evening

```powershell
# Stop backend and tunnel (as before)
C:\Users\carte\source\repos\AutoWasha\startup\SHUTDOWN.bat
```

Dashboard stays online! (It's just static HTML on Cloudflare's servers)

---

## 📊 Your Complete Architecture Now

```
						Worldwide Users
							  ↓
					🌍 CLOUDFLARE PAGES
						 (Global CDN)
							  ↓
		┌─────────────────────┼─────────────────────┐
		↓                     ↓                     ↓
   Dashboard UI         LeaderBoard UI       Other Pages
   (HTML/CSS/JS)       (HTML/CSS/JS)         (HTML/CSS/JS)
   at eyewasha.com
		↓
		└──────────────→ API Calls
							 ↓
					🟢 YOUR BACKEND API
					(Cloudflare Tunnel)
				   https://api.eyewasha.com
							 ↓
					(On your computer)
				   localhost:5000
							 ↓
					Database / Game Logic
```

---

## 🔧 Troubleshooting

### Problem: "Cannot connect to backend"
- ✅ Is your backend running? (Check `STARTUP.bat` is active)
- ✅ Is the API URL correct in dashboard code?
- ✅ Check browser console (F12) for errors

### Problem: "Site not found"
- ✅ Did you set the custom domain correctly?
- ✅ DNS changes can take 5-10 minutes
- ✅ Try accessing the temporary `.pages.dev` URL first

### Problem: "Build failed"
- ✅ Check Cloudflare Pages build logs
- ✅ Make sure you have `build output directory: dashboard`
- ✅ Verify no build scripts are required

### Problem: "Blank page / nothing loads"
- ✅ Check browser console (F12) for JavaScript errors
- ✅ Verify all CSS and JS files are loading
- ✅ Check network tab to see if files downloaded

### Problem: "Socket.IO won't connect"
- ✅ Is the backend running?
- ✅ Is the tunnel active?
- ✅ Check browser console for connection errors
- ✅ CORS might need adjustment in backend

---

## ✨ Success!

You now have:

✅ **Backend API** at `https://api.eyewasha.com` (Cloudflare Tunnel)
✅ **Dashboard UI** at `https://eyewasha.com` (Cloudflare Pages)
✅ **Both running 24/7** (or whenever you want)
✅ **Automatic updates** when you push to GitHub
✅ **Global CDN** for fast worldwide access

Your RPG is now live! 🎮🚀

---

## 📝 Quick Reference

```
GitHub Repo:        https://github.com/YOUR-USERNAME/autowasha-dashboard
Cloudflare Pages:   https://dash.cloudflare.com → Pages
Dashboard URL:      https://eyewasha.com
Backend API:        https://api.eyewasha.com
Local Backend:      http://localhost:5000
Startup Script:     C:\Users\carte\source\repos\AutoWasha\startup\STARTUP.bat
Shutdown Script:    C:\Users\carte\source\repos\AutoWasha\startup\SHUTDOWN.bat
```

---

**Ready to deploy? Start with Step 1 above!** 🚀

