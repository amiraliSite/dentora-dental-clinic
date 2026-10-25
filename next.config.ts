import type { NextConfig } from "next";

/**
 * Dentora — Dental Clinic website
 *
 * Two build modes:
 *  - Default (full-stack): standalone output with API routes + Prisma.
 *    Used for local dev / self-hosted production.
 *  - Static (NEXT_PUBLIC_STATIC=1): `output: export` for GitHub Pages.
 *    API routes are stripped by the CI workflow; the booking form
 *    gracefully falls back to client-side storage.
 */
const isStatic = process.env.NEXT_PUBLIC_STATIC === "1";
const repoName = "dentora-dental-clinic";

const shared = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

const nextConfig: NextConfig = isStatic
  ? {
      ...shared,
      output: "export",
      distDir: ".next-static",
      basePath: `/${repoName}`,
      env: { NEXT_PUBLIC_BASE_PATH: `/${repoName}` },
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {
      ...shared,
      output: "standalone",
      env: { NEXT_PUBLIC_BASE_PATH: "" },
    };

export default nextConfig;
