import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import App from '../App';
import { AddPost, AllPosts, Login, PostDetails } from '../pages';
import { Signup } from '../components';

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
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<div>Loading Signup...</div>}>
            <Signup />
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
          {
            path: '/posts/:slug',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PostDetails />
              </Suspense>
            )
          },
          {
            path: '/posts/new',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddPost />
              </Suspense>
            )
          },
          {
            path: '/posts/edit/:slug',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <PostDetails />
              </Suspense>
            )
          },
          {
            path: '/posts',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AllPosts />
              </Suspense>
            )
          }
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
  