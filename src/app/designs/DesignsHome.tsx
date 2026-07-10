import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
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
    <Box sx={{ maxWidth: 880 }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 0.5 }}>
        설계 문서
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        최근 업데이트된 문서
      </Typography>

      {docs.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, textAlign: 'center', color: 'text.secondary' }}>
          아직 등록된 문서가 없습니다. 좌측 사이드바 또는 상단 “새 문서”로 시작하세요.
        </Paper>
      ) : (
        <Stack spacing={1}>
          {docs.map((d) => (
            <Card
              key={d.id}
              variant="outlined"
              sx={{ '&:hover': { borderColor: 'primary.main' } }}
            >
              <CardActionArea component={RouterLink} to={`/designs/${d.id}`} sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Chip label={d.category} size="small" />
                  <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>{d.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    수정 {new Date(d.updatedAt).toLocaleDateString('ko-KR')}
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
