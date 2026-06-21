import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../auth';
import { useNotify } from '../../notifications';

// Google OIDC 로그인 성공 후 백엔드가 리다이렉트하는 착지 지점.
// 백엔드가 심어둔 RT 쿠키로 /refresh → AT 획득 → /app.
export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const { completeOAuthLogin } = useAuth();
  const notify = useNotify();

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        await completeOAuthLogin();
        if (active) navigate('/app', { replace: true });
      } catch {
        if (active) {
          notify.error('Google 로그인에 실패했습니다. 다시 시도해 주세요.');
          navigate('/login', { replace: true });
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [completeOAuthLogin, navigate, notify]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
      <CircularProgress />
      <Typography>로그인 처리 중…</Typography>
    </Box>
  );
}
