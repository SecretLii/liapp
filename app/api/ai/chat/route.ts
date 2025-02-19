import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function searchDatabase(query: string) {
  try {
    // Search for guides
    const guides = await prisma.guide.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { game: { title: { contains: query } } }
        ]
      },
      include: {
        game: {
          select: {
            title: true,
            slug: true
          }
        }
      },
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Search for games
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } }
        ]
      },
      take: 3,
      orderBy: {
        guideCount: 'desc'
      }
    })

    return { guides, games }
  } catch (error) {
    console.error('Database search error:', error)
    return { guides: [], games: [] }
  }
}

function generateResponse(query: string, results: { guides: any[], games: any[] }) {
  const { guides, games } = results

  if (guides.length === 0 && games.length === 0) {
    return {
      message: `I couldn't find any guides or games matching "${query}". Try searching for a specific game title or topic!`,
      results: []
    }
  }

  let response = `Here's what I found about "${query}":\n\n`

  if (games.length > 0) {
    response += "🎮 Related Games:\n"
    games.forEach(game => {
      response += `- ${game.title}: ${game.description}\n`
    })
    response += "\n"
  }

  if (guides.length > 0) {
    response += "📚 Available Guides:\n"
    guides.forEach(guide => {
      response += `- ${guide.title} (for ${guide.game.title})\n`
    })
  }

  const searchResults = [
    ...guides.map(guide => ({
      title: guide.title,
      type: 'Guide',
      game: guide.game.title,
      url: `/guides/${guide.id}`
    })),
    ...games.map(game => ({
      title: game.title,
      type: 'Game',
      description: game.description,
      url: `/games/${game.slug}`
    }))
  ]

  return {
    message: response,
    results: searchResults
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Search the database
    const searchResults = await searchDatabase(message)
    
    // Generate a response based on search results
    const { message: responseText, results } = generateResponse(message, searchResults)

    return NextResponse.json({
      message: responseText,
      results
    })

  } catch (error: any) {
    console.error('Chat Error:', error)
    return NextResponse.json(
      { 
        error: error?.message || 'Failed to get response',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 