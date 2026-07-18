import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Rewrites `import { Sun, Moon } from 'lucide-react'` into per-icon imports at
  // build time so only the used glyphs ship — keeps the icon-library dep from
  // pulling the whole barrel into the bundle (CLAUDE.md → bundle-size policy).
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      // Shopify-hosted product imagery (mock.shop serves from the Shopify CDN).
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'mock.shop' },
    ],
  },
};

export default nextConfig;
