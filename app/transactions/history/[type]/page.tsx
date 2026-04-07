import Header from "@/components/Header/Header";
import TransactionsTotalAmount from "@/components/MainTransactionsPage/TransactionsTotalAmount/TransactionsTotalAmount";
import { getCurrentUser } from "@/lib/api/server/user/userServerApi";
import { notFound } from "next/navigation";
import css from "./history.module.css";
import TransactionsHistoryClient from "./TransactionsHistoryClient";

type Type = "expenses" | "incomes";

interface TransactionsPageProps {
  params: Promise<{
    type: Type;
  }>;
}

export default async function TransactionsPage({
  params,
}: TransactionsPageProps) {
  const { type } = await params;
  const user = await getCurrentUser();

  if (type !== "expenses" && type !== "incomes") {
    notFound();
  }

  return (
    <main>
      <Header user={user} />
      <div className={css.financeSummary}>
        <div className={css.financeHeader}>
          <h2 className={css.financeTitle}>All {type}</h2>
          {type === "expenses" ? (
            <p className={css.financeDescr}>
              View and manage every transaction seamlessly! Your entire
              financial landscape, all in one place.
            </p>
          ) : (
            <p className={css.financeDescr}>
              Track and celebrate every bit of earnings effortlessly! Gain
              insights into your total revenue in a snap.
            </p>
          )}
        </div>
        <TransactionsTotalAmount isLoading={false} />
      </div>
      <TransactionsHistoryClient type={type} />
    </main>
  );
}
