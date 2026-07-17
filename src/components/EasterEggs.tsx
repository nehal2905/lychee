import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { easterEggs } from "@/lib/brand.config";

type KeyName = "moon" | "locket" | "butterfly";
const content: Record<KeyName, { title: string; subtitle: string; desc: string }> = {
  moon: {
    title: "You found the moon. 🌙",
    subtitle: "Early access to the next drop.",
    desc: "Use this code at checkout for early access.",
  },
  locket: {
    title: "You found the locket. 🗝️",
    subtitle: "A secret piece, only for the curious…",
    desc: "Use this code at checkout to reveal it.",
  },
  butterfly: {
    title: "You found the butterfly. 🦋",
    subtitle: "The butterfly likes you.",
    desc: "Use this code at checkout for free shipping.",
  },
};

export function EasterEggModal({
  keyName,
  open,
  onClose,
  extra,
}: {
  keyName: KeyName;
  open: boolean;
  onClose: () => void;
  extra?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const data = content[keyName];
  const code = easterEggs[keyName].code;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#110C0E]/95 p-6 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[340px] text-center flex flex-col items-center"
          >
            <h3 className="font-display text-2xl text-cream sm:text-3xl">{data.title}</h3>
            <p className="mt-3 font-type text-sm text-cream/70 sm:text-base">{data.subtitle}</p>

            <div className="paper deckle relative mt-8 w-full p-8 py-10 shadow-2xl">
              {/* ornate inner border */}
              <div className="absolute inset-2 border-[0.5px] border-ink/20 pointer-events-none" />
              {/* corner flourishes */}
              <svg className="absolute top-1 left-1 h-6 w-6 text-ink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M 12 2 C 12 7 7 12 2 12 C 7 12 12 17 12 22 C 12 17 17 12 22 12 C 17 12 12 7 12 2 Z" fill="currentColor" opacity="0.3"/></svg>
              <svg className="absolute top-1 right-1 h-6 w-6 text-ink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M 12 2 C 12 7 7 12 2 12 C 7 12 12 17 12 22 C 12 17 17 12 22 12 C 17 12 12 7 12 2 Z" fill="currentColor" opacity="0.3"/></svg>
              <svg className="absolute bottom-1 left-1 h-6 w-6 text-ink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M 12 2 C 12 7 7 12 2 12 C 7 12 12 17 12 22 C 12 17 17 12 22 12 C 17 12 12 7 12 2 Z" fill="currentColor" opacity="0.3"/></svg>
              <svg className="absolute bottom-1 right-1 h-6 w-6 text-ink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M 12 2 C 12 7 7 12 2 12 C 7 12 12 17 12 22 C 12 17 17 12 22 12 C 17 12 12 7 12 2 Z" fill="currentColor" opacity="0.3"/></svg>

              <h4 className="font-display text-3xl uppercase tracking-[0.1em] text-ink">{code}</h4>
              <p className="mx-auto mt-4 max-w-[200px] font-type text-[13px] leading-relaxed text-ink/80">{data.desc}</p>
              
              <button
                onClick={handleCopy}
                className="mt-8 rounded-sm bg-panel px-8 py-3 font-type text-xs uppercase tracking-[0.15em] text-cream transition-colors hover:bg-black"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <p className="mt-12 font-type text-sm text-cream/70">Thank you for being part of the lore.</p>

            <button
              onClick={onClose}
              className="mt-12 font-type text-[10px] tracking-[0.3em] small-caps text-haze/60 underline underline-offset-4 hover:text-haze"
            >
              fold it away
            </button>
            {extra}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AllThreeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160] grid place-items-center bg-black/85 p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onClick={onClose}
        >
          {[...Array(30)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-candle"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                opacity: 0,
              }}
              transition={{ duration: 2.4, delay: i * 0.03 }}
            />
          ))}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="paper deckle relative max-w-md p-11 text-center"
          >
            <div className="mb-3 text-xl tracking-[0.5em] text-[#8a6a2e]">✦ ✦ ✦</div>
            <h3 className="font-display text-3xl italic text-ink">You found all three secrets.</h3>
            <p className="mt-4 font-serif-body text-ink/80">You're one of us now. 🤍</p>
            <span className="mx-auto mt-5 block h-px w-20 bg-wood/30" />
            <p className="mt-5 font-type text-sm text-wood">
              Use <span className="small-caps text-ink">{easterEggs.allThree.code}</span> for a
              little something extra on your next drop.
            </p>
            <button onClick={onClose} className="mt-7 font-type text-[10px] tracking-[0.3em] small-caps text-wood underline underline-offset-4">
              fold it away
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function KeysProgress() {
  const { keys } = useStore();
  const found = [keys.moon, keys.locket, keys.butterfly].filter(Boolean).length;
  return (
    <div className="flex items-center gap-1.5" title={`${found}/3 secrets found`}>
      {(["moon", "locket", "butterfly"] as KeyName[]).map((k) => (
        <span
          key={k}
          className={`text-xs transition-colors duration-700 ${keys[k] ? "text-gold animate-twinkle" : "text-gold/20"}`}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

// Small utility to open easter egg modals with completion detection
export function useEasterEgg() {
  const { keys, findKey } = useStore();
  const [openKey, setOpenKey] = useState<KeyName | null>(null);
  const [allOpen, setAllOpen] = useState(false);

  const trigger = (k: KeyName) => {
    const wasFound = keys[k];
    findKey(k);
    setOpenKey(k);
    if (!wasFound) {
      // check for all three after
      setTimeout(() => {
        const next = { ...keys, [k]: true };
        if (next.moon && next.locket && next.butterfly) setAllOpen(true);
      }, 2200);
    }
  };

  const modals = (
    <>
      <EasterEggModal keyName={openKey ?? "moon"} open={openKey !== null} onClose={() => setOpenKey(null)} />
      <AllThreeModal open={allOpen} onClose={() => setAllOpen(false)} />
    </>
  );

  return { trigger, modals };
}
