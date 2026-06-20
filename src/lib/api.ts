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

export async function tryRefresh(): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    setAccessToken(null);
    return false;
  }
  const body = await res.json();
  setAccessToken(body.accessToken as string);
  return true;
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
  setAccessToken(body.accessToken as string);
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
