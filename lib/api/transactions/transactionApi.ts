import { api } from "../api";

import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetTransactionsResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
} from "./transaction.types";

/* --------------- API --------------- */

// POST /transactions
export const createTransaction = async (
  data: CreateTransactionRequest,
): Promise<CreateTransactionResponse> => {
  const res = await api.post("/transactions", data);
  return res.data;
};

// GET /transactions/{type}
export const getTransactions = async (
  type: "incomes" | "expenses",
  params?: {
    date?: string;
    search?: string;
  },
): Promise<GetTransactionsResponse> => {
  const res = await api.get(`/transactions/${type}`, {
    params,
  });
  return res.data;
};

// DELETE /transactions/{id}
export const deleteTransaction = async (
  id: string,
): Promise<DeleteTransactionResponse> => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};

// PATCH /transactions/{type}/{id}
export const updateTransaction = async (
  type: "incomes" | "expenses",
  id: string,
  data: UpdateTransactionRequest,
): Promise<UpdateTransactionResponse> => {
  const res = await api.patch(`/transactions/${type}/${id}`, data);
  return res.data;
};
