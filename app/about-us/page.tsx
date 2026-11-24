import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, JsonLd, FaqJsonLd } from "../components";
import OurTeamPage from "../our-team/page";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "About Styluxe Salons | Our Story, Philosophy & Care Standards",
  description:
    "Discover the story behind Styluxe Salons — luxury hair, beauty, and grooming experiences designed around expert care, hygiene, and accessible everyday pricing.",
  keywords: [
    "About Styluxe Salons",
    "Styluxe salon story",
    "luxury unisex salon India",
    "Styluxe leadership",
    "salon franchise India",
    "affordable luxury salon",
  ],
  alternates: { canonical: `${siteUrl}/about-us/` },
  openGraph: {
    title: "About Styluxe Salons | Confidence Begins With Care",
    description:
      "Created for the modern generation, Styluxe combines premium salon experiences with accessible pricing across hair, beauty, and grooming.",
    url: `${siteUrl}/about-us/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons calm botanical reception and styling interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Styluxe Salons | Confidence Begins With Care",
    description:
      "Discover Styluxe Salons' story, hospital-grade hygiene standards, and luxury unisex salon philosophy.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

const storyFaqs = [
  {
    q: "What is the philosophy behind Styluxe Salons?",
    a: "At Styluxe, we believe confidence begins with care. Every studio is crafted to deliver five-star hair, skin, and grooming craftsmanship in a calm, hygienic environment at transparent, accessible prices.",
  },
  {
    q: "Are Styluxe Salons unisex?",
    a: "Yes. Styluxe welcomes both women and men with dedicated hair styling stations, botanical skincare suites, bridal studios, and precision men's grooming lounges.",
  },
  {
    q: "What product brands and hygiene protocols does Styluxe use?",
    a: "We use 100% authentic, dermatologically tested global formulations alongside strict hospital-grade tool sterilization, fresh single-use linens, and sanitized service zones for every guest.",
  },
  {
    q: "Are Styluxe stylists formally trained?",
    a: "Yes. All stylists, colorists, and aestheticians are certified and trained through standardized Styluxe Academy protocols covering modern cutting, color science, skin safety, and hospitality.",
  },
  {
    q: "Does Styluxe offer salon franchise opportunities across India?",
    a: "Yes. Styluxe offers structured turnkey salon franchise models with 3D interior blueprints, equipment setup, stylist recruitment & training, smart booking POS software, and ongoing pan-India marketing support.",
  },
];

export default function OurStoryPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about-us#about`,
        url: `${siteUrl}/about-us`,
        name: "About Styluxe Salons",
        description:
          "The story, philosophy, leadership, and care standards of Styluxe Salons.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: "About Styluxe",
              item: `${siteUrl}/about-us`,
            },
          ],
        },
      },
      {
        "@type": "BeautySalon",
        "@id": `${siteUrl}/#organization`,
        name: "Styluxe Salons",
        legalName: "Styluxe Salons India",
        url: siteUrl,
        logo: `${siteUrl}/images/styluxe-emblem.svg`,
        image: `${siteUrl}/images/styluxe/salon-interior.jpg`,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
          addressRegion: "Telangana",
        },
      },
    ],
  };

  return (
    <>
      <Header active="/about-us" />

      <main id="top" className="tm-page tm-page2">
        {/* 01 / ABOUT STYLUXE HERO */}
        <section className="tm-story-hero" aria-labelledby="story-hero-heading">
          <div className="tm-story-hero__inner">
            <div className="tm-story-hero__content">
              <div className="tm-story-hero__eyebrow">
                <span>ABOUT STYLUXE</span>
                <span className="tm-story-hero__eyebrow-line" />
              </div>

              <h1 id="story-hero-heading" className="tm-story-hero__title">
                Confidence Begins
                <br />
                <span>With Care</span>
              </h1>

              <p className="tm-story-hero__description">
                Created for the modern generation, Styluxe Salons brings
                together luxury hair styling, clinical-botanical skincare, and
                tailored grooming under one serene, welcoming roof. Headquartered
                in Hyderabad and backed by decades of enterprise excellence, we
                reimagine everyday salon visits into restorative rituals.
              </p>

              <div className="tm-story-hero__highlight">
                <div className="tm-story-hero__leaf" aria-hidden="true">
                  ❧
                </div>

                <p>
                  At <strong>Styluxe Salons</strong>, luxury is never loud or
                  unapproachable. We pair calm architectural spaces, certified
                  master stylists, and authentic global formulations with
                  transparent, honest pricing so effortless care becomes part of
                  your routine.
                </p>
              </div>

              <p className="tm-story-hero__description tm-story-hero__description--bottom">
                Whether you step in for a precision haircut, a restorative hair
                spa, a luminous facial, or bridal artistry, every Styluxe studio
                is designed around comfort, hygiene, and consistency so every
                visit leaves you looking your best and feeling even better.
              </p>
            </div>
          </div>
        </section>

        <OurTeamPage />

        {/* SIX CORE SALON STANDARDS */}
        <section className="tm-section" aria-labelledby="principles-heading">
          <div className="tm-container">
            <div style={{ maxWidth: "660px" }}>
              <h2 id="principles-heading" className="tm-heading-lg">
                Six principles that guide
                <br />
                <em>every single appointment.</em>
              </h2>
              <p className="tm-lead">
                True luxury is consistency — caring deeply about hygiene,
                craftsmanship, and how you feel from consultation to finish.
              </p>
            </div>

            <div className="tm-principles-grid">
              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  01 / Hygiene
                </span>
                <h3>Hospital-Grade Sanitization</h3>
                <p className="tm-body2">
                  Every comb, shear, and facial instrument is sanitized between
                  appointments alongside fresh linens and spotless styling
                  stations.
                </p>
              </div>

              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  02 / Craftsmanship
                </span>
                <h3>Certified Beauty Specialists</h3>
                <p>
                  Skilled hair artists, colorists, and aestheticians trained in
                  personalized consultations so every look complements your
                  features and lifestyle.
                </p>
              </div>

              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  03 / Purity
                </span>
                <h3>Authentic Global Formulations</h3>
                <p>
                  We partner exclusively with trusted international haircare and
                  derma-cosmetic houses — zero dilution, zero counterfeit
                  compromises.
                </p>
              </div>

              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  04 / Sanctuary
                </span>
                <h3>Botanical Modern Ambience</h3>
                <p>
                  Warm alabaster palettes, soft brass lighting, deep forest
                  green seating, and tranquil acoustics turn self-care into an
                  escape.
                </p>
              </div>

              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  05 / Transparency
                </span>
                <h3>Affordable Everyday Luxury</h3>
                <p>
                  Clear rate menus, curated memberships, and loyalty rewards
                  make elevated grooming and beauty care accessible every month.
                </p>
              </div>

              <div className="tm-principle-card">
                <span
                  className="tm-pill tm-pill-yellow"
                  style={{ marginBottom: "14px" }}
                >
                  06 / Partnership
                </span>
                <h3>360° Franchise Support</h3>
                <p>
                  We empower studio owners with turnkey salon architecture,
                  academy training, smart booking POS, and nationwide brand
                  visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STANDARDS & COMPLIANCE */}
        <section
          className="tm-section tm-section-teal"
          aria-labelledby="certifications-heading"
        >
          <div className="tm-container" style={{ textAlign: "center" }}>
            <h2
              id="certifications-heading"
              className="tm-heading-lg"
              style={{ color: "#FAF8F4" }}
            >
              Elevated salon standards.
              <br />
              <em>Rooted in trust.</em>
            </h2>
            <p
              className="tm-lead"
              style={{
                maxWidth: "650px",
                margin: "0 auto 30px auto",
                color: "rgba(250,248,244,0.85)",
              }}
            >
              Every Styluxe Salon operates under structured quality governance,
              audited sanitation protocols, and certified beauty service SOPs.
            </p>

            <div className="tm-cert-strip">
              <span className="tm-cert-badge">ISO 9001:2015 Process Standards</span>
              <span className="tm-cert-badge">Audited Hygiene &amp; Safety</span>
              <span className="tm-cert-badge">Certified Master Stylists</span>
              <span className="tm-cert-badge">100% Authentic Global Brands</span>
              <span className="tm-cert-badge">MSME &amp; GST Registered</span>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section
          className="tm-section"
          style={{ backgroundColor: "var(--tm-cream-soft)" }}
          id="faqs"
          aria-labelledby="story-faq-heading"
        >
          <div className="tm-container" style={{ maxWidth: "860px" }}>
            <span className="tm-eyebrow">Quick Answers</span>
            <h2 id="story-faq-heading" className="tm-heading-lg">
              Frequently asked questions.
            </h2>
            <p className="tm-lead">
              Clear, direct answers about Styluxe Salons, our care standards,
              and salon franchise partnerships.
            </p>

            <div className="tm-faq-list">
              {storyFaqs.map((faq, index) => (
                <details key={faq.q} className="tm-faq-item" open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="container-xl contact-section mt-10">
          <div className="contact-banner">
            <img
              src="/images/styluxe/service-skin.jpg"
              width={1200}
              height={704}
              alt="Luxury care at Styluxe Salons"
              loading="lazy"
            />
            <div className="contact-shape">
              <h2>
                Let&apos;s Style
                <br />
                Your Success Story
              </h2>
              <p>
                Own a Styluxe Salon and bring calm, affordable luxury beauty and
                grooming to your city.
              </p>
              <Link href="/salon-franchise-india#apply" className="cafe-action">
                Get Franchise Details <ArrowRight size={17} />
              </Link>
            </div>
            <div className="contact-script">
              Luxury
              <br />
              <span>Hair</span>
              <br />
              Beauty &amp;
              <br />
              <span>Care</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <JsonLd data={pageSchema} />
      <FaqJsonLd questions={storyFaqs} />
    </>
  );
}
