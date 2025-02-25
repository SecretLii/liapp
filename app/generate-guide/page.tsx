import { GuideGeneratorForm } from '@/components/guide-generator-form'

export default function GenerateGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Guide Generator</h1>
          <p className="text-muted-foreground">
            Create comprehensive game guides powered by AI. Just provide a title and description,
            and our AI will generate a detailed guide using information from trusted gaming sources.
          </p>
        </div>
        
        <GuideGeneratorForm />
      </div>
    </div>
  )
} 