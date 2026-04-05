import Header from "@/components/Header/Header";
import TransactionsList from "@/components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "@/components/TransactionsSearchTools/TransactionsSearchTools";
import { GetUserResponse } from "@/lib/api/types/user.types";
import { notFound } from "next/navigation";

type Type = "expenses" | "incomes";

interface TransactionsPageProps {
  params: Promise<{
    type: Type;
  }>;
}

export default async function TransactionsPage({
  params,
}: TransactionsPageProps) {
  const mockUser: GetUserResponse = {
    _id: "1",
    name: "Alex",
    email: "alex@example.com",
    avatarUrl: null,
    currency: "uah",
    categories: {
      incomes: [],
      expenses: [],
    },
    transactionsTotal: {
      incomes: 0,
      expenses: 0,
    },
  };
  const { type } = await params;

  if (type !== "expenses" && type !== "incomes") {
    notFound();
  }

  return (
    <main>
      <Header user={mockUser} />
      <TransactionsSearchTools />
      <TransactionsList type={type} />
    </main>
  );
}
