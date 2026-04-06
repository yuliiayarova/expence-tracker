"use client";
import { ChangeEvent } from "react";
import css from "./TransactionsSearchTools.module.css";

interface TransactionsSearchToolsProps {
  inputSearch?: string;
  dateSearch?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TransactionsSearchTools({
  inputSearch,
  dateSearch,
  handleChange,
  handleDateSearch,
}: TransactionsSearchToolsProps) {
  return (
    <div className={css.search}>
      <div className={css.searchBox}>
        <input
          className={css.searchInput}
          type="text"
          placeholder="Search for anything..."
          onChange={handleChange}
          value={inputSearch}
        />
        <svg className={css.searchIcon} width={20} height={20}>
          <use href="/icons/sprite.svg#icon-search"></use>
        </svg>
      </div>
      <div className={css.dateBox}>
        <input
          className={css.searchDate}
          type="date"
          onChange={handleDateSearch}
          value={dateSearch}
        />
        <svg className={css.searchIconDate} width={20} height={20}>
          <use href="/icons/sprite.svg#icon-calendar"></use>
        </svg>
      </div>
    </div>
  );
}
