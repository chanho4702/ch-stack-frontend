import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { listProfileDocs, PROFILE_DOC_TYPES, type ProfileDocType } from './profileStore';
import { profileInfo } from './profileInfo';
import { useAuth } from '../../auth';
import PublicPageShell from '../components/PublicPageShell';

type Filter = '전체' | ProfileDocType;

function excerpt(content: string, len = 120): string {
  const trimmed = content.trim();
  return trimmed.length > len ? `${trimmed.slice(0, len)}…` : trimmed;
}

export default function ProfileListPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const docs = React.useMemo(() => listProfileDocs(), []);
  const [filter, setFilter] = React.useState<Filter>('전체');

  // 실제 문서가 존재하는 유형만 필터 칩으로 노출.
  const availableTypes = React.useMemo(
    () => PROFILE_DOC_TYPES.filter((t) => docs.some((d) => d.docType === t)),
    [docs],
  );
  const filters: Filter[] = ['전체', ...availableTypes];
  const visible = filter === '전체' ? docs : docs.filter((d) => d.docType === filter);

  const initial = profileInfo.name.trim().charAt(0) || '?';

  return (
    <PublicPageShell maxWidth="md">
      {/* 히어로 */}
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', py: { xs: 3, md: 5 } }}>
        <Avatar sx={{ width: 88, height: 88, fontSize: 36, bgcolor: 'primary.main' }}>
          {initial}
        </Avatar>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
          {profileInfo.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 560 }}>
          {profileInfo.tagline}
        </Typography>
        {profileInfo.bio && (
          <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
            {profileInfo.bio}
          </Typography>
        )}
        {profileInfo.links.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {profileInfo.links.map((link) => (
              <Button
                key={link.label}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                endIcon={<OpenInNewRoundedIcon />}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* 유형 필터 + 새 글 */}
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <Chip
                key={f}
                label={f}
                color={filter === f ? 'primary' : 'default'}
                variant={filter === f ? 'filled' : 'outlined'}
                onClick={() => setFilter(f)}
              />
            ))}
          </Stack>
          {isAuthenticated && (
            <Button
              variant="contained"
              size="small"
              startIcon={<EditRoundedIcon />}
              onClick={() => navigate('/profile/new')}
            >
              새 글
            </Button>
          )}
        </Stack>

        {/* 글 카드 리스트 */}
        {visible.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 5, textAlign: 'center', color: 'text.secondary' }}>
            {docs.length === 0 ? '아직 등록된 글이 없습니다.' : '해당 유형의 글이 없습니다.'}
          </Paper>
        ) : (
          <Stack spacing={1.5}>
            {visible.map((d) => (
              <Card
                key={d.id}
                variant="outlined"
                sx={{
                  borderColor: 'divider',
                  transition: (theme) => theme.transitions.create(['border-color']),
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <CardActionArea component={RouterLink} to={`/profile/${d.id}`}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Chip label={d.docType} size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                          {new Date(d.createdAt).toLocaleDateString('ko-KR')}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {d.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {excerpt(d.content)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </PublicPageShell>
  );
}
