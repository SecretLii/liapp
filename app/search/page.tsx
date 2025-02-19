import { Search } from '@/components/search'

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Search Guides & Games</h1>
        <Search />
      </div>
    </div>
  )
} 