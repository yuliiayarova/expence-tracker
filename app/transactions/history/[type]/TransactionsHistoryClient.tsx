"use client";
import TransactionsList from "@/components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "@/components/TransactionsSearchTools/TransactionsSearchTools";
import { ChangeEvent, useState } from "react";

interface TransactionsHistoryClientProps {
  type: "expenses" | "incomes";
}

export default function TransactionsHistoryClient({
  type,
}: TransactionsHistoryClientProps) {
  const [search, setSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleDateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const dateSearch = e.target.value;
    setDateSearch(dateSearch);
  };

  return (
    <>
      <TransactionsSearchTools
        inputSearch={search}
        dateSearch={dateSearch}
        handleChange={handleChange}
        handleDateSearch={handleDateSearch}
      />
      <TransactionsList type={type} search={search} date={dateSearch} />
    </>
  );
}
