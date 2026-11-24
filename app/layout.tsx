import type { Metadata } from "next";
import "./reference.css";
import "./story-and-menu.css";
import "./teamax-theme.css";
import "./styluxe-theme.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Styluxe Salons | Luxury Hair, Beauty & Grooming Salon Franchise in India",
    template: "%s",
  },
  description:
    "Discover Styluxe Salons — luxury hair, beauty, skin and grooming experiences designed around expert care, modern style, and confidence that lasts beyond your appointment. Explore services, locations, or our zero-royalty salon franchise.",
  keywords: [
    "Styluxe",
    "Styluxe Salons",
    "luxury salon India",
    "unisex salon near me",
    "hair beauty grooming salon",
    "salon franchise India",
    "zero royalty salon franchise",
    "hair spa and keratin",
    "bridal makeup studio",
    "men's grooming salon",
    "skin and facial rituals",
  ],
  applicationName: "Styluxe Salons",
  authors: [{ name: "Styluxe Salons" }],
  creator: "Styluxe Salons",
  publisher: "Styluxe Salons",
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
  openGraph: {
    type: "website",
    siteName: "Styluxe Salons",
    title: "Styluxe Salons | Confidence Begins With Care",
    description:
      "Luxury hair, beauty, skin and grooming experiences at accessible pricing — plus turnkey salon franchise opportunities across India.",
    url: siteUrl,
    locale: "en_IN",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons luxury interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Salons | Confidence Begins With Care",
    description: "Luxury hair, beauty, skin & grooming salon experiences and franchise opportunities.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
  icons: { icon: "/images/styluxe-emblem.svg" },
};

import { ScrollAnimations } from "./scroll-animations";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
