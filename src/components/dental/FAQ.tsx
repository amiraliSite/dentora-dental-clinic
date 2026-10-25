"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.faq.badge} title={t.faq.title} subtitle={t.faq.subtitle} />

        <Reveal delay={0.15} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.items.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-2xl border border-border/70 bg-card px-5 shadow-sm transition-shadow hover:shadow-soft data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="py-5 text-start text-base font-semibold hover:no-underline hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-8 text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
