'use client';
import { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import { CustomInputSearch } from '../CustomInputSearch/CustomInputSearch';
import 'react-datepicker/dist/react-datepicker.css';
import css from './TransactionsSearchTools.module.css';

interface TransactionsSearchToolsProps {
  inputSearch?: string;
  dateSearch?: Date | null;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateSearch?: (date: Date | null) => void;
  showTip: number;
}

export default function TransactionsSearchTools({
  inputSearch,
  dateSearch,
  handleChange,
  handleDateSearch,
  showTip,
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
        {showTip >= 1 && showTip < 3 && (
          <p className={css.errorText}>Minimum 3 characters</p>
        )}
      </div>
      <DatePicker
        selected={dateSearch}
        onChange={handleDateSearch}
        dateFormat="dd-MM-yyyy"
        placeholderText="dd-mm-yyyy"
        shouldCloseOnSelect={true}
        strictParsing={false}
        customInput={<CustomInputSearch type="date" />}
      />
    </div>
  );
}
