import { Metadata } from "next"
import { FAQ } from "@/components/faq"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ - Guides for Gamers",
  description: "Frequently asked questions about our gaming guides platform.",
}

export default function FAQPage() {
  return (
    <div className="min-h-[calc(100vh-14rem)]">
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg opacity-90">
              Find answers to common questions about our platform and services.
            </p>
          </div>
        </div>
      </section>

      <FAQ />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 