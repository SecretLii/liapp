import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "Games",
      description: "Manage your game library",
      links: [
        { href: "/admin/games/new", label: "Create New Game" },
        { href: "/admin/games", label: "Manage Games" }
      ]
    },
    {
      title: "Guides",
      description: "Manage your guides collection",
      links: [
        { href: "/admin/guides/new", label: "Create New Guide" },
        { href: "/admin/guides", label: "Manage Guides" }
      ]
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {adminSections.map((section) => (
          <Card key={section.title} className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-muted-foreground mb-6">{section.description}</p>
            <div className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block w-full p-2 text-center bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 