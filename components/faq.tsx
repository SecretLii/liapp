export default function FAQ() {
  const faqs = [
    {
      question: "Are the guides free to use?",
      answer: "Yes, all guides are completely free to access and use."
    },
    {
      question: "How often are guides updated?",
      answer: "Guides are automatically updated with each game patch and meta shift."
    },
    {
      question: "Can I create my own guides?",
      answer: "Absolutely! Any player can create guides using our AI-powered platform."
    },
    {
      question: "How accurate are the AI-enhanced guides?",
      answer: "Our AI analyzes thousands of player experiences and game data to ensure accuracy, with regular community validation."
    }
  ]

  return (
    <section id="faq" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 