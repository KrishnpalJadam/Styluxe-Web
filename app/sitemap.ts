import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./news/blog-data";
import { getBlogs, getCentres, getFranchiseOpportunities } from "./lib/api";

export const dynamic = "force-static";

const STATIC_LAST_MODIFIED = new Date("2026-11-25T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

  // 1. Primary Public Canonical Salon Routes
  const staticRoutes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1.0, "weekly"],
    ["/services/", 0.95, "weekly"],
    ["/salon-franchise-india/", 0.95, "weekly"],
    ["/best-salon-franchise-india/", 0.9, "weekly"],
    ["/franchise/", 0.9, "weekly"],
    ["/salon-locations/", 0.9, "weekly"],
    ["/about-us/", 0.85, "monthly"],
    ["/offers/", 0.85, "weekly"],
    ["/reviews/", 0.85, "weekly"],
    ["/news/", 0.85, "weekly"],
    ["/our-team/", 0.75, "monthly"],
    ["/privacy-policy/", 0.5, "yearly"],
  ];

  const staticPages = staticRoutes.map(([path, priority, changeFrequency]) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency,
    priority,
  }));

  // 2. Published News & Beauty Journal Articles
  const blogMap = new Map<string, { lastModified: Date }>();

  try {
    const apiBlogs = await getBlogs();
    if (Array.isArray(apiBlogs)) {
      for (const b of apiBlogs) {
        if (
          b &&
          typeof b.slug === "string" &&
          b.slug.trim().length > 0 &&
          b.status === "published"
        ) {
          const rawDate = b.updatedAt || b.publishDate || b.createdAt;
          blogMap.set(b.slug.trim(), {
            lastModified: rawDate ? new Date(rawDate) : STATIC_LAST_MODIFIED,
          });
        }
      }
    }
  } catch (err) {
    console.warn("[sitemap] Failed to fetch news articles from API:", err);
  }

  for (const post of BLOG_POSTS) {
    if (post.slug && !blogMap.has(post.slug)) {
      blogMap.set(post.slug, {
        lastModified: post.isoDate ? new Date(post.isoDate) : STATIC_LAST_MODIFIED,
      });
    }
  }

  const newsPages = Array.from(blogMap.entries()).map(([slug, meta]) => ({
    url: `${base}/news/${encodeURIComponent(slug)}/`,
    lastModified: meta.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // 3. Active Salon Franchise Territory Pages
  const franchisePages: MetadataRoute.Sitemap = [];
  try {
    const opportunities = await getFranchiseOpportunities("active");
    if (Array.isArray(opportunities)) {
      const seenSlugs = new Set<string>();
      for (const item of opportunities) {
        if (
          item &&
          typeof item.slug === "string" &&
          item.slug.trim().length > 0 &&
          item.status === "active" &&
          !seenSlugs.has(item.slug.trim())
        ) {
          seenSlugs.add(item.slug.trim());
          const rawDate = item.updatedAt || item.createdAt;
          franchisePages.push({
            url: `${base}/franchise/${encodeURIComponent(item.slug.trim())}/`,
            lastModified: rawDate ? new Date(rawDate) : STATIC_LAST_MODIFIED,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          });
        }
      }
    }
  } catch (err) {
    console.warn("[sitemap] Failed to fetch franchise opportunities:", err);
  }

  // 4. Active Salon Studio Pages (/salon-locations/studio/?slug=...)
  const studioPages: MetadataRoute.Sitemap = [];
  try {
    const centres = await getCentres("active");
    if (Array.isArray(centres)) {
      const seenSlugs = new Set<string>();
      for (const c of centres) {
        if (
          c &&
          typeof c.slug === "string" &&
          c.slug.trim().length > 0 &&
          c.status === "active" &&
          !seenSlugs.has(c.slug.trim())
        ) {
          seenSlugs.add(c.slug.trim());
          const rawDate = c.updatedAt || c.createdAt;
          studioPages.push({
            url: `${base}/salon-locations/studio/?slug=${encodeURIComponent(c.slug.trim())}`,
            lastModified: rawDate ? new Date(rawDate) : STATIC_LAST_MODIFIED,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          });
        }
      }
    }
  } catch (err) {
    console.warn("[sitemap] Failed to fetch salon studios:", err);
  }

  return [...staticPages, ...newsPages, ...franchisePages, ...studioPages];
}
