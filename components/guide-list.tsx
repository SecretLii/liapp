import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type GuideListProps = {
  guides: Array<{
    id: string
    title: string
    content: string
    createdAt: Date
  }>
}

export default function GuideList({ guides }: GuideListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Guides</h2>
      <div className="grid gap-6">
        {guides.map((guide) => (
          <article key={guide.id} className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              <Link 
                href={`/guides/${guide.id}`}
                className="hover:text-primary transition-colors"
              >
                {guide.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">
              {guide.content.substring(0, 150)}...
            </p>
            <p className="text-sm text-gray-500">
              Created {formatDate(guide.createdAt)}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
} 