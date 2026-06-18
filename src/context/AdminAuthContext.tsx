import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Use a simple session persistence
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password: string) => {
    // In a real app, this would be a server-side hash check
    // Using environment variable for simple configuration
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAuthenticated, 
      loading, 
      login, 
      logout 
    }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
