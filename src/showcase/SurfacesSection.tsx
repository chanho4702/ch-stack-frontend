import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Section, Demo } from './shared';

export default function SurfacesSection() {
  return (
    <Section id="surfaces" title="Surfaces" description="콘텐츠를 담는 표면 컨테이너">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Accordion">
            <Box sx={{ width: '100%' }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  섹션 1
                </AccordionSummary>
                <AccordionDetails>첫 번째 섹션의 상세 내용입니다.</AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  섹션 2
                </AccordionSummary>
                <AccordionDetails>두 번째 섹션의 상세 내용입니다.</AccordionDetails>
              </Accordion>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="App Bar">
            <Box sx={{ width: '100%' }}>
              <AppBar position="static" sx={{ borderRadius: 1 }}>
                <Toolbar variant="dense">
                  <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Title
                  </Typography>
                  <Button color="inherit">Login</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Card">
            <Card sx={{ width: '100%' }} variant="outlined">
              <CardContent>
                <Typography variant="h6">카드 제목</Typography>
                <Typography variant="body2" color="text.secondary">
                  카드 본문 내용이 여기에 들어갑니다.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">자세히</Button>
              </CardActions>
            </Card>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Paper">
            <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
              outlined
            </Paper>
            <Paper elevation={1} sx={{ p: 2 }}>
              elevation 1
            </Paper>
            <Paper elevation={4} sx={{ p: 2 }}>
              elevation 4
            </Paper>
          </Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
