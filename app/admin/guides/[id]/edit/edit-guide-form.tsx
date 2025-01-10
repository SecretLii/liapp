'use client'

import { updateGuide } from '@/app/actions/guide'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Guide {
  id: string
  title: string
  content: string
  gameId: string
  game: {
    id: string
    title: string
  }
}

interface EditGuideFormProps {
  guide: Guide
}

export function EditGuideForm({ guide }: EditGuideFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
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
    } catch {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      })
    } finally {
      setIsSubmitting(false)
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
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Guide'}
        </button>
      </div>
    </form>
  )
} 