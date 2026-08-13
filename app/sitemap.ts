import { MetadataRoute } from "next";
import { getGrounds, getScarves } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sazejefootball.nl";

  const staticRoutes = ["", "/about", "/contact", "/grounds", "/map", "/scarves"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const grounds = getGrounds().map((g) => ({
    url: `${baseUrl}/grounds/${g.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const scarves = getScarves().map((s) => ({
    url: `${baseUrl}/scarves/new/${encodeURIComponent(s.country)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...grounds, ...scarves];
}
