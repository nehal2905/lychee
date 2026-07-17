import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductPhoto } from "@/components/ProductPhoto";
import { Countdown } from "@/components/Countdown";
import { brand, copy } from "@/lib/brand.config";
import { useStore } from "@/lib/store";
import { EasterEggModal } from "@/components/EasterEggs";

export const Route = createFileRoute("/")({ component: Home });

const EASE = [0.22, 1, 0.36, 1] as const;

function Home() {
  return (
    <>
      <Hero />
      <ArchiveShelf />
      <CurrentDrop />
      <TrustSection />
      <LoreSection />
      <SoldArchive />
      <HowItWorks />
      <Letters />
      <WhatsAppOptIn />
      <AboutStrip />
    </>
  );
}

/* a small engraved divider between chapters — never a hard boundary */
function Ornament() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4 py-6 opacity-60">
      <span className="hairline flex-1" />
      <span className="font-display text-xs text-gold">✦</span>
      <span className="hairline flex-1" />
    </div>
  );
}

/* a butterfly wandering the scene — fine gold line-work, wings truly flapping */
function HeroButterfly({ top, delay, dur, tint }: { top: string; delay: number; dur: number; tint: string }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0"
      style={{ top, color: tint }}
      initial={{ x: "-14vw", opacity: 0 }}
      animate={{ x: ["-14vw", "28vw", "60vw", "110vw"], y: [0, -42, 26, -54, 8], opacity: [0, 0.75, 0.75, 0.6, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 40 30"
        className="h-5 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        style={{ filter: "drop-shadow(0 0 5px rgba(212,166,90,0.35))" }}
      >
        <motion.g
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "20px 15px" }}
        >
          <path d="M19 15 C 14 4 4 3 3 9 C 2.5 13 8 17 17 20" />
          <path d="M17 20 C 12 22 9 26 11 27 C 13 28 17 25 19 21" />
        </motion.g>
        <motion.g
          animate={{ scaleX: [0.3, 1, 0.3] }}
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
  );
}

/* --------------------------------- HERO --------------------------------- */
/* the painted window at dusk — one artwork carries the whole scene,
   exactly as the reference mockup: scene → ornate countdown → CTA */
