'use client'

import { updateGuide } from '@/app/actions/guide'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Guide, Game } from '@prisma/client'

interface EditGuideFormProps {
  guide: Guide & {
    game: Game
  }
}

export function EditGuideForm({ guide }: EditGuideFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await updateGuide(guide.id, formData)
      
      if (result.success) {
        toast({
          description: "Guide updated successfully",
        })
        router.push('/admin/guides')
      } else {
        toast({
          variant: "destructive",
          description: result.error || "Failed to update guide",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Guide Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={guide.title}
            className="w-full rounded-md border p-2"
            placeholder="Enter guide title"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            defaultValue={guide.content}
            className="w-full rounded-md border p-2"
            placeholder="Write your guide content here..."
            required
          />
        </div>
        <input type="hidden" name="gameId" value={guide.gameId} />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Update Guide
        </button>
      </div>
    </form>
  )
} 