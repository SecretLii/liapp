import React from 'react';
import Footer from '@/components/footer';
import { MainNav } from '@/components/nav';
import { BackToTop } from '@/components/back-to-top';
import { Breadcrumbs } from '@/components/breadcrumbs';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';
import { metadata } from './metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <div className="min-h-screen flex flex-col">
            <MainNav />
            <div className="container mx-auto px-4">
              <Breadcrumbs />
            </div>
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />
            <BackToTop />
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}
