// ============================================================================
// AUTOWASHA RPG DASHBOARD - PLAYER PROFILE PAGE
// ============================================================================

class PlayerPage {
  constructor() {
    this.currentPlayer = null;
    this.playerId = window.CURRENT_PLAYER_ID;

    this.init();
  }

  /**
   * Initialize player page
   */
  async init() {
    // Setup tab navigation
    this.setupTabs();

    if (this.playerId) {
      await this.loadPlayer(this.playerId);
    } else {
      showNotification('No player ID specified. Search or go back.', 'warning');
    }
  }

  /**
   * Setup tab navigation
   */
  setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  /**
   * Switch tabs
   */
  switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    // Hide all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    const tabEl = document.getElementById(`${tabName}-tab`);
    if (tabEl) {
      tabEl.style.display = 'block';
      tabEl.classList.add('active');
    }

    // Highlight button
    const btn = document.querySelector(`[data-tab="${tabName}"]`);
    if (btn) {
      btn.classList.add('active');
    }
  }

  /**
   * Load player data
   */
  async loadPlayer(playerId) {
    try {
      showNotification('Loading player profile...', 'info');

      const profile = await api.getPlayerProfile(playerId);
      const stats = await api.getPlayerStats(playerId);

      this.currentPlayer = { ...profile, ...stats };

      this.updatePlayerHeader();
      this.updateStats();
      this.updateProgression();
      this.loadInventory();
      this.loadEquipment();
      this.loadSpells();
      this.loadQuest();

      showNotification('Profile loaded successfully', 'success', 2000);
    } catch (error) {
      console.error('Error loading player:', error);
      showNotification('Failed to load player profile', 'error');
      document.getElementById('player-name').textContent = 'Player Not Found';
    }
  }

  /**
   * Update player header
   */
  updatePlayerHeader() {
    if (!this.currentPlayer) return;

    document.getElementById('player-name').textContent = this.currentPlayer.username;

    const badges = document.getElementById('player-badges');
    badges.innerHTML = `
      ${createLevelBadge(this.currentPlayer.level)}
      ${createElementBadge(this.currentPlayer.magic_attribute)}
    `;

    document.getElementById('player-level').textContent = this.currentPlayer.level;
    document.getElementById('player-element').innerHTML = 
      createElementBadge(this.currentPlayer.magic_attribute);
    document.getElementById('player-zone').textContent = 
      this.currentPlayer.current_zone || 'Unknown';
  }

  /**
   * Update stats display
   */
  updateStats() {
    if (!this.currentPlayer) return;

    const stats = this.currentPlayer;

    document.getElementById('stat-hp').textContent = stats.max_hp || 0;
    document.getElementById('stat-mana').textContent = stats.max_mana || 0;
    document.getElementById('stat-str').textContent = stats.strength || 0;
    document.getElementById('stat-int').textContent = stats.intelligence || 0;
    document.getElementById('stat-dex').textContent = stats.dexterity || 0;
    document.getElementById('stat-def').textContent = stats.defense || 0;
  }

  /**
   * Update progression
   */
  updateProgression() {
    if (!this.currentPlayer) return;

    const player = this.currentPlayer;
    const currentXp = player.experience || 0;
    const nextLevelXp = 1000 * (player.level || 1) * ((player.level || 1) + 1) / 2;

    const xpContainer = document.getElementById('xp-progress');
    xpContainer.innerHTML = createProgressBar(
      currentXp,
      nextLevelXp,
      formatXPLabel(currentXp, nextLevelXp)
    );
  }

  /**
   * Load inventory
   */
  async loadInventory() {
    if (!this.currentPlayer) return;

    try {
      // Assuming inventory data is in the profile response
      const inventory = this.currentPlayer.inventory || [];

      const tbody = document.getElementById('inventory-body');

      if (inventory.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="text-center" style="color: #FFFF00;">
              Empty inventory
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = inventory.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.rarity}</td>
          <td>${item.quantity}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error loading inventory:', error);
      document.getElementById('inventory-body').innerHTML = `
        <tr>
          <td colspan="4" class="text-center" style="color: #FF0000;">
            Error loading inventory
          </td>
        </tr>
      `;
    }
  }

  /**
   * Load equipment
   */
  async loadEquipment() {
    if (!this.currentPlayer) return;

    try {
      const equipment = this.currentPlayer.equipment || [];
      const container = document.getElementById('equipment-body');

      if (equipment.length === 0) {
        container.innerHTML = `
          <p class="text-center" style="grid-column: 1/-1; color: #FFFF00;">
            No equipment equipped
          </p>
        `;
        return;
      }

      container.innerHTML = equipment.map(item => `
        <div class="card">
          <div class="card-title">${item.name}</div>
          <div class="card-label">Type: ${item.type}</div>
          <div style="color: #00FFFF; margin-top: 8px;">
            <div>Slot: ${item.slot}</div>
            <div>Defense: +${item.defense || 0}</div>
            <div>Damage: +${item.damage || 0}</div>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading equipment:', error);
      document.getElementById('equipment-body').innerHTML = `
        <p class="text-center" style="grid-column: 1/-1; color: #FF0000;">
          Error loading equipment
        </p>
      `;
    }
  }

  /**
   * Load spells
   */
  async loadSpells() {
    if (!this.currentPlayer) return;

    try {
      const spells = await api.getPlayerSpells(this.currentPlayer.id);

      const tbody = document.getElementById('spells-body');

      if (!spells || spells.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="text-center" style="color: #FFFF00;">
              No spells learned yet
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = spells.map(spell => `
        <tr>
          <td>${spell.name}</td>
          <td>${createElementBadge(spell.element)}</td>
          <td>${spell.damage || '-'}</td>
          <td>${spell.mana_cost || '-'}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error loading spells:', error);
      document.getElementById('spells-body').innerHTML = `
        <tr>
          <td colspan="4" class="text-center" style="color: #FF0000;">
            Error loading spells
          </td>
        </tr>
      `;
    }
  }

  /**
   * Load active quest
   */
  async loadQuest() {
    if (!this.currentPlayer) return;

    try {
      // This would call an endpoint to get active quest
      // For now, show placeholder
      const questContainer = document.getElementById('quest-body');

      questContainer.innerHTML = `
        <div class="card">
          <p style="color: #FFFF00;">No active quest</p>
          <p style="font-size: 12px; color: #808080;">
            Start a quest from the game to see it here
          </p>
        </div>
      `;
    } catch (error) {
      console.error('Error loading quest:', error);
      document.getElementById('quest-body').innerHTML = `
        <p style="color: #FF0000;">Error loading quest data</p>
      `;
    }
  }

  /**
   * Search for player
   */
  async searchPlayer() {
    const input = document.getElementById('player-search');
    const query = input.value.trim();

    if (!query) {
      showNotification('Please enter a player name or ID', 'warning');
      return;
    }

    try {
      // Try to parse as ID first
      const playerId = parseInt(query);
      if (!isNaN(playerId)) {
        this.playerId = playerId;
        await this.loadPlayer(playerId);
        window.history.replaceState({}, '', `player.html?id=${playerId}`);
        return;
      }

      // Otherwise, try loading the leaderboard and searching
      const leaderboard = await api.getLeaderboard(1000);
      const player = leaderboard.leaderboard.find(p => 
        p.username.toLowerCase() === query.toLowerCase()
      );

      if (player) {
        this.playerId = player.id;
        await this.loadPlayer(player.id);
        window.history.replaceState({}, '', `player.html?id=${player.id}`);
      } else {
        showNotification('Player not found', 'error');
      }
    } catch (error) {
      console.error('Error searching player:', error);
      showNotification('Error searching for player', 'error');
    }
  }
}

// Create global instance
let playerPage;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    playerPage = new PlayerPage();
  });
} else {
  playerPage = new PlayerPage();
}

// Make functions globally available
window.getPlayerRank = getPlayerRank;
window.formatShort = formatShort;
window.createElementBadge = createElementBadge;
window.createLevelBadge = createLevelBadge;
window.formatXPLabel = formatXPLabel;
window.createProgressBar = createProgressBar;
window.showNotification = showNotification;
window.formatRelativeTime = formatRelativeTime;
