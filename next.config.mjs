/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.ayo.co.id',
        port: '',
      },
    ],
  },
};

export default nextConfig;
