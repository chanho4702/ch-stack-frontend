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
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AppTheme from '../context/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from '../context/templates/shared-theme/ColorModeIconDropdown';

// 개인 브랜드 핸들/연락처 — 이력서·노션 포트폴리오 기준.
const GITHUB_URL = 'https://github.com/chanho4702';
const CONTACT_EMAIL = 'chanho470@naver.com';
const PORTFOLIO_URL = 'https://oxidized-tile-0f2.notion.site/9bd7653948f34869ac67163d4bf40a89';

// 기술 스택 — 이력서 스킬 기준.
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
      'Spring Boot',
      'Spring Data JPA',
      'Spring Batch',
      'Spring Security',
      'Spring WebFlux',
      'Spring Cloud',
      'Node.js (Forge)',
      'Kafka',
      'Redis',
      'Quartz',
    ],
  },
  {
    category: 'Data · Search',
    icon: <ManageSearchRoundedIcon />,
    items: ['Elasticsearch', 'Kibana', 'Logstash', 'Beats / Fluentd', 'Grafana', 'MySQL', 'MSSQL'],
  },
  {
    category: 'DevOps · Infra',
    icon: <CloudRoundedIcon />,
    items: [
      'Docker',
      'Kubernetes',
      'Jenkins',
      'ArgoCD',
      'Spinnaker',
      'Nexus',
      'SonarQube',
      'Keycloak',
    ],
  },
  {
    category: 'Frontend',
    icon: <CodeRoundedIcon />,
    items: ['React', 'Vue.js', 'TypeScript', 'MUI', 'TanStack Query'],
  },
  {
    category: 'AI',
    icon: <SmartToyRoundedIcon />,
    items: ['Spring AI', 'Ollama', 'Claude Code 워크플로'],
  },
];

// 수상 — 2024.12, 모두 A-RMS(Elasticsearch 기반 프로젝트 분석 시스템) 성과.
const awards = [
  {
    title: '2024 대한민국 SW기술 대상 · IT 아키텍처 대상',
    grade: '장관상',
    org: '한국소프트웨어기술진흥협회',
  },
  {
    title: '공개 SW 개발자 대회 대상',
    grade: '장관상',
    org: '과학기술정보통신부',
  },
];

// 경력 타임라인.
interface Career {
  period: string;
  company: string;
  note?: string;
  points: string[];
}

const careers: Career[] = [
  {
    period: '2025.12 – 재직 중',
    company: '디무브',
    points: [
      'Atlassian Forge(Node.js) + React 기반 서버리스 SaaS RMS 플랫폼 설계·구현',
      'Forge SQL/KVS 데이터 모델링, Jira Cloud API 연동, RBAC 접근 제어',
      'Excel 대량 등록을 Async Events + Queue 분할 처리로 안정화 — 서버리스 실행시간 제한 극복, TanStack Query 캐싱',
      'Elastic Stack 로그 관제 — 클러스터 설계, Metricbeat/Filebeat 파이프라인, Kibana 대시보드',
    ],
  },
  {
    period: '2022.05 – 2025.12 · 3년 8개월',
    company: '마크애니',
    points: [
      '보안 솔루션(문서 위변조 방지 · WebDRM) 30개 사이트 구축·운영, SLA 기반 장애 대응',
      'JSP 레거시 전체를 SPA(Vue/React + Spring Boot REST)로 전면 전환',
      '사내 업무 이력 3,000건을 Jira로 자동 이관하는 파이프라인 구축',
    ],
  },
  {
    period: '2021.01 – 2021.02',
    company: '모아소프트',
    note: '인턴',
    points: [],
  },
];

