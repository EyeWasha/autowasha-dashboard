# 🚀 Dashboard Deployment Guide - Cloudflare

Complete guide for deploying the AutoWasha RPG Dashboard to Cloudflare Pages.

## Prerequisites

- Cloudflare account with a domain
- Wrangler CLI installed (`npm install -g wrangler`)
- Dashboard folder in your project
- Backend API accessible from your domain

## Quick Start (5 minutes)

### Step 1: Login to Cloudflare

```bash
wrangler login
```

This opens your browser to authorize Wrangler with your Cloudflare account.

### Step 2: Deploy Dashboard

```bash
# Navigate to project root
cd C:\Users\carte\source\repos\AutoWasha

# Deploy dashboard folder
wrangler pages publish dashboard/
```

Cloudflare will:
1. Upload files
2. Assign a temporary URL (e.g., `https://abc123.pages.dev`)
3. Deploy to Cloudflare Pages

### Step 3: Link to Your Domain

1. Log in to Cloudflare Dashboard
2. Go to **Pages** > **Your Project**
3. Click **Custom Domain**
4. Enter your domain (e.g., `dashboard.yourdomain.com`)
5. Complete DNS verification

### Step 4: Update API URL

Edit `dashboard/index.html` and other pages:

```javascript
<script>
  window.API_BASE_URL = 'https://api.yourdomain.com';
</script>
```

Then redeploy:

```bash
wrangler pages publish dashboard/
```

## Production Configuration

### Option 1: Simple Static Hosting (Recommended)

Best for read-only dashboards.

**File: `dashboard/wrangler.toml`** (optional):

```toml
name = "autowasha-dashboard"
type = "javascript"

[env.production]
# Cloudflare automatically sets this up
```

**Deploy Command**:

```bash
wrangler pages publish dashboard/
```

### Option 2: With API Proxy (Advanced)

Route API calls through Cloudflare Workers for better security.

**File: `functions/_middleware.ts`**:

```typescript
import type { Context } from 'hono';

export async function onRequest(context: Context) {
  const { request } = context;

  // Proxy API requests
  if (request.url.includes('/api/')) {
	const apiUrl = new URL(request.url);
	apiUrl.hostname = 'api.yourdomain.com'; // Change to your backend

	return fetch(apiUrl, request);
  }

  return context.next();
}
```

### Option 3: Multiple Environments

Create separate deployments for dev/staging/production.

**File: `wrangler.toml`**:

```toml
name = "autowasha-dashboard"
type = "javascript"

[env.development]
name = "autowasha-dashboard-dev"

[env.staging]
name = "autowasha-dashboard-staging"

[env.production]
name = "autowasha-dashboard-prod"
```

**Deploy to staging**:

```bash
wrangler pages publish dashboard/ --env staging
```

## Environment Configuration

### Set Different API URLs per Environment

**File: `dashboard/index.html`**:

```html
<script>
  const hostname = window.location.hostname;

  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
	window.API_BASE_URL = 'http://localhost:5000';
  }
  // Staging
  else if (hostname.includes('staging')) {
	window.API_BASE_URL = 'https://api-staging.yourdomain.com';
  }
  // Production
  else {
	window.API_BASE_URL = 'https://api.yourdomain.com';
  }
</script>
```

### Add to All HTML Files

Create a shared config file: `dashboard/config.js`

```javascript
// dashboard/config.js
function getApiBaseUrl() {
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
	return 'http://localhost:5000';
  } else if (hostname.includes('staging')) {
	return 'https://api-staging.yourdomain.com';
  } else {
	return 'https://api.yourdomain.com';
  }
}

window.API_BASE_URL = getApiBaseUrl();
```

Then include in each HTML file before other scripts:

```html
<script src="config.js"></script>
<script src="js/api.js"></script>
```

## CORS Configuration

Your backend must allow dashboard domain.

**Backend (Node.js Express)**:

```javascript
const cors = require('cors');

// Allow dashboard domain
app.use(cors({
  origin: [
	'http://localhost:8000',
	'https://dashboard.yourdomain.com',
	'https://*.yourdomain.com'
  ],
  credentials: true
}));
```

**Backend (socket.io)**:

```javascript
const io = require('socket.io')(server, {
  cors: {
	origin: [
	  'http://localhost:8000',
	  'https://dashboard.yourdomain.com',
	  'https://*.yourdomain.com'
	],
	credentials: true
  }
});
```

## Custom Domain Setup

### On Cloudflare Dashboard

1. Go to **DNS**
2. Add CNAME record:
   - Name: `dashboard`
   - Target: `your-project.pages.dev`

3. Or use Cloudflare's suggested nameservers

### Verify Custom Domain

```bash
# Test DNS resolution
nslookup dashboard.yourdomain.com
# or
dig dashboard.yourdomain.com

# Verify HTTPS
curl -I https://dashboard.yourdomain.com
```

## Cache & Performance

### Cache Static Assets

Add `_headers` file in dashboard root:

**File: `dashboard/_headers`**:

