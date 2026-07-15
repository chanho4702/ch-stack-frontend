// 랜딩과 상세 페이지가 공유하는 콘텐츠. 모든 사실은 이력서·확정 콘텐츠 범위.

export const GITHUB_URL = 'https://github.com/chanho4702';
export const CONTACT_EMAIL = 'chanho470@naver.com';
export const PORTFOLIO_URL = 'https://oxidized-tile-0f2.notion.site/9bd7653948f34869ac67163d4bf40a89';

export interface Service {
  slug: string;
  title: string;
  lead: string;
  evidence: string;
}

export const services: Service[] = [
  {
    slug: 'platform-architecture',
    title: '플랫폼 아키텍처',
    lead: '서비스가 설 토대를 설계합니다.',
    evidence: '서버리스 SaaS(Atlassian Forge)와 Spring Cloud 기반 MSA를 직접 설계·구현.',
  },
  {
    slug: 'data-engineering',
    title: '데이터 엔지니어링 · 관측',
    lead: '결정을 데이터 위에 세웁니다.',
    evidence: 'Elasticsearch 수집·적재, Beats/Logstash 로그 파이프라인, Kibana·Grafana 대시보드.',
  },
  {
    slug: 'operations-reliability',
    title: '운영 · 안정성',
    lead: '멈추지 않게 운영합니다.',
    evidence: 'SLA 기반 장애 대응, 보안 솔루션 30개 사이트 구축·운영.',
  },
  {
    slug: 'ai-dev-env',
    title: 'AI 개발 환경',
    lead: '팀이 더 빠르게 만들게 합니다.',
    evidence: 'Claude Code 에이전트·스킬·MCP 직접 구성, 문서 기반 AI 협업 프로세스.',
  },
];

export interface Product {
  slug: string;
  name: string;
  desc: string;
  href?: string; // 오픈소스 GitHub
  badge?: string; // 회사 제품 표기
  liveUrl?: string; // 구동 중인 앱 — nginx 단일 오리진(/wiki/, /alm/)에서만 유효
}

export const openSourceProducts: Product[] = [
  { slug: 'alm', name: 'ALM', desc: 'Jira 스타일 이슈·스프린트 관리.', href: 'https://github.com/chanho4702/ALM', liveUrl: '/alm/' },
  { slug: 'wiki', name: 'WIKI', desc: 'Confluence 스타일 문서·위키.', href: 'https://github.com/chanho4702/WIKI', liveUrl: '/wiki/' },
  {
    slug: 'design-system',
    name: 'Chanho Design System',
    desc: '스틸 블루 토큰과 Radix 기반 React 컴포넌트 라이브러리.',
    href: 'https://github.com/chanho4702/design-system',
  },
  {
    slug: 'msa-platform-template',
    name: 'MSA Platform Template',
    desc: 'Keycloak BFF · 게이트웨이 · 이벤트 기반 MSA 스타터.',
    href: 'https://github.com/chanho4702/infra-settings',
  },
];

export const companyProducts: Product[] = [
  {
    slug: 'moves-workforce',
    name: 'Moves Workforce',
    desc: 'Jira Cloud와 연동되는 인력·자원 관리 SaaS. Atlassian Forge 서버리스로 구현.',
    badge: '디무브',
  },
  {
    slug: 'moves-eye',
    name: 'Moves Eye',
    desc: 'Elastic Stack 기반 로그 수집·모니터링·관측 플랫폼.',
    badge: '디무브',
  },
];

export const allProducts: Product[] = [...openSourceProducts, ...companyProducts];

export const getService = (slug?: string): Service | undefined =>
  services.find((s) => s.slug === slug);
export const getProduct = (slug?: string): Product | undefined =>
  allProducts.find((p) => p.slug === slug);
