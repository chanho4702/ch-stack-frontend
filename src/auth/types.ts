// auth 모듈 공용 타입. 이 모듈을 다른 프로젝트로 복사할 때 이 파일만 보면
// 백엔드 계약(사용자 형태/설정 키)을 알 수 있다.

/** 로그인한 사용자. 백엔드 GET /api/me 응답 스키마와 1:1. */
export interface AppUser {
  email: string;
  name?: string;
  provider?: string; // "LOCAL" | "GOOGLE"
  sub?: string;
  role?: string;
}

/** createAuthClient 설정. 다른 백엔드/프로젝트는 baseUrl 만 바꿔 끼우면 된다. */
export interface AuthClientConfig {
  /** 백엔드 오리진. 예: http://localhost:8080 (끝 슬래시는 자동 제거) */
  baseUrl: string;
}

/**
 * 한 백엔드에 대한 인증 클라이언트 인스턴스.
 * AT(Access Token)는 인스턴스 메모리에만 보관하고, RT(Refresh Token)는
 * 백엔드가 심는 HttpOnly 쿠키라 여기서 직접 다루지 않는다.
 */
export interface AuthClient {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  /** 브라우저를 백엔드 OAuth 시작점으로 보낼 때 쓰는 URL. */
  googleLoginUrl(): string;
  /** Authorization 헤더 자동 첨부 + 401 시 1회 refresh 후 재시도하는 fetch. */
  apiFetch(path: string, init?: RequestInit): Promise<Response>;
  /** RT 쿠키로 새 AT 획득(동시 호출은 1요청으로 합침). 성공 시 true. */
  tryRefresh(): Promise<boolean>;
  /** 폼 로그인. 성공 시 AT 를 인스턴스에 저장. */
  login(email: string, password: string): Promise<void>;
  /** 회원가입 후 곧바로 로그인까지 수행(자동 로그인). */
  signup(email: string, password: string): Promise<void>;
  /** 현재 AT 로 사용자 정보 조회. */
  fetchMe(): Promise<AppUser>;
  /** 백엔드 로그아웃(RT 무효화 + AT 블랙리스트) 후 AT 비움. */
  logout(): Promise<void>;
}

/** 회원가입 실패 원인(페이지에서 메시지 분기용). */
export class SignupError extends Error {
  constructor(
    message: string,
    /** true 면 이미 존재하는 이메일(HTTP 409). */
    readonly conflict: boolean,
  ) {
    super(message);
    this.name = 'SignupError';
  }
}
