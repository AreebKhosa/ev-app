import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev server access from other devices on LAN (mobile testing, etc.)
  allowedDevOrigins: ["10.76.135.17", "192.168.*.*", "localhost:3000"],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.**",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;