"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./components.css";
import {
  ArrowRight,
  Scissors,
  Sparkles,
  Percent,
  ChevronDown,
} from "lucide-react";
import FranchiseFormSection from "./franchise-form";
import { getFranchiseOpportunityBySlug } from "../../lib/api";

export type FranchiseOpportunity = {
  id: number | string;
  franchiseName: string;
  slug: string;
  country: string;
  state: string;
  city: string;
  shortDescription: string;
  description: string;
  primaryImage: string;
  status?: string;
  isFeatured?: boolean;
  minBudget?: string;
  spaceRequired?: string;
  timelineDays?: string;
  royalty?: string;
  margins?: string;
  editorialLead?: string;
  editorialBody?: string;
  primeLocations?: Array<{ name: string; desc: string }>;
  faqs?: Array<{ q: string; a: string }>;
  seoTitle?: string;
  metaDescription?: string;
};

type Props = {
  opportunity: FranchiseOpportunity;
  slug?: string;
};

const cityLocationsData: Record<string, Array<{ name: string; desc: string }>> = {
  Hyderabad: [
    { name: "Kompally", desc: "Fast-growing residential villas, gated townships & high-street retail" },
    { name: "Gachibowli", desc: "Financial district, tech professionals & upscale lifestyle demand" },
    { name: "Hitech City & Madhapur", desc: "Corporate corridors, luxury residences & weekend self-care footfall" },
    { name: "Kukatpally & KPHB", desc: "High-density family hub & thriving bridal beauty market" },
    { name: "Banjara Hills & Jubilee Hills", desc: "Premier luxury beauty clientele & bridal studio destination" },
    { name: "Kondapur & Miyapur", desc: "Gated residential communities & steady weekday membership clientele" },
  ],
  Indore: [
    { name: "Vijay Nagar", desc: "Premier lifestyle commercial hub & young urban clientele" },
    { name: "Palasia & New Palasia", desc: "Central upscale neighborhood with strong salon & bridal demand" },
    { name: "AB Road & Saket", desc: "Affluent residential belt ideal for luxury beauty studios" },
    { name: "Super Corridor", desc: "Expanding IT hub and modern gated communities" },
  ],
  Bhopal: [
    { name: "Arera Colony", desc: "Affluent family neighborhood with high repeat beauty & grooming spend" },
    { name: "MP Nagar", desc: "Commercial heart with steady working-professional clientele" },
    { name: "Kolar Road", desc: "Fast-growing residential corridor seeking premium unisex salons" },
    { name: "Hoshangabad Road", desc: "Prime lifestyle retail plazas and modern apartment clusters" },
  ],
};

const defaultCityLocations = (cityName: string) => [
  { name: "Upscale Residential Corridors", desc: `Gated communities and affluent family neighborhoods in ${cityName}` },
  { name: "High-Street Lifestyle Markets", desc: `Premier shopping avenues with strong visibility in ${cityName}` },
  { name: "IT & Corporate Districts", desc: `Working professionals seeking weekend grooming & skincare in ${cityName}` },
  { name: "Shopping Malls & Plazas", desc: `High-footfall retail hubs ideal for luxury unisex salons in ${cityName}` },
];

const otherCitiesList = [
  "Salon Franchise Hyderabad",
  "Salon Franchise Indore",
  "Salon Franchise Bhopal",
  "Salon Franchise Bengaluru",
  "Salon Franchise Pune",
  "Salon Franchise Mumbai",
  "Salon Franchise Delhi NCR",
  "Salon Franchise Ahmedabad",
  "Salon Franchise Chennai",
  "Salon Franchise Kolkata",
  "Salon Franchise Lucknow",
  "Salon Franchise Jaipur",
  "Salon Franchise Vijayawada",
  "Salon Franchise Visakhapatnam",
  "Salon Franchise Chandigarh",
  "Salon Franchise Surat",
];

