import { createContext, useState, ReactNode } from 'react';
import type { AuthContextType, LoginCredentials } from '../types/auth.types';
import { login as loginService, signup as signupService } from '../services/authService';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // load token from storage on first render
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('tractor_token')
  );

  const login = async (credentials: LoginCredentials) => {
    const data = await loginService(credentials);
    setToken(data.token);
    localStorage.setItem('tractor_token', data.token);
  };

  const signup = async (credentials: LoginCredentials) => {
    const data = await signupService(credentials);
    setToken(data.token);
    localStorage.setItem('tractor_token', data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('tractor_token');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
