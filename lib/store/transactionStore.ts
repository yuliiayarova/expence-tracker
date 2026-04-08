import { create } from 'zustand';
import {
  // CategoriesResponse,
  Category,
  CreateCategoryRequest,
  // UpdateCategoryResponse,
} from '../api/types/category.types';
import {
  createCategory,
  getCategories,
  // updateCategory,
} from '../api/client/categories/categoryApi';

interface CategoriesStore {
  expences: Category[];
  incomes: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (data: CreateCategoryRequest) => Promise<void>;
  setExpenses: (updater: (prev: Category[]) => Category[]) => void;
  setIncomes: (updater: (prev: Category[]) => Category[]) => void;
}

export const useTransactionStore = create<CategoriesStore>(set => ({
  expences: [],
  incomes: [],
  fetchCategories: async () => {
    try {
      const data = await getCategories();
      set({ expences: data.expenses, incomes: data.incomes });
    } catch {
      console.log('Error');
    }
  },
  addCategory: async (newCategory: CreateCategoryRequest) => {
    try {
      const oneCategory = await createCategory(newCategory);
      console.log('🚀 ~ data:', oneCategory);
      const data = await getCategories();
      set({ expences: data.expenses, incomes: data.incomes });
    } catch {
      console.log('Error');
    }
  },
  setExpenses: updater => set(state => ({ expences: updater(state.expences) })),
  setIncomes: updater => set(state => ({ incomes: updater(state.incomes) })),
}));
