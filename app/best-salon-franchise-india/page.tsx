import type { Metadata } from "next";
import { Footer, JsonLd } from "../components";
import { FranchiseClient } from "../franchise/FranchiseClient";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Best Compact Salon Franchise in India | Styluxe Express Studio",
  description:
    "Launch a compact Styluxe Express Salon Studio in 30–35 days with zero royalty, turnkey botanical interiors, certified stylist training, and high recurring client retention.",
  keywords: [
    "best salon franchise in India",
    "Styluxe express salon franchise",
    "compact unisex salon franchise",
    "low investment beauty salon franchise India",
    "zero royalty salon studio",
  ],
  alternates: {
    canonical: `${siteUrl}/best-salon-franchise-india/`,
  },
  openGraph: {
    title: "Best Compact Salon Franchise in India | Styluxe Express Studio",
    description:
      "Launch a compact Styluxe Express Salon Studio in 30–35 days with zero royalty and turnkey studio architecture.",
    url: `${siteUrl}/best-salon-franchise-india/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/franchise-studio.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Express Salon Studio Storefront",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Express Salon Franchise in India",
    description:
      "Compact 400–550 sq.ft luxury unisex salon studio model with zero royalty and end-to-end launch support.",
    images: ["/images/styluxe/franchise-studio.jpg"],
  },
};

const expressSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/best-salon-franchise-india/#express`,
      name: "Styluxe Express Salon Studio Franchise",
      url: `${siteUrl}/best-salon-franchise-india/`,
      description:
        "Compact, high-efficiency unisex salon studio franchise in India designed for residential high streets and emerging cities.",
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
          name: "Best Salon Franchise India",
          item: `${siteUrl}/best-salon-franchise-india/`,
        },
      ],
    },
  ],
};

export default function BestSalonFranchiseIndiaPage() {
  return (
    <main>
      <FranchiseClient active="/best-salon-franchise-india" variant="express" />
      <Footer />
      <JsonLd data={expressSchema} />
    </main>
  );
}
