import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/menu",
        destination: "/services/",
        statusCode: 301,
      },
      {
        source: "/cafe-franchise-india",
        destination: "/salon-franchise-india/",
        statusCode: 301,
      },
      {
        source: "/best-tea-franchise-india",
        destination: "/best-salon-franchise-india/",
        statusCode: 301,
      },
      {
        source: "/Express",
        destination: "/best-salon-franchise-india/",
        statusCode: 301,
      },
      {
        source: "/express",
        destination: "/best-salon-franchise-india/",
        statusCode: 301,
      },
      {
        source: "/ourcentres",
        destination: "/salon-locations/",
        statusCode: 301,
      },
      {
        source: "/ourcentres/stores",
        destination: "/salon-locations/studio/",
        statusCode: 301,
      },
      {
        source: "/locations",
        destination: "/salon-locations/",
        statusCode: 301,
      },
      {
        source: "/locations/stores",
        destination: "/salon-locations/studio/",
        statusCode: 301,
      },
      {
        source: "/stores",
        destination: "/salon-locations/",
        statusCode: 301,
      },
      {
        source: "/post",
        destination: "/news/",
        statusCode: 301,
      },
      {
        source: "/post/:slug",
        destination: "/news/:slug/",
        statusCode: 301,
      },
      {
        source: "/blog",
        destination: "/news/",
        statusCode: 301,
      },
      {
        source: "/blog/:slug",
        destination: "/news/:slug/",
        statusCode: 301,
      },
      {
        source: "/franchise-opportunities",
        destination: "/franchise/",
        statusCode: 301,
      },
      {
        source: "/franchise-opportunities/:slug",
        destination: "/franchise/:slug/",
        statusCode: 301,
      },
      {
        source: "/careers",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
