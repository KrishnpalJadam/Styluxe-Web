// Client & Server API utility for Styluxe Salons website
// Preserves all existing backend endpoints and contracts safely.
// When NEXT_PUBLIC_API_URL is configured, live GET endpoints fetch from that API.

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://185.158.66.148.host.secureserver.net/teamax-api/api/v1';
export const FALLBACK_API_BASE_URL = 'https://185.158.66.148.host.secureserver.net/teamax-api/api/v1';

const IS_LIVE_API_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_API_URL);

async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  // Frontend conversion safety: only pull remote GET content once Styluxe's API URL is configured
  const method = (options.method || 'GET').toUpperCase();
  if (method === 'GET' && !IS_LIVE_API_CONFIGURED) {
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    let res: Response;
    try {
      res = await fetch(`${API_BASE_URL}${endpoint}`, {
        cache: 'no-store', // Always fetch latest data from DB to reflect admin changes immediately
        ...options,
        headers,
      });
    } catch (networkErr) {
      if (API_BASE_URL !== FALLBACK_API_BASE_URL) {
        res = await fetch(`${FALLBACK_API_BASE_URL}${endpoint}`, {
          cache: 'no-store',
          ...options,
          headers,
        });
      } else {
        throw networkErr;
      }
    }

    if (!res.ok) {
      console.warn(`[API] Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err: any) {
    console.warn(`[API Network Error] ${endpoint}:`, err.message);
    return null;
  }
}

// 1. Featured products logic:
// Returns up to 6 eligible featured items (exactly 6 if 6+ available, or available count if < 6)
export async function getFeaturedProducts(limit = 6) {
  const data = await fetchFromApi<any[]>(`/menu-items/featured?limit=${limit}`);
  if (Array.isArray(data) && data.length > 0) {
    return data.slice(0, 6);
  }
  return null;
}

// 2. Common Menu logic:
// Common menu items & categories shared across all franchises
export async function getCommonMenu(categoryId?: string, limit: number = 200, page?: number) {
  const params = new URLSearchParams();
  if (categoryId) params.append('categoryId', categoryId);
  if (limit) params.append('limit', String(limit));
  if (page) params.append('page', String(page));
  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await fetchFromApi<any[]>(`/menu-items${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getCommonCategories() {
  const data = await fetchFromApi<any[]>('/categories?status=active');
  return Array.isArray(data) ? data : [];
}

// 3. Common Offer logic:
// Returns the single active central offer displayed on all franchise pages
export async function getPrimaryOffer() {
  return fetchFromApi<any>('/offers/primary');
}

// 4. All active offers for /offers page
export async function getAllOffers() {
  const data = await fetchFromApi<any[]>('/offers?activeOnly=true');
  return Array.isArray(data) ? data : [];
}

// 5. Centres / Franchises
export async function getCentres(status = 'active') {
  const data = await fetchFromApi<any[]>(`/centres?status=${status}`);
  return Array.isArray(data) ? data : [];
}

export async function getCentreBySlugOrId(idOrSlug: string) {
  return fetchFromApi<any>(`/centres/${encodeURIComponent(idOrSlug)}`);
}

// 6. Lead Generation
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
  const url = `${API_BASE_URL}/franchise/inquiry`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    let errorMsg = json.message || 'Unable to submit your enquiry. Please try again.';
    if (Array.isArray(json.error)) {
      errorMsg = json.error.map((e: any) => e.message).join(', ');
    }
    throw new Error(errorMsg);
  }
  return json;
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
  const res = await fetch(`${API_BASE_URL}/enquiries/franchise`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || 'Failed to submit franchise application');
  }
  return json;
}

// 7. Blogs
export async function getBlogs(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const data = await fetchFromApi<any[]>(`/blogs${query}`);
  return Array.isArray(data) ? data : [];
}

export async function getBlogBySlug(idOrSlug: string) {
  return fetchFromApi<any>(`/blogs/${encodeURIComponent(idOrSlug)}`);
}

// 8. Reviews & Testimonials
export async function getReviews(params: {
  displayOn?: string;
  reviewType?: string;
  categoryId?: string;
  relatedCentreId?: string;
  isFeatured?: boolean;
  status?: string;
} = {}) {
  const query = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null && v !== '') acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  const data = await fetchFromApi<any[]>(`/reviews${query ? `?${query}` : ''}`);
  return Array.isArray(data) ? data : [];
}

