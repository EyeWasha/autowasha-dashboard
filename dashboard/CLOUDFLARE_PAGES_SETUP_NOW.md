# 🚀 Deploy Dashboard to Cloudflare Pages - NOW

Your dashboard files are already on GitHub! Now we just need to connect Cloudflare Pages.

---

## 🎯 Quick Setup (5 minutes)

### Step 1: Go to Cloudflare Dashboard

1. Open: https://dash.cloudflare.com
2. Log in with your Cloudflare account
3. Left sidebar → Click: **Pages**

### Step 2: Create New Project

1. Click: **Create a project**
2. Click: **Connect to Git**
3. Select: **GitHub**
4. Click: **Authorize Cloudflare** (if prompted)

### Step 3: Select Your Repository

1. Search for: `autowasha-dashboard`
2. Click on the repository to select it
3. Click: **Begin setup**

### Step 4: Configure Build Settings

Fill in these fields:

```
Project name:              autowasha
Production branch:         main
Framework preset:          None
Build command:             (leave empty)
Build output directory:    dashboard
```

**Important:** Make sure "Build output directory" is set to `dashboard`

### Step 5: Add Environment Variables

Click: **Add environment variable** (do this 3 times)

Add these three variables:

| Variable Name | Value |
|---|---|
| `REACT_APP_API_URL` | `https://api.eyewasha.com` |
| `VITE_API_URL` | `https://api.eyewasha.com` |
| `VITE_BACKEND_URL` | `https://api.eyewasha.com` |

### Step 6: Deploy!

1. Click: **Save and Deploy**
2. Wait 2-5 minutes for build to complete
3. You'll see a success message

### Step 7: Test the Deployment

After deployment completes:

1. You get a URL like: `https://autowasha.pages.dev`
2. Click it and verify dashboard loads
3. Check "🔧 SYSTEM STATUS" - Backend should show: 🟢 **Online**

---

## 🔗 Step 8: Add Custom Domain

### Option A: Use Main Domain (eyewasha.com)

1. In Cloudflare Pages project, click: **Settings** → **Domains**
2. Click: **Add domain**
3. Enter: `eyewasha.com`
4. Cloudflare verifies DNS (should be automatic)
5. Dashboard is now at: `https://eyewasha.com` ✅

### Option B: Use Subdomain (dashboard.eyewasha.com)

1. In Cloudflare Pages project, click: **Settings** → **Domains**
2. Click: **Add domain**
3. Enter: `dashboard.eyewasha.com`
4. Cloudflare verifies DNS (should be automatic)
5. Dashboard is now at: `https://dashboard.eyewasha.com` ✅

---

## ✅ Verify Everything Works

### Test 1: Dashboard Loads
- [ ] Go to: `https://eyewasha.com`
- [ ] See the dashboard homepage
- [ ] Navigation works (click different pages)

### Test 2: Backend Connected
- [ ] Look for: "🔧 SYSTEM STATUS" box
- [ ] Backend status shows: 🟢 **Online**
- [ ] If red: Make sure `STARTUP.bat` is running

### Test 3: No Errors
- [ ] Press **F12** to open DevTools
- [ ] Go to **Console** tab
- [ ] No red errors

---

## 🎉 Success!

You now have:

✅ **Backend API** at `https://api.eyewasha.com` (Running on your computer via tunnel)
✅ **Dashboard UI** at `https://eyewasha.com` (Hosted on Cloudflare Pages - always online)
✅ **Both working together** (API calls flow from dashboard to backend)

---

## 🔄 Future Updates

Every time you update the dashboard:

```powershell
cd C:\Users\carte\source\repos\AutoWasha

git add dashboard/
git commit -m "Updated dashboard"
git push
```

Cloudflare automatically redeploys in 2-5 minutes! ✅

---

## 📊 Your Complete Setup

```
Users (Worldwide)
	↓
🌍 Cloudflare Pages → https://eyewasha.com
	↓
📊 Dashboard (Always Online)
	↓
API Calls
	↓
🌍 Cloudflare Tunnel → https://api.eyewasha.com
	↓
💻 Your Backend (localhost:5000)
```

---

## ⏰ Daily Workflow

**Morning:**
```powershell
double-click: startup\STARTUP.bat
```

**Dashboard is already live** (runs on Cloudflare, not your computer)

**Evening:**
```powershell
double-click: startup\SHUTDOWN.bat
```

**Dashboard stays online** (backend goes offline, but UI is still accessible)

---

## 🚀 Ready?

**Go to:** https://dash.cloudflare.com

**Then:** Follow Steps 1-8 above

**Your game will be live in 10 minutes!** 🎮

