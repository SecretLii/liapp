'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createGame } from '@/app/actions/game'

export function NewGameForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createGame(formData)

      if (result.success) {
        toast({
          description: "Game created successfully",
        })
        router.push('/games')
      } else {
        toast({
          variant: "destructive",
          description: result.error || "Failed to create game",
        })
      }
    } catch (error) {
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
            required 
            placeholder="Enter game title" 
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea 
            id="description"
            name="description"
            required 
            placeholder="Enter game description" 
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">Image URL</label>
          <Input 
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/image.jpg" 
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Game'}
        </Button>
      </form>
    </Card>
  )
} 