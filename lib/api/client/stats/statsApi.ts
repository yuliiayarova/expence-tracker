import { api } from "../clientApi";

import type { GetCategoriesCurrentStatsResponse } from "../../types/stats.types";

// GET /stats/categories/current-month
export const getCurrentMonthStats =
  async (): Promise<GetCategoriesCurrentStatsResponse> => {
    const res = await api.get("/stats/categories/current-month");
    return res.data;
  };
