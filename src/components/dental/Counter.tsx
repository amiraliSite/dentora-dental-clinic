"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { ref, value };
}

export function formatNumber(n: number, locale: string) {
  try {
    return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-EG" : "tr-TR").format(n);
  } catch {
    return String(n);
  }
}

export function Counter({
  value,
  suffix = "",
  locale,
  className,
}: {
  value: number;
  suffix?: string;
  locale: string;
  className?: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <span ref={ref} className={className} dir="ltr">
      {formatNumber(current, locale)}
      {suffix}
    </span>
  );
}
