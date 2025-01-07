import Nav from '@/components/nav'
import Footer from '@/components/footer'
import './globals.css'
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
          <Nav />
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

