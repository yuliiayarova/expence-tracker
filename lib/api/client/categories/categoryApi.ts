import { api } from "../clientApi";

import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "../../types/category.types";

// GET /categories
export const getCategories = async (): Promise<CategoriesResponse> => {
  const res = await api.get("/categories");
  return res.data;
};

// POST /categories
export const createCategory = async (
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  const res = await api.post("/categories", data);
  return res.data;
};

// PATCH /categories/{id}
export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
  const res = await api.patch(`/categories/${id}`, data);
  return res.data;
};

// DELETE /categories/{id}
export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
