import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Homepage teaser — real jar artwork with a living glow overlay. */
export function HomeMysteryJar({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Link
      to="/mystery-jar"
      className={`group relative mx-auto flex w-full max-w-[280px] flex-col items-center ${className}`}
      aria-label="Enter the Mystery Jar"
    >
      <div className="relative w-full">
        {/* soft séance bloom behind the jar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-[12%] bottom-[8%] top-[18%] rounded-[50%]"
          animate={
            reduce
              ? { opacity: 0.45 }
              : { opacity: [0.35, 0.7, 0.42, 0.65, 0.4], scale: [1, 1.04, 0.98, 1.03, 1] }
          }
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(212,166,90,0.4), rgba(184,148,90,0.08) 55%, transparent 72%)",
            filter: "blur(6px)",
          }}
        />

        <motion.div
          className="relative overflow-hidden rounded-sm"
          whileHover={reduce ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            boxShadow:
              "0 18px 48px rgba(0,0,0,0.55), 0 0 40px rgba(212,166,90,0.12)",
          }}
        >
          <img
            src="/mystery-jar-cutout.png?v=1"
            alt="A glowing apothecary jar of fairy lights and moss, a vintage pendant waiting inside, kraft tag marked ?"
            className="relative z-[1] w-full object-contain object-center"
            style={{ aspectRatio: "3 / 4" }}
            loading="lazy"
          />

          {/* candle-warm screen glow over the glass */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "radial-gradient(ellipse 42% 48% at 50% 52%, rgba(212,166,90,0.28), transparent 68%)",
              mixBlendMode: "screen",
            }}
            animate={reduce ? { opacity: 0.5 } : { opacity: [0.35, 0.7, 0.45, 0.65, 0.4] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* floating fairy-light motes over the jar body */}
          {!reduce &&
            Array.from({ length: 7 }).map((_, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute z-[3] h-1 w-1 rounded-full bg-candle"
                style={{
                  left: `${36 + ((i * 9) % 28)}%`,
                  top: `${38 + ((i * 11) % 32)}%`,
                  boxShadow: "0 0 10px rgba(212,166,90,0.9)",
                }}
                animate={{
                  opacity: [0.15, 0.95, 0.25, 0.8, 0.2],
                  y: [0, -6 - (i % 3), 0],
                  scale: [0.8, 1.25, 0.9],
                }}
                transition={{
                  duration: 3.2 + (i % 4) * 0.55,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* dust rising from the glow */}
          {!reduce &&
            Array.from({ length: 4 }).map((_, i) => (
              <motion.span
                key={`d-${i}`}
                aria-hidden
                className="pointer-events-none absolute z-[3] h-0.5 w-0.5 rounded-full bg-cream/50"
                style={{ left: `${30 + i * 12}%`, bottom: "28%" }}
                animate={{ y: [0, -40 - i * 8], opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 5.5 + i,
                  repeat: Infinity,
                  delay: i * 1.1,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* vignette so the artwork settles into the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 45%, transparent 48%, rgba(10,5,8,0.55) 100%)",
            }}
          />
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
        src="/mystery-jar-cutout.png?v=1"
        alt=""
        className="h-full w-full object-cover"
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
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,transparent_45%,rgba(10,5,10,0.55))]" />
    </span>
  );
}
