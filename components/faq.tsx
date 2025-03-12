'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes these guides different?",
    answer: "Our guides combine community knowledge with AI enhancement, ensuring they're comprehensive, up-to-date, and easy to follow. Each guide is verified by experienced players and continuously updated with the latest game changes."
  },
  {
    question: "How often are guides updated?",
    answer: "Guides are automatically updated when game patches are released or meta changes occur. Our AI system monitors game updates and community feedback to keep content current."
  },
  {
    question: "Can I contribute my own guides?",
    answer: "Yes! We welcome community contributions. You can create your own guides using our AI-assisted guide generator, which helps ensure consistency and quality while maintaining your unique insights."
  },
  {
    question: "Which games are currently supported?",
    answer: "We currently support World of Warcraft, Path of Exile, and League of Legends. We're constantly expanding our game coverage based on community demand."
  },
  {
    question: "How can I request a guide for a specific topic?",
    answer: "You can request guides through our AI assistant Axiom or by using the guide request feature in your user dashboard. Community-requested guides are prioritized in our creation queue."
  }
];

export function FAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 