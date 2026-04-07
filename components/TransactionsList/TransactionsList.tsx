"use client";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import css from "./TransactionsList.module.css";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import Button from "../Button/Button";
import { useWindowSize } from "react-use";
import { getTransactions } from "@/lib/api/client/transactions/transactionApi";

interface TransactionsListProps {
  type: "incomes" | "expenses";
  date?: string;
  search?: string;
}
interface Row {
  id: string;
  category: string;
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
}: TransactionsListProps) {
  const params = { ...(date && { date }), ...(search && { search }) };
  const { width } = useWindowSize();
  // const { data = [] } = useQuery({
  //   queryKey: ["transactions", type, params],
  //   queryFn: () => getTransactions(type, params),
  // });

  const SimleComp = () => {
    return (
      <div className={css.transationsBtn}>
        <button type="button" className={css.editBtn}>
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
        <button type="button" className={css.deleteBtn}>
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
  const data = [
    {
      _id: "1",
      category: { categoryName: "Food" },
      comment: "pizza",
      date: "2026-04-07",
      time: "12:30",
      sum: 250,
    },
    {
      _id: "2",
      category: { categoryName: "Transport" },
      comment: "taxi",
      date: "2026-04-05",
      time: "18:40",
      sum: 80,
    },
    {
      _id: "3",
      category: { categoryName: "Shopping" },
      comment: "t-shirt",
      date: "2026-04-04",
      time: "14:10",
      sum: 560,
    },
    {
      _id: "3",
      category: { categoryName: "Shopping" },
      comment: "t-shirt",
      date: "2026-04-04",
      time: "14:10",
      sum: 560,
    },
    {
      _id: "3",
      category: { categoryName: "Shopping" },
      comment: "t-shirt",
      date: "2026-04-04",
      time: "14:10",
      sum: 560,
    },
    {
      _id: "3",
      category: { categoryName: "Shopping" },
      comment: "t-shirt",
      date: "2026-04-04",
      time: "14:10",
      sum: 560,
    },
  ];

  const rows = data.map((item) => ({
    id: item._id,
    category: item.category.categoryName,
    comment: item.comment ?? "",
    date: item.date,
    time: item.time,
    sum: item.sum,
  }));

  const mobileCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", width: 105 },
    { field: "comment", headerName: "Comment", width: 105 },
    { field: "date", headerName: "Date", width: 80 },
    { field: "time", headerName: "Time", width: 85 },
    { field: "sum", headerName: "Sum", width: 110 },
    { headerName: "Actions", cellRenderer: SimleComp, width: 125 },
  ];
  const tabletCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", flex: 0.85 },
    { field: "comment", headerName: "Comment", flex: 0.85 },
    { field: "date", headerName: "Date", flex: 0.6 },
    { field: "time", headerName: "Time", flex: 0.6 },
    { field: "sum", headerName: "Sum", flex: 0.6 },
    { headerName: "Actions", cellRenderer: SimleComp, flex: 0.8 },
  ];
  const desktopCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", flex: 0.85 },
    { field: "comment", headerName: "Comment", flex: 0.85 },
    { field: "date", headerName: "Date", flex: 0.6 },
    { field: "time", headerName: "Time", flex: 0.6 },
    { field: "sum", headerName: "Sum", flex: 0.7 },
    { headerName: "Actions", cellRenderer: SimleComp, flex: 1.15 },
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
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <AgGridProvider modules={modules}>
      <div className={css.tableWrapper}>
        <div
          className="ag-theme-quartz"
          style={{
            height: 349,
            width: "100%",
          }}
        >
          <AgGridReact
            rowData={rows}
            columnDefs={currentCols}
            defaultColDef={defaultColDef}
            rowHeight={70}
            overlayNoRowsTemplate="<span>Нічого немає??</span>"
          />
        </div>
      </div>
    </AgGridProvider>
  );
}
