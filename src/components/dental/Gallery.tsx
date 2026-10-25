"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

const images = [
  { src: "/images/clinic-1.png", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/images/smile-1.png", span: "" },
  { src: "/images/clinic-2.png", span: "" },
  { src: "/images/clinic-3.png", span: "sm:col-span-2" },
];

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.gallery.badge} title={t.gallery.title} subtitle={t.gallery.subtitle} />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[210px] lg:auto-rows-[240px]">
          {images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/60 shadow-sm",
                img.span
              )}
            >
              <Image
                src={img.src}
                alt={t.gallery.captions[i] ?? "Dentora clinic"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-teal-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Camera className="h-4 w-4 shrink-0 text-teal-300" />
                {t.gallery.captions[i]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