export async function getReviewCategories(): Promise<any[]> {
  const data = await fetchFromApi<any>('/settings/review_categories');
  const list = Array.isArray(data?.value) ? data.value : (Array.isArray(data) ? data : []);
  if (list.length > 0) return list;
  return [
    { id: "all", name: "All Reviews", icon: "all" },
    { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
    { id: "staff", name: "Staff Reviews", icon: "staff" },
    { id: "customer", name: "Customer Reviews", icon: "customer" },
  ];
}

// 9. Moments (A Little Look Inside)
export async function getMoments(): Promise<string[]> {
  const data = await fetchFromApi<any>('/settings/moments');
  if (!data) return [];
  const raw = data?.images || (Array.isArray(data) ? data : []);
  return Array.isArray(raw) ? raw.filter((s: any) => typeof s === 'string' && s.trim()) : [];
}

// 10. Franchise Opportunities (Dynamic CMS)
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
    id: 'styluxe-kompally',
    franchiseName: 'Styluxe Salon – Kompally',
    slug: 'styluxe-kompally',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    status: 'active',
    minBudget: '₹12.5 Lakhs*',
    spaceRequired: '600 – 1,000 sq.ft',
    timelineDays: '35 – 45 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    shortDescription: 'Bring the Styluxe luxury hair, beauty & grooming experience to Kompally, Hyderabad.',
    description: '<p>Become a part of the <strong>Styluxe Salons</strong> franchise network and build a premier destination for modern hair, beauty and grooming care.</p>',
    primaryImage: '/images/styluxe/franchise-studio.jpg',
  },
  {
    id: 'styluxe-gachibowli',
    franchiseName: 'Styluxe Salon – Gachibowli',
    slug: 'styluxe-gachibowli',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    status: 'active',
    minBudget: '₹12.5 Lakhs*',
    spaceRequired: '600 – 1,000 sq.ft',
    timelineDays: '35 – 45 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    shortDescription: 'Explore a Styluxe luxury salon franchise opportunity in Gachibowli.',
    description: '<p>Partner with Styluxe Salons and create an upscale destination for hair artistry, skincare rituals, and grooming.</p>',
    primaryImage: '/images/styluxe/salon-interior.jpg',
  },
  {
    id: 'styluxe-indore',
    franchiseName: 'Styluxe Salon – Indore',
    slug: 'styluxe-indore',
    country: 'India',
    state: 'Madhya Pradesh',
    city: 'Indore',
    status: 'active',
    minBudget: '₹12.5 Lakhs*',
    spaceRequired: '600 – 1,000 sq.ft',
    timelineDays: '35 – 45 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    shortDescription: 'Launch your Styluxe Salon franchise in the fast-growing retail hubs of Indore.',
    description: '<p>Join the Styluxe Salons family and bring luxury hair, beauty, and grooming care at honest prices to your city.</p>',
    primaryImage: '/images/styluxe/salon-equipment.jpg',
  },
  {
    id: 'styluxe-bhopal',
    franchiseName: 'Styluxe Salon – Bhopal',
    slug: 'styluxe-bhopal',
    country: 'India',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    status: 'active',
    minBudget: '₹12.5 Lakhs*',
    spaceRequired: '600 – 1,000 sq.ft',
    timelineDays: '35 – 45 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    shortDescription: 'Discover the Styluxe Salon franchise opportunity in Bhopal.',
    description: '<p>Create a serene, modern salon sanctuary with Styluxe’s turnkey setup, stylist training, and pan-India marketing support.</p>',
    primaryImage: '/images/styluxe/hero-salon.jpg',
  },
];


export async function getFranchiseOpportunities(
  status = "active"
): Promise<DynamicFranchiseOpportunity[]> {
  const query = status
    ? `?status=${encodeURIComponent(status)}`
    : "";

  const data = await fetchFromApi<DynamicFranchiseOpportunity[]>(
    `/franchise-opportunities${query}`
  );

  // API returned a valid array, including an empty array
  if (Array.isArray(data)) {
    return data;
  }

  // API failed: use fallback data
  console.warn(
    "Franchise API unavailable. Using default franchise data."
  );

  return DEFAULT_FRANCHISE_OPPORTUNITIES;
}


export async function getFranchiseOpportunityBySlug(slug: string): Promise<DynamicFranchiseOpportunity | null> {
  const data = await fetchFromApi<DynamicFranchiseOpportunity>(`/franchise-opportunities/${encodeURIComponent(slug)}`);
  if (data && data.slug) {
    return data;
  }
  return DEFAULT_FRANCHISE_OPPORTUNITIES.find((item) => item.slug === slug) || null;
}

export async function submitFranchiseOpportunityInquiry(slug: string, inquiryData: any) {
  const url = `${API_BASE_URL}/franchise-opportunities/${encodeURIComponent(slug)}/inquiries`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });
  return res.json().catch(() => ({}));
}
