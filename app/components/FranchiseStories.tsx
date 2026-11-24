"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getReviews } from "../lib/api";
import "./FranchiseStories.css";

type FranchiseStory = {
  id: string;
  name: string;
  location: string;
  image: string;
  review: string;
  link?: string;
  linkName?: string;
  stars: number;
};

const defaultSalonStories: FranchiseStory[] = [
  {
    id: "styluxe-1",
    name: "Ananya Reddy",
    location: "Styluxe Salon, Jubilee Hills, Hyderabad",
    image: "/images/styluxe/service-hair.jpg",
    review:
      "The calm atmosphere, spotless hygiene, and attention to detail make Styluxe my go-to salon. My hair spa and blowout lasted for days.",
    stars: 5,
  },
  {
    id: "styluxe-2",
    name: "Meera Nair",
    location: "Franchise Partner · Styluxe Kompally",
    image: "/images/styluxe/service-skin.jpg",
    review:
      "From 3D interior execution to stylist training and smart booking software, the Styluxe team made launching our luxury studio effortless.",
    stars: 5,
  },
  {
    id: "styluxe-3",
    name: "Rohan Malhotra",
    location: "Styluxe Salon, Gachibowli, Hyderabad",
    image: "/images/styluxe/service-grooming.jpg",
    review:
      "Finally a unisex salon that treats men's grooming with true craftsmanship. Transparent pricing, polite stylists, and zero waiting time.",
    stars: 5,
  },
];

export default function FranchiseStories() {
  const [stories, setStories] = useState<FranchiseStory[]>(defaultSalonStories);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeSlide >= stories.length) {
      setActiveSlide(0);
    }
  }, [stories, activeSlide]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    let mounted = true;
    getReviews({ status: "published" })
      .then((data) => {
        if (!mounted || !Array.isArray(data) || data.length === 0) return;

        const franchiseReviews = data.filter(
          (r: any) =>
            r.reviewType === "franchise" ||
            r.categoryId === "franchise" ||
            r.categoryId === "cat-franchise"
        );

        const listToUse = franchiseReviews.length > 0 ? franchiseReviews : data;
        listToUse.sort((a: any, b: any) => {
          const featA = a.isFeatured ? 1 : 0;
          const featB = b.isFeatured ? 1 : 0;
          if (featA !== featB) return featB - featA;
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        });

        const formatted = listToUse.map((r: any, idx: number) => ({
          id: r.id || `live-${idx}`,
          name: r.reviewerName || "Verified Guest",
          location:
            r.reviewerRole ||
            r.relatedCentreName ||
            (r.relatedCentre
              ? `${r.relatedCentre.name}, ${r.relatedCentre.city}`
              : "Styluxe Salon Guest"),
          image:
            r.reviewerAvatar ||
            defaultSalonStories[idx % defaultSalonStories.length]?.image ||
            "/images/styluxe/service-hair.jpg",
          review: r.reviewText,
          link: r.viewMoreLink || "",
          linkName: r.viewMoreLinkName || "Read More",
          stars: r.starRating || 5,
        }));

        setStories(formatted);
      })
      .catch((err) => {
        console.warn("[FranchiseStories] Using default stories:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="tmx-franchise-stories"
      aria-labelledby="tmx-franchise-stories-title"
    >
      <div className="tmx-franchise-stories-inner">
        <div className="tmx-franchise-stories-intro">
          <div className="tmx-franchise-stories-eyebrow">
            <span />
            <span>TESTIMONIALS</span>
          </div>

          <h2 id="tmx-franchise-stories-title">
            What Our Guests &amp;
            <br />
            <em>Partners Say.</em>
          </h2>

          <p>
            Real stories and experiences from clients who trust Styluxe for
            their care and partners growing their salons with us.
          </p>

          <Link
            href="/reviews"
            className="tmx-franchise-stories-button tmx-button-desktop"
          >
            <span>View All Reviews</span>
            <span className="tmx-franchise-stories-arrow">→</span>
          </Link>
        </div>

        <div className="tmx-stories-slider-container">
          <div
            className="tmx-stories-slider-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {stories.length > 1 && (
              <button
                type="button"
                className="tmx-stories-slider-arrow prev"
                onClick={handlePrev}
                aria-label="Previous story"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
            )}

            <div className="tmx-stories-track-container">
              <div
                className="tmx-franchise-stories-cards tmx-stories-track"
                style={{
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
              >
                {stories.map((story, index) => (
                  <div
                    key={story.id || story.name}
                    className="tmx-stories-slide-wrapper"
                  >
                    <div
                      className={`tmx-franchise-story-card tmx-franchise-story-card-${(index % 3) + 1
                        }`}
                    >
                      <div className="tmx-franchise-story-avatar">
                        <img
                          src={story.image}
                          alt={story.name}
                          loading="lazy"
                        />
                      </div>

                      <h3>{story.name}</h3>

                      <p className="tmx-franchise-story-location">
                        {story.location}
                      </p>

                      <div
                        className="tmx-franchise-story-stars"
                        aria-label={`${story.stars} out of 5 stars`}
                      >
                        {"★".repeat(story.stars || 5)}
                      </div>

                      <div className="tmx-franchise-story-divider" />

                      <p>“{story.review}”</p>

                      {story.link && (
                        <a
                          href={story.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tmx-story-view-more"
                        >
                          {story.linkName || "Read More"} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {stories.length > 1 && (
              <button
                type="button"
                className="tmx-stories-slider-arrow next"
                onClick={handleNext}
                aria-label="Next story"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {stories.length > 1 && (
            <div className="tmx-stories-dots">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`tmx-stories-dot ${activeSlide === idx ? "active" : ""
                    }`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <Link
            href="/reviews"
            className="tmx-franchise-stories-button tmx-button-mobile"
          >
            <span>View All Reviews</span>
            <span className="tmx-franchise-stories-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
