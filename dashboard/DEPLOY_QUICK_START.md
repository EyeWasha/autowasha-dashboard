# 🚀 Deploy Dashboard - Quick Start

**TL;DR - Get your dashboard live in 10 minutes**

---

## ⚡ 3-Minute Overview

You have a dashboard that needs to be hosted on the internet. We're using **Cloudflare Pages** to do it automatically.

**Here's how it works:**
1. Push your code to GitHub
2. Cloudflare automatically deploys it
3. Your dashboard is live at `https://eyewasha.com`

**That's it!** No servers to manage, no deployments to run manually.

---

## 📋 Quick Steps

### Step 1: Create GitHub Repo (2 minutes)

Go to: https://github.com/new

Fill in:
```
Repository name:   autowasha-dashboard
Description:       AutoWasha RPG Dashboard
Visibility:        Public ✅ (required for free)
Initialize with:   README ✅
```

Click **Create repository**

Copy your HTTPS URL: `https://github.com/YOUR-USERNAME/autowasha-dashboard`

---

### Step 2: Push Dashboard (2 minutes)

Open PowerShell at: `C:\Users\carte\source\repos\AutoWasha`

Run:
```powershell
git remote add origin https://github.com/YOUR-USERNAME/autowasha-dashboard.git
git add dashboard/
git commit -m "Initial dashboard"
git branch -M main
git push -u origin main
```

When asked for password, paste a GitHub Personal Access Token from: https://github.com/settings/tokens/new (select `repo` scope)

---

### Step 3: Deploy (3 minutes)

Go to: https://dash.cloudflare.com

1. Left sidebar → **Pages**
2. Click: **Create a project** → **Connect to Git**
3. Select: **GitHub** and authorize
4. Choose: `autowasha-dashboard` repository
5. Click: **Begin setup**

**Configure:**
- Project name: `autowasha`
- Production branch: `main`
- Framework preset: `None`
- Build command: *(leave empty)*
- Build output directory: `dashboard`

**Add environment variables:**
```
REACT_APP_API_URL = https://api.eyewasha.com
VITE_API_URL = https://api.eyewasha.com
VITE_BACKEND_URL = https://api.eyewasha.com
```

Click: **Save and Deploy**

Wait 2-5 minutes...

---

### Step 4: Test (1 minute)

After deployment completes:

1. You get a URL like: `https://autowasha.pages.dev`
2. Click it and verify dashboard loads
3. Check "🔧 SYSTEM STATUS" - Backend should show 🟢 **Online**

---

### Step 5: Add Custom Domain (2 minutes)

In Cloudflare Pages project:

1. Click: **Settings** → **Domains**
2. Click: **Add domain**
3. Enter: `eyewasha.com` (or `dashboard.eyewasha.com`)
4. Cloudflare verifies DNS
5. Done!

Your dashboard is now live at: `https://eyewasha.com` ✅

---

## ✅ Verify It Works

```
✅ Go to:        https://eyewasha.com
✅ See:          Dashboard homepage loads
✅ Click:        Navigation (Dashboard, Leaderboard, etc.) works
✅ Check:        "Backend: 🟢 Online" in status box
✅ Open F12:     No red errors in console
```

---

## 🔄 Future Updates

Every time you change the dashboard:

```powershell
cd C:\Users\carte\source\repos\AutoWasha
git add dashboard/
git commit -m "Your changes"
git push
```

Cloudflare automatically redeploys in 2-5 minutes. Refresh and you see updates!

---

## 📊 Your Complete Setup

```
Backend API (you manage)
  └─ STARTUP.bat → localhost:5000 → Tunnel → https://api.eyewasha.com

Dashboard UI (Cloudflare manages)
  └─ GitHub push → Auto-deploy → Cloudflare Pages → https://eyewasha.com
```

**Result:** Game is live worldwide, auto-updating, 24/7 availability! 🎮🌍

---

## 🆘 Quick Troubleshoot

| Problem | Solution |
|---------|----------|
| **Deployment failed** | Check build logs in Cloudflare Pages → make sure `dashboard` is set as build output directory |
| **Cannot reach backend** | Is `STARTUP.bat` running? Does `https://api.eyewasha.com/api/health` respond? |
| **Blank page** | Press Ctrl+Shift+R to hard refresh → Check browser console (F12) for errors |
| **DNS not working** | Wait 5-10 minutes for DNS to propagate → Try the `.pages.dev` URL first |

---

**Ready?** Start with Step 1 above! 🚀

For detailed instructions: see `dashboard/CLOUDFLARE_PAGES_DEPLOY.md`

