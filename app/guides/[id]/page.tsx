import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'

type Props = {
  params: {
    id: string
  }
}

const MarkdownComponents: Partial<Components> = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-8" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold mt-12 mb-6" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold mt-8 mb-4" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-relaxed mb-6" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 my-6 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 my-6 space-y-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-2 mb-2" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-primary pl-6 italic my-6" {...props}>{children}</blockquote>
  ),
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link 
            href={`/games/${guide.game.slug}`}
            className="text-primary hover:opacity-80 mb-8 inline-flex items-center text-sm font-medium"
          >
            ← Back to {guide.game.title}
          </Link>

          <article className="bg-card rounded-lg shadow-md p-8 md:p-12">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{guide.title}</h1>
              <div className="text-muted-foreground text-sm">
                Published {formatDate(guide.createdAt)}
              </div>
            </header>

            <div className="prose prose-lg max-w-none dark:prose-invert 
              prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-base prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2 prose-li:pl-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary
              prose-blockquote:pl-6 prose-blockquote:italic
              prose-strong:text-foreground prose-strong:font-bold
              prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={MarkdownComponents}
              >
                {guide.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
} 