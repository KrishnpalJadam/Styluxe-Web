// Client & Server API utility for Styluxe Salons website
// Connected dynamically to Skillify Backend Mini Web & Branch Appointment APIs.

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_SKILLIFY_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://skillifysalon.ashokagroup.org/respark-api/api/v1";

export const SALON_SLUG =
  process.env.NEXT_PUBLIC_SALON_SLUG || "skillify";

const slugify = (value: string) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export type MiniWebPayload = {
  salon?: {
    id: string;
    name: string;
    slug: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
    currency?: string | null;
    logoUrl?: string | null;
  };
  branches: any[];
  categories: any[];
  services: any[];
  staff: Array<{
    id: string;
    name: string;
    roleTitle?: string;
    branchId?: string | null;
    branchName?: string | null;
    avatarUrl?: string | null;
  }>;
  catalogOffers: any[];
  miniWeb: {
    siteUrl?: string;
    hero?: {
      eyebrow?: string;
      titleMain?: string;
      titleItalic?: string;
      pillars?: string;
      description?: string;
      heroImage?: string;
      primaryCtaText?: string;
      secondaryCtaText?: string;
    };
    contact?: {
      phone?: string;
      whatsappNumber?: string;
      email?: string;
      address?: string;
      instagramUrl?: string;
      facebookUrl?: string;
      youtubeUrl?: string;
    };
    branchDetails?: Record<string, any>;
    offers?: any[];
    reviews?: any[];
    blogs?: any[];
    moments?: string[];
    franchiseOpportunities?: DynamicFranchiseOpportunity[];
  };
};

let cachedPayload: MiniWebPayload | null = null;
let cachedAt = 0;
let inflightRequest: Promise<MiniWebPayload | null> | null = null;
const CACHE_TTL_MS = 30_000;

