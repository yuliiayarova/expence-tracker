"use client";
import TransactionsList, {
  Row,
} from "@/components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "@/components/TransactionsSearchTools/TransactionsSearchTools";
import { ChangeEvent, use, useState } from "react";

interface TransactionsHistoryClientProps {
  type: "expenses" | "incomes";
}

export default function TransactionsHistoryClient({
  type,
}: TransactionsHistoryClientProps) {
  const [search, setSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [transactions, setTransactions] = useState<Row | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleDateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const dateSearch = e.target.value;
    setDateSearch(dateSearch);
  };
  const handleChangeTransaction = (transaction: Row) => {
    setOpenEditModal(true);
    setTransactions(transaction);
  };

  return (
    <>
      {openEditModal && (
        <Modal>
          <TransactionForm />
        </Modal>
      )}
      <TransactionsSearchTools
        inputSearch={search}
        dateSearch={dateSearch}
        handleChange={handleChange}
        handleDateSearch={handleDateSearch}
      />
      <TransactionsList
        type={type}
        search={search}
        date={dateSearch}
        handleChangeTransaction={handleChangeTransaction}
      />
    </>
  );
}
