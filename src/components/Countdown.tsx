import { useEffect, useState } from "react";
import { dropTargetISO, copy } from "@/lib/brand.config";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

// the time to the next drop, engraved inside an ornate gold frame —
// two-line announcement, large numerals, labels beneath, as in the mockup
export function Countdown() {
  const target = new Date(dropTargetISO);
  const [t, setT] = useState(diff(target));
  useEffect(() => {
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  });

  const [lead, when] = copy.dropLabel.split("—").map((s) => s.trim());

  return (
    <div
      className="relative inline-block overflow-hidden px-8 py-4.5 sm:px-14 sm:py-6"
      style={{
        border: "1px solid rgba(184,148,90,0.72)",
        borderRadius: "34px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(184,148,90,0.08), rgba(22,15,23,0.45))",
        boxShadow: "0 0 44px rgba(212,166,90,0.18), inset 0 0 26px rgba(0,0,0,0.4)",
      }}
    >
      {/* a slow light travels the frame every few seconds */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-shimmer opacity-50"
        style={{
          borderRadius: "34px",
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animationDuration: "5.5s",
        }}
      />

      {/* the faintest dust inside the glass of the frame */}
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-candle/40 animate-floaty"
          style={{ left: `${14 + ((i * 24) % 72)}%`, top: `${25 + ((i * 31) % 50)}%`, animationDelay: `${i * 1.6}s`, animationDuration: `${10 + i * 2}s` }}
        />
      ))}

      {/* inner engraved hairline */}
      <span className="pointer-events-none absolute inset-[5px] rounded-[29px] border border-gold/25" />
      {/* small stars set into the frame's sides */}
      <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 bg-background px-0.5 font-display text-[9px] text-gold">✦</span>
      <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 bg-background px-0.5 font-display text-[9px] text-gold">✦</span>

      <div className="small-caps text-sm tracking-[0.3em] text-cream">
        {lead} · {when}
      </div>

      <div className="mt-2.5 flex items-start justify-center gap-2.5 font-display text-parchment sm:gap-3.5">
        <Unit v={t.d} l="Days" />
        <Colon />
        <Unit v={t.h} l="Hrs" />
        <Colon />
        <Unit v={t.m} l="Mins" />
        <Colon />
        <Unit v={t.s} l="Secs" />
      </div>
    </div>
  );
}

function Colon() {
  return <span className="pt-0.5 text-2xl text-gold/70 sm:text-3xl">:</span>;
}

function Unit({ v, l }: { v: number; l: string }) {
  return (
    <span className="flex w-10 flex-col items-center sm:w-12">
      <span className="text-3xl tabular-nums leading-none sm:text-4xl">{v.toString().padStart(2, "0")}</span>
      <span className="mt-1.5 small-caps text-[9px] tracking-[0.28em] text-haze">{l}</span>
    </span>
  );
}
