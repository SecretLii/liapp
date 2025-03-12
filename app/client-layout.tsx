"use client"

import { useEffect } from 'react'
import Analytics from '@/lib/analytics'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize analytics
    Analytics.init()

    // Register service worker
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox
      
      // Add offline support
      wb.register()

      // Track page views
      Analytics.trackPageView(window.location.pathname)
    }
  }, [])

  return <>{children}</>
} 