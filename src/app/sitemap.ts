import type { MetadataRoute } from "next";
import { resolveBaseUrl } from "@/config/site";
import { getAllProducts, getJournalPosts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = resolveBaseUrl();
  const lastModified = new Date("2026-06-01T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/story`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/concierge`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const journalRoutes: MetadataRoute.Sitemap = getJournalPosts().map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(`${article.date}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
