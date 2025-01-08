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
import { Game } from "@prisma/client"

export function NewGuideForm({ games }: { games: Game[] }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Add your form submission logic here
    setLoading(false)
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Guide Title</label>
          <Input required placeholder="Enter guide title" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Game</label>
          <Select>
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
          <Textarea required placeholder="Enter guide description" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea required className="min-h-[200px]" placeholder="Enter guide content" />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Guide'}
        </Button>
      </form>
    </Card>
  )
} 