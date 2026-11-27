"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import Link from "next/link";
import "./coponents.css";
import {
  getFranchiseOpportunities,
  type DynamicFranchiseOpportunity,
} from "../lib/api";

const HERO_IMAGE = "/images/styluxe/salon-interior.jpg";
const STUDIO_IMAGE = "/images/styluxe/franchise-studio.jpg";

const defaultFranchiseOpportunities: DynamicFranchiseOpportunity[] = [
  {
    id: "1",
    franchiseName: "Styluxe Salon – Kompally",
    slug: "styluxe-kompally",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    shortDescription:
      "Bring the Styluxe luxury hair, beauty & grooming experience to Kompally, Hyderabad.",
    description:
      "<p>Become a part of the <strong>Styluxe Salons</strong> franchise network and build a serene luxury beauty destination.</p>",
    primaryImage: STUDIO_IMAGE,
  },
  {
    id: "2",
    franchiseName: "Styluxe Salon – Gachibowli",
    slug: "styluxe-gachibowli",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    shortDescription:
      "Explore a Styluxe flagship salon franchise opportunity in Gachibowli.",
    description:
      "<p>Partner with Styluxe Salons and build an upscale destination for modern hair artistry, facials, and grooming.</p>",
    primaryImage: "/images/styluxe/salon-interior.jpg",
  },
  {
    id: "3",
    franchiseName: "Styluxe Salon – Indore",
    slug: "styluxe-indore",
    country: "India",
    state: "Madhya Pradesh",
    city: "Indore",
    shortDescription:
      "Launch your Styluxe Salon franchise in the vibrant lifestyle hubs of Indore.",
    description:
      "<p>Join the Styluxe Salons network and offer affordable luxury beauty and grooming in Indore.</p>",
    primaryImage: "/images/styluxe/salon-equipment.jpg",
  },
  {
    id: "4",
    franchiseName: "Styluxe Salon – Bhopal",
    slug: "styluxe-bhopal",
    country: "India",
    state: "Madhya Pradesh",
    city: "Bhopal",
    shortDescription:
      "Discover the Styluxe Salon franchise opportunity in Bhopal.",
    description:
      "<p>Create a welcoming, hygienic beauty sanctuary with Styluxe’s turnkey salon blueprint.</p>",
    primaryImage: "/images/styluxe/hero-salon.jpg",
  },
];

type Props = {
  initialOpportunities?: DynamicFranchiseOpportunity[];
};

