/** @type {import('next').NextConfig} */
const nextConfig = {
  exclude: ['admin'],
  webpack: (config) => {
    config.module.rules?.push({
      test: /admin/,
      loader: "ignore-loader",
    });
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      'swewoocommerce.dfweb.no',
      'res.cloudinary.com',
      'via.placeholder.com',
      'staging.fribuffet.fr',
      'fribuffet.fr',
    ],
  },
};

module.exports = nextConfig;
