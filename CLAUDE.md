# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 하네스: 기능 화면 빌드

**목표:** board 패턴을 본떠 새 기능 화면(store + 페이지 + 라우트/메뉴/브레드크럼 배선)을 생성-검증 에이전트 팀으로 추가한다.

**트리거:** 새 기능/화면/페이지 추가, CRUD 화면, "게시판처럼 ~" 같은 요청(및 그 후속 수정·재실행) 시 `add-feature-screen` 스킬을 사용하라. 단순 질문(파일 위치, 사용법)은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-20 | 초기 구성 (feature-builder + integration-qa 팀, feature-scaffold·mui-v9-usage·integration-check·add-feature-screen 스킬) | 전체 | - |

## Commands

```bash
npm run dev      # Vite dev server with HMR → http://localhost:5173 (NOT VSCode Live Server)
npm run build    # tsc -b (typecheck) && vite build — typecheck is part of build, so it gates builds
npm run preview  # serve the production build locally
```

There is no test runner, linter, or formatter configured. Type errors are the primary build gate
(`tsc -b` with `strict`, `noUnusedLocals`, `noUnusedParameters`). Requires Node 20+ (24 recommended).

## Architecture

This is a React 19 + MUI v9 + Vite frontend template — a "web shell" meant to be forked and extended.
Routing is centralized in `src/main.tsx` (`createBrowserRouter`); the whole tree is wrapped once in
`AuthProvider`.

### The `context` vs `app` split — the most important convention

- **`src/context/templates/`** holds the unmodified MUI v9 official templates (shared-theme, sign-in,
  sign-up, sign-in-side, dashboard). **Do not edit these.** Import and reuse pieces from here (theme,
  side-menu components, dashboard widgets) instead of duplicating them.
- **`src/app/`** is the real service code. Components like `AppLayout`/`AppSideMenu` are "my version" —
  they pull components out of `context/templates/dashboard` but wire in this app's routing and auth.
- `src/pages/` (Home hub, ComponentsCatalog, ComponentsShowcase) and `src/showcase/` are a component
  browser, separate from both.

### Reusable `src/auth/` module (OAuth + OIDC + 자체 JWT)

Self-contained auth module wired to the `oauth-oidc-login` backend. **Copy the whole `src/auth/`
folder into another project and only `VITE_API_BASE` (or `authClient.ts`'s `baseUrl`) needs to change.**
Always import from the barrel `src/auth` — never reach into internal files.

- `client.ts` — `createAuthClient({ baseUrl })` factory. Each instance owns its own in-memory access
  token + in-flight refresh dedup (no module-level singletons), so multiple backends can coexist.
  Methods: `login`/`signup`/`logout`/`refresh`/`fetchMe`/`apiFetch` (Bearer auto-attach + one 401→refresh
  retry)/`googleLoginUrl`. AT lives in memory; RT is the backend's HttpOnly cookie.
- `authClient.ts` — this app's default instance (`baseUrl: VITE_API_BASE`).
- `AuthContext.tsx` — `AuthProvider` (accepts an optional `client` prop, defaults to `authClient`) +
  `useAuth()` → `{ user, isAuthenticated, loading, loginWithPassword, signUp, completeOAuthLogin, logout }`.
  Silent session restore on load via `tryRefresh`.
- `ProtectedRoute.tsx` — holds a spinner during restore, then redirects unauthenticated users to `/login`.
- Real auth pages live in `src/app/pages/`: `LoginPage` (`/login`, form + Google), `SignUpPage`
  (`/register`, email + password×2, auto-login on success), `OAuthCallbackPage` (`/oauth/callback`).
  The MUI `/sign-in` `/sign-up` routes are untouched **reference** templates.

### Reusable `src/notifications/` module (toasts)

`NotificationProvider` (wraps the app in `main.tsx`) + `useNotify()` → `{ success, error, info, warning, show }`,
a queued MUI Snackbar/Alert. Copy the folder to reuse. Route-level errors render via `RouteErrorPage`
(`errorElement` on every route) and unknown paths hit `NotFoundPage` (`path: '*'`).

### Demo data layer (swap for a real API)

- `src/app/board/boardStore.ts` — full CRUD over `localStorage` key `myfornt.board.posts`
  (`listPosts`/`getPost`/`createPost`/`updatePost`/`deletePost`/`incrementViews`). Replace the function
  bodies with API calls.

### Theme

Light/dark/system color modes come from `context/templates/shared-theme/AppTheme` (MUI CSS variables)
+ `ColorModeIconDropdown`. `/app` wraps the theme **once** in `AppLayout`; standalone pages each wrap
themselves in `AppTheme`. `AppLayout` also merges the MUI X customizations (charts/data-grid/
date-pickers/tree-view) into the theme via `xThemeComponents`.

## Adding a feature page

Mirror the board feature:

1. Create `src/app/<feature>/` with its pages + store (copy `board/`).
2. Add routes under the `/app` children array in `src/main.tsx`.
3. Add a side-menu entry to `mainItems` in `src/app/components/AppMenuContent.tsx`.
4. (Optional) Add a path branch to `useCrumbs` in `src/app/components/AppLayout.tsx` for breadcrumbs.

## MUI v9 gotcha

System style props were **removed** from `Typography`, `Stack`, and `styled(Stack)`. Passing
`fontWeight`, `alignItems`, `justifyContent`, etc. as direct props is a build error (TS2769/TS2322) —
put them inside `sx={{ ... }}`.

```tsx
// ❌ <Typography fontWeight={600} />        <Stack justifyContent="center" />
// ✅ <Typography sx={{ fontWeight: 600 }} /> <Stack sx={{ justifyContent: 'center' }} />
```

`Stack`'s `direction`/`spacing`/`useFlexGap` still work as direct props. The new `Grid` uses
`size={{ xs: 12 }}`, not `item xs`.
