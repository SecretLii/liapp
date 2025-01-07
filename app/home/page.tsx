import GuideCreator from "@/components/guidecreator";

export default function Home() {
  return (
    <main>
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Guides for Gamers</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Create and discover comprehensive gaming guides powered by AI
          </p>
          <div>helloworld</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <GuideCreator />
      </div>
    </main>
  )
}

