"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

const iconMap = [MapPin, Phone, Mail, Clock];

export function Contact() {
  const { t } = useLanguage();

  const cards = [
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue, href: undefined },
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneValue, href: "tel:+902125553438" },
    { icon: Mail, label: t.contact.email, value: t.contact.emailValue, href: "mailto:info@dentora.clinic" },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, href: undefined },
  ];

  return (
    <section id="contact" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = iconMap[i % iconMap.length];
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                whileHover={{ y: -6 }}
                className="h-full rounded-3xl border border-border/70 bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-soft-lg"
              >
                <span className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-emerald-500/15 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-sm font-bold">{card.label}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground" dir={card.icon === Phone ? "ltr" : undefined}>
                  {card.value}
                </p>
              </motion.div>
            );
            return card.href ? (
              <a key={card.label} href={card.href} className="block h-full">
                {inner}
              </a>
            ) : (
              <div key={card.label} className="h-full">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
