"use client";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import css from "./TransactionsList.module.css";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { getTransactions } from "@/lib/api/transactions/transactionApi";
import Button from "../Button/Button";
import { useWindowSize } from "react-use";

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

const SimleComp = () => {
  return (
    <div className={css.transationsBtn}>
      <Button text="Edit" className="btn" />
      <Button text="Delete" className="btn" />
    </div>
  );
};

const modules = [AllCommunityModule];

export default function TransactionsList({
  type,
  date,
  search,
}: TransactionsListProps) {
  const params = { ...(date && { date }), ...(search && { search }) };
  const { width } = useWindowSize();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions", type, params],
    queryFn: () => getTransactions(type, params),
  });

  const rows = data.map((item) => ({
    id: item._id,
    category: item.category.categoryName,
    comment: item.comment ?? "",
    date: item.date,
    time: item.time,
    sum: item.sum,
  }));

  const tabletCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", flex: 0.85 },
    { field: "comment", headerName: "Comment", flex: 0.85 },
    { field: "date", headerName: "Date", flex: 0.6 },
    { field: "time", headerName: "Time", flex: 0.6 },
    { field: "sum", headerName: "Sum", flex: 0.7 },
    { headerName: "Actions", cellRenderer: SimleComp, flex: 0.7 },
  ];
  const desktopCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", flex: 0.85 },
    { field: "comment", headerName: "Comment", flex: 0.85 },
    { field: "date", headerName: "Date", flex: 0.6 },
    { field: "time", headerName: "Time", flex: 0.6 },
    { field: "sum", headerName: "Sum", flex: 0.7 },
    { headerName: "Actions", cellRenderer: SimleComp, flex: 0.7 },
  ];
  const mobileCols: ColDef<Row>[] = [
    { field: "category", headerName: "Category", width: 110 },
    { field: "comment", headerName: "Comment", width: 110 },
    { field: "date", headerName: "Date", width: 110 },
    { field: "time", headerName: "Time", width: 110 },
    { field: "sum", headerName: "Sum", width: 110 },
    { headerName: "Actions", cellRenderer: SimleComp, width: 110 },
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
            overlayNoRowsTemplate="<span>Нічого немає</span>"
          />
        </div>
      </div>
    </AgGridProvider>
  );
}
