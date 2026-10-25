"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, Phone, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { Counter } from "./Counter";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { t, locale } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -start-32 h-[420px] w-[420px] rounded-full bg-teal-400/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -end-40 h-[460px] w-[460px] rounded-full bg-emerald-400/15 blur-3xl animate-blob-delayed" />
        <div className="absolute bottom-0 start-1/3 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl animate-blob" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.62 0.106 180 / 0.18) 1px, transparent 0)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-start">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary sm:text-sm">
              <Sparkles className="h-4 w-4" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.2]"
          >
            {t.hero.titleA}{" "}
            <span className="text-gradient">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button
              size="lg"
              onClick={() => scrollTo("booking")}
              className="h-13 rounded-full px-7 text-base shadow-soft-lg animate-pulse-ring"
            >
              <CalendarCheck className="h-5 w-5" />
              {t.hero.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("services")}
              className="h-13 rounded-full px-7 text-base"
            >
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold">{t.hero.ratingValue}</span>
                <span className="text-muted-foreground"> · {t.hero.ratingLabel}</span>
              </div>
            </div>
            <div className="hidden h-9 w-px bg-border sm:block" />
            <a
              href="tel:+902125553438"
              className="group flex items-center gap-2.5 text-sm"
              dir="ltr"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold text-foreground">{t.hero.callLabel}</span>
                <span className="block text-muted-foreground">{t.hero.callSub}</span>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] border-4 border-white/70 shadow-soft-lg dark:border-white/10">
            <Image
              src={asset("/images/hero.png")}
              alt="Dentora modern dental clinic"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/25 via-transparent to-transparent" />
          </div>

          {/* Floating card: patients */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="glass absolute -bottom-6 start-4 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-soft-lg sm:start-8 dark:bg-card/80 dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-black text-foreground">
                  <Counter value={12000} suffix="+" locale={locale} />
                </p>
                <p className="text-xs text-muted-foreground">{t.hero.cardPatientsLabel}</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card: experience */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="glass absolute -top-5 end-4 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-soft-lg animate-floaty sm:end-8 dark:bg-card/80 dark:border-white/10"
          >
            <p className="text-xl font-black text-primary">
              <Counter value={15} suffix="+" locale={locale} />
            </p>
            <p className="text-xs text-muted-foreground">{t.hero.cardExpLabel}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-14 hidden flex-col items-center gap-2 text-xs text-muted-foreground lg:flex"
      >
        <span>{t.hero.scroll}</span>
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </span>
      </motion.div>
    </section>
  );
}
