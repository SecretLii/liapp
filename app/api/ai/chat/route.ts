import { NextResponse } from 'next/server'
import { runAgent } from '@/lib/agent'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const result = await runAgent(message)
    
    if (!result.success) {
      throw new Error(result.response)
    }

    return NextResponse.json({
      message: result.response
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