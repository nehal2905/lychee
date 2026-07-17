import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// After 45s of stillness the room quietly comes alive — fireflies rise,
// a petal lets go, a star falls across the sky, and a gold-line butterfly
// wanders through on flapping wings. Any touch returns everything to calm.
export function IdleAnimations() {
  const [alive, setAlive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setAlive(false);
      clearTimeout(timer);
      timer = setTimeout(() => setAlive(true), 45000);
    };
    reset();
    const events = ["mousemove", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {alive && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {/* the candlelight breathes a little deeper */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.14, 0.06, 0.12, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 18, ease: "easeInOut" }}
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 88%, rgba(212,166,90,0.5), transparent 60%)" }}
          />

          {/* fireflies drift up from the bottom of the page */}
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={`fly-${i}`}
              className="absolute h-1 w-1 rounded-full bg-candle"
              style={{
                left: `${8 + ((i * 13) % 84)}%`,
                boxShadow: "0 0 8px 2px rgba(212,166,90,0.5)",
              }}
              initial={{ y: "104vh", opacity: 0 }}
              animate={{
                y: ["104vh", `${30 + ((i * 9) % 40)}vh`],
                x: [0, (i % 2 ? 1 : -1) * (18 + ((i * 7) % 26)), (i % 2 ? -1 : 1) * (10 + ((i * 5) % 18)), 0],
                opacity: [0, 0.9, 0.4, 0.9, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 13 + (i % 4) * 2.5, delay: i * 1.1, ease: "easeInOut" }}
            />
          ))}

          {/* a star lets go and falls across the sky */}
          <motion.div
            className="absolute left-[12%] top-[8%] h-px w-20 origin-left"
            style={{
              background: "linear-gradient(90deg, rgba(243,233,215,0.95), transparent)",
              rotate: 24,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: "46vw", y: "22vh", opacity: [0, 1, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, delay: 6, ease: "easeIn" }}
          />

          {/* two rose petals let go, one after the other */}
          {[0, 1].map((i) => (
            <motion.div
              key={`petal-${i}`}
              className="absolute -top-8 text-rose"
              style={{ left: `${18 + i * 46}%` }}
              initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
              animate={{
                y: "112vh",
                x: [0, 34, -22, 40, 8],
                rotate: [0, 140, 280, 430, 540],
                opacity: [0, 0.9, 0.9, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 16, delay: 2.5 + i * 7, ease: "easeIn" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2 C 16 7 19 9 19 14 a7 7 0 1 1-14 0 c0-5 3-7 7-12z" opacity="0.85" />
                <path d="M12 5 C 14 8 16 10 16 14 a4 4 0 1 1-8 0 c0-4 2-6 4-9z" fill="#8C6B72" opacity="0.5" />
              </svg>
            </motion.div>
          ))}

          {/* a gold-line butterfly wanders through, wings truly flapping */}
          <motion.div
            className="absolute top-[34%] left-0 text-candle"
            style={{ filter: "drop-shadow(0 0 6px rgba(212,166,90,0.55))" }}
            initial={{ x: "-12vw", y: 0, opacity: 0 }}
            animate={{
              x: "112vw",
              y: [0, -60, 24, -70, -20, 30],
              rotate: [8, -6, 10, -8, 6],
              opacity: [0, 1, 1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 17, delay: 8, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 40 30" className="h-7 w-9" fill="none" stroke="currentColor" strokeWidth="0.9">
              {/* left wings — flapping from the body */}
              <motion.g
                animate={{ scaleX: [1, 0.25, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "20px 15px" }}
              >
                <path d="M19 15 C 14 4 4 3 3 9 C 2.5 13 8 17 17 20" />
                <path d="M17 20 C 12 22 9 26 11 27 C 13 28 17 25 19 21" />
              </motion.g>
              {/* right wings — a half-beat behind, like real flight */}
              <motion.g
                animate={{ scaleX: [0.25, 1, 0.25] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "20px 15px" }}
              >
                <path d="M21 15 C 26 4 36 3 37 9 C 37.5 13 32 17 23 20" />
                <path d="M23 20 C 28 22 31 26 29 27 C 27 28 23 25 21 21" />
              </motion.g>
              <path d="M20 13 v10" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M19 13 C 17.5 10.5 16.5 9.5 15.5 9 M21 13 C 22.5 10.5 23.5 9.5 24.5 9" strokeWidth="0.7" />
            </svg>
          </motion.div>

          {/* stray sparkles waking on the page */}
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={`spark-${i}`}
              className="absolute font-display text-[10px] text-candle"
              style={{ left: `${12 + ((i * 19) % 76)}%`, top: `${14 + ((i * 23) % 60)}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.1, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, delay: 4 + i * 2.8, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
