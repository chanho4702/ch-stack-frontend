import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, GuestRoute } from './auth';
import { NotificationProvider } from './notifications';
import LoginPage from './app/pages/LoginPage';
import NotFoundPage from './app/pages/NotFoundPage';
import RouteErrorPage from './app/pages/RouteErrorPage';
import AppLayout from './app/components/AppLayout';
import AuthLoadingScreen from './app/components/AuthLoadingScreen';
import DashboardHome from './app/pages/DashboardHome';
import BoardListPage from './app/board/BoardListPage';
import BoardDetailPage from './app/board/BoardDetailPage';
import BoardFormPage from './app/board/BoardFormPage';
import Home from './pages/Home';
import ComponentsCatalog from './pages/ComponentsCatalog';
import ComponentsShowcase from './pages/ComponentsShowcase';
// --- 참고 자료(reference): MUI 공식 템플릿 그대로. src/context/templates ---
import SignIn from './context/templates/sign-in/SignIn';
import SignUp from './context/templates/sign-up/SignUp';
import SignInSide from './context/templates/sign-in-side/SignInSide';
import Dashboard from './context/templates/dashboard/Dashboard';

const router = createBrowserRouter([
  // 내 서비스 (로그인/회원가입 -> 대시보드)
  { path: '/', element: <Home />, errorElement: <RouteErrorPage /> },
  {
    path: '/login',
    element: (
      <GuestRoute fallback={<AuthLoadingScreen />}>
        <LoginPage />
      </GuestRoute>
    ),
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute fallback={<AuthLoadingScreen />}>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'board', element: <BoardListPage /> },
      { path: 'board/new', element: <BoardFormPage /> },
      { path: 'board/:id', element: <BoardDetailPage /> },
      { path: 'board/:id/edit', element: <BoardFormPage /> },
    ],
  },

  // 컴포넌트 레퍼런스 / 라이브 쇼케이스
  { path: '/components', element: <ComponentsCatalog /> },
  { path: '/showcase', element: <ComponentsShowcase /> },

  // 참고용 원본 템플릿 (reference)
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/sign-in-side', element: <SignInSide /> },
  { path: '/dashboard', element: <Dashboard /> },

  // 매칭되지 않는 모든 경로 → 404
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </StrictMode>,
);
