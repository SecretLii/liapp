import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Guides for Gamers',
    template: '%s | Guides for Gamers'
  },
  description: 'Your ultimate destination for AI-enhanced gaming guides. Get comprehensive guides for World of Warcraft, Path of Exile, and League of Legends.',
  keywords: ['gaming guides', 'game tutorials', 'WoW guides', 'PoE guides', 'LoL guides', 'AI gaming assistant'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guideforgamers.com',
    siteName: 'Guides for Gamers',
    title: 'Guides for Gamers',
    description: 'Your ultimate destination for AI-enhanced gaming guides',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guides for Gamers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides for Gamers',
    description: 'Your ultimate destination for AI-enhanced gaming guides',
    images: ['/og-image.jpg']
  }
} 