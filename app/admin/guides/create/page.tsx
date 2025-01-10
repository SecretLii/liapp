import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { NewGuideForm } from '@/components/admin/new-guide-form'

export default async function CreateGuidePage() {
  const games = await prisma.game.findMany({
    orderBy: {
      title: 'asc'
    }
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Guide</h1>
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow p-6">
        <NewGuideForm games={games} />
      </div>
    </div>
  )
} 