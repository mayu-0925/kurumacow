import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

const BASE_URL = "https://kurumacow.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/ranking`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
