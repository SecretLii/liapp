import { prisma } from '@/lib/prisma'
import { GamesList } from '@/components/admin/games-list'

export default async function GamesManagement() {
  const games = await prisma.game.findMany({
    include: {
      guides: true,
    },
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Games Management</h1>
      <GamesList games={games} />
    </div>
  )
} 