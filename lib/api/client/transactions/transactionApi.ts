import { api } from "../clientApi";

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
  const res = await api.get(`/transactions/${type}`, { params });
  return res.data;
};

// POST /transactions
export const createTransaction = async (
  data: CreateTransactionRequest,
): Promise<CreateTransactionResponse> => {
  const res = await api.post("/transactions", data);
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

// DELETE /transactions/{id}
export const deleteTransaction = async (
  id: string,
): Promise<DeleteTransactionResponse> => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};
