import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Homepage teaser — same free-floating jar treatment as the Mystery Jar page. */
export function HomeMysteryJar({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Link
      to="/mystery-jar"
      className={`group relative mx-auto flex w-full max-w-[300px] flex-col items-center ${className}`}
      aria-label="Enter the Mystery Jar"
    >
      <div className="relative w-full">
        {/* soft séance bloom behind the jar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] bottom-[6%] top-[18%] z-0 rounded-[50%]"
          animate={
            reduce
              ? { opacity: 0.4 }
              : { opacity: [0.3, 0.5, 0.35], scale: [1, 1.03, 1] }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(212,166,90,0.5), rgba(184,148,90,0.1) 55%, transparent 72%)",
            filter: "blur(8px)",
          }}
        />

        <motion.div
          className="relative"
          whileHover={reduce ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <img
            src="/mystery-jar-cutout.png?v=2"
            alt="A glowing apothecary jar of fairy lights and moss, a vintage pendant waiting inside, kraft tag marked ?"
            className="relative z-[1] w-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
            style={{ aspectRatio: "3 / 4" }}
            loading="lazy"
            draggable={false}
          />

          {/* candle-warm screen glow over the glass */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 38% 42% at 48% 52%, rgba(212,166,90,0.32), transparent 65%)",
              mixBlendMode: "screen",
            }}
            animate={reduce ? { opacity: 0.3 } : { opacity: [0.2, 0.4, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* floating fairy-light motes over the jar body */}
          {!reduce &&
            Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute z-[3] h-1 w-1 rounded-full bg-candle"
                style={{
                  left: `${32 + ((i * 37) % 36)}%`,
                  top: `${36 + ((i * 29) % 38)}%`,
                  boxShadow: "0 0 8px rgba(212,166,90,0.85)",
                }}
                animate={{
                  x: [0, i % 2 ? 2 : -2, 0],
                  y: [0, -3, 0],
                  opacity: [0.15, 0.5, 0.2],
                }}
                transition={{
                  duration: 5 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* dust rising from the glow */}
          {!reduce &&
            Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={`dust-${i}`}
                aria-hidden
                className="pointer-events-none absolute z-[3] h-0.5 w-0.5 rounded-full bg-cream/40"
                style={{ left: `${12 + ((i * 47) % 76)}%`, top: `${22 + ((i * 33) % 60)}%` }}
                animate={{ y: [0, -20, 0], opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 7 + (i % 3) * 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                }}
              />
            ))}
        </motion.div>
      </div>

      <motion.span
        className="mt-5 font-display text-xl italic text-candle transition-colors duration-700 group-hover:text-gold sm:text-2xl"
        animate={reduce ? undefined : { opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        Enter the Mystery Jar
      </motion.span>
      <span className="mt-1 font-type text-[10px] tracking-[0.28em] text-haze small-caps">
        The Piece Chooses You ✦
      </span>
    </Link>
  );
}

/** Compact medallion version for the category shelf. */
export function HomeMysteryJarMedallion() {
  const reduce = useReducedMotion();

  return (
    <span
      className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full"
      style={{
        border: "1px solid rgba(184,148,90,0.55)",
        boxShadow: "0 0 22px rgba(0,0,0,0.55), inset 0 0 16px rgba(0,0,0,0.5)",
      }}
    >
      <img
        src="/mystery-jar-cutout.png?v=2"
        alt=""
        className="h-full w-full object-cover drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        style={{ objectPosition: "50% 42%" }}
        loading="lazy"
      />
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(212,166,90,0.35), transparent 62%)",
          mixBlendMode: "screen",
        }}
        animate={reduce ? { opacity: 0.5 } : { opacity: [0.3, 0.75, 0.4, 0.65, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute h-0.5 w-0.5 rounded-full bg-candle"
            style={{
              left: `${40 + i * 10}%`,
              top: `${45 + (i % 2) * 12}%`,
              boxShadow: "0 0 6px rgba(212,166,90,0.9)",
            }}
            animate={{ opacity: [0.2, 1, 0.25] }}
            transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
    </span>
  );
}