// 프로젝트 쇼케이스 — A-RMS(실무 수상작) + C:\MSA_TEMPLATE 저장소들.
interface Project {
  title: string;
  summary: string;
  tags: string[];
  icon: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

const projects: Project[] = [
  {
    title: 'A-RMS',
    summary:
      'Elasticsearch 기반 프로젝트 분석 시스템. ALM/Jira 데이터를 수집·적재하고 시계열 인덱스·집계 쿼리로 진행률·인력 활용률·ROI를 실시간 시각화합니다. 두 개의 장관상 수상작.',
    tags: ['Elasticsearch', 'Kibana', 'Spring', 'ALM 데이터 분석'],
    icon: <InsightsRoundedIcon fontSize="large" />,
    image: '/arms-architecture.png',
    imageAlt: 'A-RMS 시스템 아키텍처 다이어그램',
  },
  {
    title: 'MSA Platform Template',
    summary:
      'Spring Boot 4 · Spring Cloud 기반 마이크로서비스 골격. Eureka 서비스 디스커버리, Gateway 라우팅, Keycloak OIDC 인증, board-service 도메인으로 구성했습니다.',
    tags: ['Spring Cloud Gateway', 'Eureka', 'Keycloak OIDC', 'Resilience4j'],
    icon: <HubRoundedIcon fontSize="large" />,
    image: '/msa-architecture.jpg',
    imageAlt: 'MSA 스타터 템플릿 아키텍처 다이어그램',
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

// 지금 배우는 것.
const learning = [
  { title: 'Kafka', desc: '이벤트 드리븐 아키텍처(EDA)' },
  { title: 'Spring AI', desc: 'LLM 통합 · Ollama 로컬 LLM' },
];

// 관심사.
const interests = [
  '재사용 가능한 모듈과 플랫폼화',
  'AI 기반 개발 환경 — Claude Code 에이전트 · 스킬 · MCP 직접 구성',
  '문서 기반 AI 협업 프로세스',
];

// /app 밖 개발용 진입점 — 랜딩에서는 보조 영역으로 강등한다.
const devLinks: { to: string; label: string }[] = [
  { to: '/app', label: '서비스 데모' },
  { to: '/designs', label: '설계 문서' },
  { to: '/templates', label: 'MUI 템플릿' },
  { to: '/components', label: '컴포넌트 카탈로그' },
  { to: '/showcase', label: '컴포넌트 쇼케이스' },
];

function SectionHeading({ title, caption }: { title: string; caption?: string }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: caption ? 1 : 0 }}>
        {title}
      </Typography>
      {caption && <Typography sx={{ color: 'text.secondary' }}>{caption}</Typography>}
    </Box>
  );
}

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
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between' }}
          >
          <Stack spacing={3} sx={{ maxWidth: 820, flex: 1 }}>
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
            <Box>
              <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
                수작업을 시스템으로 바꾸는 개발자
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1 }}
              >
                김찬호
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              플랫폼 백엔드 엔지니어 · SaaS · 서버리스 아키텍처 설계 · 경력 4년 4개월
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8 }}>
              사내 업무 이력 3,000건을 Jira로 자동 이관하는 파이프라인을 만들고, 그 경험을 발전시킨
              Elasticsearch 기반 프로젝트 분석 시스템 A-RMS로 두 개의 장관상을 받았습니다. 개인 학습으로
              끝내지 않고 실제 사내 업무 시스템에 도입해 데이터 기반 의사결정 체계로 정착시켰습니다. 제
              목표는 서비스를 만드는 것이 아니라, 서비스를 빠르게 만들 수 있는 환경을 만드는 것입니다.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
              <Button
                variant="contained"
                size="large"
                component="a"
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener"
                startIcon={<LaunchRoundedIcon />}
              >
                포트폴리오
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/profile"
                startIcon={<BadgeRoundedIcon />}
              >
                프로필 보기
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
            <Avatar
              alt="김찬호 프로필 사진"
              src="/profile.png"
              sx={{
                width: { xs: 132, md: 208 },
                height: { xs: 132, md: 208 },
                flexShrink: 0,
                alignSelf: { xs: 'flex-start', md: 'center' },
                boxShadow: 4,
                border: '4px solid',
                borderColor: 'background.paper',
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        {/* ── 수상 ─────────────────────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 4, md: 6 } }}>
          <SectionHeading
            title="수상"
            caption="A-RMS — ALM/Jira 데이터를 Elasticsearch로 수집·적재하고 진행률·인력 활용률·ROI를 실시간 시각화한 프로젝트 분석 시스템"
          />
          <Grid container spacing={3}>
            {awards.map((award) => (
              <Grid key={award.title} size={{ xs: 12, md: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderColor: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <EmojiEventsRoundedIcon sx={{ color: 'primary.main', fontSize: 36, flexShrink: 0 }} />
                    <Box>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                        <Chip label={award.grade} size="small" color="primary" />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          2024.12
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontWeight: 700, lineHeight: 1.4 }}>{award.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {award.org}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* 수상 발표 공고 콜라주 — 클릭 시 원본 새 탭. 흰 배경이 다크에서 튀지 않게 흰 프레임+테두리. */}
          <Box
            component="a"
            href="/arms-award.png"
            target="_blank"
            rel="noopener"
            sx={{
              display: 'block',
              mt: 3,
              mx: 'auto',
              maxWidth: 480,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'common.white',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src="/arms-award.png"
              alt="A-RMS 수상 발표 공고 — 2024 대한민국 SW기술 대상 · 공개SW 개발자대회 대상"
              loading="lazy"
              sx={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </Box>
        </Box>

        {/* ── 경력 ─────────────────────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 6, md: 10 } }}>
          <SectionHeading title="경력" />
          <Box sx={{ maxWidth: 820 }}>
            {careers.map((career, i) => (
              <Box
                key={career.company}
                sx={{
                  position: 'relative',
                  pl: 3.5,
                  pb: i === careers.length - 1 ? 0 : 4,
                  borderLeft: '2px solid',
                  borderColor: 'divider',
                  ml: 1,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: -8,
                    top: 2,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    border: '3px solid',
                    borderColor: 'background.default',
                  }}
                />
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 0, sm: 1.5 }}
                  sx={{ alignItems: { sm: 'baseline' }, mb: 1, flexWrap: 'wrap' }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {career.company}
                  </Typography>
                  {career.note && <Chip label={career.note} size="small" variant="outlined" />}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {career.period}
                  </Typography>
                </Stack>
                {career.points.length > 0 && (
                  <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
                    {career.points.map((point, j) => (
                      <Typography
                        key={j}
                        component="li"
                        variant="body2"
                        sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                      >
                        {point}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── 기술 스택 ─────────────────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 6, md: 10 } }}>
          <SectionHeading title="기술 스택" />
          <Grid container spacing={3}>
            {techGroups.map((group) => (
              <Grid key={group.category} size={{ xs: 12, sm: 6, md: 4 }}>
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
          <SectionHeading title="프로젝트" caption="직접 설계하고 구축한 작업들." />
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid key={project.title} size={{ xs: 12, sm: 6 }}>
                <Card
                  variant="outlined"
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  {project.image && (
                    // 아키텍처 다이어그램 — 흰 배경이 다크 카드에서 튀지 않게 흰 프레임+테두리+radius.
                    <Box sx={{ p: 1.5, pb: 0 }}>
                      <Box
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1.5,
                          overflow: 'hidden',
                          bgcolor: 'common.white',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={project.image}
                          alt={project.imageAlt}
                          loading="lazy"
                          sx={{ width: '100%', height: 184, objectFit: 'contain', display: 'block' }}
                        />
                      </Box>
                    </Box>
                  )}
                  <CardContent
                    sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
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

        {/* ── 지금 배우는 것 · 관심사 ─────────────────────── */}
        <Box component="section" sx={{ mt: { xs: 6, md: 10 } }}>
          <SectionHeading title="지금 배우는 것 · 관심사" />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2}>
                {learning.map((item) => (
                  <Card key={item.title} variant="outlined">
                    <CardContent sx={{ p: 2.5, display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <AutoAwesomeRoundedIcon sx={{ color: 'primary.main', mt: 0.25 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.25} sx={{ mb: 2.5 }}>
                    {interests.map((interest) => (
                      <Stack key={interest} direction="row" spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                        <WorkRoundedIcon sx={{ color: 'primary.main', fontSize: 18, mt: 0.35 }} />
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {interest}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    이 관심사가 곧 위 프로젝트 쇼케이스의 MSA 플랫폼 템플릿으로 이어집니다 — 서비스를 빠르게
                    만들 수 있는 환경을, 코드와 디자인 시스템과 AI 개발 워크플로로 직접 조립해 검증하는 중입니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
              <Stack sx={{ mt: 1.5, gap: 1 }}>
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.primary', fontWeight: 500 }}
                >
                  <GitHubIcon fontSize="small" />
                  github.com/chanho4702
                </Link>
                <Link
                  href={PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.primary', fontWeight: 500 }}
                >
                  <LaunchRoundedIcon fontSize="small" />
                  포트폴리오 (Notion)
                </Link>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  underline="hover"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.primary', fontWeight: 500 }}
                >
                  <EmailRoundedIcon fontSize="small" />
                  {CONTACT_EMAIL}
                </Link>
              </Stack>
            </Box>

            {/* 개발용 진입점 — 보조 영역 */}
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
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
                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25, '&:hover': { color: 'primary.main' } }}
                  >
                    {l.label}
                    <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
                  </Link>
                ))}
              </Stack>
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 4 }}>
            © {new Date().getFullYear()} 김찬호 · Built with React · MUI · 스틸 블루 디자인 시스템
          </Typography>
        </Box>
      </Container>
    </AppTheme>
  );
}
