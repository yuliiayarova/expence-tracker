'use client';

import Link from 'next/link';
import css from './Logo.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function Logo() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const href = isAuthenticated ? '/transactions/expenses' : '/';

  return (
    <Link href={href} className={css.brand} aria-label="Expense Tracker home">
      <svg className={css.logo} aria-hidden="true">
        <use href="/icons/sprite.svg#icon-Icon" />
      </svg>
      <span className={css.brandText}>EXPENSETRACKER</span>
    </Link>
  );
}
