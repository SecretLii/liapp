import React from 'react';
import { prisma } from '@/lib/prisma'
import Hero from '@/components/hero'
import GamesShowcase from '@/components/games-showcase'

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: {
      guideCount: 'desc'
    },
    take: 6
  })

  return (
    <div>
      <Hero />
      <GamesShowcase games={games} />
    </div>
  )
}

