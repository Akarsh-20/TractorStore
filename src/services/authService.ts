import axiosInstance from './axiosInstance';
import type { LoginCredentials, AuthResponse } from '../types/auth.types';

const LOCAL_USERS_KEY = 'tractor_local_users';

const getLocalUsers = (): LoginCredentials[] => {
  const data = localStorage.getItem(LOCAL_USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // 1. Check local storage first for user-created accounts
  const localUsers = getLocalUsers();
  const foundUser = localUsers.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );

  if (foundUser) {
    // Return a mock token for local users
    return { token: `local_token_${Date.now()}` };
  }

  // 2. Fall back to the Fake Store API
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const signup = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const localUsers = getLocalUsers();
  
  // Check if username already exists locally
  if (localUsers.some((u) => u.username === credentials.username)) {
    throw new Error('Username already exists');
  }

  // Save the new user to local storage
  localUsers.push(credentials);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers));

  // Automatically "log them in" by returning a mock token
  return { token: `local_token_${Date.now()}` };
};
