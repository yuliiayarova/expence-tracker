import css from "./TransactionsSummary.module.css";

interface TransactionsSummaryProps {
  totals?: {
    incomes: number;
    expenses: number;
  };
  currency?: string;
  isLoading: boolean;
}

const currencySymbols: Record<string, string> = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
};

function formatAmount(value: number, currency = "USD") {
  const symbol = currencySymbols[currency] ?? currency;
  const formatted = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(value);

  return `${symbol}${formatted}`;
}

export default function TransactionsSummary({
  totals,
  currency,
  isLoading,
}: TransactionsSummaryProps) {
  const cards = [
    {
      label: "Total Income",
      value: totals?.incomes ?? 0,
      icon: "icon-arrow-up",
    },
    {
      label: "Total Expense",
      value: totals?.expenses ?? 0,
      icon: "icon-arrow-down",
    },
  ];

  return (
    <div className={css.grid}>
      {cards.map((card) => (
        <article key={card.label} className={css.card}>
          <span className={css.iconWrap}>
            <svg className={css.icon} aria-hidden="true">
              <use href={`/icons/sprite.svg#${card.icon}`} />
            </svg>
          </span>

          <div className={css.content}>
            <p className={css.label}>{card.label}</p>
            <strong className={css.value}>
              {isLoading ? "Loading..." : formatAmount(card.value, currency)}
            </strong>
          </div>
        </article>
      ))}
    </div>
  );
}
