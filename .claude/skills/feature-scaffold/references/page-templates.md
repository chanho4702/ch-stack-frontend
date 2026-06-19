# 페이지 템플릿 (board 페이지 기반)

board의 `BoardListPage` / `BoardDetailPage` / `BoardFormPage`가 정답지다. 전체 코드는
`src/app/board/*.tsx`를 직접 열어 참고하라. 여기서는 구조와 필수 패턴만 정리한다.

MUI 문법은 `mui-v9-usage` 스킬을 따른다 (특히 `sx`로 스타일, 개별 경로 import, Rounded 아이콘).

## 공통 레이아웃

- 페이지 루트는 `<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>`
  (목록) 또는 `maxWidth: 900`(상세/폼). `/app` 화면은 `AppLayout`이 테마·여백을 감싸므로
  페이지에서 `AppTheme`를 다시 감싸지 않는다.
- 제목은 `<Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>`.

## 목록 페이지 `<Feature>ListPage.tsx`

핵심 구조:
- `const items = React.useMemo(() => list<Entity>s(), [])` — 마운트 시 1회 로드.
  (생성/삭제 후 navigate로 돌아오면 재마운트되어 갱신됨)
- 검색: `useState('')` + `query.trim().toLowerCase()`로 필터 (board는 제목 기준).
- 페이지네이션: `PAGE_SIZE = 10`, `Math.ceil(filtered.length / PAGE_SIZE)`, MUI `<Pagination>`.
- 상단 우측 "추가/글쓰기" 버튼 → `navigate('/app/<feature>/new')`.
- MUI `Table`(TableContainer component={Paper} variant="outlined"). 행 클릭 → 상세로 이동
  (`onClick={() => navigate(\`/app/<feature>/${item.id}\`)}`, `sx={{ cursor: 'pointer' }}`).
- 빈 상태: `rows.length === 0`일 때 colSpan 행으로 "등록된 항목이 없습니다 / 검색 결과 없음".

## 상세 페이지 `<Feature>DetailPage.tsx`

- `const { id } = useParams<{ id: string }>()`.
- 조회수 등 부수효과는 **StrictMode 이중 실행 가드** 필수:
  ```tsx
  const viewedRef = React.useRef(false);
  React.useEffect(() => {
    if (!id) return;
    if (!viewedRef.current) { viewedRef.current = true; incrementViews(id); }
    setItem(get<Entity>(id));
  }, [id]);
  ```
- 없는 id: `if (!item) return <... "존재하지 않는 항목입니다." + 목록으로 버튼>`.
- 하단 액션: 목록 / 수정(`navigate(\`/app/<feature>/${item.id}/edit\`)`) / 삭제.
- 삭제는 확인 `Dialog`(DialogTitle/Content/Actions) 거친 뒤 `delete<Entity>(id)` → 목록 이동.
- 본문 줄바꿈 보존: `sx={{ whiteSpace: 'pre-wrap' }}`.

## 폼 페이지 `<Feature>FormPage.tsx` — 생성/수정 공용

- `const isEdit = Boolean(id)` (라우트 `new`는 id 없음, `:id/edit`은 id 있음).
- `const existing = React.useMemo(() => (id ? get<Entity>(id) : undefined), [id])`.
- 필드별 `useState`, `useEffect`로 수정 모드일 때 기존 값 채우기. 새 글이면 `useAuth()`의
  `user?.email`을 작성자 기본값으로 채우는 등 데모 인증과 연동 가능.
- 검증: `touched` 플래그 + 필수값 `.trim()` 비었으면 `error`/`helperText` 표시, submit 차단.
- submit: `isEdit`면 `update<Entity>(id, input)`, 아니면 `create<Entity>(input)` 후
  `navigate(\`/app/<feature>/${created.id}\`, { replace: true })`.
- 수정 모드인데 `existing` 없으면 "존재하지 않는 항목" 안내.
- 폼은 `<Box component="form" onSubmit={handleSubmit} noValidate>` + `<Stack spacing={2.5}>`.

## 데모 인증 연동

`import { useAuth } from '../auth/AuthContext'` → `const { user } = useAuth()`로 로그인
사용자(email)에 접근. `/app/*`는 이미 `ProtectedRoute` 뒤에 있어 비로그인 접근은 차단된다.
