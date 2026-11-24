import type { Metadata } from "next";
import { Suspense } from "react";
import "./components.css";
import {
  StoreHero,
  StoreFeatures,
  StorePromos,
  StoreSections,
  StoreDataProvider,
} from "./components";
import { Footer, Header, JsonLd } from "../../components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Styluxe Salon Studio Details | Timings, Services, Offers & Directions",
  description:
    "Explore individual Styluxe Salon studios across India. View opening hours, sanitized facilities, exclusive in-studio offers, verified client reviews, and curated services.",
  alternates: {
    canonical: `${siteUrl}/salon-locations/studio/`,
  },
  openGraph: {
    title: "Styluxe Salon Studio Details | Hair, Beauty & Grooming",
    description:
      "Check studio timings, amenities, exclusive salon offers, and book your appointment at Styluxe Salons.",
    url: `${siteUrl}/salon-locations/studio/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salon Studio Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Salon Studio | Timings, Services & Booking",
    description:
      "Explore studio amenities, services, and instant booking at Styluxe Salons.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

const studioSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${siteUrl}/salon-locations/studio/#studio`,
      name: "Styluxe Salon Studio",
      url: `${siteUrl}/salon-locations/studio/`,
      image: `${siteUrl}/images/styluxe/salon-interior.jpg`,
      priceRange: "₹₹",
      telephone: "+91-9505047047",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Salon Locations",
          item: `${siteUrl}/salon-locations/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Salon Studio",
          item: `${siteUrl}/salon-locations/studio/`,
        },
      ],
    },
  ],
};

export default function SalonStudioPage() {
  return (
    <div className="tm-page">
      <Header active="/salon-locations" />
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <StoreDataProvider>
          <main className="tm-container tm-main">
            <StoreHero />
            <StoreFeatures />
            <StorePromos />
            <StoreSections />
          </main>
        </StoreDataProvider>
      </Suspense>
      <Footer />
      <JsonLd data={studioSchema} />
    </div>
  );
}
