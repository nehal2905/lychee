import { motion } from "motion/react";

type Variant = "route" | "image" | "checkout" | "search" | "wishlist" | "jar";

export function Loader({ variant = "route", label }: { variant?: Variant; label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-cream/80">
      <div className="relative h-16 w-16">{renderVariant(variant)}</div>
      {label && <div className="font-type text-xs tracking-widest small-caps">{label}</div>}
    </div>
  );
}

function renderVariant(v: Variant) {
  switch (v) {
    case "route":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full text-gold">
          {/* lock */}
          <rect x="18" y="24" width="28" height="28" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M24 24 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="32" cy="38" r="3" fill="currentColor" />
          {/* key */}
          <g className="animate-keyturn" style={{ transformOrigin: "32px 38px" }}>
            <circle cx="32" cy="38" r="2" fill="currentColor" />
            <rect x="32" y="37" width="20" height="2" fill="currentColor" />
            <rect x="48" y="37" width="2" height="5" fill="currentColor" />
          </g>
        </svg>
      );
    case "image":
      return <div className="h-full w-full rounded animate-shimmer" />;
    case "checkout":
      return (
        <div className="relative h-full w-full">
          <img
            src="/logo.webp"
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
          {/* a spinning gold ring so the logo clearly reads as "loading" */}
          <motion.span
            aria-hidden
            className="absolute -inset-1.5 rounded-full border-2 border-transparent border-t-gold border-r-gold/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case "search":
      return (
        <div className="relative h-full w-full">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-x-2 h-8 rounded-sm bg-parchment/90"
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: [0, -20, 0], rotate: [0, i * 8 - 8, 0] }}
              transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }}
              style={{ top: 8 + i * 6 }}
            />
          ))}
        </div>
      );
    case "wishlist":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full text-gold">
          <rect x="10" y="30" width="44" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <motion.rect
            x="10" y="14" width="44" height="18"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            initial={{ rotate: 0 }} animate={{ rotate: [-30, 0, -30] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "10px 30px" }}
          />
        </svg>
      );
    case "jar":
      return (
        <div className="relative h-full w-full">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-candle"
              style={{ left: `${20 + i * 10}%`, top: `${30 + (i % 3) * 15}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 1.6 + i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      );
  }
}
