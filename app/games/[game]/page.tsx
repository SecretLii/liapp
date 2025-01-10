import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function GamePage({
  params
}: {
  params: { game: string }
}) {
  const game = await prisma.game.findUnique({
    where: { 
      slug: params.game.toLowerCase() 
    },
    include: {
      guides: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!game) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
          {game.image && (
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <p className="text-lg text-muted-foreground mb-6">{game.description}</p>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
              {game.guideCount} guides
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Guides</h2>
            <Link 
              href="/admin/guides/create" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Create Guide
            </Link>
          </div>
          
          {game.guides.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">No guides yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {game.guides.map((guide) => (
                <Link 
                  key={guide.id} 
                  href={`/guides/${guide.id}`}
                  className="block bg-card hover:bg-muted rounded-lg shadow p-6 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">{guide.content}</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {new Date(guide.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 