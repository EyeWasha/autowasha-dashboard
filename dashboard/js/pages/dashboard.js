// ============================================================================
// AUTOWASHA RPG DASHBOARD - MAIN DASHBOARD PAGE
// ============================================================================

// Import from utils (assuming they're loaded globally)
// This would normally be a module import

class Dashboard {
  constructor() {
    this.players = [];
    this.events = [];
    this.stats = {
      totalPlayers: 0,
      totalLevelUps: 0,
      totalQuests: 0,
      avgLevel: 0,
    };
    this.elementCount = {};
    this.maxEvents = 50;

    this.init();
  }

  /**
   * Initialize dashboard
   */
  async init() {
    console.log('Initializing dashboard...');

    // Check backend health
    await this.checkBackendStatus();

    // Load initial data
    await this.loadLeaderboard();
    await this.loadGameStats();

    // Setup real-time updates
    this.setupRealtimeListeners();

    // Setup refresh intervals
    this.setupRefreshIntervals();

    console.log('Dashboard initialized');
  }

  /**
   * Check backend connection status
   */
  async checkBackendStatus() {
    try {
      const response = await api.getHealth();
      this.updateBackendStatus(true);
      console.log('Backend is healthy');
    } catch (error) {
      this.updateBackendStatus(false);
      console.error('Backend is unavailable:', error);
    }
  }

  /**
   * Update backend status display
   */
  updateBackendStatus(isHealthy) {
    const statusEl = document.getElementById('backend-status');
    if (isHealthy) {
      statusEl.textContent = '✅ Online';
      statusEl.style.color = '#00FF00';
    } else {
      statusEl.textContent = '❌ Offline';
      statusEl.style.color = '#FF0000';
    }
  }

  /**
   * Load leaderboard
   */
  async loadLeaderboard() {
    try {
      const response = await api.getLeaderboard(20);
      this.players = response.leaderboard || [];
      this.updateLeaderboardUI();
      this.updateElementDistribution();
      this.calculateStats();
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      showNotification('Failed to load leaderboard', 'error');
    }
  }

