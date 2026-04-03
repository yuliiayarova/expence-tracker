import Link from "next/link";

import css from "./TransactionsHistoryNav.module.css";

interface TransactionsHistoryNavProps {
  pathname: string;
  isBurger?: boolean;
  onNavigate?: () => void;
}

const navItems = [
  { href: "/transactions/expenses", label: "All Expense" },
  { href: "/transactions/incomes", label: "All Income" },
];

export default function TransactionsHistoryNav({
  pathname,
  isBurger = false,
  onNavigate,
}: TransactionsHistoryNavProps) {
  const chipClassName = isBurger ? css.burgerChip : css.navChip;
  const activeClassName = isBurger ? css.burgerChipActive : css.navChipActive;

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? `${chipClassName} ${activeClassName}` : chipClassName}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
