import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type Props = {
  params: {
    id: string
  }
}

export default async function GuidePage({ params }: Props) {
  const guide = await prisma.guide.findUnique({
    where: {
      id: params.id
    },
    include: {
      game: true
    }
  })

  if (!guide) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href={`/games/${guide.game.slug}`}
          className="text-primary hover:opacity-80 mb-4 inline-block"
        >
          ← Back to {guide.game.title}
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
          
          <div className="text-gray-500 mb-8">
            Published {formatDate(guide.createdAt)}
          </div>

          <div className="mt-8 prose prose-lg">
            {guide.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
} 