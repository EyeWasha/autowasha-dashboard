// ============================================================================
// AUTOWASHA RPG DASHBOARD - API WRAPPER
// ============================================================================

class RPGApi {
  constructor(baseUrl = null) {
    // Use production URL if available, otherwise localhost for development
    this.baseUrl = baseUrl || 
                   (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) ||
                   'https://api.eyewasha.com';

    this.cache = new Map();
    this.cacheTimeout = 30000; // 30 seconds
  }

  /**
   * Generic fetch wrapper with error handling
   */
  async fetch(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get with caching
   */
  async cachedFetch(endpoint) {
    const cacheKey = `cache_${endpoint}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.time < this.cacheTimeout) {
        return cached.data;
      }
    }

    const data = await this.fetch(endpoint);
    this.cache.set(cacheKey, { data, time: Date.now() });
    return data;
  }

  /**
   * Health check
   */
  async getHealth() {
    return this.fetch('/api/health');
  }

  /**
   * Get leaderboard
   */
  async getLeaderboard(limit = 100) {
    return this.fetch(`/api/rpg/leaderboard?limit=${limit}`);
  }

  /**
   * Get player profile
   */
  async getPlayerProfile(playerId) {
    return this.fetch(`/api/rpg/player/${playerId}/profile`);
  }

  /**
   * Get player stats
   */
  async getPlayerStats(playerId) {
    return this.fetch(`/api/rpg/player/${playerId}/stats`);
  }

  /**
   * Get zones
   */
  async getZones() {
    return this.cachedFetch('/api/rpg/zones');
  }

  /**
   * Get elements
   */
  async getElements() {
    return this.cachedFetch('/api/rpg/elements');
  }

  /**
   * Get kingdoms
   */
  async getKingdoms() {
    return this.cachedFetch('/api/rpg/kingdoms');
  }

  /**
   * Get player spells
   */
  async getPlayerSpells(playerId) {
    return this.fetch(`/api/rpg/spells/${playerId}`);
  }

  /**
   * Get available spells
   */
  async getAvailableSpells(playerId, limit = 3) {
    return this.fetch(`/api/rpg/spells/available/${playerId}?limit=${limit}`);
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Create global API instance
const api = new RPGApi(window.API_BASE_URL || 'http://localhost:5000');

export { api, RPGApi };
