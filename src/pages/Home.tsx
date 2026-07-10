import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AppTheme from '../context/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from '../context/templates/shared-theme/ColorModeIconDropdown';

interface HubCard {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

const cards: HubCard[] = [
  {
    to: '/login',
    title: '내가 운영할 서비스',
    description: '로그인 → 보호된 /app 대시보드 + 게시판(목록·글쓰기·수정·삭제). src/app 의 실제 서비스 골격.',
    icon: <RocketLaunchRoundedIcon fontSize="large" />,
    tag: 'Service',
  },
  {
    to: '/templates',
    title: '탬플릿',
    description: 'MUI 공식 템플릿(로그인·대시보드)과 컴포넌트 쇼케이스·카탈로그 통합 진입점.',
    icon: <WidgetsRoundedIcon fontSize="large" />,
    tag: 'Templates',
  },
  {
    to: '/designs',
    title: '나의 설계 문서',
    description: '아키텍처·API·DB·인프라 설계 문서를 정리하고 관리하는 공간. (조회 공개 · 편집 로그인)',
    icon: <ArchitectureRoundedIcon fontSize="large" />,
    tag: 'Docs',
  },
  {
    to: '/profile',
    title: '자기소개 및 이력',
    description: '자기소개·자기소개서·이력을 유형별로 정리하는 공간. (조회 공개 · 편집 로그인)',
    icon: <BadgeRoundedIcon fontSize="large" />,
    tag: 'Profile',
  },
];

export default function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10 }}>
        <ColorModeIconDropdown />
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 720 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            myFornt — MUI 템플릿
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            운영할 서비스, 참고용 탬플릿, 나의 설계 문서, 자기소개·이력을 한곳에서. MUI v9 기반
            작업 공간입니다.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid key={card.to} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardActionArea
                  component={RouterLink}
                  to={card.to}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Stack spacing={2} sx={{ height: '100%' }}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ color: 'primary.main' }}>{card.icon}</Box>
                        <Chip label={card.tag} size="small" />
                      </Stack>
                      <Typography variant="h6" component="h2">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AppTheme>
  );
}
