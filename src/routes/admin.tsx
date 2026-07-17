import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/admin")({ component: Admin });

// the keeper's desk — a private ledger, still in the same candlelit room
function Admin() {
  const [tab, setTab] = useState<"add" | "list">("list");

  return (
    <section className="px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="overline-label">The Keeper's Desk</p>
            <h1 className="display-xl mt-4 text-5xl sm:text-6xl">The Ledger.</h1>
            <p className="mt-3 font-hand text-base text-haze">(placeholder — not wired to a database)</p>
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setTab("list")}
              className={`small-caps pb-1 text-xs tracking-[0.3em] transition-colors duration-500 ${tab === "list" ? "border-b border-gold text-gold" : "text-haze hover:text-cream"}`}
            >
              Pieces
            </button>
            <button
              onClick={() => setTab("add")}
              className={`small-caps pb-1 text-xs tracking-[0.3em] transition-colors duration-500 ${tab === "add" ? "border-b border-gold text-gold" : "text-haze hover:text-cream"}`}
            >
              Add
            </button>
          </div>
        </div>

        {tab === "add" ? (
          <form
            className="paper deckle space-y-8 p-8 sm:p-12"
            onSubmit={(e) => { e.preventDefault(); alert("placeholder — connect Supabase to persist."); }}
          >
            <p className="font-type text-[10px] small-caps tracking-[0.34em] text-wood">Entry of a New Piece</p>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field label="name"><input required className="field-line-ink" /></Field>
              <Field label="price (₹)"><input required type="number" className="field-line-ink" /></Field>
              <Field label="gemstone"><input className="field-line-ink" /></Field>
              <Field label="metal"><input className="field-line-ink" /></Field>
              <Field label="era"><input placeholder="c. 1910" className="field-line-ink" /></Field>
              <Field label="drop">
                <select className="field-line-ink appearance-none">
                  <option>chapter one — twilight</option>
                  <option>chapter two — dusk letters</option>
                </select>
              </Field>
              <Field label="status">
                <select className="field-line-ink appearance-none">
                  <option>available</option><option>reserved</option><option>sold</option>
                </select>
              </Field>
              <Field label="photo">
                <input type="file" accept="image/*" className="w-full pt-2 text-sm text-ink" />
              </Field>
            </div>
            <Field label="lore">
              <textarea rows={4} className="field-line-ink resize-none" />
            </Field>
            <button className="btn-plaque !text-ink" style={{ borderColor: "rgba(92,64,51,0.5)", outlineColor: "rgba(92,64,51,0.25)" }}>
              Enter It into the Ledger
            </button>
          </form>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p.id} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-6 border-b border-gold/12 py-5 first:border-t">
                <div>
                  <div className="font-display text-xl italic text-cream">{p.name}</div>
                  <div className="mt-0.5 small-caps text-[11px] tracking-[0.24em] text-haze">{p.gemstone} · {p.era}</div>
                </div>
                <span className="small-caps text-gold">₹{p.price.toLocaleString("en-IN")}</span>
                <span className={`small-caps text-[11px] tracking-[0.24em] ${
                  p.status === "available" ? "text-gold" :
                  p.status === "reserved" ? "text-rose" :
                  "text-oxblood"
                }`}>
                  {p.status === "sold" ? "✕ sold" : p.status === "reserved" ? "✦ reserved" : "· available"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block small-caps text-[10px] tracking-[0.3em] text-wood">{label}</span>
      {children}
    </label>
  );
}
