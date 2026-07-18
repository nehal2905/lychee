import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { loreEntries, type LoreType } from "@/lib/lore";
import { WaxSeal } from "@/components/WaxSeal";
export const Route = createFileRoute("/lore")({ component: LoreLibrary });

const EASE = [0.22, 1, 0.36, 1] as const;

type Filter = "all" | LoreType;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "letter", label: "Letters" },
  { key: "poem", label: "Poems" },
  { key: "fragment", label: "Fragments" },
];

const typeLabel: Record<LoreType, string> = {
  letter: "a letter",
  poem: "a poem",
  fragment: "a fragment",
};

// a reading room, not a shop — the archive's letters, poems, and fragments
function LoreLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const entries = loreEntries.filter((e) => filter === "all" || e.type === filter);
  const tilts = ["rotate-imperfect-1", "rotate-imperfect-3", "rotate-imperfect-2", "", "rotate-imperfect-4", ""];

  return (
    <section className="px-5 py-20 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-14"
        >
          <p className="overline-label">The Lore Library</p>
          <h1 className="display-xl mt-6 text-5xl sm:text-7xl">The Reading Room.</h1>
          <div className="mt-8 flex items-end gap-6">
            <span className="hairline w-24 sm:w-40" />
            <p className="max-w-sm font-hand text-xl text-cream/65">
              Letters, poems, and fragments that arrived with the pieces. Sit awhile.
            </p>
          </div>
          {/* a tiny sage sprig — the only green in the whole archive */}
          <svg viewBox="0 0 80 24" className="mt-6 h-5 w-16 opacity-50" aria-hidden>
            <path d="M4 20 Q30 10 76 6" stroke="#8D9B7B" strokeWidth="0.8" fill="none" />
            {[14, 28, 42, 56].map((x, i) => (
              <ellipse key={x} cx={x} cy={16 - i * 2.4} rx="4" ry="1.6" fill="#8D9B7B" opacity="0.7" transform={`rotate(${-24 - i * 4} ${x} ${16 - i * 2.4})`} />
            ))}
          </svg>
        </motion.div>

        {/* filters — index tabs in a card drawer */}
        <div className="mb-14 flex flex-wrap gap-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`small-caps pb-1.5 text-xs tracking-[0.3em] transition-colors duration-500 ${
                filter === f.key ? "border-b border-gold text-gold" : "border-b border-transparent text-haze hover:text-cream"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* the cards, laid out like papers on a desk */}
        <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {entries.map((e, i) => (
              <motion.article
                layout
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: EASE }}
                className={`paper-crushed deckle fold-corner relative p-7 sm:p-9 ${tilts[i % tilts.length]} ${e.type === "poem" ? "text-center" : ""}`}
              >
                <p className="relative z-[1] font-type text-[9px] small-caps tracking-[0.3em] text-wood/80">{typeLabel[e.type]}</p>
                <h2 className="ink-hand relative z-[1] mt-3 text-[1.85rem] text-[#152032]">{e.title}</h2>
                <p className={`ink-hand relative z-[1] mt-4 whitespace-pre-line text-[1.45rem] leading-[1.5] ${e.type === "poem" ? "text-[1.55rem]" : ""}`}>
                  {e.text}
                </p>
                {e.signoff && <p className="ink-hand relative z-[1] mt-5 text-2xl text-[#3a2a1c]">{e.signoff}</p>}
                {e.type === "letter" && (
                  <WaxSeal size={46} className="absolute -right-3 -top-3 z-[2]" rotate={-14} />
                )}
                {e.type === "fragment" && (
                  <svg viewBox="0 0 20 44" className="absolute -top-3 right-8 h-9 w-4 text-haze/60" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M14 6 v26 a4 4 0 0 1-8 0 V10 a2.5 2.5 0 0 1 5 0 v20" />
                  </svg>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-20 text-center font-hand text-xl text-haze">
          Every piece that leaves us takes its page along. These are copies, kept for the room.
        </p>
      </div>
    </section>
  );
}
