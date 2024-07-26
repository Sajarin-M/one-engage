import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AdminAccessTokenData } from '@/types';
import { AuthContext, getAuthTokenFromStorage, tokenKey } from './auth-context';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, _setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    _setToken(getAuthTokenFromStorage());
    setAuthLoading(false);

    const listener = (event: StorageEvent) => {
      if (
        (event.storageArea === localStorage || event.storageArea === sessionStorage) &&
        event.key === tokenKey &&
        event.newValue
      ) {
        _setToken(event.newValue);
      }
    };

    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, []);

  const user = useMemo(() => {
    try {
      if (token) {
        const tokenData = jwtDecode(token) as AdminAccessTokenData;
        return tokenData;
      }
    } catch (error) {}
    return null;
  }, [token]);

  const setToken: AuthContext['setToken'] = (token, persist) => {
    window[persist ? 'localStorage' : 'sessionStorage'].setItem(tokenKey, token);
    _setToken(token);
  };

  const clearToken: AuthContext['clearToken'] = () => {
    window.localStorage.removeItem(tokenKey);
    window.sessionStorage.removeItem(tokenKey);
    _setToken('');
  };

  return (
    <AuthContext.Provider
      value={
        { auth: user ? { user } : null, token, setToken, clearToken, authLoading } as AuthContext
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
