import { serverFetch } from "../serverApi";

import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetTransactionsResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
} from "../../types/transaction.types";

// GET /transactions/{type}
export const getTransactions = async (
  type: "incomes" | "expenses",
  params?: {
    date?: string;
    search?: string;
  },
): Promise<GetTransactionsResponse> => {
  return serverFetch<GetTransactionsResponse>(`/transactions/${type}`, {
    params,
  });
};

// POST /transactions
export const createTransaction = async (
  data: CreateTransactionRequest,
): Promise<CreateTransactionResponse> => {
  return serverFetch<CreateTransactionResponse>("/transactions", {
    method: "POST",
    body: data,
  });
};

// PATCH /transactions/{type}/{id}
export const updateTransaction = async (
  type: "incomes" | "expenses",
  id: string,
  data: UpdateTransactionRequest,
): Promise<UpdateTransactionResponse> => {
  return serverFetch<UpdateTransactionResponse>(`/transactions/${type}/${id}`, {
    method: "PATCH",
    body: data,
  });
};

// DELETE /transactions/{id}
export const deleteTransaction = async (
  id: string,
): Promise<DeleteTransactionResponse> => {
  return serverFetch<DeleteTransactionResponse>(`/transactions/${id}`, {
    method: "DELETE",
  });
};
