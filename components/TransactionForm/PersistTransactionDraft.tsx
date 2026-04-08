import { TransactionFormValues } from '@/lib/api/client/transactions/transactionForm.config';
import { useTransactionDraftStore } from '@/lib/store/transactionStore';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export default function PersistTransactionDraft() {
  const { values } = useFormikContext<TransactionFormValues>();
  const setDraft = useTransactionDraftStore(state => state.setDraft);

  useEffect(() => {
    setDraft(values);
  }, [values, setDraft]);

  return null;
}
