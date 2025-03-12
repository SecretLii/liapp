import Link from "next/link"

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
              <li>
                <Link href="/games/world-of-warcraft" className="hover:underline">
                  World of Warcraft
                </Link>
              </li>
              <li>
                <Link href="/games/path-of-exile" className="hover:underline">
                  Path of Exile
                </Link>
              </li>
              <li>
                <Link href="/games/league-of-legends" className="hover:underline">
                  League of Legends
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/guides/create" className="hover:underline">
                  Create Guide
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:underline">
                  Browse Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://discord.gg/guidesforgamers" className="hover:underline">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/guidesforgamers" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
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