'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function NewGuideForm({ games }: { games: any[] }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    gameId: '',
    description: ''
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, get AI generated content
      const aiResponse = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Write a professional gaming guide with the following details:
                Title: ${formData.title}
                Game: ${games.find(g => g.id === formData.gameId)?.title}
                Description: ${formData.description}
                
                Please write a detailed, well-structured guide that includes:
                - Introduction
                - Main strategies and techniques
                - Tips and tricks
                - Common mistakes to avoid
                - Conclusion
                
                Make it engaging and professional.`
            }
          ]
        })
      })

      if (!aiResponse.ok) {
        throw new Error('Failed to generate guide content')
      }

      const { content } = await aiResponse.json()
      
      // Save the guide to the database
      const saveResponse = await fetch('/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          gameId: formData.gameId,
          content: content
        })
      })

      if (!saveResponse.ok) {
        throw new Error('Failed to save guide')
      }

      const savedGuide = await saveResponse.json()
      
      toast({
        title: "Guide created!",
        description: "Your guide has been generated and saved successfully.",
      })

      // Reset form
      setFormData({
        title: '',
        gameId: '',
        description: ''
      })

      // Redirect to the new guide
      router.push(`/guides/${savedGuide.id}`)
    } catch (error) {
      console.error('Error creating guide:', error)
      toast({
        title: "Error",
        description: "Failed to create guide. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Guide Title</label>
          <Input 
            required 
            placeholder="Enter guide title" 
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Game</label>
          <Select 
            value={formData.gameId} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, gameId: value }))}
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea 
            required 
            placeholder="Enter a brief description of what this guide will cover" 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Generating Guide...' : 'Generate Guide'}
        </Button>
      </form>
    </Card>
  )
} 