'use client';

import { refreshSession } from '@/lib/api/client/auth/authApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/api/client/user/userApi';
import Loader from '../Loader/Loader';
import { usePathname } from 'next/navigation';

type Props = { children: React.ReactNode };

const authPages = ['/login', '/register'];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();

  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated,
  );
  const setAuthChecked = useAuthStore(state => state.setAuthChecked);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthPage = authPages.includes(pathname);

    setAuthChecked(false);

    if (isAuthPage) {
      setIsLoading(false);
      setAuthChecked(true);
      return;
    }

    const checkAuth = async () => {
      setIsLoading(true);

      try {
        await refreshSession();
        const user = await getCurrentUser();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setAuthChecked(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated, setAuthChecked]);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return children;
}
