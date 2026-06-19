import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuButton from '../../context/templates/dashboard/components/MenuButton';
import CardAlert from '../../context/templates/dashboard/components/CardAlert';
import { CustomIcon } from '../../context/templates/dashboard/components/AppNavbar';
import ColorModeIconDropdown from '../../context/templates/shared-theme/ColorModeIconDropdown';
import AppMenuContent from './AppMenuContent';
import { useAuth } from '../auth/AuthContext';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.list}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function AppNavbar({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1, width: '100%', gap: 1 }}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mr: 'auto' }}>
            <CustomIcon />
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              myFornt
            </Typography>
          </Stack>
          <ColorModeIconDropdown />
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
        </Stack>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          [`& .${drawerClasses.paper}`]: {
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Stack sx={{ maxWidth: '70dvw', height: '100%' }}>
          <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
            <Typography component="p" variant="h6" sx={{ flexGrow: 1 }}>
              {user?.email ?? '메뉴'}
            </Typography>
          </Stack>
          <Divider sx={{ mt: 1 }} />
          <Stack sx={{ flexGrow: 1 }}>
            <AppMenuContent onNavigate={toggleDrawer(false)} />
            <Divider />
          </Stack>
          <CardAlert />
          <Stack sx={{ p: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={onLogout}>
              로그아웃
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </AppBar>
  );
}
