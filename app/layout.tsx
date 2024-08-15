import type {Metadata} from 'next';
import {Inter as FontSans, Bebas_Neue as Bebas} from 'next/font/google';
import '@/styles/globals.css';
import {cn} from '@/libs/utils';
import Providers from '@/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const bebas = Bebas({
  subsets: ['latin'],
  variable: '--bebas',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'OneSport - Find the right sport field vanue, right away',
  description:
    'OneSport is a platform for someone who wants to find the best places to exercise such as Soccer, Basket, Volley and etc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          bebas.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
