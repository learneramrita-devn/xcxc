import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  const login = useCallback((token, refreshToken, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('userRole', role || '');
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
