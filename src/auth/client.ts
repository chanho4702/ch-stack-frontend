// 백엔드(oauth-oidc-login) 연동 인증 클라이언트 팩토리.
//
// 재사용 설계: 모듈 전역 싱글톤 대신 createAuthClient(config) 가 인스턴스마다
// 자기 상태(메모리 AT, in-flight refresh dedup)를 갖는다. 다른 프로젝트/백엔드는
// baseUrl 만 바꿔 새 인스턴스를 만들면 된다.

import type { AppUser, AuthClient, AuthClientConfig } from './types';
import { SignupError } from './types';

export function createAuthClient(config: AuthClientConfig): AuthClient {
  const baseUrl = config.baseUrl.replace(/\/+$/, '');

  // AT 는 이 인스턴스 메모리에만. 새로고침 시 tryRefresh 로 복원.
  let accessToken: string | null = null;

  // 동시 다발 refresh 합치기(in-flight dedup).
  // RT 회전+재사용탐지 환경에서, AuthProvider 부트스트랩 + OAuthCallback + StrictMode
  // 이중 실행이 같은 RT로 동시에 /refresh 를 치면 "재사용=도난"으로 오인돼 family 가
  // 폭파된다. 진행 중 요청이 있으면 그 Promise 를 공유해 네트워크 호출을 1번으로 만든다.
  let refreshInFlight: Promise<boolean> | null = null;

  function getAccessToken(): string | null {
    return accessToken;
  }
  function setAccessToken(token: string | null): void {
    accessToken = token;
  }

  function googleLoginUrl(): string {
    return `${baseUrl}/oauth2/authorization/google`;
  }

  async function rawFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers);
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
    return fetch(`${baseUrl}${path}`, { ...init, headers, credentials: 'include' });
  }

  async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
    let res = await rawFetch(path, init);
    if (res.status === 401 && (await tryRefresh())) {
      res = await rawFetch(path, init);
    }
    return res;
  }

  function tryRefresh(): Promise<boolean> {
    if (refreshInFlight) return refreshInFlight;
    refreshInFlight = (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) {
          setAccessToken(null);
          return false;
        }
        const body = await res.json();
        if (typeof body.accessToken !== 'string' || !body.accessToken) {
          setAccessToken(null);
          return false;
        }
        setAccessToken(body.accessToken);
        return true;
      } finally {
        refreshInFlight = null;
      }
    })();
    return refreshInFlight;
  }

  async function login(email: string, password: string): Promise<void> {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    if (!res.ok) {
      throw new Error('로그인 실패');
    }
    const body = await res.json();
    if (typeof body.accessToken !== 'string' || !body.accessToken) {
      throw new Error('로그인 응답에 accessToken 이 없습니다');
    }
    setAccessToken(body.accessToken);
  }

  async function signup(email: string, password: string): Promise<void> {
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    if (!res.ok) {
      if (res.status === 409) {
        throw new SignupError('이미 가입된 이메일입니다.', true);
      }
      const message = await readErrorMessage(res, '회원가입에 실패했습니다.');
      throw new SignupError(message, false);
    }
    // 가입 성공 → 곧바로 로그인까지(자동 로그인).
    await login(email, password);
  }

  async function fetchMe(): Promise<AppUser> {
    const res = await apiFetch('/api/me');
    if (!res.ok) throw new Error('사용자 정보 조회 실패');
    return (await res.json()) as AppUser;
  }

  async function logout(): Promise<void> {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setAccessToken(null);
    }
  }

  return {
    getAccessToken,
    setAccessToken,
    googleLoginUrl,
    apiFetch,
    tryRefresh,
    login,
    signup,
    fetchMe,
    logout,
  };
}

/** 백엔드 에러 본문에서 사람이 읽을 메시지를 best-effort 로 뽑는다. */
async function readErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    if (body && typeof body.message === 'string' && body.message) return body.message;
  } catch {
    /* JSON 이 아니면 fallback */
  }
  return fallback;
}
