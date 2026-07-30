import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KODŌ — The Geometry of Memory",
    template: "%s | KODŌ Fragrances",
  },
  description:
    "KODŌ is a luxury fragrance house blending traditional Japanese design philosophy with hyper-modern structural geometry. Explore our olfactory architecture.",
  keywords: [
    "luxury fragrance",
    "KODŌ",
    "perfume",
    "olfactory architecture",
    "premium scent",
    "quiet luxury",
  ],
  authors: [{ name: "KODŌ Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kodo-fragrances.com",
    siteName: "KODŌ Fragrances",
    title: "KODŌ — The Geometry of Memory",
    description:
      "A luxury fragrance house where traditional craft meets structural geometry.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KODŌ — The Geometry of Memory",
    description:
      "A luxury fragrance house where traditional craft meets structural geometry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable}`}
    >
      <body>
        {/* WCAG 2.4.1: Skip Navigation Link */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        {children}

        {/* Structured Data: JSON-LD Schema for AI Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              name: "KODŌ Fragrances",
              description:
                "High-end luxury perfume house blending traditional Ma space design with precision structural web architecture.",
              url: "https://kodo-fragrances.com",
              category: "Luxury Beauty / Fragrance",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "180",
                highPrice: "320",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
