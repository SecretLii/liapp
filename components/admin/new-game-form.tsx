'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export function NewGameForm() {
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
          <label className="block text-sm font-medium mb-1">Game Title</label>
          <Input required placeholder="Enter game title" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea required placeholder="Enter game description" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <Input required placeholder="game-title-slug" />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Game'}
        </Button>
      </form>
    </Card>
  )
} 