export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Guides for Gamers</h3>
            <p className="opacity-90">Your ultimate destination for AI-enhanced gaming guides.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Games</h4>
            <ul className="space-y-2">
              <li>World of Warcraft</li>
              <li>Path of Exile</li>
              <li>League of Legends</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>Create Guide</li>
              <li>Browse Guides</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>Discord</li>
              <li>Twitter</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p>© 2024 Guides for Gamers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 