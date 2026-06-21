import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from './AuthContext';

// ProtectedRoute 의 반대: 이미 로그인한 사용자가 /login·/register 같은
// "게스트 전용" 페이지에 오면 대시보드로 돌려보낸다.
// 세션 복원 중(loading)에는 판정을 보류한다(스피너).
export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isAuthenticated) {
    // ProtectedRoute 가 넘겨준 원래 목적지(from)가 있으면 그리로, 없으면 /app.
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from ?? '/app'} replace />;
  }
  return <>{children}</>;
}
