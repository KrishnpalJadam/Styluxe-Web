import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Award,
  BarChart3,
  Handshake,
  IndianRupee,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from "lucide-react";
import HowItWorks from "../app/HowItWorks";
import FranchiseStories from "../app/components/FranchiseStories";
import TrustedBrands from "../app/components/TrustedBrands";
import HomeBlogSection from "../app/components/HomeBlogSection";
import WhyChooseUs from "../app/components/WhyChooseUs";
import AwardsRecognitions from "../app/components/AwardsRecognitions";
import HomeMenuCategories from "../app/components/HomeMenuCategories";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Premium Hygiene",
    desc: "Clean, Sanitized & Safe Environment",
  },
  {
    icon: Award,
    title: "Certified Professionals",
    desc: "Skilled Stylists & Beauty Expert Professionals",
  },
  {
    icon: Sparkles,
    title: "Affordable Luxury",
    desc: "Premium Experience at Honest Prices",
  },
  {
    icon: Smartphone,
    title: "Smart Experience",
    desc: "Online Booking, Memberships & Loyalty Rewards",
  },
];

const faqs = [
  [
    "What makes Styluxe Salons different from regular neighborhood salons?",
    "Styluxe combines upscale botanical salon ambience, certified stylists, hospital-grade sanitization, and authentic global beauty products at honest, transparent everyday pricing.",
  ],
  [
    "Are Styluxe Salons unisex and suitable for both men and women?",
    "Yes. Every Styluxe salon is thoughtfully designed with dedicated zones for women's hair styling, beauty & skincare rituals, bridal suites, and men's precision haircuts and luxury beard grooming.",
  ],
  [
    "How can I start a Styluxe Salon franchise in my city?",
    "Submit a franchise enquiry on our Franchise page. Our expansion team guides you through site evaluation, 3D luxury interior design, equipment installation, stylist recruitment & academy training, and grand launch marketing.",
  ],
  [
    "Do I need prior beauty industry experience to own a Styluxe franchise?",
    "Not at all. Styluxe provides standardized operating procedures (SOPs), certified stylist hiring & training support, smart salon POS & booking software, and ongoing brand guidance so any entrepreneur can operate smoothly.",
  ],
  [
    "What ongoing support does Styluxe provide to franchise partners?",
    "Partners receive end-to-end launch support, zero ongoing royalty options, centralized product sourcing at preferred margins, seasonal offer campaigns, digital lead generation, and a dedicated operations helpline.",
  ],
];

