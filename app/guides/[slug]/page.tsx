"use client"

import { ReadingProgress } from "@/components/reading-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bookmark, Share2 } from "lucide-react"

interface GuidePageProps {
  params: {
    slug: string
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  return (
    <>
      <ReadingProgress />
      <ScrollToTop />
      
      <article className="container max-w-3xl py-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Complete Walkthrough</h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {/* Example content - replace with actual guide content */}
              <h2>Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <h2>Getting Started</h2>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              {/* Add more sections to make the content scrollable */}
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <h2>Section {i + 1}</h2>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </p>
                  <ul>
                    <li>Step 1: Lorem ipsum dolor sit amet</li>
                    <li>Step 2: Consectetur adipiscing elit</li>
                    <li>Step 3: Sed do eiusmod tempor incididunt</li>
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </article>
    </>
  )
} 