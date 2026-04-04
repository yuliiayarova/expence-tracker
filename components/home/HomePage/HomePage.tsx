"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import { getCurrentMonthStats } from "@/lib/api/stats/statsApi";
import type { CategoryStatsItem } from "@/lib/api/stats/stats.types";
import { getCurrentUser } from "@/lib/api/user/userApi";
import type { GetUserResponse } from "@/lib/api/user/user.types";

import HomeHeader from "../HomeHeader/HomeHeader";
import TransactionsChart from "../TransactionsChart/TransactionsChart";
import TransactionsSummary from "../TransactionsSummary/TransactionsSummary";
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
    incomes: 0,
    expenses: 0,
  },
};

const fallbackStats: CategoryStatsItem[] = [];

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

  const user = currentUserQuery.data ?? fallbackUser;
  const chartItems = statsQuery.data ?? fallbackStats;
  const isSummaryLoading = hasApiConfig ? currentUserQuery.isLoading : false;
  const isChartLoading = hasApiConfig ? statsQuery.isLoading : false;

  return (
    <>
      <div className={css.home}>
        <HomeHeader user={user} />

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
