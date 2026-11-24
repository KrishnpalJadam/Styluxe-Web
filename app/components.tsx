import { ArrowDownRight, ArrowUp, Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { WhatsAppButton } from "./WhatsAppButton";

/* =========================================
   STYLUXE BRAND MARK
========================================= */

// export function StyluxeBrandLogo({ light = false }: { light?: boolean }) {
//   const stroke = light ? "#D6C7B2" : "#0D3B26";
//   return (
//     <span className={`stx-brand-logo ${light ? "stx-brand-logo--light" : ""}`}>
//       <svg
//         width="34"
//         height="34"
//         viewBox="0 0 64 64"
//         fill="none"
//         aria-hidden="true"
//       >
//         <circle
//           cx="32"
//           cy="32"
//           r="29"
//           stroke={stroke}
//           strokeWidth="1.6"
//           strokeOpacity="0.4"
//         />
//         <path
//           d="M32 52C32 41 32 25 32 14"
//           stroke={stroke}
//           strokeWidth="1.7"
//           strokeLinecap="round"
//         />
//         <path
//           d="M32 47C21 44 14 35 16 23C22 25 29 31 32 42"
//           stroke={stroke}
//           strokeWidth="1.7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M32 47C43 44 50 35 48 23C42 25 35 31 32 42"
//           stroke={stroke}
//           strokeWidth="1.7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M32 34C26 27 25 18 32 11C39 18 38 27 32 34Z"
//           stroke={stroke}
//           strokeWidth="1.7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M21 31C24 34 27 38 30 43"
//           stroke={stroke}
//           strokeWidth="1.2"
//           strokeLinecap="round"
//           strokeOpacity="0.65"
//         />
//         <path
//           d="M43 31C40 34 37 38 34 43"
//           stroke={stroke}
//           strokeWidth="1.2"
//           strokeLinecap="round"
//           strokeOpacity="0.65"
//         />
//       </svg>
//       <span className="stx-brand-wordmark">STYLUXE</span>
//     </span>
//   );
// }

/* =========================================
   HEADER
========================================= */

export function Header({ active }: { active?: string }) {
  const nav = [
    ["/", "Home"],
    ["/about-us", "About"],
    ["/services", "Services"],
    ["/salon-franchise-india", "Franchise"],
    ["/reviews", "Reviews"],
    ["/news", "News"],
    ["/offers", "Offers"],
  ] as const;

  const isItemActive = (href: string) => {
    if (!active) return false;
    if (active === href) return true;
    if (
      href === "/salon-franchise-india" &&
      (active === "/salon-franchise-india" ||
        active === "/best-salon-franchise-india" ||
        active === "/franchise" ||
        active.startsWith("/franchise"))
    ) {
      return true;
    }
    if (
      href === "/news" &&
      (active === "/news" || active.startsWith("/news"))
    ) {
      return true;
    }
    if (
      href === "/services" &&
      (active === "/services" || active.startsWith("/services"))
    ) {
      return true;
    }
    if (href === "/offers" && (active === "/offers" || active.startsWith("/offers"))) {
      return true;
    }
    return false;
  };

  return (
    <header className="site-header" aria-label="Styluxe Salons site header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Styluxe Salons home">
          {/* <StyluxeBrandLogo /> */}
          <img width={200} src="https://static.wixstatic.com/media/ead547_59dec9345a944843ae579e6da68f6406~mv2.png/v1/fill/w_350,h_70,al_c,lg_1,q_85,enc_avif,quality_auto/Styluxe%20Salon%20Logo.png" alt="" />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {nav.map(([href, label]) => {
            const isActive = isItemActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="header-action">
          <Link href="/salon-locations" className="cafe-action">
            Book Appointment <ArrowDownRight size={16} />
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <Menu size={22} />
          </summary>

          <nav aria-label="Mobile navigation">
            {nav.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}

            <Link href="/salon-locations" className="cafe-action">
              Book Appointment <ArrowDownRight size={16} />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

/* =========================================
   FOOTER
========================================= */

export function Footer() {
  return (
    <footer id="footer" className="tm-footer">
      <div className="tm-footer-container container-xl">
        {/* BRAND */}
        <div className="tm-footer-brand">
          <Link
            href="/"
            className="tm-footer-brand-logo"
            aria-label="Styluxe Salons home"
          >
            {/* <StyluxeBrandLogo light /> */}
            <img width={200} src="https://static.wixstatic.com/media/ead547_27321602f62c4dbab56e2538b3a283e8~mv2.png/v1/fill/w_342,h_68,al_c,lg_1,q_85,enc_avif,quality_auto/Styluxe%20Salons%20White.png" alt="" />
          </Link>

          <p className="tm-footer-description">
            Luxury Hair • Beauty • Grooming. Created for the modern generation,
            Styluxe combines elevated salon experiences with honest pricing in a
            calm, welcoming environment.
          </p>

          <div className="tm-footer-venture">
            <span>Confidence Begins With Care</span>
            <strong>Styluxe Salons India</strong>
          </div>
        </div>

        {/* EXPLORE */}
        <div className="tm-footer-column">
          <h4>Explore</h4>

          <div className="tm-footer-links">
            <Link href="/">Home</Link>
            <Link href="/about-us">About Styluxe</Link>
            <Link href="/services">Services</Link>
            <Link href="/salon-locations">Salon Locations</Link>
            <Link href="/salon-franchise-india#apply">Salon Franchise</Link>
            <Link href="/news">News &amp; Journal</Link>
          </div>
        </div>

        {/* IMPORTANT LINKS */}
        <div className="tm-footer-column tm-footer-contact">
          <h4>Important Links</h4>

          <div className="tm-footer-links">
            <Link href="/franchise">Franchise Opportunities</Link>
            <Link href="/best-salon-franchise-india">Styluxe Express</Link>
            <Link href="/offers">Exclusive Offers</Link>
            <Link href="/reviews">Client &amp; Partner Reviews</Link>
            <Link href="/our-team">Leadership Team</Link>
            <Link href="/salon-franchise-india#franchise-form">
              Franchise Enquiry
            </Link>
          </div>
        </div>

        {/* CONTACT US */}
        <div className="tm-footer-column tm-footer-connect">
          <h4>Contact Us</h4>

          <div className="tm-footer-office">
            <strong>Styluxe Salons India Regd. Office:</strong>
            <p>
              4th Floor, Surabhi Rama Complex, Plot No. 106, Suchitra Rd, above
              Kalyan Jewellers, Green Park, Kompally, Hyderabad, Telangana
              500067
            </p>
          </div>

          <div className="tm-footer-contact-items">
            <a href="tel:+919505047047">
              <Phone size={17} strokeWidth={1.8} />
              <span>+91 9505 047 047</span>
            </a>

            <a href="mailto:hello@styluxe.in">
              <Mail size={17} strokeWidth={1.8} />
              <span>hello@styluxe.in</span>
            </a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="tm-footer-socials pt-5">
            <a
              href="https://www.youtube.com/@StyluxeSalons"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Styluxe YouTube"
              title="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Styluxe Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Styluxe Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/919505047047"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Styluxe WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="tm-footer-bottom">
        <Link href="/privacy-policy">General &amp; Privacy Policy</Link>

        <p>
          © {new Date().getFullYear()} All Rights Reserved with{" "}
          <strong>Styluxe Salons</strong>
          {" | "}
          Confidence Begins With Care
        </p>

        <a
          href="#top"
          className="tm-footer-top"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={17} />
        </a>
      </div>

      <WhatsAppButton />
    </footer>
  );
}

/* =========================================
   JSON-LD
========================================= */

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/* =========================================
   FAQ JSON-LD
========================================= */

export function FaqJsonLd({
  questions,
}: {
  questions: {
    q: string;
    a: string;
  }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      }}
    />
  );
}
