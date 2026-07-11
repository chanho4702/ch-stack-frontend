import { createTheme, alpha, PaletteMode, Shadows } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

// 스틸 블루 브랜드 램프 — @chanho 디자인 시스템(packages/tokens palette.ts)의 blue 스케일과 동일.
// alm-front / wiki-front 형제 프로젝트와 브랜드 색을 맞추기 위해 hex 로 교체(MUI 는 hex 허용).
export const brand = {
  50: '#EAF2FC',
  100: '#D3E3F8',
  200: '#A6C8F1',
  300: '#6FA5E7',
  400: '#3F84DC',
  500: '#1B66C9',
  600: '#124FA3',
  700: '#0C3B7D',
  800: '#082A5C',
  900: '#051D40',
};

// 쿨 그레이 — 디자인 시스템 gray 스케일(50–900) 매핑.
export const gray = {
  50: '#F7F8FA',
  100: '#EFF1F4',
  200: '#DFE3E8',
  300: '#C4CAD3',
  400: '#9AA3B0',
  500: '#707A89',
  600: '#525D6E',
  700: '#3A4453',
  800: '#252E3B',
  900: '#141B25',
};

// success — 디자인 시스템 green 계열(500 #17824F / 다크 400 #4CB782). 50·200·800 은 램프 보간.
export const green = {
  50: '#EAF7F0',
  100: '#DFF2E8',
  200: '#A8DEC0',
  300: '#63C68F',
  400: '#4CB782',
  500: '#17824F',
  600: '#12693F',
  700: '#0E5232',
  800: '#0E4429',
  900: '#143A28',
};

// warning — 디자인 시스템 orange 계열(500 #A05E03 / 다크 400 #E2A33D). 50·200·800 은 램프 보간.
export const orange = {
  50: '#FDF6E9',
  100: '#FBEED8',
  200: '#F5D9A3',
  300: '#EDB95F',
  400: '#E2A33D',
  500: '#A05E03',
  600: '#7F4B02',
  700: '#603902',
  800: '#4E3111',
  900: '#3E2A10',
};

// danger — 디자인 시스템 red 계열(500 #C9372C / 다크 400 #EF6E62). 50·800 은 램프 보간.
export const red = {
  50: '#FEF3F2',
  100: '#FCE9E7',
  200: '#F7B6B0',
  300: '#F2938B',
  400: '#EF6E62',
  500: '#C9372C',
  600: '#A22B22',
  700: '#82231C',
  800: '#5E211B',
  900: '#46201D',
};

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px'
      : 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[500], // 라이트: 브랜드 스텝 #1B66C9
        dark: brand[700],
        contrastText: brand[50],
        ...(mode === 'dark' && {
          contrastText: brand[50],
          light: brand[300],
          main: brand[400], // 다크: 한 단계 밝은 브랜드 스텝 #3F84DC
          dark: brand[700],
        }),
      },
      info: {
        light: brand[100],
        main: brand[300],
        dark: brand[600],
        contrastText: gray[50],
        ...(mode === 'dark' && {
          contrastText: brand[300],
          light: brand[500],
          main: brand[700],
          dark: brand[900],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[500], // 라이트: #A05E03
        dark: orange[800],
        ...(mode === 'dark' && {
          light: orange[300],
          main: orange[400], // 다크: #E2A33D
          dark: orange[700],
        }),
      },
      error: {
        light: red[300],
        main: red[500], // 라이트: #C9372C
        dark: red[800],
        ...(mode === 'dark' && {
          light: red[300],
          main: red[400], // 다크: #EF6E62
          dark: red[700],
        }),
      },
      success: {
        light: green[300],
        main: green[500], // 라이트: #17824F
        dark: green[800],
        ...(mode === 'dark' && {
          light: green[300],
          main: green[400], // 다크: #4CB782
          dark: green[700],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: '#FFFFFF',
        paper: gray[50],
        ...(mode === 'dark' && { default: '#14181F', paper: '#1D232C' }),
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
        ...(mode === 'dark' && { primary: '#E7EAEF', secondary: gray[400] }),
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
        ...(mode === 'dark' && {
          hover: alpha(gray[600], 0.2),
          selected: alpha(gray[600], 0.3),
        }),
      },
    },
    typography: {
      fontFamily:
      "'Pretendard Variable', Pretendard, 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', sans-serif",
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[500], // 브랜드 스텝 #1B66C9
        dark: brand[700],
        contrastText: brand[50],
      },
      info: {
        light: brand[100],
        main: brand[300],
        dark: brand[600],
        contrastText: gray[50],
      },
      warning: {
        light: orange[300],
        main: orange[500], // #A05E03
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[500], // #C9372C
        dark: red[800],
      },
      success: {
        light: green[300],
        main: green[500], // #17824F
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: '#FFFFFF',
        paper: gray[50],
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400], // 한 단계 밝은 브랜드 스텝 #3F84DC
        dark: brand[700],
      },
      info: {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      },
      warning: {
        light: orange[300],
        main: orange[400], // #E2A33D
        dark: orange[700],
      },
      error: {
        light: red[300],
        main: red[400], // #EF6E62
        dark: red[700],
      },
      success: {
        light: green[300],
        main: green[400], // #4CB782
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: '#14181F',
        paper: '#1D232C',
      },
      text: {
        primary: '#E7EAEF',
        secondary: gray[400],
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: alpha(gray[600], 0.3),
      },
      baseShadow:
        'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
    },
  },
};

export const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

// @ts-ignore
const defaultShadows: Shadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;
