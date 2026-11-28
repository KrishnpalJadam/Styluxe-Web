export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: "Salon Franchise" | "Hair Care" | "Skin & Glow" | "Grooming & Bridal" | (string & {});
  readTime: string;
  date: string;
  isoDate: string;
  isFeatured?: boolean;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  coverImage: string;
  metaDescription: string;
  keywords: string[];
  content: {
    intro: string;
    keyTakeaway: string;
    rawHtml?: string;
    sections: {
      heading: string;
      id: string;
      body: string[];
      bulletPoints?: string[];
      quote?: string;
      tableData?: {
        headers: string[];
        rows: string[][];
      };
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug);
  if (!current) return others.slice(0, count);

  const sameCategory = others.filter((p) => p.category === current.category);
  const differentCategory = others.filter((p) => p.category !== current.category);

  return [...sameCategory, ...differentCategory].slice(0, count);
}
