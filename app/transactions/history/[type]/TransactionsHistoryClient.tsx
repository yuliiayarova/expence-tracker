'use client';
import { useState, ChangeEvent } from 'react';
import Modal from '@/components/Modal/Modal';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TransactionsList, {
  Row,
} from '@/components/TransactionsList/TransactionsList';
import TransactionsSearchTools from '@/components/TransactionsSearchTools/TransactionsSearchTools';
import css from './history.module.css';
import { useDebounce } from 'use-debounce';

interface TransactionsHistoryClientProps {
  type: 'expenses' | 'incomes';
}

export default function TransactionsHistoryClient({
  type,
}: TransactionsHistoryClientProps) {
  const [search, setSearch] = useState('');
  const [dateSearch, setDateSearch] = useState<Date | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [transactions, setTransactions] = useState<Row | null>(null);

  const [valueSearch] = useDebounce(search, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleDateSearch = (date: Date | null) => setDateSearch(date);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTransactions(null);
  };

  const formattedDate =
    dateSearch && !isNaN(dateSearch.getTime())
      ? `${dateSearch.getFullYear()}-${String(dateSearch.getMonth() + 1).padStart(2, '0')}-${String(dateSearch.getDate()).padStart(2, '0')}`
      : '';

  const tip = search.trim().length;
  return (
    <>
      {openEditModal && transactions && (
        <Modal className={css.formModal} onClose={handleCloseEditModal}>
          <TransactionForm
            className={css.modalTransactionForm}
            mode="edit"
            initialData={transactions}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}

      <TransactionsSearchTools
        inputSearch={search}
        dateSearch={dateSearch}
        handleChange={handleChange}
        handleDateSearch={handleDateSearch}
        showTip={tip}
      />

      <TransactionsList
        type={type}
        search={valueSearch.length < 3 ? '' : valueSearch}
        date={formattedDate}
        handleChangeTransaction={t => {
          setTransactions(t);
          setOpenEditModal(true);
        }}
      />
    </>
  );
}
