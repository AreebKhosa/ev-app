import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev server access from other devices on LAN (mobile testing, etc.)
  allowedDevOrigins: ["10.76.135.17"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Add more image hosts here as needed
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;