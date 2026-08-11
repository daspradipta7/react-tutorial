import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

// Mock authentication hook
const useAuth = () => {
  const token = localStorage.getItem('prod_auth_token');
  return { isAuthenticated: !!token };
};

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <nav className="sidebar">Production Navigation</nav>
      <main className="content">
        <Suspense fallback={<div className="spinner">Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
