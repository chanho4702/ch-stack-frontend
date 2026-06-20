import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useAuth } from '../auth/AuthContext';

// Google OIDC 로그인 성공 후 백엔드가 리다이렉트하는 착지 지점.
// 백엔드가 심어둔 RT 쿠키로 /refresh → AT 획득 → /app.
export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const { completeOAuthLogin } = useAuth();

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        await completeOAuthLogin();
        if (active) navigate('/app', { replace: true });
      } catch {
        if (active) navigate('/login', { replace: true });
      }
    })();
    return () => {
      active = false;
    };
  }, [completeOAuthLogin, navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
      <CircularProgress />
      <Typography>로그인 처리 중…</Typography>
    </Box>
  );
}