export default function OurFranchiseOpportunitiesContent({
  initialOpportunities,
}: Props = {}) {
  const [opportunities, setOpportunities] = useState<DynamicFranchiseOpportunity[]>(
    initialOpportunities && initialOpportunities.length > 0
      ? initialOpportunities
      : defaultFranchiseOpportunities
  );

  useEffect(() => {
    getFranchiseOpportunities("active").then((data) => {
      if (data && data.length > 0) {
        setOpportunities(data);
      }
    });
  }, []);

  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Telangana");
  const [city, setCity] = useState("Hyderabad");
  const [appliedFilters, setAppliedFilters] = useState({
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
  });

  const availableCountries = useMemo(
    () => [...new Set(opportunities.map((item) => item.country).filter(Boolean))],
    [opportunities]
  );

  const availableStates = useMemo(() => {
    const states = opportunities
      .filter((item) => !country || item.country === country)
      .map((item) => item.state)
      .filter(Boolean);
    return [...new Set(states)];
  }, [opportunities, country]);

  const availableCities = useMemo(() => {
    const cities = opportunities
      .filter(
        (item) =>
          (!country || item.country === country) &&
          (!state || item.state === state)
      )
      .map((item) => item.city)
      .filter(Boolean);
    return [...new Set(cities)];
  }, [opportunities, country, state]);

  const visibleOpportunities = useMemo(
    () =>
      opportunities.filter(
        (item) =>
          (!appliedFilters.country || item.country === appliedFilters.country) &&
          (!appliedFilters.state || item.state === appliedFilters.state) &&
          (!appliedFilters.city || item.city === appliedFilters.city)
      ),
    [opportunities, appliedFilters]
  );

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilters({ country, state, city });
  }

  function resetFilters() {
    const first = opportunities[0] || defaultFranchiseOpportunities[0];
    setCountry(first.country || "India");
    setState(first.state || "Telangana");
    setCity(first.city || "Hyderabad");
    setAppliedFilters({
      country: first.country || "India",
      state: first.state || "Telangana",
      city: first.city || "Hyderabad",
    });
  }

  return (
    <main className="tm-centres">
      {/* Hero */}
      <section className="tm-hero">
        <img
          className="tm-hero-image"
          src={HERO_IMAGE}
          alt="Styluxe Luxury Salon Interior"
        />
        <div className="tm-hero-overlay" />
        <div className="tm-container tm-hero-content">
          <div className="tm-eyebrow">
            <span />
            SALON FRANCHISE OPPORTUNITIES
          </div>
          <h1>
            Find Your Styluxe
            <br />
            <span>Territory</span>
          </h1>
          <p className="text-dark2">
            Join our expanding network of modern luxury salons and bring the
            Styluxe experience to your city.
          </p>
          <div className="tm-hero-slogan">
            Confidence Begins,
            <br />
            <span>With Care.</span>
          </div>
        </div>
      </section>

      <div className="tm-container tm-main-content">
        {/* Filters */}
        <form className="tm-filter-panel" onSubmit={handleSearch}>


          <div className="tm-filter-field">
            <label htmlFor="tm-state">State</label>
            <div className="tm-select-wrap">
              <MapPin size={19} />
              <select
                id="tm-state"
                value={state}
                onChange={(event) => {
                  const nextState = event.target.value;
                  const nextCity =
                    opportunities.find(
                      (item) =>
                        item.country === country && item.state === nextState
                    )?.city || "";
                  setState(nextState);
                  setCity(nextCity);
                }}
              >
                {availableStates.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tm-filter-field">
            <label htmlFor="tm-city">City</label>
            <div className="tm-select-wrap">
              <Building2 size={19} />
              <select
                id="tm-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              >
                {availableCities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="tm-button tm-search-button">
            Search <ArrowRight size={18} />
          </button>
        </form>

        {/* Cards */}
        <section className="tm-results" id="tm-franchise-opportunities">
          <div className="tm-results-heading">
            <div>
              <span className="tm-section-label">
                EXPLORE SALON FRANCHISE TERRITORIES
              </span>
              <h2>
                {visibleOpportunities.length} Styluxe{" "}
                {visibleOpportunities.length === 1
                  ? "Opportunity"
                  : "Opportunities"}{" "}
                in {appliedFilters.city}
              </h2>
              <p>
                Find the ideal neighborhood to open your Styluxe Luxury Salon.
              </p>
            </div>
          </div>

          {visibleOpportunities.length > 0 ? (
            <div className="tm-cafe-grid">
              {visibleOpportunities.map((item) => (
                <article className="tm-cafe-card" key={item.id}>
                  <div className="tm-cafe-image-wrap">
                    <img
                      className="tm-cafe-image"
                      src={item.primaryImage || STUDIO_IMAGE}
                      alt={item.franchiseName}
                      loading="lazy"
                    />
                  </div>

                  <div className="tm-cafe-body">
                    <div className="tm-cafe-title-row">
                      <h3>{item.franchiseName}</h3>
                    </div>

                    <p className="tm-cafe-address">
                      <MapPin size={18} />
                      <span>
                        {item.city}, {item.state}, {item.country}
                      </span>
                    </p>

                    <p className="tm-franchise-description">
                      {item.shortDescription}
                    </p>

                    <div className="tm-cafe-actions">
                      <Link
                        className="tm-button tm-view-button view2"
                        href={`/franchise/${item.slug}`}
                      >
                        View Opportunity <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tm-empty-state">
              <MapPin size={36} />
              <h3>No salon franchise opportunities found</h3>
              <p>Try selecting another country, state or city.</p>
              <button
                className="tm-button tm-view-button"
                type="button"
                onClick={resetFilters}
              >
                Show opportunities <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="tm-bottom-cta">
          <div>
            <span className="tm-section-label">
              BUILD YOUR SALON BUSINESS WITH STYLUXE
            </span>
            <h2>Bring the Styluxe salon experience to your city.</h2>
            <p>Explore our active studios or connect with our franchise team.</p>
          </div>
          <Link href="/salon-locations" className="tm-button tm-cta-button">
            Explore Salons <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}