```
/*
  Cache-Control: max-age=3600, public

/css/*
  Cache-Control: max-age=31536000, public

/js/*
  Cache-Control: max-age=31536000, public

/index.html
  Cache-Control: no-cache, must-revalidate
```

### Cache Invalidation

After deploying with new files:

```bash
# Purge cache in Cloudflare Dashboard
# Or use CLI (if available)
wrangler pages deployment tail
```

## Monitoring & Logging

### Enable Analytics

1. Log in to Cloudflare Dashboard
2. Go to **Pages** > **Your Project** > **Analytics**
3. View traffic, errors, performance

### Monitor Real-Time

```bash
# Stream logs from Pages deployment
wrangler pages deployment tail
```

### Error Tracking

1. Check Cloudflare Analytics for errors
2. Monitor browser console (user reports)
3. Check backend API logs for failed requests

## Troubleshooting

### Files Not Updating After Deploy

```bash
# Clear local cache
rm -rf .wrangler/

# Redeploy
wrangler pages publish dashboard/
```

### CORS Errors

1. Check backend CORS configuration
2. Verify dashboard domain is whitelisted
3. Check browser console for exact error
4. Test with curl: `curl -H "Origin: https://your-domain.com" -v https://api.yourdomain.com/api/health`

### API Connection Timeout

1. Check backend is running
2. Verify API URL is correct
3. Check network tab in DevTools
4. Increase timeout in `api.js`: `const timeout = 10000;`

### Socket.IO Not Connecting

1. Verify backend Socket.IO is running
2. Check `/overlay` namespace exists
3. Verify CORS settings allow dashboard
4. Test connection: 
```javascript
const socket = io('https://api.yourdomain.com', {
  path: '/socket.io/'
});
socket.on('connect', () => console.log('Connected'));
```

## Automated Deployment (CI/CD)

### GitHub Actions Example

**File: `.github/workflows/deploy.yml`**:

```yaml
name: Deploy Dashboard to Cloudflare Pages

on:
  push:
	branches:
	  - main
	paths:
	  - 'dashboard/**'

jobs:
  deploy:
	runs-on: ubuntu-latest

	steps:
	  - uses: actions/checkout@v2

	  - name: Deploy to Cloudflare Pages
		uses: cloudflare/pages-action@v1
		with:
		  apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
		  accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
		  projectName: autowasha-dashboard
		  directory: dashboard
		  productionBranch: main
```

Setup secrets in GitHub:
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Add `CLOUDFLARE_API_TOKEN`
3. Add `CLOUDFLARE_ACCOUNT_ID`

## Rollback

If deployment has issues:

```bash
# List recent deployments
wrangler pages deployments list

# Rollback to previous
wrangler pages rollback --version <version-id>
```

## Production Checklist

- [ ] Backend CORS configured
- [ ] API base URL set correctly
- [ ] SSL/HTTPS enabled
- [ ] Custom domain configured
- [ ] DNS propagated (check with `nslookup`)
- [ ] Socket.IO CORS configured
- [ ] Cache headers set
- [ ] Error handling tested
- [ ] Mobile responsive verified
- [ ] Performance optimized
- [ ] Analytics enabled
- [ ] Monitoring configured
- [ ] Backup strategy in place

## Monitoring & Maintenance

### Weekly Tasks

- [ ] Check analytics for errors
- [ ] Monitor API response times
- [ ] Review real-time events
- [ ] Check database size

### Monthly Tasks

- [ ] Review performance metrics
- [ ] Test failover/recovery
- [ ] Update dependencies
- [ ] Review access logs

### Quarterly Tasks

- [ ] Security audit
- [ ] Performance optimization
- [ ] Backup verification
- [ ] Disaster recovery drill

## Security Best Practices

1. **API Key Management**
   - Never expose in frontend code
   - Use backend to proxy requests if needed
   - Rotate keys regularly

2. **CORS Configuration**
   - Only allow your domain
   - Use specific origins (not `*`)
   - Validate requests on backend

3. **Rate Limiting**
   - Implement on backend
   - Use Cloudflare's rate limiting rules
   - Monitor for abuse

4. **HTTPS Only**
   - Always use HTTPS in production
   - Cloudflare provides free SSL

5. **Content Security Policy**
   - Restrict script sources
   - Prevent XSS attacks
   - Monitor violations

## Cost Optimization

- **Cloudflare Pages**: Free tier includes 500 deployments/month
- **Bandwidth**: Unlimited (within fair use)
- **Custom Domain**: Requires Cloudflare DNS ($0 with existing domain)
- **API Requests**: Count against backend quota

## Next Steps

1. ✅ Deploy dashboard to Cloudflare Pages
2. ✅ Configure custom domain
3. ✅ Update API URLs
4. ✅ Test all pages and features
5. ✅ Set up monitoring
6. ✅ Configure CI/CD
7. ✅ Document changes
8. ✅ Train team on dashboard

---

**Dashboard Status**: Ready for Production ✅

For support or questions, refer to:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
- Dashboard README.md