export default function Home() {
  return (
    <div className="tm-home">
      {/* =================================================================
          1. STYLUXE HERO — EXACT REFERENCE COMPOSITION & PALETTE
      ================================================================= */}
      <section className="stx-hero" aria-labelledby="hero-title">
        <div className="container-xl stx-hero-grid">
          <div className="stx-hero-copy">
            <p className="stx-eyebrow-crest">
              <img src="/images/styluxe-emblem.svg" alt="" aria-hidden="true" />
              <span>WELCOME TO STYLUXE</span>
            </p>

            <h1 id="hero-title" className="stx-hero-title">
              <span className="stx-hero-title-main">Confidence</span>
              <span className="stx-hero-title-italic">Begins With Care</span>
            </h1>

            <p className="stx-hero-pillars">
              Luxury Hair &bull; Beauty &bull; Grooming
            </p>

            <p className="stx-hero-desc">
              Discover a salon experience designed around expert care, modern
              style, and confidence that lasts beyond your appointment.
            </p>

            <div className="stx-hero-actions">
              <Link href="/salon-locations" className="stx-btn-primary">
                Book Appointment <ArrowDownRight size={16} />
              </Link>
              <Link href="/salon-franchise-india#apply" className="stx-btn-sage">
                Explore Franchise <ArrowDownRight size={16} />
              </Link>
            </div>
          </div>

          <div className="stx-hero-media">
            <Image
              src="/images/styluxe/hero-salon.jpg"
              width={1408}
              height={768}
              priority
              unoptimized
              alt="Styluxe Salons expert hair styling and luxury grooming"
            />
          </div>
        </div>
      </section>

      {/* =================================================================
          2. 4-FEATURE TRUST BAR (SCREENSHOT 3)
      ================================================================= */}
      <section className="stx-trust-strip" aria-label="Styluxe core promises">
        <div className="container-xl">
          <div className="stx-trust-grid">
            {trustPillars.map(({ icon: Icon, title, desc }) => (
              <div className="stx-trust-item" key={title}>
                <span className="stx-trust-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          3. ABOUT STYLUXE PREVIEW WITH ORGANIC CURVED FRAME (SCREENSHOT 3)
      ================================================================= */}
      <section id="about" className="stx-about-preview" aria-labelledby="about-styluxe-title">
        <div className="container-xl stx-about-grid">
          <div className="stx-organic-frame">
            <Image
              src="/images/styluxe/salon-interior.jpg"
              alt="Styluxe Salons calm botanical reception and styling lounge"
              width={1024}
              height={940}
              unoptimized
              loading="lazy"
            />
          </div>

          <div className="stx-about-copy">
            <p className="stx-eyebrow-crest">
              <img src="/images/styluxe-emblem.svg" alt="" aria-hidden="true" />
              <span>ABOUT STYLUXE</span>
            </p>

            <h2 id="about-styluxe-title" className="stx-about-heading">
              At Styluxe, We Believe Confidence Begins With Care.
            </h2>

            <p>
              Created for the modern generation, Styluxe combines premium salon
              experiences with accessible pricing, offering expert hair, beauty,
              and grooming services in a luxurious yet welcoming environment.
            </p>
            <p>
              Every Styluxe salon is designed around comfort, professionalism,
              and consistency so every visit leaves you looking your best and
              feeling even better.
            </p>

            <div className="stx-about-stats">
              <div>
                <strong>150+</strong>
                <span>Curated Services</span>
              </div>
              <div>
                <strong>50+</strong>
                <span>Master Stylists</span>
              </div>
              <div>
                <strong>4.9★</strong>
                <span>Client Rating</span>
              </div>
            </div>

            <div className="stx-hero-actions">
              <Link href="/about-us" className="stx-btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="cafe-action cafe-outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. SIGNATURE SERVICES CATEGORIES (CONVERTED HOME MENU)
      ================================================================= */}
      <HomeMenuCategories />

      {/* =================================================================
          5. ASSOCIATE PRODUCT & TECH PARTNERS
      ================================================================= */}


      {/* =================================================================
          6. AWARDS & RECOGNITIONS
      ================================================================= */}
      <AwardsRecognitions />

      {/* =================================================================
          7. SALON FRANCHISE OPPORTUNITY SPLIT SECTION
      ================================================================= */}
      <section id="franchise" className="franchise-section">
        <div className="franchise-photo">
          <Image
            src="/images/styluxe/franchise-studio.jpg"
            alt="Styluxe luxury salon storefront and interior"
            width={1024}
            height={768}
            unoptimized
            loading="lazy"
          />
        </div>
        <div className="franchise-content">
          <p className="eyebrow">SALON FRANCHISE OPPORTUNITY</p>
          <h2>
            Start Your Own
            <br />
            <span className="marker">Styluxe Salon</span>
          </h2>
          <p className="franchise-description">
            Bring affordable luxury beauty and grooming to your city with
            Styluxe. Get turnkey salon interior blueprints, stylist academy
            training, smart booking technology, and pan-India marketing support.
          </p>
          <div className="franchise-features">
            {[
              { icon: IndianRupee, a: "Transparent", b: "Investment" },
              { icon: Handshake, a: "Zero", b: "Royalty" },
              { icon: BarChart3, a: "10–14 Months", b: "Est. ROI" },
              { icon: MapPinned, a: "Pan India", b: "Support" },
            ].map(({ icon: Icon, a, b }) => (
              <div key={a}>
                <span className="round-icon">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <strong className="fs44">
                  {a}
                  <br />
                  {b}
                </strong>
              </div>
            ))}
          </div>
          <Link href="/salon-franchise-india#apply" className="cafe-action">
            Apply for Franchise <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* =================================================================
          8. WHY CHOOSE STYLUXE (LUXURY EXPERIENCE, HONEST PRICING)
      ================================================================= */}
      <WhyChooseUs />

      {/* =================================================================
          9. HOW IT WORKS (4-STEP SALON LAUNCH JOURNEY)
      ================================================================= */}
      <HowItWorks />

      {/* =================================================================
          10. CLIENT & FRANCHISE PARTNER STORIES
      ================================================================= */}
      <FranchiseStories />

      {/* =================================================================
          11. BEAUTY JOURNAL & SALON NEWS
      ================================================================= */}
      <HomeBlogSection />

      {/* =================================================================
          12. STYLUXE FAQS
      ================================================================= */}
      <section className="home-faq container-xl" aria-labelledby="faq-heading">
        <div className="home-faq-inner">
          <div>
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 id="faq-heading">
              Styluxe Salons
              <br />
              <span className="marker">FAQs.</span>
            </h2>
            <p>
              Clear answers about Styluxe treatments, hygiene standards,
              bookings, and our turnkey salon franchise model.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          13. FINAL CTA BANNER
      ================================================================= */}
      <section id="contact" className="container-xl contact-section">
        <div className="contact-banner">
          <Image
            src="/images/styluxe/service-skin.jpg"
            width={1200}
            height={704}
            alt="Radiant skincare and luxury salon care at Styluxe Salons"
            unoptimized
            loading="lazy"
          />
          <div className="contact-shape">
            <h2>
              Let&apos;s Style
              <br />
              Your Success Story
            </h2>
            <p>
              Book your next self-care ritual or partner with Styluxe Salons to
              build a high-demand luxury beauty studio in your city.
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
    </div>
  );
}
