import React from "react";
import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSans } from "@/styles/fonts";
import { resolveBaseUrl, SITE_CONFIG } from "@/config/site";
import "./globals.css";

const baseUrl = resolveBaseUrl();

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_CONFIG.brand.name} — ${SITE_CONFIG.brand.tagline}`,
    template: `%s | ${SITE_CONFIG.brand.fullName}`,
  },
  description: SITE_CONFIG.brand.description,
  keywords: [...SITE_CONFIG.brand.keywords],
  openGraph: {
    title: `${SITE_CONFIG.brand.name} — ${SITE_CONFIG.brand.tagline}`,
    description: SITE_CONFIG.brand.description,
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.brand.name,
    url: baseUrl,
    images: [
      {
        url: "/images/products/so/social-og.png",
        width: 1024,
        height: 538,
        alt: `${SITE_CONFIG.brand.fullName} — Architectural Fragrances`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.brand.name} — ${SITE_CONFIG.brand.tagline}`,
    description: SITE_CONFIG.brand.description,
    images: ["/images/products/so/social-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.brand.fullName,
    url: baseUrl,
    email: SITE_CONFIG.contact.conciergeEmail,
    description: SITE_CONFIG.brand.description,
    logo: `${baseUrl}/images/products/so/pure-product.jpg`,
  };

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