export function FranchiseOpportunityDetails({
  opportunity: initialOpportunity,
  slug,
}: Props) {
  const [opportunity, setOpportunity] =
    useState<FranchiseOpportunity>(initialOpportunity);

  useEffect(() => {
    const targetSlug = slug || initialOpportunity?.slug;
    if (targetSlug) {
      getFranchiseOpportunityBySlug(targetSlug).then((data) => {
        if (data && data.slug) setOpportunity(data);
      });
    }
  }, [slug, initialOpportunity?.slug]);

  const cityName = opportunity.city || "Hyderabad";
  const stateName = opportunity.state || "Telangana";

  const locations =
    opportunity.primeLocations && opportunity.primeLocations.length > 0
      ? opportunity.primeLocations
      : cityLocationsData[cityName] || defaultCityLocations(cityName);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const defaultFaqs = [
    {
      q: `What is the Styluxe Salon franchise investment in ${cityName}?`,
      a: `The Styluxe Flagship Salon package in ${cityName} starts at ₹12.5 Lakhs* (+ applicable taxes), while compact Styluxe Express studios start at ₹7.99 Lakhs*.`,
    },
    {
      q: "Is there any ongoing monthly royalty?",
      a: `No! Styluxe offers a 0% ongoing royalty model so all recurring hair, skin, bridal, and grooming service profits in ${cityName} stay with you.`,
    },
    {
      q: "Do I need prior salon or beauty industry experience?",
      a: "No prior experience is required. Our team handles 3D architectural design, stylist recruitment & trade-testing, academy training, smart booking POS, and launch marketing.",
    },
    {
      q: `How do I check salon territory availability in ${cityName}?`,
      a: `Submit the enquiry form below. Our expansion team evaluates your proposed neighborhood in ${cityName}, confirms territory exclusivity, and connects within 24 hours.`,
    },
  ];

  const faqs =
    opportunity.faqs && opportunity.faqs.length > 0 ? opportunity.faqs : defaultFaqs;

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("apply-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="tmf-detail-page">
      {/* HERO */}
      <section className="tmf-hero">
        <div className="tmf-container">
          <div className="tmf-hero-grid">
            <div className="tmf-hero-left">
              <div className="tmf-eyebrow-tag">
                <span className="tmf-eyebrow-dot" />
                <span>STYLUXE • {cityName.toUpperCase()}</span>
              </div>

              <span className="tmf-hero-subtitle-tag">
                LUXURY SALON FRANCHISE OPPORTUNITY
              </span>

              <h1 className="tmf-hero-title">
                Salon Franchise
                <br />
                Opportunity in
                <br />
                {cityName}
              </h1>

              <p className="tmf-hero-desc">
                Launch a modern, high-margin luxury unisex salon in {cityName},{" "}
                {stateName}. Turnkey botanical interiors, zero royalty,
                academy-trained stylists, and full launch support.
              </p>

              <p className="tmf-hero-note">
                Bring affordable luxury hair, beauty, skincare, and men&apos;s
                grooming to {cityName} with smart booking tech and proven salon
                SOPs.
              </p>

              <div>
                <a
                  href="#apply-form"
                  onClick={scrollToApply}
                  className="tmf-btn-gold"
                >
                  <span>Apply for Franchise</span>
                  <ArrowRight size={17} strokeWidth={2.2} />
                </a>
              </div>
            </div>

            <div className="tmf-hero-visual-wrap">
              <div className="tmf-arch-frame">
                <img
                  src={opportunity.primaryImage || "/images/styluxe/franchise-studio.jpg"}
                  alt={`Styluxe Salon in ${cityName}, ${stateName}`}
                  className="tmf-arch-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PILLS */}
      <section className="tmf-feature-bar">
        <div className="tmf-container">
          <div className="tmf-feature-pills-wrap">
            <div className="tmf-feature-pill">
              <span className="tmf-pill-icon">
                <Scissors size={18} strokeWidth={2} />
              </span>
              <span>Unisex Hair, Skin, Bridal &amp; Grooming</span>
            </div>

            <div className="tmf-feature-pill">
              <span className="tmf-pill-icon">
                <Sparkles size={18} strokeWidth={2} />
              </span>
              <span>Turnkey Botanical Luxury Interiors</span>
            </div>

            <div className="tmf-feature-pill">
              <span className="tmf-pill-icon">
                <Percent size={18} strokeWidth={2.2} />
              </span>
              <span>{opportunity.royalty || "Zero Royalty & High Margins"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="tmf-stats-strip">
        <div className="tmf-container">
          <div className="tmf-stats-grid">
            <div className="tmf-stat-col">
              <div className="tmf-stat-num">
                {opportunity.minBudget || "₹12.5 Lakhs*"}
              </div>
              <div className="tmf-stat-lbl">Flagship Setup Budget</div>
            </div>

            <div className="tmf-stat-col">
              <div className="tmf-stat-num">
                {opportunity.spaceRequired || "600 – 1,000 sq.ft"}
              </div>
              <div className="tmf-stat-lbl">Recommended Area</div>
            </div>

            <div className="tmf-stat-col">
              <div className="tmf-stat-num">
                {opportunity.timelineDays || "35 – 45 Days"}
              </div>
              <div className="tmf-stat-lbl">Turnkey Launch Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className="tmf-market-section">
        <div className="tmf-container">
          <div className="tmf-market-grid">
            <div>
              <span className="tmf-section-tag">
                STYLUXE • {cityName.toUpperCase()}
              </span>
              <h2 className="tmf-serif-heading">
                The salon opportunity in {cityName}.
              </h2>
            </div>

            <div>
              <p className="tmf-editorial-lead">
                {opportunity.editorialLead ||
                  `Modern consumers in ${cityName} are rapidly shifting from unorganized local parlours toward hygienic, aesthetically designed luxury unisex salons that offer predictable quality at honest prices.`}
              </p>
              <p className="tmf-editorial-body">
                {opportunity.editorialBody ||
                  `With high-repeat monthly hair and grooming visits alongside premium keratin, hydra-facial, and bridal bookings, a Styluxe Salon in ${cityName} builds resilient multi-category cash flow and strong 55%–65% service margins.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIME LOCATIONS */}
      <section className="tmf-locations-section">
        <div className="tmf-container">
          <div className="tmf-locations-grid">
            <div>
              <span className="tmf-section-tag">
                PRIME {cityName.toUpperCase()} NEIGHBORHOODS
              </span>
              <h2 className="tmf-serif-heading">
                Where to open in {cityName}.
              </h2>
            </div>

            <div>
              <div className="tmf-location-cards-stack">
                {locations.map((loc, idx) => (
                  <div key={`${loc.name}-${idx}`} className="tmf-loc-card">
                    <span className="tmf-loc-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="tmf-loc-info">
                      <strong>{loc.name}</strong>
                      <span>{loc.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="tmf-loc-note">
                Have another prime commercial property in {cityName}? Our
                expansion team conducts footfall audits and territory
                exclusivity checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN OUTLET */}
      <section className="tmf-plan-section">
        <div className="tmf-container">
          <div className="tmf-plan-card">
            <h2>Plan your Styluxe Salon in {cityName}</h2>
            <p>
              Launching a luxury salon in {cityName} involves evaluating
              neighborhood demographics, visibility, plumbing layout, and
              stylist recruitment. Styluxe guides every milestone from site
              sign-off to grand opening.
            </p>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="tmf-faq-section">
        <div className="tmf-container tmf-faq-container">
          <div className="tmf-faq-header">
            <h2>Planning your salon franchise in {cityName}</h2>
          </div>

          <div className="tmf-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={`${faq.q}-${idx}`}
                  className={`tmf-faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="tmf-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </button>
                  {isOpen && <div className="tmf-faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>

          <div className="tmf-faq-footer">
            <Link href="/salon-franchise-india" className="tmf-link-arrow">
              <span>Compare salon franchise models &amp; requirements</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="apply-form">
        <FranchiseFormSection
          initialCity={cityName}
          initialState={stateName}
          slug={opportunity.slug}
        />
      </section>

      {/* OTHER CITIES */}
      <section className="tmf-other-cities-section">
        <div className="tmf-container">
          <div className="tmf-cities-header">
            <span className="tmf-section-tag">EXPLORE OTHER TERRITORIES</span>
            <h3>Salon franchise opportunities in other cities</h3>
          </div>

          <div className="tmf-cities-cloud">
            {otherCitiesList.map((item, idx) => (
              <div key={`${item}-${idx}`} className="tmf-city-pill">
                {item}
              </div>
            ))}
            <Link href="/salon-franchise-india#apply" className="cafe-action">
              View all <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
