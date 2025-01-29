import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

async function generateParams(params: { id: string }) {
  'use server'
  return params
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await generateParams(params)
  try {
    const body = await request.json()
    const game = await prisma.game.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image || null
      }
    })

    revalidatePath('/games')
    revalidatePath('/admin/games')
    
    return NextResponse.json(game)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update game' },
      { status: 500 }
    )
  }
} 