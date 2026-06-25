# 🎮 AutoWasha RPG - Complete Deployment Guide

**Your game is ready to go live!** Here's everything you need to deploy both your backend and dashboard.

---

## 📊 What You Have

### ✅ Backend (Already Running!)
- **Status:** Live and responding ✅
- **URL:** `https://api.eyewasha.com/api/health`
- **Response:** `{ status: "ok", timestamp: "..." }`
- **Daily Operation:** `startup\STARTUP.bat` → `startup\SHUTDOWN.bat`

### 📊 Dashboard (Ready to Deploy)
- **Status:** Ready to upload to Cloudflare Pages
- **Files:** All HTML, CSS, JavaScript in `dashboard/` folder
- **Configuration:** Already updated to use production API
- **Next Step:** Push to GitHub + Cloudflare Pages

---

## 🚀 3-Step Deployment Process

```
┌─────────────────────────────────────────┐
│  Step 1: Create GitHub Repository       │
│  (5 minutes)                            │
└──────────────────┬──────────────────────┘
				   ↓
┌─────────────────────────────────────────┐
│  Step 2: Push Dashboard to GitHub       │
│  (5 minutes)                            │
└──────────────────┬──────────────────────┘
				   ↓
┌─────────────────────────────────────────┐
│  Step 3: Deploy with Cloudflare Pages   │
│  (5 minutes + 2-5 minute build)         │
└──────────────────┬──────────────────────┘
				   ↓
			  ✅ LIVE!
		Dashboard at: https://eyewasha.com
```

---

## 📋 Before You Start

**You need:**
- [ ] GitHub account (free, create at github.com)
- [ ] Git installed on your computer
- [ ] Your backend running and responding
  - [ ] Test: `https://api.eyewasha.com/api/health`

**Already have:**
- [ ] Cloudflare account ✅
- [ ] Domain `eyewasha.com` added to Cloudflare ✅
- [ ] Backend running on tunnel ✅
- [ ] Dashboard files in `dashboard/` folder ✅

---

## 🎯 Choose Your Path

### 🏃 **Quick Path (10 minutes)**

Start with: `dashboard/DEPLOY_QUICK_START.md`

Follow the 3-minute overview + quick steps.

### 📚 **Detailed Path (20 minutes)**

Start with: `dashboard/CLOUDFLARE_PAGES_DEPLOY_CHECKLIST.md`

Complete step-by-step checklist with verification.

### 🔍 **Complete Reference (30 minutes)**

Start with: `dashboard/CLOUDFLARE_PAGES_DEPLOY.md`

Full detailed guide with troubleshooting and architecture.

---

## ⚡ TL;DR - Just the Commands

If you know what you're doing:

```powershell
# 1. Create GitHub repo at https://github.com/new
#    Name: autowasha-dashboard
#    Visibility: Public

# 2. Push to GitHub
cd C:\Users\carte\source\repos\AutoWasha
git remote add origin https://github.com/YOUR-USERNAME/autowasha-dashboard.git
git add dashboard/
git commit -m "Initial dashboard"
git branch -M main
git push -u origin main

# 3. In Cloudflare Pages:
#    - Connect GitHub repo
#    - Build output directory: dashboard
#    - Add env vars:
#      REACT_APP_API_URL=https://api.eyewasha.com
#      VITE_API_URL=https://api.eyewasha.com
#      VITE_BACKEND_URL=https://api.eyewasha.com
#    - Deploy
#    - Add custom domain: eyewasha.com

# Done! Dashboard is live at https://eyewasha.com
```

---

## 📁 Files Updated for Production

These dashboard files now use production API URL:

- ✅ `dashboard/js/api.js` - Uses `https://api.eyewasha.com`
- ✅ `dashboard/js/socket.js` - Connects to `https://api.eyewasha.com`

**These will auto-detect the correct URL:**
1. First: Check environment variable `REACT_APP_API_URL`
2. If not set: Use `https://api.eyewasha.com`
3. Fallback (dev): `http://localhost:5000`

---

## 🏗️ Your Architecture After Deployment

