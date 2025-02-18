import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Initialize Gemini API with a free API key
const genAI = new GoogleGenerativeAI('AIzaSyDJC5a7TpvyPvHVYB6ErDXmgSxFqOkHW_k');

async function searchInternet(query: string) {
  try {
    const response = await fetch(`https://api.tavily.com/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.TAVILY_API_KEY || '',
      },
      body: JSON.stringify({
        query,
        search_depth: 'advanced',
        include_domains: ['ign.com', 'gamespot.com', 'pcgamer.com', 'eurogamer.net', 'polygon.com', 'kotaku.com'],
        max_results: 5
      }),
    })

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // First, search for relevant information
    const searchResults = await searchInternet(message)
    const searchContext = searchResults.length > 0
      ? "Based on recent information from gaming websites:\n" + 
        searchResults.map((result: any) => `- ${result.title}: ${result.snippet}`).join('\n')
      : ""

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are Axiom, an advanced AI gaming companion with deep knowledge of video games, gaming strategies, and content creation.

Your capabilities include:
1. Creating detailed game guides and walkthroughs
2. Providing strategic advice and tips for any game
3. Explaining game mechanics and systems
4. Suggesting optimal character builds and loadouts
5. Offering speedrunning strategies
6. Recommending games based on player preferences
7. Analyzing meta trends and competitive strategies
8. Helping with content creation for gaming channels/streams

Guidelines:
- Provide specific, actionable advice rather than general statements
- Use clear, concise language with gaming terminology when appropriate
- Include examples and specific scenarios in your explanations
- When discussing strategies, explain the reasoning behind them
- If you don't know something, be honest and suggest alternative resources
- Stay up-to-date with gaming trends and meta strategies
- Be enthusiastic and engaging while maintaining professionalism

Remember: You're not just an AI - you're Axiom, a trusted gaming companion focused on helping players improve and enjoy their gaming experience.

${searchContext}

User Question: ${message}

Please provide a helpful response as Axiom.`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
      sources: searchResults.map((result: any) => ({
        title: result.title,
        url: result.url
      }))
    })
  } catch (error: any) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { 
        error: error?.message || 'Failed to get AI response',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
} 