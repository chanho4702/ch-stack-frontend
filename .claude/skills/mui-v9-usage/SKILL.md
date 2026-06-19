---
name: mui-v9-usage
description: myFront에서 MUI v9 컴포넌트를 빌드 에러 없이 쓰는 규칙. Typography/Stack의 시스템 props 제거(sx로 이전), 새 Grid size= 문법, slotProps, 테마/색상모드, 아이콘 import 규칙. .tsx에서 MUI 컴포넌트(Typography·Stack·Grid·Button·TextField·Table·Dialog 등)를 작성·수정하거나 TS2769/TS2322 빌드 에러가 나면 반드시 이 스킬을 따른다.
---

# MUI v9 사용 규칙 (myFront)

이 저장소는 MUI v9(`@mui/material` ^9, `@mui/x-*` ^9)를 쓴다. v9는 v5/v6 예제와 문법이
다른 지점이 있어, 옛 예제를 그대로 붙이면 타입 빌드(`tsc -b`)가 깨진다. 아래 규칙을 지킨다.

## 1. 시스템 style props 제거 — 가장 흔한 빌드 에러

`Typography`, `Stack`, `styled(Stack)`에서 **시스템 스타일 props가 제거**됐다.
`fontWeight`, `alignItems`, `justifyContent`, `color`(팔레트), `textAlign`, `mb`/`mt` 등을
직접 prop으로 넘기면 `TS2769`/`TS2322` 빌드 에러가 난다. **`sx={{ ... }}` 안에 넣는다.**

```tsx
// ❌ 빌드 에러
<Typography fontWeight={600} mb={2} />
<Stack justifyContent="center" alignItems="center" />

// ✅
<Typography sx={{ fontWeight: 600, mb: 2 }} />
<Stack sx={{ justifyContent: 'center', alignItems: 'center' }} />
```

**왜:** v9는 시스템 props를 떼어내 타입을 좁히고 번들을 줄였다. 레이아웃/타이포 관련 값은
거의 다 `sx`로 옮겨졌다고 보면 된다.

**단, `Stack`의 `direction` / `spacing` / `useFlexGap`은 여전히 직접 prop으로 쓴다.**
이건 시스템 prop이 아니라 Stack 고유 prop이다.

```tsx
<Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
```

## 2. Grid — 새 size 문법

새 `Grid`는 `item xs={12}`가 아니라 `size={{ xs: 12, md: 6 }}`를 쓴다.

```tsx
// ❌ 구버전
<Grid item xs={12} md={6} />
// ✅ v9
<Grid size={{ xs: 12, md: 6 }} />
```

## 3. slotProps — input adornment 등

`InputProps`/`inputProps` 대신 `slotProps`를 쓴다. board 목록의 검색창이 예시:

```tsx
<TextField
  size="small"
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment>
      ),
    },
  }}
/>
```

## 4. 아이콘 import

아이콘은 **개별 경로**로 import한다 (트리셰이킹). Rounded 변형이 이 저장소의 톤이다.

```tsx
import EditRoundedIcon from '@mui/icons-material/EditRounded';
// ❌ import { EditRounded } from '@mui/icons-material'; (느린 배럴 import)
```

## 5. 테마 / 색상 모드 — 직접 만들지 않는다

라이트/다크/시스템 모드는 `src/context/templates/shared-theme/AppTheme`(MUI CSS 변수)가
처리한다. `/app` 화면은 `AppLayout`이 테마를 **한 번만** 감싸므로, 페이지 컴포넌트에서
별도로 `ThemeProvider`/`AppTheme`를 감싸지 않는다. 색상은 `sx`에서 팔레트 토큰을 쓴다:
`sx={{ color: 'text.secondary' }}`, `sx={{ bgcolor: 'background.paper' }}`.

`/app` 밖의 독립 페이지(예: 새 공개 페이지)를 만들 때만 `<AppTheme>`로 감싼다.

## 6. import 컨벤션

MUI 컴포넌트는 **개별 경로**로 import한다 (board 페이지들과 동일):

```tsx
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// ❌ import { Box, Stack, Button } from '@mui/material';
```

## 막혔을 때 — 살아있는 예제 위치

- `src/showcase/` — 카테고리별(Inputs/DataDisplay/Feedback/Surfaces/Navigation/Layout)
  **실제 동작하는** MUI v9 예제. 컴포넌트 사용법이 헷갈리면 여기를 먼저 본다.
- `src/data/components.ts` — 전체 컴포넌트 카탈로그 + 공식 문서 링크.
- `src/app/board/*.tsx` — 실전 CRUD 화면에서 위 규칙이 어떻게 쓰이는지 보는 정답지.
