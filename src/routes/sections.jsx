import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DashboardLayout from '../layouts/dashboard';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from '../pages/protected-route';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserInfoPage = lazy(() => import('../pages/userInfo'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const OrdersPage = lazy(() => import('../pages/orders'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const AlbumPage = lazy(() => import('../pages/album'));
export const MessagePage = lazy(() => import('../pages/message'));
export const YoutubePage = lazy(() => import('../pages/youtube'));
export const SchedulePage = lazy(() => import('../pages/schedule'));
export const UserPage = lazy(() => import('../pages/user'));

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthContextProvider>
        </QueryClientProvider>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/products', element: <ProductsPage /> },
        { path: '/order', element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
        { path: '/blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute> },
        { path: '/album', element: <AlbumPage /> },
        { path: '/schedule', element: <ProtectedRoute><SchedulePage /></ProtectedRoute> },
        { path: '/message', element: <MessagePage /> },
        { path: '/youtube', element: <YoutubePage /> },
        { path: '/userInfo', element: <ProtectedRoute><UserInfoPage /></ProtectedRoute> },
        { path: '/user', element: <UserPage /> },
      ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: '404', element: <Page404 />, },
    { path: '*', element: <Navigate to="/404" replace />, },
  ]);

  return routes;
}
