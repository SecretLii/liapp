'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteGuide(guideId: string) {
  try {
    // First get the guide to know its gameId
    const guide = await prisma.guide.findUnique({
      where: { id: guideId },
      select: { gameId: true }
    })

    if (!guide) {
      return { success: false, error: 'Guide not found' }
    }

    // Delete the guide
    await prisma.guide.delete({
      where: { id: guideId }
    })

    // Decrement the game's guide count
    await prisma.game.update({
      where: { id: guide.gameId },
      data: { guideCount: { decrement: 1 } }
    })

    revalidatePath('/admin/guides')
    return { success: true, message: 'Guide deleted successfully' }
  } catch (error) {
    console.error('Error deleting guide:', error)
    return { success: false, error: 'Failed to delete guide. Please try again.' }
  }
}

export async function updateGuide(guideId: string, formData: FormData) {
  console.log("Updating guide:", guideId);
  console.log("Received data:", Object.fromEntries(formData.entries()));

  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const gameId = formData.get('gameId') as string

    if (!title || !content || !gameId) {
      console.log("Missing required fields");
      return { success: false, error: 'Missing required fields' }
    }

    const guide = await prisma.guide.update({
      where: { id: guideId },
      data: {
        title,
        content,
        gameId,
      }
    })

    revalidatePath('/admin/guides')
    console.log("Guide updated successfully");
    return { success: true, guide, message: 'Guide updated successfully' }
  } catch (error) {
    console.error('Error updating guide:', error)
    return { success: false, error: 'Failed to update guide. Please try again.' }
  }
}
