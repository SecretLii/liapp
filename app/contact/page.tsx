import { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Twitter } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us - Guides for Gamers",
  description: "Get in touch with our team for support or inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-14rem)]">
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-2">
                      For general inquiries and support
                    </p>
                    <a
                      href="mailto:support@guidesforgamers.com"
                      className="text-primary hover:underline"
                    >
                      support@guidesforgamers.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Join Our Discord</h3>
                    <p className="text-muted-foreground mb-2">
                      Connect with our community
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="https://discord.gg/guidesforgamers">
                        Join Discord Server
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Twitter className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Follow Us</h3>
                    <p className="text-muted-foreground mb-2">
                      Stay updated with latest news
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="https://twitter.com/guidesforgamers">
                        Follow on Twitter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 