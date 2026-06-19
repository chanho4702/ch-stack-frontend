import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import { Section, Demo } from './shared';

export default function NavigationSection() {
  const [bottomNav, setBottomNav] = React.useState(0);
  const [tab, setTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Section id="navigation" title="Navigation" description="화면 이동/탐색 요소들">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Tabs">
            <Box sx={{ width: '100%' }}>
              <Tabs value={tab} onChange={(_e, v) => setTab(v)}>
                <Tab label="첫째" />
                <Tab label="둘째" />
                <Tab label="셋째" />
              </Tabs>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Breadcrumbs">
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Catalog
              </Link>
              <Typography>Current</Typography>
            </Breadcrumbs>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Bottom Navigation">
            <Box sx={{ width: '100%' }}>
              <BottomNavigation
                showLabels
                value={bottomNav}
                onChange={(_e, v) => setBottomNav(v)}
              >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
              </BottomNavigation>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Pagination">
            <Pagination count={10} color="primary" />
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Menu">
            <Button variant="outlined" onClick={(e) => setAnchorEl(e.currentTarget)}>
              메뉴 열기
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
            </Menu>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Drawer">
            <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
              Drawer 열기
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                <List>
                  {['Inbox', 'Starred', 'Send email'].map((text) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Stepper">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={1} alternativeLabel>
                <Step>
                  <StepLabel>선택</StepLabel>
                </Step>
                <Step>
                  <StepLabel>결제</StepLabel>
                </Step>
                <Step>
                  <StepLabel>완료</StepLabel>
                </Step>
              </Stepper>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Speed Dial">
            <Box sx={{ position: 'relative', height: 120, width: '100%' }}>
              <SpeedDial
                ariaLabel="SpeedDial demo"
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
                icon={<SpeedDialIcon />}
              >
                <SpeedDialAction icon={<FileCopyIcon />} slotProps={{ tooltip: { title: 'Copy' } }} />
                <SpeedDialAction icon={<SaveIcon />} slotProps={{ tooltip: { title: 'Save' } }} />
                <SpeedDialAction icon={<PrintIcon />} slotProps={{ tooltip: { title: 'Print' } }} />
              </SpeedDial>
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Link">
            <Link href="#" underline="hover">
              기본 링크
            </Link>
            <Link href="#" underline="always" color="secondary">
              secondary
            </Link>
          </Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
