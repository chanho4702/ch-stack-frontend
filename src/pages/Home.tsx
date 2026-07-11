import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
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
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import AppTheme from '../context/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from '../context/templates/shared-theme/ColorModeIconDropdown';

// 브랜드 핸들·연락처 — 이력서·노션 포트폴리오 기준.
const GITHUB_URL = 'https://github.com/chanho4702';
const CONTACT_EMAIL = 'chanho470@naver.com';
const PORTFOLIO_URL = 'https://oxidized-tile-0f2.notion.site/9bd7653948f34869ac67163d4bf40a89';

// 역량을 서비스처럼 — "무엇을 해드립니다" 한 줄 + 근거 한 줄.
const services = [
  {
    icon: <HubRoundedIcon />,
    title: '플랫폼 아키텍처',
    lead: '서비스가 설 토대를 설계합니다.',
    evidence: '서버리스 SaaS(Atlassian Forge)와 Spring Cloud 기반 MSA를 직접 설계·구현.',
  },
  {
    icon: <ManageSearchRoundedIcon />,
    title: '데이터 엔지니어링 · 관측',
    lead: '결정을 데이터 위에 세웁니다.',
    evidence: 'Elasticsearch 수집·적재, Beats/Logstash 로그 파이프라인, Kibana·Grafana 대시보드.',
  },
  {
    icon: <ShieldRoundedIcon />,
    title: '운영 · 안정성',
    lead: '멈추지 않게 운영합니다.',
    evidence: 'SLA 기반 장애 대응, 보안 솔루션 30개 사이트 구축·운영.',
  },
  {
    icon: <SmartToyRoundedIcon />,
    title: 'AI 개발 환경',
    lead: '팀이 더 빠르게 만들게 합니다.',
    evidence: 'Claude Code 에이전트·스킬·MCP 직접 구성, 문서 기반 AI 협업 프로세스.',
  },
];

// 케이스 스터디 — 문제 → 해결 → 성과. 모두 이력서·확정 콘텐츠.
interface CaseStudy {
  eyebrow: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  images?: { src: string; alt: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    eyebrow: 'A-RMS · 장관상 2회 수상작',
    title: '기억에 의존하던 업무 이력을 데이터 기반 의사결정으로',
    problem:
      '프로젝트 이력이 담당자의 기억과 흩어진 문서에 남아, 진행률·인력·성과를 한눈에 볼 수 없었습니다.',
    solution:
      '사내 업무 이력 3,000건을 Jira로 자동 이관하고, ALM/Jira 데이터를 Elasticsearch로 수집·적재해 시계열 인덱스와 집계 쿼리로 분석 체계를 세웠습니다.',
    result:
      '진행률·인력 활용률·ROI를 실시간 대시보드로 시각화. 두 개의 장관상을 수상하고, 데이터 기반 의사결정 체계로 사내에 정착시켰습니다.',
    tags: ['Elasticsearch', 'Kibana', 'Spring', 'ALM 데이터 분석'],
    images: [
      { src: '/arms-architecture.png', alt: 'A-RMS 시스템 아키텍처 다이어그램' },
      { src: '/arms-award.png', alt: 'A-RMS 수상 발표 공고 — SW기술 대상 · 공개SW 개발자대회 대상' },
    ],
  },
  {
    eyebrow: 'RMS SaaS · 디무브',
    title: '수작업 인력 관리를 수백 명이 쓰는 SaaS로',
    problem:
      '엑셀과 수작업에 의존하던 리소스 관리 업무를, 여러 조직이 함께 쓰는 제품으로 만들어야 했습니다.',
    solution:
      'Atlassian Forge(Node.js) + React로 서버리스 SaaS를 설계하고, Excel 대량 등록을 Async Events + Queue로 분할 처리해 서버리스 실행시간 제한을 극복했습니다.',
    result:
      'Jira Cloud와 연동되는 RBAC 기반 플랫폼으로 수백 명이 사용합니다. Elastic Stack으로 로그를 관제합니다.',
    tags: ['Atlassian Forge', 'React', 'TanStack Query', 'Elastic Stack'],
  },
  {
    eyebrow: 'MSA 플랫폼 템플릿',
    title: '서비스를 만드는 게 아니라, 빠르게 만들 수 있는 환경을',
    problem: '새 서비스를 시작할 때마다 인증·게이트웨이·UI를 처음부터 세팅하는 반복이 있었습니다.',
    solution:
      'Keycloak BFF 인증과 API 게이트웨이, 자체 디자인 시스템을 하나의 스타터로 묶었습니다.',
    result:
      '퇴근 후·주말 2주 만에 재사용 가능한 MSA 플랫폼 골격을 완성했습니다. 이 소개 페이지도 그 위에서 만들었습니다.',
    tags: ['Keycloak', 'Spring Cloud Gateway', '디자인 시스템', 'MSA'],
    images: [{ src: '/msa-architecture.jpg', alt: 'MSA 스타터 템플릿 아키텍처 다이어그램' }],
  },
];

