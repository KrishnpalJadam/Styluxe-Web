"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  Building2,
  Clock3,
  Globe,
  MapPin,
  Scissors,
  Sparkles,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import "./components.css";
import Link from "next/link";
import { getCentres } from "../lib/api";
import BookAppointmentModal from "../components/BookAppointmentModal";

const STUDIO_IMAGE = "/images/styluxe/salon-interior.jpg";

type SalonStudio = {
  id: number | string;
  slug?: string;
  name: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  reviews: number;
  distance: number;
  hours: string;
  image?: string;
};

const defaultSalons: SalonStudio[] = [
  {
    id: 1,
    slug: "kompally",
    name: "Styluxe Salon – Kompally",
    locality: "Kompally",
    address:
      "4th Floor, Surabhi Rama Complex, Plot No. 106, Suchitra Rd, Kompally, Hyderabad, Telangana 500067",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    rating: 4.9,
    reviews: 312,
    distance: 0.8,
    hours: "9:30 AM – 9:30 PM",
    image: "/images/styluxe/salon-interior.jpg",
  },
  {
    id: 2,
    slug: "jubilee-hills",
    name: "Styluxe Salon – Jubilee Hills",
    locality: "Jubilee Hills",
    address:
      "Road No. 36, Luxury Boutique Plaza, Jubilee Hills, Hyderabad, Telangana 500033",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    rating: 4.9,
    reviews: 284,
    distance: 2.1,
    hours: "9:30 AM – 9:30 PM",
    image: "/images/styluxe/franchise-studio.jpg",
  },
  {
    id: 3,
    slug: "gachibowli",
    name: "Styluxe Salon – Gachibowli",
    locality: "Gachibowli",
    address:
      "Financial District High Street, Gachibowli, Hyderabad, Telangana 500032",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    rating: 4.8,
    reviews: 215,
    distance: 3.4,
    hours: "9:30 AM – 9:30 PM",
    image: "/images/styluxe/salon-equipment.jpg",
  },
];

