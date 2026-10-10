import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check the saved token

  // On first load, try to restore the session from the stored token
  useEffect(() => {
    if (!localStorage.getItem('token')) return setLoading(false);
    api('/auth/me')
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const authenticate = async (mode, form) => {
    const data = await api(`/auth/${mode}`, { method: 'POST', body: form });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
