'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createGame(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as string || null
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  try {
    const game = await prisma.game.create({
      data: {
        title,
        description,
        image,
        slug,
        guideCount: 0
      }
    })

    revalidatePath('/games')
    revalidatePath('/admin/games')
    return { success: true, game }
  } catch (error) {
    console.error('Error creating game:', error)
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
    const guide = await prisma.guide.create({
      data: {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        gameId: formData.get('gameId') as string,
      },
    })

    // Update guide count for the game
    await prisma.game.update({
      where: { id: formData.get('gameId') as string },
      data: { guideCount: { increment: 1 } },
    })

    revalidatePath('/games')
    return { success: true, guide }
  } catch (error) {
    return { success: false, error: 'Failed to create guide' }
  }
} 