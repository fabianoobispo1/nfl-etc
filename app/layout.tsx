/* import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster'; */
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';

import './globals.css';
/* import { auth } from '@/auth';
 */
export const metadata: Metadata = {
  title: 'Nfl Etc',
  description: 'Site para testar novas tecnologias'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  /*   const session = await auth(); */
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={'font-inter flex h-screen overflow-hidden'}>
        
        {children}
        
        </body>
    </html>
  );
}
