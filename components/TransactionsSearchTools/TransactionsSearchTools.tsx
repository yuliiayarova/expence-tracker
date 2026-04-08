'use client';
import { ChangeEvent } from 'react';
import css from './TransactionsSearchTools.module.css';
import DatePicker from 'react-datepicker';
import { CustomInputSearch } from '../CustomInputSearch/CustomInputSearch';

interface TransactionsSearchToolsProps {
  inputSearch?: string;
  dateSearch?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateSearch?: (date: Date | null) => void;
}

export default function TransactionsSearchTools({
  inputSearch,
  dateSearch,
  handleChange,
  handleDateSearch,
}: TransactionsSearchToolsProps) {
  const selectedDate = dateSearch ? new Date(dateSearch) : null;
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

      <DatePicker
        selected={selectedDate}
        onChange={handleDateSearch}
        onChangeRaw={e => {
          const value = (e?.target as HTMLInputElement | undefined)?.value;

          if (!value) {
            handleDateSearch?.(null);
            return;
          }

          const parsedDate = new Date(value);

          if (!isNaN(parsedDate.getTime())) {
            handleDateSearch?.(parsedDate);
          }
        }}
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect
        customInput={<CustomInputSearch type="date" />}
      />
    </div>
  );
}
