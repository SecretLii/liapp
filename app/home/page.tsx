import Hero from "@/components/hero";
import GuideCreator from "@/components/guidecreator";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: {
      title: 'asc'
    }
  });

  return (
    <main>
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <GuideCreator games={games} />
      </div>
    </main>
  )
}

