// ============================================================================
// AUTOWASHA RPG DASHBOARD - UTILITIES
// ============================================================================

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

/**
 * Format large numbers with K, M, B
 */
function formatShort(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Get color by percentage (for progress bars)
 */
function getHealthColor(percentage) {
  if (percentage > 50) return '#00FF00'; // Green
  if (percentage > 25) return '#FFFF00'; // Yellow
  return '#FF0000'; // Red
}

/**
 * Format datetime
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format relative time (e.g. "2 hours ago")
 */
function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(dateStr);
}

/**
 * Get element color
 */
function getElementColor(element) {
  const colors = {
    Fire: '#FF4400',
    Water: '#0088FF',
    Wind: '#00FF88',
    Earth: '#FFAA00',
    Light: '#FFFF00',
    Dark: '#8800FF',
    AntiMagic: '#FF00FF',
  };
  return colors[element] || '#00FFFF';
}

/**
 * Create element badge HTML
 */
function createElementBadge(element) {
  const color = getElementColor(element);
  return `<span class="badge element" style="border-color: ${color}; color: ${color}">${element}</span>`;
}

/**
 * Create kingdom badge HTML
 */
function createKingdomBadge(kingdom) {
  return `<span class="badge kingdom">${kingdom}</span>`;
}

/**
 * Create level badge HTML
 */
function createLevelBadge(level) {
  let badgeClass = 'badge level';
  if (level >= 50) badgeClass = 'badge rare';
  return `<span class="${badgeClass}">Level ${level}</span>`;
}

/**
 * Create status indicator HTML
 */
function createStatusIndicator(isOnline) {
  const status = isOnline ? 'online' : 'offline';
  return `<span class="status ${status}"></span>`;
}

/**
 * Create progress bar HTML
 */
function createProgressBar(current, max, label = '', color = null) {
  const percentage = Math.min(100, Math.floor((current / max) * 100));
  const barColor = color || getHealthColor(percentage);

  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${percentage}%; background: linear-gradient(to right, ${barColor}, #00FFFF);">
        <span class="progress-text">${label || percentage}%</span>
      </div>
    </div>
  `;
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Show notification
 */
function showNotification(message, type = 'info', duration = 5000) {
  const container = document.getElementById('notifications') || createNotificationContainer();

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message;

  container.appendChild(notification);

  if (duration) {
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  return notification;
}

/**
 * Create notification container
 */
function createNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'notifications';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
  `;
  document.body.appendChild(container);
  return container;
}

/**
 * Show modal
 */
function showModal(title, content, buttons = []) {
  const modal = document.createElement('div');
  modal.className = 'modal active';

  let buttonsHtml = '';
  if (buttons.length > 0) {
    buttonsHtml = `
      <div class="mt-2">
        ${buttons.map(btn => `
          <button class="btn ${btn.type || ''}" data-action="${btn.action}">
            ${btn.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-body">
        ${content}
      </div>
      ${buttonsHtml}
    </div>
  `;

  document.body.appendChild(modal);

  // Close on X click
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  });

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    }
  });

  // Handle button clicks
  modal.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action) {
        document.dispatchEvent(new CustomEvent('modal-action', { detail: action }));
      }
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    });
  });

  return modal;
}

/**
 * Format XP bar label
 */
function formatXPLabel(current, next) {
  const percentage = Math.floor((current / next) * 100);
  return `${formatNumber(current)} / ${formatNumber(next)} XP`;
}

/**
 * Calculate player rank
 */
function getPlayerRank(index) {
  if (index === 0) return '👑 #1';
  if (index === 1) return '🥈 #2';
  if (index === 2) return '🥉 #3';
  return `#${index + 1}`;
}

/**
 * Get stat color based on value
 */
function getStatColor(stat, value) {
  // Normalize based on typical max values
  const maxValues = {
    hp: 200,
    mana: 100,
    str: 20,
    int: 20,
    dex: 20,
    def: 20,
  };

  const max = maxValues[stat] || 100;
  const percentage = (value / max) * 100;

  if (percentage > 70) return '#00FF00'; // Green
  if (percentage > 40) return '#0080FF'; // Blue
  if (percentage > 20) return '#FFFF00'; // Yellow
  return '#FF0000'; // Red
}

/**
 * Animate number count
 */
function animateCount(element, start, end, duration = 1000) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const counter = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(counter);
    }
    element.textContent = formatNumber(Math.floor(current));
  }, 16);
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success', 3000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

export {
  formatNumber,
  formatShort,
  getHealthColor,
  formatDate,
  formatRelativeTime,
  getElementColor,
  createElementBadge,
  createKingdomBadge,
  createLevelBadge,
  createStatusIndicator,
  createProgressBar,
  debounce,
  throttle,
  showNotification,
  showModal,
  formatXPLabel,
  getPlayerRank,
  getStatColor,
  animateCount,
  copyToClipboard,
};
