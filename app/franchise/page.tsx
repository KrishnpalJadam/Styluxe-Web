import type { Metadata } from "next";
import { Header, Footer } from "../components";
import OurFranchiseOpportunitiesContent from "../franchise-opportunities/components";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Salon Franchise Opportunities Near You | Styluxe Salons",
  description:
    "Explore Styluxe Salons franchise opportunities by city and state. Discover prime salon territories, investment plans, and turnkey setup support.",
  alternates: {
    canonical: `${siteUrl}/franchise/`,
  },
  openGraph: {
    title: "Salon Franchise Opportunities Near You | Styluxe Salons",
    description:
      "Explore Styluxe Salons franchise opportunities by city and state across India.",
    url: `${siteUrl}/franchise/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/franchise-studio.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons Franchise Studio Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Franchise Opportunities Across India | Styluxe Salons",
    description:
      "Discover available city territories for opening a Styluxe luxury unisex salon.",
    images: ["/images/styluxe/franchise-studio.jpg"],
  },
};

export default function FranchiseOpportunitiesPage() {
  return (
    <>
      <Header active="/franchise" />
      <OurFranchiseOpportunitiesContent />
      <Footer />
    </>
  );
}
