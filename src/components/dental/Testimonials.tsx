"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export function Testimonials() {
  const { t, isRtl } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % t.testimonials.items.length), [t]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + t.testimonials.items.length) % t.testimonials.items.length),
    [t]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  const current = t.testimonials.items[index];

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -start-40 bottom-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.testimonials.badge}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />

        <Reveal delay={0.15} className="mt-12">
          <div
            className="relative rounded-[2rem] border border-border/70 bg-card p-8 shadow-soft sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="absolute -top-5 h-11 w-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 p-2.5 text-white shadow-soft start-8" />

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 40 : -40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="min-h-[190px] sm:min-h-[150px]"
              >
                <div className="mb-4 flex gap-1" aria-label="5/5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg leading-9 text-foreground sm:text-xl">“{current.text}”</p>
                <footer className="mt-6 flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-500 font-bold text-white">
                      {current.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {t.testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full" onClick={prev} aria-label="Previous">
                  {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" onClick={next} aria-label="Next">
                  {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
