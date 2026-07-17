import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { copy, shippingFee } from "@/lib/brand.config";
import { processPaymentPlaceholder } from "@/lib/payments";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/checkout")({ component: Checkout });

const EASE = [0.22, 1, 0.36, 1] as const;

// not a payment form — the signing of adoption papers for an heirloom
function Checkout() {
  const { cart, removeFromCart } = useStore();
  const items = cart.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const total = subtotal + shippingFee;
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await processPaymentPlaceholder(total);
    setProcessing(false);
    setDone(true);
    setTimeout(() => cart.forEach(removeFromCart), 400);
  };

  /* ---------------------- ORDER CONFIRMATION ---------------------- */
  if (done) {
    return (
      <section className="grid min-h-[70vh] place-items-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="paper deckle fold-corner max-w-md rotate-imperfect-1 p-10 pb-14 text-center sm:p-12"
        >
          <div className="wax-seal mx-auto mb-6 grid h-16 w-16 place-items-center font-display italic text-parchment">ll</div>
          <p className="overline-label !text-wood">Your Order is Confirmed!</p>
          <h1 className="mt-4 font-display text-3xl italic leading-snug text-ink">{copy.orderConfirmed}</h1>
          <span className="mx-auto mt-6 block h-px w-24 bg-wood/30" />
          <p className="mt-6 font-hand text-xl text-wood">
            You will receive a WhatsApp message with your order updates.
          </p>
          <Link to="/" className="btn-plaque mt-8 !text-ink" style={{ borderColor: "rgba(92,64,51,0.5)", outlineColor: "rgba(92,64,51,0.25)" }}>
            Continue Shopping
          </Link>
        </motion.div>
      </section>
    );
  }

  if (processing) {
    return (
      <section className="grid min-h-[70vh] place-items-center">
        <Loader variant="checkout" label="Sealing Your Order" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-6 text-center">
        <div>
          <p className="font-hand text-3xl text-cream/70">Your box is empty.</p>
          <Link to="/" className="link-quiet mt-8 inline-block text-cream/80">Find a Piece</Link>
        </div>
      </section>
    );
  }

  /* --------------------------- CHECKOUT --------------------------- */
  return (
    <section className="px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mb-14"
        >
          <p className="overline-label">Papers of Adoption</p>
          <h1 className="display-xl mt-5 text-5xl sm:text-7xl">Nearly Yours.</h1>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr_340px]">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
            className="space-y-10"
          >
            {/* the deed — one continuous document */}
            <div className="paper deckle fold-corner relative p-8 sm:p-12">
              <div className="absolute -top-3 right-12 h-6 w-14 rotate-[3deg] bg-parchment/60 shadow-sm" />

              <p className="font-type text-[10px] small-caps tracking-[0.34em] text-wood">Deed of Adoption · No. {new Date().getFullYear()}</p>
              <span className="mt-4 block h-px w-full bg-wood/20" />

              {/* contact */}
              <h2 className="mt-8 font-display text-2xl italic text-ink">To whom shall these treasures belong,</h2>
              <div className="mt-6 space-y-7">
                <input required placeholder="full name" className="field-line-ink" />
                <div className="grid gap-7 sm:grid-cols-2">
                  <input required type="tel" placeholder="whatsapp" className="field-line-ink" />
                  <input required type="email" placeholder="email" className="field-line-ink" />
                </div>
              </div>

              {/* shipping address */}
              <h2 className="mt-12 font-display text-2xl italic text-ink">And where the parcel shall travel,</h2>
              <div className="mt-6 space-y-7">
                <textarea required placeholder="street address" rows={2} className="field-line-ink resize-none" />
                <div className="grid gap-7 sm:grid-cols-3">
                  <input required placeholder="city" className="field-line-ink" />
                  <input required placeholder="state" className="field-line-ink" />
                  <input required placeholder="pincode" className="field-line-ink" />
                </div>
              </div>

              {/* payment — UPI first */}
              <h2 className="mt-12 font-display text-2xl italic text-ink">And how the sum shall be settled,</h2>
              <p className="mt-1 font-type text-[10px] tracking-[0.2em] text-wood/70">(Razorpay placeholder — no real charge)</p>
              <div className="mt-6 space-y-0">
                {["UPI", "Card", "Net Banking"].map((m) => (
                  <label key={m} className="flex cursor-pointer items-center gap-4 border-b border-wood/15 py-4 text-ink first:border-t">
                    <input type="radio" name="pay" defaultChecked={m === "UPI"} className="accent-[#6E2A2A]" />
                    <span className="font-display text-lg italic">{m}</span>
                  </label>
                ))}
              </div>

              <p className="mt-10 text-center font-hand text-lg text-wood">{copy.finalSale}</p>
            </div>

            <div>
              <button className="btn-seal-plaque w-full py-5">
                Pay Securely with Razorpay — ₹{total.toLocaleString("en-IN")}
              </button>
              <p className="mt-3 flex items-center justify-center gap-2 small-caps text-[10px] tracking-[0.3em] text-haze">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold/70" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 3 L20 6.5 v5 c0 5 -3.5 8.5 -8 10 c-4.5 -1.5 -8 -5 -8 -10 v-5 z" />
                  <path d="M9 12 l2.2 2.2 l4 -4" />
                </svg>
                100% Secure Payments
              </p>
            </div>
          </motion.form>

          {/* the inventory, as a ledger in the margin */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
            className="h-fit"
          >
            <p className="overline-label">The Treasures</p>
            <ul className="mt-6">
              {items.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-4 border-b border-gold/12 py-4 first:border-t">
                  <span className="font-display text-lg italic text-cream">{p.name}</span>
                  <span className="small-caps text-gold">₹{p.price.toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-baseline justify-between">
              <span className="small-caps text-[11px] tracking-[0.3em] text-haze">Subtotal</span>
              <span className="small-caps font-display text-cream">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="small-caps text-[11px] tracking-[0.3em] text-haze">Shipping</span>
              <span className="small-caps font-display text-cream/80">₹{shippingFee}</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between border-t border-gold/20 pt-4">
              <span className="small-caps text-[11px] tracking-[0.3em] text-haze">In Sum</span>
              <span className="font-display text-3xl text-gold">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
