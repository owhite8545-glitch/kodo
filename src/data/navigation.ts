export const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "The Story" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/concierge", label: "Concierge" },
];

export const NAV_LINKS = MENU_LINKS.filter((link) => link.href !== "/");
