import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLE_KEY = 'userRole';
const USER_ID_KEY = 'userId';
const TENANT_ID_KEY = 'tenantId';
const DEVICE_ID_KEY = 'deviceId';

// Cookie options for secure storage
const getCookieOptions = (rememberMe = false) => ({
  secure: import.meta.env.PROD, // HTTPS only in production
  sameSite: 'strict', // CSRF protection
  expires: rememberMe ? 30 : undefined, // 30 days if remember me, session otherwise
});

/**
 * Store authentication tokens securely
 */
export const storeTokens = (accessToken, refreshToken, rememberMe = false) => {
  const options = getCookieOptions(rememberMe);
  
  // Store in httpOnly cookies (preferred) - requires backend support
  // For now, using secure cookies with JS access
  Cookies.set(TOKEN_KEY, accessToken, options);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, options);
  
  // Fallback to localStorage for compatibility
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Get access token from storage
 */
export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY) || 
         sessionStorage.getItem(TOKEN_KEY) || 
         localStorage.getItem(TOKEN_KEY);
};

/**
 * Get refresh token from storage
 */
export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY) || 
         sessionStorage.getItem(REFRESH_TOKEN_KEY) || 
         localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Store user metadata
 */
export const storeUserMetadata = (userId, role, tenantId) => {
  const data = { userId, role, tenantId, timestamp: Date.now() };
  sessionStorage.setItem('userMeta', JSON.stringify(data));
  localStorage.setItem(USER_ROLE_KEY, role);
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(TENANT_ID_KEY, tenantId);
};

/**
 * Get user metadata
 */
export const getUserMetadata = () => {
  try {
    const data = sessionStorage.getItem('userMeta');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  // Clear cookies
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  
  // Clear storage
  localStorage.clear();
  sessionStorage.clear();
};

/**
 * Generate and store device ID for device tracking
 */
export const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
};

/**
 * Get device and browser information
 */
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  return {
    deviceId: getOrCreateDeviceId(),
    browser: getBrowserName(ua),
    os: getOSName(ua),
    isMobile: /Mobile|Android|iPhone/i.test(ua),
    timestamp: new Date().toISOString(),
  };
};

const getBrowserName = (ua) => {
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
};

const getOSName = (ua) => {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  return 'Unknown';
};
