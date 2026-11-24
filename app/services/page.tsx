import Link from "next/link";
import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import {
  MenuClient,
  type MenuCategory,
  type MenuItem,
} from "./menu-client";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Salon Services & Pricing Menu | Hair, Skin, Grooming & Bridal | Styluxe Salons",
  description:
    "Explore Styluxe Salons' complete service menu — precision haircuts, keratin & botanical hair spas, hydra-glow facials, luxury men's grooming, bridal makeup, and nail care at transparent prices.",
  keywords: [
    "Styluxe salon services",
    "unisex salon service menu India",
    "haircut and blowout salon",
    "keratin hair spa treatment",
    "botanical hydra facial",
    "men's grooming and beard sculpting",
    "bridal makeup studio",
    "luxury manicure pedicure",
  ],
  alternates: {
    canonical: `${siteUrl}/services/`,
  },
  openGraph: {
    title: "Salon Services & Menu | Hair, Skin, Grooming & Bridal | Styluxe Salons",
    description:
      "Discover curated hair styling, botanical skincare, luxury men's grooming, bridal artistry, and nail spa rituals at Styluxe Salons.",
    url: `${siteUrl}/services/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/service-hair.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons luxury hair styling and beauty services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Styluxe Salons Service Menu | Hair, Beauty & Grooming",
    description:
      "Thoughtful hair, skin, bridal, and grooming rituals at honest, transparent prices.",
    images: ["/images/styluxe/service-hair.jpg"],
  },
};

const serviceCategories: MenuCategory[] = [
  {
    id: "hair-styling",
    name: "Hair Cuts & Styling",
    description: "Tailored haircuts, luxury blowouts, and occasion styling.",
    count: 4,
    image: "/images/styluxe/service-hair.jpg",
    icon: "hair-styling",
  },
  {
    id: "hair-treatments",
    name: "Color & Hair Spa",
    description: "Global color, balayage, keratin smoothening, and botanical spas.",
    count: 4,
    image: "/images/styluxe/salon-equipment.jpg",
    icon: "hair-treatments",
  },
  {
    id: "skin-facials",
    name: "Skin & Facials",
    description: "Clinical-botanical facials, hydra-glow rituals, and gentle detan.",
    count: 4,
    image: "/images/styluxe/service-skin.jpg",
    icon: "skin-facials",
  },
  {
    id: "mens-grooming",
    name: "Men's Grooming",
    description: "Precision cuts, beard sculpting, hot-towel shaves, and scalp detox.",
    count: 3,
    image: "/images/styluxe/service-grooming.jpg",
    icon: "mens-grooming",
  },
  {
    id: "bridal-makeup",
    name: "Bridal & Makeup",
    description: "Luminous HD & airbrush makeup, hair artistry, and pre-bridal care.",
    count: 3,
    image: "/images/styluxe/service-makeup.jpg",
    icon: "bridal-makeup",
  },
  {
    id: "nails-spa",
    name: "Nails & Hand Spa",
    description: "Botanical manicures, gel overlays, nail art, and soothing pedicures.",
    count: 3,
    image: "/images/styluxe/service-nails.jpg",
    icon: "nails-spa",
  },
];

const serviceItems: MenuItem[] = [
  {
    id: "signature-haircut-blowdry",
    name: "Signature Haircut & Luxury Blowout",
    description:
      "Personalized consultation, soothing botanical wash, precision layered cut, and voluminous salon blowout.",
    category: "Hair Cuts & Styling",
    categoryId: "hair-styling",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    badge: "Popular",
    price: 599,
    image: "/images/styluxe/service-hair.jpg",
  },
  {
    id: "editorial-waves-styling",
    name: "Glamorous Waves & Silk Press",
    description:
      "Heat-protected glossy waves or mirror-smooth silk press styled for events, dinners, and celebrations.",
    category: "Hair Cuts & Styling",
    categoryId: "hair-styling",
    isVeg: true,
    price: 799,
    image: "/images/styluxe/hero-salon.jpg",
  },
  {
    id: "creative-director-cut",
    name: "Senior Stylist Transformation Cut",
    description:
      "Complete silhouette redesign tailored to face shape, hair texture, and effortless daily maintenance.",
    category: "Hair Cuts & Styling",
    categoryId: "hair-styling",
    isVeg: true,
    price: 899,
    image: "/images/styluxe/service-hair.jpg",
  },
  {
    id: "express-wash-blowdry",
    name: "Express Botanical Wash & Blowdry",
    description:
      "Refreshing scalp cleanse with nourishing mask and sleek round-brush finish in 35 minutes.",
    category: "Hair Cuts & Styling",
    categoryId: "hair-styling",
    isVeg: true,
    price: 399,
    image: "/images/styluxe/salon-equipment.jpg",
  },
  {
    id: "botanical-hair-spa",
    name: "Deep Botanical Repair Hair Spa",
    description:
      "Intensive moisture infusion with aromatherapy scalp massage and micro-mist steam for silky resilience.",
    category: "Color & Hair Spa",
    categoryId: "hair-treatments",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    badge: "Popular",
    price: 1199,
    image: "/images/styluxe/salon-products.jpg",
  },
  {
    id: "keratin-silk-ritual",
    name: "Keratin & Hair Botox Smoothening",
    description:
      "Formaldehyde-free frizz control ritual restoring mirror shine, manageability, and softness for months.",
    category: "Color & Hair Spa",
    categoryId: "hair-treatments",
    isVeg: true,
    isFeatured: true,
    price: 3999,
    image: "/images/styluxe/service-hair.jpg",
  },
  {
    id: "dimensional-balayage",
    name: "Dimensional Balayage & Gloss",
    description:
      "Hand-painted sun-kissed highlights paired with ammonia-free tonal gloss and bond-builder care.",
    category: "Color & Hair Spa",
    categoryId: "hair-treatments",
    isVeg: true,
    isPopular: true,
    price: 4499,
    image: "/images/styluxe/salon-equipment.jpg",
  },
  {
    id: "global-ammonia-free-color",
    name: "Global Ammonia-Free Hair Color",
    description:
      "Rich, luminous root-to-tip coverage using L'Oréal Professionnel and Schwarzkopf formulations.",
    category: "Color & Hair Spa",
    categoryId: "hair-treatments",
    isVeg: true,
    price: 2499,
    image: "/images/styluxe/salon-products.jpg",
  },
  {
    id: "hydra-luminance-facial",
    name: "Styluxe Hydra-Luminance Facial",
    description:
      "Deep ultrasonic exfoliation, botanical serum infusion, and lymphatic sculpting for instant glass-skin glow.",
    category: "Skin & Facials",
    categoryId: "skin-facials",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    badge: "Popular",
    price: 1999,
    image: "/images/styluxe/service-skin.jpg",
  },
  {
    id: "botanical-detan-ritual",
    name: "Botanical Brightening De-Tan Ritual",
    description:
      "Gentle fruit-enzyme tan removal with soothing aloe and chamomile mask to restore even radiance.",
    category: "Skin & Facials",
    categoryId: "skin-facials",
    isVeg: true,
    price: 799,
    image: "/images/styluxe/service-skin.jpg",
  },
  {
    id: "o3-radiance-cleanup",
    name: "Clinical Radiance Clean-Up",
    description:
      "Pore purifying steam, gentle extraction, and hydrating O3+ glow therapy for refreshed, calm skin.",
    category: "Skin & Facials",
    categoryId: "skin-facials",
    isVeg: true,
    price: 1099,
    image: "/images/styluxe/salon-products.jpg",
  },
  {
    id: "anti-aging-collagen-facial",
    name: "Collagen Renewal Firming Facial",
    description:
      "Peptide-rich restorative treatment designed to boost elasticity, deeply hydrate, and soften fine lines.",
    category: "Skin & Facials",
    categoryId: "skin-facials",
    isVeg: true,
    price: 2699,
    image: "/images/styluxe/service-skin.jpg",
  },
  {
    id: "executive-cut-beard",
    name: "Executive Haircut & Beard Sculpting",
    description:
      "Precision skin-fade or classic scissor cut paired with crisp razor-line beard shaping and hot towel finish.",
    category: "Men's Grooming",
    categoryId: "mens-grooming",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    badge: "Popular",
    price: 499,
    image: "/images/styluxe/service-grooming.jpg",
  },
  {
    id: "royal-hot-towel-shave",
    name: "Royal Eucalyptus Hot-Towel Shave",
    description:
      "Aromatic eucalyptus compress, rich botanical lather, close straight-razor shave, and cooling balm.",
    category: "Men's Grooming",
    categoryId: "mens-grooming",
    isVeg: true,
    price: 299,
    image: "/images/styluxe/service-grooming.jpg",
  },
  {
    id: "mens-scalp-detox-spa",
    name: "Men's Charcoal Scalp Detox & Styling",
    description:
      "Activated botanical charcoal scalp therapy to remove buildup, relieve tension, and revitalize hair roots.",
    category: "Men's Grooming",
    categoryId: "mens-grooming",
    isVeg: true,
    price: 899,
    image: "/images/styluxe/salon-equipment.jpg",
  },
  {
    id: "hd-bridal-signature",
    name: "Signature HD Bridal Makeup & Draping",
    description:
      "Bespoke bridal skin prep, luminous HD complexion artistry, custom hairstyling, and saree/lehenga draping.",
    category: "Bridal & Makeup",
    categoryId: "bridal-makeup",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    price: 12999,
    image: "/images/styluxe/service-makeup.jpg",
  },
  {
    id: "airbrush-occasion-glam",
    name: "Soft-Glam Party & Occasion Makeup",
    description:
      "Lightweight, camera-ready occasion makeup paired with effortless waves or a modern chignon.",
    category: "Bridal & Makeup",
    categoryId: "bridal-makeup",
    isVeg: true,
    price: 3499,
    image: "/images/styluxe/service-makeup.jpg",
  },
  {
    id: "pre-bridal-radiance-pack",
    name: "Pre-Bridal 3-Session Radiance Suite",
    description:
      "Curated countdown covering hydra facial, full-body botanical polishing, hair spa, and luxe manicure-pedicure.",
    category: "Bridal & Makeup",
    categoryId: "bridal-makeup",
    isVeg: true,
    price: 7999,
    image: "/images/styluxe/service-skin.jpg",
  },
  {
    id: "botanical-spa-manicure",
    name: "Botanical Luxury Manicure",
    description:
      "Gentle cuticle refinement, mineral sugar exfoliation, relaxing hand massage, and high-gloss polish.",
    category: "Nails & Hand Spa",
    categoryId: "nails-spa",
    isVeg: true,
    isPopular: true,
    price: 599,
    image: "/images/styluxe/service-nails.jpg",
  },
  {
    id: "eucalyptus-spa-pedicure",
    name: "Eucalyptus & Sea-Salt Spa Pedicure",
    description:
      "Warm aromatic foot soak, heel smoothing, reflexology massage, and nourishing botanical foot mask.",
    category: "Nails & Hand Spa",
    categoryId: "nails-spa",
    isVeg: true,
    price: 899,
    image: "/images/styluxe/service-nails.jpg",
  },
  {
    id: "gel-extensions-minimal-art",
    name: "Soft Gel Extensions & Minimal Nail Art",
    description:
      "Lightweight, natural-looking gel extensions finished in timeless French, champagne nude, or bespoke art.",
    category: "Nails & Hand Spa",
    categoryId: "nails-spa",
    isVeg: true,
    price: 1699,
    image: "/images/styluxe/service-nails.jpg",
  },
];

const menuSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/services/#services`,
      name: "Styluxe Salons Service Menu",
      url: `${siteUrl}/services/`,
      description:
        "Complete luxury unisex salon service menu featuring haircuts, color, keratin & hair spa, botanical facials, men's grooming, bridal makeup, and nail care.",
      provider: {
        "@type": "BeautySalon",
        name: "Styluxe Salons",
        url: siteUrl,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteUrl}/services/`,
        },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Header active="/services" />

      <main className="tx-menu-page">
        {/* MINIMAL EDITORIAL SPLIT HERO */}
        <section
          className="stx-page-hero stx-page-hero--services"
          aria-labelledby="stx-services-title"
        >
          <div className="stx-page-hero__inner">
            <div className="stx-page-hero__copy">
              <nav className="stx-page-hero__crumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Services</span>
              </nav>

              <p className="stx-page-hero__eyebrow">
                <img
                  src="/images/styluxe-emblem.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                CURATED SALON MENU
              </p>

              <h1 id="stx-services-title" className="stx-page-hero__title">
                Signature Hair, Skin &amp; <em>Grooming Rituals</em>
              </h1>

              <p className="stx-page-hero__lead">
                Every treatment begins with a calm consultation, hospital-grade hygiene,
                and globally trusted botanical formulations — tailored to bring out
                effortless, lasting confidence.
              </p>

              <div className="stx-page-hero__meta">
                <span>6 Signature Suites</span>
                <span className="stx-page-hero__dot" aria-hidden="true" />
                <span>Certified Stylists</span>
                <span className="stx-page-hero__dot" aria-hidden="true" />
                <span>Transparent Pricing</span>
              </div>
            </div>

            <div className="stx-page-hero__media">
              <div className="stx-page-hero__frame stx-page-hero__frame--arch">
                <img
                  src="/images/styluxe/service-hair.jpg"
                  alt="Styluxe Salons signature hair styling and care experience"
                  width={900}
                  height={675}
                />
              </div>
            </div>
          </div>
        </section>

        <MenuClient categories={serviceCategories} items={serviceItems} />
      </main>

      <Footer />
      <JsonLd data={menuSchema} />
    </>
  );
}
