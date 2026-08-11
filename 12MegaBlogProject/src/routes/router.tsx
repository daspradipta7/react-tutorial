import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import App from '../App';

// Lazy loaded features and components
const NotFound = lazy(() => import('../pages/NotFound'));
const GlobalErrorBoundary = lazy(() => import('../components/GlobalErrorBoundary'));
const ProtectedLayout = lazy(() => import('../layouts/ProtectedLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading app...</div>}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>Critical Error...</div>}>
        <GlobalErrorBoundary />
      </Suspense>
    ),
    children: [
      // Public Routes
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading login...</div>}>
            {/* Bring back your Login component here when ready */}
          </Suspense>
        ),
      },
      // Authenticated Protected Routes
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Authenticating...</div>}>
            <ProtectedLayout />
          </Suspense>
        ),
        children: [
          // Place your protected dashboard or profile pages here
        ],
      },
      // 404 Fallback Route
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
  