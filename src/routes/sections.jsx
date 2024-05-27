import { lazy, Suspense, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DashboardLayout from '../layouts/dashboard';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from '../pages/protected-route';
// import { CheckoutPage } from '../components/toss-payments/Checkout';
import CheckoutPage from '../components/toss-payments-dialog/checkout-page';
import CheckoutDialog from '../components/toss-payments-dialog/checkout-dialog';
// import { SuccessPage } from '../components/toss-payments/Success';
import SuccessPage from '../components/toss-payments-dialog/success-page';
import SuccessDialog from '../components/toss-payments-dialog/success-dialog';
// import { FailPage } from '../components/toss-payments/Fail';
import FailurePage from '../components/toss-payments-dialog/failure-page';
import FailureDialog from '../components/toss-payments-dialog/failure-dialog';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const BoardPage = lazy(() => import('../pages/board'));
export const UserInfoPage = lazy(() => import('../pages/userInfo'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const OrdersPage = lazy(() => import('../pages/orders'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const AlbumPage = lazy(() => import('../pages/album'));
export const MessagePage = lazy(() => import('../pages/message'));
export const TmdbPage = lazy(() => import('../pages/tmdb'));
export const SchedulePage = lazy(() => import('../pages/schedule'));
export const YoutubePage = lazy(() => import('../pages/youtube'));
export const UserPage = lazy(() => import('../pages/user'));

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function Router() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => { setDialogOpen(false); };
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const handleSuccessClose = () => { setSuccessDialogOpen(false); };
  const [failureDialogOpen, setFailureDialogOpen] = useState(false);
  const handleFailureClose = () => { setFailureDialogOpen(false); };

  const routes = useRoutes([
    {
      element: (
        // <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthContextProvider>
        // </QueryClientProvider>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/products', element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
        { path: '/order', element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
        { path: '/blog', element: <ProtectedRoute><BlogPage /></ProtectedRoute> },
        { path: '/board', element: <ProtectedRoute><BoardPage /></ProtectedRoute> },
        { path: '/album', element: <AlbumPage /> },
        { path: '/schedule', element: <ProtectedRoute><SchedulePage /></ProtectedRoute> },
        { path: '/message', element: <ProtectedRoute><MessagePage /></ProtectedRoute> },
        { path: '/tmdb', element: <TmdbPage /> },
        { path: '/userInfo', element: <ProtectedRoute><UserInfoPage /></ProtectedRoute> },
        { path: '/youtube', element: <YoutubePage /> },
        { path: '/user', element: <UserPage /> },
        { path: '/toss/checkout', element: <CheckoutPage setDialogOpen={setDialogOpen} /> },
        { path: '/toss/success', element: <SuccessPage setSuccessDialogOpen={setSuccessDialogOpen} /> },
        { path: '/toss/fail', element: <FailurePage setFailureDialogOpen={setFailureDialogOpen} /> },
      ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: '404', element: <Page404 />, },
    { path: '*', element: <Navigate to="/404" replace />, },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {routes}
        <CheckoutDialog open={dialogOpen} onClose={handleClose} />
        <SuccessDialog open={successDialogOpen} onClose={handleSuccessClose} />
        <FailureDialog open={failureDialogOpen} onClose={handleFailureClose} />
      </QueryClientProvider>
    </>
  );
}
