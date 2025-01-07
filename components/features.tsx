export default function Features() {
  const features = [
    {
      title: "AI-Enhanced Guides",
      description: "Our AI analyzes thousands of player experiences to create comprehensive, up-to-date guides."
    },
    {
      title: "Community Driven",
      description: "Guides are created by real players and enhanced with AI insights for the best of both worlds."
    },
    {
      title: "Multiple Games",
      description: "Covering WoW, PoE, and LoL with plans to expand to more games based on community demand."
    },
    {
      title: "Always Updated",
      description: "Guides automatically update with new patches and meta changes to stay current."
    }
  ]

  return (
    <section id="features" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Guides?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 