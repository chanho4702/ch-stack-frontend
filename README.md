# myFornt — MSA Web Shell

MSA 서비스의 **프론트엔드 베이스 템플릿**입니다. 회원가입 / 로그인 → 보호된 대시보드 →
게시판으로 이어지는 기본 골격이 갖춰져 있고, 여기에 자신의 서비스 화면을 붙여 나가면 됩니다.
인증은 백엔드 [`oauth-oidc-login`](#백엔드-연동-인증)(OAuth2 + Google OIDC + 자체 JWT)에
실제로 연동돼 있습니다. 모든 UI는 [Material UI (MUI) v9](https://mui.com/) 기반입니다.

> 작업 공간은 네 영역으로 나뉩니다.
> - **`src/app`** — 실제 내 서비스 코드 (여기에 기능을 추가)
> - **`src/auth`** — 재사용 인증 모듈 (폴더째 복사해 다른 프로젝트에서 재사용)
> - **`src/notifications`** — 재사용 토스트 알림 모듈
> - **`src/context`** — MUI 공식 템플릿 원본 (참고/재사용용, 수정하지 않음)

---

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| 빌드 | [Vite 6](https://vite.dev/) + `@vitejs/plugin-react` |
| 언어 | TypeScript 5.7 (strict) |
| UI | React 19, MUI v9 (`@mui/material`, `@mui/icons-material`) |
| MUI X | `@mui/x-charts`, `-data-grid`, `-date-pickers`, `-tree-view` (v9) |
| 라우팅 | `react-router-dom` v7 |
| 기타 | `dayjs`, `@react-spring/web`, Emotion |

**요구 사항: Node 20+ (권장 24).**

---

## 빠른 시작

```bash
npm install        # 의존성 설치
npm run dev        # 개발 서버 → http://localhost:5173
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | Vite 개발 서버 (HMR). VSCode Live Server 아님 |
| `npm run build` | `tsc -b && vite build` (타입체크 + 프로덕션 빌드) |
| `npm run preview` | 빌드 결과 미리보기 |

> **백엔드가 필요합니다.** 인증이 실제로 동작하려면 `oauth-oidc-login` 백엔드가 떠 있어야 합니다.
> 연동 주소는 `.env` 의 `VITE_API_BASE` 로 지정합니다 (기본 `http://localhost:8080`).
>
> ```bash
> # .env
> VITE_API_BASE=http://localhost:8080
> ```

---

## 화면 / 라우트

### 내 서비스 (`src/app`)
| 경로 | 화면 |
| --- | --- |
| `/login` | 로그인 — 이메일/비밀번호 폼 + Google 계정 로그인 |
| `/register` | 회원가입 — 이메일 + 비밀번호 + 비밀번호 확인 (성공 시 자동 로그인) |
| `/app` | 대시보드 (보호됨) — 통계 카드 · 차트 · 데이터 그리드 |
| `/app/board` | 게시판 목록 — 검색 · 페이지네이션 |
| `/app/board/new` | 글쓰기 |
| `/app/board/:id` | 글 보기 (조회수 증가) |
| `/app/board/:id/edit` | 글 수정 |

> `/app` 이하는 로그인하지 않으면 `/login` 으로 리다이렉트됩니다.
> 매칭되지 않는 경로는 **404 페이지**, 렌더링 중 오류는 **오류 페이지**(`RouteErrorPage`)로 잡힙니다.

> **데모 계정** (백엔드가 시드): `user@demo.com` / `password`, `admin@demo.com` / `admin`.
> Google 로그인은 백엔드에 `GOOGLE_CLIENT_ID/SECRET` 환경변수가 설정돼 있어야 동작합니다.

### 허브 & 컴포넌트 브라우저 (`src/pages`)
| 경로 | 화면 |
| --- | --- |
| `/` | 랜딩 허브 (각 화면으로 이동하는 카드) |
| `/showcase` | **라이브 컴포넌트 쇼케이스** — 실제 동작하는 MUI 예제 모음 |
| `/components` | **컴포넌트 카탈로그** — 전체 MUI 컴포넌트 + 공식 문서 링크 |

### 참고용 원본 템플릿 (`src/context`)
MUI 공식 템플릿을 그대로 둔 레퍼런스입니다: `/sign-in`, `/sign-up`, `/sign-in-side`, `/dashboard`.

---

## 디렉터리 구조

```
src/
├─ main.tsx                  # 라우터 + AuthProvider + NotificationProvider 진입점
│
├─ auth/                     # ★ 재사용 인증 모듈 (폴더째 복사 가능)
│  ├─ client.ts              #   createAuthClient({ baseUrl }) 팩토리 (login/signup/logout/refresh/…)
│  ├─ authClient.ts          #   이 앱의 기본 인스턴스 (VITE_API_BASE)
│  ├─ AuthContext.tsx        #   AuthProvider + useAuth
│  ├─ ProtectedRoute.tsx     #   미로그인 시 /login 으로 가드
│  └─ index.ts               #   공개 표면 (배럴) — 항상 여기서 import
│
├─ notifications/            # ★ 재사용 토스트 모듈 (폴더째 복사 가능)
│  └─ NotificationProvider.tsx   # NotificationProvider + useNotify (MUI Snackbar/Alert)
│
├─ app/                      # ★ 내 서비스 (여기에 기능 추가)
│  ├─ components/            #   앱 셸: AppLayout / AppSideMenu / AppNavbar / AppMenuContent
│  ├─ pages/                 #   LoginPage, SignUpPage, NotFoundPage, RouteErrorPage, DashboardHome
│  └─ board/                 #   게시판 CRUD (boardStore + List/Detail/Form)
│
├─ context/templates/        # ★ MUI 공식 템플릿 원본 (참고용, 수정 금지)
│  ├─ shared-theme/          #   AppTheme, 색상모드, 테마 커스터마이즈
│  ├─ sign-in / sign-up / sign-in-side
│  └─ dashboard/             #   사이드메뉴·차트·데이터그리드 등 구성요소
│
├─ pages/                    # 허브(Home) + 컴포넌트 브라우저
├─ showcase/                 # /showcase 의 카테고리별 라이브 예제
└─ data/components.ts        # /components 카탈로그 데이터
```

---

## 아키텍처 메모

### `context` vs `app`
- **`src/context/templates`** 는 MUI v9 공식 템플릿 원본입니다. **수정하지 않고** 필요한 부분만
  `import` 해서 재사용합니다 (테마, 사이드메뉴 구성요소, 대시보드 위젯 등).
- **`src/app`** 이 실제 서비스 코드입니다. 예를 들어 `AppLayout`/`AppSideMenu` 는 참고 대시보드의
  구성요소를 가져다 쓰되 라우팅·인증을 연결한 "내 버전"입니다.

### 백엔드 연동 인증
백엔드 `oauth-oidc-login` 에 실제 연동된 인증입니다. **Access Token(AT)은 메모리에만** 두고,
**Refresh Token(RT)은 백엔드가 심는 HttpOnly 쿠키**라 프론트에서 직접 다루지 않습니다. 새로고침하면
RT 쿠키로 silent refresh 해 세션을 복원합니다.

- `auth/client.ts` — `createAuthClient({ baseUrl })` 팩토리. 인스턴스마다 자기 AT·refresh 합치기
  (in-flight dedup)를 가져 모듈 전역 싱글톤이 없습니다. 메서드: `login` / `signup`(가입 후 자동 로그인) /
  `logout` / `tryRefresh` / `fetchMe` / `apiFetch`(Bearer 자동 첨부 + 401 → refresh 1회 재시도) /
  `googleLoginUrl`.
- `auth/AuthContext.tsx` — `useAuth()` → `{ user, isAuthenticated, loading, loginWithPassword, signUp,
  completeOAuthLogin, logout }`. `AuthProvider` 는 `client` 를 주입받을 수 있어(기본은 이 앱 인스턴스)
  다른 백엔드에 붙일 때 baseUrl 만 바꾸면 됩니다.
- `auth/ProtectedRoute.tsx` — 세션 복원 중에는 스피너, 끝나면 미로그인 시 `/login` 으로 보냅니다.

> **재사용:** `src/auth` 폴더를 다른 프로젝트로 통째로 복사하고 `VITE_API_BASE`(또는 `authClient.ts`
> 의 `baseUrl`)만 맞추면 그대로 동작합니다. import 는 항상 배럴(`src/auth`)에서 하세요.

### 알림 / 에러 처리
- `notifications/NotificationProvider.tsx` — `useNotify()` → `success` / `error` / `info` / `warning`.
  큐형 MUI Snackbar/Alert 토스트입니다. 로그인·회원가입·OAuth 실패 시 토스트로 알립니다.
- `app/pages/RouteErrorPage.tsx` — 모든 라우트의 `errorElement`. 렌더링 예외를 흰 화면 대신 오류
  페이지로 잡습니다.
- `app/pages/NotFoundPage.tsx` — 매칭되지 않는 경로(`*`)의 404 페이지.

### 게시판 데이터
- `app/board/boardStore.ts` 가 localStorage(`myfornt.board.posts`)로 CRUD를 처리합니다
  (`listPosts` / `getPost` / `createPost` / `updatePost` / `deletePost` / `incrementViews`).
  마찬가지로 추후 이 함수 내부를 API로 교체하면 화면 수정 없이 백엔드에 연결됩니다.

### 테마
- 라이트/다크/시스템 색상 모드는 `shared-theme/AppTheme` (MUI CSS 변수) + `ColorModeIconDropdown`
  으로 동작합니다. `/app` 은 `AppLayout` 에서 테마를 **한 번만** 감싸고, 나머지 페이지는 각자
  `AppTheme` 로 감쌉니다.

---

## 새 기능(페이지) 추가하는 법

게시판을 그대로 본떠 추가하면 됩니다.

1. `src/app/<feature>/` 에 페이지/스토어를 만든다 (`board/` 참고).
2. `src/main.tsx` 의 `/app` 하위 `children` 에 라우트를 추가한다.
3. `src/app/components/AppMenuContent.tsx` 의 `mainItems` 에 사이드 메뉴 항목을 추가한다.
4. (선택) 브레드크럼이 필요하면 `AppLayout.tsx` 의 `useCrumbs` 에 경로 분기를 추가한다.

---

## MUI v9 주의사항

`Typography` · `Stack` · `styled(Stack)` 에서 **시스템 스타일 props 가 제거**되었습니다.
`fontWeight`, `alignItems`, `justifyContent` 등은 직접 prop 으로 넘기면 빌드 에러(TS2769/TS2322)가
납니다. **`sx={{ ... }}` 안에 넣으세요.**

```tsx
// ❌ <Typography fontWeight={600} />        <Stack justifyContent="center" />
// ✅ <Typography sx={{ fontWeight: 600 }} /> <Stack sx={{ justifyContent: 'center' }} />
```

- `Stack` 의 `direction` / `spacing` / `useFlexGap` 는 그대로 사용 가능합니다.
- 새 `Grid` 는 `size={{ xs: 12 }}` 를 씁니다 (`item xs` 아님).

---

## 라이선스 / 출처

`src/context/templates` 는 [MUI 공식 템플릿](https://github.com/mui/material-ui)(MIT)을 기반으로 합니다.
