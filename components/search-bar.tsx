"use client"

import * as React from "react"
import { Search, X, History, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

const GENRES = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Sports",
  "Racing",
  "Puzzle",
  "Shooter",
]

const GUIDE_TYPES = [
  "Walkthrough",
  "Tutorial",
  "Tips & Tricks",
  "Boss Guide",
  "Achievement Guide",
  "Beginner Guide",
]

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [recentSearches, setRecentSearches] = React.useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("recentSearches") || "[]")
    }
    return []
  })

  const addRecentSearch = (search: string) => {
    const newSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5)
    setRecentSearches(newSearches)
    localStorage.setItem("recentSearches", JSON.stringify(newSearches))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      addRecentSearch(value)
    }
    // TODO: Implement actual search functionality
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guides and games..."
                  className="pl-9 pr-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[500px] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {recentSearches.length > 0 && (
                    <CommandGroup heading="Recent Searches">
                      {recentSearches.map((search) => (
                        <CommandItem
                          key={search}
                          onSelect={() => handleSearch(search)}
                        >
                          <History className="mr-2 h-4 w-4" />
                          {search}
                        </CommandItem>
                      ))}
                      <CommandItem onSelect={clearRecentSearches}>
                        <X className="mr-2 h-4 w-4" />
                        Clear recent searches
                      </CommandItem>
                    </CommandGroup>
                  )}
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Popular RPG Guides</CommandItem>
                    <CommandItem>Latest Game Walkthroughs</CommandItem>
                    <CommandItem>Top Rated Guides</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <h4 className="font-medium">Game Genres</h4>
                <div className="grid grid-cols-2 gap-4">
                  {GENRES.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedGenres([...selectedGenres, genre])
                          } else {
                            setSelectedGenres(selectedGenres.filter((g) => g !== genre))
                          }
                        }}
                      />
                      <label htmlFor={genre} className="text-sm">
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Guide Types</h4>
                <div className="grid grid-cols-2 gap-4">
                  {GUIDE_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type])
                          } else {
                            setSelectedTypes(selectedTypes.filter((t) => t !== type))
                          }
                        }}
                      />
                      <label htmlFor={type} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {(selectedGenres.length > 0 || selectedTypes.length > 0) && (
              <div className="flex flex-wrap gap-2 pt-4">
                {selectedGenres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedGenres(selectedGenres.filter((g) => g !== genre))}
                  >
                    {genre}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                  >
                    {type}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
} 