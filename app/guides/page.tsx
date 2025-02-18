import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Scroll } from 'lucide-react'

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
        <div className="flex flex-col items-center justify-between mb-12">
          <div className="relative w-full text-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-500/20"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6 flex items-center gap-4">
                <div className="group cursor-pointer">
                  <Scroll 
                    className="h-8 w-8 text-indigo-500 group-hover:animate-bounce transition-colors" 
                    strokeWidth={2}
                  />
                </div>
                <h1 className="text-5xl font-bold text-indigo-500">
                  All Guides
                </h1>
                <div className="group cursor-pointer">
                  <Scroll 
                    className="h-8 w-8 text-indigo-500 group-hover:animate-bounce transition-colors" 
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Discover comprehensive guides and strategies for your favorite games
          </p>
          <Link 
            href="/admin/guides/create"
            className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 group"
          >
            <Scroll className="h-5 w-5 group-hover:rotate-12 transition-transform" />
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
                    <span className="text-sm font-medium bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full">
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