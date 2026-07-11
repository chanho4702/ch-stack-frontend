import { useState } from 'react';
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
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AppTheme from '../context/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from '../context/templates/shared-theme/ColorModeIconDropdown';

// 브랜드 핸들·연락처 — 이력서·노션 포트폴리오 기준.
const GITHUB_URL = 'https://github.com/chanho4702';
const CONTACT_EMAIL = 'chanho470@naver.com';
const PORTFOLIO_URL = 'https://oxidized-tile-0f2.notion.site/9bd7653948f34869ac67163d4bf40a89';

// 상단 헤더 내비 — 앵커/라우트/외부 혼합.
interface NavItem {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
}
const navItems: NavItem[] = [
  { label: '제품', href: '#products' },
  { label: '성과', href: '#work' },
  { label: '설계 문서', to: '/designs' },
  { label: '프로필', to: '/profile' },
  { label: 'GitHub', href: GITHUB_URL, external: true },
];

// 역량 — "무엇을 해드립니다" 약속 한 줄 + 근거 한 줄. 아이콘 없이 타이포로.
const services = [
  {
    title: '플랫폼 아키텍처',
    lead: '서비스가 설 토대를 설계합니다.',
    evidence: '서버리스 SaaS(Atlassian Forge)와 Spring Cloud 기반 MSA를 직접 설계·구현.',
  },
  {
    title: '데이터 엔지니어링 · 관측',
    lead: '결정을 데이터 위에 세웁니다.',
    evidence: 'Elasticsearch 수집·적재, Beats/Logstash 로그 파이프라인, Kibana·Grafana 대시보드.',
  },
  {
    title: '운영 · 안정성',
    lead: '멈추지 않게 운영합니다.',
    evidence: 'SLA 기반 장애 대응, 보안 솔루션 30개 사이트 구축·운영.',
  },
  {
    title: 'AI 개발 환경',
    lead: '팀이 더 빠르게 만들게 합니다.',
    evidence: 'Claude Code 에이전트·스킬·MCP 직접 구성, 문서 기반 AI 협업 프로세스.',
  },
];

// 제품 — 오픈소스(직접) / 디무브(회사). 설명은 확정 콘텐츠 범위만.
interface Product {
  name: string;
  desc: string;
  href?: string; // 오픈소스 GitHub
  badge?: string; // 회사 제품 표기
}
const openSourceProducts: Product[] = [
  { name: 'ALM', desc: 'Jira 스타일 이슈·스프린트 관리.', href: 'https://github.com/chanho4702/ALM' },
  { name: 'WIKI', desc: 'Confluence 스타일 문서·위키.', href: 'https://github.com/chanho4702/WIKI' },
  {
    name: 'Chanho Design System',
    desc: '스틸 블루 토큰과 Radix 기반 React 컴포넌트 라이브러리.',
    href: 'https://github.com/chanho4702/design-system',
  },
  {
    name: 'MSA Platform Template',
    desc: 'Keycloak BFF · 게이트웨이 · 이벤트 기반 MSA 스타터.',
    href: 'https://github.com/chanho4702/infra-settings',
  },
];
const companyProducts: Product[] = [
  {
    name: 'Moves Workforce',
    desc: 'Jira Cloud와 연동되는 인력·자원 관리 SaaS. Atlassian Forge 서버리스로 구현.',
    badge: '디무브',
  },
  {
    name: 'Moves Eye',
    desc: 'Elastic Stack 기반 로그 수집·모니터링·관측 플랫폼.',
    badge: '디무브',
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
    solution: 'Keycloak BFF 인증과 API 게이트웨이, 자체 디자인 시스템을 하나의 스타터로 묶었습니다.',
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

// 기술 스택 — 보조 섹션. 이력서 스킬 기준.
const techGroups = [
  {
    category: 'Backend',
    items: ['Spring Boot', 'Spring Data JPA', 'Spring Batch', 'Spring Security', 'WebFlux', 'Spring Cloud', 'Node.js (Forge)', 'Kafka', 'Redis', 'Quartz'],
  },
  { category: 'Data · Search', items: ['Elasticsearch', 'Kibana', 'Logstash', 'Beats / Fluentd', 'Grafana', 'MySQL', 'MSSQL'] },
  { category: 'DevOps · Infra', items: ['Docker', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Spinnaker', 'Nexus', 'SonarQube', 'Keycloak'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'MUI', 'TanStack Query'] },
  { category: 'AI', items: ['Spring AI', 'Ollama', 'Claude Code 워크플로'] },
];

// /app 밖 개발용 진입점 — 푸터 보조 링크.
const devLinks = [
  { to: '/app', label: '서비스 데모' },
  { to: '/designs', label: '설계 문서' },
  { to: '/templates', label: 'MUI 템플릿' },
  { to: '/components', label: '컴포넌트 카탈로그' },
  { to: '/showcase', label: '컴포넌트 쇼케이스' },
];

const HEADER_H = 52;

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

// 섹션 헤더 — 위계 통일.
function SectionTitle({ eyebrow, title, caption }: { eyebrow: string; title: string; caption?: string }) {
  return (
    <Box sx={{ mb: { xs: 5, md: 7 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 700, mt: 1.5, letterSpacing: '-0.02em', fontSize: 'clamp(1.7rem, 3.5vw, 2.25rem)' }}
      >
        {title}
      </Typography>
      {caption && (
        <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 560 }}>{caption}</Typography>
      )}
    </Box>
  );
}

// 화이트 배경 이미지를 다크에서 튀지 않게 감싸는 프레임.
function DiagramFrame({ src, alt, height }: { src: string; alt: string; height: number }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: 'common.white' }}>
      <CardMedia component="img" image={src} alt={alt} loading="lazy" sx={{ width: '100%', height, objectFit: 'contain', display: 'block' }} />
    </Box>
  );
}

