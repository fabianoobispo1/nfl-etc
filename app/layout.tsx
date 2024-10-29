import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nfl Etc',
  description: 'Site Principal do podcast NFL ETC',
  keywords:
    'nfl, NLF, nef etc, NFL-ETC, Podcast de esporte, futebol americano'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={'font-inter flex h-screen overflow-hidden'}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
