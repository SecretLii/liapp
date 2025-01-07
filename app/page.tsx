import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Features from '@/components/features'
import GamesShowcase from '@/components/games-showcase'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <GamesShowcase />
      <FAQ />
      <Footer />
    </div>
  )
}

