/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: true,
  },
  // https://nextjs.org/docs/pages/api-reference/next-config-js/images
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

// Refernence: https://nextjs.org/docs/pages/api-reference/next-config-js
