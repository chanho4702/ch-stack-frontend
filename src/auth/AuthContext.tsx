import * as React from 'react';
import type { AppUser, AuthClient } from './types';
import { authClient as defaultClient } from './authClient';

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  completeOAuthLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

/**
 * 인증 상태 컨텍스트.
 *
 * 재사용: client 를 주입받는다(기본은 이 앱의 authClient). 다른 백엔드를 쓰려면
 * createAuthClient 로 만든 인스턴스를 <AuthProvider client={...}> 로 넘기면 된다.
 */
export function AuthProvider({
  children,
  client = defaultClient,
}: {
  children: React.ReactNode;
  client?: AuthClient;
}) {
  const [user, setUser] = React.useState<AppUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  // 앱 로드 시 RT 쿠키로 silent 세션 복원.
  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (await client.tryRefresh()) {
          const me = await client.fetchMe();
          if (active) setUser(me);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [client]);

  const loginWithPassword = React.useCallback(
    async (email: string, password: string) => {
      await client.login(email, password);
      setUser(await client.fetchMe());
    },
    [client],
  );

  const signUp = React.useCallback(
    async (email: string, password: string) => {
      await client.signup(email, password); // 가입 + 자동 로그인
      setUser(await client.fetchMe());
    },
    [client],
  );

  const completeOAuthLogin = React.useCallback(async () => {
    const ok = await client.tryRefresh();
    if (!ok) throw new Error('OAuth 세션 복원 실패');
    setUser(await client.fetchMe());
  }, [client]);

  const logout = React.useCallback(async () => {
    await client.logout();
    setUser(null);
  }, [client]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      loginWithPassword,
      signUp,
      completeOAuthLogin,
      logout,
    }),
    [user, loading, loginWithPassword, signUp, completeOAuthLogin, logout],
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
