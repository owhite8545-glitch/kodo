import type { ScentProduct, JournalArticle } from "@/types/webgl";

export interface EditorialJournalArticle extends JournalArticle {
  readonly relatedProductSlug?: string;
}

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
    image: "/images/products/so/pure-product.jpg",
    images: {
      hero: "/images/products/so/hero.jpg",
      pureProduct: "/images/products/so/pure-product.jpg",
      detail: "/images/products/so/detail.jpg",
      socialOg: "/images/products/so/social-og.png",
    },
    ogDimensions: {
      width: 1024,
      height: 539,
    },
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
    image: "/images/products/moku/pure-product.jpg",
    images: {
      hero: "/images/products/moku/hero.jpg",
      pureProduct: "/images/products/moku/pure-product.jpg",
      detail: "/images/products/moku/detail.jpg",
      socialOg: "/images/products/moku/social-og.png",
    },
    ogDimensions: {
      width: 1024,
      height: 535,
    },
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
    image: "/images/products/en/pure-product.jpg",
    images: {
      hero: "/images/products/en/hero.jpg",
      pureProduct: "/images/products/en/pure-product.jpg",
      detail: "/images/products/en/detail.jpg",
      socialOg: "/images/products/en/social-og.png",
    },
    ogDimensions: {
      width: 1024,
      height: 539,
    },
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
    image: "/images/products/kin/pure-product.jpg",
    images: {
      hero: "/images/products/kin/hero.jpg",
      pureProduct: "/images/products/kin/pure-product.jpg",
      detail: "/images/products/kin/detail.jpg",
      socialOg: "/images/products/kin/social-og.png",
    },
    ogDimensions: {
      width: 1024,
      height: 538,
    },
    notes: {
      top: ["Volatile Saffron", "Cinnamon Bark", "Blood Orange"],
      heart: ["Ethiopian Myrrh", "Honey Absolute", "Jasmine Sambac"],
      base: ["Heated Amber", "Tonka Bean", "Musk"],
    },
    inStock: true,
    slug: "kin",
  },
];

export const JOURNAL_POSTS: EditorialJournalArticle[] = [
  {
    slug: "olfactory-minimalism",
    title: "Olfactory Minimalism in Modernity",
    excerpt:
      "An exploration of how the subtraction of visual stimuli enhances the sensitivity of the human visual and olfactory cortex.",
    category: "ESSAY 01 / SENSES",
    author: "KODŌ Studio",
    date: "2026-05-14",
    image: "/images/products/so/detail.jpg",
    readTime: "8 min",
    relatedProductSlug: "so",
    content: [
      "Contemporary culture saturates every sense simultaneously. When both vision and sound are crowded by perpetual signage, our capacity to register delicate aromatic transitions collapses into background noise.",
      "In the Japanese listening room, a single raw vessel is placed in restrained low light precisely so the observer's attention shifts inward. Removing peripheral ornament does not impoverish the experience; it sharpens contrast around the fleeting chemistry rising from warm skin.",
      "Across the KODŌ collection, restraint begins at the molecular level. Rather than stacking forty competing synthetics to chase instant shelf impact, each extrait centers around three structural accords built from mineral salts, cold-pressed cypress, and aged resins.",
      "Because less volatiles clamor for dominance in the first thirty seconds, the middle and base registers emerge slowly across six to ten hours—turning personal wear into an unhurried temporal study rather than a single static statement.",
    ].join("\n\n"),
    footnotes: [
      "Recorded in our Tokyo Aoyama listening room study on sensory threshold calibration, Spring 2026.",
      "SŌ mineral vapor accords utilize cold-vacuum extraction to preserve transient marine aldehydes.",
    ],
  },
  {
    slug: "memory-of-wood",
    title: "The Memory of Wood and Fire",
    excerpt:
      "Tracing the ancestral history of Japanese incense-making and its structural relationship with raw cedar bark.",
    category: "ESSAY 02 / MATERIALS",
    author: "KODŌ Studio",
    date: "2026-04-22",
    image: "/images/products/moku/detail.jpg",
    readTime: "12 min",
    relatedProductSlug: "moku",
    content: [
      "Long before alcohol perfumery became an architectural medium, Mon-kō—the practice of 'listening to incense'—treated heated aromatic woods as vessels of memory, season, and provenance.",
      "When raw Yoshino hinoki or charred cedar bark encounters gentle indirect heat over ash and mica plates, moisture evacuates before resin liquefies. That delayed release creates a quiet boundary between clean timber and dark smoke.",
      "In formulating MOKU and EN, our perfumers studied how aged heartwood retains micro-traces of soil, rain, and kiln smoke decades after harvest. By pairing dry cedarwood fractions with black amber and labdanum, we transpose slow ash-heated resonance into cold Extrait form.",
      "Every raw timber batch rests in dark borosilicate demijohns for ninety days prior to filtration, allowing harsh edges to settle into a velvet, contemplative skin trail.",
    ].join("\n\n"),
    footnotes: [
      "Material reference: Aged Yoshino Hinoki & smoked cedar fractions aged 90 days in borosilicate glass.",
      "Direct ash-plate distillation studies conducted between Kyoto artisan kilns and Paris extraction labs.",
    ],
  },
  {
    slug: "architecture-of-scent",
    title: "The Architecture of Scent",
    excerpt:
      "How the spatial design principles of Ma — the charged negative space — translate from physical architecture to olfactory composition.",
    category: "ESSAY 03 / SPACE",
    author: "KODŌ Studio",
    date: "2026-03-10",
    image: "/images/products/en/detail.jpg",
    readTime: "10 min",
    relatedProductSlug: "en",
    content: [
      "In structural architecture, a wall only gains presence through the emptiness it frames. This principle—Ma, the deliberate pause between surfaces—serves as the primary compositional grammar for all four KODŌ states.",
      "An unedited perfume acts like a room packed wall-to-wall with furniture: dense, suffocating, and devoid of spatial rhythm. To construct depth, a perfumer must design intentional hollows where skin chemistry and ambient air complete the accord.",
      "Both our architectural philosophy and our hand-blown borosilicate flacons follow this geometric dialogue. Clear structural planes capture ambient shadow while dark matte mineral collars ground the vessel in weight and permanence.",
      "As EN, SŌ, MOKU, and KIN evolve across temperature shifts from morning air to midnight interiors, those negative spaces allow light, breath, and individual memory to inhabit the composition.",
    ].join("\n\n"),
    footnotes: [
      "Flacon geometry: Heavy-walled borosilicate glass paired with anodized dark basalt-toned closures.",
      "Ma spatial cadence references architectural essays curated for KODŌ's Paris Marais exhibition.",
    ],
  },
];

export function getProductBySlug(slug: string): ScentProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  excludeSlug: string,
  limit = 3
): ScentProduct[] {
  return PRODUCTS.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export function getAllProducts(): ScentProduct[] {
  return PRODUCTS;
}

export function getJournalPosts(): EditorialJournalArticle[] {
  return JOURNAL_POSTS;
}

export function getJournalArticleBySlug(
  slug: string
): EditorialJournalArticle | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}
