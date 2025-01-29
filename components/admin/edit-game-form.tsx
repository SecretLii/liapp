'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { updateGame } from '@/app/actions/game'

interface Game {
  id: string
  title: string
  description: string
  image?: string | null
}

export function EditGameForm({ game }: { game: Game }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.currentTarget
      const formData = {
        title: (form.elements.namedItem('title') as HTMLInputElement).value,
        description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
        image: (form.elements.namedItem('image') as HTMLInputElement).value || null
      }
      
      if (!formData.title || !formData.description) {
        toast({
          variant: "destructive",
          description: "Please fill in all required fields",
        })
        return
      }

      const result = await updateGame(game.id, formData)
      
      if (result.success) {
        toast({
          description: "Game updated successfully",
        })
        router.push('/admin/games')
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          description: result.error || "Failed to update game",
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        variant: "destructive",
        description: "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Game Title</label>
          <Input 
            id="title"
            name="title"
            defaultValue={game.title}
            required 
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea 
            id="description"
            name="description"
            defaultValue={game.description}
            required 
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
          <Input 
            id="image"
            name="image"
            type="url"
            defaultValue={game.image || ''}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Game'}
        </Button>
      </form>
    </Card>
  )
}
