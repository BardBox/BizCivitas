import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'https://i.ibb.co/**',
      },
      {
        protocol: 'http',
        hostname: 'deeppink-starling-710457.hostingersite.com',
      },
    ],
  },
  // Configure for deployment
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
