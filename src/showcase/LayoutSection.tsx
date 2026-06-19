import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Section, Demo } from './shared';

const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper
    variant="outlined"
    sx={{ p: 1.5, textAlign: 'center', bgcolor: 'action.hover', minWidth: 56 }}
  >
    {children}
  </Paper>
);

export default function LayoutSection() {
  return (
    <Section id="layout" title="Layout" description="레이아웃 구성 요소들">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Box">
            <Box
              sx={{
                width: '100%',
                height: 80,
                borderRadius: 1,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText',
              }}
            >
              sx 로 스타일링한 Box
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Stack">
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Stack>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Grid">
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <Item>size=6</Item>
                </Grid>
                <Grid size={6}>
                  <Item>size=6</Item>
                </Grid>
                <Grid size={4}>
                  <Item>4</Item>
                </Grid>
                <Grid size={4}>
                  <Item>4</Item>
                </Grid>
                <Grid size={4}>
                  <Item>4</Item>
                </Grid>
              </Grid>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Container">
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                Container 는 콘텐츠를 중앙 정렬하고 최대 너비(maxWidth)를 제한합니다. 이
                쇼케이스 페이지 자체가 <code>&lt;Container maxWidth="lg"&gt;</code> 로
                감싸져 있습니다.
              </Typography>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Image List">
            <ImageList sx={{ width: '100%', height: 160, m: 0 }} cols={3} rowHeight={76} gap={6}>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <ImageListItem key={n}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 1,
                      bgcolor: `hsl(${n * 50}, 70%, 65%)`,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
