import type { Metadata } from "next";
import { Header, Footer } from "../../components";
import { FranchiseOpportunityDetails } from "../../franchise-opportunities/[slug]/components";
import { getFranchiseOpportunities, getFranchiseOpportunityBySlug } from "../../lib/api";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const list = await getFranchiseOpportunities("active");
  return list.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";
  const item = await getFranchiseOpportunityBySlug(slug);

  const formattedCity = slug
    .replace(/^(styluxe|teamax)-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const title =
    item?.seoTitle ||
    (item?.franchiseName
      ? `${item.franchiseName} | Styluxe Salon Franchise Opportunity`
      : `Styluxe Salon Franchise in ${formattedCity} | Opportunity`);
  const description =
    item?.metaDescription ||
    item?.shortDescription ||
    `Explore the Styluxe Salons franchise opportunity in ${formattedCity}. Turnkey luxury interiors, zero royalty, stylist training, and pan-India support.`;
  const keywords = item?.seoKeywords
    ? item.seoKeywords
      .split(",")
      .map((k: string) => k.trim())
      .filter(Boolean)
    : [`Styluxe ${formattedCity}`, "salon franchise India", "zero royalty salon franchise"];

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/franchise/${slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/franchise/${slug}/`,
      images: item?.primaryImage ? [item.primaryImage] : ["/images/styluxe/franchise-studio.jpg"],
    },
  };
}

export default async function FranchiseOpportunitySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const opportunity = await getFranchiseOpportunityBySlug(slug);

  const formattedCity = slug
    .replace(/^(styluxe|teamax)-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const fallbackOpportunity = {
    id: slug,
    franchiseName: `Styluxe Salon – ${formattedCity}`,
    slug,
    country: "India",
    state: "Telangana",
    city: formattedCity,
    shortDescription: `Explore a Styluxe luxury salon franchise opportunity in ${formattedCity}.`,
    description:
      "<p>Partner with Styluxe Salons and bring calm luxury hair, skincare, and grooming experiences to your city.</p>",
    primaryImage: "/images/styluxe/franchise-studio.jpg",
  };

  return (
    <>
      <Header active="/franchise" />
      <FranchiseOpportunityDetails
        opportunity={opportunity || fallbackOpportunity}
        slug={slug}
      />
      <Footer />
    </>
  );
}
