# ☁️ Cloudflare Pages Configuration

## Build Error Fix

The initial build failed because Cloudflare Pages was looking for `package.json` in the repo root, but it was in the `frontend/` subdirectory.

**Error:**
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

## ✅ Solution Applied

### 1. Added Root `package.json`
A coordination `package.json` was added to the repo root that:
- Calls `npm install` in the `frontend/` directory
- Triggers `npm run build` in the `frontend/` directory
- Outputs to `frontend/build/`

### 2. Update Cloudflare Pages Settings

Go to your Cloudflare Pages project and update:

#### Build Settings:
- **Build command:** `npm run build`
- **Build output directory:** `frontend/build`
- **Root directory:** `/` (stay at repo root)

## 🔄 Retry the Deploy

**Option 1: Manual Redeploy**
1. Go to your Cloudflare Pages project
2. Click "Redeploy" on the failed build
3. Wait ~2-3 minutes for it to complete

**Option 2: Git Push Trigger**
```powershell
cd C:\Users\carte\source\repos\AutoWasha
git add package.json wrangler.toml
git commit -m "Configure Cloudflare Pages build"
git push origin main
```

This will automatically trigger a new build with the updated configuration.

## ✅ Build Output Location

After a successful build, your React app will be live at:
```
https://eyewasha.com/
```

Files are deployed from:
```
frontend/build/
  ├── index.html
  ├── asset-manifest.json
  ├── favicon.ico
  └── static/
	  ├── js/
	  │   ├── main.[hash].js
	  │   └── main.[hash].js.map
	  └── css/
		  ├── main.[hash].css
		  └── main.[hash].css.map
```

## 📋 Deployment Readiness Checklist

- [x] Root `package.json` created
- [x] Build command updated in `wrangler.toml`
- [x] Output directory correct: `frontend/build`
- [x] All dependencies in `frontend/package.json` present
- [x] React build script working locally
- [ ] Cloudflare Pages settings updated
- [ ] Redeploy triggered
- [ ] Deploy completes successfully (~2-3 min)
- [ ] Test live URL: https://eyewasha.com/

## 🚀 Next Steps

1. **Update Cloudflare Pages UI Settings:**
   - Build command: `npm run build`
   - Build output: `frontend/build`

2. **Trigger Rebuild:**
   - Click "Redeploy" in Cloudflare Pages UI
   - OR push to GitHub: `git push origin main`

3. **Wait for Deployment:**
   - Check build logs in Cloudflare Pages
   - Should complete in 2-3 minutes
   - Look for "✓ Deployment complete"

4. **Test the Site:**
   - Open https://eyewasha.com/
   - Search for a player
   - View profiles
   - Test ?mode=overlay

## 📞 Troubleshooting

**Build still fails?**
- Check that `frontend/package.json` exists
- Check that `frontend/package-lock.json` exists
- Ensure Node 18.x is selected in Cloudflare Pages

**Deploy succeeds but site is blank?**
- Check browser console for errors
- Verify backend API is running (should be at https://api.eyewasha.com)
- Check that environment variables are correct in `frontend/.env.production`

**Search/Profile pages don't work?**
- Backend must be running on port 5000 (or https://api.eyewasha.com)
- API endpoints must exist: `/api/rpg/search`, `/api/rpg/player/:id/*`
- Check browser Network tab for API responses

## 🔗 Important URLs

- **Dashboard:** https://eyewasha.com/
- **Overlay Mode:** https://eyewasha.com/?mode=overlay
- **Backend API:** https://api.eyewasha.com/ (or localhost:5000 for local dev)
- **Cloudflare Dashboard:** https://dash.cloudflare.com/

## 💡 Local Testing Before Deploy

To test the build locally:

```powershell
cd C:\Users\carte\source\repos\AutoWasha\frontend
npm install
npm run build
npx -y serve build
```

Then open http://localhost:3000 (or the port shown) to test.

---

**Your deployment is now properly configured!** ☁️
