"use client";

import React, { useState, useEffect, useRef } from "react";
import "./franchise.css";
import { Header } from "../components";
import FranchiseFormSection from "./franchise-form";
import { getCommonCategories, getReviews } from "../lib/api";
import {
  Users,
  MapPin,
  Percent,
  Download,
  IndianRupee,
  Scissors,
  Coins,
  Store,
  Award,
  Laptop,
  Megaphone,
  Headphones,
  Calculator,
  Maximize2,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Handshake,
  LayoutGrid,
  Wrench,
  Rocket,
  Check,
  Star,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";

const FranchiseIndiaMap = dynamic(() => import("./FranchiseIndiaMap"), {
  ssr: false,
  loading: () => <div className="tm-fc-map-loading">Loading map...</div>,
});

const defaultPartnerTestimonials = [
  {
    id: "stx-t1",
    starRating: 5,
    reviewText:
      "Styluxe gave us a complete turnkey luxury salon blueprint — from 3D architectural execution and ergonomic stations to academy-trained stylists and booking POS.",
    reviewerAvatar: "/images/styluxe/service-hair.jpg",
    reviewerName: "Meera Nair",
    reviewerRole: "Franchise Partner · Styluxe Kompally",
  },
  {
    id: "stx-t2",
    starRating: 5,
    reviewText:
      "The zero-royalty model and centralized authentic product procurement allowed our studio to build loyal memberships from month one.",
    reviewerAvatar: "/images/styluxe/service-grooming.jpg",
    reviewerName: "Arjun Deshmukh",
    reviewerRole: "Franchise Partner · Styluxe Indore",
  },
  {
    id: "stx-t3",
    starRating: 5,
    reviewText:
      "Clients immediately fall in love with the calm cream-and-forest-green sanctuary vibe. Repeat visits and bridal bookings exceeded our projections.",
    reviewerAvatar: "/images/styluxe/service-skin.jpg",
    reviewerName: "Kavita Rao",
    reviewerRole: "Franchise Partner · Styluxe Gachibowli",
  },
];

export function FranchiseClient({
  active = "/salon-franchise-india",
  variant = "flagship",
}: { active?: string; variant?: "flagship" | "express" } = {}) {
  const isExpress = variant === "express";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [catIndex, setCatIndex] = useState(0);
  const [itemsPerViewCat, setItemsPerViewCat] = useState(6);
  const catTouchStartX = useRef<number | null>(null);

  const [testIndex, setTestIndex] = useState(0);
  const [itemsPerViewTest, setItemsPerViewTest] = useState(3);
  const testTouchStartX = useRef<number | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>(defaultPartnerTestimonials);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  type FranchiseCategory = {
    id: string;
    name: string;
    slug?: string;
    image: string;
  };

  const defaultCategories: FranchiseCategory[] = [
    { id: "hair", name: "Hair Cuts & Styling", image: "/images/styluxe/service-hair.jpg" },
    { id: "color", name: "Hair Color & Balayage", image: "/images/styluxe/salon-equipment.jpg" },
    { id: "spa", name: "Keratin & Hair Spa", image: "/images/styluxe/salon-products.jpg" },
    { id: "skin", name: "Skin & Hydra Facials", image: "/images/styluxe/service-skin.jpg" },
    { id: "grooming", name: "Men's Luxury Grooming", image: "/images/styluxe/service-grooming.jpg" },
    { id: "bridal", name: "Bridal & Party Makeup", image: "/images/styluxe/service-makeup.jpg" },
    { id: "nails", name: "Nails & Hand Spa", image: "/images/styluxe/service-nails.jpg" },
    { id: "memberships", name: "VIP Care Memberships", image: "/images/styluxe/salon-interior.jpg" },
  ];

  const [categories, setCategories] = useState<FranchiseCategory[]>(defaultCategories);

  useEffect(() => {
    let mounted = true;
    async function loadCategories() {
      try {
        const apiCategories = await getCommonCategories();
        if (!mounted || !Array.isArray(apiCategories) || apiCategories.length === 0) return;

        const activeCategories = apiCategories
          .filter((c: any) => c.status === "active")
          .sort((a: any, b: any) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

        if (activeCategories.length === 0) return;

        const dynamicCategories: FranchiseCategory[] = activeCategories.map((c: any) => ({
          id: String(c.id),
          name: c.name || "Salon Service",
          slug: c.slug,
          image:
            typeof c.image === "string" &&
              c.image.trim() !== "" &&
              !c.image.startsWith("blob:")
              ? c.image
              : "/images/styluxe/service-hair.jpg",
        }));

        if (mounted) {
          setCategories(dynamicCategories);
          setCatIndex(0);
        }
      } catch (error) {
        console.warn("Failed to fetch franchise service categories:", error);
      }
    }
    loadCategories();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setReviewsLoading(true);
    getReviews({ status: "published" })
      .then((data) => {
        if (!mounted) return;
        const franchiseReviews = (data || [])
          .filter(
            (review: any) =>
              review.reviewType === "franchise" &&
              review.status === "published" &&
              (!review.displayOn || review.displayOn?.includes("franchise_page"))
          )
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

        if (franchiseReviews.length > 0) {
          setTestimonials(franchiseReviews);
        }
      })
      .catch(() => { })
      .finally(() => {
        if (mounted) setReviewsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const packageFee = isExpress ? "₹7,99,999" : "₹12,49,999";
  const packageShort = isExpress ? "₹7.99 Lakh" : "₹12.5 Lakh";
  const gstAmount = isExpress ? "₹1,44,000" : "₹2,25,000";
  const interiorEst = isExpress ? "₹4,50,000" : "₹7,50,000";
  const totalEst = isExpress ? "₹12,49,999" : "₹19,99,999";
  const minSpace = isExpress ? "400 sq. ft." : "600 sq. ft.";
  const recSpace = isExpress ? "550+ sq. ft." : "1,000+ sq. ft.";
  const timelineLabel = isExpress ? "30–35 Days" : "35–45 Days";

  const faqs = [
    {
      q: "How much does a Styluxe Salon franchise cost?",
      a: `The ${isExpress ? "Styluxe Express Studio" : "Styluxe Flagship Salon"} franchise package starts at ${packageFee} (+ 18% GST). Depending on salon square footage and civil readiness, total turnkey setup including signature botanical interiors is estimated around ${totalEst} (excl. taxes).`,
    },
    {
      q: "What is the salon franchise agreement tenure?",
      a: "The standard Styluxe Salon franchise license is granted for 5 Years, with simple renewal terms designed to support long-term studio growth.",
    },
    {
      q: "Does Styluxe charge an ongoing monthly royalty?",
      a: "No! Styluxe operates on a 0% ongoing royalty model for foundational partners — meaning your daily hair, skin, bridal, and grooming service profits stay with you.",
    },
    {
      q: "How long does turnkey salon setup take?",
      a: `Our streamlined architecture and equipment deployment timeline is ${timelineLabel} from agreement signing and site handover to grand launch.`,
    },
    {
      q: "Do I need beauty or salon experience to own a Styluxe franchise?",
      a: "No prior salon experience is required. We support you with certified stylist recruitment, Styluxe Academy training, standardized service SOPs, and automated salon POS & appointment software.",
    },
    {
      q: "How does Styluxe help with stylist hiring and product sourcing?",
      a: "Our central team provides hiring benchmarks, technical skill assessments, hands-on training, and direct authentic brand procurement at preferred partner margins.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setItemsPerViewCat(2);
        setItemsPerViewTest(1);
      } else if (w < 768) {
        setItemsPerViewCat(3);
        setItemsPerViewTest(1);
      } else if (w < 1024) {
        setItemsPerViewCat(4);
        setItemsPerViewTest(2);
      } else {
        setItemsPerViewCat(6);
        setItemsPerViewTest(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxCatIndex = Math.max(0, categories.length - itemsPerViewCat);
  const handleCatPrev = () => setCatIndex((prev) => (prev > 0 ? prev - 1 : maxCatIndex));
  const handleCatNext = () => setCatIndex((prev) => (prev < maxCatIndex ? prev + 1 : 0));

  const maxTestIndex = Math.max(0, testimonials.length - itemsPerViewTest);
  const handleTestPrev = () => setTestIndex((prev) => (prev > 0 ? prev - 1 : maxTestIndex));
  const handleTestNext = () => setTestIndex((prev) => (prev < maxTestIndex ? prev + 1 : 0));

  const handleCatTouchStart = (e: React.TouchEvent) => {
    catTouchStartX.current = e.touches[0].clientX;
  };
  const handleCatTouchEnd = (e: React.TouchEvent) => {
    if (catTouchStartX.current === null) return;
    const diff = catTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleCatNext();
    else if (diff < -40) handleCatPrev();
    catTouchStartX.current = null;
  };

  const handleTestTouchStart = (e: React.TouchEvent) => {
    testTouchStartX.current = e.touches[0].clientX;
  };
  const handleTestTouchEnd = (e: React.TouchEvent) => {
    if (testTouchStartX.current === null) return;
    const diff = testTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleTestNext();
    else if (diff < -40) handleTestPrev();
    testTouchStartX.current = null;
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleHeroWhatsApp = () => {
    const msg = `Hi Styluxe Team, I would like to get franchise details for Styluxe ${isExpress ? "Express Studio" : "Luxury Salon"
      } (${packageShort} model). Please share the franchise proposal.`;
    window.open(`https://wa.me/919505047047?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const scrollToForm = () => {
    const el = document.getElementById("franchise-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="tm-fc-page">
      <Header active={active} />

      {/* HERO SECTION */}
      <section className="tm-fc-hero">
        <div className="tm-fc-container">
          <div className="tm-fc-hero-grid">
            <div className="tm-fc-hero-content">
              <span className="tm-fc-tag-script">
                {isExpress ? "Styluxe Express Studio" : "Styluxe Luxury Salons"}
              </span>

              <h1 className="tm-fc-hero-title">
                Start Your Own
                <br />
                Styluxe {isExpress ? "Express " : ""}Salon Franchise
                <span className="highlight-yellow">
                  at {packageShort}
                  <span className="tm-fc-hero-star">*</span>
                </span>
              </h1>

              <p className="tm-fc-hero-sub">
                Zero Royalty. Turnkey Luxury Interiors.
                <br />
                Stylist Training &amp; Complete Operational Support.
              </p>

              <div className="tm-fc-hero-stats">
                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <Users size={18} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>150+</strong>
                    <span>Curated Services</span>
                  </div>
                </div>

                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <MapPin size={18} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>Pan India</strong>
                    <span>Expansion Support</span>
                  </div>
                </div>

                <div className="tm-fc-hero-stat-item">
                  <div className="tm-fc-stat-icon-wrap">
                    <Percent size={18} strokeWidth={2.5} />
                  </div>
                  <div className="tm-fc-hero-stat-info">
                    <strong>0%</strong>
                    <span>Ongoing Royalty</span>
                  </div>
                </div>
              </div>

              <div className="tm-fc-hero-actions">
                <button onClick={handleHeroWhatsApp} className="tm-fc-btn-primary">
                  <span>Get Details on WhatsApp</span>
                  <FaWhatsapp size={19} />
                </button>

                <button onClick={scrollToForm} className="tm-fc-btn-secondary">
                  <span>Request Proposal</span>
                  <Download size={17} strokeWidth={2.2} />
                </button>
              </div>

              <p className="tm-fc-hero-disclaimer">
                *Franchise setup fee {packageFee} + applicable taxes. Civil interior
                finishing and local rentals vary by city and carpet area.
              </p>
            </div>

            <div className="tm-fc-hero-visual">
              <div className="tm-fc-hero-img-wrap">
                <img
                  src="/images/styluxe/salon-interior.jpg"
                  alt="Styluxe Luxury Salon Reception and Styling Floor"
                  className="tm-fc-hero-img"
                  width="500"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY HIGHLIGHTS RIBBON */}
      <section className="tm-fc-ribbon">
        <div className="tm-fc-container">
          <div className="tm-fc-ribbon-grid">
            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <Percent size={22} strokeWidth={2.2} />
              </div>
              <div className="tm-fc-ribbon-title">Zero Royalty</div>
              <div className="tm-fc-ribbon-sub">Keep 100% of service profits</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <Scissors size={22} strokeWidth={2.1} />
              </div>
              <div className="tm-fc-ribbon-title">Stylist Academy</div>
              <div className="tm-fc-ribbon-sub">Hiring &amp; technical SOPs</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <IndianRupee size={22} strokeWidth={2.2} />
              </div>
              <div className="tm-fc-ribbon-title">Transparent Capex</div>
              <div className="tm-fc-ribbon-sub">{packageShort} + taxes</div>
            </div>

            <div className="tm-fc-ribbon-item">
              <div className="tm-fc-ribbon-icon">
                <Store size={22} strokeWidth={2.1} />
              </div>
              <div className="tm-fc-ribbon-title">Turnkey Interiors</div>
              <div className="tm-fc-ribbon-sub">3D layouts &amp; equipment</div>
            </div>

            <div className="tm-fc-ribbon-item ribbon-span-mobile">
              <div className="tm-fc-ribbon-icon">
                <Award size={22} strokeWidth={2.1} />
              </div>
              <div className="tm-fc-ribbon-title">High-Repeat Model</div>
              <div className="tm-fc-ribbon-sub">Memberships &amp; loyalty</div>
            </div>
          </div>
        </div>
      </section>

      {/* SALON BUSINESS MADE SIMPLE */}
      <section className="tm-fc-simple-section">
        <div className="tm-fc-container">
          <div className="tm-fc-simple-grid">
            <div className="tm-fc-simple-media">
              <img
                src="/images/styluxe/franchise-studio.jpg"
                alt="Modern Styluxe Luxury Salon Storefront"
                width="600"
                height="450"
              />
            </div>

            <div className="tm-fc-simple-content">
              <h2>
                Your Luxury Salon Business,
                <br />
                Made Simple.
              </h2>
              <p className="lead">
                Styluxe brings together calm botanical architecture, certified
                hair &amp; skin service menus, smart booking software, and
                end-to-end launch support so you can run a thriving salon
                confidently.
              </p>

              <div className="tm-fc-features-grid">
                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Percent size={20} strokeWidth={2.2} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>No Royalty</strong>
                    <span>on service revenue</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Scissors size={20} strokeWidth={2.1} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Stylist Training</strong>
                    <span>&amp; hiring support</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Coins size={20} strokeWidth={2.1} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>55%–65% Margins</strong>
                    <span>high-yield services</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Laptop size={20} strokeWidth={2.1} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Smart Booking</strong>
                    <span>&amp; salon POS CRM</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Megaphone size={20} strokeWidth={2.1} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Digital Marketing</strong>
                    <span>&amp; launch campaigns</span>
                  </div>
                </div>

                <div className="tm-fc-feature-card">
                  <div className="tm-fc-feature-icon">
                    <Headphones size={20} strokeWidth={2.1} />
                  </div>
                  <div className="tm-fc-feature-text">
                    <strong>Ongoing</strong>
                    <span>operations support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRANCHISE INVESTMENT */}
      <section className="tm-fc-investment-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header left-aligned">
            <h2 className="tm-fc-section-title">Franchise Investment</h2>
            <p className="tm-fc-section-desc" style={{ margin: 0 }}>
              A clear, transparent investment structure to plan your Styluxe
              studio confidently.
            </p>
          </div>

          <div className="tm-fc-invest-grid">
            <div className="tm-fc-invest-card-dark">
              <div>
                <span className="card-tag">
                  {isExpress ? "Express Studio Package" : "Flagship Salon Package"}
                </span>
                <div className="card-price">{packageFee}</div>
                <div className="card-tax">+ 18% GST ({gstAmount})</div>

                <ul className="tm-fc-dark-list">
                  <li>
                    <span>Franchise License</span>
                    <strong>5 Years</strong>
                  </li>
                  <li>
                    <span>Ongoing Royalty</span>
                    <strong>0%</strong>
                  </li>
                  <li>
                    <span>Booking Token</span>
                    <strong>₹50,000</strong>
                  </li>
                </ul>
              </div>

              <p className="card-foot">
                *Booking token adjusted in full against the final franchise fee.
              </p>
            </div>

            <div className="tm-fc-invest-card-table">
              <div>
                <h3>Additional Setup Investment (Estimated)</h3>
                <div className="tm-fc-table-rows">
                  <div className="tm-fc-table-row">
                    <div>
                      <span>
                        Signature Botanical Interior &amp; Signage ({recSpace})
                      </span>
                      <div className="tm-fc-row-sub">
                        Fluted panels, brass mirrors &amp; lighting
                      </div>
                    </div>
                    <strong>{interiorEst}</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>
                      Hydraulic styling chairs, wash units, POS software &amp;
                      training
                    </span>
                    <span className="tm-fc-included-badge text-dark">
                      Included
                    </span>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Taxes (GST at 18%)</span>
                    <strong>{gstAmount}</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Opening Retail &amp; Backbar Products</span>
                    <strong>Included Kit</strong>
                  </div>
                  <div className="tm-fc-table-row">
                    <span>Logistics &amp; Civil Site Readiness</span>
                    <strong>As Actuals</strong>
                  </div>
                </div>

                <div className="tm-fc-table-highlight">
                  <span>Illustrative Turnkey Total (Excl. Taxes)</span>
                  <strong>{totalEst}</strong>
                </div>
              </div>

              <p className="note">
                *Actual interior cost depends on city, carpet area, plumbing
                readiness, and local material pricing.
              </p>
            </div>

            <div className="tm-fc-invest-card-yellow">
              <div className="tm-fc-calc-icon">
                <Calculator size={26} strokeWidth={2} />
              </div>

              <h3>Get Detailed Salon ROI &amp; Capex Breakup</h3>

              <button onClick={scrollToForm} className="tm-fc-btn-dark">
                <span>Request Breakup</span>
                <Download size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="tm-fc-package-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header left-aligned">
            <h2 className="tm-fc-section-title">
              What&apos;s Included in the Salon Franchise Package
            </h2>
            <p className="tm-fc-section-desc" style={{ margin: 0 }}>
              Everything you need to launch a refined luxury salon studio.
            </p>
          </div>

          <div className="tm-fc-package-grid">
            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/styluxe/salon-equipment.jpg"
                  alt="Luxury Salon Styling Stations and Equipment"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Salon Equipment</h3>
                <ul className="tm-fc-package-list">
                  <li>Forest-Green Hydraulic Styling Chairs</li>
                  <li>Ergonomic Shampoo Loungers</li>
                  <li>Micro-Mist Hair Steamer &amp; Hydra Unit</li>
                  <li>Brushed Brass Arched Mirrors</li>
                  <li>Professional Dryers, Irons &amp; Shears</li>
                  <li>UV Sterilizer &amp; Hygiene Cabinets</li>
                </ul>
              </div>
            </div>

            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/styluxe/salon-interior.jpg"
                  alt="Styluxe Salon Architectural Interiors"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Studio Design &amp; Branding</h3>
                <ul className="tm-fc-package-list">
                  <li>Location Feasibility Analysis</li>
                  <li>2D Floor Plan &amp; Plumbing Blueprints</li>
                  <li>3D Luxury Botanical Interior Renders</li>
                  <li>Fluted Reception &amp; Illuminated Signage</li>
                  <li>Branded Capes, Aprons &amp; Rate Menus</li>
                  <li>Opening Backbar &amp; Retail Display Kit</li>
                </ul>
              </div>
            </div>

            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/styluxe/hero-salon.jpg"
                  alt="Styluxe Academy Training and Salon POS"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Academy &amp; Technology</h3>
                <ul className="tm-fc-package-list">
                  <li>Owner &amp; Salon Manager Onboarding</li>
                  <li>Stylist Hiring &amp; Skill Trade Tests</li>
                  <li>Standard Service Rituals &amp; Hygiene SOPs</li>
                  <li>Smart Booking &amp; Billing POS Software</li>
                  <li>Membership &amp; Loyalty Wallet System</li>
                  <li>Automated WhatsApp Reminders</li>
                </ul>
              </div>
            </div>

            <div className="tm-fc-package-card">
              <div className="tm-fc-package-thumb">
                <img
                  src="/images/styluxe/salon-products.jpg"
                  alt="Styluxe Brand Marketing and Product Supply"
                  width="300"
                  height="200"
                />
              </div>
              <div className="tm-fc-package-body">
                <h3 className="tm-fc-package-title">Growth &amp; Business Support</h3>
                <ul className="tm-fc-package-list">
                  <li>Grand Launch Digital &amp; Influencer Kit</li>
                  <li>Google Maps &amp; Local SEO Setup</li>
                  <li>Seasonal Bridal &amp; Festive Campaigns</li>
                  <li>Centralized Authentic Product Sourcing</li>
                  <li>Dedicated Operations Helpline</li>
                  <li>Monthly Performance Mentoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACE REQUIREMENTS */}
      <section className="tm-fc-space-section">
        <div className="tm-fc-container">
          <div className="tm-fc-space-grid">
            <div className="tm-fc-space-content">
              <h2>
                Smart Footprint.
                <br />
                High-Margin Salon Economics.
              </h2>
              <p className="lead">
                Styluxe studios are ergonomically planned to maximize chair
                utilization, private facial suites, and welcoming guest flow.
              </p>

              <div className="tm-fc-space-stats">
                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Maximize2 size={18} strokeWidth={2.2} />
                  </div>
                  <strong>{minSpace}</strong>
                  <span>Min. Space</span>
                </div>

                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Store size={18} strokeWidth={2.2} />
                  </div>
                  <strong>{recSpace}</strong>
                  <span>Recommended</span>
                </div>

                <div className="tm-fc-space-stat-pill">
                  <div className="tm-fc-space-stat-icon">
                    <Building2 size={18} strokeWidth={2.2} />
                  </div>
                  <strong>Ground / 1st</strong>
                  <span>High-Visibility Floor</span>
                </div>
              </div>

              <button onClick={scrollToForm} className="tm-fc-btn-primary">
                <span>Check My Location Eligibility</span>
                <ArrowRight size={17} strokeWidth={2.2} />
              </button>
            </div>

            <div className="tm-fc-space-card-split">
              <div className="tm-fc-space-locations">
                <h3>Ideal Salon Locations</h3>
                <ul className="tm-fc-location-list">
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    Upscale Residential Townships
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    High-Street Lifestyle Markets
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    IT Parks &amp; Corporate Corridors
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    Shopping Malls &amp; Retail Plazas
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    Gated Community Clubhouses
                  </li>
                  <li>
                    <MapPin size={16} strokeWidth={2.2} className="tm-fc-loc-icon" />
                    Main Boulevard Corner Frontages
                  </li>
                </ul>
              </div>

              <div className="tm-fc-space-img-wrap">
                <img
                  src="/images/styluxe/franchise-studio.jpg"
                  alt="Styluxe Salon Studio Facade"
                  className="tm-fc-space-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-CATEGORY SERVICE CAROUSEL */}
      <section className="tm-fc-categories-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header">
            <h2 className="tm-fc-section-title">
              One Luxury Studio. Eight High-Demand Beauty Categories.
            </h2>
            <p className="tm-fc-section-desc">
              Diversified unisex services drive consistent weekday walk-ins,
              high-ticket bridal bookings, and recurring memberships.
            </p>
          </div>

          <div
            className="tm-fc-slider-wrapper"
            onTouchStart={handleCatTouchStart}
            onTouchEnd={handleCatTouchEnd}
          >
            <button
              className="tm-fc-slider-arrow prev"
              onClick={handleCatPrev}
              aria-label="Previous service slide"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <div className="tm-fc-slider-track-container">
              <div
                className="tm-fc-slider-track"
                style={{
                  transform: `translateX(-${(catIndex * 100) / itemsPerViewCat}%)`,
                }}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="tm-fc-slide-item"
                    style={{
                      flex: `0 0 ${100 / itemsPerViewCat}%`,
                      maxWidth: `${100 / itemsPerViewCat}%`,
                    }}
                  >
                    <div className="tm-fc-cat-card">
                      <div className="tm-fc-cat-thumb">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          width="240"
                          height="180"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="tm-fc-cat-name">{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="tm-fc-slider-arrow next"
              onClick={handleCatNext}
              aria-label="Next service slide"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>

          <div className="tm-fc-slider-dots">
            {Array.from({ length: maxCatIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`tm-fc-dot ${catIndex === idx ? "active" : ""}`}
                onClick={() => setCatIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="tm-fc-timeline-section">
        <div className="tm-fc-container">
          <div className="tm-fc-timeline-header-wrap">
            <h2 className="tm-fc-section-title">
              From Application to Salon Launch
            </h2>
            <div className="tm-fc-timeline-badge">
              Estimated Turnkey Timeline: {timelineLabel}
            </div>
          </div>

          <div className="tm-fc-timeline-grid">
            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <FileText size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">Apply for Franchise</h3>
              <p className="tm-fc-step-desc">
                Submit your enquiry and receive the salon investment kit.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Handshake size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">Registration &amp; Terms</h3>
              <p className="tm-fc-step-desc">
                Lock your territory and complete agreement formalities.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <MapPin size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">Site Evaluation</h3>
              <p className="tm-fc-step-desc">
                Validate footfall, frontage, and salon utility layout.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <LayoutGrid size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">3D Design &amp; Fit-Out</h3>
              <p className="tm-fc-step-desc">
                Execute signature Styluxe interiors and install equipment.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Wrench size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">Stylist Hiring &amp; SOPs</h3>
              <p className="tm-fc-step-desc">
                Trade-test stylists, train staff, and configure salon POS.
              </p>
            </div>

            <div className="tm-fc-step-item">
              <div className="tm-fc-step-circle">
                <Rocket size={22} strokeWidth={2} />
              </div>
              <h3 className="tm-fc-step-title">Launch Your Styluxe</h3>
              <p className="tm-fc-step-desc">
                Inaugurate with hyperlocal launch campaigns and offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS SUPPORT + INDIA MAP */}
      <section className="tm-fc-network-section">
        <div className="tm-fc-container">
          <div className="tm-fc-network-grid">
            <div className="tm-fc-support-col">
              <h2>
                You&apos;re in Business
                <br />
                for Yourself, Not by Yourself.
              </h2>
              <p className="lead">
                Styluxe partners with you at every stage — from architectural
                design and stylist readiness to year-round client acquisition.
              </p>

              <ul className="tm-fc-support-checklist">
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Location feasibility &amp; 3D botanical interior blueprints
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Certified stylist trade-testing &amp; academy onboarding
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Centralized authentic hair &amp; skincare supply chain
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Social media creatives, bridal campaigns &amp; local SEO
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Online booking, CRM, memberships &amp; loyalty POS
                </li>
                <li>
                  <span className="tm-fc-check-icon">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  Dedicated partner helpline and periodic quality audits
                </li>
              </ul>
            </div>

            <div className="tm-fc-network-card">
              <FranchiseIndiaMap />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER TESTIMONIALS */}
      <section className="tm-fc-testimonials-section">
        <div className="tm-fc-container">
          <div className="tm-fc-section-header">
            <h2 className="tm-fc-section-title">
              What Our Franchise Partners Say
            </h2>
          </div>

          {reviewsLoading ? (
            <p className="tm-fc-testimonial-message">
              Loading partner testimonials...
            </p>
          ) : (
            <>
              <div
                className="tm-fc-slider-wrapper"
                onTouchStart={handleTestTouchStart}
                onTouchEnd={handleTestTouchEnd}
              >
                <button
                  className="tm-fc-slider-arrow prev"
                  onClick={handleTestPrev}
                  aria-label="Previous testimonial slide"
                  disabled={testimonials.length <= itemsPerViewTest}
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>

                <div className="tm-fc-slider-track-container">
                  <div
                    className="tm-fc-slider-track"
                    style={{
                      transform: `translateX(-${(testIndex * 100) / itemsPerViewTest
                        }%)`,
                    }}
                  >
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className="tm-fc-slide-item"
                        style={{
                          flex: `0 0 ${100 / itemsPerViewTest}%`,
                          maxWidth: `${100 / itemsPerViewTest}%`,
                        }}
                      >
                        <div className="tm-fc-test-card">
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              marginBottom: "12px",
                            }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={15}
                                fill={
                                  i < (test.starRating || 5) ? "#b89454" : "none"
                                }
                                color="#b89454"
                              />
                            ))}
                          </div>

                          <p className="tm-fc-test-quote">“{test.reviewText}”</p>

                          <div className="tm-fc-test-author">
                            <img
                              src={
                                test.reviewerAvatar ||
                                "/images/styluxe/service-hair.jpg"
                              }
                              alt={test.reviewerName || "Styluxe Partner"}
                              className="tm-fc-test-avatar"
                              loading="lazy"
                            />

                            <div className="tm-fc-test-info">
                              <strong>{test.reviewerName}</strong>
                              <span>{test.reviewerRole}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="tm-fc-slider-arrow next"
                  onClick={handleTestNext}
                  aria-label="Next testimonial slide"
                  disabled={testimonials.length <= itemsPerViewTest}
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              </div>

              {maxTestIndex > 0 && (
                <div className="tm-fc-slider-dots">
                  {Array.from({ length: maxTestIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`tm-fc-dot ${testIndex === idx ? "active" : ""}`}
                      onClick={() => setTestIndex(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FAQS */}
      <section className="tm-fc-faq-section">
        <div className="tm-fc-container">
          <div className="tm-fc-faq-top">
            <h2 className="tm-fc-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="tm-fc-faq-grid">
            <div className="tm-fc-faq-column">
              {faqs
                .filter((_, idx) => idx % 2 === 0)
                .map((faq, idx) => {
                  const faqIndex = idx * 2;
                  return (
                    <div
                      key={faq.q}
                      className={`tm-fc-faq-item ${openFaq === faqIndex ? "open" : ""
                        }`}
                      onClick={() => toggleFaq(faqIndex)}
                    >
                      <div className="tm-fc-faq-question">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <HelpCircle size={17} className="tm-fc-faq-icon-user" />
                          <span>{faq.q}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className="tm-fc-faq-chevron"
                          style={{
                            transform:
                              openFaq === faqIndex
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      </div>
                      {openFaq === faqIndex && (
                        <div className="tm-fc-faq-answer">{faq.a}</div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="tm-fc-faq-column">
              {faqs
                .filter((_, idx) => idx % 2 !== 0)
                .map((faq, idx) => {
                  const faqIndex = idx * 2 + 1;
                  return (
                    <div
                      key={faq.q}
                      className={`tm-fc-faq-item ${openFaq === faqIndex ? "open" : ""
                        }`}
                      onClick={() => toggleFaq(faqIndex)}
                    >
                      <div className="tm-fc-faq-question">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <HelpCircle size={17} className="tm-fc-faq-icon-user" />
                          <span>{faq.q}</span>
                        </div>
                        <ChevronDown
                          size={18}
                          className="tm-fc-faq-chevron"
                          style={{
                            transform:
                              openFaq === faqIndex
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      </div>
                      {openFaq === faqIndex && (
                        <div className="tm-fc-faq-answer">{faq.a}</div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <div id="apply">
        <FranchiseFormSection />
      </div>
    </div>
  );
}
