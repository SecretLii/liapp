'use client'

import { createGame } from '@/app/actions/game'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { Gamepad2 } from 'lucide-react'

export default function GameForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await createGame(formData)
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Game created successfully!",
        })
        // Reset the form
        const form = document.getElementById('gameForm') as HTMLFormElement
        form.reset()
        // Refresh the games list
        router.refresh()
        // Redirect to games list
        router.push('/games')
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to create game",
        })
      }
    } catch (error) {
      console.error('Error creating game:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Gamepad2 className="h-6 w-6 text-emerald-500" />
        <h2 className="text-2xl font-bold">Add New Game</h2>
      </div>

      <form id="gameForm" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Game Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Elden Ring"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Brief description of the game..."
            required
            disabled={loading}
            rows={4}
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <Input
            type="url"
            id="image"
            name="image"
            placeholder="https://example.com/game-image.jpg"
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Provide a URL to the game's cover image or promotional artwork
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Add Game'}
        </Button>
      </form>
    </Card>
  )
} 