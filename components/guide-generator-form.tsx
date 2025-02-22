'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Scroll } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useRouter } from 'next/navigation'
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
  slug: string
}

export function GuideGeneratorForm() {
  const [loading, setLoading] = useState(false)
  const [generatedGuide, setGeneratedGuide] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  // Fetch games on component mount
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch('/api/games')
        const data = await response.json()
        setGames(data.games)
      } catch (error) {
        console.error('Error fetching games:', error)
        toast({
          variant: "destructive",
          description: "Failed to load games",
        })
      }
    }
    fetchGames()
  }, [toast])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const title = formData.get('title') as string
      const description = formData.get('description') as string

      if (!title || !description || !selectedGame) {
        toast({
          variant: "destructive",
          description: "Please fill in all fields and select a game",
        })
        return
      }

      // Show generating toast
      toast({
        title: "Generating Guide",
        description: "This might take a minute...",
      })

      const response = await fetch('/api/generate-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          description,
          gameId: selectedGame
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate guide')
      }

      setGeneratedGuide(data.guide.content)
      toast({
        title: "Guide Generated!",
        description: "Your guide has been created and saved.",
      })

      // Navigate to the new guide after a short delay
      setTimeout(() => {
        router.push(`/guides/${data.guide.id}`)
        router.refresh()
      }, 2000)

    } catch (error: any) {
      console.error('Guide generation error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate guide",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="game" className="block text-sm font-medium mb-1">
              Select Game
            </label>
            <Select
              value={selectedGame}
              onValueChange={setSelectedGame}
            >
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
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Guide Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Complete Elden Ring Malenia Boss Guide"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Brief Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what the guide should cover..."
              required
              disabled={loading}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !selectedGame}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Scroll className="mr-2 h-4 w-4" />
                Generate Guide
              </>
            )}
          </Button>
        </form>
      </Card>

      {generatedGuide && (
        <Card className="p-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {generatedGuide}
            </ReactMarkdown>
          </div>
        </Card>
      )}
    </div>
  )
} 