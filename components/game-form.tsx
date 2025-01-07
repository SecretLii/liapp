'use client'

import { createGame } from '@/app/actions/game'
import { useState } from 'react'

export default function GameForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createGame(formData)
    if (result.success) {
      setMessage('Game created successfully!')
      // Reset the form
      const form = document.getElementById('gameForm') as HTMLFormElement
      form.reset()
    } else {
      setMessage('Failed to create game')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Game</h2>
      <form id="gameForm" action={handleSubmit} className="space-y-4">
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
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        >
          Add Game
        </button>

        {message && (
          <p className={`mt-4 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
} 