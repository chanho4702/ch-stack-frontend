import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AppTheme from '../context/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from '../context/templates/shared-theme/ColorModeIconDropdown';

// 개인 브랜드 핸들/연락처 — git 사용자(chanho4702) 기준.
const GITHUB_URL = 'https://github.com/chanho4702';
const CONTACT_EMAIL = 'dmv.dev.claude@gmail.com';

// 기술 스택 — C:\MSA_TEMPLATE 저장소들에서 실제로 확인된 항목만 나열한다.
// Backend: gateway-server / auth-server / eureka-server / board-service 의 build.gradle,
// Frontend: myFront·alm-front·wiki-front package.json + @chanho/react(Radix),
// DevOps·Infra: infra/keycloak(docker-compose, realm) + pnpm 모노레포 + Gradle + Vitest.
interface TechGroup {
  category: string;
  icon: React.ReactNode;
  items: string[];
}

const techGroups: TechGroup[] = [
  {
    category: 'Backend',
    icon: <StorageRoundedIcon />,
    items: [
      'Java',
      'Spring Boot 4',
      'Spring Cloud Gateway',
      'Netflix Eureka',
      'Spring Security',
      'OAuth2 Resource Server',
      'Spring Data JPA',
      'Flyway',
      'Redis',
      'Resilience4j',
    ],
  },
  {
    category: 'Frontend',
    icon: <CodeRoundedIcon />,
    items: [
      'React 19',
      'TypeScript',
      'Vite',
      'MUI v9',
      'Radix UI',
      'React Router',
      'Emotion',
      'Storybook',
    ],
  },
  {
    category: 'DevOps · Infra',
    icon: <CloudRoundedIcon />,
    items: [
      'MSA',
      'Keycloak OIDC',
      'Docker Compose',
      'pnpm 모노레포',
      'Gradle 멀티모듈',
      'Vitest',
    ],
  },
];

// 프로젝트 쇼케이스 — 모두 C:\MSA_TEMPLATE 안에 실재하는 저장소.
interface Project {
  title: string;
  summary: string;
  tags: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    title: 'MSA Platform Template',
    summary:
      'Spring Boot 4 · Spring Cloud 기반 마이크로서비스 골격. Eureka 서비스 디스커버리, Gateway 라우팅, Keycloak OIDC 인증, board-service 도메인으로 구성했습니다.',
    tags: ['Spring Cloud Gateway', 'Eureka', 'Keycloak OIDC', 'Resilience4j'],
    icon: <HubRoundedIcon fontSize="large" />,
  },
  {
    title: 'Chanho Design System',
    summary:
      '스틸 블루 브랜드의 자체 디자인 시스템. 원시→시맨틱 2층 토큰(CSS 변수 빌드)과 Radix 기반 27개 React 컴포넌트, Storybook 문서를 pnpm 모노레포로 관리합니다.',
    tags: ['@chanho/tokens', '@chanho/react', 'Radix UI', 'Storybook'],
    icon: <PaletteRoundedIcon fontSize="large" />,
  },
  {
    title: 'ALM Front — Jira 클론',
    summary:
      '이슈·보드 중심의 프로젝트 관리 프론트엔드. @chanho 디자인 시스템을 그대로 소비해 브랜드 일관성을 검증하는 레퍼런스 앱입니다.',
    tags: ['React 19', 'Vite', '@chanho/react', 'Vitest'],
    icon: <ViewKanbanRoundedIcon fontSize="large" />,
  },
  {
    title: 'Wiki Front — Confluence 클론',
    summary:
      '문서·지식 공유 프론트엔드. ALM Front와 동일한 디자인 시스템 위에서 문서 위계와 편집 흐름을 다룹니다.',
    tags: ['React 19', 'Vite', '@chanho/react', 'Vitest'],
    icon: <MenuBookRoundedIcon fontSize="large" />,
  },
];

