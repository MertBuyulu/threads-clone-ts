// app/layout.tsx
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import "../globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Meta Threads clone built with Next.js 13, Postgres, and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
