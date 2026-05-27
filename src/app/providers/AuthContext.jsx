import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { parseJWT, isJWTExpired, getUserFromJWT } from '../../shared/utils/jwtUtils';
import { getAccessToken, getRefreshToken, storeTokens, storeUserMetadata, clearAuthData } from '../../shared/utils/tokenStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = getAccessToken();
    return token && !isJWTExpired(token);
  });
  
  const [user, setUser] = useState(() => {
    const token = getAccessToken();
    if (!token || isJWTExpired(token)) {
      clearAuthData();
      return null;
    }
    return getUserFromJWT(token);
  });

  const login = useCallback((token, refreshToken, role, userId, tenantId, rememberMe = false) => {
    console.log('=== AUTH CONTEXT LOGIN ===');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('Token expired:', token ? isJWTExpired(token) : 'N/A');
    console.log('Role:', role);
    console.log('User ID:', userId);
    console.log('Tenant ID:', tenantId);
    
    if (!token || isJWTExpired(token)) {
      console.error('Token validation failed!');
      return false;
    }
    
    console.log('Storing tokens...');
    storeTokens(token, refreshToken, rememberMe);
    storeUserMetadata(userId, role, tenantId);
    
    console.log('Setting login state...');
    setIsLoggedIn(true);
    setUser(getUserFromJWT(token));
    
    console.log('Login successful, state updated');
    return true;
  }, []);

  const logout = useCallback(() => {
    clearAuthData();
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = getAccessToken();
      if (token && isJWTExpired(token)) {
        logout();
      }
    };
    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
