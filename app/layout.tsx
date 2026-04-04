
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import { BgImageWrapper } from "@/components/BgImageWrapper/BgImageWrapper";

import WelcomePage from "@/components/WellcomPage/WellcomPage";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your daily expenses and income in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <TanStackProvider>
          <Container>

           
            <WelcomePage />
            <main>{children}</main>


              

          </Container>
        </TanStackProvider>
      </body>
    </html>
  );
}
