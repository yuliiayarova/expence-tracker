// * --------------- REQUESTS --------------- */

export interface CreateTransactionRequest {
  type: "incomes" | "expenses";
  date: string;
  time: string;
  category: string;
  sum: number;
  comment?: string;
}

export interface UpdateTransactionRequest {
  date?: string;
  time?: string;
  category?: string;
  sum?: number;
  comment?: string;
}


export interface TransactionCategory {
  _id: string;
  categoryName: string;
}

//GET /transactions/{type}
export interface Transaction {
  _id: string;
  type: "incomes" | "expenses";
  date: string;
  time: string;
  category: TransactionCategory;
  sum: number;
  comment?: string;
}

//POST /transactions
export interface CreatedTransaction {
  _id: string;
  type: "incomes" | "expenses";
  date: string;
  time: string;
  category: string;
  sum: number;
  comment?: string;
}

// * --------------- RESPONSES --------------- */

export interface CreateTransactionResponse {
  transaction: CreatedTransaction;
  total: number;
}

export type GetTransactionsResponse = Transaction[];

export interface UpdateTransactionResponse {
  transaction: Transaction;
  total: number;
}

export interface DeleteTransactionResponse {
  total: number;
}
