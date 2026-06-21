// 백엔드(oauth-oidc-login) 연동 fetch 래퍼.
// AT는 메모리에만 보관(새로고침 시 /refresh 로 복원). RT는 백엔드 HttpOnly 쿠키.

const API_BASE = import.meta.env.VITE_API_BASE as string;

export interface AppUser {
  email: string;
  name?: string;
  provider?: string;
  sub?: string;
  role?: string;
}

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}
export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function googleLoginUrl(): string {
  return `${API_BASE}/oauth2/authorization/google`;
}

async function rawFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  return fetch(`${API_BASE}${path}`, { ...init, headers, credentials: 'include' });
}

// 401 이면 1회 refresh 후 재시도.
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  let res = await rawFetch(path, init);
  if (res.status === 401 && (await tryRefresh())) {
    res = await rawFetch(path, init);
  }
  return res;
}

// 동시 다발 refresh 합치기(in-flight dedup).
// RT 회전+재사용탐지 환경에서, AuthProvider 부트스트랩 + OAuthCallback + StrictMode 이중 실행이
// 같은 RT로 동시에 /refresh 를 치면 "재사용=도난"으로 오인돼 family 가 폭파된다.
// 진행 중인 요청이 있으면 그 Promise 를 공유해 네트워크 호출을 1번으로 만든다.
let refreshInFlight: Promise<boolean> | null = null;

export function tryRefresh(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh`, {
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

export async function loginWithPassword(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
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

export async function fetchMe(): Promise<AppUser> {
  const res = await apiFetch('/api/me');
  if (!res.ok) throw new Error('사용자 정보 조회 실패');
  return (await res.json()) as AppUser;
}

export async function logout(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } finally {
    setAccessToken(null);
  }
}
