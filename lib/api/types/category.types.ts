// * --------------- REQUESTS --------------- */

export interface CreateCategoryRequest {
  type: "incomes" | "expenses";
  categoryName: string;
}

export interface UpdateCategoryRequest {
  _id?: string;
  categoryName: string;
}

// * --------------- SHARED --------------- */

export interface Category {
  _id: string;
  type: "incomes" | "expenses";
  categoryName: string;
}

export interface CategoriesResponse {
  incomes: Category[];
  expenses: Category[];
}

// * --------------- RESPONSES --------------- */

export type CreateCategoryResponse = Category;

export type UpdateCategoryResponse = {
  _id: string;
  categoryName: string;
};
