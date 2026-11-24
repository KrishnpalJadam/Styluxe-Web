"use client";

import { useEffect, useState } from "react";
import "./franchise-popup.css";
import { getAllOffers } from "../lib/api";

type Offer = {
  id: string;
  title: string;
  bannerImage: string;
  status: string;
  startDate: string;
  endDate: string;
};

const POPUP_OFFER_ID = "cmwt35hqx0002bot1uthxyk7w";

export default function FranchisePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [offerImage, setOfferImage] = useState<string | null>(null);
  const [isOfferLoaded, setIsOfferLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadOffer() {
      try {
        const response = await getAllOffers();
        const offers = response as Offer[];

        const offer = offers.find((item) => item.id === POPUP_OFFER_ID);
        if (!offer) return;

        const now = new Date();
        const startDate = new Date(offer.startDate);
        const endDate = new Date(offer.endDate);

        const isValid =
          offer.status === "active" &&
          offer.bannerImage?.trim() &&
          !isNaN(startDate.getTime()) &&
          !isNaN(endDate.getTime()) &&
          now >= startDate &&
          now <= endDate;

        if (mounted && isValid) {
          setOfferImage(offer.bannerImage);
        }
      } catch (error) {
        console.warn("Failed to load popup offer:", error);
      } finally {
        if (mounted) {
          setIsOfferLoaded(true);
        }
      }
    }

    loadOffer();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOfferLoaded || !offerImage) return;

    const openPopup = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-styluxe-franchise-popup", openPopup);
    window.addEventListener("open-teamax-franchise-popup", openPopup);

    if (sessionStorage.getItem("styluxe-franchise-popup")) {
      return () => {
        window.removeEventListener("open-styluxe-franchise-popup", openPopup);
        window.removeEventListener("open-teamax-franchise-popup", openPopup);
      };
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("styluxe-franchise-popup", "true");
    }, 2000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("open-styluxe-franchise-popup", openPopup);
      window.removeEventListener("open-teamax-franchise-popup", openPopup);
    };
  }, [isOfferLoaded, offerImage]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen || !offerImage) return null;

  return (
    <div
      className="tmx-franchise-overlay2"
      role="dialog"
      aria-modal="true"
      aria-label="Styluxe Salons special offer"
      onClick={closePopup}
    >
      <div
        className="tmx-franchise-modal2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tmx-franchise-close close2"
          onClick={closePopup}
          aria-label="Close popup"
        >
          ×
        </button>

        <div className="tmx-featured-offer">
          <a
            href="https://wa.me/919505047047"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Claim Styluxe Salons offer on WhatsApp"
          >
            <img
              src={offerImage}
              alt="Styluxe Salons Special Offer"
              className="tmx-featured-offer-image"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
