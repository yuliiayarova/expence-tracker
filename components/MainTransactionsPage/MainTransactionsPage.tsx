"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import { getCurrentMonthStats } from "@/lib/api/client/stats/statsApi";
import type { CategoryStatsItem } from "@/lib/api/types/stats.types";
import { getCurrentUser } from "@/lib/api/client/user/userApi";
import type { GetUserResponse } from "@/lib/api/types/user.types";

import Header from "../Header/Header";
import TransactionsChart from "./TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "./TransactionsTotalAmount/TransactionsTotalAmount";
import css from "./MainTransactionsPage.module.css";

type TransactionsType = "expenses" | "incomes";

const hasApiConfig = Boolean(process.env.NEXT_PUBLIC_API_URL);

const fallbackUser: GetUserResponse = {
  _id: "local-user",
  name: "",
  email: "",
  avatarUrl: null,
  currency: "usd",
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

interface MainTransactionsPageProps {
  transactionsType: TransactionsType;
}

export default function MainTransactionsPage({
  transactionsType,
}: MainTransactionsPageProps) {
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
        <section
          className={css.content}
          data-transactions-type={transactionsType}
        >
          <div className={css.overview}>
            <div className={css.hero}>
              <h1 className={css.title}>Expense Log</h1>
              <p className={css.description}>
                Capture and organize every penny spent with ease! A clear view
                of your financial habits at your fingertips.
              </p>
            </div>

            <TransactionsTotalAmount
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
