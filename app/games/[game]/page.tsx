import GameHeader from '@/components/game-header'
import GuideForm from '@/components/guide-form'
import GuideList from '@/components/guide-list'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    game: string // this is the slug
  }
}

export default async function GamePage({ params }: Props) {
  const game = await prisma.game.findUnique({
    where: {
      slug: params.game
    },
    include: {
      guides: true
    }
  })

  if (!game) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GameHeader game={game} />
      <GuideList guides={game.guides} />
    </div>
  )
} 