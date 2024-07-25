/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2147483647,
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_API_HOST,
        port: process.env.NEXT_PUBLIC_API_PORT,
        pathname: `/${process.env.NEXT_PUBLIC_API_IMAGES_PREFIX}/**`,
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

module.exports = nextConfig;
