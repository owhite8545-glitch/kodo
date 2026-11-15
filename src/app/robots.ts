import type { MetadataRoute } from "next";
import { resolveBaseUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = resolveBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout/success", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
