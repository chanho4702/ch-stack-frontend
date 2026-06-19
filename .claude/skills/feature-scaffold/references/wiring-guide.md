# 4곳 배선 가이드

새 기능 화면은 코드만 만들면 보이지 않는다. 아래 위치에 정확히 연결해야 한다. 하나라도
빠지면 화면이 죽거나(라우트), 들어갈 길이 없거나(메뉴), 길을 잃는다(브레드크럼).

기능명 `<feature>`(예: notice), 컴포넌트 `<Feature>`(예: Notice) 기준.

## 1. 라우트 — `src/main.tsx`

페이지 컴포넌트를 import하고, `/app` 라우트의 `children` 배열에 4개 라우트를 추가한다.
board와 동일한 모양(`index`는 대시보드라 그대로 두고 그 아래에 추가):

```tsx
import <Feature>ListPage from './app/<feature>/<Feature>ListPage';
import <Feature>DetailPage from './app/<feature>/<Feature>DetailPage';
import <Feature>FormPage from './app/<feature>/<Feature>FormPage';

// /app 의 children 배열에 추가:
{ path: '<feature>', element: <<Feature>ListPage /> },
{ path: '<feature>/new', element: <<Feature>FormPage /> },
{ path: '<feature>/:id', element: <<Feature>DetailPage /> },
{ path: '<feature>/:id/edit', element: <<Feature>FormPage /> },
```

- `:id` 파라미터 이름은 페이지의 `useParams<{ id: string }>()`와 **반드시 일치**.
- 생성/수정 폼을 하나로 공용하므로 `new`와 `:id/edit` 둘 다 `<Feature>FormPage`를 가리킨다.
- 화면 일부만 만든 경우(예: 목록만) 만든 화면의 라우트만 등록한다 (dead link 금지).

## 2. 사이드메뉴 — `src/app/components/AppMenuContent.tsx`

상단의 `mainItems` 배열에 항목을 추가한다. 아이콘은 `@mui/icons-material`에서 Rounded
변형을 개별 import한다.

```tsx
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

const mainItems: MenuItem[] = [
  { text: '대시보드', icon: <HomeRoundedIcon />, path: '/app' },
  { text: '게시판', icon: <ArticleRoundedIcon />, path: '/app/board' },
  { text: '<메뉴 라벨>', icon: <DescriptionRoundedIcon />, path: '/app/<feature>' }, // 추가
];
```

- `path`는 목록 라우트(`/app/<feature>`)를 가리킨다.
- 하이라이트는 `isSelected`가 자동 처리한다 (`pathname.startsWith(`${path}/`)`이므로 상세/폼
  화면에서도 해당 메뉴가 선택 표시됨). 별도 작업 불필요.

## 3. 브레드크럼 — `src/app/components/AppLayout.tsx`

`useCrumbs(pathname)` 함수에 경로 분기를 추가한다. board 분기 바로 옆에:

```tsx
function useCrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: '대시보드', to: '/app' }];
  if (pathname.startsWith('/app/board')) {
    // ... 기존 board
  }
  if (pathname.startsWith('/app/<feature>')) {
    crumbs.push({ label: '<메뉴 라벨>', to: '/app/<feature>' });
    if (pathname === '/app/<feature>/new') {
      crumbs.push({ label: '새로 만들기' });
    } else if (pathname.endsWith('/edit')) {
      crumbs.push({ label: '수정' });
    } else if (pathname !== '/app/<feature>') {
      crumbs.push({ label: '상세' });
    }
  }
  return crumbs;
}
```

- 마지막 크럼은 `to` 없이(텍스트), 중간 크럼은 `to`로 링크된다 (컴포넌트가 알아서 처리).
- 누락해도 빌드는 통과하지만 브레드크럼이 "대시보드"에 멈춘다 → QA가 정적으로 확인한다.

## 확인

배선 후 `npx tsc -b`로 import/타입을 점검하고, navigate 경로 ↔ 라우트 ↔ 메뉴 path ↔
브레드크럼 분기가 모두 같은 `/app/<feature>` 기준으로 일치하는지 교차 확인한다.
