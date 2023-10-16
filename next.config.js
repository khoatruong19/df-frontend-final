/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'marketplace.canva.com',
      's3.resume.io',
      'avatars.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