// 제품 카드 — 담백. 기본은 조용하고 hover에서만 강조.
function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderColor: 'divider',
        transition: (theme) => theme.transitions.create(['border-color', 'transform']),
        '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' },
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            {product.name}
          </Typography>
          {product.badge && <Chip label={product.badge} size="small" color="primary" variant="outlined" />}
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1 }}>
          {product.desc}
        </Typography>
        {product.href ? (
          <Link
            href={product.href}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.8125rem', fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <GitHubIcon sx={{ fontSize: 16 }} />
            소스 보기
          </Link>
        ) : (
          <Typography variant="caption" sx={{ mt: 2, color: 'text.disabled' }}>
            사내·고객사 제품 · 비공개
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Home(props: { disableCustomTheme?: boolean }) {
  const [navOpen, setNavOpen] = useState(false);

  const renderNavLink = (item: NavItem, onClick?: () => void, big?: boolean) => {
    const sx = {
      fontSize: big ? '1.05rem' : '0.85rem',
      fontWeight: 500,
      color: 'text.secondary',
      '&:hover': { color: 'text.primary' },
    } as const;
    if (item.to) {
      return (
        <Link key={item.label} component={RouterLink} to={item.to} underline="none" onClick={onClick} sx={sx}>
          {item.label}
        </Link>
      );
    }
    return (
      <Link
        key={item.label}
        href={item.href}
        {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
        underline="none"
        onClick={onClick}
        sx={sx}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      {/* ── 상단 헤더 (Apple 스타일 슬림·반투명) ─────────── */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          bgcolor: (theme) => alpha(theme.palette.background.default, 0.72),
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ height: HEADER_H, alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="#top" underline="none" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary', fontSize: '1rem' }}>
              chanho.dev
            </Link>

            {/* 데스크톱 내비 */}
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => renderNavLink(item))}
              <ColorModeIconDropdown size="small" />
            </Stack>

            {/* 모바일 */}
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <ColorModeIconDropdown size="small" />
              <IconButton onClick={() => setNavOpen(true)} aria-label="메뉴 열기" size="small">
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 모바일 내비 Drawer */}
      <Drawer anchor="right" open={navOpen} onClose={() => setNavOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setNavOpen(false)} aria-label="메뉴 닫기">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2.5} sx={{ p: 2, pt: 1 }}>
            {navItems.map((item) => renderNavLink(item, () => setNavOpen(false), true))}
          </Stack>
        </Box>
      </Drawer>

      {/* ── Hero — 가치 제안 ─────────────────────────── */}
      <Box
        component="section"
        id="top"
        sx={{
          background: (theme) =>
            `radial-gradient(ellipse 90% 55% at 12% -10%, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.2 : 0.08,
            )}, transparent)`,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 18 }, pb: { xs: 9, md: 16 } }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
            <Avatar alt="김찬호 프로필 사진" src="/profile.png" sx={{ width: 40, height: 40 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              김찬호 · 플랫폼 백엔드 엔지니어
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{ fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, fontSize: 'clamp(3rem, 9vw, 6rem)' }}
          >
            수작업을{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              시스템
            </Box>
            으로
            <br />
            바꿉니다
          </Typography>
          <Typography
            sx={{ mt: 4, maxWidth: 600, color: 'text.secondary', fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', lineHeight: 1.6 }}
          >
            플랫폼 설계부터 운영까지 — 데이터 기반 의사결정 체계를 만드는 엔지니어링.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5, mt: 5 }}>
            <Button variant="contained" size="large" href="#work" endIcon={<ArrowForwardRoundedIcon />}>
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
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <Eyebrow>CAREER</Eyebrow>
          <Box sx={{ maxWidth: 820, mt: 2.5 }}>
            {history.map((h, i) => (
              <Stack
                key={h.year}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 0.5, sm: 3 }}
                sx={{ py: 2.75, borderTop: i === 0 ? '1px solid' : 0, borderBottom: '1px solid', borderColor: 'divider', alignItems: { sm: 'baseline' } }}
              >
                <Typography sx={{ minWidth: 172, fontWeight: 700, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}>
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
        <Container maxWidth="lg" sx={{ py: { xs: 9, md: 15 } }}>
          <SectionTitle eyebrow="WHAT I DO" title="무엇을 해드리는가" />
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {services.map((s) => (
              <Grid key={s.title} size={{ xs: 12, sm: 6 }}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderColor: 'divider',
                    transition: (theme) => theme.transitions.create(['border-color']),
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}>
                      {s.title}
                    </Typography>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mt: 0.5, mb: 1.5 }}>
                      {s.lead}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                      {s.evidence}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 제품 (Products) ──────────────────────────── */}
      <Box component="section" id="products" sx={{ bgcolor: 'background.paper', scrollMarginTop: `${HEADER_H + 8}px` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 9, md: 15 } }}>
          <SectionTitle
            eyebrow="PRODUCTS"
            title="만든 것들"
            caption="직접 만든 오픈소스, 회사에서 만든 제품, 그리고 설계 문서."
          />

          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 2 }}>
            오픈소스 · 직접 만든 제품
          </Typography>
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {openSourceProducts.map((p) => (
              <Grid key={p.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 2, mt: { xs: 5, md: 7 } }}>
            디무브 · 재직 중 개발
          </Typography>
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {companyProducts.map((p) => (
              <Grid key={p.name} size={{ xs: 12, sm: 6 }}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>

          {/* 설계 문서 진입 카드 */}
          <Card
            variant="outlined"
            sx={{
              mt: { xs: 2.5, md: 3 },
              borderColor: 'divider',
              transition: (theme) => theme.transitions.create(['border-color']),
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <CardContent
              component={RouterLink}
              to="/designs"
              sx={{
                p: { xs: 3, md: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                textDecoration: 'none',
                color: 'inherit',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  설계 문서
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  아키텍처 · API · DB 설계 문서 모음.
                </Typography>
              </Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontWeight: 600 }}>
                열기
                <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* ── 케이스 스터디 ────────────────────────────── */}
      <Box component="section" id="work" sx={{ scrollMarginTop: `${HEADER_H + 8}px` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 9, md: 15 } }}>
          <SectionTitle
            eyebrow="CASE STUDIES"
            title="문제를 어떻게 시스템으로 바꿨는가"
            caption="문제 → 해결 → 성과."
          />
          <Stack spacing={{ xs: 6, md: 10 }}>
            {caseStudies.map((c, i) => (
              <Grid key={c.title} container spacing={{ xs: 3, md: 6 }} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, md: c.images ? 7 : 12 }} sx={{ order: { md: i % 2 === 1 ? 2 : 1 } }}>
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mt: 1.5, mb: 3, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
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
                          <Typography variant="caption" sx={{ fontWeight: 700, color: label === '성과' ? 'primary.main' : 'text.secondary', letterSpacing: '0.05em' }}>
                            {label}
                          </Typography>
                        </Box>
                        <ArrowRightAltRoundedIcon sx={{ color: 'primary.main', flexShrink: 0, opacity: label === '성과' ? 1 : 0.5 }} />
                        <Typography variant="body2" sx={{ lineHeight: 1.75, color: label === '성과' ? 'text.primary' : 'text.secondary', fontWeight: label === '성과' ? 500 : 400 }}>
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
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Eyebrow>STACK</Eyebrow>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mt: 1.5, mb: 5, letterSpacing: '-0.01em' }}>
            기술 스택
          </Typography>
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {techGroups.map((group) => (
              <Grid key={group.category} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1.5 }}>
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
          scrollMarginTop: `${HEADER_H + 8}px`,
          background: (theme) =>
            `linear-gradient(180deg, transparent, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.16 : 0.06)})`,
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 11, md: 16 }, textAlign: 'center' }}>
          <Eyebrow>LET&apos;S WORK TOGETHER</Eyebrow>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 800, mt: 2, mb: 2.5, letterSpacing: '-0.025em', lineHeight: 1.12, fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            함께 일할 사람을 찾고 계신가요?
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', mb: 5, fontSize: '1.05rem', lineHeight: 1.7 }}>
            플랫폼을 설계하고, 데이터로 굴러가게 만들고, 팀이 더 빠르게 만들 환경까지 함께 세울 사람입니다.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Button variant="contained" size="large" href={`mailto:${CONTACT_EMAIL}`} startIcon={<EmailRoundedIcon />}>
              이메일 보내기
            </Button>
            <Button variant="outlined" size="large" href={PORTFOLIO_URL} target="_blank" rel="noopener" startIcon={<LaunchRoundedIcon />}>
              포트폴리오
            </Button>
            <Button variant="outlined" size="large" href={GITHUB_URL} target="_blank" rel="noopener" startIcon={<GitHubIcon />}>
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
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
