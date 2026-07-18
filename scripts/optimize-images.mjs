// One-off image optimizer. Generates AVIF (hero/LCP) + WebP variants into public/.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { statSync } from "node:fs";
import { resolve } from "node:path";

const PUB = resolve(process.cwd(), "public");
const kb = (p) => (statSync(p).size / 1024).toFixed(0);

async function make(src, out, { w, fmt, q, alpha }) {
  const dst = resolve(PUB, out);
  let img = sharp(resolve(PUB, src)).resize({ width: w, withoutEnlargement: true });
  if (fmt === "avif") img = img.avif({ quality: q });
  else img = img.webp({ quality: q, alphaQuality: alpha ? 100 : undefined });
  await img.toFile(dst);
  console.log(out.padEnd(28), kb(dst) + "KB");
}

const jobs = [
  // HERO — the LCP element: AVIF + WebP, two widths
  ["hero.png", "hero-640.avif", { w: 640, fmt: "avif", q: 54 }],
  ["hero.png", "hero-1024.avif", { w: 1024, fmt: "avif", q: 56 }],
  ["hero.png", "hero-640.webp", { w: 640, fmt: "webp", q: 78 }],
  ["hero.png", "hero-1024.webp", { w: 1024, fmt: "webp", q: 80 }],

  // collections band (below-fold background)
  ["collections.png", "collections.webp", { w: 960, fmt: "webp", q: 76 }],

  // mystery jar cutout (transparent)
  ["mystery-jar-cutout.png", "mystery-jar-cutout.webp", { w: 760, fmt: "webp", q: 80, alpha: true }],

  // product medallions
  ["pendant.png", "pendant.webp", { w: 440, fmt: "webp", q: 80 }],
  ["ring.png", "ring.webp", { w: 440, fmt: "webp", q: 80 }],
  ["earring.png", "earring.webp", { w: 440, fmt: "webp", q: 80 }],
  ["locket.png", "locket.webp", { w: 440, fmt: "webp", q: 80 }],

  // logo + seal (transparent, small)
  ["logo.png", "logo.webp", { w: 240, fmt: "webp", q: 90, alpha: true }],
  ["seal-ll.png", "seal-ll.webp", { w: 240, fmt: "webp", q: 88, alpha: true }],

  // CSS backgrounds
  ["lace-velvet.png", "lace-velvet.webp", { w: 675, fmt: "webp", q: 74 }],
  ["crushed-paper.png", "crushed-paper.webp", { w: 900, fmt: "webp", q: 72 }],
];

const before = jobs.reduce((s, [src]) => s, 0);
for (const [src, out, opts] of jobs) await make(src, out, opts);
console.log("done");
