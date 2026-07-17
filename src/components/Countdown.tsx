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
      className="relative inline-block overflow-hidden px-5 py-2.5 sm:px-9 sm:py-3.5"
      style={{
        border: "1px solid rgba(184,148,90,0.65)",
        borderRadius: "26px",
      }}
    >
      {/* inner engraved hairline */}
      <span className="pointer-events-none absolute inset-[5px] rounded-[29px] border border-gold/25" />
      {/* small stars set into the frame's sides */}
      <span className="absolute -left-[7px] top-1/2 -translate-y-1/2 font-display text-[9px] text-gold" style={{ textShadow: "0 0 4px rgba(0,0,0,0.9)" }}>✦</span>
      <span className="absolute -right-[7px] top-1/2 -translate-y-1/2 font-display text-[9px] text-gold" style={{ textShadow: "0 0 4px rgba(0,0,0,0.9)" }}>✦</span>

      <div className="small-caps text-[10px] tracking-[0.3em] text-cream" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}>
        {lead} · {when}
      </div>

      <div className="mt-1.5 flex items-start justify-center gap-1.5 font-display text-parchment sm:gap-2.5" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>
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
  return <span className="pt-0.5 text-lg text-gold/70 sm:text-xl">:</span>;
}

function Unit({ v, l }: { v: number; l: string }) {
  return (
    <span className="flex w-7 flex-col items-center sm:w-9">
      <span className="text-xl tabular-nums leading-none sm:text-2xl">{v.toString().padStart(2, "0")}</span>
      <span className="mt-1 small-caps text-[8px] tracking-[0.28em] text-cream/70">{l}</span>
    </span>
  );
}
