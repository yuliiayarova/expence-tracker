import { serverFetch } from "../serverApi";

import type { GetCategoriesCurrentStatsResponse } from "../../types/stats.types";

// GET /stats/categories/current-month
export const getCurrentMonthStats =
  async (): Promise<GetCategoriesCurrentStatsResponse> => {
    return serverFetch<GetCategoriesCurrentStatsResponse>(
      "/stats/categories/current-month",
    );
  };
