'use client';

import WelcomePage from '@/components/WellcomPage/WellcomPage';
import Loader from '@/components/Loader/Loader';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked && isAuthenticated) {
      router.replace('/transactions/expenses');
    }
  }, [isAuthChecked, isAuthenticated, router]);

  if (!isAuthChecked) {
    return <Loader fullPage />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <WelcomePage />;
}
