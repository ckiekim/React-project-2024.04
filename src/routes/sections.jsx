import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DashboardLayout from '../layouts/dashboard';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const YoutubePage = lazy(() => import('../pages/youtube'));
export const SchedulePage = lazy(() => import('../pages/schedule'));

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'youtube', element: <YoutubePage /> },
        { path: 'schedule', element: <SchedulePage /> },
      ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: '404', element: <Page404 />, },
    { path: '*', element: <Navigate to="/404" replace />, },
  ]);

  return routes;
}