export default function OurCentresContent() {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Telangana");
  const [city, setCity] = useState("Hyderabad");
  const [locality, setLocality] = useState("All locations");
  const [sortBy, setSortBy] = useState("nearest");
  const [dbSalons, setDbSalons] = useState<any[]>([]);
  const [bookingSalon, setBookingSalon] = useState<SalonStudio | null>(null);
  const [appliedFilters, setAppliedFilters] = useState({
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    locality: "All locations",
  });

  useEffect(() => {
    let mounted = true;
    getCentres().then((data) => {
      if (mounted && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((c: any, i: number) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          locality: c.locality || c.city,
          address: c.address,
          city: c.city,
          state: c.state,
          country: c.country || "India",
          rating: c.averageRating || 4.9,
          reviews: c.reviewCount || 210,
          distance: 0.8 + i * 1.5,
          hours: "9:30 AM – 9:30 PM",
          image: c.coverImage || STUDIO_IMAGE,
        }));
        setDbSalons(formatted);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const allSalons = dbSalons.length > 0 ? dbSalons : defaultSalons;

  const availableCountries = useMemo(() => {
    const list = Array.from(new Set(allSalons.map((c) => c.country).filter(Boolean)));
    return list.length > 0 ? list : ["India"];
  }, [allSalons]);

  const availableStates = useMemo(() => {
    const list = Array.from(
      new Set(
        allSalons
          .filter((c) => !country || c.country === country)
          .map((c) => c.state)
          .filter(Boolean)
      )
    );
    return list.length > 0 ? list : ["Telangana"];
  }, [allSalons, country]);

  const availableCities = useMemo(() => {
    const list = Array.from(
      new Set(
        allSalons
          .filter(
            (c) => (!state || c.state === state) && (!country || c.country === country)
          )
          .map((c) => c.city)
          .filter(Boolean)
      )
    );
    return list.length > 0 ? list : ["Hyderabad"];
  }, [allSalons, country, state]);

  const availableLocalities = useMemo(() => {
    const list = Array.from(
      new Set(
        allSalons
          .filter((c) => (!city || c.city === city) && (!state || c.state === state))
          .map((c) => c.locality)
          .filter(Boolean)
      )
    );
    return ["All locations", ...list];
  }, [allSalons, state, city]);

  const visibleSalons = useMemo(() => {
    const filtered = allSalons.filter((salon) => {
      const matchesCountry =
        !appliedFilters.country || salon.country === appliedFilters.country;
      const matchesState =
        !appliedFilters.state || salon.state === appliedFilters.state;
      const matchesCity =
        !appliedFilters.city || salon.city === appliedFilters.city;
      const matchesLocality =
        appliedFilters.locality === "All locations" ||
        salon.locality?.toLowerCase() === appliedFilters.locality.toLowerCase();

      return matchesCountry && matchesState && matchesCity && matchesLocality;
    });

    if (sortBy === "rating") return [...filtered].sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) => a.distance - b.distance);
  }, [allSalons, appliedFilters, sortBy]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedFilters({ country, state, city, locality });
  }

  return (
    <main className="tm-centres">
      {/* Hero */}
      <section className="tm-hero">
        <img
          className="tm-hero-image"
          src="/images/styluxe/salon-interior.jpg"
          alt="Styluxe Luxury Salon Studios"
        />

        <div className="tm-hero-overlay" />

        <div className="tm-container tm-hero-content">
          <div className="tm-eyebrow">
            <span />
            OUR SALON STUDIOS
          </div>

          <h1>
            Find Your Styluxe
            <br />
            <span>Salon</span>
          </h1>

          <p className="text-dark2">
            Your calm neighborhood sanctuary for luxury hair,
            <br /> botanical skincare, and modern grooming.
          </p>
        </div>
      </section>

      <div className="tm-container tm-main-content">
        {/* Location filters */}
        <form className="tm-filter-panel" onSubmit={handleSearch}>
          {/* <div className="tm-filter-field">
            <label htmlFor="tm-country">Country</label>
            <div className="tm-select-wrap">
              <Globe size={19} />
              <select
                id="tm-country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                {availableCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="tm-filter-field">
            <label htmlFor="tm-state">State</label>
            <div className="tm-select-wrap">
              <MapPin size={19} />
              <select
                id="tm-state"
                value={state}
                onChange={(event) => {
                  const nextState = event.target.value;
                  setState(nextState);
                  const cities = Array.from(
                    new Set(
                      allSalons
                        .filter((c) => c.state === nextState)
                        .map((c) => c.city)
                        .filter(Boolean)
                    )
                  );
                  if (cities.length > 0) setCity(cities[0]);
                  setLocality("All locations");
                }}
              >
                {availableStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
                onChange={(event) => {
                  setCity(event.target.value);
                  setLocality("All locations");
                }}
              >
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tm-filter-field">
            <label htmlFor="tm-locality">Locality / Studio</label>
            <div className="tm-select-wrap">
              <MapPin size={19} />
              <select
                id="tm-locality"
                value={locality}
                onChange={(event) => setLocality(event.target.value)}
              >
                {availableLocalities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="tm-button tm-search-button">
            Find Salons <ArrowRight size={18} />
          </button>
        </form>

        {/* Salon results */}
        <section className="tm-results" id="tm-centres">
          <div className="tm-results-heading">
            <div>
              <span className="tm-section-label">EXPLORE NEAR YOU</span>
              <h2>
                {visibleSalons.length} Styluxe{" "}
                {visibleSalons.length === 1 ? "Salon" : "Salons"} in{" "}
                {appliedFilters.city}
              </h2>
              <p>
                Book your appointment or drop in for expert hair, beauty, and
                grooming care.
              </p>
            </div>

            <label className="tm-sort-field">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort salons"
              >
                <option value="nearest">Nearest first</option>
                <option value="rating">Highest rated</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          {visibleSalons.length > 0 ? (
            <div className="tm-cafe-grid">
              {visibleSalons.map((salon) => (
                <article className="tm-cafe-card" key={salon.id}>
                  <div className="tm-cafe-image-wrap">
                    <img
                      className="tm-cafe-image"
                      src={salon.image || STUDIO_IMAGE}
                      alt={`${salon.name} interior`}
                      loading="lazy"
                    />
                    <span className="tm-open-badge">
                      <span />
                      BOOK APPOINTMENT
                    </span>
                  </div>

                  <div className="tm-cafe-body">
                    <div className="tm-cafe-title-row">
                      <h3>{salon.name}</h3>
                    </div>

                    <p className="tm-cafe-address">
                      <MapPin size={18} />
                      <span>{salon.address}</span>
                    </p>

                    <div className="tm-rating">
                      <span
                        className="tm-stars"
                        aria-label={`${salon.rating} out of 5 stars`}
                      >
                        ★★★★★
                      </span>
                      <strong>{salon.rating.toFixed(1)}</strong>
                      <span>({salon.reviews} reviews)</span>
                    </div>

                    <div className="tm-cafe-hours">
                      <Clock3 size={17} />
                      <span>{salon.hours}</span>
                    </div>

                    <div className="tm-amenities">
                      <span>
                        <Scissors size={15} /> Hair &amp; Grooming
                      </span>
                      <span>
                        <Sparkles size={15} /> Skin Suite
                      </span>
                      <span>
                        <ShieldCheck size={15} /> Hygienic Care
                      </span>
                    </div>

                    <div className="tm-cafe-actions">
                      <button
                        type="button"
                        className="tm-button tm-directions-button"
                        onClick={() => setBookingSalon(salon)}
                      >
                        <PhoneCall size={17} />
                        Book Appointment
                      </button>

                      <Link
                        className="tm-button tm-view-button"
                        href={`/salon-locations/studio?slug=${(salon as any).slug || "kompally"}`}
                      >
                        View Salon <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tm-empty-state">
              <MapPin size={36} />
              <h3>No salons found</h3>
              <p>Try selecting another city or locality.</p>
              <button
                className="tm-button tm-view-button"
                type="button"
                onClick={() => {
                  setCountry("India");
                  setState("Telangana");
                  setCity("Hyderabad");
                  setLocality("All locations");
                  setAppliedFilters({
                    country: "India",
                    state: "Telangana",
                    city: "Hyderabad",
                    locality: "All locations",
                  });
                }}
              >
                Show all salons
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="tm-bottom-cta">
          <div>
            <span className="tm-section-label">CONFIDENCE BEGINS WITH CARE</span>
            <h2>There&apos;s a Styluxe Salon ready to welcome you.</h2>
            <p>Find your nearest studio and reserve your self-care ritual.</p>
          </div>

          <a href="#tm-centres" className="tm-button tm-cta-button">
            Explore Salons <ArrowRight size={18} />
          </a>
        </section>
      </div>

      <BookAppointmentModal
        open={Boolean(bookingSalon)}
        onClose={() => setBookingSalon(null)}
        defaultBranchId={bookingSalon?.id}
        defaultBranchName={bookingSalon?.name}
      />
    </main>
  );
}
