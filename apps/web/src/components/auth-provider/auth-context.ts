import { createContext, useContext } from 'react';
import type { AdminAccessTokenData } from '@/types';

export const tokenKey = 'user-auth-token';

export function getAuthTokenFromStorage() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

export type AuthContext = (
  | {
      token: string;
      auth: {
        user: AdminAccessTokenData;
      };
    }
  | { token: null; auth: null }
) & {
  authLoading: boolean;
  setToken: (token: string, persist: boolean) => void;
  clearToken: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
AuthContext.displayName = 'Auth Context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
