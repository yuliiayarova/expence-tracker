import css from './TransactionsTotalAmount.module.css';

interface TransactionsTotalAmountProps {
  totals?: {
    incomes: number;
    expenses: number;
  };
  currency?: string;
  isLoading: boolean;
  variant?: 'default' | 'compact';
}

const currencySymbols: Record<string, string> = {
  uah: '₴',
  usd: '$',
  eur: '€',
  UAH: '₴',
  USD: '$',
  EUR: '€',
};

function formatAmount(value: number, currency = 'usd') {
  const symbol = currencySymbols[currency] ?? currency;
  const formatted = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

  return `${symbol}${formatted}`;
}

export default function TransactionsTotalAmount({
  totals,
  currency,
  isLoading,
  variant = 'default',
}: TransactionsTotalAmountProps) {
  const isCompact = variant === 'compact';
  const cards = [
    {
      label: 'Total Income',
      value: totals?.incomes ?? 0,
      icon: 'icon-arrow-up',
    },
    {
      label: 'Total Expense',
      value: totals?.expenses ?? 0,
      icon: 'icon-arrow-down',
    },
  ];

  return (
    <div className={`${css.grid} ${isCompact ? css.gridCompact : ''}`}>
      {cards.map(card => (
        <article
          key={card.label}
          className={`${css.card} ${isCompact ? css.cardCompact : ''}`}
        >
          <span
            className={`${css.iconWrap} ${isCompact ? css.iconWrapCompact : ''}`}
          >
            <svg
              className={`${css.icon} ${isCompact ? css.iconCompact : ''}`}
              aria-hidden="true"
            >
              <use href={`/icons/sprite.svg#${card.icon}`} />
            </svg>
          </span>

          <div
            className={`${css.content} ${isCompact ? css.contentCompact : ''}`}
          >
            <p className={`${css.label} ${isCompact ? css.labelCompact : ''}`}>
              {card.label}
            </p>
            {isLoading ? (
              <span
                className={`${css.valueSkeleton} ${isCompact ? css.valueSkeletonCompact : ''}`}
                aria-hidden="true"
              />
            ) : (
              <strong
                className={`${css.value} ${isCompact ? css.valueCompact : ''}`}
              >
                {formatAmount(card.value, currency)}
              </strong>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
