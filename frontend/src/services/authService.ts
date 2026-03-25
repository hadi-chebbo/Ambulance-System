import api from './api';
import type { LoginCredentials, LoginResponse, AuthTokens } from '../types/auth';
import type { User } from '../types/user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/login', credentials);
    localStorage.setItem('accessToken', data.access_token);
    return data;
  },

  async logout(): Promise<void> {
    try { await api.post('/logout'); }
    finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>('/me');
    return data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};