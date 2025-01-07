import { NewGameForm } from '@/components/admin/new-game-form'

export default function NewGame() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Game</h1>
      <NewGameForm />
    </div>
  )
} 