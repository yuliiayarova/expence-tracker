'use client';

import { refreshSession } from '@/lib/api/client/auth/authApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/api/client/user/userApi';
import Loader from '../Loader/Loader';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        await refreshSession();

        const user = await getCurrentUser();
        if (user) setUser(user);
      } catch {
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return children;
}
