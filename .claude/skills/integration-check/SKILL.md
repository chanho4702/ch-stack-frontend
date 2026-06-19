---
name: integration-check
description: myFront 기능 화면의 통합 정합성을 검증하는 체크리스트. store shape↔페이지 소비, 라우트↔네비게이션↔메뉴↔브레드크럼 경계면 교차 비교, context/templates 불변 확인, tsc -b 타입 게이트. 새 기능 화면이 완성/수정된 뒤 검증하거나, 화면이 죽거나 길을 잃거나 빌드가 깨질 때 반드시 이 스킬을 따른다.
---

# 통합 정합성 검증 (myFront)

기능 화면 버그의 대부분은 단일 파일이 아니라 **경계면**에서 난다. 파일 존재 여부가 아니라,
서로 맞물리는 두 지점을 **동시에 읽고 비교**한다. 각 모듈 완성 직후 점진적으로 돌린다.

## 검증 순서

### 1. store shape ↔ 페이지 소비 (가장 흔한 버그)

스토어 파일과 그것을 import하는 페이지를 **동시에** 연다.

- export한 `interface`(예: `Post`)의 필드명을, 페이지가 `post.<field>`로 읽는 곳과 대조.
  오타·단복수 불일치(`views` vs `view`)를 잡는다.
- export 함수 시그니처(`createPost(input: PostInput)`)와 호출부의 인자 개수/타입 대조.
- `*Input` 타입(생성/수정 입력)이 폼이 만드는 객체와 일치하는가.

### 2. 라우트 ↔ 네비게이션

`src/main.tsx`의 `/app` children 라우트 목록과, 페이지들의 `navigate('...')` 호출을 대조.

- 페이지가 이동하는 모든 경로가 라우트에 등록돼 있는가. (등록 안 됨 → 빈 화면)
- 동적 라우트 `board/:id`의 파라미터 이름이 페이지의 `useParams<{ id }>()`와 일치하는가.
- 목록/상세/폼/수정 4개 라우트가 board 패턴대로 다 있는가
  (`<f>`, `<f>/new`, `<f>/:id`, `<f>/:id/edit`).

### 3. 메뉴 ↔ 라우트

`src/app/components/AppMenuContent.tsx`의 `mainItems`:

- 새 기능 메뉴 항목이 추가됐고 `path`가 실제 라우트와 일치하는가.
- `isSelected`가 하위 경로(`/app/<f>/123`)에서도 상위 메뉴를 하이라이트하는가
  (`pathname.startsWith(`${path}/`)` 규칙).

### 4. 브레드크럼 ↔ 경로

`src/app/components/AppLayout.tsx`의 `useCrumbs`:

- 새 경로 분기(`pathname.startsWith('/app/<f>')`)가 추가됐는가.
- new/edit/detail 각 상태에서 마지막 크럼 라벨이 맞는가 (board의 글쓰기/글 수정/글 보기 참고).
- 누락돼도 빌드는 통과하지만 브레드크럼이 "대시보드"에서 멈춘다 → 정적으로 확인해야 잡힌다.

### 5. context/templates 불변

`src/context/templates/` 아래 파일이 **수정되지 않았는지** 확인한다. 이 디렉토리는 MUI 공식
템플릿 원본으로, 빌더가 실수로 고치면 안 된다. git이 없는 환경이면 빌더에게 "templates를
건드렸는지" 직접 확인 요청하거나, import만 했는지 변경 파일 목록으로 점검한다.

### 6. 타입 게이트 (최종)

```bash
npx tsc -b
```

깨끗이 통과해야 한다. 자주 나오는 에러와 원인:

| 에러 | 원인 | 해결 |
|------|------|------|
| TS2769 / TS2322 (Typography·Stack) | 시스템 props를 직접 전달 | `mui-v9-usage` 스킬 — `sx`로 이전 |
| TS6133 (noUnusedLocals) | 안 쓰는 import/변수 | 제거 |
| TS2307 | import 경로 오타 | 경로 수정 |
| Property does not exist | store shape ↔ 페이지 불일치 | 위 1번 |

`tsc -b`는 증분 빌드라 `tsconfig.app.tsbuildinfo` 때문에 변경분만 검사할 수 있다. 의심되면
변경 파일을 명시적으로 확인한다.

## 보고 형식

```
## QA 라운드 N — <검증 대상 모듈>
- ✅ 통과: <항목>
- ❌ 불일치: <파일:라인> — 기대 `<X>` vs 실제 `<Y>` → 수정 제안: <...>
- ⚠️ 확인 필요: <확신 없는 항목>
- tsc -b: 통과 / 실패(에러 N개) / 미실행(사유)
```

결과는 `_workspace/qa_report.md`에 누적 기록한다.
