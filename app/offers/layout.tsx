import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Exclusive Salon Offers & Beauty Packages | Hair, Skin & Bridal | Styluxe Salons",
  description:
    "Explore exclusive seasonal offers at Styluxe Salons across haircuts, keratin & botanical hair spas, hydra-glow facials, luxury men's grooming, and pre-bridal suites.",
  keywords: [
    "Styluxe salon offers",
    "salon deals and packages India",
    "keratin treatment offer",
    "botanical facial package",
    "men's grooming combo offer",
    "pre bridal salon package",
  ],
  alternates: {
    canonical: `${siteUrl}/offers/`,
  },
  openGraph: {
    title: "Exclusive Salon Offers & Beauty Packages | Styluxe Salons",
    description:
      "Save on curated hair styling, botanical skincare, grooming, and bridal packages across all Styluxe Salons.",
    url: `${siteUrl}/offers/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/service-skin.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons Exclusive Beauty & Skincare Offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Salon Offers | Styluxe Salons",
    description:
      "Curated seasonal packages across hair, skin, grooming, nails, and bridal care at transparent prices.",
    images: ["/images/styluxe/service-skin.jpg"],
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
