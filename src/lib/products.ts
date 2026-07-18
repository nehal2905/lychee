// Placeholder product data. Swap to Supabase later without touching UI.
export type ProductStatus = "available" | "reserved" | "sold";
export type Product = {
  id: string;
  name: string;
  price: number;
  gemstone: string;
  metal: string;
  era: string;
  status: ProductStatus;
  lore: string;
  soldIn?: string;
  vault?: boolean;
  // Deterministic gradient seed for the "photo" placeholder
  hue: number;
  stone: string; // stone tint hex
};

export const products: Product[] = [
  { id: "moonlit-vow", name: "Moonlit Vow", price: 429, gemstone: "Moonstone", metal: "Sterling silver", era: "c. 1910", status: "available", lore: "Found in a Bombay estate sale, tucked inside a bundle of unopened letters. she wrote to a soldier who never came home.", hue: 260, stone: "#dfe7ef" },
  { id: "crimson-oath", name: "Crimson Oath", price: 455, gemstone: "Ruby", metal: "18k yellow gold", era: "c. 1895", status: "available", lore: "Engraved 'always' on the inside of the band. we do not know whose promise it kept.", hue: 355, stone: "#8b1f2a" },
  { id: "pearl-hush", name: "Pearl Hush", price: 415, gemstone: "Baroque pearl", metal: "Silver gilt", era: "c. 1920", status: "reserved", lore: "Worn to the ballet, three seasons in a row. the programme still smells faintly of jasmine.", hue: 40, stone: "#f5ecdc" },
  { id: "amethyst-elegy", name: "Amethyst Elegy", price: 445, gemstone: "Amethyst", metal: "Rose gold", era: "c. 1905", status: "available", lore: "Purchased on a wet afternoon in Paris, according to the receipt still folded inside the box.", hue: 290, stone: "#7a4b8a" },
  { id: "sapphire-lull", name: "Sapphire Lull", price: 449, gemstone: "Sapphire", metal: "Platinum", era: "c. 1930", status: "sold", soldIn: "sold in 4 minutes", lore: "She wore it every wednesday. no one ever asked why.", hue: 220, stone: "#2f4b7c" },
  { id: "wildflower-locket", name: "Wildflower Locket", price: 399, gemstone: "Enamel", metal: "Yellow gold", era: "c. 1898", status: "available", lore: "Inside: a pressed forget-me-not, and half a name.", hue: 330, stone: "#b0788a" },
  { id: "candle-hour", name: "Candle Hour", price: 419, gemstone: "Citrine", metal: "Brass gilt", era: "c. 1915", status: "available", lore: "She read by its light, the story goes. we like to believe her.", hue: 35, stone: "#d4a65a" },
  { id: "vesper-drop", name: "Vesper Drop", price: 439, gemstone: "Opal", metal: "White gold", era: "c. 1925", status: "sold", soldIn: "sold in 7 minutes", lore: "Someone loved this piece before you knew you needed it.", hue: 200, stone: "#c7d3d8" },
  { id: "letter-key", name: "Letter Key", price: 399, gemstone: "Onyx", metal: "Sterling silver", era: "c. 1902", status: "available", lore: "Opened a desk that opened a drawer that opened a life.", hue: 20, stone: "#1a1416" },
  { id: "gilded-thorn", name: "Gilded Thorn", price: 435, gemstone: "Garnet", metal: "18k gold", era: "c. 1888", status: "available", lore: "She pinned it to her collar the night she left.", hue: 10, stone: "#7a2a2a" },
  // Vault (hidden) piece
  { id: "midnight-vow", name: "Midnight Vow", price: 455, gemstone: "Black opal", metal: "Oxidised silver", era: "c. 1912", status: "available", vault: true, lore: "Kept in a velvet pouch, never displayed. only whispered about.", hue: 270, stone: "#2a1f36" },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
