'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Search, Users } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Browse Guides",
    description: "Explore our collection of AI-enhanced guides for your favorite games.",
    icon: BookOpen,
    href: "/guides",
  },
  {
    title: "Search & Filter",
    description: "Find exactly what you need with our powerful search and filtering system.",
    icon: Search,
    href: "/search",
  },
  {
    title: "Join the Community",
    description: "Connect with other players, share your knowledge, and contribute to guides.",
    icon: Users,
    href: "/community",
  },
];

export function GettingStarted() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
          <p className="text-muted-foreground">
            New to Guides for Gamers? Here's how to make the most of our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <div className="mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <Link href={step.href}>
                <Button variant="link" className="p-0">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/guides">
            <Button size="lg">
              Start Exploring <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 