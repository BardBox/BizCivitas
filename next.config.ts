import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com'],
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
        protocol: 'http',
        hostname: 'deeppink-starling-710457.hostingersite.com',
      },
    ],
  },
  // Allow development origins for Replit
  experimental: {
    allowedDevOrigins: [
      '*.replit.dev',
      '*.repl.co',
    ],
  },
  // Configure for deployment
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
