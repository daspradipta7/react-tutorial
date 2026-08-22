import { Navigate, Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../appwrite/auth/AuthService';
import { login } from '../store/authSlice'


export default function ProtectedLayout() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<NonNullable<Awaited<ReturnType<typeof AuthService.getUserSession>>> | null>(null)

    useEffect(() => {
      const checkAuth = async () => {
          try {
              const userDetals = await AuthService.getUserSession()

              if (userDetals) {
                  setUser(userDetals)
                  dispatch(login(userDetals))
              }
          } catch (error) {
               setUser(null)
          } finally {
              setIsLoading(false)
          }
      }
      checkAuth()
    }, [])

  if (isLoading) {
    return <div className="spinner">Authenticating...</div>;
  }

  if (!user) {
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
