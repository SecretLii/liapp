import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      guides: {
        select: {
          id: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">All Games</h1>
          <Link 
            href="/admin/games/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Add Game
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">No games yet. Add your first game!</p>
            </div>
          ) : (
            games.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group block bg-card hover:bg-muted rounded-lg shadow-lg overflow-hidden transition-colors"
              >
                {game.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                  <p className="text-muted-foreground line-clamp-2 mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {game.guides.length} {game.guides.length === 1 ? 'guide' : 'guides'}
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      View Guides →
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