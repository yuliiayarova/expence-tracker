import type {
  Category,
  Categories,
  TransactionsTotal,
  Currency,
} from "./user.types";

export type { Category, Categories, TransactionsTotal, Currency };

// * --------------- REQUESTS ------------- */

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// * --------------- RESPONSES ------------- */

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
  currency: Currency;
  categories: Categories;
  transactionsTotal: TransactionsTotal;
}
