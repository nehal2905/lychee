import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { mysteryJar, mysteryJarPrice } from "@/lib/brand.config";
import { WaxSeal } from "@/components/WaxSeal";
export const Route = createFileRoute("/mystery-jar")({ component: MysteryJar });

/** slower than the main archive — this room moves like breath */
const EASE = [0.22, 1, 0.36, 1] as const;
const SLOW = 1.8;
const SLOWER = 2.4;

function MysteryJar() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [sealing, setSealing] = useState(false);

  const sealFate = () => {
    if (sealing) return;
    setSealing(true);
    window.setTimeout(() => {
      void navigate({ to: "/checkout" });
    }, reduce ? 600 : 2200);
  };

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse 85% 55% at 50% 18%, rgba(72,48,62,0.28), transparent 55%), #1A1416",
      }}
    >
      <EntryRitual />
      <Promises />
      <RitualForm onSeal={sealFate} sealing={sealing} />
      <PastJars />
      <PageClose />

      <AnimatePresence>
        {sealing && <WaxSealStamp />}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   ENTRY — near-darkness, the jar, letter-by-letter invitation
   ============================================================ */

function EntryRitual() {
  const reduce = useReducedMotion();
  const [lineDone, setLineDone] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-10 sm:px-10">
      {/* vignette stays in the entry only — never covers the cards below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 42%, transparent 35%, rgba(10,5,8,0.72) 100%)",
        }}
      />

      <TypeLine
        text={mysteryJar.entryLine}
        className="relative z-[1] max-w-md text-center font-display text-[1.35rem] italic leading-snug text-cream sm:text-2xl"
        delayMs={reduce ? 0 : 400}
        onDone={() => setLineDone(true)}
      />

      <motion.p
        className="relative z-[1] mt-5 max-w-xs text-center font-type text-[10px] tracking-[0.22em] text-cream/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: lineDone || reduce ? 1 : 0 }}
        transition={{ duration: SLOW, ease: EASE, delay: 0.2 }}
      >
        {mysteryJar.subLine}
      </motion.p>

      <div className="relative z-[1] mt-10 w-full max-w-[300px] sm:max-w-[340px]">
        <LivingJar />
      </div>

      <motion.p
        className="relative z-[1] mt-10 small-caps text-[10px] tracking-[0.34em] text-gold/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: SLOWER, delay: reduce ? 0 : 2.8, ease: EASE }}
      >
        Wake the Jar
      </motion.p>
    </section>
  );
}

function TypeLine({
  text,
  className,
  delayMs = 0,
  onDone,
}: {
  text: string;
  className?: string;
  delayMs?: number;
  onDone?: () => void;
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text.length : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      setShown(text.length);
      doneRef.current?.();
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) {
          clearInterval(interval);
          doneRef.current?.();
        }
      }, 42);
    }, delayMs);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, delayMs, reduce]);

  return (
    <p className={className} aria-label={text}>
      {text.slice(0, shown)}
      {shown < text.length && (
        <span className="ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.1em] bg-candle/70 animate-flicker" />
      )}
    </p>
  );
}

/* ============================================================
   THE JAR — glow, swirl, shake / tilt whispers, 7-tap easter
   ============================================================ */

function LivingJar() {
  const reduce = useReducedMotion();
  const [awake, setAwake] = useState(false);
  const [trembling, setTrembling] = useState(false);
  const [whisper, setWhisper] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);
  const [tagFlipped, setTagFlipped] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const whisperTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastShake = useRef(0);

  const revealWhisper = useCallback(() => {
    const next =
      mysteryJar.whispers[Math.floor(Math.random() * mysteryJar.whispers.length)] ??
      mysteryJar.whispers[0];
    setWhisper(next);
    setTrembling(true);
    window.setTimeout(() => setTrembling(false), 700);
    if (whisperTimer.current) clearTimeout(whisperTimer.current);
    whisperTimer.current = setTimeout(() => setWhisper(null), 2000);
  }, []);

  const wake = useCallback(() => {
    setAwake(true);
    if (reduce) return;
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 45 + Math.random() * 35,
    }));
    setSparkles(burst);
    window.setTimeout(() => setSparkles([]), 1600);
  }, [reduce]);

  const onJarActivate = () => {
    wake();
    const next = taps + 1;
    setTaps(next);
    if (next >= 7 && !tagFlipped) setTagFlipped(true);
  };

  // device shake / tilt — graceful no-op when unsupported
  useEffect(() => {
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) + Math.abs(a.z ?? 0);
      const now = Date.now();
      if (mag > 28 && now - lastShake.current > 1600) {
        lastShake.current = now;
        wake();
        revealWhisper();
      }
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [wake, revealWhisper]);

  useEffect(
    () => () => {
      if (whisperTimer.current) clearTimeout(whisperTimer.current);
    },
    [],
  );

  const requestTilt = async () => {
    try {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof DOE.requestPermission === "function") {
        await DOE.requestPermission();
      }
    } catch {
      /* unsupported — shake button remains */
    }
    revealWhisper();
    wake();
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <AnimatePresence>
        {whisper && (
          <motion.p
            key={whisper}
            className="absolute -top-10 left-1/2 z-30 w-[min(90vw,20rem)] -translate-x-1/2 text-center font-hand text-xl leading-snug text-candle drop-shadow-[0_0_15px_rgba(212,166,90,0.6)] sm:text-2xl"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            {whisper}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Wake the mystery jar"
        className="relative mx-auto block w-full max-w-[300px] cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
        onClick={onJarActivate}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) wake();
        }}
        onMouseLeave={() => setAwake(false)}
        animate={
          trembling
            ? { x: [0, -5, 5, -4, 3, 0], rotate: [0, -1.5, 1.5, -1, 0.5, 0] }
            : { x: 0, rotate: 0 }
        }
        transition={{ duration: 0.65, ease: EASE }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-[10%] bottom-[6%] top-[18%] z-0 rounded-[50%]"
          animate={{
            opacity: awake ? [0.55, 0.9, 0.6] : [0.3, 0.5, 0.35],
            scale: awake ? [1, 1.08, 1.02] : [1, 1.03, 1],
          }}
          transition={{ duration: awake ? 2.2 : 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(212,166,90,0.5), rgba(184,148,90,0.1) 55%, transparent 72%)",
            filter: "blur(8px)",
          }}
        />

        <img
          src="/mystery-jar-cutout.png?v=1"
          alt="A glowing glass mystery jar of fairy lights and moss, kraft tag marked ?"
          className="relative z-[1] w-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]"
          style={{ aspectRatio: "3 / 4" }}
          draggable={false}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 38% 42% at 48% 52%, rgba(212,166,90,0.32), transparent 65%)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: awake ? [0.45, 0.85, 0.55] : [0.2, 0.4, 0.25] }}
          transition={{ duration: awake ? 2 : 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduce &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={`ff-${i}`}
              aria-hidden
              className="pointer-events-none absolute z-[3] h-1 w-1 rounded-full bg-candle"
              style={{
                left: `${32 + ((i * 37) % 36)}%`,
                top: `${36 + ((i * 29) % 38)}%`,
                boxShadow: "0 0 8px rgba(212,166,90,0.85)",
              }}
              animate={{
                x: awake ? [0, (i % 2 ? 8 : -8), 0] : [0, i % 2 ? 2 : -2, 0],
                y: awake ? [0, -12 - (i % 4) * 2, 0] : [0, -3, 0],
                opacity: awake ? [0.35, 1, 0.45] : [0.15, 0.5, 0.2],
              }}
              transition={{
                duration: awake ? 2.4 + (i % 3) * 0.4 : 5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}

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

        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              aria-hidden
              className="pointer-events-none absolute z-[4] font-display text-[10px] text-gold"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: -36, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              ✦
            </motion.span>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {tagFlipped && (
            <motion.div
              key="easter-tag"
              className="absolute bottom-[28%] right-[4%] z-[5] flex h-12 w-[70px] items-center justify-center px-1 text-center sm:right-[6%]"
              style={{
                background: "linear-gradient(165deg, #d8c4a0, #c4a87a 70%, #b8945a55)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                rotate: "8deg",
              }}
              initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="font-hand text-[11px] leading-tight text-ink">
                {mysteryJar.tagEaster}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <button
        type="button"
        onClick={() => void requestTilt()}
        className="mt-6 small-caps text-[10px] tracking-[0.32em] text-cream/40 underline decoration-gold/30 underline-offset-4 transition-colors duration-700 hover:text-gold/70"
      >
        Shake the Jar
      </button>
    </div>
  );
}

/* ============================================================
   PROMISES — three parchment cards, scroll-revealed
   ============================================================ */

function Promises() {
  return (
    <section className="relative z-[1] px-5 py-20 sm:px-10">
      <div className="mx-auto max-w-lg">
        <p className="overline-label text-center text-gold/60">What the Jar Promises</p>
        <div className="mt-12 space-y-6">
          {mysteryJar.promises.map((p, i) => (
            <PromiseCard key={p.title} index={i} title={p.title} body={p.body} icon={p.icon} />
          ))}
        </div>
        <p className="mt-12 text-center small-caps text-[10px] tracking-[0.28em] text-gold/55">
          {mysteryJar.promiseStrip}
        </p>
      </div>
    </section>
  );
}

function PromiseCard({
  title,
  body,
  icon,
  index,
}: {
  title: string;
  body: string;
  icon: "chosen" | "sealed" | "unique";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="paper deckle relative px-7 py-8 sm:px-9"
      style={{ rotate: index === 1 ? -0.8 : index === 2 ? 0.6 : -0.3 }}
      initial={reduce ? false : { opacity: 0, y: 28, rotateX: 12 }}
      animate={
        inView || reduce
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 28, rotateX: 12 }
      }
      transition={{ duration: SLOWER, delay: index * 0.18, ease: EASE }}
    >
      <div className="mb-4 text-wood/70">
        <PromiseIcon kind={icon} />
      </div>
      <h3 className="font-display text-xl italic text-ink sm:text-2xl">{title}</h3>
      <p className="mt-3 font-serif text-sm leading-relaxed text-ink/80">{body}</p>
    </motion.div>
  );
}

function PromiseIcon({ kind }: { kind: "chosen" | "sealed" | "unique" }) {
  if (kind === "chosen") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M18 20 v10 M12 26 h12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 8 Q18 4 28 8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }
  if (kind === "sealed") {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect x="6" y="8" width="24" height="20" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M18 15.5 v5 M16 18 h4" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <path d="M18 6 l3 9 h9 l-7.5 5.5 3 9L18 24 l-7.5 5.5 3-9L6 15 h9 z" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}

/* ============================================================
   THE RITUAL + SEAL YOUR FATE
   ============================================================ */

function RitualForm({ onSeal, sealing }: { onSeal: () => void; sealing: boolean }) {
  const [style, setStyle] = useState<(typeof mysteryJar.styles)[number]>("Surprise me");
  const [size, setSize] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [soul, setSoul] = useState("");
  const showRing = style === "Rings";

  return (
    <section className="relative z-[1] px-5 py-16 sm:px-10">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="overline-label text-gold/60">The Ritual</p>
          <h2 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">An Order Slip.</h2>
          <p className="mt-3 font-hand text-lg text-cream/65">fill it as you would a quiet wish</p>
        </div>

        <form
          className="paper deckle fold-corner relative mt-12 space-y-9 px-7 py-10 sm:px-10"
          onSubmit={(e) => {
            e.preventDefault();
            onSeal();
          }}
        >
          <p className="font-type text-[10px] small-caps tracking-[0.34em] text-wood">
            Apothecary Order — Mystery Jar
          </p>

          <fieldset>
            <legend className="mb-3 block font-display text-base italic text-ink">
              What calls to you?
            </legend>
            <div className="flex flex-wrap gap-2">
              {mysteryJar.styles.map((s) => {
                const on = style === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className={`rounded-sm border px-3 py-2 font-type text-[11px] tracking-[0.14em] transition-colors duration-500 ${
                      on
                        ? "border-wood/60 bg-wood/15 text-ink"
                        : "border-wood/25 text-ink/55 hover:border-wood/45 hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {showRing && (
              <motion.label
                className="block"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <span className="mb-1 block font-display text-base italic text-ink">
                  Your measure, if rings whisper to you
                </span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="field-line-ink appearance-none"
                >
                  <option value="">optional — leave blank if unsure</option>
                  {mysteryJar.ringSizes.map((s) => (
                    <option key={s} value={s}>
                      US {s}
                    </option>
                  ))}
                </select>
              </motion.label>
            )}
          </AnimatePresence>

          <label className="block">
            <span className="mb-1 block font-display text-base italic text-ink">
              Where the ravens deliver
            </span>
            <input
              required
              type="tel"
              inputMode="tel"
              placeholder="WhatsApp number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="field-line-ink"
            />
          </label>

          <label className="block">
            <span className="mb-1 block font-display text-base italic text-ink">
              A word about your soul{" "}
              <span className="font-serif text-xs not-italic text-ink/45">(optional)</span>
            </span>
            <input
              type="text"
              placeholder="a color you love, an era you dream of…"
              value={soul}
              onChange={(e) => setSoul(e.target.value)}
              className="field-line-ink"
            />
          </label>

          {/* Seal Your Fate */}
          <div className="border-t border-wood/20 pt-9 text-center">
            <p className="overline-label !tracking-[0.28em] text-wood/70">Seal Your Fate</p>
            <p className="mt-5 small-caps font-display text-3xl tracking-[0.18em] text-[#8a6a35]">
              ₹{mysteryJarPrice.toLocaleString("en-IN")}
            </p>
            <p className="mt-2 font-type text-[10px] tracking-[0.2em] text-ink/55">
              {mysteryJar.priceLine}
            </p>

            <button
              type="submit"
              disabled={sealing}
              className="btn-seal-plaque relative mt-8 w-full py-5 animate-glowpulse disabled:opacity-70"
            >
              Trust the Universe ✦
            </button>

            <p className="mt-4 font-serif text-[11px] leading-relaxed text-ink/55">
              {mysteryJar.prepNote}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   PAST JARS — horizontal polaroid scroll
   ============================================================ */

function PastJars() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative z-[1] py-16">
      <p className="overline-label px-5 text-center text-gold/70 sm:px-10">
        Jars That Found Their People
      </p>
      <p className="mt-3 px-5 text-center font-hand text-base text-cream/55 sm:px-10">
        swipe · tap a card to read
      </p>

      <div
        className="mt-10 flex gap-5 overflow-x-auto px-5 pb-6 sm:px-10"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {mysteryJar.testimonials.map((t, i) => {
          const active = open === t.name;
          return (
            <motion.button
              key={t.name}
              type="button"
              onClick={() => setOpen(active ? null : t.name)}
              className="relative w-[210px] shrink-0 border-0 bg-transparent p-0 text-left sm:w-[230px]"
              style={{ scrollSnapAlign: "start", rotate: `${i % 2 === 0 ? -2.2 : 1.8}deg` }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: active ? -8 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div
                className="relative px-3 pb-8 pt-3"
                style={{
                  background: "linear-gradient(175deg, #efe4cc, #e0d0ad)",
                  boxShadow: active
                    ? "0 18px 40px rgba(0,0,0,0.55), 0 0 24px rgba(212,166,90,0.18)"
                    : "0 12px 28px rgba(0,0,0,0.45)",
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#120C0F]">
                  <img
                    src="/mystery-jar-cutout.png?v=1"
                    alt=""
                    className="h-full w-full object-cover object-[50%_40%] opacity-90"
                    style={{ filter: active ? "brightness(0.95)" : "brightness(0.72)" }}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,4,6,0.55))]" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-[20%] bottom-[18%] top-[30%]"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 55%, rgba(212,166,90,0.35), transparent 65%)",
                      mixBlendMode: "screen",
                    }}
                    animate={{ opacity: [0.35, 0.7, 0.4] }}
                    transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <WaxSeal size={52} className="absolute -right-1 top-6 z-[4]" rotate={-12} />

                <p className="mt-4 font-hand text-[15px] leading-snug text-ink/90">
                  “{t.quote}”
                </p>
                <p className="mt-2 font-type text-[9px] tracking-[0.2em] text-ink/50">— {t.name}</p>

                <AnimatePresence>
                  {active && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="mt-3 border-t border-wood/20 pt-3 font-serif text-[11px] leading-relaxed text-ink/70"
                    >
                      Her jar arrived sealed in wax. She kept the kraft tag in her journal.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </section>
  );
}

/* ============================================================
   CLOSE + WAX SEAL OVERLAY
   ============================================================ */

function PageClose() {
  return (
    <section className="relative z-[1] px-5 pb-20 pt-8 text-center sm:px-10">
      <p className="mx-auto max-w-md font-display text-xl italic leading-relaxed text-cream/80 sm:text-2xl">
        {mysteryJar.closeLine}
      </p>
      <Link
        to="/"
        className="mt-8 inline-block small-caps text-[11px] tracking-[0.3em] text-gold underline underline-offset-4 transition-colors duration-700 hover:text-candle"
      >
        Return to the Archive
      </Link>
    </section>
  );
}

function WaxSealStamp() {
  return (
    <motion.div
      className="fixed inset-0 z-[180] grid place-items-center bg-[#0a0507]/75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 2.2, y: -80, opacity: 0.3 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <WaxSeal size={168} rotate={-6} />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          initial={{ boxShadow: "0 0 0 0 rgba(176,120,138,0)" }}
          animate={{ boxShadow: "0 0 0 28px rgba(176,120,138,0)" }}
          transition={{ duration: 0.9, delay: 0.35 }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-[22%] font-hand text-xl text-cream/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        the universe is choosing…
      </motion.p>
    </motion.div>
  );
}
