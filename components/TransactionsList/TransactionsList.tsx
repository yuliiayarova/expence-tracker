"use client";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import css from "./TransactionsList.module.css";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { getTransactions } from "@/lib/api/transactions/transactionApi";
import Button from "../Button/Button";
import "ag-grid-community/styles/ag-theme-quartz.css";

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

  const cols: ColDef<Row>[] = [
    { field: "category", headerName: "Category" },
    { field: "comment", headerName: "Comment" },
    { field: "date", headerName: "Date" },
    { field: "time", headerName: "Time" },
    { field: "sum", headerName: "Sum" },
    { headerName: "Actions", cellRenderer: SimleComp },
  ];

  return (
    <AgGridProvider modules={modules}>
      <div className="ag-theme-quartz" style={{ height: 349, width: "100%" }}>
        <AgGridReact
          rowData={rows}
          columnDefs={cols}
          overlayNoRowsTemplate="<span>Haven't transactions</span>"
        />
      </div>
    </AgGridProvider>
  );
}
