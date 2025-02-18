'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Sword, Send } from "lucide-react"

export function AiChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      // Add user message to chat
      const userMessage = { role: 'user' as const, content: input }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      // Show loading toast
      toast({
        title: "Processing your request",
        description: "Axiom is thinking...",
      })

      // Call AI endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])

      // Success toast
      toast({
        title: "Response ready",
        description: "Axiom has answered your question.",
        duration: 3000,
      })

    } catch (error: any) {
      console.error('Chat error:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to get AI response. Please try again.",
      })
      // Optionally remove the failed user message
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] p-4 flex flex-col">
      <div className="flex-1 overflow-auto space-y-4 mb-4 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sword 
                className="h-5 w-5 rotate-45 text-destructive transition-transform hover:rotate-[135deg]" 
                strokeWidth={2.5}
              />
              <span className="font-semibold text-primary">Axiom</span>
            </div>
            <p>How can I assist you with guides, strategies, or gaming insights today?</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 mr-4 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Axiom is thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about game guides, strategies, or tips..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading} className="px-4">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Card>
  )
} 