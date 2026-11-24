"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Scissors,
  Sparkles,
  Store,
} from "lucide-react";
import "./offers.css";
import { Footer, Header } from "../components";
import { getAllOffers } from "../lib/api";

type Offer = {
  category: string;
  title: string;
  description: string;
  image: string;
  validTill: string;
  badge: string;
};

const defaultSalonOffers: Offer[] = [
  {
    category: "Hair Styling",
    title: "Luxury Haircut, Wash & Botanical Spa Combo",
    description:
      "Refresh your look with a signature haircut, deep conditioning botanical hair spa, and voluminous blowout at ₹1,499.",
    image: "/images/styluxe/service-hair.jpg",
    validTill: "31 Dec 2026",
    badge: "FLAT\n₹1,499\nCOMBO",
  },
  {
    category: "Men's Grooming",
    title: "Executive Haircut & Royal Beard Sculpting",
    description:
      "Precision fade or scissor cut paired with eucalyptus hot-towel beard styling and scalp massage at an introductory rate.",
    image: "/images/styluxe/service-grooming.jpg",
    validTill: "31 Dec 2026",
    badge: "FLAT\n₹499\nGROOM",
  },
  {
    category: "Hair Treatments",
    title: "Keratin & Hair Botox Frizz-Free Ritual",
    description:
      "Enjoy silky, luminous, formaldehyde-free smoothening with complimentary post-care sulfate-free mini kit.",
    image: "/images/styluxe/salon-equipment.jpg",
    validTill: "31 Dec 2026",
    badge: "SAVE\n25%\nOFF",
  },
  {
    category: "Skin & Facials",
    title: "Hydra-Luminance Glow Facial + De-Tan",
    description:
      "Restore radiant, glass-like skin with our signature botanical hydra facial and complimentary soothing detan therapy.",
    image: "/images/styluxe/service-skin.jpg",
    validTill: "31 Dec 2026",
    badge: "GLOW\nSPECIAL",
  },
  {
    category: "Bridal & Makeup",
    title: "Pre-Bridal Radiance Suite (3 Sessions)",
    description:
      "Complete countdown luxury care: hydra facial, botanical body polish, hair spa, and gel manicure-pedicure.",
    image: "/images/styluxe/service-makeup.jpg",
    validTill: "31 Dec 2026",
    badge: "BRIDAL\n20% OFF",
  },
  {
    category: "Nails & Spa",
    title: "Botanical Manicure & Eucalyptus Pedicure Duo",
    description:
      "Unwind with mineral exfoliation, reflexology massage, and high-gloss botanical polish for hands and feet.",
    image: "/images/styluxe/service-nails.jpg",
    validTill: "31 Dec 2026",
    badge: "DUO\n₹1,199",
  },
];

