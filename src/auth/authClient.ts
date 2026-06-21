// 이 앱이 쓰는 기본 인증 클라이언트 인스턴스.
// baseUrl 은 환경변수 VITE_API_BASE(예: http://localhost:8080)에서 온다.
// 다른 백엔드를 붙이려면 createAuthClient 를 직접 호출해 별도 인스턴스를 만들면 된다.

import { createAuthClient } from './client';

export const authClient = createAuthClient({
  baseUrl: import.meta.env.VITE_API_BASE as string,
});
