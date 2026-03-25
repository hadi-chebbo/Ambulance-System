import React, { createContext, useCallback, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types/auth';
import type { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      if (authService.isAuthenticated()) {
        try { setUser(await authService.getMe()); }
        catch { setUser(null); }
      }
      setIsLoading(false);
    };
    restore();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user: loggedInUser } = await authService.login(credentials);
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};