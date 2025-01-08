import { prisma } from '@/lib/prisma'
import { GamesList } from '@/components/admin/games-list'
import { Suspense } from 'react'
import type { Game, Guide } from '@prisma/client'

type GameWithGuides = Game & {
  guides: Guide[]
}

async function getGames(): Promise<GameWithGuides[]> {
  try {
    const games = await prisma.game.findMany({
      include: {
        guides: true,
      },
    })
    return games
  } catch (error) {
    console.error('Database error:', error)
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to connect to the database'
    )
  }
}

export default async function GamesManagement() {
  let games: GameWithGuides[] = []
  let error: Error | null = null

  try {
    games = await getGames()
  } catch (e) {
    error = e instanceof Error ? e : new Error('An unknown error occurred')
    console.error('Failed to fetch games:', e)
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Games Management</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Failed to load games. Please try again later.</p>
          <p className="text-sm mt-1">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Games Management</h1>
      <Suspense fallback={<div>Loading games...</div>}>
        <GamesList games={games} />
      </Suspense>
    </div>
  )
} 