'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import SearchTerms from './searchterms'
import GuidePreview from './guidepreview'
// import SearchTerms from './SearchTerms'
// import GuidePreview from './GuidePreview'

export default function GuideCreator() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const [guide, setGuide] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate AI-generated search terms
    const generatedTerms = [
      `${title} basics`,
      `${title} advanced strategies`,
      `${title} tips and tricks`,
      `${title} walkthrough`,
      `${title} best practices`
    ]
    setSearchTerms(generatedTerms)

    // Simulate guide generation (in a real app, this would call the backend)
    setTimeout(() => {
      setGuide(`# ${title}

## Introduction
${description}

## Basic Strategies
1. Start with the tutorial
2. Complete daily quests
3. Join a guild or clan

## Advanced Techniques
1. Optimize your gear
2. Master combos and skill rotations
3. Study the meta and adapt your playstyle

## Tips and Tricks
- Always keep your inventory organized
- Use voice chat for better team coordination
- Take regular breaks to avoid burnout

## Conclusion
Practice these strategies consistently, and you'll see significant improvement in your gameplay. Good luck, and have fun!

Sources:
1. GameFAQs.com
2. Reddit.com/r/gaming
3. IGN.com`)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Guide Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Brief description of the guide"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit">Generate Guide</Button>
      </form>

      {searchTerms.length > 0 && <SearchTerms terms={searchTerms} />}
      
      {guide && <GuidePreview content={guide} />}
    </div>
  )
}

