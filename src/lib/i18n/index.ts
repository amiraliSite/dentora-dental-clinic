import type { Locale, Dictionary } from "./types";
import { fa } from "./fa";
import { tr } from "./tr";
import { ar } from "./ar";

export type { Locale, Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { fa, tr, ar };

export const localeOrder: Locale[] = ["fa", "tr", "ar"];

export const defaultLocale: Locale = "fa";
