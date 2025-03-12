import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Page not found</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild variant="default">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/guides" className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                Browse Guides
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 