// /app 밖 개발용 진입점 — 랜딩에서는 보조 영역으로 강등한다.
const devLinks: { to: string; label: string }[] = [
  { to: '/app', label: '서비스 데모' },
  { to: '/templates', label: 'MUI 템플릿' },
  { to: '/components', label: '컴포넌트 카탈로그' },
  { to: '/showcase', label: '컴포넌트 쇼케이스' },
];

export default function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10 }}>
        <ColorModeIconDropdown />
      </Box>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        sx={{
          background: (theme) =>
            `radial-gradient(ellipse 90% 55% at 50% -10%, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.22 : 0.12,
            )}, transparent)`,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 } }}>
          <Stack spacing={3} sx={{ maxWidth: 760 }}>
            <Chip
              icon={<GitHubIcon />}
              label="@chanho4702"
              variant="outlined"
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              clickable
              sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1 }}
            >
              김찬호
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 500 }}>
              MSA 플랫폼과 디자인 시스템을 직접 설계·구축하는 개발자
            </Typography>
            {/* TODO(소개): 아래 한 줄은 임시 소개 문구입니다. 본인 목소리로 바꿔 주세요. */}
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
              백엔드 마이크로서비스부터 디자인 토큰·컴포넌트까지, 하나의 제품이 서는 데
              필요한 레이어를 끝까지 연결하는 것을 좋아합니다.{' '}
              <Box component="span" sx={{ fontStyle: 'italic' }}>
                (여기에 한 줄 소개를 채워 주세요.)
              </Box>
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/profile"
                startIcon={<BadgeRoundedIcon />}
              >
                프로필 보기
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/designs"
                startIcon={<ArchitectureRoundedIcon />}
              >
                설계 문서
              </Button>
              <Button
                variant="text"
                size="large"
                component="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener"
                startIcon={<GitHubIcon />}
              >
                GitHub
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        {/* ── 기술 스택 ─────────────────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            기술 스택
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            MSA_TEMPLATE 저장소에서 실제로 쓰고 있는 기술들입니다.
          </Typography>
          <Grid container spacing={3}>
            {techGroups.map((group) => (
              <Grid key={group.category} size={{ xs: 12, md: 4 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: 'center', mb: 2.5, color: 'primary.main' }}
                    >
                      {group.icon}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {group.category}
                      </Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {group.items.map((item) => (
                        <Chip key={item} label={item} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── 프로젝트 ─────────────────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            프로젝트
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            직접 설계하고 구축한 작업들.
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent
                    sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 1.5 }}>{project.icon}</Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', flexGrow: 1, lineHeight: 1.7 }}
                    >
                      {project.summary}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2.5 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── 연락 · 보조 링크 ─────────────────────────── */}
        <Box component="footer" sx={{ mt: { xs: 8, md: 12 } }}>
          <Divider sx={{ mb: 4 }} />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-end' } }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                함께 일하고 싶다면
              </Typography>
              <Stack direction="row" spacing={2.5} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1.5 }}>
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    color: 'text.primary',
                    fontWeight: 500,
                  }}
                >
                  <GitHubIcon fontSize="small" />
                  github.com/chanho4702
                </Link>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    color: 'text.primary',
                    fontWeight: 500,
                  }}
                >
                  <EmailRoundedIcon fontSize="small" />
                  {CONTACT_EMAIL}
                </Link>
              </Stack>
            </Box>

            {/* 개발용 진입점 — 보조 영역 */}
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
              >
                둘러보기
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: 'wrap', gap: 1, justifyContent: { md: 'flex-end' } }}
              >
                {devLinks.map((l) => (
                  <Link
                    key={l.to}
                    component={RouterLink}
                    to={l.to}
                    underline="hover"
                    color="text.secondary"
                    variant="body2"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.25,
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {l.label}
                    <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
                  </Link>
                ))}
              </Stack>
            </Box>
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block', mt: 4 }}
          >
            © {new Date().getFullYear()} 김찬호 · Built with React · MUI · 스틸 블루 디자인 시스템
          </Typography>
        </Box>
      </Container>
    </AppTheme>
  );
}
