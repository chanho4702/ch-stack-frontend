---
name: feature-scaffold
description: myFront 템플릿에 새 기능 화면을 board 패턴 그대로 추가하는 절차와 코드 템플릿. localStorage 스토어 + 목록/상세/폼 페이지 생성, 그리고 라우트(main.tsx)·사이드메뉴(AppMenuContent)·브레드크럼(AppLayout) 4곳 배선. "새 기능/화면/페이지 추가", "CRUD 화면 만들어줘", "게시판처럼 ~ 만들어줘" 같은 요청 시 반드시 이 스킬을 따른다.
---

# 기능 화면 스캐폴딩 (myFront)

새 기능 화면은 **board 기능(`src/app/board/`)을 그대로 본떠** 만든다. 구조를 즉흥적으로
바꾸지 않는다 — 일관성이 이 템플릿의 핵심이다. MUI 문법은 `mui-v9-usage` 스킬을 따른다.

## 작업 위치 규칙

- 기능 코드는 전부 `src/app/<feature>/` 아래에 만든다.
- `src/context/templates/`는 **절대 수정하지 않는다.** 테마·위젯이 필요하면 import만 한다.
- 인증/데이터는 데모 seam을 쓴다: `useAuth()`(로그인 사용자), 기능별 store(localStorage).
  추후 이 store 함수 내부를 실제 API로 교체하면 화면 수정 없이 백엔드에 붙는다.

## 절차 (board를 정답지로)

기능명을 `<feature>`(예: `notice`), 컴포넌트 접두사를 `<Feature>`(예: `Notice`)로 둔다.

1. **스토어** `src/app/<feature>/<feature>Store.ts`
   - `STORAGE_KEY = 'myfornt.<feature>.items'` (board는 `myfornt.board.posts`)
   - `interface <Entity>` + `interface <Entity>Input` 정의
   - `read()`/`write()` 내부 헬퍼 + `seed*()` 초기 데이터
   - export: `list*()` / `get*(id)` / `create*(input)` / `update*(id, input)` / `delete*(id)`
     (+ 필요 시 `incrementViews` 같은 도메인 동작)
   - 코드 골격: `references/store-template.md`

2. **페이지** `src/app/<feature>/`
   - 목록: `<Feature>ListPage.tsx` — 검색 + 페이지네이션 + MUI Table
   - 상세: `<Feature>DetailPage.tsx` — 보기 + 수정/삭제(확인 Dialog)
   - 폼: `<Feature>FormPage.tsx` — 생성/수정 공용(`useParams`의 id 유무로 분기), 필수값 검증
   - 코드 골격: `references/page-templates.md`
   - 화면 일부만 필요하면(예: 목록만) 해당 페이지만 만든다. 단, navigate 경로와 라우트는
     실제 만든 화면에만 걸어 dead link를 만들지 않는다.

3. **4곳 배선** — `references/wiring-guide.md`의 정확한 위치/패턴을 따른다
   1. `src/main.tsx` — `/app` children에 라우트 추가
   2. `src/app/components/AppMenuContent.tsx` — `mainItems`에 메뉴 항목 + 아이콘
   3. `src/app/components/AppLayout.tsx` — `useCrumbs`에 경로 분기(브레드크럼)
   4. (스토어는 1번에서 이미 생성)

## 일관성 체크 (제출 전 self-check)

- store가 export한 타입/함수명을 페이지가 정확히 그대로 소비하는가
- `navigate(...)` 경로가 전부 main.tsx 라우트에 존재하는가, `:id` 이름이 `useParams`와 같은가
- 메뉴 `path`와 라우트 일치, 브레드크럼 분기 추가됨
- MUI 시스템 props를 직접 넘긴 곳이 없는가(`sx`로) — `mui-v9-usage`
- `src/context/templates/`를 건드리지 않았는가
- `npx tsc -b` 통과 (최종 게이트)

> 통합 검증은 integration-qa가 `integration-check` 스킬로 교차 확인한다. 빌더는 모듈을
> 완성할 때마다 QA에 알려 점진적으로 검증받는다.
