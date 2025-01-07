import { prisma } from '@/lib/prisma'

export default async function CreateGuide() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Guide</h1>
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow p-6">
        {/* Add your guide creation form here */}
        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Guide Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded-md border p-2"
              placeholder="Enter guide title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              className="w-full rounded-md border p-2"
              placeholder="Write your guide content here..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Create Guide
          </button>
        </form>
      </div>
    </div>
  )
} 