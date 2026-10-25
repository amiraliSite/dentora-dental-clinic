"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { asset } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

export function Doctors() {
  const { t } = useLanguage();
  const images = [
    asset("/images/doctor-1.png"),
    asset("/images/doctor-2.png"),
    asset("/images/doctor-3.png"),
    asset("/images/doctor-4.png"),
  ];

  return (
    <section id="doctors" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.doctors.badge} title={t.doctors.title} subtitle={t.doctors.subtitle} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.doctors.items.map((doctor, i) => (
            <motion.article
              key={doctor.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-shadow hover:shadow-soft-lg"
            >
              <div className="relative aspect-[3/3.4] overflow-hidden">
                <Image
                  src={images[i % images.length]}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-white/90">
                    <GraduationCap className="h-4 w-4" />
                    {doctor.desc}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{doctor.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{doctor.role}</p>
                <div className="mt-3 flex items-center gap-1" aria-hidden>
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
