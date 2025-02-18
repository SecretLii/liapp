import React from 'react';
import Footer from '@/components/footer';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster'
import NavWrapper from '@/components/nav-wrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <NavWrapper />
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
