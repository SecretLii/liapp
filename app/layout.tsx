import React from 'react';
import Footer from '@/components/footer';
import { MainNav } from '@/components/nav';
import './globals.css';
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  )
}
