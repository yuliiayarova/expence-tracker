import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Container from "@/components/Container/Container";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

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
          <AuthProvider>
            <Container>
              <main>{children}</main>
              <Toaster position="top-right" />
            </Container>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