  /**
   * Update leaderboard UI
   */
  updateLeaderboardUI() {
    const tbody = document.getElementById('top-players');
    tbody.innerHTML = '';

    if (this.players.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="color: #FFFF00;">
            No players yet
          </td>
        </tr>
      `;
      return;
    }

    this.players.forEach((player, index) => {
      const row = document.createElement('tr');
      const rank = getPlayerRank(index);
      const elementBadge = createElementBadge(player.magic_attribute);

      row.innerHTML = `
        <td>${rank}</td>
        <td>
          <a href="#" onclick="dashboardInstance.viewPlayer(${player.id}); return false;">
            ${player.username}
          </a>
        </td>
        <td>${player.level}</td>
        <td>${elementBadge}</td>
        <td>${formatShort(player.washed_coins)}</td>
        <td>${formatShort(player.experience)}</td>
      `;

      tbody.appendChild(row);
    });

    // Update online count (approximate)
    document.getElementById('online-count').textContent = this.players.length;
  }

  /**
   * Update element distribution
   */
  updateElementDistribution() {
    this.elementCount = {};

    this.players.forEach(player => {
      const element = player.magic_attribute || 'Unknown';
      this.elementCount[element] = (this.elementCount[element] || 0) + 1;
    });

    const container = document.getElementById('element-dist');
    container.innerHTML = '';

    Object.entries(this.elementCount).forEach(([element, count]) => {
      const percentage = (count / this.players.length) * 100;
      const color = getElementColor(element);

      const box = document.createElement('div');
      box.className = 'stat-box';
      box.innerHTML = `
        <div class="stat-label">${element}</div>
        <div class="stat-value" style="color: ${color};">${count}</div>
        <div class="progress-bar" style="margin-top: 8px;">
          <div class="progress-fill" style="width: ${percentage}%; background: ${color};"></div>
        </div>
      `;

      container.appendChild(box);
    });
  }

  /**
   * Calculate game statistics
   */
  calculateStats() {
    this.stats.totalPlayers = this.players.length;

    if (this.players.length > 0) {
      const totalLevel = this.players.reduce((sum, p) => sum + p.level, 0);
      this.stats.avgLevel = Math.floor(totalLevel / this.players.length);
    }

    this.updateStatsUI();
  }

  /**
   * Update stats UI
   */
  updateStatsUI() {
    document.getElementById('total-players').textContent = formatNumber(this.stats.totalPlayers);
    document.getElementById('avg-level').textContent = this.stats.avgLevel;
    document.getElementById('total-levelups').textContent = formatNumber(this.stats.totalLevelUps);
    document.getElementById('total-quests').textContent = formatNumber(this.stats.totalQuests);
  }

  /**
   * Load game statistics
   */
  async loadGameStats() {
    try {
      const zones = await api.getZones();
      const elements = await api.getElements();

      // You can store this data for reference
      console.log('Zones:', zones);
      console.log('Elements:', elements);
    } catch (error) {
      console.error('Error loading game stats:', error);
    }
  }

  /**
   * Setup real-time listeners
   */
  setupRealtimeListeners() {
    // Listen for new player joins
    socket.on('playerJoined', (data) => {
      this.addEvent(`🎮 ${data.username} joined as a ${data.element} mage`);
      // Reload leaderboard after a short delay
      setTimeout(() => this.loadLeaderboard(), 1000);
    });

    // Listen for level ups
    socket.on('playerLevelUp', (data) => {
      this.addEvent(`⬆️ ${data.newLevel} - Player reached level ${data.newLevel}`);
      this.stats.totalLevelUps++;
      setTimeout(() => this.loadLeaderboard(), 500);
    });

    // Listen for quest starts
    socket.on('questStarted', (data) => {
      this.addEvent(`⚔️ New quest: ${data.quest.enemy}`);
      this.stats.totalQuests++;
    });

    // Listen for combat actions
    socket.on('combatAction', (data) => {
      if (data.complete) {
        this.addEvent(`✨ Quest completed!`);
      }
    });

    // Listen for possessions
    socket.on('possessionAcquired', (data) => {
      this.addEvent(`👻 Spirit possession acquired!`);
    });

    // Listen for socket events
    socket.on('socketConnected', () => {
      console.log('Real-time connection established');
      showNotification('Connected to real-time updates', 'success', 3000);
    });

    socket.on('socketDisconnected', () => {
      console.log('Real-time connection lost');
      showNotification('Disconnected from real-time updates', 'warning', 3000);
    });

    socket.on('socketError', (error) => {
      console.error('Real-time connection error:', error);
    });
  }

  /**
   * Add event to feed
   */
  addEvent(message) {
    const event = {
      message,
      timestamp: new Date(),
    };

    this.events.unshift(event);
    if (this.events.length > this.maxEvents) {
      this.events.pop();
    }

    this.updateActivityFeed();
  }

  /**
   * Update activity feed UI
   */
  updateActivityFeed() {
    const feed = document.getElementById('activity-feed');

    if (this.events.length === 0) {
      feed.innerHTML = '<p style="color: #FFFF00; font-size: 12px;">Waiting for events...</p>';
      return;
    }

    feed.innerHTML = this.events
      .map((event) => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${event.message}</span>
            <span style="color: #808080; font-size: 11px;">
              ${formatRelativeTime(event.timestamp.toISOString())}
            </span>
          </div>
        </div>
      `)
      .join('');
  }

  /**
   * Setup refresh intervals
   */
  setupRefreshIntervals() {
    // Refresh leaderboard every 30 seconds
    setInterval(() => this.loadLeaderboard(), 30000);

    // Check backend health every 60 seconds
    setInterval(() => this.checkBackendStatus(), 60000);
  }

  /**
   * View player profile
   */
  viewPlayer(playerId) {
    // For now, just show a simple modal
    // In a full implementation, would navigate to player page
    showModal(
      'Player Profile',
      `<p>Loading player ${playerId}...</p>`,
      [{ label: 'Close', action: 'close' }]
    );
  }
}

// Create global instance for easy access
let dashboardInstance;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    dashboardInstance = new Dashboard();
  });
} else {
  dashboardInstance = new Dashboard();
}

// Make functions globally available for HTML
window.getPlayerRank = getPlayerRank;
window.formatShort = formatShort;
window.createElementBadge = createElementBadge;
window.formatRelativeTime = formatRelativeTime;
window.showNotification = showNotification;
window.showModal = showModal;
