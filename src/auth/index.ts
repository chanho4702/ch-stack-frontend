// auth 모듈 공개 표면.
export { AuthProvider, useAuth } from './AuthContext';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as GuestRoute } from './GuestRoute';
export { createAuthClient } from './client';
export { authClient } from './authClient';
export type { AppUser, AuthClient, AuthClientConfig } from './types';

import { authClient } from './authClient';
/** LoginPage 의 "로그인" 버튼이 쓰는 편의 함수. */
export const loginUrl = () => authClient.loginUrl();
/** LoginPage 의 "Google 로그인" 버튼이 쓰는 편의 함수. */
export const googleLoginUrl = () => authClient.googleLoginUrl();
export { rememberReturnTo, RETURN_TO_COOKIE } from './returnTo';
