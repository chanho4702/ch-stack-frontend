# myFornt — MSA Web Shell

MSA 서비스의 **프론트엔드 베이스 템플릿**입니다. 로그인 → 보호된 대시보드 → 게시판으로
이어지는 기본 골격이 갖춰져 있고, 여기에 자신의 서비스 화면을 붙여 나가면 됩니다.
모든 UI는 [Material UI (MUI) v9](https://mui.com/) 기반입니다.

> 작업 공간은 두 영역으로 나뉩니다.
> - **`src/app`** — 실제 내 서비스 코드 (여기에 기능을 추가)
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

---

## 화면 / 라우트

### 내 서비스 (`src/app`)
| 경로 | 화면 |
| --- | --- |
| `/login` | 로그인 (데모: 이메일 형식 + 비밀번호 6자 이상이면 통과) |
| `/app` | 대시보드 (보호됨) — 통계 카드 · 차트 · 데이터 그리드 |
| `/app/board` | 게시판 목록 — 검색 · 페이지네이션 |
| `/app/board/new` | 글쓰기 |
| `/app/board/:id` | 글 보기 (조회수 증가) |
| `/app/board/:id/edit` | 글 수정 |

> `/app` 이하는 로그인하지 않으면 `/login` 으로 리다이렉트됩니다.

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
├─ main.tsx                  # 라우터 + AuthProvider 진입점
│
├─ app/                      # ★ 내 서비스 (여기에 기능 추가)
│  ├─ auth/                  #   데모 인증 (localStorage) + ProtectedRoute
│  ├─ components/            #   앱 셸: AppLayout / AppSideMenu / AppNavbar / AppMenuContent
│  ├─ pages/                 #   LoginPage, DashboardHome
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

### 인증 (데모)
- `app/auth/AuthContext.tsx` — localStorage(`myfornt.auth.user`)에 로그인 상태만 저장합니다.
  형식만 맞으면 통과하는 **데모**이므로, 실제 백엔드 연동 시 `login`/`logout` 내부를 API 호출로
  교체하세요.
- `app/auth/ProtectedRoute.tsx` — 미로그인 시 `/login` 으로 보냅니다.

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
