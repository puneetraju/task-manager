/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
    turbo: {
      overlay: false,
    },
  }
};

export default nextConfig;
