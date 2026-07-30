import type { ScentProduct, JournalPost } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Static Product & Editorial Data
   Server-side data source for the four scent states.
   In production, this would be fetched from a headless CMS.
   ═══════════════════════════════════════════════════════════ */

export const PRODUCTS: ScentProduct[] = [
  {
    id: "so-001",
    name: "SŌ",
    subtitle: "Mineral Vapor",
    family: "mineral",
    description:
      "A raw distillation of oceanic minerals and volatile sea salt, captured at the instant of evaporation. SŌ opens with a crystalline burst of cold marine aldehydes that dissolve into a weathered vetiver base, leaving a clean, elemental trail.",
    price: 240,
    size: "100ml",
    sizes: [
      { variant: "50ml", price: 180, inStock: true },
      { variant: "100ml", price: 240, inStock: true },
    ],
    image: "/products/so-bottle.jpg",
    notes: {
      top: ["Sea Salt Crystal", "Green Cardamom", "Cold Aldehyde"],
      heart: ["Vetiver Root", "Ambergris Accord", "Mineral Musk"],
      base: ["Wet Basalt", "Driftwood", "White Cedarwood"],
    },
    inStock: true,
    slug: "so",
  },
  {
    id: "moku-002",
    name: "MOKU",
    subtitle: "Cedar & Black Amber",
    family: "botanical",
    description:
      "An intense, tactile exploration of dry heat. Moku pairs the aromatic resin of cedarwood with the dark warmth of caramelized amber and dry black pepper, creating a persistent, masculine aura.",
    price: 280,
    size: "100ml",
    sizes: [
      { variant: "50ml", price: 210, inStock: true },
      { variant: "100ml", price: 280, inStock: true },
    ],
    image: "/products/moku-bottle.jpg",
    notes: {
      top: ["Black Pepper", "Cardamom Oil (Grasse)", "Pink Grapefruit"],
      heart: ["Rose de Mai Absolute", "Cedarwood Resin (Hokkaido)", "Iris Root"],
      base: ["Aged Sandalwood", "Black Ambergris", "Vanilla Absolute"],
    },
    inStock: true,
    slug: "moku",
  },
  {
    id: "en-003",
    name: "EN",
    subtitle: "Smoke & Sandalwood",
    family: "resinous",
    description:
      "The memory of ceremonial incense. En captures the ethereal thread of sacred smoke — charred cedar bark dissolving into a bed of mystic sandalwood and dark oud, creating a contemplative atmosphere.",
    price: 300,
    size: "100ml",
    sizes: [
      { variant: "50ml", price: 220, inStock: true },
      { variant: "100ml", price: 300, inStock: true },
    ],
    image: "/products/en-bottle.jpg",
    notes: {
      top: ["Saffron Threads", "Elemi Resin", "Bergamot"],
      heart: ["Sacred Sandalwood", "Incense Smoke", "Labdanum"],
      base: ["Aged Oud", "Benzoin Resin", "Patchouli Heart"],
    },
    inStock: true,
    slug: "en",
  },
  {
    id: "kin-004",
    name: "KIN",
    subtitle: "Saffron & Myrrh",
    family: "resinous",
    description:
      "The weight of precious metal. Kin fuses the ancient warmth of crocus saffron with the bitumen depth of Ethiopian myrrh, wrapped in a golden veil of honey absolute and heated amber.",
    price: 320,
    size: "100ml",
    sizes: [
      { variant: "50ml", price: 240, inStock: true },
      { variant: "100ml", price: 320, inStock: true },
    ],
    image: "/products/kin-bottle.jpg",
    notes: {
      top: ["Volatile Saffron", "Cinnamon Bark", "Blood Orange"],
      heart: ["Ethiopian Myrrh", "Honey Absolute", "Jasmine Sambac"],
      base: ["Heated Amber", "Tonka Bean", "Musk"],
    },
    inStock: true,
    slug: "kin",
  },
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "olfactory-minimalism",
    title: "Olfactory Minimalism in Modernity",
    excerpt:
      "An exploration of how the subtraction of visual stimuli enhances the sensitivity of the human visual and olfactory cortex.",
    category: "ESSAY 01 / SENSES",
    author: "KODŌ Studio",
    date: "2026-05-14",
    image: "/journal/minimalism.jpg",
    readTime: "8 min",
  },
  {
    slug: "memory-of-wood",
    title: "The Memory of Wood and Fire",
    excerpt:
      "Tracing the ancestral history of Japanese incense-making and its structural relationship with raw cedar bark.",
    category: "ESSAY 02 / MATERIALS",
    author: "KODŌ Studio",
    date: "2026-04-22",
    image: "/journal/wood-fire.jpg",
    readTime: "12 min",
  },
  {
    slug: "architecture-of-scent",
    title: "The Architecture of Scent",
    excerpt:
      "How the spatial design principles of Ma — the charged negative space — translate from physical architecture to olfactory composition.",
    category: "ESSAY 03 / SPACE",
    author: "KODŌ Studio",
    date: "2026-03-10",
    image: "/journal/architecture.jpg",
    readTime: "10 min",
  },
];

export function getProductBySlug(slug: string): ScentProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): ScentProduct[] {
  return PRODUCTS;
}

export function getJournalPosts(): JournalPost[] {
  return JOURNAL_POSTS;
}
