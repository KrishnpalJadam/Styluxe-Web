import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, JsonLd, FaqJsonLd } from "../components";
import { ArrowDownRight, ShieldCheck, Sparkles, Award, CheckCircle2 } from "lucide-react";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "About Styluxe Salons | Our Story, Philosophy & Care Standards",
  description:
    "Discover the story behind Styluxe Salons — luxury hair, beauty, and grooming experiences designed around expert care, hospital-grade hygiene, and accessible everyday pricing.",
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

const principles = [
  {
    num: "01",
    label: "Hygiene",
    title: "Hospital-Grade Sanitization",
    body: "Every comb, shear, and skincare instrument is UV-sterilized between appointments alongside fresh linens and spotless treatment stations.",
  },
  {
    num: "02",
    label: "Craftsmanship",
    title: "Certified Beauty Specialists",
    body: "Hair directors, colorists, and aestheticians trained in personalized consultations so every look complements your features and lifestyle.",
  },
  {
    num: "03",
    label: "Purity",
    title: "Authentic Global Formulations",
    body: "We partner exclusively with trusted international haircare and derma-botanical houses — zero dilution and zero compromises.",
  },
  {
    num: "04",
    label: "Sanctuary",
    title: "Calm Botanical Ambience",
    body: "Warm alabaster palettes, soft brass lighting, deep forest seating, and tranquil acoustics turn everyday self-care into a peaceful escape.",
  },
  {
    num: "05",
    label: "Transparency",
    title: "Affordable Everyday Luxury",
    body: "Honest rate menus, thoughtful memberships, and loyalty rewards make elevated grooming and beauty rituals accessible every month.",
  },
  {
    num: "06",
    label: "Partnership",
    title: "360° Franchise Support",
    body: "We empower studio owners with turnkey architectural design, Styluxe Academy training, smart booking CRM, and nationwide brand trust.",
  },
];

const leaders = [
  {
    name: "Vikas Singh",
    role: "Founder & Visionary · Ivey Business School Alumni",
    image: "/images/Vikas%20Singh.webp",
    bio: "Driving Styluxe's mission to make serene, five-star unisex salon craftsmanship accessible in every modern Indian neighbourhood while empowering passionate studio entrepreneurs.",
  },
  {
    name: "Jai Prakash",
    role: "Chairman & Managing Director · Enterprise Mentor",
    image: "/images/Jai%20Prakash.webp",
    bio: "Bringing decades of structured enterprise governance, supply-chain rigor, and scalable retail excellence to build India's most trusted luxury salon network.",
  },
];

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

