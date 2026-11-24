"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Grid2X2,
  Scissors,
  Sparkles,
  Droplets,
  UserCheck,
  Heart,
  Flower2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getCommonCategories, getCommonMenu } from "../lib/api";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  isVeg: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isWellness?: boolean;
  badge?: string;
  priceNote?: string;
  price?: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  count: number;
  image: string;
  icon: string;
  specialtyBadge?: string;
}

interface MenuClientProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

const categoryIcons: Record<string, React.ElementType> = {
  all: Grid2X2,
  "hair-styling": Scissors,
  "hair-treatments": Droplets,
  "skin-facials": Sparkles,
  "mens-grooming": UserCheck,
  "bridal-makeup": Heart,
  "nails-spa": Flower2,
};

export const getCategoryIcon = (iconOrId?: string) => {
  if (!iconOrId) return Scissors;
  const key = iconOrId.toLowerCase();
  if (categoryIcons[key]) return categoryIcons[key];
  if (key.includes("all")) return Grid2X2;
  if (key.includes("skin") || key.includes("facial")) return Sparkles;
  if (key.includes("groom") || key.includes("men") || key.includes("beard")) return UserCheck;
  if (key.includes("bridal") || key.includes("makeup")) return Heart;
  if (key.includes("nail") || key.includes("manicure") || key.includes("pedicure")) return Flower2;
  if (key.includes("spa") || key.includes("color") || key.includes("treatment")) return Droplets;
  return Scissors;
};

const categoryImages: Record<string, string> = {
  "hair-styling": "/images/styluxe/service-hair.jpg",
  "hair-treatments": "/images/styluxe/salon-equipment.jpg",
  "skin-facials": "/images/styluxe/service-skin.jpg",
  "mens-grooming": "/images/styluxe/service-grooming.jpg",
  "bridal-makeup": "/images/styluxe/service-makeup.jpg",
  "nails-spa": "/images/styluxe/service-nails.jpg",
};

const defaultDisplayCategories = [
  { id: "all", name: "All Services", icon: "all" },
  { id: "hair-styling", name: "Hair Cuts & Styling", icon: "hair-styling" },
  { id: "hair-treatments", name: "Color & Hair Spa", icon: "hair-treatments" },
  { id: "skin-facials", name: "Skin & Facials", icon: "skin-facials" },
  { id: "mens-grooming", name: "Men's Grooming", icon: "mens-grooming" },
  { id: "bridal-makeup", name: "Bridal & Makeup", icon: "bridal-makeup" },
  { id: "nails-spa", name: "Nails & Hand Spa", icon: "nails-spa" },
];