export async function getMiniWebPayload(forceRefresh = false): Promise<MiniWebPayload | null> {
  const isServer = typeof window === "undefined";
  const now = Date.now();
  if (!isServer && !forceRefresh && cachedPayload && now - cachedAt < CACHE_TTL_MS) {
    return cachedPayload;
  }
  if (!isServer && !forceRefresh && inflightRequest) {
    return inflightRequest;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const encodedSlug = encodeURIComponent(SALON_SLUG);

  const req = (async (): Promise<MiniWebPayload | null> => {
    try {
      // 1. Try dedicated /mini-web endpoint if deployed
      const res = await fetch(`${API_BASE_URL}/public/salons/${encodedSlug}/mini-web`, {
        cache: "no-store",
        signal: controller.signal
      });
      if (res.ok) {
        const json = (await res.json()) as MiniWebPayload;
        if (!isServer) {
          cachedPayload = json;
          cachedAt = Date.now();
        }
        return json;
      }

      // 2. Fallback to existing live endpoints: /public/salon/:slug + /public/salons/:slug
      const [salonRes, catalogRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/public/salon/${encodedSlug}`, { cache: "no-store", signal: controller.signal }),
        fetch(`${API_BASE_URL}/public/salons/${encodedSlug}`, { cache: "no-store", signal: controller.signal })
      ]);

      const salonJson = salonRes.status === "fulfilled" && salonRes.value.ok ? await salonRes.value.json() : null;
      const catalogJson = catalogRes.status === "fulfilled" && catalogRes.value.ok ? await catalogRes.value.json() : null;
      if (!salonJson && !catalogJson) return null;

      const miniWeb = salonJson?.genericSettings?.miniWeb || {};
      const services = Array.isArray(catalogJson?.services) && catalogJson.services.length
        ? catalogJson.services
        : Array.isArray(salonJson?.services)
          ? salonJson.services
          : [];
      const staff = Array.isArray(catalogJson?.staff)
        ? catalogJson.staff.map((s: any) => ({
            id: s.id,
            name: s.user?.name || s.name || "Stylist",
            roleTitle: s.roleTitle || s.salonRole,
            branchId: s.branchId || null,
            branchName: s.branch?.name || null,
            avatarUrl: s.avatarUrl || null
          }))
        : [];
      const catalogOffers = Array.isArray(catalogJson?.offers) ? catalogJson.offers : [];

      // Derive branches from miniWeb.branchesSnapshot, or from services/staff branch relations
      const branchMap = new Map<string, any>();
      if (Array.isArray(miniWeb.branchesSnapshot)) {
        miniWeb.branchesSnapshot.forEach((b: any) => {
          if (b?.id) branchMap.set(b.id, b);
        });
      }
      services.forEach((s: any) => {
        if (s?.branch?.id && !branchMap.has(s.branch.id)) branchMap.set(s.branch.id, s.branch);
      });
      (catalogJson?.staff || []).forEach((s: any) => {
        if (s?.branch?.id && !branchMap.has(s.branch.id)) branchMap.set(s.branch.id, s.branch);
      });

      const catMap = new Map<string, any>();
      services.forEach((s: any) => {
        if (s?.category?.id) catMap.set(s.category.id, s.category);
      });

      const merged: MiniWebPayload = {
        salon: salonJson?.salon || catalogJson?.salon,
        branches: Array.from(branchMap.values()),
        categories: Array.from(catMap.values()),
        services,
        staff,
        catalogOffers,
        miniWeb
      };
      if (!isServer) {
        cachedPayload = merged;
        cachedAt = Date.now();
      }
      return merged;
    } catch (err: any) {
      console.warn("[Skillify MiniWeb API] unreachable, using fallback content:", err?.message || err);
      return null;
    } finally {
      clearTimeout(timeout);
      if (!isServer) inflightRequest = null;
    }
  })();

  if (!isServer) inflightRequest = req;
  return req;
}

function mapBranchToCentre(branch: any, payload: MiniWebPayload): any {
  const details = payload.miniWeb?.branchDetails?.[branch.id] || {};
  const locality = details.locality || branch.name;
  return {
    id: branch.id,
    branchId: branch.id,
    slug: details.slug || slugify(branch.name),
    name: branch.name,
    locality,
    address: branch.address || payload.salon?.address || "",
    city: details.city || payload.salon?.city || "Hyderabad",
    state: details.state || "Telangana",
    country: details.country || payload.salon?.country || "India",
    phone: branch.phone || payload.miniWeb?.contact?.phone || payload.salon?.phone || "",
    whatsappNumber: payload.miniWeb?.contact?.whatsappNumber || branch.phone || payload.salon?.phone || "",
    hours: details.hours || "9:30 AM – 9:30 PM",
    coverImage: details.coverImage || "/images/styluxe/salon-interior.jpg",
    mapUrl: details.mapUrl || "",
    averageRating: details.rating || 4.9,
    reviewCount: details.reviewCount || 180,
    reviews: [],
    status: "active",
    createdAt: branch.createdAt || null,
    updatedAt: branch.updatedAt || null,
    facilities: details.facilities || []
  };
}

// 1. Featured services/products
export async function getFeaturedProducts(limit = 6) {
  const payload = await getMiniWebPayload();
  if (!payload?.services?.length) return null;
  return payload.services.slice(0, limit).map((s: any) => ({
    id: s.id,
    name: s.name,
    title: s.name,
    price: Number(s.price || 0),
    durationMinutes: Number(s.durationMinutes || 30),
    description: s.description || "",
    image: s.imageUrl || "/images/styluxe/salon-interior.jpg",
    categoryId: s.categoryId,
    category: s.category?.name || "Salon Service",
    branchId: s.branchId || null
  }));
}

// 2. Common Menu (Services & Categories from Skillify)
export async function getCommonMenu(categoryId?: string, limit: number = 200) {
  const payload = await getMiniWebPayload();
  if (!payload?.services?.length) return [];
  let list = payload.services;
  if (categoryId) {
    list = list.filter((s: any) => String(s.categoryId) === String(categoryId));
  }
  return list.slice(0, limit).map((s: any) => ({
    id: s.id,
    name: s.name,
    title: s.name,
    price: Number(s.price || 0),
    durationMinutes: Number(s.durationMinutes || 30),
    description: s.description || "",
    image: s.imageUrl || "/images/styluxe/salon-interior.jpg",
    categoryId: s.categoryId,
    category: s.category || null,
    branchId: s.branchId || null
  }));
}

export async function getCommonCategories() {
  const payload = await getMiniWebPayload();
  if (!payload?.categories?.length) return [];
  return payload.categories.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: slugify(c.name)
  }));
}

// 3. Offers (Global Mini Web Offers + Skillify Catalog Offers)
export async function getAllOffers() {
  const payload = await getMiniWebPayload();
  if (!payload) return [];
  const miniOffers = (payload.miniWeb?.offers || []).filter((o: any) => o.isActive !== false);
  const catalogOffers = (payload.catalogOffers || []).map((o: any) => ({
    id: o.id,
    title: o.title,
    subtitle: o.subtitle || "",
    badge: o.badge || "SPECIAL OFFER",
    discountText: o.discountText || "",
    code: o.code || "",
    description: o.description || "",
    image: o.imageUrl || "",
    isPrimary: false,
    isActive: true
  }));
  return [...miniOffers, ...catalogOffers];
}

export async function getPrimaryOffer() {
  const offers = await getAllOffers();
  if (!offers.length) return null;
  return offers.find((o: any) => o.isPrimary) || offers[0];
}

// 4. Centres / Branches (Synced directly from Skillify Branches)
export async function getCentres(_status = "active"): Promise<any[]> {
  const payload = await getMiniWebPayload();
  if (!payload?.branches?.length) return [];
  return payload.branches.map((b: any) => mapBranchToCentre(b, payload));
}

export async function getCentreBySlugOrId(idOrSlug: string): Promise<any> {
  const centres = await getCentres();
  if (!centres.length) return null;
  const target = String(idOrSlug || "").trim().toLowerCase();
  return (
    centres.find(
      (c: any) =>
        String(c.id).toLowerCase() === target ||
        String(c.slug).toLowerCase() === target ||
        String(c.locality || "").toLowerCase() === target
    ) || centres[0]
  );
}

// 5. Branch-Connected Online Appointment Booking -> Skillify /public/salons/:slug/book
export async function bookPublicAppointment(payload: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  branchId: string;
  primaryStaffUserId?: string;
  title?: string;
  startAt: string;
  endAt: string;
  notes?: string;
  items: Array<{
    serviceId: string;
    staffUserIds: string[];
    startAt: string;
    endAt: string;
    notes?: string;
  }>;
}) {
  const res = await fetch(
    `${API_BASE_URL}/public/salons/${encodeURIComponent(SALON_SLUG)}/book`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Unable to book appointment. Please try again.");
  }
  return json;
}

// 6. Franchise Lead Generation -> Skillify Enquiries
async function postFranchiseEnquiry(body: Record<string, any>) {
  const res = await fetch(
    `${API_BASE_URL}/public/salons/${encodeURIComponent(SALON_SLUG)}/franchise-enquiry`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || "Unable to submit your enquiry. Please try again.");
  }
  return json;
}

export async function submitFranchisePabblyInquiry(payload: {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  startDate: string;
  hasSpace: string;
  source?: string;
}) {
  return postFranchiseEnquiry(payload);
}

export async function submitFranchiseEnquiry(payload: {
  fullName: string;
  mobile?: string;
  phone?: string;
  email: string;
  city: string;
  state: string;
  budget: string;
  space?: string;
  notes?: string;
  consent?: boolean;
}) {
  return postFranchiseEnquiry(payload);
}

export async function submitFranchiseOpportunityInquiry(slug: string, inquiryData: any) {
  return postFranchiseEnquiry({ ...inquiryData, franchiseSlug: slug });
}

// 7. Blogs (Global Mini Web Blogs)
function normalizeMiniWebBlog(b: any, idx: number) {
  const structured = b.content && typeof b.content === "object" ? b.content : null;
  const rawSections = Array.isArray(b.sections)
    ? b.sections
    : Array.isArray(structured?.sections)
      ? structured.sections
      : [];

  const sections = rawSections
    .filter((sec: any) => sec && (sec.heading || sec.bodyText || (Array.isArray(sec.body) && sec.body.length)))
    .map((sec: any, sIdx: number) => ({
      id: sec.id || slugify(sec.heading || "") || `section-${sIdx + 1}`,
      heading: sec.heading || "",
      body: Array.isArray(sec.body) && sec.body.length
        ? sec.body
        : String(sec.bodyText || "")
            .split(/\n\s*\n/)
            .map((p: string) => p.trim())
            .filter(Boolean),
      bulletPoints: Array.isArray(sec.bulletPoints)
        ? sec.bulletPoints.map((x: any) => String(x || "").trim()).filter(Boolean)
        : undefined,
      quote: sec.quote ? String(sec.quote).trim() : undefined,
      tableData: sec.tableData && Array.isArray(sec.tableData.headers) ? sec.tableData : undefined
    }));

  const cover = b.coverImage || b.image || "/images/styluxe/salon-interior.jpg";
  const tagsStr = Array.isArray(b.tags) ? b.tags.join(", ") : String(b.tags || b.seoKeywords || b.category || "Beauty");

  return {
    ...b,
    id: b.id || `mini-blog-${idx}`,
    slug: b.slug || slugify(b.title || `article-${idx}`),
    title: b.title || "Untitled Article",
    subtitle: b.subtitle || b.excerpt || "",
    excerpt: b.excerpt || b.subtitle || "",
    category: b.category || "Hair Care",
    readingTime: b.readTime || b.readingTime || "5 min read",
    readTime: b.readTime || b.readingTime || "5 min read",
    publishDate: b.date || b.publishDate || b.createdAt || new Date().toISOString(),
    isFeatured: Boolean(b.isFeatured),
    status: b.status || "published",
    author: b.authorName || (typeof b.author === "string" ? b.author : b.author?.name) || "Styluxe Editorial Team",
    authorDesignation: b.authorRole || b.authorDesignation || b.author?.role || "Styluxe Beauty & Research",
    authorAvatar: b.authorAvatar || b.author?.avatar || "/images/styluxe/salon-interior.jpg",
    coverImage: cover,
    image: cover,
    seoKeywords: tagsStr,
    metaDescription: b.metaDescription || b.excerpt || b.subtitle || "",
    structuredContent: {
      intro: b.intro ?? structured?.intro ?? b.excerpt ?? "",
      keyTakeaway: b.keyTakeaway ?? structured?.keyTakeaway ?? "",
      sections,
      conclusion: b.conclusion ?? structured?.conclusion ?? "",
      rawHtml: typeof b.content === "string" ? b.content : ""
    }
  };
}

export async function getBlogs(category?: string) {
  const payload = await getMiniWebPayload();
  const rawList = Array.isArray(payload?.miniWeb?.blogs) ? payload!.miniWeb.blogs! : [];
  const normalized = rawList
    .filter((b: any) => b && (b.title || b.slug))
    .map((b: any, idx: number) => normalizeMiniWebBlog(b, idx));
  if (!category) return normalized;
  const target = category.toLowerCase();
  return normalized.filter((b: any) => String(b.category || "").toLowerCase() === target);
}

export async function getBlogBySlug(idOrSlug: string) {
  const blogs = await getBlogs();
  const target = String(idOrSlug || "").toLowerCase();
  return (
    blogs.find(
      (b: any) =>
        String(b.slug || "").toLowerCase() === target ||
        String(b.id || "").toLowerCase() === target
    ) || null
  );
}

// 8. Reviews & Testimonials (Global Mini Web Reviews)
export async function getReviews(params: {
  displayOn?: string;
  reviewType?: string;
  categoryId?: string;
  relatedCentreId?: string;
  isFeatured?: boolean;
  status?: string;
} = {}) {
  const payload = await getMiniWebPayload();
  const branches = Array.isArray(payload?.branches) ? payload!.branches : [];
  let list = Array.isArray(payload?.miniWeb?.reviews) ? payload!.miniWeb.reviews! : [];

  if (params.reviewType && params.reviewType !== "all") {
    list = list.filter((r: any) => String(r.reviewType || "customer") === params.reviewType);
  }
  if (params.relatedCentreId) {
    list = list.filter((r: any) => !r.relatedCentreId || String(r.relatedCentreId) === String(params.relatedCentreId));
  }
  if (params.isFeatured) {
    list = list.filter((r: any) => r.isFeatured !== false);
  }

  return list
    .filter((r: any) => String(r.name || r.reviewerName || "").trim() || String(r.text || r.reviewText || "").trim())
    .map((r: any, idx: number) => {
      const matchedBranch = r.relatedCentreId
        ? branches.find((b: any) => String(b.id) === String(r.relatedCentreId))
        : null;
      const reviewType = r.reviewType || r.categoryId || "customer";
      const avatar = r.image || r.reviewerAvatar || r.avatar || "";
      const roleLabel =
        r.city ||
        r.reviewerRole ||
        (matchedBranch?.name ? `Styluxe Salon, ${matchedBranch.name}` : r.role || "Styluxe Salons");
      return {
        ...r,
        id: r.id || `mini-rev-${idx}`,
        reviewType,
        categoryId: reviewType,
        reviewerName: r.reviewerName || r.name || "Verified Guest",
        reviewerRole: roleLabel,
        reviewerAvatar: avatar,
        avatar,
        image: avatar,
        reviewText: r.reviewText || r.text || "",
        text: r.text || r.reviewText || "",
        starRating: Number(r.starRating ?? r.rating ?? 5),
        stars: Number(r.starRating ?? r.rating ?? 5),
        relatedCentreId: r.relatedCentreId || null,
        relatedCentreName: matchedBranch?.name || r.relatedCentreName || null,
        isFeatured: r.isFeatured !== false,
        viewMoreLink: r.viewMoreLink || "",
        viewMoreLinkName: r.viewMoreLinkName || "Read More",
        status: "published"
      };
    });
}

export async function getReviewCategories(): Promise<any[]> {
  return [
    { id: "all", name: "All Reviews", icon: "all" },
    { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
    { id: "staff", name: "Staff Reviews", icon: "staff" },
    { id: "customer", name: "Customer Reviews", icon: "customer" }
  ];
}

// 9. Moments (Global Mini Web Gallery)
export async function getMoments(): Promise<string[]> {
  const payload = await getMiniWebPayload();
  const raw = payload?.miniWeb?.moments || [];
  return Array.isArray(raw) ? raw.filter((s: any) => typeof s === "string" && s.trim()) : [];
}

// 10. Franchise Opportunities (Global Mini Web CMS)
export type DynamicFranchiseOpportunity = {
  id: string | number;
  franchiseName: string;
  slug: string;
  country: string;
  state: string;
  city: string;
  status?: string;
  isFeatured?: boolean;
  minBudget?: string;
  spaceRequired?: string;
  timelineDays?: string;
  royalty?: string;
  margins?: string;
  primaryImage: string;
  shortDescription: string;
  description: string;
  editorialLead?: string;
  editorialBody?: string;
  primeLocations?: Array<{ name: string; desc: string }>;
  faqs?: Array<{ q: string; a: string }>;
  seoTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
  applicantCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

const DEFAULT_FRANCHISE_OPPORTUNITIES: DynamicFranchiseOpportunity[] = [
  {
    id: "styluxe-kompally",
    franchiseName: "Styluxe Salon – Kompally",
    slug: "styluxe-kompally",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    status: "active",
    minBudget: "₹12.5 Lakhs*",
    spaceRequired: "600 – 1,000 sq.ft",
    timelineDays: "35 – 45 Days",
    royalty: "Zero Royalty (100% Profits to You)",
    margins: "55% – 65% Gross Margins",
    shortDescription: "Bring the Styluxe luxury hair, beauty & grooming experience to Kompally, Hyderabad.",
    description: "<p>Become a part of the <strong>Styluxe Salons</strong> franchise network and build a premier destination for modern hair, beauty and grooming care.</p>",
    primaryImage: "/images/styluxe/franchise-studio.jpg"
  },
  {
    id: "styluxe-gachibowli",
    franchiseName: "Styluxe Salon – Gachibowli",
    slug: "styluxe-gachibowli",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    status: "active",
    minBudget: "₹12.5 Lakhs*",
    spaceRequired: "600 – 1,000 sq.ft",
    timelineDays: "35 – 45 Days",
    royalty: "Zero Royalty (100% Profits to You)",
    margins: "55% – 65% Gross Margins",
    shortDescription: "Explore a Styluxe luxury salon franchise opportunity in Gachibowli.",
    description: "<p>Partner with Styluxe Salons and create an upscale destination for hair artistry, skincare rituals, and grooming.</p>",
    primaryImage: "/images/styluxe/salon-interior.jpg"
  },
  {
    id: "styluxe-indore",
    franchiseName: "Styluxe Salon – Indore",
    slug: "styluxe-indore",
    country: "India",
    state: "Madhya Pradesh",
    city: "Indore",
    status: "active",
    minBudget: "₹12.5 Lakhs*",
    spaceRequired: "600 – 1,000 sq.ft",
    timelineDays: "35 – 45 Days",
    royalty: "Zero Royalty (100% Profits to You)",
    margins: "55% – 65% Gross Margins",
    shortDescription: "Launch your Styluxe Salon franchise in the fast-growing retail hubs of Indore.",
    description: "<p>Join the Styluxe Salons family and bring luxury hair, beauty, and grooming care at honest prices to your city.</p>",
    primaryImage: "/images/styluxe/salon-equipment.jpg"
  },
  {
    id: "styluxe-bhopal",
    franchiseName: "Styluxe Salon – Bhopal",
    slug: "styluxe-bhopal",
    country: "India",
    state: "Madhya Pradesh",
    city: "Bhopal",
    status: "active",
    minBudget: "₹12.5 Lakhs*",
    spaceRequired: "600 – 1,000 sq.ft",
    timelineDays: "35 – 45 Days",
    royalty: "Zero Royalty (100% Profits to You)",
    margins: "55% – 65% Gross Margins",
    shortDescription: "Discover the Styluxe Salon franchise opportunity in Bhopal.",
    description: "<p>Create a serene, modern salon sanctuary with Styluxe's turnkey setup, stylist training, and pan-India marketing support.</p>",
    primaryImage: "/images/styluxe/hero-salon.jpg"
  }
];

export async function getFranchiseOpportunities(_status = "active"): Promise<DynamicFranchiseOpportunity[]> {
  const payload = await getMiniWebPayload();
  const dynamicList = payload?.miniWeb?.franchiseOpportunities;
  if (Array.isArray(dynamicList) && dynamicList.length > 0) {
    return dynamicList;
  }
  return DEFAULT_FRANCHISE_OPPORTUNITIES;
}

export async function getFranchiseOpportunityBySlug(slug: string): Promise<DynamicFranchiseOpportunity | null> {
  const list = await getFranchiseOpportunities();
  return list.find((item) => item.slug === slug) || null;
}
