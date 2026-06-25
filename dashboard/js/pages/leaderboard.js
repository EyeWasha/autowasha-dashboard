// ============================================================================
// AUTOWASHA RPG DASHBOARD - LEADERBOARD PAGE
// ============================================================================

class LeaderboardPage {
  constructor() {
    this.allPlayers = [];
    this.displayedPlayers = [];
    this.pageSize = 20;
    this.currentPage = 0;
    this.filters = {
      sortBy: 'level',
      element: '',
      minLevel: 1,
    };

    this.init();
  }

  /**
   * Initialize leaderboard
   */
  async init() {
    await this.loadElements();
    await this.loadLeaderboard();
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    document.getElementById('sort-select').addEventListener('change', (e) => {
      this.filters.sortBy = e.target.value;
      this.applyFilters();
    });

    document.getElementById('element-filter').addEventListener('change', (e) => {
      this.filters.element = e.target.value;
      this.applyFilters();
    });

    document.getElementById('level-filter').addEventListener('change', (e) => {
      this.filters.minLevel = parseInt(e.target.value) || 1;
    });
  }

  /**
   * Load elements for filter dropdown
   */
  async loadElements() {
    try {
      const elements = await api.getElements();
      const select = document.getElementById('element-filter');

      elements.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading elements:', error);
    }
  }

  /**
   * Load leaderboard
   */
  async loadLeaderboard() {
    try {
      const response = await api.getLeaderboard(500);
      this.allPlayers = response.leaderboard || [];

      this.updateStatistics();
      this.applyFilters();
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      showNotification('Failed to load leaderboard', 'error');
    }
  }

  /**
   * Apply filters
   */
  applyFilters() {
    let filtered = [...this.allPlayers];

    // Filter by element
    if (this.filters.element) {
      filtered = filtered.filter(p => p.magic_attribute === this.filters.element);
    }

    // Filter by minimum level
    if (this.filters.minLevel > 1) {
      filtered = filtered.filter(p => p.level >= this.filters.minLevel);
    }

    // Sort
    if (this.filters.sortBy === 'level') {
      filtered.sort((a, b) => b.level - a.level);
    } else if (this.filters.sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    } else if (this.filters.sortBy === 'coins') {
      filtered.sort((a, b) => b.washed_coins - a.washed_coins);
    }

    this.displayedPlayers = filtered;
    this.currentPage = 0;
    this.updateDisplay();
  }

  /**
   * Update display
   */
  updateDisplay() {
    this.updateTable();
    this.updatePagination();
  }

  /**
   * Update leaderboard table
   */
  updateTable() {
    const tbody = document.getElementById('leaderboard-body');
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const pagePlayers = this.displayedPlayers.slice(start, end);

    if (pagePlayers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center" style="color: #FFFF00;">
            No players match the filters
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = pagePlayers.map((player, idx) => {
      const rank = start + idx + 1;
      const rankDisplay = getPlayerRank(rank - 1);

      return `
        <tr>
          <td>${rankDisplay}</td>
          <td>
            <a href="player.html?id=${player.id}" style="color: #00FFFF;">
              ${player.username}
            </a>
          </td>
          <td>${createLevelBadge(player.level)}</td>
          <td>${createElementBadge(player.magic_attribute)}</td>
          <td>${formatShort(player.experience)}</td>
          <td>${formatShort(player.washed_coins)}</td>
          <td>
            <span class="status online"></span>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Update pagination
   */
  updatePagination() {
    const totalPages = Math.ceil(this.displayedPlayers.length / this.pageSize);

    document.getElementById('page-info').textContent = 
      `Page ${this.currentPage + 1} of ${totalPages}`;

    document.getElementById('prev-btn').disabled = this.currentPage === 0;
    document.getElementById('next-btn').disabled = this.currentPage >= totalPages - 1;

    // Update button colors
    document.getElementById('prev-btn').style.opacity = 
      this.currentPage === 0 ? '0.5' : '1';
    document.getElementById('next-btn').style.opacity = 
      this.currentPage >= totalPages - 1 ? '0.5' : '1';
  }

  /**
   * Next page
   */
  nextPage() {
    const totalPages = Math.ceil(this.displayedPlayers.length / this.pageSize);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateDisplay();
      window.scrollTo(0, 0);
    }
  }

  /**
   * Previous page
   */
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplay();
      window.scrollTo(0, 0);
    }
  }

  /**
   * Update statistics
   */
  updateStatistics() {
    if (this.allPlayers.length === 0) return;

    // Total players
    document.getElementById('total-players-stat').textContent = formatNumber(this.allPlayers.length);

    // Average level
    const avgLevel = Math.floor(
      this.allPlayers.reduce((sum, p) => sum + p.level, 0) / this.allPlayers.length
    );
    document.getElementById('avg-level-stat').textContent = avgLevel;

    // Highest level
    const highestLevel = Math.max(...this.allPlayers.map(p => p.level));
    document.getElementById('highest-level-stat').textContent = highestLevel;

    // Most common element
    const elementCount = {};
    let mostCommon = '';
    let maxCount = 0;

    this.allPlayers.forEach(player => {
      const el = player.magic_attribute || 'Unknown';
      elementCount[el] = (elementCount[el] || 0) + 1;

      if (elementCount[el] > maxCount) {
        maxCount = elementCount[el];
        mostCommon = el;
      }
    });

    document.getElementById('common-element-stat').innerHTML = createElementBadge(mostCommon);
  }
}

// Create global instance
let leaderboardPage;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    leaderboardPage = new LeaderboardPage();
  });
} else {
  leaderboardPage = new LeaderboardPage();
}

// Make functions globally available
window.getPlayerRank = getPlayerRank;
window.formatShort = formatShort;
window.createLevelBadge = createLevelBadge;
window.createElementBadge = createElementBadge;
window.formatNumber = formatNumber;
window.showNotification = showNotification;
