import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Container from '@/components/Container/Container';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your daily expenses and income in one place.',
  openGraph: {
    title: 'Expense Tracker',
    description: 'Track your daily expenses and income in one place.',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/bg-image-tablet.png`,
        width: 1200,
        height: 630,
        alt: 'Expense Tracker',
      },
    ],
  },
};

export default async function RootLayout({
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
              <Header />
              <main>{children}</main>
              <Toaster position="top-right" />
            </Container>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
