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
  const onWishlist = pathname.startsWith("/wishlist");
  const onHome = pathname === "/";

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else navigate({ to: "/" });
  };

  const drawerCls = (active: boolean) =>
    `relative flex items-center gap-3 pl-3 transition-colors duration-500 ${
      active
        ? "text-candle"
        : "text-cream/55 hover:text-cream"
    }`;

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(180deg, rgba(10,6,11,0.97) 0%, rgba(14,9,16,0.94) 70%, rgba(14,9,16,0.88) 100%)",
          borderBottom: "1px solid rgba(184,148,90,0.18)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.55)",
        }}
      >
        <div className="mx-auto relative flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
          <div className="flex items-center gap-3">
            {onSubpage && (
              <button
                aria-label="Go back"
                onClick={goBack}
                className="-ml-1 p-2 text-gold/75 transition-colors duration-500 hover:text-candle"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M14.5 5.5 L8 12 l6.5 6.5" />
                </svg>
              </button>
            )}
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="group p-1 text-gold/80 transition-colors duration-500 hover:text-candle"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                <path d="M4 7.2 h15" />
                <path d="M4 12 h11" />
                <path d="M4 16.8 h13" className="transition-all duration-700 group-hover:opacity-60" />
              </svg>
            </button>
          </div>

          <Link
            to="/"
            className={`brand-mark group absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5 text-center leading-none ${
              onHome ? "opacity-100" : "opacity-90"
            }`}
            aria-label={brand.name}
            aria-current={onHome ? "page" : undefined}
          >
            <span className="relative">
              <img
                src="/logo.png?v=1"
                alt=""
                className={`h-7 w-7 rounded-full object-cover transition duration-700 sm:h-9 sm:w-9 ${
                  onHome
                    ? "shadow-[0_0_16px_rgba(212,166,90,0.45)]"
                    : "shadow-[0_0_10px_rgba(212,166,90,0.22)] group-hover:shadow-[0_0_18px_rgba(212,166,90,0.4)]"
                }`}
              />
              {onHome && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full animate-glowpulse"
                  style={{ boxShadow: "0 0 14px rgba(212,166,90,0.45)" }}
                />
              )}
            </span>
            <span className="flex flex-col items-start">
              <span className="brand-mark-text font-display text-[1.35rem] italic lowercase tracking-[-0.02em] text-transparent sm:text-[1.65rem]">
                {brand.name}
              </span>
              <span className="mt-0.5 hidden font-type text-[8px] tracking-[0.38em] text-gold/55 small-caps sm:block">
                Collect Beautiful Moments
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {onSubpage && (
              <Link
                to="/"
                aria-label="Exit to home"
                className="p-1 font-display text-3xl leading-none text-gold/55 transition-colors duration-500 hover:text-candle"
              >
                ×
              </Link>
            )}
            <div className="hidden sm:block">
              <KeysProgress />
            </div>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              aria-current={onWishlist ? "page" : undefined}
              className={`relative font-display text-lg leading-none transition-colors duration-500 ${
                onWishlist ? "text-candle" : "text-gold/55 hover:text-candle"
              }`}
              style={
                onWishlist
                  ? { filter: "drop-shadow(0 0 8px rgba(212,166,90,0.55))" }
                  : undefined
              }
            >
              ✧
              {onWishlist && (
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 h-px w-3 -translate-x-1/2 bg-candle"
                />
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-gold/70 transition-colors duration-500 hover:text-candle"
              aria-label="Cart"
            >
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
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-80 max-w-[85vw] flex-col px-9 py-10"
              style={{
                background: "linear-gradient(180deg, #120C0F 0%, #0a060b 100%)",
                boxShadow: "12px 0 50px rgba(0,0,0,0.85)",
                borderRight: "1px solid rgba(184,148,90,0.28)",
              }}
            >
              <p className="overline-label text-gold/60">The Drawer</p>
              <span className="hairline mt-4 w-16" />

              <nav className="mt-10 flex flex-col gap-7 font-display text-2xl italic">
                {(
                  [
                    { to: "/", label: "Home", match: pathname === "/" },
                    {
                      to: "/mystery-jar",
                      label: "The Mystery Jar",
                      match: pathname.startsWith("/mystery-jar"),
                      spark: true,
                    },
                    { to: "/lore", label: "The Lore Library", match: pathname.startsWith("/lore") },
                    { to: "/wishlist", label: "Wishlist", match: pathname.startsWith("/wishlist") },
                    { to: "/faq", label: "Questions", match: pathname.startsWith("/faq") },
                  ] as const
                ).map((item) => (
                  <Link
                    key={item.to}
                    onClick={() => setOpen(false)}
                    to={item.to}
                    className={drawerCls(item.match)}
                    aria-current={item.match ? "page" : undefined}
                  >
                    {item.match && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-candle"
                        style={{ boxShadow: "0 0 10px rgba(212,166,90,0.7)" }}
                      />
                    )}
                    {item.match && (
                      <span className="text-base not-italic leading-none text-candle">✦</span>
                    )}
                    {item.label}
                    {"spark" in item && item.spark && (
                      <span className="animate-flicker text-sm text-candle/80">✦</span>
                    )}
                  </Link>
                ))}
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={drawerCls(false)}
                >
                  Instagram
                </a>
              </nav>

              <div className="mt-auto">
                <span className="hairline w-full opacity-40" />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
