import { notFound } from 'next/navigation';

import MainTransactionsPage from '@/components/MainTransactionsPage/MainTransactionsPage';


type TransactionsType = 'expenses' | 'incomes';

interface TransactionsPageProps {
  params: Promise<{
    transactionsType: string;
  }>;
}

export default async function TransactionsPage({
  params,
}: TransactionsPageProps) {
  const { transactionsType } = await params;

  if (transactionsType !== 'expenses' && transactionsType !== 'incomes') {
    notFound();
  }

  return (
    <>
      <MainTransactionsPage
        transactionsType={transactionsType as TransactionsType}
      />
    </>
  );
}
