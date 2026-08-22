import { Navigate, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

// Mock authentication hook
const useAuth = () => {
  const user = useSelector((state) => state.auth.user)

  return { isAuthenticated: !!user };
};

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <main className="content">
        <Suspense fallback={<div className="spinner">Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
