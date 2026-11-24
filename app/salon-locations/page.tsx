import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import OurCentresContent from "./components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Styluxe Salon Locations | Find a Luxury Unisex Salon Near You",
  description:
    "Find a Styluxe Salon by city or neighbourhood across India. Check studio addresses, opening hours, amenities, and book your hair, skincare, bridal, or grooming appointment.",
  keywords: [
    "Styluxe salon locations",
    "luxury unisex salon near me",
    "Styluxe Salons Hyderabad",
    "hair and beauty salon directory India",
    "book salon appointment Styluxe",
  ],
  alternates: {
    canonical: `${siteUrl}/salon-locations/`,
  },
  openGraph: {
    title: "Styluxe Salon Locations | Find a Luxury Salon Near You",
    description:
      "Locate your nearest Styluxe Salon for hair artistry, botanical facials, men's grooming, and bridal care.",
    url: `${siteUrl}/salon-locations/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons luxury interior locations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Salon Locations | Find a Salon Near You",
    description:
      "Explore Styluxe Salons across India, check timings, and reserve your next salon visit.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

const locationsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/salon-locations/#page`,
      name: "Styluxe Salon Locations",
      url: `${siteUrl}/salon-locations/`,
      description:
        "Directory of Styluxe Salons across India with timings, addresses, and direct appointment booking.",
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
      ],
    },
  ],
};

export default function SalonLocationsPage() {
  return (
    <>
      <Header active="/salon-locations" />
      <OurCentresContent />
      <Footer />
      <JsonLd data={locationsSchema} />
    </>
  );
}
