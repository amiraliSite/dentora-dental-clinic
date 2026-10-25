import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prefix a public asset path with the build basePath.
 * Required for GitHub Pages static builds where the site lives under
 * `/<repo-name>`; resolves to "" in normal (full-stack) builds.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  return `${base}${path}`
}
