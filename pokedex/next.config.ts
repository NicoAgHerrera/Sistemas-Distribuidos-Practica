/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/**", // ✅ cubre todos los sprites, items, artworks, etc.
      },
    ],
  },
};

module.exports = nextConfig;
