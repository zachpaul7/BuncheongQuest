import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [],
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