export default function AboutUsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about-us/#about`,
        url: `${siteUrl}/about-us/`,
        name: "About Styluxe Salons",
        description:
          "The story, philosophy, leadership, and care standards of Styluxe Salons.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "About Styluxe",
              item: `${siteUrl}/about-us/`,
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

      <main id="top" className="stx-about-page">
        {/* 01 / ABOUT STYLUXE HERO (Preserved Layout, Fixed Crisp Light Heading Contrast) */}
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

        {/* 02 / EDITORIAL PHILOSOPHY SPLIT */}
        <section className="stx-ab-story" aria-labelledby="ab-story-heading">
          <div className="stx-ab-container">
            <div className="stx-ab-story-grid">
              <div className="stx-ab-story-media">
                <div className="stx-ab-arch-frame">
                  <img
                    src="/images/styluxe/salon-interior.jpg"
                    alt="Styluxe Salons minimalist reception and botanical styling chairs"
                    width={900}
                    height={760}
                  />
                </div>
              </div>

              <div className="stx-ab-story-copy">
                <p className="stx-ab-eyebrow">
                  <img
                    src="/images/styluxe-emblem.svg"
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
                  OUR PHILOSOPHY
                </p>

                <h2 id="ab-story-heading" className="stx-ab-heading">
                  Designed Around Calm, Hygiene &amp; <em>Modern Craft</em>
                </h2>

                <p className="stx-ab-text">
                  Styluxe was founded to bridge the gap between intimidating five-star hotel spas
                  and inconsistent local parlours. We envisioned a neighbourhood sanctuary where
                  warm alabaster minimalism, botanical calm, and clinical sanitation meet honest,
                  everyday pricing.
                </p>

                <p className="stx-ab-text">
                  From your first scalp or skin consultation to the final mirror reveal, every
                  touchpoint is unhurried, standardized, and deeply personal — so both women and
                  men step out feeling refreshed and effortlessly confident.
                </p>

                <div className="stx-ab-metrics">
                  <div className="stx-ab-metric">
                    <strong>100%</strong>
                    <span>Sanitized Tools</span>
                  </div>
                  <div className="stx-ab-metric">
                    <strong>Certified</strong>
                    <span>Academy Stylists</span>
                  </div>
                  <div className="stx-ab-metric">
                    <strong>Unisex</strong>
                    <span>Full-Service Suites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 / SIX GUIDING PRINCIPLES */}
        <section className="stx-ab-principles" aria-labelledby="principles-heading">
          <div className="stx-ab-container">
            <div className="stx-ab-section-head">
              <p className="stx-ab-eyebrow">
                <img
                  src="/images/styluxe-emblem.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                THE STYLUXE STANDARD
              </p>
              <h2 id="principles-heading" className="stx-ab-heading">
                Six Principles Behind <em>Every Appointment</em>
              </h2>
              <p className="stx-ab-sublead">
                True luxury is consistency — caring deeply about hygiene, genuine formulations,
                and how you feel from consultation to finish.
              </p>
            </div>

            <div className="stx-ab-principles-grid">
              {principles.map((item) => (
                <article className="stx-ab-principle-card" key={item.num}>
                  <div className="stx-ab-principle-top">
                    <span className="stx-ab-principle-num">{item.num}</span>
                    <span className="stx-ab-principle-tag">{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04 / LEADERSHIP & VISION */}
        <section className="stx-ab-leadership" aria-labelledby="leadership-heading">
          <div className="stx-ab-container">
            <div className="stx-ab-section-head">
              <p className="stx-ab-eyebrow">
                <img
                  src="/images/styluxe-emblem.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
                LEADERSHIP &amp; VISION
              </p>
              <h2 id="leadership-heading" className="stx-ab-heading">
                The People Shaping <em>Styluxe Salons</em>
              </h2>
              <p className="stx-ab-sublead">
                Guided by experienced enterprise leadership and dedicated beauty educators committed
                to raising salon hospitality across India.
              </p>
            </div>

            <div className="stx-ab-leaders-grid">
              {leaders.map((leader) => (
                <article className="stx-ab-leader-card" key={leader.name}>
                  <div className="stx-ab-leader-photo">
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role}`}
                      width={320}
                      height={360}
                      loading="lazy"
                    />
                  </div>
                  <div className="stx-ab-leader-info">
                    <span className="stx-ab-leader-role">{leader.role}</span>
                    <h3>{leader.name}</h3>
                    <p>{leader.bio}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="stx-ab-pillars-bar">
              <div className="stx-ab-pillar-item">
                <ShieldCheck size={20} strokeWidth={1.7} />
                <div>
                  <strong>Styluxe Academy Training</strong>
                  <span>Continuous technical mastery in cutting, color &amp; skin safety</span>
                </div>
              </div>
              <div className="stx-ab-pillar-item">
                <Sparkles size={20} strokeWidth={1.7} />
                <div>
                  <strong>Curated Global Partners</strong>
                  <span>100% authentic L&apos;Oréal, Schwarzkopf &amp; botanical skin lines</span>
                </div>
              </div>
              <div className="stx-ab-pillar-item">
                <Award size={20} strokeWidth={1.7} />
                <div>
                  <strong>Zero-Royalty Expansion</strong>
                  <span>Structured turnkey studio blueprint built for partner success</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 / STANDARDS & GOVERNANCE BAND */}
        <section className="stx-ab-standards" aria-labelledby="certifications-heading">
          <div className="stx-ab-container stx-ab-standards-inner">
            <p className="stx-ab-eyebrow stx-ab-eyebrow--light">QUALITY GOVERNANCE</p>
            <h2 id="certifications-heading" className="stx-ab-heading stx-ab-heading--light">
              Elevated Salon Standards. <em>Rooted in Trust.</em>
            </h2>
            <p className="stx-ab-standards-lead">
              Every Styluxe Salon operates under structured quality governance, audited
              sanitation checklists, and certified beauty service SOPs.
            </p>

            <div className="stx-ab-cert-grid">
              {[
                "ISO 9001:2015 Process Standards",
                "Audited Hygiene & UV Sanitization",
                "Certified Master Stylists",
                "100% Authentic Global Brands",
                "MSME & GST Compliant",
              ].map((badge) => (
                <span className="stx-ab-cert-pill" key={badge}>
                  <CheckCircle2 size={15} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 06 / FREQUENTLY ASKED QUESTIONS */}
        <section className="stx-ab-faq" id="faqs" aria-labelledby="story-faq-heading">
          <div className="stx-ab-container stx-ab-faq-wrap">
            <div className="stx-ab-section-head">
              <p className="stx-ab-eyebrow">QUICK ANSWERS</p>
              <h2 id="story-faq-heading" className="stx-ab-heading">
                Frequently Asked <em>Questions</em>
              </h2>
              <p className="stx-ab-sublead">
                Clear, direct answers about Styluxe Salons, our care standards,
                and salon franchise partnerships.
              </p>
            </div>

            <div className="faq">
              {storyFaqs.map((faq, index) => (
                <details key={faq.q} open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 07 / MINIMAL LUXURY CTA CARD */}
        <section className="stx-ab-cta-section" aria-labelledby="ab-cta-heading">
          <div className="stx-ab-container">
            <div className="stx-ab-cta-card">
              <div className="stx-ab-cta-copy">
                <p className="stx-ab-eyebrow stx-ab-eyebrow--light">BEGIN WITH STYLUXE</p>
                <h2 id="ab-cta-heading">
                  Experience Calm Luxury — Or Bring <em>Styluxe</em> to Your City
                </h2>
                <p>
                  Visit your nearest Styluxe Salon for personalized hair, skin, and grooming
                  care, or connect with our expansion desk to launch a studio in your territory.
                </p>
                <div className="stx-ab-cta-actions">
                  <Link href="/salon-locations" className="stx-btn-champagne">
                    Book Appointment <ArrowDownRight size={16} />
                  </Link>
                  <Link href="/salon-franchise-india#apply" className="stx-ab-cta-outline">
                    Explore Franchise <ArrowDownRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="stx-ab-cta-media">
                <img
                  src="/images/styluxe/service-skin.jpg"
                  alt="Calm botanical skincare ritual at Styluxe Salons"
                  width={900}
                  height={640}
                  loading="lazy"
                />
              </div>
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
