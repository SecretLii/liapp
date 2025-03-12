import * as Sentry from '@sentry/nextjs'

type EventType = 
  | 'page_view'
  | 'guide_view'
  | 'guide_complete'
  | 'search'
  | 'error'
  | 'performance'

interface EventData {
  [key: string]: any
}

export class Analytics {
  static init() {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      // Initialize Google Analytics
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID)
    }
  }

  static trackPerformance(metrics: Record<string, number>) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance metrics:', metrics)
      return
    }

    // Send to Sentry as a transaction
    const transaction = Sentry.startTransaction({
      name: 'Performance Measurement',
      op: 'measure'
    })

    // Add measurements to the transaction
    Object.entries(metrics).forEach(([key, value]) => {
      transaction.setMeasurement(key, value)
    })

    // Finish the transaction
    transaction.finish()

    // If you have Google Analytics, you can also send the metrics there
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance', {
        event_category: 'Performance',
        ...metrics
      })
    }
  }

  static trackEvent(eventType: EventType, data: EventData = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Event:', eventType, data)
      return
    }

    // Track with Sentry
    Sentry.captureEvent({
      message: `Event: ${eventType}`,
      level: 'info',
      extra: data
    })

    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        ...data
      })
    }
  }

  static trackError(error: Error, context: Record<string, any> = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error, context)
      return
    }

    // Track with Sentry
    Sentry.captureException(error, {
      extra: context
    })

    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        event_category: 'Error',
        event_label: error.message,
        ...context
      })
    }
  }

  static trackPageView(url: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Page view:', url)
      return
    }

    // Track with Sentry
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Visited ${url}`,
      level: 'info'
    })

    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: url
      })
    }
  }

  static trackGuideView(guideId: string, guideTitle: string) {
    this.trackEvent('guide_view', {
      guide_id: guideId,
      guide_title: guideTitle
    })
  }

  static trackGuideComplete(guideId: string, guideTitle: string) {
    this.trackEvent('guide_complete', {
      guide_id: guideId,
      guide_title: guideTitle
    })
  }

  static trackSearch(query: string, results: number) {
    this.trackEvent('search', {
      search_term: query,
      results_count: results
    })
  }
}

// Add type definitions for window object
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default Analytics 