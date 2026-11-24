"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCommonCategories, getCommonMenu } from "../lib/api";

interface CategoryCardItem {
  id: string;
  name: string;
  slug?: string;
  qnt: string;
  image: string;
  alt: string;
}

const defaultServiceCategories: CategoryCardItem[] = [
  {
    id: "hair-styling",
    slug: "hair-styling",
    name: "Hair Cuts & Styling",
    qnt: "399",
    image: "/images/styluxe/service-hair.jpg",
    alt: "Precision haircuts and luxury blowout styling at Styluxe Salons",
  },
  {
    id: "hair-treatments",
    slug: "hair-treatments",
    name: "Color & Hair Spa",
    qnt: "999",
    image: "/images/styluxe/salon-equipment.jpg",
    alt: "Botanical hair spa, keratin, and hair color rituals at Styluxe",
  },
  {
    id: "skin-facials",
    slug: "skin-facials",
    name: "Skin & Facials",
    qnt: "799",
    image: "/images/styluxe/service-skin.jpg",
    alt: "Luminous botanical facials and skincare at Styluxe Salons",
  },
  {
    id: "mens-grooming",
    slug: "mens-grooming",
    name: "Men's Grooming",
    qnt: "299",
    image: "/images/styluxe/service-grooming.jpg",
    alt: "Precision men's haircut and beard grooming at Styluxe",
  },
  {
    id: "bridal-makeup",
    slug: "bridal-makeup",
    name: "Bridal & Makeup",
    qnt: "2,499",
    image: "/images/styluxe/service-makeup.jpg",
    alt: "Bridal and occasion makeup artistry at Styluxe Salons",
  },
  {
    id: "nails-spa",
    slug: "nails-spa",
    name: "Nails & Hand Spa",
    qnt: "499",
    image: "/images/styluxe/service-nails.jpg",
    alt: "Botanical manicure, pedicure and nail studio at Styluxe",
  },
];

function resolveCategoryImage(cat: any): string {
  const img = cat.image;
  if (
    img &&
    typeof img === "string" &&
    !img.startsWith("blob:") &&
    (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/"))
  ) {
    return img;
  }

  const name = (cat.name || "").toLowerCase();
  const slug = (cat.slug || "").toLowerCase();

  if (name.includes("skin") || name.includes("facial") || slug.includes("skin")) {
    return "/images/styluxe/service-skin.jpg";
  }
  if (name.includes("groom") || name.includes("beard") || name.includes("men") || slug.includes("groom")) {
    return "/images/styluxe/service-grooming.jpg";
  }
  if (name.includes("makeup") || name.includes("bridal") || slug.includes("bridal")) {
    return "/images/styluxe/service-makeup.jpg";
  }
  if (name.includes("nail") || name.includes("manicure") || name.includes("pedicure") || slug.includes("nail")) {
    return "/images/styluxe/service-nails.jpg";
  }
  if (name.includes("color") || name.includes("keratin") || name.includes("spa") || slug.includes("treatment")) {
    return "/images/styluxe/salon-equipment.jpg";
  }
  return "/images/styluxe/service-hair.jpg";
}

function resolveStartingPrice(cat: any, menuItems: any[]): string {
  const catItems = menuItems.filter(
    (item) =>
      item.categoryId === cat.id ||
      item.category?.id === cat.id ||
      item.category?.slug === cat.slug ||
      item.category?.name?.toLowerCase() === cat.name?.toLowerCase()
  );

  const prices = catItems
    .map((item) => Number(item.price))
    .filter((p) => !isNaN(p) && p > 0);

  if (prices.length > 0) {
    return `${Math.min(...prices)}`;
  }

  const name = (cat.name || "").toLowerCase();
  if (name.includes("groom") || name.includes("men")) return "299";
  if (name.includes("nail")) return "499";
  if (name.includes("skin") || name.includes("facial")) return "799";
  if (name.includes("color") || name.includes("treatment")) return "999";
  if (name.includes("bridal") || name.includes("makeup")) return "2,499";
  return "399";
}

export default function HomeMenuCategories() {
  const [categories, setCategories] = useState<CategoryCardItem[]>(defaultServiceCategories);

  useEffect(() => {
    let mounted = true;

    async function loadDynamicCategories() {
      try {
        const [apiCategories, apiMenu] = await Promise.all([
          getCommonCategories(),
          getCommonMenu().catch(() => []),
        ]);

        if (!mounted || !Array.isArray(apiCategories) || apiCategories.length === 0) {
          return;
        }

        const menuList = Array.isArray(apiMenu) ? apiMenu : [];

        const activeCategories = apiCategories
          .filter((c: any) => c.status === "active")
          .sort(
            (a: any, b: any) =>
              (a.displayOrder ?? 99) - (b.displayOrder ?? 99)
          )
          .slice(0, 6);

        if (activeCategories.length > 0) {
          const dynamicCards: CategoryCardItem[] = activeCategories.map((c: any) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            qnt: resolveStartingPrice(c, menuList),
            image: resolveCategoryImage(c),
            alt: `${c.name} at Styluxe Salons`,
          }));

          setCategories(dynamicCards);
        }
      } catch (err) {
        console.warn("[HomeMenuCategories] Failed to load dynamic categories:", err);
      }
    }

    loadDynamicCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="menu" className="menu-section container-xl section-space">
      <div className="section-heading menu-heading-grid">
        <div>
          <p className="kicker">OUR SERVICES</p>
          <h2>
            Services Tailored Around
            <br />
            <span className="marker">Your Natural Glow</span>
          </h2>
          <span className="short-line" />
        </div>
        <div className="menu-intro">
          <p>
            From precision haircuts and botanical hair spas to luminous skin
            facials, bridal artistry, and men&apos;s grooming — discover expert
            care at honest prices.
          </p>
          <Link
            href="/services"
            className="cafe-action cafe-outline menu-desktop-action"
          >
            View All Services <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <div id="menu-cards" className="menu-grid">
        {categories.map((item) => (
          <Link
            href={item.slug ? `/services?category=${encodeURIComponent(item.slug)}` : "/services"}
            className="menu-card"
            key={item.id || item.name}
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={816}
              height={816}
              unoptimized
              loading="lazy"
            />
            <div className="menu-card-copy">
              <h3>{item.name}</h3>
              <p>Starting from ₹{item.qnt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="menu-mobile-action">
        <Link href="/services" className="cafe-action cafe-outline">
          View All Services <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
