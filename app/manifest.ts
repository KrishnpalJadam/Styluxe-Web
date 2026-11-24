export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Styluxe Salons",
    short_name: "Styluxe",
    description: "Luxury Hair, Beauty, Botanical Skin Care & Modern Grooming Unisex Salons in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#0D3B26",
    icons: [
      {
        src: "/images/styluxe-emblem.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
