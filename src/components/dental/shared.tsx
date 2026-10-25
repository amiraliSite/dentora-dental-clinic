"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ToothLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="toothGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#toothGrad)" />
      <path
        fill="#ffffff"
        d="M32 13c-6.6 0-11.5 4.1-11.5 10.6 0 3.3 1 5.9 2 8.6.9 2.4 1.6 4.8 1.8 7.9.2 2.6 1.2 6.4 3.4 6.4 2.7 0 2.2-6.2 4.7-6.2s2 6.2 4.7 6.2c2.2 0 3.2-3.8 3.4-6.4.2-3.1.9-5.5 1.8-7.9 1-2.7 2-5.3 2-8.6C47.5 17.1 38.6 13 32 13z"
      />
    </svg>
  );
}

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ToothLogo className="h-9 w-9 drop-shadow-sm" />
      <div className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight text-foreground">
          Dentora
        </span>
        <span className="block text-[10px] font-medium text-primary">
          Dental Clinic
        </span>
      </div>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={cn("flex flex-col gap-4", alignCls)}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {badge}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.2]">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
