import Link from 'next/link';

import css from './Logo.module.css';

interface LogoProps {
  href?: string;
}

export default function Logo({ href = '/transactions/expenses' }: LogoProps) {
  return (
    <Link href={href} className={css.brand} aria-label="Expense Tracker home">
      <svg className={css.logo} aria-hidden="true">
        <use href="/icons/sprite.svg#icon-Icon" />
      </svg>
      <span className={css.brandText}>EXPENSETRACKER</span>
    </Link>
  );
}
