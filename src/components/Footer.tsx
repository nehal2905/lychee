import { Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { brand, copy } from "@/lib/brand.config";
import { useStore } from "@/lib/store";
import { EasterEggModal, AllThreeModal } from "./EasterEggs";

// the last page of the diary
export function Footer() {
  const { findKey, keys } = useStore();
  const [open, setOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const navigate = useNavigate();
  const deskTaps = useRef(0);
  const deskTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // the keeper's way in — double-tap the colophon line to reach /admin
  const tapColophon = () => {
    deskTaps.current += 1;
    if (deskTimer.current) clearTimeout(deskTimer.current);
    deskTimer.current = setTimeout(() => {
      if (deskTaps.current >= 2) navigate({ to: "/admin" });
      deskTaps.current = 0;
    }, 280);
  };

  const onButterfly = () => {
    const wasFound = keys.butterfly;
    findKey("butterfly");
    setOpen(true);
    if (!wasFound) {
      setTimeout(() => {
        if (keys.moon && keys.locket) setAllOpen(true);
      }, 2200);
    }
  };

  return (
    <footer className="relative mt-32 overflow-hidden bg-panel px-6 pb-12 pt-24 sm:px-12">
      <span className="hairline absolute inset-x-10 top-0" />

      {/* baby's breath, pressed into the page corner */}
      <div className="pointer-events-none absolute -top-2 left-4 opacity-25 rotate-imperfect-2">
        <svg viewBox="0 0 120 60" className="h-20 w-44 text-cream">
          <path d="M10 55 Q40 30 70 18 M30 52 Q50 38 78 30 M20 54 Q60 44 95 40" stroke="currentColor" strokeWidth="0.7" fill="none" />
          {[...Array(14)].map((_, i) => (
            <circle key={i} cx={18 + ((i * 17) % 90)} cy={12 + ((i * 13) % 40)} r="1.4" fill="currentColor" opacity="0.8" />
          ))}
        </svg>
      </div>

      {/* the moon, dim in the corner */}
      <div className="pointer-events-none absolute right-10 top-10 h-12 w-12 rounded-full bg-candle/30 blur-md animate-flicker" />

      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src="/logo.webp" alt="Lychee Lore" className="h-20 w-20 rounded-full object-cover" />
          <div className="font-display text-4xl italic text-cream sm:text-5xl">{brand.name}</div>
          <p className="max-w-md font-hand text-xl leading-relaxed text-cream/75">{copy.footerLine}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Link to="/faq" className="small-caps text-[11px] tracking-[0.3em] text-haze transition-colors duration-500 hover:text-gold">Questions</Link>
            <span className="font-display text-[8px] text-gold/40">✦</span>
            <Link to="/mystery-jar" className="small-caps text-[11px] tracking-[0.3em] text-haze transition-colors duration-500 hover:text-gold">Mystery Jar</Link>
            <span className="font-display text-[8px] text-gold/40">✦</span>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="small-caps text-[11px] tracking-[0.3em] text-haze transition-colors duration-500 hover:text-gold">
              {brand.instagram}
            </a>
          </div>

          {/* the only spoken trace of the hunt */}
          <p className="mt-10 font-hand text-xl text-cream/70">three secrets live in these pages.</p>

          {/* the third secret — a butterfly resting in the margin, wings barely
              moving, drawn in a whisper of gold. it flutters only when found. */}
          <button
            onClick={onButterfly}
            aria-label="A small butterfly"
            className={`mt-6 h-6 w-8 transition-all duration-1000 ${keys.butterfly ? "text-candle opacity-100 drop-shadow-[0_0_10px_rgba(212,166,90,0.7)]" : "text-gold opacity-[0.22] hover:opacity-60"}`}
          >
            <motion.svg
              viewBox="0 0 40 30"
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              animate={{ y: [0, -2.5, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* wings as fine line-work, not solid shapes */}
              <path d="M19 15 C 14 4 4 3 3 9 C 2.5 13 8 17 17 20" />
              <path d="M21 15 C 26 4 36 3 37 9 C 37.5 13 32 17 23 20" />
              <path d="M17 20 C 12 22 9 26 11 27 C 13 28 17 25 19 21" />
              <path d="M23 20 C 28 22 31 26 29 27 C 27 28 23 25 21 21" />
              {/* body & antennae */}
              <path d="M20 13 v10" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M19 13 C 17.5 10.5 16.5 9.5 15.5 9 M21 13 C 22.5 10.5 23.5 9.5 24.5 9" strokeWidth="0.7" />
            </motion.svg>
          </button>
        </div>

        <div
          onClick={tapColophon}
          className="mt-14 cursor-default select-none text-center font-type text-[10px] tracking-[0.3em] text-haze/50"
        >
          © {new Date().getFullYear()} {brand.name} · Made with Candlelight
        </div>
      </div>

      {/* WhatsApp — a quiet gold ring, not an app bubble */}
      <a
        href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, "")}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-[74px] right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-panel/85 text-gold backdrop-blur candle-glow transition-colors duration-500 hover:text-candle md:bottom-5"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M20 12a8 8 0 1 1-14.9-4.1L4 20l4.3-1.1A8 8 0 0 0 20 12zm-8-6a6 6 0 0 0-5.2 9L6 18l3-.8A6 6 0 1 0 12 6zm3.4 8.2c-.2-.1-1-.5-1.1-.5-.2-.1-.3-.1-.4.1s-.5.5-.6.6c-.1.1-.2.1-.4 0-.6-.3-1.2-.7-1.7-1.4-.4-.4-.7-1-.5-1.1.1-.1.2-.2.3-.3l.2-.3v-.3s-.4-1-.6-1.3c-.1-.3-.3-.3-.4-.3h-.3c-.1 0-.3.1-.5.3-.2.2-.6.6-.6 1.5s.6 1.7.7 1.9c.1.1 1.3 2 3.2 2.7 1.9.7 1.9.5 2.2.5.4 0 1.1-.4 1.2-.9.2-.5.2-.9.1-.9-.1-.1-.2-.1-.4-.2z" />
        </svg>
      </a>

      <EasterEggModal keyName="butterfly" open={open} onClose={() => setOpen(false)} />
      <AllThreeModal open={allOpen} onClose={() => setAllOpen(false)} />
    </footer>
  );
}
