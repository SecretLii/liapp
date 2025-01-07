import { Badge } from '@/components/ui/badge'

interface SearchTermsProps {
  terms: string[]
}

export default function SearchTerms({ terms }: SearchTermsProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Generated Search Terms</h2>
      <div className="flex flex-wrap gap-2">
        {terms.map((term, index) => (
          <Badge key={index} variant="secondary">{term}</Badge>
        ))}
      </div>
    </div>
  )
}

