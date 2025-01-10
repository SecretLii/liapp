import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { title, gameId, content } = await req.json()

    // Validate required fields
    if (!title || !gameId || !content) {
      return NextResponse.json(
        { error: 'Title, gameId, and content are required' },
        { status: 400 }
      )
    }

    // Create the guide
    const guide = await prisma.guide.create({
      data: {
        title,
        content,
        gameId
      }
    })

    return NextResponse.json(guide)
  } catch (error) {
    console.error('Error creating guide:', error)
    return NextResponse.json(
      { error: 'Failed to create guide' },
      { status: 500 }
    )
  }
} 