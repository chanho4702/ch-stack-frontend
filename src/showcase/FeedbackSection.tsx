import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Section, Demo } from './shared';

export default function FeedbackSection() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  return (
    <Section id="feedback" title="Feedback" description="상태/알림을 전달하는 요소들">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Alert">
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Alert severity="success">성공 메시지</Alert>
              <Alert severity="info">정보 메시지</Alert>
              <Alert severity="warning">경고 메시지</Alert>
              <Alert severity="error">에러 메시지</Alert>
            </Stack>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Progress">
            <CircularProgress />
            <CircularProgress variant="determinate" value={70} />
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Skeleton">
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" height={60} />
            </Stack>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Dialog">
            <Button variant="outlined" onClick={() => setOpenDialog(true)}>
              다이얼로그 열기
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>약관에 동의하시겠습니까?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  계속하려면 서비스 약관에 동의해야 합니다.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>취소</Button>
                <Button variant="contained" onClick={() => setOpenDialog(false)}>
                  동의
                </Button>
              </DialogActions>
            </Dialog>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Backdrop">
            <Button variant="outlined" onClick={() => setOpenBackdrop(true)}>
              Backdrop 표시
            </Button>
            <Backdrop
              open={openBackdrop}
              onClick={() => setOpenBackdrop(false)}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Demo>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Demo title="Snackbar">
            <Button variant="outlined" onClick={() => setOpenSnackbar(true)}>
              Snackbar 표시
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={() => setOpenSnackbar(false)}
              message="저장되었습니다."
            />
          </Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
