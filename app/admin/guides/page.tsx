import { prisma } from '@/lib/prisma'
import { GuidesList } from '@/components/admin/guides-list'

export default async function GuidesManagement() {
  const guides = await prisma.guide.findMany({
    include: {
      game: true,
    },
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Guides Management</h1>
      <GuidesList guides={guides} />
    </div>
  )
} 