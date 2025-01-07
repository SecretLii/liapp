'use client'

import { createGuide } from '@/app/actions/game'
import { useState } from 'react'

type GuideFormProps = {
  gameId: string
}

export default function GuideForm({ gameId }: GuideFormProps) {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createGuide(formData)
    if (result.success) {
      setMessage('Guide created successfully!')
      // Reset the form
      const form = document.getElementById(`guideForm-${gameId}`) as HTMLFormElement
      form.reset()
    } else {
      setMessage('Failed to create guide')
    }
  }

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Add New Guide</h4>
      <form id={`guideForm-${gameId}`} action={handleSubmit} className="space-y-4">
        <input type="hidden" name="gameId" value={gameId} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add Guide
        </button>

        {message && (
          <p className={`mt-2 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
} 