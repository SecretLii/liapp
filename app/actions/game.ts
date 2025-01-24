'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface CreateGameInput {
  title: string
  description: string
  image?: string
}

export async function createGame(formData: CreateGameInput) {
  console.log('Starting createGame with formData:', formData)

  if (!formData || !formData.title || !formData.description) {
    console.log('Missing required fields:', { formData })
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    console.log('Generated slug:', slug)

    const gameData = {
      title: formData.title,
      slug,
      description: formData.description,
      image: formData.image && formData.image.startsWith('http') ? formData.image : null,
      guideCount: 0
    }
    console.log('Attempting to create game with data:', gameData)

    const game = await prisma.game.create({
      data: gameData
    })

    console.log('Game created successfully:', game)
    revalidatePath('/games')
    revalidatePath('/admin/games')
    return { success: true, game }
  } catch (error: unknown) {
    console.error('Error creating game:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return { success: false, error: 'A game with this name already exists' }
    }
    return { success: false, error: 'Failed to create game' }
  }
}

export async function deleteGame(gameId: string) {
  try {
    await prisma.game.delete({
      where: { id: gameId }
    })

    revalidatePath('/admin/games')
    revalidatePath('/games')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete game' }
  }
}

export async function createGuide(formData: FormData) {
  try {
    const gameId = formData.get('gameId') as string
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    console.log('Creating guide with data:', { gameId, title, content })

    if (!gameId || !title || !content) {
      console.error('Missing required fields:', { gameId, title, content })
      return { success: false, error: 'Missing required fields' }
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId }
    })

    if (!game) {
      console.error('Game not found:', gameId)
      return { success: false, error: 'Game not found' }
    }

    const guide = await prisma.guide.create({
      data: {
        title,
        content,
        gameId,
      },
    })

    console.log('Guide created successfully:', guide)

    // Update guide count
    await prisma.game.update({
      where: { id: gameId },
      data: { guideCount: { increment: 1 } },
    })

    revalidatePath('/games')
    revalidatePath(`/games/${game.slug}`)
    return { success: true, guide }
  } catch (error: unknown) {
    console.error('Guide creation error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    return { success: false, error: 'Failed to create guide' }
  }
} 