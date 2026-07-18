// Single source of truth for brand theming, copy, easter eggs, and drop timing.
// Re-theme the entire site by editing this file.

export const brand = {
  name: "Lychee Lore",
  tagline: "Collect Beautiful Moments.",
  headline: "Treasures Meant to Become Heirlooms.",
  instagram: "@lychee._.lore",
  instagramUrl: "https://instagram.com/lychee._.lore",
  whatsapp: "+919999999999",
};

export const copy = {
  finalSale: "One of a kind. Once it's yours, it's yours forever.",
  orderConfirmed: "Your treasures are being prepared with great care.",
  aboutLine: "Some souls understand each other in silence.",
  footerLine: "Growth is quiet, but it changes everything.",
  dropLabel: "Next Drop · Friday 7PM",
};

// Countdown target — next Friday 7pm local
function nextFriday7pm() {
  const d = new Date();
  const day = d.getDay();
  const daysUntilFri = (5 - day + 7) % 7 || 7;
  const target = new Date(d);
  target.setDate(d.getDate() + daysUntilFri);
  target.setHours(19, 0, 0, 0);
  return target.toISOString();
}
export const dropTargetISO = nextFriday7pm();

export const easterEggs = {
  moon: { code: "MOONCHILD", label: "early access to the next drop" },
  locket: { code: "VAULT", label: "a secret piece, only for the curious" },
  butterfly: { code: "WINGS", label: "free shipping on your next piece" },
  allThree: { code: "COLLECTOR", label: "a little something extra on your next drop" },
};

// warm espresso — mirrors the CSS custom properties in styles.css.
// sage is for tiny illustrated botanical sprigs ONLY, never fills or tints.
export const palette = {
  base: "#221724",
  panel: "#160F17",
  dusk: "#4A3556",
  haze: "#8C6B72",
  cream: "#E8DCC5",
  parchment: "#F3E9D7",
  gold: "#B8945A",
  candle: "#D4A65A",
  rose: "#B0788A",
  mauve: "#8C6B72",
  wood: "#5C4033",
  oxblood: "#6E2A2A",
  sage: "#8D9B7B",
};

// commerce numbers (placeholders)
export const shippingFee = 80; // ₹, shown as a line in cart & checkout
export const mysteryJarPrice = 999; // ₹, the one piece priced above the drop range

// The Mystery Jar — blind-buy ritual copy & charm (page-only constants)
export const mysteryJar = {
  entryLine: "Every jar holds a story. You just have to open it.",
  subLine: "You don't choose the piece. The piece chooses you.",
  closeLine: "Some treasures cannot be searched for. They can only arrive.",
  prepNote: "Your jar is prepared within 3 days of the current drop.",
  priceLine: "one jar · one story · one you",
  promiseStrip: "Blind Buy · One of a Kind · Yours Forever",
  /** bonus secret — tap the jar 7 times; nothing unlocks */
  tagEaster: "patience, love.",
  whispers: [
    "…she waited a long time for you…",
    "…found in an attic in 1967…",
    "…the moon has seen this one before…",
    "…someone loved this once. someone will again…",
  ],
  styles: ["Rings", "Earrings", "Lockets", "Surprise me"] as const,
  ringSizes: ["4", "5", "6", "7", "8", "9", "10"],
  promises: [
    {
      title: "One piece, chosen for you",
      body: "A curated one-of-a-kind vintage treasure, matched to the little you tell us.",
      icon: "chosen" as const,
    },
    {
      title: "Its lore, sealed inside",
      body: "Every jar ships with the piece's handwritten story, wax-sealed.",
      icon: "sealed" as const,
    },
    {
      title: "Never repeated",
      body: "No two jars are ever the same. What arrives is yours alone.",
      icon: "unique" as const,
    },
  ],
  testimonials: [
    { quote: "I cried a little. It was exactly me.", name: "Anya" },
    { quote: "Opened it by candlelight. Perfect.", name: "Meera" },
    { quote: "I would never have picked it, and that is why it fits.", name: "Sara" },
    { quote: "The note inside made me write back to myself.", name: "Priya" },
    { quote: "A stranger's heirloom. Now mine.", name: "Leila" },
  ],
};
