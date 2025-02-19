import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerEnv } from '@/lib/env'

// Prisma database search
async function searchDatabase(query: string) {
  try {
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

    return guides.map(guide => ({
      title: guide.title,
      game: guide.game.title,
      description: guide.content.substring(0, 150) + '...',
      type: 'guide',
      url: `/guides/${guide.id}`
    }))
  } catch (error) {
    console.error('Database search error:', error)
    return []
  }
}

// Tavily search with secure API key
async function searchTavily(query: string) {
  try {
    const response = await fetch(`https://api.tavily.com/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': getServerEnv('TAVILY_API_KEY'),
      },
      body: JSON.stringify({
        query: `${query} gaming guide walkthrough`,
        search_depth: 'advanced',
        include_domains: ['ign.com', 'gamespot.com', 'pcgamer.com', 'eurogamer.net', 'polygon.com', 'kotaku.com'],
        max_results: 5
      }),
    })

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`)
    }

    const data = await response.json()
    return (data.results || []).map(result => ({
      title: result.title,
      description: result.snippet,
      type: 'web',
      url: result.url
    }))
  } catch (error) {
    console.error('Tavily search error:', error)
    return []
  }
}

// Process results without AI
function processResults(dbResults: any[], webResults: any[]) {
  // Combine and sort results by relevance (guides first, then web results)
  const allResults = [...dbResults, ...webResults]

  // Create a summary based on the number of results
  const summary = `Found ${dbResults.length} guides and ${webResults.length} web results.`

  // Generate recommendations based on result count
  let recommendations = "No results found. Try broadening your search terms."
  if (dbResults.length > 0) {
    recommendations = "Check out our guides first for the most relevant information."
  } else if (webResults.length > 0) {
    recommendations = "While we don't have specific guides, we found some helpful resources from gaming websites."
  }

  return {
    summary,
    recommendations,
    results: allResults
  }
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    // Run database and Tavily searches in parallel for better performance
    const [dbResults, webResults] = await Promise.all([
      searchDatabase(query),
      searchTavily(query)
    ])

    // Process results without AI
    const processedResults = processResults(dbResults, webResults)

    return NextResponse.json({
      ...processedResults,
      _metadata: {
        resultCount: {
          database: dbResults.length,
          web: webResults.length
        },
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process search',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    )
  }
} 