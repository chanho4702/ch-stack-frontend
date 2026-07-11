import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { listDesigns } from './designsStore';

export default function DesignsHome() {
  // 최근 업데이트순.
  const docs = React.useMemo(
    () =>
      [...listDesigns()].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [],
  );

  return (
    <Box sx={{ maxWidth: 1100 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 0.5 }}>
        설계 문서
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        최근 업데이트된 문서
      </Typography>

      {docs.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            px: 3,
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 1.5,
          }}
        >
          <ArticleOutlinedIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            아직 등록된 문서가 없습니다
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
            좌측 사이드바 또는 상단 “새 문서”로 첫 설계 문서를 작성해 보세요.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {docs.map((d) => (
            <Grid key={d.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  transition: (theme) =>
                    theme.transitions.create(['border-color', 'box-shadow']),
                  '&:hover': { borderColor: 'primary.main', boxShadow: 2 },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/designs/${d.id}`}
                  sx={{
                    p: 2.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Stack spacing={1.5} sx={{ height: '100%' }}>
                    <Chip
                      label={d.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ alignSelf: 'flex-start' }}
                    />
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.4 }}>{d.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {d.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      수정 {new Date(d.updatedAt).toLocaleDateString('ko-KR')}
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
