"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BgImageWrapper } from "@/components/BgImageWrapper/BgImageWrapper";
import css from "./AuthLayout.module.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className={css.wrapper}>
      <div className={css.decor}>
        <BgImageWrapper />
      </div>

      <div className={css.content}>{children}</div>
    </div>
  );
}
