// * --------------- REQUESTS --------------- */

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// * --------------- SHARED TYPES --------------- */

export interface Category {
  _id: string;
  categoryName: string;
  type: "incomes" | "expenses";
}

export interface Categories {
  incomes: Category[];
  expenses: Category[];
}

export interface TransactionsTotal {
  incomes: number;
  expenses: number;
}

// * --------------- RESPONSES --------------- */

export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  _id: string;
  email: string;
  name?: string;
  avatarUrl: string | null;
  currency: string;
  categories: Categories;
  transactionsTotal: TransactionsTotal;
}
