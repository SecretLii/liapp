'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search as SearchIcon, X } from "lucide-react"
import Link from 'next/link'
import debounce from 'lodash/debounce'

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults(null)
        return
      }

      setLoading(true)
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery.trim() })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Search failed')
        }

        setResults(data)
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Search Error",
          description: error.message || "Failed to perform search"
        })
        setResults(null)
      } finally {
        setLoading(false)
      }
    }, 500), // 500ms delay
    [toast]
  )

  // Trigger search on query change
  useEffect(() => {
    debouncedSearch(query)
    
    // Cleanup
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  // Clear search
  const handleClear = () => {
    setQuery('')
    setResults(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for guides, games, or strategies..."
            className="pl-9 pr-9"
            disabled={loading}
          />
          {(loading || query) && (
            <div className="absolute right-3">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Dynamic results dropdown */}
        {(results || loading) && (
          <Card className="absolute mt-2 w-full z-50 max-h-[80vh] overflow-auto">
            <div className="p-4 space-y-4">
              {loading && !results && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}

              {results?.summary && (
                <div>
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-sm text-muted-foreground">{results.summary}</p>
                </div>
              )}

              {results?.results?.length > 0 && (
                <div className="space-y-4">
                  {/* Guide Results */}
                  {results.results.filter(r => r.type === 'guide').length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Guides from Our Database</h3>
                      <div className="space-y-2">
                        {results.results
                          .filter(result => result.type === 'guide')
                          .map((result, i) => (
                            <Link 
                              key={i} 
                              href={result.url}
                              className="block p-2 hover:bg-muted rounded-md transition-colors"
                            >
                              <h4 className="font-medium text-sm">{result.title}</h4>
                              <p className="text-xs text-muted-foreground">{result.game}</p>
                              {result.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {result.description}
                                </p>
                              )}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Web Results */}
                  {results.results.filter(r => r.type === 'web').length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-sm">Web Results</h3>
                      <div className="space-y-2">
                        {results.results
                          .filter(result => result.type === 'web')
                          .map((result, i) => (
                            <Link 
                              key={i} 
                              href={result.url} 
                              target="_blank"
                              className="block p-2 hover:bg-muted rounded-md transition-colors"
                            >
                              <h4 className="font-medium text-sm">{result.title}</h4>
                              {result.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {results?.recommendations && (
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">
                    {results.recommendations}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
} 