export interface TransactionFormValues {
  type: 'incomes' | 'expenses';
  date: string;
  time: string;
  category: string;
  sum: number | '';
  comment: string;
}

export const now = new Date();
export const pad = (num: number) => num.toString().padStart(2, '0');

export const getInitialTransactionValues = (): TransactionFormValues => {
  const now = new Date();

  return {
    type: 'expenses',
    date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    category: '',
    sum: '',
    comment: '',
  };
};
