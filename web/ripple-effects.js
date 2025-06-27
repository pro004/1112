/**
 * Universal Ripple Effect System
 * Provides consistent touch/click ripple effects across the entire platform
 */

// Enhanced Universal Ripple Effect System
function createRippleEffect(element, event, color = 'purple') {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-animation 0.6s linear';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '1000';
  
  // Set ripple color
  const colors = {
    purple: 'rgba(139, 92, 246, 0.4)',
    pink: 'rgba(236, 72, 153, 0.4)',
    blue: 'rgba(59, 130, 246, 0.4)',
    green: 'rgba(20, 184, 166, 0.4)',
    teal: 'rgba(20, 184, 166, 0.4)',
    amber: 'rgba(245, 158, 11, 0.4)',
    red: 'rgba(239, 68, 68, 0.4)',
    orange: 'rgba(249, 115, 22, 0.4)'
  };
  ripple.style.background = colors[color] || colors.purple;
  
  // Ensure element has relative positioning
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  element.style.overflow = 'hidden';
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  }, 600);
}

// Function to determine ripple color based on element characteristics
function getRippleColor(element) {
  // Check for specific color classes
  if (element.classList.contains('bg-green-900') || element.classList.contains('text-green-400')) return 'green';
  if (element.classList.contains('bg-blue-900') || element.classList.contains('text-blue-400')) return 'blue';
  if (element.classList.contains('bg-amber-900') || element.classList.contains('text-amber-400')) return 'amber';
  if (element.classList.contains('bg-red-900') || element.classList.contains('text-red-400')) return 'red';
  if (element.classList.contains('bg-orange-900') || element.classList.contains('text-orange-400')) return 'orange';
  if (element.classList.contains('realtime-badge') || element.classList.contains('text-teal-400')) return 'teal';
  
  // Check for gradient buttons and special elements
  if (element.classList.contains('gradient-button') || element.classList.contains('premium-version-badge') || element.classList.contains('gradient-text')) return 'pink';
  if (element.classList.contains('bg-gradient-to-r') || element.classList.contains('bg-primary-500')) return 'pink';
  if (element.classList.contains('bg-dark-800') || element.classList.contains('bg-dark-700')) return 'blue';
  
  // Default to purple
  return 'purple';
}

// Initialize ripple effects for all interactive elements
function initializeRippleEffects() {
  const interactiveSelectors = [
    // Buttons and links
    'button', 'a[href]', 'input[type="submit"]', 'input[type="button"]',
    
    // Custom interactive classes
    '.interactive-element', '.magnetic-btn', '.dynamic-card', '.card-hover',
    '.frosted-card', '.breathing-card', '.sparkle-effect', '.rotating-border',
    '.gradient-button', '.glow-effect', '.interactive-btn', 
    
    // Dashboard elements
    '.method-badge', '.category-btn', '.notification-item', '.glass-card',
    '.premium-version-badge', '.version-badge', '.realtime-badge', 
    '.status-indicator', '.icon-button', '.sidebar-toggle-btn',
    '.pulse-badge', '.glow-border', '.floating-element',
    
    // Navigation elements
    '.nav-link', '.menu-item', '.tab-button'
  ];

  interactiveSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      // Avoid duplicate event listeners
      if (element.hasAttribute('data-ripple-enabled')) return;
      element.setAttribute('data-ripple-enabled', 'true');
      
      element.addEventListener('click', function(e) {
        // Skip if element is disabled or has no-ripple class
        if (this.disabled || this.classList.contains('no-ripple')) return;
        
        const color = getRippleColor(this);
        createRippleEffect(this, e, color);
      });
      
      // Add subtle hover effect enhancement
      element.addEventListener('mouseenter', function() {
        if (!this.classList.contains('no-hover-enhance')) {
          this.style.transition = 'transform 0.2s ease';
          this.style.transform = (this.style.transform || '') + ' scale(1.01)';
        }
      });
      
      element.addEventListener('mouseleave', function() {
        if (!this.classList.contains('no-hover-enhance')) {
          this.style.transform = this.style.transform.replace(' scale(1.01)', '');
        }
      });
    });
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRippleEffects);
} else {
  initializeRippleEffects();
}

// Re-initialize for dynamically added elements
function reinitializeRippleEffects() {
  initializeRippleEffects();
}

// Export for manual usage
window.RippleEffects = {
  create: createRippleEffect,
  initialize: initializeRippleEffects,
  reinitialize: reinitializeRippleEffects,
  getColor: getRippleColor
};