// The Lore Library — letters, poems, and fragments kept in the archive.
// Placeholder content; swap to Supabase later without touching UI.
export type LoreType = "letter" | "poem" | "fragment";
export type LoreEntry = {
  id: string;
  type: LoreType;
  title: string;
  text: string;
  signoff?: string;
};

export const loreEntries: LoreEntry[] = [
  {
    id: "unopened-letters",
    type: "letter",
    title: "The Unopened Letters",
    text: "Found in a Bombay estate sale, tucked inside a bundle of unopened letters. she wrote to a soldier who never came home. the moonstone was still pinned to the last envelope.",
    signoff: "found March, an estate sale, Bombay",
  },
  {
    id: "always",
    type: "letter",
    title: "Always",
    text: "Engraved 'always' on the inside of the band. We do not know whose promise it kept. The jeweller who resized it refused to polish the word away.",
    signoff: "from the keeper's notes",
  },
  {
    id: "wednesday",
    type: "fragment",
    title: "Wednesday",
    text: "She wore it every wednesday. no one ever asked why.",
  },
  {
    id: "jasmine-programme",
    type: "fragment",
    title: "Three Seasons of Ballet",
    text: "Worn to the ballet, three seasons in a row. the programme still smells faintly of jasmine.",
  },
  {
    id: "poets-universe",
    type: "poem",
    title: "The Poets",
    text: "Maybe we are the poets\nthe universe wrote\nto understand itself. ♡",
  },
  {
    id: "another-life",
    type: "poem",
    title: "Another Life",
    text: "I wish\ni met me\nin another life. ♡",
  },
  {
    id: "wet-afternoon",
    type: "letter",
    title: "A Wet Afternoon in Paris",
    text: "Purchased on a wet afternoon in Paris, according to the receipt still folded inside the box. the ink has run, but the date survives: april, 1905.",
    signoff: "the receipt, translated",
  },
  {
    id: "forget-me-not",
    type: "fragment",
    title: "Half a Name",
    text: "Inside the locket: a pressed forget-me-not, and half a name.",
  },
  {
    id: "chase-the-moon",
    type: "poem",
    title: "Chase the Moon",
    text: "Chase the moon,\nnot the people.",
  },
  {
    id: "candlelight-reader",
    type: "fragment",
    title: "The Reader",
    text: "She read by its light, the story goes. we like to believe her.",
  },
];
