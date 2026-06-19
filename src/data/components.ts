// docs/data/material/all-components/all-components.md 를 정리한 카탈로그 데이터.
// MUI 공식 문서의 전체 컴포넌트를 카테고리별로 묶어 "꺼내 쓰기" 좋게 만든 목록입니다.
// link 는 https://mui.com 기준 상대 경로 (공식 문서로 연결).

export interface ComponentItem {
  /** 컴포넌트 표시 이름 */
  name: string;
  /** import 경로 (예: @mui/material/Button). 훅/유틸은 별도 표기 */
  import: string;
  /** MUI 공식 문서 경로 (https://mui.com 기준) */
  link: string;
}

export interface ComponentCategory {
  id: string;
  /** 카테고리 표시 이름 */
  title: string;
  description: string;
  items: ComponentItem[];
}

const MUI = 'https://mui.com';
export const docUrl = (link: string) => `${MUI}${link}`;

export const componentCategories: ComponentCategory[] = [
  {
    id: 'inputs',
    title: 'Inputs',
    description: '사용자 입력을 받는 폼 요소들',
    items: [
      { name: 'Autocomplete', import: '@mui/material/Autocomplete', link: '/material-ui/react-autocomplete/' },
      { name: 'Button', import: '@mui/material/Button', link: '/material-ui/react-button/' },
      { name: 'Button Group', import: '@mui/material/ButtonGroup', link: '/material-ui/react-button-group/' },
      { name: 'Checkbox', import: '@mui/material/Checkbox', link: '/material-ui/react-checkbox/' },
      { name: 'Floating Action Button', import: '@mui/material/Fab', link: '/material-ui/react-floating-action-button/' },
      { name: 'Radio Group', import: '@mui/material/RadioGroup', link: '/material-ui/react-radio-button/' },
      { name: 'Rating', import: '@mui/material/Rating', link: '/material-ui/react-rating/' },
      { name: 'Select', import: '@mui/material/Select', link: '/material-ui/react-select/' },
      { name: 'Slider', import: '@mui/material/Slider', link: '/material-ui/react-slider/' },
      { name: 'Switch', import: '@mui/material/Switch', link: '/material-ui/react-switch/' },
      { name: 'Text Field', import: '@mui/material/TextField', link: '/material-ui/react-text-field/' },
      { name: 'Transfer List', import: '@mui/material/List', link: '/material-ui/react-transfer-list/' },
      { name: 'Toggle Button', import: '@mui/material/ToggleButton', link: '/material-ui/react-toggle-button/' },
    ],
  },
  {
    id: 'data-display',
    title: 'Data display',
    description: '데이터를 보여주는 요소들',
    items: [
      { name: 'Avatar', import: '@mui/material/Avatar', link: '/material-ui/react-avatar/' },
      { name: 'Badge', import: '@mui/material/Badge', link: '/material-ui/react-badge/' },
      { name: 'Chip', import: '@mui/material/Chip', link: '/material-ui/react-chip/' },
      { name: 'Divider', import: '@mui/material/Divider', link: '/material-ui/react-divider/' },
      { name: 'Icons', import: '@mui/material/Icon', link: '/material-ui/icons/' },
      { name: 'Material Icons', import: '@mui/icons-material', link: '/material-ui/material-icons/' },
      { name: 'List', import: '@mui/material/List', link: '/material-ui/react-list/' },
      { name: 'Table', import: '@mui/material/Table', link: '/material-ui/react-table/' },
      { name: 'Tooltip', import: '@mui/material/Tooltip', link: '/material-ui/react-tooltip/' },
      { name: 'Typography', import: '@mui/material/Typography', link: '/material-ui/react-typography/' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: '상태/알림을 전달하는 요소들',
    items: [
      { name: 'Alert', import: '@mui/material/Alert', link: '/material-ui/react-alert/' },
      { name: 'Backdrop', import: '@mui/material/Backdrop', link: '/material-ui/react-backdrop/' },
      { name: 'Dialog', import: '@mui/material/Dialog', link: '/material-ui/react-dialog/' },
      { name: 'Progress', import: '@mui/material/CircularProgress', link: '/material-ui/react-progress/' },
      { name: 'Skeleton', import: '@mui/material/Skeleton', link: '/material-ui/react-skeleton/' },
      { name: 'Snackbar', import: '@mui/material/Snackbar', link: '/material-ui/react-snackbar/' },
    ],
  },
  {
    id: 'surfaces',
    title: 'Surfaces',
    description: '콘텐츠를 담는 표면 컨테이너',
    items: [
      { name: 'Accordion', import: '@mui/material/Accordion', link: '/material-ui/react-accordion/' },
      { name: 'App Bar', import: '@mui/material/AppBar', link: '/material-ui/react-app-bar/' },
      { name: 'Card', import: '@mui/material/Card', link: '/material-ui/react-card/' },
      { name: 'Paper', import: '@mui/material/Paper', link: '/material-ui/react-paper/' },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: '화면 이동/탐색 요소들',
    items: [
      { name: 'Bottom Navigation', import: '@mui/material/BottomNavigation', link: '/material-ui/react-bottom-navigation/' },
      { name: 'Breadcrumbs', import: '@mui/material/Breadcrumbs', link: '/material-ui/react-breadcrumbs/' },
      { name: 'Drawer', import: '@mui/material/Drawer', link: '/material-ui/react-drawer/' },
      { name: 'Link', import: '@mui/material/Link', link: '/material-ui/react-link/' },
      { name: 'Menu', import: '@mui/material/Menu', link: '/material-ui/react-menu/' },
      { name: 'Pagination', import: '@mui/material/Pagination', link: '/material-ui/react-pagination/' },
      { name: 'Speed Dial', import: '@mui/material/SpeedDial', link: '/material-ui/react-speed-dial/' },
      { name: 'Stepper', import: '@mui/material/Stepper', link: '/material-ui/react-stepper/' },
      { name: 'Tabs', import: '@mui/material/Tabs', link: '/material-ui/react-tabs/' },
    ],
  },
  {
    id: 'layout',
    title: 'Layout',
    description: '레이아웃 구성 요소들',
    items: [
      { name: 'Box', import: '@mui/material/Box', link: '/material-ui/react-box/' },
      { name: 'Container', import: '@mui/material/Container', link: '/material-ui/react-container/' },
      { name: 'Grid', import: '@mui/material/Grid', link: '/material-ui/react-grid/' },
      { name: 'Stack', import: '@mui/material/Stack', link: '/material-ui/react-stack/' },
      { name: 'Image List', import: '@mui/material/ImageList', link: '/material-ui/react-image-list/' },
    ],
  },
  {
    id: 'lab',
    title: 'Lab',
    description: '@mui/lab 의 실험적 컴포넌트',
    items: [
      { name: 'Masonry', import: '@mui/lab/Masonry', link: '/material-ui/react-masonry/' },
      { name: 'Timeline', import: '@mui/lab/Timeline', link: '/material-ui/react-timeline/' },
    ],
  },
  {
    id: 'utils',
    title: 'Utils',
    description: '동작/접근성을 돕는 유틸리티',
    items: [
      { name: 'Click-Away Listener', import: '@mui/material/ClickAwayListener', link: '/material-ui/react-click-away-listener/' },
      { name: 'CSS Baseline', import: '@mui/material/CssBaseline', link: '/material-ui/react-css-baseline/' },
      { name: 'Modal', import: '@mui/material/Modal', link: '/material-ui/react-modal/' },
      { name: 'No SSR', import: '@mui/material/NoSsr', link: '/material-ui/react-no-ssr/' },
      { name: 'Popover', import: '@mui/material/Popover', link: '/material-ui/react-popover/' },
      { name: 'Popper', import: '@mui/material/Popper', link: '/material-ui/react-popper/' },
      { name: 'Portal', import: '@mui/material/Portal', link: '/material-ui/react-portal/' },
      { name: 'Textarea Autosize', import: '@mui/material/TextareaAutosize', link: '/material-ui/react-textarea-autosize/' },
      { name: 'Transitions', import: '@mui/material/Fade', link: '/material-ui/transitions/' },
      { name: 'useMediaQuery', import: '@mui/material/useMediaQuery', link: '/material-ui/react-use-media-query/' },
    ],
  },
];

export const totalComponentCount = componentCategories.reduce(
  (sum, c) => sum + c.items.length,
  0,
);
