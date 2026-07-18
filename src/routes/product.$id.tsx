import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { getProduct } from "@/lib/products";
import { ProductPhoto } from "@/components/ProductPhoto";
import { useStore } from "@/lib/store";
import { copy } from "@/lib/brand.config";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
});

const EASE = [0.22, 1, 0.36, 1] as const;

// the piece is exhibited — one object in a dim room, papers beside it
function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const wished = wishlist.includes(product.id);
  const [zoom, setZoom] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const startX = useRef(0);
  const shapes = ["pendant", "ring", "locket"] as const;

  const swipe = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40) setImgIdx((i) => (i + 1) % shapes.length);
    if (dx > 40) setImgIdx((i) => (i - 1 + shapes.length) % shapes.length);
  };

  const sold = product.status === "sold";

  return (
    <article className="px-6 pb-40 pt-12 sm:px-12">
      <div className="mx-auto max-w-6xl">
        {/* exhibit label above everything, like a vitrine card */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mb-10 flex items-baseline gap-4"
        >
          <span className="overline-label">{product.era}</span>
          <span className="hairline flex-1 opacity-40" />
          <span className="font-type text-[9px] tracking-[0.3em] text-haze/70">The Archive</span>
        </motion.div>

        <div className="grid gap-14 md:grid-cols-12">
          {/* the object */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            <div
              className={`relative overflow-hidden transition-transform duration-700 ease-out ${zoom ? "scale-125" : ""}`}
              onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
              onTouchEnd={swipe}
              onDoubleClick={() => setZoom((z) => !z)}
            >
              <ProductPhoto hue={product.hue} stone={product.stone} shape={shapes[imgIdx]} />
            </div>
            <div className="mt-5 flex items-center justify-center gap-3">
              {shapes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`View ${i + 1}`}
                  className={`font-display text-xs transition-colors duration-500 ${i === imgIdx ? "text-gold" : "text-gold/25"}`}
                >
                  ✦
                </button>
              ))}
            </div>
            <p className="mt-2 text-center font-type text-[9px] small-caps tracking-[0.3em] text-haze/70">
              Swipe · Double-tap to Zoom
            </p>
          </motion.div>

          {/* its papers */}
          <motion.div
            className="md:col-span-5 md:pt-10"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
          >
            <h1 className="display-xl text-5xl sm:text-6xl">{product.name}</h1>
            <p className="mt-4 small-caps text-[12px] tracking-[0.28em] text-haze">
              {product.gemstone} · {product.metal} · {product.era}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 border border-gold/40 px-3.5 py-1.5 small-caps text-[10px] tracking-[0.3em] text-gold">
              <span className="text-[8px]">✦</span> One of a Kind <span className="text-[8px]">✦</span>
            </p>
            <p className="mt-6 font-display text-2xl text-gold/90">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="paper-crushed deckle fold-corner mt-10 rotate-imperfect-3 p-7">
              <p className="relative z-[1] font-type text-[10px] small-caps tracking-[0.3em] text-wood/80">Her Lore</p>
              <blockquote className="ink-hand relative z-[1] mt-4 text-[1.55rem] leading-[1.5]">{product.lore}</blockquote>
            </div>

            <p className="mt-8 font-hand text-lg text-cream/60">{copy.finalSale}</p>

            <div className="mt-10 hidden items-center gap-4 md:flex">
              {!sold && (
                <button
                  onClick={() => { addToCart(product.id); setCartOpen(true); }}
                  className="btn-seal-plaque flex-1"
                >
                  Add to Cart · ₹{product.price.toLocaleString("en-IN")}
                </button>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`font-display text-3xl leading-none transition-colors duration-700 ${wished ? "text-candle" : "text-cream/30 hover:text-cream/70"}`}
              >
                {wished ? "✦" : "✧"}
              </button>
            </div>

            <Link to="/" className="link-quiet mt-12 inline-block text-sm text-cream/70">
              ← Return to the Archive
            </Link>
          </motion.div>
        </div>
      </div>

      {/* sticky bottom bar on mobile — sits above the bottom navigation */}
      {!sold && (
        <div
          className="fixed inset-x-0 bottom-[58px] z-30 bg-panel/95 p-4 backdrop-blur md:bottom-0"
          style={{ borderTop: "1px solid rgba(184,148,90,0.35)" }}
        >
          <div className="mx-auto flex max-w-md items-center gap-4">
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`grid h-12 w-10 place-items-center font-display text-2xl ${wished ? "text-candle" : "text-cream/40"}`}
            >
              {wished ? "✦" : "✧"}
            </button>
            <button
              onClick={() => { addToCart(product.id); setCartOpen(true); }}
              className="btn-seal-plaque flex-1"
            >
              Add · ₹{product.price.toLocaleString("en-IN")}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
