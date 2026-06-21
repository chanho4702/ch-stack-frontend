// auth 모듈 공개 표면.
// 소비자는 항상 'src/auth' 에서만 import 한다(내부 파일 직접 import 금지).
// 다른 프로젝트로 옮길 때는 이 폴더(src/auth)를 통째로 복사하고
// VITE_API_BASE(또는 authClient.ts 의 baseUrl)만 맞추면 된다.

export { AuthProvider, useAuth } from './AuthContext';
export { default as ProtectedRoute } from './ProtectedRoute';
export { createAuthClient } from './client';
export { authClient } from './authClient';
export { SignupError } from './types';
export type { AppUser, AuthClient, AuthClientConfig } from './types';

import { authClient } from './authClient';
/** LoginPage/SignUpPage 의 "Google 로그인" 버튼이 쓰는 편의 함수. */
export const googleLoginUrl = () => authClient.googleLoginUrl();
