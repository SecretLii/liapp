import { AiChat } from '@/components/ai-assistant/ai-chat'
import { Sword } from 'lucide-react'

export default function AiAssistantPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sword 
              className="h-8 w-8 rotate-45 text-destructive transition-transform hover:rotate-[135deg]" 
              strokeWidth={2.5}
            />
            Axiom
          </h1>
          <p className="text-muted-foreground">
            Your intelligent gaming companion for creating guides, discovering strategies, and mastering your favorite games.
          </p>
        </div>
        
        <AiChat />
      </div>
    </div>
  )
} 