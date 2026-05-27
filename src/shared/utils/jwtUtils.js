/**
 * JWT Token Utility Functions
 */

/**
 * Parse JWT token and extract payload
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded payload or null
 */
export const parseJWT = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

/**
 * Check if JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired
 */
export const isJWTExpired = (token) => {
  try {
    const payload = parseJWT(token);
    if (!payload?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return now >= payload.exp;
  } catch {
    return true;
  }
};

/**
 * Get remaining time until token expires
 * @param {string} token - JWT token
 * @returns {number} - Seconds until expiry, or 0 if expired
 */
export const getJWTTimeRemaining = (token) => {
  try {
    const payload = parseJWT(token);
    if (!payload?.exp) return 0;
    const now = Math.floor(Date.now() / 1000);
    const remaining = payload.exp - now;
    return remaining > 0 ? remaining : 0;
  } catch {
    return 0;
  }
};

/**
 * Validate JWT token structure
 * @param {string} token - JWT token
 * @returns {boolean} - True if valid structure
 */
export const isValidJWT = (token) => {
  try {
    if (!token || typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    // Try to decode header and payload
    JSON.parse(atob(parts[0]));
    JSON.parse(atob(parts[1]));
    return true;
  } catch {
    return false;
  }
};

/**
 * Get user info from JWT token
 * @param {string} token - JWT token
 * @returns {object|null} - User info or null
 */
export const getUserFromJWT = (token) => {
  const payload = parseJWT(token);
  if (!payload) return null;
  
  return {
    userId: payload.userId || payload.sub,
    email: payload.sub || payload.email,
    role: payload.role,
    tenantId: payload.tenantId,
    loginType: payload.loginType,
    issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
    expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
  };
};

/**
 * Check if token needs refresh (expires in less than 5 minutes)
 * @param {string} token - JWT token
 * @returns {boolean} - True if needs refresh
 */
export const shouldRefreshJWT = (token) => {
  const remaining = getJWTTimeRemaining(token);
  return remaining > 0 && remaining < 300; // Less than 5 minutes
};
