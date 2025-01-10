"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface Game {
  id: string
  title: string
  slug: string
  description: string
}

interface MobileNavProps {
  games: Game[]
}

export function MobileNav({ games }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="text-left">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-6">
          <div className="px-2">
            <div className="flex items-center justify-between mb-2 px-4">
              <h2 className="text-lg font-semibold tracking-tight">Games</h2>
              <Link
                href="/games"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-1">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.slug}`}
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  {game.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="px-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Guides
            </h2>
            <div className="space-y-1">
              <Link
                href="/admin/guides/create"
                className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                Create Guide
              </Link>
              <Link
                href="/guides"
                className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
              >
                Browse Guides
              </Link>
            </div>
          </div>
          <div className="px-2">
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              Admin
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
} 