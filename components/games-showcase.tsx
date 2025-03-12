'use client'

import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'

interface Game {
  id: string
  title: string
  description: string
  image?: string
  guideCount: number
}

interface GamesShowcaseProps {
  games: Game[]
}

export default function GamesShowcase({ games }: GamesShowcaseProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const handleImageLoad = (gameId: string) => {
    setLoadedImages(prev => ({ ...prev, [gameId]: true }))
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div key={game.id} className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                {game.image ? (
                  <>
                    <Image 
                      src={game.image} 
                      alt={game.title}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        loadedImages[game.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(game.id)}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {!loadedImages[game.id] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                  </>
                ) : (
                  <Skeleton className="h-full w-full" />
                )}
              </div>
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