function Hero() {
  const { findKey, keys } = useStore();
  const [moonOpen, setMoonOpen] = useState(false);
  const [artOk, setArtOk] = useState(true);

  const tapMoon = () => {
    findKey("moon");
    setMoonOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden pb-12"
      style={{
        /* opaque behind the stage, then a short dissolve so the paper
           texture surfaces gradually below the fold — no tonal step */
        background: "linear-gradient(180deg, #221724 0%, #221724 86%, rgba(34,23,36,0) 100%)",
      }}
    >
      {/* the stage — locked to exactly one screen; the artwork fills it,
          never the other way around. swap the art, the layout holds. */}
      <motion.div
        className="relative mx-auto"
        style={{ height: "calc(100svh - 3.5rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        {artOk ? (
          <motion.img
            src="/hero.png?v=4"
            alt="A candlelit desk before an arched window at dusk — dark roses, vintage jewellery, a melting candle, and a jar of fairy lights"
            className="h-full w-full object-cover object-[50%_35%] will-change-transform md:object-contain"
            onError={() => setArtOk(false)}
            animate={{ scale: [1, 1.06, 1.04, 1], x: ["0%", "-1.4%", "1%", "0%"], y: ["0%", "-1%", "-0.4%", "0%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          /* graceful stand-in until /hero.png is added to public/ */
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ background: "radial-gradient(ellipse 120% 80% at 60% 10%, #8C6B72 0%, #4A3556 34%, #221724 80%)" }}
          >
            <div
              className="absolute left-1/2 top-[6%] h-[70%] w-[72%] -translate-x-1/2 overflow-hidden rounded-t-[46%]"
              style={{ border: "1px solid rgba(184,148,90,0.45)", boxShadow: "inset 0 0 70px rgba(0,0,0,0.7)" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 55% 30%, #8C6B72 0%, #4A3556 30%, #221724 75%)" }} />
              {[...Array(16)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-0.5 w-0.5 rounded-full bg-parchment animate-twinkle"
                  style={{ left: `${(i * 53) % 100}%`, top: `${(i * 29) % 55}%`, animationDelay: `${i * 0.4}s` }}
                />
              ))}
              <div
                className="absolute right-[20%] top-[16%] h-12 w-12 rounded-full"
                style={{
                  background: "radial-gradient(circle at 65% 40%, #F3E9D7 0%, #E8DCC5 40%, transparent 42%), radial-gradient(circle at 40% 50%, #5d4059 55%, transparent 56%)",
                  boxShadow: "0 0 24px rgba(243,233,215,0.3)",
                }}
              />
            </div>
            <div className="absolute bottom-8 left-[14%] animate-flicker">
              <div className="h-12 w-2.5 rounded-b bg-parchment/90" />
              <div className="mx-auto -mt-10 h-5 w-3 rounded-full bg-candle blur-[2px] candle-glow" />
            </div>
            <div className="absolute bottom-6 right-[16%] flex flex-col items-center">
              <div className="h-2 w-5 rounded-t-sm bg-wood/80" />
              <div className="relative h-14 w-12 rounded-b-3xl rounded-t-xl border border-gold/40 bg-panel/30">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-candle animate-twinkle"
                    style={{ left: `${20 + ((i * 15) % 60)}%`, top: `${20 + ((i * 17) % 60)}%`, animationDelay: `${i * 0.7}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* the moon in the painting keeps the first secret — an invisible touch,
            with the faintest breath of light every few seconds to reward the curious */}
        <button
          onClick={tapMoon}
          aria-label="The moon"
          className={`absolute z-20 h-28 w-28 -translate-y-1/2 rounded-full ${artOk ? "right-[30%] top-[38%]" : "right-[18%] top-[20%]"}`}
        >
          {!keys.moon && (
            <span
              className="absolute inset-0 rounded-full animate-glowpulse"
              style={{ background: "radial-gradient(circle, rgba(243,233,215,0.07), transparent 60%)", animationDuration: "12s" }}
            />
          )}
        </button>

        {/* the candle breathes — a warm glow over the lower-left flame */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[20%] left-[8%] h-40 w-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,166,90,0.28), transparent 65%)" }}
          animate={{ opacity: [0.55, 0.9, 0.5, 0.85, 0.6], scale: [1, 1.06, 0.98, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* the fairy-light jar pulses — a warm glow over the lower-right */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[16%] right-[10%] h-44 w-44 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,166,90,0.24), transparent 62%)" }}
          animate={{ opacity: [0.7, 1, 0.65, 0.95, 0.75] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* a rose petal or two lets go and drifts down through the scene */}
        {[0, 1].map((i) => (
          <motion.span
            key={`hpetal-${i}`}
            aria-hidden
            className="pointer-events-none absolute text-rose"
            style={{ left: `${26 + i * 44}%` }}
            initial={{ top: "-5%", opacity: 0 }}
            animate={{ top: ["-5%", "84%"], x: [0, 22, -14, 24], rotate: [0, 160, 300, 470], opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 17 + i * 3, repeat: Infinity, delay: i * 8, ease: "easeIn" }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M12 2c3 6 7 8 7 13a7 7 0 1 1-14 0c0-5 4-7 7-13z" opacity="0.85" />
            </svg>
          </motion.span>
        ))}

        {/* embers drift up from the candlelight */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={`ember-${i}`}
            aria-hidden
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-candle"
            style={{ left: `${12 + ((i * 15) % 74)}%`, boxShadow: "0 0 6px 1px rgba(212,166,90,0.5)" }}
            initial={{ bottom: "12%", opacity: 0 }}
            animate={{
              bottom: ["12%", "62%"],
              x: [0, (i % 2 ? 1 : -1) * (10 + ((i * 6) % 20)), 0],
              opacity: [0, 0.85, 0.3, 0],
            }}
            transition={{ duration: 9 + (i % 4) * 2, repeat: Infinity, delay: i * 1.6, ease: "easeInOut" }}
          />
        ))}

        {/* butterflies wandering the scene */}
        <HeroButterfly top="34%" delay={2} dur={20} tint="#D4A65A" />
        <HeroButterfly top="58%" delay={11} dur={26} tint="#B0788A" />

        {/* drifting dust over the scene */}
        {[...Array(9)].map((_, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-candle/50 animate-floaty"
            style={{ left: `${10 + ((i * 37) % 80)}%`, top: `${10 + ((i * 43) % 70)}%`, animationDelay: `${i * 0.8}s`, animationDuration: `${9 + (i % 3) * 3}s` }}
          />
        ))}

        {/* the scene never ends — it dissolves into the page's own dusk */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
          style={{ background: "linear-gradient(180deg, transparent, rgba(34,23,36,0.5) 55%, #221724)" }}
        />

        {/* the countdown floats over the desk, fully visible — and beneath it,
            a candle-flicker chevron whispers "there is more below" */}
        <motion.div
          className="absolute inset-x-0 bottom-[7.5rem] z-10 flex flex-col items-center gap-2.5 px-6 md:bottom-10"
          style={{ paddingRight: "14%" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.8, ease: EASE }}
        >
          <Countdown />
          <motion.span
            aria-hidden
            className="animate-flicker text-candle"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M5 9 l7 7 l7 -7" />
            </svg>
          </motion.span>
        </motion.div>
      </motion.div>

      <EasterEggModal keyName="moon" open={moonOpen} onClose={() => setMoonOpen(false)} />
    </section>
  );
}

/* ---------------------------- ARCHIVE SHELF ----------------------------- */
/* the archive opens directly beneath the painting: a flanked heading,
   then six catalog cards on a swipeable shelf — each with a jewellery
   vignette in a gold medallion, floating gently like it's underwater. */
function ArchiveShelf() {
  const cats = [
    { name: "Necklaces", sub: "Collected Across Europe", img: "/pendant.png", pos: "50% 42%", to: "#drop" },
    { name: "Rings", sub: "One of Each, Never Two", img: "/ring.png", pos: "50% 45%", to: "#drop" },
    { name: "Earrings", sub: "Pairs That Found Each Other", img: "/earring.png", pos: "50% 42%", to: "#drop" },
    { name: "Bracelets", sub: "Clasped Through Centuries", img: "/locket.png", pos: "50% 46%", to: "#drop" },
    { name: "Mystery Jars", sub: "The Piece Chooses You", img: "/hero.png?v=4", pos: "76% 82%", to: "/mystery-jar" },
    { name: "One of One", sub: "Waiting to Be Inherited", img: "/hero.png?v=4", pos: "32% 86%", to: "#drop" },
  ];
  return (
    <section id="shelf" className="relative scroll-mt-16 overflow-hidden py-12">
      {/* the dark collections band — the damask cloth, shown near full over a
          dark base, edges faded into the page so there is no hard break */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#150E16]" />
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundImage: "url(/collections.png?v=1)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-[#150E16]/25" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #221724 0%, transparent 14%, transparent 86%, #221724 100%)" }}
        />
      </div>

      {/* Find Your Perfect Match — bold serif, quiet subtitle beneath */}
      <motion.div
        className="px-6 sm:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <h2 className="font-display text-4xl font-bold not-italic leading-tight text-cream sm:text-5xl">
          Find Your Perfect Match
        </h2>
        <p className="mt-2 font-display text-lg italic text-gold/85 sm:text-xl">Shop by Categories</p>
      </motion.div>

      <div
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 pt-2 sm:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cats.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: (i % 6) * 0.08, ease: EASE }}
            className={`shrink-0 snap-center ${i % 2 ? "mt-4" : ""}`}
          >
            <motion.a
              href={c.to}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className="relative block w-[62vw] max-w-[240px] overflow-hidden rounded-2xl px-7 pb-8 pt-7 text-center sm:w-[220px]"
              style={{
                background: "linear-gradient(168deg, rgba(22,15,23,0.92), rgba(18,12,19,0.97))",
                border: "1px solid rgba(184,148,90,0.4)",
                outline: "1px solid rgba(184,148,90,0.15)",
                outlineOffset: "3px",
                boxShadow: "inset 0 0 26px rgba(0,0,0,0.5), 0 8px 26px rgba(0,0,0,0.35)",
                transition: "box-shadow 0.7s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "inset 0 0 26px rgba(0,0,0,0.5), 0 0 30px rgba(212,166,90,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "inset 0 0 26px rgba(0,0,0,0.5), 0 8px 26px rgba(0,0,0,0.35)"; }}
            >
              {/* corner flourishes */}
              <span className="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-gold/50" />
              <span className="absolute right-2.5 top-2.5 h-3 w-3 border-r border-t border-gold/50" />
              <span className="absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-gold/50" />
              <span className="absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-gold/50" />

              {/* jewellery vignette in a gold medallion */}
              <span
                className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full"
                style={{
                  border: "1px solid rgba(184,148,90,0.55)",
                  boxShadow: "0 0 22px rgba(0,0,0,0.55), inset 0 0 16px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={c.img}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: c.pos }}
                  loading="lazy"
                />
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,transparent_45%,rgba(10,5,10,0.55))]" />
              </span>

              <h3 className="mt-4 font-display text-2xl italic text-cream">{c.name}</h3>
              <span className="hairline mx-auto mt-2.5 block w-10 opacity-60" />
              <p className="mt-2.5 small-caps text-[10px] tracking-[0.26em] text-haze">{c.sub}</p>
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* the shelf ends, the chapter begins */}
      <Ornament />
    </section>
  );
}

/* --------------------------------- DROP --------------------------------- */
/* calm, clean, strictly aligned — the collage stays out of this room */
function CurrentDrop() {
  const items = products.filter((p) => !p.vault);
  return (
    <section id="drop" className="relative scroll-mt-16 px-5 pb-24 pt-6 sm:px-12 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-10 flex items-baseline gap-5 sm:mb-14"
        >
          <p className="overline-label shrink-0">The Current Drop</p>
          <span className="hairline flex-1 opacity-50" />
          <p className="shrink-0 font-hand text-lg text-cream/60">ten pieces, one of each</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- LORE SECTION ----------------------------- */
function LoreSection() {
  const featured = products[1];
  const { findKey, keys } = useStore();
  const [locketOpen, setLocketOpen] = useState(false);
  const [vaultRevealed, setVaultRevealed] = useState(false);
  const vaultPiece = products.find((p) => p.vault)!;

  const tapLocket = () => {
    findKey("locket");
    setLocketOpen(true);
    setVaultRevealed(true);
  };

  return (
    <section
      className="relative overflow-hidden px-6 py-32 sm:px-12"
      style={{ background: "linear-gradient(180deg, transparent, rgba(22,15,23,0.75) 18%, rgba(22,15,23,0.75) 82%, transparent)" }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-20"
        >
          <p className="overline-label">Every Piece Has Its Lore</p>
          <h2 className="display-xl mt-6 max-w-2xl text-5xl sm:text-7xl">The Ones That Speak.</h2>
        </motion.div>

        <div className="relative grid items-center gap-6 md:grid-cols-12">
          {/* the piece — larger than the letter, overlapping it */}
          <motion.div
            className="relative z-10 mx-auto w-full max-w-sm md:col-span-6 md:col-start-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            <ProductPhoto hue={featured.hue} stone={featured.stone} shape="ring" />
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-type text-[9px] tracking-[0.3em] text-haze/80">Exhibit</span>
              <span className="hairline flex-1 opacity-40" />
              <p className="font-display text-xl italic text-cream">{featured.name}</p>
            </div>
          </motion.div>

          {/* its letter — tucked beneath, rotated, deckled */}
          <motion.div
            className="relative md:col-span-7 md:col-start-6 md:-ml-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
          >
            <div className="paper deckle fold-corner relative rotate-imperfect-2 p-8 pb-16 sm:p-12 sm:pb-20">
              {/* tape holding it down */}
              <div className="absolute -top-3 left-10 h-6 w-16 rotate-[-4deg] bg-parchment/60 shadow-sm" />
              <p className="mb-4 font-type text-[10px] tracking-[0.3em] small-caps text-wood">A letter, folded twice</p>
              <p className="dropcap font-type text-[15px] leading-loose text-ink sm:text-base">
                {featured.lore}
              </p>
              <p className="mt-8 font-hand text-2xl text-wood">— found March, an estate sale, Bombay</p>

              {/* pressed dried flower */}
              <div className="absolute right-6 top-6 rotate-12 opacity-70">
                <svg viewBox="0 0 40 40" className="h-12 w-12 text-haze">
                  <circle cx="20" cy="20" r="4" fill="#B8945A" />
                  {[0, 72, 144, 216, 288].map((a) => (
                    <ellipse key={a} cx="20" cy="10" rx="4" ry="8" fill="currentColor" transform={`rotate(${a} 20 20)`} />
                  ))}
                </svg>
              </div>

              {/* faint postage stamp */}
              <div className="absolute bottom-20 right-8 hidden h-14 w-12 rotate-6 border border-dashed border-wood/40 opacity-40 sm:block">
                <div className="m-1 h-[calc(100%-8px)] border border-wood/30" />
              </div>

              {/* wax seal */}
              <div className="wax-seal absolute bottom-5 right-5 grid h-14 w-14 place-items-center font-display italic text-parchment">
                ll
              </div>
            </div>

            {/* the second secret — a tiny locket charm hanging off the letter's edge,
                swaying like it was left there, glinting only once in a while */}
            <button
              onClick={tapLocket}
              aria-label="A small locket"
              className="absolute -bottom-12 left-8 h-14 w-7 origin-top"
            >
              <motion.svg
                viewBox="0 0 24 52"
                className={`h-full w-full text-gold transition-opacity duration-1000 ${keys.locket ? "opacity-100 drop-shadow-[0_0_10px_rgba(212,166,90,0.7)]" : "opacity-25 hover:opacity-70"}`}
                animate={{ rotate: [-3.5, 3.5, -3.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "50% 0%" }}
                fill="none"
                stroke="currentColor"
              >
                {/* fine chain */}
                <circle cx="12" cy="3" r="1.3" strokeWidth="0.8" />
                <circle cx="12" cy="7.5" r="1.3" strokeWidth="0.8" />
                <circle cx="12" cy="12" r="1.3" strokeWidth="0.8" />
                <circle cx="12" cy="16.5" r="1.3" strokeWidth="0.8" />
                {/* oval case with an engraved inner line */}
                <ellipse cx="12" cy="33" rx="8.5" ry="11" strokeWidth="1.1" />
                <ellipse cx="12" cy="33" rx="5.5" ry="7.5" strokeWidth="0.5" opacity="0.7" />
                <circle cx="12" cy="33" r="1.6" fill="currentColor" stroke="none" />
              </motion.svg>
              {/* a rare, quiet glint */}
              {!keys.locket && (
                <span className="absolute left-1/2 top-[58%] font-display text-[8px] text-candle animate-twinkle" style={{ animationDuration: "9s" }}>
                  ✦
                </span>
              )}
            </button>
          </motion.div>
        </div>
        {/* vault reveal */}
        {vaultRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="mx-auto mt-24 max-w-xs"
          >
            <p className="mb-4 text-center font-hand text-2xl text-candle animate-flicker">the vault opens…</p>
            <ProductCard product={vaultPiece} index={0} />
          </motion.div>
        )}
      </div>

      <EasterEggModal keyName="locket" open={locketOpen} onClose={() => setLocketOpen(false)} />
    </section>
  );
}

/* ---------------------------- SOLD ARCHIVE ------------------------------ */
function SoldArchive() {
  const sold = products.filter((p) => p.status === "sold");
  const [wishPiece, setWishPiece] = useState<Product | null>(null);

  return (
    <section className="px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-20"
        >
          <p className="overline-label">The Ones That Got Away</p>
          <h2 className="display-xl mt-6 max-w-3xl text-5xl sm:text-7xl">
            Every piece finds its person.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-12 sm:gap-x-8">
          {sold.map((p, i) => (
            <motion.div
              key={p.id}
              className={i === 0 ? "sm:col-span-5 sm:col-start-2" : "sm:col-span-4 sm:col-start-8 sm:mt-32"}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.2, ease: EASE }}
            >
              <div className={`relative opacity-60 grayscale-[60%] ${i % 2 ? "rotate-imperfect-1" : "rotate-imperfect-3"}`}>
                <ProductPhoto hue={p.hue} stone={p.stone} shape="pendant" />
                <div className="wax-seal absolute right-3 top-3 grid h-14 w-14 rotate-[-14deg] place-items-center small-caps font-display text-xs">
                  sold
                </div>
              </div>
              <div className="mt-4">
                <p className="font-display text-xl italic text-cream/80">{p.name}</p>
                <p className="mt-1 font-hand text-base text-haze">{p.soldIn}</p>
                <button onClick={() => setWishPiece(p)} className="link-quiet mt-3 text-sm text-cream/70">
                  Whisper a Wish
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <WhisperWishModal piece={wishPiece} onClose={() => setWishPiece(null)} />
    </section>
  );
}

/* a wish left in the margin — tell us, and we'll listen for its twin */
function WhisperWishModal({ piece, onClose }: { piece: Product | null; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  const close = () => {
    onClose();
    setTimeout(() => setSent(false), 600);
  };

  return (
    <AnimatePresence>
      {piece && (
        <motion.div
          className="fixed inset-0 z-[150] grid place-items-center bg-black/75 p-6 backdrop-blur-sm"
          onClick={close}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 26 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="paper deckle fold-corner relative w-full max-w-sm rotate-imperfect-3 p-8 pb-10"
          >
            <p className="font-type text-[10px] small-caps tracking-[0.3em] text-wood">a wish, whispered</p>
            <h3 className="mt-3 font-display text-2xl italic text-ink">{piece.name}</h3>

            {sent ? (
              <p className="mt-6 font-hand text-xl leading-relaxed text-wood">
                the wish is kept. if a kindred piece ever finds us, you'll be the first to know. ✦
              </p>
            ) : (
              <>
                <p className="mt-3 font-serif-body text-sm leading-relaxed text-ink/80">
                  This one has found its person — but pieces like it sometimes find their way back to us.
                  Leave a whisper and we'll write to you if one does.
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="mt-6 space-y-5"
                >
                  <input required placeholder="your name" className="field-line-ink" />
                  <input required type="tel" placeholder="whatsapp number" className="field-line-ink" />
                  <button type="submit" className="w-full border border-wood/50 py-3 small-caps tracking-[0.3em] text-ink transition-colors duration-500 hover:bg-wood/10">
                    Whisper It
                  </button>
                </form>
              </>
            )}

            <button
              onClick={close}
              className="mt-6 font-type text-[10px] tracking-[0.3em] small-caps text-wood underline underline-offset-4"
            >
              fold it away
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------- TRUST / CRAFT ------------------------------ */
/* engraved marks, set like a printer's colophon after the plates */
function EngravedMark({ name }: { name: string }) {
  const cls = "h-9 w-9 text-gold";
  const sw = 0.9;
  switch (name) {
    case "authentic":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <circle cx="20" cy="20" r="13" />
          <circle cx="20" cy="20" r="16.5" strokeDasharray="1 2.5" />
          <path d="M14.5 20 l3.5 3.5 l7.5 -7.5" />
        </svg>
      );
    case "curated":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <path d="M20 6 L23 16 L33 16 L25 22 L28 32 L20 26 L12 32 L15 22 L7 16 L17 16 Z" />
        </svg>
      );
    case "secure":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <path d="M20 5 L32 10 v9 c0 7.5 -5.5 13 -12 15 c-6.5 -2 -12 -7.5 -12 -15 v-9 z" />
          <path d="M15 19 l3.5 3.5 l6.5 -6.5" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <rect x="7" y="15" width="26" height="18" />
          <path d="M7 22 h26 M20 15 v18 M20 15 c-4 -6 -10 -4 -8 0 M20 15 c4 -6 10 -4 8 0" />
        </svg>
      );
    case "artisan":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <path d="M13 33 v-12 a2 2 0 0 1 4 0 v5 M17 21 v-9 a2 2 0 0 1 4 0 v12 M21 13 v-3 a2 2 0 0 1 4 0 v14 M25 15 v9" />
          <path d="M13 29 h12 v4 h-12 z" />
        </svg>
      );
    case "oneofone":
      return (
        <svg viewBox="0 0 40 40" className={cls} fill="none" stroke="currentColor" strokeWidth={sw}>
          <path d="M20 7 L30 15 L26 30 L14 30 L10 15 Z" />
          <path d="M20 7 L20 30 M10 15 L30 15" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

function TrustSection() {
  const marks = [
    { icon: "authentic", label: "Authentic Vintage" },
    { icon: "curated", label: "Carefully Curated" },
    { icon: "secure", label: "Secure Payments" },
    { icon: "gift", label: "Luxury Gift Packaging" },
    { icon: "artisan", label: "Artisan Handled" },
    { icon: "oneofone", label: "One of One, Forever" },
  ];
  return (
    <section className="relative px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: EASE }}
          className="font-display text-2xl italic leading-relaxed text-cream/90 sm:text-3xl"
        >
          Quiet, careful, real. Five hundred pieces rehomed,
          <br className="hidden sm:block" /> each with its papers, each packed like a letter.
        </motion.p>

        <Ornament />

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4, ease: EASE }}
          className="mx-auto grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
        >
          {marks.map((m, i) => (
            <motion.li
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08, ease: EASE }}
              className="flex flex-col items-center gap-3"
            >
              <EngravedMark name={m.icon} />
              <span className="small-caps text-[11px] tracking-[0.26em] text-haze">{m.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------------------- HOW IT WORKS ------------------------------ */
function HowItWorks() {
  const steps = [
    "Find your piece — every one is one of a kind",
    "Checkout in seconds — safe UPI & card payments",
    "We pack it with love — track it on WhatsApp",
  ];
  const romans = ["I", "II", "III"];
  return (
    <section className="px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-2xl">
        <p className="overline-label mb-14 text-center">How the Magic Works</p>
        <ol className="space-y-0">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.2, ease: EASE }}
              className="flex items-baseline gap-6 border-b border-gold/15 py-8 first:border-t"
            >
              <span className="font-display text-2xl italic text-gold/70">{romans[i]}.</span>
              <p className="font-display text-xl italic leading-snug text-cream/90 sm:text-2xl">{s}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------- CUSTOMER LETTERS --------------------------- */
function Letters() {
  const letters = [
    { by: "Priya, Mumbai", text: "opened the box on a train. actually gasped. it feels like it always belonged to me." },
    { by: "Meher, Delhi", text: "packaged like a love letter. wearing my ring every single day since." },
    { by: "Ananya, Bangalore", text: "the lore card made me cry a little. i love that i know its story now." },
  ];
  const scatter = [
    "sm:col-span-5 sm:col-start-1 sm:mt-16 rotate-imperfect-1",
    "sm:col-span-5 sm:col-start-5 sm:-mt-6 rotate-imperfect-2 sm:z-10",
    "sm:col-span-5 sm:col-start-8 sm:mt-24 rotate-imperfect-3",
  ];
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-16"
        >
          <p className="overline-label">Letters</p>
          <h2 className="display-xl mt-6 text-5xl sm:text-7xl">From the Desk Drawer.</h2>
        </motion.div>

        {/* letters left lying on a desk, overlapping */}
        <div className="grid gap-10 sm:grid-cols-12 sm:gap-0">
          {letters.map((l, i) => (
            <motion.div
              key={l.by}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.25, ease: EASE }}
              className={`paper deckle relative p-7 sm:p-8 ${scatter[i]} ${i === 1 ? "shadow-2xl" : ""}`}
            >
              {/* paper clip */}
              <svg viewBox="0 0 20 44" className="absolute -top-3 left-6 h-10 w-5 text-haze/70" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14 6 v26 a4 4 0 0 1-8 0 V10 a2.5 2.5 0 0 1 5 0 v20" />
              </svg>
              <div className="wax-seal absolute -right-2 -top-2 grid h-10 w-10 place-items-center small-caps font-display text-[10px]">ll</div>
              <div className="mb-3 text-sm tracking-[0.3em] text-[#8a6a2e]">★★★★★</div>
              <p className="font-type text-[14px] leading-relaxed text-ink">"{l.text}"</p>
              <p className="mt-5 font-hand text-xl text-wood">— {l.by}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- WHATSAPP OPT-IN ---------------------------- */
function WhatsAppOptIn() {
  const [sent, setSent] = useState(false);
  return (
    <section className="px-6 py-32 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }}
        className="mx-auto max-w-md"
      >
        {/* an invitation card, not a signup form */}
        <div className="gold-frame relative bg-panel/60 px-8 py-12 text-center backdrop-blur-sm sm:px-12">
          <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/60" />
          <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-gold/60" />
          <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/60" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/60" />

          <p className="overline-label">An Invitation</p>
          <h2 className="mt-5 font-display text-3xl italic text-cream sm:text-4xl">
            Be the First to Know 🤍
          </h2>
          <p className="mt-4 font-hand text-xl text-cream/70">
            a whisper on WhatsApp when a new chapter opens.
          </p>

          {sent ? (
            <p className="mt-10 font-hand text-2xl text-candle animate-flicker">
              you're on the list. we'll write soon. ✦
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-10 space-y-6 text-left"
            >
              <input required placeholder="your name" className="field-line" />
              <input required type="tel" placeholder="whatsapp number" className="field-line" />
              <button type="submit" className="btn-seal-plaque mt-4 w-full">
                Notify Me
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

/* ----------------------------- ABOUT STRIP ----------------------------- */
function AboutStrip() {
  return (
    <section
      className="relative overflow-hidden px-6 py-36 sm:px-12"
      style={{ background: "linear-gradient(180deg, rgba(74,53,86,0.25), rgba(22,15,23,1))" }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <p className="overline-label">The Lore of Lychee</p>
          <p className="mt-10 font-display text-3xl italic leading-snug text-cream sm:text-5xl">
            We look for the pieces that carry a life inside them.
            <span className="text-haze"> What we can't tell you, they will — quietly, over years.</span>
          </p>
          <p className="mt-10 font-hand text-3xl text-candle">{copy.aboutLine}</p>
        </motion.div>

        {/* polaroids scattered as if pulled from a drawer */}
        <div className="mt-20 flex flex-wrap items-start justify-center gap-2 sm:gap-0">
          {[0, 1, 2, 3].map((i) => (
            <motion.a
              key={i}
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.15, ease: EASE }}
              className={`block bg-parchment p-2 pb-9 shadow-xl ${["rotate-imperfect-1 sm:mt-6", "rotate-imperfect-4 sm:-ml-4", "rotate-imperfect-2 sm:mt-10 sm:-ml-3", "rotate-imperfect-3 sm:-ml-5"][i]}`}
            >
              <div
                className="h-28 w-28"
                style={{ background: `radial-gradient(circle at ${30 + i * 10}% 30%, ${["#B0788A", "#D4A65A", "#8C6B72", "#E8DCC5"][i]}, #160F17)` }}
              />
              <p className="mt-2 text-center font-hand text-base text-wood">
                {["moon", "letter", "jar", "rose"][i]}
              </p>
            </motion.a>
          ))}
        </div>

        <p className="mt-10 text-center font-type text-xs small-caps tracking-[0.3em] text-gold">
          @lychee._.lore
        </p>

        {/* mystery jar — a glow in the dark, not a banner */}
        <div className="mt-20 text-center">
          <Link to="/mystery-jar" className="group inline-flex flex-col items-center gap-2">
            <span className="flex flex-col items-center">
              {/* cork lid */}
              <div className="h-2.5 w-6 rounded-t-sm bg-wood/80 transition-transform duration-500 group-hover:-translate-y-1" />
              {/* neck */}
              <div className="h-1.5 w-7 bg-panel/40 border-x border-gold/40 backdrop-blur" />
              {/* body */}
              <span className="relative block h-16 w-14 rounded-b-3xl rounded-t-xl border border-gold/40 bg-panel/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] transition-shadow duration-500 group-hover:shadow-[inset_0_0_20px_rgba(212,166,90,0.2)]">
                {[...Array(4)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-candle animate-twinkle"
                    style={{ left: `${22 + ((i * 19) % 55)}%`, top: `${22 + ((i * 23) % 55)}%`, animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </span>
            </span>
            <span className="link-quiet mt-2 text-lg text-candle">Enter the Mystery Jar</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
