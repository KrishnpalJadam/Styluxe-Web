"use client";

import { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "./TrustedBrands.css";

const brands = [
  { name: "L'ORÉAL", sub: "Professionnel" },
  { name: "KÉRASTASE", sub: "Paris Haircare" },
  { name: "SCHWARZKOPF", sub: "Salon Color" },
  { name: "DERMALOGICA", sub: "Skin Therapy" },
  { name: "O3+", sub: "Clinical Glow" },
  { name: "MOROCCANOIL", sub: "Botanical Care" },
  { name: "RAZORPAY", sub: "Smart Checkout" },
];

export default function TrustedBrands() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const marqueeBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    if (!swiperInstance || swiperInstance.destroyed) return;

    const startAutoplay = () => {
      if (swiperInstance.destroyed) return;
      if (!swiperInstance.autoplay.running) {
        swiperInstance.autoplay.start();
      }
    };

    swiperInstance.update();
    startAutoplay();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startAutoplay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [swiperInstance]);

  return (
    <section className="mainspace">
      <div className="container-xl tmx-trusted-heading-container">
        <div className="section-heading why-heading tmx-trusted-heading">
          <div>
            <p className="kicker">CURATED FORMULATIONS</p>
            <h2 id="partners-heading">Our Global Brand &amp; Tech Partners</h2>
            <span className="short-line" />
          </div>
        </div>
      </div>

      <section
        className="tmx-trusted-brands"
        aria-label="Styluxe Salons product and technology partners"
      >
        <div className="tmx-trusted-brands-inner">
          <div className="tmx-trusted-brands-slider">
            <button
              type="button"
              className="tmx-trusted-swipe-arrow tmx-trusted-swipe-left"
              aria-label="Previous brand"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg viewBox="0 0 16 26" fill="none" aria-hidden="true">
                <path
                  d="M13 3L3 13L13 23"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Swiper
              modules={[Autoplay, FreeMode]}
              className="tmx-trusted-brands-swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setSwiperInstance(swiper);
              }}
              slidesPerView={7}
              spaceBetween={24}
              loop={true}
              loopAdditionalSlides={brands.length}
              speed={5000}
              freeMode={{
                enabled: true,
                momentum: false,
                sticky: false,
              }}
              allowTouchMove={true}
              grabCursor={true}
              autoplay={{
                enabled: true,
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
                waitForTransition: false,
              }}
              breakpoints={{
                0: { slidesPerView: 2.5, spaceBetween: 12 },
                480: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1100: { slidesPerView: 7, spaceBetween: 24 },
              }}
            >
              {marqueeBrands.map((brand, index) => (
                <SwiperSlide
                  key={`${brand.name}-${index}`}
                  className="tmx-trusted-brands-slide"
                >
                  <div className="tmx-trusted-brand-circle">
                    <div className="stx-partner-wordmark">
                      <strong>{brand.name}</strong>
                      <span>{brand.sub}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="tmx-trusted-swipe-arrow tmx-trusted-swipe-right"
              aria-label="Next brand"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg viewBox="0 0 16 26" fill="none" aria-hidden="true">
                <path
                  d="M3 3L13 13L3 23"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
