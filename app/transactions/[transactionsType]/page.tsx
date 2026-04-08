import { notFound } from 'next/navigation';

import MainTransactionsPage from '@/components/MainTransactionsPage/MainTransactionsPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: TransactionsPageProps): Promise<Metadata> {
  const { transactionsType } = await params;
  return {
    title: `${transactionsType} tracking`,
    description: `Your financial dashboard ${transactionsType} awaits.`,
  };
}

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
