import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { EditGuideForm } from './edit-guide-form'

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params
  
  if (!id) {
    notFound()
  }

  const guide = await prisma.guide.findUnique({
    where: { 
      id: id 
    },
    include: { 
      game: true 
    }
  })

  if (!guide) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Guide</h1>
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow p-6">
        <EditGuideForm guide={guide} />
      </div>
    </div>
  )
}

export default Page 