// 커리어 — 재직 회사만 (타임로그).
const history = [
  { year: '2025.12 ~ 재직중', text: '디무브 — 서버리스 SaaS RMS 플랫폼 설계·구현' },
  { year: '2022.05 ~ 2025.12', text: '마크애니 — 보안 솔루션 구축·운영, 레거시 SPA 전면 전환' },
];

// 기술 스택 — 보조 섹션으로 강등. 이력서 스킬 기준.
const techGroups = [
  {
    category: 'Backend',
    items: [
      'Spring Boot',
      'Spring Data JPA',
      'Spring Batch',
      'Spring Security',
      'WebFlux',
      'Spring Cloud',
      'Node.js (Forge)',
      'Kafka',
      'Redis',
      'Quartz',
    ],
  },
  {
    category: 'Data · Search',
    items: ['Elasticsearch', 'Kibana', 'Logstash', 'Beats / Fluentd', 'Grafana', 'MySQL', 'MSSQL'],
  },
  {
    category: 'DevOps · Infra',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Spinnaker', 'Nexus', 'SonarQube', 'Keycloak'],
  },
  { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'MUI', 'TanStack Query'] },
  { category: 'AI', items: ['Spring AI', 'Ollama', 'Claude Code 워크플로'] },
];

// /app 밖 개발용 진입점 — 보조 링크.
const devLinks = [
  { to: '/app', label: '서비스 데모' },
  { to: '/designs', label: '설계 문서' },
  { to: '/templates', label: 'MUI 템플릿' },
  { to: '/components', label: '컴포넌트 카탈로그' },
  { to: '/showcase', label: '컴포넌트 쇼케이스' },
];

// 섹션 상단 eyebrow 라벨 — 구조 장치.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em', display: 'block' }}
    >
      {children}
    </Typography>
  );
}

// 화이트 배경 이미지를 다크 카드에서 튀지 않게 감싸는 프레임.
function DiagramFrame({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
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
        image={src}
        alt={alt}
        loading="lazy"
        sx={{ width: '100%', height, objectFit: 'contain', display: 'block' }}
      />
    </Box>
  );
}

