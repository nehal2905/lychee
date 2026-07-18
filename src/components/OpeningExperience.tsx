import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function OpeningExperience() {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("ll_opened")) {
        setShow(true);
        sessionStorage.setItem("ll_opened", "1");
      }
    } catch {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setGone(true), 3800);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (gone) {
      const t = setTimeout(() => setShow(false), 1400);
      return () => clearTimeout(t);
    }
  }, [gone]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[200] bg-[#0a0507] cursor-pointer overflow-hidden"
          onClick={() => setGone(true)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }}
        >
          {/* just the logo and the name — the logo zooms in to open the site */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <motion.img
                src="/logo.webp"
                alt="Lychee Lore"
                fetchPriority="high"
                decoding="async"
                className="mx-auto h-44 w-44 rounded-full object-cover shadow-[0_0_28px_rgba(217,160,91,0.18)] sm:h-52 sm:w-52"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.p
                className="mt-8 text-center font-hand text-5xl text-cream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                Lychee Lore
              </motion.p>
              <motion.p
                className="mt-12 text-center small-caps text-[9px] tracking-[0.3em] text-candle animate-flicker"
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.4 }}
              >
                Tap to Enter
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
