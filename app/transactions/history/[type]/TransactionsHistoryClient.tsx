'use client';
import Modal from '@/components/Modal/Modal';
import TransactionForm from '@/components/TransactionForm/TransactionForm';
import TransactionsList, {
  Row,
} from '@/components/TransactionsList/TransactionsList';
import TransactionsSearchTools from '@/components/TransactionsSearchTools/TransactionsSearchTools';
import { ChangeEvent, useState } from 'react';
import css from './history.module.css';
import { useDebounce } from 'use-debounce';

interface TransactionsHistoryClientProps {
  type: 'expenses' | 'incomes';
}

export default function TransactionsHistoryClient({
  type,
}: TransactionsHistoryClientProps) {
  const [search, setSearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [transactions, setTransactions] = useState<Row | null>(null);

  const [valueSearch] = useDebounce(search, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const tip = search.length;
  const handleDateSearch = (date: Date | null) => {
    if (!date) {
      setDateSearch('');
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    setDateSearch(`${year}-${month}-${day}`);
  };
  const handleChangeTransaction = (transaction: Row) => {
    setTransactions(transaction);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setTransactions(null);
  };

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
        date={dateSearch}
        handleChangeTransaction={handleChangeTransaction}
      />
    </>
  );
}
