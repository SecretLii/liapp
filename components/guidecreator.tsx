'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/hooks/use-toast"
import GuidePreview from './guidepreview'
import { createGuide } from '@/app/actions/game'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Game {
  id: string
  title: string
}

export default function GuideCreator({ games }: { games: Game[] }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedGameId, setSelectedGameId] = useState('')
  const [guide, setGuide] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedGameId) {
      toast({
        variant: "destructive",
        description: "Please select a game",
      })
      return
    }
    
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('gameId', selectedGameId)
      formData.append('title', title)
      formData.append('content', content)

      console.log('Submitting guide with data:', {
        gameId: selectedGameId,
        title,
        content
      })

      const result = await createGuide(formData)

      if (result.success) {
        setGuide(content)
        toast({
          description: "Guide created successfully",
        })
        // Reset form
        setTitle('')
        setContent('')
        setSelectedGameId('')
      } else {
        console.error('Failed to create guide:', result.error)
        toast({
          variant: "destructive",
          description: result.error || "Failed to create guide",
        })
      }
    } catch (error) {
      console.error('Error creating guide:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create guide'
      toast({
        variant: "destructive",
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="game" className="block text-sm font-medium mb-1">Select Game</label>
          <Select value={selectedGameId} onValueChange={setSelectedGameId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a game" />
            </SelectTrigger>
            <SelectContent>
              {games.map((game) => (
                <SelectItem key={game.id} value={game.id}>
                  {game.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Guide Title</label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
            placeholder="Enter guide title" 
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Guide Content</label>
          <Textarea 
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required 
            placeholder="Write your guide content here..." 
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Guide'}
        </Button>
      </form>

      {guide && <GuidePreview content={guide} />}
    </Card>
  )
}