export default function OffersPage() {
  const [offerList, setOfferList] = useState<Offer[]>(defaultSalonOffers);
  const [activeCategory, setActiveCategory] = useState("All Offers");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    let mounted = true;
    async function loadOffers() {
      try {
        const data = await getAllOffers();
        const filteredData = data.filter(
          (item: any) => item.id !== "cmwt35hqx0002bot1uthxyk7w"
        );

        if (mounted && Array.isArray(filteredData) && filteredData.length > 0) {
          const mapped: Offer[] = filteredData.map((item: any) => {
            let badge = "SPECIAL\nOFFER";
            if (item.promoCode) {
              badge = item.promoCode;
            } else if (item.discountType === "percentage" && item.discountValue) {
              badge = `FLAT\n${item.discountValue}%\nOFF`;
            } else if (item.discountType === "fixed" && item.discountValue) {
              badge = `FLAT\n₹${item.discountValue}\nOFF`;
            }

            let formattedDate = "31 Dec 2026";
            if (item.endDate) {
              try {
                formattedDate = new Date(item.endDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              } catch (_) { }
            }

            return {
              category: item.applicableCategory || "Special",
              title: item.title,
              description: item.shortDescription || item.detailedDescription || "",
              image: item.bannerImage || "/images/styluxe/service-hair.jpg",
              validTill: formattedDate,
              badge,
            };
          });
          setOfferList(mapped);
        }
      } catch (err) {
        console.warn("[OffersPage] Failed to fetch live offers:", err);
      }
    }
    loadOffers();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const dynamicCats = Array.from(
      new Set(offerList.map((o) => o.category).filter(Boolean))
    );
    return ["All Offers", ...dynamicCats];
  }, [offerList]);

  const filteredOffers = useMemo(
    () =>
      activeCategory === "All Offers"
        ? offerList
        : offerList.filter((offer) => offer.category === activeCategory),
    [activeCategory, offerList]
  );

  const pageCount = Math.max(1, Math.ceil(filteredOffers.length / perPage));
  const visibleOffers = filteredOffers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  function changeCategory(category: string) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  return (
    <>
      <Header active="/offers" />

      <main className="teamax-offers-page">
        <section
          className="stx-page-hero stx-page-hero--offers"
          aria-labelledby="offers-title"
        >
          <div className="stx-page-hero__inner">
            <div className="stx-page-hero__copy">
              <nav className="stx-page-hero__crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Offers</span>
              </nav>

              <p className="stx-page-hero__eyebrow">
                <img
                  src="/images/styluxe-emblem.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                SEASONAL CURATIONS
              </p>

              <h1 id="offers-title" className="stx-page-hero__title">
                Exclusive Offers, <em>Effortless Luxury</em>
              </h1>

              <p className="stx-page-hero__lead">
                Enjoy thoughtfully curated seasonal packages across hair styling,
                botanical skincare, men&apos;s grooming, and bridal care — honest luxury
                at transparent prices.
              </p>

              <div className="stx-page-hero__meta">
                <span>All Styluxe Studios</span>
                <span className="stx-page-hero__dot" aria-hidden="true" />
                <span>No Hidden Charges</span>
                <span className="stx-page-hero__dot" aria-hidden="true" />
                <span>Prior Booking Optional</span>
              </div>
            </div>

            <div className="stx-page-hero__media">
              <div className="stx-page-hero__frame stx-page-hero__frame--soft">
                <img
                  src="/images/styluxe/service-skin.jpg"
                  alt="Styluxe Salons botanical skincare and seasonal beauty offers"
                  width={900}
                  height={675}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="offers-container offers-list-section mt-5"
          id="offers"
          aria-label="Styluxe salon offers"
        >
          <div
            className="offers-category-filters"
            role="group"
            aria-label="Filter offers by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`offers-filter-button ${activeCategory === category ? "is-active" : ""
                  }`}
                aria-pressed={activeCategory === category}
                onClick={() => changeCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {visibleOffers.length ? (
            <div className="offers-card-grid">
              {visibleOffers.map((offer) => (
                <article className="offers-card" key={offer.title}>
                  <div className="offers-card-image-wrap">
                    <img
                      className="offers-card-image"
                      src={offer.image}
                      alt={offer.title}
                    />
                    <span className="offers-card-category">
                      {offer.category}
                    </span>
                    <span className="offers-card-badge">{offer.badge}</span>
                  </div>
                  <div className="offers-card-content">
                    <h2>{offer.title}</h2>
                    <p>{offer.description}</p>
                    <div className="offers-validity">
                      <CalendarDays size={19} aria-hidden="true" />
                      <span>
                        Valid till <u>{offer.validTill}</u>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="offers-empty">No offers found in this category.</p>
          )}

          {pageCount > 1 && (
            <nav className="offers-pagination" aria-label="Offers pagination">
              <button
                type="button"
                className="offers-page-button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <ArrowLeft size={17} />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`offers-page-button ${currentPage === page ? "is-active" : ""
                      }`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                type="button"
                className="offers-page-button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() =>
                  setCurrentPage((page) => Math.min(pageCount, page + 1))
                }
              >
                <ArrowRight size={17} />
              </button>
            </nav>
          )}
        </section>

        <section
          className="offers-container offers-franchise-banner"
          aria-labelledby="franchise-banner-title"
        >
          <div className="offers-franchise-copy">
            <p className="offers-franchise-kicker">OWN A STYLUXE SALON</p>
            <h2 id="franchise-banner-title">
              Turn Modern Luxury Beauty
              <br />
              into Your Business
            </h2>
            <p>
              Partner with Styluxe Salons and bring calm, upscale hair, beauty,
              and grooming experiences to your city with turnkey interiors,
              stylist training, and a trusted brand.
            </p>
          </div>
          <div className="offers-franchise-visual">
            <img
              src="/images/styluxe/franchise-studio.jpg"
              alt="Styluxe luxury salon storefront"
            />
          </div>
          <div className="offers-franchise-features mt-20">
            <div>
              <span className="offers-feature-icon">
                <ArrowRight size={22} />
              </span>
              <div>
                <strong>Proven Salon Model</strong>
                <small>High repeat demand &amp; memberships</small>
              </div>
            </div>
            <div>
              <span className="offers-feature-icon">
                <Scissors size={22} />
              </span>
              <div>
                <strong>End-to-End Support</strong>
                <small>3D interiors to stylist academy</small>
              </div>
            </div>
            <div>
              <span className="offers-feature-icon">
                <Store size={22} />
              </span>
              <div>
                <strong>Prime City Territories</strong>
                <small>Be the flagship studio in your area</small>
              </div>
            </div>
            <div>
              <span className="offers-feature-icon">
                <Sparkles size={22} />
              </span>
              <div>
                <strong>Multi-Service Revenue</strong>
                <small>Hair, Skin, Bridal, Grooming &amp; Nails</small>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
