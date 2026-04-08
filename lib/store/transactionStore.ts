import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getInitialTransactionValues,
  TransactionFormValues,
} from '../api/client/transactions/transactionForm.config';

type TransactionDraftStore = {
  draft: TransactionFormValues;
  setDraft: (transaction: TransactionFormValues) => void;
  clearDraft: () => void;
};

export const useTransactionDraftStore = create<TransactionDraftStore>()(
  persist(
    set => ({
      draft: getInitialTransactionValues(),
      setDraft: transaction => set({ draft: transaction }),
      clearDraft: () => set({ draft: getInitialTransactionValues() }),
    }),
    {
      name: 'transaction-draft',
      partialize: state => ({ draft: state.draft }),
    },
  ),
);
