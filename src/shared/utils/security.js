import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Unsanitized HTML string
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Validate and sanitize email
 * @param {string} email - Email address
 * @returns {string|null} - Sanitized email or null if invalid
 */
export const sanitizeEmail = (email) => {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : null;
};

/**
 * Validate and sanitize phone number
 * @param {string} phone - Phone number
 * @returns {string|null} - Sanitized phone or null if invalid
 */
export const sanitizePhone = (phone) => {
  const sanitized = sanitizeInput(phone);
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(sanitized) ? sanitized : null;
};

/**
 * Escape special characters for safe display
 * @param {string} str - Input string
 * @returns {string} - Escaped string
 */
export const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Validate URL to prevent open redirect attacks
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is safe
 */
export const isValidURL = (url) => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
};

/**
 * Rate limiting helper
 */
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  reset(key) {
    this.attempts.delete(key);
  }
}

export const loginRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes
export const apiRateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
