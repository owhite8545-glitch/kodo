export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface StudioLocation {
  readonly id: string;
  readonly region: string;
  readonly district: string;
  readonly title: string;
  readonly street: string;
  readonly cityPostal: string;
  readonly phone: string;
  readonly hours: string;
  readonly timezone: string;
  readonly appointmentsNote: string;
  readonly image: string;
  readonly imageAlt: string;
}

export interface AtelierTeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly location: string;
}

/**
 * Resolves the canonical application base URL safely across local dev,
 * Vercel preview/production environments, and custom deployments without
 * throwing during build-time metadata evaluation.
 */
export function resolveBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (configured) {
    return normalizeOrigin(configured);
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) {
    return normalizeOrigin(
      vercelProd.startsWith("http") ? vercelProd : `https://${vercelProd}`
    );
  }

  const vercelPreview = process.env.VERCEL_URL?.trim();
  if (vercelPreview) {
    return normalizeOrigin(
      vercelPreview.startsWith("http")
        ? vercelPreview
        : `https://${vercelPreview}`
    );
  }

  return "http://localhost:3000";
}

function normalizeOrigin(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_CONFIG = {
  brand: {
    name: "KODŌ",
    wordmark: "K O D Ō",
    fullName: "KODŌ Fragrances",
    tagline: "The Geometry of Memory",
    heroEyebrow: "KODŌ — Olfactory Architecture",
    heroTitleLine1: "Where Scent Becomes",
    heroTitleLine2: "Architecture",
    heroSubtitle:
      "Four architectural distillations in hand-blown borosilicate flacons. Composed in the tradition of Japanese craft.",
    description:
      "An editorial olfactory atelier where architectural minimalism meets ancient Japanese incense craft. Four extraits crafted with cold-pressed resins, mineral distillations, and structural restraint.",
    keywords: [
      "KODŌ",
      "luxury fragrance",
      "Japanese perfume house",
      "extrait de parfum",
      "niche perfumery",
      "olfactory architecture",
      "botanical resin fragrance",
    ],
    philosophyQuote:
      "In the spaces between notes, the architecture of memory is revealed.",
    philosophyAttribution: "— KODŌ Studio, 2026",
    copyright: "© 2026 KODŌ Fragrances. All rights reserved.",
  },
  contact: {
    conciergeEmail: "concierge@kodo-fragrances.com",
    pressEmail: "press@kodo-fragrances.com",
    responseWindow:
      "Private inquiries are answered within one business day across Tokyo and Paris studios.",
    consultationHours: {
      days: "Tuesday — Saturday",
      hours: "11:00 — 19:00",
      note: "Private scent fittings and bespoke commission reviews are available in studio or via video appointment.",
    },
  },
  studios: [
    {
      id: "tokyo",
      region: "Japan",
      district: "Aoyama",
      title: "Tokyo / Aoyama",
      street: "5-11-23 Minami-Aoyama, Minato-ku",
      cityPostal: "Tokyo 107-0062, Japan",
      phone: "+81 3 5550 0142",
      hours: "Tue — Sun, 11:00 — 19:00 JST",
      timezone: "JST",
      appointmentsNote:
        "Quiet listening room for raw resin auditions and custom ceramic vessels.",
      image: "/images/studios/tokyo-aoyama-sanctuary.jpg",
      imageAlt:
        "KODŌ Tokyo Minami-Aoyama Sanctuary — charred yakisugi cedar and basalt plinth with smoked-glass flacon under raking skylight",
    },
    {
      id: "paris",
      region: "France",
      district: "Le Marais",
      title: "Paris / Le Marais",
      street: "18 Rue de la Verrerie, 75004",
      cityPostal: "Paris, France",
      phone: "+33 1 42 68 01 18",
      hours: "Tue — Sat, 11:00 — 19:00 CET",
      timezone: "CET",
      appointmentsNote:
        "Archival formulation library and private architectural scent consultations.",
      image: "/images/studios/paris-marais-salon.jpg",
      imageAlt:
        "KODŌ Paris Le Marais Salon — dark mineral plaster moldings and honed limestone table with amber flacon in soft courtyard light",
    },
  ] as readonly StudioLocation[],
  team: [
    {
      name: "Kenji Takahashi",
      role: "Master Perfumer & Head of Formulation",
      bio: "Trained in Kyoto incense lineage and Grasse molecular extraction, shaping KODŌ’s mineral and resinous grammar.",
      location: "Tokyo",
    },
    {
      name: "Claire Moreau",
      role: "Creative & Spatial Director",
      bio: "Architect turned vessel designer overseeing borosilicate flacon proportions, exhibition rooms, and packaging materiality.",
      location: "Paris",
    },
    {
      name: "Sora Watanabe",
      role: "Director of Patron Concierge",
      bio: "Leads private commissions, hospitality scent partnerships, and collector archive allocations globally.",
      location: "Tokyo / Paris",
    },
  ] as readonly AtelierTeamMember[],
  navigation: {
    primary: [
      { label: "Collections", href: "/collections" },
      { label: "The Story", href: "/story" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Concierge", href: "/concierge" },
    ] as readonly NavItem[],
    drawer: [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" },
      { label: "The Story", href: "/story" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Concierge", href: "/concierge" },
    ] as readonly NavItem[],
    legal: [
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Sale", href: "/terms" },
    ] as readonly NavItem[],
  },
} as const;
