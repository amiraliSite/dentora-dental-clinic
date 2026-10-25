"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, Microscope, ShieldCheck, Waves } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { asset } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

const featureIcons = [Microscope, Globe, Waves, ShieldCheck];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-secondary/40 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-32 top-20 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <div className="relative mx-auto w-full max-w-[540px]">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-white shadow-soft-lg dark:border-white/10">
                <Image
                  src={asset("/images/clinic-1.png")}
                  alt="Dentora clinic reception"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
              </div>
            </Reveal>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="absolute -bottom-10 end-0 w-[46%] overflow-hidden rounded-[1.6rem] border-4 border-white shadow-soft-lg animate-floaty-slow dark:border-white/10"
            >
              <div className="relative aspect-square">
                <Image
                  src={asset("/images/clinic-2.png")}
                  alt="Dentora treatment room"
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="glass absolute -top-6 start-2 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 px-5 py-4 text-center text-white shadow-soft-lg"
            >
              <p className="text-2xl font-black">{t.about.expYears}</p>
              <p className="text-[11px] font-medium text-white/85">{t.about.expLabel}</p>
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <SectionHeading
              badge={t.about.badge}
              title={t.about.title}
              subtitle={t.about.subtitle}
              align="start"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="leading-8 text-muted-foreground">{t.about.p1}</p>
            </Reveal>
            <Reveal delay={0.28} className="mt-4">
              <p className="leading-8 text-muted-foreground">{t.about.p2}</p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.about.features.map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: t.dir === "rtl" ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-shadow hover:shadow-soft"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold">
                        {f.title}
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
