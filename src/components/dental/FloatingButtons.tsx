"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

export function FloatingButtons() {
  const { t } = useLanguage();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-20 end-4 z-40 sm:bottom-6"
          >
            <Button
              size="icon"
              variant="outline"
              aria-label={t.common.backToTop}
              className="h-11 w-11 rounded-full border-primary/30 bg-background/80 shadow-soft glass hover:bg-primary hover:text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile booking FAB */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
        className="fixed inset-x-4 bottom-4 z-40 sm:hidden"
      >
        <Button
          size="lg"
          className="w-full rounded-2xl text-base shadow-soft-lg"
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        >
          <CalendarCheck className="h-5 w-5" />
          {t.nav.book}
        </Button>
      </motion.div>
    </>
  );
}
