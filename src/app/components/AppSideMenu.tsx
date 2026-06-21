import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from '../../context/templates/dashboard/components/SelectContent';
import CardAlert from '../../context/templates/dashboard/components/CardAlert';
import AppOptionsMenu from './AppOptionsMenu';
import AppMenuContent from './AppMenuContent';
import { useAuth } from '../../auth';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function AppSideMenu({ onLogout }: { onLogout: () => void }) {
  const { user } = useAuth();
  const email = user?.email ?? '';
  const initial = email ? email[0].toUpperCase() : '?';

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box sx={{ display: 'flex', mt: 'calc(var(--template-frame-height, 0px) + 4px)', p: 1.5 }}>
        <SelectContent />
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <AppMenuContent />
        <CardAlert />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar sizes="small" sx={{ width: 36, height: 36 }}>
          {initial}
        </Avatar>
        <Box sx={{ mr: 'auto', minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            내 계정
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {email}
          </Typography>
        </Box>
        <AppOptionsMenu onLogout={onLogout} />
      </Stack>
    </Drawer>
  );
}
