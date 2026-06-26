# ⚙️ CLOUDFLARE DASHBOARD CONFIGURATION CHECKLIST

## Access Your Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com/
2. Select Zone: `eyewasha.com`
3. You should see your AutoWasha project

---

## PART 1: Verify Pages Deployment

### Step 1.1: Check Build Status

1. In left sidebar: Find **Pages** section
   - Or: **Workers & Pages** → **Pages**
2. Click: **autowasha-dashboard** project
3. Look for the "Deployments" tab
4. Latest deployment should show:
   - ✅ Status: **Succeeded**
   - 📅 Date: Today (2026-06-26)
   - 🔄 Commit: "Fix Cloudflare Pages build" or later

**If status is "Building":**
- Wait 2-3 more minutes
- Then refresh and check again

**If status is "Failed":**
- Click on the build
- Check the logs for the error
- You may need to retry or check the code

### Step 1.2: Set Production Domain

1. From the Pages project page
2. Go to: **Settings** tab
3. Look for: **Domains & HTTPS**
4. Under "Production domain":
   - Check if `eyewasha.com` is listed
   - If NOT, click "Add domain"
   - Type: `eyewasha.com`
   - Confirm

**Expected result:** 
```
Production domain: eyewasha.com
Status: ✅ Active
SSL/TLS: ✅ Automatic
```

---

## PART 2: Configure API Tunnel

### Step 2.1: Access Tunnels

1. In left sidebar: Find **Tunnels** section
   - Or: **Workers & Pages** → **Tunnels**
2. You should see: **autowasha** tunnel
3. Tunnel ID should show: `c6cca2fa-ad06-47ae-8c8f-0e0b825489c9`
4. Status should show: 🟢 **Active** (4 connections)

### Step 2.2: Configure Public Hostname

1. From the tunnel page, go to: **Public Hostname** tab
2. Look for existing routes:
   - Should have something like `api.eyewasha.com` → `http://localhost:5000`
   - If NOT present, add it:
	 - Domain: `api.eyewasha.com`
	 - Type: `HTTP`
	 - URL: `http://localhost:5000`
	 - Click: **Save**

**Expected result:**
```
Hostname: api.eyewasha.com
Service: http://localhost:5000
Status: ✅ Active
```

---

## PART 3: Verify DNS Configuration

### Step 3.1: Check DNS Records

1. From zone dashboard
2. Go to: **DNS** section (left sidebar)
3. You should see DNS records for:
   - `eyewasha.com` (A record pointing to Cloudflare)
   - `api.eyewasha.com` (CNAME to tunnel)

Your records might look like:
```
Name                    Type    Content              TTL
eyewasha.com            A       104.21.x.x           Auto
www.eyewasha.com        CNAME   eyewasha.com         Auto
api.eyewasha.com        CNAME   c6cca2fa...tunnel... Auto
```

**Note:** The exact IPs may vary. The important thing is:
- `eyewasha.com` points to Cloudflare
- `api.eyewasha.com` points to the tunnel

---

## PART 4: Test Everything

### Test 1: API Endpoint
```
Open in browser:
https://api.eyewasha.com/api/rpg/health

Expected to see:
{"status":"ok","timestamp":"2026-06-26T11:20:52.000Z"}

If you see this: ✅ API is working
If you see error: ❌ Tunnel routing broken
```

### Test 2: Search Endpoint
```
Open in browser:
https://api.eyewasha.com/api/rpg/search?q=thunder

Expected to see:
[
  {"id": 1, "username": "thunder_phantom", "level": 50, ...},
  {"id": 2, "username": "frost_knight_1099", "level": 50, ...},
  ...
]

If you see results: ✅ API is working
If you see error: ❌ Check backend logs
```

### Test 3: Frontend Dashboard
```
Open in browser:
https://eyewasha.com/

Expected to see:
- Search bar with placeholder "Enter player name..."
- Loading spinner or search button
- Clean UI

If you see this: ✅ Pages deployment working
If you see Error 1033: ❌ Pages not properly configured
If you see blank: ❌ Check browser console (F12)
```

### Test 4: Full Search Flow
```
1. Go to: https://eyewasha.com/
2. Type: "thunder" in search box
3. Click or wait for results
4. Click on any player card
5. Profile page should load
6. Click tabs to see Activities, Quests, Duels

All working: ✅ System fully operational
Stuck at step X: ❌ Check error in browser console (F12)
```

---

## PART 5: Troubleshooting

### Problem: Error 1033 (Tunnel Error)

**Cause:** Domain is routed through tunnel instead of Pages

**Solution:**
1. Go to **DNS** settings
2. Verify `eyewasha.com` is NOT set to tunnel
3. Go to **Pages** settings
4. Verify production domain IS set to `eyewasha.com`
5. Wait 2-5 minutes for DNS propagation
6. Try again

### Problem: API Returns 502/503 Error

**Cause:** Tunnel is routing to unreachable address

**Solution:**
1. Verify backend is running: `netstat -ano | findstr 5000`
2. Go to **Tunnels** → **Public Hostname**
3. Verify route points to: `http://localhost:5000`
4. Check tunnel status shows: 🟢 Active
5. If tunnel is red (inactive), restart: `wrangler tunnel run`

### Problem: Blank Page or 404

**Cause:** Pages build failed or not deployed

**Solution:**
1. Go to **Pages** → **autowasha-dashboard**
2. Check latest build status
3. If failed, click to view logs
4. Look for error messages
5. Fix the issue in code and push again

### Problem: Search Returns No Results

**Cause:** Backend API is working but no data

**Solution:**
1. Verify database has data:
   ```
   SELECT COUNT(*) FROM players;
   ```
   Should return > 0

2. Check backend logs for database errors
3. Verify DATABASE_URL environment variable
4. Check PostgreSQL is running and accessible

---

## ✅ Final Checklist

Before declaring victory:

- [ ] Tunnel status shows 🟢 Active with 4+ connections
- [ ] Backend running on port 5000
- [ ] Pages build shows ✅ Succeeded
- [ ] Production domain set to `eyewasha.com`
- [ ] API route `api.eyewasha.com` → `http://localhost:5000` configured
- [ ] Can visit https://eyewasha.com/ without Error 1033
- [ ] Can search for players
- [ ] Can view player profiles
- [ ] Profile tabs load data
- [ ] No console errors in browser (F12)

---

## 🎯 Quick Links

| Component | URL | Check |
|-----------|-----|-------|
| Cloudflare Dashboard | https://dash.cloudflare.com/ | Main config |
| Pages Project | https://dash.cloudflare.com/ → Pages → autowasha-dashboard | Build status |
| Tunnels | https://dash.cloudflare.com/ → Tunnels | Tunnel status |
| API Test | https://api.eyewasha.com/api/rpg/health | Backend working |
| Dashboard | https://eyewasha.com/ | Frontend working |

---

## 📞 Next Steps

1. Open: https://dash.cloudflare.com/
2. Go through checklist above
3. Fix any issues found
4. Test all 4 components
5. When all working → You're done! 🎉

**Estimated Time:** 5-10 minutes
