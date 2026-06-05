import axiosInstance from './axiosInstance';
import type { LoginCredentials, AuthResponse } from '../types/auth.types';

// calls the login endpoint and returns the token
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return res.data;
};
