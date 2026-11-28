import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Footer, JsonLd } from "../../components";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts, BlogPost } from "../blog-data";
import { ShareButtons } from "./share-buttons";
import { RelatedBlogs } from "./related-blogs";
import { getBlogs, getBlogBySlug } from "../../lib/api";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export async function generateStaticParams() {
  try {
    const staticPosts = getAllBlogPosts();

    const dbBlogs = await getBlogs();

    const staticSlugs = staticPosts
      .filter((post) => post.slug)
      .map((post) => post.slug);

    const apiSlugs = Array.isArray(dbBlogs)
      ? dbBlogs
        .filter(
          (blog: any) =>
            blog.slug &&
            (!blog.status ||
              blog.status.toLowerCase() === "published")
        )
        .map((blog: any) => blog.slug)
      : [];

    const allSlugs = [...new Set([...staticSlugs, ...apiSlugs])];

    return allSlugs.map((slug) => ({ slug }));
  } catch (error) {
    return getAllBlogPosts().map((post) => ({
      slug: post.slug,
    }));
  }
}

async function resolveBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const apiBlog = await getBlogBySlug(slug);
    if (apiBlog && (apiBlog.status === "published" || !apiBlog.status)) {
      const rawDate = apiBlog.publishDate || apiBlog.createdAt;
      const dateStr = rawDate
        ? new Date(rawDate).toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        })
        : "Recent";
      const sc = apiBlog.structuredContent || {};
      const hasStructuredSections = Array.isArray(sc.sections) && sc.sections.length > 0;

      return {
        id: apiBlog.id,
        slug: apiBlog.slug,
        title: apiBlog.title,
        subtitle: (apiBlog.subtitle || apiBlog.excerpt || "").replace(/<[^>]+>/g, "").trim(),
        excerpt: (apiBlog.excerpt || "").replace(/<[^>]+>/g, "").trim(),
        category: (apiBlog.category as any) || "Hair Care",
        readTime: apiBlog.readingTime || "5 min read",
        date: dateStr,
        isoDate: apiBlog.publishDate || apiBlog.createdAt || new Date().toISOString(),
        author: {
          name: apiBlog.author || "Styluxe Editorial Team",
          role: apiBlog.authorDesignation || "Styluxe Beauty & Research",
          avatar: apiBlog.authorAvatar || "/images/styluxe/salon-interior.jpg",
        },
        tags: apiBlog.seoKeywords
          ? apiBlog.seoKeywords.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [apiBlog.category || "Beauty"],
        coverImage: apiBlog.coverImage || "/images/styluxe/salon-interior.jpg",
        metaDescription: (apiBlog.metaDescription || apiBlog.excerpt || "").replace(/<[^>]+>/g, "").trim(),
        keywords: apiBlog.seoKeywords
          ? apiBlog.seoKeywords.split(",").map((s: string) => s.trim()).filter(Boolean)
          : ["salon franchise", "Styluxe journal"],
        content: {
          intro: (sc.intro || apiBlog.excerpt || "").replace(/<[^>]+>/g, "").trim(),
          keyTakeaway: sc.keyTakeaway || "",
          rawHtml: hasStructuredSections ? "" : (sc.rawHtml || (typeof apiBlog.content === "string" ? apiBlog.content : "")),
          sections: hasStructuredSections ? sc.sections : [],
          conclusion: sc.conclusion || "",
        },
      };
    }
  } catch (_) { }

  const staticPost = getBlogPostBySlug(slug);
  if (staticPost) return staticPost;

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolveBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Styluxe Salons",
      description: "The requested article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postUrl = `${siteUrl}/news/${encodeURIComponent(post.slug)}/`;

  return {
    title: `${post.title} | Styluxe Salons`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolveBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3);
  const postUrl = `${siteUrl}/news/${encodeURIComponent(post.slug)}/`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "Blog",
          "@id": `${siteUrl}/news/#blog`,
          name: "Styluxe Beauty & Franchise Journal",
        },
        headline: post.title,
        description: post.excerpt,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        mainEntityOfPage: postUrl,
        author: {
          "@type": "Organization",
          name: post.author.name,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Styluxe Salons",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/styluxe-emblem.svg`,
          },
        },
        image: post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`,
        keywords: post.keywords.join(", "),
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "News & Journal",
            item: `${siteUrl}/news/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="tm-page">
      <Header active="/news" />

      {/* Post Header */}
      <header className="tm-post-header">
        <div className="tm-container">
          <nav aria-label="Breadcrumb" className="tm-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/news">News &amp; Journal</Link>
            <span>/</span>
            <span style={{ color: "var(--tm-teal)" }}>{post.category}</span>
          </nav>

          <span className="tm-eyebrow">{post.category}</span>
          <h1 className="tm-post-title">{post.title}</h1>
          <p className="tm-lead" style={{ maxWidth: "800px", marginBottom: "20px" }}>
            {post.subtitle}
          </p>

          <div className="tm-post-meta-row">
            <div className="tm-post-author">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              </svg>
              <span>{post.author.name}</span>
            </div>
            <div className="tm-post-author-dot"></div>
            <span>{post.date}</span>
            <div className="tm-post-author-dot"></div>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Main Post Layout */}
      <main id="top" className="tm-container">
        <div className="tm-post-layout">
          {/* Left Column: Article Body */}
          <article className="tm-post-main">
            <div className="tm-article-body">
              {post.content.intro && !post.content.rawHtml && (
                <p className="tm-lead">{post.content.intro}</p>
              )}

              {post.content.keyTakeaway ? (
                <div className="tm-callout-box" role="region" aria-label="Key Takeaway">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Styluxe Expert Takeaway
                  </h4>
                  <p>{post.content.keyTakeaway}</p>
                </div>
              ) : null}

              {post.content.rawHtml ? (
                <div
                  className="tm-article-raw-html"
                  dangerouslySetInnerHTML={{ __html: post.content.rawHtml }}
                />
              ) : (
                post.content.sections.map((sec) => (
                  <section key={sec.id} id={sec.id}>
                    <h2>{sec.heading}</h2>

                    {sec.body.map((p, idx) => (
                      /<[a-z][\s\S]*>/i.test(p) ? (
                        <div key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                      ) : (
                        <p key={idx}>{p}</p>
                      )
                    ))}

                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <ul>
                        {sec.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx}>{bp}</li>
                        ))}
                      </ul>
                    )}

                    {sec.quote && (
                      <blockquote>
                        <p>"{sec.quote}"</p>
                      </blockquote>
                    )}

                    {sec.tableData && (
                      <div className="tm-inv-table-wrap" style={{ margin: "28px 0" }}>
                        <table className="tm-inv-table">
                          <thead>
                            <tr>
                              {sec.tableData.headers.map((th, thIdx) => (
                                <th key={thIdx}>{th}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sec.tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx}>
                                    {cIdx === 0 ? <strong>{cell}</strong> : cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))
              )}

              {post.content.conclusion ? (
                <section id="conclusion">
                  <h2>Conclusion &amp; Next Steps</h2>
                  <p>{post.content.conclusion}</p>
                </section>
              ) : null}

              {/* Bottom Social Share */}
              <div style={{ marginTop: "32px", padding: "20px 24px", background: "var(--tm-cream-card)", border: "1px solid var(--tm-teal-border)", borderRadius: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--tm-teal)", display: "block", marginBottom: "8px" }}>
                  Share this guide with friends &amp; beauty enthusiasts:
                </span>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* Franchise Bottom CTA */}
              <aside className="tm-post-cta-banner">
                <div>
                  <span className="tm-eyebrow tm-eyebrow-light">Styluxe Franchise Opportunity</span>
                  <h3>Launch Your Own Styluxe Luxury Unisex Salon</h3>
                  <p>
                    Bring affordable luxury hair, skin, and grooming care to your neighbourhood. Turnkey studio architecture, Styluxe Academy training, and smart booking CRM starting at ₹7.99 Lakhs.
                  </p>
                </div>
                <Link
                  href="/salon-franchise-india#apply"
                  className="tm-btn tm-btn-yellow"
                  style={{ flexShrink: 0 }}
                >
                  Explore Franchise
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </aside>
            </div>
          </article>

          {/* Right Column: Sticky Sidebar */}
          <aside className="tm-post-sidebar">
            {post.content.sections && post.content.sections.length > 0 && (
              <div className="tm-sidebar-widget">
                <h3 className="tm-sidebar-title">Table of Contents</h3>
                <nav aria-label="Table of contents">
                  <ul className="tm-toc-list">
                    {post.content.sections.map((sec) => (
                      <li key={sec.id}>
                        <a href={`#${sec.id}`} className="tm-toc-link">
                          {sec.heading}
                        </a>
                      </li>
                    ))}
                    {post.content.conclusion && (
                      <li>
                        <a href="#conclusion" className="tm-toc-link">
                          Conclusion &amp; Next Steps
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}

            {/* Author / Editorial Desk Card */}
            <div className="tm-sidebar-widget">
              <h3 className="tm-sidebar-title">About the Author</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "var(--tm-teal)",
                    color: "var(--tm-yellow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--tm-font-serif)",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  SL
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "14px", color: "var(--tm-teal)" }}>
                    {post.author.name}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--tm-teal-muted)" }}>
                    {post.author.role}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: "12.5px", color: "var(--tm-teal-muted)", lineHeight: 1.5, margin: 0 }}>
                Styluxe Editorial brings together senior hair directors, skin aestheticians, and salon retail advisors across India.
              </p>
            </div>

            {/* Fast Franchise Quick Link */}
            <div
              className="tm-sidebar-widget"
              style={{
                background: "var(--tm-teal)",
                color: "var(--tm-cream)",
                borderColor: "rgba(214, 199, 178, 0.35)",
              }}
            >
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--tm-yellow)",
                }}
              >
                Franchise 2026
              </span>
              <h4
                style={{
                  fontFamily: "var(--tm-font-serif)",
                  fontSize: "20px",
                  color: "var(--tm-cream)",
                  margin: "8px 0 10px 0",
                  lineHeight: 1.25,
                }}
              >
                Own a Luxury Styluxe Salon
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(250, 248, 244, 0.85)",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                Turnkey setups starting at ₹7.99 Lakhs. Certified stylist training, serene architecture, and recurring memberships.
              </p>
              <Link
                href="/salon-franchise-india#apply"
                className="tm-btn tm-btn-yellow tm-btn-sm"
                style={{ width: "100%" }}
              >
                View Franchise Models
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        <RelatedBlogs
          currentSlug={post.slug}
          currentCategory={post.category}
          initialRelated={related.map((rel) => ({
            id: rel.id,
            slug: rel.slug,
            title: rel.title,
            category: rel.category,
            readTime: rel.readTime,
            excerpt: (rel.excerpt || "").replace(/<[^>]+>/g, "").trim(),
            date: rel.date,
          }))}
        />
      </main>

      <Footer />
      <JsonLd data={schema} />
    </div>
  );
}
