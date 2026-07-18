import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Shopify-hosted product imagery (mock.shop serves from the Shopify CDN).
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'mock.shop' },
    ],
  },
};

export default nextConfig;
