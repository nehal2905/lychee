import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductPhoto } from "./ProductPhoto";
import { useStore } from "@/lib/store";

const shapes = ["pendant", "ring", "earring", "locket"] as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [sparkle, setSparkle] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wished = wishlist.includes(product.id);
  const sold = product.status === "sold";
  const reserved = product.status === "reserved";

  const handlePhotoTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      if (tapCount.current >= 2) {
        toggleWishlist(product.id);
        setBloom(true);
        setTimeout(() => setBloom(false), 900);
      } else {
        setSparkle(true);
        setTimeout(() => setSparkle(false), 700);
      }
      tapCount.current = 0;
    }, 240);
  };

  useEffect(() => () => {
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.3, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          onClick={(e) => {
            // let double tap prevent nav (mobile)
            if (tapCount.current > 0) e.preventDefault();
          }}
          onTouchStart={() => {
            pressTimer.current = setTimeout(() => setSparkle(true), 500);
          }}
          onTouchEnd={() => {
            if (pressTimer.current) clearTimeout(pressTimer.current);
            handlePhotoTap();
          }}
          className="block"
        >
          <div className={`transition-[filter,opacity] duration-1000 ${sold ? "opacity-45 grayscale-[45%]" : "group-hover:brightness-110"}`}>
            <ProductPhoto hue={product.hue} stone={product.stone} shape={shapes[index % 4]} />
          </div>

          {/* sparkle burst */}
          <AnimatePresence>
            {sparkle && (
              <motion.div
                className="pointer-events-none absolute inset-0 grid place-items-center"
                initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-candle"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 40,
                      y: Math.sin((i / 8) * Math.PI * 2) * 40,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.7 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* bloom heart on double tap */}
          <AnimatePresence>
            {bloom && (
              <motion.div
                className="pointer-events-none absolute inset-0 grid place-items-center"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.4, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.9 }}
              >
                <svg viewBox="0 0 24 24" className="h-16 w-16 text-gold drop-shadow-[0_0_18px_rgba(217,160,91,0.9)]" fill="currentColor">
                  <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SOLD wax seal */}
          {sold && (
            <div className="absolute -right-2 top-4 wax-seal grid h-16 w-16 rotate-[-14deg] place-items-center small-caps font-display text-xs">
              sold
            </div>
          )}

          {reserved && (
            <div className="absolute inset-x-0 bottom-3 text-center font-hand text-sm text-candle animate-flicker">
              someone's eyeing this ✦
            </div>
          )}
        </Link>

        {/* wishlist mark — a faint star, not an app icon */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 font-display text-xl leading-none transition-colors duration-700 ${wished ? "text-candle" : "text-cream/30 hover:text-cream/70"}`}
        >
          {wished ? "✦" : "✧"}
        </button>
      </div>

      {/* clean caption — name, price, and a bold add-to-cart */}
      <div className="mt-4 px-0.5">
        <h3 className="font-display text-xl italic leading-tight text-cream sm:text-2xl">
          {product.name}
        </h3>
        {!sold ? (
          <>
            <p className="mt-2 font-display text-xl text-candle sm:text-2xl">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <button
              onClick={handleAdd}
              className={`mt-3 w-full rounded-sm py-3 small-caps text-[12px] tracking-[0.3em] shadow-[0_0_20px_rgba(212,166,90,0.25)] transition-colors duration-500 ${added ? "bg-candle text-panel" : "bg-gold text-panel hover:bg-candle"}`}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </>
        ) : (
          <p className="mt-2 small-caps font-display text-[15px] text-haze/70">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        )}
      </div>
    </motion.article>
  );
}
