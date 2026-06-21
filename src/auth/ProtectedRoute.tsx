import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from './AuthContext';

// 로그인하지 않은 사용자를 /login 으로 보내는 보호 라우트.
// 세션 복원 중(loading)에는 판정을 보류한다.
// fallback: 복원 중 보여줄 화면(미지정 시 테마 없는 기본 스피너). 앱에서 테마 입힌 화면을 주입한다.
export default function ProtectedRoute({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      fallback ?? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
          <CircularProgress />
        </Box>
      )
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
