import '../globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import TopBar from '@/components/shared/TopBar'
import BottomBar from '@/components/shared/BottomBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads Clone',
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
      <body className={inter.className}>
        <TopBar/>
          <main>
            <LeftSideBar/>
            <section className='main-container'>
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSideBar/>
          </main>
        <BottomBar/>
      </body>
    </html>
    </ClerkProvider>
  )
}
