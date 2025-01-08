'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { deleteGuide } from "@/app/actions/guide"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Guide, Game } from "@prisma/client"

export function GuidesList({ guides }: { guides: (Guide & { game: Game })[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (guideId: string) => {
    if (confirm('Are you sure you want to delete this guide?')) {
      setDeletingId(guideId)
      const result = await deleteGuide(guideId)
      if (result.success) {
        router.refresh()
      } else {
        alert(result.error)
      }
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {guides.map((guide) => (
        <Card key={guide.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{guide.title}</h3>
              <p className="text-muted-foreground mt-2">{guide.content}</p>
              <p className="text-sm mt-2">Game: {guide.game.title}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/guides/${guide.id}/edit`}>Edit</Link>
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(guide.id)}
                disabled={deletingId === guide.id}
              >
                {deletingId === guide.id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 