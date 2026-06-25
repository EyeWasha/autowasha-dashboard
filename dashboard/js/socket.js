// ============================================================================
// AUTOWASHA RPG DASHBOARD - SOCKET.IO REAL-TIME HANDLER
// ============================================================================

class RPGSocket {
  constructor(url = null, namespace = '/overlay') {
    // Use production URL if available, otherwise localhost for development
    this.url = url || 
               (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) ||
               'https://api.eyewasha.com';
    this.namespace = namespace;
    this.socket = null;
    this.listeners = new Map();
    this.connected = false;
  }

  /**
   * Connect to Socket.IO server
   */
  connect() {
    if (!window.io) {
      console.warn('Socket.IO client not loaded');
      return;
    }

    this.socket = window.io(this.url, {
      path: '/socket.io/',
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
      namespace: this.namespace,
    });

    this.setupEventHandlers();
  }

  /**
   * Setup default event handlers
   */
  setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Socket.IO connected');
      this.connected = true;
      this.emit('socketConnected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
      this.connected = false;
      this.emit('socketDisconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
      this.emit('socketError', error);
    });

    // Game events
    this.socket.on('player:joined', (data) => {
      console.log('Player joined:', data);
      this.emit('playerJoined', data);
    });

    this.socket.on('quest:started', (data) => {
      console.log('Quest started:', data);
      this.emit('questStarted', data);
    });

    this.socket.on('combat:action', (data) => {
      console.log('Combat action:', data);
      this.emit('combatAction', data);
    });

    this.socket.on('player:levelup', (data) => {
      console.log('Player level up:', data);
      this.emit('playerLevelUp', data);
    });

    this.socket.on('possession:acquired', (data) => {
      console.log('Possession acquired:', data);
      this.emit('possessionAcquired', data);
    });

    this.socket.on('spell:learned', (data) => {
      console.log('Spell learned:', data);
      this.emit('spellLearned', data);
    });

    this.socket.on('player:traveled', (data) => {
      console.log('Player traveled:', data);
      this.emit('playerTraveled', data);
    });
  }

  /**
   * Subscribe to player updates
   */
  subscribe(playerId) {
    if (this.socket && this.connected) {
      this.socket.emit('subscribe', { playerId });
      console.log(`Subscribed to player ${playerId}`);
    }
  }

  /**
   * Add event listener
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  /**
   * Remove event listener
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit local event
   */
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => {
        callback(data);
      });
    }
  }

  /**
   * Disconnect
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Get connection status
   */
  isConnected() {
    return this.connected;
  }
}

// Create global socket instance
const socket = new RPGSocket(
  window.API_BASE_URL || 'http://localhost:5000',
  '/overlay'
);

// Auto-connect on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => socket.connect());
} else {
  socket.connect();
}

export { socket, RPGSocket };
