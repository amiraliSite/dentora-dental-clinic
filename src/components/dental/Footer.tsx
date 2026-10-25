"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "./shared";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const quickLinks = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "doctors", label: t.nav.doctors },
    { id: "gallery", label: t.nav.gallery },
    { id: "booking", label: t.nav.book },
  ];

  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-b from-transparent to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo />
            <p className="mt-4 max-w-md text-sm leading-8 text-muted-foreground">{t.footer.about}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["fa", "tr", "ar"].map((l) => (
                <span key={l} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase text-primary">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">{t.footer.quickLinks}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">{t.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-6">{t.contact.addressValue}</span>
              </li>
              <li>
                <a href="tel:+902125553438" className="flex items-center gap-2.5 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span dir="ltr">{t.contact.phoneValue}</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@dentora.clinic" className="flex items-center gap-2.5 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span dir="ltr">{t.contact.emailValue}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>{t.footer.rights}</p>
          <p>
            {t.footer.builtWith}
            <span aria-hidden className="mx-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
            Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
