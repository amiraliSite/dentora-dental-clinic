"use client";

import { motion } from "framer-motion";
import { Award, HeartHandshake, Sparkles, Users } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { Counter } from "./Counter";

const icons = [Award, Users, HeartHandshake, Sparkles];

export function Stats() {
  const { t, locale } = useLanguage();

  return (
    <section aria-label="Stats" className="relative z-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto -mt-2 grid max-w-6xl grid-cols-2 gap-4 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-l from-teal-600 to-emerald-600 p-6 text-white shadow-soft-lg sm:gap-6 lg:grid-cols-4 lg:p-10 dark:from-teal-700 dark:to-emerald-700"
      >
        {t.stats.items.map((stat, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                <Icon className="h-5.5 w-5.5" />
              </span>
              <p className="text-3xl font-black sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} locale={locale} />
              </p>
              <p className="text-sm font-medium text-white/85">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
