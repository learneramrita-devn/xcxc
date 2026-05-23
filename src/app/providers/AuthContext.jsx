import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const parseToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch { return {}; }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? parseToken(token) : null;
  });

  const login = useCallback((token, refreshToken, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('userRole', role || '');
    setIsLoggedIn(true);
    setUser(parseToken(token));
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
