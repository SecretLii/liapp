import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { EditGameForm } from '@/components/admin/edit-game-form'

interface PageProps {
  params: { id: string }
}

export default async function EditGame({ params }: PageProps) {
  const game = await prisma.game.findUnique({
    where: { id: params.id }
  })

  if (!game) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Game</h1>
      <EditGameForm game={game} />
    </div>
  )
} 