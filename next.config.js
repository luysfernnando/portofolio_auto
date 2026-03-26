/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  compiler: {
    styledComponents: {
      ssr: true,
      minify: true,
      pure: true,
      displayName: false,
    },
    // Remove console.log em produção (mantém avisos e erros)
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
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
      'styled-components',
      'lodash',
      'axios',
      '@octokit/rest',
      'react-intersection-observer'
    ],
    staleTimes: {
      dynamic: 30, // 30s cache for dynamic routes
      static: 180, // 3m cache for static routes
    },
    inlineCss: true, // Inline critical CSS for faster FCP
    viewTransition: true, // Smooth page transitions
    serverSourceMaps: false, // Reduz o tamanho dos artefatos de build
  },
}

module.exports = nextConfig;
