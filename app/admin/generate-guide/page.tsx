import { GuideGeneratorForm } from '@/components/guide-generator-form'

export const metadata = {
  title: 'AI Guide Generator - Admin',
  description: 'Create AI-powered gaming guides for your users.',
}

export default function AdminGuideGeneratorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Guide Generator</h1>
        <p className="text-muted-foreground">
          Create comprehensive game guides powered by AI. The generated guides will be
          available for review before publishing.
        </p>
      </div>
      
      <GuideGeneratorForm />
    </div>
  )
} 