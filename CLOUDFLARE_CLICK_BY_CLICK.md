# 🖱️ STEP-BY-STEP CLOUDFLARE CONFIGURATION (With Screenshots Description)

## STEP 1: Open Cloudflare Dashboard

```
1. Go to: https://dash.cloudflare.com/
2. You should see a list of your domains
3. Click on: eyewasha.com
```

Expected screen:
```
┌─────────────────────────────────────────────┐
│ Cloudflare Dashboard                        │
├─────────────────────────────────────────────┤
│ Your domains:                               │
│                                             │
│ □ example.com                               │
│ ✓ eyewasha.com  (selected)                 │
│ □ another-domain.com                        │
└─────────────────────────────────────────────┘
```

---

## STEP 2: Navigate to Pages Settings

### Option A: Direct Path (Recommended)

```
In Cloudflare Dashboard for eyewasha.com:

1. Look at left sidebar
2. Scroll to: WORKERS & PAGES
   (might just say "Pages" in new version)

3. Click: Pages

Expected:
┌──────────────────────────────────────────┐
│ Pages Projects                           │
├──────────────────────────────────────────┤
│                                          │
│ ✓ autowasha-dashboard                   │
│   URL: https://autowasha-dashbo...      │
│   Last deployment: 26 Jun 2026           │
│   Status: ✅ Deployed                   │
│                                          │
└──────────────────────────────────────────┘
```

---

## STEP 3: Click on Your Project

```
Click: autowasha-dashboard project

Expected: Project details page
┌──────────────────────────────────────────────────┐
│ autowasha-dashboard                              │
├──────────────────────────────────────────────────┤
│ Deployments | Settings | Analytics | Logs       │
│ ────────────────────────────────────────────────  │
│ Latest Deployment: Success (26 Jun 11:33 UTC)  │
│ Build command: npm run build                     │
│ Deployment branch: main                          │
└──────────────────────────────────────────────────┘
```

---

## STEP 4: Go to Settings Tab

```
At the top of the project page:
Click: Settings

Expected:
┌────────────────────────────────────────────────────┐
│ Project Settings                                   │
├────────────────────────────────────────────────────┤
│                                                    │
│ General Settings                                  │
│                                                    │
│ Production domain                                 │
│ ┌─────────────────────────────────────────────┐  │
│ │ CUSTOM DOMAINS                              │  │
│ ├─────────────────────────────────────────────┤  │
│ │ • none currently set                        │  │
│ │ [+ Add domain]                              │  │
│ └─────────────────────────────────────────────┘  │
│                                                    │
│ [Other settings below...]                         │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## STEP 5: Add Custom Domain

### If domain is already there:
```
Skip to STEP 6
```

### If domain is NOT there:

```
1. Click: [+ Add domain]

Expected dialog:
┌─────────────────────────────────────────┐
│ Add a custom domain                      │
├─────────────────────────────────────────┤
│                                         │
│ Domain                                  │
│ ┌─────────────────────────────────────┐ │
│ │ [enter domain...]                   │ │ 
│ └─────────────────────────────────────┘ │
│                                         │
│         [Cancel]  [Add domain]         │
│                                         │
└─────────────────────────────────────────┘

2. Type: eyewasha.com
3. Click: [Add domain]
```

---

## STEP 6: Verify Configuration

After adding/verifying the domain:

```
Expected to see:
┌─────────────────────────────────────────────────┐
│ Production Domain Settings                      │
├─────────────────────────────────────────────────┤
│                                                 │
│ Production domain                               │
│ eyewasha.com                                    │
│ Status: ✅ Active / ✅ Verified                │
│                                                 │
│ SSL/TLS Status: ✅ Automatic                   │
│                                                 │
│ [Save]  [Delete]                              │
│                                                 │
└─────────────────────────────────────────────────┘
```

If you see this: **YOU'RE DONE WITH CLOUDFLARE!** ✅

---

## STEP 7: Test (Back at Your Computer)

```
Wait: 2 minutes for DNS to propagate

Then test:

1. Open browser
2. Go to: https://eyewasha.com/
3. You should see:

┌──────────────────────────────────────────────┐
│ AUTOWASHA RPG DASHBOARD                      │
├──────────────────────────────────────────────┤
│                                              │
│  🔍 Find a Player                            │
│                                              │
│  ┌─────────────────────────────────────────┐│
│  │ Enter player name...        [Search]   ││
│  └─────────────────────────────────────────┘│
│                                              │
└──────────────────────────────────────────────┘

✅ SUCCESS! Dashboard is live!
```

---

## Alternative Route in Newer Cloudflare UI

If you can't find Pages in the sidebar:

```
1. Top menu: Workers & Pages
2. Left sidebar: Pages
3. Find: autowasha-dashboard
4. Right side: Click ⚙️ Settings
5. Scroll to: Domains
6. Configure production domain
```

---

## Troubleshooting: Domain Shows Red X

If you see an error like:
```
❌ Domain verification failed
```

This means DNS isn't properly configured. 

**Solution:**
1. Go to: DNS settings (not Pages)
2. Verify: eyewasha.com has proper A record
3. Wait 5-10 minutes
4. Try again

---

## If Still Stuck

1. Go to: `DNS` section in Cloudflare
2. Look for: eyewasha.com record
3. It should point to: Cloudflare (orange cloud icon)
4. If not, update it
5. Wait for DNS propagation
6. Then try adding domain to Pages again

---

## Minimal Verification Checklist

After domain is set:

```
□ Go to https://eyewasha.com/
□ No error message
□ Search box visible
□ Can type player name
□ Click Search
□ See results with player cards

All checked? → 🎉 YOU'RE DONE! 🎉
```

---

## Expected Screen After Fix

```
https://eyewasha.com/

┌──────────────────────────────────────────────────┐
│ 🎮 AUTOWASHA RPG DASHBOARD                      │
├──────────────────────────────────────────────────┤
│                                                  │
│  🔍 Find a Player                               │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ Enter player name...                      │   │
│  │ [Type here]                [🔍 Search]   │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  [After searching:]                             │
│  ┌──────────────────────────────────────────┐   │
│  │ ⚡ THUNDER_PHANTOM              [L 50]  │   │
│  │ Fire | Clover Kingdom | 🔥               │   │
│  │ ──────────────────────────────────────── │   │
│  │ 💰 10,000 Washed Coins                   │   │
│  │ [Tap to view profile] →                  │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ 💧 FROST_KNIGHT_1099            [L 50]  │   │
│  │ Water | Heart Kingdom | 💧               │   │
│  │ ──────────────────────────────────────── │   │
│  │ 💰 9,500 Washed Coins                    │   │
│  │ [Tap to view profile] →                  │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ ⚪ MYSTIC_ROGUE_9940             [L 49]  │   │
│  │ Light | Golden Dawn | ⚪                  │   │
│  │ ──────────────────────────────────────── │   │
│  │ 💰 8,250 Washed Coins                    │   │
│  │ [Tap to view profile] →                  │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🎉 Once You See This

Your AutoWasha dashboard is **LIVE** with:

- ✅ Player search function
- ✅ 250+ mock players to search
- ✅ Click any player to see profile
- ✅ View activity, quest, duel history
- ✅ Mobile responsive design
- ✅ Real-time game overlay support

**YOU'RE DONE!** 🎉🎮🎉
