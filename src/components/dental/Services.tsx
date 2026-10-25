"use client";

import { motion } from "framer-motion";
import {
  AlignCenterHorizontal,
  Baby,
  Bone,
  Gem,
  Sparkles,
  Stethoscope,
  WandSparkles,
  Zap,
} from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

const icons = [Bone, AlignCenterHorizontal, Sparkles, Gem, Zap, Baby, WandSparkles, Stethoscope];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.services.badge} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-soft-lg"
              >
                {/* shine sweep on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_0.9s_ease-out]"
                />
                <span className="relative mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-emerald-500/15 text-primary transition-all duration-300 group-hover:from-teal-500 group-hover:to-emerald-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{service.desc}</p>
                <span className="mt-4 inline-block h-1 w-10 rounded-full bg-gradient-to-l from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-16" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
