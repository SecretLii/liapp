import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Gamepad2 } from 'lucide-react'

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: {
      guideCount: 'desc'
    }
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-between mb-12">
          <div className="relative w-full text-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-500/20"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6 flex items-center gap-4">
                <div className="group cursor-pointer">
                  <Gamepad2 
                    className="h-8 w-8 text-emerald-500 group-hover:animate-spin-slow transition-all duration-700 hover:scale-110" 
                    strokeWidth={2}
                  />
                </div>
                <h1 className="text-5xl font-bold text-emerald-500">
                  All Games
                </h1>
                <div className="group cursor-pointer">
                  <Gamepad2 
                    className="h-8 w-8 text-emerald-500 group-hover:animate-spin-slow transition-all duration-700 hover:scale-110" 
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Explore our collection of games and find your next gaming adventure
          </p>
          <Link 
            href="/admin/games/create"
            className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 group"
          >
            <Gamepad2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            Add Game
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg col-span-full">
              <p className="text-muted-foreground">No games yet. Be the first to add one!</p>
            </div>
          ) : (
            games.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="block bg-card hover:bg-muted rounded-lg shadow-lg overflow-hidden transition-colors"
              >
                {game.image && (
                  <div className="relative h-48 bg-muted">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full">
                      {game.guideCount} {game.guideCount === 1 ? 'guide' : 'guides'}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 