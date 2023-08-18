import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import ThemeRegistry from '@/lib/ThemeRegistry/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tald',
  description: 'Tald Client Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeRegistry>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
