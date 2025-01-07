type GameHeaderProps = {
  game: {
    title: string
    description: string
    guideCount: number
    image?: string | null
  }
}

export default function GameHeader({ game }: GameHeaderProps) {
  return (
    <div className="mb-8">
      {game.image && (
        <div className="relative h-48 md:h-64 mb-6">
          <img
            src={game.image}
            alt={game.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <p className="text-sm text-gray-500">{game.guideCount} guides available</p>
    </div>
  )
} 