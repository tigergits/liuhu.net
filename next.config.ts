import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages handles redirects via public/_redirects
}

export default nextConfig
