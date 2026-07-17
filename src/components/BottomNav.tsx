import { Link, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

// fixed bottom navigation for one-handed mobile use.
// antique gold on near-black plum; the active page glows like a candle.
export function BottomNav() {
  const { setCartOpen, cart } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const itemCls = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors duration-500 ${
      active ? "text-candle" : "text-gold/70"
    }`;
  const glow = (active: boolean) =>
    active ? { filter: "drop-shadow(0 0 8px rgba(212,166,90,0.55))" } : undefined;

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-panel/95 backdrop-blur md:hidden"
      style={{ borderTop: "1px solid rgba(184,148,90,0.3)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch">
        <Link to="/" className={itemCls(pathname === "/")} style={glow(pathname === "/")}>
          {/* home — an arched window */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 20 V11 a7 7 0 0 1 14 0 v9" />
            <path d="M3 20 h18" />
            <path d="M12 20 v-5" />
          </svg>
          <span className="small-caps text-[9px] tracking-[0.22em]">Home</span>
        </Link>

        <Link to="/" hash="drop" className={itemCls(false)}>
          {/* shop — a faceted gem */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
            <path d="M7.5 4.5 h9 L21 9.5 L12 20.5 L3 9.5 Z" />
            <path d="M3 9.5 h18 M7.5 4.5 L10 9.5 L12 4.7 L14 9.5 L16.5 4.5 M10 9.5 L12 20.5 L14 9.5" strokeWidth="0.65" opacity="0.75" />
          </svg>
          <span className="small-caps text-[9px] tracking-[0.22em]">Shop</span>
        </Link>

        <Link to="/lore" className={itemCls(pathname.startsWith("/lore"))} style={glow(pathname.startsWith("/lore"))}>
          {/* lore — an open book */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 6 C10 4.5 6.5 4.5 4 5.5 V19 C6.5 18 10 18 12 19.5 C14 18 17.5 18 20 19 V5.5 C17.5 4.5 14 4.5 12 6 Z" />
            <path d="M12 6 v13.5" />
          </svg>
          <span className="small-caps text-[9px] tracking-[0.22em]">Lore</span>
        </Link>

        <button onClick={() => setCartOpen(true)} className={`relative ${itemCls(false)}`} aria-label="Bag">
          {/* bag — the keepsake box */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="4" y="10" width="16" height="9" />
            <path d="M4 10 l2 -4 h12 l2 4" />
            <path d="M10 14 h4" strokeLinecap="round" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute right-[22%] top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-oxblood text-[8px] text-parchment">
              {cart.length}
            </span>
          )}
          <span className="small-caps text-[9px] tracking-[0.22em]">Bag</span>
        </button>

        <Link to="/wishlist" className={itemCls(pathname.startsWith("/wishlist"))} style={glow(pathname.startsWith("/wishlist"))}>
          {/* me — a small cameo */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
            <ellipse cx="12" cy="12" rx="7" ry="9" />
            <circle cx="12" cy="10" r="2.5" />
            <path d="M8.5 17 c1-2 6-2 7 0" />
          </svg>
          <span className="small-caps text-[9px] tracking-[0.22em]">Me</span>
        </Link>
      </div>
    </nav>
  );
}
