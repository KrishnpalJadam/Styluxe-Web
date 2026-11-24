"use client";

import React, { useState } from "react";
import "./AwardsRecognitions.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

const awards = [
  {
    title: "Luxury Salon Brand of the Year",
    text: "Recognised for blending botanical salon architecture, hospital-grade hygiene, and accessible everyday luxury.",
    image: "/images/styluxe/salon-interior.jpg",
    alt: "Styluxe Luxury Salon Brand of the Year",
  },
  {
    title: "Emerging Beauty Franchise Leader",
    text: "Honoured for building a transparent, zero-royalty unisex salon franchise model tailored for modern Indian entrepreneurs.",
    image: "/images/styluxe/franchise-studio.jpg",
    alt: "Styluxe Emerging Beauty Franchise Leader",
  },
  {
    title: "Excellence in Hair & Skin Care",
    text: "Celebrated for certified stylist academy training, authentic global formulations, and high client repeat satisfaction.",
    image: "/images/styluxe/service-hair.jpg",
    alt: "Styluxe Excellence in Hair and Skin Care",
  },
  {
    title: "Best Hygiene & Client Safety",
    text: "Audited across every studio for sterile single-use tools, medical-grade sanitization, and calm guest comfort.",
    image: "/images/styluxe/service-skin.jpg",
    alt: "Styluxe Best Hygiene and Client Safety",
  },
  {
    title: "Men's Grooming Experience Award",
    text: "Acknowledged for elevating modern men's beard sculpting, scalp therapy, and tailored haircut craftsmanship.",
    image: "/images/styluxe/service-grooming.jpg",
    alt: "Styluxe Men's Grooming Experience Award",
  },
  {
    title: "Bridal Artistry Distinction",
    text: "Recognised by brides and stylists for luminous HD & airbrush artistry rooted in healthy, radiant skin prep.",
    image: "/images/styluxe/service-makeup.jpg",
    alt: "Styluxe Bridal Artistry Distinction",
  },
];

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H4v2a4 4 0 0 0 4 4" />
      <path d="M16 6h4v2a4 4 0 0 1-4 4" />
      <path d="M12 13v5" />
      <path d="M8 21h8" />
      <path d="M9 18h6" />
    </svg>
  );
}

export default function AwardsRecognitions() {
  const [expandedAwards, setExpandedAwards] = useState<number[]>([]);

  const toggleDescription = (index: number) => {
    setExpandedAwards((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      className="tmx-awards-section"
      id="awards-recognition"
      aria-labelledby="awards-title"
    >
      <div className="tmx-awards-container">
        <div className="section-heading steps-heading tmx-awards-heading-row">
          <div>
            <h2 id="awards-title">Standards &amp; Recognitions</h2>
            <span className="short-line" />
          </div>

          <p>
            Celebrated for elevating modern Indian salon hospitality, certified
            beauty craftsmanship, and franchise excellence.
          </p>
        </div>

        <Swiper
          className="tmx-awards-grid"
          modules={[Autoplay, Grid]}
          loop={true}
          speed={1300}
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          slidesPerView={4}
          slidesPerGroup={2}
          spaceBetween={20}
          grid={{ rows: 1, fill: "row" }}
          watchOverflow={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 12,
              grid: { rows: 1, fill: "row" },
            },
            601: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 18,
              grid: { rows: 1, fill: "row" },
            },
            901: {
              slidesPerView: 4,
              slidesPerGroup: 2,
              spaceBetween: 20,
              grid: { rows: 1, fill: "row" },
            },
          }}
        >
          {awards.map((award, index) => {
            const isExpanded = expandedAwards.includes(index);
            const isLong = award.text.length > 75;

            return (
              <SwiperSlide key={`${award.title}-${index}`}>
                <article className="tmx-award-card">
                  <div className="tmx-award-image-box">
                    <img
                      src={award.image}
                      alt={award.alt}
                      className="tmx-award-image"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="tmx-award-content">
                    <div className="tmx-award-heading">
                      <h3 className="tmx-award-title">{award.title}</h3>
                      <span className="tmx-award-trophy">
                        <TrophyIcon />
                      </span>
                    </div>

                    <p
                      className={`tmx-award-text ${isLong && !isExpanded ? "is-collapsed" : ""
                        }`}
                    >
                      {award.text}
                    </p>

                    {isLong && (
                      <button
                        type="button"
                        className="tmx-award-view-more"
                        onClick={() => toggleDescription(index)}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded
                            ? `Show less about ${award.title}`
                            : `View more about ${award.title}`
                        }
                      >
                        {isExpanded ? "View less" : "View more"}
                      </button>
                    )}
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="tmx-awards-note">
          <span />
          <p>
            Styluxe Salons India — Audited hygiene, certified beauty experts,
            and transparent client care across every studio.
          </p>
          <span />
        </div>
      </div>
    </section>
  );
}
