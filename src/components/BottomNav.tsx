import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

// fixed bottom navigation for one-handed mobile use.
// near-black bar; the active destination glows candle-gold.
export function BottomNav() {
  const { setCartOpen, cart, cartOpen } = useStore();
  const { pathname, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      hash: s.location.hash.replace(/^#/, ""),
    }),
  });

  // Shop lights for categories (#shelf) + Trending Now (#drop), or on click
  const [inShop, setInShop] = useState(false);
  // keep Shop lit briefly after tap so scroll-spy can't clear it mid-scroll
  const shopLockUntil = useRef(0);

  // hash navigation: /#drop or /#shelf should light Shop immediately
  useEffect(() => {
    if (pathname !== "/") {
      setInShop(false);
      return;
    }
    if (hash === "drop" || hash === "shelf") {
      setInShop(true);
      shopLockUntil.current = Date.now() + 1400;
    }
  }, [pathname, hash]);

  // scroll-spy while on home
  useEffect(() => {
    if (pathname !== "/") return;

    const measure = () => {
      if (Date.now() < shopLockUntil.current) return;

      const shelf = document.getElementById("shelf");
      const drop = document.getElementById("drop");
      if (!shelf && !drop) return;

      const mid = window.innerHeight * 0.42;
      const inView = (el: HTMLElement | null) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < mid + 80 && r.bottom > mid - 120;
      };

      setInShop(inView(shelf) || inView(drop));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 100);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [pathname, hash]);

  const onHome = pathname === "/";
  const onProduct = pathname.startsWith("/product");
  const onCheckout = pathname.startsWith("/checkout");
  const onMystery = pathname.startsWith("/mystery-jar");
  const onLore = pathname.startsWith("/lore");
  const onWishlist = pathname.startsWith("/wishlist");

  const homeActive = onHome && !inShop;
  const shopActive = (onHome && inShop) || onProduct || onMystery;
  const loreActive = onLore;
  const bagActive = cartOpen || onCheckout;
  const meActive = onWishlist;

  const goShop = () => {
    setInShop(true);
    shopLockUntil.current = Date.now() + 1400;
    requestAnimationFrame(() => {
      document.getElementById("drop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const goHome = () => {
    setInShop(false);
    shopLockUntil.current = 0;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        background: "linear-gradient(0deg, rgba(8,4,10,0.98) 0%, rgba(12,8,14,0.96) 100%)",
        borderTop: "2px solid rgba(212,166,90,0.55)",
        boxShadow: "0 -12px 32px rgba(0,0,0,0.55), 0 -1px 0 rgba(232,220,197,0.12)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* h-14 matches the top nav bar thickness */}
      <div className="mx-auto flex h-14 max-w-md items-stretch">
        <NavItem to="/" active={homeActive} label="Home" onNavigate={goHome}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M5 20 V11 a7 7 0 0 1 14 0 v9" />
            <path d="M3 20 h18" />
            <path d="M12 20 v-5" />
          </svg>
        </NavItem>

        <NavItem to="/" hash="drop" active={shopActive} label="Shop" onNavigate={goShop}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" strokeLinecap="round">
            <path d="M7.5 4.5 h9 L21 9.5 L12 20.5 L3 9.5 Z" />
            <path d="M3 9.5 h18 M7.5 4.5 L10 9.5 L12 4.7 L14 9.5 L16.5 4.5 M10 9.5 L12 20.5 L14 9.5" strokeWidth="1.1" />
          </svg>
        </NavItem>

        <NavItem to="/lore" active={loreActive} label="Lore">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 6 C10 4.5 6.5 4.5 4 5.5 V19 C6.5 18 10 18 12 19.5 C14 18 17.5 18 20 19 V5.5 C17.5 4.5 14 4.5 12 6 Z" />
            <path d="M12 6 v13.5" />
          </svg>
        </NavItem>

        <button
          onClick={() => setCartOpen(true)}
          className={`relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 transition-colors duration-500 ${
            bagActive ? "text-candle" : "text-gold/85"
          }`}
          style={
            bagActive
              ? { filter: "drop-shadow(0 0 8px rgba(212,166,90,0.55))" }
              : undefined
          }
          aria-label="Bag"
          aria-current={bagActive ? "page" : undefined}
        >
          {bagActive && (
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-full bg-candle"
              style={{ boxShadow: "0 0 10px rgba(212,166,90,0.7)" }}
            />
          )}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="9" />
            <path d="M4 10 l2 -4 h12 l2 4" />
            <path d="M10 14 h4" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute right-[22%] top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-oxblood text-[8px] text-parchment">
              {cart.length}
            </span>
          )}
          <span className={`small-caps text-[9px] tracking-[0.22em] ${bagActive ? "text-candle" : "text-gold/80"}`}>
            Bag
          </span>
        </button>

        <NavItem to="/wishlist" active={meActive} label="Me">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <ellipse cx="12" cy="12" rx="7" ry="9" />
            <circle cx="12" cy="10" r="2.5" />
            <path d="M8.5 17 c1-2 6-2 7 0" />
          </svg>
        </NavItem>
      </div>
    </nav>
  );
}

function NavItem({
  to,
  hash,
  active,
  label,
  children,
  onNavigate,
}: {
  to: "/" | "/lore" | "/wishlist";
  hash?: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={onNavigate}
      className={`relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 transition-colors duration-500 ${
        active ? "text-candle" : "text-gold/85 hover:text-candle"
      }`}
      style={
        active ? { filter: "drop-shadow(0 0 8px rgba(212,166,90,0.55))" } : undefined
      }
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-full bg-candle"
          style={{ boxShadow: "0 0 10px rgba(212,166,90,0.7)" }}
        />
      )}
      {children}
      <span className={`small-caps text-[9px] tracking-[0.22em] ${active ? "text-candle" : "text-gold/80"}`}>
        {label}
      </span>
    </Link>
  );
}
