import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({ component: Wishlist });

// the hidden cabinet — pieces kept behind glass, just for you
function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const offsets = ["", "sm:mt-16", "sm:mt-6", "sm:mt-24", "sm:mt-2", "sm:mt-14"];
  return (
    <section className="px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="overline-label">The Hidden Cabinet</p>
          <h1 className="display-xl mt-6 text-5xl sm:text-7xl">Kept for You.</h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-hand text-3xl leading-relaxed text-cream/60">
              The cabinet is empty —
              <br />
              the pieces you love live here.
            </p>
            <Link to="/" className="link-quiet mt-10 inline-block text-lg text-cream/80">Go Find One</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 sm:gap-x-10">
            {items.map((p, i) => (
              <div key={p.id} className={offsets[i % offsets.length]}>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