export default function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 20 }}>
        <ColorModeIconDropdown />
      </Box>

      {/* ── Hero — 가치 제안 ─────────────────────────── */}
      <Box
        component="section"
        sx={{
          background: (theme) =>
            `radial-gradient(ellipse 100% 60% at 15% -10%, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.24 : 0.1,
            )}, transparent)`,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 9, md: 16 }, pb: { xs: 8, md: 14 } }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
            <Avatar alt="김찬호 프로필 사진" src="/profile.png" sx={{ width: 44, height: 44 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>김찬호</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                플랫폼 백엔드 엔지니어
              </Typography>
            </Box>
          </Stack>

          <Eyebrow>PLATFORM ENGINEERING</Eyebrow>
          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.04,
              fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
            }}
          >
            수작업을{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              시스템
            </Box>
            으로 바꿉니다
          </Typography>
          <Typography
            sx={{
              mt: 3,
              maxWidth: 620,
              color: 'text.secondary',
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              lineHeight: 1.6,
            }}
          >
            플랫폼 설계부터 운영까지 — 데이터 기반 의사결정 체계를 만드는 엔지니어링.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5, mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              href="#work"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              성과 보기
            </Button>
            <Button variant="outlined" size="large" href="#contact">
              함께 일하기
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ── 커리어 (타임로그) ────────────────────────── */}
      <Box component="section" sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Eyebrow>CAREER</Eyebrow>
          <Box sx={{ maxWidth: 760, mt: 2 }}>
            {history.map((h, i) => (
              <Stack
                key={h.year}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 0.5, sm: 3 }}
                sx={{
                  py: 2.5,
                  borderTop: i === 0 ? '1px solid' : 0,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: { sm: 'baseline' },
                }}
              >
                <Typography
                  sx={{ minWidth: 168, fontWeight: 800, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}
                >
                  {h.year}
                </Typography>
                <Typography sx={{ color: 'text.primary' }}>{h.text}</Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── What I do ────────────────────────────────── */}
      <Box component="section">
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Eyebrow>WHAT I DO</Eyebrow>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mt: 1.5, mb: 5 }}>
            무엇을 해드리는가
          </Typography>
          <Grid container spacing={3}>
            {services.map((s) => (
              <Grid key={s.title} size={{ xs: 12, sm: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
                    '&:hover': { borderColor: 'primary.main', boxShadow: 2 },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                    <Box sx={{ color: 'primary.main', mb: 2, '& svg': { fontSize: 32 } }}>
                      {s.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{ mt: 1, fontWeight: 500 }}>{s.lead}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', lineHeight: 1.7 }}>
                      {s.evidence}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 케이스 스터디 ────────────────────────────── */}
      <Box component="section" id="work" sx={{ bgcolor: 'background.paper', scrollMarginTop: '1.5rem' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Eyebrow>CASE STUDIES</Eyebrow>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mt: 1.5, mb: 1 }}>
            문제를 어떻게 시스템으로 바꿨는가
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 6 }}>
            문제 → 해결 → 성과.
          </Typography>

          <Stack spacing={{ xs: 5, md: 8 }}>
            {caseStudies.map((c, i) => (
              <Grid key={c.title} container spacing={{ xs: 3, md: 5 }} sx={{ alignItems: 'center' }}>
                {/* 텍스트 — 이미지 있는 카드는 지그재그로 좌우 교대 */}
                <Grid
                  size={{ xs: 12, md: c.images ? 7 : 12 }}
                  sx={{ order: { md: i % 2 === 1 ? 2 : 1 } }}
                >
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mt: 1.5, mb: 3, lineHeight: 1.35 }}>
                    {c.title}
                  </Typography>
                  <Stack spacing={2}>
                    {(
                      [
                        ['문제', c.problem],
                        ['해결', c.solution],
                        ['성과', c.result],
                      ] as const
                    ).map(([label, body]) => (
                      <Stack key={label} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                        <Box sx={{ minWidth: 44, pt: 0.25 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: label === '성과' ? 'primary.main' : 'text.secondary',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {label}
                          </Typography>
                        </Box>
                        <ArrowRightAltRoundedIcon
                          sx={{ color: 'primary.main', flexShrink: 0, opacity: label === '성과' ? 1 : 0.5 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.75,
                            color: label === '성과' ? 'text.primary' : 'text.secondary',
                            fontWeight: label === '성과' ? 500 : 400,
                          }}
                        >
                          {body}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 3 }}>
                    {c.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>

                {c.images && (
                  <Grid size={{ xs: 12, md: 5 }} sx={{ order: { md: i % 2 === 1 ? 1 : 2 } }}>
                    <Stack spacing={2}>
                      {c.images.map((img) => (
                        <DiagramFrame key={img.src} src={img.src} alt={img.alt} height={img.src.includes('award') ? 300 : 200} />
                      ))}
                    </Stack>
                  </Grid>
                )}
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ── 기술 스택 (보조) ─────────────────────────── */}
      <Box component="section" sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
          <Eyebrow>STACK</Eyebrow>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mt: 1.5, mb: 4 }}>
            기술 스택
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {techGroups.map((group) => (
              <Grid key={group.category} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'text.secondary', fontWeight: 700, mb: 1.5 }}
                >
                  {group.category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {group.items.map((item) => (
                    <Chip key={item} label={item} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 연락 CTA ─────────────────────────────────── */}
      <Box
        component="section"
        id="contact"
        sx={{
          scrollMarginTop: '1.5rem',
          background: (theme) =>
            `linear-gradient(180deg, transparent, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.16 : 0.07,
            )})`,
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 10, md: 14 }, textAlign: 'center' }}>
          <Eyebrow>LET&apos;S WORK TOGETHER</Eyebrow>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 800, mt: 2, mb: 2, letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            함께 일할 사람을 찾고 계신가요?
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', mb: 4, fontSize: '1.05rem' }}>
            플랫폼을 설계하고, 데이터로 굴러가게 만들고, 팀이 더 빠르게 만들 환경까지 함께 세울 사람입니다.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Button
              variant="contained"
              size="large"
              href={`mailto:${CONTACT_EMAIL}`}
              startIcon={<EmailRoundedIcon />}
            >
              이메일 보내기
            </Button>
            <Button
              variant="outlined"
              size="large"
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
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
            {CONTACT_EMAIL}
          </Typography>
        </Container>
      </Box>

      {/* ── 푸터 ─────────────────────────────────────── */}
      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              © {new Date().getFullYear()} 김찬호 · Built with React · MUI · 스틸 블루 디자인 시스템
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
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
          </Stack>
        </Container>
      </Box>
    </AppTheme>
  );
}
