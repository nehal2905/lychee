# Lychee Lore — Project Handoff

A candlelit, Victorian-romance vintage jewellery storefront. Mobile-first. Built as a
frontend-only experience: **payments, auth, and database are intentionally placeholders.**
This doc is the single source of truth for a new agent picking up the work.

---

## 1. How to run it

```bash
npm install          # first time only
npm run dev          # dev server on http://localhost:8080
npx tsc --noEmit     # type-check (run this after every change)
npm run build        # production build (verifies the whole thing compiles)
```

- **The dev server binds to the LAN**, so a phone on the same Wi-Fi can open it at
  `http://<laptop-LAN-IP>:8080`. The IP changes when the laptop switches networks —
  find it with `Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi"`.
- Always test on a **real phone in Safari/Chrome**, not desktop-narrow and not an
  in-app browser (Instagram's browser distorts the viewport).

## 2. Stack

- **React 19** + **TanStack Start** (file-based routing in `src/routes/`) — NOT plain
  Vite/React Router. Routes are `.tsx` files whose name is the path.
- **Tailwind CSS v4** (config lives in `src/styles.css` via `@theme` / `@utility`, not a
  tailwind.config.js).
- **Framer Motion** (imported as `motion/react`).
- Connected to **Lovable** (see `AGENTS.md`): commits pushed to the connected branch sync
  back to the Lovable editor — do **not** rewrite/force-push published history.

## 3. Deployment — READ THIS

The live site is **`lychee-kappa.vercel.app`**. **Everything built in the last sessions is
LOCAL ONLY.** The Vercel site still shows an older build. This project folder is not a git
repo on the user's machine, so nothing has been shipped. **Before the user sees changes
live, the work must be pushed** to whatever repo Vercel builds from (likely via the Lovable
sync or a GitHub remote). Ask the user how they deploy before assuming.

## 4. Design system (single source of truth)

- **Palette + brand copy + easter-egg codes + drop date** all live in
  `src/lib/brand.config.ts`. Re-theme the whole site by editing this one file. (Note: the
  file was renamed from `theme.config.ts` → `brand.config.ts` at some point; imports use
  `@/lib/brand.config`.)
- **Current palette = deep aubergine plum** (NOT the original espresso):
  - base `#221724`, panel `#160F17`, gold `#B8945A`, candle-amber `#D4A65A`,
    cream `#E8DCC5`, dusty rose `#B0788A`, mauve `#8C6B72`, oxblood `#6E2A2A`,
    sage `#8D9B7B` (sage is for tiny botanical sprigs ONLY, never fills).
  - The same values are mirrored in `src/styles.css` `:root`. If you change one, change both.
- **Fonts**: Bodoni Moda (display/headings), EB Garamond (body), Special Elite
  (typewriter/lore cards), Pinyon Script (`font-hand`, handwritten accents). Loaded in
  `src/routes/__root.tsx`.
- **Page textures** (`src/styles.css`): `page-velvet`, `page-damask`, `page-crushed`,
  `page-laid` — each route gets one via `pageTexture()` in `__root.tsx`. Home = `page-crushed`.
- **Casing rule**: headings & UI use **Title Case**; handwritten annotations
  (`font-hand`) stay lowercase on purpose.
- **Reusable utility classes** worth knowing: `paper`, `deckle` (torn edges),
  `fold-corner`, `wax-seal`, `hairline`, `gold-frame`, `btn-plaque`, `btn-seal-plaque`,
  `link-quiet`, `field-line` / `field-line-ink`, `overline-label`, `display-xl`,
  `small-caps`, `dropcap`, `rotate-imperfect-1..4`, plus animations `animate-floaty`,
  `animate-flicker`, `animate-twinkle`, `animate-shimmer`, etc.

## 5. Routes / pages (all built)

| Route | What it is |
|---|---|
| `/` | Home — hero, Shop by Categories shelf, Trending Now grid, trust row, lore, sold archive, how-it-works, letters, whatsapp opt-in, about |
| `/product/$id` | Exhibition-style product detail (One of a Kind badge, "Her Lore", price-in-button) |
| `/mystery-jar` | Blind-buy "the piece chooses you" page (₹999) |
| `/lore` | The Lore Library — letters/poems/fragments, filterable |
| `/checkout` | "Deed of Adoption" — contact/shipping/payment (UPI first), Razorpay **placeholder**, then order-confirmation screen |
| `/wishlist` | The Hidden Cabinet |
| `/faq` | Marginalia-style Q&A, includes the final-sale answer |
| `/admin` | "The Ledger" — non-functional placeholder dashboard |
| 404 | "Lost in the Library" |

## 6. State & placeholders (do NOT wire real backends without being asked)

- `src/lib/store.tsx` — cart, wishlist, and the 3 easter-egg keys, all in localStorage.
- `src/lib/payments.ts` — `processPaymentPlaceholder()`. Real Razorpay goes here later.
- `src/lib/products.ts` — 10 placeholder pieces + 1 hidden "vault" piece. Prices are
  **₹399–₹455**; shipping ₹80 (`shippingFee` in brand.config); Mystery Jar ₹999
  (`mysteryJarPrice`). Swap to Supabase later without touching UI.
- `src/lib/lore.ts` — Lore Library entries.
- **FINAL-SALE BRAND**: never add returns/refunds/exchange language anywhere.

## 7. The 3-Keys easter-egg hunt (keep it subtle & hidden)

Three hidden secrets, tracked in `store`, revealed via folded-note modals
(`src/components/EasterEggs.tsx`), codes in `brand.config.ts`:
- 🌙 **moon** — invisible tap-target sitting ON the painted moon in the hero artwork →
  code `MOONCHILD`.
- 🔒 **locket** — a small swaying gold locket charm on the lore letter → reveals a hidden
  "vault" product; code `VAULT`.
- 🦋 **butterfly** — faint gold line-butterfly in the footer → code `WINGS`.
- Find all 3 → celebratory modal, code `COLLECTOR`.
- Progress = three faint ✦ stars (in nav on desktop). Footer has ONE whispered line
  ("three secrets live in these pages") and nothing else references the hunt. There is NO
  page that explains the keys — keep it that way.
- **Admin is reached by double-tapping the footer copyright line** (hidden entrance).

## 8. The hero — important gotchas

- Artwork lives at `public/hero.png`, referenced as `/hero.png?v=4` in `src/routes/index.tsx`.
  **When the user replaces the image, BUMP the `?v=` number** or the phone serves a cached
  copy (this bit us repeatedly). Same trick for `public/collections.png?v=1`.
- **Required artwork spec: 1024×2048 (1:2 portrait).** Moon in the upper third, desk/jewellery
  in the lower third, nothing important within ~8% of any edge. The hero is a **locked stage =
  `calc(100svh - 3.5rem)`** with `object-cover`; a 1:2 image fills a phone screen with almost
  no crop. Any 1:2 image can be dropped in and the layout holds.
- **When the artwork changes, the moon moves** → re-aim the invisible moon tap-target
  (`right-[..%] top-[..%]` on the moon `<button>` in `index.tsx`). Read the new image, find the
  crescent, set the %s.
- The **countdown** (`src/components/Countdown.tsx`) floats over the desk as a **fully
  transparent** gold frame — the user was firm: **no glow, no shimmer, no shine**. It sits
  slightly left of center (via `paddingRight: "14%"` on its wrapper in index.tsx). Keep it
  transparent.

## 9. "Alive" — the landing page animation language

The user strongly wants the landing page to **feel alive** (they distinguish LIVE/animated
from static decoration — they rejected static ornaments). Currently animated on home:
- Hero painting **breathes + slow Ken-Burns pan** (`motion.img` scale/x/y, 24s).
- **Candle glow** pulses (lower-left), **fairy-light jar** flickers slowly dim↔bright using a
  `mixBlendMode: "screen"` warm glow + 5 winking pinpoint lights (kept tight in the
  bottom-right corner so it does NOT bleed under the transparent timer — this was a specific fix).
- **Rising embers**, **drifting dust**, **2 falling rose petals**, **2 wandering butterflies**
  (`HeroButterfly`, gold + rose, flapping wings) across the hero.
- **Idle (45s)** → bigger "the room wakes" sequence in `src/components/IdleAnimations.tsx`
  (fireflies rise, shooting star, petals, a big flapping butterfly, sparkles).
- **`AmbientLife`** component (in index.tsx) = drifting dust + twinkling brass stars + a lone
  rising ember. Currently added to **Trending Now, Letters, About** sections. Reuse it to make
  more sections feel alive (`<AmbientLife dust={n} stars={n} />` inside a `relative` section,
  with content wrapped in a `relative` div so it sits above).
- All motion respects `prefers-reduced-motion` (global rule in styles.css).

## 10. Known fixed bugs (don't reintroduce)

- **Fixed bars drifting on scroll**: caused by a CSS `transform` on the route-transition
  wrapper (`__root.tsx`) — a transformed ancestor breaks `position:fixed` for descendants.
  The page-turn is now **opacity-only**. Never add transform/translate to that `motion.main`.
- **Background vanishing on scroll (iOS)**: caused by `backdrop-blur` cards sitting over a
  `-z-10` background image. Fix was removing `backdrop-blur` from the category cards. Don't
  put backdrop-filter over a sibling background image.
- **Image cache**: always bump `?v=` when replacing an image in `public/`.

## 11. Recently completed (most recent first)

- Added `AmbientLife` animated layer to Trending/Letters/About (reverted a set of *static*
  decorations the user didn't want).
- Hero "alive" pass: breathing/pan, candle+jar flicker (screen-blend, slowed, pulled clear of
  the timer), embers, petals, 2 wandering butterflies.
- Timer: shrunk, made fully transparent (removed all glow/shimmer), positioned slightly left.
- Hero image is now the locked-stage 1:2 full-screen treatment; countdown floats on it with a
  flickering scroll chevron.
- **Shop by Categories** section: heading "Find Your Perfect Match" + subtitle
  "Shop by Categories" (bold Bodoni), dark **damask band** background (`public/collections.png`),
  6 category cards with jewellery medallions (Necklaces/Rings/Earrings/Bracelets/Mystery Jars/
  One of One), horizontal snap-scroll, floating animation.
- **Trending Now** = the product grid; heading restyled to match "Find Your Perfect Match".
- Bottom mobile nav (Home/Shop/Lore/Bag/Me) + top-bar back (‹) and exit (×) on inner pages.

## 12. Suggested next steps (where a new agent could begin)

1. **Ship it** — get the current local build onto Vercel (this is the biggest gap; the user
   keeps seeing the old live site). Clarify their deploy path first.
2. **Category filtering** — the Shop-by-Categories cards currently all scroll to the drop;
   wire them to actually filter/show pieces by category (needs a `category` field on products).
3. Continue the section-by-section polish the user was doing (they move top-to-bottom; product
   cards / product detail page are the natural next targets).
4. Per-piece product photography (only 4 placeholder images cycle across 10 products).

---
*Everything above reflects the local working tree as of this handoff. `npx tsc --noEmit`
passes and `/` returns 200 on the dev server.*
