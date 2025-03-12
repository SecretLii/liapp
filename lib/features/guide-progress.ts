type GuideProgress = {
  completed: boolean
  lastRead: string // ISO date string
  currentSection: number
  totalSections: number
}

type Bookmark = {
  guideId: string
  title: string
  addedAt: string // ISO date string
  progress?: GuideProgress
}

class GuideManager {
  private static BOOKMARK_KEY = 'guide_bookmarks'
  private static PROGRESS_KEY = 'guide_progress'

  static getBookmarks(): Bookmark[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(this.BOOKMARK_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static addBookmark(guideId: string, title: string): void {
    const bookmarks = this.getBookmarks()
    if (!bookmarks.some(b => b.guideId === guideId)) {
      bookmarks.push({
        guideId,
        title,
        addedAt: new Date().toISOString()
      })
      localStorage.setItem(this.BOOKMARK_KEY, JSON.stringify(bookmarks))
    }
  }

  static removeBookmark(guideId: string): void {
    const bookmarks = this.getBookmarks().filter(b => b.guideId !== guideId)
    localStorage.setItem(this.BOOKMARK_KEY, JSON.stringify(bookmarks))
  }

  static isBookmarked(guideId: string): boolean {
    return this.getBookmarks().some(b => b.guideId === guideId)
  }

  static getProgress(guideId: string): GuideProgress | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(`${this.PROGRESS_KEY}_${guideId}`)
    return stored ? JSON.parse(stored) : null
  }

  static updateProgress(
    guideId: string,
    progress: Partial<GuideProgress>
  ): void {
    const currentProgress = this.getProgress(guideId) || {
      completed: false,
      lastRead: new Date().toISOString(),
      currentSection: 0,
      totalSections: 0
    }

    const updatedProgress = {
      ...currentProgress,
      ...progress,
      lastRead: new Date().toISOString()
    }

    localStorage.setItem(
      `${this.PROGRESS_KEY}_${guideId}`,
      JSON.stringify(updatedProgress)
    )

    // Update bookmark with progress
    const bookmarks = this.getBookmarks()
    const bookmarkIndex = bookmarks.findIndex(b => b.guideId === guideId)
    if (bookmarkIndex !== -1) {
      bookmarks[bookmarkIndex].progress = updatedProgress
      localStorage.setItem(this.BOOKMARK_KEY, JSON.stringify(bookmarks))
    }
  }

  static markAsComplete(guideId: string): void {
    this.updateProgress(guideId, { completed: true })
  }

  static getCompletedGuides(): string[] {
    return this.getBookmarks()
      .filter(b => b.progress?.completed)
      .map(b => b.guideId)
  }

  static getInProgressGuides(): Bookmark[] {
    return this.getBookmarks()
      .filter(b => b.progress && !b.progress.completed)
      .sort((a, b) => {
        const dateA = new Date(a.progress?.lastRead || a.addedAt)
        const dateB = new Date(b.progress?.lastRead || b.addedAt)
        return dateB.getTime() - dateA.getTime()
      })
  }
} 