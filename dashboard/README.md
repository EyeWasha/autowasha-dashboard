# 🎮 AutoWasha RPG Dashboard

A retro 16-bit styled web dashboard for viewing real-time AutoWasha RPG player data, inventories, leaderboards, and game information. Built with vanilla HTML/CSS/JavaScript and Socket.IO for real-time updates.

## 📁 Project Structure

```
dashboard/
├── index.html                 # Main dashboard home page
├── player.html               # Individual player profile page
├── leaderboard.html          # Global leaderboard view
├── zones.html                # Zone information & difficulty
├── grimoire.html             # Spell reference guide
├── admin.html                # System admin panel
├── css/
│   └── style.css            # Retro 16-bit theme stylesheet
└── js/
	├── api.js               # Backend API wrapper
	├── socket.js            # Socket.IO real-time client
	├── utils.js             # Utility functions & helpers
	└── pages/
		├── dashboard.js     # Main dashboard logic
		├── player.js        # Player profile logic
		└── leaderboard.js   # Leaderboard logic
```

## 🎨 Design System

### Color Palette (16-bit Retro)

| Color | Hex | Use Case |
|-------|-----|----------|
| Cyan | #00FFFF | Primary text, borders, accents |
| Magenta | #FF00FF | Secondary accents, headers |
| Blue | #0080FF | Tertiary text, stat displays |
| Green | #00FF00 | Success, active states |
| Red | #FF0000 | Danger, offline states |
| Yellow | #FFFF00 | Warnings, notifications |
| White | #FFFFFF | Body text |
| Navy | #000080 | Primary background |
| Dark | #000020 | Darker background |

### Visual Effects

- **CRT Scanlines**: Horizontal line overlay simulating retro monitor
- **Pixelated Borders**: Solid 3px borders for blocky aesthetic
- **Neon Glow**: Text shadows and box shadows for glow effect
- **Monospace Font**: Courier New for authentic retro feel

## 🚀 Getting Started

### Prerequisites

- Node.js backend running on `http://localhost:5000` (or configured domain)
- Socket.IO server with `/overlay` namespace
- RPG API endpoints accessible

### Local Development

1. **Clone or copy the dashboard folder to your project**:
```bash
cp -r dashboard /path/to/your/project/
```

2. **Configure API URL** (in each HTML file):
```javascript
window.API_BASE_URL = 'http://localhost:5000';
```

3. **Serve files locally** (use any HTTP server):
```bash
# Using Python 3
python -m http.server 8000

# Using Node http-server
npx http-server dashboard/

# Using Cloudflare Pages (recommended)
wrangler pages publish dashboard/
```

4. **Open in browser**:
```
http://localhost:8000/dashboard/
```

## 📊 Pages Overview

### Dashboard (index.html)
Main real-time dashboard showing:
- System health status
- Top 20 players
- Recent activity feed
- Game statistics
- Element distribution

**Key Features**:
- Live player count
- Activity notifications
- Real-time updates via Socket.IO

### Player Profile (player.html)
Detailed player information:
- Character stats (HP, Mana, STR, INT, DEX, DEF)
- Experience/Level progression
- Inventory items
- Equipped gear
- Learned spells
- Active quest

**Key Features**:
- Tabbed interface
- Search by name or ID
- Progress bars for XP
- Stat color coding

### Leaderboard (leaderboard.html)
Global player rankings:
- Top 100 players
- Filterable by element
- Sortable by Level/XP/Coins
- Pagination (20 per page)
- Leaderboard statistics

**Key Features**:
- Multiple sort options
- Element filtering
- Rank badges (👑🥈🥉)
- Avg level & highest level stats

### Zones (zones.html)
Zone information:
- All available zones
- Difficulty levels
- Recommended elements
- Reward multipliers

### Grimoire (grimoire.html)
Spell reference:
- All available spells
- Filtered by element
- Damage/Mana costs
- Element effectiveness matrix

### Admin Panel (admin.html)
System administration:
- Health check status
- Database stats
- Backend uptime
- Socket.IO connection status
- API endpoint reference

## 🔌 Backend Integration

### Required API Endpoints

```
GET /api/health
  Response: { version, uptime, database, socketio, timestamp }

GET /api/rpg/leaderboard?limit=100
  Response: { leaderboard: [...] }

GET /api/rpg/player/:playerId/profile
  Response: { id, username, level, magic_attribute, ... }

GET /api/rpg/player/:playerId/stats
  Response: { max_hp, max_mana, strength, intelligence, ... }

GET /api/rpg/zones
  Response: [{ name, difficulty, min_level, ... }]

GET /api/rpg/elements
  Response: ['Fire', 'Water', 'Wind', ...]

GET /api/rpg/spells/:playerId
  Response: [{ name, element, damage, mana_cost, ... }]
```

### Socket.IO Events

Subscribe to real-time events:

```javascript
socket.on('player:joined', (data) => {
  // { username, element, level }
});

socket.on('player:levelup', (data) => {
  // { newLevel, player_id }
});

socket.on('quest:started', (data) => {
  // { quest: {...}, player_id }
});

socket.on('combat:action', (data) => {
  // { action, damage, complete }
});

socket.on('possession:acquired', (data) => {
  // { possession, rarity }
});

socket.on('spell:learned', (data) => {
  // { spell_name, element }
});
```

