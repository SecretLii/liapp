import ReactMarkdown from 'react-markdown'

interface GuidePreviewProps {
  content: string
}

export default function GuidePreview({ content }: GuidePreviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Guide Preview</h2>
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

