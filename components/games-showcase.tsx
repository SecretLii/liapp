import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function GamesShowcase() {
  const games = await prisma.game.findMany()

  return (
    <section id="games" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Games</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link 
              key={game.slug} 
              href={`/games/${game.slug}`} 
              className="p-6 bg-card rounded-lg shadow-lg hover:opacity-80 transition-opacity"
            >
              <h3 className="text-2xl font-semibold mb-3">{game.title}</h3>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <p className="text-sm font-medium text-primary">{game.guideCount}+ guides</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 