"use client";

import { useState, useEffect, createContext, useContext, useMemo, ReactNode } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Accessibility,
  X,
  Plus,
  Navigation,
  Percent,
  Wifi,
  Heart,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  getFeaturedProducts,
  getPrimaryOffer,
  getCommonMenu,
  getCommonCategories,
  getCentreBySlugOrId,
  getReviews,
  getMoments,
} from "../../lib/api";

const ORDERED_DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const DAY_KEY_BY_INDEX = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function formatTimingValue(timeStr?: string): string {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1] || "0", 10);
  if (isNaN(hours)) return timeStr;
  if ((hours === 0 || hours === 24) && minutes === 0) return "12:00 AM";
  const ampm = hours >= 12 && hours < 24 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const formattedMinutes =
    minutes === 0 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${formattedMinutes} ${ampm}`;
}

function formatDayTiming(timing?: { open?: string; close?: string; isClosed?: boolean }): string {
  if (!timing) return "9:30 AM – 9:30 PM";
  if (timing.isClosed) return "Closed";
  if (timing.open && timing.close) {
    return `${formatTimingValue(timing.open)} – ${formatTimingValue(timing.close)}`;
  }
  return "9:30 AM – 9:30 PM";
}

function getStoreOpenStatus(timings: any) {
  const now = new Date();
  const todayIndex = now.getDay();
  const todayKey = DAY_KEY_BY_INDEX[todayIndex];

  if (!timings || typeof timings !== "object" || Object.keys(timings).length === 0) {
    return {
      isOpen: true,
      statusLabel: "Open Now",
      todayTimingText: "Open 9:30 AM – 9:30 PM",
      todayKey,
    };
  }

  const todayTiming = timings[todayKey];
  let todayTimingText = "Open 9:30 AM – 9:30 PM";
  if (todayTiming) {
    if (todayTiming.isClosed) {
      todayTimingText = "Closed Today";
    } else if (todayTiming.open && todayTiming.close) {
      todayTimingText = `Open ${formatTimingValue(todayTiming.open)} – ${formatTimingValue(todayTiming.close)}`;
    }
  }

  if (!todayTiming || todayTiming.isClosed || !todayTiming.open || !todayTiming.close) {
    return { isOpen: false, statusLabel: "Closed", todayTimingText, todayKey };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = todayTiming.open.split(":").map(Number);
  const [closeH, closeM] = todayTiming.close.split(":").map(Number);
  const openMins = openH * 60 + openM;
  let closeMins = closeH * 60 + closeM;
  if (closeMins === 0 || closeMins < openMins) closeMins += 24 * 60;
  const isOpen = currentMinutes >= openMins && currentMinutes < closeMins;

  return { isOpen, statusLabel: isOpen ? "Open Now" : "Closed", todayTimingText, todayKey };
}

function getFacilityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("hair")) return Scissors;
  if (lower.includes("skin") || lower.includes("facial")) return Sparkles;
  if (lower.includes("bridal")) return Heart;
  if (lower.includes("hygiene") || lower.includes("sanit")) return ShieldCheck;
  if (lower.includes("park") || lower.includes("valet")) return Car;
  if (lower.includes("wifi") || lower.includes("wi-fi")) return Wifi;
  if (lower.includes("unisex") || lower.includes("family")) return Users;
  if (lower.includes("wheelchair") || lower.includes("access")) return Accessibility;
  return Sparkles;
}

function parseFacilityItem(item: any): { icon: any; title: string; detail: string } {
  if (typeof item === "object" && item !== null) {
    const title = item.title || item.name || "Salon Amenity";
    const detail = item.detail || "Available";
    return { icon: item.icon || getFacilityIcon(title), title, detail };
  }
  const str = String(item || "").trim();
  return { icon: getFacilityIcon(str), title: str, detail: "Available" };
}

function isReviewForCentre(review: any, centre: any): boolean {
  if (!review || !centre) return false;
  const centreId = centre.id ? String(centre.id).trim() : "";
  const centreSlug = centre.slug ? String(centre.slug).trim().toLowerCase() : "";
  const centreName = centre.name ? String(centre.name).trim().toLowerCase() : "";
  const revCentreId = review.relatedCentreId
    ? String(review.relatedCentreId).trim()
    : review.relatedCentre?.id
      ? String(review.relatedCentre.id).trim()
      : "";
  const revCentreSlug = review.relatedCentreSlug
    ? String(review.relatedCentreSlug).trim().toLowerCase()
    : review.relatedCentre?.slug
      ? String(review.relatedCentre.slug).trim().toLowerCase()
      : "";
  const revCentreName = review.relatedCentreName
    ? String(review.relatedCentreName).trim().toLowerCase()
    : review.relatedCentre?.name
      ? String(review.relatedCentre.name).trim().toLowerCase()
      : "";

  if (centreId && revCentreId && centreId === revCentreId) return true;
  if (centreSlug && (revCentreSlug === centreSlug || revCentreId === centreSlug)) return true;
  if (centreName && revCentreName && (revCentreName.includes(centreName) || centreName.includes(revCentreName))) return true;
  return false;
}

const defaultPhotos = [
  { src: "/images/styluxe/salon-interior.jpg", alt: "Styluxe Salon reception and styling floor" },
  { src: "/images/styluxe/hero-salon.jpg", alt: "Styluxe master stylists in action" },
  { src: "/images/styluxe/salon-equipment.jpg", alt: "Ergonomic styling station with arched brass mirror" },
  { src: "/images/styluxe/service-skin.jpg", alt: "Serene botanical skincare suite" },
  { src: "/images/styluxe/franchise-studio.jpg", alt: "Styluxe luxury salon storefront" },
];

const defaultSalonCategories = [
  { id: "hair-styling", slug: "hair-styling", name: "Hair Cuts & Styling", image: "/images/styluxe/service-hair.jpg" },
  { id: "hair-treatments", slug: "hair-treatments", name: "Color & Hair Spa", image: "/images/styluxe/salon-equipment.jpg" },
  { id: "skin-facials", slug: "skin-facials", name: "Skin & Facials", image: "/images/styluxe/service-skin.jpg" },
  { id: "mens-grooming", slug: "mens-grooming", name: "Men's Grooming", image: "/images/styluxe/service-grooming.jpg" },
  { id: "bridal-makeup", slug: "bridal-makeup", name: "Bridal & Makeup", image: "/images/styluxe/service-makeup.jpg" },
  { id: "nails-spa", slug: "nails-spa", name: "Nails & Hand Spa", image: "/images/styluxe/service-nails.jpg" },
];

const defaultOffer = {
  title: "Haircut, Wash & Botanical Spa at ₹1,499",
  shortDescription:
    "Indulge in a tailored precision cut, deep conditioning botanical hair spa, and voluminous blowout.",
  bannerImage: "/images/styluxe/service-hair.jpg",
  promoCode: "STYLUXE1499",
};

const defaultFacilities = [
  { icon: Scissors, title: "Unisex Hair Studio", detail: "Certified Stylists" },
  { icon: Sparkles, title: "Private Skin Suite", detail: "Botanical Facials" },
  { icon: ShieldCheck, title: "Hospital Hygiene", detail: "UV Sterilized" },
  { icon: Heart, title: "Bridal Lounge", detail: "HD & Airbrush" },
  { icon: Car, title: "Valet & Parking", detail: "Available" },
  { icon: Wifi, title: "Complimentary Wi-Fi", detail: "Guest Lounge" },
  { icon: Accessibility, title: "Wheelchair", detail: "Accessible" },
];

const defaultStudioReviews = [
  {
    id: "r1",
    initials: "AR",
    name: "Ananya Reddy",
    text: "Spotless, tranquil interiors and truly attentive stylists. My botanical hair spa and layered blowout felt like a five-star spa visit.",
    stars: 5,
  },
  {
    id: "r2",
    initials: "RM",
    name: "Rohan Malhotra",
    text: "Best men's grooming and beard sculpting in Hyderabad. Zero waiting time with online booking and honest pricing.",
    stars: 5,
  },
  {
    id: "r3",
    initials: "PS",
    name: "Priya Sharma",
    text: "Tried the Hydra-Luminance facial before a family wedding — my skin looked radiant for days!",
    stars: 5,
  },
];

const defaultFaqs = [
  {
    q: "What are Styluxe Salon opening hours?",
    a: "Our studios are open daily from 9:30 AM to 9:30 PM. Holiday hours may vary slightly — call or WhatsApp the salon to confirm.",
  },
  {
    q: "Do I need to book an appointment in advance?",
    a: "Walk-in guests are welcome anytime, though booking ahead via WhatsApp or phone guarantees your preferred stylist and minimal wait.",
  },
  {
    q: "Are bridal and pre-bridal packages available at this studio?",
    a: "Yes. We offer private bridal makeup suites, pre-bridal skin countdown sessions, and customizable occasion packages.",
  },
];

function getStoreMapUrls(centre: any, centreName: string, address: string) {
  const rawMap = (centre?.mapUrl || centre?.googleMapUrl || "").trim();
  let iframeSrc = "";
  if (rawMap.includes("<iframe")) {
    const match = rawMap.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) iframeSrc = match[1];
  } else if (rawMap.includes("/maps/embed")) {
    iframeSrc = rawMap;
  }

  let directionsUrl = "";
  if ((rawMap.startsWith("http://") || rawMap.startsWith("https://")) && !rawMap.includes("/maps/embed") && !rawMap.includes("<iframe")) {
    directionsUrl = rawMap;
  }

  const hasCoords = centre?.latitude != null && centre?.longitude != null;
  const coordsQuery = hasCoords ? `${centre.latitude},${centre.longitude}` : "";
  const primaryQuery = coordsQuery || `${centreName} ${address}`.trim();

  if (!directionsUrl) {
    directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryQuery)}`;
  }
  if (!iframeSrc) {
    iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(primaryQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  return { directionsUrl, iframeSrc };
}

interface StoreContextType {
  centre: any;
  featuredProducts: any[];
  commonMenu: any[];
  offer: any;
}

const StoreContext = createContext<StoreContextType>({
  centre: null,
  featuredProducts: [],
  commonMenu: [],
  offer: defaultOffer,
});

export function useStoreData() {
  return useContext(StoreContext);
}

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const slugOrId = searchParams?.get("slug") || searchParams?.get("id") || "kompally";

  const [centre, setCentre] = useState<any>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [commonMenu, setCommonMenu] = useState<any[]>([]);
  const [offer, setOffer] = useState<any>(defaultOffer);

  useEffect(() => {
    let isMounted = true;

    async function loadStorePageData() {
      try {
        const [centreData, featuredData, menuData, primaryOfferData, reviewsData] =
          await Promise.allSettled([
            getCentreBySlugOrId(slugOrId),
            getFeaturedProducts(6),
            getCommonMenu(),
            getPrimaryOffer(),
            getReviews({ status: "published" }),
          ]);

        if (!isMounted) return;

        if (centreData.status === "fulfilled" && centreData.value) {
          let targetCentre = centreData.value;
          const initialReviews = Array.isArray(targetCentre.reviews) ? targetCentre.reviews : [];
          let combined = initialReviews.filter((r: any) => isReviewForCentre(r, targetCentre));

          if (reviewsData.status === "fulfilled" && Array.isArray(reviewsData.value)) {
            const relevantLive = reviewsData.value.filter(
              (r: any) =>
                (r.status === "published" || !r.status) && isReviewForCentre(r, targetCentre)
            );
            for (const rev of relevantLive) {
              if (!combined.some((c: any) => c.id === rev.id)) combined.push(rev);
            }
          }

          targetCentre = { ...targetCentre, reviews: combined };
          setCentre(targetCentre);

          if (typeof document !== "undefined" && targetCentre?.name) {
            const cityPart = targetCentre.city ? ` in ${targetCentre.city}` : "";
            document.title = `${targetCentre.name} | Styluxe Salon Studio${cityPart}`;
          }
        }

        if (featuredData.status === "fulfilled" && Array.isArray(featuredData.value) && featuredData.value.length > 0) {
          setFeaturedProducts(featuredData.value.slice(0, 6));
        }

        if (menuData.status === "fulfilled" && Array.isArray(menuData.value) && menuData.value.length > 0) {
          setCommonMenu(menuData.value);
        }

        if (primaryOfferData.status === "fulfilled" && primaryOfferData.value) {
          setOffer(primaryOfferData.value);
        }
      } catch (err) {
        console.warn("[StorePage] Error loading dynamic salon data:", err);
      }
    }

    loadStorePageData();
    return () => {
      isMounted = false;
    };
  }, [slugOrId]);

  const value = useMemo(
    () => ({ centre, featuredProducts, commonMenu, offer }),
    [centre, featuredProducts, commonMenu, offer]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function StoreHero() {
  const { centre } = useStoreData();
  const [activePhoto, setActivePhoto] = useState(1);

  const { isOpen, statusLabel, todayTimingText } = useMemo(
    () => getStoreOpenStatus(centre?.timings),
    [centre?.timings]
  );

  const photos = useMemo(() => {
    const list: Array<{ src: string; alt: string }> = [];
    if (centre?.coverImage) {
      list.push({ src: centre.coverImage, alt: `${centre.name || "Styluxe"} Cover Photo` });
    }
    if (centre?.galleryImages && Array.isArray(centre.galleryImages) && centre.galleryImages.length > 0) {
      centre.galleryImages.forEach((src: string, i: number) => {
        if (src !== centre.coverImage) {
          list.push({ src, alt: `${centre.name || "Styluxe"} photo ${i + 1}` });
        }
      });
    }
    return list.length > 0 ? list : defaultPhotos;
  }, [centre]);

  const current = photos[(activePhoto - 1) % photos.length];
  const changePhoto = (direction: number) =>
    setActivePhoto((n) => ((n - 1 + direction + photos.length) % photos.length) + 1);

  const centreName = centre?.name || "Styluxe Salon – Kompally";
  const locality = centre?.locality || "Kompally";
  const city = centre?.city || "Hyderabad";
  const state = centre?.state || "Telangana";
  const rating = centre?.averageRating || 4.9;
  const reviewCount = centre?.reviewCount || 312;
  const address =
    centre?.address ||
    "4th Floor, Surabhi Rama Complex, Plot No. 106, Suchitra Rd, Kompally, Hyderabad, Telangana 500067";
  const phone = centre?.contactNumber || "+91 9505 047 047";
  const whatsapp = centre?.whatsappNumber || phone;

  const { directionsUrl: mapDirectionsUrl } = useMemo(
    () => getStoreMapUrls(centre, centreName, address),
    [centre, centreName, address]
  );

  return (
    <>
      <div className="detailscentres-breadcrumbs">
        <a href="/">Home</a>
        <ChevronRight />
        <a href="/salon-locations">Our Salons</a>
        <ChevronRight />
        <span>{state}</span>
        <ChevronRight />
        <span>{city}</span>
        <ChevronRight />
        <span>{locality}</span>
      </div>

      <section className="detailscentres-hero">
        <div className="detailscentres-store-info">
          <div className="detailscentres-eyebrow">STYLUXE STUDIO</div>

          <h1>
            {centreName}
            <span className="detailscentres-title-mark">✦</span>
          </h1>

          <div className="detailscentres-rating">
            <Star fill="currentColor" size={22} />
            <strong>
              {rating} <span>({reviewCount} reviews)</span>
            </strong>
          </div>

          <div className="detailscentres-address">
            <MapPin size={22} />
            <p>{address}</p>
          </div>

          <div className="detailscentres-status-line">
            <span
              className="detailscentres-open-badge"
              style={
                !isOpen
                  ? { backgroundColor: "#fee2e2", color: "#991b1b", borderColor: "#fecaca" }
                  : undefined
              }
            >
              <i style={!isOpen ? { backgroundColor: "#ef4444" } : undefined} />
              {statusLabel}
            </span>
            <span className="detailscentres-hours-short">
              <Clock3 size={17} />
              {todayTimingText}
            </span>
          </div>

          <div className="detailscentres-actions">
            <a
              className="detailscentres-btn detailscentres-btn-yellow"
              target="_blank"
              rel="noreferrer"
              href={mapDirectionsUrl}
            >
              <MapPin />
              Get Directions
            </a>

            <a
              className="detailscentres-btn detailscentres-btn-primary"
              href={`tel:${phone.replace(/\s+/g, "")}`}
            >
              <Phone />
              Call Salon
            </a>

            <a
              className="detailscentres-btn detailscentres-btn-outline"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hi ${centreName}, I would like to book an appointment.`
              )}`}
            >
              <MessageCircle />
              Book on WhatsApp
            </a>

            <a className="detailscentres-btn detailscentres-btn-primary" href="/services">
              <Scissors />
              View Services
            </a>
          </div>
        </div>

        <div className="detailscentres-photos">
          <div className="detailscentres-main-photo">
            <img src={current.src} alt={current.alt} />
            <span className="detailscentres-photo-count">
              {activePhoto} / {photos.length}
            </span>
            <button
              className="detailscentres-photo-arrow detailscentres-prev"
              aria-label="Previous photo"
              onClick={() => changePhoto(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              className="detailscentres-photo-arrow detailscentres-next"
              aria-label="Next photo"
              onClick={() => changePhoto(1)}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="detailscentres-thumbnails">
            {photos.map((photo: any, i: number) => (
              <button
                key={photo.src + i}
                onClick={() => setActivePhoto(i + 1)}
                className={activePhoto === i + 1 ? "detailscentres-selected" : ""}
                aria-label={`View photo ${i + 1}`}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function StoreFeatures() {
  const { centre } = useStoreData();

  const displayFacilities = useMemo(() => {
    if (centre?.facilities && Array.isArray(centre.facilities) && centre.facilities.length > 0) {
      return centre.facilities.map(parseFacilityItem);
    }
    return defaultFacilities;
  }, [centre?.facilities]);

  return (
    <section className="detailscentres-facilities" aria-label="Salon amenities">
      {displayFacilities.map(({ icon: Icon, title, detail }: any, idx: number) => (
        <div className="detailscentres-facility" key={`${title}-${idx}`}>
          <span className="detailscentres-round-icon">
            <Icon size={21} />
          </span>
          <span>
            <b>{title}</b>
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </section>
  );
}

export function StorePromos() {
  const { offer, centre } = useStoreData();
  const currentOffer = offer || defaultOffer;
  const locality = centre?.locality || centre?.city || "Kompally";
  const whatsapp = (centre?.whatsappNumber || centre?.contactNumber || "919505047047").replace(/[^0-9]/g, "");

  return (
    <section className="detailscentres-promo-row">
      <article className="detailscentres-promo detailscentres-chai-promo">
        <div className="detailscentres-promo-label">
          <span className="detailscentres-round-icon">
            <Percent />
          </span>
          Studio Special at {locality}
        </div>

        <h2>{currentOffer.title}</h2>

        <a className="detailscentres-btn detailscentres-btn-yellow" href="/offers">
          Explore Offers <ArrowRight size={15} />
        </a>

        <img
          className="detailscentres-promo-food"
          src={currentOffer.bannerImage || "/images/styluxe/service-hair.jpg"}
          alt={currentOffer.title}
        />
      </article>

      <article className="detailscentres-promo detailscentres-delivery-promo">
        <div className="detailscentres-delivery-content">
          <h2>
            Reserve Your Slot at
            <br />
            Styluxe {locality}
          </h2>
          <p>
            Skip the wait — schedule your haircut, facial, bridal consultation,
            or grooming ritual directly with our studio desk.
          </p>
          <div className="detailscentres-delivery-links">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                `Hi Styluxe ${locality}, I would like to book an appointment.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Book via WhatsApp
            </a>
            <a href="/services">Explore Services</a>
          </div>
        </div>

        <CalendarCheck className="detailscentres-delivery-art" size={92} />
      </article>
    </section>
  );
}

function MomentsSection() {
  const [photos, setPhotos] = useState<{ src: string; alt: string }[]>(defaultPhotos);

  useEffect(() => {
    let isMounted = true;
    getMoments()
      .then((valid) => {
        if (isMounted && valid.length > 0) {
          setPhotos(valid.map((src, i) => ({ src, alt: `Styluxe studio moment ${i + 1}` })));
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="detailscentres-section">
      <div className="detailscentres-section-heading">
        <div>
          <span className="detailscentres-eyebrow">INSIDE OUR SANCTUARY</span>
          <h2>Moments at Styluxe</h2>
        </div>
      </div>

      <div className="detailscentres-gallery-grid">
        {photos.map((photo, index) => (
          <div className="detailscentres-gallery-item" key={`${photo.src}-${index}`}>
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function StoreSections() {
  const { offer, centre } = useStoreData();
  const [categories, setCategories] = useState<any[]>(defaultSalonCategories);
  const [openFaq, setOpenFaq] = useState(0);

  const { todayKey } = useMemo(
    () => getStoreOpenStatus(centre?.timings),
    [centre?.timings]
  );

  const displayFaqs = useMemo(() => {
    if (centre?.faqs && Array.isArray(centre.faqs) && centre.faqs.length > 0) {
      const mapped = centre.faqs
        .map((f: any) => ({
          q: f.q || f.question || f.title || "",
          a: f.a || f.answer || f.content || f.description || "",
        }))
        .filter((f: any) => f.q && f.a);
      if (mapped.length > 0) return mapped;
    }
    return defaultFaqs;
  }, [centre?.faqs]);

  const storeReviews = useMemo(() => {
    if (centre?.reviews && Array.isArray(centre.reviews) && centre.reviews.length > 0) {
      const mapped = centre.reviews
        .filter((r: any) => isReviewForCentre(r, centre))
        .map((r: any) => ({
          id: r.id,
          name: r.reviewerName || r.name || "Guest",
          initials: (r.reviewerName || r.name || "ST")
            .split(" ")
            .filter(Boolean)
            .map((n: string) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          avatar: r.reviewerAvatar || r.avatar || null,
          text: r.reviewText || r.text || r.comment || "",
          stars: Number(r.starRating || r.stars || r.rating || 5),
        }));
      if (mapped.length > 0) return mapped;
    }
    return defaultStudioReviews;
  }, [centre]);

  useEffect(() => {
    let isMounted = true;
    getCommonCategories()
      .then((apiCategories) => {
        if (!isMounted || !Array.isArray(apiCategories) || apiCategories.length === 0) return;
        const active = apiCategories
          .filter((item: any) => item.status === "active")
          .sort((a: any, b: any) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
          .slice(0, 6);
        if (active.length > 0) {
          setCategories(
            active.map((item: any) => ({
              id: item.id,
              name: item.name,
              slug: item.slug,
              image: item.image || "/images/styluxe/service-hair.jpg",
            }))
          );
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeOffer = offer || defaultOffer;
  const locality = centre?.locality || centre?.city || "Kompally";
  const centreName = centre?.name || `Styluxe Salon – ${locality}`;
  const address =
    centre?.address ||
    "4th Floor, Surabhi Rama Complex, Plot No. 106, Suchitra Rd, Kompally, Hyderabad, Telangana 500067";
  const phone = centre?.contactNumber || "+91 9505 047 047";
  const whatsapp = centre?.whatsappNumber || phone;

  const { directionsUrl: mapDirectionsUrl, iframeSrc: mapIframeSrc } = useMemo(
    () => getStoreMapUrls(centre, centreName, address),
    [centre, centreName, address]
  );

  return (
    <>
      {/* Popular Services */}
      <section className="detailscentres-section" id="menu">
        <div className="detailscentres-section-heading">
          <div>
            <span className="detailscentres-eyebrow">CURATED CARE</span>
            <h2>Popular at Styluxe</h2>
          </div>
          <a className="detailscentres-section-link" href="/services">
            View Full Service Menu <ArrowRight size={16} />
          </a>
        </div>

        <div className="detailscentres-category-grid">
          {categories.map((item) => (
            <a
              href={item.slug ? `/services?category=${encodeURIComponent(item.slug)}` : "/services"}
              className="detailscentres-category-card"
              key={item.id || item.slug || item.name}
            >
              <img src={item.image} alt={`${item.name} at Styluxe`} loading="lazy" />
              <div className="detailscentres-category-overlay">
                <h3>{item.name}</h3>
                <span>
                  Explore Services <ArrowRight size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="detailscentres-section">
        <div className="detailscentres-section-heading">
          <div>
            <span className="detailscentres-eyebrow">WHAT OUR GUESTS SAY</span>
            <h2>Loved by our clients</h2>
          </div>
          <div className="detailscentres-review-summary">
            <Star fill="currentColor" /> <b>{centre?.averageRating || 4.9}/5</b>{" "}
            <span>{centre?.reviewCount || 312} reviews</span>
          </div>
        </div>

        <div className="detailscentres-reviews-grid">
          {storeReviews.map((review: any) => (
            <article className="detailscentres-review-card" key={review.id || review.initials}>
              <div className="detailscentres-avatar">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  review.initials
                )}
              </div>
              <div>
                <h3>{review.name}</h3>
                <div className="detailscentres-stars">{"★".repeat(review.stars || 5)}</div>
                <p>{review.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Map & Contact */}
      <section className="detailscentres-section">
        <div className="detailscentres-section-heading">
          <div>
            <span className="detailscentres-eyebrow">FIND US</span>
            <h2>Visit {centreName}</h2>
          </div>
        </div>

        <div className="detailscentres-location-grid">
          <article className="detailscentres-map-panel">
            <div className="detailscentres-panel-heading">
              <h3>Studio Location</h3>
              <a target="_blank" rel="noreferrer" href={mapDirectionsUrl}>
                Open in Google Maps <ArrowRight size={14} />
              </a>
            </div>

            <div className="detailscentres-real-map">
              <iframe
                title={`${centreName} Location Map`}
                src={mapIframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="detailscentres-map-badge">
                <span className="detailscentres-map-cup">✦</span>
                <div>
                  <strong>{centreName}</strong>
                  <span>{locality}</span>
                </div>
              </div>

              <a
                className="detailscentres-btn detailscentres-btn-primary detailscentres-map-directions"
                target="_blank"
                rel="noreferrer"
                href={mapDirectionsUrl}
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </article>

          <div className="detailscentres-contact-stack">
            <article className="detailscentres-contact-panel">
              <h3>Contact the Salon</h3>
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                <Phone size={17} /> {phone}
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={17} /> Book on WhatsApp
              </a>
              <p>
                <MapPin size={17} /> {address}
              </p>
            </article>

            <article className="detailscentres-hours-panel">
              <h3>
                <Clock3 size={20} /> Opening Hours
              </h3>
              {centre?.timings && typeof centre.timings === "object" ? (
                ORDERED_DAYS.map(({ key, label }) => {
                  const isToday = key === todayKey;
                  const timingText = formatDayTiming(centre.timings[key]);
                  return (
                    <div
                      key={key}
                      style={
                        isToday
                          ? { backgroundColor: "#eef2ec", padding: "8px 10px", borderRadius: "6px", fontWeight: 700 }
                          : undefined
                      }
                    >
                      <span style={isToday ? { color: "#0d3b26" } : undefined}>
                        {label}
                        {isToday && " (Today)"}
                      </span>
                      <b style={isToday ? { color: "#0d3b26" } : undefined}>{timingText}</b>
                    </div>
                  );
                })
              ) : (
                <div>
                  <span>Monday – Sunday</span>
                  <b>9:30 AM – 9:30 PM</b>
                </div>
              )}
              <small>{centre?.holidayHours || "Contact the studio to confirm festive hours."}</small>
            </article>
          </div>
        </div>
      </section>

      <MomentsSection />

      {/* Central Offer */}
      <section className="detailscentres-section detailscentres-offers-section">
        <div className="detailscentres-section-heading">
          <div>
            <span className="detailscentres-eyebrow">SELF-CARE SPECIAL</span>
            <h2>Exclusive Studio Offer</h2>
          </div>
          <a className="detailscentres-section-link" href="/offers">
            Explore Offers <ArrowRight size={16} />
          </a>
        </div>

        <div className="detailscentres-offers-grid">
          <article>
            <img
              src={activeOffer.bannerImage || "/images/styluxe/service-hair.jpg"}
              alt={activeOffer.title || "Styluxe salon offer"}
            />
            <div>
              <span>{activeOffer.promoCode || "STYLUXE CARE"}</span>
              <h3>{activeOffer.title}</h3>
              <p>{activeOffer.shortDescription || activeOffer.detailedDescription}</p>
              <a href="/services">
                Explore service <ArrowRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* FAQs */}
      {displayFaqs.length > 0 && (
        <section className="detailscentres-section detailscentres-faq-section" id="centre-faq">
          <div className="detailscentres-faq-intro">
            <span className="detailscentres-eyebrow">GOOD TO KNOW</span>
            <h2>A few things you might be wondering</h2>
            <p>Everything you need to plan a calm, effortless Styluxe visit.</p>
            <div className="detailscentres-faq-art">
              <img src="/images/styluxe/service-skin.jpg" alt="Skincare care at Styluxe" />
              <span>
                Confidence
                <br />
                begins with care!
              </span>
            </div>
          </div>

          <div className="detailscentres-faq-list">
            {displayFaqs.map((faq: { q: string; a: string }, i: number) => (
              <article key={`${faq.q}-${i}`} className="detailscentres-faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  {openFaq === i ? <X size={17} /> : <Plus size={17} />}
                </button>
                {openFaq === i && <p>{faq.a}</p>}
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
