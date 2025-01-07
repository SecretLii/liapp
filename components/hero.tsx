import { Button } from "./ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Level Up Your Gaming Experience</h1>
          <p className="text-xl mb-8 opacity-90">
            Access AI-powered guides for World of Warcraft, Path of Exile, and League of Legends. 
            Written by gamers, enhanced by AI, perfected for you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/admin/guides">
              <Button size="lg" variant="secondary">Browse Guides</Button>
            </Link>
            <Link href="/admin/guides/create">
              <Button size="lg">Create Guide</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 