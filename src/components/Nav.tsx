import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { brand } from "@/lib/brand.config";
import { useStore } from "@/lib/store";
import { KeysProgress } from "./EasterEggs";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { cart, setCartOpen } = useStore();
  const router = useRouter();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onSubpage = pathname !== "/";

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else navigate({ to: "/" });
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "linear-gradient(180deg, rgba(22,15,23,0.9), rgba(22,15,23,0.4))" }}
      >
        <div className="mx-auto relative flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            {/* on any inner page, the way back is always one tap away */}
            {onSubpage && (
              <button aria-label="Go back" onClick={goBack} className="p-1 text-gold transition-colors duration-500 hover:text-candle">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                  <path d="M14.5 5.5 L8 12 l6.5 6.5" />
                </svg>
              </button>
            )}
            {/* three uneven hand-ruled lines */}
            <button aria-label="Menu" onClick={() => setOpen(true)} className="group p-1 text-gold">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                <path d="M4 7.2 h15" />
                <path d="M4 12 h11" />
                <path d="M4 16.8 h13" className="transition-all duration-700 group-hover:opacity-60" />
              </svg>
            </button>
          </div>

          <Link to="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-center font-display text-lg italic lowercase leading-none text-cream sm:text-xl">
            <img src="/logo.png?v=1" alt="" className="h-6 w-6 rounded-full object-cover sm:h-8 sm:w-8" />
            {brand.name}
          </Link>

          <div className="flex items-center gap-4">
            {/* exit — from any inner page, one tap returns to the entrance */}
            {onSubpage && (
              <Link
                to="/"
                aria-label="Exit to home"
                className="font-display text-xl leading-none text-gold/70 transition-colors duration-500 hover:text-candle"
              >
                ×
              </Link>
            )}
            <div className="hidden sm:block">
              <KeysProgress />
            </div>
            <Link to="/wishlist" aria-label="Wishlist" className="font-display text-lg leading-none text-gold/80 transition-colors duration-500 hover:text-candle">
              ✧
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative text-gold" aria-label="Cart">
              {/* a small keepsake box */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.1">
                <rect x="4" y="10" width="16" height="9" />
                <path d="M4 10 l2 -4 h12 l2 4" />
                <path d="M10 14 h4" strokeLinecap="round" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-oxblood font-serif-body text-[9px] text-parchment">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
        <span className="hairline block w-full opacity-50" />
      </header>

      {/* the drawer — an antique one, sliding open */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[130] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-80 max-w-[85vw] flex-col bg-panel px-9 py-10"
              style={{
                boxShadow: "12px 0 50px rgba(0,0,0,0.75)",
                borderRight: "1px solid rgba(184,148,90,0.35)",
              }}
            >
              <p className="overline-label">The Drawer</p>
              <span className="hairline mt-4 w-16" />

              <nav className="mt-10 flex flex-col gap-7 font-display text-2xl italic text-cream">
                <Link onClick={() => setOpen(false)} to="/" className="transition-colors duration-500 hover:text-candle">Home</Link>
                <Link onClick={() => setOpen(false)} to="/mystery-jar" className="text-candle">
                  The Mystery Jar <span className="animate-flicker text-sm">✦</span>
                </Link>
                <Link onClick={() => setOpen(false)} to="/lore" className="transition-colors duration-500 hover:text-candle">The Lore Library</Link>
                <Link onClick={() => setOpen(false)} to="/wishlist" className="transition-colors duration-500 hover:text-candle">Wishlist</Link>
                <Link onClick={() => setOpen(false)} to="/faq" className="transition-colors duration-500 hover:text-candle">Questions</Link>
                <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="transition-colors duration-500 hover:text-candle">Instagram</a>
              </nav>

              <div className="mt-auto">
                <span className="hairline w-full opacity-60" />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
