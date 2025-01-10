import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    // Get the messages from request body
    const { messages } = await req.json()

    if (!messages) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful gaming guide assistant. You help users write clear, concise, and helpful gaming guides. Always format your responses in markdown with proper headings (##), lists (-), and emphasis (**) where appropriate."
        },
        ...messages
      ],
    })

    // Extract the content and ensure it starts with a markdown heading
    let content = completion.choices[0].message.content || ''
    if (!content.startsWith('#')) {
      content = `# ${messages[0].content.split('\n')[0]}\n\n${content}`
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
