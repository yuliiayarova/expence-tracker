import { serverFetch } from "../serverApi";

import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "../../types/category.types";

// GET /categories
export const getCategories = async (): Promise<CategoriesResponse> => {
  return serverFetch<CategoriesResponse>("/categories");
};

// POST /categories
export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  return serverFetch<CreateCategoryResponse>("/categories", {
    method: "POST",
    body: data,
  });
};

// PATCH /categories/{id}
export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
  return serverFetch<UpdateCategoryResponse>(`/categories/${id}`, {
    method: "PATCH",
    body: data,
  });
};

// DELETE /categories/{id}
export const deleteCategory = async (id: string): Promise<void> => {
  return serverFetch<void>(`/categories/${id}`, { method: "DELETE" });
};
