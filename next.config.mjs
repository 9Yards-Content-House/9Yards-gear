/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  
  // Performance: Optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: [
      // Radix UI components
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      // Icons
      'lucide-react',
      'react-icons',
      // Other heavy libraries
      'date-fns',
      'recharts',
      'embla-carousel-react',
      'react-day-picker',
      'sonner',
      'cmdk',
      'fuse.js',
      'zod',
      'react-hook-form',
    ],
  },

  // Compiler optimizations for production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Modular imports for better tree-shaking
  modularizeImports: {
    'date-fns': {
      transform: 'date-fns/{{ member }}',
    },
  },
}

export default nextConfig
