import { NewGuideForm } from '@/components/admin/new-guide-form'
import { prisma } from '@/lib/prisma'

export default async function NewGuide() {
  const games = await prisma.game.findMany()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Guide</h1>
      <NewGuideForm games={games} />
    </div>
  )
} 