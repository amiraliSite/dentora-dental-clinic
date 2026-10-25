"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "./LanguageProvider";
import { BrandLogo } from "./shared";
import { localeOrder, dictionaries, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["home", "services", "about", "doctors", "gallery", "testimonials", "booking", "faq", "contact"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "doctors", label: t.nav.doctors },
    { id: "gallery", label: t.nav.gallery },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft bg-background/75 border-b border-border/60" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <button onClick={() => scrollTo("home")} aria-label="Dentora" className="shrink-0">
          <BrandLogo />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary",
                active === link.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full px-3">
                <Globe className="h-4 w-4 text-primary" />
                <span className="hidden text-xs font-semibold sm:inline">{dictionaries[locale].name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {localeOrder.map((l: Locale) => (
                <DropdownMenuItem
                  key={l}
                  onClick={() => setLocale(l)}
                  className={cn("cursor-pointer justify-between", l === locale && "bg-primary/10 font-bold text-primary")}
                >
                  <span>{dictionaries[l].name}</span>
                  <span className="text-[10px] uppercase opacity-60">{l}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle (CSS-based icon swap: no hydration mismatch) */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label={t.common.themeToggle}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </Button>

          <Button
            onClick={() => scrollTo("booking")}
            className="hidden rounded-full px-5 shadow-soft sm:inline-flex"
          >
            {t.nav.book}
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={t.dir === "rtl" ? "right" : "left"} className="w-72 overflow-y-auto">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-2 flex flex-col gap-1">
                <div className="mb-3">
                  <BrandLogo />
                </div>
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-start text-sm font-medium transition-colors hover:bg-primary/10",
                      active === link.id ? "bg-primary/10 text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <Button onClick={() => scrollTo("booking")} className="mt-3 rounded-xl">
                  {t.nav.book}
                </Button>
                <div className="mt-4 border-t pt-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    {t.common.language}
                  </p>
                  <div className="flex gap-2">
                    {localeOrder.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLocale(l)}
                        className={cn(
                          "flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                          l === locale
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {dictionaries[l].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

export function MobileCloseIcon() {
  return <X className="h-5 w-5" />;
}
