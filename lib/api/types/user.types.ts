export type Currency = "usd" | "eur" | "uah";

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

// * --------------- REQUESTS --------------- */

export interface UpdateUserRequest {
  name?: string;
  currency?: Currency;
}

// * --------------- RESPONSES --------------- */

export interface GetUserResponse {
  _id: string;
  name?: string;
  email: string;
  avatarUrl: string | null;
  currency: Currency;
  categories: Categories;
  transactionsTotal: TransactionsTotal;
}

export interface UpdateUserResponse {
  _id: string;
  name?: string;
  currency: Currency;
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}
