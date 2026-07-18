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
          exit={{ y: "-100vh", transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } }}
        >
          {/* candle flicker at edge */}
          <div className="absolute bottom-8 left-8 h-24 w-6 animate-flicker">
            <div className="mx-auto h-16 w-2 rounded-b bg-parchment/80" />
            <div className="mx-auto -mt-14 h-8 w-4 rounded-full bg-candle blur-[3px] candle-glow" />
          </div>

          {/* pocket watch, ticking softly */}
          <div className="absolute right-10 top-8">
            <svg viewBox="0 0 60 76" className="h-16 w-12 text-gold/80">
              <path d="M30 2 v6 M26 2 h8" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <circle cx="30" cy="42" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="30" cy="42" r="21" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
              <line x1="30" y1="42" x2="30" y2="27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <g className="animate-pendulum" style={{ transformOrigin: "30px 42px" }}>
                <line x1="30" y1="42" x2="41" y2="47" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
              </g>
              <circle cx="30" cy="42" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* dust */}
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-candle/70 animate-floaty"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}

          {/* shell */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <motion.img
                src="/logo.png?v=1"
                alt="Lychee Lore"
                className="mx-auto h-32 w-32 rounded-full object-cover shadow-[0_0_55px_rgba(217,160,91,0.3)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.p
                className="mt-8 text-center font-hand text-4xl text-cream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
              >
                Lychee Lore
              </motion.p>
              <motion.p
                className="mt-3 text-center small-caps text-[10px] tracking-widest text-haze"
                initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.4 }}
              >
                est. in candlelight
              </motion.p>
              <motion.p
                className="mt-12 text-center small-caps text-[9px] tracking-[0.3em] text-candle animate-flicker"
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 3.2 }}
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
