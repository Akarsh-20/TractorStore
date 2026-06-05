import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '../types/auth.types';

const BASE_URL = 'https://fakestoreapi.com';

// calls the login endpoint and returns the token
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, credentials);
  return res.data;
};
