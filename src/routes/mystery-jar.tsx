import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { mysteryJarPrice } from "@/lib/brand.config";

export const Route = createFileRoute("/mystery-jar")({ component: MysteryJar });

const EASE = [0.22, 1, 0.36, 1] as const;

function MysteryJar() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-12">
      {/* the room darkens around the jar */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 42%, rgba(217,160,91,0.06), transparent 60%)" }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <p className="overline-label">The Mystery Jar</p>
          <h1 className="display-xl mt-8 text-5xl sm:text-7xl">
            You don't choose
            <br />
            the piece.
          </h1>
          <p className="mt-6 font-display text-2xl italic text-candle sm:text-3xl">The piece chooses you.</p>
        </motion.div>

        {/* the jar, glowing quietly */}
        <motion.div
          className="relative mx-auto mt-16 h-80 w-56"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: EASE }}
        >
          <div className="absolute inset-0 animate-glowpulse" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(217,160,91,0.2), transparent 65%)" }} />
          <svg viewBox="0 0 200 280" className="absolute inset-0 h-full w-full">
            <rect x="60" y="10" width="80" height="24" rx="4" fill="none" stroke="#B8945A" strokeWidth="2" />
            <rect x="55" y="30" width="90" height="10" rx="2" fill="#B8945A" opacity="0.4" />
            <path d="M50 40 Q40 50 40 80 L40 240 Q40 270 100 270 Q160 270 160 240 L160 80 Q160 50 150 40 Z"
              fill="url(#jar)" stroke="#B8945A" strokeWidth="1.5" opacity="0.9" />
            <defs>
              <radialGradient id="jar" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#D9A05B" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#453048" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#160F13" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="255" rx="55" ry="12" fill="#5C4033" opacity="0.6" />
            {/* glass light down the left side */}
            <path d="M52 60 Q46 140 52 230" stroke="#F3E9D7" strokeWidth="2" opacity="0.14" fill="none" strokeLinecap="round" />
            {/* the silhouette no one can quite make out */}
            <circle cx="100" cy="180" r="24" fill="#EADCC3" opacity="0.13" />
          </svg>

          {/* fireflies */}
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-candle candle-glow"
              initial={{ x: 100, y: 150, opacity: 0 }}
              animate={{
                x: 60 + ((i * 37) % 80),
                y: 80 + ((i * 53) % 160),
                opacity: [0.2, 1, 0.4, 1, 0.3],
              }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-14 max-w-md font-hand text-xl leading-relaxed text-cream/80"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: EASE }}
        >
          Tell us your size and metal preference. We send you a curated one-of-a-kind vintage treasure, chosen quietly, just for you.
        </motion.p>

        <motion.p
          className="mt-6 small-caps font-display text-2xl tracking-[0.2em] text-gold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.4, ease: EASE }}
        >
          ₹{mysteryJarPrice.toLocaleString("en-IN")}
        </motion.p>

        {sent ? (
          <p className="mt-16 font-hand text-3xl text-candle animate-flicker">
            The universe is choosing. We'll be in touch. ✦
          </p>
        ) : (
          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mx-auto mt-14 max-w-md space-y-8 text-left"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.6, ease: EASE }}
          >
            <Field label="Ring Size (US)">
              <select className="field-line appearance-none">
                {["4", "5", "6", "7", "8", "9", "10"].map((s) => <option key={s} className="bg-panel">{s}</option>)}
              </select>
            </Field>
            <Field label="Metal">
              <select className="field-line appearance-none">
                <option className="bg-panel">Yellow Gold</option>
                <option className="bg-panel">Rose Gold</option>
                <option className="bg-panel">Silver</option>
                <option className="bg-panel">Surprise Me</option>
              </select>
            </Field>
            <Field label="Style Leaning">
              <select className="field-line appearance-none">
                <option className="bg-panel">Romantic</option>
                <option className="bg-panel">Celestial</option>
                <option className="bg-panel">Botanical</option>
              </select>
            </Field>
            <Field label="Your WhatsApp">
              <input required type="tel" className="field-line" />
            </Field>
            <button className="btn-seal-plaque mt-6 w-full py-5">
              Trust the Universe
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block small-caps text-[10px] tracking-[0.3em] text-haze">{label}</span>
      {children}
    </label>
  );
}
