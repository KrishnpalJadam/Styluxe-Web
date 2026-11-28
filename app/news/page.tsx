import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, JsonLd } from "../components";
import { getAllBlogPosts, BlogPost } from "./blog-data";
import { BlogClient } from "./blog-client";
import { getBlogs } from "../lib/api";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Beauty Journal, Hair Care & Salon Franchise News | Styluxe Salons",
  description:
    "Read the Styluxe Salons beauty journal for expert hair care rituals, botanical skincare guides, bridal preparation timelines, and salon franchise insights across India.",
  keywords: [
    "Styluxe news",
    "Styluxe beauty journal",
    "salon franchise India guide",
    "keratin vs hair botox guide",
    "botanical hydra facial tips",
    "pre bridal skincare timeline",
    "luxury unisex salon trends India",
  ],
  alternates: { canonical: `${siteUrl}/news/` },
  openGraph: {
    title: "Beauty Journal, Hair Care & Salon Franchise News | Styluxe Salons",
    description:
      "Expert hair science, botanical skincare rituals, bridal preparation advice, and salon franchise insights from Styluxe Salons.",
    url: `${siteUrl}/news/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 675,
        alt: "Styluxe Salons Beauty Journal & News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Beauty Journal & Salon News",
    description:
      "Curated hair care rituals, botanical skincare guides, bridal beauty advice, and salon franchise insights.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

export default async function NewsIndexPage() {
  let posts: BlogPost[] = getAllBlogPosts();

  try {
    const apiBlogs = await getBlogs();
    if (Array.isArray(apiBlogs) && apiBlogs.length > 0) {
      const mappedApiBlogs: BlogPost[] = apiBlogs.map((b: any) => {
        const rawDate = b.publishDate || b.createdAt;
        const dateStr = rawDate
          ? new Date(rawDate).toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })
          : "Recent";

        return {
          id: b.id,
          slug: b.slug,
          title: b.title,
          subtitle: (b.excerpt || "").replace(/<[^>]+>/g, ""),
          excerpt: (b.excerpt || "").replace(/<[^>]+>/g, ""),
          category: (b.category as any) || "Hair Care",
          readTime: b.readingTime || "5 min read",
          date: dateStr,
          isoDate: b.publishDate || b.createdAt || new Date().toISOString(),
          isFeatured: Boolean(b.isFeatured),
          author: {
            name: b.author || "Styluxe Editorial Team",
            role: b.authorDesignation || "Styluxe Beauty & Research",
            avatar: b.authorAvatar || "/images/styluxe/salon-interior.jpg",
          },
          tags: b.seoKeywords
            ? b.seoKeywords.split(",").map((s: string) => s.trim())
            : [b.category || "Beauty"],
          coverImage: b.coverImage || "/images/styluxe/salon-interior.jpg",
          metaDescription: (b.metaDescription || b.excerpt || "").replace(/<[^>]+>/g, ""),
          keywords: b.seoKeywords
            ? b.seoKeywords.split(",").map((s: string) => s.trim())
            : [],
          content: {
            intro: (b.excerpt || "").replace(/<[^>]+>/g, ""),
            keyTakeaway: "",
            rawHtml: b.content || "",
            sections: [],
            conclusion: "",
          },
        };
      });

      if (mappedApiBlogs.length > 0) {
        posts = mappedApiBlogs.sort((a, b) => {
          const featA = a.isFeatured ? 1 : 0;
          const featB = b.isFeatured ? 1 : 0;
          if (featA !== featB) return featB - featA;
          return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
        });
      }
    }
  } catch (_) { }

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/news/#blog`,
        name: "Styluxe Beauty & Franchise Journal",
        url: `${siteUrl}/news/`,
        description:
          "Official publication of Styluxe Salons covering hair artistry, botanical skincare, grooming rituals, and salon franchise guides.",
        publisher: {
          "@type": "Organization",
          name: "Styluxe Salons",
          url: siteUrl,
          logo: `${siteUrl}/images/styluxe-emblem.svg`,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}/news/${post.slug}/#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl}/news/${post.slug}/`,
          datePublished: post.isoDate,
          author: {
            "@type": "Organization",
            name: post.author.name,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "News & Journal", item: `${siteUrl}/news/` },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/news" />

      {/* MINIMAL CENTERED EDITORIAL MASTHEAD */}
      <section
        className="stx-page-hero stx-page-hero--news"
        aria-labelledby="stx-news-title"
      >
        <div className="stx-page-hero__inner stx-page-hero__inner--centered">
          <nav className="stx-page-hero__crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>News &amp; Journal</span>
          </nav>

          <p className="stx-page-hero__eyebrow">
            <img
              src="/images/styluxe-emblem.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
            />
            THE STYLUXE JOURNAL
          </p>

          <h1 id="stx-news-title" className="stx-page-hero__title">
            Care, Craft &amp; <em>Modern Beauty</em>
          </h1>

          <p className="stx-page-hero__lead">
            Thoughtful guides from our senior hair directors, skin aestheticians, and
            salon business advisors — crafted to elevate your daily rituals and studio vision.
          </p>

          <div className="stx-page-hero__actions">
            <Link href="/services" className="stx-hero-pill-link">
              Explore Services
            </Link>
            <Link href="/salon-franchise-india" className="stx-hero-pill-link stx-hero-pill-link--muted">
              Salon Franchise Insights →
            </Link>
          </div>
        </div>
      </section>

      <main id="top">
        <BlogClient initialPosts={posts} />
      </main>

      <Footer />
      <JsonLd data={blogSchema} />
    </div>
  );
}
