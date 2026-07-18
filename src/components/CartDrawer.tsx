import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { copy, shippingFee } from "@/lib/brand.config";

// a keepsake box opening from the right — items listed like a ledger
export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart } = useStore();
  const items = cart.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const subtotal = items.reduce((s, p) => s + p.price, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[140] bg-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setCartOpen(false)}
        >
          <motion.aside
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-panel"
            style={{
              borderLeft: "1px solid rgba(184,148,90,0.35)",
              backgroundImage: "linear-gradient(180deg, rgba(184,148,90,0.06), transparent 40%)",
            }}
          >
            <header className="px-7 pb-5 pt-8">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="overline-label">The Keepsake Box</p>
                  <h2 className="mt-2 font-display text-3xl italic text-cream">Your Treasures</h2>
                </div>
                <button onClick={() => setCartOpen(false)} aria-label="Close" className="-mr-1 p-1 font-display text-4xl leading-none text-gold transition-colors duration-500 hover:text-candle">×</button>
              </div>
              <span className="hairline mt-5 block w-full" />
            </header>

            <div className="flex-1 overflow-y-auto px-7">
              {items.length === 0 ? (
                <p className="mt-16 text-center font-hand text-3xl text-cream/80">
                  Your box is empty, for now.
                </p>
              ) : (
                <ul>
                  {items.map((p) => (
                    <li key={p.id} className="flex items-center gap-5 border-b border-gold/10 py-5">
                      <div
                        className="h-20 w-16 shrink-0"
                        style={{
                          background: `radial-gradient(circle at 38% 28%, ${p.stone}, #0a0507 80%)`,
                          border: "1px solid rgba(184,148,90,0.35)",
                        }}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate font-display text-lg italic text-cream">{p.name}</span>
                        <span className="small-caps text-[11px] tracking-[0.24em] text-cream/60">{p.gemstone}</span>
                        <span className="mt-1 small-caps font-display text-gold">₹{p.price.toLocaleString("en-IN")}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(p.id)}
                        aria-label={`Remove ${p.name}`}
                        className="font-display text-lg text-gold/40 transition-colors duration-500 hover:text-oxblood"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="px-7 pb-8 pt-5">
                <span className="hairline block w-full" />
                <div className="mt-5 flex items-baseline justify-between">
                  <span className="small-caps text-[12px] tracking-[0.3em] text-cream/75">Subtotal</span>
                  <span className="small-caps font-display text-cream">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="small-caps text-[12px] tracking-[0.3em] text-cream/75">Shipping</span>
                  <span className="small-caps font-display text-cream/80">₹{shippingFee}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-gold/15 pt-3">
                  <span className="small-caps text-[12px] tracking-[0.3em] text-cream/75">Total</span>
                  <span className="font-display text-2xl text-gold">₹{(subtotal + shippingFee).toLocaleString("en-IN")}</span>
                </div>
                <p className="mt-3 font-hand text-base text-cream/70">{copy.finalSale}</p>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-seal-plaque mt-6 w-full"
                >
                  Proceed to Checkout
                </Link>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
