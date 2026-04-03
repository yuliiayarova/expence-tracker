import { api } from "../api";

import type { GetCategoriesCurrentStatsResponse } from "./stats.types";

/* --------------- API --------------- */

// GET /stats/categories/current-month
export const getCurrentMonthStats =
  async (): Promise<GetCategoriesCurrentStatsResponse> => {
    const res = await api.get("/stats/categories/current-month");
    return res.data;
  };
