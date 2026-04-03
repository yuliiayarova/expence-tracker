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

export interface GetUserResponse {
  _id: string;
  name?: string;
  email: string;
  avatarUrl: string | null;
  currency: string;
  categories: Categories;
  transactionsTotal: TransactionsTotal;
}

export interface UpdateUserRequest {
  name?: string;
  currency?: string;
}

export interface UpdateUserResponse {
  _id: string;
  name?: string;
  currency: string;
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}
