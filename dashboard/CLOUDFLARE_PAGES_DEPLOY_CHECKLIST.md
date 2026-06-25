# 🚀 Dashboard Deployment Checklist

Complete step-by-step checklist to deploy your dashboard to Cloudflare Pages.

---

## ✅ BEFORE YOU START

**Have these ready:**
- [ ] GitHub account (create at github.com if needed)
- [ ] Cloudflare account (you already have this ✅)
- [ ] Git installed on your computer
- [ ] Your backend is running and working
  - [ ] `https://api.eyewasha.com/api/health` returns JSON ✅

---

## 📋 STEP 1: Create GitHub Repository

- [ ] Go to: https://github.com/new
- [ ] **Repository name:** `autowasha-dashboard`
- [ ] **Description:** `AutoWasha RPG Dashboard`
- [ ] **Visibility:** Public
- [ ] ✅ Check: "Initialize with README"
- [ ] Click: **Create repository**
- [ ] Copy the HTTPS URL (you'll need it next)

**Your GitHub URL will be:** `https://github.com/YOUR-USERNAME/autowasha-dashboard`

---

## 🖥️ STEP 2: Set Up Git on Your Computer

Open PowerShell and run these commands:

```powershell
# Go to your repo folder
cd C:\Users\carte\source\repos\AutoWasha

# Configure git (do this once)
git config user.name "Your Name"
git config user.email "your-email@gmail.com"

# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/autowasha-dashboard.git

# Verify it worked
git remote -v
```

**Checklist:**
- [ ] Opened PowerShell in `C:\Users\carte\source\repos\AutoWasha`
- [ ] Ran `git config` commands
- [ ] Ran `git remote add origin` (replace YOUR-USERNAME)
- [ ] `git remote -v` shows your GitHub URL twice (fetch + push)

---

## 📤 STEP 3: Push Dashboard to GitHub

Run these commands in PowerShell:

```powershell
# Stage dashboard files
git add dashboard/

# Create commit
git commit -m "Initial dashboard commit"

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**First time pushing? You'll need a GitHub Personal Access Token:**

1. Go to: https://github.com/settings/tokens/new
2. Click: **Generate new token (classic)**
3. Name it: `AutoWasha Deploy`
4. Select scope: **repo** (full control of private repositories)
5. Scroll down and click: **Generate token**
6. **Copy the token** (you won't see it again!)
7. When PowerShell asks for password, paste the token (it won't show characters)

**Checklist:**
- [ ] Ran `git add dashboard/`
- [ ] Ran `git commit -m "Initial dashboard commit"`
- [ ] Ran `git branch -M main`
- [ ] Ran `git push -u origin main`
- [ ] No errors in PowerShell
- [ ] Can see your files on GitHub.com

---

## 🌐 STEP 4: Deploy to Cloudflare Pages

1. Go to: https://dash.cloudflare.com
2. Left sidebar → Click: **Pages**
3. Click: **Create a project**
4. Click: **Connect to Git**

**Connect GitHub:**
- [ ] Select: **GitHub**
- [ ] Authorize Cloudflare to access GitHub
- [ ] Search for: `autowasha-dashboard`
- [ ] Click your repository
- [ ] Click: **Begin setup**

**Configure Build:**
- [ ] **Project name:** `autowasha` (or `dashboard`)
- [ ] **Production branch:** `main`
- [ ] **Framework preset:** `None` (static site)
- [ ] **Build command:** *(leave empty)*
- [ ] **Build output directory:** `dashboard`

**Add Environment Variables:**

Click: **Add environment variable** and add these three:

| Variable Name | Value |
|---|---|
| `REACT_APP_API_URL` | `https://api.eyewasha.com` |
| `VITE_API_URL` | `https://api.eyewasha.com` |
| `VITE_BACKEND_URL` | `https://api.eyewasha.com` |

**Deploy:**
- [ ] All settings filled in correctly
- [ ] All environment variables added
- [ ] Click: **Save and Deploy**
- [ ] Wait for deployment to complete (2-5 minutes)

---

## 🎉 STEP 5: Get Your Temporary URL

After deployment completes:

1. On the Pages project page, look for your deployment
2. You should see a URL like: `https://autowasha.pages.dev`
3. **Test it:** Click the link and verify dashboard loads
4. Look for "🔧 SYSTEM STATUS" box
5. Backend status should show: **🟢 Online**

**Checklist:**
- [ ] Deployment shows "Success"
- [ ] Can access the `.pages.dev` URL
- [ ] Dashboard loads (you see the header and navigation)
- [ ] Backend shows as "Online" in status box
- [ ] Navigation links work (click between pages)

---

## 🔗 STEP 6: Add Custom Domain

**Option A: Use `eyewasha.com` (main domain)**

1. In Cloudflare Pages project, click: **Settings** → **Domains**
2. Click: **Add domain**
3. Enter: `eyewasha.com`
4. Cloudflare will verify DNS
5. Once verified, dashboard will be at: `https://eyewasha.com` ✅

**Option B: Use subdomain `dashboard.eyewasha.com`**

1. In Cloudflare Pages project, click: **Settings** → **Domains**
2. Click: **Add domain**
3. Enter: `dashboard.eyewasha.com`
4. Cloudflare will verify DNS
5. Dashboard will be at: `https://dashboard.eyewasha.com` ✅

**Checklist:**
- [ ] Chose domain or subdomain
- [ ] Added domain in Cloudflare Pages
- [ ] DNS verified (might take 5-10 minutes)
- [ ] Can access dashboard at your custom URL
- [ ] Backend connection status shows "Online"

---

## ✨ STEP 7: Verify Everything Works

### Test 1: Load Dashboard
- [ ] Go to: `https://eyewasha.com` (or your custom domain)
- [ ] See the dashboard homepage
- [ ] See header: "⚔️ AUTOWASHA RPG DASHBOARD"

### Test 2: Navigation Works
- [ ] Click: **📊 Dashboard** → Loads
- [ ] Click: **🏆 Leaderboard** → Loads
- [ ] Click: **🗺️ Zones** → Loads
- [ ] Click: **📚 Grimoire** → Loads
- [ ] Click: **⚙️ Admin** → Loads

### Test 3: Backend Connection
- [ ] Look for: "🔧 SYSTEM STATUS" box
- [ ] Backend status shows: 🟢 **Online** (green)
- [ ] Online Players count shows: 0 (or higher)

### Test 4: Open DevTools
- [ ] Press: **F12** (or right-click → Inspect)
- [ ] Go to: **Console** tab
- [ ] Look for: No red errors
- [ ] Look for: Connection messages

**If you see errors in Console:**
- Check browser console for CORS errors
- Verify `https://api.eyewasha.com/api/health` is responding
- Check that backend is running

---

## 🔄 STEP 8: Future Updates

Every time you update the dashboard code:

```powershell
cd C:\Users\carte\source\repos\AutoWasha

git add dashboard/
git commit -m "Update dashboard: [describe changes]"
git push
```

**Then:**
- [ ] Cloudflare automatically detects the push
- [ ] Automatically redeploys (2-5 minutes)
- [ ] Refresh: `https://eyewasha.com` to see updates

---

## 📊 Your Architecture Now

```
Users (Worldwide)
		↓
🌍 Cloudflare Pages → https://eyewasha.com
		↓
📊 Dashboard (HTML/CSS/JS)
		↓
🔗 API Calls
		↓
🌍 Cloudflare Tunnel → https://api.eyewasha.com
		↓
💻 Your Backend (on your computer)
		↓
🎮 Game Logic & Database
```

---

## ✅ Final Checklist

**Setup Complete:**
- [ ] Backend running at `https://api.eyewasha.com` ✅
- [ ] Dashboard deployed to Cloudflare Pages ✅
- [ ] Custom domain configured ✅
- [ ] Dashboard loads successfully ✅
- [ ] Backend connection status shows Online ✅
- [ ] All pages navigate correctly ✅

**Daily Operations:**
- [ ] Morning: Run `startup\STARTUP.bat`
- [ ] Dashboard already live (Cloudflare hosts it 24/7)
- [ ] Evening: Run `startup\SHUTDOWN.bat`
- [ ] Dashboard still works (doesn't depend on your computer)

---

## 🚀 You're Live!

Your AutoWasha RPG is now accessible at:

- **Dashboard:** https://eyewasha.com
- **API:** https://api.eyewasha.com
- **Status:** Live and globally accessible ✅

**Users can access your game from anywhere in the world!** 🎮🌍

---

## 🆘 Troubleshooting

### "Deployment failed"
1. Check Cloudflare Pages build logs
2. Verify "Build output directory" is set to `dashboard`
3. Make sure no build errors in the logs
4. Try redeploying

### "Cannot connect to backend"
1. Is your backend running? Check `STARTUP.bat`
2. Does `https://api.eyewasha.com/api/health` work?
3. Check browser console (F12) for errors
4. Verify environment variables are set correctly

### "Blank page / nothing loads"
1. Check browser console for JavaScript errors
2. Verify all CSS/JS files are loading (check Network tab)
3. Try hard refresh: **Ctrl+Shift+R**
4. Check that `dashboard` folder contains HTML files

### "DNS not working"
1. Sometimes takes 5-10 minutes for DNS to propagate
2. Try accessing the `.pages.dev` URL first
3. In Cloudflare, verify CNAME is pointing to Pages
4. Wait a bit and try again

---

## 📞 Still Need Help?

Check the full deployment guide: `dashboard/CLOUDFLARE_PAGES_DEPLOY.md`

