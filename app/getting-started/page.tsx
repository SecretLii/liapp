import { GettingStarted } from '@/components/getting-started'
import { FAQ } from '@/components/faq'
import { SocialShare } from '@/components/social-share'

export const metadata = {
  title: 'Getting Started - Guides for Gamers',
  description: 'Learn how to make the most of our gaming guides platform with our comprehensive getting started guide.',
}

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen">
      <GettingStarted />
      
      {/* Share section */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Share this Guide</h2>
            <SocialShare 
              title="Getting Started with Guides for Gamers"
              url={`${process.env.NEXT_PUBLIC_APP_URL}/getting-started`}
              description="Learn how to make the most of our gaming guides platform."
            />
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  )
} 