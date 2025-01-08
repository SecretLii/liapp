'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createGame(formData: FormData) {
  try {
    const game = await prisma.game.create({
      data: {
        title: formData.get('title') as string,
        slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        guideCount: 0,
      },
    })

    revalidatePath('/games')
    return { success: true, game }
  } catch {
    return { success: false, error: 'Failed to create game' }
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
  } catch {
    return { success: false, error: 'Failed to create guide' }
  }
} 