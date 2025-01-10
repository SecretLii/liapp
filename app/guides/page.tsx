import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function GuidesPage() {
  const guides = await prisma.guide.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      game: true
    }
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">All Guides</h1>
          <Link 
            href="/admin/guides/create"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Create Guide
          </Link>
        </div>

        <div className="grid gap-6">
          {guides.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">No guides yet. Be the first to create one!</p>
            </div>
          ) : (
            guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="block bg-card hover:bg-muted rounded-lg shadow-lg overflow-hidden transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {guide.game.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(guide.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {guide.content}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 