## 🌐 Deployment to Cloudflare

### Option 1: Cloudflare Pages (Recommended)

1. **Install Wrangler**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Deploy**:
```bash
wrangler pages publish dashboard/
```

4. **Update API URL** in HTML files to point to your domain:
```javascript
window.API_BASE_URL = 'https://api.yourdomain.com';
```

### Option 2: Cloudflare Workers (For Dynamic Routes)

Create a `wrangler.toml`:

```toml
name = "autowasha-dashboard"
type = "javascript"
route = "dashboard/*"

[env.production]
route = "dashboard/*"
zone_id = "your_zone_id"
```

### Option 3: Static Hosting (Any Provider)

1. Upload `dashboard/` folder to any static host
2. Update `window.API_BASE_URL` to your backend domain
3. Ensure CORS is enabled on backend

## 🔧 Configuration

### Set API Base URL

Edit the `<script>` block in each HTML file:

```html
<script>
  // For local development:
  window.API_BASE_URL = 'http://localhost:5000';

  // For production:
  // window.API_BASE_URL = 'https://api.yourdomain.com';
</script>
```

### Customize Colors

Edit `dashboard/css/style.css` `:root` section:

```css
:root {
  --color-cyan: #00FFFF;
  --color-magenta: #FF00FF;
  --color-blue: #0080FF;
  /* ... */
}
```

### Change Font

Update in CSS:

```css
--font-mono: "Your Font", monospace;
```

## 📱 Responsive Design

Dashboard is responsive across:
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (sidebar + content)
- **Desktop**: > 1024px (full 2-column layout)

All components adapt automatically.

## 🔒 Security Notes

- ✅ Dashboard is **read-only** (no mutations)
- ✅ No authentication required (public viewing)
- ✅ Backend handles all data validation
- ✅ CORS enabled for cross-domain requests
- ⚠️ Do not expose sensitive backend URLs to client

## 🐛 Troubleshooting

### API Connection Issues

1. Check `window.API_BASE_URL` is correct
2. Verify backend is running on port 5000
3. Check browser console for CORS errors
4. Ensure backend CORS allows dashboard domain

### Socket.IO Not Connecting

1. Verify Socket.IO server is running
2. Check `/overlay` namespace exists
3. Look for connection errors in browser console
4. Verify socket URL matches API base URL

### Data Not Showing

1. Check Network tab in DevTools
2. Verify API endpoints return data
3. Check browser console for errors
4. Ensure player IDs are valid

## 📊 Data Flow

```
User Browser (Dashboard)
  ↓
API.js (HTTP Requests)
  ↓
Backend /api/rpg/* Endpoints
  ↓
Database (PostgreSQL)
  ↓
Backend returns JSON
  ↓
UI Components render data

Real-Time Updates:
Browser Socket.IO Client
  ↓
Backend Socket.IO Server (/overlay)
  ↓
Broadcasts game events
  ↓
UI updates dynamically
```

## 🎮 Usage Examples

### View Player Profile
```
Click player name in leaderboard
Or navigate: /player.html?id=123
```

### Check System Health
```
Navigate to Admin Panel
Click "Run Health Check" button
```

### Filter Leaderboard
```
Select sort option (Level/XP/Coins)
Choose element filter
Enter min level
Click "Apply Filters"
```

## 📈 Performance Tips

1. **Cache API Responses**: 30-second cache on static data
2. **Paginate Leaderboard**: 20 players per page
3. **Debounce Searches**: Prevent excessive API calls
4. **Lazy Load Images**: Load only when visible
5. **Minify CSS/JS**: For production deployment

## 🔄 Real-Time Features

- **Live Player Count**: Updates as players join
- **Activity Feed**: Shows recent events (50 max)
- **Level Up Notifications**: Instant announcements
- **Quest Status**: Real-time quest updates
- **Element Distribution**: Live stat updates

## 📝 Customization

### Add New Page

1. Create `newpage.html` in root
2. Include navigation with existing pages
3. Add styles to `css/style.css` if needed
4. Create `js/pages/newpage.js` for logic
5. Use existing utilities from `js/utils.js`

### Add New Widget

1. Create HTML structure in page
2. Use existing CSS classes (`.panel`, `.card`, `.stat-box`)
3. Use utility functions for formatting
4. Connect to API via `api.js`

### Custom Theme

Edit these CSS variables in `style.css`:

```css
--color-cyan: #YOUR_COLOR;
--color-magenta: #YOUR_COLOR;
--bg-dark: #YOUR_COLOR;
/* etc... */
```

## 🚀 Production Checklist

- [ ] API base URL set to production domain
- [ ] Backend CORS configured for domain
- [ ] SSL/HTTPS enabled
- [ ] Caching headers configured
- [ ] Minified CSS/JS deployed
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Security reviewed

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review Network tab in DevTools
3. Check backend server logs
4. Verify API endpoints are accessible
5. Test with simple fetch request

## 📄 License

Part of AutoWasha RPG project

---

**Created**: 2024
**Last Updated**: 2024
**Status**: Production Ready ✅
