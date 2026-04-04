export interface CategoryStatsItem {
  _id: string;
  totalAmount: number;
  category: string;
}

// * --------------- RESPONSES --------------- */

export type GetCategoriesCurrentStatsResponse = CategoryStatsItem[];
