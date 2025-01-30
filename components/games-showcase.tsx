import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

interface Game {
  id: string
  title: string
  description: string
  image: string | null
  guideCount: number
}

interface GamesShowcaseProps {
  games: Game[]
}

export default function GamesShowcase({ games }: GamesShowcaseProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div key={game.id} className="bg-card rounded-lg shadow-lg overflow-hidden">
              {game.image && (
                <div className="relative h-48">
                  <Image 
                    src={game.image} 
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className="text-muted-foreground mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{game.guideCount} guides</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 