```
					🌍 WORLDWIDE USERS 🌍
							  │
		 ┌────────────────────┼────────────────────┐
		 ↓                    ↓                    ↓
	Browsers          Mobile Apps          Twitch Overlay
		 │                    │                    │
		 └────────────────────┼────────────────────┘
							  ↓
					🟢 CLOUDFLARE PAGES
				   (Global CDN - always on)
							  ↓
		 https://eyewasha.com (Dashboard UI)
		 - HTML, CSS, JavaScript
		 - Hosted worldwide
		 - Auto-updates from GitHub
							  ↓
						  API Calls
							  ↓
					🟢 CLOUDFLARE TUNNEL
				   (Route to your computer)
							  ↓
		 https://api.eyewasha.com (Backend API)
		 - Node.js Express server
		 - Socket.IO real-time updates
		 - Database & game logic
							  ↓
					  💻 YOUR COMPUTER
					(Only needs internet!)
				   Port 5000 (localhost)
					- Game engine
					- Player database
					- Combat system
```

---

## ⏰ Your Daily Workflow

### Morning
```powershell
# Start backend and tunnel
double-click: startup\STARTUP.bat

# Both services start automatically
```

### During the Day
```
✅ Backend running at: https://api.eyewasha.com
✅ Dashboard running at: https://eyewasha.com
✅ Users can access from anywhere
✅ Real-time updates via Socket.IO
```

### Evening
```powershell
# Stop backend and tunnel
double-click: startup\SHUTDOWN.bat

# Dashboard stays live (Cloudflare Pages)
# But API is offline (your computer is off)
```

---

## 🔄 Making Changes

**If you update the dashboard code:**

```powershell
cd C:\Users\carte\source\repos\AutoWasha
git add dashboard/
git commit -m "Updated: [what changed]"
git push
```

**Then:**
- Cloudflare automatically detects the push
- Automatically rebuilds and deploys
- Takes 2-5 minutes
- Refresh `https://eyewasha.com` to see changes

---

## ✅ Verification Checklist

After deployment, verify everything works:

### Backend
- [ ] Test `https://api.eyewasha.com/api/health`
- [ ] Returns JSON with `status: "ok"`
- [ ] Status shown as 🟢 **Online**

### Dashboard
- [ ] Can access `https://eyewasha.com`
- [ ] Page loads without errors
- [ ] See dashboard header and navigation
- [ ] All pages load (Dashboard, Leaderboard, etc.)
- [ ] Backend status shows as "Online"

### Real-time
- [ ] Open browser console (F12)
- [ ] Look for Socket.IO connection message
- [ ] No red errors in console

---

## 📞 Need Help?

Each deployment file has different levels of detail:

| File | Best For | Read Time |
|------|----------|-----------|
| `DEPLOY_QUICK_START.md` | Fast deployment | 5 min |
| `CLOUDFLARE_PAGES_DEPLOY_CHECKLIST.md` | Step-by-step verification | 10 min |
| `CLOUDFLARE_PAGES_DEPLOY.md` | Complete reference + troubleshooting | 20 min |

---

## 🎉 Success Looks Like

After everything is deployed:

```
Browser: https://eyewasha.com
├─ Dashboard loads instantly
├─ Navigation works
├─ Real-time updates flow in
└─ Shows "Backend: 🟢 Online"

Backend: https://api.eyewasha.com
├─ Responds to requests
├─ Processes game actions
├─ Broadcasts to overlay
└─ Updates database

Result: Game is LIVE! 🎮🌍
```

---

## 🚀 Next Steps

1. **Choose your path above** (Quick, Detailed, or Complete)
2. **Follow the guide for your path**
3. **Deploy dashboard to Cloudflare Pages**
4. **Test everything works**
5. **Celebrate** - Your RPG is live! 🎉

---

## 📚 Quick Reference

| What | Where | Status |
|-----|-------|--------|
| Backend API | `https://api.eyewasha.com` | ✅ Running |
| Dashboard | `https://eyewasha.com` | 📋 Ready to deploy |
| Startup | `startup/STARTUP.bat` | ✅ Ready |
| Shutdown | `startup/SHUTDOWN.bat` | ✅ Ready |
| Backend code | `backend/src/server.js` | ✅ Running |
| Dashboard code | `dashboard/` | ✅ Updated for production |
| Deployment docs | This folder | ✅ Complete |

---

## ⚡ Let's Go!

**Pick one:**

- 🏃 **I'm in a hurry:** `DEPLOY_QUICK_START.md`
- 📋 **I want a checklist:** `CLOUDFLARE_PAGES_DEPLOY_CHECKLIST.md`
- 📚 **I want details:** `CLOUDFLARE_PAGES_DEPLOY.md`

**Your game is ready. Time to launch!** 🚀

