import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// 로그인하지 않은 사용자를 /login 으로 보내는 보호 라우트.
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
