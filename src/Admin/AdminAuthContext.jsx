import { createContext, useContext, useState, useEffect } from 'react';
import { authLogin, authGetMe } from '../services/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('ct_admin_token'));
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('ct_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('ct_admin_token');
      if (storedToken) {
        try {
          const res = await authGetMe();
          setAdmin(res.admin);
          localStorage.setItem('ct_admin_user', JSON.stringify(res.admin));
        } catch (err) {
          console.warn('Admin token expired or invalid:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (username, password) => {
    const res = await authLogin(username, password);
    setToken(res.token);
    setAdmin(res.admin);
    localStorage.setItem('ct_admin_token', res.token);
    localStorage.setItem('ct_admin_user', JSON.stringify(res.admin));
    return res;
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('ct_admin_token');
    localStorage.removeItem('ct_admin_user');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        admin,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
