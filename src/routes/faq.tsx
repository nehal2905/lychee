import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({ component: FAQ });

const faqs = [
  { q: "How do I know it's really vintage?", a: "Every piece is hand-authenticated and ships with a small certificate. We date pieces conservatively — if we're not certain of the decade, we tell you." },
  { q: "Shipping?", a: "Worldwide. India: 2–4 days. International: 7–12 days. You'll get a WhatsApp note with tracking the moment it leaves us." },
  { q: "How do I care for it?", a: "Vintage jewellery is delicate. Keep it dry, store it in the pouch we send, and let it be the last thing you put on and the first you take off." },
  { q: "Returns?", a: "Because every piece is one of a kind, all adoptions are final. We help you choose with photos, videos, and honest answers before you buy — always ask us anything." },
  { q: "Can I request a specific style?", a: "Yes — either try the Mystery Jar, or send us a WhatsApp note describing what you're hoping for. We'll write back when a match comes to us." },
];

const romans = ["I", "II", "III", "IV", "V"];

// a page of marginalia — questions in ink, answers written back
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="overline-label">Questions, Honestly Answered</p>
          <h1 className="display-xl mt-6 text-5xl sm:text-7xl">A Small Guide.</h1>
        </motion.div>

        <ul>
          {faqs.map((f, i) => (
            <li key={i} className="border-b border-gold/12 first:border-t">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-baseline gap-5 py-7 text-left"
              >
                <span className="font-display text-lg italic text-gold/60">{romans[i]}.</span>
                <span className="flex-1 font-display text-xl italic text-cream sm:text-2xl">{f.q}</span>
                <span className={`font-display text-lg text-gold transition-transform duration-700 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pl-10 font-serif-body leading-loose text-cream/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-center font-hand text-xl text-haze">
          Anything else — just write to us. We answer everything.
        </p>
      </div>
    </section>
  );
}
