'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import css from './TransactionsList.module.css';
import { AllCommunityModule, ColDef } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import { useWindowSize } from 'react-use';
import {
  deleteTransaction,
  getTransactions,
} from '@/lib/api/client/transactions/transactionApi';
import Loader from '../Loader/Loader';

interface TransactionsListProps {
  type: 'incomes' | 'expenses';
  date?: string;
  search?: string;
  handleChangeTransaction: (transaction: Row) => void;
}
export interface Row {
  type: 'incomes' | 'expenses';
  id: string;
  category: string;
  categoryId: string;
  comment: string;
  date: string;
  time: string;
  sum: number;
}

const modules = [AllCommunityModule];

export default function TransactionsList({
  type,
  date,
  search,
  handleChangeTransaction,
}: TransactionsListProps) {
  const params = { ...(date && { date }), ...(search && { search }) };
  const { width } = useWindowSize();
  const { data = [], isLoading } = useQuery({
    queryKey: ['transactions', type, params],
    queryFn: () => getTransactions(type, params),
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const SimleComp = (cellParams: { data: Row }) => {
    return (
      <div className={css.transationsBtn}>
        <button
          type="button"
          className={css.editBtn}
          onClick={() => handleChangeTransaction(cellParams.data)}
        >
          {width >= 1440 ? (
            <>
              <svg className={css.editIcon} width={16} height={16}>
                <use href="/icons/sprite.svg#icon-edit"></use>
              </svg>
              <span>Edit</span>
            </>
          ) : (
            <svg className={css.editIcon} width={16} height={16}>
              <use href="/icons/sprite.svg#icon-edit"></use>
            </svg>
          )}
        </button>
        <button
          type="button"
          className={css.deleteBtn}
          onClick={() => mutate(cellParams.data.id)}
        >
          {width >= 1440 ? (
            <>
              <svg className={css.deleteIcon} width={16} height={16}>
                <use href="/icons/sprite.svg#icon-trash"></use>
              </svg>
              <span>Delete</span>
            </>
          ) : (
            <svg className={css.deleteIcon} width={16} height={16}>
              <use href="/icons/sprite.svg#icon-trash"></use>
            </svg>
          )}
        </button>
      </div>
    );
  };

  const rows = data.map(item => ({
    id: item._id,
    type: item.type,
    category: item.category.categoryName,
    categoryId: item.category._id,
    comment: item.comment ?? '',
    date: item.date,
    time: item.time,
    sum: item.sum,
  }));

  const mobileCols: ColDef<Row>[] = [
    { field: 'category', headerName: 'Category', width: 105 },
    { field: 'comment', headerName: 'Comment', width: 105 },
    { field: 'date', headerName: 'Date', width: 80 },
    { field: 'time', headerName: 'Time', width: 85 },
    { field: 'sum', headerName: 'Sum', width: 110 },
    { headerName: 'Actions', cellRenderer: SimleComp, width: 125 },
  ];
  const tabletCols: ColDef<Row>[] = [
    { field: 'category', headerName: 'Category', flex: 0.85 },
    { field: 'comment', headerName: 'Comment', flex: 0.85 },
    { field: 'date', headerName: 'Date', flex: 0.6 },
    { field: 'time', headerName: 'Time', flex: 0.6 },
    { field: 'sum', headerName: 'Sum', flex: 0.6 },
    { headerName: 'Actions', cellRenderer: SimleComp, flex: 0.8 },
  ];
  const desktopCols: ColDef<Row>[] = [
    { field: 'category', headerName: 'Category', flex: 0.85 },
    { field: 'comment', headerName: 'Comment', flex: 0.85 },
    { field: 'date', headerName: 'Date', flex: 0.6 },
    { field: 'time', headerName: 'Time', flex: 0.6 },
    { field: 'sum', headerName: 'Sum', flex: 0.7 },
    { headerName: 'Actions', cellRenderer: SimleComp, flex: 1.15 },
  ];

  const currentCols = trueWidth();
  function trueWidth() {
    if (width < 768) {
      return mobileCols;
    }

    if (width >= 768 && width < 1440) {
      return tabletCols;
    }

    return desktopCols;
  }
  const defaultColDef = {
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
    <AgGridProvider modules={modules}>
      <div className={css.tableWrapper}>
        {isLoading && (
          <div className={css.loadingOverlay}>
            <Loader size={width > 768 ? 'small' : 'medium'} />
          </div>
        )}
        <div
          className="ag-theme-quartz"
          style={{
            height: 349,
            width: '100%',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        >
          <AgGridReact
            rowData={rows}
            columnDefs={currentCols}
            defaultColDef={defaultColDef}
            rowHeight={70}
            overlayNoRowsTemplate="<span>No transactions yet</span>"
          />
        </div>
      </div>
    </AgGridProvider>
  );
}
