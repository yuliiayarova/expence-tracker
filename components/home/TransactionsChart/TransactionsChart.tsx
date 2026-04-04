"use client";

import { useEffect, useId, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

import type { CategoryStatsItem } from "@/lib/api/stats/stats.types";

import css from "./TransactionsChart.module.css";

interface TransactionsChartProps {
  items: CategoryStatsItem[];
  isLoading: boolean;
}

const chartColors = ["#0ef387", "#0ebb69", "#fafafa", "#4a4a4d", "#2b2b2d"];

export default function TransactionsChart({
  items,
  isLoading,
}: TransactionsChartProps) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const skeletonGradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  const total = items.reduce((sum, item) => sum + item.totalAmount, 0);
  const chartItems = items
    .map((item, index) => ({
      ...item,
      color: chartColors[index % chartColors.length],
      percent: total > 0 ? Math.round((item.totalAmount / total) * 100) : 0,
    }))
    .filter((item) => item.percent > 0);

  const chartConfig =
    viewportWidth >= 1440
      ? { width: 292, height: 165, innerRadius: 92, outerRadius: 146 }
      : viewportWidth >= 768
        ? { width: 220, height: 126, innerRadius: 70, outerRadius: 110 }
        : { width: 220, height: 126, innerRadius: 70, outerRadius: 110 };

  return (
    <section className={css.card}>
      <div className={css.header}>
        <h2 className={css.title}>Expenses categories</h2>
      </div>

      <div className={css.chartLayout}>
        <div className={css.chartWrap}>
          {isLoading ? (
            <>
              <PieChart width={chartConfig.width} height={chartConfig.height}>
                <defs>
                  <linearGradient
                    id={skeletonGradientId}
                    x1="0"
                    y1="0"
                    x2={chartConfig.width}
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="rgba(14, 243, 135, 0.12)" />
                    <stop offset="35%" stopColor="rgba(14, 243, 135, 0.18)" />
                    <stop offset="50%" stopColor="rgba(14, 243, 135, 0.28)" />
                    <stop offset="65%" stopColor="rgba(14, 243, 135, 0.18)" />
                    <stop offset="100%" stopColor="rgba(14, 243, 135, 0.12)" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      from={`${-chartConfig.width} 0`}
                      to={`${chartConfig.width} 0`}
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>

                <Pie
                  data={[{ value: 100 }]}
                  dataKey="value"
                  rootTabIndex={-1}
                  activeShape={false}
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="100%"
                  innerRadius={chartConfig.innerRadius}
                  outerRadius={chartConfig.outerRadius}
                  isAnimationActive={false}
                  stroke="none"
                  fill={`url(#${skeletonGradientId})`}
                />
              </PieChart>
              <span className={css.chartValueSkeleton} aria-hidden="true" />
            </>
          ) : (
            <>
              <PieChart width={chartConfig.width} height={chartConfig.height}>
                <Pie
                  data={[{ value: total || 100 }]}
                  dataKey="value"
                  rootTabIndex={-1}
                  activeShape={false}
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="100%"
                  innerRadius={chartConfig.innerRadius}
                  outerRadius={chartConfig.outerRadius}
                  isAnimationActive={false}
                  stroke="none"
                  fill="#2f2f31"
                />

                {chartItems.length ? (
                  <Pie
                    data={chartItems}
                    dataKey="totalAmount"
                    nameKey="category"
                    rootTabIndex={-1}
                    activeShape={false}
                    startAngle={180}
                    endAngle={0}
                    cx="50%"
                    cy="100%"
                    innerRadius={chartConfig.innerRadius}
                    outerRadius={chartConfig.outerRadius}
                    paddingAngle={0}
                    cornerRadius={10}
                    isAnimationActive={false}
                    stroke="none"
                  >
                    {chartItems.map((item) => (
                      <Cell key={item._id} fill={item.color} />
                    ))}
                  </Pie>
                ) : null}
              </PieChart>
              <span className={css.chartValue}>{total > 0 ? "100%" : "0%"}</span>
            </>
          )}
        </div>

        <div className={css.legend}>
          {isLoading ? (
            <>
              <span className={css.legendSkeletonRow} aria-hidden="true" />
              <span className={css.legendSkeletonRow} aria-hidden="true" />
              <span className={css.legendSkeletonRow} aria-hidden="true" />
              <span className={css.legendSkeletonRow} aria-hidden="true" />
            </>
          ) : chartItems.length ? (
            chartItems.map((item) => (
              <div key={item._id} className={css.legendRow}>
                <span className={css.legendName}>
                  <span
                    className={css.legendDot}
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.category}
                </span>
                <span className={css.legendValue}>{item.percent}%</span>
              </div>
            ))
          ) : (
            <p className={css.emptyState}>No expense data yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
