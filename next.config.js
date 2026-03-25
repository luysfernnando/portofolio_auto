/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stable 16+ Configuration
  cacheComponents: true,
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental Features for Performance & UX
  experimental: {
    useLightningcss: true,
    optimizePackageImports: [
      'lucide-react',
      'react-icons/fa',
      'react-icons/hi',
      'react-icons/fi',
      'react-icons/si',
      'react-icons/md',
      'react-icons/io',
      'react-icons/lu',
      'framer-motion',
      'styled-components'
    ],
    staleTimes: {
      dynamic: 30, // 30s cache for dynamic routes
      static: 180, // 3m cache for static routes
    },
    inlineCss: true, // Inline critical CSS for faster FCP
    viewTransition: true, // Smooth page transitions
  },
}

module.exports = nextConfig;
