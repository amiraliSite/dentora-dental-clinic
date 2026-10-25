"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { defaultLocale, dictionaries, type Dictionary, type Locale } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "dentora-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && stored in dictionaries && stored !== defaultLocale) {
        setLocaleState(stored);
      }
    });
  }, []);

  useEffect(() => {
    const dict = dictionaries[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = dict.dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      isRtl: dictionaries[locale].dir === "rtl",
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
