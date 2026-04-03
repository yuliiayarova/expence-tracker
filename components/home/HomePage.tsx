"use client";

import { useEffect } from "react";
import {
  useIsFetching,
  useQuery,
} from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import { getCurrentMonthStats } from "@/lib/api/stats/statsApi";
import { getCurrentUser } from "@/lib/api/user/userApi";
import type { GetUserResponse } from "@/lib/api/user/user.types";

import HomeHeader from "./HomeHeader";
import TransactionsChart from "./TransactionsChart";
import TransactionsSummary from "./TransactionsSummary";
import css from "./HomePage.module.css";

const hasApiConfig = Boolean(process.env.NEXT_PUBLIC_API_URL);

const fallbackUser: GetUserResponse = {
  _id: "local-user",
  name: "Alex Rybachok",
  email: "alex@example.com",
  avatarUrl: null,
  currency: "USD",
  categories: {
    incomes: [],
    expenses: [],
  },
  transactionsTotal: {
    incomes: 632,
    expenses: 632,
  },
};

const fallbackStats = [
  { _id: "hobby", category: "Hobby", totalAmount: 45 },
  { _id: "products", category: "Products", totalAmount: 25 },
  { _id: "cinema", category: "Cinema", totalAmount: 20 },
  { _id: "health", category: "Health", totalAmount: 10 },
];

export default function HomePage() {
  const currentUserQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    enabled: hasApiConfig,
  });

  const statsQuery = useQuery({
    queryKey: ["current-month-stats"],
    queryFn: getCurrentMonthStats,
    enabled: hasApiConfig,
  });

  useEffect(() => {
    if (currentUserQuery.error) {
      toast.error("Unable to load user data.");
    }
  }, [currentUserQuery.error]);

  useEffect(() => {
    if (statsQuery.error) {
      toast.error("Unable to load expense statistics.");
    }
  }, [statsQuery.error]);

  const fetchingCount = useIsFetching();
  const isBusy = fetchingCount > 0;
  const user = currentUserQuery.data ?? fallbackUser;
  const chartItems = statsQuery.data ?? fallbackStats;
  const isSummaryLoading = hasApiConfig ? currentUserQuery.isLoading : false;
  const isChartLoading = hasApiConfig ? statsQuery.isLoading : false;

  return (
    <>
      <div className={css.home}>
        <HomeHeader user={user} isBusy={isBusy} />

        <section className={css.content}>
          <div className={css.overview}>
            <div className={css.hero}>
              <h1 className={css.title}>Expense Log</h1>
              <p className={css.description}>
                Capture and organize every penny spent with ease! A clear view
                of your financial habits at your fingertips.
              </p>
            </div>

            <TransactionsSummary
              currency={user?.currency}
              totals={user?.transactionsTotal}
              isLoading={isSummaryLoading}
            />
          </div>

          <TransactionsChart items={chartItems} isLoading={isChartLoading} />
        </section>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#171717",
            color: "#fafafa",
            border: "1px solid rgba(250, 250, 250, 0.1)",
          },
        }}
      />
    </>
  );
}
