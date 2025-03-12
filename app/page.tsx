import React from 'react';
import { prisma } from '@/lib/prisma'
import Hero from '@/components/hero'
import GamesShowcase from '@/components/games-showcase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsletterForm } from '@/components/newsletter-form'
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: {
      guideCount: 'desc'
    },
    take: 6
  })

  const recentGuides = await prisma.guide.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 3,
    include: {
      game: true
    }
  })

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-16 pb-16">
        <Hero />
        
        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
            <p className="text-muted-foreground mt-2">
              Discover what makes our gaming guides unique and valuable.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Enhanced Guides</CardTitle>
                <CardDescription>
                  Our guides are enhanced by AI to provide the most accurate and up-to-date information.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Comprehensive Coverage</CardTitle>
                <CardDescription>
                  Detailed guides for all major games, from basics to advanced strategies.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Join a thriving community of gamers sharing knowledge and experiences.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Games Showcase */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Games</h2>
              <p className="text-muted-foreground mt-2">
                Browse our collection of comprehensive gaming guides.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/games" className="gap-2">
                View All Games
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <GamesShowcase games={games} />
        </section>

        {/* Recent Guides */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Latest Guides</h2>
              <p className="text-muted-foreground mt-2">
                Stay up to date with our newest gaming guides.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/guides" className="gap-2">
                View All Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recentGuides.map((guide) => (
              <Card key={guide.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                  <CardDescription>
                    {guide.game.title} • {new Date(guide.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">
                    {guide.content}
                  </p>
                  <Button asChild className="mt-4 w-full">
                    <Link href={`/guides/${guide.id}`}>Read Guide</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section>
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Subscribe to our newsletter for the latest guides and gaming tips.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <NewsletterForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

