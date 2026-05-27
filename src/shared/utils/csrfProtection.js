import Cookies from 'js-cookie';

const CSRF_TOKEN_KEY = 'csrf_token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

/**
 * Generate CSRF token
 */
export const generateCSRFToken = () => {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  Cookies.set(CSRF_TOKEN_KEY, token, {
    secure: import.meta.env.PROD,
    sameSite: 'strict',
  });
  
  return token;
};

/**
 * Get CSRF token
 */
export const getCSRFToken = () => {
  let token = Cookies.get(CSRF_TOKEN_KEY);
  if (!token) {
    token = generateCSRFToken();
  }
  return token;
};

/**
 * Get CSRF header
 */
export const getCSRFHeader = () => ({
  [CSRF_HEADER_NAME]: getCSRFToken(),
});

/**
 * Validate CSRF token (client-side check)
 */
export const validateCSRFToken = (token) => {
  const storedToken = Cookies.get(CSRF_TOKEN_KEY);
  return token === storedToken;
};

/**
 * Clear CSRF token
 */
export const clearCSRFToken = () => {
  Cookies.remove(CSRF_TOKEN_KEY);
};
