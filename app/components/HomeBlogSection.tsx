"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "../news/blog-data";
import { getBlogs } from "../lib/api";
import "./HomeBlogSection.css";

interface HomeBlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  coverImage?: string;
}

export default function HomeBlogSection() {
  const [posts, setPosts] = useState<HomeBlogPostItem[]>(() => {
    return getAllBlogPosts().slice(0, 3).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      readTime: p.readTime,
      excerpt: p.excerpt.replace(/<[^>]+>/g, "").trim(),
      date: p.date,
      coverImage: p.coverImage,
    }));
  });

  useEffect(() => {
    let mounted = true;

    async function loadLatestBlogs() {
      try {
        const apiBlogs = await getBlogs();

        if (!mounted || !Array.isArray(apiBlogs) || apiBlogs.length === 0) {
          return;
        }

        const published = apiBlogs.filter(
          (b: any) => !b.status || b.status === "published" || b.status === "active"
        );

        if (published.length > 0) {
          const mappedApiBlogs: HomeBlogPostItem[] = published.map((b: any) => {
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
              category: b.category || "Hair & Beauty",
              readTime: b.readingTime || "5 min read",
              excerpt: (b.excerpt || "").replace(/<[^>]+>/g, "").trim(),
              date: dateStr,
              coverImage: b.coverImage || "/images/styluxe/salon-interior.jpg",
            };
          });

          setPosts(mappedApiBlogs.slice(0, 3));
        }
      } catch (err) {
        console.warn("[HomeBlogSection] Failed to load latest blogs:", err);
      }
    }

    loadLatestBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="tm-home-blog-section">
      <div className="tm-container">
        <div className="tm-home-blog-header">
          <div className="tm-home-blog-heading-wrap">
            <span className="tm-home-blog-eyebrow">Beauty Journal &amp; News</span>
            <h2 className="tm-home-blog-heading">
              Hair Care, Trends &amp; Updates
            </h2>
            <p className="tm-home-blog-description">
              Explore expert hair and skin rituals, bridal beauty guides, modern
              grooming advice, and salon franchise insights from Styluxe.
            </p>
          </div>

          <Link href="/news" className="tm-home-blog-view-all">
            View all articles
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="tm-home-blog-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="tm-home-blog-card"
            >
              {post.coverImage && (
                <div className="tm-home-blog-image-wrap">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="tm-home-blog-image"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="tm-home-blog-content">
                <div className="tm-home-blog-meta">
                  <span className="tm-home-blog-category">{post.category}</span>
                  <span className="tm-home-blog-read-time">{post.readTime}</span>
                </div>

                <h3 className="tm-home-blog-title">{post.title}</h3>
                <p className="tm-home-blog-excerpt">{post.excerpt}</p>

                <div className="tm-home-blog-card-footer">
                  <span className="tm-home-blog-date">{post.date}</span>
                  <span className="tm-home-blog-read">
                    Read article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="tm-home-blog-mobile-action">
          <Link href="/news" className="tm-home-blog-view-all">
            View all articles
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
