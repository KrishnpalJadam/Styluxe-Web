import type { Metadata } from "next";
import Home from "../content/home";
import { Footer, Header, JsonLd, FaqJsonLd } from "./components";
import FranchisePopup from "./components/FranchisePopup";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Styluxe Salons | Luxury Hair, Beauty & Grooming Salon Franchise in India",
  description:
    "Discover Styluxe Salons for luxury hair styling, skin rituals, bridal beauty, and modern grooming. Book an appointment, find a salon near you, or explore our zero-royalty salon franchise.",
  keywords: [
    "Styluxe Salons",
    "Styluxe salon franchise",
    "luxury salon India",
    "unisex salon India",
    "hair beauty grooming",
    "salon franchise opportunity",
    "Styluxe services",
    "affordable luxury salon",
  ],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Styluxe Salons",
    title: "Styluxe Salons | Confidence Begins With Care",
    description:
      "Discover a salon experience designed around expert care, modern style, and confidence that lasts beyond your appointment.",
    url: siteUrl,
    images: [
      {
        url: "/images/styluxe/hero-salon.jpg",
        width: 1408,
        height: 768,
        alt: "Styluxe Salons luxury hair and grooming experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Salons | Confidence Begins With Care",
    description:
      "Luxury hair, beauty, skin and grooming experiences — plus zero-royalty salon franchise opportunities across India.",
    images: ["/images/styluxe/hero-salon.jpg"],
  },
};

const faqs = [
  {
    q: "What services does Styluxe Salons offer?",
    a: "Styluxe offers a full suite of unisex hair styling and precision cuts, hair coloring and keratin/botox rituals, botanical facials and skin care, men's luxury grooming, bridal & party makeup, and nail spa services.",
  },
  {
    q: "Do I need a prior appointment to visit a Styluxe Salon?",
    a: "Walk-ins are always welcome, and you can also book an appointment online or via WhatsApp to reserve your preferred stylist and time slot without waiting.",
  },
  {
    q: "How can I apply for a Styluxe Salon franchise?",
    a: "You can submit a franchise enquiry through our Franchise page. Our expansion team will connect with you to discuss location feasibility, turnkey salon setup, stylist training, and investment plans.",
  },
  {
    q: "What hygiene and product standards does Styluxe follow?",
    a: "Every Styluxe salon follows strict hospital-grade sanitization protocols, single-use disposables where required, and uses 100% authentic, dermatologically tested international salon brands.",
  },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Styluxe Salons",
        url: siteUrl,
        logo: `${siteUrl}/images/styluxe-emblem.svg`,
        image: `${siteUrl}/images/styluxe/salon-interior.jpg`,
        description:
          "Modern Indian luxury hair, beauty, skin, and grooming salon brand offering affordable luxury services and turnkey franchise opportunities.",
        knowsAbout: [
          "Hair Styling",
          "Skin Care & Facials",
          "Luxury Men's Grooming",
          "Bridal Makeup",
          "Hair Treatments",
          "Salon Franchise",
        ],
      },
      {
        "@type": "BeautySalon",
        "@id": `${siteUrl}/#salon`,
        name: "Styluxe Salons",
        url: siteUrl,
        image: `${siteUrl}/images/styluxe/salon-interior.jpg`,
        logo: `${siteUrl}/images/styluxe-emblem.svg`,
        description:
          "Styluxe Salons combines premium hair, beauty, and grooming experiences with accessible pricing in a serene, welcoming space.",
        priceRange: "₹₹",
        areaServed: { "@type": "Country", name: "India" },
        telephone: "+91-9505047047",
        email: "hello@styluxe.in",
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Styluxe Salons",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Styluxe Salons | Confidence Begins With Care",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        primaryImageOfPage: `${siteUrl}/images/styluxe/hero-salon.jpg`,
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Header active="/" />
      <main id="top" className="page-shell">
        <Home />
      </main>
      <Footer />
      <FranchisePopup />
      <JsonLd data={schema} />
      <FaqJsonLd questions={faqs} />
    </>
  );
}
