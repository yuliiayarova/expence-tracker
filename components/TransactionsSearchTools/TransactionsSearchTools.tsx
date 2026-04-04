"use client";
import { ChangeEvent, useState } from "react";
import css from "./TransactionsSearchTools.module.css";

export default function TransactionsSearchTools() {
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
    <div className={css.search}>
      <input
        className={css.searchInput}
        type="text"
        placeholder="Search for anything"
        onChange={handleChange}
      />
      <input
        className={css.searchDate}
        type="date"
        onChange={handleDateSearch}
      />
    </div>
  );
}
