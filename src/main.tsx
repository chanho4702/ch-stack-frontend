import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './app/auth/AuthContext';
import ProtectedRoute from './app/auth/ProtectedRoute';
import LoginPage from './app/pages/LoginPage';
import AppLayout from './app/components/AppLayout';
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
  // 내 서비스 (로그인 -> 대시보드)
  { path: '/', element: <Home /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