export function MenuClient({ categories, items }: MenuClientProps) {
  const [liveCategories, setLiveCategories] = useState<MenuCategory[]>(categories);
  const [liveItems, setLiveItems] = useState<MenuItem[]>(items);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        setSelectedCategory(catParam);
      }
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    let mounted = true;
    async function syncLiveMenu() {
      try {
        const [apiCategories, apiItems] = await Promise.all([
          getCommonCategories(),
          getCommonMenu(undefined, 200),
        ]);

        if (mounted && Array.isArray(apiCategories) && apiCategories.length > 0) {
          setLiveCategories(
            apiCategories.map((c: any) => ({
              id: c.id,
              name: c.name,
              description: c.description || "",
              count: c._count?.menuItems || 0,
              image: c.image || "/images/styluxe/service-hair.jpg",
              icon: c.slug || c.icon || c.name.toLowerCase(),
            }))
          );
        }

        if (mounted && Array.isArray(apiItems) && apiItems.length > 0) {
          setLiveItems(
            apiItems.map((item: any) => ({
              id: item.id,
              name: item.name,
              description: item.description || "",
              category: item.category?.name || "Salon Care",
              categoryId: item.categoryId || item.category?.id || "general",
              categorySlug: item.category?.slug,
              isVeg: true,
              isPopular: item.isPopular,
              isFeatured: Boolean(item.isFeatured),
              badge: item.isPopular ? "Popular" : undefined,
              price: item.price,
              image: item.image,
            }))
          );
        }
      } catch (err) {
        console.warn("[MenuClient] Live service sync error:", err);
      }
    }
    syncLiveMenu();
    return () => {
      mounted = false;
    };
  }, []);

  const displayCategories = useMemo(() => {
    if (liveCategories && liveCategories.length > 0) {
      return [
        { id: "all", name: "All Services", icon: "all" },
        ...liveCategories.map((c) => ({
          id: c.id,
          name: c.name,
          icon: c.icon || c.id,
        })),
      ];
    }
    return defaultDisplayCategories;
  }, [liveCategories]);

  const filteredItems = useMemo(() => {
    let result = liveItems.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" ||
        item.categoryId === selectedCategory ||
        (item as any).categorySlug === selectedCategory ||
        (item as any).category?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });

    if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular))
      );
    }

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }

    return result;
  }, [liveItems, selectedCategory, searchQuery, sortBy]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const el = document.getElementById("tx-menu-content-top");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const activeCategory = displayCategories.find(
    (item) => item.id === selectedCategory
  );

  return (
    <section className="tx-menu-shell">
      {/* SEARCH */}
      <div className="tx-menu-search-wrap">
        <form
          className="tx-menu-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <Search
            size={21}
            strokeWidth={2.2}
            className="tx-menu-search-icon"
            aria-hidden="true"
          />

          <input
            type="search"
            className="tx-menu-search-input"
            aria-label="Search salon services"
            placeholder="Search haircuts, keratin, facials, grooming, bridal..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" className="tx-menu-search-button">
            Search
          </button>
        </form>
      </div>

      {/* SERVICES CATALOG */}
      <div className="tx-menu-area">
        {/* SIDEBAR */}
        <aside
          className="tx-menu-category-panel"
          aria-label="Service categories"
        >
          <div className="tx-menu-category-list">
            {displayCategories.map((category) => {
              const Icon = getCategoryIcon(category.icon || category.id);
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`tx-menu-category-button ${isSelected ? "is-selected" : ""
                    }`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="tx-menu-category-icon" size={22} />
                  <span>{category.name}</span>
                  {isSelected && (
                    <ChevronRight
                      size={17}
                      className="tx-menu-selected-arrow"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* SERVICE CARDS */}
        <div className="tx-menu-content" id="tx-menu-content-top">
          <div className="tx-menu-heading-row">
            <div>
              <h2 className="tx-menu-heading">
                {activeCategory?.name || "All Services"}
              </h2>

              <span className="tx-menu-yellow-rule" />

              <p className="tx-menu-description">
                {selectedCategory === "all"
                  ? "Explore our complete menu of luxury hair, skincare, grooming, and bridal services."
                  : `Explore our curated ${activeCategory?.name.toLowerCase()} treatments.`}
              </p>
            </div>

            <div className="tx-menu-sort">
              <label htmlFor="tx-menu-sort">Sort By:</label>

              <select
                id="tx-menu-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="tx-menu-sort-select"
              >
                <option value="popular">Popular</option>
                <option value="name">Name</option>
                <option value="price-low">Price Low</option>
              </select>

              <ChevronDown
                size={16}
                className="tx-menu-sort-icon"
                aria-hidden="true"
              />
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="tx-menu-empty">
              <Search size={35} />
              <h3>No salon services found</h3>
              <p>Try another search term or service category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                View All Services
              </button>
            </div>
          ) : (
            <>
              <div className="tx-menu-product-grid">
                {paginatedItems.map((item) => {
                  const image =
                    item.image ||
                    categoryImages[item.categoryId] ||
                    "/images/styluxe/service-hair.jpg";

                  return (
                    <article className="tx-menu-product-card" key={item.id}>
                      <div className="tx-menu-photo-wrap">
                        <img
                          className="tx-menu-product-photo"
                          src={image}
                          alt={`${item.name} at Styluxe Salons`}
                          loading="lazy"
                        />

                        {(item.isFeatured || item.isPopular) && (
                          <div
                            style={{
                              position: "absolute",
                              top: "12px",
                              right: "12px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: "6px",
                              zIndex: 5,
                            }}
                          >
                            {item.isFeatured && (
                              <span
                                className="tx-menu-popular-badge"
                                style={{ position: "static" }}
                              >
                                <span>✦</span> Signature
                              </span>
                            )}
                            {item.isPopular && (
                              <span
                                className="tx-menu-popular-badge"
                                style={{ position: "static" }}
                              >
                                <span>★</span> Popular
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="tx-menu-product-details">
                        <div className="stx-service-card-body">
                          <h3 className="tx-menu-product-name">{item.name}</h3>
                          <p className="tx-menu-product-description">
                            {item.description}
                          </p>
                        </div>

                        {typeof item.price === "number" && (
                          <div className="stx-service-card-footer">
                            <span className="stx-service-price">
                              Starting from <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                            </span>
                            <Link href="/salon-locations" className="stx-service-book-link">
                              Book →
                            </Link>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="tx-menu-pagination-wrapper">
                  <p className="tx-menu-pagination-summary">
                    Showing {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, filteredItems.length)}{" "}
                    of {filteredItems.length} services
                  </p>

                  <nav
                    className="tx-menu-pagination"
                    aria-label="Services pagination"
                  >
                    <button
                      type="button"
                      className="tx-menu-page-btn tx-menu-prev-btn"
                      aria-label="Previous page"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ArrowLeft size={16} />
                    </button>

                    {getPageNumbers(currentPage, totalPages).map((p, idx) =>
                      p === "..." ? (
                        <span key={`dots-${idx}`} className="tx-menu-page-dots">
                          ...
                        </span>
                      ) : (
                        <button
                          key={`page-${p}`}
                          type="button"
                          className={`tx-menu-page-btn ${currentPage === p ? "is-active" : ""
                            }`}
                          aria-current={currentPage === p ? "page" : undefined}
                          onClick={() => handlePageChange(Number(p))}
                        >
                          {p}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      className="tx-menu-page-btn tx-menu-next-btn"
                      aria-label="Next page"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* BOTTOM SALON BANNER */}
      <section id="contact" className="container-xl contact-section topmaring">
        <div className="contact-banner">
          <img
            src="/images/styluxe/service-skin.jpg"
            width={1200}
            height={704}
            alt="Botanical skincare and salon care at Styluxe Salons"
            loading="lazy"
          />
          <div className="contact-shape">
            <h2>
              Experience Our Signature
              <br />
              Botanical Care
            </h2>
            <p>
              Book your next appointment at a Styluxe Salon near you or enquire
              about bringing Styluxe to your city.
            </p>
            <Link href="/salon-locations" className="cafe-action">
              Book Appointment <ArrowRight size={17} />
            </Link>
          </div>
          <div className="contact-script">
            Luxury
            <br />
            <span>Hair</span>
            <br />
            Beauty &amp;
            <br />
            <span>Care</span>
          </div>
        </div>
      </section>
    </section>
  );
}
