'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Game, Guide } from "@prisma/client"

export function GamesList({ games }: { games: (Game & { guides: Guide[] })[] }) {
  return (
    <div className="space-y-6">
      {games.map((game) => (
        <Card key={game.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p className="text-muted-foreground mt-2">{game.description}</p>
              <p className="text-sm mt-2">Guides: {game.guides.length}</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/games/${game.id}/edit`}>Edit</Link>
              </Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 