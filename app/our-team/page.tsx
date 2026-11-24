import type { Metadata } from "next";
import Link from "next/link";
import "./OurTeam.css";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
  title: "Meet the Styluxe Salons Team | Leadership & Vision",
  description:
    "Meet the leadership and beauty specialists behind Styluxe Salons. Discover our vision, academy standards, and franchise support ecosystem.",
  keywords: [
    "Styluxe Salons team",
    "Styluxe leadership",
    "Styluxe founder",
    "salon franchise team",
  ],
  alternates: {
    canonical: `${siteUrl}/our-team/`,
  },
  openGraph: {
    title: "Meet the People Behind Styluxe Salons",
    description:
      "Discover the leadership, craftsmanship, and franchise support behind Styluxe Salons.",
    url: `${siteUrl}/our-team/`,
    type: "website",
    images: [
      {
        url: "/images/styluxe/salon-interior.jpg",
        width: 1200,
        height: 900,
        alt: "Styluxe Salons Leadership & Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Styluxe Salons Leadership Team",
    description:
      "The visionaries, beauty educators, and franchise leaders behind Styluxe Salons India.",
    images: ["/images/styluxe/salon-interior.jpg"],
  },
};

const teamMembers = [
  {
    name: "Vikas Singh",
    role: "Founder & Visionary · Ivey Business School Alumni",
    image: "/images/Vikas%20Singh.webp",
    imageAlt: "Vikas Singh, Styluxe Salons leadership",
    side: "left",
  },
  {
    name: "Jai Prakash",
    role: "Chairman & Managing Director · Enterprise Mentor",
    image: "/images/Jai%20Prakash.webp",
    imageAlt: "Jai Prakash, Styluxe Salons leadership",
    side: "right",
  },
];

const teamFeatures = [
  {
    icon: "✦",
    title: "The Vision Behind Styluxe Salons",
    description:
      "Styluxe was envisioned to bridge the gap between overpriced five-star hotel spas and inconsistent neighborhood parlours — delivering calm luxury interiors, certified beauty experts, and honest pricing under one roof.",
  },
  {
    icon: "↗",
    title: "Crafted for Modern India",
    description:
      "From metro lifestyle hubs to aspirational Tier-2 cities, Styluxe brings standardized unisex hair, skin, bridal, and grooming rituals backed by reliable operations and high repeat guest loyalty.",
  },
  {
    icon: "★",
    title: "Styluxe Beauty Academy & SOPs",
    description:
      "Our training framework equips every stylist, colorist, and aesthetician with structured technical mastery, hygiene discipline, and warm client consultation etiquette.",
  },
  {
    icon: "✓",
    title: "Comprehensive Support for Studio Partners",
    description:
      "Every Styluxe franchise partner receives architectural 3D salon blueprints, ergonomic equipment packages, staff hiring & training modules, smart salon POS & booking software, and centralized authentic product supply.",
  },
  {
    icon: "❧",
    title: "A Growing Community of Beauty Entrepreneurs",
    description:
      "Joining Styluxe means building with an experienced franchising leadership team offering continuous performance mentoring, seasonal campaign assets, and dedicated operational support.",
  },
];

export default function OurTeamPage() {
  return (
    <div className="tm-team-page">
      {/* Hero */}
      <section className="tm-hero">
        <div className="tm-container tm-hero-container">
          <div className="tm-hero-copy">
            <div className="tm-badge-row">
              <span className="tm-badge">OUR LEADERSHIP</span>
              <span className="tm-badge-line" />
            </div>

            <h1 className="tm-title">
              Meet the People
              <br />
              <span>Behind Styluxe Salons</span>
            </h1>

            <p className="tm-lead team2">
              Step into Styluxe and experience a team united by craft, warmth,
              and operational discipline — dedicated to making every guest feel
              confident and helping every franchise partner thrive.
            </p>
          </div>

          <div className="tm-hero-art" aria-hidden="true">
            <div className="tm-script">
              <span className="ray r1" />
              <span className="ray r2" />
              <span className="ray r3" />
              <span className="ray r4" />
              Expert
              <br />
              Hands
              <br />
              Timeless
              <br />
              Care
              <svg className="tm-underline" viewBox="0 0 200 30" fill="none">
                <path
                  d="M5 25 Q100 0 195 8"
                  stroke="#d6c7b2"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Team members and story */}
      <section className="tm-body">
        <div className="tm-blob-bl" aria-hidden="true" />
        <div className="tm-blob-br" aria-hidden="true" />

        <div className="tm-container tm-body-content">
          <div className="tm-people">
            {teamMembers.map((member) => (
              <article
                className={`tm-person ${member.side}`}
                key={member.name}
              >
                <span className="spark s1" aria-hidden="true" />
                <span className="spark s2" aria-hidden="true" />
                <span className="spark s3" aria-hidden="true" />

                <div className="tm-photo">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    loading="lazy"
                  />
                </div>

                <div className="tm-card">
                  <h2>{member.name}</h2>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="tm-features">
            {teamFeatures.map((feature) => (
              <article className="tm-feature" key={feature.title}>
                <div className="tm-icon" aria-hidden="true">
                  {feature.icon}
                </div>

                <div className="tm-feature-copy">
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="tm-foot">
            <span className="tm-pin" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>

            <span className="tm-sep" />

            <p>
              Explore our active salon studios or discover franchise territories
              on our <Link href="/salon-locations">salon locations page</Link>.
            </p>
          </div>
        </div>

        <span className="tm-leaf-bl" aria-hidden="true">
          ❋
        </span>
      </section>
    </div>
  );
}
