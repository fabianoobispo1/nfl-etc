import '@uploadthing/react/styles.css'
import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import NextTopLoader from 'nextjs-toploader'

import './globals.css'
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'
import ConvexClientProvider from '@/providers/ConvexClientProvider'
import AuthProvider from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Nfl Etc',
  description:
    'Curiosidades, bastidores, os personagens e as melhores histórias dentro e fora de campo da NFL.',
  keywords: 'nfl, NLF, nef etc, NFL-ETC, Podcast de esporte, futebol americano',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={'font-inter overflow-hidden'}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader showSpinner={false} />
          <ConvexClientProvider>
            <AuthProvider>
              <Toaster />
              <main className="">
                {children}
                <Analytics />
                <SpeedInsights />
              </main>
            </AuthProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
