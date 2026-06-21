import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import AppTheme from '../../context/templates/shared-theme/AppTheme';
import { useAuth } from '../../auth';
import { useNotify } from '../../notifications';

// Google OIDC 로그인 성공 후 백엔드가 리다이렉트하는 착지 지점.
// 백엔드가 심어둔 RT 쿠키로 /refresh → AT 획득 → /app.
//
// 사용자에게는 "중간 페이지"로 보이지 않도록, 텍스트 없이 앱 테마 배경 위의
// 스피너만 잠깐 띄운다(흰 화면 번쩍임 제거). 처리는 보통 수백 ms 안에 끝난다.
export default function OAuthCallbackPage(props: { disableCustomTheme?: boolean }) {
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
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100dvh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    </AppTheme>
  );
}
