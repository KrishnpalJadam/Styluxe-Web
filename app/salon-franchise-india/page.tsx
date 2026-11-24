import type { Metadata } from "next";
import { Footer, JsonLd } from "../components";
import { FranchiseClient } from "../franchise/FranchiseClient";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Luxury Salon Franchise in India | Zero Royalty | Styluxe Salons",
  description:
    "Start your luxury unisex salon business with Styluxe Salons' zero-royalty franchise model. Explore turnkey botanical interiors, salon equipment, stylist academy training, and pan-India support.",
  keywords: [
    "Styluxe salon franchise",
    "salon franchise in India",
    "luxury unisex salon franchise",
    "zero royalty salon franchise",
    "beauty salon business opportunity India",
    "Styluxe franchise investment",
  ],
  alternates: {
    canonical: `${siteUrl}/salon-franchise-india/`,
  },
  openGraph: {
    title: "Luxury Salon Franchise in India | Zero Royalty | Styluxe Salons",
    description:
      "Start your luxury unisex salon with Styluxe Salons. Turnkey botanical interiors, certified stylist training, smart booking CRM, and zero royalty.",
    url: `${siteUrl}/salon-franchise-india/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons Luxury Flagship Salon Franchise Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Salon Franchise in India | Styluxe Salons",
    description:
      "Turnkey luxury unisex salon franchise starting with zero royalty, botanical interiors, and Styluxe Academy training.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

const franchiseSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/salon-franchise-india/#franchise`,
      name: "Styluxe Salons Flagship Franchise Program",
      url: `${siteUrl}/salon-franchise-india/`,
      description:
        "Turnkey luxury unisex salon franchise opportunity in India with zero royalty, architectural studio setup, and certified stylist training.",
      provider: {
        "@type": "BeautySalon",
        name: "Styluxe Salons",
        url: siteUrl,
      },
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Salon Franchise India",
          item: `${siteUrl}/salon-franchise-india/`,
        },
      ],
    },
  ],
};

export default function SalonFranchiseIndiaPage() {
  return (
    <main>
      <FranchiseClient active="/salon-franchise-india" variant="flagship" />
      <Footer />
      <JsonLd data={franchiseSchema} />
    </main>
  );
}
