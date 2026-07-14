import type { NextConfig } from "next";
//accept image from everywhere
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ],

  },
};

export default nextConfig;
