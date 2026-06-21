import * as React from 'react';
import * as api from '../../lib/api';
import type { AppUser } from '../../lib/api';

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  completeOAuthLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AppUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  // 앱 로드 시 RT 쿠키로 silent 세션 복원.
  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (await api.tryRefresh()) {
          const me = await api.fetchMe();
          if (active) setUser(me);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const loginWithPassword = React.useCallback(async (email: string, password: string) => {
    await api.loginWithPassword(email, password);
    setUser(await api.fetchMe());
  }, []);

  const completeOAuthLogin = React.useCallback(async () => {
    const ok = await api.tryRefresh();
    if (!ok) throw new Error('OAuth 세션 복원 실패');
    setUser(await api.fetchMe());
  }, []);

  const logout = React.useCallback(async () => {
    await api.logout();
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      loginWithPassword,
      completeOAuthLogin,
      logout,
    }),
    [user, loading, loginWithPassword, completeOAuthLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
