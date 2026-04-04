import TransactionsList from "@/components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "@/components/TransactionsSearchTools/TransactionsSearchTools";

export default function Home() {
  return (
    <>
      <TransactionsSearchTools />
      <TransactionsList type={"incomes"} />
    </>
  );
}
