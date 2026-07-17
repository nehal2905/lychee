// Client-side app state: cart, wishlist, easter-egg keys.
// Placeholder for future Supabase/auth integration — do not add business logic here.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Keys = { moon: boolean; locket: boolean; butterfly: boolean };
type Store = {
  cart: string[];
  wishlist: string[];
  keys: Keys;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  findKey: (k: keyof Keys) => void;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
};

const StoreCtx = createContext<Store | null>(null);

function useLocal<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [v, setV] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setV(JSON.parse(raw));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocal<string[]>("ll_cart", []);
  const [wishlist, setWishlist] = useLocal<string[]>("ll_wish", []);
  const [keys, setKeys] = useLocal<Keys>("ll_keys", { moon: false, locket: false, butterfly: false });
  const [cartOpen, setCartOpen] = useState(false);

  const value: Store = {
    cart,
    wishlist,
    keys,
    cartOpen,
    setCartOpen,
    addToCart: (id) => setCart((c) => (c.includes(id) ? c : [...c, id])),
    removeFromCart: (id) => setCart((c) => c.filter((x) => x !== id)),
    toggleWishlist: (id) =>
      setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    findKey: (k) => setKeys((prev) => ({ ...prev, [k]: true })),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
